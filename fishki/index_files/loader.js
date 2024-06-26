window.addEventListener("error", function(e) {
	if (/(lk-gnezdo.com|.gnezdo.ru|.2xclick.ru)/i.test(e.filename) 
		&& !/sandbox/i.test(e.filename)
	){
		gnezdoErrorHandler(window, e.error)
	}
});
function gnezdoErrorHandler(window, error) {
	if (error && error.stack && error.stack != undefined){
		new Image().src = 'https://fcgi5.gnezdo.ru/cb/error/?message='+error.stack+'&location='+escape(window.location.href);
	} else if (console && console.trace() && console.trace() != undefined) {
		new Image().src = 'https://fcgi5.gnezdo.ru/cb/error/?message='+console.trace()+'&location='+escape(window.location.href);
	}
}

;function loadFP(callback) {
	var fpPromise;
    if ( typeof FingerprintJS == "object") {
        fpPromise = FingerprintJS.load();
        return callback(fpPromise);
    }
    var script = document.createElement('script');
    script.src = 'https://news.2xclick.ru/fingerprintjs/dist/fp.min.js';
    script.onload = function() { fpPromise = FingerprintJS.load(); return callback(fpPromise) };
    document.head.appendChild(script);
}


!function(){
    var regExp = function(name){
        return new RegExp('(^| )'+ name +'( |$)');
    };
    var forEach = function(list, fn, scope){
        for (var i = 0; i < list.length; i++){
            fn.call(scope, list[i]);
        }
    };
	function ClassList(element){
        this.element = element;
    }
	ClassList.prototype = {
        add: function(){
            forEach(arguments, function(name){
                if (!this.contains(name)) this.element.className += ' '+ name;
            }, this);
        },
        remove: function(){
            forEach(arguments, function(name){
                this.element.className = this.element.className.replace(regExp(name), '');
            }, this);
        },
        toggle: function(name){
            return this.contains(name)?(this.remove(name), false):(this.add(name), true);
        },
        contains: function(name){
            return regExp(name).test(this.element.className);
        },
        replace: function(oldName, newName){
            this.remove(oldName), this.add(newName);
        }
    };
	// IE8/9, Safari
    if (!('classList' in Element.prototype)){
        Object.defineProperty(Element.prototype, 'classList', {
            get: function(){
                return new ClassList(this);
            }
        });
    }

    // replace() support for others
    if (window.DOMTokenList && DOMTokenList.prototype.replace == null) {
        DOMTokenList.prototype.replace = ClassList.prototype.replace;
    }
	
	if (window.NodeList && !NodeList.prototype.forEach) {
		NodeList.prototype.forEach = Array.prototype.forEach || function (callback, thisArg) {
			thisArg = thisArg || window;
			for (var i = 0; i < this.length; i++) {
				callback.call(thisArg, this[i], i, this);
			}
		};
	}
}();

(function(ELEMENT) {
    ELEMENT.matches = ELEMENT.matches || ELEMENT.mozMatchesSelector || ELEMENT.msMatchesSelector || ELEMENT.oMatchesSelector || ELEMENT.webkitMatchesSelector;
    ELEMENT.closest = ELEMENT.closest || function closest(selector) {
		if (!this) return null;
        if (this.matches(selector)) return this;
        if (!this.parentElement) {return null}
        else return this.parentElement.closest(selector)
      };
}(Element.prototype));

(function() {
	if (!('IntersectionObserver' in window)) {
		var script = document.createElement('script');
		script.src = 'https://news.gnezdo.ru/js/intersection-observer.js';
		document.head.appendChild(script);
	}
})();

