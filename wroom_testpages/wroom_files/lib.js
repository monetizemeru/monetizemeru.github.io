(function (w, d, c) {
	console.log('MT: Lib version: 2021-07-28')
	var TIME = new Date(), TIME_MS = TIME.getTime();

	function Ad(parent, cfg) {
		if (!cfg) return;
		var c = cfg || {};
		this._mt = c.mt || {};
		this._ad = c.ad || {};
		this._lib = c.lib || {};
		var rnd = this._rnd = makeid(8);
		var src = this._ad.src.href;
		for (var i = 0; i < src.length; i++) {
			src[i] = src[i].replace(/(?:\[+|\{+)(?:timestamp|random|rnd|rid)(?:\]+|\}+)/, rnd);
		}
		this._thirdParty = {
			ready: false,
			loaded: false,
			tracked: false,
		};
		this._parentElement = parent;
		this._rootElement = null;
		this._closeElement = null;
		this._iframeElement = null;
		this._firstMouseEnter  = true;
		this._closeEnabled = false;
		this._expanded = false;
		this._expandTimer = null;
		this._expandProgress = null;
		this._subscribers = {};
		this._timers = {};
		this._device = this._checkDevice();
		this._is_mobile = this._device.mobile();
		this._is_tablet = this._device.tablet();
		this._is_touch = this._checkTouch() || (this._is_mobile || this._is_tablet);
	}

	var _ad = Ad.prototype;
	var _inimage = Ad.prototype;

	_ad.init = function () {
        //console.log(this);
        if (!this._ad) return;

        var ad = this._ad;
        var mt = this._mt;
        this._loadCSS();

        var root = this._rootElement = d.createElement('div');
        root.id = 'mt_' + this._rnd;
        root.classList.add('mt-ad');
        root.classList.add('mt-' + ad.type);
        root.classList.add('mt-hidden');
        if (ad.width) {
        	root.style.width = ad.width;
        }
        if (ad.height) {
        	root.style.height = ad.height;
        }
        if (ad.type !== 'fullscreen') {
        	root.classList.add('mt-shadow');
        }
        this._firstMouseEnter  = true;
        root.addEventListener('mouseenter', this._mouseEnter.bind(this));
        root.addEventListener('mouseleave', this._stopExpandTimer.bind(this));

        var bg = ad.background;
        if (bg && bg.color) {
        	root.style.backgroundColor = bg.color;
        }

        this._mt.sessionID = URLUtils.getQueryParameter(this._mt.link, "ss");

				if(ad.type.indexOf('inlab') == -1){ //Если не скин
        var ifr = this._iframeElement = d.createElement('iframe');
        ifr.classList.add('mt-iframe');
        ifr.setAttribute('referrerpolicy', 'same-origin');
        ifr.setAttribute('scrolling', 'no');

        switch (ad.src.type) {
        	case 'sizmek':
					ifr.addEventListener('load', function (e) {
						if (!this._thirdParty.loaded) {
							this._thirdParty.loaded = true;
							writeIframeContent(e.target.contentDocument, '<script src="' + ad.src.href[0] + '"></script></body>');
							e.target.contentWindow.addEventListener('message', this._sizmekMsgHandler.bind(this));
						}
					}.bind(this));
        	break;
        	case 'rb':
        	if (!ad.src.loaded) {
        		loadXML(ad.src.href[0], function(xml) {
        			if (ad.src.href = (ad.src.href = xml.querySelector("MediaFile")) && ad.src.href.childNodes[1] && ad.src.href.childNodes[1].nodeValue) {
        				ad.src.href = ad.src.href.split('&p1=');
        				for (var i = 1; i < ad.src.href.length; i++) ad.src.href[i] = decodeURIComponent(ad.src.href[i]);

        					var vast_events = {}, vast_selectors = {
        						impression:    "Ad Impression",
        						creativeView:  "Ad Linear TrackingEvents Tracking[event='creativeView']",
        						start:         "Ad Linear TrackingEvents Tracking[event='start']",
        						pause:         "Ad Linear TrackingEvents Tracking[event='pause']",
        						resume:        "Ad Linear TrackingEvents Tracking[event='resume']",
        						firstQuartile: "Ad Linear TrackingEvents Tracking[event='firstQuartile']",
        						midpoint:      "Ad Linear TrackingEvents Tracking[event='midpoint']",
        						thirdQuartile: "Ad Linear TrackingEvents Tracking[event='thirdQuartile']",
        						complete:      "Ad Linear TrackingEvents Tracking[event='complete']",
        						mute:          "Ad Linear TrackingEvents Tracking[event='mute']",
        						unmute:        "Ad Linear TrackingEvents Tracking[event='unmute']",
        						closeLinear:   "Ad Linear TrackingEvents Tracking[event='close']",
        						click:         "VideoClicks ClickTracking",
        					};

        					for (var event in vast_selectors) {
        						if (vast_selectors.hasOwnProperty(event)) {
        							vast_events[event] = [];
        							var list = xml.querySelectorAll(vast_selectors[event]) || [];
        							for (var i = 0; i < list.length; i++) {
        								vast_events[event].push(list[i].childNodes[1].nodeValue);
        							}
        						}
        					}

        					this._subscribers = {
        						ready: 		   [].concat(vast_events["impression"], vast_events["creativeView"], vast_events["start"]),
        						quarter: 	   vast_events["firstQuartile"],
        						half: 		   vast_events["midpoint"],
        						threequarters: vast_events["thirdQuartile"],
        						complete: 	   vast_events["complete"],
        						close: 		   vast_events["closeLinear"],
        						click: 		   vast_events["click"],
        					};

        					ad.src.type = "mt";
        					ad.src.loaded = true;
        					this.init();
        				}
        			}.bind(this));
        		return;
        	}
        	default:
        	w.addEventListener('message', this._mtMsgHandler.bind(this));
        	ifr.addEventListener('load', function (e) {
        		var extra = ad.extra;
        		if (extra) {
        			if (extra.adriverViewability) {
        				e.target.contentWindow.postMessage({
        					name: 'mt-adriver-script',
        					data: 'https://ad.adriver.ru/cgi-bin/json.cgi?sid=1&bt=55&ad=690391&pid=2961434&bid=6332225&bn=6332225&rnd=![rnd]'
        				}, '*');
        			}
        		}
        	}.bind(this));
        	ifr.src = normalizeSrc(ad.src.href[0] + (ad.src.href[0].indexOf("?") != -1 ? "&" : "?") + "ss=" + this._mt.sessionID, mt.assetsPath);
        }
        root.appendChild(ifr);

        if (ad.click && mt.link) {
        	var clickArea = d.createElement('div');
        	clickArea.classList.add('mt-click-area');
        	clickArea.addEventListener('click', this._click.bind(this));
        	root.appendChild(clickArea);
        }
			}
        var closeBtn = this._closeElement = d.createElement('div');
        closeBtn.classList.add('mt-close-button');
        var cb = ad.closeButton;
        if (cb && cb.right) {
        	closeBtn.classList.add('mt-close-button-right');
        }
        //closeBtn.classList.add('mt-hidden');
        closeBtn.style.display = "none";
				if(ad.type.indexOf('inlab') == -1){
	        closeBtn.addEventListener('click', this._close.bind(this));
				}
        root.appendChild(closeBtn);

        if (mt.target_image && mt.target_image.indexOf("http") == 0) {
        	mt.images = [mt.target_image];
        	mt.opts = null;
        }

        var test_volume = false;
        console.log(test_volume);
        if (test_volume) {
        	var images = Array.prototype.slice.call(document.body.querySelectorAll("img")) || [];
        	var opts, opts_default = {min_width: this._is_mobile ? 280 : 300, min_height: this._is_mobile ? 140 : 300};

        	if (opts) {
        		images = images.filter(function(item) {
        			return item.offsetParent && (item.width >= (opts.images_size.width.min || opts_default.min_width) && item.width <= opts.images_size.width.max) && (item.height >= (opts.images_size.height.min || opts_default.min_height) && item.height <= opts.images_size.height.max);
        		});

        		if (opts.inimage_opts.allow || opts.inimage_opts.deny) {
        			var filterImages = function(images, opt, handler) {
        				for (var i = images.length - 1; i >= 0; i--) {
        					if ((opts.inimage_opts.allow[opt].length && opts.inimage_opts.allow[opt].filter(handler, {key: i, value: images[i]}).length == 0) || (opts.inimage_opts.deny[opt].length && opts.inimage_opts.deny[opt].filter(handler, {key: i, value: images[i]}).length != 0)) images.splice(i, 1);
        				}
        			};

        			filterImages(images, "id", function(item) {
        				return this.value.id.split(" ").indexOf(item) != -1;
        			});

        			filterImages(images, "class", function(item) {
        				return this.value.className.split(" ").indexOf(item) != -1;
        			});

        			filterImages(images, "sequence", function(item) {
        				return [(this.key + 1).toString()].indexOf(item) != -1;
        			});

        			filterImages(images, "parent_mask", function(item) {
        				var parent = this.value;

        				while (parent) {
        					if (parent.outerHTML.replace(parent.innerHTML || '', '').indexOf(item) != -1) return true;
        					parent = parent.parentElement;
        				}

        				return false;
        			});
        		}
        	}
        	else {
        		images = images.filter(function(item) {
        			return item.offsetParent && (item.width >= opts_default.min_width) && (item.height >= opts_default.min_height);
        		}.bind(this));
        	}

        	return;
        }

        if (mt.images) {
        	var target = (function() {
        		var images = Array.prototype.slice.call(this._parentElement.querySelectorAll("img")) || [];
        		w._mt_used_images = w._mt_used_images || [];

				/*for (var i = images.length - 1; i >= 0; i--) {
					if (images[i].width < 300 || images[i].height < 300) images.splice(i, 1);
				}*/
				/*
				if ([8980].indexOf(this._mt.pid) != -1) {
					mt.opts = {inimage_opts:{allow:{sequence:["2", "5"],tag:[],id:[],class:[]},deny:{sequence:[],tag:[],id:[],class:[]}},images_size:{width:{min:0, max:Infinity}, height:{min:0, max:Infinity}}};
				}
				if ([8895].indexOf(this._mt.pid) != -1) {
					mt.opts = {inimage_opts:{allow:{sequence:["2"],tag:[],id:[],class:[]},deny:{sequence:[],tag:[],id:[],class:[]}},images_size:{width:{min:0, max:Infinity}, height:{min:0, max:Infinity}}};
				}
				*/

				var opts_default = {min_width: this._is_mobile ? 280 : 300, min_height: this._is_mobile ? 140 : 300};

				if (mt.opts) {
					if (+mt.opts.max_ads_in_page > 0 && w._mt_used_images.length >= +mt.opts.max_ads_in_page) return;

					images = images.filter(function(item) {
						return item.offsetParent && (item.width >= (mt.opts.images_size.width.min || opts_default.min_width) && item.width <= mt.opts.images_size.width.max) && (item.height >= (mt.opts.images_size.height.min || opts_default.min_height) && item.height <= mt.opts.images_size.height.max);
					});

					//for (var i = 0, urls = {page_url: decodeURIComponent(WindowUtils.getOriginInfo()["origin"]), mtid: mt.pid, mtdom: "", imgs: []}; i < images.length; i++) if (images[i].src.indexOf("http") == 0) urls.imgs.push(images[i].src);
					//postData("https://urls.catsnetwork.ru/rec/source_images", urls, function() {});

					if (mt.opts.inimage_opts.allow || mt.opts.inimage_opts.deny) {
						var filterImages = function(images, opt, handler) {
							for (var i = images.length - 1; i >= 0; i--) {
								if ((mt.opts.inimage_opts.allow[opt].length && mt.opts.inimage_opts.allow[opt].filter(handler, {key: i, value: images[i]}).length == 0) || (mt.opts.inimage_opts.deny[opt].length && mt.opts.inimage_opts.deny[opt].filter(handler, {key: i, value: images[i]}).length != 0)) images.splice(i, 1);
							}
						};

						filterImages(images, "id", function(item) {
							return this.value.id.split(" ").indexOf(item) != -1;
						});

						filterImages(images, "class", function(item) {
							return this.value.className.split(" ").indexOf(item) != -1;
						});

						filterImages(images, "sequence", function(item) {
							return [(this.key + 1).toString()].indexOf(item) != -1;
						});

						filterImages(images, "parent_mask", function(item) {
							var parent = this.value;

							while (parent) {
								if (parent.outerHTML.replace(parent.innerHTML || '', '').indexOf(item) != -1) return true;
								parent = parent.parentElement;
							}

							return false;
						});
					}
				}/*temp*/
				else {
					images = images.filter(function(item) {
						return item.offsetParent && (item.width >= opts_default.min_width) && (item.height >= opts_default.min_height);
					}.bind(this));
				}


				if (mt.target_image && mt.target_image.indexOf("http") == 0) {
					for (var i = 0; i < images.length; i++) {
						var src_hash = crc(images[i].src);
						for (var image_id in mt.images) {
							if (mt.images.hasOwnProperty(image_id) && w._mt_used_images.indexOf(src_hash) == -1 && images[i].src == mt.images[image_id]) {
								w._mt_used_images.push(src_hash);
								return {image: images[i], id: 0};
							}
						}
					}
				}/*temp*/
				else {
					for (var i = 0; i < images.length; i++) {
						var src_hash = crc(images[i].src);
						if (w._mt_used_images.indexOf(src_hash) == -1) {
							w._mt_used_images.push(src_hash);
							return {image: images[i], id: 0};
						}
					}
				}

				/*for (var i = 0; i < images.length; i++) {
					for (var image_id in mt.images) {
						if (mt.images.hasOwnProperty(image_id) && w._mt_used_images.indexOf(mt.images[image_id]) == -1 && images[i].src == mt.images[image_id]) {
							w._mt_used_images.push(mt.images[image_id]);
							return {image: images[i], id: image_id};
						}
					}
				}*/


			}.bind(this))() || {image: null, id: null};
			if(target.image == null){console.log("MT: %cNo image", "color: #ffe060; font-style: italic; background-color: #5a3e61; border-radius: 4px; padding: 2px 10px;")}

			this._targetImageId = target.id;
			this._targetImage = target = target.image;
		}

		if (!w._mt_simg) {
			var images = Array.prototype.slice.call(this._parentElement.querySelectorAll("img")) || [];
			var pageData = {
				url: decodeURIComponent(WindowUtils.getOriginInfo()["origin"]),
				title: d.title || "",
				description: (d.querySelector('meta[name*="description"]') || {}).content || "",
				keywords: (d.querySelector('meta[name*="keywords"]') || {}).content || "",
				imgs: [], //{url: "", t: "", ctx: "", w: 0, h: 0}
				txt: [],
				encoding: d.charset || d.characterSet,
				pid: mt.pid
			};

			for (var i = 0; i < images.length; i++) {
				if (images[i].src.indexOf("http") == 0 && images[i].width >= 300 && images[i].height >= 300) {
					var previousNode, nextNode, node;
					var data = {title: "", closest: "", full: []}, raw = [];

					previousNode = nextNode = node = images[i];

					while (!data.closest && node) {
						while (!raw.length && (previousNode || nextNode)) {
							if (nextNode = nextNode && nextNode.nextSibling) raw = WindowUtils.getNodeText(nextNode);
							if (!raw.length && (previousNode = previousNode && previousNode.previousSibling)) raw = WindowUtils.getNodeText(previousNode);
						}

						if (raw.length) {
							if ((raw = raw.join(" ")).length < 100 && !data.title) data.title = raw;
							else if (!data.closest) {
								data.closest = raw;
								data.full = WindowUtils.getNodeText(node.parentNode);
							}

							raw = [];
						}

						if (!previousNode && !nextNode) {
							node = node.parentNode !== node && !data.full.length ? node.parentNode : null;
							previousNode = nextNode = node;
						}
					}

					pageData.imgs.push({url: images[i].src, t: images[i].alt || data.title, ctx: data.closest, w: images[i].width, h: images[i].height});
					//pageData.txt = data.full.length > pageData.txt.length ? data.full : pageData.txt;
				}
			}

			postData("https://urls.catsnetwork.ru/rec/source_images", pageData, function() {});
			w._mt_simg = true;
		}

		ad.closeButton = ad.closeButton || {};
		ad.closeButton.size = typeof ad.closeButton.size !== "undefined" ? ad.closeButton.size : 1;
		ad.closeButton.top = typeof ad.closeButton.top !== "undefined" ? ad.closeButton.top : 0;
		if(ad.type.indexOf('inimage') !== -1){
			ad.bar = ad.bar || {};
			ad.bar.height = typeof ad.bar.height !== "undefined" ? ad.bar.height * 100 : 20;
			ad.bar.position = typeof ad.bar.position !== "undefined" ? ad.bar.position : "";
			ad.bar.adaptive = typeof ad.bar.adaptive !== "undefined" ? ad.bar.adaptive : false;
			ad.closeButton.right = typeof ad.closeButton.right !== "undefined" ? ad.closeButton.right : true;
			ad.closeButton.position = typeof ad.closeButton.position !== "undefined" ? ad.closeButton.position : "";
			ad.closeButton.color = typeof ad.closeButton.color !== "undefined" ? ad.closeButton.color : "#000";
			ad.closeButton.background = typeof ad.closeButton.background !== "undefined" ? ad.closeButton.background : "rgba(255, 255, 255, .5)";
			ad.closeButton.margin = typeof ad.closeButton.margin !== "undefined" ? ad.closeButton.margin : 0;
			ad.closeButton.full = ad.closeButton.full || {};
			ad.closeButton.full.right = typeof ad.closeButton.full.right !== "undefined" ? ad.closeButton.full.right : true;
			ad.closeButton.full.margin = typeof ad.closeButton.full.margin !== "undefined" ? ad.closeButton.full.margin : 0;
			ad.closeButton.full.top = typeof ad.closeButton.full.top !== "undefined" ? ad.closeButton.full.top : 0;
			ad.closeButton.full.color = typeof ad.closeButton.full.color !== "undefined" ? ad.closeButton.full.color : "#000";
			ad.closeButton.full.background = typeof ad.closeButton.full.background !== "undefined" ? ad.closeButton.full.background : "rgba(255, 255, 255, .5)";
			ad.closeButton.full.size = typeof ad.closeButton.full.size !== "undefined" ? ad.closeButton.full.size : 1;
			ad.closeButton.sticky = ad.closeButton.sticky || {};
			ad.closeButton.sticky.right = typeof ad.closeButton.sticky.right !== "undefined" ? ad.closeButton.sticky.right : true;
			ad.closeButton.sticky.margin = typeof ad.closeButton.sticky.margin !== "undefined" ? ad.closeButton.sticky.margin : 0;
			ad.closeButton.sticky.top = typeof ad.closeButton.sticky.top !== "undefined" ? ad.closeButton.sticky.top : 0;
			ad.closeButton.sticky.color = typeof ad.closeButton.sticky.color !== "undefined" ? ad.closeButton.sticky.color : "#000";
			ad.closeButton.sticky.background = typeof ad.closeButton.sticky.background !== "undefined" ? ad.closeButton.sticky.background : "rgba(255, 255, 255, .5)";
			ad.closeButton.sticky.size = typeof ad.closeButton.sticky.size !== "undefined" ? ad.closeButton.sticky.size : 1;
			ad.counter = ad.counter || {};
			ad.counter.color = typeof ad.counter.color !== "undefined" ? ad.counter.color : "#fff";
			ad.counter.background = typeof ad.counter.background !== "undefined" ? ad.counter.background : "#000";
			ad.videoWidth = typeof ad.videoWidth !== "undefined" ? ad.videoWidth : .3;
			ad.addHeight = typeof ad.addHeight !== "undefined" ? ad.addHeight : .4;
			ad.mob = ad.mob || {};
			ad.mob.buttonRepeatBackground = typeof ad.mob.buttonRepeatBackground !== "undefined" ? ad.mob.buttonRepeatBackground : "#000";
			ad.mob.buttonRepeatColor = typeof ad.mob.buttonRepeatColor !== "undefined" ? ad.mob.buttonRepeatColor : "#fff";
			ad.mob.buttonRepeatTop = typeof ad.mob.buttonRepeatTop !== "undefined" ? ad.mob.buttonRepeatTop : 0;
			ad.sticky = ad.sticky || {};
			ad.sticky.width = typeof ad.sticky.width !== "undefined" ? ad.sticky.width : 400;
			ad.sticky.height = typeof ad.sticky.height !== "undefined" ? ad.sticky.height : 240;
			ad.sticky.isTurnOn = typeof ad.sticky.isTurnOn !== "undefined" ? ad.sticky.isTurnOn : false;
			ad.frame = ad.frame || {};
			ad.frame.isTurnOnEventOver = typeof ad.frame.isTurnOnEventOver !== "undefined" ? ad.frame.isTurnOnEventOver : true;
		}else{
			ad.closeButton.color = typeof ad.closeButton.color !== "undefined" ? ad.closeButton.color : "#562572";
			ad.closeButton.background = typeof ad.closeButton.background !== "undefined" ? ad.closeButton.background : "#ffffff";
			ad.closeButton.left = typeof ad.closeButton.left !== "undefined" ? ad.closeButton.left : 0;
			ad.isScroll = typeof ad.isScroll !== "undefined" ? ad.isScroll : false;
			ad.isPostMessage = typeof ad.isPostMessage !== "undefined" ? ad.isPostMessage : false;
		}

		switch (ad.type) {
			case 'inlab-desktop-skin':
			function getParentOrigin(){
				const locationAreDisctint = (window.location !== window.parent.location);
				const parentOrigin = ((locationAreDisctint ? document.referrer : document.location) || "").toString();
				if (parentOrigin){
					return new URL(parentOrigin).origin;
				}
				const currentLocation = document.location;
				if (currentLocation.ancestorOrigins && currentLocation.ancestorOrigins.length){
					return currentLocation.ancestorOrigins[0];
				}
				return "";
			}
			var iframe1=this._iframeElement = d.createElement('iframe');
			var topHeight, sideHeight;
			iframe1.classList.add('mt-iframe');
			iframe1.classList.add('r-container__top');
			iframe1.setAttribute('scrolling', 'no');
			iframe1.src = normalizeSrc(ad.src.href[0] + (ad.src.href[0].indexOf("?") != -1 ? "&" : "?") + "ss=" + this._mt.sessionID, mt.assetsPath);
			var iframe4=this._iframeElement = d.createElement('iframe');
			iframe4.classList.add('mt-iframe');
			iframe4.classList.add('r-container__background');
			iframe4.setAttribute('scrolling', 'no');
			iframe4.src = normalizeSrc(ad.src.href[3] + (ad.src.href[3].indexOf("?") != -1 ? "&" : "?") + "ss=" + this._mt.sessionID, mt.assetsPath);
			var iframe2=this._iframeElement = d.createElement('iframe');
			iframe2.classList.add('mt-iframe');
			iframe2.classList.add('r-container__left');
			iframe2.setAttribute('scrolling', 'no');
			iframe2.src = normalizeSrc(ad.src.href[1] + (ad.src.href[1].indexOf("?") != -1 ? "&" : "?") + "ss=" + this._mt.sessionID, mt.assetsPath);
			var iframe3=this._iframeElement = d.createElement('iframe');
			iframe3.classList.add('mt-iframe');
			iframe3.classList.add('r-container__right');
			iframe3.setAttribute('scrolling', 'no');
			iframe3.src = normalizeSrc(ad.src.href[2] + (ad.src.href[2].indexOf("?") != -1 ? "&" : "?") + "ss=" + this._mt.sessionID, mt.assetsPath);
			if(ad.topMargin>0){
				topHeight=ad.ContainerSizes.height - ad.topMargin;
				iframe1.style.cssText="z-index: 2147483641;position:absolute;top:"+ad.topMargin+"px;width:"+ad.ContainerSizes.width+"px;height:"+ad.ContainerSizes.height+"px;pointer-events:all";
				iframe4.style.cssText="z-index: -1;position:fixed;top:"+ad.topMargin+"px;left:0;right:0;width:100%;height:calc(100% - "+ad.topMargin+"px);pointer-events:none";
			}else{
				iframe1.style.cssText="z-index: 2147483641;position:absolute;top:0;width:"+ad.ContainerSizes.width+"px;height:"+ad.ContainerSizes.height+"px;pointer-events:all";
				iframe4.style.cssText="z-index: -1;position:fixed;top:0;left:0;right:0;width:100%;height:100%;pointer-events:none";
			}
			if(ad.sideMargin>0){
				sideHeight=ad.sideMargin;
			}else{
				sideHeight=0;
			}
			iframe2.style.cssText="height: calc(100% - "+sideHeight+"px);z-index: 2147483642;position:fixed;left: 0;top:"+sideHeight+"px;width: calc((100% - "+ad.ContainerSizes.width+"px)/2);pointer-events:all";
			iframe3.style.cssText="height: calc(100% - "+sideHeight+"px);z-index: 2147483642;position:fixed;right: 0;top:"+sideHeight+"px;width: calc((100% - "+ad.ContainerSizes.width+"px)/2);pointer-events:all";
			root.appendChild(iframe1);
			root.appendChild(iframe2);
			root.appendChild(iframe3);
			root.appendChild(iframe4);
			if(ad.src.href[4]){
				var expand=this._iframeElement = d.createElement('iframe');
				expand.classList.add('mt-iframe');
				expand.classList.add('r-container__expanded');
				expand.setAttribute('scrolling', 'no');
				expand.src = normalizeSrc(ad.src.href[4] + (ad.src.href[4].indexOf("?") != -1 ? "&" : "?") + "ss=" + this._mt.sessionID, mt.assetsPath);
				expand.style.cssText="display:none";
				root.appendChild(expand);
			}
			iframe1.addEventListener('load',function(e){
				var skin_container=document.querySelector('.mt-inlab-desktop-skin'),JSONtopWidth,JSONcontainerIndent,JSONsideIndent,JSONtopHeight,JSONtopIndent,JSONbottomIndent,JSONcustomStyles;
				skin_container.style.cssText="position:absolute;top:0;left:0;width:100%;height:100%;display:flex;justify-content:center;overflow:hidden;z-index:auto;pointer-events:none;box-shadow:none;-webkit-box-shadow:none;";
				var req = new XMLHttpRequest();
				req.overrideMimeType("application/json");
				req.open('GET', 'https://catsnetwork.ru/storage/banners/inlab/publishers.json?r='+ Math.random(), true);
				req.onload=function(){
					var jsonResponse = JSON.parse(req.responseText);
					jsonResponse.forEach(element=>{
						if(getParentOrigin().indexOf(element.website) != -1){
							JSONtopWidth=element.containerWidth;
							JSONcontainerIndent=element.containerIndent;
							JSONtopHeight=element.topHeight;
							JSONtopIndent=element.topIndent;
							JSONbottomIndent=element.bottomIndent;
							JSONcustomStyles=element.customStyles;
							JSONsideIndent=element.sideIndent;
							console.log(element.name);
						}
					});
					iframe1.style.width=JSONtopWidth+"px";
					iframe1.style.height=JSONtopHeight+"px";
					iframe2.style.width="calc((100% - "+JSONtopWidth+"px) / 2)";
					iframe3.style.width="calc((100% - "+JSONtopWidth+"px) / 2)";
					var totalIndent=JSONtopIndent+JSONbottomIndent;
					if(JSONtopIndent>0){
						skin_container.style.top=JSONtopIndent+"px";
						iframe2.style.top=JSONtopIndent+"px";
						iframe3.style.top=JSONtopIndent+"px";
					}
					if(JSONbottomIndent>0){
						skin_container.style.bottom=JSONbottomIndent+"px";
						iframe2.style.bottom=JSONbottomIndent+"px";
						iframe3.style.bottom=JSONbottomIndent+"px";
					}
					if(totalIndent>0){
						iframe2.style.height="calc(100% - "+totalIndent+"px)";
						iframe3.style.height="calc(100% - "+totalIndent+"px)";
						skin_container.style.height="calc(100% - "+totalIndent+"px)";
					}
					if(JSONcontainerIndent>0){
						iframe1.style.top=JSONcontainerIndent+"px";
					}
					if(JSONcustomStyles !== ""){
						document.head.insertAdjacentHTML("beforeend", "<style>"+JSONcustomStyles+"</style>");
					}
					if(JSONsideIndent){
						iframe2.contentWindow.frames.postMessage("side-indent-"+JSONsideIndent, "*");
						iframe3.contentWindow.frames.postMessage("side-indent-"+JSONsideIndent, "*");
					}
				};
				req.send(null);
			});
			var i=0;
			[iframe1, iframe2, iframe3, iframe4].forEach(function(e){
				e.addEventListener('load', function(){
					i++;
					if(i>3){
						var view='up';
						function scroll(){
							var scrollpos = window.scrollY;
							if(scrollpos >= ad.ContainerSizes.height){
								if(view==='up'){
									iframe1.contentWindow.frames.postMessage("creative-scrolldown", "*");
									iframe2.contentWindow.frames.postMessage("creative-scrolldown", "*");
									iframe3.contentWindow.frames.postMessage("creative-scrolldown", "*");
									iframe4.contentWindow.frames.postMessage("creative-scrolldown", "*");
									view='down';
								}
							}else{
								if(view==='down'){
									iframe1.contentWindow.frames.postMessage("creative-scrollup", "*");
									iframe2.contentWindow.frames.postMessage("creative-scrollup", "*");
									iframe3.contentWindow.frames.postMessage("creative-scrollup", "*");
									iframe4.contentWindow.frames.postMessage("creative-scrollup", "*");
									view='up';
								}
							}
						}
						var view2='up';
						function scroll2(){
							var scrollobj=ad.ContainerSizes.height*3;
							var scrollpos2 = window.scrollY;
							if(scrollpos2 >= scrollobj){
								if(view2==='up'){
									iframe1.contentWindow.frames.postMessage("creative-scrolldown2", "*");
									iframe2.contentWindow.frames.postMessage("creative-scrolldown2", "*");
									iframe3.contentWindow.frames.postMessage("creative-scrolldown2", "*");
									iframe4.contentWindow.frames.postMessage("creative-scrolldown2", "*");
									view2='down';
								}
							}else{
								if(view2==='down'){
									iframe1.contentWindow.frames.postMessage("creative-scrollup2", "*");
									iframe2.contentWindow.frames.postMessage("creative-scrollup2", "*");
									iframe3.contentWindow.frames.postMessage("creative-scrollup2", "*");
									iframe4.contentWindow.frames.postMessage("creative-scrollup2", "*");
									view2='up';
								}
							}
						}
						window.addEventListener("scroll", function(){
							scroll();
							scroll2();
						});
						setTimeout(function(){
							scroll();
							scroll2();
						},400);
						[iframe1, iframe2, iframe3, iframe4].forEach(function(ev){
							if (ad.click && mt.link){
								ev.contentWindow.frames.postMessage("ad-click_true", "*");
							}else{
								ev.contentWindow.frames.postMessage("ad-click_false", "*");
							}
						});
						iframe1.contentWindow.frames.postMessage("creative-ready", "*");
						iframe2.contentWindow.frames.postMessage("creative-ready", "*");
						iframe3.contentWindow.frames.postMessage("creative-ready", "*");
						iframe4.contentWindow.frames.postMessage("creative-ready", "*");
					}
				});
			});
			this._mt.skipDelay=100000;
			this._parentElement.prepend(root);
			this._addParameterHref(iframe1);
			this._addParameterHref(iframe2);
			this._addParameterHref(iframe3);
			this._addParameterHref(iframe4);
			w.addEventListener("message", function(event){
				if(typeof event.data === 'string'){
					if(event.data == "videoReady"){
						iframe1.contentWindow.frames.postMessage("videoReady", "*");
						iframe2.contentWindow.frames.postMessage("videoReady", "*");
						iframe3.contentWindow.frames.postMessage("videoReady", "*");
					}
					if(event.data == "creative-video-scrolldown"){
						iframe1.contentWindow.frames.postMessage(event.data, "*");
					}
					if(event.data == "creative-video-scrollup"){
						iframe1.contentWindow.frames.postMessage(event.data, "*");
					}
					if(event.data == "creative-video-need-replay"){
						iframe1.contentWindow.frames.postMessage(event.data, "*");
					}
					if(event.data.indexOf('creative-video-time') !== -1){
						iframe1.contentWindow.frames.postMessage(event.data, "*");
						iframe2.contentWindow.frames.postMessage(event.data, "*");
						iframe3.contentWindow.frames.postMessage(event.data, "*");
					}
					if(event.data == "creative-video-play"){
						iframe1.contentWindow.frames.postMessage(event.data, "*");
						iframe2.contentWindow.frames.postMessage(event.data, "*");
						iframe3.contentWindow.frames.postMessage(event.data, "*");
					}
					if(event.data == "creative-video-pause"){
						iframe1.contentWindow.frames.postMessage(event.data, "*");
						iframe2.contentWindow.frames.postMessage(event.data, "*");
						iframe3.contentWindow.frames.postMessage(event.data, "*");
					}
					if(event.data.indexOf('creative-video-muted') !== -1){
						iframe1.contentWindow.frames.postMessage(event.data, "*");
						iframe2.contentWindow.frames.postMessage(event.data, "*");
						iframe3.contentWindow.frames.postMessage(event.data, "*");
					}
					if(event.data.indexOf('creative-video-paused') !== -1){
						iframe1.contentWindow.frames.postMessage(event.data, "*");
						iframe2.contentWindow.frames.postMessage(event.data, "*");
						iframe3.contentWindow.frames.postMessage(event.data, "*");
					}
					if(event.data.indexOf('creative-video-ended') !== -1){
						iframe1.contentWindow.frames.postMessage(event.data, "*");
						iframe2.contentWindow.frames.postMessage(event.data, "*");
						iframe3.contentWindow.frames.postMessage(event.data, "*");
					}
					if(event.data == "creative-video-mute"){
						iframe1.contentWindow.frames.postMessage(event.data, "*");
					}
					if(event.data == "creative-video-unmute"){
						iframe1.contentWindow.frames.postMessage(event.data, "*");
					}
					if(event.data == "creative-expand"){
						var skin_container=document.querySelector('.r-container__expanded');
						skin_container.style.cssText="position: fixed;top: 0;left: 0;width: 100%;height: 100%;display: flex;justify-content: center;overflow: hidden;z-index:2147483647;display:block;pointer-events:all";
					}
					if(event.data == "creative-expand-close"){
						document.querySelector('.r-container__expanded').style.cssText="display:none";
					}
					if(event.data == "mtClick"){
						this._click();
					}
					if(event.data == "mtFirstQuartile"){
						this._track('quarter');
					}
					if(event.data == "mtMidpoint"){
						this._track('half');
					}
					if(event.data == "mtThirdQuartile"){
						this._track('threequarters');
					}
					if(event.data == "mtComplete"){
						this._track('complete');
					}
				}
			}.bind(this), false);
			this._show();
			break;
			case 'inlab-mobile-skin':
			if(!mt.container){
		    mt.container = document.querySelector(".interscroll");
			}
			var ClosePosition1=parseInt(ad.ContainerSizes.height - 20);
			if(mt.container){
				mt.container.appendChild(root);
				mt.container.style.width = '100%';
				mt.container.style.zIndex='9999999';
				if(ad.height){
					mt.container.style.height = ad.height+'vh';
				}else{
					mt.container.style.height = '100vh';
				}
				mt.container.style.position = "relative";
				var scroller_container=d.createElement('div');
				scroller_container.classList.add('scroller_container');
				scroller_container.style.cssText='position:absolute;width:100vw;height:100%;clip:rect(0,auto,auto,-999px);overflow:hidden;';
				root.appendChild(scroller_container);
				iframe_main=this._iframeElement = d.createElement('iframe');
				iframe_main.classList.add('mt-iframe');
				iframe_main.classList.add('r-container__mobile-skin_scroller');
				iframe_main.setAttribute('scrolling', 'no');
				iframe_main.src = normalizeSrc(ad.src.href[0] + (ad.src.href[0].indexOf("?") != -1 ? "&" : "?") + "ss=" + this._mt.sessionID, mt.assetsPath);
				iframe_main.style.cssText="z-index:800;position: fixed;left:0;bottom:0;width:100%;height:"+mt.container.style.height+";transform:translateZ(0);-webkit-backface-visibility:hidden;backface-visibility: hidden;";
				iframe_main.addEventListener('load', function (e){
					var skin_container=document.querySelector('.mt-inlab-mobile-skin');
					skin_container.style.cssText="z-index:800;position: relative;bottom:0;left:0;top:0;right:0;width:100%;height:100%;display: flex;justify-content: center;flex-direction:row;box-shadow:0 0 0 0;-webkit-box-shadow:0 0 0 0;";
					if (ad.click && mt.link){
						iframe_main.contentWindow.frames.postMessage("ad-click_true", "*");
					}else{
						iframe_main.contentWindow.frames.postMessage("ad-click_false", "*");
					}
					document.querySelector('.mt-close-button').style.cssText="position:fixed;top:auto;left:auto;right:0;bottom:" + ClosePosition1 + "px;width:20px;height:20px;z-index:2147483647;transition:.3s;";
				});
				scroller_container.appendChild(iframe_main);
				iframe_bottom=this._iframeElement = d.createElement('iframe');
				iframe_bottom.classList.add('mt-iframe');
				iframe_bottom.classList.add('r-container__mobile-skin_footer');
				iframe_bottom.setAttribute('scrolling', 'no');
				iframe_bottom.src = normalizeSrc(ad.src.href[1] + (ad.src.href[1].indexOf("?") != -1 ? "&" : "?") + "ss=" + this._mt.sessionID, mt.assetsPath);
				var FooterPos1=0;
				var FooterPos2=ad.ContainerSizes.height * -1;
				iframe_bottom.style.cssText="position: fixed;bottom: "+FooterPos1+"px;left: 0;width: 100%;height:"+ad.ContainerSizes.height+"px;display: flex;justify-content: center;overflow: hidden;z-index:auto;z-index:2147483646;box-shadow:0 0 0 0;-webkit-box-shadow:0 0 0 0;transition:.3s;";
				root.appendChild(iframe_bottom);
				iframe_bottom.addEventListener('load', function (e){
					if (ad.click && mt.link){
						iframe_bottom.contentWindow.frames.postMessage("ad-click_true", "*");
					}else{
						iframe_bottom.contentWindow.frames.postMessage("ad-click_false", "*");
					}
					scroller();
				});
				var view=0;
				function scroller(){
					var rect=mt.container.getBoundingClientRect();
					if((rect.top < mt.container.clientHeight)&&(rect.bottom > 0)){
						if(view===0){
							iframe_main.contentWindow.frames.postMessage("InView", "*");
							iframe_bottom.contentWindow.frames.postMessage("OutView", "*");
							iframe_bottom.style.bottom=FooterPos2+'px';
							if(document.querySelector('.mt-close-button')){
								document.querySelector('.mt-close-button').style.bottom='-20px';
							}
							view=1;
						}
					}else{
						if(view===1){
							iframe_main.contentWindow.frames.postMessage("OutView", "*");
							iframe_bottom.contentWindow.frames.postMessage("InView", "*");
							iframe_bottom.style.bottom=FooterPos1+'px';
							if(document.querySelector('.mt-close-button')){
								document.querySelector('.mt-close-button').style.bottom=ClosePosition1+'px';
							}
							view=0;
						}
					}
				}
				document.addEventListener('scroll', scroller);
				window.addEventListener("resize", function(){
					mt.container.style.width = '100%';
					mt.container.style.height = '100vh';
					scroller();
				});
				closeBtn.addEventListener('click',function(){
					iframe_bottom.remove();
					this.remove();
				});
				w.addEventListener("message", function (event){
					if(typeof event.data === 'string'){
						if(event.data == "mtClick"){
							this._click();
						}
						if(event.data == "videoReady"){
							iframe_main.contentWindow.frames.postMessage("videoReady", "*");
							iframe_bottom.contentWindow.frames.postMessage("videoReady", "*");
						}
						if(event.data == "mtFirstQuartile"){
							this._track('quarter');
						}
						if(event.data == "mtMidpoint"){
							this._track('half');
						}
						if(event.data == "mtThirdQuartile"){
							this._track('threequarters');
						}
						if(event.data == "mtComplete"){
							this._track('complete');
						}
					}
				}.bind(this), false);
				this._addParameterHref(iframe_main);
				this._addParameterHref(iframe_bottom);
				this._show();
			}
			break;
			case 'inlab-mobile-scroller':
			if(!mt.container){
		    mt.container = document.querySelector(".interscroll");
			}
			if(mt.container){
				mt.container.appendChild(root);
				mt.container.style.width = '100%';
				if(ad.height){
					mt.container.style.height = ad.height+'vh';
				}else{
					mt.container.style.height = '100vh';
				}
				mt.container.style.position = "relative";
				var scroller_container=d.createElement('div');
				scroller_container.classList.add('scroller_container');
				scroller_container.style.cssText='position:absolute;width:100vw;height:100%;clip:rect(0,auto,auto,-999px);overflow:hidden;';
				root.appendChild(scroller_container);
				iframe_main=this._iframeElement = d.createElement('iframe');
				iframe_main.classList.add('mt-iframe');
				iframe_main.classList.add('r-container__mobile-scroller');
				iframe_main.setAttribute('scrolling', 'no');
				iframe_main.src = normalizeSrc(ad.src.href[0] + (ad.src.href[0].indexOf("?") != -1 ? "&" : "?") + "ss=" + this._mt.sessionID, mt.assetsPath);
				iframe_main.style.cssText="z-index:800;position: fixed;left:0;bottom:0;width:100%;height:"+mt.container.style.height+";transform:translateZ(0);-webkit-backface-visibility:hidden;backface-visibility: hidden;";
				iframe_main.addEventListener('load', function (e){
					var skin_container=document.querySelector('.mt-inlab-mobile-scroller');
					skin_container.style.cssText="z-index:800;position: relative;bottom:0;left:0;top:0;right:0;width:100%;height:100%;display: flex;justify-content: center;flex-direction:row;box-shadow:0 0 0 0;-webkit-box-shadow:0 0 0 0;";
					if (ad.click && mt.link){
						iframe_main.contentWindow.frames.postMessage("ad-click_true", "*");
					}else{
						iframe_main.contentWindow.frames.postMessage("ad-click_false", "*");
					}
					document.querySelector('.mt-close-button').style.cssText="display:none;";
				});
				scroller_container.appendChild(iframe_main);
				var view=0;
				function scroller(){
					var rect=mt.container.getBoundingClientRect();
					if((rect.top < mt.container.clientHeight)&&(rect.bottom > 0)){
						if(view===0){
							iframe_main.contentWindow.frames.postMessage("InView", "*");
							view=1;
						}
					}else{
						if(view===1){
							iframe_main.contentWindow.frames.postMessage("OutView", "*");
							view=0;
						}
					}
				}
				scroller();
				document.addEventListener('scroll', scroller);
				window.addEventListener("resize", function(){
					mt.container.style.width = '100vw';
					mt.container.style.height = '100vh';
					scroller();
				});
				w.addEventListener("message", function (event){
					if(typeof event.data === 'string'){
						if(event.data == "mtClick"){
							this._click();
						}
						if(event.data == "videoReady"){
							iframe_main.contentWindow.frames.postMessage("videoReady", "*");
						}
						if(event.data == "mtFirstQuartile"){
							this._track('quarter');
						}
						if(event.data == "mtMidpoint"){
							this._track('half');
						}
						if(event.data == "mtThirdQuartile"){
							this._track('threequarters');
						}
						if(event.data == "mtComplete"){
							this._track('complete');
						}
					}
				}.bind(this), false);
				this._addParameterHref(iframe_main);
				this._show();
			}
			break;
			case 'inlab-mobile-footer':
			var iframe=this._iframeElement = d.createElement('iframe');
			iframe.classList.add('mt-iframe');
			iframe.classList.add('r-container__mobile-footer');
			//iframe.setAttribute('referrerpolicy', 'same-origin');
			iframe.setAttribute('scrolling', 'no');
			iframe.src = normalizeSrc(ad.src.href[0] + (ad.src.href[0].indexOf("?") != -1 ? "&" : "?") + "ss=" + this._mt.sessionID, mt.assetsPath);
			iframe.style.cssText="z-index:2147483644;position: absolute;top: 0;left:0;width:100%;height:100%";
			root.appendChild(iframe);
			iframe.addEventListener('load', function (e){
				var skin_container=document.querySelector('.mt-inlab-mobile-footer');
				skin_container.style.cssText="position: fixed;bottom: 0;left: 0;width: 100%;height:"+ad.ContainerSizes.height+"px;display: flex;justify-content: center;overflow: hidden;z-index:auto;z-index:2147483646;box-shadow:0 0 0 0;-webkit-box-shadow:0 0 0 0;";
				if (ad.click && mt.link){
					iframe.contentWindow.frames.postMessage("ad-click_true", "*");
				}else{
					iframe.contentWindow.frames.postMessage("ad-click_false", "*");
				}
				document.querySelector('.mt-close-button').style.cssText="right:0;top:0;left:auto;width:20px;height:20px;z-index: 2147483645;";
			});
			this._parentElement.prepend(root);
			this._addParameterHref(iframe);
			if(ad.src.href[1]){
				var expand=this._iframeElement = d.createElement('iframe');
				expand.classList.add('mt-iframe');
				expand.classList.add('r-container__expanded');
				expand.setAttribute('scrolling', 'no');
				expand.src = normalizeSrc(ad.src.href[1] + (ad.src.href[1].indexOf("?") != -1 ? "&" : "?") + "ss=" + this._mt.sessionID, mt.assetsPath);
				expand.style.cssText="display:none";
				root.appendChild(expand);
			}
			w.addEventListener("message", function (event){
				if(typeof event.data === 'string'){
					if(event.data == "creative-video-expand"){
						var skin_container=document.querySelector('.r-container__expanded');
						skin_container.style.cssText="position: fixed;top: 0;left: 0;width: 100%;height: 100%;display: flex;justify-content: center;overflow: hidden;z-index:2147483647;display:block";
						expand.contentWindow.frames.postMessage("creative-video-expand", "*");
					}
					if(event.data == "creative-video-expand-close"){
						document.querySelector('.r-container__expanded').style.cssText="display:none";
						iframe.contentWindow.frames.postMessage("creative-video-expand-close", "*");
						iframe.contentWindow.frames.postMessage("creative-video-scrollup", "*");
					}
					if(event.data == "creative-video-scrolldown"){
						iframe.contentWindow.frames.postMessage(event.data, "*");
					}
					if(event.data == "creative-video-scrollup"){
						iframe.contentWindow.frames.postMessage(event.data, "*");
					}
					if(event.data == "creative-video-need-replay"){
						iframe.contentWindow.frames.postMessage(event.data, "*");
					}
					if(event.data.indexOf('creative-video-time') !== -1){
						iframe.contentWindow.frames.postMessage(event.data, "*");
						expand.contentWindow.frames.postMessage(event.data, "*");
					}
					if(event.data == "creative-video-play"){
						iframe.contentWindow.frames.postMessage(event.data, "*");
						expand.contentWindow.frames.postMessage(event.data, "*");
					}
					if(event.data == "creative-video-pause"){
						iframe.contentWindow.frames.postMessage(event.data, "*");
						expand.contentWindow.frames.postMessage(event.data, "*");
					}
					if(event.data.indexOf('creative-video-muted') !== -1){
						iframe.contentWindow.frames.postMessage(event.data, "*");
						expand.contentWindow.frames.postMessage(event.data, "*");
					}
					if(event.data.indexOf('creative-video-paused') !== -1){
						iframe.contentWindow.frames.postMessage(event.data, "*");
						expand.contentWindow.frames.postMessage(event.data, "*");
					}
					if(event.data.indexOf('creative-video-ended') !== -1){
						iframe.contentWindow.frames.postMessage(event.data, "*");
						expand.contentWindow.frames.postMessage(event.data, "*");
					}
					if(event.data == "creative-video-mute"){
						iframe.contentWindow.frames.postMessage(event.data, "*");
					}
					if(event.data == "creative-video-unmute"){
						iframe.contentWindow.frames.postMessage(event.data, "*");
					}
					if(event.data == "videoReady"){
						iframe.contentWindow.frames.postMessage("videoReady", "*");
					}
					if(event.data == "mtClick"){
						this._click();
					}
					if(event.data == "mtClose"){
						this._close();
					}
					if(event.data == "mtFirstQuartile"){
						this._track('quarter');
					}
					if(event.data == "mtMidpoint"){
						this._track('half');
					}
					if(event.data == "mtThirdQuartile"){
						this._track('threequarters');
					}
					if(event.data == "mtComplete"){
						this._track('complete');
					}
				}
			}.bind(this), false);
			closeBtn.addEventListener('click', this._close.bind(this));
			this._show();
			break;
			case 'flyscreen':
			root.classList.add('mt-' + ad.type + '-' + ad.position);
			var logo = d.createElement('div');
			logo.classList.add('mt-' + ad.type + '-logo');
			root.appendChild(logo);
			break;
			case 'fullscreen':
			this._addCloseSVG(ad, 0.12, 0.075, false);
			ad.background = typeof ad.background !== "undefined" ? ad.background : '';
			ifr.style.background = ad.background;
			this._changeVisiblePage(ifr);

			this._is_touch && d.body.classList.add('mt-body__hidden');
			ad.isPostMessage && this._addPostMessageCreative(ifr, ad);

			break;

			case 'adbar':
			ad.height = typeof ad.height !== "undefined" ? ad.height : 90;
			root.style.height = ad.height + "px";
			this._addCloseSVG(ad, 0.09, 0.035, true);
			this._changeVisiblePage(ifr);

			ad.isPostMessage && this._addPostMessageCreative(ifr, ad);

			break;

			case 'interscroller':
                if(!mt.container){
                   mt.container = document.querySelector(".interscroll");
                }
                if (mt.container) {
                	mt.container.style.overflow = "hidden";
                	mt.container.style.width = "100%";
                	mt.container.style.height = "100%";

                	this._creative = {
                		isrc: '*',
                		root: d.createElement('div'),
                		close: closeBtn,
                		click: clickArea,
                		frame: {
                			full: ifr,
                			is_loaded_full: false,
                			is_started: false,
                		},
                		window: {
                			w: Math.max(window.innerWidth, document.documentElement.clientWidth),
                			h: Math.max(window.innerHeight, document.documentElement.clientHeight)
                		},
                		size:{}
                	}

                	this._rootElement.classList.remove('mt-hidden');
                	this._creative.root.classList.add('mt-hidden');

                	this._rootElement.classList.remove('mt-shadow');
                	this._rootElement.insertAdjacentElement('afterbegin', this._creative.root);
                	this._creative.root.classList.add('mt-root-interscroller');

                	this._creative.root.insertAdjacentElement('afterbegin', this._creative.close);
                	if(this._creative.click){
                		this._creative.root.insertAdjacentElement('afterbegin', this._creative.click);
                	}
                	this._creative.root.insertAdjacentElement('afterbegin', ifr);

                	w.addEventListener("message", function (event) {
                		if (this._creative.frame.full.contentWindow === event.source) {
                			if (event.data == "mtCanvasLoaded") {
                				this._creative.frame.is_loaded_full = true;
                				this._vo.isViewable() ? this._startCanvas(this._creative.frame.full) : this._vo.start(this._startCanvas.bind(this, this._creative.frame.full));
                			}
                			else if (event.data == "mtCanvasStarted") {
                				if (!this._creative.frame.is_started) {
                					this._creative.frame.is_started = true;
                					this._show();
                				}
                			}
                			if(event.data == "mtRootDeleted"){
                				this._click();
                			}
                		}
                	}.bind(this), false);

                	this._loadCanvas(this._creative.frame.full);

                	var getSize = function(){
                		this._creative.window.w = Math.max(window.innerWidth, document.documentElement.clientWidth),
                		this._creative.window.h = Math.max(window.innerHeight, document.documentElement.clientHeight)
                        // var w = mt.container.getBoundingClientRect().width;
                        // var h = mt.container.getBoundingClientRect().height;
                        // var proportion = w / this._creative.window.w;
                        // var w1 = Math.round((1 - proportion)* 100)/100;
                        // proportion == 1 ? "auto" : this._creative.size.margin = (-(w1 * this._creative.window.w)/2) + "px";
                        // console.log(proportion, w1);
                    }.bind(this);

                    var resizeFrames = function(display, b, c) {
                    	getSize();
                    	b = b || 0;
                    	c = c || 0;
                    	this._creative.root.style.display = display;
                    	this._creative.root.style.clip = "rect(" + (this._creative.window.h - b) + "px, " + this._creative.window.w + "px, " + (this._creative.window.h - c) + "px, 0px)";
                    	this._rootElement.style.height = this._creative.root.style.height = this._creative.window.h +"px";
                    	this._rootElement.style.width = this._creative.root.style.width = this._creative.window.w + "px";
                        // this._rootElement.style.marginLeft = this._creative.size.margin;
                    }.bind(this);
                    resizeFrames();

                    var scroll = function(){
                    	var banner = this._rootElement.getBoundingClientRect();
                    	if(banner.top){
                    		if(this._creative.frame.is_loaded_full){
                    			if((banner.top - this._creative.window.h) > 0){
                    				resizeFrames("none");
                    			}
                    			else if((banner.top - this._creative.window.h) <= 0 && 0 <= banner.top){
                    				var b = (this._creative.window.h - banner.top);
                    				resizeFrames("block", b);
                    			}
                    			else if(0 > banner.top){
                    				var c = (this._creative.window.h - banner.bottom);
                    				resizeFrames("block", this._creative.window.h, c);
                    			}

                    		}
                    	}
                    }.bind(this);

                    w.addEventListener("scroll", scroll, false);
                    w.addEventListener("resize", scroll, false);

                    mt.container.insertAdjacentElement('beforeend', root);

                    this._vo = new ViewabilityObserver(mt.container, 0.01, 1);
                    this._vo.start();
                }

                root = null;
                break;

                case 'inimage':
                case 'inimage-bar':
                if(target){
                	this._createData(ad, closeBtn, clickArea, target);
                	this._createDataBar(ad);
                	this._createDataFrame();
                	this._creative.full = 100;
                	this._creative.is_showAb = true;
                	this._creative.opacity = 0;
                	this._creative.is_resize = true;
                	this._creative.frame.bar = ifr;
                	this._creative.frame.barSize = ifr;
                	this._creative.barPosition = ad.bar.position;

                	this._createCreativeDOM(ifr);
                	this._addEventsClose();
                	this._addParameterHref(this._creative.frame.bar);

                	if(this._is_touch){this._addClickMobTarget(this._rootElement, true)}

                		this._creative.is_effect = true;
                	if(ad.effectLight){this._createEffectLight(ad)}

                		w.addEventListener("message", function (event) {
                			if (this._creative.frame.bar.contentWindow === event.source) {
                				if (event.data == "mtCanvasLoaded") {
                					this._creative.frame.is_loaded_bar = true;
                					this._track('load');
                					this._vo.isViewable() ? this._startCanvas(this._creative.frame.bar, this._addAnimationVisibility.bind(this, this._iframeElement)) : this._vo.start(this._startCanvas.bind(this, this._creative.frame.bar, this._addAnimationVisibility.bind(this, this._iframeElement)));
                				}
                				else if (event.data == "mtCanvasStarted") {
                					if (!this._creative.frame.is_started) {
                						this._creative.root.style.opacity = 1;
                						this._creative.frame.is_started = true;
                						this._show();
                					}
                				}
                				else if (event.data == "mtFirstQuartile") {
                					this._track('quarter');
                				}
                				else if (event.data == "mtMidpoint") {
                					this._track('half');
                				}
                				else if (event.data == "mtThirdQuartile") {
                					this._track('threequarters');
                				}
                				else if (event.data == "mtComplete") {
                					this._track('complete');
                				}
                				if(event.data == "mtRootDeleted"){
                					this._rootElement.parentElement.removeChild(this._rootElement);
                				}
                			}
                		}.bind(this), false);

                	this._loadCanvas(this._creative.frame.bar);

                	this._checkPositionFrame = function(){
                		if(target.offsetHeight){
                			this._adaptBar(ad.bar.height);
                			this._frameResize("root", this._rootElement, this._creative.full, this._creative.full);
                			this._frameResize("creative", this._creative.root, this._creative.height, this._creative.height);
                			this._frameResize("bar", this._creative.frame.barSize, this._creative.height, this._creative.height);

                            this._closeButton("first", true); //!!!
                            if(ad.effectLight){this._launchEffectLight(ad)};
                        }else{
                        	setTimeout(this._checkPositionFrame, 100);
                        }
                    }.bind(this);
                    this._imageGetOrientation();
                    this._resizeCreative();

                    target.parentElement.localName == "a" ? target.parentElement.parentElement.insertAdjacentElement('afterbegin', root) : target.parentElement.insertAdjacentElement('afterbegin', root)

                    this._vo = new ViewabilityObserver(target);
                    this._vo.start();
                }

                root = null;
                break;

                case 'inline':
                case 'inimage-inline':
                case 'inimage-gwd-inline':
                if(target){

                	var is_gwd = this._isGwdFormat();

                	this._createData(ad, closeBtn, clickArea, target);
                	this._createDataBar(ad);
                	this._createDataFrame();
                	this._creative.full = 100;
                	this._creative.ab = 0;
                	this._creative.is_showAb = false;
                	this._creative.is_resize = true;
                	this._creative.frame.bar = ifr;
                	this._creative.frame.barSize = ifr;
                	this._creative.is_outsideTarget = true;

                	this._createCreativeDOM(ifr);
                	this._addEventsClose();
                	this._addParameterHref(this._creative.frame.bar);

                	if(this._is_touch){this._addClickMobTarget(target, true)};
                    // this._creative.is_effect = true;
                    if(ad.effectLight){this._createEffectLight(ad)}

                    	if(is_gwd){
                    		root.classList.add('mt-root-gwd');
                    		this._creative.inlineHeight = 100;
                    	}

                    	w.addEventListener("message", function (event) {
                    		if (this._creative.frame.bar.contentWindow === event.source) {
                    			if (event.data == "mtCanvasLoaded") {
                    				this._creative.frame.is_loaded_bar = true;
                    				this._track('load');
                    				this._vo.isViewable() ? this._startCanvas(this._creative.frame.bar, showRoot.bind(this)) : this._vo.start(this._startCanvas.bind(this, this._creative.frame.bar, showRoot.bind(this)));
                    			}
                    			else if (event.data == "mtCanvasStarted") {
                    				if (!this._creative.frame.is_started) {
                    					this._creative.root.style.opacity = this._creative.frame.barSize.style.opacity = 1;
                    					this._creative.frame.is_started = true;
                    					this._show();
                    				}
                    			}
                    			if(event.data == "mtRootDeleted"){
                    				this._rootElement.parentElement.removeChild(this._rootElement);
                    			}

                    			if (event.data == "mtFirstQuartile") {
                    				this._track('quarter');
                    			}
                    			else if (event.data == "mtMidpoint") {
                    				this._track('half');
                    			}
                    			else if (event.data == "mtThirdQuartile") {
                    				this._track('threequarters');
                    			}
                    			else if (event.data == "mtComplete") {
                    				this._track('complete');
                    			}

                    			if(event.data.name == "mtResizeInlineHeight"){
                    				console.log("mtResizeInlineHeight", event.data.height);
                    				this._creative.inlineHeight = event.data.height;
                    			}

                    		}
                    	}.bind(this), false);

                    	this._loadCanvas(this._creative.frame.bar);

                    	var showRoot = function(){
                    		var duration = is_gwd ? duration = 360 : duration = 720

                    		var timing = function(timeFraction) {
                    			return timeFraction;
                    		};
                    		var draw =  function(progress) {
                    			var t = Math.ceil(progress * this._creative.height);
                    			this._frameResize("root", this._rootElement, this._creative.height, this._creative.height, "afterend");
                    			this._frameResize("creative", this._creative.root, this._creative.height, t, "afterend");
                    			if (t >= this._creative.height){
                    				this._creative.ab = this._creative.height;
                    				this._frameResize("creative", this._creative.root, this._creative.height, this._creative.ab, "afterend");

                    				if(!is_gwd){this._closeButton("first", true)}

                    					this._creative.is_showAb = true;

                    				this._creative.is_effect = true;
                    				if(ad.effectLight){this._launchEffectLight(ad)};
                    			}
                    		}.bind(this);

                    		this._addAnimation(timing, draw, duration);
                    	}.bind(this);

                    	this._checkPositionFrame = function(){
                    		if(target.offsetHeight){
                    			this._creative.is_showAb = true;
                    			this._adaptBar(ad.bar.height);

                    			this._frameResize("root", this._rootElement, this._creative.height, this._creative.height, "afterend");
                    			this._frameResize("bar", this._creative.frame.barSize, this._creative.height, this._creative.height, "afterend");
                    			if(!is_gwd){this._closeButton("first", true)}
                    				else{this._closeButton("first", false)}

                    					if(this._creative.is_showAb){
                    						this._frameResize("creative", this._creative.root, this._creative.height, this._creative.height, "afterend");
                    						if(ad.effectLight){this._launchEffectLight(ad)};
                    					}else{
                    						this._frameResize("creative", this._creative.root, this._creative.height, this._creative.ab, "afterend");
                    					}

                    				}else{
                    					setTimeout(this._checkPositionFrame, 100);
                    				}
                    			}.bind(this);
                    			this._imageGetOrientation();
                    			this._resizeCreative();

                    			this._checkTargetParent(target, 10);

                    			if(this._creative.targetParentFits){
                    				this._creative.targetParentFits.insertAdjacentElement('afterEnd', root);
                    			}
                    			else if(target.parentElement.localName == "a"
                    				|| target.parentElement.localName == "figure" && target.parentElement.querySelector('figcaption').localName == "figcaption"
                    				|| this._creative.is_targetParentCutsImage
                    				){
                    				target.parentElement.insertAdjacentElement('afterEnd', root);
                    		}else{
                    			target.insertAdjacentElement('afterEnd', root);
                    		}

                    		this._vo = new ViewabilityObserver(target);
                    		this._vo.start();
                    	}

                    	root = null;
                    	break;

                    	case 'canvasminus':
                    	case 'inimage-canvasminus':
                    	if(target){
                    		this._createData(ad, closeBtn, clickArea, target);
                    		this._createDataBar(ad);
                    		this._createDataFrames();
                    		this._creative.full = 100;
                    		this._creative.ab = 0;
                    		this._creative.is_showAb = false;
                    		this._creative.opacity = 1;

                    		this._createCreativeDOM(ifr);
                    		this._creative.frame.bar = ifr;
                    		if(this._is_touch){this._createMobButtonRepeat(ad)}
                    			this._creative.frame.full = this._createFrame();
                    		this._iframeElement = this._creative.frame.full;

                    		this._addEventsClose();
                    		this._creative.close.classList.add('mt-close-full-format');
                    		this._addParameterHref(this._creative.frame.full);
                    		this._addParameterHref(this._creative.frame.bar);

                    		w.addEventListener("message", function (event) {
                    			if (this._creative.frame.full.contentWindow === event.source) {
                    				if (event.data == "mtCanvasLoaded") {
                    					this._creative.frame.is_loaded_full = true;
                    					this._track('load');
                    				}
                    				if (event.data == "mtCanvasStarted") {
                    					if (!this._creative.frame.is_started) {
                    						this._creative.root.style.opacity = 1;
                    						this._creative.frame.is_started = true;
                    						this._show();
                    					}
                    					else this._track('bready');
                    				}
                    				if(event.data == "mtCanvasFinished"){
                    					if(!this._creative.is_showAb){
                                    // this._creative.is_showAb = true;
                                    hideFull();
                                    this._is_touch ? this._clickMobRepeat(showFull) : overAb()
                                }
                            }
                            else if (event.data == "mtFirstQuartile") {
                            	this._track('quarter');
                            }
                            else if (event.data == "mtMidpoint") {
                            	this._track('half');
                            }
                            else if (event.data == "mtThirdQuartile") {
                            	this._track('threequarters');
                            }
                            else if (event.data == "mtComplete") {
                            	this._track('complete');
                            }
                        }
                        if (this._creative.frame.bar.contentWindow === event.source) {
                        	if (event.data == "mtCanvasLoaded") {
                        		this._creative.frame.is_loaded_bar = true;
                        	}
                        }

                        if(event.data == "mtRootDeleted"){
                        	this._rootElement.parentElement.removeChild(this._rootElement);
                        }

                    }.bind(this), false);

                    		this._loadCanvas(this._creative.frame.full);
                    		this._loadCanvas(this._creative.frame.bar);

                    		var startCreative = function(){
                    			this._vo.isViewable() ? this._startCanvas(this._creative.frame.full, this._addAnimationFull.bind(this, "show", this._creative.frame.full)) : this._vo.start(this._startCanvas.bind(this, this._creative.frame.full, this._addAnimationFull.bind(this, "show", this._creative.frame.full)));
                    		}.bind(this);
                    		this._loadedCanvases(startCreative);

                    		if(!this._is_touch){
                    			var overAb = function(){
                    				var over = function (event){
                    					switch(event.target){
                    						case this._creative.close:
                    						case this._closeElementSVG:
                    						case this._closeElementSVG.firstChild:
                    						case this._closeElementSVG.firstChild.firstChild.nextSibling:
                    						break;
                    						default:
                    						if(this._creative.is_showAb){
                    							showFull();
                    							this._creative.root.removeEventListener("mouseover", over, false);
                    						}
                    						break;
                    					}
                    				}.bind(this);
                    				setTimeout(function(){
                    					this._creative.root.addEventListener("mouseover", over, false);
                    				}.bind(this), 360);
                    			}.bind(this);
                    		}

                    		this._checkPositionFrame = function(){

                    			if(target.offsetHeight){
                    				this._adaptBar(ad.bar.height);

                    				this._frameResize("root", this._rootElement, 100, 100);
                    				this._frameResize("full", this._creative.frame.full, 100, 100);
                    				if(this._is_touch){this._resizeMobButtonRepeat()}

                    					if(!this._creative.is_showAb){
                    						this._frameResize("bar", this._creative.frame.bar, this._creative.height, 0);
                    						this._frameResize("creative", this._creative.root, this._creative.full, this._creative.full);
                    						this._closeButton("first", true);
                    					}else{
                    						this._frameResize("bar", this._creative.frame.bar, this._creative.height, this._creative.height);
                    						this._frameResize("creative", this._creative.root, this._creative.height, this._creative.height);
                    						this._closeButton("full", true);
                    					}
                    				}
                    				else{ setTimeout(this._checkPositionFrame, 100) }
                    			}.bind(this);
                    		this._imageGetOrientation();
                    		this._resizeCreative();

                    		var hideFull = function(){
                    			this._creative.close.classList.remove('mt-close-full-format');
                    			this._creative.is_showAb = true;
                    			this._adaptBar(ad.bar.height);

                    			this._creative.root.style.background = "rgba(60, 60, 59, 0)";
                    			this._closeButton("full", false);
                    			this._creative.frame.bar.style.opacity = 1;
                    			this._startFrame(this._creative.frame.bar);

                    			var showClose = function(){
                    				setTimeout(function(){
                    					this._closeButton("full", true);
                    					if(this._is_touch){
                    						this._creative.mob.buttonRepeat.style.display = "flex";
                    						this._resizeMobButtonRepeat();
                    					}
                    				}.bind(this), this._creative.TIME_MS);

                    				this._creative.full = this._creative.height;
                    				this._frameResize("creative", this._creative.root, this._creative.height, this._creative.full);
                    			}.bind(this);

                    			this._addAnimationFull("hide", this._creative.frame.full, showClose);
                    			this._addAnimationBar("show", this._creative.frame.bar);
                    		}.bind(this);

                    		var showFull = function(){
                    			if(this._is_touch){this._creative.mob.buttonRepeat.style.display = "none"}
                    				this._creative.close.classList.add('mt-close-full-format');
                    			this._creative.is_showAb = false;

                    			this._creative.root.style.background = "rgba(60, 60, 59, 0.8)";
                    			this._closeButton("first", false);
                    			this._startFrame(this._creative.frame.full);

                    			var showClose = function(){
                    				setTimeout(function(){this._closeButton("first", true)}.bind(this), this._creative.TIME_MS);
                    			}.bind(this);

                    			this._creative.full = 100;
                    			this._frameResize("creative", this._creative.root, 100, this._creative.full);

                    			this._addAnimationFull("show", this._creative.frame.full, showClose);
                    			this._addAnimationBar("hide", this._creative.frame.bar);
                    		}.bind(this);

                    		if(this._is_touch){
                    			this._addClickMobTarget(this._rootElement, false, showFull);
                    		}

                    		target.parentElement.localName == "a" ? target.parentElement.parentElement.insertAdjacentElement('afterbegin', root) : target.parentElement.insertAdjacentElement('afterbegin', root)

                    		this._vo = new ViewabilityObserver(target);
                    		this._vo.start();
                    	}

                    	root = null;
                    	break;

                    	case 'canvasplus':
                    	case 'inimage-canvasplus':
                    	if(target){
                    		this._createData(ad, closeBtn, clickArea, target);
                    		this._createDataBar(ad);
                    		this._createDataFrames();
                    		this._creative.full = ad.bar.height || 20;
                    		this._creative.ab = ad.bar.height || 20 ;
                    		this._creative.is_showAb = true;
                    		this._creative.opacity = 0;

                    		this._createCreativeDOM(ifr);
                    		this._creative.frame.bar = ifr;
                    		if(this._is_touch){
                    			this._createMobButtonRepeat(ad);
                    			this._creative.mob.buttonRepeat.style.display = "flex";
                    		}
                    		this._creative.frame.full = this._createFrame();

                    		this._addEventsClose();

                    		this._addParameterHref(this._creative.frame.full);
                    		this._addParameterHref(this._creative.frame.bar);

                    		w.addEventListener("message", function (event) {
                    			if (this._creative.frame.bar.contentWindow === event.source) {
                    				if (event.data == "mtCanvasLoaded") {
                    					this._creative.frame.is_loaded_bar = true;
                    					this._track('load');
                    				}
                    				if (event.data == "mtCanvasStarted") {
                    					if (!this._creative.frame.is_started) {
                    						this._creative.root.style.opacity = this._creative.frame.bar.style.opacity = 1;
                    						this._creative.frame.is_started = true;
                    						this._show();
                    					}
                    				}
                    			}
                    			if (this._creative.frame.full.contentWindow === event.source) {
                    				if (event.data == "mtCanvasLoaded") {
                    					this._creative.frame.is_loaded_full = true;
                    				}
                    				if(this._is_touch){
                    					if(event.data == "mtCanvasFinished"){
                    						hideFull();
                    						this._clickMobRepeat(showFull);
                    					}
                    				}
                    				else if (event.data == "mtFirstQuartile") {
                    					this._track('quarter');
                    				}
                    				else if (event.data == "mtMidpoint") {
                    					this._track('half');
                    				}
                    				else if (event.data == "mtThirdQuartile") {
                    					this._track('threequarters');
                    				}
                    				else if (event.data == "mtComplete") {
                    					this._track('complete');
                    				}
                    			}

                    			if(event.data == "mtRootDeleted"){
                    				this._rootElement.parentElement.removeChild(this._rootElement);
                    			}

                    		}.bind(this), false);

                    		this._loadCanvas(this._creative.frame.bar);
                    		this._loadCanvas(this._creative.frame.full);

                    		var startCreative = function(){
                    			this._vo.isViewable() ? this._startCanvas(this._creative.frame.bar, this._addAnimationVisibility.bind(this, this._creative.root)) : this._vo.start(this._startCanvas.bind(this, this._creative.frame.bar, this._addAnimationVisibility.bind(this, this._creative.root)));
                    		}.bind(this);
                    		this._loadedCanvases(startCreative);

                    		this._checkPositionFrame = function(){
                    			if(target.offsetHeight){
                    				this._adaptBar(ad.bar.height);

                    				this._frameResize("root", this._rootElement, 100, 100);
                    				this._frameResize("full", this._creative.frame.full, 100, 100);
                    				if(this._is_touch){this._resizeMobButtonRepeat()}

                    					if(this._creative.is_showAb){
                    						this._frameResize("bar", this._creative.frame.bar, this._creative.height, this._creative.height);
                    						this._frameResize("creative", this._creative.root, this._creative.height, this._creative.height);
                    						this._closeButton("first", true);
                    					}else{
                    						this._frameResize("creative", this._creative.root, 100, 100);
                    						this._frameResize("bar", this._creative.frame.bar, 0, 0);
                    						this._closeButton("full", true);
                    					}
                    				}else{
                    					setTimeout(this._checkPositionFrame, 100);
                    				}
                    			}.bind(this);
                    			this._imageGetOrientation();
                    			this._resizeCreative();

                    			if(!this._is_touch){
                    				var delay = 0;
                    				var delayTimer;
                    				var clearDelayingHideFull = function(){
                    					clearInterval(delayTimer);
                    					delay = 0;
                    				}
                    				var delayingHideFull = function(){
                    					delayTimer = setInterval(function(){
                    						delay += 100;
                    						if(delay >= 1300){
                    							clearDelayingHideFull();
                    							if(!this._creative.is_showAb){
                    								hideFull();
                    								this._creative.is_showAb = true;
                    							}
                    						}
                    					}.bind(this), 100);
                    				}.bind(this);

                    				var overRoot = function(event){
                    					if(event.target == this._creative.click){
                    						delay = 0;
                    						clearDelayingHideFull();
                    						this._rootElement.removeEventListener("mouseover", overRoot, false);
                    					}
                    				}.bind(this);

                    				var over = function (event){
                    					switch(event.target){
                    						case this._creative.close:
                    						case this._closeElementSVG:
                    						case this._closeElementSVG.firstChild:
                    						case this._closeElementSVG.firstChild.firstChild.nextSibling:
                    						break;
                    						default:
                    						if(this._creative.is_showAb){
                    							showFull();
                    							this._track('bready');
                    							this._creative.is_showAb = false;
                    							this._rootElement.removeEventListener("mouseover", overRoot, false);
                    						}
                    						break;
                    					}
                    				}.bind(this);

                    				var out = function (event){
                    					switch(event.relatedTarget){
                    						case this._creative.close:
                    						case this._closeElementSVG:
                    						case this._closeElementSVG.firstChild:
                    						case this._closeElementSVG.firstChild.firstChild.nextSibling:
                    						case this._creative.click:
                    						break;
                    						default:
                    						if(!this._creative.is_showAb){
                    							delayingHideFull();
                    							this._rootElement.addEventListener("mouseover", overRoot, false);
                    						}
                    						break;
                    					}
                    				}.bind(this);
                    				this._creative.root.addEventListener("mouseover", over, false);
                    			}

                    			var hideFull = function(){
                    				this._creative.close.classList.remove('mt-close-full-format');
                    				this._creative.is_showAb = true;
                    				this._adaptBar(ad.bar.height);

                    				this._creative.root.style.background = "rgba(60, 60, 59, 0)";
                    				this._closeButton("first", false);
                    				this._startFrame(this._creative.frame.bar);

                    				var showClose = function(){

                    					if(!this._is_touch){
                    						this._creative.root.addEventListener("mouseover", over, false);
                    						this._creative.root.removeEventListener("mouseout", out, false);
                    					}

                    					setTimeout(function(){
                    						this._closeButton("first", true);
                    						if(this._is_touch){
                    							this._creative.mob.buttonRepeat.style.display = "flex";
                    							this._resizeMobButtonRepeat();
                    						}
                    					}.bind(this), this._creative.TIME_MS);

                    					this._creative.full = this._creative.height;
                    					this._frameResize("creative", this._creative.root, this._creative.height, this._creative.full);

                    				}.bind(this);

                    				this._addAnimationFull("hide", this._creative.frame.full, showClose);
                    				this._addAnimationBar("show", this._creative.frame.bar);

                    			}.bind(this);

                    			var showFull = function(){
                    				this._creative.close.classList.add('mt-close-full-format');
                    				this._creative.is_showAb = false;
                    				if(this._is_touch){
                    					this._creative.mob.buttonRepeat.style.display = "none";
                    				}

                    				this._creative.root.style.background = "rgba(60, 60, 59, 0.8)";
                    				this._closeButton("full", false);
                    				this._startFrame(this._creative.frame.full);

                    				var showClose = function(){
                    					if(!this._is_touch){
                    						this._creative.root.removeEventListener("mouseover", over, false);
                    						this._creative.root.addEventListener("mouseout", out, false);
                    					}
                    					setTimeout(function(){this._closeButton("full", true)}.bind(this), this._creative.TIME_MS);
                    				}.bind(this);

                    				this._creative.full = 100;
                    				this._frameResize("creative", this._creative.root, 100, this._creative.full);

                    				this._addAnimationFull("show", this._creative.frame.full, showClose);
                    				this._addAnimationBar("hide", this._creative.frame.bar);

                    			}.bind(this);

                    			if(this._is_touch){
                    				this._resizeMobButtonRepeat()
                    				this._addClickMobTarget(this._rootElement, false, showFull)
                    			}

                    			target.parentElement.localName == "a" ? target.parentElement.parentElement.insertAdjacentElement('afterbegin', root) : target.parentElement.insertAdjacentElement('afterbegin', root)

                    			this._vo = new ViewabilityObserver(target);
                    			this._vo.start();
                    		}

                    		root = null;
                    		break;

                    		case 'invideo':
                    		case 'inimage-video':
                    		case 'inimage-gwd':
                    		case 'inimage-gwd-bar':
                    		case 'inimage-gwd-canvas':
                    		case 'inimage-gwd-canvasplus':
                    		case 'inimage-gwd-canvasminus':
                    		case 'inimage-gwd-video':
                    		case 'inimage-gwd-videoplus':
                    		case 'inimage-gwd-videominus':
                    		if(target){
                    			root.classList.remove('mt-shadow');
                    			root.classList.add('mt-root-inimage');

                    			var is_gwd = this._isGwdFormat();

                    			this._createData(ad, closeBtn, clickArea, target);
                    			this._createDataFrame();
                    			this._creative.full = 100;
                    			this._creative.is_resize = true;
                    			this._creative.opacity = 0;
                    			this._creative.frame.full = ifr;
                    			this._creative.frame.fullSize = ifr;

                    			this._createCreativeDOM(ifr);
                    			this._addEventsClose();
                    			this._addParameterHref(this._creative.frame.full);

                    			if(this._ad.type.indexOf('video') !== -1){
                    				this._createVideoRoot(ad);
                    				if(!this._is_touch && ad.sticky.isTurnOn)
                    					{this._addStickyEffect()}
                    			}

                    			if(is_gwd){
                    				root.classList.add('mt-root-gwd');
                    			}else{
                    				this._creative.video.root.insertAdjacentElement('beforeEnd', this._creative.close);
                    			}
                    			var mycheck = 4;
                    			w.addEventListener("message", function (event) {
                    				if (this._creative.frame.full.contentWindow === event.source) {
                    					if (event.data == "mtCanvasLoaded") {
                    						this._creative.frame.is_loaded_full = true;
                    						this._track('load');
                    						this._vo.isViewable() ? this._startCanvas(this._creative.frame.full, visibilityVideo.bind(this)) : this._vo.start(this._startCanvas.bind(this, this._creative.frame.full, visibilityVideo.bind(this)));
                    					}
                    					else if (event.data == "mtCanvasStarted") {
                    						if(!this._creative.frame.is_started){
                    							this._creative.root.style.opacity = 1;
                    							this._creative.frame.is_started = true;
                    							this._show();
                    							mycheck = 5;
                    						}
                    					}
                    					else if(event.data == "mtRootDeleted"){
                    						this._rootElement.parentElement.removeChild(this._rootElement);
                    						if(this._creative.video && this._creative.video.root){this._creative.video.root.parentElement.removeChild(this._creative.video.root)}
                    					}
                    				else if (event.data == "mtFirstQuartile" && mycheck == 5) {
                    					this._track('quarter');
                    					console.log('quarter');
                    				}
                    				else if (event.data == "mtMidpoint" && mycheck == 5) {
                    					this._track('half');
                    					console.log('half');
                    				}
                    				else if (event.data == "mtThirdQuartile" && mycheck == 5) {
                    					this._track('threequarters');
                    					console.log('threequarters');
                    				}
                    				else if (event.data == "mtComplete" && mycheck == 5) {
                    					this._track('complete');
                    				}

                    				if(event.data == "mtCanvasClose"){
                    					this._close();
                    				}

                    				if(event.data == "mtCanvasBready"){
                    					this._track('bready');
                    				}

                    			}
                    		}.bind(this), false);

                    			this._loadCanvas(this._creative.frame.full);

                    			var visibilityVideo = function() {
                    				var duration = 360;
                    				var timing = function(timeFraction){
                    					return timeFraction;
                    				};
                    				var draw = function(progress) {
                    					var t = Math.round((progress)*100)/100;
                    					this._creative.opacity = t;
                    					this._iframeElement.style.opacity = this._creative.opacity;

                    					if(t >= 1){
                    						this._creative.opacity = 1;
                    						this._iframeElement.style.opacity = this._creative.opacity;
                    					}
                    				}.bind(this);

                    				this._addAnimation(timing, draw, duration);
                    			}.bind(this);

                    			this._checkPositionFrame = function(){
                    				if(target.offsetHeight){
                    					this._frameResize("root",this._rootElement, this._creative.full, this._creative.full);
                    					this._frameResize("creative",this._creative.root, this._creative.full, this._creative.full);
                    					this._creative.video && this._creative.video.root && this._frameResize("video", this._creative.video.root, this._creative.full, this._creative.full);

                    					if(!is_gwd){
                    						if(this._creative.video.sticky && this._creative.video.sticky.is_check){
                    							this._closeButton("sticky", true)
                    						}else{
                    							this._closeButton("first", true)
                    						}
                    					}else{
                    						this._closeButton("first", false)
                    					}

                    					if(this._creative.click){this._creative.click.style.display = "none"}
                    				}else{
                    					setTimeout(this._checkPositionFrame, 100);
                    				}
                    			}.bind(this);
                    			this._imageGetOrientation();
                    			this._resizeCreative();

                    			target.parentElement.localName == "a" ? target.parentElement.parentElement.insertAdjacentElement('afterbegin', root) : target.parentElement.insertAdjacentElement('afterbegin', root)

                    			this._vo = new ViewabilityObserver(target);
                    			this._vo.start();
                    		}

                    		root = null;
                    		break;

                    		case 'invideo-minus':
                    		case 'inimage-videominus':
                    		if(target){
                    			this._createData(ad, closeBtn, clickArea, target);
                    			this._createDataBar(ad);
                    			this._createDataFrames();
                    			this._creative.full = 100;
                    			this._creative.ab = 0;
                    			this._creative.is_showAb = false;
                    			this._creative.opacity = 0;
                    			this._creative.frame.sendFull = null;
                    			this._creative.videoWidth = ad.videoWidth;

                    			this._createCreativeDOM(ifr);

                    			this._creative.frame.bar = ifr;
                    			this._creative.frame.full = this._createFrame();

                    			this._iframeElement = this._creative.frame.full;
                    			this._creative.frame.full.style.zIndex = 1;

                    			this._addEventsClose();
                    			this._creative.close.classList.add('mt-close-full-format');

                    			this._addParameterHref(this._creative.frame.full);
                    			this._addParameterHref(this._creative.frame.bar);

                    			this._createVideoRoot(ad);
                    			this._creative.video.root.style.background = this._creative.background;
                    			this._creative.video.root.insertAdjacentElement('beforeEnd', this._creative.close);

                    			if(this._creative.click){
                    				this._creative.click.style.display = "none"
                    			}

                    			if(this._is_touch){
                    				this._createMobButtonRepeat(ad);
                    			}else{
                    				this._createDataCounter(ad);
                    				this._createCounter();
                    				if(ad.sticky.isTurnOn){ this._addStickyEffect() }
                    			}

                    		w.addEventListener("message", function (event) {
                    			if (this._creative.frame.full.contentWindow === event.source) {
                    				if (event.data == "mtCanvasLoaded") {
                    					this._creative.frame.is_loaded_full = true;
                    					this._track('load');
                    				}
                    				else if (event.data == "mtCanvasStarted") {
                    					if (!this._creative.frame.is_started) {
                    						this._creative.root.style.opacity = this._creative.frame.full.style.opacity = 1;
                    						this._creative.frame.is_started = true;
                    						this._show();
                    					}
                    					else this._track('bready');
                    				}
                    				else if(event.data == "mtCanvasFinished"){
                    					if(this._creative.is_showAb === false){
                    						hideFull();
                    						this._creative.is_showAb = true;
                    						if(this._is_touch){this._clickMobRepeat(showFull)}
                    					}
                    			}
                    			else if (event.data == "mtFirstQuartile") {
                    				this._track('quarter');
                    			}
                    			else if (event.data == "mtMidpoint") {
                    				this._track('half');
                    			}
                    			else if (event.data == "mtThirdQuartile") {
                    				this._track('threequarters');
                    			}
                    			else if (event.data == "mtComplete") {
                    				this._track('complete');
                    			}
                    		}
                    		if(this._creative.frame.bar.contentWindow === event.source) {
                    			if(event.data == "mtCanvasLoaded") {
                    				this._creative.frame.is_loaded_bar = true;
                    			}
                    		}

                    		if(event.data == "mtRootDeleted"){
                    			this._rootElement.parentElement.removeChild(this._rootElement);
                    			if(this._creative.video && this._creative.video.root){this._creative.video.root.parentElement.removeChild(this._creative.video.root)}
                    		}

                    }.bind(this), false);

                    		if(ad.src.type !== 'sizmek'){ this._loadCanvas(this._creative.frame.bar) }
                    			this._loadCanvas(this._creative.frame.full);

                    		var startCreative = function(){
                    			this._vo.isViewable() ? this._startCanvas(this._creative.frame.full, this._addAnimationFull.bind(this, "show", this._creative.frame.full)) : this._vo.start(this._startCanvas.bind(this, this._creative.frame.full, this._addAnimationFull.bind(this, "show", this._creative.frame.full)));
                    		}.bind(this);
                    		this._loadedCanvases(startCreative);

                    		this._checkPositionFrame = function(){
                    			if(target.offsetHeight){
                    				this._adaptBar(ad.bar.height);
                    				this._frameResize("root", this._rootElement, 100, 100);
                    				this._frameResize("creative", this._creative.root, this._creative.height, this._creative.height);

                    				if(this._is_touch){this._resizeMobButtonRepeat()}
                    					else{this._resizeCounter(this._creative.number, this._creative.height)}

                    						if(!this._creative.is_showAb){

                    							if(ad.sticky.isTurnOn){
                    								if((this._creative.video.sticky && !this._creative.video.sticky.is_check) || this._is_touch){this._closeButton("first", true)}
                    							}else{
                    								this._closeButton("first", true)
                    							}

                    							this._frameResize("bar", this._creative.frame.bar, this._creative.height, 0);
                    							this._frameResize("video", this._creative.video.root, this._creative.full, this._creative.full);

                    						}else{
                    							if((this._creative.video.sticky && !this._creative.video.sticky.is_check) || this._is_touch){this._closeButton("full", true)}
                    								this._frameResize("bar", this._creative.frame.bar, this._creative.height, this._creative.height);
                    							this._frameResize("video", this._creative.video.root, this._creative.height, this._creative.videoWidth);
                    						}
                    					}
                    					else{ setTimeout(this._checkPositionFrame, 100) }
                    				}.bind(this);
                    			this._imageGetOrientation();
                    			this._resizeCreative();

                    			var hideFull = function(){
                    				this._creative.frame.bar.style.opacity = 1;
                    				this._creative.is_showAb = true;
                    				this._adaptBar(ad.bar.height);
                    				this._creative.close.classList.remove('mt-close-full-format');

                    				if(this._is_touch){
                    					this._resizeMobButtonRepeat();
                    					setTimeout(function(){
                    						this._creative.mob.buttonRepeat.style.display = "flex";
                    					}.bind(this), this._creative.TIME_MS);
                    				}else{
                    					this._creative.counter.style.display = "flex";
                    					this._creative.counter.addEventListener("mouseenter", this._creative.counterStart, false);
                    					this._creative.counter.addEventListener("mouseleave", this._creative.counterReset, false);
                    				}

                    				this._creative.root.style.background = this._creative.noBackground;
                    				this._creative.frame.bar.style.display = "block";
                    				if(this._creative.click){this._creative.click.style.display = "block"}
                    					this._startFrame(this._creative.frame.bar);

                    				if(ad.sticky.isTurnOn){
                    					if((this._creative.video.sticky && !this._creative.video.sticky.is_check) || this._is_touch){
                    						this._closeButton("full", false);
                    						this._addAnimationVideo("hide", this._creative.video.root, function(){this._closeButton("full", true)}.bind(this));
                    					}
                    				}else{
                    					this._addAnimationVideo("hide", this._creative.video.root, function(){this._closeButton("full", true)}.bind(this));
                    				}

                    				this._addAnimationBar("show", this._creative.frame.bar);
                    			}.bind(this);

                    			var showFull = function(){
                    				this._creative.is_showAb = false;
                    				this._rootElement.style.overflow = "hidden";
                    				this._creative.close.classList.add('mt-close-full-format');
                    				this._closeButton("first", false);

                    				if(this._is_touch){
                    					this._creative.mob.buttonRepeat.style.display = "none";
                    				}else{
                    					this._creative.counter.removeEventListener("mouseenter", this._creative.counterStart, false);
                    					this._creative.counter.removeEventListener("mouseleave", this._creative.counterReset, false);
                    				}

                    				if(this._creative.click !== undefined){this._creative.click.style.display = "none"}
                    					this._startFrame(this._creative.frame.full);
                    				this._addAnimationVideo("show", this._creative.video.root, function(){this._closeButton("first", true)}.bind(this));
                    				this._addAnimationBar("hide", this._creative.frame.bar);
                    			}.bind(this);

                    			if(this._is_touch){
                    				this._addClickMobTarget(this._rootElement, false, showFull);
                    			}else{
                    				this._creative.counterStart = this._startCounter.bind(this, showFull, 3);
                    				this._creative.counterReset = this._resetCounter.bind(this);
                    			}

                    			target.parentElement.localName == "a" ? target.parentElement.parentElement.insertAdjacentElement('afterbegin', root) : target.parentElement.insertAdjacentElement('afterbegin', root)

                    			this._vo = new ViewabilityObserver(target);
                    			this._vo.start();
                    		}

                    		root = null;
                    		break;

                    		case 'invideo-plus':
                    		case 'inimage-videoplus':
                    		if(target){
                    			this._createData(ad, closeBtn, clickArea, target);
                    			this._createDataBar(ad);
                    			this._createDataFrames();
                    			this._createDataCounter(ad);
                    			this._creative.full = ad.bar.height || 20;
                    			this._creative.ab = 0;
                    			this._creative.is_showAb = true;
                    			this._creative.opacity = 1;
                    			this._creative.is_resize = false;
                    			this._creative.frame.sendFullCheck = true;
                    			this._creative.videoWidth = ad.videoWidth;

                    			this._createCreativeDOM(ifr);
                    			this._creative.frame.bar = ifr;
                    			this._creative.frame.full = this._createFrame();
                    			this._creative.frame.full.style.zIndex = 1;
                    			this._creative.frame.barRoot = ifr;
                    			this._creative.frame.isFrameBar = this._ad.src.type == 'sizmek' ? this._creative.frame.barRoot : this._creative.frame.bar
                    			this._addEventsClose();

                    			this._addParameterHref(this._creative.frame.full);
                    			this._addParameterHref(this._creative.frame.bar);

                    			this._createVideoRoot(ad);
                    			if(this._is_touch){
                    				this._createMobButtonRepeat(ad);
                    				this._creative.mob.buttonRepeat.style.display = "flex";
                    			}else{
                    				this._createCounter();
                    				if(ad.sticky.isTurnOn){ this._addStickyEffect() }
                    			}

                    		w.addEventListener("message", function (event) {
                    			if (this._creative.frame.bar.contentWindow === event.source) {
                    				if (event.data == "mtCanvasLoaded") {
                    					this._creative.frame.is_loaded_bar = true;
                    					this._track('load');
                    				}
                    				if (event.data == "mtCanvasStarted") {
                    					if (!this._creative.frame.is_started) {
                    						this._creative.root.style.opacity = this._creative.frame.bar.style.opacity = this._creative.frame.full.style.opacity = 1;
                    						this._creative.frame.is_started = true;
                    						this._show();
                    						this._startFrame(this._creative.frame.full);
                    					}
                    				}
                    			}
                    			if (this._creative.frame.full.contentWindow === event.source) {
                    				if (event.data == "mtCanvasLoaded") {
                    					this._creative.frame.is_loaded_full = true;
                    				}
                    				if(event.data == "mtCanvasStartedExactFrame"){

                    				}
                    				if(event.data == "mtCanvasFinished"){
                    					if(!this._creative.is_showAb){
                    						hideFull();
                    						if(this._is_touch){this._clickMobRepeat(showFull)}
                    							this._creative.is_showAb = true;
                    					}
                    				}
                    				else if (event.data == "mtFirstQuartile") {
                    					this._track('quarter');
                    				}
                    				else if (event.data == "mtMidpoint") {
                    					this._track('half');
                    				}
                    				else if (event.data == "mtThirdQuartile") {
                    					this._track('threequarters');
                    				}
                    				else if (event.data == "mtComplete") {
                    					this._track('complete');
                    				}
                    			}

                    			if(event.data == "mtRootDeleted"){
                    				this._rootElement.parentElement.removeChild(this._rootElement);
                    				if(this._creative.video && this._creative.video.root){this._creative.video.root.parentElement.removeChild(this._creative.video.root)}
                    			}

                    	}.bind(this), false);

                    		if(ad.src.type !== 'sizmek'){ this._loadCanvas(this._creative.frame.bar) }
                    			this._loadCanvas(this._creative.frame.full);

                    		var startCreative = function(){
                    			this._vo.isViewable() ? this._startCanvas(this._creative.frame.bar, showAb.bind(this)) : this._vo.start(this._startCanvas.bind(this, this._creative.frame.bar, showAb.bind(this)));
                    		}.bind(this);
                    		this._loadedCanvases(startCreative);

                    		this._checkPositionFrame = function(){
                    			if(target.offsetHeight){
                    				this._adaptBar(ad.bar.height);
                    				this._frameResize("root", this._rootElement, 100, 100);
                    				this._frameResize("creative", this._creative.root, this._creative.height, this._creative.height);

                    				if(this._is_touch){
                    					if(!this._creative.mob.buttonRepeat.is_firstLoad){ this._resizeMobButtonRepeat() }
                    				}
                    			else{this._resizeCounter(this._creative.number, this._creative.height)}

                    				if(this._creative.is_resize == true){
                    					if(this._creative.is_showAb) {
                    						this._frameResize("bar", this._creative.frame.isFrameBar, this._creative.height, this._creative.height);
                    						this._frameResize("video", this._creative.video.root, this._creative.height, this._creative.videoWidth);

                    						if((this._creative.video.sticky && !this._creative.video.sticky.is_check) || this._is_touch){this._closeButton("first", true)}
                    					}
                    				else{
                    					this._frameResize("bar", this._creative.frame.isFrameBar, this._creative.height, 0);
                    					this._frameResize("video", this._creative.video.root, this._creative.full, this._creative.full);

                    					if((this._creative.video.sticky && !this._creative.video.sticky.is_check) || this._is_touch){this._closeButton("full", true)}
                    				}
                    		}else {
                    			this._frameResize("bar", this._creative.frame.isFrameBar, this._creative.height, 0);
                    			this._frameResize("video", this._creative.video.root, this._creative.height, this._creative.videoWidth);
                    		}
                    	}
                    	else{ setTimeout(this._checkPositionFrame, 100) }
                    }.bind(this);
                this._imageGetOrientation();
                this._resizeCreative();

                var hideFull = function(){
                	this._creative.is_showAb = true;
                	this._adaptBar(ad.bar.height);
                	this._creative.close.classList.remove('mt-close-full-format');

                	if(this._is_touch){
                		this._resizeMobButtonRepeat();
                		setTimeout(function(){
                			this._creative.mob.buttonRepeat.style.display = "flex";
                		}.bind(this), this._creative.TIME_MS);
                	}else{
                		this._creative.counter.addEventListener("mouseenter", this._creative.counterStart, false);
                		this._creative.counter.addEventListener("mouseleave", this._creative.counterReset, false);
                	}

                	this._creative.root.style.background = this._creative.noBackground;
                	this._creative.frame.bar.style.display = "block";
                	if(this._creative.click){this._creative.click.style.display = "block"}
                		this._startFrame(this._creative.frame.bar);

                	if(ad.sticky.isTurnOn){
                		if((this._creative.video.sticky && !this._creative.video.sticky.is_check) || this._is_touch){
                			this._closeButton("first", false);
                			this._addAnimationVideo("hide", this._creative.video.root, function(){this._closeButton("first", true)}.bind(this));
                		}
                	}else{
                		this._addAnimationVideo("hide", this._creative.video.root, function(){this._closeButton("first", true)}.bind(this));
                		if(this._creative.counter){
                			this._creative.counter.style.display = "flex";
                		}
                		if(this._creative.number){this._creative.number.style.opacity = 0}
                	}

                this._addAnimationBar("show", this._creative.frame.isFrameBar);

            }.bind(this);

            var showFull = function(){
            	this._creative.is_showAb = false;
            	this._rootElement.style.overflow = "hidden";
            	this._creative.close.classList.add('mt-close-full-format');
            	this._closeButton("full", false);

            	if(this._is_touch){
                            // if(this._creative.counter.style.display !== "none"){this._creative.counter.style.display = "none"}
                            this._creative.mob.buttonRepeat.style.display = "none";
                        }else{
                        	this._creative.counter.removeEventListener("mouseenter", this._creative.counterStart, false);
                        	this._creative.counter.removeEventListener("mouseleave", this._creative.counterReset, false);
                        }

                        this._track('bready');
                        if(this._creative.click !== undefined){this._creative.click.style.display = "none";}
                        if(this._creative.frame.sendFullCheck == true){
                        	this._startFrame(this._creative.frame.full);
                        	this._creative.frame.sendFullCheck = false;
                        	setTimeout(function(){this._creative.frame.sendFullCheck = true}.bind(this), this._creative.TIME_MS);
                        }
                        this._addAnimationVideo("show", this._creative.video.root, function(){this._closeButton("full", true)}.bind(this));

                        this._addAnimationBar("hide", this._creative.frame.isFrameBar);

                    }.bind(this);

                    if(!this._is_touch){
                    	setTimeout(function(){
                    		this._creative.counterStart = this._startCounter.bind(this, showFull, 3);
                    		this._creative.counterReset = this._resetCounter.bind(this);
                    		this._creative.counter.addEventListener("mouseenter", this._creative.counterStart, false);
                    		this._creative.counter.addEventListener("mouseleave", this._creative.counterReset, false);
                    	}.bind(this), this._creative.TIME_MS);
                    }

                    var showAb = function(){
                    	this._closeButton("first", false);
                    	this._adaptBar(ad.bar.height);
                    	this._creative.frame.isFrameBar.style.display = "flex";

                    	var duration = this._creative.TIME_MS;
                    	var timing = function(timeFraction){
                    		return timeFraction;
                    	}
                    	var draw = function(progress) {
                    		var t = Math.ceil(progress * this._creative.height);

                    		this._creative.ab = t;

                    		this._frameResize("bar", this._creative.frame.isFrameBar, this._creative.height, this._creative.ab);
                    		this._frameResize("video", this._creative.video.root, this._creative.height, this._creative.videoWidth);

                    		if (t >= this._creative.height){

                    			this._creative.ab = this._creative.height;

                    			this._frameResize("bar", this._creative.frame.isFrameBar, this._creative.height, this._creative.ab);
                    			this._frameResize("video", this._creative.video.root, this._creative.height, this._creative.videoWidth);

                    			if(this._creative.counter){this._creative.counter.style.display = "flex"}
                    				this._creative.frame.full.style.display = "flex";
                    			setTimeout(function(){
                    				this._closeButton("first", true)

                    				if(this._is_touch){
                    					this._resizeMobButtonRepeat();
                    					this._creative.mob.buttonRepeat.is_firstLoad = false;
                    				}
                    				else{this._resizeCounter(this._creative.number, this._creative.height)}

                    			}.bind(this), this._creative.TIME_MS);

                    			this._creative.is_showAb = true;
                    			this._creative.is_resize = true;
                    		}

                    	}.bind(this);
                    	this._addAnimation(timing, draw, duration);

                    }.bind(this);

                    if(this._is_touch){
                    	this._addClickMobTarget(this._rootElement, false, showFull);
                    }

                    target.parentElement.localName == "a" ? target.parentElement.parentElement.insertAdjacentElement('afterbegin', root) : target.parentElement.insertAdjacentElement('afterbegin', root)

                    this._vo = new ViewabilityObserver(target);
                    this._vo.start();
                }

                root = null;
                break;

                case 'inimage-framefullscreen':
                if(target){
                	this._createData(ad, closeBtn, clickArea, target);
                	this._createDataBar(ad);
                	this._createDataFrames();
                	this._creative.full = 100;
                	this._creative.ab = 0;
                	this._creative.is_showAb = false;
                	this._creative.is_showFullscreen = false;
                	this._creative.opacity = 1;
                	this._creative.is_resize = true;
                	this._creative.addHeight = ad.addHeight;

                	this._creative.frame.bar = ifr;
                	this._creative.frame.frameRoot = ifr;
                	this._creative.frame.full = this._createFrame(true);
                	this._creative.frame.isFrame = this._ad.src.type == 'sizmek' ? this._creative.frame.frameRoot : this._creative.frame.bar;
                	this._createCreativeDOM(this._creative.frame.full, ifr);

                	this._addEventsClose();
                	this._creative.close.classList.add('mt-close-full-format');

                	this._addParameterHref(this._creative.frame.full);
                	this._addParameterHref(this._creative.frame.isFrame);
                	this._addParameterHeightFrame(this._creative.frame.isFrame);

                	if(!this._is_touch){

                		if(ad.frame.isTurnOnEventOver){
                			this._createDataCounter(ad);
                			this._createCounter();
                		}else{
                			if(this._creative.click){this._creative.click.style.display = "none"}
                		}

                }else{
                	this._createMobTouchHand(ad);
                	if(this._creative.click){this._creative.click.style.display = "none"}
                		this._resizeMobTouchHand(ad)
                }

                var addHeightCreative = function(){
                	this._creative.is_cropCreative = false;
                	this._frameResize("root", this._rootElement, this._creative.full, this._creative.full, "addHeight");
                	this._frameResize("creative", this._creative.root, this._creative.full, this._creative.full, "addHeight");
                	this._frameResize("full", this._creative.frame.isFrame, this._creative.full, this._creative.full, "addHeight");
                	this._addAnimationFull("show", this._creative.frame.isFrame, function(){this._closeButton("first", true)}.bind(this))

                        //Additional redesign
                        setTimeout(function(){
                        	this._frameResize("root", this._rootElement, this._creative.full, this._creative.full, "addHeight");
                        	this._frameResize("creative", this._creative.root, this._creative.full, this._creative.full, "addHeight");
                        	this._frameResize("full", this._creative.frame.isFrame, this._creative.full, this._creative.full, "addHeight");
                        }.bind(this), 0)

                    }.bind(this);

                    w.addEventListener("message", function (event) {
                    	if (this._creative.frame.bar.contentWindow === event.source) {
                    		if (event.data == "mtCanvasLoaded") {
                    			this._creative.frame.is_loaded_bar = true;
                    			this._track('load');
                    		}
                    		if (event.data == "mtCanvasStarted") {
                    			if (!this._creative.frame.is_started) {
                    				this._creative.frame.is_started = true;
                    				this._creative.root.style.opacity = 1;
                    				this._show(addHeightCreative);
                    			}
                    		}
                    		if(event.data == "mtCanvasFinished"){
                                // overFullSize();
                            }
                            else if (event.data == "mtFirstQuartile") {
                            	this._track('quarter');
                            }
                            else if (event.data == "mtMidpoint") {
                            	this._track('half');
                            }
                            else if (event.data == "mtThirdQuartile") {
                            	this._track('threequarters');
                            }
                            else if (event.data == "mtComplete") {
                            	this._track('complete');
                            }
                        }
                        if(this._creative.frame.bar.contentWindow === event.source) {
                        	if (event.data == "mtCanvasLoaded") {
                        		this._creative.frame.is_loaded_full = true;
                        	}
                        }

                        if(event.data == "mtRootDeleted"){
                        	this._rootElement && this._rootElement.parentElement && this._rootElement.parentElement.removeChild(this._rootElement);
                        	deleteClass();
                        }

                        if(event.data == "mtShowFullscreen"){
                        	showFullscreen()
                        }

                    }.bind(this), false);

                    if(ad.src.type !== 'sizmek'){ this._loadCanvas(this._creative.frame.bar) }
                    	this._loadCanvas(this._creative.frame.full);

                    var startCreative = function(){
                    	this._vo.isViewable() ? this._startCanvas(this._creative.frame.bar) : this._vo.start(this._startCanvas.bind(this, this._creative.frame.bar));
                    }.bind(this);
                    this._loadedCanvases(startCreative);

                    this._checkPositionFrame = function(){
                    	if(target.offsetHeight){

                    		if(this._is_touch){this._resizeMobTouchHand(ad)}

                    			this._creative.counterSize = Math.min(this._creative.image.computed.height.split('px')[0], this._creative.image.computed.width.split('px')[0]) * 0.15;
                    		if(this._creative.counter){this._creative.counter.style.setProperty("height", Math.round((this._creative.image.computed.height.split('px')[0])) + "px", "important")}
                    			if(this._creative.number){this._resizeCounter(this._creative.number, this._creative.counterSize)}

                    				if(this._creative.is_cropCreative){
                    					this._closeButton("first", false);
                    					this._frameResize("root", this._rootElement, this._creative.full, this._creative.full);
                    					this._frameResize("creative", this._creative.root, this._creative.full, this._creative.full);
                    					this._frameResize("full", this._creative.frame.isFrame, this._creative.full, this._creative.full);
                    				}else{
                    					this._closeButton("first", true);
                    					this._frameResize("root", this._rootElement, this._creative.full, this._creative.full, "addHeight");
                    					this._frameResize("creative", this._creative.root, this._creative.full, this._creative.full, "addHeight");
                    					this._frameResize("full", this._creative.frame.isFrame, this._creative.full, this._creative.full, "addHeight");
                    				}

                    				if(this._creative.is_showAb && this._creative.is_showFullscreen){
                    					this._frameResize("bar", this._creative.frame.full, this._creative.full, this._creative.full, "addHeight");
                    					this._closeButton("full", true);
                    				}

                    				if(this._creative.is_showFullscreen){this._closeButton("full", true)}
                    			}
                    		else{ setTimeout(this._checkPositionFrame, 100) }
                    	}.bind(this);
                    this._imageGetOrientation();
                    this._resizeCreative();

                    var deleteClass = function(){
                    	d.body.classList.remove('mt-inimage_hidden');
                    	this._creative.rootFullscreen.parentElement.removeChild(this._creative.rootFullscreen);
                    	this._creative.close.removeEventListener("click", deleteClass, false);
                    	if(this._creative.click){this._creative.click.removeEventListener("click", deleteClass, false)}
                    }.bind(this);

                var showFullscreen = function(){
                	this._creative.is_showFullscreen = true;
                	this._closeButton("full", false);

                	this._creative.close.classList.remove('mt-close-full-format');
                	this._track('bready');

                	this._creative.rootFullscreen.classList.add('mt-root-inimage');
                	if(this._creative.click){this._creative.rootFullscreen.insertAdjacentElement('beforeEnd', this._creative.click)}
                		this._creative.rootFullscreen.insertAdjacentElement('beforeEnd', this._creative.close);

                	this._creative.rootFullscreen.style.display = "block";
                	this._rootElement.style.display = "none";

                	this._creative.root.classList.add('mt-inimage_fullsize');
                	this._creative.frame.full.classList.add('mt-inimage_fullsize');
                	if(this._creative.click){this._creative.click.classList.add('mt-inimage_fullsize')}
                		this._creative.root.style.background = "#fff";
                	d.body.classList.add('mt-inimage_hidden');
                	this._creative.close.style.zIndex = "2147483647";
                	if(this._creative.click){this._creative.click.style.zIndex = "2147483647"}
                		this._startFrame(this._creative.frame.full);

                	var showClose = function(){
                		setTimeout(function(){this._closeButton("full", true)}.bind(this), this._creative.TIME_MS);
                		setTimeout(function(){
                			if(this._creative.click){this._creative.click.style.display = "block"}
                		}.bind(this),100);
                	}.bind(this);

                	this._creative.frame.full.style.display = "none";
                	if(this._creative.click){this._creative.click.style.display = "none"}
                		this._creative.frame.full.style.display = "block";
                	this._addAnimationVisibility(this._creative.frame.full, showClose);
                	if(
                		!this._is_touch
                		&& ad.frame.isTurnOnEventOver
                		){removeEvent()}
                }.bind(this);

            if(
            	!this._is_touch
            	&& ad.frame.isTurnOnEventOver
            	){
							if(ad.src.type == 'sizmek'){
								var removeEvent = function(){
									ifr.removeEventListener("mouseenter", this._startCounter.bind(this, showFullscreen, 3), false);
									ifr.removeEventListener("mouseleave", this._resetCounter.bind(this), false);
								}.bind(this);
								ifr.addEventListener("mouseenter", this._startCounter.bind(this, showFullscreen, 3), false);
								ifr.addEventListener("mouseleave", this._resetCounter.bind(this), false);
							}else{
								var removeEvent = function(){
									this._creative.counter.removeEventListener("mouseenter", this._startCounter.bind(this, showFullscreen, 3), false);
									this._creative.counter.removeEventListener("mouseleave", this._resetCounter.bind(this), false);
								}.bind(this);
								this._creative.counter.addEventListener("mouseenter", this._startCounter.bind(this, showFullscreen, 3), false);
								this._creative.counter.addEventListener("mouseleave", this._resetCounter.bind(this), false);
							}
            }

            this._creative.close.addEventListener("click", deleteClass, false);
            if(this._creative.click){this._creative.click.addEventListener("click", deleteClass, false)}

            	this._creative.rootFullscreen = document.createElement('div');
            this._creative.rootFullscreen.classList.add("mt-inimage_fullscreen")
            this._creative.rootFullscreen.insertAdjacentElement('beforeEnd', this._creative.frame.full);
            d.body.insertAdjacentElement('beforeEnd', this._creative.rootFullscreen);

            if(this._is_touch){
            	this._creative.clickFullsize = document.createElement('div');
            	this._creative.clickFullsize.classList.add("mt-click__show-fullscreen")
            	this._creative.root.insertAdjacentElement('beforeEnd', this._creative.clickFullsize);
            	var show = function(){
            		showFullscreen();
            		this._creative.clickFullsize.removeEventListener('click', show, false);
            	}.bind(this);
            	this._creative.clickFullsize.addEventListener('click', show, false);
            }

            this._checkTargetParent(target, 10);

            if(this._creative.targetParentFits){
            	this._creative.targetParentFits.insertAdjacentElement('beforebegin', root);

            	var index = getComputedStyle(this._creative.targetParentFits).zIndex
            	if( index !== 'auto'){ this._rootElement.style.zIndex = Number(index) + 1 }
            }
        else if(target.parentElement.localName == "a"){ target.parentElement.parentElement.insertAdjacentElement('afterbegin', root) }
        	else if (this._creative.is_targetParentCutsImage){ target.parentElement.insertAdjacentElement('afterEnd', root) }
        		else { target.parentElement.insertAdjacentElement('afterbegin', root) }

        			this._vo = new ViewabilityObserver(target);
        		this._vo.start();
        	}

        	root = null;
        	break;

        	case 'inimage-frame':
        	case 'inimage-gwd-wow':
        	case 'inimage-gwd-bar-wow':
        	case 'inimage-gwd-frame':
        	case 'inimage-gwd-framefullscreen':
        	if(target){
        		var is_gwd = this._isGwdFormat();

        		this._createData(ad, closeBtn, clickArea, target);
        		this._createDataBar(ad);
        		this._createDataFrames();
        		this._createDataCounter(ad);
        		this._creative.full = 100;
        		this._creative.ab = 0;
        		this._creative.is_showAb = false;
        		this._creative.opacity = 1;
        		this._creative.is_resize = true;

        		this._createCreativeDOM(ifr);
        		this._creative.frame.bar = ifr;
        		this._creative.frame.frameRoot = ifr;
        		this._creative.frame.isFrame = this._ad.src.type == 'sizmek' ? this._creative.frame.frameRoot : this._creative.frame.bar;


        		if(is_gwd){
        			this._creative.addHeight = 50;
        			this._creative.frame.isFrame.style.opacity = 0;
        		}
        		else{ this._creative.addHeight = ad.addHeight }

        			this._addEventsClose();
        		this._addParameterHref(this._creative.frame.bar);
        		this._addParameterHeightFrame(this._creative.frame.bar);

        		var addHeightCreative = function(){
        			this._creative.is_cropCreative = false;
        			this._checkPositionFrame()

                        // //Additional redesign
                        setTimeout(function(){
                        	if(!is_gwd){
                        		this._checkPositionFrame()
                        		this._addAnimationFull("show", this._creative.frame.isFrame, function(){
                        			this._closeButton("first", true)
                        		}.bind(this));
                        	}
                        }.bind(this), 0)

                    }.bind(this);

                    var resizeFullscreen = function(){
                    	var resizeElem = function(elem){
                    		elem.style.setProperty("position", "fixed", "important");
                    		elem.style.setProperty("z-index", "2147483647", "important");
                    		elem.style.setProperty("top", "0", "important");
                    		elem.style.setProperty("left", "0", "important");
                    		elem.style.setProperty("bottom", "0", "important");
                    		elem.style.setProperty("right", "0", "important");
                    		elem.style.setProperty("width", "100%", "important");
                    		elem.style.setProperty("height", "100%", "important");
                    		elem.style.setProperty("overflow", "hidden", "important");
                    		elem.style.setProperty("margin", "0", "important");
                    		elem.style.setProperty("padding", "0", "important");
                    		elem.style.setProperty("display", "block", "important");
                    		elem.style.setProperty("opacity", "1", "important");
                    		elem.style.setProperty("transform", "translate(0%,0%)", "important");
                    	}.bind(this);

                    	setTimeout(function(){
                    		resizeElem(this._rootElement)
                    		resizeElem(this._creative.root)
                    		resizeElem(this._creative.frame.isFrame)
                    	}.bind(this),0);
                    }.bind(this);

                    w.addEventListener("message", function (event) {

                    	if (this._creative.frame.bar.contentWindow === event.source) {
                    		if (event.data == "mtCanvasLoaded") {
                    			this._creative.frame.is_loaded_bar = true;
                    			this._track('load');
                    			this._vo.isViewable() ? this._startCanvas(this._creative.frame.bar) : this._vo.start(this._startCanvas.bind(this, this._creative.frame.bar));
                    		}

                    		if (event.data == "mtCanvasStarted") {
                    			if (!this._creative.frame.is_started) {
                    				this._creative.root.style.opacity = 1;
                    				this._creative.frame.is_started = true;
                    				this._show(addHeightCreative);
                    			}
                    		}

                    		if(event.data == "mtRootDeleted"){
                    			this._rootElement.parentElement.removeChild(this._rootElement);
                    		}

                    		if (event.data == "mtFirstQuartile") {
                    			this._track('quarter');
                    		}
                    		else if (event.data == "mtMidpoint") {
                    			this._track('half');
                    		}
                    		else if (event.data == "mtThirdQuartile") {
                    			this._track('threequarters');
                    		}
                    		else if (event.data == "mtComplete") {
                    			this._track('complete');
                    		}
                    		if(event.data == "mtCanvasClose"){
                    			this._close();
                    		}

                    		if(event.data == "mtCanvasBready"){
                    			this._track('bready');
                    		}

                    		if(is_gwd){

                    			if(event.data.name == "mtResizeWowHeight"){
                    				console.log(event.data)
                    				this._creative.addHeight = event.data.height;
                    				this._checkPositionFrame()
                    				this._addAnimationFull("show", this._creative.frame.isFrame);
                    			}
                    			if(event.data == "mtFullscreenActivated"){
                    				console.log(event.data)
                    				this._track('bready');
                    				this._creative.is_fullscreen = true;
                    				resizeFullscreen();
                    			}

                    		}
                    	}

                    }.bind(this), false);

                    if(ad.src.type !== 'sizmek'){ this._loadCanvas(this._creative.frame.bar) }

                    	this._checkPositionFrame = function(){
                    		if(target.offsetHeight){

                    			if(this._creative.is_fullscreen){
                    				resizeFullscreen();
                    				return;
                    			}

                    			if(this._creative.is_cropCreative){
                    				this._closeButton("first", false);
                    				this._frameResize("root", this._rootElement, this._creative.full, this._creative.full);
                    				this._frameResize("creative", this._creative.root, this._creative.full, this._creative.full);
                    				this._frameResize("full", this._creative.frame.isFrame, this._creative.full, this._creative.full);
                    			}else{
                    				if(is_gwd){
                    					this._closeButton("first", false);
                    					if(this._creative.click){this._creative.click.style.display = "none"};
                    				}
                    				else{ this._closeButton("first", true) }
                    					this._frameResize("root", this._rootElement, this._creative.full, this._creative.full, "addHeight");
                    				this._frameResize("creative", this._creative.root, this._creative.full, this._creative.full, "addHeight");
                    				this._frameResize("full", this._creative.frame.isFrame, this._creative.full, this._creative.full, "addHeight");
                    			}
                    		}
                    		else{ setTimeout(this._checkPositionFrame, 100) }
                    	}.bind(this);
                    this._imageGetOrientation();
                    this._resizeCreative();

                    this._checkTargetParent(target, 10);

                    if(this._creative.targetParentFits){
                    	this._creative.targetParentFits.insertAdjacentElement('beforebegin', root);

                    	var index = getComputedStyle(this._creative.targetParentFits).zIndex
                    	if( index !== 'auto'){ this._rootElement.style.zIndex = Number(index) + 1 }
                    }
                else if(target.parentElement.localName == "a"){ target.parentElement.parentElement.insertAdjacentElement('afterbegin', root) }
                	else if (this._creative.is_targetParentCutsImage){ target.parentElement.insertAdjacentElement('afterEnd', root) }
                		else { target.parentElement.insertAdjacentElement('afterbegin', root) }

                			this._vo = new ViewabilityObserver(target);
                		this._vo.start();
                	}

                	root = null;
                	break;

                }

                if (root) {
									if(ad.type.indexOf('inlab') == -1)
                		this._parentElement.appendChild(root);

			// START
			if (ad.src.type !== 'sizmek') {
				if (mt.openDelay > 0) {
					setTimeout(this._show.bind(this), this._mt.openDelay);
				} else {
					this._show();
				}
			}
		}
	};

	_inimage._loadCanvas = function(frame) {
		this._loadCanvasTimer = this._loadCanvasTimer || {};

		var handler = function(is_loaded_frame, timer) {

			if (this._creative.frame[is_loaded_frame]) {
				clearInterval(this._loadCanvasTimer[timer]);
				this._loadCanvasTimer[timer] = false;
			}
			else {
				frame.contentWindow && frame.contentWindow.frames && frame.contentWindow.frames.postMessage("mtCanvasLoaded", this._creative.isrc);
			}
		}

		switch(frame) {
			case this._creative.frame.bar:
			this._loadCanvasTimer["bar"] = setInterval(handler.bind(this, "is_loaded_bar", "bar"), 100);
			break;

			case this._creative.frame.full:
			this._loadCanvasTimer["full"] = setInterval(handler.bind(this, "is_loaded_full", "full"), 100);
			break;
		}
	};

	_inimage._startCanvas = function(frame, func) {
		var timer = setInterval(function() {
			this._creative.frame.is_started ? clearInterval(timer) : frame.contentWindow.frames.postMessage("mtCanvasStarted", this._creative.isrc);
		}.bind(this), 100);
		if(func){func()}
	};

_inimage._loadedCanvases = function(startCreative) {
	var timer = setInterval(function() {
		if(this._creative.frame.is_loaded_full == true && this._creative.frame.is_loaded_bar == true){
			startCreative();
			clearInterval(timer);
		}
	}.bind(this), 100);
}

_inimage._startFrame = function(elem) {
	elem.contentWindow.frames.postMessage("mtCanvasStarted", this._creative.isrc);
};

_inimage._resizeCreative = function(){
	this._creative.image.is_resize = true;

	this._creative.resize = this._imageGetOrientation.bind(this);
	this._creative.resize2 = this._checkImage.bind(this);

	this._creative.ob = new MutationObserver(this._creative.resize);
	this._creative.ob.observe(this._creative.target,{attributes:true});

	w.addEventListener("resize", this._creative.resize, false);
	w.addEventListener("scroll", this._creative.resize2, false);
}

_inimage._addAnimation = function (timing, draw, duration) {
	var start = performance.now();
	var anim = requestAnimationFrame(function animate(time) {
          // timeFraction изменяется от 0 до 1
          var timeFraction = (time - start) / duration;
          if (timeFraction > 1) timeFraction = 1;

          var progress = timing(timeFraction);
          draw(progress);

          if (timeFraction < 1) {
          	requestAnimationFrame(animate);
          }
      });
};

_inimage._addCssAnimation = function (name, duration, count, timing) {
	this._creative.root.style.animationName = name;
	this._creative.root.style.webkitAnimationName = name;
	this._creative.root.style.animationDuration = duration;
	this._creative.root.style.webkitAnimationDuration = duration;
	this._creative.root.style.animationIterationCount = count;
	this._creative.root.style.webkitAnimationIterationCount = count;
	this._creative.root.style.animationTimingFunction = timing;
	this._creative.root.style.webkitAnimationTimingFunction = timing;
};

_inimage._addAnimationVisibility = function (frame, func) {
	var duration = this._creative.TIME_MS;
	var timing = function(timeFraction){
		return timeFraction;
	}
	var draw = function(progress) {
		var t = Math.round((progress)*100)/100;
		frame.style.opacity = t;

		if(t >= 1){
			this._creative.opacity = 1;
			frame.style.opacity = this._creative.opacity;
			if(func){func()};
		}
	}.bind(this);

	this._addAnimation(timing, draw, duration);
};

_inimage._checkImage = function(){
	if(this._rootElement){
		var resize = function(){
			this._creative.image.is_resize = false;
			this._imageGetOrientation();
			this._creative.image.firstHeight = Math.ceil(this._creative.target.getBoundingClientRect().height);
			this._creative.image.firstWidth = Math.ceil(this._creative.target.getBoundingClientRect().width);
			this._creative.image.firstPositioTop = Math.ceil(this._imageGetCoords(this._creative.target).top);
			this._creative.image.firstPositioLeft = Math.ceil(this._imageGetCoords(this._creative.target).left);
		}.bind(this);
		var checkImagePosition = function(){
			var timer = setInterval(function(){
				if (
					Math.ceil(this._creative.image.firstHeight) !== Math.ceil(this._creative.target.getBoundingClientRect().height)
					|| Math.ceil(this._creative.image.firstWidth) !== Math.ceil(this._creative.target.getBoundingClientRect().width)
					|| Math.ceil(this._creative.image.firstPositioTop) !== Math.ceil(this._imageGetCoords(this._creative.target).top)
					|| Math.ceil(this._creative.image.firstPositioLeft) !== Math.ceil(this._imageGetCoords(this._creative.target).left)
					|| this._creative.target.getBoundingClientRect().height == 0
					|| this._creative.target.getBoundingClientRect().width == 0
					|| this._rootElement && this._rootElement.offsetHeight == 0
					|| this._rootElement && this._rootElement.offsetWidth == 0
					){
					resize();
				console.log("inimage-resize: ", timer)
			}else{
				clearInterval(timer);
				setTimeout(function(){
					this._creative.ob.observe(this._creative.target,{attributes:true});
					w.addEventListener("scroll", this._creative.resize2, false);
					this._creative.image.is_resize = true;
				}.bind(this), 3000)
			}

		}.bind(this), 1000);
		}.bind(this);

		if(this._creative.image.is_resize){
			checkImagePosition();
			this._creative.ob.disconnect();
			w.removeEventListener("scroll", this._creative.resize2, false);
		}
	}
};

_inimage._imageGetOrientation = function(){
	if(this._rootElement){
		var ratio = this._creative.target.offsetWidth / this._creative.target.offsetHeight;
		if (ratio >= 3.5) {
			this._creative.k = 1.5;
			this._checkPositionFrame();
		}
		else {
			this._creative.k = ratio / 2;
			this._checkPositionFrame();
		}
	}
};

_inimage._adaptBar = function(number){
	this._creative.k = this._creative.k || 1;
	if(!this._is_touch){
		this._creative.is_barAdaptive = this._creative.barAdaptive && this._creative.target.getBoundingClientRect().width <= this._creative.barAdaptive_WIDTH
	}else{
		this._creative.is_barAdaptive = true
	}
	this._creative.is_barAdaptive ? this._creative.height = 50 : this._creative.height = (number*this._creative.k)
}

_inimage._imageGetSize = function(){
	this._imageGetPadding(this._creative.image, this._creative.image.computed.paddingTop, this._creative.image.computed.paddingRight, this._creative.image.computed.paddingBottom, this._creative.image.computed.paddingLeft);
	this._imageGetMargin(this._creative.image, this._creative.image.computed.marginTop, this._creative.image.computed.marginRight, this._creative.image.computed.marginBottom, this._creative.image.computed.marginLeft);
	this._imageGetPadding(this._creative.imageParent, this._creative.imageParent.computed.paddingTop, this._creative.imageParent.computed.paddingRight, this._creative.imageParent.computed.paddingBottom, this._creative.imageParent.computed.paddingLeft);
	this._imageGetMargin(this._creative.imageParent, this._creative.imageParent.computed.marginTop, this._creative.imageParent.computed.marginRight, this._creative.imageParent.computed.marginBottom, this._creative.imageParent.computed.marginLeft);

	this._checkHeightTargetСropping();
	var selectHeight = function(){
		if(this._creative.is_targetParentCutsImage){
                // console.log("in-image: Target parent cuts the image.")
                return this._creative.target.parentElement.getBoundingClientRect().height;
            }else{
            	return this._creative.target.getBoundingClientRect().height;
            }
        }.bind(this);

        this._creative.w = Math.ceil(this._creative.target.getBoundingClientRect().width);
        this._creative.h = Math.ceil(selectHeight());

        if(this._getInternetExplorerVersion()!==-1){}
        	else{
        		this._creative.w -= this._creative.image.p.reduceWidth;
        		if(this._creative.is_targetParentCutsImage){
        			this._creative.h -= this._creative.image.p.top;
        			this._creative.h -= this._creative.image.m.top;
        		}else{
        			this._creative.h -= this._creative.image.p.reduceHeight;
        		}
        	}
        };

        _inimage._imageGetPadding = function(elem, top, right, bottom, left) {
        	elem.p = {};
        	elem.p.top = Number(top.split('px')[0])       || 0;
        	elem.p.right = Number(right.split('px')[0])   || 0;
        	elem.p.bottom = Number(bottom.split('px')[0]) || 0;
        	elem.p.left = Number(left.split('px')[0])     || 0;

        	elem.p.reduceWidth = 0;
        	elem.p.reduceHeight = 0;

        	if(elem.p.left !== 0){
        		elem.p.reduceWidth += elem.p.left;
        	}
        	if(elem.p.right !== 0){
        		elem.p.reduceWidth += elem.p.right;
        	}
        	if(elem.p.top !== 0){
        		elem.p.reduceHeight += elem.p.top;
        	}
        	if(elem.p.bottom !== 0){
        		elem.p.reduceHeight += elem.p.bottom;
        	}
        };

        _inimage._imageGetCoords = function(elem){
        	var box = elem.getBoundingClientRect();
        	return {
        		top: box.top + window.pageYOffset,
        		bottom: box.bottom + window.pageYOffset,
        		left: box.left + window.pageXOffset,
        		right: box.right + window.pageXOffset
        	};
        };

        _inimage._imageGetMargin = function(elem, top, right, bottom, left) {
        	elem.m = {};
        	elem.m.top = Number(top.split('px')[0])       || 0;
        	elem.m.right = Number(right.split('px')[0])   || 0;
        	elem.m.bottom = Number(bottom.split('px')[0]) || 0;
        	elem.m.left = Number(left.split('px')[0])     || 0;
        };

        _inimage._getInternetExplorerVersion = function(){
        	var rv = -1;
        	if (navigator.appName == 'Microsoft Internet Explorer')
        	{
        		var ua = navigator.userAgent;
        		var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
        		if (re.exec(ua) != null)
        			rv = parseFloat( RegExp.$1 );
        	}
        	else if (navigator.appName == 'Netscape')
        	{
        		var ua = navigator.userAgent;
        		var re  = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");
        		if (re.exec(ua) != null)
        			rv = parseFloat( RegExp.$1 );
        	}
        	return rv;
        };

        _inimage._resetMargins = function(elem){
        	elem.style.right = elem.style.paddingTop = elem.style.paddingLeft = elem.style.paddingBottom = elem.style.paddingRight = elem.style.marginTop = elem.style.marginLeft = elem.style.marginBottom = elem.style.marginRight = 0;
        }

        _inimage._frameResize = function(format, elem, size, param, position) {
        	this._imageGetSize();

        	var width = this._creative.w;
        	var videoWidth = this._creative.w * param;
        	var height = this._creative.h;
        	var h = Math.ceil(height * ( size / 100 ));
        	var t = Math.ceil(height * ( param / 100 )) || 0;
        	var indentPictures = 6;
        	var adaptBarOn = function(){
        		if(this._creative.is_barAdaptive){
        			if(h > 150 && t > 150 && this._creative.is_showAb){
        				t = h = 150;
        				this._creative.height = Math.ceil(( 150 * 100 ) / height);
        			}
        		}
        	}.bind(this);

        	switch(format) {
        		case "root":

        		elem.style.width = width + "px";
        		if(position == "addHeight"){
        			if( this._isGwdFormat() ){
        				elem.style.height = h + this._creative.addHeight + "px";
        			}else{
        				elem.style.height = h * (this._creative.addHeight+1) + "px";
        			}
        		}else if(position == "afterend"){
        			adaptBarOn();
        			if(this._creative.inlineHeight){
        				elem.style.height = this._creative.inlineHeight + "px";
        			}else{
        				elem.style.height = h + "px";
        			}
        		}else{
        			elem.style.height = h + "px";
        		}

        		if(this._creative.target.parentElement.localName == "figure"){
        			this._rootElement.style.zIndex = "1";
        		}

        		if(this._creative.image.computed.position == "absolute"){
        			elem.style.position = "absolute";
        		}

        		var cnahgeCoords = function(parentTarget){
        			var c = {t:0,l:0,mt:0,mb:0}
                        //c.l += this._imageGetCoords(this._creative.target).left;
                        //c.l -= this._imageGetCoords(parentTarget).left;
                        //c.l += this._creative.image.p.left;
                        var absoluteTop = Number(this._creative.image.computed.top.split('px')[0]);

                        if(position == "afterend") {
                        	if(this._creative.targetParentFits){

                        		elem.style.position = "relative";
                        		c.mt += indentPictures;
                        		c.mb += Number(getComputedStyle(this._creative.targetParentFits).marginBottom.split('px')[0]);
                        		c.mb += indentPictures;
                        	}
                        	else{

                        		c.t += indentPictures;

                        		if(this._creative.image.computed.position == "absolute"){

                        			var targetHeight = Math.round(this._creative.target.getBoundingClientRect().height*100)/100;
                        			var rootHeight = Math.round(this._creative.root.getBoundingClientRect().height*100)/100;
                        			c.t += targetHeight;
                        			c.t += absoluteTop;

                        			if(this._creative.imageParent.computed.position == "relative"){
                        				var parentMarginBottom = 0;
                        				if(elem.parentElement && getComputedStyle(elem.parentElement)){
                        					parentMarginBottom = Number(getComputedStyle(elem.parentElement).marginBottom.split('px')[0]);
                        				}
                        				this._creative.target.parentElement.style.marginBottom = ( rootHeight + indentPictures + parentMarginBottom) + "px";
                        			}else{
                        				this._creative.target.parentElement.style.marginBottom = ( rootHeight + ( indentPictures * 2 )) + "px";
                        			}

                        		}else{
                        			c.mb += indentPictures;
                        		}

                        		if(this._creative.target.parentElement.localName == "figure" && this._creative.target.parentElement.querySelector('figcaption').localName == "figcaption"){}
                        			else{
                        				c.t += indentPictures;
                        				c.t -= this._creative.image.p.bottom;
                        				c.mt -= this._creative.image.m.bottom;
                        				c.mb += this._creative.image.m.bottom;

                            // if(this._getInternetExplorerVersion()!==-1){}
                            if(this._creative.target.parentElement.localName == "a"){
                            	switch(this._creative.target.parentElement.style.display){
                            		case "initial":
                            		case "inline":
                            		case "contents":
                            		case "unset":
                            		case "":
                            		break;
                            		default:
                            		c.mt -= this._creative.imageParent.p.bottom;
                            		c.mt -= this._creative.imageParent.m.bottom;
                            		c.mb += this._creative.image.p.bottom;
                            		c.mb += this._creative.imageParent.m.bottom;
                            		c.mb += this._creative.imageParent.p.bottom;
                            		break;
                            	}
                            }else if(this._creative.is_targetParentCutsImage){
                            	c.mb += this._creative.imageParent.m.bottom;
                            	c.mb += indentPictures;
                            }
                        }
                    }

                }else{

                	if(this._creative.image.computed.position == "absolute"){
                		c.t += absoluteTop;
                	}

                	if(
                		Math.ceil(this._creative.target.getBoundingClientRect().height) <= Math.ceil(parentTarget.getBoundingClientRect().height)
                		){
                            c.t += this._imageGetCoords(this._creative.target).top; //@todo why???
                        c.t -= this._imageGetCoords(parentTarget).top;
                        c.t -= this._creative.imageParent.p.top;
                    }

                    c.t += this._creative.image.p.top;

                    if(position == "addHeight"){

                    	if( this._isGwdFormat() ){
                    		c.mb -= h + this._creative.addHeight;
                    	}else{
                    		c.mb -= h * (this._creative.addHeight+1);
                    	}

                    	if(this._creative.is_targetParentCutsImage){
                    		c.mt -= h;
                    		c.mb += h;
                    		c.mt -= this._creative.imageParent.m.bottom;
                    	}

                    	if(this._creative.addHeight && this._creative.is_cropCreative){
                                // The first loading of the creative and resize from 100% to 140%
                                if( this._isGwdFormat() ){
                                	c.t -= Math.ceil(this._creative.addHeight);
                                }else{
                                	c.t -= Math.ceil(h * this._creative.addHeight);
                                }
                            }

                        }else{
                        	c.mb -= h;
                        }

                    }

                    this._resetMargins(elem);

                    if(this._creative.targetParentFits) c.mt += Number(getComputedStyle(elem.parentElement).marginTop.split('px')[0]);

                    elem.style.top = c.t + "px", elem.style.left = c.l + "px", elem.style.marginTop = c.mt + "px", elem.style.marginBottom = c.mb + "px";
                }.bind(this);

                if(this._creative.targetParentFits){
                	cnahgeCoords(this._creative.targetParentFits.parentElement)
                }else{
                	this._creative.target.parentElement.localName == "a" ? cnahgeCoords(this._creative.target.parentElement.parentElement) : cnahgeCoords(this._creative.target.parentElement)
                }

                break;

                case "creative":
                this._resetMargins(elem);
                adaptBarOn();
                elem.style.width = width + "px";

                switch(position){
                	case "afterend":
                	if(this._creative.inlineHeight){
                		elem.style.height = this._creative.inlineHeight + "px";
                	}else{
                		elem.style.height = h + "px";
                	}
                	elem.style.transform = "translateY(" + ( t - h ) + "px)";
                	break;
                	case "addHeight":
                	if( this._isGwdFormat() ){
                		elem.style.height = h + this._creative.addHeight + "px";
                	}else{
                		elem.style.height = h * (this._creative.addHeight+1) + "px";
                	}
                	elem.style.transform = "translateY(" + ( t - h ) + "px)";
                	break;
                	default:
                	elem.style.height = t + "px";
                	elem.style.transform = "translateY(" + ( h - t ) + "px)";
                	break;
                }

                break;

                case "bar":
                this._creative.barPosition == "top" ? (elem.style.top = 0, elem.style.bottom = "auto") : (elem.style.bottom = 0, elem.style.top = "auto");
                this._resetMargins(elem);
                adaptBarOn();

                if(position !== "addHeight"){
                	elem.style.setProperty("width", width + "px", "important");
                	if(this._creative.inlineHeight){
                		elem.style.setProperty("height", this._creative.inlineHeight + "px", "important");
                	}else{
                		elem.style.setProperty("height", h + "px", "important");
                	}
                }

                // elem.style.setProperty("margin-top", -h + "px", "important");
                elem.style.transform = "translateY(" + ( h - t ) + "px)";

                break;

                case "full":
                this._resetMargins(elem);

                elem.style.setProperty("width", width + "px", "important");
                if(position == "addHeight"){

                	if( this._isGwdFormat() ){
                		elem.style.setProperty("height", Math.ceil(h + this._creative.addHeight) + "px", "important")
                	}else{
                		elem.style.setProperty("height", Math.ceil(h + (h * this._creative.addHeight)) + "px", "important")
                	}

                }else{
                	elem.style.setProperty("height", h + "px", "important")
                }
                elem.style.transform = "translateY(" + ( h - t ) + "px)";
                break;

                case "video":
                this._resetMargins(elem);
                elem.style.setProperty("right", "auto", "important");
                elem.style.setProperty("bottom", "auto", "important");
                elem.style.setProperty("left", "0", "important");

                if(this._creative.video.sticky && this._creative.video.sticky.is_check){
                	elem.style.setProperty("width", this._creative.video.width + "px", "important");
                	elem.style.setProperty("height", this._creative.video.height + "px", "important");
                	elem.style.setProperty("bottom", "auto", "important");
                	elem.style.setProperty("top", w.innerHeight - this._creative.video.height + "px", "important");
                }
                else{
                	if(this._creative.is_showAb){
                		elem.style.setProperty("width", videoWidth + "px", "important");
                	}else{
                		elem.style.setProperty("width", width + "px", "important");
                	}
                	elem.style.setProperty("top", "auto", "important");
                	elem.style.setProperty("bottom", "0", "important");
                	elem.style.setProperty("height", h + "px", "important");
                }

                break;

            }
        };

        _inimage._addAnimationFull = function(position, frame, func){
        	var duration = this._creative.TIME_MS;
        	var timing = function(timeFraction){
        		return timeFraction;
        	};
        	var draw = function(progress) {
        		switch(position) {
        			case "show":

        			var t = Math.round((progress)*100)/100;
        			this._creative.opacity = t;

        			frame.style.display = 'block'
        			frame.style.opacity = this._creative.opacity;

        			if(t >= 1){
        				if(func){func()}
        					this._creative.opacity = 1;
        				frame.style.opacity = this._creative.opacity;
        			}

        			break;
        			case "hide":

        			var t = Math.round((progress - 1)*100)/100;
        			this._creative.opacity = (-t);
        			frame.style.opacity = this._creative.opacity;

        			if((-t) <= 0){
        				if(func){func()}
        					this._creative.opacity = 0;
        				frame.style.opacity = this._creative.opacity;
        				frame.style.display = 'none'

        				break;
        			}
        		}
        	}.bind(this);
        	this._addAnimation(timing, draw, duration);
        };

        _inimage._addAnimationBar = function(position, frame, time){
        	var duration = time || this._creative.TIME_MS;
        	var timing = function(timeFraction){
        		return timeFraction;
        	};
        	var draw = function(progress) {
        		switch(position) {
        			case "show":
        			var t = Math.ceil(progress*this._creative.height);
        			this._creative.ab = t;
        			this._frameResize("bar", frame, this._creative.height, this._creative.ab);
        			if (t >= this._creative.height){
        				this._creative.ab = this._creative.height;
        				this._frameResize("bar", frame, this._creative.height, this._creative.ab);
        			}
        			break;

        			case "hide":
        			var t = Math.ceil(this._creative.height - ( progress * this._creative.height ));
        			this._creative.ab = t;
        			this._frameResize("bar", frame, this._creative.height, this._creative.ab);
        			if (t <= 0){
        				this._creative.ab = 0;
        				this._frameResize("bar", frame, this._creative.height, this._creative.ab);
        			}
        			break;
        		}
        	}.bind(this);

        	this._addAnimation(timing, draw, duration);
        };

        _inimage._addAnimationVideo = function(position, frame, func, time){
        	var duration = time || this._creative.TIME_MS;
        	var timing = function(timeFraction){
        		return timeFraction;
        	}
        	var draw = function(progress) {
        		switch(position) {
        			case "show":
        			var t = Math.ceil(progress * 100);

        			if(t >= this._creative.videoWidth && this._creative.videoWidth <= 100){
        				this._frameResize("video", frame, t, t);
        			}

        			if (t >= 100){

        				this._creative.full = 100;
        				this._frameResize("video", frame, 100, this._creative.full);

        				if(this._creative.counter){this._creative.counter.style.display = "none"}
        					if(!this._isGwdFormat()){ frame.style.background = this._creative.background }
        						frame.insertAdjacentElement('beforeEnd', this._creative.close);
        					if(func){func()}
        						this._creative.is_showAb = false;
        				}

        				break;
        				case "hide":
        				var t = (100 + ((progress * this._creative.height) - (progress * 100)));

        				this._frameResize("video", frame, t, this._creative.videoWidth);

        				if (t <= this._creative.height){
        					this._creative.full = this._creative.height;
        					this._frameResize("video", frame, this._creative.height, this._creative.videoWidth);
        					if(!this._isGwdFormat()){ frame.style.background = this._creative.noBackground }

        						if(this._creative.counter){this._creative.counter.style.display = "flex"}
        							if(this._creative.number){this._creative.number.style.opacity = 0}
        								this._creative.root.insertAdjacentElement('beforeEnd', this._creative.close);
        							if(func){func()}
        								this._creative.is_showAb = true;
        							break;
        						}
        					}
        				}.bind(this);

        				this._addAnimation(timing, draw, duration);
        			};

        			_inimage._createData = function(ad, closeBtn, clickArea, target){
        				this._creative = {
        					isrc: '*',
        					root: d.createElement('div'),
        					target: target,
        					close: closeBtn,
        					click: clickArea,
        					barAdaptive_WIDTH: 600,
        					background: "rgba(60, 60, 59, 0.8)",
        					noBackground: "rgba(60, 60, 59, 0)",
        					is_cropCreative: true,
        					is_fullscreen: false,
        					closeData: {
        						root: "first",
        						is_right: ad.closeButton.right,
        						margin: ad.closeButton.margin,
        						size: (function(s, mobile, tablet){if(mobile){return s*= 1.5}else if(tablet){return s*= 1.25}else{return s}})(ad.closeButton.size, this._is_mobile, this._is_tablet),
        						top: ad.closeButton.top,
        						color: ad.closeButton.color,
        						background: ad.closeButton.background,
        						position: ad.closeButton.position,
        						full: {
        							root: "full",
        							is_right: ad.closeButton.full.right,
        							margin: ad.closeButton.full.margin,
        							size: (function(s, mobile, tablet){if(mobile){return s*= 1.5}else if(tablet){return s*= 1.25}else{return s}})(ad.closeButton.full.size, this._is_mobile, this._is_tablet),
        							top: ad.closeButton.full.top,
        							color: ad.closeButton.full.color,
        							background: ad.closeButton.full.background,
        						},
        						sticky: {
        							root: "sticky",
        							is_right: ad.closeButton.sticky.right,
        							margin: ad.closeButton.sticky.margin,
        							size: (function(s, mobile, tablet){if(mobile){return s*= 1.5}else if(tablet){return s*= 1.25}else{return s}})(ad.closeButton.sticky.size, this._is_mobile, this._is_tablet),
        							top: ad.closeButton.sticky.top,
        							color: ad.closeButton.sticky.color,
        							background: ad.closeButton.sticky.background,
        						},
        					},
        					image: {
        						computed: getComputedStyle(target)
        					},
        					imageParent: {
        						computed: getComputedStyle(target.parentElement)
        					}
        				}
        			}

        			_inimage._createDataBar = function(ad){
        				this._creative.barAdaptive = ad.bar.adaptive;
        				this._creative.height = ad.bar.height;
        			}

        			_inimage._createDataFrame = function(){
        				this._creative.frame = {
        					is_loaded_bar: false,
        					is_started: false,
        				}
        			}

        			_inimage._createDataFrames = function(){
        				this._creative.frame = {
        					bar: null,
        					is_loaded_bar: false,
        					is_loaded_full: false,
        					is_started: false,
        					sendAb: null,
        				}
        			}

        			_inimage._createDataCounter = function(ad){
        				this._creative.count = 3;
        				this._creative.counterColor = ad.counter.color;
        				this._creative.counterBackground = ad.counter.background;
        			}

        			_inimage._checkTargetParent = function(elem, count){
        				count -= 1
        				if(count !== 0 && elem !== d.body){
        					if(
        						Math.ceil(this._creative.target.getBoundingClientRect().top) == Math.ceil(elem.parentElement.getBoundingClientRect().top)
        						&& Math.ceil(this._creative.target.getBoundingClientRect().bottom * 1.2) >= Math.ceil(elem.parentElement.getBoundingClientRect().bottom)
        						){

        						var checkElement = function(){
        							getComputedStyle(elem.parentElement).overflow == "hidden" ? this._creative.targetParentFits = elem.parentElement : this._creative.targetParentFits = elem
        						}.bind(this)

        						if(getComputedStyle(this._creative.target).position == "absolute"){
        							if(getComputedStyle(elem.parentElement).position == "relative"){
        								checkElement();
        								return;
        							}
        						}else{
        							checkElement();
        						}

        					}
        					this._checkTargetParent(elem.parentElement, count)
        				}
        				return elem.parentElement
        			}

        			_inimage._checkHeightTargetСropping = function(){
        				this._creative.is_targetParentCutsImage =
        				(
        					this._creative.target.getBoundingClientRect().height !== 0
        					&& this._creative.target.parentElement.getBoundingClientRect().height !== 0
        					&& (
                // this._creative.target.parentElement.localName == "div"
                this._creative.imageParent.computed.overflow == "hidden"
                || this._creative.imageParent.computed.overflow == "overlay"
                || this._creative.imageParent.computed.overflow == "scroll"
                )
        					) && (this._creative.target.getBoundingClientRect().height > Math.ceil(this._creative.target.parentElement.getBoundingClientRect().height))
        			}

        			_inimage._createCreativeDOM = function(ifr, frame){
        				this._rootElement.classList.remove('mt-ad');
        				this._rootElement.classList.remove('mt-shadow');
        				this._rootElement.classList.add('mt-root-inimage');
        				this._creative.root.classList.add('mt-root-creative');
        				this._creative.root.style.opacity = 0;
        				this._creative.TIME_MS = 360;
        				this._createCloseSVG();
        				this._creative.root.insertAdjacentElement('afterbegin', this._closeElement);
        				if(this._creative.click){
        					this._creative.root.insertAdjacentElement('afterbegin', this._creative.click);
        				}
        				if(!frame){ this._creative.root.insertAdjacentElement('afterbegin', ifr) }
        					else{ this._creative.root.insertAdjacentElement('afterbegin', frame) }
        						this._rootElement.insertAdjacentElement('afterbegin', this._creative.root);
        				};

        				_inimage._createFrame = function(is){
        					var f = d.createElement('iframe');
        					f.classList.add('mt-iframe-2');
        					f.setAttribute('referrerpolicy', 'same-origin');
        					f.setAttribute('scrolling', 'no');
        					f.style.border = f.style.outline = 0;
        					f.src = normalizeSrc(this._ad.src.href[1], this._mt.assetsPath);
        					if(!is){this._creative.root.insertAdjacentElement('afterbegin', f)}
        						return f
        				};

        				_inimage._createCounter = function(){
        					this._creative.counter = d.createElement('div');
        					this._creative.counter.classList.add('mt-counter');
        					this._creative.number = d.createElement('div');
        					this._creative.number.classList.add('mt-number');

        					this._creative.counter.insertAdjacentElement('afterbegin', this._creative.number);
        // this._creative.root.insertAdjacentElement('beforeend', this._creative.counter);
        this._creative.video ? this._creative.video.root.insertAdjacentElement('beforeend', this._creative.counter) : this._creative.root.insertAdjacentElement('beforeend', this._creative.counter)
    };

    _inimage._resizeCounter = function(elem, size){
    	if(this._creative.is_barAdaptive){size}
    		else{size *= 1.6}
    			elem.style.width = Math.ceil(size) + "px";
    		elem.style.height = Math.ceil(size) + "px";
    		elem.style.fontSize = Math.ceil(size / 2) + "px";
    		elem.style.color = this._creative.counterColor;
    		elem.style.background = this._creative.counterBackground;
    	};

    	_inimage._startCounter = function(func, count){
    		this._creative.count = count;
    		this._creative.counter.children[0].innerText = this._creative.count;
    		this._creative.number.style.opacity = 1;
    		var timer = setInterval(function(){
    			if(this._creative.count <= 1){
    				var f = true;
    				if(func && f == true){func(), f = false};
    				this._creative.counter.style.display = "none";
    				clearInterval(timer);
    			}
    			if(this._creative.count <= count && this._creative.count > 1){
    				this._creative.count--;
    				this._creative.counter.children[0].innerText = this._creative.count;
    			}
    			else{
    				clearInterval(timer);
    			}
    		}.bind(this), 800);
    	};

    	_inimage._resetCounter = function(){
    		this._creative.count = 4;
    		this._creative.number.style.opacity = 0;
    	};

    	_inimage._resizeCloseButton = function(elem, side, top, scaleSize, marginSize, position){
    		var timer = setInterval(function(){
    			if(this._creative.close.getBoundingClientRect().height !==0 && elem.getBoundingClientRect().width !==0){
    				clearInterval(timer);

    				var size, margin;
    				var calculateSize = function(n){
    					var number = function(n){

                        // fullscreen
                        if(this._creative.is_showFullscreen){
                        	elem = this._creative.frame.full
                        	scaleSize = scaleSize / 1.5
                        }
                        var width = elem.getBoundingClientRect().width;

                        return Math.ceil(width * n * scaleSize)
                    }.bind(this);
                    size = margin = number(n)
                }.bind(this);

                var w = elem.getBoundingClientRect().width
                var s = this._creative.barAdaptive_WIDTH
                if(w >= s - s*0.15 && w <= s){
                	calculateSize(0.055)
                }else if(w >= s - s*0.3 && w < s - s*0.15){
                	calculateSize(0.065)
                }else if(w < s - s*0.3){
                	calculateSize(0.075)
                }else{
                	calculateSize(0.03)
                }

                this._creative.close.style.width = size + "px";
                this._creative.close.style.height = size + "px";
                this._creative.close.style.marginTop = (-size) + "px";
                if(position == "outside"){
                	this._creative.close.style.transform = "translateY(" + ( size - margin ) + "px)";
                }else{
                	this._creative.close.style.transform = "translateY(" + ( size ) + "px)";
                }
                this._creative.close.style.padding = (size * 0.5) + "px";
                this._creative.close.style.top = (function(){ return top !== 0 ? Math.round(top * this._creative.close.getBoundingClientRect().height * 100 ) / 100 : 0 }.bind(this))() + "px"

                if(side){
                	this._creative.close.style.left = "auto";
                	this._creative.close.style.right = marginSize + "px";
                }else{
                	this._creative.close.style.right = "auto";
                	this._creative.close.style.left = marginSize + "px";
                }
                this._creative.close.style.opacity = 1;
            }
        }.bind(this), 50);
    	}

    	_inimage._closeButton = function(name, is_show){

    		var addPaint = function(color, background){
    			this._creative.close.firstChild.firstChild.style.setProperty("fill", color, "important");
    			this._creative.close.style.setProperty("background", background, "important");
    		}.bind(this);

    		switch(name){
    			case this._creative.closeData.root:
    			if(is_show){this._resizeCloseButton(this._creative.target, this._creative.closeData.is_right, this._creative.closeData.top, this._creative.closeData.size, this._creative.closeData.margin, this._creative.closeData.position)}
    				addPaint(this._creative.closeData.color, this._creative.closeData.background)
    			break;
    			case this._creative.closeData.full.root:
    			if(is_show){this._resizeCloseButton(this._creative.target, this._creative.closeData.full.is_right, this._creative.closeData.full.top, this._creative.closeData.full.size, this._creative.closeData.full.margin)}
    				addPaint(this._creative.closeData.full.color, this._creative.closeData.full.background)
    			break;
    			case this._creative.closeData.sticky.root:
    			if(is_show){this._resizeCloseButton(this._creative.target, this._creative.closeData.sticky.is_right, this._creative.closeData.sticky.top, this._creative.closeData.sticky.size, this._creative.closeData.sticky.margin)}
    				addPaint(this._creative.closeData.sticky.color, this._creative.closeData.sticky.background)
    			break;
    		}

    		if(is_show && this._closeEnabled){this._creative.close.style.display = "block"}
    			else{this._creative.close.style.opacity = 0, this._creative.close.style.display = "none"}
    		};

    	_inimage._addParameterHref = function(elem){
    		if (elem.src) {
    			elem.src = elem.src.replace("?ss=","?r=1&ss=");
    			if(elem.src.split('?').length == 1){elem.src += '?r=1'}
    				elem.src += '&mtlink=' + encodeURI(this._mt.link);
    		}
    	};

    	_inimage._addParameterHeightFrame = function(elem){
    		if(elem.src != ""){
    			elem.src += '&mtaddHeight=' + this._creative.addHeight;
    		}
    	};

    	_inimage._addEventsClose = function(){
    		this._creative.removeEvents = this._closeInimage.bind(this);
    		this._creative.close.addEventListener("click", this._creative.removeEvents, false);
    		if(this._creative.click){ this._creative.click.addEventListener("click", this._creative.removeEvents, false) }
    	};

    _inimage._closeInimage = function(){
    	this._creative.ob.disconnect();
    	this._creative.close.removeEventListener("click", this._creative.removeEvents, false);
    	if(this._creative.click){ this._creative.click.removeEventListener("click", this._creative.removeEvents, false) }
    		w.removeEventListener("resize", this._creative.resize, false);
    	w.removeEventListener("scroll", this._creative.resize2, false);

    	if(this._creative.video && !this._is_touch){
    		if(this._creative.video.sticky){
    			w.removeEventListener("scroll", this._creative.video.sticky.scroll, false);
    		}
    		if(this._creative.video.root){this._creative.video.root.parentElement.removeChild(this._creative.video.root)}
    	}
};

_inimage._createVideoRoot = function(ad){
	this._creative.video = {}
	this._creative.video.root = document.createElement('div');
	this._creative.video.root.classList.add('mt-inimage-video__root');
	this._creative.video.root.insertAdjacentElement('beforeEnd', this._creative.frame.full);
	this._rootElement.insertAdjacentElement('beforeEnd', this._creative.video.root);
	this._creative.video.width = ad.sticky.width;
	this._creative.video.height = ad.sticky.height;
	this._rootElement.style.overflow = "hidden";
	this._creative.video.root.style.setProperty("transition-timing-function", "cubic-bezier(1, 0.07, 1, 1)", "important");
}

_inimage._checkShowStickyEffect = function(){
	this._creative.video.sticky.is_check = true;
	if(this._creative.counter){ this._creative.counter.style.zIndex = 0 }
		this._creative.frame.full.contentWindow.frames.postMessage("mtTurnOnSticky", this._creative.isrc);
	this._closeButton("sticky", false);
	this._frameResize("video", this._creative.video.root);
	this._creative.video.root.style.setProperty("position", "fixed", "important");
	this._creative.video.root.style.setProperty("z-index", "99999999999999", "important");
	this._rootElement.style.setProperty("z-index", "99999999999999", "important");

	var position = function(elem, left) {
		var duration = 360;
		var timing = function(timeFraction){
			return timeFraction;
		};
		var draw = function(progress) {
			var l = left - Math.round((progress)*100)/100 * left;
			var s = (w.innerHeight - this._creative.video.root.getBoundingClientRect().height)
			var t = Math.round((progress)*100)/100 * s;

			elem.style.setProperty("bottom", "auto", "important");
			elem.style.setProperty("left", l + "px", "important");
			elem.style.setProperty("top", ( t ) + "px", "important");

			if(l <= 0){
				l = 0
				t = w.innerHeight - this._creative.video.root.getBoundingClientRect().height
				elem.style.setProperty("left", l + "px", "important");
				elem.style.setProperty("top", t + "px", "important");
			}
		}.bind(this);

		this._addAnimation(timing, draw, duration);
	}.bind(this);

	position(this._creative.video.root, this._rootElement.getBoundingClientRect().left)

	if(!this._isGwdFormat()){
		this._closeButton("sticky", true)
		this._creative.video.root.style.background = this._creative.background;
	}
	this._creative.video.root.insertAdjacentElement('beforeEnd', this._creative.close);
	if(!this._creative.is_showAb && this._creative.frame.bar){this._creative.frame.bar.style.opacity = 0}
};

_inimage._checkHideStickyEffect = function(){
	this._creative.video.sticky.is_check = false;
	if(this._creative.counter){ this._creative.counter.style.zIndex = 1 }
		this._closeButton("sticky", false);

	this._creative.frame.full.contentWindow.frames.postMessage("mtTurnOffSticky", this._creative.isrc);

	this._rootElement.style.overflow = "visible";

	this._creative.is_showAb ? this._addAnimationVideo("hide", this._creative.video.root, function(){
		if(!this._isGwdFormat()){ this._closeButton("first", true) }
	}.bind(this)) : this._addAnimationVideo("show", this._creative.video.root, function(){
		if(!this._isGwdFormat()){ this._closeButton("full", true) }
	}.bind(this));

this._creative.video.root.style.setProperty("left", this._rootElement.getBoundingClientRect().left + "px", "important");

var position = function(elem, left) {
	var duration = 360;
	var timing = function(timeFraction){
		return timeFraction;
	};
	var draw = function(progress) {
		var l = Math.round((progress)*100)/100 * left;
		var s = w.innerHeight - this._creative.video.sticky.scrollVideoHeight - this._creative.video.sticky.scrollTop
		var t = s - Math.round((progress)*100)/100 * s;
		elem.style.setProperty("left", l + "px", "important");
		elem.style.setProperty("top", t + "px", "important");

		if(l >= left){
			this._creative.video.root.style.setProperty("position", "absolute", "important");
			elem.style.setProperty("left", "0px", "important");
			elem.style.setProperty("top", "auto", "important");
			elem.style.setProperty("bottom", "0px", "important");
		}
	}.bind(this);

	this._addAnimation(timing, draw, duration);
}.bind(this);

position(this._creative.video.root, this._rootElement.getBoundingClientRect().left)

if(!this._creative.is_showAb){
	setTimeout(function(){
		this._rootElement.style.overflow = "hidden";
		if(!this._creative.video.sticky.is_check && this._creative.frame.bar){this._creative.frame.bar.style.opacity = 1}
	}.bind(this), 500)
}else{
	this._creative.frame.bar.style.opacity = 1;
}

this._rootElement.style.setProperty("z-index", "1", "important");
this._creative.video.root.style.setProperty("z-index", "1", "important");
};

_inimage._scrollSticky = function(){
	var target = this._creative.target.getBoundingClientRect();

	var c = this._creative.target.getBoundingClientRect();
	var is_check = (this._creative.video.sticky.is_startEffect && !this._creative.video.sticky.is_startEffectReverse);
	var h = Math.ceil(target.height * 0.33);

	this._creative.video.sticky.scrollTop = this._rootElement.getBoundingClientRect().top;
	this._creative.video.sticky.scrollVideoHeight = this._creative.video.root.getBoundingClientRect().height;

	if(target.height && c.height){
		if(this._creative.video.sticky.is_first){
			if(Math.ceil(c.bottom) <= h && Math.ceil(target.bottom) <= h){
				if(is_check){
					this._creative.video.sticky.is_firstLoading = true;

					this._checkShowStickyEffect();
					this._creative.video.sticky.is_startEffect = false;

					this._creative.video.sticky.is_first = false;
					this._creative.video.sticky.is_second = true;
				}
			}
		}else if(this._creative.video.sticky.is_second){
			if(Math.ceil(c.bottom) <= h ){
				if(!this._creative.video.sticky.is_startEffect){
					this._creative.video.sticky.is_startEffectReverse = true;

					this._creative.video.sticky.is_second = false;
					this._creative.video.sticky.is_third = true;
				}
			}
		}else if(this._creative.video.sticky.is_third){
			if(Math.ceil(c.top) <= h && Math.ceil(c.bottom) >= h){
				if(!is_check){
					this._checkHideStickyEffect();
					this._creative.video.sticky.is_startEffectReverse = false;

					this._creative.video.sticky.is_third = false;
					this._creative.video.sticky.is_fourth = true;
				}
			}
		}else if(this._creative.video.sticky.is_fourth){

			if(Math.ceil(c.bottom) <= h){
				if(!this._creative.video.sticky.is_startEffect){
					this._creative.video.sticky.is_startEffect = true;

					this._creative.video.sticky.is_first = true;
					this._creative.video.sticky.is_fourth = false;
				}
			}
		}
	}
};

_inimage._addStickyEffect = function() {
	this._creative.video.sticky = {
		is_firstLoading: false,
		is_check: false,
		is_startEffect: true,
		is_startEffectReverse: false,
		is_first: true,
		is_second: false,
		is_third: false,
		is_fourth: false,
		is_fixed: false,
		scroll: this._scrollSticky.bind(this)
	};

	w.addEventListener("scroll", this._creative.video.sticky.scroll, false);
}

_inimage._createMobButtonRepeat = function(ad){
	if(!this._creative.mob){this._creative.mob = {}}

		this._creative.mob.buttonRepeat = d.createElement('div');
	this._creative.mob.buttonRepeat.style.opacity = 0;
	this._creative.mob.buttonRepeatTop = ad.mob.buttonRepeatTop;
	this._creative.mob.buttonRepeat.classList.add('mt-mob-button-repeat');
	this._creative.mob.buttonRepeat.style.background = ad.mob.buttonRepeatBackground;
	this._creative.mob.buttonRepeat.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11.83 11.99">\
	<path class="mt-mob-arrow-repeat-animation" d="M11.07,6.74a.75.75,0,0,1-.55-.23L5.86,1.85,1.32,6.39a.77.77,0,0,1-1.09,0h0a.76.76,0,0,1,0-1.08h0L5.31.22a.8.8,0,0,1,1.1,0l5.2,5.2a.77.77,0,0,1,0,1.09h0A.8.8,0,0,1,11.07,6.74Z"\
	fill="'+ ad.mob.buttonRepeatColor +'"/>\
	<path class="mt-mob-arrow-repeat-animation2" d="M11.07,12a.75.75,0,0,1-.55-.23L5.86,7.14,1.32,11.68a.77.77,0,0,1-1.09,0h0a.77.77,0,0,1,0-1.09h0L5.31,5.5a.8.8,0,0,1,1.1,0l5.2,5.21a.77.77,0,0,1,0,1.07h0A.78.78,0,0,1,11.07,12Z"\
	fill="'+ ad.mob.buttonRepeatColor +'"/></svg>';
	this._creative.root.insertAdjacentElement('afterBegin', this._creative.mob.buttonRepeat);

	this._creative.mob.buttonRepeat.is_firstLoad = true;
};

_inimage._resizeMobButtonRepeat = function(){
	var timer = setInterval(function() {
		if(this._creative.close.getBoundingClientRect().width !== 0 && this._creative.root.getBoundingClientRect().height !== 0){
			clearInterval(timer)
			this._creative.mob.buttonRepeat.style.width = this._creative.mob.buttonRepeat.style.height = (this._creative.close.getBoundingClientRect().width*2) + "px";
			this._creative.mob.buttonRepeat.style.top = Math.ceil( (this._creative.mob.buttonRepeatTop * (this._creative.root.getBoundingClientRect().height * 0.1)) - this._creative.close.getBoundingClientRect().width) + "px";
			this._creative.mob.buttonRepeat.style.textShadow = "0 0 " + Math.round(this._creative.root.getBoundingClientRect().width / 90) + "px #000";
			this._creative.mob.buttonRepeat.style.opacity = 1;
		}
	}.bind(this), 50);
};

_inimage._createMobTouchHand = function(ad){
	if(!this._creative.mob){this._creative.mob = {}}
		this._creative.mob.TouchHand = d.createElement('div');
	this._creative.mob.TouchHand.style.opacity = 0;
	this._creative.mob.TouchHand.classList.add('mt-mob-touch-hand');
	var color = '#eaeaea';
	var color2 = '#999';
	this._creative.mob.TouchHand.innerHTML = '<svg class="mt-mob-touch-hand_svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30.01 43.98">\
	<path class="mt-mob-circle-repeat-animation" d="M11.56,20.4a10,10,0,1,1,10-9.95A9.94,9.94,0,0,1,11.56,20.4Zm0-17.4A7.45,7.45,0,1,0,19,10.48,7.46,7.46,0,0,0,11.56,3Z" fill="'+color+'" />\
	<path class="mt-mob-circle-repeat-animation2" d="M11.56,1a9.45,9.45,0,1,1-9.45,9.48A9.45,9.45,0,0,1,11.56,1h0m0,17.4a8,8,0,1,0-7.9-8v.08a8,8,0,0,0,8,8m0-18.4A10.45,10.45,0,1,0,22,10.53v0A10.46,10.46,0,0,0,11.57,0h0Zm0,17.4a7,7,0,1,1,7-6.95,6.95,6.95,0,0,1-7,7Z" fill="'+color2+'" />\
	<path class="mt-mob-touch-hand-animation" d="M15.51,23.17a1.33,1.33,0,0,1-1.3-1.35V10.43a3,3,0,0,0-2.68-3,2.84,2.84,0,0,0-3,2.67h0v19a.25.25,0,0,1-.27.25.27.27,0,0,1-.21-.12l-2.2-3.81A3,3,0,0,0,2,24.17,2.83,2.83,0,0,0,.82,28l.07.13,6.62,11.8a7,7,0,0,0,6.09,3.57h7.21a8.66,8.66,0,0,0,8.7-8.62h0V29.4a5.26,5.26,0,0,0-4.69-5.23Z" stroke-miterlimit="10" fill="'+color+'" stroke="'+color2+'" />\
	</svg>';

	this._creative.root.insertAdjacentElement('afterBegin', this._creative.mob.TouchHand);
};

_inimage._resizeMobTouchHand = function(ad){
	var timer = setInterval(function() {
		if(this._creative.mob && this._creative.mob.TouchHand && this._creative.root.getBoundingClientRect().width && this._creative.root.getBoundingClientRect().height){
			clearInterval(timer)
			this._creative.mob.TouchHand.style.width = this._creative.mob.TouchHand.style.height = Math.round(Math.min(this._creative.root.getBoundingClientRect().width*0.15, this._creative.root.getBoundingClientRect().height*0.15) *100)/100 + "px";
			this._creative.mob.TouchHand.style.top = Math.round((this._creative.root.getBoundingClientRect().height - (this._creative.root.getBoundingClientRect().height * ad.addHeight))*50)/100 + "px";
			this._creative.mob.TouchHand.style.opacity = 1;
		}
	}.bind(this), 50);
};

_inimage._clickMobRepeat = function(func){
	var clickButtonRepeat = function(e){
		switch(e.target){
			case this._creative.mob.buttonRepeat:
			case this._creative.mob.buttonRepeat.children[0]:
			case this._creative.mob.buttonRepeat.children[0].children[0]:
			case this._creative.mob.buttonRepeat.children[0].children[1]:
			if(func){func()};
			this._creative.mob.buttonRepeat.removeEventListener("click", clickButtonRepeat, false);
			break;
		}
	}.bind(this);
	setTimeout(function(){
		this._creative.mob.buttonRepeat.addEventListener("click", clickButtonRepeat, false);
	}.bind(this), 360);
};

_inimage._addClickMobTarget = function(elem, is_click, func){
	var addEvent = function(){
		if(is_click == true){
			this._click();
			elem.removeEventListener('touchstart', checkClick, false);
		}else{
			if(func){func()};
		}
		console.log(is_click, func)
	}.bind(this);

        // var repeat = d.createElement('div');
        //     repeat.style.width = '100%';
        //     repeat.style.height = '100%';

        // elem.insertAdjacentElement('afterBegin', repeat)

        var checkClick = function(e){

        	console.log(e.target)

        	switch(e.target){
        		case this._creative.click:
        		case this._creative.close:
        		case this._closeElementSVG:
        		case this._closeElementSVG.firstChild:
        		case this._closeElementSVG.firstChild.firstChild.nextSibling:
        		break;
        		default:
        		addEvent();
        		break;
        	}

        }.bind(this);

        elem.addEventListener('click', checkClick, false);
        // this._creative.frame.bar.addEventListener('touchstart', checkClick, false);
        // this._creative.root.addEventListener('touchstart', checkClick, false);
        // repeat.addEventListener('touchstart', checkClick, false);

        // this._creative.frame.full.style.display = 'none'
        // this._creative.click.style.display = 'none'
    };

    _inimage._createEffectLight = function(){
    	this._creative.headStyle = document.createElement('style');
    	this._creative.headStyle.type = "text/css";
    	document.head.insertAdjacentElement('afterbegin', this._creative.headStyle);
    	this._creative.deleteEffect = this._deleteEffectLight.bind(this);
    	this._creative.close.addEventListener('click', this._creative.deleteEffect, false);
    	if(this._creative.click){this._creative.click.addEventListener('click', this._creative.deleteEffect, false)}
    };

_inimage._deleteEffectLight = function(){
	this._getInternetExplorerVersion()!==-1 ? this._creative.headStyle.parentNode.removeChild(this._creative.headStyle) : this._creative.headStyle.remove()
	this._rootElement.style.overflow = "hidden";
	this._creative.close.removeEventListener('click', this._creative.deleteEffect, false);
	if(this._creative.click){this._creative.click.removeEventListener('click', this._creative.deleteEffect, false)}
};

_inimage._resizeEffectLight = function(ad){
	var size = this._creative.root.getBoundingClientRect().height / 4;
	var small = Math.ceil(size * ad.effectLight.smallSize);
	var big = Math.ceil(size * ad.effectLight.bigSize);
	this._rootElement.style.overflow = "visible";
	this._addCssAnimation('animation-inimage-root-effect-light', ad.effectLight.durationFrame + "s", 'infinite', 'ease-in-out');
	this._creative.headStyle.innerHTML = "@-webkit-keyframes animation-inimage-root-effect-light {from{-webkit-box-shadow: 0 0 "+small+"px "+ad.effectLight.smallColor+";box-shadow: 0 0 "+small+"px "+ad.effectLight.smallColor+";}50%{-webkit-box-shadow: 0 0 "+big+"px "+ad.effectLight.bigColor+";box-shadow: 0 0 "+big+"px "+ad.effectLight.bigColor+";}to{-webkit-box-shadow: 0 0 "+small+"px "+ad.effectLight.smallColor+";box-shadow: 0 0 "+small+"px "+ad.effectLight.smallColor+";}}@keyframes animation-inimage-root-effect-light {from{-webkit-box-shadow: 0 0 "+small+"px "+ad.effectLight.smallColor+";box-shadow: 0 0 "+small+"px "+ad.effectLight.smallColor+";}50%{-webkit-box-shadow: 0 0 "+big+"px "+ad.effectLight.bigColor+";box-shadow: 0 0 "+big+"px "+ad.effectLight.bigColor+";}to{-webkit-box-shadow: 0 0 "+small+"px "+ad.effectLight.smallColor+";box-shadow: 0 0 "+small+"px "+ad.effectLight.smallColor+";}}";
};

_inimage._launchEffectLight = function(ad){
	var timer = setInterval(function(){
		if(this._creative.root.offsetHeight){
			clearInterval(timer);
			if(this._creative.is_effect == true){
				this._resizeEffectLight(ad);
				setTimeout(function(){this._creative.deleteEffect()}.bind(this), ad.effectLight.durationAnimation * 1000);
				this._creative.is_effect = false;
			}
		}
	}.bind(this), 50);
};

_inimage._isGwdFormat = function(){
	if(this._ad.type.indexOf('gwd') !== -1){ return true }
		return false;
}

_ad._checkDevice = function(){
	var device = {};
	var define;
	var n,o,e,t,i,r,d,a,c=device,l={};device=l,o=window.document.documentElement,a=window.navigator.userAgent.toLowerCase(),l.ios=function(){return l.iphone()||l.ipod()||l.ipad()},l.iphone=function(){return!l.windows()&&e("iphone")},l.ipod=function(){return e("ipod")},l.ipad=function(){return e("ipad")},l.android=function(){return!l.windows()&&e("android")},l.androidPhone=function(){return l.android()&&e("mobile")},l.androidTablet=function(){return l.android()&&!e("mobile")},l.blackberry=function(){return e("blackberry")||e("bb10")||e("rim")},l.blackberryPhone=function(){return l.blackberry()&&!e("tablet")},l.blackberryTablet=function(){return l.blackberry()&&e("tablet")},l.windows=function(){return e("windows")},l.windowsPhone=function(){return l.windows()&&e("phone")},l.windowsTablet=function(){return l.windows()&&e("touch")&&!l.windowsPhone()},l.fxos=function(){return(e("(mobile;")||e("(tablet;"))&&e("; rv:")},l.fxosPhone=function(){return l.fxos()&&e("mobile")},l.fxosTablet=function(){return l.fxos()&&e("tablet")},l.meego=function(){return e("meego")},l.cordova=function(){return window.cordova&&"file:"===location.protocol},l.nodeWebkit=function(){return"object"==typeof window.process},l.mobile=function(){return l.androidPhone()||l.iphone()||l.ipod()||l.windowsPhone()||l.blackberryPhone()||l.fxosPhone()||l.meego()},l.tablet=function(){return l.ipad()||l.androidTablet()||l.blackberryTablet()||l.windowsTablet()||l.fxosTablet()},l.desktop=function(){return!l.tablet()&&!l.mobile()},l.television=function(){var n;for(television=["googletv","viera","smarttv","internet.tv","netcast","nettv","appletv","boxee","kylo","roku","dlnadoc","roku","pov_tv","hbbtv","ce-html"],n=0;n<television.length;){if(e(television[n]))return!0;n++}return!1},l.portrait=function(){return 1<window.innerHeight/window.innerWidth},l.landscape=function(){return window.innerHeight/window.innerWidth<1},l.noConflict=function(){return device=c,this},e=function(e){return-1!==a.indexOf(e)},i=function(e){e=new RegExp(e,"i");return o.className.match(e)},n=function(e){var n;i(e)||(n=o.className.replace(/^\s+|\s+$/g,""),o.className=n+" "+e)},d=function(e){i(e)&&(o.className=o.className.replace(" "+e,""))},l.ios()?l.ipad()?n("ios ipad tablet"):l.iphone()?n("ios iphone mobile"):l.ipod()&&n("ios ipod mobile"):l.android()?l.androidTablet()?n("android tablet"):n("android mobile"):l.blackberry()?l.blackberryTablet()?n("blackberry tablet"):n("blackberry mobile"):l.windows()?l.windowsTablet()?n("windows tablet"):l.windowsPhone()?n("windows mobile"):n("desktop"):l.fxos()?l.fxosTablet()?n("fxos tablet"):n("fxos mobile"):l.meego()?n("meego mobile"):l.nodeWebkit()?n("node-webkit"):l.television()?n("television"):l.desktop()&&n("desktop"),l.cordova()&&n("cordova"),t=function(){l.landscape()?(d("portrait"),n("landscape")):(d("landscape"),n("portrait"))},r=Object.prototype.hasOwnProperty.call(window,"onorientationchange")?"orientationchange":"resize",window.addEventListener?window.addEventListener(r,t,!1):window.attachEvent?window.attachEvent(r,t):window[r]=t,t(),"function"==typeof define&&"object"==typeof define.amd&&define.amd?define(function(){return l}):"undefined"!=typeof module&&module.exports?module.exports=l:device=l;
	return device
}

_ad._checkTouch = function() {
	return 'ontouchstart' in window || navigator.maxTouchPoints;
}

_ad._show = function (func) {

	this._track('ready');
	var e = this._rootElement;
	if (e) {
		e.classList.remove('mt-hidden');

		setTimeout(function () {
				//this._closeElement.remove('mt-hidden');
				this._closeEnabled = true;
				this._closeElement.style.display = "block";
			}.bind(this), +this._mt.skipDelay * 1000 || 0);

		if (+this._mt.autocloseDelay) {
			setTimeout(function () {
				this._close();
			}.bind(this), this._mt.autocloseDelay);
		}

		if(func){func()}
			console.log("MT: creative display time %c" + ( new Date().getTime() - TIME_MS ) +' ms', "color: #ffe060; font-style: italic; background-color: #5a3e61; border-radius: 4px; padding: 2px 10px;")

		this._vo_proot = new ViewabilityObserver(this._rootElement, 0.05, 500);
		this._vo_proot.start(function() {
			this._track('pready');
		}.bind(this));

		this._vo_root = new ViewabilityObserver(this._iframeElement, 0.5, 1000);
		this._vo_root.start(function() {
			this._track('vready');
		}.bind(this));
/*
			if (this._targetImage && this._mt.adloox) {
				var adloox = d.createElement('script');
				adloox.src = this._mt.adloox.replace('&id3=0x0', '&id3=' + this._targetImage.width + 'x' + this._targetImage.height).replace('&targetelt=', '&targetelt=' + this._rootElement.id);
				this._parentElement.appendChild(adloox);
			}
			*/
		}
	};

	_ad._close = function () {
		this._track(this._creative && this._creative.close && this._creative.close.classList && this._creative.close.classList.contains('mt-close-full-format') ? 'bclose' : 'close');

		for (var timer in this._timers) {
			if (this._timers.hasOwnProperty(timer)) {
				clearInterval(this._timers[timer]);
				this._timers[timer] = null;
			}
		}

		var e = this._rootElement;
		if(e) {
			e.parentElement.removeChild(e);
			this._rootElement = null;
			d.body.classList.contains('mt-body__hidden') && d.body.classList.remove('mt-body__hidden')
		}
	};

	_ad._createCloseSVG = function(){
		this._closeElement.style.setProperty("background-image", "url(' ')", "important");
		this._closeElementSVG = d.createElement('div');
		this._closeElementSVG.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600">\
		<polygon points="600 54.5 545.5 0 300 240 54.5 0 0 54.5 240 300 0 545.5 54.5 600 300 360 545.5 600 600 545.5 360 300 600 54.5"></polygon>\
		</svg>';
		this._closeElementSVG.classList.add("mt-close-button-svg");
		this._closeElement.insertAdjacentElement('afterbegin', this._closeElementSVG);
	}
	_ad._paintCloseSVG = function(ad){
		this._closeElement.children[0].children[0].style.fill = ad.closeButton.color;
		this._closeElement.style.background = ad.closeButton.background;
		if(this._is_touch){
			this._closeElement.style.border = "1px solid " + ad.closeButton.color;
			this._closeElement.style.boxSizing = "border-box";
		}
	}
	_ad._addCloseSVG = function(ad, mobile, tablet, is_outside){
		this._createCloseSVG();
		this._paintCloseSVG(ad);
		var size = 24;
		if(this._is_touch){
			var k = 0;
			this._is_mobile ? k = mobile : k = tablet
			size = Math.min(w.innerWidth, w.innerHeight)*k;
			var calcTop = function(){
				var n
				is_outside ? n = Math.ceil(ad.closeButton.size * size) : n = 0
				return n
			}
			this._closeElement.style.top = Math.ceil(ad.closeButton.top - calcTop()) + "px";
			var s = ad.closeButton.left + "px";
			ad.closeButton.right ? this._closeElement.style.right = s : this._closeElement.style.left = s
		}
		this._closeElement.style.width = this._closeElement.style.height = Math.ceil(ad.closeButton.size * size) + "px";
	}

	_ad._notify = function(e) {
		/*if (typeof w._mt_subscribers === "object" && w._mt_subscribers[this._mt.pid]) {
			try {
				w._mt_subscribers[this._mt.pid][e] && typeof w._mt_subscribers[this._mt.pid][e] === "function" && w._mt_subscribers[this._mt.pid][e]();
			} catch(e) {};
		}*/
		if (this._subscribers[e]) {
			for (var i = 0; i < this._subscribers[e].length; i++) {
				(new Image(1, 1)).src = this._subscribers[e][i].replace('{rid}', Math.random());
			}
		}
	}

	_ad._track = function (e, handler) {
        //console.log('MT event:', e);
        var s = handler || this._mt.statScript || (this._mt.vpaid ? function() {w.postMessage(e, "*")} : null);
        if (s) {
        	try {
        		if (typeof s === "function") s(e, this._targetImageId); else w.eval(s.replace('{event}', e));
        		this._notify(e);
        	} catch (ex) {
        		console.error('MT event: statScript evaluation error!', ex);
        	}
        } else {
        	console.log('MT event: No statScript for event', e);
        }
    };

    _ad._click = function () {
    	this._track('click');
    	if (this._mt.link) {
    		w.open(this._mt.link, '_blank');
    	} else {
    		console.error('Link not specified!');
    	}
			if(this._ad.type.indexOf('inlab') == -1)
    		this._close();
    };

    _ad._addPostMessageCreative = function(frame, ad){
    	var is_mt = ad.src.type == 'mt'
    	if(is_mt){
    		var message = {
    			is_loaded: setInterval(function() {
    				message.load(frame)
    			}, 50),
    			load: function(frame){
    				frame.contentWindow && frame.contentWindow.frames && frame.contentWindow.frames.postMessage("mtCanvasLoaded", '*');
    			},
    			start: function(frame){
    				frame.contentWindow && frame.contentWindow.frames && frame.contentWindow.frames.postMessage("mtCanvasStarted", '*');
    			},
    		};

    	}

    	w.addEventListener("message", function (event) {
    		if(is_mt){
    			if (event.data == "mtCanvasLoaded") {
    				clearInterval(message.is_loaded);
    				message.is_started = setInterval(function() {
    					message.start(frame)
    				}, 50);
    			}
    			else if (event.data == "mtCanvasStarted") {
    				clearInterval(message.is_started);
    			}
    		}else{
    			if (event.data == "vready") {
    				setTimeout(function(){
    					frame.contentWindow && frame.contentWindow.frames[0] && frame.contentWindow.frames[0].postMessage("mtCanvasStarted", '*');
    				}, 150)
    			}
    		}
    	}, false);
    };

    _ad._startExpandTimer = function (fn, dur, vis) {
    	if (this._expandTimer || this._expanded) {
    		return;
    	}
    	this._expandTimer = setTimeout(function () {
    		if (this._expandProgress) {
    			this._expandProgress.parentElement.removeChild(this._expandProgress);
    			this._expandProgress = null;
    		}
    		fn();
    	}, dur);
    	if (!vis) {
    		return
    	}
    	var p = this._expandProgress = d.createElement('div');
    	p.classList.add('mt-progress');
    	var b = d.createElement('div');
    	b.classList.add('mt-progress-bar');
    	p.appendChild(b);
    	this._rootElement.appendChild(p);
    	setTimeout(function () {
    		var r = p.getBoundingClientRect();
    		b.style.width = r.width + 'px';
    	}.bind(this), 1);
    }

    _ad._stopExpandTimer = function (fn) {
    	if (this._expandTimer) {
    		clearTimeout(this._expandTimer);
    		this._expandTimer = null;
    	}
    	if (this._expandProgress) {
    		this._expandProgress.parentElement.removeChild(this._expandProgress);
    		this._expandProgress = null;
    	}
    }

    _ad._mouseEnter = function (e) {
    	if(this._firstMouseEnter ) {
    		this._firstMouseEnter  = false;
    		this._track('over');
    	}
    	switch (this._ad.type) {
    		case 'adbarplus':
    		this._startExpandTimer(this._expandAdbarPlus.bind(this), 200, false);
    		break;
    		case 'adbarfullscreen':
    		this._startExpandTimer(this._expand.bind(this, 'mt-fullscreen', this._ad.isScroll), 2000, true)
    		break;
    	}
    };

    _ad._loadCSS = function () {
    	var e = document.createElement('link');
    	e.rel = 'stylesheet';
    	e.href = this._lib.css;
    	d.head.appendChild(e);
    };

    _ad._changeVisiblePage = function (frame) {
    	var visible = function () {
    		if (document.visibilityState !== 'visible') {
    			console.log('MT: mtPageNoVisible')
    			frame && frame.contentWindow && frame.contentWindow.frames.postMessage("mtPageNoVisible", '*');
    			d.removeEventListener('visibilitychange', visible, false);
    		}
    	}
    	d.addEventListener('visibilitychange', visible, false);
    };

    _ad._mtMsgHandler = function (m) {
    	switch (m.data) {
    		case 'mt_click':
    		this._click();
    		break;
    		if (!this._thirdParty.tracked) {
    			this._thirdParty.tracked = true;
    			(new Image(1, 1)).src = this._mt.link.replace('{rid}', this._rnd);
    			setTimeout(function () {
    				this._close();
    			}.bind(this), 100);
    		}
    		break;
    		case 'mt_close':
    		this._close();
    		break;
    		case 'mt_over':
    		case 'mt_quarter':
    		case 'mt_half':
    		case 'mt_threequarters':
    		case 'mt_complete':
    		case 'mt_action1':
    		case 'mt_action2':
    		case 'mt_action3':
    		case 'mt_action4':
    		case 'mt_action5':
    		case 'mt_action6':
    		this._track(m.data.substr(3));
    		break;
    	}
    };

    _ad._sizmekMsgHandler = function (m) {
    	console.log('MT+Sizmek:', m.data);
    	var msg;
    	try {
    		msg = JSON.parse(m.data);
    	} catch (ex) {
    		msg = {
    			type: m.data
    		};
    	}
    	switch (msg.type) {
    		case 'ebInit':
    		case 'ebInitDone':
    		case 'ebInitAction':
    		if (!this._thirdParty.ready) {
    			this._thirdParty.ready = true;

    			if (this._targetImage && this._creative) {
    				var frame_name = this._creative.frame.bar ? "bar" : "full";

    				if (this._loadCanvasTimer && this._loadCanvasTimer[frame_name]) {
    					clearInterval(this._loadCanvasTimer[frame_name]);
    					this._loadCanvasTimer[frame_name] = false;
    				}

    				this._creative.frame[frame_name] = this._creative.frame[frame_name].contentWindow.frames.document.getElementsByTagName("iframe")[0];
    				this._loadCanvas(this._creative.frame[frame_name]);
    			}
    			else if (this._ad.type == "fullscreen") {
    				if (this._iframeElement.contentWindow && this._iframeElement.contentWindow.frames && this._iframeElement.contentWindow.frames[0]) {
    					w.addEventListener("message", function (event) {
    						if (this._iframeElement.contentWindow.frames[0] === event.source) {
    							if (event.data == "mtCanvasLoaded") {
    								this._iframeElement.contentWindow.frames[0].postMessage("mtCanvasStarted", "*");
    							}
    							else if (event.data == "mtCanvasStarted") {
    								if (!this._thirdParty.played) {
    									this._thirdParty.played = true;
											//this._show();
										}
									}
									else if (event.data == "mtFirstQuartile") {
										this._track('quarter');
									}
									else if (event.data == "mtMidpoint") {
										this._track('half');
									}
									else if (event.data == "mtThirdQuartile") {
										this._track('threequarters');
									}
									else if (event.data == "mtComplete") {
										this._track('complete');
									}
								}
							}.bind(this), false);
    					this._iframeElement.contentWindow.frames[0].postMessage("mtCanvasLoaded", "*");
    					this._show();
    				}
    			}
    			else {
    				this._show();
    			}
    		}
    		break;
    		case 'ebUpdateClick':
    		case 'ebclickthrough':
    		if (!this._thirdParty.tracked) {
    			this._thirdParty.tracked = true;
    			(new Image(1, 1)).src = this._mt.link.replace('{rid}', this._rnd);
					if(!this._is_touch){
						 if(this._ad.type == "inimage-framefullscreen"){
								this._resetCounter();
						}
					}
    			setTimeout(function () {
    				this._close();
    			}.bind(this), 100);
    		}
    		break;
    		case 'mt_close':
    		setTimeout(function () {
    			this._close();
    		}.bind(this), 100);
    		break;
    	}
    };

    _ad._expand = function (cls, is) {
    	if (this._expanded) {
    		return false;
    	}
    	this._expanded = true;
    	this._rootElement.classList.add(cls);
    	this._iframeElement.src = normalizeSrc(this._ad.src.href[1], this._mt.assetsPath);
    	this._iframeElement.style.background = this._ad.background;
    	this._track('bready', this._mt.statScriptBig);

    	this._timers.bduration = setInterval(function () {
    		this._track('bduration', this._mt.statScriptBig);
    	}.bind(this), 1000);

    	if(is){
    		this._iframeElement.scrolling = 'yes';
    		d.body.classList.add('mt-body__hidden')
    	}
    	return true;
    }

    _ad._expandAdbarPlus = function () {
    	if (!this._expand('mt-adbarplus-expanded')) {
    		return;
    	}
    	var src = this._ad.video ? (this._ad.video.src ? [this._ad.video] : this._ad.video) : [];
    	if (!src) {
    		return;
    	}
    	var v = d.createElement('video');
    	v.id = 'mt-video-' + this._rnd;
    	v.autoplay = true;
    	v.loop = true;
    	v.defaultMuted = true;
    	v.muted = true;
    	v.setAttribute('webkit-playsinline', '1');
    	v.setAttribute('playsinline', '1');
    	for (var i = 0; i < src.length; i++) {
    		var vs = src[i];
    		var s = d.createElement('source');
    		s.type = vs.type;
    		s.src = normalizeSrc(vs.src, this._mt.assetsPath);
    		v.appendChild(s);
    	}
    	var e = d.createElement('div');
    	e.classList.add('mt-adbarplus-video');
    	e.appendChild(v);
    	var datauri = 'data:image/svg+xml,%3Csvg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"%3E';
    	e.appendChild(createToggleButton('4px', '4px',
    		datauri + '%3Cmask id="m1" fill="white"%3E%3Cpath fill-rule="evenodd" clip-rule="evenodd" d="M24 3.00279C24 1.48944 22.3843 0.524368 21.0518 1.24185L11.444 6.4153C11.1525 6.57221 10.8267 6.65436 10.4958 6.65436L5 6.65436C3.89543 6.65436 3 7.54979 3 8.65436V22.6544C3 23.7589 3.89543 24.6544 5 24.6544H10.4958C10.8267 24.6544 11.1525 24.7365 11.444 24.8934L21.0518 30.0669C22.3843 30.7843 24 29.8193 24 28.3059V3.00279Z"/%3E%3C/mask%3E%3Cpath fill-rule="evenodd" clip-rule="evenodd" d="M24 3.00279C24 1.48944 22.3843 0.524368 21.0518 1.24185L11.444 6.4153C11.1525 6.57221 10.8267 6.65436 10.4958 6.65436L5 6.65436C3.89543 6.65436 3 7.54979 3 8.65436V22.6544C3 23.7589 3.89543 24.6544 5 24.6544H10.4958C10.8267 24.6544 11.1525 24.7365 11.444 24.8934L21.0518 30.0669C22.3843 30.7843 24 29.8193 24 28.3059V3.00279Z" fill="white"/%3E%3Cpath d="M21.0518 30.0669L20.1036 31.8278L21.0518 30.0669ZM11.444 24.8934L12.3922 23.1325L11.444 24.8934ZM11.444 6.4153L10.4958 4.65436L11.444 6.4153ZM10.4958 6.65436L10.4958 4.65436L10.4958 6.65436ZM12.3922 8.17624L22 3.00279L20.1036 -0.519095L10.4958 4.65436L12.3922 8.17624ZM5 8.65436L10.4958 8.65436L10.4958 4.65436L5 4.65436L5 8.65436ZM5 22.6544V8.65436H1V22.6544H5ZM10.4958 22.6544H5V26.6544H10.4958V22.6544ZM22 28.3059L12.3922 23.1325L10.4958 26.6544L20.1036 31.8278L22 28.3059ZM22 3.00279V28.3059H26V3.00279H22ZM20.1036 31.8278C22.7685 33.2628 26 31.3326 26 28.3059H22L22 28.3059L20.1036 31.8278ZM10.4958 26.6544L10.4958 26.6544L12.3922 23.1325C11.8093 22.8186 11.1577 22.6544 10.4958 22.6544V26.6544ZM1 22.6544C1 24.8635 2.79086 26.6544 5 26.6544V22.6544V22.6544H1ZM5 4.65436C2.79086 4.65436 1 6.44522 1 8.65436H5L5 8.65436L5 4.65436ZM22 3.00279L22 3.00279H26C26 -0.0239076 22.7685 -1.95406 20.1036 -0.519095L22 3.00279ZM10.4958 4.65436L10.4958 4.65436L10.4958 8.65436C11.1577 8.65436 11.8093 8.49007 12.3922 8.17624L10.4958 4.65436Z" fill="black" mask="url(%23m1)"/%3E%3Crect x="27.5" y="1.87621" width="4" height="36.0624" rx="2" transform="rotate(45 27.5 1.87621)" fill="white" stroke="black" stroke-width="2"/%3E%3C/svg%3E%0A',
    		datauri + '%3Cmask id="m1" fill="white"%3E%3Cpath fill-rule="evenodd" clip-rule="evenodd" d="M24 3.00279C24 1.48944 22.3843 0.524368 21.0518 1.24185L11.444 6.4153C11.1525 6.57221 10.8267 6.65436 10.4958 6.65436H5C3.89543 6.65436 3 7.54979 3 8.65436V22.6544C3 23.7589 3.89543 24.6544 5 24.6544H10.4958C10.8267 24.6544 11.1525 24.7365 11.444 24.8934L21.0518 30.0669C22.3843 30.7843 24 29.8193 24 28.3059V3.00279Z"/%3E%3C/mask%3E%3Cpath fill-rule="evenodd" clip-rule="evenodd" d="M24 3.00279C24 1.48944 22.3843 0.524368 21.0518 1.24185L11.444 6.4153C11.1525 6.57221 10.8267 6.65436 10.4958 6.65436H5C3.89543 6.65436 3 7.54979 3 8.65436V22.6544C3 23.7589 3.89543 24.6544 5 24.6544H10.4958C10.8267 24.6544 11.1525 24.7365 11.444 24.8934L21.0518 30.0669C22.3843 30.7843 24 29.8193 24 28.3059V3.00279Z" fill="white"/%3E%3Cpath d="M21.0518 30.0669L20.1036 31.8278L21.0518 30.0669ZM11.444 24.8934L12.3922 23.1325L11.444 24.8934ZM11.444 6.4153L10.4958 4.65436L11.444 6.4153ZM12.3922 8.17624L22 3.00279L20.1036 -0.519095L10.4958 4.65436L12.3922 8.17624ZM5 8.65436H10.4958V4.65436H5V8.65436ZM5 22.6544V8.65436H1V22.6544H5ZM10.4958 22.6544H5V26.6544H10.4958V22.6544ZM22 28.3059L12.3922 23.1325L10.4958 26.6544L20.1036 31.8278L22 28.3059ZM22 3.00279V28.3059H26V3.00279H22ZM20.1036 31.8278C22.7685 33.2628 26 31.3326 26 28.3059H22L22 28.3059L20.1036 31.8278ZM10.4958 26.6544L10.4958 26.6544L12.3922 23.1325C11.8093 22.8186 11.1577 22.6544 10.4958 22.6544V26.6544ZM1 22.6544C1 24.8635 2.79086 26.6544 5 26.6544V22.6544V22.6544H1ZM5 4.65436C2.79086 4.65436 1 6.44522 1 8.65436H5V8.65436V4.65436ZM22 3.00279L22 3.00279H26C26 -0.0239082 22.7685 -1.95405 20.1036 -0.519095L22 3.00279ZM10.4958 4.65436L10.4958 4.65436V8.65436C11.1577 8.65436 11.8093 8.49007 12.3922 8.17624L10.4958 4.65436Z" fill="black" mask="url(%23m1)"/%3E%3C/svg%3E%0A',
    		function () {
    			v.muted = !v.muted;
    		}));
    	e.appendChild(createToggleButton('40px', '4px',
    		datauri + '%3Crect x="9" y="2" width="4" height="27" rx="1" fill="white" stroke="black" stroke-width="2"/%3E%3Crect x="20" y="2" width="4" height="27" rx="1" fill="white" stroke="black" stroke-width="2"/%3E%3C/svg%3E%0A',
    		datauri + '%3Cg clip-path="url(%23clip0)"%3E%3Cpath d="M24.9539 15.6915L13.9724 27.1641C13.349 27.8154 12.25 27.3741 12.25 26.4727L12.25 3.52736C12.25 2.62586 13.3491 2.18464 13.9724 2.83588L24.9539 14.3085C25.324 14.6952 25.324 15.3048 24.9539 15.6915Z" fill="white" stroke="black" stroke-width="2"/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id="clip0"%3E%3Crect width="32" height="32" fill="white"/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E%0A',
    		function () {
    			if (v.paused) {
    				v.play();
    			} else {
    				v.pause();
    			}
    		}));
    	this._rootElement.appendChild(e);
    };

//@TODO <REFACTORING DONE>
var ViewabilityObserver = function ViewabilityObserver(target, ratio, delay, handler) {
	this.target = target || document.body.children[0];
	this.handler = handler;
	this.viewable_ratio = ratio || 0.9;
	this.viewable_delay = delay || 500;

	function Timer() {
		var timer_id = false;

		this.start = function start(handler, timeout) {
			this.timer_id = setTimeout(handler, timeout);
		}

		this.stop = function stop() {
			if (this.timer_id) {
				clearTimeout(this.timer_id);
				this.timer_id = false;
			}
		}
	};

	var timer = new Timer();
	var observer = false;
	var is_viewable = false;

	this.start = function start(handler) {
		this.stop();
		this.handler = (is_viewable = false) || handler || this.handler;
		observer = typeof IntersectionObserver === "function" ? new IntersectionObserver(function(ratio) {
				if (((ratio && ratio[0] && ratio[0].intersectionRatio) || 0).toFixed(2) >= this.viewable_ratio) {//console.log("START TIMER");
				timer.start(function() {
					if (typeof this.handler === "function") {
						this.stop();
						this.handler();
					}
					else {
						timer.stop();
						is_viewable = true;
						}//console.log("DONE!");
					}.bind(this), this.viewable_delay);
			}
			else {
				timer.stop();
					is_viewable = false;//console.log("STOP TIMER");
				}
			}.bind(this), {threshold: [this.viewable_ratio]}) : false;
		observer && observer.observe(this.target);
	};

	this.stop = function stop() {
		observer && observer.disconnect();
		timer.stop();
		is_viewable = false;
	};

	this.isViewable = function isViewable() {
		return observer ? !!is_viewable : true;
	}
};
//@TODO </REFACTORING DONE>

function loadXML(url, handler)
{
	var xhr = new XMLHttpRequest();

	xhr.withCredentials = true;
	xhr.open("GET", url);
	xhr.send();

	xhr.onreadystatechange = function () {
		if (this.status == 200 && this.readyState == xhr.DONE) {
			var xml = this.responseXML;
			if (xml != null) {
				handler(xml);
			}
			else {
				console.log("Error: XML Loading " + url);
			}
		}

		if (this.status != 200) {
			console.log("Error: XML Loading " + url);
			return;
		}
	};

	xhr.onerror = function(e) {
		console.log("Error: XML Loading " + url);
	};
}

function postData(url, data, handler)
{
	var xhr = new XMLHttpRequest();

	xhr.withCredentials = true;
	xhr.open("POST", url);
	xhr.send(JSON.stringify(data));

	xhr.onreadystatechange = function () {
		if (this.status == 200 && this.readyState == xhr.DONE) {
			var xml = this.responseXML;
			if (xml != null) {
				handler(xml);
			}
			else {
				console.log("Error: XML Loading " + url);
			}
		}

		if (this.status != 200) {
			console.log("Error: XML Loading " + url);
			return;
		}
	};

	xhr.onerror = function(e) {
		console.log("Error: XML Loading " + url);
	};
}

var URLUtils = function URLUtils() {};
URLUtils.location = {};
URLUtils.getData = function (url) {
	if (typeof url === "string" && url) {
		var query = url.match(/^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/);
		return {
			protocol: query[2],
			hostname: query[4],
			pathname: query[5],
			search: query[7],
			hash: query[9],
			host: (query[2] ? query[2] + ':' : '') + '//' + query[4],
			url: query[0]
		};
	}
	else return {};
};
URLUtils.correctProtocol = function (url) {
	return url ? ( URLUtils.location.protocol == "http" ? url.replace("https:","http:") : url.replace("http:","https:") ) : "";
};
URLUtils.getQueryParameter = function (url, parameter, value_only) {
	parameter = new RegExp("([?&]" + parameter + "(=[^&#]*)*(?=#|$))|([?&]" + parameter + "(=[^&]*)*&)", "i").exec(url);
	return parameter ? (value_only === false ? parameter[0] : (parameter[4] || parameter[2] || "").slice(1)) : null;
};
URLUtils.replaceQueryParameters = function (url, names, values) {
	values = typeof values === "string" ? [values] : values || [];
	names = typeof names === "string" ? [names] : names || [];
	names.forEach(function(name, index) {
		var parameter = URLUtils.getQueryParameter(url, name, false);
            if (parameter) url = url.replace(parameter, typeof values[index] === "string" ? parameter.replace(/([?&]*)([^=&]+)(=*)([^&]*)(&*)/gi, "$1$2" + (values[index] ? "=" + values[index] : "$3") + "$5") : parameter.replace(/((?!.*&$).+)|([^?&]+.*)/gi, "")); // (?!.*(?:ly|la)$)^.*$ - исключает если на конце ly || la
        });
	return url;
};

var WindowUtils = function WindowUtils() {};
WindowUtils.getTopmost = function() {
	var current = window, parent, topmost = current;
	while (parent != current && parent != top) {
		try {
			parent = (current = parent || current).parent;
			if (parent.document) topmost = parent;
		} catch (e) {}
	}
	return topmost || {};
};
WindowUtils.getOriginInfo = function(source) {
	var current = window, parent, chain = [], ancestors = [],
	origin = [{current: location.href, referrer: document.referrer, accessible: true}];

	while (parent != current && parent != top) {
		try {
			parent = (current = parent || current).parent;
			origin.push({current: parent.document.location.href, referrer: parent.document.referrer, accessible: true});
		} catch (e) { origin.push({current: "", referrer: "", accessible: false}); }
	}

	for (var i = 0; i < origin.length; i++) {
		origin[i].parsed = URLUtils.getData(origin[i].current);
		if (!origin[-~i]) chain.push(origin[i].parsed.url || "");
		else {
			origin[-~i].current = origin[-~i].current || (origin[i].referrer && origin[i].parsed.host != URLUtils.getData(origin[i].referrer).host ? origin[i].referrer : "");
			if (!origin[i].current || (origin[i].parsed.hostname && origin[i].current != origin[-~i].current)) chain.push(origin[i].parsed.host || "");
		}
	}

	if (location.ancestorOrigins) {
		try {
                //var descriptor = Object.getOwnPropertyDescriptor(location, "ancestorOrigins");
                //if (descriptor && !descriptor.writable && !descriptor.configurable) {
                	for (var item in location.ancestorOrigins) {
                		if (location.ancestorOrigins.hasOwnProperty(item) && !isNaN(+item)) ancestors.push(location.ancestorOrigins[item]);
                	}
                //}
            } catch (e) {}

            if (ancestors.length) {
            	for (i = 1; i <= chain.length; i++) {
            		if (!chain[chain.length - i]) chain[chain.length - i] = ancestors[ancestors.length - i] || "";
            		else if (i == 1 && ancestors[ancestors.length - 1] != URLUtils.getData(chain[chain.length - 1]).host) chain.push(ancestors[ancestors.length - 1]);
            	}
            }
        }

        if (source) chain[chain.length - 1] = source;
        for (i = 0; i < chain.length; i++) chain[i] = encodeURIComponent(chain[i]);

        	return {origin: chain[chain.length - 1], chain: chain.reverse().join(";")};
    };

    WindowUtils.getNodeText = function(node) {
    	var data = [];

    	if (["script", "noscript", "style"].indexOf(node.nodeName.toLocaleLowerCase()) == -1 && (node.offsetWidth ? node.offsetWidth >= 10 : true) && (node.offsetHeight ? node.offsetHeight >= 10 : true)) {
    		for (node = node.firstChild; node; node = node.nextSibling) {
    			if (node.nodeType == 3 && /[a-zA-Zа-яА-ЯёЁ0-9]/.test(node.nodeValue)) data.push(node.nodeValue.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, ''));
    			else data = data.concat(WindowUtils.getNodeText(node));
    		}
    	}

    	return data;
    }

    function crc(value) {
    	var result = 0x12345678;
    	for (var i = 0; i < value.length; i++) result += (value.charCodeAt(i) * (i + 1));
    		return (result & 0xffffffff).toString(16);
    }

    function makeid(l) {
    	var r = '';
    	var c = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    	var cl = c.length;
    	for (var i = 0; i < l; i++) {
    		r += c.charAt(Math.floor(Math.random() * cl));
    	}
    	return r;
    };

    function createToggleButton(x, y, src1, src2, h) {
    	var b = d.createElement('img');
    	b.classList.add('mt-button');
    	b.style.position = 'absolute';
    	b.style.left = x;
    	b.style.top = y;
    	b.src = src1;
    	b.addEventListener('click', function (e) {
    		e.target.src = e.target.src === src1 ? src2 : src1;
    		h(e);
    	});
    	return b;
    };

    function writeIframeContent(doc, text) {
    	doc.open();
    	doc.write('<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8">' +
    		'<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">' +
    		'<meta http-equiv="X-UA-Compatible" content="ie=edge">' +
    		'<style type="text/css">html,body{margin:0;padding:0;overflow:hidden;}</style>' +
    		'<title>[AD]</title></head><body>' + text + '</body></html>');
    	doc.close();
    };

    function normalizeSrc(s, p) {
    	return /^https?:\/\//.test(s) ? s : p + s;
    };

    w._mt_lib_init = function(cfg) {
    	(new Ad(d.body, cfg)).init();
    }

    if (w[c]) {
    	(new Ad(d.body, w[c]())).init();
    } else {
        //console.error('"' + c + '" missing!');
    }
})(window, document, '_mt_callback')
