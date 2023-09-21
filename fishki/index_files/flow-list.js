(function ($) {
    function appendColorBox($append) {
        var $images = $append.find('.comment-image');
        if (!$images.colorbox) {
            return;
        }

        $images.colorbox({
            maxWidth: "95%",
            min_innerWidth: '600px',
            current: '{current}/{total}',
            title: function () {
                return '<a href="' + $(this).attr('href') + '" target="_blank">Просмотр в новой вкладке</a>';
            },
            onOpen: function () {
                $('#cboxContent #cboxBottom').remove();
                if ((typeof window.flag_admin == "undefined") || !window.flag_admin)
                    $('#cboxContent').append($(this).attr('data-content'));
                $(document).one('cbox_closed', function () {
                    fishki_popup.stop();
                });
            }
        });
    }

    $.fn.jamFlow = function (options) {
        var settings = {
            base_uri: '',
            page: '',
            pages: '',
            old_page: '',
            bottom_anchor_id: 'flow-anchor', // id! not selector
            right_side_bottom_anchor_id: 'right-flow-anchor', // id! not selector
            ts: 0,
            update_interval: 120000,
            loader_selector: '',
            old_loader_selector: '',
            loader_timeout: 1000,
            load_more_selector: '',
            load_old_selector: '',
            load_nextpost_selector: '',
            load_post_limit: 100,
            scroll_mode: 0,
            recent_min_pubdate: null,
            doubles: 0,
            short_page: 0
        };

        if (options) $.extend(settings, options);

        var $context = this;
        var numFlowPost = 0;
        var loadMore = {
            before: [],
            after: []
        };

        window.jamFlow = $context;
        $context.isMobile = $('body').hasClass('mobile_version');
        $context.old_scroll_top = 0;
        $context.scroll_pages = 1;
        $context.loadingAdditionalContent = false;
        $context.endPostList = false;
        $context.waitButton = false;
        $context.settings = settings;
        $context.load_post_count = settings.load_post_limit - 1;
        $context.settings.page++; // next page
        if ($('#' + settings.bottom_anchor_id).length == 0)
            $context.append('<div id="' + settings.bottom_anchor_id + '" style="height:1px"></div>'); // Adding element for find offset to bottom of blocks wrapper

        if (!window.flowlist)
            window.flowlist = {
                otherJs: false,
                placeholdersJs: false,
                placeholders: {},
                element: false,
                dataheader: {},
            };

        $context.is_load_additional_content = function () {
            var scrT = $(document).scrollTop();
            var winH = $(window).height(), ploT, scrB;
            //var docH = $(document).height();
            if ($context.settings.scroll_mode) {
                ploT = $('#' + $context.settings.bottom_anchor_id).offset().top - Math.floor(winH / 2);
                scrB = scrT;
            } else {
                ploT = $('#' + $context.settings.bottom_anchor_id).offset().top - 500;
                scrB = scrT + winH;
            }
            return (scrB > ploT); // && (scrB < docH); // Uncomment second clause if you want to disable flow then at end of page
        };

        $context.uri_link = function (page) {
            var $d = {};
            if ($context.settings.base_uri.indexOf('$') > 0) {
                if ($context.settings.short_page && page == 1) {
                    var p = $context.settings.base_uri.split('/p/$', 2);
                    $d.uriNew = '' + p[0] + p[1]; // Вместо /p/1 должна быть пустая строка
                } else {
                    var p = $context.settings.base_uri.split('$', 2);
                    $d.uriNew = ('' + p[0] + (page == 1 ? '' : page) + p[1]); // Вместо 1 должна быть пустая строка (7405)
                }
            } else {
                $d.uriNew = $context.settings.base_uri + '' + page;
            }
            if ($d.uriNew.length > 9) {
                $d.uriReal = $d.uriNew;
            } else {
                $d.uriReal = "/ispaginator" + $d.uriNew;
            }
            return $d;
        }

        $context.load_more_content = function (button) {
            $context.loadingAdditionalContent = true;
            if ((!$context.settings.pages || ($context.settings.page <= $context.settings.pages)) && ($context.settings.page > 0)) {
                if ($context.scroll_pages % 5 === 0 && settings.load_more_selector) {
                    if (button == 'load_more' || button == 'arrow_next') {
                        $(settings.load_more_selector).hide();
                    } else {
                        $(settings.load_more_selector).show();
                        return;
                    }
                }

                if ($context.settings.loader_selector) {
                    $($context.settings.loader_selector).show();
                }

                var $uriNew = $context.uri_link($context.settings.page);

                for (var i in loadMore.before) {
                    loadMore.before[i]();
                }

                console.log('LOADING: ', $uriNew.uriNew);
                $.ajax({
                    type: 'post',
                    data: 'ts=' + $context.settings.ts + '&ajax=1' + ($context.settings.recent_min_pubdate ? "&recent_min_pubdate=" + $context.settings.recent_min_pubdate : ""),
                    url: $uriNew.uriReal, // todo: url template
                    dataType: 'json'
                }).done(function (response) {
                    if (response) {
                        if (response.recent_min_pubdate) {
                            $context.settings.recent_min_pubdate = response.recent_min_pubdate;
                        }
                        if (response['html']) {
                            response['html'] = response['html'].replace(/text\/lazyscript/g, "text/javascript");
                            var $listViewItems = $('.list-view-items');
                            if ($listViewItems.length) {
                                var $for_append = $(response['html']);
                                var $inner = $for_append.find('.post-list');
								var adaptive = $('body').hasClass('fishki_adaptive');
                                if ($for_append.hasClass('app__cols')) {
                                    $listViewItems.append($inner.html());
                                    $.getJSON('/ajax_sidebar/', function (json) {
                                        if (json && json.html) {
                                            $('.app__side').append(json.html);
                                        }
                                    });
                                } else if (adaptive || $for_append.hasClass('list-view') && !$inner.length) {
                                    $listViewItems.append($for_append.find('.list-view-items').html());
                                } else if ($for_append.hasClass('list-view')) {
                                    $listViewItems.append($inner.html());
                                } else {
                                    $listViewItems.append($for_append);
                                }
                            }

                            try {
                                if (!fishki.params.is_new_design)
                                    appendColorBox($for_append);
                            } catch (e) {

                            }
                            if (typeof embededRefresh != 'undefined')
                                embededRefresh();
                            if (fishki.scroll && fishki.scroll.scrollLazyLoadInit && fishki.params.enable && fishki.params.enable.hidden_img_lazy) {
                                fishki.scroll.scrollLazyLoadInit();
                            }

                            $("#current_page").attr('value', $context.settings.page);
                            try {
                                if (window.history && history.pushState) {
                                    if ($context.settings.page <= 1) {
                                        $uriNew = $context.uri_link(1);
                                    }
                                    history.pushState(null, null, $uriNew.uriNew);
                                }
                            } catch (e) {
                            }
                            $context.settings.page++;

                            try {
                                if (typeof tnsCounterAnews_com != "undefined") {
                                    tnsCounterAnews_com.hit('fishki_site');
                                }
                            } catch (e) {
                            }

                            //$context.resize_blocks(false);
                        } else $context.settings.pages = $context.settings.page + 1;

                        if ($context.settings.loader_selector) {
                            $($context.settings.loader_selector).hide();
                            /*$context.show_loader = false;*/
                        }
                        $context.scroll_pages++;
                        $context.loadingAdditionalContent = false;
                        if (button === 'arrow_next') navigate('bottom');
                    }

                    for (var i in loadMore.after) {
                        loadMore.after[i]();
                    }

                    if ($context.settings.loader_selector) {
                        $($context.settings.loader_selector).hide();
                    }
                    $context.loadingAdditionalContent = false;

                }).fail(function (e) {
                    if ($context.settings.loader_selector) {
                        $($context.settings.loader_selector).hide();
                    }
                    $context.loadingAdditionalContent = false;
                });
            } else {
                $context.loadingAdditionalContent = false;
            }
        }

        // Добавление слушателей события подгрузки контента
        $context.load_more_content.addEventListener = function (fn, moment) {
            moment = ((typeof moment !== 'undefined') ? moment : 'after');

            if (typeof fn === 'function') {
                if (typeof loadMore[moment] !== 'undefined') {
                    loadMore[moment].push(fn);
                } else {
                    new Error('Неправильно указан момент срабатывания слушателя');
                }
            } else {
                new Error('Слушатель должен быть функцией');
            }
        }

        $context.load_old_content = function (button) {
            var h1, h2, h3;
            if ($context.settings.old_page > 1) {
                if ($context.settings.old_loader_select) {
                    $($context.settings.old_loader_select).show();
                }
                var ajaxData = {
                    ts: $context.settings.ts,
                    ajax: 1
                }
                if ($context.settings.recent_min_pubdate) {
                    ajaxData.recent_min_pubdate = $context.settings.recent_min_pubdate;
                }
                $context.settings.old_page = $context.settings.old_page - 1;
                if (window.history && history.pushState) {
                    if ($context.settings.old_page > 1) {
                        history.pushState(null, null, $context.uri_link($context.settings.old_page).uriNew + '/');
                    } else {
                        history.pushState(null, null, $context.uri_link(1).uriNew);
                    }
                }

                $.ajax({
                    type: 'POST',
                    data: ajaxData,
                    url: $context.uri_link($context.settings.old_page).uriReal, // todo: url template
                    dataType: 'json',
                    success: function (response) {
                        if (response) {
                            if (response.recent_min_pubdate) {
                                $context.settings.recent_min_pubdate = response.recent_min_pubdate;
                            }
                            if (response['html']) {
                                response['html'] = response['html'].replace(/text\/lazyscript/g, "text/javascript");
                                h1 = $('.list-view-items').height();
                                $('.list-view-items').prepend(response['html']);
                                if (typeof embededRefresh != 'undefined') {
                                    embededRefresh();
                                }
                                if (fishki.scroll && fishki.scroll.scrollLazyLoadInit && fishki.params.enable && fishki.params.enable.hidden_img_lazy) {
                                    fishki.scroll.scrollLazyLoadInit();
                                }
                                h2 = $('.list-view-items').height();
                                $(document).scrollTop(h2 - h1 + 1000);
                                $("#current_page").attr('value', $context.settings.old_page);
                                $("span #old_page_number").text($context.settings.old_page - 1);
                            }
                            if ($context.settings.old_page <= 1) {
                                $("#block_old_more").hide();
                            }
                            if ($context.settings.old_loader_selector) {
                                $($context.settings.old_loader_selector).hide();
                            }
                        }
                    }
                });
            } else {
                $("#block_old_more").hide();
            }
        }

        $context.load_nextpost_content = function (direct, reloadPage) {
            if ($context.endPostList || $context.waitButton)
                return;

            direct = direct || false;
            reloadPage = reloadPage || false 

            $context.loadingAdditionalContent = true;
            var $uriNew = $context.settings.base_uri;
            $uriNew += ($uriNew.indexOf('?') ? '&' : '?') + 'num=' + numFlowPost
            console.log('LOADING POST: ', $uriNew);
            if (reloadPage || (!$context.settings.scroll_mode && direct)) {
                page_reload($uriNew.replace('/readpost/', '/read/'));
            } else {
                if ($context.settings.loader_selector) {
                    $($context.settings.loader_selector).show();
                    var fid = "#" + (fishki && fishki.params && fishki.params.banner_float1 ? fishki.params.banner_float1 : 'banner_float1');
                    var height_float = $(fid).height();
                    $($context.settings.loader_selector).after('<div id="banner_float_space" class="banner_float_space"></div>');
                    $('#banner_float_space').css('height', height_float + 'px');
                }
                $.ajax({
                    type: 'post',
                    url: $uriNew,
                    dataType: 'json'
                }).done(function (response) {
                    if (response) {
                        if (response['html'] && $('.' + response['class']).length == 0) {
                            $context.settings.doubles = 0;
                            numFlowPost++;

                            response['html'] = response['html'].replace(/text\/lazyscript/g, "text/javascript");
                            if (!window.sideScrollId) {
                                window.sideScrollId = $('.wrapidpost').attr('data-current_post_id') + '_' + $('.wrapidpost').attr('data-current_gal_id');
                                history.pushState(null, document.title, window.location.pathname + window.location.search);
                            }

                            if ($context.settings.loader_selector) {
                                $($context.settings.loader_selector).remove();
                            }

                            if ($('#' + settings.bottom_anchor_id).length)
                                $('#' + settings.bottom_anchor_id).remove();

                            var html = $(response['html']);
                            var header = $(response['header']).html();
                            var rawHtml = response['raw_html'] ? response['raw_html'] : '';

                            var head_ids = $('.wrapidpost:last').attr('data-current_post_id') + '_' + $('.wrapidpost:last').attr('data-current_gal_id');
                            if (!window.flowlist.dataheader[head_ids]) {
                                window.flowlist.dataheader[head_ids] = $('.header-post').html();
                                $('.wrapidpost:last').attr('data-base_uri', window.location.pathname + window.location.search);
                            }

                            window.flowlist.is_scroll = window.flowlist.element = window.flowlist.otherJs = window.flowlist.placeholders = null;
                            window.flowlist.placeholdersJs = window.flowlist.placeholdersJs && window.flowlist.placeholdersJs.length ? window.flowlist.placeholdersJs : [];
                            window.flowlist.afterswipe = window.flowlist.afterswipe && window.flowlist.afterswipe.length ? window.flowlist.afterswipe : [];
                            window.flowlist.placeholders = {};
                            window.flowlist.placeholdersJs.push(solveAjaxJs(html.find('div.adv-placeholder-main')));
                            window.flowlist.is_scroll = response['is_scroll'] ? 1 : 0;
                            window.flowlist.afterswipe.push(response['afterswipe']);
                            html.find('div.adv-placeholder-main').find('script').remove();
                            window.flowlist.otherJs = solveAjaxJs(html);
                            html.find('script').remove();

                            html.find('textarea').each(function () {
                                $(this).html(''); //ie11 & jquery hack
                            });

                            var head_ids = html.find('.wrapidpost').attr('data-post-id') + '_' + html.find('.wrapidpost').attr('data-gallery-id');
                            window.flowlist.dataheader[head_ids] = header;
                            header = null;

                            if ($context.isMobile) {
                                window.flowlist.element = 'div.container.wrapidpost:last';
                                if (rawHtml) {
                                    html.find('.wrapidpost').append(rawHtml);
                                }
                                $('div.container.wrapidpost:last').after('<div class="content__separator content__separator_t"></div>' + html.html());

                            } else if (fishki.params.post_flow_mode) {
                                if (response['wide']) {
                                    window.flowlist.element = 'div.container.post:last';
                                    $('div.container.post:last').after('<div class="content__separator content__separator_t"></div>' + html);
                                } else {
                                    if (!$('.sidebar.sidebar--right').hasClass('sidebar--hidden')) {
                                        window.flowlist.element = 'div.container.post:last>.content';
                                        html = html.find('#main-content').html();
                                        $('div.container.post:last>.content').append('<div class="content__separator content__separator_t"></div>' + html);
                                    } else {
                                        window.flowlist.element = '.main-container.post:last';
                                        $('.main-container.post:last').after(html);
                                        $('.main-container.post:last .content').after($('.sidebar.sidebar--right'));
                                        $('.sidebar.sidebar--right').removeClass('sidebar--hidden');
                                        if (typeof fn_cycle_p != "undefined")
                                            fn_cycle_p.slider_sidebar();
                                    }
                                }
                            } else {
                                if (html.is('#main-content')) {
                                    window.flowlist.element = 'div.wrapidpost:last';
                                    html = html.html();
                                    $('div.wrapidpost:last').append('<div class="content__separator content__separator_t"></div>' + html);
                                } else {
                                    if (response['wide']) {
                                        window.flowlist.element = 'div.container.post:last';
                                        $('div.container.post:last').after('<div class="content__separator content__separator_t"></div>' + html);
                                    } else {
                                        window.flowlist.element = 'div.container.post:last>.content';
                                        html = html.find('#main-content').html();
                                        $('div.container.post:last>.content').append('<div class="content__separator content__separator_t"></div>' + html);
                                    }
                                }
                            }

                            html = null;

                            if (window.flowlist.element) {
                                window.flowlist.element = $(window.flowlist.element);
                                window.flowlist.element.find('div.adv-placeholder-main').each(function () {
                                    window.flowlist.placeholders[$(this).data('uri')] = $(this).html();
                                    $(this).html('');
                                });
                            }

                            runAjaxJs(window.flowlist.otherJs);
                            window.flowlist.otherJs = null;
                            if (typeof embededRefresh != 'undefined')
                                embededRefresh();
                            if (fishki.scroll && fishki.scroll.scrollLazyLoadInit && fishki.params.enable && fishki.params.enable.hidden_img_lazy) {
                                fishki.scroll.scrollLazyLoadInit();
                            }
                            try {
                                var is_mobile = ((window.innerWidth <= 640) || navigator.userAgent.match(/iPhone/i) || (navigator.userAgent.match(/Tizen/i) && navigator.userAgent.match(/Mobile/i)));
                                if (is_mobile)
                                    UIkit.init(); // data-uk-toggle reinit
                            } catch (e) {
                            }

                            $context.settings.base_uri = response['base_uri'];
                            $('.wrapidpost:last').attr('data-base_uri', response['real_uri']);

                            try {
                                if (typeof tnsCounterAnews_com != undefined) {
                                    tnsCounterAnews_com.hit('fishki_site');
                                }
                            } catch (e) {
                            }

                            if (typeof fn_cycle_p != "undefined")
                                fn_cycle_p.fn_function();

                            $context.load_post_count--;
                            if ($context.load_post_count < 1) {
                                $context.waitButton = true;
                                $context.load_post_count = settings.load_post_limit;
                                $($context.settings.load_nextpost_selector).show();
                                $($context.settings.load_nextpost_selector).after('<div id="banner_float_space_2" class="banner_float_space"></div>');
                                $('#banner_float_space_2').css('height', height_float + 'px');
                            } else {
                                $($context.settings.load_nextpost_selector).remove();
                            }
                        } else if (response['html'] && $('.' + response['class']).length > 0) {
                            numFlowPost++;
                            $context.settings.doubles++;
                            $context.settings.base_uri = response['base_uri'];
                            if ($context.settings.doubles > 2) {
                                // 3 duplicate posts = end contents (1 old, 1 ads = norm)
                                $context.endPostList = true;
                            } else {
                                $(document).scroll();
                            }
                        }

                        $context.scroll_pages++;
                        $context.loadingAdditionalContent = false;
                    }

                    if ($context.settings.loader_selector) {
                        $($context.settings.loader_selector).hide();
                        $('#banner_float_space').remove();
                    }
                    $context.loadingAdditionalContent = false;
                    response = null;
                }).fail(function () {
                    if ($context.settings.loader_selector) {
                        $($context.settings.loader_selector).hide();
                        $('#banner_float_space').remove();
                    }
                    $context.loadingAdditionalContent = false;
                });
            }
        }

        if (settings.load_more_selector) {
            $(document).on('click', settings.load_more_selector + ", " + settings.load_more_selector + " span" + ", " + settings.load_more_selector + " button", function (e) {
                e.preventDefault();
                e.stopPropagation();
                $context.load_more_content('load_more');
            });
            $(document).on('click', settings.load_old_selector + ", " + settings.load_old_selector + " span" + ", " + settings.load_old_selector + " button", function (e) {
                e.preventDefault();
                e.stopPropagation();
                $context.load_old_content('load_old');
            });
        }

        $(document).scroll(function () {
            var scrT = $(document).scrollTop();
            if (Math.abs((scrT) - ($context.old_scroll_top)) > 50) {
                $context.old_scroll_top = scrT;
                if ($context.is_load_additional_content() && !$context.loadingAdditionalContent) {
                    if (settings.load_more_selector)
                        $context.load_more_content('scroll');
                    else if (settings.load_nextpost_selector)
                        $context.load_nextpost_content();
                }
            }
        });
        if (settings.load_nextpost_selector) {
            $(document).on('click', settings.load_nextpost_selector, function () {
                $context.waitButton = false;
                $(settings.load_nextpost_selector).remove();
                $context.load_nextpost_content(true, true);
            });
        }
        $(window).on('load', function () {
            $(document).scroll();
        });
    };
})(jQuery);