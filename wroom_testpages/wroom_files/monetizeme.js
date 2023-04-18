
if (window.matchMedia('(max-width: 768px)').matches) {

    document.addEventListener("DOMContentLoaded", function(event) {
        const body = document.querySelector("body")
        //Adding mobile fs banner 
        const mobile_fs = document.createElement('div');
        mobile_fs.setAttribute('id', 'monetizeme-mobile-fs');

        window.yaContextCb.push(()=>{
                Ya.adfoxCode.create({
                    ownerId: 1458764,
                    containerId: 'monetizeme-mobile-fs',
                    params: {
                        pp: 'g',
                        ps: 'gmdq',
                        p2: 'ihud'
                    }
                })
            })

        document.body.insertAdjacentElement('afterbegin', mobile_fs)

        //Adding top sticky banner and make him scroll
        const stickyTop = document.createElement('div');
        stickyTop.classList.add('monetizeme-block-top');
        stickyTop.setAttribute('id', 'sticky_top');
        stickyTop.innerHTML = `
        <div class="button-top-close"></div>
        <button class="mm_button_top">^</button>
        <div id="monetizeme-sticky-top"></div>`; //add here code of banner


        window.yaContextCb.push(() => {
            Ya.adfoxCode.create({
                ownerId: 1458764,
                containerId: 'monetizeme-sticky-top',
                params: {
                    pp: 'g',
                    ps: 'gmdq',
                    p2: 'ihue'
                }
            })
        })

        document.body.insertAdjacentElement('afterbegin', stickyTop)

        //Adding bottom sticky banner and make him scroll
        const stickyBottom = document.createElement('div');
        stickyBottom.classList.add('monetizeme-block-bottom', 'collapsed');
        stickyBottom.setAttribute('id', 'sticky_bottom');
        stickyBottom.innerHTML = `
        <div class="button-bottom-close"></div>
        <button class="mm_button_bottom ">^</button>
        <div id="monetizeme-sticky-bottom"></div>`;

        window.yaContextCb.push(() => {
            Ya.adfoxCode.create({
                ownerId: 1458764,
                containerId: 'monetizeme-sticky-bottom',
                params: {
                    pp: 'i',
                    ps: 'gmdq',
                    p2: 'ihuf'
                }
            })
        })

        document.body.insertAdjacentElement('afterbegin', stickyBottom)

        //top sticky banner
        var topBlock = document.querySelector('.monetizeme-block-top');
        var topButton = document.querySelector('.button-top-close');
        var isTopBlockCollapsed = false;

        //bottom sticky banner
        var bottomBlock = document.querySelector('.monetizeme-block-bottom');
        var bottomButton = document.querySelector('.button-bottom-close');
        var isBottomBlockCollapsed = true;

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
            if (currentScrollTop <= (lastScrollTop - 5) && !isBottomBlockCollapsed && window.scrollY >= 100) {
                bottomBlock.classList.add('collapsed');
                isBottomBlockCollapsed = true;
            } else if (currentScrollTop > lastScrollTop && isBottomBlockCollapsed && window.scrollY >= 100) {
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

        //Add blocks to article
        const textBlock = document.querySelector(".text-block");
        const artcicleBlock = document.querySelector('span[itemprop="articleBody"]')
        const articleBottomBlock = document.querySelector(".news-tag")
        const commentsBlock = document.querySelector(".comment2")
        const after_commentsBlock = document.querySelector('form[name="addcomment"]')
        const main_pageBlock = document.querySelector("body > div.content-page > div:nth-child(5) > div:nth-child(1) > div.col-md-8 > div.row.index-news-2 > div:nth-child(2)")
        if (textBlock != null) {

            //add mobile after cover
            const mobile_before_articleElement = document.createElement("div");
            mobile_before_articleElement.classList.add('mm_mobile_content');
            mobile_before_articleElement.setAttribute('id', 'mobile_before_article');
            mobile_before_articleElement.innerHTML = `<div id="monetizeme-mobile-inread-after-cover" style="display:block"></div>`;
            window.yaContextCb.push(()=>{
                Ya.adfoxCode.create({
                    ownerId: 1458764,
                    containerId: 'monetizeme-mobile-inread-after-cover',
                    params: {
                        pp: 'dkuj',
                        ps: 'gmdq',
                        p2: 'ihug'
                    }
                })
            })
            textBlock.parentNode.insertBefore(mobile_before_articleElement, textBlock);

            //add mobile in article each 4 elements

            const children = artcicleBlock.children;
            const len = children.length;
            for (let i = 4; i < len; i += 5) {
                var mobile_in_article = document.createElement("div");
                let mmId = Math.random().toString(36).substr(2, 9)
                let mm_adfox_id = 'monetizeme-mobile-inread-article-' + mmId
                mobile_in_article.classList.add('mm_mobile_content');
                mobile_in_article.setAttribute('id', 'mobile_in_article_' + mmId );
                mobile_in_article.innerHTML = "<div id='monetizeme-mobile-inread-article-"+ mmId +"'></div>";

                window.yaContextCb.push(()=>{
                    Ya.adfoxCode.create({
                        ownerId: 1458764,
                        containerId: mm_adfox_id,
                        params: {
                            pp: 'dkuk',
                            ps: 'gmdq',
                            p2: 'ihug'
                        }
                    })
                })

                artcicleBlock.insertBefore(mobile_in_article, children[i]);
            }

            //add mobile after article
            if  (articleBottomBlock != null){
                const mobile_article_bottom = document.createElement("div");
                mobile_article_bottom.classList.add('mm_mobile_content');
                mobile_article_bottom.setAttribute('id', 'mobile_after_article');
                mobile_article_bottom.innerHTML = `<div id="monetizeme-mobile-inread-after-article" style="display:block"></div>`;
                articleBottomBlock.parentNode.insertBefore(mobile_article_bottom, articleBottomBlock);

                window.yaContextCb.push(()=>{
                    Ya.adfoxCode.create({
                        ownerId: 1458764,
                        containerId: 'monetizeme-mobile-inread-after-article',
                        params: {
                            pp: 'dkun',
                            ps: 'gmdq',
                            p2: 'ihug'
                        }
                    })
                })
            }


        }
        if (main_pageBlock != null){
            const mobile_mainpage_articleElement = document.createElement("div");
            mobile_mainpage_articleElement.classList.add('mm_mobile_content');
            mobile_mainpage_articleElement.setAttribute('id', 'mobile_mainpage_article');
            mobile_mainpage_articleElement.innerHTML = `<div id="monetizeme-mobile-mainpage" style="display:block"></div>`;
            window.yaContextCb.push(()=>{
                Ya.adfoxCode.create({
                    ownerId: 1458764,
                    containerId: 'monetizeme-mobile-mainpage',
                    params: {
                        pp: 'dkuj',
                        ps: 'gmdq',
                        p2: 'ihug'
                    }
                })
            })
            main_pageBlock.parentNode.insertBefore(mobile_mainpage_articleElement, main_pageBlock);
        }

        //Add blocks to comments
        if (commentsBlock != null) {
            var parent = commentsBlock;
            var children_comments = parent.querySelectorAll('.comment-item');
            for (var i = 4; i < children_comments.length; i += 4) {
                var mobile_in_comments = document.createElement('div');
                const mmId = Math.random().toString(36).substr(2, 9)
                const mm_adfox_id = 'monetizeme-mobile-inread-comments-' + mmId
                mobile_in_comments.classList.add('mm_mobile_content');
                mobile_in_comments.setAttribute('id', 'mobile_in_comments_' + mmId);
                mobile_in_comments.innerHTML = "<div id='monetizeme-mobile-inread-comments-"+ mmId +"'></div>";

                window.yaContextCb.push(()=>{
                    Ya.adfoxCode.create({
                        ownerId: 1458764,
                        containerId: mm_adfox_id,
                        params: {
                            pp: 'dkuo',
                            ps: 'gmdq',
                            p2: 'ihug'
                        }
                    })
                })

                parent.insertBefore(mobile_in_comments, children_comments[i]);
            }
            const mobile_comments_bottom = document.createElement("div");
            mobile_comments_bottom.classList.add('mm_mobile_content');
            mobile_comments_bottom.setAttribute('id', 'mobile_after_comments');
            mobile_comments_bottom.innerHTML = `<div id="monetizeme-mobile-after-comments" style="display:block"></div>`;

            window.yaContextCb.push(()=>{
                Ya.adfoxCode.create({
                    ownerId: 1458764,
                    containerId: 'monetizeme-mobile-after-comments',
                    params: {
                        pp: 'dkup',
                        ps: 'gmdq',
                        p2: 'ihug'
                    }
                })
            })

            after_commentsBlock.insertAdjacentElement("afterend", mobile_comments_bottom);
        }

    })
}else{
    document.addEventListener("DOMContentLoaded", function(event) {

        const body = document.querySelector("body")
        const stickyBottom = document.createElement('div');
        stickyBottom.classList.add('monetizeme-desktop-sticky-bottom');
        stickyBottom.setAttribute('id', 'sticky_bottom');
        stickyBottom.innerHTML = `
        <div class="button-bottom-close-desktop"></div>
        <button class="mm_button_bottom-desktop">×</button>
        <div id="monetizeme-sticky-bottom" style="width:700px;height:100px;background:red;"></div>`;
        document.body.insertAdjacentElement('afterbegin', stickyBottom)
        //bottom sticky banner
        var bottomButton = document.querySelector('.button-bottom-close-desktop');
        bottomButton.addEventListener('click', function() {
            document.getElementById("sticky_bottom").remove();
        });

        const textBlock = document.querySelector(".text-block");
        const sideBlock = document.querySelector(".sideblock")
        const sideBlock_second = document.querySelector("body > div.content-page > div:nth-child(5) > div > div.col-12.col-xl-4.side > div > div.top-news")
        const artcicleBlock = document.querySelector('span[itemprop="articleBody"]')
        const articleBottomBlock = document.querySelector(".news-tag")
        const commentsBlock = document.querySelector(".comment2")
        const after_commentsBlock = document.querySelector('form[name="addcomment"]')

        if (sideBlock != null){
            const desktop_side = document.createElement("div");
            desktop_side.classList.add('mm_desktop_side_content');
            desktop_side.setAttribute('id', 'desktop_side');
            desktop_side.innerHTML = `<div id="monetizeme-desktop-side-first" style="display:block"></div>`;
            window.yaContextCb.push(()=>{
                Ya.adfoxCode.create({
                    ownerId: 1458764,
                    containerId: 'monetizeme-desktop-side-first',
                    params: {
                        pp: 'g',
                        ps: 'gmdq',
                        p2: 'ieea'
                    }
                })
            })

            sideBlock.insertAdjacentElement('afterbegin', desktop_side)
        }
        if (sideBlock_second != null){
            const desktop_side_second = document.createElement("div");
            desktop_side_second.classList.add('mm_desktop_side_content');
            desktop_side_second.setAttribute('id', 'desktop_side_second');
            desktop_side_second.innerHTML = `<div id="monetizeme-desktop-side-second" style="display:block"></div>`;
            window.yaContextCb.push(()=>{
                Ya.adfoxCode.create({
                    ownerId: 1458764,
                    containerId: 'adfox_16818282772214079',
                    params: {
                        pp: 'h',
                        ps: 'gmdq',
                        p2: 'ihua'
                    }
                })
            })

            sideBlock_second.insertAdjacentElement('afterend', desktop_side_second)
        }
        if (textBlock != null) {

            //add mobile after cover
            const desktop_before_articleElement = document.createElement("div");
            desktop_before_articleElement.classList.add('mm_desktop_content');
            desktop_before_articleElement.setAttribute('id', 'desktop_before_article');
            desktop_before_articleElement.innerHTML = `<div id="monetizeme-desktop-inread-after-cover" class="adfox_inread_desktop" style="display:block"></div>`;

            window.Ya.adfoxCode.hbCallbacks.push(function() {
                window.yaContextCb.push(function() {
                    window.Ya.adfoxCode.create({
                        containerId: 'monetizeme-desktop-inread-after-cover',
                        params: {
                            pp: 'dkug',
                            ps: 'gmdq',
                            p2: 'iegj'
                    })
                })
            })
            



            textBlock.parentNode.insertBefore(desktop_before_articleElement, textBlock);

            //add mobile in article each 4 elements

            const children = artcicleBlock.children;
            const len = children.length;
            for (let i = 4; i < len; i += 5) {
                const desktop_in_article = document.createElement("div");
                const mmId = Math.random().toString(36).substr(2, 9)
                const mm_adfox_id = 'monetizeme-desktop-inread-article-' + mmId
                desktop_in_article.classList.add('mm_desktop_content');
                desktop_in_article.setAttribute('id', 'desktop_in_article_' + mmId );
                desktop_in_article.innerHTML = "<div id='monetizeme-desktop-inread-article-"+ mmId +"' class='adfox_inread_desktop'></div>";

                window.yaContextCb.push(()=>{
                    Ya.adfoxCode.create({
                        ownerId: 1458764,
                        containerId: mm_adfox_id,
                        params: {
                            pp: 'dkul',
                            ps: 'gmdq',
                            p2: 'iegj'
                        }
                    })
                })

                artcicleBlock.insertBefore(desktop_in_article, children[i]);
            }

            //add mobile after article

            if (articleBottomBlock != null){

                const desktop_article_bottom = document.createElement("div");
                desktop_article_bottom.classList.add('mm_desktop_content');
                desktop_article_bottom.setAttribute('id', 'desktop_after_article');
                desktop_article_bottom.innerHTML = `<div id= "monetizeme-desktop-inread-article-bottom" class="adfox_inread_desktop"></div>`;
                
                window.yaContextCb.push(()=>{
                    Ya.adfoxCode.create({
                        ownerId: 1458764,
                        containerId: 'monetizeme-desktop-inread-article-bottom',
                        params: {
                            pp: 'dkuh',
                            ps: 'gmdq',
                            p2: 'iegj'
                        }
                    })
                })


                articleBottomBlock.insertAdjacentElement('afterend', desktop_article_bottom)

            } 

        }
        //Add blocks to comments
        if (commentsBlock != null) {
            var parent = commentsBlock;
            var children_comments = parent.querySelectorAll('.comment-item');
            for (var i = 4; i < children_comments.length; i += 4) {
                var desktop_in_comments = document.createElement('div');
                const mmId = Math.random().toString(36).substr(2, 9)
                const mm_adfox_id = 'monetizeme-desktop-inread-comments-' + mmId
                desktop_in_comments.classList.add('mm_desktop_content');
                desktop_in_comments.setAttribute('id', 'desktop_in_comments_' + mmId);
                desktop_in_comments.innerHTML = `<div style="display:block;width:800px;height:280px;background:red;"></div>`;
                desktop_in_comments.innerHTML = "<div id='monetizeme-desktop-inread-comments-"+ mmId +"' class='adfox_inread_desktop'></div>";

                window.yaContextCb.push(()=>{
                    Ya.adfoxCode.create({
                        ownerId: 1458764,
                        containerId: mm_adfox_id,
                        params: {
                            pp: 'dkui',
                            ps: 'gmdq',
                            p2: 'iegj'
                        }
                    })
                })

                parent.insertBefore(desktop_in_comments, children_comments[i]);
            }
            const desktop_comments_bottom = document.createElement("div");
            desktop_comments_bottom.classList.add('mm_desktop_content');
            desktop_comments_bottom.setAttribute('id', 'desktop_after_comments');
            desktop_comments_bottom.innerHTML = `<div id= "monetizeme-desktop-coomments-bottom" class="adfox_inread_desktop"></div>`;
            
            window.yaContextCb.push(()=>{
                Ya.adfoxCode.create({
                    ownerId: 1458764,
                    containerId: 'monetizeme-desktop-coomments-bottom',
                    params: {
                        pp: 'dkum',
                        ps: 'gmdq',
                        p2: 'iegj'
                    }
                })
            })



            after_commentsBlock.insertAdjacentElement("afterend", desktop_comments_bottom);
        }
    })
}

setInterval(function() {
  Ya.adfoxCode.reload(containerId, {onlyIfWasVisible: true});
}, 15000);