/*
PNotify 3.2.0 sciactive.com/pnotify/
(C) 2015 Hunter Perrin; Google, Inc.
license Apache-2.0
*/
!function(t,i){"function"==typeof define&&define.amd?define("pnotify",["jquery"],function(s){return i(s,t)}):"object"==typeof exports&&"undefined"!=typeof module?module.exports=i(require("jquery"),global||t):t.PNotify=i(t.jQuery,t)}("undefined"!=typeof window?window:this,function(t,i){var s=function(i){var e,o,n={dir1:"down",dir2:"left",push:"bottom",spacing1:36,spacing2:36,context:t("body"),modal:!1},a=t(i),r=function(){o=t("body"),c.prototype.options.stack.context=o,a=t(i),a.on("resize",function(){e&&clearTimeout(e),e=setTimeout(function(){c.positionAll(!0)},10)})},h=function(i){var s=t("<div />",{class:"ui-pnotify-modal-overlay"});return s.prependTo(i.context),i.overlay_close&&s.on('click',function(){c.removeStack(i)}),s},c=function(t){this.state="initializing",this.timer=null,this.animTimer=null,this.styles=null,this.elem=null,this.container=null,this.title_container=null,this.text_container=null,this.animating=!1,this.timerHide=!1,this.parseOptions(t),this.init()};return t.extend(c.prototype,{version:"3.2.0",options:{title:!1,title_escape:!1,text:!1,text_escape:!1,styling:"brighttheme",addclass:"",cornerclass:"",auto_display:!0,width:"300px",min_height:"16px",type:"notice",icon:!0,animation:"fade",animate_speed:"normal",shadow:!0,hide:!0,delay:8e3,mouse_reset:!0,remove:!0,insert_brs:!0,destroy:!0,stack:n},modules:{},runModules:function(t,i){var s;for(var e in this.modules)s="object"==typeof i&&e in i?i[e]:i,"function"==typeof this.modules[e][t]&&(this.modules[e].notice=this,this.modules[e].options="object"==typeof this.options[e]?this.options[e]:{},this.modules[e][t](this,"object"==typeof this.options[e]?this.options[e]:{},s))},init:function(){var i=this;return this.modules={},t.extend(!0,this.modules,c.prototype.modules),"object"==typeof this.options.styling?this.styles=this.options.styling:this.styles=c.styling[this.options.styling],this.elem=t("<div />",{class:"ui-pnotify "+this.options.addclass,css:{display:"none"},"aria-live":"assertive","aria-role":"alertdialog",mouseenter:function(t){if(i.options.mouse_reset&&"out"===i.animating){if(!i.timerHide)return;i.cancelRemove()}i.options.hide&&i.options.mouse_reset&&i.cancelRemove()},mouseleave:function(t){i.options.hide&&i.options.mouse_reset&&"out"!==i.animating&&i.queueRemove(),c.positionAll()}}),"fade"===this.options.animation&&this.elem.addClass("ui-pnotify-fade-"+this.options.animate_speed),this.container=t("<div />",{class:this.styles.container+" ui-pnotify-container "+("error"===this.options.type?this.styles.error:"info"===this.options.type?this.styles.info:"success"===this.options.type?this.styles.success:this.styles.notice),role:"alert"}).appendTo(this.elem),""!==this.options.cornerclass&&this.container.removeClass("ui-corner-all").addClass(this.options.cornerclass),this.options.shadow&&this.container.addClass("ui-pnotify-shadow"),!1!==this.options.icon&&t("<div />",{class:"ui-pnotify-icon"}).append(t("<span />",{class:!0===this.options.icon?"error"===this.options.type?this.styles.error_icon:"info"===this.options.type?this.styles.info_icon:"success"===this.options.type?this.styles.success_icon:this.styles.notice_icon:this.options.icon})).prependTo(this.container),this.title_container=t("<h4 />",{class:"ui-pnotify-title"}).appendTo(this.container),!1===this.options.title?this.title_container.hide():this.options.title_escape?this.title_container.text(this.options.title):this.title_container.html(this.options.title),this.text_container=t("<div />",{class:"ui-pnotify-text","aria-role":"alert"}).appendTo(this.container),!1===this.options.text?this.text_container.hide():this.options.text_escape?this.text_container.text(this.options.text):this.text_container.html(this.options.insert_brs?String(this.options.text).replace(/\n/g,"<br />"):this.options.text),"string"==typeof this.options.width&&this.elem.css("width",this.options.width),"string"==typeof this.options.min_height&&this.container.css("min-height",this.options.min_height),"top"===this.options.stack.push?c.notices=t.merge([this],c.notices):c.notices=t.merge(c.notices,[this]),"top"===this.options.stack.push&&this.queuePosition(!1,1),this.options.stack.animation=!1,this.runModules("init"),this.state="closed",this.options.auto_display&&this.open(),this},update:function(i){var s=this.options;return this.parseOptions(s,i),this.elem.removeClass("ui-pnotify-fade-slow ui-pnotify-fade-normal ui-pnotify-fade-fast"),"fade"===this.options.animation&&this.elem.addClass("ui-pnotify-fade-"+this.options.animate_speed),this.options.cornerclass!==s.cornerclass&&this.container.removeClass("ui-corner-all "+s.cornerclass).addClass(this.options.cornerclass),this.options.shadow!==s.shadow&&(this.options.shadow?this.container.addClass("ui-pnotify-shadow"):this.container.removeClass("ui-pnotify-shadow")),!1===this.options.addclass?this.elem.removeClass(s.addclass):this.options.addclass!==s.addclass&&this.elem.removeClass(s.addclass).addClass(this.options.addclass),!1===this.options.title?this.title_container.slideUp("fast"):this.options.title!==s.title&&(this.options.title_escape?this.title_container.text(this.options.title):this.title_container.html(this.options.title),!1===s.title&&this.title_container.slideDown(200)),!1===this.options.text?this.text_container.slideUp("fast"):this.options.text!==s.text&&(this.options.text_escape?this.text_container.text(this.options.text):this.text_container.html(this.options.insert_brs?String(this.options.text).replace(/\n/g,"<br />"):this.options.text),!1===s.text&&this.text_container.slideDown(200)),this.options.type!==s.type&&this.container.removeClass(this.styles.error+" "+this.styles.notice+" "+this.styles.success+" "+this.styles.info).addClass("error"===this.options.type?this.styles.error:"info"===this.options.type?this.styles.info:"success"===this.options.type?this.styles.success:this.styles.notice),(this.options.icon!==s.icon||!0===this.options.icon&&this.options.type!==s.type)&&(this.container.find("div.ui-pnotify-icon").remove(),!1!==this.options.icon&&t("<div />",{class:"ui-pnotify-icon"}).append(t("<span />",{class:!0===this.options.icon?"error"===this.options.type?this.styles.error_icon:"info"===this.options.type?this.styles.info_icon:"success"===this.options.type?this.styles.success_icon:this.styles.notice_icon:this.options.icon})).prependTo(this.container)),this.options.width!==s.width&&this.elem.animate({width:this.options.width}),this.options.min_height!==s.min_height&&this.container.animate({minHeight:this.options.min_height}),this.options.hide?s.hide||this.queueRemove():this.cancelRemove(),this.queuePosition(!0),this.runModules("update",s),this},open:function(){this.state="opening",this.runModules("beforeOpen");var t=this;return this.elem.parent().length||this.elem.appendTo(this.options.stack.context?this.options.stack.context:o),"top"!==this.options.stack.push&&this.position(!0),this.animateIn(function(){t.queuePosition(!0),t.options.hide&&t.queueRemove(),t.state="open",t.runModules("afterOpen")}),this},remove:function(s){this.state="closing",this.timerHide=!!s,this.runModules("beforeClose");var e=this;return this.timer&&(i.clearTimeout(this.timer),this.timer=null),this.animateOut(function(){if(e.state="closed",e.runModules("afterClose"),e.queuePosition(!0),e.options.remove&&e.elem.detach(),e.runModules("beforeDestroy"),e.options.destroy&&null!==c.notices){var i=t.inArray(e,c.notices);-1!==i&&c.notices.splice(i,1)}e.runModules("afterDestroy")}),this},get:function(){return this.elem},parseOptions:function(i,s){this.options=t.extend(!0,{},c.prototype.options),this.options.stack=c.prototype.options.stack;for(var e,o=[i,s],n=0;n<o.length&&void 0!==(e=o[n]);n++)if("object"!=typeof e)this.options.text=e;else for(var a in e)this.modules[a]?t.extend(!0,this.options[a],e[a]):this.options[a]=e[a]},animateIn:function(t){this.animating="in";var i=this,s=function(){i.animTimer&&clearTimeout(i.animTimer),"in"===i.animating&&(i.elem.is(":visible")?(t&&t.call(),i.animating=!1):i.animTimer=setTimeout(s,40))};"fade"===this.options.animation?(this.elem.one("webkitTransitionEnd mozTransitionEnd MSTransitionEnd oTransitionEnd transitionend",s).addClass("ui-pnotify-in"),this.elem.css("opacity"),this.elem.addClass("ui-pnotify-fade-in"),this.animTimer=setTimeout(s,650)):(this.elem.addClass("ui-pnotify-in"),s())},animateOut:function(i){this.animating="out";var s=this,e=function(){if(s.animTimer&&clearTimeout(s.animTimer),"out"===s.animating)if("0"!=s.elem.css("opacity")&&s.elem.is(":visible"))s.animTimer=setTimeout(e,40);else{if(s.elem.removeClass("ui-pnotify-in"),s.options.stack.overlay){var o=!1;t.each(c.notices,function(t,i){i!=s&&i.options.stack===s.options.stack&&"closed"!=i.state&&(o=!0)}),o||s.options.stack.overlay.hide()}i&&i.call(),s.animating=!1}};"fade"===this.options.animation?(this.elem.one("webkitTransitionEnd mozTransitionEnd MSTransitionEnd oTransitionEnd transitionend",e).removeClass("ui-pnotify-fade-in"),this.animTimer=setTimeout(e,650)):(this.elem.removeClass("ui-pnotify-in"),e())},position:function(t){var i=this.options.stack,s=this.elem;if(void 0===i.context&&(i.context=o),i){"number"!=typeof i.nextpos1&&(i.nextpos1=i.firstpos1),"number"!=typeof i.nextpos2&&(i.nextpos2=i.firstpos2),"number"!=typeof i.addpos2&&(i.addpos2=0);var e=!s.hasClass("ui-pnotify-in");if(!e||t){i.modal&&(i.overlay?i.overlay.show():i.overlay=h(i)),s.addClass("ui-pnotify-move");var n,r,c;switch(i.dir1){case"down":c="top";break;case"up":c="bottom";break;case"left":c="right";break;case"right":c="left"}n=parseInt(s.css(c).replace(/(?:\..*|[^0-9.])/g,"")),isNaN(n)&&(n=0),void 0!==i.firstpos1||e||(i.firstpos1=n,i.nextpos1=i.firstpos1);var p;switch(i.dir2){case"down":p="top";break;case"up":p="bottom";break;case"left":p="right";break;case"right":p="left"}switch(r=parseInt(s.css(p).replace(/(?:\..*|[^0-9.])/g,"")),isNaN(r)&&(r=0),void 0!==i.firstpos2||e||(i.firstpos2=r,i.nextpos2=i.firstpos2),("down"===i.dir1&&i.nextpos1+s.height()>(i.context.is(o)?a.height():i.context.prop("scrollHeight"))||"up"===i.dir1&&i.nextpos1+s.height()>(i.context.is(o)?a.height():i.context.prop("scrollHeight"))||"left"===i.dir1&&i.nextpos1+s.width()>(i.context.is(o)?a.width():i.context.prop("scrollWidth"))||"right"===i.dir1&&i.nextpos1+s.width()>(i.context.is(o)?a.width():i.context.prop("scrollWidth")))&&(i.nextpos1=i.firstpos1,i.nextpos2+=i.addpos2+(void 0===i.spacing2?25:i.spacing2),i.addpos2=0),"number"==typeof i.nextpos2&&(i.animation?s.css(p,i.nextpos2+"px"):(s.removeClass("ui-pnotify-move"),s.css(p,i.nextpos2+"px"),s.css(p),s.addClass("ui-pnotify-move"))),i.dir2){case"down":case"up":s.outerHeight(!0)>i.addpos2&&(i.addpos2=s.height());break;case"left":case"right":s.outerWidth(!0)>i.addpos2&&(i.addpos2=s.width())}switch("number"==typeof i.nextpos1&&(i.animation?s.css(c,i.nextpos1+"px"):(s.removeClass("ui-pnotify-move"),s.css(c,i.nextpos1+"px"),s.css(c),s.addClass("ui-pnotify-move"))),i.dir1){case"down":case"up":i.nextpos1+=s.height()+(void 0===i.spacing1?25:i.spacing1);break;case"left":case"right":i.nextpos1+=s.width()+(void 0===i.spacing1?25:i.spacing1)}}return this}},queuePosition:function(t,i){return e&&clearTimeout(e),i||(i=10),e=setTimeout(function(){c.positionAll(t)},i),this},cancelRemove:function(){return this.timer&&i.clearTimeout(this.timer),this.animTimer&&i.clearTimeout(this.animTimer),"closing"===this.state&&(this.state="open",this.animating=!1,this.elem.addClass("ui-pnotify-in"),"fade"===this.options.animation&&this.elem.addClass("ui-pnotify-fade-in")),this},queueRemove:function(){var t=this;return this.cancelRemove(),this.timer=i.setTimeout(function(){t.remove(!0)},isNaN(this.options.delay)?0:this.options.delay),this}}),t.extend(c,{notices:[],reload:s,removeAll:function(){t.each(c.notices,function(t,i){i.remove&&i.remove(!1)})},removeStack:function(i){t.each(c.notices,function(t,s){s.remove&&s.options.stack===i&&s.remove(!1)})},positionAll:function(i){if(e&&clearTimeout(e),e=null,c.notices&&c.notices.length)t.each(c.notices,function(t,s){var e=s.options.stack;e&&(e.overlay&&e.overlay.hide(),e.nextpos1=e.firstpos1,e.nextpos2=e.firstpos2,e.addpos2=0,e.animation=i)}),t.each(c.notices,function(t,i){i.position()});else{var s=c.prototype.options.stack;s&&(delete s.nextpos1,delete s.nextpos2)}},styling:{brighttheme:{container:"brighttheme",notice:"brighttheme-notice",notice_icon:"brighttheme-icon-notice",info:"brighttheme-info",info_icon:"brighttheme-icon-info",success:"brighttheme-success",success_icon:"brighttheme-icon-success",error:"brighttheme-error",error_icon:"brighttheme-icon-error"},bootstrap3:{container:"alert",notice:"alert-warning",notice_icon:"glyphicon glyphicon-exclamation-sign",info:"alert-info",info_icon:"glyphicon glyphicon-info-sign",success:"alert-success",success_icon:"glyphicon glyphicon-ok-sign",error:"alert-danger",error_icon:"glyphicon glyphicon-warning-sign"}}}),c.styling.fontawesome=t.extend({},c.styling.bootstrap3),t.extend(c.styling.fontawesome,{notice_icon:"fa fa-exclamation-circle",info_icon:"fa fa-info",success_icon:"fa fa-check",error_icon:"fa fa-warning"}),i.document.body?r():t(r),c};return s(i)});
//# sourceMappingURL=pnotify.js.map
// Animate
!function(n,i){"function"==typeof define&&define.amd?define("pnotify.animate",["jquery","pnotify"],i):"object"==typeof exports&&"undefined"!=typeof module?module.exports=i(require("jquery"),require("./pnotify")):i(n.jQuery,n.PNotify)}("undefined"!=typeof window?window:this,function(n,i){return i.prototype.options.animate={animate:!1,in_class:"",out_class:""},i.prototype.modules.animate={init:function(n,i){this.setUpAnimations(n,i),n.attention=function(i,t){n.elem.one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",function(){n.elem.removeClass(i),t&&t.call(n)}).addClass("animated "+i)}},update:function(n,i,t){i.animate!=t.animate&&this.setUpAnimations(n,i)},setUpAnimations:function(n,i){if(i.animate){n.options.animation="none",n.elem.removeClass("ui-pnotify-fade-slow ui-pnotify-fade-normal ui-pnotify-fade-fast"),n._animateIn||(n._animateIn=n.animateIn),n._animateOut||(n._animateOut=n.animateOut),n.animateIn=this.animateIn.bind(this),n.animateOut=this.animateOut.bind(this);var t=400;"slow"===n.options.animate_speed?t=600:"fast"===n.options.animate_speed?t=200:n.options.animate_speed>0&&(t=n.options.animate_speed),t/=1e3,n.elem.addClass("animated").css({"-webkit-animation-duration":t+"s","-moz-animation-duration":t+"s","animation-duration":t+"s"})}else n._animateIn&&n._animateOut&&(n.animateIn=n._animateIn,delete n._animateIn,n.animateOut=n._animateOut,delete n._animateOut,n.elem.addClass("animated"))},animateIn:function(n){this.notice.animating="in";var i=this;n=function(){i.notice.elem.removeClass(i.options.in_class),this&&this.call(),i.notice.animating=!1}.bind(n),this.notice.elem.show().one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",n).removeClass(this.options.out_class).addClass("ui-pnotify-in").addClass(this.options.in_class)},animateOut:function(n){this.notice.animating="out";var i=this;n=function(){i.notice.elem.removeClass("ui-pnotify-in "+i.options.out_class),this&&this.call(),i.notice.animating=!1}.bind(n),this.notice.elem.one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",n).removeClass(this.options.in_class).addClass(this.options.out_class)}},i});
//# sourceMappingURL=pnotify.animate.js.map
// Buttons
!function(o,s){"function"==typeof define&&define.amd?define("pnotify.buttons",["jquery","pnotify"],s):"object"==typeof exports&&"undefined"!=typeof module?module.exports=s(require("jquery"),require("./pnotify")):s(o.jQuery,o.PNotify)}("undefined"!=typeof window?window:this,function(o,s){return s.prototype.options.buttons={closer:!0,closer_hover:!0,sticker:!0,sticker_hover:!0,show_on_nonblock:!1,labels:{close:"Close",stick:"Stick",unstick:"Unstick"},classes:{closer:null,pin_up:null,pin_down:null}},s.prototype.modules.buttons={init:function(s,i){var n=this;s.elem.on({mouseenter:function(o){!n.options.sticker||s.options.nonblock&&s.options.nonblock.nonblock&&!n.options.show_on_nonblock||n.sticker.trigger("pnotify:buttons:toggleStick").css("visibility","visible"),!n.options.closer||s.options.nonblock&&s.options.nonblock.nonblock&&!n.options.show_on_nonblock||n.closer.css("visibility","visible")},mouseleave:function(o){n.options.sticker_hover&&n.sticker.css("visibility","hidden"),n.options.closer_hover&&n.closer.css("visibility","hidden")}}),this.sticker=o("<div />",{class:"ui-pnotify-sticker","aria-role":"button","aria-pressed":s.options.hide?"false":"true",tabindex:"0",title:s.options.hide?i.labels.stick:i.labels.unstick,css:{cursor:"pointer",visibility:i.sticker_hover?"hidden":"visible"},click:function(){s.options.hide=!s.options.hide,s.options.hide?s.queueRemove():s.cancelRemove(),o(this).trigger("pnotify:buttons:toggleStick")}}).on("pnotify:buttons:toggleStick",function(){var i=null===n.options.classes.pin_up?s.styles.pin_up:n.options.classes.pin_up,e=null===n.options.classes.pin_down?s.styles.pin_down:n.options.classes.pin_down;o(this).attr("title",s.options.hide?n.options.labels.stick:n.options.labels.unstick).children().attr("class","").addClass(s.options.hide?i:e).attr("aria-pressed",s.options.hide?"false":"true")}).append("<span />").trigger("pnotify:buttons:toggleStick").prependTo(s.container),(!i.sticker||s.options.nonblock&&s.options.nonblock.nonblock&&!i.show_on_nonblock)&&this.sticker.css("display","none"),this.closer=o("<div />",{class:"ui-pnotify-closer","aria-role":"button",tabindex:"0",title:i.labels.close,css:{cursor:"pointer",visibility:i.closer_hover?"hidden":"visible"},click:function(){s.remove(!1),n.sticker.css("visibility","hidden"),n.closer.css("visibility","hidden")}}).append(o("<span />",{class:null===i.classes.closer?s.styles.closer:i.classes.closer})).prependTo(s.container),(!i.closer||s.options.nonblock&&s.options.nonblock.nonblock&&!i.show_on_nonblock)&&this.closer.css("display","none")},update:function(o,s){!s.closer||o.options.nonblock&&o.options.nonblock.nonblock&&!s.show_on_nonblock?this.closer.css("display","none"):s.closer&&this.closer.css("display","block"),!s.sticker||o.options.nonblock&&o.options.nonblock.nonblock&&!s.show_on_nonblock?this.sticker.css("display","none"):s.sticker&&this.sticker.css("display","block"),this.sticker.trigger("pnotify:buttons:toggleStick"),this.closer.find("span").attr("class","").addClass(null===s.classes.closer?o.styles.closer:s.classes.closer),s.sticker_hover?this.sticker.css("visibility","hidden"):o.options.nonblock&&o.options.nonblock.nonblock&&!s.show_on_nonblock||this.sticker.css("visibility","visible"),s.closer_hover?this.closer.css("visibility","hidden"):o.options.nonblock&&o.options.nonblock.nonblock&&!s.show_on_nonblock||this.closer.css("visibility","visible")}},o.extend(s.styling.brighttheme,{closer:"brighttheme-icon-closer",pin_up:"brighttheme-icon-sticker",pin_down:"brighttheme-icon-sticker brighttheme-icon-stuck"}),o.extend(s.styling.bootstrap3,{closer:"glyphicon glyphicon-remove",pin_up:"glyphicon glyphicon-pause",pin_down:"glyphicon glyphicon-play"}),o.extend(s.styling.fontawesome,{closer:"fa fa-times",pin_up:"fa fa-pause",pin_down:"fa fa-play"}),s});
//# sourceMappingURL=pnotify.buttons.js.map
// Desktop
!function(i,t){"function"==typeof define&&define.amd?define("pnotify.desktop",["jquery","pnotify"],t):"object"==typeof exports&&"undefined"!=typeof module?module.exports=t(require("jquery"),require("./pnotify")):t(i.jQuery,i.PNotify)}("undefined"!=typeof window?window:this,function(i,t){var o,n=function(i,t){return(n="Notification"in window?function(i,t){return new Notification(i,t)}:"mozNotification"in navigator?function(i,t){return navigator.mozNotification.createNotification(i,t.body,t.icon).show()}:"webkitNotifications"in window?function(i,t){return window.webkitNotifications.createNotification(t.icon,i,t.body)}:function(i,t){return null})(i,t)};return t.prototype.options.desktop={desktop:!1,fallback:!0,icon:null,tag:null,title:null,text:null},t.prototype.modules.desktop={genNotice:function(i,t){null===t.icon?this.icon="http://sciactive.com/pnotify/includes/desktop/"+i.options.type+".png":!1===t.icon?this.icon=null:this.icon=t.icon,null!==this.tag&&null===t.tag||(this.tag=null===t.tag?"PNotify-"+Math.round(1e6*Math.random()):t.tag),i.desktop=n(t.title||i.options.title,{icon:this.icon,body:t.text||i.options.text,tag:this.tag}),!("close"in i.desktop)&&"cancel"in i.desktop&&(i.desktop.close=function(){i.desktop.cancel()}),i.desktop.onclick=function(){i.elem.trigger("click")},i.desktop.onclose=function(){"closing"!==i.state&&"closed"!==i.state&&i.remove()}},init:function(i,n){if(n.desktop){if(0!==(o=t.desktop.checkPermission()))return void(n.fallback||(i.options.auto_display=!1));this.genNotice(i,n)}},update:function(i,t,n){0!==o&&t.fallback||!t.desktop||this.genNotice(i,t)},beforeOpen:function(i,t){0!==o&&t.fallback||!t.desktop||i.elem.css({left:"-10000px"}).removeClass("ui-pnotify-in")},afterOpen:function(i,t){0!==o&&t.fallback||!t.desktop||(i.elem.css({left:"-10000px"}).removeClass("ui-pnotify-in"),"show"in i.desktop&&i.desktop.show())},beforeClose:function(i,t){0!==o&&t.fallback||!t.desktop||i.elem.css({left:"-10000px"}).removeClass("ui-pnotify-in")},afterClose:function(i,t){0!==o&&t.fallback||!t.desktop||(i.elem.css({left:"-10000px"}).removeClass("ui-pnotify-in"),"close"in i.desktop&&i.desktop.close())}},t.desktop={permission:function(){"undefined"!=typeof Notification&&"requestPermission"in Notification?Notification.requestPermission():"webkitNotifications"in window&&window.webkitNotifications.requestPermission()},checkPermission:function(){return"undefined"!=typeof Notification&&"permission"in Notification?"granted"===Notification.permission?0:1:"webkitNotifications"in window&&0==window.webkitNotifications.checkPermission()?0:1}},o=t.desktop.checkPermission(),t});
//# sourceMappingURL=pnotify.desktop.js.map
// Mobile
!function(i,o){"function"==typeof define&&define.amd?define("pnotify.mobile",["jquery","pnotify"],o):"object"==typeof exports&&"undefined"!=typeof module?module.exports=o(require("jquery"),require("./pnotify")):o(i.jQuery,i.PNotify)}("undefined"!=typeof window?window:this,function(i,o){return o.prototype.options.mobile={swipe_dismiss:!0,styling:!0},o.prototype.modules.mobile={init:function(i,o){var t=this,e=null,n=null,s=null;this.swipe_dismiss=o.swipe_dismiss,this.doMobileStyling(i,o),i.elem.on({touchstart:function(o){t.swipe_dismiss&&(e=o.originalEvent.touches[0].screenX,s=i.elem.width(),i.container.css("left","0"))},touchmove:function(o){if(e&&t.swipe_dismiss){var a=o.originalEvent.touches[0].screenX;n=a-e;var c=(1-Math.abs(n)/s)*i.options.opacity;i.elem.css("opacity",c),i.container.css("left",n)}},touchend:function(){if(e&&t.swipe_dismiss){if(Math.abs(n)>40){var o=n<0?-2*s:2*s;i.elem.animate({opacity:0},100),i.container.animate({left:o},100),i.remove()}else i.elem.animate({opacity:i.options.opacity},100),i.container.animate({left:0},100);e=null,n=null,s=null}},touchcancel:function(){e&&t.swipe_dismiss&&(i.elem.animate({opacity:i.options.opacity},100),i.container.animate({left:0},100),e=null,n=null,s=null)}})},update:function(i,o){this.swipe_dismiss=o.swipe_dismiss,this.doMobileStyling(i,o)},doMobileStyling:function(o,t){t.styling?(o.elem.addClass("ui-pnotify-mobile-able"),i(window).width()<=480?(o.options.stack.mobileOrigSpacing1||(o.options.stack.mobileOrigSpacing1=o.options.stack.spacing1,o.options.stack.mobileOrigSpacing2=o.options.stack.spacing2),o.options.stack.spacing1=0,o.options.stack.spacing2=0):(o.options.stack.mobileOrigSpacing1||o.options.stack.mobileOrigSpacing2)&&(o.options.stack.spacing1=o.options.stack.mobileOrigSpacing1,delete o.options.stack.mobileOrigSpacing1,o.options.stack.spacing2=o.options.stack.mobileOrigSpacing2,delete o.options.stack.mobileOrigSpacing2)):(o.elem.removeClass("ui-pnotify-mobile-able"),o.options.stack.mobileOrigSpacing1&&(o.options.stack.spacing1=o.options.stack.mobileOrigSpacing1,delete o.options.stack.mobileOrigSpacing1),o.options.stack.mobileOrigSpacing2&&(o.options.stack.spacing2=o.options.stack.mobileOrigSpacing2,delete o.options.stack.mobileOrigSpacing2))}},o});
//# sourceMappingURL=pnotify.mobile.js.map

/*
  Bootstrap - File Input
  ======================
  This is meant to convert all file input tags into a set of elements that displays consistently in all browsers.
  Converts all
  <input type="file">
  into Bootstrap buttons
  <a class="btn">Browse</a>
  http://gregpike.net/demos/bootstrap-file-input/demo.html
*/
(function($) {

$.fn.bootstrapFileInput = function() {

  this.each(function(i,elem){

    var $elem = $(elem);

    // Add [processed] class to avoid double processing of input file element
    if (typeof $elem.attr('data-bfi-processed-class') != 'undefined') {
      // Check if the element already has the [processed] flag on it and skip it if it does
      if ($elem.hasClass($elem.attr('data-bfi-processed-class'))) {
          return;
      }
      $elem.addClass($elem.attr('data-bfi-processed-class'));
    }

    // Maybe some fields don't need to be standardized.
    if (typeof $elem.attr('data-bfi-disabled') != 'undefined') {
      return;
    }

    // Set the word to be displayed on the button
    var buttonWord = 'Browse';

    if (typeof $elem.attr('title') != 'undefined') {
      buttonWord = $elem.attr('title');
    }

    var className = '';

    if (!!$elem.attr('class')) {
      className = ' ' + $elem.attr('class');
    }

    // Now we're going to wrap that input field with a Bootstrap button.
    // The input will actually still be there, it will just be float above and transparent (done with the CSS).
    $elem.wrap('<span class="file-input-wrapper btn btn-default ' + className + '"></span>').parent().prepend($('<span></span>').html(buttonWord));
  })

  // After we have found all of the file inputs let's apply a listener for tracking the mouse movement.
  // This is important because the in order to give the illusion that this is a button in FF we actually need to move the button from the file input under the cursor. Ugh.
  .promise().done( function(){

    // As the cursor moves over our new Bootstrap button we need to adjust the position of the invisible file input Browse button to be under the cursor.
    // This gives us the pointer cursor that FF denies us
    $('.file-input-wrapper').on('mousemove', function(cursor) {

      var input, wrapper,
        wrapperX, wrapperY,
        inputWidth, inputHeight,
        cursorX, cursorY;

      // This wrapper element (the button surround this file input)
      wrapper = $(this);
      // The invisible file input element
      input = wrapper.find("input");
      // The left-most position of the wrapper
      wrapperX = wrapper.offset().left;
      // The top-most position of the wrapper
      wrapperY = wrapper.offset().top;
      // The with of the browsers input field
      inputWidth= input.width();
      // The height of the browsers input field
      inputHeight= input.height();
      //The position of the cursor in the wrapper
      cursorX = cursor.pageX;
      cursorY = cursor.pageY;

      //The positions we are to move the invisible file input
      // The 20 at the end is an arbitrary number of pixels that we can shift the input such that cursor is not pointing at the end of the Browse button but somewhere nearer the middle
      moveInputX = cursorX - wrapperX - inputWidth + 20;
      // Slides the invisible input Browse button to be positioned middle under the cursor
      moveInputY = cursorY- wrapperY - (inputHeight/2);

      // Apply the positioning styles to actually move the invisible file input
      input.css({
        left:moveInputX,
        top:moveInputY
      });
    });

    $('body').on('change', '.file-input-wrapper input[type=file]', function(){

      var fileName;
      fileName = $(this).val();

      // Remove any previous file names
      $(this).parent().next('.file-input-name').remove();
      if (!!$(this).prop('files') && $(this).prop('files').length > 1) {
        fileName = $(this)[0].files.length+' файлов';
      }
      else {
        fileName = fileName.substring(fileName.lastIndexOf('\\') + 1, fileName.length);
      }

      // Don't try to show the name if there is none
      if (!fileName) {
        return;
      }

      var selectedFileNamePlacement = $(this).data('filenamePlacement');
      if (selectedFileNamePlacement === 'inside') {
        // Print the fileName inside
        $(this).siblings('span').html(fileName);
        $(this).attr('title', fileName);
      } else {
        // Print the fileName aside (right after the the button)
        $(this).parent().after('<span class="file-input-name">'+fileName+'</span>');
      }
    });

  });

};
})(jQuery);
