!function(e){var t=e.Yandex=e.Yandex||{},n=t.VH=t.VH||{},i=n.Set=function(e){this._arr=Array.isArray(e)?e:[],this.length=this._arr.length},r=i.prototype;r.join=function(e){return e=e||" ",this._arr.join(e)},r.add=function(e){-1===this._arr.indexOf(e)&&(this._arr.push(e),this.length=this._arr.length)},r.delete=function(e){-1!==this._arr.indexOf(e)&&(this._arr.splice(this._arr.indexOf(e),1),this.length=this._arr.length)}}("undefined"!=typeof window?window:global),function(){"use strict";function e(){}function t(e,t,n){this.fn=e,this.context=t,this.once=n||!1}function n(e,n,i,r,s){if("function"!=typeof i)throw new TypeError("The listener must be a function");var o=new t(i,r||e,s),f=a?a+n:n;return e._events[f]?e._events[f].fn?e._events[f]=[e._events[f],o]:e._events[f].push(o):(e._events[f]=o,e._eventsCount++),e}function i(t,n){0==--t._eventsCount?t._events=new e:delete t._events[n]}function r(){this._events=new e,this._eventsCount=0}var s=Object.prototype.hasOwnProperty,a="~";Object.create&&(e.prototype=Object.create(null),(new e).__proto__||(a=!1)),r.prototype.eventNames=function(){var e,t,n=[];if(0===this._eventsCount)return n;for(t in e=this._events)s.call(e,t)&&n.push(a?t.slice(1):t);return Object.getOwnPropertySymbols?n.concat(Object.getOwnPropertySymbols(e)):n},r.prototype.listeners=function(e){var t=a?a+e:e,n=this._events[t];if(!n)return[];if(n.fn)return[n.fn];for(var i=0,r=n.length,s=new Array(r);i<r;i++)s[i]=n[i].fn;return s},r.prototype.listenerCount=function(e){var t=a?a+e:e,n=this._events[t];return n?n.fn?1:n.length:0},r.prototype.emit=function(e,t,n,i,r,s){var o=a?a+e:e;if(!this._events[o])return!1;var f,h,c=this._events[o],u=arguments.length;if(c.fn){switch(c.once&&this.removeListener(e,c.fn,void 0,!0),u){case 1:return c.fn.call(c.context),!0;case 2:return c.fn.call(c.context,t),!0;case 3:return c.fn.call(c.context,t,n),!0;case 4:return c.fn.call(c.context,t,n,i),!0;case 5:return c.fn.call(c.context,t,n,i,r),!0;case 6:return c.fn.call(c.context,t,n,i,r,s),!0}for(h=1,f=new Array(u-1);h<u;h++)f[h-1]=arguments[h];c.fn.apply(c.context,f)}else{var l,p=c.length;for(h=0;h<p;h++)switch(c[h].once&&this.removeListener(e,c[h].fn,void 0,!0),u){case 1:c[h].fn.call(c[h].context);break;case 2:c[h].fn.call(c[h].context,t);break;case 3:c[h].fn.call(c[h].context,t,n);break;case 4:c[h].fn.call(c[h].context,t,n,i);break;default:if(!f)for(l=1,f=new Array(u-1);l<u;l++)f[l-1]=arguments[l];c[h].fn.apply(c[h].context,f)}}return!0},r.prototype.on=function(e,t,i){return n(this,e,t,i,!1)},r.prototype.once=function(e,t,i){return n(this,e,t,i,!0)},r.prototype.removeListener=function(e,t,n,r){var s=a?a+e:e;if(!this._events[s])return this;if(!t)return i(this,s),this;var o=this._events[s];if(o.fn)o.fn!==t||r&&!o.once||n&&o.context!==n||i(this,s);else{for(var f=0,h=[],c=o.length;f<c;f++)(o[f].fn!==t||r&&!o[f].once||n&&o[f].context!==n)&&h.push(o[f]);h.length?this._events[s]=1===h.length?h[0]:h:i(this,s)}return this},r.prototype.removeAllListeners=function(t){var n;return t?(n=a?a+t:t,this._events[n]&&i(this,n)):(this._events=new e,this._eventsCount=0),this},r.prototype.off=r.prototype.removeListener,r.prototype.addListener=r.prototype.on,r.prefixed=a,r.EventEmitter=r,"undefined"!=typeof module&&(module.exports=r),window.Yandex=window.Yandex||{},window.Yandex.VH=window.Yandex.VH||{},window.Yandex.VH.EventEmitter=r}(),function(e){var t=e.Yandex=e.Yandex||{},n=t.VH=t.VH||{},i=n.Iframe=function(e){var t=i.parse(e||"");for(var n in t)t.hasOwnProperty(n)&&(i.ATTRS.hasOwnProperty(n)?this[n]=i.ATTRS[n].parse(t[n]):this[n]=t[n])};i.prototype.toString=function(){var e,t,n=[];for(e in this)this.hasOwnProperty(e)&&(t=i.ATTRS.hasOwnProperty(e)?i.ATTRS[e].build(this[e]):this[e],!0!==t?t&&n.push(e+'="'+t+'"'):n.push(e));return"<iframe ${attrs}></iframe>".replace("${attrs}",n.join(" "))},i.parse=function(e){var t,n={src:"",class:"",style:"",allow:""},i=/(?:(?:[a-z0-9_-]+\s*=\s*"[^"]*")|[a-z0-9_-]+)/gi,r=/([a-z0-9_-]+)\s*=\s*"([^"]*)"/i;for(e=e.replace(/^\s*<iframe\s*/i,"").replace(/\s*<\/iframe>\s*$/,"").replace(/\s*>\s*$/,"");null!==(t=i.exec(e));)t=t[0],t.indexOf("=")>-1?(t=t.match(r),n[t[1]]=t[2]):n[t]=!0;return n},i.ATTRS={src:{parse:function(e){var t={},n=decodeURIComponent;e=e.trim().replace(/&amp;/g,"&");var i=e.split("?");t.path=i[0]||"",t.query={};for(var r=(i[1]||"").split("&"),s=0;s<r.length;s++){var a=r[s].split("="),o=n(a[0]),f=n(a[1]);t.query[o]=f}return t},build:function(e){var t,n=encodeURIComponent;return t=Object.keys(e.query).reduce(function(t,i){return(t+=t?"&":"")+n(i)+"="+n(e.query[i])},""),t?e.path+"?"+t:e.path}},class:{parse:function(e){var t=e?e.trim().split(" "):[];return new n.Set(t)},build:function(e){return e instanceof n.Set||(e=new n.Set(e)),e.join(" ")}},allow:{parse:function(e){var t=e?e.trim().split(/;\s*/):[];return new n.Set(t)},build:function(e){return e instanceof n.Set||(e=new n.Set(e)),e.join("; ")}},style:{parse:function(e){for(var t,n=e.trim().split(";"),i={},r=0;r<n.length;r++)t=n[r].split(":"),t.length>1&&(i[t[0].trim()]=t[1].trim());return i},build:function(e){return e&&"object"==typeof e?Object.keys(e).reduce(function(t,n){var i=e[n],r=typeof i;return"string"===r&&""!==i?(t+=t?"; ":"")+n+": "+i:"number"===r&&i===i?(t+=t?"; ":"")+n+": "+i+(i?"px":""):t},""):""}}}}("undefined"!=typeof window?window:global),function(e,t){var n=e.Yandex=e.Yandex||{},i=n.VH=n.VH||{},r=i.Player=function(e,i){var s=t.getElementById(e);if(!s)throw new Error("Yandex.VH.Player: id was not found.");var a=e+"_player";this._prefix=a+":",this._amp=Boolean(i.amp),i.iframeId=a,i.params=i.params||{},i.params.event_prefix=this._amp?"":this._prefix;var o=r._makeIframe(i,e).toString();this._amp?s.innerHTML=r._makeAMPIframe(o,i):(s.innerHTML=o,this._emitter=new n.VH.EventEmitter,this._iframe=t.getElementById(a)),r.instances.push(this)};i.createPlayList=function(e,t,n){function i(){return t[++s%t.length]}if(!Array.isArray(t))throw new Error("contentIds is not an array");if(0===t.length)throw new Error("contentIds is empty");var s=-1;n.contentId=i();var a=new r(e,n);return a.on("ended",function(){a.setSource(i(),n),a.play()}),a},r._getLocation=function(){return location},r._getBucketConfig=function(){return Object({env:"production",url:"//yastatic.net/video-player",bucket:"video-player-static",endpoint:"s3.yandex.net",path:"/0x7b35426fc30",version:"0x7b35426fc30"})};var s="http:"===r._getLocation().protocol?"http:":"https:",a=s+"//frontend.vh.yandex.ru/player/";r.URL_AMP_VH_PLAYER=s+"//yastatic.net/video-player/${sandbox_version}/pages-common/amp-vh-player/amp-vh-player.html#html=",r.instances=[],r.TIMEOUT_FOR_ANIMATION_END=1e3,r._getPageRequestParams=function(){var t,n=e.Ya&&e.Ya.adfoxCode;return n&&"function"==typeof n.getPageRequestParams&&(t=n.getPageRequestParams(e)),t&&"object"==typeof t||(t={}),t},r._prepareAdConfig=function(e,t){if(Array.isArray(e.adBreaks)){var n=this._getPageRequestParams();n.containerId=t,e.adBreaks=e.adBreaks.map(function(e){return e&&e.adFoxParameters&&Object.keys(n).forEach(function(t){e.adFoxParameters[t]=n[t]}),e})}return e},r._makeIframe=function(e,t){var i=new n.VH.Iframe;return e&&"object"==typeof e.adConfig&&(e.params.adConfig=JSON.stringify(this._prepareAdConfig(e.adConfig,t))),i.id=e.iframeId,i.src.query=e.params,i.src.path=a+e.contentId,i.allowfullscreen=!0,i.allow=["autoplay","gyroscope","accelerometer","picture-in-picture","encrypted-media"],i.style={display:"block",height:"100%",width:"100%",margin:0,padding:0,border:0},this._isNumber(e.height)&&(i.style.height=e.height+"px"),this._isNumber(e.width)&&(i.style.width=e.width+"px"),i},r._makeAMPIframe=function(t,n){if(!n||!n.width||!n.height)return"";var i=r._getBucketConfig(),s=e.localStorage.getItem("sandbox_version")||i.version;return'<amp-video-iframe src="'+r.URL_AMP_VH_PLAYER.replace("${sandbox_version}",s)+encodeURIComponent(t)+'" width="'+n.width+'" height="'+n.height+'" layout="responsive" poster=""></amp-video-iframe>'};var o=r.prototype;o._sendMessage=function(e,t){t=t||{},t.method=this._prefix+e,this._iframe&&this._iframe.contentWindow.postMessage(JSON.stringify(t),"*")},r._isNumber=function(e){return"number"==typeof e&&e===e},o.play=function(){this._sendMessage("play")},o.pause=function(){this._sendMessage("pause")},o.mute=function(){this._sendMessage("mute")},o.unmute=function(){this._sendMessage("unmute")},o.setQuality=function(e){this._sendMessage("setQuality",{quality:e})},o.seek=function(e){this._sendMessage("seek",{time:e})},o.setVolume=function(e){this._sendMessage("setVolume",{volume:e})},o.setSource=function(e,t){this._sendMessage("updateSource",{id:e,params:t})},o.enableMiniPlayer=function(e,t){if(!this.miniPlayerEnabled&&!this._amp){this._iframe.style.opacity="0",this._savedStyles={width:this._iframe.offsetWidth,height:this._iframe.offsetHeight};var n=this;setTimeout(function(){n._iframe.style.transition="opacity 0.7s linear 0s",r._isNumber(t.width)&&(n._iframe.style.width=t.width+"px"),r._isNumber(t.height)&&(n._iframe.style.height=t.height+"px"),n._iframe.style.position="fixed",r._isNumber(e.right)?n._iframe.style.right=e.right+"px":r._isNumber(e.left)&&(n._iframe.style.left=e.left+"px"),r._isNumber(e.bottom)?n._iframe.style.bottom=e.bottom+"px":r._isNumber(e.top)&&(n._iframe.style.top=e.top+"px"),n._iframe.style.opacity="1"},0),this.hasAnimated=!0,setTimeout(function(){"function"==typeof n.onTransition&&(n.onTransition(),n.onTransition=null),n.hasAnimated=!1},r.TIMEOUT_FOR_ANIMATION_END),this.miniPlayerEnabled=!0}},o.disableMiniPlayer=function(){function e(){t._iframe.style.left=null,t._iframe.style.top=null,t._iframe.style.right=null,t._iframe.style.bottom=null,t._iframe.style.width=t._savedStyles.width+"px",t._iframe.style.height=t._savedStyles.height+"px",t._iframe.style.position="static",t._iframe.style.transition=null,t._iframe.style.opacity="1",t.miniPlayerEnabled=!1}if(this.miniPlayerEnabled&&!this._amp){var t=this;this._iframe.style.opacity="0",setTimeout(function(){this.hasAnimated?this.onTransition=e:e()},r.TIMEOUT_FOR_ANIMATION_END)}},o.resizeMiniPlayer=function(e){this._amp||(r._isNumber(e.width)&&(this._iframe.style.width=e.width+"px"),r._isNumber(e.height)&&(this._iframe.style.height=e.height+"px"))},o.on=function(e,t){if(!this._amp)return this._emitter.on(e,t),this},o.once=function(e,t){if(!this._amp)return this._emitter.once(e,t),this},o.off=function(e,t){if(!this._amp)return this._emitter.removeListener(e,t,this._emitter,!1),this},o.destroy=function(){this._iframe.src="",this._iframe.parentNode&&(this._iframe.parentNode.innerHTML="");for(var e=0;e<r.instances.length;e++)if(r.instances[e]===this){r.instances.splice(e,1);break}},r._onMessage=function(e){var t,n=e.data||{};if("string"==typeof n)try{n=JSON.parse(n)}catch(e){}(t=n.event)&&"string"==typeof t&&r.instances.forEach(function(e){0===t.indexOf(e._prefix)&&e._iframe&&e._emitter.emit(t.slice(e._prefix.length),n)})},e.addEventListener("message",r._onMessage)}(window,document);