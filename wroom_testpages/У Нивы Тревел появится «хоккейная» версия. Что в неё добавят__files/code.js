
// 0
(function(w, placeId, c, a){
	if (typeof w._MT_RichMedia != 'undefined')
		return;

	var RichMediaObj = function(ad) {
		this.ad = ad;

		this.cacheFile = function(u) {
			(new Image(1, 1)).src = u.replace('{rid}', w._mt_rnd || Math.floor(Math.random() * 1000000));
		}

		this.ev = function(ev, image_id) {
			if (typeof window._mt_subscribers === "object" && window._mt_subscribers[placeId]) {
				try {
					window._mt_subscribers[placeId][ev] && typeof window._mt_subscribers[placeId][ev] === "function" && window._mt_subscribers[placeId][ev]();
				} catch(e) {};
			}

			var w = window, o = this, ad = o.ad;
			switch (ev) {
				case 'load':
					if (! ad.ev_load_traced && ad.ev_load) {
						for (var u of ad.ev_load)
							if (u && u.length > 0 && u.charAt(0) != '{')
								o.cacheFile(u.replace('{' + 'image_file_id' + '}', image_id));
						ad.ev_load_traced = true;
					}
					break;
				case 'ready':
					if (! ad.imp_traced && ad.imp_url) {
						for (var u of ad.imp_url)
							if (u && u.length > 0 && u.charAt(0) != '{')
								o.cacheFile(u.replace('{' + 'image_file_id' + '}', image_id));
						ad.imp_traced = true;
					}
					break;
				case 'bready':
					if (! ad.ev_bready_traced && ad.ev_bready) {
						for (var u of ad.ev_bready)
							if (u && u.length > 0 && u.charAt(0) != '{')
								o.cacheFile(u.replace('{' + 'image_file_id' + '}', image_id));
						ad.ev_bready_traced = true;
					}
					break;
				case 'vready':
					if (! ad.ev_vready_traced && ad.ev_vready) {
						for (var u of ad.ev_vready)
							if (u && u.length > 0 && u.charAt(0) != '{')
								o.cacheFile(u.replace('{' + 'image_file_id' + '}', image_id));
						ad.ev_vready_traced = true;
					}
					break;
				case 'pready':
					if (! ad.ev_pready_traced && ad.ev_pready) {
						for (var u of ad.ev_pready)
							if (u && u.length > 0 && u.charAt(0) != '{')
								o.cacheFile(u.replace('{' + 'image_file_id' + '}', image_id));
						ad.ev_pready_traced = true;
					}
					break;
				case 'over':
					if (! ad.ev_over_traced && ad.ev_over) {
						for (var u of ad.ev_over)
							if (u && u.length > 0 && u.charAt(0) != '{')
								o.cacheFile(u.replace('{' + 'image_file_id' + '}', image_id));
						ad.ev_over_traced = true;
					}
					break;
				case 'quarter':
					if (! ad.evq_traced && ad.evq) {
						for (var u of ad.evq)
							if (u && u.length > 0 && u.charAt(0) != '{')
								o.cacheFile(u.replace('{' + 'image_file_id' + '}', image_id));
						ad.evq_traced = true;
					}
					break;
				case 'half':
					if (! ad.evh_traced && ad.evh) {
						for (var u of ad.evh)
							if (u && u.length > 0 && u.charAt(0) != '{')
								o.cacheFile(u.replace('{' + 'image_file_id' + '}', image_id));
						ad.evh_traced = true;
					}
					break;
				case 'threequarters':
					if (! ad.evtq_traced && ad.evtq) {
						for (var u of ad.evtq)
							if (u && u.length > 0 && u.charAt(0) != '{')
								o.cacheFile(u.replace('{' + 'image_file_id' + '}', image_id));
						ad.evtq_traced = true;
					}
					break;
				case 'complete':
					if (! ad.evc_traced && ad.evc) {
						for (var u of ad.evc)
							if (u && u.length > 0 && u.charAt(0) != '{')
								o.cacheFile(u.replace('{' + 'image_file_id' + '}', image_id));
						ad.evc_traced = true;
					}
					break;
				case 'close':
					if (! ad.ev_close_traced && ad.ev_close) {
						for (var u of ad.ev_close)
							if (u && u.length > 0 && u.charAt(0) != '{')
								o.cacheFile(u.replace('{' + 'image_file_id' + '}', image_id));
						ad.ev_close_traced = true;
					}
					break;
				case 'bclose':
					if (! ad.ev_bclose_traced && ad.ev_bclose) {
						for (var u of ad.ev_bclose)
							if (u && u.length > 0 && u.charAt(0) != '{')
								o.cacheFile(u.replace('{' + 'image_file_id' + '}', image_id));
						ad.ev_bclose_traced = true;
					}
					break;
				case 'click':
					break;
			}
		}

		this.run3 = function() {
			String.prototype.replaceAll = function(search, replacement) {
			    var target = this;
			    return target.split(search).join(replacement);
			};
			var o = this, a = o.ad; c.images_size = a.images_size;
			var sp = ad.script_url.lastIndexOf('/') + 1;
			var assetsPath = ad.script_url.substr(0, sp), scriptName = ad.script_url.substr(sp);
			var funcNames = [scriptName.substr(0, scriptName.lastIndexOf('.')).replaceAll('.', '_'), '_MT_DefaultAd'];
			for (var fi in funcNames) {
				if (eval('(typeof ' + funcNames[ fi ] + ' === "function")'))
					break;
			}
			o.banner = new (eval(funcNames[ fi ])) ({
				'pid': placeId,
				'link' : a.click_url,
				'assetsPath' : a.script_url.substr(0, a.script_url.lastIndexOf('/') + 1),
				'statScript' : this.ev.bind(this),
				'openDelay' : a.open_delay,
				'skipDelay' : a.close_delay,
				'adloox' : a.adloox,
				'target_image' : a.target_image,
				'images' : a.images,
				'opts' : c,
			})
		}

		this.run2 = function() {
			var w = window, o = this, a = o.ad;
			w._MT_jsLoadDelayed(a.script_url, function() { this.run3() }.bind(this));
		}

		this.run = function() {
			var o = this, a = o.ad;
			if (a.styles_url) {
				var css = document.createElement('link');
				css.setAttribute('rel', 'stylesheet');
				css.setAttribute('type', 'text/css');
				css.setAttribute('href', a.styles_url);
				css.onload = css.onreadystatechange = function() { this.run2() }.bind(this);
				document.getElementsByTagName('head')[ 0 ].appendChild(css);
			} else
				o.run2();
		}
	}

	if (! Function.prototype.bind) {
		Function.prototype.bind = function () {
			var context, parameters = [], f = this;
			if (arguments.length) {
				context = arguments[0];
				parameters = Array.prototype.slice.call(arguments, 1);
			}
			return function () {
				return f.apply(context, parameters.concat(Array.prototype.slice.call(arguments)));
			};
		};
	}

	if (typeof w._MT_jsLoadDelayed != 'function') {
		var wd = w.document;
		w._MT_jsLoadDelayed = function(b,c,d) {
			var a=wd.createElement("script");
			d && (a.id=d);
			a.language="javascript";
			a.type="text/javascript";
			a.charset="utf-8";
			a.async=1;
			a.src=b;
			if(w.ActiveXObject) {
				var e=!1;
				a.onload=a.onreadystatechange=function() {
					if (!e && (!this.readyState || this.readyState==="complete" || this.readyState==="loaded" && this.nextSibling!=null)) {
						e=true;
						c&&c();
						a.onload=a.onreadystatechange=null
					}
				}
			} else
				a.onload=c;
			b=wd.getElementsByTagName("script")[0];
			b.parentNode.insertBefore(a,b)
		}
	}

	a.forEach(function(item) {
		w._MT_RichMedia = new RichMediaObj(item);
		w._MT_RichMedia.run();
	});
})(window, 8836, {
	'channel_id':'8836',
	'inimage_opts':{allow:{sequence:[],tag:[],id:[],class:[],parent_mask:[]},deny:{sequence:["1"],tag:[],id:[],class:[],parent_mask:[]}},
	'max_ads_in_page':'0'
}, [

{ /* 0 */
	'script_url':'https://catsnetwork.ru/storage/7895/9/ad_a6e8ad49045f0bef72fb92d7c4a97fed.js',
	'open_delay':'',
	'close_delay':'',
	'click_url':'https://catsnetwork.ru/core/click.cgi?pid=8836&bid=78959&ss=SS3qc8j4PN5K&idntfy=VU0000000g4bjql&ll=https%3A%2F%2Fwroom.ru%2Fnews%2F14851',
	'ev_load':['https://catsnetwork.ru/core/event.gif?eid=137&bid=78959&pid=8836&iid=&ss=SS3qc8j4PN5K&idntfy=VU0000000g4bjql'],
	'imp_url':['https://catsnetwork.ru/core/event.gif?eid=91&bid=78959&pid=8836&iid=&ss=SS3qc8j4PN5K&idntfy=VU0000000g4bjql','https://wcm-ru.frontend.weborama.fr/fcgi-bin/dispatch.fcgi?a.A=im&a.si=244&a.te=1814&a.aap=659&a.agi=902&a.hr=XC&g.ra=~RANDOM~','https://pixel.adlooxtracking.ru/ads/ic.php?_=~RANDOM~&type=pixel&plat=30&tag_id=238&client=weborama&id1=1309&id2=115&id3=282&id4=1x1&id5=1813&id6=0&id7=244&id11=&id12=russia&id14=$ADLOOX_WEBSITE','https://www.tns-counter.ru/V13a****weborama_ad/ru/UTF-8/tmsec=wmediacom_244115-1814-1/~RANDOM~'],
	'ev_vready':['https://catsnetwork.ru/core/event.gif?eid=131&bid=78959&pid=8836&iid=&ss=SS3qc8j4PN5K&idntfy=VU0000000g4bjql'],
	'ev_pready':['https://catsnetwork.ru/core/event.gif?eid=135&bid=78959&pid=8836&iid=&ss=SS3qc8j4PN5K&idntfy=VU0000000g4bjql'],
	'ev_over':['https://catsnetwork.ru/core/event.gif?eid=93&bid=78959&pid=8836&iid=&ss=SS3qc8j4PN5K&idntfy=VU0000000g4bjql'],
	'ev_close':['https://catsnetwork.ru/core/event.gif?eid=96&bid=78959&pid=8836&iid=&ss=SS3qc8j4PN5K&idntfy=VU0000000g4bjql',''],
	'ev_bclose':['https://catsnetwork.ru/core/event.gif?eid=134&bid=78959&pid=8836&iid=&ss=SS3qc8j4PN5K&idntfy=VU0000000g4bjql',''],
	'ev_bready':['https://catsnetwork.ru/core/event.gif?eid=95&bid=78959&pid=8836&iid=&ss=SS3qc8j4PN5K&idntfy=VU0000000g4bjql',''],
	'evq':['https://catsnetwork.ru/core/event.gif?eid=99&bid=78959&pid=8836&iid=&ss=SS3qc8j4PN5K&idntfy=VU0000000g4bjql','',''],
	'evh':['https://catsnetwork.ru/core/event.gif?eid=100&bid=78959&pid=8836&iid=&ss=SS3qc8j4PN5K&idntfy=VU0000000g4bjql','',''],
	'evtq':['https://catsnetwork.ru/core/event.gif?eid=101&bid=78959&pid=8836&iid=&ss=SS3qc8j4PN5K&idntfy=VU0000000g4bjql','',''],
	'evc':['https://catsnetwork.ru/core/event.gif?eid=102&bid=78959&pid=8836&iid=&ss=SS3qc8j4PN5K&idntfy=VU0000000g4bjql','',''],
	'target_image':'',
	'images_size':{ 'width':{ 'min':0, 'max':Infinity }, 'height':{ 'min':0, 'max':Infinity } },
	'images':{},
	'adloox':''
},

{ /* 1 */
	'script_url':'https://catsnetwork.ru/storage/7894/8/ad_b6f8dc086b2d60c5856e4ff517060392.js',
	'open_delay':'',
	'close_delay':'',
	'click_url':'https://catsnetwork.ru/core/click.cgi?pid=8836&bid=78948&ss=SS3qc8j4PN5K&idntfy=VU0000000g4bjql&ll=https%3A%2F%2Fwroom.ru%2Fnews%2F14851',
	'ev_load':['https://catsnetwork.ru/core/event.gif?eid=137&bid=78948&pid=8836&iid=&ss=SS3qc8j4PN5K&idntfy=VU0000000g4bjql'],
	'imp_url':['https://catsnetwork.ru/core/event.gif?eid=91&bid=78948&pid=8836&iid=&ss=SS3qc8j4PN5K&idntfy=VU0000000g4bjql','https://wcm-ru.frontend.weborama.fr/fcgi-bin/dispatch.fcgi?a.A=im&a.si=244&a.te=1789&a.he=1&a.wi=1&a.hr=p&a.ra=266968','',''],
	'ev_vready':['https://catsnetwork.ru/core/event.gif?eid=131&bid=78948&pid=8836&iid=&ss=SS3qc8j4PN5K&idntfy=VU0000000g4bjql'],
	'ev_pready':['https://catsnetwork.ru/core/event.gif?eid=135&bid=78948&pid=8836&iid=&ss=SS3qc8j4PN5K&idntfy=VU0000000g4bjql'],
	'ev_over':['https://catsnetwork.ru/core/event.gif?eid=93&bid=78948&pid=8836&iid=&ss=SS3qc8j4PN5K&idntfy=VU0000000g4bjql'],
	'ev_close':['https://catsnetwork.ru/core/event.gif?eid=96&bid=78948&pid=8836&iid=&ss=SS3qc8j4PN5K&idntfy=VU0000000g4bjql',''],
	'ev_bclose':['https://catsnetwork.ru/core/event.gif?eid=134&bid=78948&pid=8836&iid=&ss=SS3qc8j4PN5K&idntfy=VU0000000g4bjql',''],
	'ev_bready':['https://catsnetwork.ru/core/event.gif?eid=95&bid=78948&pid=8836&iid=&ss=SS3qc8j4PN5K&idntfy=VU0000000g4bjql',''],
	'evq':['https://catsnetwork.ru/core/event.gif?eid=99&bid=78948&pid=8836&iid=&ss=SS3qc8j4PN5K&idntfy=VU0000000g4bjql','',''],
	'evh':['https://catsnetwork.ru/core/event.gif?eid=100&bid=78948&pid=8836&iid=&ss=SS3qc8j4PN5K&idntfy=VU0000000g4bjql','',''],
	'evtq':['https://catsnetwork.ru/core/event.gif?eid=101&bid=78948&pid=8836&iid=&ss=SS3qc8j4PN5K&idntfy=VU0000000g4bjql','',''],
	'evc':['https://catsnetwork.ru/core/event.gif?eid=102&bid=78948&pid=8836&iid=&ss=SS3qc8j4PN5K&idntfy=VU0000000g4bjql','',''],
	'target_image':'',
	'images_size':{ 'width':{ 'min':0, 'max':Infinity }, 'height':{ 'min':0, 'max':Infinity } },
	'images':{},
	'adloox':''
},

{ /* 2 */
	'script_url':'https://catsnetwork.ru/storage/7896/2/ad_785736838d7b51f2cabb00e6b28a8969.js',
	'open_delay':'',
	'close_delay':'',
	'click_url':'https://catsnetwork.ru/core/click.cgi?pid=8836&bid=78962&ss=SS3qc8j4PN5K&idntfy=VU0000000g4bjql&ll=https%3A%2F%2Fwroom.ru%2Fnews%2F14851',
	'ev_load':['https://catsnetwork.ru/core/event.gif?eid=137&bid=78962&pid=8836&iid=&ss=SS3qc8j4PN5K&idntfy=VU0000000g4bjql'],
	'imp_url':['https://catsnetwork.ru/core/event.gif?eid=91&bid=78962&pid=8836&iid=&ss=SS3qc8j4PN5K&idntfy=VU0000000g4bjql','https://wcm-ru.frontend.weborama.fr/fcgi-bin/dispatch.fcgi?a.A=im&a.si=244&a.te=1814&a.aap=659&a.agi=902&a.hr=XC&g.ra=~RANDOM~','https://pixel.adlooxtracking.ru/ads/ic.php?_=~RANDOM~&type=pixel&plat=30&tag_id=238&client=weborama&id1=1309&id2=115&id3=282&id4=1x1&id5=1813&id6=0&id7=244&id11=&id12=russia&id14=$ADLOOX_WEBSITE','https://www.tns-counter.ru/V13a****weborama_ad/ru/UTF-8/tmsec=wmediacom_244115-1814-1/~RANDOM~'],
	'ev_vready':['https://catsnetwork.ru/core/event.gif?eid=131&bid=78962&pid=8836&iid=&ss=SS3qc8j4PN5K&idntfy=VU0000000g4bjql'],
	'ev_pready':['https://catsnetwork.ru/core/event.gif?eid=135&bid=78962&pid=8836&iid=&ss=SS3qc8j4PN5K&idntfy=VU0000000g4bjql'],
	'ev_over':['https://catsnetwork.ru/core/event.gif?eid=93&bid=78962&pid=8836&iid=&ss=SS3qc8j4PN5K&idntfy=VU0000000g4bjql'],
	'ev_close':['https://catsnetwork.ru/core/event.gif?eid=96&bid=78962&pid=8836&iid=&ss=SS3qc8j4PN5K&idntfy=VU0000000g4bjql',''],
	'ev_bclose':['https://catsnetwork.ru/core/event.gif?eid=134&bid=78962&pid=8836&iid=&ss=SS3qc8j4PN5K&idntfy=VU0000000g4bjql',''],
	'ev_bready':['https://catsnetwork.ru/core/event.gif?eid=95&bid=78962&pid=8836&iid=&ss=SS3qc8j4PN5K&idntfy=VU0000000g4bjql',''],
	'evq':['https://catsnetwork.ru/core/event.gif?eid=99&bid=78962&pid=8836&iid=&ss=SS3qc8j4PN5K&idntfy=VU0000000g4bjql','',''],
	'evh':['https://catsnetwork.ru/core/event.gif?eid=100&bid=78962&pid=8836&iid=&ss=SS3qc8j4PN5K&idntfy=VU0000000g4bjql','',''],
	'evtq':['https://catsnetwork.ru/core/event.gif?eid=101&bid=78962&pid=8836&iid=&ss=SS3qc8j4PN5K&idntfy=VU0000000g4bjql','',''],
	'evc':['https://catsnetwork.ru/core/event.gif?eid=102&bid=78962&pid=8836&iid=&ss=SS3qc8j4PN5K&idntfy=VU0000000g4bjql','',''],
	'target_image':'',
	'images_size':{ 'width':{ 'min':0, 'max':Infinity }, 'height':{ 'min':0, 'max':Infinity } },
	'images':{},
	'adloox':''
},

{ /* 3 */
	'script_url':'https://catsnetwork.ru/storage/7895/1/ad_ba6d843eb4251a4526ce65d1807a9309.js',
	'open_delay':'',
	'close_delay':'',
	'click_url':'https://catsnetwork.ru/core/click.cgi?pid=8836&bid=78951&ss=SS3qc8j4PN5K&idntfy=VU0000000g4bjql&ll=https%3A%2F%2Fwroom.ru%2Fnews%2F14851',
	'ev_load':['https://catsnetwork.ru/core/event.gif?eid=137&bid=78951&pid=8836&iid=&ss=SS3qc8j4PN5K&idntfy=VU0000000g4bjql'],
	'imp_url':['https://catsnetwork.ru/core/event.gif?eid=91&bid=78951&pid=8836&iid=&ss=SS3qc8j4PN5K&idntfy=VU0000000g4bjql','https://wcm-ru.frontend.weborama.fr/fcgi-bin/dispatch.fcgi?a.A=im&a.si=244&a.te=1789&a.he=1&a.wi=1&a.hr=p&a.ra=266968','',''],
	'ev_vready':['https://catsnetwork.ru/core/event.gif?eid=131&bid=78951&pid=8836&iid=&ss=SS3qc8j4PN5K&idntfy=VU0000000g4bjql'],
	'ev_pready':['https://catsnetwork.ru/core/event.gif?eid=135&bid=78951&pid=8836&iid=&ss=SS3qc8j4PN5K&idntfy=VU0000000g4bjql'],
	'ev_over':['https://catsnetwork.ru/core/event.gif?eid=93&bid=78951&pid=8836&iid=&ss=SS3qc8j4PN5K&idntfy=VU0000000g4bjql'],
	'ev_close':['https://catsnetwork.ru/core/event.gif?eid=96&bid=78951&pid=8836&iid=&ss=SS3qc8j4PN5K&idntfy=VU0000000g4bjql',''],
	'ev_bclose':['https://catsnetwork.ru/core/event.gif?eid=134&bid=78951&pid=8836&iid=&ss=SS3qc8j4PN5K&idntfy=VU0000000g4bjql',''],
	'ev_bready':['https://catsnetwork.ru/core/event.gif?eid=95&bid=78951&pid=8836&iid=&ss=SS3qc8j4PN5K&idntfy=VU0000000g4bjql',''],
	'evq':['https://catsnetwork.ru/core/event.gif?eid=99&bid=78951&pid=8836&iid=&ss=SS3qc8j4PN5K&idntfy=VU0000000g4bjql','',''],
	'evh':['https://catsnetwork.ru/core/event.gif?eid=100&bid=78951&pid=8836&iid=&ss=SS3qc8j4PN5K&idntfy=VU0000000g4bjql','',''],
	'evtq':['https://catsnetwork.ru/core/event.gif?eid=101&bid=78951&pid=8836&iid=&ss=SS3qc8j4PN5K&idntfy=VU0000000g4bjql','',''],
	'evc':['https://catsnetwork.ru/core/event.gif?eid=102&bid=78951&pid=8836&iid=&ss=SS3qc8j4PN5K&idntfy=VU0000000g4bjql','',''],
	'target_image':'',
	'images_size':{ 'width':{ 'min':0, 'max':Infinity }, 'height':{ 'min':0, 'max':Infinity } },
	'images':{},
	'adloox':''
},

]);

