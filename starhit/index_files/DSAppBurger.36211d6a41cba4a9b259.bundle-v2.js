(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{"9b7ElJQFef":function(e,t){e.exports={name:"login_24Icon",functional:!0,render:function(e,t){const s=t.data;var r=[];if(s.attrs){var n=s.attrs.width||s.attrs.size,o=s.attrs.height||s.attrs.size,i={};n&&(i.width=n+"px"),o&&(i.height=o+"px"),r.push(i)}return r.push(s.style),r.push(s.staticStyle),e("svg",{slot:"icon",staticClass:"svg-icon",class:[s.staticClass,s.class],style:r},[e("use",{attrs:{"xlink:href":"/public/sprites/starhit/76f2da056f37.svg#login_24"}})])}}},"9oO88Idxll":function(e,t,s){"use strict";s.r(t);var r=s("Kw5rN6UQTL"),n=s("vpJfr0CfOF"),o=s("L2JU6zrPjV"),i=s("vguvH+Slzb"),a=s("gO+He9WVnj"),u=s("wSgbc3WWZ0"),l=s("pHup3V+EQe"),c=s.n(l),d=s("l6pkU+WAzZ"),h=s.n(d),g=s("BoLnrIoO+H"),p=s.n(g),_=s("s/1JvIYyP5"),m=s.n(_),f=s("dxw8XoXU0X"),b=s.n(f),v=s("CYsa8FW2d9"),y=s.n(v),I=s("5K88KNhgbY"),C=s.n(I),w=s("ukRmuxVxl8"),x=s.n(w),k=s("EixE82PYg6"),S=s.n(k),B=s("sg4n/Gbnpv"),L=s.n(B),M=s("dfsjY0Qz4q"),j=s.n(M),O=s("RuciIiF4c2"),A=s.n(O),q=r.default.extend({components:{VK:h.a,FB:p.a,OK:m.a,YT:b.a,IN:y.a,TW:C.a,VB:x.a,TG:j.a,FLIP:A.a,YANEWS:L.a,ZEN:S.a},props:{socials:{required:!0,type:Array}}}),z=s("KHd+Ze9MJY"),E=Object(z.a)(q,(function(){var e=this,t=e._self._c;e._self._setupProxy;return t("div",{staticClass:"ds-burger-footer-social"},[t("ul",{staticClass:"ds-burger-footer-social__items"},[t("li",{staticClass:"ds-burger-footer-social__social-icons"},e._l(e.socials,(function(e){return t("a",{staticClass:"ds-burger-footer-social__social-icon",class:"ds-burger-footer-social__social-icon_".concat(e.component),attrs:{target:"_blank",href:e.href,title:e.title}},[t("span",{staticClass:"ds-burger-footer-social__icon-wrapper"},[t(e.component,{tag:"component",attrs:{size:16}})],1)])})),0)])])}),[],!1,null,null,null).exports,P=s("wSADEroIyM"),F=s.n(P),V=r.default.extend({components:{IconSearch24:F.a},methods:{clickSearch(){this.$emit("click")}}}),R=Object(z.a)(V,(function(){var e=this,t=e._self._c;e._self._setupProxy;return t("div",{staticClass:"ds-burger-footer-search"},[t("button",{staticClass:"ds-burger-footer-search__button",on:{click:e.clickSearch}},[t("IconSearch24",{staticClass:"ds-burger-footer-search__icon",attrs:{size:16}}),t("span",[e._v("Поиск")])],1)])}),[],!1,null,null,null).exports,N=s("9b7ElJQFef"),H=s.n(N),$=s("luywblSm1I"),K=s.n($),U=r.default.extend({components:{IconLogin24:H.a,IconLogout24:K.a},props:{isLoggedIn:{required:!0,type:Boolean}},methods:{clickLogoutButton(){this.$emit("clickLogoutButton")},onClickLoginButton(){this.$emit("clickLoginButton")}}}),J=Object(z.a)(U,(function(){var e=this,t=e._self._c;e._self._setupProxy;return t("div",{staticClass:"ds-burger-footer-auth"},[e.isLoggedIn?t("button",{staticClass:"ds-burger-footer-auth__login-button",on:{click:function(t){return e.$emit("logout")}}},[t("IconLogin24",{staticClass:"ds-burger-footer-auth__login-icon",attrs:{size:24}}),t("span",[e._v("Вход")])],1):t("button",{staticClass:"ds-burger-footer-auth__logout-button",on:{click:e.onClickLoginButton}},[t("IconLogout24",{staticClass:"ds-burger-footer-auth__logout-icon",attrs:{size:24}}),t("span",[e._v("Выход")])],1)])}),[],!1,null,null,null).exports;var Y=r.default.extend({components:{BurgerFooterSocials:E,BurgerFooterSearch:R,BurgerFooterAuth:J},props:{socials:{required:!0,type:Array},isLoggedIn:{required:!0,type:Boolean},withAuth:{required:!1,type:Boolean,default:!1},withSearch:{required:!1,type:Boolean,default:!1}},methods:{onSearch(){this.$emit("click:search")}}}),G=Object(z.a)(Y,(function(){var e=this,t=e._self._c;e._self._setupProxy;return t("div",{staticClass:"ds-burger-footer"},[t("BurgerFooterSocials",{attrs:{socials:e.socials}}),e.withSearch||e.withAuth?t("div",{staticClass:"ds-burger-footer__actions"},[e.withSearch?t("BurgerFooterSearch",{on:{click:e.onSearch}}):e._e(),e.withAuth?t("BurgerFooterAuth",{attrs:{isLoggedIn:e.isLoggedIn}}):e._e()],1):e._e()],1)}),[],!1,null,null,null).exports,T=r.default.extend({components:{BurgerFooter:G,IconExpandLess24:c.a},filters:{targetByMenuItem:a.a},props:{menuItems:{required:!1,default:()=>[],type:Array},secondMenuItems:{required:!1,default:()=>[],type:Array},page:{required:!0,type:i.a}},data:()=>({shownSubmenus:[],activeSubmenuMouseIndex:-1}),computed:{isExpandable(){for(const e of this.menuItems)if(e.childItems.length>0)return!0;return!1},menus(){return[this.prepareMenu(this.menuItems),this.prepareMenu(this.secondMenuItems)]}},methods:{prepareMenu(e){return e.reduce(((e,t)=>Object(u.a)(t,this.page)?(e.push({...t,url:{...t.url,cleanPath:t.pageId!==this.page.id?t.url.cleanPath:""}}),e):e),[])},onArrowClick(e){this.shownSubmenus.includes(e)?this.shownSubmenus=this.shownSubmenus.filter((t=>t!==e)):this.shownSubmenus.push(e)},getLinkStyles:e=>({[`_label-${e.label}`]:!!e.label}),onLinkClick(){this.$emit("click:link")},onMouseEnter(e){this.activeSubmenuMouseIndex=e},onMouseLeave(){this.activeSubmenuMouseIndex=-1}}}),W=Object(z.a)(T,(function(){var e=this,t=e._self._c;e._self._setupProxy;return t("div",{staticClass:"ds-burger-menu",class:{"ds-burger-menu_withArrow":e.isExpandable}},[t("nav",{staticClass:"ds-burger-menu__content"},[e._l(e.menus,(function(s,r){return[r>0&&s.length?t("hr",{staticClass:"ds-burger-menu__divider"}):e._e(),t("ul",{staticClass:"ds-burger-menu__items"},e._l(s,(function(s,r){return t("li",{staticClass:"ds-burger-menu__item"},[t("div",{staticClass:"ds-burger-menu__button-container",class:{"ds-burger-menu__button-container_no-hover":e.activeSubmenuMouseIndex===r}},[s.childItems&&s.childItems.length?t("button",{staticClass:"ds-burger-menu__arrow",class:{"ds-burger-menu__arrow_active":e.shownSubmenus.includes(r)},on:{click:function(t){return e.onArrowClick(r)}}},[t("IconExpandLess24",{staticClass:"ds-burger-menu__arrow-icon",attrs:{size:24}})],1):e._e(),t("a",{staticClass:"ds-burger-menu__link",class:e.getLinkStyles(s),attrs:{href:s.url.cleanPath+s.url.queryString},on:{click:function(t){return e.onLinkClick(s)}}},[e._v(e._s(s.displayName))])]),t("transition",{attrs:{name:"sub-menu"}},[t("ul",{directives:[{name:"show",rawName:"v-show",value:e.shownSubmenus.includes(r),expression:"shownSubmenus.includes(index)"}],staticClass:"ds-burger-menu__item-children",on:{mouseenter:function(t){return e.onMouseEnter(r)},mouseleave:function(t){return e.onMouseLeave(r)}}},e._l(s.childItems,(function(r){return t("li",{staticClass:"ds-burger-menu__item-child"},[t("a",{staticClass:"ds-burger-menu__child-link",attrs:{target:e._f("targetByMenuItem")(s,e.page),href:r.url.cleanPath},on:{click:function(t){return e.onLinkClick(r)}}},[e._v(e._s(r.displayName))])])})),0)])],1)})),0)]}))],2)])}),[],!1,null,null,null).exports,Z=s("ZlMqHogBCL"),D=s.n(Z),Q=r.default.extend({components:{IconClose24:D.a},props:{iconRight:{required:!0,type:Boolean},page:{required:!0,type:i.a}},computed:{showRightIcon(){return this.iconRight}},methods:{clickClose(){this.$emit("click:close")}}}),X=Object(z.a)(Q,(function(){var e=this,t=e._self._c;e._self._setupProxy;return t("div",{staticClass:"ds-burger-header"},[t("button",{staticClass:"ds-burger-header__close",on:{click:e.clickClose}},[t("IconClose24",{attrs:{size:24}})],1),t("div",{staticClass:"ds-burger-header__content"},[t("a",{staticClass:"ds-burger-header__small-logo",attrs:{itemscope:"",itemprop:"logo",itemtype:"http://schema.org/ImageObject",href:"/"!==e.page.url?"/":null}},[e._t("smallLogo")],2)]),e.iconRight?t("a",{staticClass:"ds-burger-header__right-button",attrs:{href:"/"!==e.page.url?"/":null,target:"_blank"}},[e.showRightIcon?t("div",{staticClass:"ds-burger-header__right-button-icon"},[e._t("rightIcon")],2):e._e()]):e._e()])}),[],!1,null,null,null).exports,ee=r.default.extend({components:{BurgerHeader:X,BurgerMenu:W,BurgerFooter:G},filters:{targetByMenuItem:a.a},data:()=>({shownSubmenus:[]}),props:{menuItems:{required:!1,default:()=>[],type:Array},secondMenuItems:{required:!1,default:()=>[],type:Array},iconRight:{required:!1,default:!1,type:Boolean},isVisible:{required:!1,default:!1,type:Boolean},socials:{required:!1,type:Array,default:()=>[]},isLoggedIn:{required:!0,type:Boolean},withAuth:{required:!1,type:Boolean,default:!1},withSearch:{required:!1,type:Boolean,default:!1},page:{required:!0,type:i.a}},methods:{hideBurger(){this.$emit("update:isVisible")},clickSearch(){this.$emit("click:search")},onClickMenuItem(){this.$emit("click")}}}),te=Object(z.a)(ee,(function(){var e=this,t=e._self._c;e._self._setupProxy;return t("div",{staticClass:"ds-burger",class:{"ds-burger_visible":e.isVisible}},[t("div",{staticClass:"ds-burger__wrapper"},[t("BurgerHeader",{attrs:{iconRight:e.iconRight,page:e.page},on:{"click:close":e.hideBurger}},[e._t("smallLogo",null,{slot:"smallLogo"}),e._t("rightIcon",null,{slot:"rightIcon"})],2),t("BurgerMenu",{attrs:{menuItems:e.menuItems,secondMenuItems:e.secondMenuItems,page:e.page},on:{"click:link":e.onClickMenuItem}}),t("BurgerFooter",{attrs:{socials:e.socials,withAuth:e.withAuth,withSearch:e.withSearch,isLoggedIn:e.isLoggedIn},on:{"click:search":e.clickSearch}})],1),t("transition",{attrs:{name:"overlay"}},[t("div",{directives:[{name:"show",rawName:"v-show",value:e.isVisible,expression:"isVisible"}],staticClass:"ds-burger__overlay",on:{click:e.hideBurger}})])],1)}),[],!1,null,null,null).exports,se=s("f6HOqDyfKF"),re=s("ikr7gjAPtG"),ne=s("c6nNLv0X5Z"),oe=s("t1RXRUtxyd"),ie=s("7vrMFyKtUP"),ae=s("Eigmez1aXy"),ue=s("2lomReFycv"),le=Object(r.defineComponent)({__name:"DSAppBurger",props:{store:null},setup(e,{expose:t}){const s=e;t({toggle:g});const i=Object(re.a)(),a=Object(ne.a)(),{page:u}=Object(n.f)(i),{project:l}=Object(n.f)(a),c=Object(r.computed)({get:()=>s.store.state[se.b.MENU].isVisibleHiddenMenu,set(){g()}}),d=Object(r.computed)((()=>Object(oe.d)({rootGetters:s.store.getters}))),h=Object(r.computed)((()=>l.value.putSecondMenuToBurger?Object(oe.g)({rootGetters:s.store.getters}):[]));function g(){s.store.dispatch(Object(ie.a)(se.b.MENU,oe.a.TOGGLE_HIDDEN_MENU),null,{root:!0})}return{__sfc:!0,props:s,pageStore:i,projectStore:a,page:u,project:l,isVisible:c,mainMenuItems:d,secondMenuItems:h,toggle:g,toggleSearch:function(){Object(ue.d)(s.store)},computed:r.computed,storeToRefs:n.f,Store:o.a,Burger:te,RootModules:se.b,usePageStore:re.a,useProjectStore:ne.a,MenuActions:oe.a,useBurgerMenu:oe.d,useSecondMenu:oe.g,storePath:ie.a,Logo:ae.b,toogleSearch:ue.d}}}),ce=Object(z.a)(le,(function(){var e=this,t=e._self._c,s=e._self._setupProxy;return t(s.Burger,{staticClass:"app-burger",attrs:{isVisible:s.isVisible,menuItems:s.mainMenuItems,secondMenuItems:s.secondMenuItems,page:s.page,socials:s.project.footer.socials,withAuth:!1,withSearch:!0,isLoggedIn:!1},on:{"update:isVisible":function(e){s.isVisible=e},"update:is-visible":function(e){s.isVisible=e},"click:search":s.toggleSearch,click:function(t){return e.$emit("click")}}},[t(s.Logo,{staticClass:"app-burger__logo",attrs:{slot:"smallLogo",projectKey:s.project.projectKey.toLocaleLowerCase(),size:"sm"},slot:"smallLogo"})],1)}),[],!1,null,null,null);t.default=ce.exports},ZlMqHogBCL:function(e,t){e.exports={name:"close_24Icon",functional:!0,render:function(e,t){const s=t.data;var r=[];if(s.attrs){var n=s.attrs.width||s.attrs.size,o=s.attrs.height||s.attrs.size,i={};n&&(i.width=n+"px"),o&&(i.height=o+"px"),r.push(i)}return r.push(s.style),r.push(s.staticStyle),e("svg",{slot:"icon",staticClass:"svg-icon",class:[s.staticClass,s.class],style:r},[e("use",{attrs:{"xlink:href":"/public/sprites/starhit/76f2da056f37.svg#close_24"}})])}}},luywblSm1I:function(e,t){e.exports={name:"logout_24Icon",functional:!0,render:function(e,t){const s=t.data;var r=[];if(s.attrs){var n=s.attrs.width||s.attrs.size,o=s.attrs.height||s.attrs.size,i={};n&&(i.width=n+"px"),o&&(i.height=o+"px"),r.push(i)}return r.push(s.style),r.push(s.staticStyle),e("svg",{slot:"icon",staticClass:"svg-icon",class:[s.staticClass,s.class],style:r},[e("use",{attrs:{"xlink:href":"/public/sprites/starhit/76f2da056f37.svg#logout_24"}})])}}},"pHup3V+EQe":function(e,t){e.exports={name:"expand_less_24Icon",functional:!0,render:function(e,t){const s=t.data;var r=[];if(s.attrs){var n=s.attrs.width||s.attrs.size,o=s.attrs.height||s.attrs.size,i={};n&&(i.width=n+"px"),o&&(i.height=o+"px"),r.push(i)}return r.push(s.style),r.push(s.staticStyle),e("svg",{slot:"icon",staticClass:"svg-icon",class:[s.staticClass,s.class],style:r},[e("use",{attrs:{"xlink:href":"/public/sprites/starhit/76f2da056f37.svg#expand_less_24"}})])}}},wSADEroIyM:function(e,t){e.exports={name:"search_24Icon",functional:!0,render:function(e,t){const s=t.data;var r=[];if(s.attrs){var n=s.attrs.width||s.attrs.size,o=s.attrs.height||s.attrs.size,i={};n&&(i.width=n+"px"),o&&(i.height=o+"px"),r.push(i)}return r.push(s.style),r.push(s.staticStyle),e("svg",{slot:"icon",staticClass:"svg-icon",class:[s.staticClass,s.class],style:r},[e("use",{attrs:{"xlink:href":"/public/sprites/starhit/76f2da056f37.svg#search_24"}})])}}}}]);