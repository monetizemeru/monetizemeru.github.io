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

var css = '.desktop_placeholder{min-height:320px;background: #f8f9fa;width: calc(100% - 2px);display: flex;justify-content: center;margin: 40px 0px;padding: 20px 20px;} .mobile_placeholder{min-height:300px;background: #f8f9fa;width: calc(100% - 2px);display: flex;justify-content: center;margin: 40px 0px;padding: 20px 0px;}',
    head = document.head || document.getElementsByTagName('head')[0],
    style = document.createElement('style');

head.appendChild(style);

style.type = 'text/css';
if (style.styleSheet){
  // This is required for IE8 and below.
  style.styleSheet.cssText = css;
} else {
  style.appendChild(document.createTextNode(css));
}

//Desktop inread functions

function add_dektop_banners_fc(){
    const article_block = document.querySelector('[itemprop = articleBody]')
    if (article_block != null ) {
                    const children = article_block.children;
                    var len = children.length;
                    var step = len / 2
                    if (len < 16){
                        var len = 3 
                    } 
                    for (let i = 2; i < len; i += Math.trunc(step)) {
                        const desktop_in_article = document.createElement("div");
                        const mmId = Math.random().toString(36).substr(2, 9)
                        const mm_adfox_id = 'monetizeme-desktop-inread-article-' + mmId
                        desktop_in_article.classList.add('mm_desktop_content');
                        desktop_in_article.setAttribute('id', 'desktop_in_article_' + mmId);
                        desktop_in_article.setAttribute('class', 'desktop_placeholder');
                        //desktop_in_article.setAttribute('style', '    background: #f4f2ee;width: calc(100% - 2px);display: flex;justify-content: center;margin: 40px 0px;padding: 20px 20px;');
                        desktop_in_article.innerHTML = "<div id='monetizeme-desktop-inread-article-" + mmId + "'></div>";

                        window.Ya.adfoxCode.hbCallbacks.push(function() {
                            window.Ya.headerBidding.pushAdUnits([{
                                code: mm_adfox_id,
                                codeType: 'combo',
                                sizes: [[0,0],[300,250],[320,250],[240,400],[320,280]],
                                bids: [
                                { bidder: "astralab", params: {placementId: "64ef1716ae8a5fa962f15923" } }, 
                                { bidder: "buzzoola", params: {placementId: "1253131" } },
                                { bidder: "videonow", params: {placementId: "6629242" } },
                                { bidder: "sape", params: { placementId:"859453" } },
                                { bidder: "otm", params: { placementId:"48587" } },
                                { bidder: "mediasniper", params: { placementId: "1079001" }},
                                { bidder: "adfox_adsmart", params: { "p1": "czfey", "p2": "ul" } },
                                { bidder: "myTarget", params: { placementId: "1364546" } },
                                { bidder: "adriver", params: { placementId: "136:peopletalk_728x90",additional: {ext: {query: 'custom=10=136&cid=' + localStorage.getItem('adrcid')}} } }]
                            }])
                            window.yaContextCb.push(function() {
                                window.Ya.adfoxCode.create({
                                    ownerId: 1458764,
                                    sequentialLoading: true,
                                    containerId: mm_adfox_id,
                                    onError:function(error) {
                                        document.getElementById('desktop_in_article_' + mmId).classList.remove('desktop_placeholder')
                                    },
                                    params: {
                                        pp: 'g',
                                        ps: 'gsuv',
                                        p2: 'indo'
                                    },
                                    lazyLoad: {
                                      fetchMargin: 350,
                                      mobileScaling: 2
                                    }
                                })
                            })
                        })

                        article_block.insertBefore(desktop_in_article, children[i]);

                    var elementsFollowingPasted = Array.from(article_block.children).slice(
                        Array.from(article_block.children).indexOf(document.getElementById('desktop_in_article_' + mmId)) + 1,
                        Array.from(article_block.children).indexOf(document.getElementById('desktop_in_article_' + mmId)) + 7);

                    if (elementsFollowingPasted.length <= 5){
                            document.getElementById('desktop_in_article_' + mmId).remove()
                        }

                    }
                    
                }

}