!function(){
'use strict';

	!function(){ 
		return (window.gnezdo && window.gnezdo.create) ? window.gnezdo : (window.gnezdo = {
			create: function(p){ 
				var self = this;
				self.left = 0;
				self.right = window.innerWidth || document.documentElement && document.documentElement.clientWidth || document.body && document.body.clientWidth || 0;
				self.top = 0;
				self.bottom = window.innerHeight || document.documentElement && document.documentElement.clientHeight || document.body && document.body.clientHeight || 0;
				self.fade_time = 1000;
				self.ref = (self._inIframe())?escape(document.referrer):escape(window.location.href);

				self.auto_conf = {
		            nodes: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'div', 'figure', 'center'],
                    looped: true,
		            banners_place: [
                        {
                            offset: 2290,  //отступ в символах от начала страницы
                            looped: true,  //зацикливать объявления
                            haveToBeAtLeast: 1500, //размещать следующий блок через n - символов
                            position: 'afterend' //вставка после контентного блока   
                        },
                  
                    ]
                };
                
                //Для ускорееной расстановки, ставим первый баннер при заргузкедом
                self.auto_conf_lite = {
                    nodes: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'div', 'figure', 'center'],
                    looped: false,
		            banners_place: [
                        {
                            offset: 290,  //отступ в символах от начала страницы
                            looped: false,  //зацикливать объявления
                            haveToBeAtLeast: 500, //размещать следующий блок через n - символов
                            position: 'afterend' //вставка после контентного блока   
                        },
                    ]
                };
				
				if (p && "object" == typeof p){
					if (p.containerId){
						self._create_banner(p);
					}else if (p.autoContainerSelector) {
					    
					    //Генерим контенер для первого баннера при загрузке дом
				    	if (p.autoContainerSelector === true){
							if (document.body && document.body.clientHeight > 0) {
								self.auto_conf_lite.root = self._find_content_block(document.body);
								if (self.auto_conf_lite.root) {
									self._auto_block( self.auto_conf_lite, p );
								}
							}
						} else if (p.autoContainerSelector && p.autoContainerSelector.length) {
							var auto_blocks = document.querySelectorAll(p.autoContainerSelector); 
							if (auto_blocks && auto_blocks.length > 0) {
								self.auto_conf_lite.root = auto_blocks[0];
								self._auto_block( self.auto_conf_lite, p ); 
							} 
						}
						
						//По полной загрузке документа со всеми картинками расставляем остальные баннеры
						if ( document.readyState == 'complete') {
							if (p.autoContainerSelector === true){
								if (document.body && document.body.clientHeight > 0) {
									self.auto_conf.root = self._find_content_block(document.body);
									if (self.auto_conf.root) {
										self._auto_block( self.auto_conf, p );
									}
								}
							} else if (p.autoContainerSelector && p.autoContainerSelector.length) {
								var auto_blocks = document.querySelectorAll(p.autoContainerSelector); 
								if (auto_blocks && auto_blocks.length > 0) {
									self.auto_conf.root = auto_blocks[0];
									self._auto_block( self.auto_conf, p ); 
								} 
							}
						
						} else {
							document.addEventListener('readystatechange', function () {
							    
								if (document.readyState == 'complete') {
									if (p.autoContainerSelector === true){
										if (document.body && document.body.clientHeight > 0) {
											self.auto_conf.root = self._find_content_block(document.body);
											if (self.auto_conf.root) {
												self._auto_block( self.auto_conf, p );
											}
										}
									} else if (p.autoContainerSelector && p.autoContainerSelector.length) {
										var auto_blocks = document.querySelectorAll(p.autoContainerSelector); 
										if (auto_blocks && auto_blocks.length > 0) {
											self.auto_conf.root = auto_blocks[0];
											self._auto_block( self.auto_conf, p ); 
										} 
									}
								}
							});    
					     }
					}else{
						//console.log("Incorrect parameter containerId");
						return false;
					};
				}else{
					//console.log("Incorrect input parameters");
					return false;
				};
			},
			_find_content_block: function( body ) {
			    
			    const const_conf = {
			        maxContentHeight: 700,
			        textLenght: 700,
			        nodesCnt: 9,
			        img: {
			            count: 5,
			            width: 400,
			            height: 300    
			        },
			        contentTags: ['P', 'DIV','ARTICLE','SECTION','FIGURE','CENTER','MAIN','HEADER'],
                    headersTags: ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'],
                    graphicTags: ['IMG','IFRAME'],
                    defaultClassPrefix: 'gnezdo_'
			    };
			    
			    var findContentElem = (function() { 
			        
			        var contentElem = {
                        textLenght: 0,
                        childNodes: 0,
                        imageNodes: 0,
                        findNode: '',
                    };
                    
                    return function(node, n) {
                             
                        if ((isTagsApproved(node, const_conf) || node.nodeName == 'BODY' )) {
                                
                                var tagsCount = isContentTagsCount(node, const_conf);
                                //Сразу отсеиваем ветки которые не подходят под условия
                                if (tagsCount > contentElem.childNodes && tagsCount > const_conf.nodesCnt) {
                                    
                                    var nodeLeng = node.innerText.length;
                                    var imgNodes = isImgTagsCount(node, const_conf);
                                    
                                    if (nodeLeng > const_conf.textLenght || imgNodes >= const_conf.img.count) {
                                        contentElem.textLenght    = nodeLeng;
                                        contentElem.childNodes    = tagsCount;
                                        contentElem.imageNodes    = imgNodes;
                                        contentElem.findNode      = node;
                                    }
                                     
                                }
                                
                                [].forEach.call(node.children, function(node, childNumber) {
                                    findContentElem(node, childNumber);
                                });
                            
                                return contentElem;
                        
                        }
                        
                    };
                })();
                
                var findElement = findContentElem(body);
                
                if (findElement && findElement.findNode) {
                    return findElement.findNode;    
                }
                
			    
			    function isImgTagsCount(node, options) {
			        var imgCount = 0;    
			        [].forEach.call(node.children, function(node) {
			            
			            if (options.graphicTags.indexOf(node.nodeName) > -1
			               // Возможно картинки еще не загрузились
			                && node.clientHeight > options.img.height
			                && node.clientWidth > options.img.width
			            ) {
			                imgCount++;
			            }    
			            
			            imgCount+= isImgTagsCount(node, options);
			            
			        });  
			        
			        return imgCount;  
			    }
			    
			    function isContentTagsCount(node, options) {
			        var nodeCount = 0;
			        //console.log(node);
			        [].forEach.call(node.children, function(node) {
			             if (options.contentTags.indexOf(node.nodeName) > -1) nodeCount++; 
			             if (options.headersTags.indexOf(node.nodeName) > -1) nodeCount++; 
			             if (options.graphicTags.indexOf(node.nodeName) > -1) nodeCount++;
			                   
			        });       
			        
			        return nodeCount;
			    }
			    
			    function isVisible(node) {
			       return !!( node.offsetWidth || node.offsetHeight || node.getClientRects().length );    
			    }
			    
			    function isTagsApproved(node, options) {
                  // текущая нода должна быть блоком контента (параграфом, дивом с текстом)
                  // и не должна быть скрыта
                    return options.contentTags.indexOf(node.nodeName) > -1 && isVisible(node);
                }
			    
			    function isContentLenght(node, options) {
                    return node 
                       && node.innerText 
                       && node.innerText.length > options.textLenght ? node.innerText.length : 0;
                }
			    
			},
			_auto_block: function ( conf, p ) {
			   var self = this;
              
               const defaults = {
                    contentTags:  ['P', 'DIV', 'FIGURE' ],
                    headersTags:  ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'],
                    graphicTags:  ['IMG','IFRAME'],
                    GrTextOffset: 50,
                    ImgToText:    {
                                    widthCof: 0.11,
                                    heightCof: 20 
                                  },
                    StaticBannerSelector: [ 
                                             "yatag", "sjdiv", ".adsbygoogle", ".buzz-container", ".buzzplayer-stage", ".vn-player", ".relap-default-wrapper", ".js-relap-widget-wrapper", "iframe.js-relap-widget", ".ttarget-ovl-player", ".trc_rbox_container", ".nr-player", "#adboxmedia", "#hpmd-wrapper", "#hpmd-stretch", '[id^="AdFox_banner_"]', '[id^="AdFox_iframe_"]', '[id^="Ya_sync_"]', '[id^="yandex_rtb_"]', '[id^="lx_"]', '[id^="google_ads_iframe_"]', '[id^="SC_TBlock_"]', '[id^="venus-"]', '[id^="aswift_"]', '[id^="plista_widget_"]', 
                                             '[id^="yandex_ad"]:not(.advblock)', '[id^="antc-placeholder-"]', '[id^="sas_iframe_"]', '[id^="NRent-"]', '[id^="admediator-"]', '[id^="advads-"]', "[data-la-block-show-id]",
                                             '[id^="content-auto-banner-"]', ".gnezdo_used"
                                          ],
                    StaticBannerOffset: 600,                       
                    looped: false,
               };
              
               const bannerDefaults = {
                     offset: 1000,
                     looped: true,
                     haveToBeAtLeast: 500,
                     position: 'afterend'
               };
              
               var getOwnPropertySymbols = Object.getOwnPropertySymbols;
               var hasOwnProperty = Object.prototype.hasOwnProperty;
               var propIsEnumerable = Object.prototype.propertyIsEnumerable;
               
                
               var options = objectAssign({}, defaults, conf);
              
               validateProperty(options, 'root', 'object');
               validateProperty(options, 'banners_place', 'array');
               validateProperty(options, 'nodes', 'array');
               validateProperty(options, 'looped', 'boolean');

               var places = [];
              
               for (var i in conf.banners_place) {
                    var place = objectAssign({}, bannerDefaults, options.banners_place[i], {index: i});
                    validateProperty(place, 'offset', 'number');
                    validateProperty(place, 'haveToBeAtLeast', 'number');
                    validateProperty(place, 'looped', 'boolean');
                    validateProperty(place, 'position', 'string');
                    places.push(place);
               }
                
               // get nodes lists and set banner
              
              
               var nodesList = ( options.nodes.length) ? options.root.querySelectorAll(options.nodes.join(', ')) : [];
               var nodes = Array.prototype.slice.call(nodesList);
               
               fillPlaces(nodes, places, options, self, p);    
                 
               function toObject(val) {
                  if (val === null || val === undefined) {
                    throw new TypeError('Object.assign cannot be called with null or undefined');
                  }

                  return Object(val);
               }

               function objectAssign(target, source) {
                  var from;
                  var to = toObject(target);
                  var symbols;

                  for (var s = 1; s < arguments.length; s++) {
                    from = Object(arguments[s]);

                    for (var key in from) {
                      if (hasOwnProperty.call(from, key)) {
                        to[key] = from[key];
                      }
                    }

                    if (getOwnPropertySymbols) {
                      symbols = getOwnPropertySymbols(from);
                      for (var i in symbols) {
                        if (propIsEnumerable.call(from, symbols[i])) {
                          to[symbols[i]] = from[symbols[i]];
                        }
                      }
                    }
                  }

                  return to;
               }
                               
               function validateProperty(source, path, type) {
                      var value = source[path];
                      
                      var valid = type === 'array' ? value instanceof Array : typeof value === type;
                      if (!valid) {
                        throw new Error('Property "' + path + '" of options have to be: ' + type + '.');
                      }
               }
                 
			   function fillPlaces(nodes, places, options, o, p) {
                      var bannerIndex = 0;
                      var stdout = '';
                      var anotherBannerStdout = '';
                    
                      var runtimePlaces = places;
                      var loopedPlaces = places.filter(function(place) {
                          return place.looped;
                      });
                      
                      for (var i = 0; i < nodes.length; i++) {
                        var place = runtimePlaces[bannerIndex];
                        if (!place) {
                          break;
                        }

                        var node = nodes[i];
                        var text = node.innerText || imgToText(node, options);
                       
                        if (!text) {
                           continue;
                        }
                        
                        stdout += text;
                       // console.log('stdout:'+stdout.length);
                        // get flags
                        var isTooLong = stdout.length > place.offset;
                        var isAllowedByLength = place.haveToBeAtLeast
                          ? getNodesLength(nodes, i, options) > place.haveToBeAtLeast : true;
                        
                        if (isAnotherBannerDetect(node, options) || anotherBannerStdout.length > 0) {
                            anotherBannerStdout += text;   
                            //console.log("banner:"+anotherBannerStdout.length)
                        }
                        
                        var isAllowedByAnotherBannerOffset = (!anotherBannerStdout.length || anotherBannerStdout.length > options.StaticBannerOffset ) ? 1 : 0;
                        
                        
                        if (isTooLong
                          && isAllowedByLength
                          && isApproved(nodes[i], options)
                          && isApprovedGraphicLast(nodes[i], options)
                          && isApprovedByPrevious(nodes, i, place, options)
                          && isApprovedByNext(nodes, i, place, options)
                          && isAllowedByAnotherBannerOffset
                        ) {
                          stdout = '';
                          anotherBannerStdout = '';

                          // append banner for the place
                          var id = 'content-auto-banner-' + i;
                          var banner = '<div id="' + id + '"></div>';
                          node.insertAdjacentHTML(place.position, banner);
                          
                          //load banner
                          p.containerId = id;
                          //console.log(p.containerId);
                          o._create_banner(p);

                          if (bannerIndex >= runtimePlaces.length - 1) {
                            if (options.looped && loopedPlaces.length) {
                              runtimePlaces = loopedPlaces;
                              bannerIndex = 0;
                            } else {
                              break;
                            }
                          } else {
                             bannerIndex++;
                          }
                        }
                      }
               }
                
               function imgToText(node, options) {
                    //Если в ноде присутсвуют картинки то конверртим их как текст
                    if (options.graphicTags && options.graphicTags.length > 0 && options.ImgToText) {
                        var detectGraphic = 0;
                        var heightSum = 0;
                        var widthSum  = 0;
                        
                        options.graphicTags.forEach( function (item) {
                            var list = node.querySelectorAll(item);
                            if (list && list.length ) {
                                detectGraphic += list.length;
                                list.forEach(function (elem) {
                                     
                                   //  console.log(elem.currentSrc + " w:" + elem.clientWidth + " h: "+elem.clientHeight);                                     
                                     widthSum += elem.clientWidth;
                                     heightSum += elem.clientHeight;
                                     
                                });
                                
                            }   
                        });
                        
                        if (detectGraphic > 0 && widthSum > 0 && heightSum > 0) {
                            
                            if (detectGraphic > 1) { //если картинок моного берем по размеру контенера
                                widthSum     = node.clientWidth;
                                heightSum    = node.clientHeight;
                            }
                                                       
                            var textW = Math.floor( widthSum*options.ImgToText.widthCof );
                            var textLen = Math.floor( (heightSum/options.ImgToText.heightCof)*textW );       
                            var text = '';
                            for(var i = 0; i < textLen; i++) {
                               text +='0';
                            }
                            return text;
                            
                        } 
                    }
                    
                    return '';
                    
               }
                
               function getNodesLength(nodes, index, options) {
                      var result = 0;
                      var imgText;
                      for (var i = index; i < nodes.length; i++) {
                            var node = nodes[i];
                            if (node && node.innerText) {
                                result += node.innerText.length;
                            } else if(node) {
                                imgText = imgToText(node, options);
                                result += imgText ? imgText.length : 0;    
                            }     
                            
                      }
                      
                      return result;
               }

               function getNodeLength(node, options) {
                     var result = 0;
                     var imgText;
                     if (node && node.innerText) {
                        result += node.innerText.length;
                     } else if(node) {
                        imgText = imgToText(node, options);
                        result += imgText ? imgText.length : 0;    
                     }
                     return result;     
               }

               function isApproved(node, options) {
                  // текущая нода должна быть блоком контента (параграфом, дивом с текстом)
                  return (options.contentTags.indexOf(node.nodeName) > -1);
               }
                
               function isAnotherBannerDetect(node, options) {
                   //Должны проверить что не в преведущей ноде не вследующей нет вызова сторонних баннеров     
                    var bannerDetect = 0; 
                          
                    if (options.StaticBannerSelector && options.StaticBannerSelector.length > 0) {
                       
                       options.StaticBannerSelector.forEach( function (selector) {
                          
                          var node_list = node.querySelectorAll(selector);
                          if (node_list && node_list.length > 0) {
                             bannerDetect++;   
                          }
                                 
                       }); 
                    }    
                    return bannerDetect;
               }
                                
               function isApprovedGraphicLast(node, options) {
                   // если картинка идет в конце текстового блока
                   // и за ней нет текста мы блок игнорим
                   var last_graghic_detect = 0;
                   if (options.graphicTags && options.graphicTags.length > 0) {
                       options.graphicTags.forEach( function (item) {
                            var list = node.querySelectorAll(item);
                            if (list.length > 0) {
                                var c_list = node.childNodes;     
                                [].forEach.call(c_list, function(elem) {
                                    //console.log(elem);
                                    if (last_graghic_detect == 1 && options.contentTags.indexOf(elem.nodeName) > -1) {
                                        var text_elem = elem.innerText;
                                        if (text_elem && text_elem.length > options.GrTextOffset) {
                                            last_graghic_detect = 0;
                                        }     
                                    }
                                    
                                    if (elem.nodeName == item) {
                                        last_graghic_detect = 1;    
                                    }
                                });
                                
                            }
                            
                       });
                   }
                   if (last_graghic_detect == 1) {
                      return 0; 
                   }
                   return 1;     
               }
                
               function isApprovedByPrevious(nodes, index, place, options) {
                  var previousNode = nodes[index - 1];
                  if (!previousNode) {
                    return true;
                  }

                  return true;
               }

               function isApprovedByNext(nodes, index, place, options) {
                  var nextNode = nodes[index + 1];
                  if (!nextNode) {
                    return false;
                  }

                  // следующая нода должна быть параграфом или заголовком
                  if (options.contentTags.indexOf(nextNode.nodeName) < 0
                    && options.headersTags.indexOf(nextNode.nodeName) < 0
                  ) {
                    return false;
                  }

                  // после предполагаемого места вставки рекламы
                  // должно быть определенное количество символов
                  var length = 0;
                  for (var i = index + 1; i < nodes.length; i++) {
                    var node = nodes[i];
                    var isContentTag = (options.contentTags.indexOf(node.nodeName) > -1);
                    var isHeaderTag =  (options.headersTags.indexOf(node.nodeName) > -1);
                    if (!isContentTag && !isHeaderTag) {
                        return false;
                    }

                    length += getNodeLength(node, options);
                    if (length >= place.haveToBeAtLeast) {
                        return true;
                    }
                  }

                  return false;
               } 
			      
			},
			_create_banner: function (p){
				var self = this;
				var b = document.getElementById(p.containerId);
				if (b){
					if (b.classList.contains("gnezdo_used")){
						//console.log("Block with id '"+p.containerId+"' already used");
						if (self['reload_'+p.containerId]){
							b.innerHTML = "";
						}else{
							return false;
						}
					}else{
						b.classList.add("gnezdo_used");
						if(p.tizerId == 331410 || p.tizerId == 334827 || p.tizerId == 334977) { // показывать только при первом заходе
							try {
								if(sessionStorage.getItem("__gnezdo_once")) {
									return;
								} else {
									sessionStorage.setItem("__gnezdo_once", 1);
								}
							} catch(ex) {}
						}
						if(p.tizerId == 332207) { // показывать только на четных заходах
							try {
								var c = parseInt(sessionStorage.getItem("__gnezdo_once")) || 1;
								sessionStorage.setItem("__gnezdo_once", c+1);
								if(c%2 == 1) {
									return;
								}
							} catch(ex) {}
						}
					}

					if (p.data || (p.tizerId && "number" == typeof p.tizerId)){
						var gw = b.clientWidth || 0, gh = b.clientHeight || 0;
						//self.base_domain = Math.random() > 0.5 ? "https://fcgi.gnezdo.ru" : "https://fcgi5.gnezdo.ru";
						self.base_domain = "https://fcgi5.gnezdo.ru";
						p.domain = (p.domain && "string" == typeof p.domain) ? p.domain : self.base_domain;
						if (p.domain == 'https://news.2xclick.ru') p.domain = self.base_domain;
						p.domain = p.domain.search(/^http/i) != -1 || p.domain.search(/^\/\//i) != -1 ? p.domain : "//"+p.domain;
														
						var gtid = self._getParameterByName('gnezdo_tid') || 0, gaid = 0, gtvm = self._getParameterByName('gnezdo_tvm') || '';
						if ((!gtid || gtid == p.tizerId) && gtvm && (gtvm == 'native' || gtvm == 'tizer')){
							gaid = self._getParameterByName('gnezdo_aid') || 0;
							if (gaid){
								var gaid_arr = [];
								gaid = gaid.split(',').forEach(function(id){
									id = id.replace(/\D/ig, '');
									if (id) gaid_arr.push(id);
								});
								gaid = gaid_arr.join(',');
							}
						}
						
						var debug = self._getParameterByName('gnezdo_debug') || 0;
						var gsnr = 0;
						var rt = '';
						if (self._storageAvailable('sessionStorage')){
							if (sessionStorage.getItem('gsnr') == null){
								var referrer = document.referrer;
								if (referrer){
									var matches = referrer.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
									var ref_domain = matches && matches[1]; 
									if (ref_domain){
										//console.log(referrer, ref_domain);
										if (ref_domain && ref_domain.match(/^(.+\.)?(vk.com|facebook.com|instagram.com|pinterest.com|ok.ru)$/)){
											sessionStorage.setItem('gsnr', 1);
											gsnr = 1;
										}else{
											sessionStorage.setItem('gsnr', 0);
										}
									}
								}
							}else{
								gsnr = sessionStorage.getItem('gsnr');
							}
							
							if (sessionStorage.getItem('rt') == null){
								var referrer = document.referrer;
								if (referrer){
									rt = 'other';
								}else{
									rt = 'direct';
								}
								sessionStorage.setItem('rt', rt);
							}else{
								rt = sessionStorage.getItem('rt');
							}
						}
						
						if (!p.ids) p.ids = 0;
						if (!self.ids){
							self.ids = '';
						}else if (self.ids.split(",").length > 50){
							self.ids = self.ids.split(",").slice(-50).join();
						}
						
						if (p.data){
							p.data = p.data.replace(/\r\n/ig, '<br/>');
							p.data = p.data.replace(/\n/ig, '<br/>');
							p.data = p.data.replace(/\r/ig, '<br/>');
							p.data = p.data.replace(/\t/ig, '&nbsp;&nbsp;&nbsp;&nbsp;');
							loader(JSON.parse(p.data));
						} else {
							loadFP(function(fpPromise) {
								fpPromise.then(function(fp) {
									return fp.get();
								}).then(function(res) {
									var visitorId = res.visitorId;
									
									var xhr;
									if (window.XMLHttpRequest){
										xhr = new XMLHttpRequest();
									} else {
										xhr = new ActiveXObject("Microsoft.XMLHTTP");
									};
									
									function xhr_tzr(){
										xhr.withCredentials = true;
										xhr.open("GET", p.domain+"/cgi-bin/tzr.fcgi?id="+p.tizerId+"&f=2&ref="+self.ref+"&gw="+gw+"&gh="+gh+"&gsnr="+gsnr+"&rt="+rt+"&gaid="+gaid+"&gtvm="+gtvm+"&ids="+self.ids+(debug?'&debug=1':'')+"&fp="+visitorId+(self.guid?"&guid="+self.guid:''), true);
										xhr.send();
									}
									
									xhr.onreadystatechange = function(){
										if (xhr.readyState != 4) return;
										if (xhr.status != 200){
											//console.log("Error loading TZR " + xhr.status + ": " + xhr.statusText);
											self['xhr_process'] = 0;
											b.classList.remove("gnezdo_used");
											return false;
										}else{
											var data = xhr.responseText ? JSON.parse(xhr.responseText) : undefined;
											if (p.ids_black_list && data && data.arr && data.arr.length) {
												for (var j = 0; j < data.arr.length; j++){
													self.ids = self.ids+','+data.arr[j].id;
												}
											}
											self['xhr_process'] = 0;
											
											// отложенное появление (стикеры)
											if(!self['reload_'+p.containerId] && (p.tizerId == 326829 || p.tizerId == 326871 || p.tizerId == 326936 || p.tizerId == 330867 || p.tizerId == 331464 || p.tizerId == 331995 || p.tizerId == 331996 || p.tizerId == 333134 || p.tizerId == 333334 || p.tizerId == 333340 || p.tizerId == 333342 || p.tizerId == 333348 || p.tizerId == 333451 || p.tizerId == 333452 || p.tizerId == 333453 || p.tizerId == 333456 || p.tizerId == 333584 || p.tizerId == 333610 || p.tizerId == 333615 || p.tizerId == 333656 || p.tizerId == 333767 || p.tizerId == 333766 || p.tizerId == 333765 || p.tizerId == 333764 || p.tizerId == 333763 || p.tizerId == 333782 || p.tizerId == 333784 || p.tizerId == 333824 || p.tizerId == 333825 || p.tizerId == 333826 || p.tizerId == 333828 || p.tizerId == 333977 || p.tizerId == 333976 || p.tizerId == 333975 || p.tizerId == 334132 || p.tizerId == 334133 || p.tizerId == 334134 || p.tizerId == 334162 || p.tizerId == 334245 || p.tizerId == 334275 || p.tizerId == 334382 || p.tizerId == 334383 || p.tizerId == 334392 || p.tizerId == 334443 || p.tizerId == 334978 || p.tizerId == 340251 || p.tizerId == 340257 || p.tizerId == 340261 || p.tizerId == 342472 || p.tizerId == 341639)) {
												return setTimeout(function() {
													loader(data);
												}, 15000);
											}
											loader(data);
										}
									};
									
									var xhrTimer = setInterval(function(){
										if (!self['xhr_process']){
											self['xhr_process'] = 1;
											
											var isMacLike = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform);
											var botPattern = "(googlebot\/|bot|Googlebot-Mobile|Googlebot-Image|Google favicon|Mediapartners-Google|bingbot|slurp|java|wget|curl|Commons-HttpClient|Python-urllib|libwww|httpunit|nutch|phpcrawl|msnbot|jyxobot|FAST-WebCrawler|FAST Enterprise Crawler|biglotron|teoma|convera|seekbot|gigablast|exabot|ngbot|ia_archiver|GingerCrawler|webmon |httrack|webcrawler|grub.org|UsineNouvelleCrawler|antibot|netresearchserver|speedy|fluffy|bibnum.bnf|findlink|msrbot|panscient|yacybot|AISearchBot|IOI|ips-agent|tagoobot|MJ12bot|dotbot|woriobot|yanga|buzzbot|mlbot|yandexbot|purebot|Linguee Bot|Voyager|CyberPatrol|voilabot|baiduspider|citeseerxbot|spbot|twengabot|postrank|turnitinbot|scribdbot|page2rss|sitebot|linkdex|Adidxbot|blekkobot|ezooms|dotbot|Mail.RU_Bot|discobot|heritrix|findthatfile|europarchive.org|NerdByNature.Bot|sistrix crawler|ahrefsbot|Aboundex|domaincrawler|wbsearchbot|summify|ccbot|edisterbot|seznambot|ec2linkfinder|gslfbot|aihitbot|intelium_bot|facebookexternalhit|yeti|RetrevoPageAnalyzer|lb-spider|sogou|lssbot|careerbot|wotbox|wocbot|ichiro|DuckDuckBot|lssrocketcrawler|drupact|webcompanycrawler|acoonbot|openindexspider|gnam gnam spider|web-archive-net.com.bot|backlinkcrawler|coccoc|integromedb|content crawler spider|toplistbot|seokicks-robot|it2media-domain-crawler|ip-web-crawler.com|siteexplorer.info|elisabot|proximic|changedetection|blexbot|arabot|WeSEE:Search|niki-bot|CrystalSemanticsBot|rogerbot|360Spider|psbot|InterfaxScanBot|Lipperhey SEO Service|CC Metadata Scaper|g00g1e.net|GrapeshotCrawler|urlappendbot|brainobot|fr-crawler|binlar|SimpleCrawler|Livelapbot|Twitterbot|cXensebot|smtbot|bnf.fr_bot|A6-Indexer|ADmantX|Facebot|Twitterbot|OrangeBot|memorybot|AdvBot|MegaIndex|SemanticScholarBot|ltx71|nerdybot|xovibot|BUbiNG|Qwantify|archive.org_bot|Applebot|TweetmemeBot|crawler4j|findxbot|SemrushBot|yoozBot|lipperhey|y!j-asr|Domain Re-Animator Bot|AddThis)";
											var re = new RegExp(botPattern, 'i');
											var isBot = re.test(navigator.userAgent);
											self.check_iframe = (isMacLike || isBot)?0:1;
											
											if (self.check_iframe){
												var gnezdo_uid = self._getCookie('gnezdo_uid');
												self.ls_available = self._storageAvailable('localStorage');
												if (gnezdo_uid){
													if (self.ls_available) localStorage.setItem("gnezdo_uid", gnezdo_uid);				
												}else{
													if (self.ls_available) gnezdo_uid = localStorage.getItem("gnezdo_uid");
													if (gnezdo_uid) document.cookie = "gnezdo_uid="+gnezdo_uid+";path=/;max-age=31536000;secure;samesite=none;domain=."+location.hostname.replace(/^www\./, '');
												}
												
												if (!gnezdo_uid){
													var iframe = document.createElement("iframe");
													iframe.src = "https://news.gnezdo.ru/1pc.html";
													iframe.style.display = 'none';
													document.body.appendChild(iframe);
													
													var once = 0; // одновременно могут быть несколько айфреймов, message придет несколько раз
													function gnezdoLoaderListener(event) {
														if (!event.data || !event.data.hasOwnProperty('gnezdo_uid')) {
															return;
														}
														if(once++) {
															return;
														}
														
														self.guid = event.data.gnezdo_uid || '';
														if (self.guid){
															document.cookie = "gnezdo_uid="+self.guid+";path=/;max-age=31536000;secure;samesite=none;domain=."+location.hostname.replace(/^www\./, '');
															if (self.ls_available) localStorage.setItem("gnezdo_uid", self.guid);
														}else{
															//gnezdo_uid = new Date().getTime().toString(16)+Math.random().toString(16).substring(2);
															//document.cookie = "gnezdo_uid="+gnezdo_uid+";path=/;max-age=31536000;secure;samesite=none;domain=."+location.hostname.replace(/^www\./, '');
															//if (self.ls_available) localStorage.setItem("gnezdo_uid", gnezdo_uid);
															//self.guid = gnezdo_uid;
														}
														xhr_tzr();
														clearInterval(xhrTimer);
													}
													
													if (window.addEventListener) {
														window.addEventListener("message", gnezdoLoaderListener, false);
													} else if (window.attachEvent) {
														window.attachEvent("onmessage", gnezdoLoaderListener);
													}
												}else{
													self.guid = gnezdo_uid || '';
													self.no_weborama_cm = 1;
													xhr_tzr();
													clearInterval(xhrTimer);
												}
											}else{
												self.guid = '';
												xhr_tzr();
												clearInterval(xhrTimer);
											}
										}
									}, 50);
								});
							});// loadFP end
						}// else
						
						function loader(data){
							var data_origin;
							
							if (data){
								if (data.changeId) p.tizerId = data.changeId;
								if (data.ref) self.ref = escape(data.ref);
								if (!data.guid) data.guid = '';
								
								var iframe;
								if (p.noframe){
									iframe = document.createElement("div");
								}else{
									iframe = document.createElement("iframe");
								}
								
								iframe.id = "gc_"+p.containerId;
								iframe.scrolling = "no";
								iframe.loading = "eager";
								iframe.allow = "autoplay";
								//if(data.size_static) {
								if(p.tizerId == 327122
								|| p.tizerId == 327123) {
									//var gw = data.gw ? data.gw+"px" : "100%";
									gw = "320px";
									iframe.style.setProperty( 'width',  gw, 'important' );
									iframe.style.setProperty( 'min-width',  gw, 'important' );
									iframe.style.setProperty( 'max-width',  gw, 'important' );
								} else
								if(p.tizerId == 327119
								|| p.tizerId == 327121) {
									gw = "calc(100vw - 40px)";
									iframe.style.setProperty( 'width',  gw, 'important' );
									iframe.style.setProperty( 'min-width',  gw, 'important' );
									iframe.style.setProperty( 'max-width',  gw, 'important' );
								} else {
									iframe.style.setProperty( 'width',  '100%', 'important' );
									iframe.style.setProperty( 'max-width',  '100%', 'important' );
								}
								
								if (data.rtb_banner || (data.native && data.arr.length) || (!data.arr.length && data.adv)){
									if (!data.arr.length && data.adv && data.adv_adaptive){
										iframe.style.setProperty( 'height',  0, 'important' );
										iframe.style.visibility = "hidden";
									}else{
										iframe.style.setProperty( 'height',  data.gh+'px', 'important' );
									}
								}else if (!p.noframe){
									iframe.style.setProperty( 'height',  0, 'important' );
									iframe.style.visibility = "hidden";
								}
								
								iframe.style.border = "none";
								
								if(data.sticky){
									iframe.style.position = "fixed";
									iframe.style.bottom = "0";
									iframe.style.top = "auto";
									iframe.style.zIndex = "999999";
									// фуллскрин
									if(p.tizerId == 326830 || p.tizerId == 326872 || p.tizerId == 330866 || p.tizerId == 331410 || p.tizerId == 332207 || p.tizerId == 333142 || p.tizerId == 333147 || p.tizerId == 333148 || p.tizerId == 333149 || p.tizerId == 333334 || p.tizerId == 333349 || p.tizerId == 333457 || p.tizerId == 333508 || p.tizerId == 333772 || p.tizerId == 333771 || p.tizerId == 333770 || p.tizerId == 333769 || p.tizerId == 333768 || p.tizerId == 333785 || p.tizerId == 334161 || p.tizerId == 334246 || p.tizerId == 334343 || p.tizerId == 334426 || p.tizerId == 334425 || p.tizerId == 334424 || p.tizerId == 334423 || p.tizerId == 334420 || p.tizerId == 334440 || p.tizerId == 334827 || p.tizerId == 334977 || p.tizerId == 335046 || p.tizerId == 334898 || p.tizerId == 335117 || p.tizerId == 335115 || p.tizerId == 335025 || p.tizerId == 340262) {
										iframe.style.height = "100%";
									}
									self['reload_'+p.containerId] = 1;

									if(p.tizerId == 326830 || p.tizerId == 326872 || p.tizerId == 330866 || p.tizerId == 331410 || p.tizerId == 332207 || p.tizerId == 333142 || p.tizerId == 333147 || p.tizerId == 333148 || p.tizerId == 333149 || p.tizerId == 333334 || p.tizerId == 333349 || p.tizerId == 333457 || p.tizerId == 333508 || p.tizerId == 333772 || p.tizerId == 333771 || p.tizerId == 333770 || p.tizerId == 333769 || p.tizerId == 333768 || p.tizerId == 333785 || p.tizerId == 334161 || p.tizerId == 334246 || p.tizerId == 334343 || p.tizerId == 334426 || p.tizerId == 334425 || p.tizerId == 334424 || p.tizerId == 334423 || p.tizerId == 334420 || p.tizerId == 334440 || p.tizerId == 334827 || p.tizerId == 334977 || p.tizerId == 335046 || p.tizerId == 334898 || p.tizerId == 335117 || p.tizerId == 335115 || p.tizerId == 335025 || p.tizerId == 340262) {
										// таймер, автозакрытие
										var t = 16;
										var interval = setInterval(function() {
											if(--t == 0) {
												clearInterval(interval);
												self._hideIframe(p.containerId);
											} else {
												var idocument = p.noframe ? iframe : (iframe.contentDocument || iframe.contentWindow.document);
												var ts = idocument.getElementsByClassName("timer");
												if(ts && ts.length) ts[0].innerText = t;
											}
										}, 1000);
									} else {
										setTimeout(function(){
											self.create(p);
										}, 30000);
									}
								}
								
								if (p.onLoad && "function" == typeof p.onLoad) p.onLoad(b);
								
								if (data.mask_id) data.ref_param = '&m='+data.mask_id;
								if (data.mh) data.ref_param = '&mh='+data.mh;
								if (!data.ref_param) data.ref_param = '';
								if (data.alg) data.ref_param += '&alg='+data.alg;
								data.gw = gw;
								if (document.body.clientWidth < 460) data.ref_param += '&mob=1'; 
								
								data.image_domain = (data.image_domain && "string" == typeof data.image_domain) ? data.image_domain : "https://news.gnezdo.ru";
								data.image_domain = data.image_domain.search(/^http/i) != -1 || data.image_domain.search(/^\/\//i) != -1 ? data.image_domain : "//"+data.image_domain;
								
								data_origin = JSON.parse(JSON.stringify(data));
								 
								var html = '';
								if (data.arr.length){
								    // Для теста RTB в начале блока
								    //data.arr[0].img = 'https://cdn.lifehacker.ru/wp-content/uploads/2020/01/1119-white-flower-2_1579261223.jpg';  
								    //data.arr[0].rtb = 1;
								    for (var i = 0; i < data.arr.length; i++){
										var an = data.arr[i];
										if (an.track_view && !p.testMode){
											an.track_view.forEach(function(url){
												new Image().src = url;
											});
										}
									}
									
									if (data.rtb_banner){
										html = self._createContentRTBBanner(data, p) || '';
									}else if (data.native){
										if (data.adserving){
											html = self._createContentNativeBanner(data, p) || '';
										}else{
											html = self._createContentNative(data, p) || '';
										}
									}else if (data.text_img == 'slider') {
										html = self._createContentSlider(data, p) || '';
									}else if (data.adaptive){
										html = self._createContentAdaptive(data, p) || '';
									}else if (data.custom){
										html = self._createContentCustom(data, p) || '';
									}else{
										html = self._createContent(data, p) || '';
									}
									html = '<script>(function(ELEMENT) { ELEMENT.matches = ELEMENT.matches || ELEMENT.mozMatchesSelector || ELEMENT.msMatchesSelector || ELEMENT.oMatchesSelector || ELEMENT.webkitMatchesSelector; ELEMENT.closest = ELEMENT.closest || function closest(selector) { if (!this) return null; if (this.matches(selector)) return this; if (!this.parentElement) {return null} else return this.parentElement.closest(selector) }; }(Element.prototype));</script>' + (p.noframe ? '<style>.gnezdo_native *, .gnezdo_main_block * {margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;line-height: 1;}</style>' : '') + html;
									
									if (p.onSuccess && "function" == typeof p.onSuccess) p.onSuccess(b);
								}else if (data.adv){
									html = data.adv;
									if (p.onStub && "function" == typeof p.onStub) p.onStub(b);					
								}else{
									if (p.onEmpty && "function" == typeof p.onEmpty) p.onEmpty(b);
								};
								var getAverageRGB = function (imgEl, idoc) {
									if (p.noframe) idoc = document;
									var blockSize = 1, // only visit every 5 pixels
									defaultRGB = {r:0,g:0,b:0}, // for non-supporting envs
									canvas = idoc.createElement('canvas'),
									context = canvas.getContext && canvas.getContext('2d'),
									data, width, height,
									i = -4,
									length,
									rgb = {r:0,g:0,b:0},
									count = 0;

									if (!context) {
										return defaultRGB;
									}

									height = canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
									width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;

									context.drawImage(imgEl, 0, 0);

									try {
										data = context.getImageData(0, 0, width, height);
									} catch(e) {
										/* security error, img on diff domain */
										return defaultRGB;
									}

									length = data.data.length;

									while ( (i += blockSize * 4) < length ) {
										++count;
										rgb.r += data.data[i];
										rgb.g += data.data[i+1];
										rgb.b += data.data[i+2];
									}
									if (rgb.r > rgb.g && rgb.r > rgb.b)
										rgb.r *= 1.1;
									else if (rgb.g > rgb.r && rgb.g > rgb.b)
										rgb.g *= 1.1;
									else if (rgb.b > rgb.r && rgb.b > rgb.g)
										rgb.b *= 1.1;

									// ~~ used to floor values
									rgb.r = ~~(rgb.r/count);
									rgb.g = ~~(rgb.g/count);
									rgb.b = ~~(rgb.b/count);
									if (rgb.r+rgb.g+rgb.b < 550) {
										rgb.r = ~~(rgb.r*1.3);
										rgb.g = ~~(rgb.g*1.3);
										rgb.b = ~~(rgb.b*1.3);
									}
									return rgb;

								}
								var o;
								function iLoad(){
									var idocument;
									if (p.noframe){
										idocument = iframe;
										idocument.innerHTML = html;
										self._nodeScriptReplace(idocument);
									}else{
										(iframe.contentWindow || iframe).addEventListener("error", function(e) {
											gnezdoErrorHandler(window.top || window.parent, e.error);
										});

										idocument = iframe.contentDocument || iframe.contentWindow.document;
										idocument.querySelector("html").innerHTML = html;
										self._nodeScriptReplace(idocument.querySelector("html"));
										
										/*
										var is_ie = window.navigator.userAgent.indexOf("MSIE ") > -1 || window.navigator.userAgent.indexOf("Trident/") > -1, is_edge = window.navigator.userAgent.indexOf("Edge") > -1, is_safari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent), is_chrome = window.navigator.userAgent.match(/Chrome\/(\d+)\./), is_smart_tv = window.navigator.userAgent.indexOf("SmartTV") > -1;
										
										if (is_ie || is_edge || is_smart_tv || is_safari || (is_chrome && is_chrome[1] && is_chrome[1] < 30)){
											idocument.open();
											idocument.write(html);													
										}else{
											idocument.open();
											idocument.write(html);
											idocument.close();
										};
										*/
									}
									//if(data.img_client_size) {
										data.img_client = undefined; // на случай повторного вызова iload
									//}


									if(data.view_token && !p.testMode){
										//фиксируем отрисовку
										var view_token = data.view_token;
										data.view_token = '';
										var xhr;
										if (window.XMLHttpRequest){
											xhr = new XMLHttpRequest();
										}else{
											xhr = new ActiveXObject("Microsoft.XMLHTTP");
										};
										
										function send_view_token(res){
											var visitorId = res.visitorId || '';
											var body = 'token='+encodeURIComponent(view_token)+"&uid="+data.uid+"&guid="+data.guid+"&hb="+(data.header_bidding?1:0)+"&r="+Math.random()+"&fp="+visitorId;
											xhr.withCredentials = true;
											xhr.open("POST", p.domain+"/v", true);
											xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
											xhr.send(body);
											
											xhr.onreadystatechange = function(){
												if (xhr.readyState != 4) return;
												if (xhr.status != 200){
													return false;
												}else{
													data.vt = xhr.responseText ? JSON.parse(xhr.responseText) : undefined;
													if (data.vt){
														var imgs = idocument.querySelectorAll('*[aid]');
														for (var i=0;i<imgs.length;i++){
															var img_b = imgs[i].getAttribute('aid');
															if (img_b && data.vt[img_b]){
																var links = imgs[i].closest('.gnezdo_block').getElementsByTagName('a');
																for(var j=0; j<links.length; j++){
																	if (links[j].getAttribute('href') && links[j].getAttribute('href') != 'javascript:void(0)'){
																		links[j].setAttribute('href', links[j].getAttribute('href')+'&vt='+data.vt[img_b]);
																	}
																}
															};
														};
													}
												}
											};
										}
										
										if (data.header_bidding){
											send_view_token({});
										}else{
											loadFP(function(fpPromise) {
												fpPromise.then(function(fp) {
													return fp.get();
												}).then(function(res) {
													send_view_token(res);
												});
											});
										}
									}

									if (idocument && (p.noframe || idocument.querySelector("html"))){
										//var renderCounter = 0;	
										var sliderInitialized = false;	
											
										function render(){																
											//renderCounter++;
											
											var height = 0;
											if (p.noframe){
												height = idocument.scrollHeight>=idocument.offsetHeight?idocument.scrollHeight:idocument.offsetHeight;
											}else{
												height = idocument.querySelector("html").scrollHeight>=idocument.querySelector("html").offsetHeight?idocument.querySelector("html").scrollHeight:idocument.querySelector("html").offsetHeight;
											}
											//console.log('render'+renderCounter, 'height'+height, new Date().getTime());
											//if (height && height>20){
												//iframe.style.height = height+"px";
												//iframe.style.maxHeight = height+"px";
												//iframe.style.visibility = "visible";
												if(p.tizerId == 326830 || p.tizerId == 326872 || p.tizerId == 330866 || p.tizerId == 331410 || p.tizerId == 332207 || p.tizerId == 333142 || p.tizerId == 333147 || p.tizerId == 333148 || p.tizerId == 333149 || p.tizerId == 333334 || p.tizerId == 333349 || p.tizerId == 333457 || p.tizerId == 333508 || p.tizerId == 333772 || p.tizerId == 333771 || p.tizerId == 333770 || p.tizerId == 333769 || p.tizerId == 333768 || p.tizerId == 333785 || p.tizerId == 334161 || p.tizerId == 334246 || p.tizerId == 334343 || p.tizerId == 334426 || p.tizerId == 334425 || p.tizerId == 334424 || p.tizerId == 334423 || p.tizerId == 334420 || p.tizerId == 334440 || p.tizerId == 334827 || p.tizerId == 334977 || p.tizerId == 335046 || p.tizerId == 334898 || p.tizerId == 335117 || p.tizerId == 335115 || p.tizerId == 335025 || p.tizerId == 340262) {
												} else {
													if (height && height>20) {
														iframe.style.setProperty( 'height',  height+'px', 'important' );
														iframe.style.setProperty( 'max-height',  height+'px', 'important' );
													}
												}
												//iframe.style.setProperty( 'visibility',  'visible', 'important' );
												if (p.ch_c){
													iframe.style.setProperty( 'opacity',  0, 'important' );
													iframe.style.setProperty( 'visibility',  'visible', 'important' );
													self._fade(self.fade_time, 'in', iframe);																	
												}else{
													iframe.style.setProperty( 'visibility',  'visible', 'important' );
													//console.log('visibility', new Date().getTime());
												}
												//if(data.img_client_size) {
												//	self._replaceGnezdoImgs(data, p.noframe ? document : idocument, idocument);
												//	setTimeout(function() {
												//		self._resizeGnezdoImgs(data, p.noframe ? document : idocument, idocument, iframe);
												//	}, 1000);
												//}
												
												var bird = idocument.getElementsByClassName('partner_link_bottom_wrap')[0];
												if (bird){
													try {
														bird.style.setProperty('top', '0px', 'important');
														bird.style.setProperty('right', '0px', 'important');
														var bird_rect = bird.getBoundingClientRect();
													} catch (i) {};
													if (bird_rect){
														//console.log(bird, bird_rect.top, bird_rect.right, bird.style.top.replace('px', ''), bird.style.right.replace('px', ''));
														var offsetTop = 999999;
														var offsetRight = 0;
														var gnezdo_img = idocument.getElementsByClassName('gnezdo_img');
														var cur_img;
														for (var i = 0; i < gnezdo_img.length; i++){
															var e = gnezdo_img[i].getBoundingClientRect();
															var cur = 0;
															if (e.width && e.top <= offsetTop) {offsetTop = e.top; cur++}
															if (e.width && e.right >= offsetRight) {offsetRight = e.right; cur++}
															if (cur >= 2) cur_img = gnezdo_img[i];
														};
														offsetTop = offsetTop - bird_rect.top;
														offsetRight = bird_rect.right - offsetRight;			
														//console.log(bird.style.top.replace('px', ''), offsetTop, bird.style.right.replace('px', ''), offsetRight);
														if (offsetTop) bird.style.setProperty('top', offsetTop+'px', 'important');
														if (offsetRight) bird.style.setProperty('right', offsetRight+'px', 'important');
														
														if (cur_img && cur_img.closest('.gnezdo_block') && offsetRight < 15 && offsetRight > -20){
															var cur_info = cur_img.closest('.gnezdo_block').querySelector('.gnezdo_info_icon');
															if (cur_info){
																var bcr = cur_info.getBoundingClientRect();
																if (offsetTop < bcr.height+3){
																	var offsetTop_gnezdo_info_icon = 22+offsetTop;
																	cur_info.style.setProperty('top', offsetTop_gnezdo_info_icon+'px', 'important');
																}
															}
														}
													};
												};

												if (data.arr.length && data.adaptive){
													function resize(){
														if (self['resize'+iframe.id]) return;
														self['resize'+iframe.id] = true;
														setTimeout(function(){
															self.left = 0;
															self.right = window.innerWidth || document.documentElement && document.documentElement.clientWidth || document.body && document.body.clientWidth || 0;
															self.top = 0;
															self.bottom = window.innerHeight || document.documentElement && document.documentElement.clientHeight || document.body && document.body.clientHeight || 0;
															gw = b.clientWidth-10 || 0;
															data.gw = gw;
															var html_old = html;
															html = self._createContentAdaptive(data, p) || '';
															if (html_old != html){
																//iframe.style.setProperty( 'visibility',  'hidden', 'important' );
																//iframe.style.setProperty( 'height',  0, 'important' );
																iLoad();
															};
															self['resize'+iframe.id] = false;												
														}, 1000);
													}
													setTimeout(function(){
														(iframe.contentWindow || iframe).onresize = resize;
													}, 500);
												};
												
												if (data.text_img == 'slider' && !sliderInitialized) {
													sliderInitialized = true;
													window.MG_Gallery = function ( obj ) {
														if (!(typeof obj === 'object' && obj !== null)) return; 
														var _obj = obj,
														_parent = _obj.parentElement,
														_swiper,
														_btnPrev = _obj.parentElement.querySelector('.swiper-button-prev'),
														_btnNext = _obj.parentElement.querySelector('.swiper-button-next'),
														_swiperContainer = _obj.querySelector('.swiper-container');
														
														var _addEvents = function(){
															_parent.addEventListener('mousemove', function(a) {
																var offsetLeft = 0;
																var iterator = _obj;
																while (iterator) { 
																	offsetLeft += iterator.offsetLeft; 
																	iterator = iterator.offsetParent;
																}
																var b = a.pageX - offsetLeft;

																if (b < _obj.clientWidth / 2) {
																	_obj.classList.add('MG_Gallery_left-btn');
																	_obj.classList.remove('MG_Gallery_right-btn')
																} else {
																	_obj.classList.add('MG_Gallery_right-btn');
																	_obj.classList.remove('MG_Gallery_left-btn')
																}
															});
															_parent.addEventListener('mouseleave', function() {
																_obj.classList.remove('MG_Gallery_left-btn');
																_obj.classList.remove('MG_Gallery_right-btn')
															});
														},

														_initSwiper = function(){
															var slides = _swiperContainer.querySelectorAll('.swiper-slide');

															var slideWidth = slides[0].offsetWidth + 
																parseInt(window.getComputedStyle(slides[0]).marginRight) +
																parseInt(window.getComputedStyle(slides[0]).marginLeft);
															
															var slideLength = slides.length;
															var slidesVisible = Math.floor(_swiperContainer.clientWidth / slideWidth);
															var slidesPerScroll = Math.floor((_swiperContainer.clientWidth+5) / slideWidth);
															var lenta = _swiperContainer.querySelector('.swiper-wrapper-lenta');
															lenta.parentNode.parentNode.style.height = lenta.clientHeight + 'px';
															
															var maxValue = slideWidth * slides.length - _swiperContainer.clientWidth;

															if (maxValue < 0)
																maxValue = 0;
															var scrolling = false;
															var curXPos;

															_btnPrev.classList.add('swiper-button-disabled');
															
															_btnNext.addEventListener('click', function() {
																if (scrolling)  return false;
																
																var left = parseInt(lenta.style.left || 0);
																var newValue = left - slidesPerScroll * slideWidth;
																
																//console.log(left, newValue, -maxValue);
																
																if (newValue <= -maxValue) {
																	newValue = -maxValue;
																	_btnNext.classList.add('swiper-button-disabled');
																} else {
																	_btnNext.classList.remove('swiper-button-disabled');
																}
																var step = Math.round((newValue - left) / 25);
																
																
																if (!step)
																	return false;

																_btnPrev.classList.remove('swiper-button-disabled');
																scrolling = true;
																var interval = setInterval(function() {
																	left += step;
																	if (Math.abs(left - newValue) < Math.abs(step)) {
																		left = newValue;
																		clearInterval(interval);
																		scrolling = false;
																	}
																	lenta.style.left = left + 'px';
																}, 16)
																
															});
															_btnPrev.addEventListener('click', function() {
																if (scrolling)  return false;
															   
																var left = parseInt(lenta.style.left || 0);
																var newValue = left + slidesPerScroll * slideWidth;
																if (newValue >= 0) {
																	newValue = 0;
																	_btnPrev.classList.add('swiper-button-disabled');
																} else {
																	_btnPrev.classList.remove('swiper-button-disabled');
																}
																//console.log(left, newValue);
																var step = Math.round((newValue - left) / 25);

																if (!step)
																	return false;

																_btnNext.classList.remove('swiper-button-disabled');
																scrolling = true;
																var interval = setInterval(function() {
																	left += step;
																	if (Math.abs(left - newValue) < Math.abs(step)) {
																		left = newValue;
																		clearInterval(interval);
																		scrolling = false;
																	}
																	lenta.style.left = left + 'px';
																}, 16)
															});
														},

														_init = function () {
															_initSwiper();
															if (data.tt && data.tt == 'desktop'){
																_addEvents();
															}else{
																_obj.classList.add('MG_Gallery_left-btn');
																_obj.classList.add('MG_Gallery_right-btn');
															}
														};
															
														_init();
													};
													
													new window.MG_Gallery( idocument.querySelector('.MG_Gallery') );
												}
										//	}else if (renderCounter < 20){
										//		setTimeout(render, 100);
										//	} else {
										        
												self._replaceGnezdoImgs(data, p.noframe ? document : idocument, idocument);
										//	};
										};
										
										if (data.rtb_banner || (!data.arr.length && data.adv)){
											render();
										}else{													
											var gnezdo_img = idocument.querySelectorAll(".gnezdo_img");
											[].forEach.call(gnezdo_img, function(img) {
												var scale = parseInt(img.offsetWidth)/200 ||1;
												scale = 1 + (scale-1)*0.5;
												[].forEach.call(img.closest(".gnezdo_block").querySelectorAll(".gnezdo_adv, .gnezdo_info_icon"), function(el) {
													el.style.transform = "scale("+scale+")";
												});
											});
											
											
											
											if (!data.native && gnezdo_img.length){
												if (self._imgLoaded(gnezdo_img)){
													render();
												} else {
													if (data.text_img == 'slider'){
														gnezdo_img[0].addEventListener("load", function(event) {
															render();
														});
													}else{
													    //Переделываем на пропис и ждем загрузки всех картинок
													    var imgList = [].slice.call(gnezdo_img); 
													    
													    //Добавим полифил для старых браузеров
													    if (Promise && !Promise.allSettled) {
                                                              Promise.allSettled = function (promises) {
                                                                return Promise.all(promises.map(function (promise) {
                                                                  return promise.then(function (value) {
                                                                    return { state: 'fulfilled', value: value };
                                                                  }).catch(function (reason) {
                                                                    return { state: 'rejected', reason: reason };
                                                                  });
                                                                }));
                                                              };
                                                        }
													    
													    Promise.allSettled(imgList.map(self._is_imgLoadedPromice)).then(function(results) {
                                                              //console.log('image loaded');
                                                              render();
                                                        });
													    
													    
														//gnezdo_img[gnezdo_img.length-1].addEventListener("load", function(event) {
														//	render();
														//});
													}
												}

												if (data.gradient && gnezdo_img) {
													[].forEach.call(gnezdo_img, function(img) {
														var oldCallback = img.onload;
														img.onload = function() {
															if (oldCallback)
																oldCallback();
															var height = ~~(this.height * .3);
															
															var rgb = {r:255,g:255,b:255};
															if (img.parentNode.parentNode.parentNode.getAttribute('rtb') == '0') rgb = getAverageRGB(this, idocument);
															
															var color = 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b +',1)',
															font_collor = 'black',
															partner_collor = '#444',
															light = false;
															if (1 - (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b)/255 < 0.5){
															}else{
																light = true;
																font_collor = 'white';
																partner_collor = '#cfcfcf';
															};
															var tizer = img.parentNode.parentNode;

															var titles = tizer.querySelectorAll('.mctitle span');
															// title.style.backgroundColor = color;
															[].forEach.call(titles, function(title) {
																title.style.color = font_collor;
																var titleContainer = title.parentNode;
																var pureRGB = 'rgb(' + rgb.r + ',' + rgb.g + ',' + rgb.b +')';
																titleContainer.style.cssText = 'padding-top: ' + height + 'px; background: linear-gradient(to top, '
																 + pureRGB + ' 0%, ' + pureRGB + ' ' + ~~(title.clientHeight*.9)+'px, transparent 100%);';
															});
														};
													});																
												} else if (data.stickyGradient && gnezdo_img) {
													[].forEach.call(gnezdo_img, function(img) {
														var oldCallback = img.onload;
														img.onload = function() {
															if (oldCallback)
																oldCallback();
															
															var rgb = getAverageRGB(this, idocument);
															if (data.stickyGradient == 3) {
																img.parentNode.parentNode.innerHTML += '<div style="background: linear-gradient(to right, transparent, rgb('+rgb.r+','+rgb.g+', '+rgb.b+'));"></div>';
																idocument.querySelector('.gnezdo_main_block').style.background = 'rgb('+rgb.r+','+rgb.g+', '+rgb.b+')';
															} else if (data.stickyGradient == 1) {
																idocument.querySelector('.gnezdo_main_block').style.background = 'rgb('+rgb.r+','+rgb.g+', '+rgb.b+')';
															}

															var light = false;
															if (1 - (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b)/255 < 0.5){
															}else{
																light = true;
															};

															idocument.querySelector('.gnezdo_block_inner a').style.color = light ? '#000' : '#fff';


														};
													});
												}
											};
										};
										
										if (p.onRender && "function" == typeof p.onRender) p.onRender(b);
									};
									
									data.rv_domain = (data.rv_domain && "string" == typeof data.rv_domain) ? data.rv_domain : self.base_domain;
									data.rv_domain = data.rv_domain.search(/^http/i) != -1 || data.rv_domain.search(/^\/\//i) != -1 ? data.rv_domain : "//"+data.rv_domain;
									o = o || {
										iframe: iframe,
										start: new Date(), 
										rv_proc: 50, 
										rv_time: 1000, 
										block_in: false, 
										tizerId: p.tizerId, 
										containerId: p.containerId, 
										uid: data.uid,
										guid: data.guid,
										gw: data.gw,
										gh: data.gh,
										slider: (data.text_img == 'slider' && !data.native)?1:0,
										rv_domain: data.rv_domain,
										ref_param: data.ref_param,
										image_domain: data.image_domain,
										teasers_in: {},
										is_loaded: 0,
										native: data.native?1:0,
										header_bidding: data.header_bidding?1:0,
										rvk: data.rvk,
										weborama_cm: data.weborama_cm,
										
										visible: false, 
										invisible: false, 
										change_content_processing: false,
										visible_start: 0,
										visible_timer: 60,
										invisible_start: 0,
										invisible_timer: 120,
										invisible_duration: 0,
										change_content_delay: 3000,
										testMode: p.testMode,
										data: data,
									};												
									o.for_send = [];								
									o.teasers = [];
									o.video_cnt = 0;
									var imgs = idocument.querySelectorAll('*[aid]');
									for (var i=0;i<imgs.length;i++){
										var img_b = imgs[i].getAttribute('aid');
										if (img_b && imgs[i].parentNode){
											var video_elem = imgs[i].closest('.gnezdo_block').getElementsByTagName('video');
											if (video_elem.length) {
												o.video_cnt++;
											}
											
											o.teasers.push({
												id : img_b, 
												elem: imgs[i].closest('.gnezdo_block'), 
												teaser_in: o.teasers_in[img_b]?true:false, 
												teaser_in_cnt: 0,
												teaser_in_time: 0,
												time_in: 0,
												gnezdo_href: (imgs[i].getAttribute('gnezdo_href') || imgs[i].parentNode.getAttribute('gnezdo_href') || imgs[i].parentNode.parentNode.getAttribute('gnezdo_href') || imgs[i].parentNode.parentNode.parentNode.getAttribute('gnezdo_href'))?true:false
											});
											
											if (o.teasers_in[img_b]){
												var links = o.teasers[o.teasers.length - 1].elem.getElementsByTagName('a');
												var attr = o.teasers[o.teasers.length - 1].gnezdo_href?'gnezdo_href':'href';															
												for(var j=0; j<links.length; j++){
													if (links[j].getAttribute(attr) && links[j].getAttribute(attr) != 'javascript:void(0)'){
														links[j].setAttribute(attr, links[j].getAttribute(attr)+'&vp='+o.teasers_in[img_b]);
													}
												}
											}
											
											if (data.arr.length) {
												for (var j = 0; j < data.arr.length; j++){
													var an = data.arr[j];
													if (an.id == img_b){
														if (an.track_view_real){
															o.teasers[o.teasers.length - 1].track_view_real = an.track_view_real;
														}
														if (an.track_video){
															o.teasers[o.teasers.length - 1].track_video = an.track_video;
														}
														break;
													}
												}
											};
										};
									};
									
									o.cnt = o.teasers.length;
									o.invisible_cnt = o.teasers.length-Object.keys(o.teasers_in).length;
									
									if (!o.is_loaded){
										o.is_loaded = 1;
										iAfterLoad(p, o);
									};
									
									if (data.callback && data.callback.end && !o.testMode) {
										new Image().src = p.domain+"/cb/end/?tizer_id="+p.tizerId;
									};
								};
								
								function iAfterLoad(p, o){	

									if ('IntersectionObserver' in window) {
										//console.log(o.teasers);
										var options = {
											threshold: o.rv_proc/100
										}
										var callback = function(entries, observer) {
											//console.log('invisible_cnt: '+o.invisible_cnt);
											if (o.invisible_cnt > 0){
												entries.forEach(function(entry){
													if (entry.intersectionRatio >= options.threshold){
														//console.log(entry.target, 'in', entry.intersectionRatio);
														var aid = entry.target.querySelector('*[aid]');
														if (aid){
															aid = aid.getAttribute('aid');
															o.teasers.forEach(function(teaser){
																if (teaser.id == aid){
																	if (!teaser.teaser_in){
																		teaser.time_in = entry.time;
																		if (o.rv_time - teaser.teaser_in_time > 100){
																			teaser.teaser_in_timer = setTimeout(function(){
																				self.teaser_for_send(o, teaser);
																				
																				setTimeout(function(){
																					if(!o.testMode){
																						self._check_for_send(o);
																					}
																				}, 100);
																				//console.log('rv fix '+aid, o.for_send);
																			}, o.rv_time - teaser.teaser_in_time);
																		}else{
																			self.teaser_for_send(o, teaser);
																			setTimeout(function(){
																				if(!o.testMode){
																					self._check_for_send(o);
																				}
																			}, 100);
																			//console.log('rv fix '+aid, o.for_send);
																		}
																	}
																	//console.log(aid, teaser);
																}
															});
														}
													}else{
														//console.log(entry.target, 'out', entry.intersectionRatio);
														var aid = entry.target.querySelector('*[aid]');
														if (aid){
															aid = aid.getAttribute('aid');
															o.teasers.forEach(function(teaser){
																if (teaser.id == aid){
																	if (teaser.time_in && !teaser.teaser_in){
																		teaser.teaser_in_time = teaser.teaser_in_time+(entry.time-teaser.time_in);
																		clearTimeout(teaser.teaser_in_timer);
																	}
																	//console.log(aid, teaser);
																}
															});
														}
													}
												});
											}
											//console.log(o.video_cnt);
											if (o.video_cnt > 0) {
												entries.forEach(function(entry){
													if (entry.isIntersecting){
														var aid = entry.target.querySelector('*[aid]');
														if (aid){
															aid = aid.getAttribute('aid');
															o.teasers.forEach(function(teaser){
																if (teaser.id == aid) {
																	var video = teaser.elem.getElementsByTagName('video');
																	if (video.length){
																		//  console.log('view');  
																		// Подсчет просмора видео
																		self._time_video_counter( o, video[0], teaser, 'play');
																	}
																}
															});
														}     
													}else{
														var aid = entry.target.querySelector('*[aid]');
														if (aid){
															aid = aid.getAttribute('aid');
															o.teasers.forEach(function(teaser){
																if (teaser.id == aid){
																	var video = teaser.elem.getElementsByTagName('video');
																	if (video.length){
																		//console.log('not_view');  
																		self._time_video_counter( o, video[0], teaser, 'pause');
																	}
																}
															});
														}  
													} 
												});
											}
											
										};
										
										var observer = new IntersectionObserver(callback, options);
										o.teasers.forEach(function(teaser){
											observer.observe(teaser.elem)
										});
									}else{
										self['scroll_check_block'+o.iframe.id] = function(){
											self._check_block(o);
										}
										
										if (p.amp){
											self['intersection_'+o.iframe.id] = {};
											
											window.parent.postMessage({
												sentinel: 'amp',
												type: 'send-intersections'
											}, '*');
											if (window.parent !== window.top){
												window.top.postMessage({
													sentinel: 'amp',
													type: 'send-intersections'
												}, '*');
											}
											
											function ampListener(event) {																
												if ((event.source != window.parent && event.source != window.top) || event.origin == window.location.origin || !event.data || event.data.sentinel != 'amp' || event.data.type != 'intersection') return;
												
												event.data.changes.forEach(function (change) {
													if (change.boundingClientRect && change.rootBounds) self['intersection_'+o.iframe.id] = change;
												});
											}
											
											if (window.addEventListener) {
												window.addEventListener("message", ampListener, false);
											} else if (window.attachEvent) {
												window.attachEvent("onmessage", ampListener);
											}
										}else if (self._inIframe()){
											self['intersection_'+o.iframe.id] = {};
											window.parent.postMessage({
												sentinel: 'gnezdo',
												type: 'send-intersections'
											}, '*');
											if (window.parent !== window.top){
												window.top.postMessage({
													sentinel: 'gnezdo',
													type: 'send-intersections'
												}, '*');
											}
											
											function gnezdoListener(event) {
												if ((event.source != window.parent && event.source != window.top) || !event.data || event.data.sentinel != 'gnezdo' || event.data.type != 'intersection') return;
												
												self['intersection_'+o.iframe.id] = event.data.change;
											}
											
											if (window.addEventListener) {
												window.addEventListener("message", gnezdoListener, false);
											} else if (window.attachEvent) {
												window.attachEvent("onmessage", gnezdoListener);
											}
										};
										
										setTimeout(function(){
										   
											if (self._get_proc(o, o.iframe) >= 10){
												o.block_in = true;
												self._check_teasers(o);
											}else{
												if (self._inIframe()){
													self['scroll_check_block'+o.iframe.id] = setInterval(function(){self._check_block(o)}, 2000);
												}else{
													if (window.addEventListener){
														window.addEventListener("scroll", self['scroll_check_block'+o.iframe.id]);
													}else if (window.attachEvent){ 
														window.attachEvent("onscroll", self['scroll_check_block'+o.iframe.id]);
													}else{
														self['scroll_check_block'+o.iframe.id] = setInterval(function(){self._check_block(o)}, 2000);
													};
												}
											};
										},1000);
									}
									
									//data.ch_c = 1;
									if (data.ch_c && data.arr.length) {
										self['reload_'+p.containerId] = 1;
										check_visibility();
									}
									
									if (!self.event_tracker && !p.testMode){
										self['event_tracker'] = function(e){
											self.window_active = true;
											if (!self.event_tracker[e.type]){
												self.event_tracker[e.type] = 1;
												
												self._track({
													hb: data.header_bidding,
													uid: data.uid,
													guid: data.guid,
													event: e.type,
													time: new Date().getTime()-o.start.getTime()
												});
												
												if(window.removeEventListener){
													window.removeEventListener(e.type, self['event_tracker'], {once:true});
												}else if (window.detachEvent) {
													window.detachEvent(e.type, self['event_tracker']);
												}
											};
										}
										
										if (window.addEventListener){
											window.addEventListener("scroll", self['event_tracker'], {once:true});
											window.addEventListener("mousemove", self['event_tracker'], {once:true});
											window.addEventListener("beforeunload", self['event_tracker'], {once:true});
											window.addEventListener("click", self['event_tracker'], {once:true});
											window.addEventListener("touchmove", self['event_tracker'], {once:true});
											
											window.addEventListener("blur", function(){
												self.window_active = false;
												
											}, false);
											window.addEventListener("focus", function(){
												self.window_active = true;
											}, false);
											
										}else if (window.attachEvent){ 
											window.attachEvent("onscroll", self['event_tracker']);
											window.attachEvent("onmousemove", self['event_tracker']);
											window.attachEvent("onbeforeunload", self['event_tracker']);
											window.attachEvent("onclick", self['event_tracker']);
											window.attachEvent("ontouchmove", self['event_tracker']);
											
											window.attachEvent("onblur", function(){
												self.window_active = false;
											});
											window.attachEvent("onfocus", function(){
												self.window_active = true;
											});
										};
									};
									
									// cookie matching (DMP)
									if (o && (o.uid || o.guid) && !o.testMode){
										new Image().src = "//x01.aidata.io/0.gif?pid=6915083&id="+(o.uid || o.guid);
										if (o.weborama_cm && !self.no_weborama_cm) new Image().src = "https://wf-ru.frontend.weborama.fr/stream/?wamid=8615&Wvar=%7B%22uid%22%3A%22"+(o.uid || o.guid)+"%22%7D&d.r="+Math.random();
										//new Image().src = "https://sync.1dmp.io/pixel.gif?cid=4619280f-7aee-412b-991e-5007b05519a2&brid=1b89b071-72bc-4c19-b96c-2ee973304856&pid=w&uid="+o.uid;
										new Image().src = "https://dmg.digitaltarget.ru/1/7213/i/i?a=948&e="+o.uid+"&i="+Math.random();
									}
									// cookie matching (openRTB)
									if (o && (o.uid || o.guid) && data.rtb_cm_list && !o.testMode){
										data.rtb_cm_list.forEach(function(cm_url){
											new Image().src = cm_url+(o.uid || o.guid);
										});									
									}
									
									return o;
								};
								
								function check_visibility(){
									if (!o.change_content_processing){
										var proc = self._get_proc(o, o.iframe);
										
										if(!o.visible){
											if(o.invisible){
												if(proc>0 && o.invisible_start && self.window_active){
													o.invisible_duration = Math.round((new Date() - o.invisible_start) / 1000);
													o.invisible_start = 0;
												};
												if(proc==0 && !o.invisible_start){
													o.invisible_start = new Date();
												};
											};
											if(proc>=50 && self.window_active){
												o.visible = true;
												
												if(!o.visible_start){
													o.visible_start = new Date();
												};
												
												if(o.invisible && o.invisible_duration >=o.invisible_timer){
													o.invisible = false;
													o.change_content_processing = true;
													o.invisible_duration = 0;
													o.invisible_start = 0;
													
													setTimeout(function(){
														self._fade(self.fade_time, 'out', iframe);
													}, o.change_content_delay-self.fade_time);
													
													setTimeout(function(){
														/*
														data = JSON.parse(JSON.stringify(data_origin));
														var j, temp;
														for(var i = data.arr.length - 1; i > 0; i--){
															j = Math.floor(Math.random()*(i + 1));
															temp = data.arr[j];
															data.arr[j] = data.arr[i];
															data.arr[i] = temp;
														}
														
														if (data.arr.length){
															if (data.native){
																html = self._createContentNative(data, p) || '';
															}else if (data.text_img == 'slider') {
																html = self._createContentSlider(data, p) || '';
															}else if (data.adaptive){
																html = self._createContentAdaptive(data, p) || '';
															}else if (data.custom){
																html = self._createContentCustom(data, p) || '';
															}else{
																html = self._createContent(data, p) || '';
															}
														}
														iLoad();
														self._fade(self.fade_time, 'in', iframe);
														o.visible_start = new Date();
														o.change_content_processing = false;
														*/
														p.ids = Object.keys(o.teasers_in).join();
														p.ch_c = 1;
														b.style.setProperty( 'height',  iframe.style.height, 'important' );
														self.create(p);
													}, o.change_content_delay);
												};
											};
										}else{
											if(proc==0 || !self.window_active){
												o.visible = false;
												o.invisible = true;
												o.visible_start = 0;
												
												if(!o.invisible_start){
													o.invisible_start = new Date();
												};
											}else if (o.visible_start && (Math.round((new Date() - o.visible_start) / 1000)>=o.visible_timer)){
												o.change_content_processing = true;

												setTimeout(function(){
													self._fade(self.fade_time, 'out', iframe);
												}, o.change_content_delay-self.fade_time);
												
												setTimeout(function(){
													/*
													data = JSON.parse(JSON.stringify(data_origin));
													var j, temp;
													for(var i = data.arr.length - 1; i > 0; i--){
														j = Math.floor(Math.random()*(i + 1));
														temp = data.arr[j];
														data.arr[j] = data.arr[i];
														data.arr[i] = temp;
													}
													
													if (data.arr.length){
														if (data.native){
															html = self._createContentNative(data, p) || '';
														}else if (data.text_img == 'slider') {
															html = self._createContentSlider(data, p) || '';
														}else if (data.adaptive){
															html = self._createContentAdaptive(data, p) || '';
														}else if (data.custom){
															html = self._createContentCustom(data, p) || '';
														}else{
															html = self._createContent(data, p) || '';
														}
													}
													iLoad();
													self._fade(self.fade_time, 'in', iframe);
													o.visible_start = new Date();
													o.change_content_processing = false;
													*/			
													p.ids = Object.keys(o.teasers_in).join();
													p.ch_c = 1;
													b.style.setProperty( 'height',  iframe.style.height, 'important' );
													self.create(p);
												}, o.change_content_delay);
												
											};
										};
									};
									//console.log('check_visibility');
									setTimeout(function(){check_visibility()}, 2000);
								}
								if (p.noframe){
									b.appendChild(iframe);
									iLoad();
								}else{
									iframe.onload = iLoad;
									b.appendChild(iframe);
								}
								if(!p.testMode){
									self._track({
										hb: data.header_bidding,
										uid: data.uid,
										guid: data.guid,
										tizerId: p.tizerId
									});
								}
							}
						}
					}else{
						//console.log("Incorrect parameter tizerId");
						b.classList.remove("gnezdo_used");
						return false;
					}
				}else{
					//console.log("Block with id '"+p.containerId+"' not found");
					return false;
				}
			},
			_nodeScriptReplace: function(containerElement) {
				var scriptElements = containerElement.querySelectorAll("script");
				
				if (scriptElements && scriptElements.length){
					for (var j = 0; j < scriptElements.length; j++) {
						var scriptElement = scriptElements[j];
						var clonedElement = document.createElement("script");
						if (scriptElement && scriptElement.attributes && scriptElement.attributes.length){
							for (var i = 0; i < scriptElement.attributes.length; i++) {
								var attribute = scriptElement.attributes[i];
								clonedElement.setAttribute(attribute.name, attribute.value);
							}
						}
						clonedElement.text = scriptElement.text;
						scriptElement.parentNode.replaceChild(clonedElement, scriptElement);
					};
				}
			},
			_storageAvailable: function(type) {
				try {
					var storage = window[type],
						x = '__storage_test__';
					storage.setItem(x, x);
					storage.removeItem(x);
					return true;
				}
				catch(e) {
					return false;
				}
			},
			_fade: function(fade_time, type, elem) {
				var isIn = type === 'in',
				opacity = isIn ? 0 : 1,
				interval = 50,
				gap = interval / fade_time;
				window.clearInterval(elem.fading);
				
				function func() {
					opacity = isIn ? opacity + gap : opacity - gap;
					elem.style.opacity = opacity;
					if(opacity <= 0 || opacity >= 1) window.clearInterval(elem.fading);
				};

				elem.fading = window.setInterval(func, interval);
			},
			_inIframe: function() {
				try {
					return window.self !== window.top;
				} catch (e) {
					return true;
				}
			},
			_getCookie: function(name) {
				var matches = document.cookie.match(new RegExp(
				"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
			  ));
			  return matches ? decodeURIComponent(matches[1]) : undefined;
			},
			_is_imgLoadedPromice: function(img) {
			    return new Promise(function(resolve) {
			        img.addEventListener('load', function() { 
			             return resolve(img); 
			        });
			        //img.addEventListener('error', (err) => reject(err));
			    });       
			},
			_imgLoaded: function(img) {
			  var count = 0;
			  img = [].slice.call(img);
			  img.map(function(i) {
			    if (i.complete && i.naturalHeight !== 0) count++; 
			  });
			 // console.log("test:"+count+"lib:"+img.length);
			  
			  if (count == img.length) return true;
			},
			_getParameterByName: function(name, url) {
				if (!url) url = window.location.href;
				name = name.replace(/[\[\]]/g, '\\$&');
				var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'), results = regex.exec(url);
				if (!results) return null;
				if (!results[2]) return '';
				return decodeURIComponent(results[2].replace(/\+/g, ' '));
			},
			_track: function(o){
				var self = this;
				if (!o.js) o.js = '';
				if (!o.event) o.event = '';
				if (!o.time) o.time = '';
				if (!o.tizerId) o.tizerId = '';
				if (!o.hb) o.hb = '';
				if (!o.uid) o.uid = '';
				if (!o.guid) o.guid = '';
				if (!o.testMode){
					new Image().src = self.base_domain+"/e/?dr="+escape(document.referrer)+"&du="+escape(document.URL)+(o.js?"&js="+o.js:'')+(o.event?"&e="+o.event:'')+(o.time?"&t="+o.time:'')+(o.tizerId?"&tizer_id="+o.tizerId:'')+(o.hb?"&hb=1":'')+(o.uid?"&uid="+o.uid:'')+(o.guid?"&guid="+o.guid:'')+"&r="+Math.random();
				}
			},
			_video_count: function(o, teaser, video_mode) {
			    if (!o.testMode) {
			        new Image().src = o.rv_domain+"/cgi-bin/video.fcgi?tizer_id="+o.tizerId+"&anons_id="+teaser.id+"&mode="+video_mode+"&uid="+o.uid+"&guid="+o.guid+"&r="+Math.random();
			    }				 
			},
			_time_video_counter: function(o, video, teaser, command){
			     var self = this; 
			     if (video) {
			       // console.log("test");
    			    if (command == 'play' && !video.classList.contains('repeat_video')){
                            
                            if (!video.classList.contains('play')) {                                					    
        					    video.play();
        				        video.classList.add('play');
        				    }
        				    
        				    if (video.classList.contains('w_pause')) {
        				        video.classList.remove('w_pause')    
        				    }
        				    
        				    if (video.classList.contains('w_hidden')) {
        				        video.classList.remove('w_hidden')    
        				    }
        				    
        					//реализация кросбраузерности
        					if (video.getAttribute('listener') !== 'true') {
        					    //console.log(video.getAttribute('listener'));
            					if (window.addEventListener){
        					    		video.addEventListener("ended", function(e){
											self._repeat_video(o, this, teaser);
                						}, false);
                						
            					} else if (window.attachEvent){
            						video.attachEvent("onended", function(){
            							self._repeat_video(o, this, teaser);
            							//console.log('lisen_two1');
            						});
            					} else {
            					    if (!video.onended) {
                						video.onended = function(){
                							self._repeat_video(o, this, teaser);
                							//console.log('lisen_two2');
                						}; 
            					    }
            					}
        					    video.setAttribute('listener', 'true');
        					}
        					
        					if (!teaser.video_counter) {
        					    teaser.video_counter = 0;
        					}
        					
        					if (!teaser.video_counter_stop) {
        					    teaser.video_counter_stop = 0;
        					}
        					
        				    if (!teaser.video_counter_interested) {
        				        teaser.video_counter_interested = 0;    
        				    }
        					if (!teaser.intervalId) {
            					teaser.intervalId = setInterval(function() {
            					    if (video.classList.contains('play')) {
        					           //Считаем постоянно
        					           teaser.video_counter++;
        					           
        					           if (video.classList.contains('w_pause') || video.classList.contains('w_hidden') ) {
        					                teaser.video_counter_stop++;
        					           }
        					           
        					           //Стопаем если невидно 10 сек;
        					           if (teaser.video_counter_stop == 10) {
        					                teaser.video_counter_stop = 0;
        					                clearInterval(teaser.intervalId);
        					                delete teaser.intervalId;
        					                self._time_video_counter(o, video, teaser, 'stop'); 
        					           } else {
        					                 self._video_count(o, teaser, 'view_time'); 
        					               //  console.log("1 seccc");   
        					           }
        					           
        					           
            					       if (!document.hidden && !video.classList.contains('w_pause')) {
            					            if (video.classList.contains('w_hidden')) {
            					                video.classList.remove('w_hidden');
            					               // video.play();
            					               // console.log("start_play");  
            					            }
            					        
            					            teaser.video_counter_interested++;
											
											//console.log(video.duration);
											if (teaser.track_video && video.duration && !o.testMode){
												[25, 50, 75, 100].forEach(function(i){
													if (teaser.track_video[i] && Math.round(video.duration/100*i) == teaser.video_counter_interested){
														if (i != 100) self._video_count(o, teaser, 'view'+i);
														new Image().src = teaser.track_video[i];
													}
												});
											}
            					        
                					        if (teaser.video_counter_interested == 10) {
                					           //console.log("view 10 sec");  
                					           self._video_count(o, teaser, 'interested');   
                					        } 
            					         
                					   } else {
                					       if (!video.classList.contains('w_hidden')) {
                					            //video.pause();
                					            video.classList.add('w_hidden');
                					       }
                					   }
                					         
            					    } else {
            					        clearInterval(teaser.intervalId);    
            					    }
            					}, 1000);
        					}

                    } else if (video.classList.contains('play') && command == 'pause') {
                           // console.log("pause");
                            video.classList.add('w_pause');
                            //video.pause();
                            //video.classList.remove('play');
                    } else if (video.classList.contains('play') && command == 'stop') {
                            video.pause();
                            video.classList.remove('play');
                            
                            if (document.hidden) {
                                    if (!teaser.intervalstopId) {
                                        teaser.intervalstopId = setInterval(function() {
                                             if (!document.hidden) {
                                                  self._time_video_counter(o, video, teaser, 'play');
                                                  clearInterval(teaser.intervalstopId);
                        					      delete teaser.intervalstopId;   
                                             }
                                        }, 1000);   
                                    }
                            } 
                    } 
                   
                 }    
		    },
			
			_repeat_video: function(o, video, teaser){
				var self = this, rect = self._get_rect(o, o.iframe);
				video.classList.remove('play');
				
				if (self._get_proc(o, video, rect, true) >= o.rv_proc && teaser.id && !o.testMode) {
		
				    self._video_count(o, teaser, 'end'); 
				    //console.log('end video');
			    }
				var wrap = video.parentNode;
				if (!wrap.querySelectorAll('img.repeat_video').length){
				    video.classList.add('repeat_video');
					var repeat_video = document.createElement('img');
					repeat_video.classList.add('repeat_video');
					repeat_video.src = o.image_domain+'/src/link_video.svg';
					repeat_video.style.cssText = "width: 50%;position: absolute;left: 25%;outline: none;top: 0;bottom: 0;margin: auto;z-index:3; box-shadow: 0 0 100px 50px black; background-color: black;";
					wrap.appendChild(repeat_video);
				}
			},
			_get_proc: function(o, elem, rect, in_iframe){
				var self = this, br;
				if (!rect){
					if (self['intersection_'+o.iframe.id]){
						rect = self['intersection_'+o.iframe.id].rootBounds;
					}else{
						rect = this;
					}
				}
				var s = elem.offsetWidth*elem.offsetHeight; 
				if (!s || !rect) return 0;
				
				try {br = elem.getBoundingClientRect();} catch (i) {}
				if (!br || (navigator.userAgent.toLowerCase().indexOf("opera mini") > -1)) return s > 0 ? 100 : 0; 
				
				var top = br.top, bottom = br.bottom, left = br.left, right = br.right;
				if (self['intersection_'+o.iframe.id] && !in_iframe){
					top += self['intersection_'+o.iframe.id].boundingClientRect.top;
					bottom += self['intersection_'+o.iframe.id].boundingClientRect.top;
					left += self['intersection_'+o.iframe.id].boundingClientRect.left;
					right += self['intersection_'+o.iframe.id].boundingClientRect.left;
				};
				var proc = 0;
				if (right > rect.left && left < rect.right && bottom > rect.top && top < rect.bottom){
					var sv = ((bottom>rect.bottom?rect.bottom:bottom) - (top>rect.top?top:rect.top))*((right>rect.right?rect.right:right) - (left>rect.left?left:rect.left));
					proc = Math.round(sv/s*100);
				};
				
				return proc;
			},
			_get_rect: function(o, elem){
				var self = this, parent_elem = this, rect = {}, br;
				if (self['intersection_'+o.iframe.id]){
					parent_elem = self['intersection_'+o.iframe.id].rootBounds;
				}
				
				try {br = elem.getBoundingClientRect()}catch (i){};
				if (br && (navigator.userAgent.toLowerCase().indexOf("opera mini") < 0)){
					var top = br.top, bottom = br.bottom, left = br.left, right = br.right;
					if (self['intersection_'+o.iframe.id]){
						top += self['intersection_'+o.iframe.id].boundingClientRect.top;
						bottom += self['intersection_'+o.iframe.id].boundingClientRect.top;
						left += self['intersection_'+o.iframe.id].boundingClientRect.left;
						right += self['intersection_'+o.iframe.id].boundingClientRect.left;
					};
					if (right>parent_elem.left && left<parent_elem.right && bottom>parent_elem.top && top<parent_elem.bottom){
						rect.top = top>=parent_elem.top ? 0 : (-1)*top;
						rect.bottom = bottom<=parent_elem.bottom ? elem.offsetHeight : elem.offsetHeight-bottom+parent_elem.bottom;
						rect.left = left>=parent_elem.left ? 0 : (-1)*left;
						rect.right = right<=parent_elem.right ? elem.offsetWidth : elem.offsetWidth-right+parent_elem.right;
					};
				};		

				return rect;
			},
			teaser_for_send: function(o, teaser){
				var self = this;
				var aid = teaser.id; 
				var sec = 1+Math.round((new Date() - o.start) / 1000);
				var links = teaser.elem.querySelectorAll('a:not(.secondary_link):not(.nopointer), div.rtb_banner');
				var attr = teaser.gnezdo_href?'gnezdo_href':'href';
				if (links.length){									
					if (links[0].getAttribute('rtb') && links[0].getAttribute('rtb') != '0') aid  = 'rtb' + links[0].getAttribute('rtb') + '==';
					var res = links[0].getAttribute(attr).match(/tag_id\=(\d+)[^\d]/);
					if (res) aid  = aid + 't' + res[1];										
					var res2 = links[0].getAttribute(attr).match(/fc\=([^\&]+)/);
					if (res2) aid  = aid + 'fc.' + res2[1];
				}
				for(var j=0; j<links.length; j++){
					if (links[j].getAttribute(attr) && links[j].getAttribute(attr) != 'javascript:void(0)'){
						links[j].setAttribute(attr, links[j].getAttribute(attr)+'&vp='+sec);
					}
				}
				teaser.teaser_in = true;
				o.teasers_in[teaser.id] = sec;
				o.invisible_cnt--;
				
				if (!o.rvk || o.rvk > Math.random()){
					o.for_send.push(aid);
					if (teaser.track_view_real && !o.testMode){
						teaser.track_view_real.forEach(function(url){
							new Image().src = url;
						});
					}
				}
			},
			_check_for_send: function(o){
				var self = this, rv_tizer_id = 0, for_send = [];
				if (o.for_send.length>0){
					if (o.for_send_process) return;
					o.for_send_process = 1;
					for_send = o.for_send;
					o.for_send = [];
					o.for_send_process = 0;
					if (o.slider){
						if (!o.slider_in){
							o.slider_in = 0;
							var rect = self._get_rect(o, o.iframe);	
							for (var i=0; i<o.cnt; i++){
								if (self._get_proc_by_width(o, o.teasers[i].elem, rect, true) >= o.rv_proc){
									o.slider_in++;
								};
							};
						}
						if (o.slider_in) rv_tizer_id = (for_send.length/o.slider_in).toFixed(2);
					}else{
						rv_tizer_id = (for_send.length/o.teasers.length).toFixed(2);
					}

					var ref = (self._inIframe())?escape(document.referrer):escape(window.location.href);
					if (!o.testMode){
						var is = self._logImgSizes(o);
						new Image().src = o.rv_domain+"/cgi-bin/rv.fcgi?tizer_id="+o.tizerId+"&rv_tizer_id="+rv_tizer_id+"&gw="+o.gw+"&gh="+o.gh+"&anons_ids="+for_send.join(",")+o.ref_param+"&uid="+o.uid+"&guid="+o.guid+"&hb="+(o.header_bidding?1:0)+"&ref="+self.ref+"&img_client="+is.client+"&img_natural="+is.natural+"&r="+Math.random();
					}
				};
			},
			_get_proc_by_width: function(o, elem, rect, in_iframe){
				var self = this, br;
				if (!rect){
					if (self['intersection_'+o.iframe.id]){
						rect = self['intersection_'+o.iframe.id].rootBounds;
					}else{
						rect = this;
					}
				}
				var s = elem.offsetWidth*elem.offsetHeight; 
				if (!s || !rect) return 0;
				
				try {br = elem.getBoundingClientRect();} catch (i) {}
				if (!br || (navigator.userAgent.toLowerCase().indexOf("opera mini") > -1)) return s > 0 ? 100 : 0; 
				
				var top = rect.top, bottom = rect.bottom, left = br.left, right = br.right;
				s = elem.offsetWidth*(bottom-top); 
				//console.log(elem.offsetWidth*elem.offsetHeight, s);
				
				if (self['intersection_'+o.iframe.id] && !in_iframe){
					top += self['intersection_'+o.iframe.id].boundingClientRect.top;
					bottom += self['intersection_'+o.iframe.id].boundingClientRect.top;
					left += self['intersection_'+o.iframe.id].boundingClientRect.left;
					right += self['intersection_'+o.iframe.id].boundingClientRect.left;
				};
				var proc = 0;
				if (right > rect.left && left < rect.right && bottom > rect.top && top < rect.bottom){
					var sv = ((bottom>rect.bottom?rect.bottom:bottom) - (top>rect.top?top:rect.top))*((right>rect.right?rect.right:right) - (left>rect.left?left:rect.left));
					proc = Math.round(sv/s*100);
				};
				//console.log(sv, s, proc);
				return proc;
			},
			_check_teasers: function(o){
				var self = this, rect = {};
				
				var proc = self._get_proc(o, o.iframe);				
				if (proc >= 10){
					rect = self._get_rect(o, o.iframe);					
					for (var i=0; i<o.cnt; i++){
						if (!o.teasers[i].teaser_in){	
							if (self._get_proc(o, o.teasers[i].elem, rect, true) >= o.rv_proc){
								o.teasers[i].teaser_in_cnt++;
								if (o.teasers[i].teaser_in_cnt >= (o.native?2:1)){		
									self.teaser_for_send(o, o.teasers[i]);
								}
							};
						};
					};
					if(!o.testMode){
						self._check_for_send(o);
					}
				}
				
				if (o.invisible_cnt > 0){
					setTimeout(function(){self._check_teasers(o)}, 1000);
				}else{ 
					if (self._inIframe()){
						clearInterval(self['scroll_check_block'+o.iframe.id]);
					}else{
						if (window.removeEventListener){
							window.removeEventListener("scroll", self['scroll_check_block'+o.iframe.id]);
						}else if (window.detachEvent) {
						    //console.log("aerewr");
							window.detachEvent("onscroll", self['scroll_check_block'+o.iframe.id]);
						}else{
							clearInterval(self['scroll_check_block'+o.iframe.id]);
						}
					}
				}
			},
			_check_block: function(o){
				var self = this;
				
				if (self['waiting'+o.iframe.id]) return;
				self['waiting'+o.iframe.id] = true;
				
				if (!o.block_in && self._get_proc(o, o.iframe) >= 10){
					o.block_in = true;
					setTimeout(function(){self._check_teasers(o)}, 0);
				};
				
				setTimeout(function(){self['waiting'+o.iframe.id] = false}, 100);
			},
			_hideIframe: function(id){
				var self = this;
				if (id && "string" == typeof id){
					self['reload_'+id] = 0;
					document.getElementById('gc_'+id).style.display = "none";
				}
			},			
			_gnezdoClickCheck: function(e, t){
				var self = this;
				e = e || window.event;
				var code = e.keyCode || e.which;
				if (code == 1){
					if (t && t.getAttribute('gnezdo_href')){
						var img = document.createElement('img');
						img.src = t.getAttribute('gnezdo_href')+'&px=1';
					}
					if (e.type == 'mousedown'){
						t.onmousedown = '';
					}else{
						t.onclick = '';
					}
				}
				return true;
			},
			_cssReplacer: function(css, containerId){
				var self = this;
				return css.replace(/([^\{\}]+)(\{[^\}]*\})/ig, function(m,s1,s2){
					if (/\@font-face/.test(s1)){
						return s1 + s2;
					}else if (/\@media/.test(s1)){
						return s1 + self._cssReplacer(s2, containerId);
					}else if (/html|body/.test(s1)){
						return '';
					}else if (/\s*,\s*/.test(s1)){
						var sels = s1.split(/\s*,\s*/);
						sels.forEach(function(sel, i){
							if (sel) sels[i] = containerId + ' ' + sel;
						});
						return sels.join(', ') + s2;
					}else{
						return containerId + ' ' + s1 + s2;
					}
				});
			},
			_gnezdo_adv_info_style: "\
				.gnezdo_adv{backdrop-filter: blur(1px);color: hsla(0,0%,100%,.64);font-family: Fira Sans,sans-serif;text-shadow: 0 0 4px rgb(0 0 0 / 40%);position: absolute;margin: 5px 0 0 0;z-index: 4; font-size: 8px;border-radius: 30px;padding: 0px 6px 0px; transform-origin: top left; background: rgba(0, 0, 0, 0.25);}\
				.gnezdo_info_icon{position:absolute;right:3px;top:3px;width:12px;height:12px;z-index:11;background:url(https://news.gnezdo.ru/src/info.svg) no-repeat center; background-size: contain; background-color: white; border-radius: 10px; transform-origin: top right;}\
				.gnezdo_info{position:absolute;z-index:10;display:none;left: 0;top: 0; text-align: left;right:0;background-color:#f3f3f3;color:#333;padding:2px;border:1px solid #ccc; font-family: Open Sans,Arial,Helvetica,sans-serif; font-size:10px;word-wrap: break-word;padding-right:18px;}\
				.gnezdo_info.active{display:block;}",
			_timer_style: "\
				.timer {\
					position: absolute;\
					left: -30px;\
					color: black;\
					top: 11px;\
					font-family: arial, sans-serif;\
					font-size: 14px;\
					width: 24px;\
					text-align: center;\
					display: inline-block;\
					background: #ccc;\
					line-height: 24px;\
					border-radius: 12px;\
				}\
				body::after { content: ''; position: absolute; display: block; top: 0; left: 0; width: 100%; border-bottom: 4px solid #faca46; z-index: 9999999; animation: 15.8s 1 normal timer linear; }\
				@keyframes timer { from { width: 0%; } to { width: 100%; } }",
			
			_srcGnezdoImg: function(data, img, tizerId) {
				var self = this;
				
				
				
				window.gnezdo.imgClientSizeCache = window.gnezdo.imgClientSizeCache || {};
				if(window.gnezdo.imgClientSizeCache[tizerId]) return window.gnezdo.imgClientSizeCache[tizerId]; // смотрим в кеш
				
				//console.log(data);
				//if(!data.img_client_size) return img; // если нет флага img_client_size то просто вернем картинку
				var ret = ''; // если флаг, то соберем прозрачный пнг заданных размеров
			
				var m = img.match(/([0-9]+)x([0-9]+)/);
				if(m && m.length>=2 && img.match(/zn4\./)) { 
					
					data.img_natural = { w: m[1], h: m[2] };
					var w = m[1], h = m[2];
					var canvas = document.createElement("canvas");
					canvas.width = w;
					canvas.height = h;
					ret = canvas.toDataURL("image/png");
					window.gnezdo.imgClientSizeCache[tizerId] = ret;
					
				} else if (data.arr.length > 1) {
				    //Если у нас несколько объявлений и первые идут rtb, то мы должны отрисовать заглушку основываясь на данных следующих объявлений
    			    data.arr.every( function (item) {
    			        var m = item.img.match(/([0-9]+)x([0-9]+)/);
    			        if (m && m.length>=2 && item.img.match(/zn4\./)) { 
    			         	//console.log("test");
    						data.img_natural = { w: m[1], h: m[2] };
    						var w = m[1], h = m[2];
    						var canvas = document.createElement("canvas");
    						canvas.width = w;
    						canvas.height = h;
    						ret = canvas.toDataURL("image/png");
    						window.gnezdo.imgClientSizeCache[tizerId] = ret;
    			            
    			            return false;
    			        }     
    			        return true;
    			    });    
				}
				
				if(!ret) { // если не смогли отрисовать вернем исходную
					ret = img;
				}
				return ret;
			},
			_replaceGnezdoImgs: function(data, idocument, idiv) {
				var self = this;
				var imgs = idiv.getElementsByClassName("gnezdo_img");
				if(imgs && imgs.length && data.arr && data.arr.length) {
					var cw = imgs[0].clientWidth, ch = imgs[0].clientHeight;
					var nw = cw, nh = ch;
					if(nw>1920) nw = 1920;
					if(nh>1080) nh = 1080;
					if(nw < 40 || nh < 40) {
						nw = data.img_natural.w;
						nh = data.img_natural.h;
					}
					if(cw != nw || ch != nh) {
						// log
					}
					if(!data.img_client || nw>data.img_client.w*1.1 || nh>data.img_client.h*1.1) { // апдейтим картинки если там заглушки, или было увеличение больше чем на 10%
						data.img_client = { w: nw, h: nh };
						Array.prototype.forEach.call(imgs, function(img, i) {
							if(data.arr[i] && data.arr[i].img) {
								var src = data.arr[i].img;
								var nsrc = src;
								
								if(nsrc.match(/zn4\./)) {
									nsrc = nsrc.replace(/[0-9]+x[0-9]+/, nw+"x"+nh);
								}
								var rsrc = src.replace(/zn4/, 'zn2');
								img.onerror = function() {
									this.alt = ""; // тоже очистим иначе вместо картинки моргает текст, пока заменяется
									this.onerror = function() {
										new Image().src = "https://fcgi5.gnezdo.ru/cb/stat/?obj=zn4_fallback_error&src="+encodeURIComponent(this.src);
										console.log('img error');
									};
									new Image().src = "https://fcgi5.gnezdo.ru/cb/stat/?obj=zn4_error&src="+encodeURIComponent(this.src);
									this.src = rsrc;
									var pic = img.parentNode;
									var sources = pic.getElementsByTagName("source");
									while(sources.length>0) {
										pic.removeChild(sources[0]);
									}
								};
								if(img.src != nsrc) {
									var pic = img.parentNode;
									var sources = pic.getElementsByTagName("source");
									if(sources.length && nsrc.match(/zn4\./)) {
										Array.prototype.forEach.call(sources, function(source, i) {
											var nsrcset = source.type == "image/webp" ? nsrc.replace(/jpg$/, 'webp') : nsrc;
											if(source.srcset != nsrcset) source.srcset = nsrcset;
										});
									} else {
										if (nsrc.match(/zn4\./)) {
    										var s_webp = idocument.createElement("source");
    										s_webp.type = "image/webp";
    										s_webp.srcset = nsrc.replace(/jpg$/, 'webp');
    										pic.insertBefore(s_webp, img);
									    }
										var s_jpg = idocument.createElement("source");
										s_jpg.type = "image/jpeg";
										s_jpg.srcset = nsrc;
										pic.insertBefore(s_jpg, img);
									}
									
									img.src = nsrc;
								}
							}
						});
					}
				}
			},
			_resizeGnezdoImgs: function(data, idocument, idiv, iframe) {
				var self = this;
				var iwnd = iframe.contentWindow || iframe;
				if(iwnd._resizeGnezdoImgAttached) return;
				iwnd._resizeGnezdoImgAttached = true;
				var tid;
				iwnd.addEventListener("resize", function() {
					tid && clearTimeout(tid);
					tid = setTimeout(function() {
						self._replaceGnezdoImgs(data, idocument, idiv);
					}, 200);
				});
			},
			_logImgSizes: function(o) {
				return {
					client: o.data && o.data.img_client ? o.data.img_client.w+"x"+o.data.img_client.h : '',
					natural: o.data && o.data.img_natural ? o.data.img_natural.w+"x"+o.data.img_natural.h : '',
				}
			},
			_createContent: function(data, p){
				if (p.css) data.css = p.css;
				var self = this, html = '<style>', partner = '', sticky = '', adv = '<div class="gnezdo_adv">&#1056;&#1045;&#1050;&#1051;&#1040;&#1052;&#1040;</div>';
				html += self._gnezdo_adv_info_style;
				if (!p.noframe){
					html += "html,body{margin:0;padding:0;}";
				}else if (p.noframe && data.css){
					data.css = self._cssReplacer(data.css, '#'+p.containerId);
				};
				html += (data.css?data.css:"")+"</style>";
				
				if (data.sticky){
					data.stickyGradient = data.css.match(/sticky-(\d+)/)[1];
					data.css = data.css.replace(/.*@import/, '@import');
					
					html = "<style>"+(data.css?data.css:"");
					if (!p.noframe){
						html += "html,body{margin:0;padding:0;}";
					}
					// стили таймера
					if(p.tizerId == 326830 || p.tizerId == 326872 || p.tizerId == 330866 || p.tizerId == 331410 || p.tizerId == 332207 || p.tizerId == 333142 || p.tizerId == 333147 || p.tizerId == 333148 || p.tizerId == 333149 || p.tizerId == 333334 || p.tizerId == 333349 || p.tizerId == 333457 || p.tizerId == 333508 || p.tizerId == 333772 || p.tizerId == 333771 || p.tizerId == 333770 || p.tizerId == 333769 || p.tizerId == 333768 || p.tizerId == 333785 || p.tizerId == 334161 || p.tizerId == 334246 || p.tizerId == 334343 || p.tizerId == 334426 || p.tizerId == 334425 || p.tizerId == 334424 || p.tizerId == 334423 || p.tizerId == 334420 || p.tizerId == 334440 || p.tizerId == 334827 || p.tizerId == 334977 || p.tizerId == 335046 || p.tizerId == 334898 || p.tizerId == 335117 || p.tizerId == 335115 || p.tizerId == 335025 || p.tizerId == 340262) {
						html += self._timer_style;
					}
					html += self._gnezdo_adv_info_style;
					html += "</style>";
					// спан таймера
					var timer = "";
					if(p.tizerId == 326830 || p.tizerId == 326872 || p.tizerId == 330866 || p.tizerId == 331410 || p.tizerId == 332207 || p.tizerId == 333142 || p.tizerId == 333147 || p.tizerId == 333148 || p.tizerId == 333149 || p.tizerId == 333334 || p.tizerId == 333349 || p.tizerId == 333457 || p.tizerId == 333508 || p.tizerId == 333772 || p.tizerId == 333771 || p.tizerId == 333770 || p.tizerId == 333769 || p.tizerId == 333768 || p.tizerId == 333785 || p.tizerId == 334161 || p.tizerId == 334246 || p.tizerId == 334343 || p.tizerId == 334426 || p.tizerId == 334425 || p.tizerId == 334424 || p.tizerId == 334423 || p.tizerId == 334420 || p.tizerId == 334440 || p.tizerId == 334827 || p.tizerId == 334977 || p.tizerId == 335046 || p.tizerId == 334898 || p.tizerId == 335117 || p.tizerId == 335115 || p.tizerId == 335025 || p.tizerId == 340262) {
						timer = '<span class="timer"></span>';
					}
					sticky += '<div class="sticky" onclick="parent.gnezdo._hideIframe(\''+p.containerId+'\');">'+timer+'<img src="//news.gnezdo.ru/img/x.svg" alt="" /></div><div style="clear: both"></div>';
				} else if (data.pt){
					partner = data.pl?'<div onmouseover="this.style.marginRight=\'0\';this.style.transform=\'translateX(0)\';" onmouseout="this.style.marginRight=\'24px\';this.style.transform=\'translateX(100%)\';" style="margin: 0 24px 0 0; transition: 0.7s; transform: translateX(100%);"><a rel="nofollow noreferrer" style="text-decoration:none; margin: 0; padding: 0; font: medium normal;" target="_blank" href="'+data.pl+'"><img loading="eager" style="height: 20px; vertical-align:middle; background: none; width: auto; display: block;" src="https://news.gnezdo.ru/img/settings/gnezdo_logo.png"></a></div>':'<a rel="nofollow noreferrer">'+data.pt+'</a>';
					partner = '<div class="partner_link_bottom_wrap" style="position: absolute; right: 0; left: auto; top:0; bottom: auto; overflow: hidden; z-index:10; font: normal medium normal;">'+partner+'</div>';
				}

				html += sticky+'<div style="position: relative;" class="gnezdo_main_block"><div class="gnezdo_header"><a rel="nofollow noreferrer" target="_blank" style="text-decoration:none;" href="https://www.gnezdo.ru/?news_id='+p.tizerId+'">'+(data.header_text?data.header_text:'')+'</a></div>'+partner+'<table '+(data.direction == 'table'?'class="gnezdo_table"':'border="0" cellpadding="0" cellspacing="0" width="100%"')+'>'+(data.direction == 'vertical'?'':'<tr>');
				
				var colls = data.cnt;
				if (data.direction == 'table' && data.table_rows) colls = data.table_rows;
				if (!colls) colls = 1;
				var w = 100/colls;
				var img_xy = data.image_size?data.image_size.split('x',2):['auto','auto'];

				for (var i = 0; i < data.arr.length; i++){
					var an = data.arr[i];
					if (an.img.toString().substring(0,4)!='http' && an.img.toString().substring(0,2)!='//' && an.img.toString().substring(0,4)!='data') an.img = data.image_domain+'/img/'+data.image_size+'/'+an.img;
					if (an.gnezdo_url) {
						an.gnezdo_url += data.ref_param;
					}else{
						an.url += data.ref_param;
					};
					an.cell_class = 'gnezdo_block gnezdo_cell';
					an.price_block = '';
					if (an.is_good){
						an.cell_class += ' gnezdo_good';
						if (an.price){
							an.price_block = '<div class="gnezdo_cell_price">';
							if (an.discount) an.price_block += '<div class="gnezdo_cell_discount"><a rel="nofollow '+(an.gnezdo_url?'noreferrer':'')+'" href="'+an.url+'" '+(an.gnezdo_url?' gnezdo_href="'+an.gnezdo_url+'" onmousedown="return parent.gnezdo._gnezdoClickCheck(event , this);"':'')+' target=_blank>-'+an.discount+'%</a></div><div class="gnezdo_cell_oldprice"><a rel="nofollow '+(an.gnezdo_url?'noreferrer':'')+'" href="'+an.url+'" '+(an.gnezdo_url?' gnezdo_href="'+an.gnezdo_url+'" onmousedown="return parent.gnezdo._gnezdoClickCheck(event , this);"':'')+' target=_blank>'+an.oldprice+' <font class="gnezdo_rub">'+an.currency+'</font></a></div>';
							an.price_block += '<div class="gnezdo_cell_newprice"><a rel="nofollow '+(an.gnezdo_url?'noreferrer':'')+'" href="'+an.url+'" '+(an.gnezdo_url?' gnezdo_href="'+an.gnezdo_url+'" onmousedown="return parent.gnezdo._gnezdoClickCheck(event , this);"':'')+' target=_blank>'+an.price+' <font class="gnezdo_rub">'+an.currency+'</font></a></div></div>';
						}
					}
					if (an.favicon_image){
						an.favicon_image = '<div class="gnezdo_cell_favicon" style="display: inline-block; padding-right: 5px;"><a rel="nofollow '+(an.gnezdo_url?'noreferrer':'')+'" href="'+an.url+'" '+(an.gnezdo_url?' gnezdo_href="'+an.gnezdo_url+'" onmousedown="return parent.gnezdo._gnezdoClickCheck(event , this);"':'')+' target=_blank><img loading="eager" border="0" src="'+data.image_domain+'/img/original/'+an.favicon_image+'" style="width: auto; vertical-align: middle;"></a></div>';
					}else{
						an.favicon_image = '';
					};		
					
					if (!an.text) an.text = '';
					
					var info = '';
					if (an.official_name || an.inn || an.erid){
						var gnezdo_info_icon_event = (data.tt && data.tt == 'mobile')?'onclick="this.nextSibling.classList.toggle(\'active\');"':'onmouseover="this.nextSibling.classList.add(\'active\');" onmouseout="this.nextSibling.classList.remove(\'active\');"';info = adv+'<div class="gnezdo_info_icon" '+gnezdo_info_icon_event+ '></div><div class="gnezdo_info">';
						if (an.official_name) info += '&#1056;&#1077;&#1082;&#1083;&#1072;&#1084;&#1086;&#1076;&#1072;&#1090;&#1077;&#1083;&#1100;: '+an.official_name+((an.inn||an.erid)?'<br/>':'');
						if (an.inn) info += '&#1048;&#1053;&#1053;: '+an.inn+(an.erid?'<br/>':'');
						if (an.erid) info += 'ERID:&nbsp;'+an.erid;
						info += '</div>';
					}else if (an.show_info){
						info = adv;
					}
					
					an.html = '<div style="position: relative" class="'+an.cell_class+'">'+info+'<div class="gnezdo_div_img"><a rel="nofollow '+(an.gnezdo_url?'noreferrer':'')+'" rtb="'+(an.rtb?an.rtb:0)+'" href="'+an.url+'"'+(an.gnezdo_url?' gnezdo_href="'+an.gnezdo_url+'" onmousedown="return parent.gnezdo._gnezdoClickCheck(event , this);"':'')+' target="_blank"><picture><img loading="eager" ' + (data.sticky ? ' crossorigin="anonymous" ' : '' ) +' border="0" aid="'+an.id+'" src="'+self._srcGnezdoImg(data, an.img, p.tizerId)+'" class="gnezdo_img" width="'+img_xy[0]+'" height="'+img_xy[1]+'" alt="'+an.title+'"></picture></a></div><div class="gnezdo_cell_header"><a rel="nofollow '+(an.gnezdo_url?'noreferrer':'')+'" rtb="'+(an.rtb?an.rtb:0)+'" href="'+an.url+'" '+(an.gnezdo_url?' gnezdo_href="'+an.gnezdo_url+'" onmousedown="return parent.gnezdo._gnezdoClickCheck(event , this);"':'')+' target="_blank">'+an.title+'</a></div>'+(data.show_anons?'<div class="gnezdo_cell_anons"><a rel="nofollow '+(an.gnezdo_url?'noreferrer':'')+'" rtb="'+(an.rtb?an.rtb:0)+'" href="'+an.url+'" '+(an.gnezdo_url?' gnezdo_href="'+an.gnezdo_url+'" onmousedown="return parent.gnezdo._gnezdoClickCheck(event , this);"':'')+' target="_blank">'+an.text+'</a></div>':'')+an.price_block+(data.show_partner?'<div class="gnezdo_cell_partner">'+(data.show_favicon?an.favicon_image:'')+an.site+'</div>':'')+(data.readmore_text?'<div class="gnezdo_readmore"><a rel="nofollow '+(an.gnezdo_url?'noreferrer':'')+'" rtb="'+(an.rtb?an.rtb:0)+'" href="'+an.url+'" '+(an.gnezdo_url?' gnezdo_href="'+an.gnezdo_url+'" onmousedown="return parent.gnezdo._gnezdoClickCheck(event , this);"':'')+' target="_blank">'+data.readmore_text+'</a></div>':'')+'</div>';
					
					if (data.direction == 'vertical'){
						html +='<tr><td>'+an.html+'</td></tr>';
					}else{
						html +='<td width="'+w+'%" class="gnezdo_td">'+an.html+'</td>';
						if ((i+1)%colls == 0) html +='</tr><tr>';
					}
				};

				html += (data.direction == 'vertical'?'':'</tr>')+'</table></div>';
				return html;
			},
			_createContentCustom: function(data, p){
				if (p.css) data.css = p.css;
				var self = this, html = "<style>", partner = '', sticky = '', adv = '<div class="gnezdo_adv">&#1056;&#1045;&#1050;&#1051;&#1040;&#1052;&#1040;</div>';
				html += self._gnezdo_adv_info_style;
				if (!p.noframe){
					html += "html,body{margin:0;padding:0;}";
				}else if (p.noframe && data.css){
					data.css = self._cssReplacer(data.css, '#'+p.containerId);
				};
				html += (data.css?data.css:"")+"</style>";
				
				if (data.sticky){
					data.stickyGradient = data.css.match(/sticky-(\d+)/)[1];
					data.css = data.css.replace(/.*@import/, '@import');

					html = "<style>"+(data.css?data.css:"");
					if (!p.noframe){
						html += "html,body{margin:0;padding:0;}";
					}
					// стили таймера
					if(p.tizerId == 326830 || p.tizerId == 326872 || p.tizerId == 330866 || p.tizerId == 331410 || p.tizerId == 332207 || p.tizerId == 333142 || p.tizerId == 333147 || p.tizerId == 333148 || p.tizerId == 333149 || p.tizerId == 333334 || p.tizerId == 333349 || p.tizerId == 333457 || p.tizerId == 333508 || p.tizerId == 333772 || p.tizerId == 333771 || p.tizerId == 333770 || p.tizerId == 333769 || p.tizerId == 333768 || p.tizerId == 333785 || p.tizerId == 334161 || p.tizerId == 334246 || p.tizerId == 334343 || p.tizerId == 334426 || p.tizerId == 334425 || p.tizerId == 334424 || p.tizerId == 334423 || p.tizerId == 334420 || p.tizerId == 334440 || p.tizerId == 334827 || p.tizerId == 334977 || p.tizerId == 335046 || p.tizerId == 334898 || p.tizerId == 335117 || p.tizerId == 335115 || p.tizerId == 335025 || p.tizerId == 340262) {
						html += self._timer_style;
					}
					html += self._gnezdo_adv_info_style;
					html += "</style>";
					// спан таймера
					var timer = "";
					if(p.tizerId == 326830 || p.tizerId == 326872 || p.tizerId == 330866 || p.tizerId == 331410 || p.tizerId == 332207 || p.tizerId == 333142 || p.tizerId == 333147 || p.tizerId == 333148 || p.tizerId == 333149 || p.tizerId == 333334 || p.tizerId == 333349 || p.tizerId == 333457 || p.tizerId == 333508 || p.tizerId == 333772 || p.tizerId == 333771 || p.tizerId == 333770 || p.tizerId == 333769 || p.tizerId == 333768 || p.tizerId == 333785 || p.tizerId == 334161 || p.tizerId == 334246 || p.tizerId == 334343 || p.tizerId == 334426 || p.tizerId == 334425 || p.tizerId == 334424 || p.tizerId == 334423 || p.tizerId == 334420 || p.tizerId == 334440 || p.tizerId == 334827 || p.tizerId == 334977 || p.tizerId == 335046 || p.tizerId == 334898 || p.tizerId == 335117 || p.tizerId == 335115 || p.tizerId == 335025 || p.tizerId == 340262) {
						timer = '<span class="timer"></span>';
					}
					sticky += '<div class="sticky" onclick="parent.gnezdo._hideIframe(\''+p.containerId+'\');">'+timer+'<img src="//news.gnezdo.ru/img/x.svg" alt="" /></div><div style="clear: both"></div>';
				} else if (data.pt){
					partner = data.pl?'<div onmouseover="this.style.marginRight=\'0\';this.style.transform=\'translateX(0)\';" onmouseout="this.style.marginRight=\'24px\';this.style.transform=\'translateX(100%)\';" style="margin: 0 24px 0 0; transition: 0.7s; transform: translateX(100%);"><a rel="nofollow noreferrer" style="text-decoration:none; margin: 0; padding: 0; font: medium normal;" target="_blank" href="'+data.pl+'"><img   ' + (data.sticky ? ' crossorigin="anonymous" ' : '' ) +' loading="eager" style="height: 20px; vertical-align:middle; background: none; width: auto; display: block;" src="https://news.gnezdo.ru/img/settings/gnezdo_logo.png"></a></div>':'<a rel="nofollow noreferrer">'+data.pt+'</a>';
					partner = '<div class="partner_link_bottom_wrap" style="position: absolute; right: 0; left: auto; top:0; bottom: auto; overflow: hidden; z-index:10; font: normal medium normal;">'+partner+'</div>';
				}
				
				html += sticky+'<div class="gnezdo_main_block"><div style="position: relative;" class="gnezdo_block_container"><div class="gnezdo_header"><a rel="nofollow noreferrer" target="_blank" style="text-decoration:none;" href="https://www.gnezdo.ru/?news_id='+p.tizerId+'">'+(data.header_text?data.header_text:'')+'</a></div>'+partner;
				
				
				
				var img_xy = data.image_size?data.image_size.split('x',2):[0,0];
				var k_xy = img_xy[0] && img_xy[1] ? img_xy[0]/img_xy[1] : 0;
				
				for (var i = 0; i < data.arr.length; i++){
					var an = data.arr[i];
					if (an.img.toString().substring(0,4)!='http' && an.img.toString().substring(0,2)!='//' && an.img.toString().substring(0,4)!='data') an.img = data.image_domain+'/img/'+data.image_size+'/'+an.img;
					if (an.gnezdo_url) {
						an.gnezdo_url += data.ref_param;
					}else{
						an.url += data.ref_param;
					};
					an.cell_class = 'gnezdo_block gnezdo_block'+i;
					an.price_block = '';
					if (an.is_good){
						an.cell_class += ' gnezdo_good';
						if (an.price){
							an.price_block = '<div class="gnezdo_cell_price">';
							if (an.discount) an.price_block += '<div class="gnezdo_cell_discount">-'+an.discount+'%</div><div class="gnezdo_cell_oldprice">'+an.oldprice+' <font class="gnezdo_rub">'+an.currency+'</font></div>';
							an.price_block += '<div class="gnezdo_cell_newprice">'+an.price+' <font class="gnezdo_rub">'+an.currency+'</font></div></div>';
						}
					}
					if (an.favicon_image){
						an.favicon_image = '<div class="gnezdo_cell_favicon" style="display: inline-block; padding-right: 5px;"><img loading="eager" border="0" src="'+data.image_domain+'/img/original/'+an.favicon_image+'" style="width: auto; vertical-align: middle;"></div>';
					}else{
						an.favicon_image = '';
					};
					
					if (!an.text) an.text = '';
					
					var info = '';
					if (an.official_name || an.inn || an.erid){
						var gnezdo_info_icon_event = (data.tt && data.tt == 'mobile')?'onclick="this.nextSibling.classList.toggle(\'active\');"':'onmouseover="this.nextSibling.classList.add(\'active\');" onmouseout="this.nextSibling.classList.remove(\'active\');"';info = adv+'<div class="gnezdo_info_icon" '+gnezdo_info_icon_event+ '></div><div class="gnezdo_info">';
						if (an.official_name) info += '&#1056;&#1077;&#1082;&#1083;&#1072;&#1084;&#1086;&#1076;&#1072;&#1090;&#1077;&#1083;&#1100;: '+an.official_name+((an.inn||an.erid)?'<br/>':'');
						if (an.inn) info += '&#1048;&#1053;&#1053;: '+an.inn+(an.erid?'<br/>':'');
						if (an.erid) info += 'ERID:&nbsp;'+an.erid;
						info += '</div>';
					}else if (an.show_info){
						info = adv;
					}
					
					html += '<div style="position: relative" class="'+an.cell_class+'">'+info+'<div class="gnezdo_block_inner"><a rel="nofollow '+(an.gnezdo_url?'noreferrer':'')+'" rtb="'+(an.rtb?an.rtb:0)+'" href="'+an.url+'" '+(an.gnezdo_url?' gnezdo_href="'+an.gnezdo_url+'" onmousedown="return parent.gnezdo._gnezdoClickCheck(event , this);"':'')+' target="_blank"><div class="gnezdo_block_img_wrap"><picture><img '+((an.rtb && img_xy[0] && img_xy[1])?' style="object-fit: cover;" ':'')+' '+(an.rtb&&k_xy?'onload="this.height = this.width/'+k_xy+'"':'')+(data.sticky ? ' crossorigin="anonymous" ' : '' )+' loading="eager" aid="'+an.id+'" src="'+self._srcGnezdoImg(data, an.img, p.tizerId)+'" class="gnezdo_img" alt="'+an.title+'"></picture></div><div class="gnezdo_block_desc"><div class="gnezdo_block_desc_bg"></div><div class="gnezdo_block_desc_text">'+an.title+'</div>'+(data.show_anons?'<div class="gnezdo_block_desc_longtext">'+an.text+'</div>':'')+an.price_block+(data.show_partner?'<div class="gnezdo_block_partner">'+(data.show_favicon?an.favicon_image:'')+an.site+'</div>':'')+(data.readmore_text?'<div class="gnezdo_readmore">'+data.readmore_text+'</div>':'')+'</div></a></div></div>';
				}
				
				html += '</div></div>';
				return html;
			},
			_createContentAdaptive: function(data, p){
				if (p.css) data.css = p.css;
				var self = this, html = "<style>", partner = '', sticky = '', adv = '<div class="gnezdo_adv">&#1056;&#1045;&#1050;&#1051;&#1040;&#1052;&#1040;</div>';
				html += self._gnezdo_adv_info_style;
				if (!p.noframe){
					html += "html,body{margin:0;padding:0;}";
				}else if (p.noframe && data.css){
					data.css = self._cssReplacer(data.css, '#'+p.containerId);
				};
				html += ".gnezdo_cont{"+((data.direction == 'vertical')?"display: block;":"display: inline-block;")+"}.gnezdo_cont_desc{position: absolute; bottom: 3%; left: 50%; -webkit-transform: translateX(-50%); transform: translateX(-50%); max-height: 25%; width: 90%; overflow: hidden; text-align: justify; background: #f9f9f9; border-radius: 10px; padding: 2%; color: black; box-shadow: 1px 1px 5px rgba(0,0,0,0.5); //font-size: 1.5vw;}</style>";
				
				if (data.sticky){
					data.stickyGradient = data.css.match(/sticky-(\d+)/)[1];
					data.css = data.css.replace(/.*@import/, '@import');
					html = "<style>" + (data.css ? data.css : "");
					if (!p.noframe){
						html += "html,body{margin:0;padding:0;}";
					}
					// стили таймера
					if(p.tizerId == 326830 || p.tizerId == 326872 || p.tizerId == 330866 || p.tizerId == 331410 || p.tizerId == 332207 || p.tizerId == 333142 || p.tizerId == 333147 || p.tizerId == 333148 || p.tizerId == 333149 || p.tizerId == 333334 || p.tizerId == 333349 || p.tizerId == 333457 || p.tizerId == 333508 || p.tizerId == 333772 || p.tizerId == 333771 || p.tizerId == 333770 || p.tizerId == 333769 || p.tizerId == 333768 || p.tizerId == 333785 || p.tizerId == 334161 || p.tizerId == 334246 || p.tizerId == 334343 || p.tizerId == 334426 || p.tizerId == 334425 || p.tizerId == 334424 || p.tizerId == 334423 || p.tizerId == 334420 || p.tizerId == 334440 || p.tizerId == 334827 || p.tizerId == 334977 || p.tizerId == 335046 || p.tizerId == 334898 || p.tizerId == 335117 || p.tizerId == 335115 || p.tizerId == 335025 || p.tizerId == 340262) {
						html += self._timer_style;
					}
					html += self._gnezdo_adv_info_style;
					html += "</style>";
					// спан таймера
					var timer = "";
					if(p.tizerId == 326830 || p.tizerId == 326872 || p.tizerId == 330866 || p.tizerId == 331410 || p.tizerId == 332207 || p.tizerId == 333142 || p.tizerId == 333147 || p.tizerId == 333148 || p.tizerId == 333149 || p.tizerId == 333334 || p.tizerId == 333349 || p.tizerId == 333457 || p.tizerId == 333508 || p.tizerId == 333772 || p.tizerId == 333771 || p.tizerId == 333770 || p.tizerId == 333769 || p.tizerId == 333768 || p.tizerId == 333785 || p.tizerId == 334161 || p.tizerId == 334246 || p.tizerId == 334343 || p.tizerId == 334426 || p.tizerId == 334425 || p.tizerId == 334424 || p.tizerId == 334423 || p.tizerId == 334420 || p.tizerId == 334440 || p.tizerId == 334827 || p.tizerId == 334977 || p.tizerId == 335046 || p.tizerId == 334898 || p.tizerId == 335117 || p.tizerId == 335115 || p.tizerId == 335025 || p.tizerId == 340262) {
						timer = '<span class="timer"></span>';
					}
					sticky += '<div class="sticky" onclick="parent.gnezdo._hideIframe(\''+p.containerId+'\');">'+timer+'<img src="//news.gnezdo.ru/img/x.svg" alt="" /></div><div style="clear: both"></div>';
				} else if (data.pt){
					partner = data.pl?'<div onmouseover="this.style.marginRight=\'0\';this.style.transform=\'translateX(0)\';" onmouseout="this.style.marginRight=\'24px\';this.style.transform=\'translateX(100%)\';" style="margin: 0 24px 0 0; transition: 0.7s; transform: translateX(100%);"><a rel="nofollow noreferrer" style="text-decoration:none; margin: 0; padding: 0; font: medium normal;" target="_blank" href="'+data.pl+'"><img  ' + (data.sticky ? ' crossorigin="anonymous" ' : '' ) +' loading="eager" style="height: 20px; vertical-align:middle; background: none; width: auto; display: block;" src="https://news.gnezdo.ru/img/settings/gnezdo_logo.png"></a></div>':'<a rel="nofollow noreferrer">'+data.pt+'</a>';
					partner = '<div class="partner_link_bottom_wrap" style="position: absolute; right: 0; left: auto; top:0; bottom: auto; overflow: hidden; z-index:10; font: normal medium normal;">'+partner+'</div>';
				}

				html += sticky+'<div class="gnezdo_main_block"><div style="position: relative;" class="gnezdo_block_container"><div class="gnezdo_header"><a rel="nofollow noreferrer" target="_blank" style="text-decoration:none;" href="https://www.gnezdo.ru/?news_id='+p.tizerId+'">'+(data.header_text?data.header_text:'')+'</a></div>'+partner;
				
				var rows = 1;
				var cols = 1;
				var cnt = data.cnt;
				var width = '100%';
				
				var width_px = data.image_size?data.image_size.split('x',2)[0]:0;
				if (width_px && data.direction != 'vertical'){
					cols = Math.round(data.gw/width_px);
					if (cols > data.cnt) cols = data.cnt;
					if (!cols) cols = 1;					
					width = (100/cols-1+1/cols)+'%';
				}	
				cnt = cols*rows;
				var show_price = show_anons = show_partner = show_readmore = 1;
				var font_size = 1.5;
				if (width_px){
					if (data.gw/cols/width_px<0.6){
						show_price = show_anons = show_partner = show_readmore = 0;
					}else if (data.gw/cols/width_px<0.7){
						show_price = show_partner = show_readmore = 0;
					}else if (data.gw/cols/width_px<0.8){
						show_price = show_readmore = 0;
					}else if (data.gw/cols/width_px<0.9){
						show_readmore = 0;
					};
					
				};
				
				//console.log(data.gw, data.gw/cols/width_px, rows+'x'+cols, cnt, width); //delete
					
				for (var i = 0; i < data.arr.length; i++){
					var an = data.arr[i], url = an.url+data.ref_param, cell_class = 'gnezdo_block gnezdo_cont gnezdo_cont'+i, img = an.img, price_block = '';
					if (img.toString().substring(0,4)!='http' && an.img.toString().substring(0,2)!='//') img = data.image_domain+'/img/'+data.image_size+'/'+img;
					price_block = '';
					if (an.is_good && show_price){
						cell_class += ' gnezdo_good';
						if (an.price){
							price_block = '<div class="gnezdo_cell_price">';
							if (an.discount) price_block += '<div class="gnezdo_cell_discount">-'+an.discount+'%</div><div class="gnezdo_cell_oldprice">'+an.oldprice+' <font class="gnezdo_rub">'+an.currency+'</font></div>';
							price_block += '<div class="gnezdo_cell_newprice">'+an.price+' <font class="gnezdo_rub">'+an.currency+'</font></div></div>';
						}
					}
					if (an.favicon_image){
						an.favicon_image = '<div class="gnezdo_cell_favicon" style="display: inline-block; padding-right: 5px;"><img loading="eager" border="0" src="'+data.image_domain+'/img/original/'+an.favicon_image+'" style="width: auto; vertical-align: middle;"></div>';
					}else{
						an.favicon_image = '';
					};
					
					if (!an.text) an.text = '';
					
					var info = '';
					if (an.official_name || an.inn || an.erid){
						var gnezdo_info_icon_event = (data.tt && data.tt == 'mobile')?'onclick="this.nextSibling.classList.toggle(\'active\');"':'onmouseover="this.nextSibling.classList.add(\'active\');" onmouseout="this.nextSibling.classList.remove(\'active\');"';info = adv+'<div class="gnezdo_info_icon" '+gnezdo_info_icon_event+ '></div><div class="gnezdo_info">';
						if (an.official_name) info += '&#1056;&#1077;&#1082;&#1083;&#1072;&#1084;&#1086;&#1076;&#1072;&#1090;&#1077;&#1083;&#1100;: '+an.official_name+((an.inn||an.erid)?'<br/>':'');
						if (an.inn) info += '&#1048;&#1053;&#1053;: '+an.inn+(an.erid?'<br/>':'');
						if (an.erid) info += 'ERID:&nbsp;'+an.erid;
						info += '</div>';
					}else if (an.show_info){
						info = adv;
					}
					
					html += '<div style="position: relative" class="'+cell_class+'" style="width: '+width+'; margin-right:'+(((i+1)%cols == 0)?0:1)+'%; '+(i>=cnt?"display:none;":"")+'">'+info+'<div class="gnezdo_cont_inner" style="position: relative;"><a rel="nofollow '+(an.gnezdo_url?'noreferrer':'')+'" href="'+url+'" target="_blank"><div class="gnezdo_cont_img_wrap"><picture><img  ' + (data.sticky ? ' crossorigin="anonymous" ' : '' ) +' loading="eager" style="width: 100%;" aid="'+an.id+'" src="'+self._srcGnezdoImg(data, an.img, p.tizerId)+'" class="gnezdo_img" alt="'+an.title+'"></picture></div><div class="gnezdo_cont_desc"><div class="gnezdo_cont_desc_text">'+an.title+'</div>'+((show_anons && data.show_anons)?'<div class="gnezdo_cont_desc_longtext">'+an.text+'</div>':'')+price_block+((show_partner && data.show_partner)?'<div class="gnezdo_cont_partner">'+(data.show_favicon?an.favicon_image:'')+an.site+'</div>':'')+((show_readmore&& data.readmore_text)?'<div class="gnezdo_readmore">'+data.readmore_text+'</div>':'')+'</div></a></div></div>';
				}

				html += '</div></div>';
				return html;
			},
			_createContentSlider: function(data, p) {
				if (p.css) data.css = p.css;
				var self = this;
				
				var html = '';
				var testStyle = ".swiper-wrapper { position: relative; flex-wrap: nowrap; display: flex; flex-direction: row }";
				
				var mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent);
				
				var scroll = 'hidden';
				if (mobile) { scroll = 'scroll' };
				
				
				var styleSlider =  self._gnezdo_adv_info_style + ".swiper-slide-lenta {margin-right:16px; margin-bottom:2px;max-width:35%;} #gnezdoComposite { width: 100%;max-width: 700px; margin: 0 auto; height: auto; overflow: visible; } #gnezdoComposite .mgbox{height:auto;line-height:100%;margin:0 auto;position:relative;overflow:hidden;vertical-align:top;text-align:center;padding:0;border-style:solid;border-width:0}#gnezdoComposite .mgline{float:left;display:block;padding:0;opacity:1;background-color:#fff;border:none;border-radius:4px;overflow:hidden;transition:box-shadow;transition-duration:.8s;transition-property:box-shadow}#gnezdoComposite .mgoc{padding:10px 10px 10px 0;background:#fff;margin-bottom:20px;margin-top:20px}#gnezdoComposite .mgoc .swiper-container-lenta{margin:0 auto;position:relative;overflow-y:hidden;overflow-x:"+scroll+";z-index:1}#gnezdoComposite .mgoc .swiper-wrapper-lenta{position:relative;width:100%;z-index:1;display:-webkit-box;display:-moz-box;display:-ms-flexbox;display:-webkit-flex;display:flex;-webkit-transition-property:-webkit-transform;-moz-transition-property:-moz-transform;-o-transition-property:-o-transform;-ms-transition-property:-ms-transform;transition-property:transform;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box}#gnezdoComposite .mgoc .swiper-container-android .swiper-slide-lenta,#gnezdoComposite .mgoc .swiper-wrapper-lenta{-webkit-transform:translate3d(0,0,0);-moz-transform:translate3d(0,0,0);-o-transform:translate(0,0);-ms-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}#gnezdoComposite .mgoc .mg-swiper-button-next,#gnezdoComposite .mgoc .mg-swiper-button-prev{position:absolute;top:50%;width:27px;height:44px;margin-top:-22px;z-index:10;cursor:pointer;-moz-background-size:27px 44px;-webkit-background-size:27px 44px;background-size:27px 44px;background-position:center;background-repeat:no-repeat}#gnezdoComposite .mgoc .mg-swiper-button-next.swiper-button-disabled,#gnezdoComposite .mgoc .mg-swiper-button-prev.swiper-button-disabled{opacity:.35;cursor:auto;pointer-events:none}#gnezdoComposite .mgoc .mg-swiper-button-prev,#gnezdoComposite .mgoc .swiper-container-rtl .mg-swiper-button-next{background-image:url(\"data:image\/svg+xml;charset=utf-8,<svg width='16' height='16' xmlns='http:\/\/www.w3.org\/2000\/svg'><path d='m10.586 8.003-4.79 4.793a1 1 0 0 0 1.415 1.414l5.496-5.5a1 1 0 0 0 0-1.414l-5.496-5.5A1 1 0 0 0 5.796 3.21l4.79 4.793Z'><\/path><\/svg>\");left:10px;right:auto}#gnezdoComposite .mgoc .mg-swiper-button-next,#gnezdoComposite .mgoc .swiper-container-rtl .mg-swiper-button-prev{background-image:url(\"data:image\/svg+xml;charset=utf-8,<svg width='16' height='16' xmlns='http:\/\/www.w3.org\/2000\/svg'><path transform='rotate(180) translate(-16, -16)' d='m10.586 8.003-4.79 4.793a1 1 0 0 0 1.415 1.414l5.496-5.5a1 1 0 0 0 0-1.414l-5.496-5.5A1 1 0 0 0 5.796 3.21l4.79 4.793Z'><\/path><\/svg>\");right:10px;left:auto}#gnezdoComposite .mgoc .swiper-slide-lenta{margin-top:10px;float:left;-webkit-flex-shrink:0;-ms-flex-SR:0;flex-shrink:0;position:relative;-webkit-transition-property:-webkit-transform;transition-property:-webkit-transform;-o-transition-property:transform;transition-property:transform,-webkit-transform;display:-webkit-box;display:-ms-flexbox;display:-webkit-flex;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;-webkit-align-items:center;align-items:center}#gnezdoComposite .mgoc .mg-swiper-button-next,#gnezdoComposite .mgoc .mg-swiper-button-prev{box-shadow: 0 2px 4px rgba(0,0,0,.1); position:absolute;top:50%;width:38px;height:38px;-webkit-border-radius:100%;-moz-border-radius:100%;border-radius:100%;margin-top:-27px;z-index:10;text-indent:-9999px;overflow:hidden;cursor:pointer}#gnezdoComposite .mgoc .mg-swiper-button-next{background:url(\"data:image\/svg+xml,<svg width='16' height='16' xmlns='http:\/\/www.w3.org\/2000\/svg'><path d='m10.586 8.003-4.79 4.793a1 1 0 0 0 1.415 1.414l5.496-5.5a1 1 0 0 0 0-1.414l-5.496-5.5A1 1 0 0 0 5.796 3.21l4.79 4.793Z'><\/path><\/svg>\") 45% 50% no-repeat #fff;transition:right .5s ease;right:-50px}#gnezdoComposite .mgoc .mg-swiper-button-prev{background:url(\"data:image\/svg+xml,<svg width='16' height='16' xmlns='http:\/\/www.w3.org\/2000\/svg'><path transform='rotate(180) translate(-16, -16)' d='m10.586 8.003-4.79 4.793a1 1 0 0 0 1.415 1.414l5.496-5.5a1 1 0 0 0 0-1.414l-5.496-5.5A1 1 0 0 0 5.796 3.21l4.79 4.793Z'><\/path><\/svg>\") 45% 50% no-repeat #fff;transition:left .5s ease;left:-50px;-webkit-transform:translateX(-50%) translateY(-50%) scaleX(-1)  rotate(180deg);transform:translateX(-50%) translateY(0) scaleX(-1) rotate(180deg)}#gnezdoComposite .mgoc .mg-swiper-button-next.swiper-button-disabled,#gnezdoComposite .mgoc .mg-swiper-button-prev.swiper-button-disabled{opacity:0}#gnezdoComposite .mgoc .MG_Gallery_left-btn .mg-swiper-button-prev{left:35px}#gnezdoComposite .mgoc .MG_Gallery_right-btn .mg-swiper-button-next{right:15px}#gnezdoComposite .mgoc .mcimg a:before{content:'';position:absolute;left:0;right:0;bottom:0;top:0;background:transparent linear-gradient(to bottom,transparent 0,rgba(0,0,0,.1) 50%,rgba(0,0,0,.7) 100%) repeat scroll 0 0;z-index:1}#gnezdoComposite .mglogo{width:100%;text-align:left;margin-bottom:10px}#gnezdoComposite .mgline .image-with-text{display:block;width:100%;min-height:1px;margin:0 auto;position:relative}#gnezdoComposite div.mcimg{display:block!important}#gnezdoComposite img.mcimg{display:block;width:100%; height:auto}#gnezdoComposite .mctitle{margin:0;text-align:left;line-height:101px;display:block;position:absolute;left:0;right:0;bottom:0;z-index:2}#gnezdoComposite .mctitle span{color:#fff;font-family:Montserrat,Arial,Helvetica,sans-serif!important;text-decoration:none;font-style:normal!important;font-weight:700!important;font-size:11pt;text-align:left;line-height:12pt;padding:0 12px 12px 12px;display:table-cell;vertical-align:bottom;width:170px}#gnezdoComposite .mgline:hover{box-shadow:0 0 6px 0 rgba(0,0,0,.2),0 4px 22px 0 #000}#gnezdoComposite .mglogo{width:100%;position:relative;text-align:left}#gnezdoComposite div.mcimg{position:relative;display:inline-block}#gnezdoComposite .mgline .image-container{width:auto;margin:0 auto;position:relative}#gnezdoComposite .mglogo a{border:none;color:#7c758c!important;font:400 20px\/28px 'IBM Plex Sans',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';text-decoration:none} " + data.css;

				if (data.css.match(/\.custom-design/)){
					data.css += "body { font-family:Roboto Condensed, sans-serif; } .mcimg > a { text-decoration: none; color: #000; } #gnezdoComposite .mgoc .mg-swiper-button-next,#gnezdoComposite .mgoc .mg-swiper-button-prev{position:absolute;top:50%;width:27px;height:44px;margin-top:-22px;z-index:10;cursor:pointer;-moz-background-size:27px 44px;-webkit-background-size:27px 44px;background-size:27px 44px;background-position:center;background-repeat:no-repeat}#gnezdoComposite .mgoc .mg-swiper-button-next.swiper-button-disabled,#gnezdoComposite .mgoc .mg-swiper-button-prev.swiper-button-disabled{opacity:.35;cursor:auto;pointer-events:none}#gnezdoComposite .mgoc .mg-swiper-button-prev,#gnezdoComposite .mgoc .swiper-container-rtl .mg-swiper-button-next{background-image:url(\"data:image\/svg+xml;charset=utf-8,<svg width='16' height='16' xmlns='http:\/\/www.w3.org\/2000\/svg'><path d='m10.586 8.003-4.79 4.793a1 1 0 0 0 1.415 1.414l5.496-5.5a1 1 0 0 0 0-1.414l-5.496-5.5A1 1 0 0 0 5.796 3.21l4.79 4.793Z'><\/path><\/svg>\");left:10px;right:auto}#gnezdoComposite .mgoc .mg-swiper-button-next,#gnezdoComposite .mgoc .swiper-container-rtl .mg-swiper-button-prev{background-image:url(\"data:image\/svg+xml;charset=utf-8,<svg width='16' height='16' xmlns='http:\/\/www.w3.org\/2000\/svg'><path transform='rotate(180) translate(-16, -16)' d='m10.586 8.003-4.79 4.793a1 1 0 0 0 1.415 1.414l5.496-5.5a1 1 0 0 0 0-1.414l-5.496-5.5A1 1 0 0 0 5.796 3.21l4.79 4.793Z'><\/path><\/svg>\");right:10px;left:auto} #gnezdoComposite .mgoc .mg-swiper-button-next,#gnezdoComposite .mgoc .mg-swiper-button-prev{box-shadow: 0 2px 4px rgba(0,0,0,.1); position:absolute;top:50%;width:38px;height:38px;-webkit-border-radius:100%;-moz-border-radius:100%;border-radius:100%;margin-top:-27px;z-index:10;text-indent:-9999px;overflow:hidden;cursor:pointer}#gnezdoComposite .mgoc .mg-swiper-button-next{background:url(\"data:image\/svg+xml,<svg width='16' height='16' xmlns='http:\/\/www.w3.org\/2000\/svg'><path d='m10.586 8.003-4.79 4.793a1 1 0 0 0 1.415 1.414l5.496-5.5a1 1 0 0 0 0-1.414l-5.496-5.5A1 1 0 0 0 5.796 3.21l4.79 4.793Z'><\/path><\/svg>\") 45% 50% no-repeat #fff;transition:right .5s ease;right:-50px}#gnezdoComposite .mgoc .mg-swiper-button-prev{background:url(\"data:image\/svg+xml,<svg width='16' height='16' xmlns='http:\/\/www.w3.org\/2000\/svg'><path transform='rotate(180) translate(-16, -16)' d='m10.586 8.003-4.79 4.793a1 1 0 0 0 1.415 1.414l5.496-5.5a1 1 0 0 0 0-1.414l-5.496-5.5A1 1 0 0 0 5.796 3.21l4.79 4.793Z'><\/path><\/svg>\") 45% 50% no-repeat #fff;transition:left .5s ease;left:-50px;-webkit-transform:translateX(-50%) translateY(-50%) scaleX(-1)  rotate(180deg);transform:translateX(-50%) translateY(0) scaleX(-1) rotate(180deg)}#gnezdoComposite .mgoc .mg-swiper-button-next.swiper-button-disabled,#gnezdoComposite .mgoc .mg-swiper-button-prev.swiper-button-disabled{opacity:0}#gnezdoComposite .mgoc .MG_Gallery_left-btn .mg-swiper-button-prev{left:35px}#gnezdoComposite .mgoc .MG_Gallery_right-btn .mg-swiper-button-next{right:15px}";
					
					styleSlider = '@import url("//fonts.googleapis.com/css?family=Roboto+Condensed"); #gnezdoComposite .mgbox{height:auto;line-height:100%;margin:0 auto;position:relative;overflow:hidden;vertical-align:top;text-align:center;padding:0;border-style:solid;border-width:0} .swiper-container-lenta{margin:0 auto;position:relative;overflow-y:hidden;overflow-x:'+scroll+';z-index:1} .mgline{position: relative} ' + self._gnezdo_adv_info_style + data.css ;
				}
				
				if (p.noframe && data.css && styleSlider){
				 	styleSlider = self._cssReplacer(styleSlider, '#'+p.containerId);
				 	testStyle = self._cssReplacer(testStyle, '#'+p.containerId);
				};
				html += '<style>'+ testStyle + '</style>';
				html += '<style>'+ styleSlider +'</style>';    
				
				
				if (!data.pt){
					html += '<style>#gnezdoComposite .mglogo{display: none;}</style>';
				}

				if (data.css.match(/custom-design-gradient/)) data.gradient = 1;
				
				var adv = '<div class="gnezdo_adv">&#1056;&#1045;&#1050;&#1051;&#1040;&#1052;&#1040;</div>';
				
				
				
				html += '<div class="gnezdo_main_block"><div style="position: relative;" class="gnezdo_block_container"><div id="gnezdoComposite" style=""><div class="mgoc"><div class="mglogo"> <a href="https://www.gnezdo.ru/?news_id=' + p.tizerId + '" target="_blank" rel="nofollow noreferrer">'+(data.header_text||'')+'</a> </div><div class="mgbox MG_Gallery"><div class="swiper-container swiper-container-lenta swiper-container-horizontal"><div class="swiper-wrapper swiper-wrapper-lenta">';
				
				var img_xy = data.image_size?data.image_size.split('x',2):[0,0];
				
				html += data.arr.map(function(an) {
				    
				    if (!an.id) { 
				       // console.log("no id in block next");   
				        return ''; 
				    }
				    
				    
					if (an.img.toString().substring(0,4)!='http' && an.img.toString().substring(0,2)!='//' && an.img.toString().substring(0,4)!='data')
						an.img = data.image_domain+'/img/'+data.image_size+'/'+an.img;
					
					//if (an.rtb) data.gradient = 0;
					if (an.gnezdo_url) {
						an.gnezdo_url += data.ref_param;
					}else{
						an.url += data.ref_param;
					};
					
					an.cell_class = 'gnezdo_block';
					an.price_block = '';
					if (an.is_good){
						an.cell_class += ' gnezdo_good';
						if (an.price){
							an.price_block = '<span class="gnezdo_cell_price">';
							if (an.discount) an.price_block += '<span class="gnezdo_cell_discount">-'+an.discount+'%</span><span class="gnezdo_cell_oldprice">'+an.oldprice+' <font class="gnezdo_rub">'+an.currency+'</font></span>';
							an.price_block += '<span class="gnezdo_cell_newprice">'+an.price+' <font class="gnezdo_rub">'+an.currency+'</font></span></span>';
						}
					}
					
					if (an.favicon_image){
						an.favicon_image = '<div class="gnezdo_favicon" style="display: inline-block; padding-right: 5px;"><img loading="eager" border="0" src="'+data.image_domain+'/img/original/'+an.favicon_image+'" style="width: auto; vertical-align: middle;"></div>';
					}else{
						an.favicon_image = '';
					};
					
					if (!an.text) an.text = '';
					
					var info = '';
					if (an.official_name || an.inn || an.erid){
						var gnezdo_info_icon_event = (data.tt && data.tt == 'mobile')?'onclick="this.nextSibling.classList.toggle(\'active\');"':'onmouseover="this.nextSibling.classList.add(\'active\');" onmouseout="this.nextSibling.classList.remove(\'active\');"';info = adv+'<div class="gnezdo_info_icon" '+gnezdo_info_icon_event+ '></div><div class="gnezdo_info">';
						if (an.official_name) info += '&#1056;&#1077;&#1082;&#1083;&#1072;&#1084;&#1086;&#1076;&#1072;&#1090;&#1077;&#1083;&#1100;: '+an.official_name+((an.inn||an.erid)?'<br/>':'');
						if (an.inn) info += '&#1048;&#1053;&#1053;: '+an.inn+(an.erid?'<br/>':'');
						if (an.erid) info += 'ERID:&nbsp;'+an.erid;
						info += '</div>';
					}else if (an.show_info){
						info = adv;
					}

					return '<div class="'+an.cell_class+' swiper-slide swiper-slide-lenta"> \
						<div style="position: relative;" class="mgline teaser- type-e"> '+info+'\
						 <div class="image-with-text"> \
						 <div class="mcimg"> \
						 <a rel="nofollow '+(an.gnezdo_url?'noreferrer':'')+'" rtb="'+(an.rtb?an.rtb:0)+'" href="'+an.url+'" '+(an.gnezdo_url?' gnezdo_href="'+an.gnezdo_url+'" onmousedown="return parent.gnezdo._gnezdoClickCheck(event , this);"':'')+' target="_blank"> \
						 <div class="image-container"><picture><img '+((an.rtb && img_xy[0] && img_xy[1])?' style="object-fit: cover;" ':'')+' loading="eager"' + ((data.gradient && !an.rtb) ? ' crossorigin="anonymous"' : '') + ' class="mcimg gnezdo_img" aid="'+an.id+'" src="'+self._srcGnezdoImg(data, an.img, p.tizerId)+'" /></picture> <div class="mctitle"><span class="gnezdo_text">'+an.title+'</span>'+(data.show_anons?'<span class="gnezdo_longtext">'+an.text+'</span>':'')+an.price_block+(data.show_partner?'<span class="gnezdo_partner">'+(data.show_favicon?an.favicon_image:'')+an.site+'</span>':'')+'</div></div> </a> </div> </div></div>  </div>';
				}).join('');

				html += '</div></div><div class="mg-swiper-button-next swiper-button-next"></div><div class="mg-swiper-button-prev swiper-button-prev"></div></div></div></div></div></div>';

				return html;
			},
			_createContentNative: function(data, p){
				var html = '';
				if (!p.noframe){
					html = '<style>html,body{box-sizing:border-box;margin:0;padding:0;height: 100%;}</style>';
				}
				if (!data.font_family){
					html += '<link rel="preload" href="https://news.gnezdo.ru/src/fonts/ieVl2ZhZI2eCN5jzbjEETS9weq8-19a7DRs5.woff2" as="font" type="font/woff2" crossorigin>';
					html += '<link rel="preload" href="https://news.gnezdo.ru/src/fonts/ieVl2ZhZI2eCN5jzbjEETS9weq8-19K7DQ.woff2" as="font" type="font/woff2" crossorigin>';
					html += '<link rel="preload" href="https://news.gnezdo.ru/src/fonts/ieVi2ZhZI2eCN5jzbjEETS9weq8-33mZGCAYb8td.woff2" as="font" type="font/woff2" crossorigin>';
					html += '<link rel="preload" href="https://news.gnezdo.ru/src/fonts/ieVi2ZhZI2eCN5jzbjEETS9weq8-33mZGCQYbw.woff2" as="font" type="font/woff2" crossorigin>';
					html += '<link rel="preload" href="https://news.gnezdo.ru/src/fonts/ieVi2ZhZI2eCN5jzbjEETS9weq8-32meGCAYb8td.woff2" as="font" type="font/woff2" crossorigin>';
					html += '<link rel="preload" href="https://news.gnezdo.ru/src/fonts/ieVi2ZhZI2eCN5jzbjEETS9weq8-32meGCQYbw.woff2" as="font" type="font/woff2" crossorigin>';
				}
				html += '<link rel="prefetch" href="https://news.gnezdo.ru/loader_native_redraw.css" as="style" type="text/css">';
				if (!data.font_family){
					html += '<style>@font-face {font-family: "Roboto Condensed"; font-style: normal; font-weight: 300; font-display: swap; src: url(https://news.gnezdo.ru/src/fonts/ieVi2ZhZI2eCN5jzbjEETS9weq8-33mZGCAYb8td.woff2) format("woff2"); unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;} @font-face {font-family: "Roboto Condensed"; font-style: normal; font-weight: 300; font-display: swap; src: url(https://news.gnezdo.ru/src/fonts/ieVi2ZhZI2eCN5jzbjEETS9weq8-33mZGCQYbw.woff2) format("woff2"); unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;}@font-face { font-family: "Roboto Condensed"; font-style: normal; font-weight: 400; font-display: swap; src: url(https://news.gnezdo.ru/src/fonts/ieVl2ZhZI2eCN5jzbjEETS9weq8-19a7DRs5.woff2) format("woff2"); unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116; } @font-face { font-family: "Roboto Condensed"; font-style: normal; font-weight: 400; font-display: swap; src: url(https://news.gnezdo.ru/src/fonts/ieVl2ZhZI2eCN5jzbjEETS9weq8-19K7DQ.woff2) format("woff2"); unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD; } @font-face { font-family: "Roboto Condensed"; font-style: normal; font-weight: 700; font-display: swap; src: url(https://news.gnezdo.ru/src/fonts/ieVi2ZhZI2eCN5jzbjEETS9weq8-32meGCAYb8td.woff2) format("woff2"); unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116; } @font-face { font-family: "Roboto Condensed"; font-style: normal; font-weight: 700; font-display: swap; src: url(https://news.gnezdo.ru/src/fonts/ieVi2ZhZI2eCN5jzbjEETS9weq8-32meGCQYbw.woff2) format("woff2"); unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD; }</style>';
				}
				html += '<link href="https://news.gnezdo.ru/loader_native_redraw.css" onload="window.loader_native_redraw_css = 1;" rel="stylesheet" type="text/css">';
				
				html += '<div id="gnezdo_native_'+p.containerId+'" class="gnezdo_native '+(data.font_family?data.font_family:'')+(data.vertical?' vertical':'')+'" style="'+(data.native_box?'display:block;':'display:flex;')+' visibility: hidden;" data-grid="'+data.native+'" data-native_box="'+(data.native_box?1:0)+'" data-native_vertical="'+(data.vertical?1:0)+'" data-dheight="'+(data.dheight?1:0)+'" data-containerId="'+(data.dheight?p.containerId:'')+'" data-tizerId="'+(p.tizerId?p.tizerId:'')+'" data-tt="'+(data.tt?data.tt:'')+'" data-retarget="'+(data.retarget?1:0)+'">';
				
				for (var i = 0; i < data.arr.length; i++){
					var an = data.arr[i];
					
					var click_zone = {};
					if (an.native_click_zone){
						an.native_click_zone.split(',').forEach(function (item) {
							click_zone[item] = 1;
						});
					}else{
						click_zone = {img:1, text:1, btn:1}
					}
					
					if (an.img.toString().substring(0,4)!='http' && an.img.toString().substring(0,2)!='//' && an.img.toString().substring(0,4)!='data') an.img = data.image_domain+'/img/'+data.image_size+'/'+an.img;

					var image_video = '<picture>';
					if(an.img.match(/zn4\./)) {// && data.enable_webp) {
						image_video += '<source type="image/webp" srcset="' + an.img.replace(/jpg$/, 'webp') + '" />';
					}
					image_video += '<source type="image/jpeg" srcset="' + an.img + '" />\
						<img loading="eager" image_add="' + (an.image_add?an.image_add:'') + '" class="gz_block_img__main" aid="'+an.id+'" src="' + an.img + '" />\
					</picture>';

					if (an.video){
						if (an.video.toString().substring(0,4)!='http' && an.video.toString().substring(0,2)!='//') an.video = data.image_domain+an.video;
						image_video = '<video class="video js-gz_block_video" playsinline onmouseover="checkMute(this, false);" onmouseout="checkMute(this, true);" muted poster="' + an.img + '"><source aid="'+an.id+'" src="' + an.video + '" type="video/mp4"></video>';
					};
					image_video += '<picture>';
					
					if(an.img.match(/zn4\./)) {// && data.enable_webp) {
						image_video += '<source type="image/webp" srcset="' + an.img.replace(/jpg$/, 'webp') + '" />';
					}
					image_video += '<source type="image/jpeg" srcset="' + an.img + '" />'
					image_video += '<img class="gz_block_img__blur" src="' + an.img + '" /></picture>';
					
					an.logo_image = an.logo_image?data.image_domain+'/img/anons_logo/'+an.logo_image:'';
					an.bg_image = an.bg_image?data.image_domain+'/img/anons_bg/'+an.bg_image:'';
					
					if (!an.title) an.title = '';
					if (!an.text) an.text = '';
					if (!an.text_multi) an.text_multi = '';
					if (!an.disclaimer) an.disclaimer = '';
					if (!an.disclaimer_add) an.disclaimer_add = '';
					if (!an.title && !an.text && an.video) an.full_video = 1;

					var reg = /(©|®|&copy;|&reg;|&#169;|&#174;)/g;
					['title', 'text', 'disclaimer', 'disclaimer_add'].forEach(function(e) {
						an[e] = an[e].replace(reg, '<sup>$&</sup>');
					});
					
					var info = '';
					var adv = '';
					if (an.official_name || an.inn || an.erid){
						var gnezdo_info_icon_event = (data.tt && data.tt == 'mobile')?'onclick="this.nextSibling.classList.toggle(\'active\');"':'onmouseover="this.nextSibling.classList.add(\'active\');" onmouseout="this.nextSibling.classList.remove(\'active\');"';
						info = adv+'<div class="gnezdo_info_icon" '+gnezdo_info_icon_event+ '></div><div class="gnezdo_info">';
						if (an.official_name) info += '&#1056;&#1077;&#1082;&#1083;&#1072;&#1084;&#1086;&#1076;&#1072;&#1090;&#1077;&#1083;&#1100;: '+an.official_name+((an.inn||an.erid)?'<br/>':'');
						if (an.inn) info += '&#1048;&#1053;&#1053;: '+an.inn+(an.erid?'<br/>':'');
						if (an.erid) info += 'ERID:&nbsp;'+an.erid;
						info += '</div>';
					}else if (an.show_info){
						info = adv;
					}
					adv = '<div class="gnezdo_adv">&#1056;&#1045;&#1050;&#1051;&#1040;&#1052;&#1040;</div>';
					
					var price_block = '';
					if (an.price){
						price_block = '<div class="gz_block_price">';
						if (an.discount){
							price_block += '<span class="discount" style="color:' + an.title_color + ';">-' + an.discount + '%</span> | <span class="price">' + an.price + ' ' + an.currency + '</span> <span class="old_price">' + an.old_price + ' ' + an.currency + '</span>';
						}else{
							price_block += '<span class="price">' + an.price + ' ' + an.currency + '</span>';
						}
						price_block += '</div>';
					}
					
					if (an.gnezdo_url) {
						an.gnezdo_url += data.ref_param;
					}else{
						an.url += data.ref_param;
					};
					
					an.url_img = an.url;
					an.url_text = an.url;
					an.url_btn = an.url;
					if (an.url.match(/\[ELEM\]/gi)){
						an.url_img = an.url_img.replace(/\[ELEM\]/gi, 'img');
						an.url_text = an.url_text.replace(/\[ELEM\]/gi, 'text');
						an.url_btn = an.url_btn.replace(/\[ELEM\]/gi, 'btn');
					}
					
					var disclaimer = '<span style="display: inline-block; outline: 0.5px solid white;"><span class="main" style="' + (an.disclaimer?'':'display:none;') + '"><span>' + an.disclaimer + '</span></span>' + (an.disclaimer_add?((an.disclaimer?'<br/>':'')+'<span class="add"><span>' + an.disclaimer_add + '</span></span>'):'') + '</span>';
					
					if (data.native_box){
						var width_s = 100;
						if (data.native_box && !data.vertical) width_s = width_s/(an.multis.length+1);
						
						an.html = 	
						'<div class="gnezdo_block" style="' + (an.bg_image?'background: url(' + an.bg_image + ') center center / 100%;':'') + '">' +
						'	<div class="text" ' + ((an.logo_image || an.text_multi)?'':'style="display:none;"') + '>' +
						'		<img class="gnezdo_block_desc_logo" loading="eager" ' + (an.logo_image?'src="' + an.logo_image + '"':'style="display:none;"') + '><br/><span>' + an.text_multi + '</span>' +
						'	</div>' +
						'	<a class="secondary_link gz_block_link_ext" style="top:1px;right:1px;" rel="nofollow noreferrer" target="_blank" href="' + data.pl + '"><span></span></a>' + info +
						'	<div style="position: relative;">' +
						'		<div class="arrow left" onclick=\'scrollSlider("#gnezdo_native_'+p.containerId+'", "left")\'></div>' +
						'		<div id="slider" class="slider">' +
						'			<div id="slider_container" class="slider_container" ' + (an.height?'style="max-height: '+an.height+'px"':'') + '>' +
						'				<div class="slide" style="width:' + width_s + '%">' +
						'					<div data-width="" data-height="" class="gz_block gz_block_size_l">' +
						'						<div class="gz_block_img">' + adv +						
						'							<a class="link primary_link ' + (click_zone.img?'':'nopointer') + '" rel="nofollow '+(an.gnezdo_url?'noreferrer':'')+'" ' + (click_zone.img?(' href="' + an.url_img + '" target="_blank"'+(an.gnezdo_url?' gnezdo_href="'+an.gnezdo_url+'" onmousedown="return parent.gnezdo._gnezdoClickCheck(event , this);"':'')):'href="javascript:void(0)"') + '>' + image_video + '</a>' +	
						'						</div>' +
						'						<div class="gz_block_content">' +
						'							<a class="link primary_link ' + (click_zone.text?'':'nopointer') + '" rel="nofollow '+(an.gnezdo_url?'noreferrer':'')+'" ' + (click_zone.text?(' href="' + an.url_text + '" target="_blank"'+(an.gnezdo_url?' gnezdo_href="'+an.gnezdo_url+'" onmousedown="return parent.gnezdo._gnezdoClickCheck(event , this);"':'')):'href="javascript:void(0)"')+'>' +	
						'								<div class="gz_block_title" style="color:' + an.title_color + ';">' + an.title + '</div>' +
						'								<div lang="ru" class="gz_block_text" style="color:' + an.small_text_color + ';">' + an.text + '</div>' + price_block +
						'							</a>' +	
						'							<a class="gz_block_btn primary_link ' + (click_zone.btn?'':'nopointer') + '" rel="nofollow '+(an.gnezdo_url?'noreferrer':'')+'" ' + (click_zone.btn?(' href="' + an.url_btn + '" target="_blank"'+(an.gnezdo_url?' gnezdo_href="'+an.gnezdo_url+'" onmousedown="return parent.gnezdo._gnezdoClickCheck(event , this);"':'')):'href="javascript:void(0)"')+' style="' + (an.read_more_text?('background-color: ' + an.read_more_color + ';'):'display:none;') + '">' + an.read_more_text + '</a>' +
						'						</div>' +
						'					</div>' +
						'				</div>';
						
						for (var j = 0; j < an.multis.length; j++){
							var m = an.multis[j];
							if (m.image.toString().substring(0,4)!='http' && m.image.toString().substring(0,2)!='//') m.image = data.image_domain+'/img/'+data.image_size+'/'+m.image;

							var m_image_video = '<picture>';
							if(m.image.match(/zn4\./)) {// && data.enable_webp) {
								m_image_video += '<source type="image/webp" srcset="' + m.image.replace(/jpg$/, 'webp') + '" />';
							}
							m_image_video += '<source type="image/jpeg" srcset="' + m.image + '" />\
								<img loading="eager" class="gz_block_img__main" src="' + m.image + '" />\
							</picture>';

							if (m.video){
								if (m.video.toString().substring(0,4)!='http' && m.video.toString().substring(0,2)!='//') m.video = data.image_domain+m.video;
								m_image_video = '<video class="video js-gz_block_video" playsinline onmouseover="checkMute(this, false);" onmouseout="checkMute(this, true);" muted poster="' + m.image + '"><source src="' + m.video + '" type="video/mp4"></video>';
							};
							
							m_image_video += '<picture>';
							if(m.image.match(/zn4\./)) {// && data.enable_webp) {
								m_image_video += '<source type="image/webp" srcset="' + m.image.replace(/jpg$/, 'webp') + '" />';
							}
							m_image_video += '<source type="image/jpeg" srcset="' + m.image + '" />'
							m_image_video += '<img class="gz_block_img__blur" src="' + m.image + '" /></picture>';
							
							var m_price_block = '';
							if (m.price){
								m_price_block = '<div class="gz_block_price" >';
								if (m.discount){
									m_price_block += '<span class="discount" style="color:' + an.title_color + ';">-' + m.discount + '%</span> | <span class="price">' + m.price + ' ' + an.currency + '</span> <span class="old_price">' + m.old_price + ' ' + an.currency + '</span>';
								}else{
									m_price_block += '<span class="price">' + m.price + ' ' + an.currency + '</span>';
								}
								m_price_block += '</div>';
							}
							
							if (m.gnezdo_url) {
								m.gnezdo_url += data.ref_param;
							}else{
								m.url += data.ref_param;
							};
							
							m.url_img = m.url;
							m.url_text = m.url;
							m.url_btn = m.url;
							if (m.url.match(/\[ELEM\]/gi)){
								m.url_img = m.url_img.replace(/\[ELEM\]/gi, 'img');
								m.url_text = m.url_text.replace(/\[ELEM\]/gi, 'text');
								m.url_btn = m.url_btn.replace(/\[ELEM\]/gi, 'btn');
							}
							
							an.html += 
							'				<div class="slide" style="width:' + width_s + '%">' +
							'					<div data-width="" data-height="" class="gz_block gz_block_size_l">' +
							'						<div class="gz_block_img">'+						
							'							<a class="link primary_link ' + (click_zone.img?'':'nopointer') + '" rel="nofollow '+(an.gnezdo_url?'noreferrer':'')+'" ' + (click_zone.img?(' href="' + m.url_img + '"'+(m.gnezdo_url?' gnezdo_href="'+m.gnezdo_url+'" onmousedown="return parent.gnezdo._gnezdoClickCheck(event , this);"':'')+' target="_blank"'):'href="javascript:void(0)"') + '>' + m_image_video + '</a>' +	
							'						</div>' +
							'						<div class="gz_block_content">' +
							'							<a class="link primary_link ' + (click_zone.text?'':'nopointer') + '" rel="nofollow '+(an.gnezdo_url?'noreferrer':'')+'" ' + (click_zone.text?(' href="' + m.url_text + '"'+(m.gnezdo_url?' gnezdo_href="'+m.gnezdo_url+'" onmousedown="return parent.gnezdo._gnezdoClickCheck(event , this);"':'')+' target="_blank"'):'href="javascript:void(0)"') + '>' +	
							'								<div class="gz_block_title" style="color:' + an.title_color + ';">' + m.title + '</div>' +
							'								<div lang="ru" class="gz_block_text" style="color:' + an.small_text_color + ';">' + m.text + '</div>' + m_price_block +
							'							</a>' +	
							'							<a class="gz_block_btn primary_link ' + (click_zone.btn?'':'nopointer') + '" rel="nofollow '+(an.gnezdo_url?'noreferrer':'')+'" ' + (click_zone.btn?(' href="' + m.url_btn + '"'+(m.gnezdo_url?' gnezdo_href="'+m.gnezdo_url+'" onmousedown="return parent.gnezdo._gnezdoClickCheck(event , this);"':'')+' target="_blank"'):'href="javascript:void(0)"') + ' style="' + (an.read_more_text?('background-color: ' + an.read_more_color + ';'):'display:none;') + '">' + an.read_more_text + '</a>' +
							'						</div>' +
							'					</div>' +
							'				</div>';
						}

						an.html += 
						'			</div>' +
						'		</div>' +
						'		<div class="arrow right" onclick=\'scrollSlider("#gnezdo_native_'+p.containerId+'", "right")\'></div>' +
						'	</div>' +
						'	<div class="gz_block_disclaimer" style="' + ((an.disclaimer || an.disclaimer_add)?'top:auto;left:50%;transform: translate(-50%, 0%);outline:none;bottom:1px;':'display:none;') + '">' + disclaimer +
						'	</div>' +
						'</div>';
					}else{
						var favicon = an.logo_image ?
							'<div class="gz_block_favicon">' +
							'	<img loading="eager" class="gnezdo_block_desc_logo" src="' + an.logo_image + '" />' +
							'</div>' : '';
						an.html = 	
							'<div data-width="" data-height="" class="gnezdo_block gz_block gz_block_size_l '+(an.full_video?'full_video':'')+'" style="' + (an.bg_image?'background: url(' + an.bg_image + ') center center / 100%;':'') + '">' +
							'	<div class="gz_block_img">'+ adv +						
							'		<a class="link primary_link ' + (click_zone.img?'':'nopointer') + '" rel="nofollow '+(an.gnezdo_url?'noreferrer':'')+'" ' + (click_zone.img?(' href="' + an.url_img + '" target="_blank"'+(an.gnezdo_url?' gnezdo_href="'+an.gnezdo_url+'" onmousedown="return parent.gnezdo._gnezdoClickCheck(event , this);"':'')):'href="javascript:void(0)"') + '>' + image_video + '</a>' +	
							'	</div>' +
							'	<div class="gz_block_content">' +
							'		<a class="secondary_link gz_block_link_ext" rel="nofollow noreferrer" target="_blank" href="' + data.pl + '"><span></span></a>' + info +
							'		<div class="gz_block_gnezdo" style="height:10px"></div>' +
							'		<div class="gz_block_content_wrap">' +
							'			<a class="link primary_link ' + (click_zone.text?'':'nopointer') + '" rel="nofollow '+(an.gnezdo_url?'noreferrer':'')+'" ' + (click_zone.text?(' href="' + an.url_text + '" target="_blank"'+(an.gnezdo_url?' gnezdo_href="'+an.gnezdo_url+'" onmousedown="return parent.gnezdo._gnezdoClickCheck(event , this);"':'')):'href="javascript:void(0)"') + '>' +	
							'				' + favicon +
							'				<div class="gz_block_title" style="color:' + an.title_color + ';">' + an.title + '</div>' +
							'			</a>' +	
							'			<a class="link primary_link ' + (click_zone.text?'':'nopointer') + '" rel="nofollow '+(an.gnezdo_url?'noreferrer':'')+'" ' + (click_zone.text?(' href="' + an.url_text + '" target="_blank"'+(an.gnezdo_url?' gnezdo_href="'+an.gnezdo_url+'" onmousedown="return parent.gnezdo._gnezdoClickCheck(event , this);"':'')):'href="javascript:void(0)"') + '>' +	
							'				<div class="gz_block_text" style="color:' + an.small_text_color + ';">' + an.text + '</div>' +
							'			</a>' +	
							'			<a class="gz_block_btn primary_link ' + (click_zone.btn?'':'nopointer') + '" rel="nofollow '+(an.gnezdo_url?'noreferrer':'')+'" ' + (click_zone.btn?('  href="' + an.url_btn + '" target="_blank"'+(an.gnezdo_url?' gnezdo_href="'+an.gnezdo_url+'" onmousedown="return parent.gnezdo._gnezdoClickCheck(event , this);"':'')):'href="javascript:void(0)"') + ' style="' + (an.read_more_text?('background-color: ' + an.read_more_color + ';'):'display:none;') + '">' + an.read_more_text + '</a>' +
							'		</div>' +
							'	</div>' +
							'	<div class="gz_block_disclaimer" style="' + ((an.disclaimer || an.disclaimer_add)?'':'display:none;') + '">' + disclaimer +
							'	</div>' +
							'</div>';
						;
					}
					
					html += an.html;
				};
				html += '</div>';
				html += '<script onload="gnezdo_redraw_native(\'#gnezdo_native_'+p.containerId+'\');" src="https://news.gnezdo.ru/loader_native_redraw.js"></script>';
				return html;
			},
			_createContentNativeBanner: function(data, p){
				var html = '';
				if (!p.noframe){
					html = '<style>html,body{box-sizing:border-box;margin:0;padding:0;height: 100%;}</style>';
				}
				html += '<link rel="prefetch" href="https://news.gnezdo.ru/loader_native_redraw.css" as="style" type="text/css">';
				html += '<link href="https://news.gnezdo.ru/loader_native_redraw.css" onload="window.loader_native_redraw_css = 1;" rel="stylesheet" type="text/css">';
				
				html += '<div id="gnezdo_native_'+p.containerId+'" class="gnezdo_native '+(data.vertical?' vertical':'')+'">';
				
				for (var i = 0; i < data.arr.length; i++){
					var an = data.arr[i];
					
					var info = '';
					var adv = '<div class="gnezdo_adv">&#1056;&#1045;&#1050;&#1051;&#1040;&#1052;&#1040;</div>';
					if (an.official_name || an.inn || an.erid){
						var gnezdo_info_icon_event = (data.tt && data.tt == 'mobile')?'onclick="this.nextSibling.classList.toggle(\'active\');"':'onmouseover="this.nextSibling.classList.add(\'active\');" onmouseout="this.nextSibling.classList.remove(\'active\');"';
						info = '<div style="top: 5px;" class="gnezdo_info_icon" '+gnezdo_info_icon_event+ '></div><div class="gnezdo_info">';
						if (an.official_name) info += '&#1056;&#1077;&#1082;&#1083;&#1072;&#1084;&#1086;&#1076;&#1072;&#1090;&#1077;&#1083;&#1100;: '+an.official_name+((an.inn||an.erid)?'<br/>':'');
						if (an.inn) info += '&#1048;&#1053;&#1053;: '+an.inn+(an.erid?'<br/>':'');
						if (an.erid) info += 'ERID:&nbsp;'+an.erid;
						info += '</div>';
					}
					
					if (an.html){
						var decoded_elem = document.createElement('textarea');
						decoded_elem.innerHTML = an.html;
						an.html = decoded_elem.value;
						
						html += '<div class="gnezdo_block gz_block gz_block_size_l" style="width: '+data.gw+'px; height: '+data.gh+'px;">'+adv+info+'<div class="code_wrap" aid="'+an.id+'" rtb="0" gnezdo_href="'+an.gnezdo_url+'" onclick="return parent.gnezdo._gnezdoClickCheck(event , this);" style="width: 100%; height: 100%">'+an.html+'</div>';
					}
				};
				//html += '<script>var monitor = setInterval(function(){var elem = document.activeElement; if(elem && elem.tagName == "IFRAME"){clearInterval(monitor); elem.closest(".code_wrap").click()}}, 100);</script>';
				html += '<script>if (window.addEventListener) { window.addEventListener("message", adservingListener, false); } else if (window.attachEvent) { window.attachEvent("onmessage", adservingListener); } function adservingListener(e) { try { if ( e.data ) { var adserving_event = JSON.parse(e.data); if (adserving_event) { switch (adserving_event.type) { case "ebclickthrough": var code_wrap = document.querySelector(".code_wrap"); if (code_wrap){ code_wrap.click() } break; } } } } catch( err ) {} }</script>';
				html += '</div>';
				return html;
			},
			_createContentRTBBanner: function(data, p){ 
				var html = '';// '<style>iframe{pointer-events:none;}iframe.gnezdo_active{pointer-events:auto;}</style>';
				for (var i = 0; i < data.arr.length; i++){
					var an = data.arr[i];
					//an.html = '<a href="https://qna.habr.com/q/441857" target="_blank"><div class="alien" style="height: 90px;">alien</div></a>';
				
					html += '<div class="gnezdo_main_block"><div style="position: relative;" class="gnezdo_block_container"><div class="gnezdo_block">'+
						'<div class="rtb_banner" aid="'+an.id+'" rtb="'+(an.rtb?an.rtb:0)+'" gnezdo_href="'+an.gnezdo_url+'" onmousedown="return parent.gnezdo._gnezdoClickCheck(event , this);">'+
							an.html+
						'</div>'+
					'</div></div></div>';
				};
				//html += '<script>document.addEventListener("click", function (e) { console.log(e, e.target)}, false);</script>';
				return html;
			}
		});
	}();
	
	function gnezdoAsyncCallbacksRun(){
		// add_fp();
		while (window['gnezdoAsyncCallbacks'].length > 0) {
			var fn = window['gnezdoAsyncCallbacks'].shift();
			if (fn && "function" == typeof fn) fn();
		}
	};
	
	window['gnezdoAsyncCallbacks'] = window['gnezdoAsyncCallbacks'] || [];
	gnezdoAsyncCallbacksRun();
	
	!function(){
		window['gnezdoAsyncCallbacks'].push = function(e){
			Array.prototype.push.call(window['gnezdoAsyncCallbacks'], e);
			gnezdoAsyncCallbacksRun();
		};
	}();
}();
