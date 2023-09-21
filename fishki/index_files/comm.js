var vadsLoaderCfg = JSON.parse("{\"2130\":{\"allowedTags\":[],\"autostart\":true,\"capping\":0,\"closeButton\":true,\"closeCountdownVisibility\":true,\"contentTime\":5,\"cssPriorityPlace\":\"head\",\"customLogo_clickthrough\":\"https:\\/\\/viads.ru\",\"customLogo_height\":12,\"customLogo_width\":46,\"delay\":0,\"destroyOnClose\":true,\"extraEvents\":[],\"floating_size\":0,\"floating_mode\":1,\"height\":0,\"hidecontrols\":true,\"hideOnInput\":false,\"Impression\":2,\"infrm\":false,\"inpageHeader\":true,\"inpageHeader_bg\":\"#FFFFFF\",\"interscroller_bg\":\"#FFFFFF\",\"interscroller_height\":1,\"interscroller_minheight\":600,\"interscroller_mode\":0,\"loglevel\":0,\"logo\":false,\"max_width\":400,\"max_width_inpage\":400,\"MaxRun\":5,\"midrolltime\":2,\"muted\":true,\"noadsdelay\":5,\"onNoAds\":\"\",\"overlayposition\":{\"bottom\":35,\"left\":5},\"place_x\":\"Right\",\"place_y\":\"Bottom\",\"playerVersion\":1,\"posDfp\":false,\"pos_bottom\":0,\"pos_left\":0,\"pos_right\":0,\"pos_top\":0,\"preloader_click\":\"\",\"preloader_hls_link\":\"https://rucdn.viadata.store/media/14_society_rus.m3u8\",\"preloader_link\":\"https://rucdn.viadata.store/media/14_society_rus.mp4\",\"report_able\":false,\"restartOnClose\":0,\"runcheck\":false,\"scroll\":\"\",\"scrollValue\":0,\"skip\":false,\"skipText\":\"\",\"slotBackgroundColor\":\"#FFFFFF\",\"soundButton\":true,\"stopnoads\":false,\"typeCfg\":[],\"width\":100,\"x_after\":1,\"x_click_area\":0,\"x_pos_logo\":\"Right\",\"x_size\":24,\"yandexInframe\":false,\"yandexHeaderResize\":\"height\",\"zindex\":100001,\"zone_type\":\"video\",\"type\":\"slider\",\"autoplay\":true,\"content_mode\":\"pre\",\"floating_floatOnBottom\":false,\"ratio\":\"16x9\",\"logo_position\":\"Left\",\"autoSize\":false,\"sticky_size\":1,\"position\":\"Bottom-Right\",\"content\":{\"type\":\"none\"},\"closePosition\":\"left\",\"closeInside\":false,\"logoPosition\":\"right\",\"closeSwipe\":false,\"passbackMode\":\"OFF\",\"passbackType\":\"\",\"passbackUrl\":\"\",\"uuid\":\"91933088-2129-4450-a810-8f376914e126\",\"region\":\"ru.\",\"ldom\":\"logs.viadata.store\",\"tdom\":\"rux.viadata.store\"}}");
if (window.vadsGEO == null) { window.vadsGEO = 'GE'; }

window.vadsActiveZones = window.vadsActiveZones || [];
var vadsLoaderDrivers = {};