function add_dektop_banners_sc(){
    // Target the container element
    const container = document.querySelector('main');

    // Create a MutationObserver instance
    const observer = new MutationObserver(function(mutationsList) {
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                // Loop through added nodes and check if they are <div> elements
                for (const addedNode of mutation.addedNodes) {
                    if (addedNode instanceof HTMLElement && addedNode.tagName === 'DIV') {
                        //console.log('A new <div> element has been added to the container:', addedNode);
                        console.log(addedNode.querySelector(".js__buzzoola"))
                        const article_new = addedNode.querySelector(".js__buzzoola");
                        if (article_new != null && addedNode.classList.contains('exclusive') != true) {
                            console.log('banner_add')
                                        const children = article_new.children;
                                        var len = children.length;
                                        var step = len / 2
                                        if (len < 16){
                                            var len = 3 
                                        } 
                                        for (let i = 2; i < len; i += Math.trunc(step)) {
                                            const desktop_in_article = document.createElement("div");
                                            const mmId = Math.random().toString(36).substr(2, 9)
                                            const mm_adfox_id = 'monetizeme-desktop-inread-article-' + mmId
                                            desktop_in_article.classList.add('mm_desktop_content');
                                            desktop_in_article.setAttribute('id', 'desktop_in_article_' + mmId);
                                            desktop_in_article.setAttribute('class', 'desktop_placeholder');
                                            //desktop_in_article.setAttribute('style', '    background: #f4f2ee;width: calc(100% - 2px);display: flex;justify-content: center;margin: 40px 0px;padding: 20px 20px');
                                            desktop_in_article.innerHTML = "<div id='monetizeme-desktop-inread-article-" + mmId + "'></div>";

                                            window.Ya.adfoxCode.hbCallbacks.push(function() {
                                                window.Ya.headerBidding.pushAdUnits([{
                                                    code: mm_adfox_id,
                                                    codeType: 'combo',
                                                    sizes: [[0,0],[300,250],[320,250],[240,400],[320,280]],
                                                    bids: [
                                                    { bidder: "astralab", params: {placementId: "64ef1716ae8a5fa962f15923" } }, 
                                                    { bidder: "buzzoola", params: {placementId: "1253131" } },
                                                    { bidder: "videonow", params: {placementId: "6629242" } },
                                                    { bidder: "sape", params: { placementId:"859453" } },
                                                    { bidder: "otm", params: { placementId:"48587" } },
                                                    { bidder: "mediasniper", params: { placementId: "1079001" }},
                                                    { bidder: "adfox_adsmart", params: { "p1": "czfey", "p2": "ul" } },
                                                    { bidder: "myTarget", params: { placementId: "1364546" } },
                                                    { bidder: "adriver", params: { placementId: "136:peopletalk_728x90",additional: {ext: {query: 'custom=10=136&cid=' + localStorage.getItem('adrcid')}} } }]
                                                }])
                                                window.yaContextCb.push(function() {
                                                    window.Ya.adfoxCode.create({
                                                        ownerId: 1458764,
                                                        sequentialLoading: true,
                                                        containerId: mm_adfox_id,
                                                        onError:function(error) {
                                                            document.getElementById('desktop_in_article_' + mmId).classList.remove('desktop_placeholder')
                                                        },
                                                        params: {
                                                            pp: 'g',
                                                            ps: 'gsuv',
                                                            p2: 'indo'
                                                        },
                                                        lazyLoad: {
                                                          fetchMargin: 350,
                                                          mobileScaling: 2
                                                        }
                                                    })
                                                })
                                            })

                                            article_new.insertBefore(desktop_in_article, children[i]);

                                        var elementsFollowingPasted = Array.from(article_new.children).slice(
                                            Array.from(article_new.children).indexOf(document.getElementById('desktop_in_article_' + mmId)) + 1,
                                            Array.from(article_new.children).indexOf(document.getElementById('desktop_in_article_' + mmId)) + 7);

                                        if (elementsFollowingPasted.length <= 4){
                                                document.getElementById('desktop_in_article_' + mmId).remove()
                                            }

                                        }
                                        
                                    }

                    }
                }
            }
        }
    });

    // Configure the observer to watch for additions to the container's children
    observer.observe(container, { childList: true });
}


//Mobile inread functions

