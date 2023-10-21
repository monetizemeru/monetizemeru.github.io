(function (Drupal, drupalSettings, $) {
  function checkTeasers() {
    if (!drupalSettings['stat_enable']) {
      return false;
    }
    // элементы в дозагрузке
    $('article.post').each(function(i, obj) {
      let one_teaser = obj;

      let targetPosition = {
          top: window.pageYOffset + one_teaser.getBoundingClientRect().top,
          left: window.pageXOffset + one_teaser.getBoundingClientRect().left,
          right: window.pageXOffset + one_teaser.getBoundingClientRect().right,
          bottom: window.pageYOffset + one_teaser.getBoundingClientRect().bottom
        }
      // Получаем позиции окна
      let windowPosition = {
        top: window.pageYOffset,
        left: window.pageXOffset,
        right: window.pageXOffset + document.documentElement.clientWidth,
        bottom: window.pageYOffset + document.documentElement.clientHeight
      };

      if (targetPosition.bottom > windowPosition.top && // Если позиция нижней части элемента больше позиции верхней части окна, то элемент виден сверху
        targetPosition.top < windowPosition.bottom && // Если позиция верхней части элемента меньше позиции нижней части окна, то элемент виден снизу
        targetPosition.right > windowPosition.left && // Если позиция правой стороны элемента больше позиции левой части окна, то элемент виден слева
        targetPosition.left < windowPosition.right) { // Если позиция левой стороны элемента меньше позиции правой части окна, то элемент виден справа
        // шлём в статистику и добавляем в массив что уже отправили
        if (!drupalSettings['show_nids'][$(one_teaser).attr('data-id')]) {
          let url = window.location.protocol + '//' + window.location.host + $(one_teaser).find('a.for-picture').attr('href')
          let title = $(one_teaser).find('div.header').find('a').text()
          /*
          todo отключено пока не наладим статистику
          $.ajax({
            url: drupalSettings['stat_url'],
            data: {
              nid: $(one_teaser).attr('data-id'),
              type: "view",
              site: drupalSettings['stat_site'],
              url: url,
              title: title
            },
            method: 'GET',
            dataType: 'json',
            success: function(data) {}
          });
          */
          drupalSettings['show_nids'][$(one_teaser).attr('data-id')] = true
        }
      }
    });
  }
  $(window).on('scroll', function() {
    checkTeasers()
  });
} (Drupal, drupalSettings, jQuery));
;
