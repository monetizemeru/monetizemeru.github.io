const videoPlayer = {
  config: {
    get: function (customConfig) {
      const config = $.extend(customConfig, this.data);
      return config;
    },
  },

  logJwPlayer: function (param) {
    if (param.type === undefined || param.type !== 'beforePlay' || this.file === undefined) {
      return;
    }

    window.PG.logVideo(this.file, 'playground', window.frameElement);
  },

  getPlaylist: function (videoId, quality) {
    let playlist = [];
    if (quality & 8) {
      playlist.push({
        file: `https://video.playground.ru/${videoId}-1080.mp4`,
        label: '1080p',
      });
    }
    if (quality & 4) {
      playlist.push({
        file: `https://video.playground.ru/${videoId}-720.mp4`,
        label: '720p',
      });
    }
    if (quality & 2) {
      playlist.push({
        file: `https://video.playground.ru/${videoId}-480.mp4`,
        label: '480p',
      });
    }
    if (quality) {
      playlist.push({
        file: `https://video.playground.ru/${videoId}-360.mp4`,
        label: '360p',
        default: 'true',
      });
    }

    return playlist;
  },

  youtubeLogCache: [],

  logYoutubePlayer: function (element) {
    new YT.Player(element, {
      events: {
        onStateChange: function (event) {
          if (event.data !== YT.PlayerState.PLAYING) {
            return;
          }
          const videoId = event.target.getVideoData()['video_id'];
          if (videoPlayer.youtubeLogCache.indexOf(videoId) !== -1) {
            return;
          }
          videoPlayer.youtubeLogCache.push(videoId);

          window.PG.logVideo(videoId, 'youtube', element);
        },
      },
    });
  },
};

/**
 *
 * @param {Node} container
 * @param {Number} id
 * @param {Number} quality
 * @param {String} image
 * @param {Number} count
 * @param duration
 * @returns {jwplayer}
 */

const insertPgVideoPlayer = ({
  container, id, quality, image, count,
}) => {
  const isAmp = window.location.hash === '#amp=1';
  const playerConfig = videoPlayer.config.get({
    skin: {
      name: 'seven',
      active: 'red',
      inactive: 'white',
      background: 'black',
    },
    width: '100%',
    aspectratio: '16:9',
    related: {
      file: 'https://www.playground.ru/api/video.related_list',
      heading: 'Рекомендуем к просмотру',
      onclick: 'link',
    },
    ga: {},
    autostart: false,
    abouttext: 'Playground.ru',
    aboutlink: 'https://www.playground.ru/about/',
    playlist: [{
      sources: videoPlayer.getPlaylist(id, quality),
      image: image,
    }],
  });
  if (isAmp) {
    delete playerConfig.related;
  } else {
    playerConfig.related.file += `?video_id=${id}&count=${count}`;
  }
  const playerInstance = jwplayer(container);
  playerInstance.setup(playerConfig);
  if (!isAmp) {
    playerInstance.once('beforePlay', videoPlayer.logJwPlayer, { source: 'manual-body', file: id, container });
    playerInstance.once('beforePlay', () => {
      parent.window.dataLayer.push({
        event: 'JWplayer', JWplayerStatus: 'Start Play',
      });
      const videoContent = document.querySelector('video');
      videoContent.setAttribute('id', 'videoContent');
      ya.videoAd
        .loadModule('AdLoader')
        .then((module) => module.AdLoader.create(
          {
            adFoxParameters: {
              ownerId: '326836',
              params: {
                p1: 'cttvg',
                p2: 'hiuy',
              },
            },
          },
        ))
        .then((adLoader) => adLoader.loadAd())
        .then((adStore) => {
          const adPlaybackController = adStore.createPlaybackController(videoContent, yaPrerollContainer);
          adPlaybackController.subscribe('AdStopped', () => {
            videoContent.play();
          });
          adPlaybackController.playAd();
        })
        .catch((error) => {
          console.error(error);
        });
    });
  }
  return playerInstance;
};

window.addEventListener('load', function () {
  document.querySelectorAll('.js-video-player').forEach((el) => {
    insertPgVideoPlayer({
      container: el,
      id: parseInt(el.dataset.id),
      autostart: parseInt(el.dataset.autostart),
      count: parseInt(el.dataset.count),
      quality: parseInt(el.dataset.quality),
      image: el.dataset.image,
      duration: parseInt(el.dataset.duration, 10),
    });
  });

  // Load youtube api
  const tag = document.createElement('script');
  tag.src = 'https://www.youtube.com/iframe_api';
  const firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  window.onYouTubeIframeAPIReady = (function () {
    const cached = window.onYouTubeIframeAPIReady;
    return function () {
      if (cached) cached.apply(this, arguments);
      Array.prototype.forEach.call(document.querySelectorAll('.js-youtube-player'), videoPlayer.logYoutubePlayer);
    };
  })();
});