function add_mobile_banners_fc(){
    const article_block = document.querySelector('[itemprop = articleBody]')
    if (article_block != null ) {
                    const children = article_block.children;
                    var len = children.length;
                    var step = len / 2
                    if (len < 16){
                        var len = 3 
                    } 
                    for (let i = 2; i < len; i += Math.trunc(step)) {
                        const desktop_in_article = document.createElement("div");
                        const mmId = Math.random().toString(36).substr(2, 9)
                        const mm_adfox_id = 'monetizeme-mobile-inread-article-' + mmId
                        desktop_in_article.classList.add('mm_mobile_content');
                        desktop_in_article.setAttribute('id', 'mobile_in_article_' + mmId);
                        desktop_in_article.setAttribute('class', 'mobile_placeholder');
                        //desktop_in_article.setAttribute('style', '    background: #f4f2ee;width: calc(100% - 2px);display: flex;justify-content: center;margin: 40px 0px;padding: 20px 20px;');
                        desktop_in_article.innerHTML = "<div id='monetizeme-mobile-inread-article-" + mmId + "'></div>";

                        window.Ya.adfoxCode.hbCallbacks.push(function() {
                            window.Ya.headerBidding.pushAdUnits([{
                                code: mm_adfox_id,
                                codeType: 'combo',
                                sizes: [[0,0],[300,250],[320,50],[320,100],[320,336],[300,500],[320,250],[240,400],[320,280],[ 320, 150 ],[ 300, 150 ],[ 320, 500 ],[ 320, 480 ]],
                                bids: [
                                { bidder: "astralab", params: {placementId: "64ef1743ae8a5fa962f15924" } }, 
                                { bidder: "buzzoola", params: {placementId: "1253132" } },
                                { bidder: "videonow", params: {placementId: "6630164" } },
                                { bidder: "sape", params: { placementId:"859454" } },
                                { bidder: "otm", params: { placementId:"48586" } },
                                { bidder: "mediasniper", params: { placementId: "1079002" }},
                                { bidder: "adfox_adsmart", params: { "p1": "czfez", "p2": "ul" } },
                                { bidder: "myTarget", params: { placementId: "1364548" } },
                                { bidder: "adriver", params: { placementId: "136:peopletalk_300x250",additional: {ext: {query: 'custom=10=136&cid=' + localStorage.getItem('adrcid')}} } }]
                            }])
                            window.yaContextCb.push(function() {
                                window.Ya.adfoxCode.create({
                                    ownerId: 1458764,
                                    sequentialLoading: true,
                                    containerId: mm_adfox_id,
                                    onError:function(error) {
                                        document.getElementById('mobile_in_article_' + mmId).classList.remove('mobile_placeholder')
                                    },
                                    params: {
                                        pp: 'g',
                                        ps: 'gsuv',
                                        p2: 'inxe'
                                    },
                                    lazyLoad: {
                                      fetchMargin: 300,
                                      mobileScaling: 2
                                    }
                                })
                            })
                        })

                        article_block.insertBefore(desktop_in_article, children[i]);

                    var elementsFollowingPasted = Array.from(article_block.children).slice(
                        Array.from(article_block.children).indexOf(document.getElementById('mobile_in_article_' + mmId)) + 1,
                        Array.from(article_block.children).indexOf(document.getElementById('mobile_in_article_' + mmId)) + 7);

                    if (elementsFollowingPasted.length <= 5){
                            document.getElementById('mobile_in_article_' + mmId).remove()
                        }

                    }
                    
                }

}


