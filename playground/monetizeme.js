const e = document.createElement("style");
e.textContent = '\n    .mm_mobile_content{\n    \tdisplay:flex;\n    \tmargin-top:15px;\n    \tmargin-bottom:15px;\n        width: 100%;\n        justify-content: center;\n        text-align: center;\n        font-family: "Roboto Condensed", "Arial Narrow", Arial, sans-serif;\n        color: #8e8e8e;\n        background: #fbfbfb;\n        padding: 10px 0 20px;\n        text-transform: uppercase;\n        font-size: 1rem;\n        border-radius: 3px;\n        border: 1px solid #eee;\n    }\n    .stub{\n    \tdisplay: none !important;\n    }\n    .view{\n    \tdisplay: flex !important;\n    }\n    .mm-content-mobile{\n    \tmargin: 10px auto;\n    }\n    .mm-container{\n    \twidth: calc(100% - 2px);\n    }\n\n', document.head.appendChild(e), window.Ya || (window.Ya = {}), window.yaContextCb = window.yaContextCb || [], window.Ya.adfoxCode || (window.Ya.adfoxCode = {}), window.Ya.adfoxCode.hbCallbacks || (window.Ya.adfoxCode.hbCallbacks = []);
const d = document.querySelector(".article-content"),
    a = document.querySelector("#postListContainer"),
    t = document.querySelector("#comments-container");
