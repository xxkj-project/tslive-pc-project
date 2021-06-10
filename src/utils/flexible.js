/**
 * rem适配方案
 */
import platform from '@/utils/platform'
;(function(window, document) {
  var docEl = document.documentElement
  var bodyEl = document.querySelector('body')

  setRemUnit()
  window.addEventListener('resize', setRemUnit)
  window.addEventListener('pageshow', function(e) {
    if (e.persisted) setRemUnit()
  })

  function setRemUnit() {
    // console.log('-client-with-', docEl.clientWidth)
    // 1200px
    if (platform.isPc) {
      let sizeUI = 1920
      let remBase = 37.5

      // docEl.style.fontSize = 37.5 + 'px'
      docEl.style.fontSize = (docEl.clientWidth / sizeUI) * remBase + 'px'
      // bodyEl.style.fontSize = 16 / docFontSize + 'rem'
    } else {
      let sizeUI = 750 // 定义设计图尺寸
      let remBase = 75 // 定义基准值
      let docFontSize = (docEl.clientWidth / sizeUI) * remBase
      docEl.style.fontSize = docFontSize + 'px'
      bodyEl.style.fontSize = 16 / docFontSize + 'rem'
    }
    toggleClassName()
  }

  function toggleClassName() {
    var containerDom = document.getElementById('app')
    if (platform.isPc) {
      containerDom.className = ''
      document.body.className = ''
    } else {
      containerDom.className = 'mobile'
      document.body.className = 'mobile'
    }
  }
})(window, document)