function add_mobile_banners_sc(){
    // Target the container element
    const container = document.querySelector('main');

    // Create a MutationObserver instance
    const observer = new MutationObserver(function(mutationsList) {
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                // Loop through added nodes and check if they are <div> elements
                for (const addedNode of mutation.addedNodes) {
                    if (addedNode instanceof HTMLElement && addedNode.tagName === 'DIV') {
                        //console.log('A new <div> element has been added to the container:', addedNode);
                        console.log(addedNode.querySelector(".js__buzzoola"))
                        const article_new = addedNode.querySelector(".js__buzzoola");
                        if (article_new != null && addedNode.classList.contains('exclusive') != true) {
                            console.log('banner_add')
                                        const children = article_new.children;
                                        var len = children.length;
                                        var step = len / 2
                                        if (len < 16){
                                            var len = 3 
                                        } 
                                        for (let i = 2; i < len; i += Math.trunc(step)) {
                                            const desktop_in_article = document.createElement("div");
                                            const mmId = Math.random().toString(36).substr(2, 9)
                                            const mm_adfox_id = 'monetizeme-mobile-inread-article-' + mmId
                                            desktop_in_article.classList.add('mm_mobile_content');
                                            desktop_in_article.setAttribute('id', 'mobile_in_article_' + mmId);
                                            desktop_in_article.setAttribute('class', 'mobile_placeholder');
                                            //desktop_in_article.setAttribute('style', '    background: #f4f2ee;width: calc(100% - 2px);display: flex;justify-content: center;margin: 40px 0px;padding: 20px 20px');
                                            desktop_in_article.innerHTML = "<div id='monetizeme-mobile-inread-article-" + mmId + "'></div>";

                                            window.Ya.adfoxCode.hbCallbacks.push(function() {
                                                window.Ya.headerBidding.pushAdUnits([{
                                                    code: mm_adfox_id,
                                                    codeType: 'combo',
                                                    sizes: [[0,0],[300,250],[320,50],[320,100],[320,336],[300,500],[320,250],[240,400],[320,280],[ 320, 150 ],[ 300, 150 ],[ 320, 500 ],[ 320, 480 ]],
                                                    bids: [
                                                    { bidder: "astralab", params: {placementId: "64ef1743ae8a5fa962f15924" } }, 
                                                    { bidder: "buzzoola", params: {placementId: "1253132" } },
                                                    { bidder: "videonow", params: {placementId: "6630164" } },
                                                    { bidder: "sape", params: { placementId:"859454" } },
                                                    { bidder: "otm", params: { placementId:"48586" } },
                                                    { bidder: "mediasniper", params: { placementId: "1079002" }},
                                                    { bidder: "adfox_adsmart", params: { "p1": "czfez", "p2": "ul" } },
                                                    { bidder: "myTarget", params: { placementId: "1364548" } },
                                                    { bidder: "adriver", params: { placementId: "136:peopletalk_300x250",additional: {ext: {query: 'custom=10=136&cid=' + localStorage.getItem('adrcid')}} } }]
                                                }])
                                                window.yaContextCb.push(function() {
                                                    window.Ya.adfoxCode.create({
                                                        ownerId: 1458764,
                                                        sequentialLoading: true,
                                                        containerId: mm_adfox_id,
                                                        onError:function(error) {
                                                            document.getElementById('mobile_in_article_' + mmId).classList.remove('mobile_placeholder')
                                                        },
                                                        params: {
                                                            pp: 'g',
                                                            ps: 'gsuv',
                                                            p2: 'inxe'
                                                        },
                                                        lazyLoad: {
                                                          fetchMargin: 200,
                                                          mobileScaling: 2
                                                        }
                                                    })
                                                })
                                            })

                                            article_new.insertBefore(desktop_in_article, children[i]);

                                        var elementsFollowingPasted = Array.from(article_new.children).slice(
                                            Array.from(article_new.children).indexOf(document.getElementById('mobile_in_article_' + mmId)) + 1,
                                            Array.from(article_new.children).indexOf(document.getElementById('mobile_in_article_' + mmId)) + 7);

                                        if (elementsFollowingPasted.length <= 4){
                                                document.getElementById('mobile_in_article_' + mmId).remove()
                                            }

                                        }
                                        
                                    }

                    }
                }
            }
        }
    });

    // Configure the observer to watch for additions to the container's children
    observer.observe(container, { childList: true });
}


if (window.matchMedia('(min-width: 768px)').matches) {
    document.addEventListener("DOMContentLoaded", function(event) {
        var first_div = document.querySelector('.js__read-more-article')
        if (first_div.querySelector('article').classList.contains('interview-content-wrapper') != true){
            add_dektop_banners_fc()
        }
        add_dektop_banners_sc()
    });
}else{
    document.addEventListener("DOMContentLoaded", function(event) {
        var first_div = document.querySelector('.js__read-more-article')
        if (first_div.querySelector('article').classList.contains('interview-content-wrapper') != true){
            add_mobile_banners_fc()
        }
        add_mobile_banners_sc()
    });
}