(function (w, d, c) {
    var ad = {"type":"inimage-gwd-frame","src":{"type":"mt","href":["index.html","index2.html"]},"closeButton":{"right":true,"margin":"0","top":0,"size":1,"color":"#000","background":"rgba(255, 255, 255, .5)","full":{"margin":"0","top":0,"size":1,"color":"#000","background":"rgba(255, 255, 255, .5)"}},"click":true,"counter":{"color":"#fff","background":"#000"}};

    w.ad_043c2ec6c6390dd0ac5519190a57c88c = function (o) {
        w['_mt_stack'] = w['_mt_stack'] || [];
		w['_mt_stack'].push({mt: o, ad: ad, lib: {css: 'https://catsnetwork.ru/storage/banners/lib.css'}});

		w[c] = function () {
            return w['_mt_stack'].pop();
        };

        var s = d.createElement('script');
        var f = function () {
            d.body.appendChild(s);
        };
        s.type = 'text/javascript';
        s.async = true;
        s.src = 'https://catsnetwork.ru/storage/banners/lib.js';
        if (w.opera === '[object Opera]') {
            d.addEventListener('DOMContentLoaded', f, false);
        } else {
            f();
        }
    }
})(window, document, '_mt_callback');