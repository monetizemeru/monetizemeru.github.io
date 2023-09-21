if (typeof(load_login_box)=="undefined") {
    var s = document.createElement('script');
    s.type='text/javascript';
    s.async = 'async';
    s.defer = 'defer';
    s.src='https://www.google.com/recaptcha/api.js?onload=postOnloadCallback&render=' + fishki.params.recaptchav3;
    document.body.appendChild(s);
    load_login_box = true;

    var postOnloadCallback = function(callback) {
        if (typeof grecaptcha != 'undefined') {
            grecaptcha.ready(function() {
                $('.disabledurl').removeClass('disabledurl');
            });
        }
    }

    var loginOnloadCallback = function(callback, action) {
        action = action || 'login';
        grecaptcha.ready(function() {
          grecaptcha.execute(fishki.params.recaptchav3, {action: action}).then(function(token) {
              window.login_w_captcha = token;
              $("input[name='token']").val(token);
              $("input[name='commenttoken']").val(token);
              $("input[name='ua']").val(typeof getUAData === 'function' ? JSON.stringify(getUAData()) : '');
              if (callback) {
                  callback();
              }
          });
        });
    };

    var hrefOnloadCallback = function(t) {
        grecaptcha.ready(function() {
          grecaptcha.execute(fishki.params.recaptchav3, {action: 'login'}).then(function(token) {
              $("input[name='token']").val(token);
              $("input[name='commenttoken']").val(token);
              $("input[name='ua']").val(typeof getUAData === 'function' ? JSON.stringify(getUAData()) : '');                                                                                              
              document.location.href = $(t).attr('href') + "?c=" + token;
          });
        });
        return false;
    };

    var submitOnloadCallback = function(t) {
        grecaptcha.ready(function() {
          grecaptcha.execute(fishki.params.recaptchav3, {action: 'comment'}).then(function(token) {
              $("input[name='token']").val(token);
              $("input[name='commenttoken']").val(token);
              $("input[name='ua']").val(typeof getUAData === 'function' ? JSON.stringify(getUAData()) : '');                                                                                              
              $(t).closest('form').submit();
          });
        });
        return false;
    };
} else {
  postOnloadCallback();
}