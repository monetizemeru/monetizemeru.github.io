$(function () {
  $("#postSourceLink").on('click', function (event) {
    event.preventDefault();
    let postSourceLink = $(this).attr('href').replace("://", "/");
    window.open('https://www.playground.ru/redirect/' + postSourceLink, '_blank')
  });

  const width = 640;
  const height = Math.ceil(width * (9 / 16));

  const getIFrame = (src, id) => {
    const iFrame = document.createElement('iframe');

    iFrame.classList.add('js-youtube-player');
    iFrame.id = id;
    iFrame.width = width;
    iFrame.height = height;
    iFrame.src = src;
    iFrame.frameBorder = 0;
    iFrame.allowFullscreen = true;

    return iFrame;
  };

  document.querySelectorAll('player').forEach((el) => {
    const videoName = el.getAttribute('name');
    if (videoName) {
      const matches = videoName.match(/^(pg|youtube)-(.+)$/i);
      const type = matches ? matches[1] : null;
      const embedContainer = document.createElement('span');
      embedContainer.classList.add('embed-container');

      if ('youtube' === type) {
        embedContainer.appendChild(getIFrame(`https://www.youtube.com/embed/${matches[2]}?enablejsapi=1&amp;origin=${location.origin}`, `youtube-${matches[2]}`))
      } else if ('pg' === type) {
        insertPgVideoPlayer({
          container: embedContainer,
          id: parseInt(matches[2]),
          autostart: 0,
          count: 6,
          quality: 7, // todo!
          image: `https://i.playground.ru/i/video/${matches[2]}/icon.jpg?${width}x${height}`
        });
      }

      el.parentNode.insertBefore(embedContainer, el);
    }
    el.remove();
  });
});
