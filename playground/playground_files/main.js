let stack_center_top = {
  dir1: 'down', dir2: 'right', push: 'top', spacing1: 10, spacing2: 10, firstpos1: 100,
};
PNotify.prototype.options.width = "380px";
function notification(type, title, text, state, cssClass) {
  const pinStatus = (state === undefined);
  const style = cssClass || 'stack-center';
  new PNotify({
    text,
    type,
    title,
    delay: 2000,
    addclass: style,
    stack: stack_center_top,
    buttons: {
      closer: true, sticker: false, labels: { close: 'закрыть' }, closer_hover: false,
    },
    styling: 'brighttheme',
    hide: pinStatus,
  });
}
function feedShowMore() {
  var button = document.querySelector('#feedShowMore'),
    time = button.dataset.feedTime,
    gameId = parseInt(button.dataset.gameId),
    filter = button.dataset.feedFilter,
    userId = parseInt(button.dataset.feedUser),
    feedName = button.dataset.feedName;
  if (feedName === 'userFeed') {
    var dataUrl = '/json/controller/feed/showmore/',
      appendingElement = '#userFeed .media-list';
  } else {
    var dataUrl = '/json/controller/users/activity/showmore/',
      appendingElement = '#userActivity .announce-flow';
  }
  button.classList.add('spinner');
  button.setAttribute('disabled', true);
  $.ajax({
    type: 'POST',
    dataType: 'json',
    url: dataUrl,
    data: {
      filter: filter,
      id_game: gameId,
      time: time,
      id_user: userId,
    },
    success: function (response) {
      button.classList.remove('spinner');
      button.removeAttribute('disabled');
      button.dataset.feedTime = response.data.time;
      if (response.success) {
        time = response.data.time;
        if (response.data.html) {
          $(response.data.html).appendTo(appendingElement).hide().fadeIn('fast');
        } else {
          button.remove();
        }
      } else {
        notification('error', 'Ошибка', response.message);
      }
    },
    error: function () {
      button.classList.remove('spinner');
      button.setAttribute('disabled', false);
      notification('error', 'Ошибка', 'Ошибка отправки данных');
    },
  });
}

$(window).on('scroll', function () {
  const navBar = $('#asideNavigationBar');
  let scrollPoint;
  if ($(navBar).parents('.gp-game-card-footer').length) {
    scrollPoint = 800;
  } else if ($(navBar).parents('.content-column').length) {
    scrollPoint = 400;
  } else {
    scrollPoint = 600;
  }
  if ($(this).scrollTop() >= scrollPoint) {
    $('.scrollup').show();
    $(navBar).addClass('sticked');
  } else {
    $('.scrollup').hide();
    $(navBar).removeClass('sticked');
  }
});

