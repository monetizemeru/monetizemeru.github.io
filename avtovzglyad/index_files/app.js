(function(){
    'use strict';

    var SUBSCRIBE_TITLES = ['Подписаться на уведомления', 'Отменить подписку на уведомления'];
    var KEY_FOR_STATE = 'realPushAvState';
    var API_ENDPOINT = '/api/fcm/token/';
    var $SUBSCRIBE_LINK = $('.subscribe_link');

    var StateObj = {
        _defaultState: {'tokenSent': false, 'tokenValue': null, 'enabledByUser': false, 'wasBlockedByUser': false},

        isTokenChanged: function(currentToken) {
            return this.get().tokenValue == currentToken;
        },

        get: function() {
            var localData = window.localStorage.getItem(KEY_FOR_STATE);
            return localData ? JSON.parse(localData) : this._defaultState;
        },

        set: function(newState) {
            var savedState = this.get();
            for(var key in this._defaultState) {
                if(newState.hasOwnProperty(key)) {
                    savedState[key] = newState[key];
                }
            }
            window.localStorage.setItem(KEY_FOR_STATE, JSON.stringify(savedState));
        },

        setDefaultState: function() {
            this.set(this._defaultState);
        }
    };

    var NotificationState = {
        getPermissions: function() {
            return Notification.permission;
        },

        isDefaultState: function() {
            return this.getPermissions() === 'default';
        },

        isEnabledInBrowser: function() {
            return this.getPermissions() === 'granted';
        },

        isDisabledInBrowser: function() {
            return this.getPermissions() == 'denied';
        },

        isBrowserCompatible: function() {
            return 'Notification' in window;
        }
    };

    var PushService = {
        _submitting: false,
        _engine: null,

        getToken: function(callback) {
            PushService._engine.getToken().then(callback).catch(function(err) {
                console.log('Error retrieving Instance ID token. ', err);
            });
        },

        submitToken: function(currentToken, anyCallback) {
            if(PushService._submitting || StateObj.get().tokenSent) {
                return false;
            }
            PushService._submitting = true;
            $.post(API_ENDPOINT, {token: currentToken}, function() {
                PushService._submitting = false;
                StateObj.set({tokenSent: true, tokenValue: currentToken, enabledByUser: true});
                if(anyCallback) { anyCallback(); }
            }).error(function(err) {
                PushService._submitting = false;
                console.log('Unable to sumbit token. ', err);
                if(anyCallback) { anyCallback(); }
            });
        },

        fetchAndSubmitToken: function() {
            PushService.getToken(function(newToken) {
                PushService.submitToken(newToken, function() {
                    PushService.updateInterface();
                });
            });
        },

        fetchAndUnsibscribe: function() {
            PushService.getToken(function(currentToken) {
                PushService.unsibscribe(currentToken);
            });
        },

        unsibscribeInner: function(currentToken) {
            StateObj.setDefaultState();
            PushService.updateInterface();
            $.ajax({url: API_ENDPOINT, data: {token: currentToken}, type: 'DELETE'});
        },

        unsibscribe: function(currentToken) {
            PushService._engine.deleteToken(currentToken).then(function() {
                PushService.unsibscribeInner(currentToken);
            }).catch(function(err) {
                console.log('Unable to delete token. ', err);
                PushService.unsibscribeInner(currentToken);
            });
        },

        subscribe: function() {
            PushService._engine.requestPermission().then(function() {
                if(!StateObj.get().tokenSent) {
                    StateObj.set({tokenValue: null, tokenSent: false, enabledByUser: true});
                    PushService.fetchAndSubmitToken();
                }
            }).catch(function(err) {
                console.log('Unable to get permission to notify.', err);
            });
        },

        handleOnMessage: function() {
            PushService._engine.onMessage(function(payload) {
                // Let's check whether notification permissions have already been granted
                console.debug('We got push payload: ', payload, 'Current permissions:', NotificationState.isEnabledInBrowser());
                if(NotificationState.isEnabledInBrowser()) {
                    // If it's okay let's create a notification
                    var notification = new Notification(payload.notification.title, {
                        body: payload.notification.body,
                        icon: payload.notification.icon,
                    });
                    notification.onclick = function(event) {
                        event.preventDefault(); // prevent the browser from focusing the Notification's tab
                        window.open(payload.notification.click_action , '_blank');
                        notification.close();
                    };
                }
                return Promise.resolve('Dummy response to keep the console quiet');
            });
        },

        handleSubscribeLinkClick: function() {
            $SUBSCRIBE_LINK.on('click', function() {
                StateObj.get().enabledByUser ? PushService.fetchAndUnsibscribe() : PushService.subscribe();
                return false;
            });
        },

        updateInterface: function() {
            $SUBSCRIBE_LINK.text(SUBSCRIBE_TITLES[+StateObj.get().enabledByUser]);
        },

        init: function() {
            if(!NotificationState.isBrowserCompatible()) {
                console.log("This browser does not support system notifications");
                return false;
            }

            PushService._engine = firebase.messaging();
            PushService.handleOnMessage();
            PushService.handleSubscribeLinkClick();
            PushService.updateInterface();

            var currentState = StateObj.get();
            // basic default case - new user
            if(NotificationState.isDefaultState()) {
                PushService.subscribe();
            }
            // if pushes already enabled and
            // user doesnt manually disabled pushes by our interface
            // here we need to check some technical issues (not synced token/new token)
            else if(NotificationState.isEnabledInBrowser()) {
                if(currentState.wasBlockedByUser) {
                    PushService.subscribe();
                    StateObj.set({wasBlockedByUser: false});
                } else if(!currentState.tokenSent && currentState.enabledByUser) {
                    PushService.fetchAndSubmitToken();
                } else {
                    // this is a good case, all permissions, tokens - all fine
                    // so we need to check current tokenValue for differences
                    // and sumbit new token to the server
                    PushService.getToken(function(currentToken) {
                        if(StateObj.isTokenChanged(currentToken)) {
                            PushService.fetchAndSubmitToken();
                        }
                    });
                }
            // if pushes blocked by user, but enabled before
            // we need to force unsibscribe 
            } else if(NotificationState.isDisabledInBrowser()) {
                if(currentState.tokenValue && currentState.tokenSent) {
                    PushService.unsibscribe(currentState.tokenValue);
                    StateObj.set({wasBlockedByUser: true});
                }
            }
            // other cases not important or will be in the future
        }
    };

    PushService.init();
})();
