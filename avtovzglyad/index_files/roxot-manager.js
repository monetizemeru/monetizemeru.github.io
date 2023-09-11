(function (c) {
    if (isEngineInited()){
        return;
    }

    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = 1;
    script.src = c.managerUrl;
    script.dataset.roxotInited = 'true';

    let head = document.getElementsByTagName('head')[0];
    head.insertBefore(script, head.firstChild);

    window.rom = window.rom || {cmd: [], icmd: []};
    window.rom.icmd = window.rom.icmd || [];
    window.rom.icmd.push(c);

    function isEngineInited(){
        return  document.querySelectorAll('[data-roxot-inited]').length;
    }
})({"publisherId":"81cbd0d7-ad22-4465-bee1-efc2cbf3e548","publisher":"MK.ru","adBlockMode":"main","iframeSspList":[],"managerUrl":"https:\/\/cdn.skcrtxr.com\/wrapper\/js\/common-engine.js?v=s-35f76566-2ddb-4a81-812f-350836959d68","wrapperUrl":"https:\/\/cdn.skcrtxr.com\/wrapper\/js\/wrapper.js?v=s-35f76566-2ddb-4a81-812f-350836959d68","placementConfigTemplate":"https:\/\/cdn.skcrtxr.com\/wrapper-builder\/placement\/__PLACEMENT_ID__?v=d-1689150724","gfsPlacementOptionsTemplate":"https:\/\/cdn.skcrtxr.com\/wrapper-builder\/gfs-placement\/__PLACEMENT_ID__?v=d-1689150724","isLanguageSpecific":false,"hostConfig":{"mk.ru":{"wrapperOptions":[],"isAcceptableAdsEnabled":false},"womanhit.ru":{"wrapperOptions":[],"isAcceptableAdsEnabled":false},"sportmk.ru":{"wrapperOptions":[],"isAcceptableAdsEnabled":false},"avtovzglyad.ru":{"wrapperOptions":[],"isAcceptableAdsEnabled":false},"ohotniki.ru":{"wrapperOptions":[],"isAcceptableAdsEnabled":false}},"isBrowserSpecific":false,"isOsSpecific":false,"isDeviceTypeSpecific":false,"isGeoSpecific":false,"isGetParamSpecific":false,"dynamicUrlTemplate":"","wrapperConfig":{"monetizationStatsIntegration":{"enabled":true,"requestSettings":{"isNeedToSend":true,"sampleCoefficient":1},"impressionSettings":{"isNeedToSend":true,"sampleCoefficient":1}},"roxotYaMetric":{"enabled":true,"counterId":88477929},"engineFileName":"roxot-common-engine.js","adfox":{"hb":{"timeout":1000}},"prebid":{"path":"https:\/\/cdn.skcrtxr.com\/wrapper\/js\/prebid.js?v=s-35f76566-2ddb-4a81-812f-350836959d68"},"videojsLibs":{"path":"https:\/\/cdn.skcrtxr.com\/wrapper\/js\/video-libs.js?v=s-35f76566-2ddb-4a81-812f-350836959d68"},"pageUrlVariableName":"roxotPlusPageUrl","stubVideoPath":"https:\/\/cdn.skcrtxr.com\/wrapper\/js\/video-ad?v=s-35f76566-2ddb-4a81-812f-350836959d68","adfoxIntegrationType":"common","yandexIntegrationType":"common","openRtbHost":"https:\/\/openrtb.skcrtxr.com"},"lazyLoading":[],"geoSpecificUrl":"https:\/\/geo-worker.skcrtxr.com\/api\/geo\/region","openRtbApiGetUserInfoUrl":"https:\/\/skcrtxr.com\/open-rtb-api\/get-user-bidders-info","syncCookiesUrl":"https:\/\/skcrtxr.com\/user-sync-api\/sync","umeUrl":"https:\/\/bidder.skcrtxr.com\/get-imp"})