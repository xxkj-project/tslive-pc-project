import Vue from 'vue'
import VueI18n from 'vue-i18n'
import zh from './lang/zh'
import en from './lang/en'
import Cookies from 'js-cookie'
Vue.use(VueI18n)

const messages = {
  en: Object.assign(en),
  zh: Object.assign(zh)
}

// console.log('-locale-', Cookies.get('locale'))

const i18n = new VueI18n({
  locale: Cookies.get('locale') || 'zh',
  messages
})

export default i18n