if(window.matchMedia("(max-width: 768px)").matches == true){
    if (null != d) {
        var i = document.createElement("div");
        let e = Math.random().toString(36).substr(2, 9),
            a = "monetizeme-mobile-article-cover" + e;
        i.classList.add("mm_mobile_content"), i.setAttribute("id", "mobile_in_article_" + e), i.innerHTML = "<div class='mm-container'>РЕКЛАМА - ПРОДОЛЖЕНИЕ НИЖЕ <div id='" + a + "' class='mm-content-mobile'></div></div>", window.Ya.adfoxCode.hbCallbacks.push((function() {
            window.YaHeaderBiddingSettings = {
                biddersMap: {
                    astralab: "2365332",
                    buzzoola: "2365409",
                    videonow: "2365411",
                    sape: "2365419",
                    mediasniper: "2365420",
                    adfox_adsmart: "2365424",
                    myTarget: "2365426",
                    adriver: "2365427",
                    bidvol: "2365429",
                    otm: "2374742"
                },
                timeout: 1500
            }, window.Ya.headerBidding.pushAdUnits([{
                code: a,
                codeType: "combo",
                sizes: [
                    [0, 0],
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
                bids: [{
                    bidder: "astralab",
                    params: {
                        placementId: "648197088dc2ca0395d87704"
                    }
                }, {
                    bidder: "buzzoola",
                    params: {
                        placementId: "1249290"
                    }
                }, {
                    bidder: "videonow",
                    params: {
                        placementId: "6388435"
                    }
                }, {
                    bidder: "sape",
                    params: {
                        placementId: "849812"
                    }
                }, {
                    bidder: "adfox_adsmart",
                    params: {
                        p1: "cykna",
                        p2: "ul"
                    }
                }, {
                    bidder: "adriver",
                    params: {
                        placementId: "136:playground_300x500m_content",
                        additional: {
                            ext: {
                                query: "custom=10=136&cid=" + localStorage.getItem("adrcid")
                            }
                        }
                    }
                }]
            }]), window.yaContextCb.push((function() {
                window.Ya.adfoxCode.create({
                    ownerId: 1458764,
                    sequentialLoading: !0,
                    containerId: a,
                    onError: function(d) {
                        document.getElementById("mobile_in_article_" + e).classList.add("stub")
                    },
                    onStub: function() {
                        document.getElementById("mobile_in_article_" + e).classList.add("stub")
                    },
                    onRender: function() {
                        document.getElementById("mobile_in_article_" + e).classList.add("view")
                    },
                    params: {
                        p1: 'czrea',
                        p2: 'inxe'
                    },
                    lazyLoad: {
                        fetchMargin: 250,
                        mobileScaling: 2
                    }
                })
            }))
        })), d.insertBefore(i, d.children[4])
    }
    if (null != d) {
        const e = d.children,
            a = e.length;
        for (let t = 8; t < a; t += 7) {
            var n = document.createElement("div");
            let a = Math.random().toString(36).substr(2, 9),
                i = "monetizeme-mobile-article-" + a;
            n.classList.add("mm_mobile_content"), n.setAttribute("id", "mobile_in_article_" + a), n.innerHTML = "<div class='mm-container'>РЕКЛАМА - ПРОДОЛЖЕНИЕ НИЖЕ<div id='" + i + "' class='mm-content-mobile'></div></div>", window.Ya.adfoxCode.hbCallbacks.push((function() {
                window.YaHeaderBiddingSettings = {
                    biddersMap: {
                        astralab: "2365332",
                        buzzoola: "2365409",
                        videonow: "2365411",
                        sape: "2365419",
                        mediasniper: "2365420",
                        adfox_adsmart: "2365424",
                        myTarget: "2365426",
                        adriver: "2365427",
                        bidvol: "2365429",
                        otm: "2374742"
                    },
                    timeout: 1500
                }, window.Ya.headerBidding.pushAdUnits([{
                    code: i,
                    codeType: "combo",
                    sizes: [
                        [0, 0],
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
                    bids: [{
                        bidder: "astralab",
                        params: {
                            placementId: "648197088dc2ca0395d87704"
                        }
                    }, {
                        bidder: "buzzoola",
                        params: {
                            placementId: "1249290"
                        }
                    }, {
                        bidder: "videonow",
                        params: {
                            placementId: "6388435"
                        }
                    }, {
                        bidder: "sape",
                        params: {
                            placementId: "849812"
                        }
                    }, {
                        bidder: "adfox_adsmart",
                        params: {
                            p1: "cykna",
                            p2: "ul"
                        }
                    }, {
                        bidder: "adriver",
                        params: {
                            placementId: "136:playground_300x500m_content",
                            additional: {
                                ext: {
                                    query: "custom=10=136&cid=" + localStorage.getItem("adrcid")
                                }
                            }
                        }
                    }]
                }]), window.yaContextCb.push((function() {
                    window.Ya.adfoxCode.create({
                        ownerId: 1458764,
                        sequentialLoading: !0,
                        containerId: i,
                        onError: function(e) {
                            document.getElementById("mobile_in_article_" + a).classList.add("stub")
                        },
                        onStub: function() {
                            document.getElementById("mobile_in_article_" + a).classList.add("stub")
                        },
                        onRender: function() {
                            document.getElementById("mobile_in_article_" + a).classList.add("view")
                        },
                        params: {
                            p1: 'czrei',
                            p2: 'ipvp'
                        },
                        lazyLoad: {
                            fetchMargin: 150,
                            mobileScaling: 2
                        }
                    })
                }))
            })), d.insertBefore(n, e[t])
        }
    }
    if (null != t) {
        const e = t.children,
            d = e.length;
        for (let a = 2; a < d; a += 3) {
            n = document.createElement("div");
            let d = Math.random().toString(36).substr(2, 9),
                i = "monetizeme-mobile-comments-" + d;
            n.classList.add("mm_mobile_content"), n.setAttribute("id", "mobile_in_article_" + d), n.innerHTML = "<div class='mm-container'>РЕКЛАМА - ПРОДОЛЖЕНИЕ НИЖЕ<div id='" + i + "' class='mm-content-mobile'></div></div>", window.Ya.adfoxCode.hbCallbacks.push((function() {
                window.YaHeaderBiddingSettings = {
                    biddersMap: {
                        astralab: "2365332",
                        buzzoola: "2365409",
                        videonow: "2365411",
                        sape: "2365419",
                        mediasniper: "2365420",
                        adfox_adsmart: "2365424",
                        myTarget: "2365426",
                        adriver: "2365427",
                        bidvol: "2365429",
                        otm: "2374742"
                    },
                    timeout: 500
                }, window.Ya.headerBidding.pushAdUnits([{
                    code: i,
                    codeType: "combo",
                    sizes: [
                        [0, 0],
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
                    bids: [{
                        bidder: "astralab",
                        params: {
                            placementId: "6481972b8dc2ca0395d87705"
                        }
                    }, {
                        bidder: "buzzoola",
                        params: {
                            placementId: "1249291"
                        }
                    }, {
                        bidder: "videonow",
                        params: {
                            placementId: "6389647"
                        }
                    }, {
                        bidder: "sape",
                        params: {
                            placementId: "849813"
                        }
                    }, {
                        bidder: "adfox_adsmart",
                        params: {
                            p1: "cyknb",
                            p2: "ul"
                        }
                    }, {
                        bidder: "adriver",
                        params: {
                            placementId: "136:playground_300x500m_comments",
                            additional: {
                                ext: {
                                    query: "custom=10=136&cid=" + localStorage.getItem("adrcid")
                                }
                            }
                        }
                    }]
                }]), window.yaContextCb.push((function() {
                    window.Ya.adfoxCode.create({
                        ownerId: 1458764,
                        sequentialLoading: !0,
                        containerId: i,
                        onError: function(e) {
                            document.getElementById("mobile_in_article_" + d).classList.add("stub")
                        },
                        onStub: function() {
                            document.getElementById("mobile_in_article_" + d).classList.add("stub")
                        },
                        onRender: function() {
                            document.getElementById("mobile_in_article_" + d).classList.add("view")
                        },
                        params: {
                            p1: 'czrei',
                            p2: 'ipvp'
                        },
                        lazyLoad: {
                            fetchMargin: 150,
                            mobileScaling: 2
                        }
                    })
                }))
            })), t.insertBefore(n, e[a])
        }
    }
}else{
    if (null != d) {
        var i = document.createElement("div");
        let e = Math.random().toString(36).substr(2, 9),
            a = "monetizeme-desktop-article-cover" + e;
        i.classList.add("mm_mobile_content"), i.setAttribute("id", "mobile_in_article_" + e), i.innerHTML = "<div class='mm-container'>РЕКЛАМА - ПРОДОЛЖЕНИЕ НИЖЕ<div id='" + a + "' class='mm-content-mobile'></div></div>", window.Ya.adfoxCode.hbCallbacks.push((function() {
            window.YaHeaderBiddingSettings = {
                biddersMap: {
                    astralab: "2365332",
                    buzzoola: "2365409",
                    videonow: "2365411",
                    sape: "2365419",
                    mediasniper: "2365420",
                    adfox_adsmart: "2365424",
                    myTarget: "2365426",
                    adriver: "2365427",
                    bidvol: "2365429",
                    otm: "2374742"
                },
                timeout: 1500
            }, window.Ya.headerBidding.pushAdUnits([{
                code: a,
                codeType: "combo",
                sizes: [
                    [728, 90],
                    [300, 250],
                    [0, 0],
                    [300, 100],
                    [300, 300],
                    [320, 250],
                    [336, 280],
                    [580, 400]
                ],
                bids: [{
                    bidder: "astralab",
                    params: {
                        placementId: "6481967d8dc2ca0395d87702"
                    }
                }, {
                    bidder: "buzzoola",
                    params: {
                        placementId: "1249288"
                    }
                }, {
                    bidder: "videonow",
                    params: {
                        placementId: "6386785"
                    }
                }, {
                    bidder: "sape",
                    params: {
                        placementId: "849810"
                    }
                }, {
                    bidder: "adfox_adsmart",
                    params: {
                        p1: "cykmy",
                        p2: "ul"
                    }
                }, {
                    bidder: "adriver",
                    params: {
                        placementId: "136:playground_728x90_content",
                        additional: {
                            ext: {
                                query: "custom=10=136&cid=" + localStorage.getItem("adrcid")
                            }
                        }
                    }
                }]
            }]), window.yaContextCb.push((function() {
                window.Ya.adfoxCode.create({
                    ownerId: 1458764,
                    sequentialLoading: !0,
                    containerId: a,
                    onError: function(d) {
                        document.getElementById("mobile_in_article_" + e).classList.add("stub")
                    },
                    onStub: function() {
                        document.getElementById("mobile_in_article_" + e).classList.add("stub")
                    },
                    onRender: function() {
                        document.getElementById("mobile_in_article_" + e).classList.add("view")
                    },
                    params: {
                        p1: 'czrdz',
                        p2: 'indo'
                    },
                    lazyLoad: {
                        fetchMargin: 250,
                        mobileScaling: 2
                    }
                })
            }))
        })), d.insertBefore(i, d.children[4])
    }
    if (null != d) {
        const k = d.children,
            a = k.length;
        for (let i = 10; i < a; i += 8) {
            //const i = e[t];
            //if ("H2" === i.tagName) {
                let e = document.createElement("div"),
                    t = Math.random().toString(36).substr(2, 9),
                    n = "monetizeme-desktop-inread-article-" + t;
                e.classList.add("mm_mobile_content"), e.setAttribute("id", "mobile_in_article_" + t), e.innerHTML = "<div class='mm-container'>РЕКЛАМА - ПРОДОЛЖЕНИЕ НИЖЕ<div id='" + n + "' class='mm-content-mobile'></div></div>", window.Ya.adfoxCode.hbCallbacks.push((function() {
                    window.YaHeaderBiddingSettings = {
                        biddersMap: {
                            astralab: "2365332",
                            buzzoola: "2365409",
                            videonow: "2365411",
                            sape: "2365419",
                            mediasniper: "2365420",
                            adfox_adsmart: "2365424",
                            myTarget: "2365426",
                            adriver: "2365427",
                            bidvol: "2365429",
                            otm: "2374742"
                        },
                        timeout: 1500
                    }, window.Ya.headerBidding.pushAdUnits([{
                        code: n,
                        codeType: "combo",
                        sizes: [
                            [728, 90],
                            [300, 250],
                            [0, 0],
                            [300, 100],
                            [300, 300],
                            [320, 250],
                            [336, 280],
                            [580, 400]
                        ],
                        bids: [{
                            bidder: "astralab",
                            params: {
                                placementId: "6481967d8dc2ca0395d87702"
                            }
                        }, {
                            bidder: "buzzoola",
                            params: {
                                placementId: "1249288"
                            }
                        }, {
                            bidder: "videonow",
                            params: {
                                placementId: "6386785"
                            }
                        }, {
                            bidder: "sape",
                            params: {
                                placementId: "849810"
                            }
                        }, {
                            bidder: "adfox_adsmart",
                            params: {
                                p1: "cykmy",
                                p2: "ul"
                            }
                        }, {
                            bidder: "adriver",
                            params: {
                                placementId: "136:playground_728x90_content",
                                additional: {
                                    ext: {
                                        query: "custom=10=136&cid=" + localStorage.getItem("adrcid")
                                    }
                                }
                            }
                        }]
                    }]), window.yaContextCb.push((function() {
                        window.Ya.adfoxCode.create({
                            ownerId: 1458764,
                            sequentialLoading: !0,
                            containerId: n,
                            onError: function(e) {
                                document.getElementById("mobile_in_article_" + t).classList.add("stub")
                            },
                            onStub: function() {
                                document.getElementById("mobile_in_article_" + t).classList.add("stub")
                            },
                            onRender: function() {
                                document.getElementById("mobile_in_article_" + t).classList.add("view")
                            },
                            params: {
                                p1: 'czreh',
                                p2: 'ipvo'
                            },
                            lazyLoad: {
                                fetchMargin: 150,
                                mobileScaling: 2
                            }
                        })
                    }))
                })), d.insertBefore(e, k[i])
            }
        //}
    }
    if (null != t) {
        const e = t.children,
            d = e.length;
        for (let a = 4; a < d; a += 5) {
            var o = document.createElement("div");
            let d = Math.random().toString(36).substr(2, 9),
                i = "monetizeme-desktop-inread-comments-" + d;
            o.classList.add("mm_mobile_content"), o.setAttribute("id", "mobile_in_article_" + d), o.innerHTML = "<div class='mm-container'>РЕКЛАМА - ПРОДОЛЖЕНИЕ НИЖЕ<div id='" + i + "' class='mm-content-mobile'></div></div>", window.Ya.adfoxCode.hbCallbacks.push((function() {
                window.YaHeaderBiddingSettings = {
                    biddersMap: {
                        astralab: "2365332",
                        buzzoola: "2365409",
                        videonow: "2365411",
                        sape: "2365419",
                        mediasniper: "2365420",
                        adfox_adsmart: "2365424",
                        myTarget: "2365426",
                        adriver: "2365427",
                        bidvol: "2365429",
                        otm: "2374742"
                    },
                    timeout: 1500
                }, window.Ya.headerBidding.pushAdUnits([{
                    code: i,
                    codeType: "combo",
                    sizes: [
                        [728, 90],
                        [300, 250],
                        [0, 0],
                        [300, 100],
                        [300, 300],
                        [320, 250],
                        [336, 280],
                        [580, 400]
                    ],
                    bids: [{
                        bidder: "astralab",
                        params: {
                            placementId: "648196948dc2ca0395d87703"
                        }
                    }, {
                        bidder: "buzzoola",
                        params: {
                            placementId: "1249289"
                        }
                    }, {
                        bidder: "videonow",
                        params: {
                            placementId: "6387876"
                        }
                    }, {
                        bidder: "sape",
                        params: {
                            placementId: "849811"
                        }
                    }, {
                        bidder: "adfox_adsmart",
                        params: {
                            p1: "cykmz",
                            p2: "ul"
                        }
                    }, {
                        bidder: "adriver",
                        params: {
                            placementId: "136:playground_728x90_comments",
                            additional: {
                                ext: {
                                    query: "custom=10=136&cid=" + localStorage.getItem("adrcid")
                                }
                            }
                        }
                    }]
                }]), window.yaContextCb.push((function() {
                    window.Ya.adfoxCode.create({
                        ownerId: 1458764,
                        sequentialLoading: !0,
                        containerId: i,
                        onError: function(e) {
                            document.getElementById("mobile_in_article_" + d).classList.add("stub")
                        },
                        onStub: function() {
                            document.getElementById("mobile_in_article_" + d).classList.add("stub")
                        },
                        onRender: function() {
                            document.getElementById("mobile_in_article_" + d).classList.add("view")
                        },
                        params: {
                            p1: 'czreh',
                            p2: 'ipvo'
                        },
                        lazyLoad: {
                            fetchMargin: 150,
                            mobileScaling: 2
                        }
                    })
                }))
            })), t.insertBefore(o, e[a])
        }
    }
}
;