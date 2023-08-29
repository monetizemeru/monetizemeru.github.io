function add_dektop_banners_fc(){
    const article_block = document.querySelector('[itemprop = articleBody]')
    if (article_block != null ) {
                    const children = article_block.children;
                    const len = children.length;
                    for (let i = 1; i < len; i += 6) {
                        const desktop_in_article = document.createElement("div");
                        const mmId = Math.random().toString(36).substr(2, 9)
                        const mm_adfox_id = 'monetizeme-desktop-inread-article-' + mmId
                        desktop_in_article.classList.add('mm_desktop_content');
                        desktop_in_article.setAttribute('id', 'desktop_in_article_' + mmId);
                        desktop_in_article.setAttribute('style', '    background: #f4f2ee;width: calc(100% - 2px);display: flex;justify-content: center;margin: 40px 0px;padding: 20px 20px;');
                        desktop_in_article.innerHTML = "<div id='monetizeme-desktop-inread-article-" + mmId + "'></div>";

                        window.yaContextCb.push(()=>{
                                Ya.adfoxCode.create({
                                    ownerId: 1458764,
                                    containerId: mm_adfox_id,
                                    params: {
                                        pp: 'h',
                                        ps: 'gsuv',
                                        p2: 'iegj'
                                    }
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
                                        const len = children.length;
                                        for (let i = 2; i < len; i += 4) {
                                            const desktop_in_article = document.createElement("div");
                                            const mmId = Math.random().toString(36).substr(2, 9)
                                            const mm_adfox_id = 'monetizeme-desktop-inread-article-' + mmId
                                            desktop_in_article.classList.add('mm_desktop_content');
                                            desktop_in_article.setAttribute('id', 'desktop_in_article_' + mmId);
                                            desktop_in_article.setAttribute('style', '    background: #f4f2ee;width: calc(100% - 2px);display: flex;justify-content: center;margin: 40px 0px;padding: 20px 20px');
                                            desktop_in_article.innerHTML = "<div id='monetizeme-desktop-inread-article-" + mmId + "'></div>";

                                            window.yaContextCb.push(()=>{
                                                    Ya.adfoxCode.create({
                                                        ownerId: 1458764,
                                                        containerId: mm_adfox_id,
                                                        params: {
                                                            pp: 'h',
                                                            ps: 'gsuv',
                                                            p2: 'iegj'
                                                        }
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

if (window.matchMedia('(max-width: 2768px)').matches) {
    //document.addEventListener("DOMContentLoaded", function(event) {
        var first_div = document.querySelector('.js__read-more-article')
        if (first_div.querySelector('article').classList.contains('interview-content-wrapper') != true){
            add_dektop_banners_fc()
        }
        add_dektop_banners_sc()
    //});
}


//if ( document.querySelector('main').classList.contains('exclusive') != true){
  //  add_banners_content()
//}