vadsLoaderDrivers["video"] = function(cfg, cb) {
    var { zoneId, container = document.body, videoId = 0, onError, onComplete, onStart, onClose } = cb;
    
    if (cfg.type == "slider" || cfg.type == "interstitial") { container = document.body; }
    cfg.logErrors = false;
    cfg.vpaidTryVisibility = !1;
    cfg.playerVersion = '09151';
    cfg.tracesSampleRate = 0.01;
    cfg.prerollDelay = 0;
    cfg.ws = !1;
    cfg.bl = ['.adstreamer.ru/vpaid.php'];
    cfg.loglevel = 0;
    cfg.timeouts = {waterfallstart: 500, waterfallend: 10000, yartbstart: 5000, yab: 15000, vpaidstart: 3000, googleImaInit: 5000, googlestart: 5000, admanstart: 5000, cleanup: 3000};
    cfg.libHLS = 'https://rucdn.viadata.store/js/player/hls2.js';
    cfg.syncJS = 'https://ru.viadata.store/tag/msync.js?sid=104621&gdpr=(gdpr)&consent=(gdpr_consent)&cb=1695299996';
    cfg.dev = !1;
    
    if (container == null) {
        if (cfg.autoSlot) {
            const getAdContainer = () => {
                const containerRequirements = {
                    lowerThan: (container, px) => {
                        const { width, height} = container.getBoundingClientRect();
                        return width >= px && height < 600;
                    }
                };
                const getPrevSiblingFromTargetElement = (child) => {
                    if (
                        cfg.allowedTags.includes(child.nodeName.toLowerCase()) &&
                        containerRequirements.lowerThan(child, window.innerWidth < 900 ? 330 : 600)
                    ) {
                        return child;
                    } else if (child.nodeName.toLowerCase() === "body") {
                        return child.lastChild;
                    } else if (child.nodeName.toLowerCase() === "html") {
                        return document.body.lastChild;
                    } else if (child.nextElementSibling) {
                        return getPrevSiblingFromTargetElement(child.nextElementSibling);
                    } else {
                        return getPrevSiblingFromTargetElement(child.parentElement);
                    }
                };
                const targetElement = document.elementFromPoint(
                    window.innerWidth / 2,
                    window.innerHeight - 2
                );
                
                const container = document.createElement("div");
                container.style.cssText = "width: 100%;";
                                
                if (cfg.classTags && cfg.classTags.length > 0) {
                    for (let i = 0; i < cfg.classTags.length; i++) {
                        var tmpElem = document.getElementsByClassName(cfg.classTags[i])[0];
                        if (tmpElem != undefined) {
                            tmpElem.after(container);
                            return container;
                        }
                    }    
                } 
                
                const containersPrevSibling = getPrevSiblingFromTargetElement(targetElement);
                containersPrevSibling.after(container);
                return container;
            };
            container = getAdContainer();
        } else {
            console.warn("container not found");
            return;
        }
    }
  
    if (cfg.type != "stream" && (!cfg.content || cfg.content.length == 0)) {
        var content = {type:"video",preroll:3,midroll:3,mode:"old",hls:"https://rucdn.viadata.store/media/14_society_rus.m3u8",url:"https://rucdn.viadata.store/media/14_society_rus.mp4",segments:[{duration:5000,clickthrough:""},{duration:5000,clickthrough:""},{duration:5000,clickthrough:""},{duration:5000,clickthrough:""}]}
        cfg.content = content;
    }
    cfg.content.linesPerSlide = 2;
   
    function vadsInit(doc) {
                (new Image).src = "https://logs.viadata.store/req/site?sid=104621&uid=91933088-2129-4450-a810-8f376914e126&zone="+ zoneId +"&event=playerLoaded&v="+ cfg.playerVersion +"&cb=" + Date.now();
        if (cfg.restartOnClose) {
            onClose = function () { setTimeout(function() { if (doc.vadsPlayerController[zoneId].isRunning() === false) { doc.vadsPlayerController[zoneId].start({ sid: 104621, zone: zoneId, container: container, videoid: videoId, callbacks: {onError, onComplete, onStart, onClose}}); } }, cfg.restartOnClose*1000); }
        }
        if (typeof(doc.vadsPlayer) === "undefined") {
            (function(a, b, c, d, e, f, g) {
                var s = b.createElement(c);
                s.src = d;
                s.type = "application/javascript";
                s.async = !0;
                s.defer = !0;
                b.body.appendChild(s);
                a[f] = a[f] || [];
                a[e] = function() {
                    var _a$f;	
                    (_a$f = a[f]).push.apply(_a$f, arguments);
                }
                a[g] = {[zoneId]:cfg};
            })(doc, doc.document, "script", "https://rucdn.viadata.store/js/player/230915_64d293c0.js", "vadsPlayer", "vadsPlayerCaller", "vadsPlayerCfg");
            (new doc.vadsPlayer({ sid: 104621, zone: zoneId, container: container, videoid: videoId, callbacks: {onError, onComplete, onStart, onClose}}));
        } else if (typeof(doc.vadsPlayerController) === "undefined" || !doc.vadsPlayerController.hasOwnProperty(zoneId)) {
            (function(a, b, c, d, e, f, g) {
                a[g][zoneId] = cfg;
            })(doc, doc.document, "script", "https://rucdn.viadata.store/js/player/230915_64d293c0.js", "vadsPlayer", "vadsPlayerCaller", "vadsPlayerCfg");
            doc.vadsPlayer({ sid: 104621, zone: zoneId, container: container, videoid: videoId, callbacks: {onError, onComplete, onStart, onClose}});
        } else {
            if (doc.vadsPlayerController[zoneId].isRunning() === false) { doc.vadsPlayerController[zoneId].start({ sid: 104621, zone: zoneId, container: container, videoid: videoId, callbacks: {onError, onComplete, onStart, onClose}}); }
        }
        
        setTimeout(() => {
            var azIndex = window.vadsActiveZones.indexOf(zoneId);
            if (azIndex !== -1) {
                window.vadsActiveZones.splice(azIndex, 1);
            }
        }, 1000);
    }
    
    if (cfg.capping && cfg.capping > 0) {
        var lr = localStorage.getItem('viads_ls_' + zoneId), time_now  = (new Date()).getTime();
        if (lr && (time_now - lr) > 60000 * cfg.capping) {            
            setTimeout(function () {
                vadsInit(!cfg.infrm && window.frameElement ? window.parent : window);
            }, cfg.delay * 1000);
        } else {
            if (!lr) setTimeout(function () { vadsInit(!cfg.infrm && window.frameElement ? window.parent : window); }, cfg.delay * 1000);           
        }
    } else {
        setTimeout(function () {
            vadsInit(!cfg.infrm && window.frameElement ? window.parent : window);
        }, cfg.delay * 1000);      
    }
};

