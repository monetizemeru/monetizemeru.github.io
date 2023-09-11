!function(){"use strict";function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}var e=function(){function e(t){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),this._url=t}var n,i;return n=e,(i=[{key:"loadData",value:function(){return fetch(this._url).then(this._checkStatus).then(this._toJSON)}},{key:"_checkStatus",value:function(t){if(t.status>=200&&t.status<300)return t;throw new Error("".concat(t.status,": ").concat(t.statusText))}},{key:"_toJSON",value:function(t){return t.json()}}])&&t(n.prototype,i),e}(),n="afterbegin",i="beforeend",o="afterEnd";function r(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}var s=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._element=null,this._data=e}var e,n;return e=t,(n=[{key:"_getTemplate",value:function(){return e=function(t){return t.map((function(t){var e=t.link,n=t.img,i=t.title;return'<li class="promo-slider__item">\n      <a class="promo-slider__link" href="'.concat(e,'" target="_blank" rel="noopener nofollow">\n        <h3 class="promo-slider__title">').concat(i,'</h3>\n\n        <img class="promo-slider__image" src="').concat(n,'" loading="lazy" alt="" width="90" height="auto">\n      </a>\n    </li>')})).join("\n")}(t=this._data),'<div>\n      <header class="promo-slider__header">\n        <a href="/promo/">\n          <h2>Спецпроекты</h2>\n        </a>\n\n        <span class="promo-slider__counter">1/'.concat(t.length,'</span>\n\n        <div class="promo-slider__arrows">\n          <button class="promo-slider__button promo-slider__button_prev" aria-label="Листать в начало">\n            <svg class="promo-slider__button-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 31 31" width="31" height="31" style="transform: scale(-1, 1)">\n              <path fill="currentColor" d="M12 7.7a1 1 0 0 1 1.5 0l7 7-7 7.1a1 1 0 1 1-1.4-1.4l5.6-5.6L12.1 9a1 1 0 0 1 0-1.4z"></path>\n            </svg>\n          </button>\n\n          <button class="promo-slider__button promo-slider__button_next" aria-label="Листать в конец">\n            <svg class="promo-slider__button-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 31 31" width="31" height="31">\n              <path fill="currentColor" d="M12 7.7a1 1 0 0 1 1.5 0l7 7-7 7.1a1 1 0 1 1-1.4-1.4l5.6-5.6L12.1 9a1 1 0 0 1 0-1.4z"></path>\n            </svg>\n          </button>\n        </div>\n      </header>\n\n      <ul class="promo-slider__list">\n        ').concat(e,"\n      </ul>\n    </div>");var t,e}},{key:"_getElement",value:function(){var t,e;return this._element||(this._element=(t=this._getTemplate(),(e=document.createElement("div")).innerHTML=t.trim(),e.firstElementChild)),this._element}}])&&r(e.prototype,n),t}();function a(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function l(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}var c={counter:"promo-slider__counter",backButton:"promo-slider__button_prev",nextButton:"promo-slider__button_next",container:"promo-slider__list",item:"promo-slider__item",stepCoefficient:1,gup:0,isInfinityScroll:!0},u=function(){function t(e,n){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:c;if(a(this,t),this.settings=Object.assign({},c,i),this.root=e,this.container=n,this._stepSize=null,this.backButton=e.querySelector(".".concat(this.settings.backButton)),this.onBackButtonClick=this.onBackButtonClick.bind(this),this.backButton.addEventListener("click",this.onBackButtonClick),this.nextButton=e.querySelector(".".concat(this.settings.nextButton)),this.onNextButtonClick=this.onNextButtonClick.bind(this),this.nextButton.addEventListener("click",this.onNextButtonClick),this.settings.counter){var o=e.querySelector(".".concat(this.settings.counter));o&&this._counter(o,this.container.querySelectorAll(".promo-slider__item"))}}var e,n;return e=t,(n=[{key:"_counter",value:function(t,e){var n=e.length;e.forEach((function(e,i){new IntersectionObserver((function(e){e[0].isIntersecting&&(t.innerText="".concat(i+1,"/").concat(n))}),{threshold:.5}).observe(e)}))}},{key:"stepSize",get:function(){return null===this._stepSize&&(this._stepSize=this.container.querySelector(".".concat(this.settings.item)).offsetWidth*this.settings.stepCoefficient+this.settings.gup),this._stepSize}},{key:"onNextButtonClick",value:function(){return this.container.scrollLeft+this.container.offsetWidth===this.container.scrollWidth&&this.settings.isInfinityScroll?this.container.scrollTo(0,0):this.container.scrollTo(this.container.scrollLeft+this.stepSize,0)}},{key:"onBackButtonClick",value:function(){return 0===this.container.scrollLeft&&this.settings.isInfinityScroll?this.container.scrollTo(this.container.scrollWidth,0):this.container.scrollTo(this.container.scrollLeft-this.stepSize,0)}}])&&l(e.prototype,n),t}();function h(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}var f=function(){function t(e,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._sliderContainer=e,this.slidesCarouselComponent=new s(n)}var e,r;return e=t,(r=[{key:"init",value:function(){!function(t,e){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:i;switch(e=e._getElement(),r){case n:t.prepend(e);break;case o:t.after(e);break;case i:t.append(e)}}(this._sliderContainer,this.slidesCarouselComponent),this.carouselArrowModel=new u(this._sliderContainer,this._sliderContainer.querySelector(".promo-slider__list"),{counter:"promo-slider__counter",isInfinityScroll:!0,container:"promo-slider__list",item:"promo-slider__item",gup:0})}}])&&h(e.prototype,r),t}(),_=document.querySelector(".promo-slider");new e("/api/json/carusel-spec/").loadData().then((function(t){var e=t.carusel;_&&e.length>0&&(_.classList.remove("promo-slider__js"),new f(_,e).init())}))}();