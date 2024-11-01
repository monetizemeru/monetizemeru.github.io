const styleElement = document.createElement("style");
// Set the style content
styleElement.textContent = `
    .mm_desktop_content{
        display:flex;
        width: 100%;
        justify-content: center;
        text-align: center;
        font-family: "Roboto Condensed", "Arial Narrow", Arial, sans-serif;
        color: #8e8e8e;
        background: var(--text-background-color-secondary);
        text-transform: uppercase;
        font-size: 1rem;
        border-radius: 0.6rem;
        padding: 10px 0px;
    }
    .stub{
        display: none !important;
    }
    .view{
        display: flex !important;
        margin-top:15px;
        margin-bottom:15px;
    }
    .mm-content-desktop{
        margin: auto;
    }
    .mm-container{
        width: calc(100% - 2px);
        margin: auto;
    }

`;
// Append the style element to the head
document.head.appendChild(styleElement);
window.Ya || (window.Ya = {});
window.yaContextCb = window.yaContextCb || [];
window.Ya.adfoxCode || (window.Ya.adfoxCode = {});
window.Ya.adfoxCode.hbCallbacks || (window.Ya.adfoxCode.hbCallbacks = []);
const artcicleBlock = document.querySelector(".editor-body.entry-article__article-body")
//Desktop codes add
if (window.matchMedia('(min-width: 768px)').matches) {
    //document.addEventListener("DOMContentLoaded", function(event) {
        //Desktop_article_cover_code
        if (artcicleBlock != null && artcicleBlock.children.length >= 3) {
            var mobile_after_cover = document.createElement("div");
            let mmId = Math.random().toString(36).substr(2, 9)
            let mm_adfox_id = 'monetizeme-mobile-article-' + mmId
            mobile_after_cover.classList.add('mm_desktop_content');
            mobile_after_cover.setAttribute('id', 'desktop_in_article_' + mmId);
            mobile_after_cover.innerHTML = "<div class='mm-container'><div id='" + mm_adfox_id + "' class='mm-content-desktop'></div></div>";
            window.Ya.adfoxCode.hbCallbacks.push(function() {
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
                var userTimeout = 1500;
                window.YaHeaderBiddingSettings = {
                    biddersMap: adfoxBiddersMap,
                    timeout: userTimeout,
                };
                window.Ya.headerBidding.pushAdUnits([
                {
                    code: mm_adfox_id,
                    codeType: 'combo',
                    sizes: [
                    ],
                    bids: [
                    {
                        bidder: "astralab",
                        params:
                        {
                            placementId: "6523df3c660ff2d95a2eb004"
                        }
                    },
                    {
                        bidder: "buzzoola",
                        params:
                        {
                            placementId: "1255557"
                        }
                    },
                    {
                        bidder: "videonow",
                        params:
                        {
                            placementId: "6858670"
                        }
                    },
                    {
                        bidder: "sape",
                        params:
                        {
                            placementId: "863136"
                        }
                    },
                    {
                        bidder: "myTarget",
                        params:
                        {
                            placementId: "1420907"
                        }
                    },
                    {
                        bidder: "mediasniper",
                        params:
                        {
                            placementId: "3389"
                        }
                    },

                    {
                        bidder: "adfox_adsmart",
                        params:
                        {
                            "p1": "czpfz",
                            "p2": "ul"
                        }
                    },
                    {
                        bidder: "adriver",
                        params:
                        {
                            placementId: "136:goha_300x300",
                            additional:
                            {
                                ext:
                                {
                                    query: 'custom=10=136&cid=' + localStorage.getItem('adrcid')
                                }
                            }
                        }
                    }]
                }])
                window.yaContextCb.push(function() {
                    window.Ya.adfoxCode.create({
                        ownerId: 1458764,
                        sequentialLoading: true,
                        containerId: mm_adfox_id,
                        onError: function(error) {
                            document.getElementById('desktop_in_article_' + mmId).classList.add('stub')
                        },
                        onStub: function() {
                            document.getElementById('desktop_in_article_' + mmId).classList.add('stub')
                        },
                        onRender: function() {
                            document.getElementById('desktop_in_article_' + mmId).classList.add('view')
                        },
                        params: {
                            pp: 'g',
                            ps: 'gxas',
                            p2: 'indo'
                        },
                        lazyLoad: {
                            fetchMargin: 50,
                            mobileScaling: 2
                        }
                    })
                })
            })
            artcicleBlock.insertBefore(mobile_after_cover, artcicleBlock.children[2])
        }
    //})
} else {
    //document.addEventListener("DOMContentLoaded", function(event) {
        //Mobile_article_cover_code
        if (artcicleBlock != null && artcicleBlock.children.length >= 3) {
            var mobile_after_cover = document.createElement("div");
            let mmId = Math.random().toString(36).substr(2, 9)
            let mm_adfox_id = 'monetizeme-mobile-article-' + mmId
            mobile_after_cover.classList.add('mm_desktop_content');
            mobile_after_cover.setAttribute('id', 'desktop_in_article_' + mmId);
            mobile_after_cover.innerHTML = "<div class='mm-container'><div id='" + mm_adfox_id + "' class='mm-content-desktop'></div></div>";
            window.Ya.adfoxCode.hbCallbacks.push(function() {
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
                var userTimeout = 1500;
                window.YaHeaderBiddingSettings = {
                    biddersMap: adfoxBiddersMap,
                    timeout: userTimeout,
                };
                window.Ya.headerBidding.pushAdUnits([
                {
                    code: mm_adfox_id,
                    codeType: 'combo',
                    sizes: [
                        [300, 600],
                        [300, 250],
                        [320, 50],
                        [320, 100],
                        [320, 336],
                        [300, 500],
                        [320, 250],
                        [240, 400],
                        [320, 280],
                        [320, 150],
                        [300, 150],
                        [320, 500],
                        [320, 480]
                    ],
                    bids: [
                    {
                        bidder: "astralab",
                        params:
                        {
                            placementId: "6523df3c660ff2d95a2eb004"
                        }
                    },
                    {
                        bidder: "buzzoola",
                        params:
                        {
                            placementId: "1255558"
                        }
                    },
                    {
                        bidder: "videonow",
                        params:
                        {
                            placementId: "6859913"
                        }
                    },
                    {
                        bidder: "sape",
                        params:
                        {
                            placementId: "863137"
                        }
                    },
                    {
                        bidder: "myTarget",
                        params:
                        {
                            placementId: "1420909"
                        }
                    },
                    {
                        bidder: "mediasniper",
                        params:
                        {
                            placementId: "3390"
                        }
                    },
                    {
                        bidder: "adfox_adsmart",
                        params:
                        {
                            "p1": "czpgb",
                            "p2": "ul"
                        }
                    },
                    {
                        bidder: "adriver",
                        params:
                        {
                            placementId: "136:goha_300x500",
                            additional:
                            {
                                ext:
                                {
                                    query: 'custom=10=136&cid=' + localStorage.getItem('adrcid')
                                }
                            }
                        }
                    }]
                }])
                window.yaContextCb.push(function() {
                    window.Ya.adfoxCode.create({
                        ownerId: 1458764,
                        sequentialLoading: true,
                        containerId: mm_adfox_id,
                        onError: function(error) {
                            document.getElementById('desktop_in_article_' + mmId).classList.add('stub')
                        },
                        onStub: function() {
                            document.getElementById('desktop_in_article_' + mmId).classList.add('stub')
                        },
                        onRender: function() {
                            document.getElementById('desktop_in_article_' + mmId).classList.add('view')
                        },
                        params: {
                            pp: 'g',
                            ps: 'gxas',
                            p2: 'inxe'
                        },
                        lazyLoad: {
                            fetchMargin: 50,
                            mobileScaling: 2
                        }
                    })
                })
            })
            artcicleBlock.insertBefore(mobile_after_cover, artcicleBlock.children[2])
        }
    //})
}