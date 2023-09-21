firebase.initializeApp(config_firebase);

var last_message_link = '';

var messaging = firebase.messaging(); 

if (
    'Notification' in window &&
    'serviceWorker' in navigator &&
    'localStorage' in window &&
    'fetch' in window &&
    'postMessage' in window
) {
    checkSubscription().then(function(){
		messaging.usePublicVapidKey(config_firebase.publicVapidKey);
		getToken();
		// handle catch the notification on current page
		messaging.onMessage(function(payload) {
			// регистрируем пустой ServiceWorker каждый раз
			navigator.serviceWorker.register('/sw-empty.js');
			// запрашиваем права на показ уведомлений если еще не получили их
			Notification.requestPermission(function(result) {
				console.log('Notification.requestPermission', result);
				if (result === 'granted') {
					navigator.serviceWorker.ready.then(function(registration) {
						console.log('navigator.serviceWorker.ready', registration);
						if (last_message_link != payload.data.click_action) {
							last_message_link = payload.data.click_action;
							// теперь мы можем показать уведомление
							return registration.showNotification(payload.data.title, {
								body: payload.data.body,
								icon: payload.data.icon,
								tag: payload.data.tag,
								link: payload.data.click_action,
								data: {
									click_action: payload.data.click_action
								}
							  });
						}
						return Promise.reject(new Error("This message was sended early!"));
					}).catch(function(error) {
						console.log('ServiceWorker registration failed', error);
					});
				}
			});
		});

		// Callback fired if Instance ID token is updated.
		messaging.onTokenRefresh(function() {
			messaging.getToken()
				.then(function(refreshedToken) {
					console.log('Token refreshed');
					// Send Instance ID token to app server.
					sendTokenToServer(refreshedToken);
					//updateUIForPushEnabled(refreshedToken);
				})
				.catch(function(error) {
					console.log('Unable to retrieve refreshed token', error);
				});
		});
	}).catch(function (err) {
        console.log('ServiceWorker registration failed: ', err);
    });

} else {
    if (!('Notification' in window)) {
        console.log('Notification not supported');
    } else if (!('serviceWorker' in navigator)) {
        console.log('ServiceWorker not supported');
    } else if (!('localStorage' in window)) {
        console.log('LocalStorage not supported');
    } else if (!('fetch' in window)) {
        console.log('fetch not supported');
    } else if (!('postMessage' in window)) {
        console.log('postMessage not supported');
    }

    console.warn('This browser does not support desktop notification.');
    console.log('Is HTTPS', window.location.protocol === 'https:');
    console.log('Support Notification', 'Notification' in window);
    console.log('Support ServiceWorker', 'serviceWorker' in navigator);
    console.log('Support LocalStorage', 'localStorage' in window);
    console.log('Support fetch', 'fetch' in window);
    console.log('Support postMessage', 'postMessage' in window);
}

function createFrame(src)
{
    var i = document.createElement("iframe");
    i.setAttribute("src", src);
    i.style.width = "0";
    i.style.height = "0";
    i.style.border = "none";
    i.style.position = "absolute";
    i.style.top = "0";
    i.style.left = "0";
    i.style.visibility = "hidden";
    i.style.overflow = "hidden";
    document.body.appendChild(i);
}

function checkSubscription()
{
    var hosts = fishki && fishki.params && fishki.params.subscriptions_hosts || ['m.fishki.net', 'old.fishki.net', 'fishki.net'];
    var check = fishki && fishki.params && fishki.params.check_subscriptions || 'fishki.net';
    var host = window.location.hostname + (window.location.port ? ":" + window.location.port : "");
    var key = 'subscription_searched_' + host;
    if (hosts.indexOf(host) > -1) {
        hosts.splice(hosts.indexOf(host), 1);
    }
    var domains = hosts.length;
    return new Promise(function(resolve, reject) {
        function service(e) {
            if (e.origin.indexOf(check) > -1) {
                
				if (e.data === 'servicefounded') {
                    localStorage.setItem(key, 'servicefounded');
                    return reject(true);
                } else if (e.data === 'servicenot') {
                    domains--;
                    if (domains < 1) {
                        return resolve(true);
                    }
                }
            }
        }
        if (domains < 1) {
            return resolve(true);
        }
        if (localStorage.getItem(key) == 'servicefounded') {
            return reject(true);
        } else if (localStorage.getItem(key) == 'serviceonthihost') {
            return resolve(true);
        } else {
            window.addEventListener('message', service, false);
            for (var i=0; i<hosts.length; i++) {
                createFrame(location.protocol + '//' + hosts[i] + '/notification/FCM');
            }
        }
    });
}



function deleteToken() {
	// Delete Instance ID token.
	messaging.getToken()
		.then(function(currentToken) {
			messaging.deleteToken(currentToken)
				.then(function() {
					console.log('Token deleted');
					setTokenSentToServer(false);
				})
				.catch(function(error) {
					console.log('Unable to delete token', error);
				});
		})
		.catch(function(error) {
			console.log('Error retrieving Instance ID token', error);
		});
}


function getToken() {
    messaging.requestPermission()
        .then(function() {
            // Get Instance ID token. Initially this makes a network call, once retrieved
            // subsequent calls to getToken will return from cache.
            messaging.getToken()
                .then(function(currentToken) {

                    if (currentToken) {
                        sendTokenToServer(currentToken);
                    } else {
                        console.log('No Instance ID token available. Request permission to generate one');
                        setTokenSentToServer(false);
                    }
                })
                .catch(function(error) {
                    console.log('An error occurred while retrieving token', error);
                    setTokenSentToServer(false);
                });
        })
        .catch(function(error) {
            console.log('Unable to get permission to notify', error);
        });
}



// Send the Instance ID token your application server, so that it can:
// - send messages back to this app
// - subscribe/unsubscribe the token from topics
function sendTokenToServer(currentToken) {
    if (!isTokenSentToServer(currentToken)) {
        console.log('Sending token to server... ', currentToken);
        // send current token to server
		$.post('/notification/updateFirebaseToken', {token: currentToken});
		
        setTokenSentToServer(currentToken);
    } else {
        console.log('Token already sent to server so won\'t send it again unless it changes ', currentToken);
    }
}

function isTokenSentToServer(currentToken) {
    var ls_token = window.localStorage.getItem('sentFirebaseMessagingToken'+fb_project_name),
	ls_user = parseInt(window.localStorage.getItem('sentFirebaseMessagingTokenUser'+fb_project_name));
	return ls_token === currentToken && (ls_user === id_user_token || id_user_token == 0);
}

function setTokenSentToServer(currentToken) {
    if (currentToken) {
        window.localStorage.setItem('sentFirebaseMessagingToken'+fb_project_name, currentToken);
		window.localStorage.setItem('sentFirebaseMessagingTokenUser'+fb_project_name, id_user_token);
    } else {
        window.localStorage.removeItem('sentFirebaseMessagingToken'+fb_project_name);
    }
}


