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




function changeDivContentMobile(callback) {
    //MOBILE FULLSCREEN
    var body = document.querySelector("body")
    var mobile_fs = document.createElement('div');
    mobile_fs.setAttribute('id', 'monetizeme-mobile-fs');
    document.body.insertAdjacentElement('afterbegin', mobile_fs)

    //Adding top sticky banner and make him scroll
    stickyTop = document.createElement('div');
    stickyTop.classList.add('monetizeme-block-top');
    stickyTop.setAttribute('id', 'sticky_top');
    stickyTop.innerHTML = `
    <div class="button-top-close"></div>
    <button class="mm_button_top">^</button>
    <div id="monetizeme-sticky-top"></div>`; 
    document.body.insertAdjacentElement('afterbegin', stickyTop)

    //Adding bottom sticky banner and make him scroll
    stickyBottom = document.createElement('div');
    stickyBottom.classList.add('monetizeme-block-bottom');
    stickyBottom.setAttribute('id', 'sticky_bottom');
    stickyBottom.innerHTML = `
    <div class="button-bottom-close"></div>
    <button class="mm_button_bottom ">^</button>
    <div id="monetizeme-sticky-bottom"></div>`;
    document.body.insertAdjacentElement('afterbegin', stickyBottom)

    //top sticky banner
    var topBlock = document.querySelector('.monetizeme-block-top');
    var topButton = document.querySelector('.button-top-close');
    var isTopBlockCollapsed = false;

    //bottom sticky banner
    var bottomBlock = document.querySelector('.monetizeme-block-bottom');
    var bottomButton = document.querySelector('.button-bottom-close');
    var isBottomBlockCollapsed = false;

    var lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        var currentScrollTop = window.pageYOffset;

        // Top block behavior
        if (currentScrollTop >= lastScrollTop && !isTopBlockCollapsed && window.scrollY >= 200) {
            topBlock.classList.add('collapsed');
            isTopBlockCollapsed = true;
        } else if (currentScrollTop < lastScrollTop && isTopBlockCollapsed) {
            topBlock.classList.remove('collapsed');
            isTopBlockCollapsed = false;
        }

        // Bottom block behavior
        if (currentScrollTop <= (lastScrollTop - 5) && !isBottomBlockCollapsed) {
            bottomBlock.classList.add('collapsed');
            isBottomBlockCollapsed = true;
        } else if (currentScrollTop > lastScrollTop && isBottomBlockCollapsed) {
            bottomBlock.classList.remove('collapsed');
            isBottomBlockCollapsed = false;
        }


        lastScrollTop = currentScrollTop;
    });

    if (isTopBlockCollapsed == false) {
        body.style.paddingTop = "120px"
    }


    topButton.addEventListener('click', function() {
        document.getElementById("sticky_top").remove();
    });


    bottomButton.addEventListener('click', function() {
        document.getElementById("sticky_bottom").remove();
    });
    if (document.getElementById("sticky_top") <= 1) {
        topButton.style.display = "none"
    } else {
        topButton.style.display = "block"
    }

    if (textBlock != null) {
        //add mobile after cover
        mobile_before_articleElement = document.createElement("div");
        mobile_before_articleElement.classList.add('mm_mobile_content');
        mobile_before_articleElement.setAttribute('id', 'mobile_before_article');
        mobile_before_articleElement.innerHTML = `<div id="monetizeme-mobile-inread-after-cover"></div>`;
        textBlock.insertBefore(mobile_before_articleElement, textBlock.childNodes[1]);

        //add mobile in article each 4 elements
        if (artcicleBlock != null) {
            var children = artcicleBlock.children;
            var len = children.length;
            for (let i = 4; i < len; i += 5) {
                mobile_in_article = document.createElement("div");
                var mmId = Math.random().toString(36).substr(2, 9)
                mm_article_id = 'monetizeme-mobile-inread-article-' + mmId
                mobile_in_article.classList.add('mm_mobile_content');
                mobile_in_article.setAttribute('id', 'mobile_in_article_' + mmId);
                mobile_in_article.innerHTML = "<div id='" + mm_article_id + "'></div>";
                artcicleBlock.insertBefore(mobile_in_article, children[i]);
            }
        }else{
                var children = mainText.children;
                var len = children.length;
                for (let i = 4; i < len; i += 5) {
                    mobile_in_article = document.createElement("div");
                    var mmId = Math.random().toString(36).substr(2, 9)
                    var mm_article_id = 'monetizeme-mobile-inread-article-' + mmId
                    mobile_in_article.classList.add('mm_mobile_content');
                    mobile_in_article.setAttribute('id', 'mobile_in_article_' + mmId);
                    mobile_in_article.innerHTML = "<div id='" + mm_article_id + "'></div>";
                    mainText.insertBefore(mobile_in_article, children[i]);
            }
        }

        //add mobile after article
        if (articleBottomBlock != null) {
            mobile_article_bottom = document.createElement("div");
            mobile_article_bottom.classList.add('mm_mobile_content');
            mobile_article_bottom.setAttribute('id', 'mobile_after_article');
            mobile_article_bottom.innerHTML = `<div id="monetizeme-mobile-inread-after-article"></div>`;
            articleBottomBlock.parentNode.insertBefore(mobile_article_bottom, articleBottomBlock);

        }


    }
    

    //Add blocks to comments
    if (commentsBlock != null) {
        var parent = commentsBlock;
        var children_comments = parent.querySelectorAll('.comment-item');
        for (var i = 4; i < children_comments.length; i += 4) {
            mobile_in_comments = document.createElement('div');
            var mmId = Math.random().toString(36).substr(2, 9)
            mm_comment_id = 'monetizeme-mobile-inread-comments-' + mmId
            mobile_in_comments.classList.add('mm_mobile_content');
            mobile_in_comments.setAttribute('id', 'mobile_in_comments_' + mmId);
            mobile_in_comments.innerHTML = "<div id='" + mm_comment_id + "'></div>";
            parent.insertBefore(mobile_in_comments, children_comments[i]);
        }
        mobile_comments_bottom = document.createElement("div");
        mobile_comments_bottom.classList.add('mm_mobile_content');
        mobile_comments_bottom.setAttribute('id', 'mobile_after_comments');
        mobile_comments_bottom.innerHTML = `<div id="monetizeme-mobile-after-comments"></div>`;
        after_commentsBlock.insertAdjacentElement("afterend", mobile_comments_bottom);
    }



    callback();
}

