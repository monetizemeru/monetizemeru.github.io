(window.webpackJsonp=window.webpackJsonp||[]).push([[35],{771:function(e,t,n){"use strict";function r(e,t,n,r){var o,c=arguments.length,a=c<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,r);else for(var u=e.length-1;0<=u;u--)(o=e[u])&&(a=(c<3?o(a):3<c?o(t,n,a):o(t,n))||a);return 3<c&&a&&Object.defineProperty(t,n,a),a}n.r(t),n(496);var o=n(499);function c(){var e=null!==u&&u.apply(this,arguments)||this;return e.banner="",e}var a=function(e,t){return(a=Object.setPrototypeOf||({__proto__:[]}instanceof Array?function(e,t){e.__proto__=t}:function(e,t){for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}))(e,t)},u=o.d,i=c,l=u;if("function"!=typeof l&&null!==l)throw new TypeError("Class extends value "+String(l)+" is not a constructor or null");function p(){this.constructor=i}a(i,l),i.prototype=null===l?Object.create(l):(p.prototype=l.prototype,new p),c.prototype.runBanner=function(){var n=this.$refs.banner,e=document.createElement("div");e.innerHTML=this.banner;try{var t=e.querySelector('[id*="adfox"]').id;document.querySelectorAll("#".concat(t)).forEach(function(e){return e.removeAttribute("id")})}catch(e){}var t=e.querySelectorAll("script"),r=Array.from(t).map(function(e){return e.innerText});Array.from(t).forEach(function(e){return e.remove()}),n.innerHTML=e.innerHTML;try{r.forEach(function(e){var t=document.createElement("script");t.innerHTML=e,n.appendChild(t)})}catch(e){}},c.prototype.unescapeHTML=function(e){var t=document.createElement("textarea");return t.innerHTML=e,t.textContent},c.prototype.created=function(){var e;this.banner=this.unescapeHTML(null!=(e=null==(e=null==(e=window.__storage__)?void 0:e.lentaBanners)?void 0:e.businessAnnounce)?e:"")},r([Object(o.e)("banner")],c.prototype,"runBanner",null),l=r([o.a],c),o=n(504),n=Object(o.a)(l,function(){var e=this._self._c;return this._self._setupProxy,e("div",{ref:"banner"})},[],!1,null,null,null),t.default=n.exports}}]);