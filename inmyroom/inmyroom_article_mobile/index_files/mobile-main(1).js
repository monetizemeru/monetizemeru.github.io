

if (!window.videonowInited) {

(function (d) {
var js, s = document.getElementsByTagName('script')[0]; 
js = document.createElement('script'); 
js.defer = true; 
js.src = 'https://static.videonow.ru/vn_init.js?profileId=4096632';
s.parentNode.insertBefore(js, s); 
})(window.document);

window.videonowInited = true;

};

