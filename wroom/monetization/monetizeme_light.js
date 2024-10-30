//LIBRARY COONECT START

var hb_script = document.createElement('script');

hb_script.setAttribute('src','https://yandex.ru/ads/system/header-bidding.js');
hb_script.setAttribute('async','true');

document.head.insertAdjacentElement('afterbegin', hb_script)

var adfoxBiddersMap = {
  "astralab": "2365332",
  "buzzoola": "2365409",
  "videonow": "2365411",
  "sape": "2365419",
  "mediasniper": "2365420",
  "adfox_adsmart": "2365424",
  "myTarget": "2365426",
  "adriver": "2365427",
  "bidvol": "2365429",
  "otm": "2374742"
};
var adUnits = [];
var userTimeout = 1500;

window.YaHeaderBiddingSettings = {
  biddersMap: adfoxBiddersMap,
  adUnits: adUnits,
  timeout: userTimeout,
};

window.Ya || (window.Ya = {});
window.yaContextCb = window.yaContextCb || [];
window.Ya.adfoxCode || (window.Ya.adfoxCode = {});

window.Ya.adfoxCode.hbCallbacks || (window.Ya.adfoxCode.hbCallbacks = []);

var adfox_script = document.createElement('script');
adfox_script.setAttribute('src','https://yandex.ru/ads/system/context.js');
adfox_script.setAttribute('async','true');
document.head.appendChild(adfox_script);

var adriver_script = document.createElement('script');
adriver_script.setAttribute('src','https://content.adriver.ru/AdRiverFPS.js');
document.head.appendChild(adriver_script);



//LIBRARY CONNECT END

