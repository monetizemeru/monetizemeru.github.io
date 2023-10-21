(function ($, Drupal, drupalSettings) {
  Drupal.behaviors.kpRadioPlayer = {
    attach: function(context) {
      let me = this
      $('.rkp-player', context).once('rkp-player-processed').each(function(i, el) {
        if (drupalSettings.kpRadioPlayer.hasOwnProperty(el.id)) {
          me.attachPlayer(el.id, drupalSettings.kpRadioPlayer[el.id])
        }
      })
    },
    attachPlayer: function(id, settings) {
      Vue.directive('click-outside',
        {
        bind: function(el, binding, vnode) {
          el.clickOutsideEvent = function (event) {
            if (!(el == event.target || el.contains(event.target))) {
              vnode.context[binding.expression](event);
            }
          };
          document.body.addEventListener('click', el.clickOutsideEvent)
        },
        unbind: function(el) {
          document.body.removeEventListener('click', el.clickOutsideEvent)
        },
      });
      new Vue({
        el: '#' + id,
        template: `
          <div :class="['rkp-wr']">
            <div class="rkp-wrapper-item">
              <div class="rkp-playback">
                <div @click="startStop" :class="['rkp-play', {'rkp-pause': played, 'rkp-loading': loading}]" :title="buttonPlayTitle"></div>
                <div class="rkp-time">{{ timeFormat(currentTime) }}</div>
              </div>
              <div class="rkp-i-pdct">{{ htmlDecode(settings.node.title) }}</div>
              <div class="rkp-share" @click="subscribe">Подписаться</div>
              <div class="rkp-i-image">
                <img :src="podcastThumbnail(settings.podcast[0])" :alt="htmlDecode(settings.podcast[0].title)" class="rkp-pp-pdct-img" width="110px" height="100px"/>
              </div>
            </div>
            <div class="rkp-progress-wrapper">
              <div @click="goTo" @mouseout="mouseoutTo" @mousemove="mousemoveTo" class="rkp-timeline-wr">
                <div class="rkp-timeline-bar"></div>
                <div class="rkp-timeline-b"></div>
                <div class="rkp-timeline-w" :style="{ width: timeLine + '%' }"></div>
                <div v-if="isMousemove" class="rkp-runner":style="{ left: currentTimeLine + '%' }">{{ timeFormat(currentTimeHover) }}</div>
              </div>
                <div class="time-line-wrapper">
                    <div class="rkp-begin">{{ timeFormat(currentTime) }} / </div>
                    <div class="rkp-end">{{ timeFormat(duration) }}</div>
                </div>
                <div class="rkp-volume-wrapper"  v-click-outside="disabledVolume">
                  <svg width="20" height="13" data-color-mode="bright" class="svg-main" @click="goToVolume">
                      <rect y="4" width="2" height="6" rx="1"></rect>
                      <rect x="18" y="5" width="2" height="4" rx="1"></rect>
                      <rect x="6" y="4" width="2" height="6" rx="1"></rect>
                      <rect x="3" y="2" width="2" height="10" rx="1"></rect>
                      <rect x="15" y="3" width="2" height="8" rx="1"></rect>
                      <rect x="9" y="2" width="2" height="10" rx="1"></rect>
                      <rect x="12" width="2" height="13" rx="1"></rect>
                  </svg>
                  <svg :width="currentValueHeight + '%'" height="13" data-color-mode="bright" class="svg-global" @click="goToVolume">
                    <rect y="4" width="2" height="6" rx="1"></rect>
                    <rect x="18" y="5" width="2" height="4" rx="1"></rect>
                    <rect x="6" y="4" width="2" height="6" rx="1"></rect>
                    <rect x="3" y="2" width="2" height="10" rx="1"></rect>
                    <rect x="15" y="3" width="2" height="8" rx="1"></rect>
                    <rect x="9" y="2" width="2" height="10" rx="1"></rect>
                    <rect x="12" width="2" height="13" rx="1"></rect>
                  </svg>
                  <div v-if="isVolume" direction="top" class="rkp-volume-top-wrapper" @click="changeVolume">
                    <div class="rkp-volume-slider">
                      <div class="rkp-volume-slider-inner">
                        <div class="rkp-volume-slider-curret" :style="{transform: 'translate(-50%, -' +  currentValueVolume + 'px'}"></div>
                        <div class="rkp-volume-slider-value" :style="{height: currentValueHeight + '%'}"></div>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        `,
        data () {
          return {
            played: false,
            vol: .5,
            duration: null,
            currentTime: null,
            currentTimeHover: null,
            timeLine: 0,
            isVolume: false,
            isMousemove: false,
            currentTimeLine: 0,
            settings: settings,
            Drupal: Drupal,
            loading: false,
            currentValueVolume: 40,
            currentValueHeight: 50,
          }
        },
        computed: {
          audio () {
            if (drupalSettings.radioReciver == null) {
              drupalSettings.radioReciver = new Audio()
            }
            return drupalSettings.radioReciver
          },
          eHub () {
            if (drupalSettings.eventHub == null) {
              drupalSettings.eventHub = new Vue()
            }
            return drupalSettings.eventHub
          },
          buttonPlayTitle () {
            if (this.played) {
              return "Пауза"
            } else {
              return "Играть"
            }
          },
          forcedownload () {
            return '?attachment=1'
          }
        },
        watch: {
          currentTime (newVal, oldVal) {
            if (newVal != oldVal) {
              this.timeLine = newVal/this.duration * 100
            }
          },
          vol (newVal, oldVal) {
            if (newVal != oldVal) {
              this.audio.volume = newVal
            }
          },
        },
        methods: {
          disabledVolume: function () {
            this.isVolume = false
          },
          changeVolume: function (e) {
            if (!e.target.classList.contains('rkp-volume-slider-curret')) {
              if (e.target.classList.contains('rkp-volume-slider-inner') || e.target.classList.contains('rkp-volume-slider')) {
                this.currentValueVolume = Math.abs(e.target.offsetHeight - (e.layerY / e.target.offsetHeight * 100))
              }
              else {
                this.currentValueVolume = Math.abs(e.layerY / e.target.offsetHeight * 100)
              }
              this.currentValueHeight = (this.currentValueVolume * 100) / e.target.offsetHeight
              this.vol = this.currentValueHeight / 100
            }
          },
          goToVolume: function () {
            this.isVolume = !this.isVolume
          },
          mouseoutTo: function () {
            this.isMousemove = false
          },
          mousemoveTo: function (e) {
            if (this.currentTime) {
              this.isMousemove = true
              this.currentTimeLine = e.layerX / e.target.offsetWidth * 100
              this.currentTimeHover = this.currentTimeLine * this.duration / 100
            }
          },
          podcastThumbnail: function (item) {
            let image = this.checkItemProp(item, 'thumbnail_program')
            if (image) {
              return image
            }
            return '/modules/custom/dna_kpradio/modules/kp_radio/img/rkp-720x720.jpg'
          },
          checkItemProp: function (item, prop) {
            if (typeof item == 'object') {
              if (item.hasOwnProperty(prop)) {
                if (item[prop] !== "" && item[prop] !== null) {
                  return item[prop]
                }
              }
            }
            return false
          },
          htmlDecode: function (input) {
            let doc = new DOMParser().parseFromString(input, 'text/html')
            return doc.documentElement.textContent
          },
          startStop: function () {
            if (this.played) {
              this.stop()
            } else {
              this.stop()
              this.start()
            }
          },
          start: function () {
            if (this.audio.src.indexOf(this.settings.audio.src) == -1) {
              this.stop()
              this.audio.src = this.settings.audio.src
              this.currentTime = 0
            }
            this.loading = true
            this.audio.play().then(() => {
              this.duration = this.audio.duration
              this.played = true
            }).catch((err) => {
              this.stop()
            })
            this.audio.currentTime = this.currentTime
          },
          stop: function () {
            this.audio.pause()
            this.played = false
          },
          timeFormat: function (sec) {
            let date = new Date(sec * 1000)
            let optf = {
              minute: '2-digit',
              second: '2-digit',
              timeZone: 'UTC'
            }
            if (date.getUTCHours() > 0) {
              optf.hour = '2-digit'
            }
            return new Intl.DateTimeFormat('ru-RU', optf).format(date)
          },
          timeUpdate: function () {
            this.currentTime = this.audio.currentTime
            if (this.audio.currentTime == this.audio.duration) {
              this.stop()
            }
          },
          goTo: function (s) {
            if (!this.played) {
              this.start()
            }
            this.timeLine = s.layerX / s.target.offsetWidth * 100
            this.audio.currentTime = this.timeLine * this.duration / 100
          },
          onPlay: function () {
            this.loading = false
          },
          onError: function () {
            this.loading = false
          },
          onPause: function () {
            this.loading = false
          },
          onPlayed: function () {
            this.loading = false
          },
          subscribe: function () {
            if (!this.settings.podcast[0] || !this.settings.podcast[0].subscribe) return;
            window.open(this.settings.podcast[0].subscribe,'_blank');
          },
        },
        created () {
          this.eHub.$on('radio-player-play', this.stop())
          window.addEventListener('beforeunload', this.stop())
          this.audio.addEventListener('play', this.onPlay)
          this.audio.addEventListener('played', this.onPlayed)
          this.audio.addEventListener('pause', this.onPause)
          this.audio.addEventListener('error', this.onError)
        },
        mounted () {
          this.audio.addEventListener('timeupdate', this.timeUpdate)
          if (this.settings.audio.hasOwnProperty('duration')) {
            this.duration = this.settings.audio.duration
          }
        }
      })
    }
  }
} (jQuery, Drupal, drupalSettings));
;
