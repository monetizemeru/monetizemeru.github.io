(window.webpackJsonp=window.webpackJsonp||[]).push([[37],{550:function(t,e,n){"use strict";function s(t,e,n,s){var a,o=arguments.length,i=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,n):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(t,e,n,s);else for(var r=t.length-1;0<=r;r--)(a=t[r])&&(i=(o<3?a(i):3<o?a(e,n,i):a(e,n))||i);3<o&&i&&Object.defineProperty(e,n,i)}n.d(e,"a",function(){return l}),n(496),n(52);var a,o,e=n(499),i=n(554),r=(a=function(t,e){return(a=Object.setPrototypeOf||({__proto__:[]}instanceof Array?function(t,e){t.__proto__=e}:function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])}))(t,e)},n(216)),l=(function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function n(){this.constructor=t}a(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}(c,o=e.d),c.prototype.gearHandler=function(t){var e,n,s,a=this;try{null!=(s=null==(n=null==(e=window.kommersant)?void 0:e.user)?void 0:n.ready)&&s.then(function(){var t;window.kommersant.sendEvent(a.getLentaIsVertical?"gear":"gear_horisontal","click",a.getAuthorized?"auth.".concat(null==(t=null==(t=null==(t=window.kommersant)?void 0:t.user)?void 0:t.data)?void 0:t.UserId):"unauth")}).catch(function(){})}catch(t){}this.getAuthorized||(t.preventDefault(),this.createNotification())},c.prototype.createNotification=function(){var t;window.kommersant&&window.kommersant.Notification?(!this.notification||null!=(t=this.notification)&&t.isClosed)&&(this.notification=new window.kommersant.Notification('Кто Вы? <a href="#" class="user-register">Зарегистрируйтесь</a> или <a href="#" class="user-login">войдите</a>.')):alert("Пожалуйста авторизуйтесь.")},c.prototype.personalLentaHandler=function(t){var e,n,s,a=this;if(this.getAuthorized){if(!this.getIsPersonalOnly)try{null!=(s=null==(n=null==(e=null===window||void 0===window?void 0:window.kommersant)?void 0:e.user)?void 0:n.ready)&&s.then(function(){var t;window.kommersant.sendEvent(a.getLentaIsVertical?"my_lenta":"my_lenta_horisontal","click","auth.".concat(null==(t=null==(t=null==(t=null===window||void 0===window?void 0:window.kommersant)?void 0:t.user)?void 0:t.data)?void 0:t.UserId))}).catch(function(){})}catch(t){}}else try{window.kommersant.sendEvent(this.getLentaIsVertical?"yours_lenta":"yours_lenta_horisontal","click")}catch(t){}this.getAuthorized?(t.preventDefault(),this.setIsPersonalOnly(!this.getIsPersonalOnly),this.setIsBusinessOnly(!1),this.setStartLoading(),this.fetchArticlesData()):(t.preventDefault(),this.createNotification())},c.prototype.clickDocHandler=function(){try{window.kommersant.sendEvent(this.getLentaIsVertical?"vertical_lenta":"horisont_lenta",this.getLentaIsVertical?"click":"click.doc")}catch(t){}},c.prototype.sendMyLentaEvent=function(t,e){var n,s,a,o=this;if(!t&&this.getAuthorized)try{null!=(a=null==(s=null==(n=null===window||void 0===window?void 0:window.kommersant)?void 0:n.user)?void 0:s.ready)&&a.then(function(){var t;window.kommersant.sendEvent(o.getLentaIsVertical?"my_lenta":"my_lenta_horisontal","show","auth.".concat(null==(t=null==(t=null==(t=null===window||void 0===window?void 0:window.kommersant)?void 0:t.user)?void 0:t.data)?void 0:t.UserId))}).catch(function(){})}catch(t){}},c.prototype.sendShowEvents=function(){var t,e,n,s=this;if(this.getLentaIsVertical)try{window.kommersant.sendEvent("vertical_lenta","show")}catch(t){}if(!this.getIsPersonalOnly&&this.getAuthorized)try{null!=(n=null==(e=null==(t=null===window||void 0===window?void 0:window.kommersant)?void 0:t.user)?void 0:e.ready)&&n.then(function(){var t;window.kommersant.sendEvent(s.getLentaIsVertical?"my_lenta":"my_lenta_horisontal","show","auth.".concat(null==(t=null==(t=null==(t=null===window||void 0===window?void 0:window.kommersant)?void 0:t.user)?void 0:t.data)?void 0:t.UserId))}).catch(function(){})}catch(t){}if(!this.getAuthorized)try{window.kommersant.sendEvent(this.getLentaIsVertical?"yours_lenta":"yours_lenta_horisontal","show")}catch(t){}try{window.kommersant.sendEvent("business_news","show")}catch(t){}try{window.kommersant.sendEvent(this.getLentaIsVertical?"gear":"gear_horisontal","show")}catch(t){}},Object.defineProperty(c.prototype,"getArticles",{get:function(){var t=this.getArticlesData.docs||[],e=this.getArticlesData.docs||[],e=this.getIsPersonalOnly?e:t;return this.getLentaIsVertical?e:e.slice(0,10)},enumerable:!1,configurable:!0}),c.prototype.articlesDeliveredButtonHandler=function(){return t=this,r=function(){return s=this,a=function(t){switch(t.label){case 0:if(this.getIsLoading)return[3,2];try{window.kommersant.sendEvent("new_news","click")}catch(t){}return this.setStartLoading(),[4,this.fetchArticlesData()];case 1:t.sent(),t.label=2;case 2:return[2]}},l={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]},c={next:t(0),throw:t(1),return:t(2)},"function"==typeof Symbol&&(c[Symbol.iterator]=function(){return this}),c;function t(n){return function(t){var e=[n,t];if(o)throw new TypeError("Generator is already executing.");for(;l=c&&e[c=0]?0:l;)try{if(o=1,i&&(r=2&e[0]?i.return:e[0]?i.throw||((r=i.return)&&r.call(i),0):i.next)&&!(r=r.call(i,e[1])).done)return r;switch(i=0,(e=r?[2&e[0],r.value]:e)[0]){case 0:case 1:r=e;break;case 4:return l.label++,{value:e[1],done:!1};case 5:l.label++,i=e[1],e=[0];continue;case 7:e=l.ops.pop(),l.trys.pop();continue;default:if(!(r=0<(r=l.trys).length&&r[r.length-1])&&(6===e[0]||2===e[0])){l=0;continue}if(3===e[0]&&(!r||e[1]>r[0]&&e[1]<r[3]))l.label=e[1];else if(6===e[0]&&l.label<r[1])l.label=r[1],r=e;else{if(!(r&&l.label<r[2])){r[2]&&l.ops.pop(),l.trys.pop();continue}l.label=r[2],l.ops.push(e)}}e=a.call(s,l)}catch(t){e=[6,t],i=0}finally{o=r=0}if(5&e[0])throw e[1];return{value:e[0]?e[1]:void 0,done:!0}}}var s,a,o,i,r,l,c},i=void 0,new(i=Promise)(function(n,e){function s(t){try{o(r.next(t))}catch(t){e(t)}}function a(t){try{o(r.throw(t))}catch(t){e(t)}}function o(t){var e;t.done?n(t.value):((e=t.value)instanceof i?e:new i(function(t){t(e)})).then(s,a)}o((r=r.apply(t,[])).next())});var t,i,r},c.prototype.getFormattedTime=function(t){return t=new Date(1e3*t||0),"".concat(t.getHours(),":").concat(1==String(t.getMinutes()).length?"0"+t.getMinutes():t.getMinutes())},c.prototype.getFormattedDate=function(t){return"".concat(new Date(t||0))},c.prototype.selectBusinessOnlyHandler=function(t){t=t.target.checked,this.setIsBusinessOnly(t),this.fetchArticlesData();try{window.kommersant.sendEvent("business_news","click")}catch(t){}},s([i.b],c.prototype,"getIsBusinessOnly",void 0),s([i.b],c.prototype,"getIsPersonalOnly",void 0),s([i.b],c.prototype,"getAuthorized",void 0),s([i.b],c.prototype,"getArticlesData",void 0),s([i.b],c.prototype,"getIsLoading",void 0),s([i.b],c.prototype,"getLentaIsVertical",void 0),s([i.b],c.prototype,"getNewArticlesCounter",void 0),s([i.b],c.prototype,"getIsToolguideClosed",void 0),s([i.b],c.prototype,"getToolguideExpiresAt",void 0),s([i.a],c.prototype,"fetchArticlesData",void 0),s([i.c],c.prototype,"setIsBusinessOnly",void 0),s([i.c],c.prototype,"setIsPersonalOnly",void 0),s([i.c],c.prototype,"setStartLoading",void 0),s([i.c],c.prototype,"setClearNewArticlesCounter",void 0),s([i.c],c.prototype,"setIsToolguideClosed",void 0),s([i.c],c.prototype,"setToolguideExpiresAt",void 0),s([Object(e.e)("getIsPersonalOnly")],c.prototype,"sendMyLentaEvent",null),c);function c(){var t=null!==o&&o.apply(this,arguments)||this;return t.adjustLentaHref=r.adjustLentaHref,t.lentaHref=r.lentaHref,t.docUrlPrefix="/",t}},770:function(t,e,n){"use strict";function s(t,e,n,s){var a,o=arguments.length,i=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,n):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(t,e,n,s);else for(var r=t.length-1;0<=r;r--)(a=t[r])&&(i=(o<3?a(i):3<o?a(e,n,i):a(e,n))||i);return 3<o&&i&&Object.defineProperty(e,n,i),i}n.r(e),n(496),n(52);var a=n(499),o=n(550),i=n(552),r=n(553);function l(){var t,e=this;return(e=u.apply(this,arguments)||this).isOpen=!1,e.isStandalone=!(null==(t=window.kommersant)||!t.isStandalone),e}var c=function(t,e){return(c=Object.setPrototypeOf||({__proto__:[]}instanceof Array?function(t,e){t.__proto__=e}:function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])}))(t,e)},u=o.a,d=l;if("function"!=typeof(o=u)&&null!==o)throw new TypeError("Class extends value "+String(o)+" is not a constructor or null");function _(){this.constructor=d}c(d,o),d.prototype=null===o?Object.create(o):(_.prototype=o.prototype,new _),l.prototype.hide=function(){this.isOpen=!1},l.prototype.actualHref=function(t){return(this.isStandalone||1===t.ProjectId?"/":"//www.autopilot.ru/")+(t.IsPhotogallery?"gallery/":"doc/")+t.DocId+"?from=horizontal_lenta"},l.prototype.linkTarget=function(t){return this.isStandalone||1===t.ProjectId?"_self":"_blank"},l.prototype.sendEvents=function(t){var e,n,s,a=this;if(t){this.sendShowEvents();try{null!=(s=null==(n=null==(e=window.kommersant)?void 0:e.user)?void 0:n.ready)&&s.then(function(){var t;window.kommersant.sendEvent("horisont_lenta","click",a.getAuthorized&&null!=(t=null==(t=null==(t=window.kommersant)?void 0:t.user)?void 0:t.data)&&t.UserId?"auth.".concat(null==(t=null==(t=null==(t=window.kommersant)?void 0:t.user)?void 0:t.data)?void 0:t.UserId):"unauth")}).catch(function(){})}catch(t){}try{window.kommersant.sendEvent("horisont_lenta","show.doc")}catch(t){}}},l.prototype.gearHandler=function(t){u.prototype.gearHandler.call(this,t)},l.prototype.personalLentaHandler=function(t){u.prototype.personalLentaHandler.call(this,t)},l.prototype.articlesDeliveredButtonHandler=function(){return t=this,r=function(){return s=this,a=function(t){return u.prototype.articlesDeliveredButtonHandler.call(this),[2]},l={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]},c={next:t(0),throw:t(1),return:t(2)},"function"==typeof Symbol&&(c[Symbol.iterator]=function(){return this}),c;function t(n){return function(t){var e=[n,t];if(o)throw new TypeError("Generator is already executing.");for(;l=c&&e[c=0]?0:l;)try{if(o=1,i&&(r=2&e[0]?i.return:e[0]?i.throw||((r=i.return)&&r.call(i),0):i.next)&&!(r=r.call(i,e[1])).done)return r;switch(i=0,(e=r?[2&e[0],r.value]:e)[0]){case 0:case 1:r=e;break;case 4:return l.label++,{value:e[1],done:!1};case 5:l.label++,i=e[1],e=[0];continue;case 7:e=l.ops.pop(),l.trys.pop();continue;default:if(!(r=0<(r=l.trys).length&&r[r.length-1])&&(6===e[0]||2===e[0])){l=0;continue}if(3===e[0]&&(!r||e[1]>r[0]&&e[1]<r[3]))l.label=e[1];else if(6===e[0]&&l.label<r[1])l.label=r[1],r=e;else{if(!(r&&l.label<r[2])){r[2]&&l.ops.pop(),l.trys.pop();continue}l.label=r[2],l.ops.push(e)}}e=a.call(s,l)}catch(t){e=[6,t],i=0}finally{o=r=0}if(5&e[0])throw e[1];return{value:e[0]?e[1]:void 0,done:!0}}}var s,a,o,i,r,l,c},i=void 0,new(i=Promise)(function(n,e){function s(t){try{o(r.next(t))}catch(t){e(t)}}function a(t){try{o(r.throw(t))}catch(t){e(t)}}function o(t){var e;t.done?n(t.value):((e=t.value)instanceof i?e:new i(function(t){t(e)})).then(s,a)}o((r=r.apply(t,[])).next())});var t,i,r},l.prototype.selectBusinessOnlyHandler=function(t){u.prototype.selectBusinessOnlyHandler.call(this,t)},l.prototype.clickDocHandler=function(){u.prototype.clickDocHandler.call(this)},l.prototype.mounted=function(){try{window.kommersant.sendEvent("horisont_lenta","show")}catch(t){}},s([Object(a.e)("isOpen")],l.prototype,"sendEvents",null),o=s([Object(a.a)({components:{BusinessAnnounce:function(){return{component:n.e(35).then(n.bind(null,771)),loading:i.a,error:r.a}},CommercialAnnounce:function(){return{component:n.e(36).then(n.bind(null,772)),loading:i.a,error:r.a}}}})],l),a=n(504),a=Object(a.a)(o,function(){var a=this,n=a._self._c;return a._self._setupProxy,n("div",{directives:[{name:"click-outside",rawName:"v-click-outside",value:{handler:a.hide,exclude:["button"]},expression:"{handler:hide, exclude:['button']}"}]},[n("input",{directives:[{name:"model",rawName:"v-model",value:a.isOpen,expression:"isOpen"}],staticClass:"hide",attrs:{type:"checkbox",id:"news_lenta_compact"},domProps:{checked:Array.isArray(a.isOpen)?-1<a._i(a.isOpen,null):a.isOpen},on:{change:function(t){var e,n=a.isOpen,s=!!(t=t.target).checked;Array.isArray(n)?(e=a._i(n,null),t.checked?e<0&&(a.isOpen=n.concat([null])):-1<e&&(a.isOpen=n.slice(0,e).concat(n.slice(e+1)))):a.isOpen=s}}}),a._v(" "),n("section",{staticClass:"basement_news"},[n("header",{staticClass:"basement_news__header"},[n("div",{staticClass:"layout"},[n("h2",{staticClass:"basement_news__title"},[n("a",{staticClass:"basement_news__link basement_news__header_link",attrs:{href:a.lentaHref}},[a._v("Лента")])]),a._v(" "),a.isStandalone?a._e():n("div",{staticClass:"basement_news__header_body hide_closed"},[n("a",{staticClass:"basement_news__options",style:{cursor:"pointer"},attrs:{href:a.getAuthorized?null:a.adjustLentaHref},on:{click:a.personalLentaHandler}},[n("span",{staticClass:"basement_news__small_name"},[a._v(a._s(a.getAuthorized?"Показать":"Настроить")+" "+a._s(a.getIsPersonalOnly?"всю":"свою"))])]),a._v(" "),n("a",{staticClass:"basement_news__options basement_news__control",attrs:{href:a.adjustLentaHref,target:a.getAuthorized?"_blank":"_self"},on:{click:a.gearHandler}},[n("span",{staticClass:"vicon vicon--sprocket"},[n("svg",{staticClass:"vicon__body"},[n("use",{attrs:{"xmlns:xlink":"http://www.w3.org/1999/xlink","xlink:href":"#vicon-sprocket"}})])])]),a._v(" "),n("input",{staticClass:"ui-tumbler_trigger",attrs:{type:"checkbox",id:"business_lenta_down",disabled:a.getIsPersonalOnly},domProps:{checked:a.getIsBusinessOnly},on:{input:a.selectBusinessOnlyHandler}}),a._v(" "),n("label",{staticClass:"ui-tumbler basement_news__control",attrs:{for:"business_lenta_down"}},[n("span",{class:["ui-tumbler__name","basement_news__small_name",a.getIsPersonalOnly?"disabled":""]},[a._v("\n                            Только деловые новости\n                        ")]),a._v(" "),n("div",{class:["ui-tumbler__box",a.getIsPersonalOnly?"disabled":""],attrs:{"aria-hidden":"true"}},[n("span",{staticClass:"ui-tumbler__dot"})])])]),a._v(" "),n("div",{staticClass:"basement_news__aside_control"},[n("button",{directives:[{name:"show",rawName:"v-show",value:!!a.getNewArticlesCounter||!!a.getIsLoading,expression:"!!getNewArticlesCounter || !!getIsLoading"}],ref:"button",class:["ui-button","ui-button--standart",{"ui-button--indicator":!!a.getNewArticlesCounter},"basement_news__button"],attrs:{type:"button"},on:{click:a.articlesDeliveredButtonHandler}},[a.getIsLoading?[n("span",{staticClass:"ui-loader",staticStyle:{color:"white","margin-right":"1rem"}}),a._v(" Загрузка\n                      ")]:[a._v("\n                        "+a._s("".concat(a.getNewArticlesCounter<20?"+ ".concat(a.getNewArticlesCounter):"20 +"," новых"))+"\n                      ")]],2),a._v(" "),n("label",{staticClass:"basement_news__small_name basement_news__compact_trigger",attrs:{for:"news_lenta_compact",tabindex:"0"}},[n("span",{staticClass:"basement_news__tumbler_name hide_opened"},[a._v("\n                            Еще\n                        ")]),a._v(" "),n("span",{staticClass:"basement_news__tumbler_name hide_closed"},[a._v("\n                            Свернуть\n                        ")]),a._v(" "),n("span",{staticClass:"vicon vicon--rarrow vicon--gull_up"},[n("svg",{staticClass:"vicon__body"},[n("use",{attrs:{"xmlns:xlink":"http://www.w3.org/1999/xlink","xlink:href":"#vicon-rarrow"}})])])])])])]),a._v(" "),n("div",{staticClass:"layout basement_news__body"},[n("div",{staticClass:"basement_news__list"},[a._l(2,function(t){return a.getArticles&&a.getArticles.length?a._e():n("article",{class:["basement_news__item",1===t?"hide_opened":"hide_closed"]},[n("div",{staticClass:"basement_news__date",attrs:{"aria-hidden":"true"}}),a._v(" "),a._m(0,!0)])}),a._v(" "),a._l(5,function(t){return a.getArticles&&a.getArticles.length?a._e():n("article",{class:["basement_news__item","hide_closed"]},[n("div",{staticClass:"basement_news__date inline_placeholder",attrs:{"aria-hidden":"true"}}),a._v(" "),a._m(1,!0)])}),a._v(" "),a._l(a.getArticles,function(t,e){return a.getArticles&&a.getArticles.length?[0===e?n("article",{class:["basement_news__item","hide_opened"]},[n("h2",{staticClass:"basement_news__date"},[t.DateDoc?n("time",{staticClass:"basement_news__time",attrs:{datetime:a.getFormattedDate(t.DateDoc)}},[a._v("\n                                "+a._s(a.getFormattedTime(t.DateDoc))+"\n                            ")]):a._e(),a._v(" "),t.CrumbName?n("span",{staticClass:"basement_news__tag hide_closed",domProps:{innerHTML:a._s(t.CrumbName)}}):a._e()]),a._v(" "),n("div",{staticClass:"basement_news__text"},[n("h3",{staticClass:"basement_news__name"},[n("a",{staticClass:"basement_news__link link_overlay",attrs:{href:a.actualHref(t),target:a.linkTarget(t)},on:{click:a.clickDocHandler}},[t.IsPaid?[n("span",{staticClass:"vicon vicon--regwall vicon--mr_small"},[n("svg",{staticClass:"vicon__body"},[n("use",{attrs:{"xmlns:xlink":"http://www.w3.org/1999/xlink","xlink:href":"#vicon-kommersant_logo"}})])])]:a._e(),n("span",{staticClass:"vam",domProps:{innerHTML:a._s((t.SubtitleFirst?t.Subtitle:t.Title)||"")}})],2)]),a._v(" "),n("h4",{staticClass:"basement_news__subheader hide_closed"},[n("a",{staticClass:"basement_news__link",attrs:{href:a.actualHref(t),target:a.linkTarget(t)},domProps:{innerHTML:a._s((t.SubtitleFirst?t.Title:t.Subtitle)||"")},on:{click:a.clickDocHandler}})])])]):a._e(),a._v(" "),n("article",{class:["basement_news__item","hide_closed"]},[n("h2",{staticClass:"basement_news__date"},[t.DateDoc?n("time",{staticClass:"basement_news__time",attrs:{datetime:a.getFormattedDate(t.DateDoc)}},[a._v("\n                                "+a._s(a.getFormattedTime(t.DateDoc))+"\n                            ")]):a._e(),a._v(" "),t.CrumbName?n("span",{staticClass:"basement_news__tag",domProps:{innerHTML:a._s(t.CrumbName)}}):a._e()]),a._v(" "),n("div",{staticClass:"basement_news__text"},[n("h3",{staticClass:"basement_news__name"},[n("a",{staticClass:"basement_news__link link_overlay",attrs:{href:a.actualHref(t),target:a.linkTarget(t)},on:{click:a.clickDocHandler}},[t.IsPaid?[n("span",{staticClass:"vicon vicon--regwall vicon--mr_small"},[n("svg",{staticClass:"vicon__body"},[n("use",{attrs:{"xmlns:xlink":"http://www.w3.org/1999/xlink","xlink:href":"#vicon-kommersant_logo"}})])])]:a._e(),n("span",{staticClass:"vam"},[a._v(a._s((t.SubtitleFirst?t.Subtitle:t.Title)||""))])],2)]),a._v(" "),n("h4",{staticClass:"basement_news__subheader hide_closed"},[n("a",{staticClass:"basement_news__link",attrs:{href:a.actualHref(t),target:a.linkTarget(t)},domProps:{innerHTML:a._s((t.SubtitleFirst?t.Title:t.Subtitle)||"")},on:{click:a.clickDocHandler}})])])])]:a._e()}),a._v(" "),n("div",{staticClass:"basement_news__ads hide_closed"},[n("CommercialAnnounce",{attrs:{order:0}}),a._v(" "),n("CommercialAnnounce",{attrs:{order:1}}),a._v(" "),a.isStandalone?a._e():n("BusinessAnnounce")],1)],2)]),a._v(" "),n("footer",{staticClass:"basement_news__footer hide_closed"},[n("div",{staticClass:"layout"},[n("a",{staticClass:"basement_news__more",attrs:{href:a.lentaHref}},[a._v("Вся лента")])])])])])},[function(){var t=this._self._c;return this._self._setupProxy,t("div",{staticClass:"basement_news__text"},[t("h2",{staticClass:"basement_news__name"},[this._v("\n                            В вашей ленте пока нет новостей.\n                        ")])])},function(){var t=this,e=t._self._c;return t._self._setupProxy,e("div",{staticClass:"basement_news__text"},[e("div",{staticClass:"basement_news__text vh"},[t._v("Загрузка новости...")]),t._v(" "),e("div",{staticClass:"basement_news__name inline_placeholder",attrs:{"aria-hidden":"true"}}),t._v(" "),e("div",{staticClass:"basement_news__subheader inline_placeholder",attrs:{"aria-hidden":"true"}})])}],!1,null,null,null),e.default=a.exports}}]);