$(() => {
  $('a[href="#commentsPostingArea"]').on('click', function (e) {
    e.preventDefault();
    $('#text_field_text').focus();
  });

  $('#userNotAuthorized .reply-link, #userNotAuthorized .voting .toggleButton').on('click', function (event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    $('#signinModalWindow').modal();
    return false;
  });
  $('#userNotAuthorized textarea').on('focus', function (event) {
    if (($(this).data('authorized') !== 'optional')) {
      event.preventDefault();
      event.stopImmediatePropagation();
      $('#signinModalWindow').modal();
      return false;
    }
  });

  $(' #userMarket .user-market-offer').on('click', function () {
    $(this).siblings('.offer-description').toggle();
  });

  $('.modal').on('shown.bs.modal', function () {
    $(this).find('input:text:visible:first').trigger('focus');
  });
  /*
    Спойлеры
  */
  $(document).on('click', '.pg-hide-head', function () {
    let e = $(this);
    let iframes = e.next('.pg-hide-body').find('iframe');
    e.toggleClass('active');
    e.next('.pg-hide-body').toggle();
    if (iframes.length > 0) {
      for (let i = 0; i < iframes.length; i++) {
        iframes[i].contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
      }
    }
  });

  $('.scrollup').on('click', function () {
    $('html, body').animate({ scrollTop: 0 }, 500);
    return false;
  });

  $('#togglerGameUserNavigation').on('click', function () {
    $('#stickBarNavigation').toggle();
    $(this).toggleClass('active');
  });
  if ($.fancybox) {
    $.fancybox.defaults.thumbs.autoStart = window.innerWidth >= 960;
    $('.fancybox, .js-post-item-content figure a, [data-fancybox^="gallery"]').fancybox({
      caption: function( instance, item ) {
        return $(this).find('img').attr('alt');
      },
      buttons: [
        'slideShow',
        'thumbs',
        'close',
      ],
      mobile: {
        clickContent: 'close',
        clickSlide: 'close',
      },
    });
  }

  $('#gamersListLoad').on('click', function () {
    var $a = $(this);
    $.ajax({
      type: 'POST',
      dataType: 'json',
      url: '/json/controller/users/players/get/',
      data: $a.data(),
      success(response) {
        if (response.success) {
          $('#userAccTable tbody').append(response.data);
          $a.data('page', parseInt($a.data('page')) + 1);
          var total = parseInt($a.data('total')) - 25;
          $a.data('total', total);
          if (total <= 0) {
            $a.hide();
          }
        } else {
          notification('error', 'Ошибка', message);
        }
      },
      error: function() {
        notification('error', 'Ошибка', 'Ошибка отправки данных');
      },
    });
    return false;
  });

  $('#voting form').on('submit', function () {
    var form = $(this);
    var data = form.serialize();
    if (data) {
      $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/w/voting/index.json',
        data: data,
        success: function (response) {
          if (response.success) {
            var $div = form.find('title').html();
            form.html('');
            form.append($div);
            form.append(response.data);
          } else {
            notification('error', 'Ошибка', response.message);
          }
        },
        error: function () {
          notification('error', 'Ошибка', 'Извините, произошла ошибка. Попробуйте проголосовать позднее');
        },
      });
    }
    return false;
  });

  $('#feedShowMore').on('click', function () {
    feedShowMore();
  });

  $('.file-inputs').bootstrapFileInput();

  $('[data-toggle=popover]').popover();

  $('#copyLink').on('show.bs.modal', function () {
    var imgFullUrl = $('#userImage').attr('src'),
      imgUrlSuffix = imgFullUrl.substr(imgFullUrl.lastIndexOf('/') + 1),
      imgNewLink = imgFullUrl.split(imgUrlSuffix)[0],
      imgID = $('#userImageFrame').data('id'),
      fieldFull = '<a href="'+window.location.href+'" target="_blank"><img src="'+imgNewLink+'image.jpg" border="0"></a>',
      fieldThumb = '<a href="'+window.location.href+'" target="_blank"><img src="'+imgNewLink+'image.jpg?320x300" border="0"></a>';
    $('#field_full').val(fieldFull);
    $('#field_thumb').val(fieldThumb);
  });

  $('#sortGamesList a').on('click', function () {
    $('#sortGamesList a').removeClass('active');
    $(this).addClass('active');
    var param = $(this).data('sortparam');
    var order = 'asc';
    if (param === 'score') {
      var order = 'desc';
    }
    $('#userGamesList .item').tsort({
      data:param,
      order:order,
    });
  });

  $('#filterGamesList input').on('change', function () {
    var itemID = $(this).attr('id');
    if (itemID === 'all') {
      $('#userGamesList .item').show();
    } else {
      $('#userGamesList .item').hide();
      $('#userGamesList .js-' + itemID).show();
    }
  });

  $('.js-gameDescriptionCntrl').on('click', function () {
    $('#fullDescription').toggleClass('minimize');
    $(this).find('.glyphicon').toggleClass('glyphicon-chevron-down glyphicon-chevron-up');
  });

  $('#mobileHeaderExpand').on('click', function () {
    $('.gp-game-heading').toggleClass('expanded');
  });

  $('.file-download-box-min').on('click', function () {
    $(this).hide();
    $(this).next().toggleClass('hide');
  });

  $('.time-filter-block').on('click', function (event) {
    if (event.target.tagName.toLowerCase() !== 'a' && event.target.tagName.toLowerCase() !== 'button') {
      event.stopPropagation();
    }
  });

  function setCookie(name, value, days) {
    let expires = '';
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = `; expires=${date.toUTCString()}`;
    }
    document.cookie = `${name}=${value || ''}${expires}; path=/`;
  }
  function getCookie(name) {
    const nameEQ = `${name}=`;
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }
  const pgGameRatingCookie = getCookie('pg_GameRatingSuggestion');
  if (!(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) && !pgGameRatingCookie) {
    const pageGameBlock = document.querySelector('.js-game-rating');
    const localstorageGameData = localStorage.getItem('localstorageGameData');
    if (pageGameBlock && pageGameBlock.hasAttribute('data-game-released')) {
      const pageGameBlockBtnValue = pageGameBlock.querySelector('.js-game-rating-user-value');
      const userAuthStatus = document.querySelector('body').dataset.iserId;
      if (!pageGameBlockBtnValue.classList.contains('active') || userAuthStatus === 0) {
        const pageGameId = parseInt(pageGameBlock.dataset.gameId, 10);
        const pageGameBlockModal = pageGameBlock.querySelector('.js-game-rating-modal');
        const poster = pageGameBlockModal.querySelector('.boxart');
        const posterSRC = document.querySelector('.js-game-rating-button').dataset.gameRatingPoster;
        if (localstorageGameData) {
          const storageArray = localstorageGameData.split(':');
          let visitIndex = parseInt(storageArray[1], 10);
          const gameId = parseInt(storageArray[0], 10);
          if (gameId === pageGameId) {
            if (visitIndex === 2) {
              setCookie('pg_GameRatingSuggestion', '1', 30);
              poster.src = posterSRC;
              poster.insertAdjacentHTML('afterend', '<h5>Играли в эту игру? Как бы вы её оценили?</h5>');
              pageGameBlockModal.classList.add('suggestRating');
              $(pageGameBlockModal).modal('show');
              localStorage.removeItem('localstorageGameData');
            } else {
              localStorage.setItem('localstorageGameData', `${pageGameId}:${visitIndex += 1}`);
            }
          } else {
            localStorage.setItem('localstorageGameData', `${pageGameId}:1`);
          }
        } else {
          localStorage.setItem('localstorageGameData', `${pageGameId}:1`);
        }
      }
    } else if (localstorageGameData) {
      localStorage.removeItem('localstorageGameData');
    }
  }
  $('#signinModalWindow').on('hidden.bs.modal', function () {
    $(this).find('form').removeClass('in');
    $(this).find('form:first').addClass('in');
  });
});