if (window.matchMedia('(max-width: 768px)').matches) {
    document.addEventListener("DOMContentLoaded", function(event) {

        //Add blocks to article
        const textBlock = document.querySelector(".text-block");
        const mainText = document.querySelector(".maintext")
        const artcicleBlock = document.querySelector('.text-block')
        const articleBottomBlock = document.querySelector('a[name="comments"]')
        const commentsBlock = document.querySelector(".comment2")
        const after_commentsBlock = document.querySelector('form[name="addcomment"]')
        const main_pageBlock = document.querySelector("body > div.content-page > div:nth-child(5) > div:nth-child(1) > div.col-md-8 > div.row.index-news-2 > div:nth-child(2)")
        if (textBlock != null) {

            //add mobile after cover
            const mobile_before_articleElement = document.createElement("div");
            mobile_before_articleElement.classList.add('mm_mobile_content');
            mobile_before_articleElement.setAttribute('id', 'mobile_before_article');
            mobile_before_articleElement.innerHTML = `<div id="monetizeme-mobile-inread-after-cover"></div>`;
            
            window.Ya.adfoxCode.hbCallbacks.push(function() {
                window.Ya.headerBidding.pushAdUnits([{
                    code: 'monetizeme-mobile-inread-after-cover',
                    codeType: 'combo',
                    sizes: [[300,600],[300,250],[320,50],[320,100],[320,336],[300,500],[320,250],[240,400],[320,280],[ 320, 150 ],[ 300, 150 ],[ 320, 500 ],[ 320, 480 ]],
                    bids: [ 
                    { bidder: "astralab", params: {placementId: "6440fbad8528b410c4990c67" } },
                    { bidder: "buzzoola", params: {placementId: "1247263" } },
                    { bidder: "videonow", params: {placementId: "6324759" } },
                    { bidder: "sape", params: { placementId:"844560" } },
                    { bidder: "otm", params: { placementId:"44960" } },
                    { bidder: "mediasniper", params: { placementId: "740011" }},
                    { bidder: "adfox_adsmart", params: { "p1": "cxzvx", "p2": "ul" } },
                    { bidder: "myTarget", params: { placementId: "1256671" } },
                    { bidder: "adriver", params: { placementId: "136:wroom_300x500mob_1",additional: {ext: {query: 'custom=10=136&cid=' + localStorage.getItem('adrcid')}}}},
                    { bidder: "bidvol", params: { placementId: "34829" } } ]
                }])
                window.yaContextCb.push(function() {
                    window.Ya.adfoxCode.create({
                        ownerId: 1458764,
                        sequentialLoading: true,
                        containerId: 'monetizeme-mobile-inread-after-cover',
                        onError:function(error) {
                            mobile_before_articleElement.classList.add('stub')
                        },
                        onStub: function() {
                            mobile_before_articleElement.classList.add('stub')
                        },
                        onRender: function() {
                            mobile_before_articleElement.classList.add('view')
                        },
                        params: {
                            p1: 'cztgh',
                            p2: 'inxe',
                        }
                    })
                })
            })

            textBlock.insertBefore(mobile_before_articleElement, textBlock.childNodes[2]);
        }

    })
} else {
    document.addEventListener("DOMContentLoaded", function(event) {
        //Add blocks to article
        const textBlock = document.querySelector(".text-block");
        const mainText = document.querySelector(".maintext")
        const artcicleBlock = document.querySelector('.text-block')
        const articleBottomBlock = document.querySelector('a[name="comments"]')
        const commentsBlock = document.querySelector(".comment2")
        const after_commentsBlock = document.querySelector('form[name="addcomment"]')
        const main_pageBlock = document.querySelector("body > div.content-page > div:nth-child(5) > div:nth-child(1) > div.col-md-8 > div.row.index-news-2 > div:nth-child(2)")


        if (textBlock != null) {

            //add mobile after cover
            const desktop_before_articleElement = document.createElement("div");
            desktop_before_articleElement.classList.add('mm_desktop_content');
            desktop_before_articleElement.setAttribute('id', 'desktop_before_article');
            desktop_before_articleElement.innerHTML = `<div id="monetizeme-desktop-inread-after-cover" class="adfox_inread_desktop"></div>`;

            window.Ya.adfoxCode.hbCallbacks.push(function() {
                window.Ya.headerBidding.pushAdUnits([{
                    code: 'monetizeme-desktop-inread-after-cover',
                    codeType: 'combo',
                    sizes: [ [ 728, 90 ], [ 300, 250 ], [ 300, 100], [ 300, 300 ], [ 320, 250 ], [ 336, 280 ], [ 580, 400 ] ],
                    bids: [ 
                    { bidder: "astralab", params: {placementId: "6440fa938528b410c4990c64" } },
                    { bidder: "buzzoola", params: {placementId: "1247254" } },
                    { bidder: "videonow", params: {placementId: "6314928" } },
                    { bidder: "sape", params: { placementId:"844550" } },
                    { bidder: "otm", params: { placementId:"44949" } },
                    { bidder: "mediasniper", params: { placementId: "740003" }},
                    { bidder: "adfox_adsmart", params: { "p1": "cxzvo", "p2": "ul" } },
                    { bidder: "myTarget", params: { placementId: "1255780" } },
                    { bidder: "adriver", params: { placementId: "136:wroom_300x250_1",additional: {ext: {query: 'custom=10=136&cid=' + localStorage.getItem('adrcid')}} } },
                    { bidder: "bidvol", params: { placementId: "34820" } } ]
                }])
                window.yaContextCb.push(function() {
                    window.Ya.adfoxCode.create({
                        ownerId: 1458764,
                        sequentialLoading: true,
                        containerId: 'monetizeme-desktop-inread-after-cover',
                        onError:function(error) {
                            desktop_before_articleElement.classList.add('stub')
                        },
                        onStub: function() {
                            desktop_before_articleElement.classList.add('stub')
                        },
                        onRender: function() {
                            desktop_before_articleElement.classList.add('view')
                        },
                        params: {
                            p1: 'cztgg',
                            p2: 'indo'
                        },

                    })
                })
            })
            




            textBlock.insertBefore(desktop_before_articleElement, textBlock.childNodes[2]);

            }
    })

}