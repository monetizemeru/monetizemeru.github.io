(window.webpackJsonp=window.webpackJsonp||[]).push([[36],{772:function(t,e,n){"use strict";function r(t,e,n,r){var i,o=arguments.length,s=o<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,n,r);else for(var a=t.length-1;0<=a;a--)(i=t[a])&&(s=(o<3?i(s):3<o?i(e,n,s):i(e,n))||s);return 3<o&&s&&Object.defineProperty(e,n,s),s}n.r(e),n(496);var i,o=n(499);function s(){var t=null!==a&&a.apply(this,arguments)||this;return t.docUrlPrefix="/doc/",t.hide=!0,t.isSelfLink=!1,t}i=function(t,e){return(i=Object.setPrototypeOf||({__proto__:[]}instanceof Array?function(t,e){t.__proto__=e}:function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])}))(t,e)},n(216);var a=o.d,l=s,c=a;if("function"!=typeof c&&null!==c)throw new TypeError("Class extends value "+String(c)+" is not a constructor or null");function u(){this.constructor=l}i(l,c),l.prototype=null===c?Object.create(c):(u.prototype=c.prototype,new u),Object.defineProperty(s.prototype,"getLinkTarget",{get:function(){return this.isSelfLink?"_self":"_blank"},enumerable:!1,configurable:!0}),s.prototype.created=function(){var t=(null==(t=null==(t=window.__storage__)?void 0:t.lentaBanners)?void 0:t.twoAnnounces)||[];this.order<=t.length&&(t=t[this.order],this.hide=!t,this.hide||(this.title=t.Title||"",this.subtitle=t.Subtitle||"",this.href=t.Link||"".concat(this.docUrlPrefix).concat(t.DocId),this.tag=t.Category||"На правах рекламы",this.isSelfLink=!!t.IsSelfLink))},r([Object(o.c)(Number)],s.prototype,"order",void 0),c=r([o.a],s),o=n(504),n=Object(o.a)(c,function(){var t=this,e=t._self._c;return t._self._setupProxy,t.hide?t._e():e("article",{staticClass:"aside_news__item"},[e("div",{staticClass:"aside_news__text"},[e("h2",{staticClass:"aside_news__date"},[t.tag?e("span",{domProps:{innerHTML:t._s(t.tag)}}):t._e()]),t._v(" "),t.title?e("h3",{staticClass:"aside_news__name"},[e("a",{staticClass:"link link_overlay",attrs:{href:t.href,target:t.getLinkTarget},domProps:{innerHTML:t._s(t.title)}})]):t._e(),t._v(" "),t.subtitle?e("h4",{staticClass:"aside_news__subheader",domProps:{innerHTML:t._s(t.subtitle)}}):t._e()])])},[],!1,null,null,null),e.default=n.exports}}]);