(function() {
	(new Image(1, 1)).src = 'https://ad.adriver.ru/cgi-bin/rle.cgi?sid=1&ad=608223&bt=21&pid=2551979&bid=5723262&bn=5723262&rnd=266968';
	(new Image(1, 1)).src = 'https://VU0000000g4bjql-mdt.ops.beeline.ru/p?ssp=mdt&amp;id=VU0000000g4bjql';
	(new Image(1, 1)).src = 'https://redirect.frontend.weborama.fr/rd?url=https%3A%2F%2Fmediatoday.ru%2Fcore%2Fmatch.gif%3Fs%3D15%26id%3D{WEBO_CID}';
	(new Image(1, 1)).src = 'https://sync.1dmp.io/pixel.gif?cid=72295f3d-ccef-444f-90ae-f20aee12633e&pid=w&uid=VU0000000g4bjql&ru=https%3A%2F%2Fmediatoday.ru%2Fcore%2Fmatch.gif%3Fs%3D16%26id%3D%5BUID%5D';
	(new Image(1, 1)).src = 'https://relap.io/api/partners/instrv.gif?uid=VU0000000g4bjql';
	(new Image(1, 1)).src = 'https://sync.dmp.otm-r.com/match/invideo?r=https%3A%2F%2Finstreamvideo.ru%2Fcore%2Fmatch.gif%3Fs%3D21%26id%3D%7Bpid%7D';
	(new Image(1, 1)).src = 'https://tms.dmp.wi-fi.ru/?dmpkit_cid=81460eb5-647b-4d9b-a3e3-7863f294c3da&dmpkit_evid=ab914581-c2bd-45ef-9242-3128c73c48c5&g_adv=mediatoday&ru=https%3A%2F%2Finstreamvideo.ru%2Fcore%2Fmatch.gif%3Fs%3D23%26id%3D[UID]';
	(new Image(1, 1)).src = 'https://x01.aidata.io/0.gif?pid=8013096&amp;id=VU0000000g4bjql';
	(new Image(1, 1)).src = 'https://an.yandex.ru/mapuid/gpmd/VU0000000g4bjql';
})();
