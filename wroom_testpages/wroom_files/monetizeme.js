if (window.matchMedia('(max-width: 768px)').matches) {

    document.addEventListener("DOMContentLoaded", function(event) {
        body = document.querySelector("body")

        //Adding top sticky banner and make him scroll
        const stickyTop = document.createElement('div');
        stickyTop.classList.add('monetizeme-block-top');
        stickyTop.setAttribute('id', 'sticky_top');
        stickyTop.innerHTML = `
    <div class="button-top-close"></div>
    <button class="mm_button_top">^</button>
    <div id="monetizeme-sticky-top"></div>`; //add here code of banner
    

    window.yaContextCb.push(()=>{
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

    window.yaContextCb.push(()=>{
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
            if (currentScrollTop <= lastScrollTop && !isBottomBlockCollapsed) {
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

        //Add blocks to article
        const textBlock = document.querySelector(".text-block");
        const artcicleBlock = document.querySelector("body > div.content-page > div:nth-child(5) > div > div.col-12.col-xl-8.maintext > div:nth-child(2) > div.text-block > span")
        const articleBottomBlock = document.querySelector("body > div.content-page > div:nth-child(5) > div > div.col-12.col-xl-8.maintext > a:nth-child(8)")
        const commentsBlock = document.querySelector("body > div.content-page > div:nth-child(5) > div > div.col-12.col-xl-8.maintext > div.comment2")
        const after_commentsBlock = document.querySelector("body > div.content-page > div:nth-child(5) > div > div.col-12.col-xl-8.maintext > form")
        if (textBlock != null) {
        	
        	//add mobile after cover
        	const mobile_before_articleElement = document.createElement("div");
            mobile_before_articleElement.classList.add('mm_mobile_content');
            mobile_before_articleElement.setAttribute('id', 'mobile_before_article');
            mobile_before_articleElement.innerHTML = `<div style="width: 320px; height: 300px; background: red;"></div>`;
            textBlock.parentNode.insertBefore(mobile_before_articleElement, textBlock);

            //add mobile in article each 4 elements
            
            const children = artcicleBlock.children;
            const len = children.length;
            for (let i = 4; i < len; i += 5) {
            	const mobile_in_article = document.createElement("div");
                mobile_in_article.classList.add('mm_mobile_content');
                mobile_in_article.setAttribute('id', 'mobile_in_article_' + Math.random().toString(36).substr(2, 9));
                mobile_in_article.innerHTML = ` <div style="width: 320px; height: 300px; background: red;"></div>`;
                artcicleBlock.insertBefore(mobile_in_article, children[i]);
            }

            //add mobile after article 
            const mobile_article_bottom = document.createElement("div");
            mobile_article_bottom.classList.add('mm_mobile_content');
            mobile_article_bottom.setAttribute('id', 'mobile_before_article');
            mobile_article_bottom.innerHTML = `<div style="width: 320px; height: 300px; background: red;"></div>`;
            articleBottomBlock.parentNode.insertBefore(mobile_article_bottom, articleBottomBlock);
        }

        //Add blocks to comments
        if (commentsBlock != null){
        	var parent = commentsBlock;
        	  var children_comments = parent.querySelectorAll('.comment-item');
        	  for (var i = 4; i < children_comments.length; i += 4) {
        	    var mobile_in_comments = document.createElement('div');
        	    mobile_in_comments.classList.add('mm_mobile_content');
        	    mobile_in_comments.setAttribute('id', 'mobile_in_comments_' + Math.random().toString(36).substr(2, 9));
                mobile_in_comments.innerHTML = ` <div style="width: 320px; height: 300px; background: red;"></div>`;
        	    parent.insertBefore(mobile_in_comments, children_comments[i]);
        	  }
        	const mobile_comments_bottom = document.createElement("div");
        	mobile_comments_bottom.classList.add('mm_mobile_content');
        	mobile_comments_bottom.setAttribute('id', 'mobile_after_comments');
            mobile_comments_bottom.innerHTML = `<div style="width: 320px; height: 300px; background: red;"></div>`;
            after_commentsBlock.insertAdjacentElement("afterend", mobile_comments_bottom);
        }



    })
}