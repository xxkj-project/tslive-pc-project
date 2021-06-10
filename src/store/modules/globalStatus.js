/**
 * 全局状态 - store
 */
import Cookies from 'js-cookie'

const state = {
  locale: 'zh',
  device: '',
  statusBarHeight: '20',
  key: '',
  scollTop: 0, // 滚动高度
  loadErrorCount: 0 // 加载失败次数
}

const getters = {
  statusBarHeight(state) {
    return state.statusBarHeight
  },
  scollTop(state) {
    return state.scollTop
  },
  loadErrorCount(state) {
    return state.loadErrorCount
  }
}

const mutations = {
  // 设置语言
  setLanguage(state, language) {
    state.locale = language
    Cookies.set('locale', language)
  },
  setStatusBarHeight(state, h) {
    state.statusBarHeight = h
  },
  setScollTop(state, scollTop) {
    state.scollTop = scollTop
  },
  setLoadErrorCount(state) {
    console.log('-mutations-state-loadErrorCount')
    state.loadErrorCount++
  },
  clearLoadErrorCount(state) {
    state.loadErrorCount = 0
  }
}

const actions = {}

export default {
  // 开启命名空间
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
