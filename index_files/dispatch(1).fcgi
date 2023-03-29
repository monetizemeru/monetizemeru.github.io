function x17() {
    // initialize the ad position
    var x1cl, x1ey = x1bb.x1cj();

    x1bb.x1h1.x1v0 = function(){
        var x1wi = w$.x1vV('img', this.x1cu, { width: this.x1eJ + 'px', height : this.x1eK + 'px', outline : 'none', border : '0px', padding : '0px' });
        var x1wf = w$.x1vV('div', undefined, { 'clear': 'none', 'z-index': '-1', float: 'none', display: 'inline', position: 'absolute' });
        w$.x1v2(x1wf, x1bb.x1bs);
        x1wf.appendChild(x1wi);
        return x1wf;
    }

    // define some ad-position config vars
    x1d.x1ie = x1bb.x1cO(x1d.x1ie,'wuid=&retargeting=&');
    x1ey.x1fN = 'https://cstatic.weborama.fr/weborama/images/';
    x1ey.x1lp = '0';

    adperfobj.zindex = adperfobj.zindex || 0 || 214748360;
    x1bb.x1br = 0.50;

    adperfobj.clicks = new Array();
    adperfobj.clicks[0] = 'https://wcm-ru.frontend.weborama.fr/fcgi-bin/dispatch.fcgi?a.A=cl&a.si=8935&a.te=6323&a.aap=0&a.agi=141&g.lu=https%3A%2F%2Fwww.beeline.ru%2Fcustomers%2Fproducts%2Fquality%2F%3Futm_source%3Dgpm%26utm_medium%3Dcpm%26utm_content%3Dvideo_all_rf%26utm_term%3D144723%26utm_campaign%3Dmedia_beeline_kachestvo_svyazi1_23';
    try{

        adperfobj.imptrackers = new Array(
                'https://www.tns-counter.ru/V13a****mediavest_ad/ru/UTF-8/tmsec=mediavest_cid1100356-posid2163542/46655'
        );

        adperfobj.clicktrackers = (new Array(
                
        ).concat(adperfobj.clicktrackers));

        adperfobj.eventtrackers = (new Array(
                
        ).concat(adperfobj.eventtrackers));

    }catch(scr_e){}

    x1ey.addTrackers(adperfobj);
    x1ey.addClicks(adperfobj);

    // RENDER AD ELEMENTS + SCENES!

x1cl = new x1bb.x1hW();
x1cl.x1c(x1ey, 0, 'transp.gif', adperfobj.width, adperfobj.height, '', '', '');
x1ey.x1gG(x1cl, '', 3, ''); 

    // render the ad position
    x1ey.x1gQ();
}

x1L('adperf_core_' + adperf_version + '_scrambled.js');

var pNode, nNode = document.createElement("script");
nNode.src='https://j.adlooxtracking.ru/ads/js/tfav_adl_55.js#platform=30&scriptname=adl_55&tagid=62&typejs=tvaf&fwtype=1&creatype=2&targetelt=&custom1area=50&custom1sec=1&custom2area=0&custom2sec=0&id11=&id12=russia&id13=display&id14=$ADLOOX_WEBSITE&id1=1199&id2=87&id3=&id4=&id5=6335&id6=9&id7=8935';
nNode.type='text/javascript';
if (adperfobj.launchScriptId && (pNode=document.getElementById(adperfobj.launchScriptId))) {
  1;
} else {
  pNode=document.getElementsByTagName("script");
  pNode = pNode[pNode.length-1];
}
pNode.parentNode.insertBefore(nNode,pNode.nextSibling);

var pNode, nNode = document.createElement("script");
nNode.src='https://cstatic.weborama.fr/js/topics/topics.js';
nNode.type='text/javascript';
if (adperfobj.launchScriptId && (pNode=document.getElementById(adperfobj.launchScriptId))) {
  1;
} else {
  pNode=document.getElementsByTagName("script");
  pNode = pNode[pNode.length-1];
}
pNode.parentNode.insertBefore(nNode,pNode.nextSibling);