vadsLoaderDrivers["none"] = function (zones) {};

vadsLoaderDrivers["banner"] = function(zones) {    
    function vadsInit(doc) {
        if (typeof(doc.VADSBannerRotatorInstance) === "undefined") {
            var s = doc.document.createElement("script");
            s.src = "https://rucdn.viadata.store/js/player/vads-rotator.js";
            s.type = "application/javascript";
            s.async = !0;
            s.defer = !0;
            doc.document.body.appendChild(s);
            
            var config = { sid: 104621, ver: '8', logs: !1, zones: [] };
            zones.forEach((element) => {
                var { cb, cfg } = element;
                var zconfig = { mode: cfg.type, zoneid: cb.zoneId, config: cfg };
                (new Image).src = "https://logs.viadata.store/req/site?sid=104621&uid=91933088-2129-4450-a810-8f376914e126&zone="+ cb.zoneId +"&event=init&v="+ config.ver +"&cb=" + Date.now();
                config.zones.push(zconfig);
            });
    
            window.VADSBannerRotatorQueue = window.VADSBannerRotatorQueue || [];
            window.VADSBannerRotatorQueue.push(config);
        }
    }
    vadsInit(window.frameElement ? window.parent : window);
};

window.vadsLoaderQueue = new Proxy(window.vadsLoaderQueue || [], { set(target, prop, value) { if (prop !== "length") { if (typeof value !== "function") { throw new Error("function expected"); } value.call(); } target[prop] = value; return true; } });

var runOnce = !0;
window.vadsLoader = {};
window.vadsLoader.run = function(a) {
    var vadsBanners = [];
    for (let entry of a) {
                if (vadsLoaderCfg[entry.zoneId] !== undefined) {
            if(vadsLoaderCfg[entry.zoneId].zone_type == "banner") {
                vadsBanners.push({"cfg":vadsLoaderCfg[entry.zoneId],"cb":entry});
            } else {
                if (!window.vadsActiveZones.includes(entry.zoneId)) {
                    vadsLoaderDrivers[vadsLoaderCfg[entry.zoneId].zone_type](vadsLoaderCfg[entry.zoneId], entry);
                    window.vadsActiveZones.push(entry.zoneId);
                }
            }
        }
    }
    if(vadsBanners.length > 0) {
        vadsLoaderDrivers["banner"](vadsBanners);
    }
}

if (window.vadsLoaderQueue && window.vadsLoaderQueue.length) { window.vadsLoaderQueue.forEach(function(runCall, index, object) { runCall.call(); object.splice(index, 1); }); }