
;(function() {
function bannerInit() {
if (window.matchMedia('(max-width: 940px)').matches) {
const bannerContainer = document.createElement('div')
bannerContainer.id = "adfox_159654060893947865"
bannerContainer.style.width = "375px"
bannerContainer.style.margin = "20px 0"

const bannerScript = document.createElement('script')
bannerScript.innerHTML = `
window.yaContextCb.push(()=>{
        Ya.adfoxCode.create({
        ownerId: 219018,
        containerId: 'adfox_159654060893947865',
        params: {
            pp: 'h',
            ps: 'bnes',
            p2: 'gxem'
        }
      })
  });
`

const banner = document.createElement('div')
banner.classList.add('b-Article_banner')
banner.append(bannerContainer)
banner.append(bannerScript)

const container = document.querySelector('[id^="article_content"')
const containerCoords = container.getBoundingClientRect()
const middlePoint = containerCoords.top + (containerCoords.height / 2.5)

const childItems = [...container.children]
let isBannerDropped = false

childItems.forEach(item => {
  const itemCoords = item.getBoundingClientRect()
  if (itemCoords.bottom >= middlePoint && !isBannerDropped) {
    item.after(banner)
    isBannerDropped = true
  }
})
}
}
document.addEventListener('DOMContentLoaded', bannerInit)
})();