function onContentChangeMobile() {

    //MOBILE FS
    window.yaContextCb.push(()=>{
        Ya.adfoxCode.create({
            ownerId: 1458764,
                sequentialLoading: true,
                containerId: 'monetizeme-mobile-fs',
                params: {
                    p1: 'cxykf',
                    p2: 'ihud'
                }
            })
    })

    //MOBILE STUCKY TOP

    window.Ya.adfoxCode.hbCallbacks.push(function() {
        window.Ya.headerBidding.pushAdUnits([{
            code: 'monetizeme-sticky-top',
            codeType: 'combo',
            sizes: [ [ 320, 50 ], [ 320, 100 ], [ 300, 100 ], [ 300, 50 ], [ 320, 150 ], [ 300, 150 ] ],
            bids: [ 
            { bidder: "astralab", params: {placementId: "6440fac98528b410c4990c65" } },
            { bidder: "buzzoola", params: {placementId: "1247261" } },
            { bidder: "videonow", params: {placementId: "6322246" } },
            { bidder: "sape", params: { placementId:"844558" } },
            { bidder: "otm", params: { placementId:"44955" } },
            { bidder: "mediasniper", params: { placementId: "740009" }},
            { bidder: "myTarget", params: { placementId: "1256667" } },
            { bidder: "adriver", params: { placementId: "136:wroom_320x100mob",additional: {ext: {query: 'custom=10=136&cid=' + localStorage.getItem('adrcid')}}}},
            { bidder: "bidvol", params: { placementId: "34827" } } ]
        }])
        window.yaContextCb.push(function() {
            window.Ya.adfoxCode.create({
                ownerId: 1458764,
                sequentialLoading: true,
                containerId: 'monetizeme-sticky-top',
                onError:function(error) {
                    stickyTop.classList.add('stub')
                },
                onStub: function() {
                    stickyTop.classList.add('stub')
                },
                onRender: function() {
                    stickyTop.classList.add('view')
                },
                params: {
                    p1: 'cztgt',
                    p2: 'iqhq',
                }
            })
        })
    })

    //sticky bottom
    window.Ya.adfoxCode.hbCallbacks.push(function() {
        window.Ya.headerBidding.pushAdUnits([{
            code: 'monetizeme-sticky-bottom',
            codeType: 'combo',
            sizes: [ [ 320, 50 ], [ 320, 100 ], [ 300, 100 ], [ 300, 50 ], [ 320, 150 ], [ 300, 150 ], [ 300, 250 ], [ 0, 0 ] ],
            bids: [ 
            { bidder: "astralab", params: {placementId: "6440faf88528b410c4990c66" } },
            { bidder: "buzzoola", params: {placementId: "1247262" } },
            { bidder: "videonow", params: {placementId: "6323752" } },
            { bidder: "sape", params: { placementId:"844559" } },
            { bidder: "otm", params: { placementId:"44956" } },
            { bidder: "mediasniper", params: { placementId: "740010" }},
            { bidder: "adfox_adsmart", params: { "p1": "cxzvu", "p2": "hhuq" } },
            { bidder: "myTarget", params: { placementId: "1256669" } },
            { bidder: "adriver", params: { placementId: "136:wroom_300x250mob",additional: {ext: {query: 'custom=10=136&cid=' + localStorage.getItem('adrcid')}}}},
            { bidder: "bidvol", params: { placementId: "34828" } } ]
        }])
        window.yaContextCb.push(function() {
            window.Ya.adfoxCode.create({
                ownerId: 1458764,
                sequentialLoading: true,
                containerId: 'monetizeme-sticky-bottom',
                onError:function(error) {
                    stickyBottom.classList.add('stub')
                },
                onStub: function() {
                    stickyBottom.classList.add('stub')
                },
                onRender: function() {
                    stickyBottom.classList.add('view')
                },
                params: {
                    p1: 'cztgu',
                    p2: 'iqhr',
                }
            })
        })
    })
    // MOBILE AFTER COVER
    if (textBlock != null) {
            window.Ya.adfoxCode.hbCallbacks.push(function() {
                window.Ya.headerBidding.pushAdUnits([{
                    code: 'monetizeme-mobile-inread-after-cover',
                    codeType: 'combo',
                    sizes: [[0,0],[300,600],[300,250],[320,50],[320,100],[320,336],[300,500],[320,250],[240,400],[320,280],[ 320, 150 ],[ 300, 150 ],[ 320, 500 ],[ 320, 480 ]],
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
        //MOBILE IN ARTICLE
        if (artcicleBlock != null) {
            window.Ya.adfoxCode.hbCallbacks.push(function() {
                window.Ya.headerBidding.pushAdUnits([{
                    code: mm_article_id,
                    codeType: 'combo',
                    sizes: [[0,0],[300,600],[300,250],[320,50],[320,100],[320,336],[300,500],[320,250],[240,400],[320,280],[ 320, 150 ],[ 300, 150 ],[ 320, 500 ],[ 320, 480 ]],
                    bids: [
                    { bidder: "astralab", params: {placementId: "64411d898528b410c4990c68" } }, 
                    { bidder: "buzzoola", params: {placementId: "1247264" } },
                    { bidder: "videonow", params: {placementId: "6325564" } },
                    { bidder: "sape", params: { placementId:"844561" } },
                    { bidder: "otm", params: { placementId:"44961" } },
                    { bidder: "mediasniper", params: { placementId: "740012" }},
                    { bidder: "adfox_adsmart", params: { "p1": "cxzvy", "p2": "ul" } },
                    { bidder: "myTarget", params: { placementId: "1256674" } },
                    { bidder: "adriver", params: { placementId: "136:wroom_300x500mob_2",additional: {ext: {query: 'custom=10=136&cid=' + localStorage.getItem('adrcid')}} } },
                    { bidder: "bidvol", params: { placementId: "34830" } } ]
                }])
                window.yaContextCb.push(function() {
                    window.Ya.adfoxCode.create({
                        ownerId: 1458764,
                        sequentialLoading: true,
                        containerId: mm_article_id,
                        onError:function(error) {
                            document.getElementById('mobile_in_article_' + mmId).classList.add('stub')
                        },
                        onStub: function() {
                            document.getElementById('mobile_in_article_' + mmId).classList.add('stub')
                        },
                        onRender: function() {
                            document.getElementById('mobile_in_article_' + mmId).classList.add('view')
                        },
                        params: {
                            p1: 'cztgq',
                            p2: 'ipvp',
                        },
                        lazyLoad: {
                          fetchMargin: 50,
                          mobileScaling: 2
                        }
                    })
                })
            })
        }else{
            window.Ya.adfoxCode.hbCallbacks.push(function() {
                window.Ya.headerBidding.pushAdUnits([{
                    code: mm_article_id,
                    codeType: 'combo',
                    sizes: [[0,0],[300,600],[300,250],[320,50],[320,100],[320,336],[300,500],[320,250],[240,400],[320,280],[ 320, 150 ],[ 300, 150 ],[ 320, 500 ],[ 320, 480 ]],
                    bids: [
                    { bidder: "astralab", params: {placementId: "64411d898528b410c4990c68" } }, 
                    { bidder: "buzzoola", params: {placementId: "1247264" } },
                    { bidder: "videonow", params: {placementId: "6325564" } },
                    { bidder: "sape", params: { placementId:"844561" } },
                    { bidder: "otm", params: { placementId:"44961" } },
                    { bidder: "mediasniper", params: { placementId: "740012" }},
                    { bidder: "adfox_adsmart", params: { "p1": "cxzvy", "p2": "ul" } },
                    { bidder: "myTarget", params: { placementId: "1256674" } },
                    { bidder: "adriver", params: { placementId: "136:wroom_300x500mob_2",additional: {ext: {query: 'custom=10=136&cid=' + localStorage.getItem('adrcid')}} } },
                    { bidder: "bidvol", params: { placementId: "34830" } } ]
                }])
                window.yaContextCb.push(function() {
                    window.Ya.adfoxCode.create({
                        ownerId: 1458764,
                        sequentialLoading: true,
                        containerId: mm_article_id,
                        onError:function(error) {
                            document.getElementById('mobile_in_article_' + mmId).classList.add('stub')
                        },
                        onStub: function() {
                            document.getElementById('mobile_in_article_' + mmId).classList.add('stub')
                        },
                        onRender: function() {
                            document.getElementById('mobile_in_article_' + mmId).classList.add('view')
                        },
                        params: {
                            p1: 'cztgq',
                            p2: 'ipvp',
                        },
                        lazyLoad: {
                          fetchMargin: 50,
                          mobileScaling: 2
                        }
                    })
                })
            })
        }
        //ARTICLE AFTER COVER
        if (articleBottomBlock != null) {
            window.Ya.adfoxCode.hbCallbacks.push(function() {
                window.Ya.headerBidding.pushAdUnits([{
                    code: 'monetizeme-mobile-inread-after-article',
                    codeType: 'combo',
                    sizes: [[0,0],[300,600],[300,250],[320,50],[320,100],[320,336],[300,500],[320,250],[240,400],[320,280],[ 320, 150 ],[ 300, 150 ],[ 320, 500 ],[ 320, 480 ]],
                    bids: [ 
                    { bidder: "astralab", params: {placementId: "64411ec58528b410c4990c69" } },
                    { bidder: "buzzoola", params: {placementId: "1247265" } },
                    { bidder: "videonow", params: {placementId: "6326344" } },
                    { bidder: "sape", params: { placementId:"844562" } },
                    { bidder: "otm", params: { placementId:"44962" } },
                    { bidder: "mediasniper", params: { placementId: "740013" }},
                    { bidder: "adfox_adsmart", params: { "p1": "cxzvz", "p2": "ul" } },
                    { bidder: "myTarget", params: { placementId: "1256682" } },
                    { bidder: "adriver", params: { placementId: "136:wroom_300x500mob_3",additional: {ext: {query: 'custom=10=136&cid=' + localStorage.getItem('adrcid')}}}},
                    { bidder: "bidvol", params: { placementId: "34831" } } ]
                }])
                window.yaContextCb.push(function() {
                    window.Ya.adfoxCode.create({
                        ownerId: 1458764,
                        sequentialLoading: true,
                        containerId: 'monetizeme-mobile-inread-after-article',
                        onError:function(error) {
                            mobile_article_bottom.classList.add('stub')
                        },
                        onStub: function() {
                            mobile_article_bottom.classList.add('stub')
                        },
                        onRender: function() {
                            mobile_article_bottom.classList.add('view')
                        },
                        params: {
                            p1: 'cztgq',
                            p2: 'ipvp',
                        },
                        lazyLoad: {
                          fetchMargin: 50,
                          mobileScaling: 2
                        }
                    })
                })
            })
        }
    }

    //MOBILE COMMENTS
    if (commentsBlock != null) {
        window.Ya.adfoxCode.hbCallbacks.push(function() {
            window.Ya.headerBidding.pushAdUnits([{
                code: mm_comment_id,
                codeType: 'combo',
                sizes: [[0,0],[300,600],[300,250],[320,50],[320,100],[320,336],[300,500],[320,250],[240,400],[320,280],[ 320, 150 ],[ 300, 150 ],[ 320, 500 ],[ 320, 480 ]],
                bids: [
                { bidder: "astralab", params: {placementId: "64411f598528b410c4990c6a" } }, 
                { bidder: "buzzoola", params: {placementId: "1247266" } },
                { bidder: "videonow", params: {placementId: "6327462" } },
                { bidder: "sape", params: { placementId:"844563" } },
                { bidder: "otm", params: { placementId:"44963" } },
                { bidder: "mediasniper", params: { placementId: "740014" }},
                { bidder: "adfox_adsmart", params: { "p1": "cxzwa", "p2": "ul" } },
                { bidder: "myTarget", params: { placementId: "1256684" } },
                { bidder: "adriver", params: { placementId: "136:wroom_300x500mob_4",additional: {ext: {query: 'custom=10=136&cid=' + localStorage.getItem('adrcid')}} } },
                { bidder: "bidvol", params: { placementId: "34832" } } ]
            }])
            window.yaContextCb.push(function() {
                window.Ya.adfoxCode.create({
                    ownerId: 1458764,
                    sequentialLoading: true,
                    containerId: mm_comment_id,
                    onError:function(error) {
                        document.getElementById('mobile_in_comments_' + mmId).classList.add('stub')
                    },
                    onStub: function() {
                        document.getElementById('mobile_in_comments_' + mmId).classList.add('stub')
                    },
                    onRender: function() {
                        document.getElementById('mobile_in_comments_' + mmId).classList.add('view')
                    },
                    params: {
                        p1: 'cztgq',
                        p2: 'ipvp',
                    },
                    lazyLoad: {
                      fetchMargin: 50,
                      mobileScaling: 2
                    }
                })
            })
        })

        window.Ya.adfoxCode.hbCallbacks.push(function() {
            window.Ya.headerBidding.pushAdUnits([{
                code: 'monetizeme-mobile-after-comments',
                codeType: 'combo',
                sizes: [[0,0],[300,600],[300,250],[320,50],[320,100],[320,336],[300,500],[320,250],[240,400],[320,280],[ 320, 150 ],[ 300, 150 ],[ 320, 500 ],[ 320, 480 ]],
                bids: [ 
                { bidder: "astralab", params: {placementId: "64411fa48528b410c4990c6b" } },
                { bidder: "buzzoola", params: {placementId: "1247267" } },
                { bidder: "videonow", params: {placementId: "6328134" } },
                { bidder: "sape", params: { placementId:"844564" } },
                { bidder: "otm", params: { placementId:"44964" } },
                { bidder: "mediasniper", params: { placementId: "740015" }},
                { bidder: "adfox_adsmart", params: { "p1": "cxzwb", "p2": "ul" } },
                { bidder: "myTarget", params: { placementId: "1256689" } },
                { bidder: "adriver", params: { placementId: "136:wroom_300x500mob_5",additional: {ext: {query: 'custom=10=136&cid=' + localStorage.getItem('adrcid')}}}},
                { bidder: "bidvol", params: { placementId: "34833" } } ]
            }])
            window.yaContextCb.push(function() {
                window.Ya.adfoxCode.create({
                    ownerId: 1458764,
                    sequentialLoading: true,
                    containerId: 'monetizeme-mobile-after-comments',
                    onError:function(error) {
                        mobile_comments_bottom.classList.add('stub')
                    },
                    onStub: function() {
                        mobile_comments_bottom.classList.add('stub')
                    },
                    onRender: function() {
                        mobile_comments_bottom.classList.add('view')
                    },
                    params: {
                        p1: 'cztgq',
                        p2: 'ipvp',
                    },
                    lazyLoad: {
                      fetchMargin: 50,
                      mobileScaling: 2
                    }
                })
            })
        })
    }

    

}

function changeDivContentDesktop(callback) {

    //bottom sticky banner
    var body = document.querySelector("body")
    stickyBottom = document.createElement('div');
    stickyBottom.classList.add('monetizeme-desktop-sticky-bottom');
    stickyBottom.setAttribute('id', 'sticky_bottom');
    stickyBottom.innerHTML = `
    <div class="button-bottom-close-desktop"></div>
    <button class="mm_button_bottom-desktop">x</button>
    <div id="monetizeme-desktop-sticky-bottom"></div>`;
    body.insertAdjacentElement('afterbegin', stickyBottom)
    var bottomButton = document.querySelector('.button-bottom-close-desktop');
    bottomButton.addEventListener('click', function() {
        document.getElementById("sticky_bottom").remove();
    });

    if (sideBlock != null) {
        //first side banner
        desktop_side = document.createElement("div");
        desktop_side.classList.add('mm_desktop_side_content');
        desktop_side.setAttribute('id', 'desktop_side');
        desktop_side.innerHTML = `<div id="monetizeme-desktop-side-first" style="display:block"></div>`;
        sideBlock.insertAdjacentElement('afterbegin', desktop_side)

        //second side banner
        var desktop_side_second = document.createElement("div");
        desktop_side_second.classList.add('mm_desktop_side_content');
        desktop_side_second.setAttribute('id', 'desktop_side_second');
        desktop_side_second.innerHTML = `<div id="monetizeme-desktop-side-second" style="display:block"></div>
        <script src="https://cdn.viqeo.tv/js/vq_starter.js" async></script>
        <div data-playerId="4044" data-profileId="14601" class="viqeo-fly-widget"></div>`;
        sideBlock.insertAdjacentElement('beforeend', desktop_side_second)
    }
    if (textBlock != null) {
        //add mobile after cover
        desktop_before_articleElement = document.createElement("div");
        desktop_before_articleElement.classList.add('mm_desktop_content');
        desktop_before_articleElement.setAttribute('id', 'desktop_before_article');
        desktop_before_articleElement.innerHTML = `<div id="monetizeme-desktop-inread-after-cover" class="adfox_inread_desktop"></div>`;
        textBlock.insertBefore(desktop_before_articleElement, textBlock.childNodes[1]);
        if (artcicleBlock != null) {
            //add mobile in article
            var children = artcicleBlock.children;
            var len = children.length;
            for (let i = 4; i < len; i += 5) {
                desktop_in_article = document.createElement("div");
                var mmId = Math.random().toString(36).substr(2, 9)
                mm_article_id = 'monetizeme-desktop-inread-article-' + mmId
                desktop_in_article.classList.add('mm_desktop_content');
                desktop_in_article.setAttribute('id', 'desktop_in_article_' + mmId);
                desktop_in_article.innerHTML = "<div class='adfox_inread_desktop' id='" + mm_article_id + "'></div>"
                artcicleBlock.insertBefore(desktop_in_article, children[i]);
            }
        }
        if (articleBottomBlock != null) {
            desktop_article_bottom = document.createElement("div");
            desktop_article_bottom.classList.add('mm_desktop_content');
            desktop_article_bottom.setAttribute('id', 'desktop_after_article');
            desktop_article_bottom.innerHTML = `<div id= "monetizeme-desktop-inread-article-bottom" class="adfox_inread_desktop"></div>`;
            articleBottomBlock.insertAdjacentElement('beforebegin', desktop_article_bottom)
        }
    }
    if (commentsBlock != null) {
        var parent = commentsBlock;
        var children_comments = parent.querySelectorAll('.comment-item');
        for (var i = 4; i < children_comments.length; i += 4) {
            desktop_in_comments = document.createElement('div');
            var mmId = Math.random().toString(36).substr(2, 9)
            mm_comment_id = 'monetizeme-desktop-inread-comments-' + mmId
            desktop_in_comments.classList.add('mm_desktop_content');
            desktop_in_comments.setAttribute('id', 'desktop_in_comments_' + mmId);
            desktop_in_comments.innerHTML = "<div class='adfox_inread_desktop' id='" + mm_comment_id + "'></div>";

            parent.insertBefore(desktop_in_comments, children_comments[i]);
        }
        desktop_comments_bottom = document.createElement("div");
        desktop_comments_bottom.classList.add('mm_desktop_content');
        desktop_comments_bottom.setAttribute('id', 'desktop_after_comments');
        desktop_comments_bottom.innerHTML = `<div id= "monetizeme-desktop-coomments-bottom" class="adfox_inread_desktop"></div>`;
        after_commentsBlock.insertAdjacentElement("afterend", desktop_comments_bottom);

    }
    callback();
}

function onContentChangeDesktop() {
    window.Ya.adfoxCode.hbCallbacks.push(function() {
        window.Ya.headerBidding.pushAdUnits([{
            code: 'monetizeme-desktop-sticky-bottom',
            codeType: 'combo',
            sizes: [ [ 728, 90 ], [ 0, 0 ] ],
            bids: [ 
            { bidder: "astralab", params: {placementId: "6440fa038528b410c4990c63" } },
            { bidder: "buzzoola", params: {placementId: "1247259" } },
            { bidder: "videonow", params: {placementId: "6321252" } },
            { bidder: "sape", params: { placementId:"844557" } },
            { bidder: "otm", params: { placementId:"44954" } },
            { bidder: "mediasniper", params: { placementId: "740008" }},
            { bidder: "adfox_adsmart", params: { "p1": "cxzvt", "p2": "hhuq" } },
            { bidder: "myTarget", params: { placementId: "1256639" } },
            { bidder: "adriver", params: { placementId: "136:wroom_320x100" ,additional: {ext: {query: 'custom=10=136&cid=' + localStorage.getItem('adrcid')}} } },
            { bidder: "bidvol", params: { placementId: "34825" } } ]
        }])
        window.yaContextCb.push(function() {
            window.Ya.adfoxCode.create({
                ownerId: 1458764,
                sequentialLoading: true,
                containerId: 'monetizeme-desktop-sticky-bottom',
                onError:function(error) {
                    stickyBottom.classList.add('stub')
                },
                onStub: function() {
                    stickyBottom.classList.add('stub')
                },
                onRender: function() {
                    stickyBottom.classList.add('view')
                },
                params: {
                    p1: 'cztgs',
                    p2: 'iqhs',
                }
            })
        })
    })

    if (sideBlock != null) {
        window.Ya.adfoxCode.hbCallbacks.push(function() {
            window.Ya.headerBidding.pushAdUnits([{
                code: 'monetizeme-desktop-side-first',
                codeType: 'combo',
                sizes: [ [ 240, 400 ], [ 300, 500 ], [ 300, 600 ], [ 120, 600 ], [ 300, 300 ], [ 0, 0 ] ],
                bids: [ 
                { bidder: "astralab", params: {placementId: "6440f86a8528b410c4990c5e" } },
                { bidder: "buzzoola", params: {placementId: "1247208" } },
                { bidder: "videonow", params: {placementId: "6319454" } },
                { bidder: "sape", params: { placementId:"844548" } },
                { bidder: "otm", params: { placementId:"44947" } },
                { bidder: "mediasniper", params: { placementId: "740001" }},
                { bidder: "adfox_adsmart", params: { "p1": "cxzvl", "p2": "hhro" } },
                { bidder: "myTarget", params: { placementId: "1255774" } },
                { bidder: "adriver", params: { placementId: "136:wroom_300x600_1",additional: {ext: {query: 'custom=10=136&cid=' + localStorage.getItem('adrcid')}}} },
                { bidder: "bidvol", params: { placementId: "34818" } } ]
            }])
            window.yaContextCb.push(function() {
                window.Ya.adfoxCode.create({
                    ownerId: 1458764,
                    sequentialLoading: true,
                    containerId: 'monetizeme-desktop-side-first',
                    params: {
                        pp: 'g',
                        ps: 'gmdq',
                        p2: 'ieea',
                    }
                })
            })
        })
        window.Ya.adfoxCode.hbCallbacks.push(function() {
            window.Ya.headerBidding.pushAdUnits([{
                code: 'monetizeme-desktop-side-second',
                codeType: 'combo',
                sizes: [ [ 240, 400 ], [ 300, 500 ], [ 300, 600 ], [ 120, 600 ], [ 300, 300 ], [ 0, 0 ] ],
                bids: [ 
                { bidder: "astralab", params: {placementId: "6440f90e8528b410c4990c62" } },
                { bidder: "buzzoola", params: {placementId: "1247211" } },
                { bidder: "videonow", params: {placementId: "6320596" } },
                { bidder: "sape", params: { placementId:"844549" } },
                { bidder: "otm", params: { placementId:"44948" } },
                { bidder: "mediasniper", params: { placementId: "740002" }},
                { bidder: "adfox_adsmart", params: { "p1": "cxzvm", "p2": "hhro" } },
                { bidder: "myTarget", params: { placementId: "1255776" } },
                { bidder: "adriver", params: { placementId: "136:wroom_300x600_2",additional: {ext: {query: 'custom=10=136&cid=' + localStorage.getItem('adrcid')}} } },
                { bidder: "bidvol", params: { placementId: "34819" } } ]
            }])
            window.yaContextCb.push(function() {
                window.Ya.adfoxCode.create({
                    ownerId: 1458764,
                    sequentialLoading: true,
                    containerId: 'monetizeme-desktop-side-second',
                    params: {
                        pp: 'h',
                        ps: 'gmdq',
                        p2: 'ihua',
                    },
                    lazyLoad: {
                      fetchMargin: 100,
                      mobileScaling: 2
                    }
                })
            })
        })
    }
    if (textBlock != null) {
        window.Ya.adfoxCode.hbCallbacks.push(function() {
            window.Ya.headerBidding.pushAdUnits([{
                code: 'monetizeme-desktop-inread-after-cover',
                codeType: 'combo',
                sizes: [ [ 728, 90 ], [ 300, 250 ], [ 0, 0 ], [ 300, 100], [ 300, 300 ], [ 320, 250 ], [ 336, 280 ], [ 580, 400 ] ],
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
        if (artcicleBlock != null) {
            window.Ya.adfoxCode.hbCallbacks.push(function() {
                window.Ya.headerBidding.pushAdUnits([{
                    code: mm_article_id,
                    codeType: 'combo',
                    sizes: [ [ 728, 90 ], [ 300, 250 ], [ 0, 0 ], [ 300, 100 ], [ 300, 300 ], [ 320, 250 ], [ 336, 280 ], [ 580, 400 ] ],
                    bids: [ 
                    { bidder: "buzzoola", params: {placementId: "1247255" } },
                    { bidder: "videonow", params: {placementId: "6315648" } },
                    { bidder: "sape", params: { placementId:"844551" } },
                    { bidder: "otm", params: { placementId:"44950" } },
                    { bidder: "mediasniper", params: { placementId: "740004" }},
                    { bidder: "adfox_adsmart", params: { "p1": "cxzvp", "p2": "ul" } },
                    { bidder: "myTarget", params: { placementId: "1256631" } },
                    { bidder: "adriver", params: { placementId: "136:wroom_300x250_2",additional: {ext: {query: 'custom=10=136&cid=' + localStorage.getItem('adrcid')}} } },
                    { bidder: "bidvol", params: { placementId: "34821" } } ]
                }])
                window.yaContextCb.push(function() {
                    window.Ya.adfoxCode.create({
                        ownerId: 1458764,
                        sequentialLoading: true,
                        containerId:mm_article_id,
                        onError:function(error) {
                            document.getElementById('desktop_in_article_' + mmId).classList.add('stub')
                        },
                        onStub: function() {
                            document.getElementById('desktop_in_article_' + mmId).classList.add('stub')
                        },
                        onRender: function() {
                            document.getElementById('desktop_in_article_' + mmId).classList.add('view')
                        },
                        params: {
                            p1: 'cztgr',
                            p2: 'ipvo'
                        },
                        lazyLoad: {
                          fetchMargin: 100,
                          mobileScaling: 2
                        }
                    })
                })
            })
        }
        if (articleBottomBlock != null){
            window.Ya.adfoxCode.hbCallbacks.push(function() {
                window.Ya.headerBidding.pushAdUnits([{
                    code: 'monetizeme-desktop-inread-article-bottom',
                    codeType: 'combo',
                    sizes: [ [ 728, 90 ], [ 300, 250 ], [ 0, 0 ], [ 300, 100], [ 300, 300 ], [ 320, 250 ], [ 336, 280 ], [ 580, 400 ] ],
                    bids: [ 
                    { bidder: "buzzoola", params: {placementId: "1247256" } },
                    { bidder: "videonow", params: {placementId: "6316146" } },
                    { bidder: "sape", params: { placementId:"844554" } },
                    { bidder: "otm", params: { placementId:"44951" } },
                    { bidder: "mediasniper", params: { placementId: "740005" }},
                    { bidder: "adfox_adsmart", params: { "p1": "cxzvq", "p2": "ul" } },
                    { bidder: "myTarget", params: { placementId: "1256633" } },
                    { bidder: "adriver", params: { placementId: "136:wroom_300x250_3",additional: {ext: {query: 'custom=10=136&cid=' + localStorage.getItem('adrcid')}} } },
                    { bidder: "bidvol", params: { placementId: "34822" } } ]
                }])
                window.yaContextCb.push(function() {
                    window.Ya.adfoxCode.create({
                        ownerId: 1458764,
                        sequentialLoading: true,
                        containerId: 'monetizeme-desktop-inread-article-bottom',
                        onError:function(error) {
                            desktop_article_bottom.classList.add('stub')
                        },
                        onStub: function() {
                            desktop_article_bottom.classList.add('stub')
                        },
                        onRender: function() {
                            desktop_article_bottom.classList.add('view')
                        },
                        params: {
                            p1: 'cztgr',
                            p2: 'ipvo',
                        },
                        lazyLoad: {
                          fetchMargin: 100,
                          mobileScaling: 2
                        }
                    })
                })
            })
        }
        if (commentsBlock != null) {
            window.Ya.adfoxCode.hbCallbacks.push(function() {
                window.Ya.headerBidding.pushAdUnits([{
                    code: mm_comment_id,
                    codeType: 'combo',
                    sizes: [ [ 728, 90 ], [ 300, 250 ], [ 0, 0 ], [ 300, 100 ], [ 300, 300 ], [ 320, 250 ], [ 336, 280 ], [ 580, 400 ] ],
                    bids: [ 
                    { bidder: "buzzoola", params: {placementId: "1247257" } },
                    { bidder: "videonow", params: {placementId: "6317778" } },
                    { bidder: "sape", params: { placementId:"844555" } },
                    { bidder: "otm", params: { placementId:"44952" } },
                    { bidder: "mediasniper", params: { placementId: "740006" }},
                    { bidder: "adfox_adsmart", params: { "p1": "cxzvr", "p2": "ul" } },
                    { bidder: "myTarget", params: { placementId: "1256635" } },
                    { bidder: "adriver", params: { placementId: "136:wroom_300x250_4",additional: {ext: {query: 'custom=10=136&cid=' + localStorage.getItem('adrcid')}} } },
                    { bidder: "bidvol", params: { placementId: "34823" } } ]
                }])
                window.yaContextCb.push(function() {
                    window.Ya.adfoxCode.create({
                        ownerId: 1458764,
                        sequentialLoading: true,
                        containerId: mm_comment_id,
                        onError:function(error) {
                            document.getElementById('desktop_in_comments_' + mmId).classList.add('stub')
                        },
                        onStub: function() {
                            document.getElementById('desktop_in_comments_' + mmId).classList.add('stub')
                        },
                        onRender: function() {
                            document.getElementById('desktop_in_comments_' + mmId).classList.add('view')
                        },
                        params: {
                            p1: 'cztgr',
                            p2: 'ipvo',
                        },
                        lazyLoad: {
                          fetchMargin: 100,
                          mobileScaling: 2
                        }
                    })
                })
            })
            window.Ya.adfoxCode.hbCallbacks.push(function() {
                    window.Ya.headerBidding.pushAdUnits([{
                        code: 'monetizeme-desktop-coomments-bottom',
                        codeType: 'combo',
                        sizes: [ [ 728, 90 ], [ 300, 250 ], [ 0, 0 ], [ 300, 100], [ 300, 300 ], [ 320, 250 ], [ 336, 280 ], [ 580, 400 ] ],
                        bids: [ 
                        { bidder: "buzzoola", params: {placementId: "1247258" } },
                        { bidder: "videonow", params: {placementId: "6318782" } },
                        { bidder: "sape", params: { placementId:"844556" } },
                        { bidder: "otm", params: { placementId:"44953" } },
                        { bidder: "mediasniper", params: { placementId: "740007" }},
                        { bidder: "adfox_adsmart", params: { "p1": "cxzvs", "p2": "ul" } },
                        { bidder: "myTarget", params: { placementId: "1256637" } },
                        { bidder: "adriver", params: { placementId: "136:wroom_300x250_5",additional: {ext: {query: 'custom=10=136&cid=' + localStorage.getItem('adrcid')}}} },
                        { bidder: "bidvol", params: { placementId: "34824" } } ]
                    }])
                    window.yaContextCb.push(function() {
                        window.Ya.adfoxCode.create({
                            ownerId: 1458764,
                            sequentialLoading: true,
                            containerId: 'monetizeme-desktop-coomments-bottom',
                            onError:function(error) {
                                desktop_comments_bottom.classList.add('stub')
                            },
                            onStub: function() {
                                desktop_comments_bottom.classList.add('stub')
                            },
                            onRender: function() {
                                desktop_comments_bottom.classList.add('view')
                            },
                            params: {
                                p1: 'cztgr',
                                p2: 'ipvo',
                            },
                            lazyLoad: {
                              fetchMargin: 100,
                              mobileScaling: 2
                            }
                        })
                    })
                })
        }
    }


}

document.addEventListener("DOMContentLoaded", function(event) {
   if (window.matchMedia('(max-width: 768px)').matches){
    //Add blocks to article
    textBlock = document.querySelector(".text-block");
    mainText = document.querySelector(".maintext")
    artcicleBlock = document.querySelector(".text-block")
    articleBottomBlock = document.querySelector('a[name="comments"]')
    commentsBlock = document.querySelector(".comment2")
    after_commentsBlock = document.querySelector('form[name="addcomment"]')
    //Execute adding blocks
    changeDivContentMobile(onContentChangeMobile)
    }else{
        textBlock = document.querySelector(".text-block");
        mainText = document.querySelector(".maintext")
        sideBlock = document.querySelector(".basic-right")
        artcicleBlock = document.querySelector(".text-block")
        articleBottomBlock = document.querySelector('a[name="comments"]')
        commentsBlock = document.querySelector(".comment2")
        after_commentsBlock = document.querySelector('form[name="addcomment"]')
        //Execute adding blocks
        changeDivContentDesktop(onContentChangeDesktop)
    }    
})



