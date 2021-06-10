/*
 * @Author: wangshengxian
 * @Date: 2020-08-19 09:46:43
 * @LastEditors: wangshengxian
 * @LastEditTime: 2021-01-13 00:50:48
 * @Desc:
 */
// 路由守卫
import router from '@/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import glg from './globalGuards'
import platform from '@/utils/platform'
import { roomIds } from '@/const/global'

// NProgress.configure({ showSpinner: false }) // 禁用进度环

const browserEnv = process.env.VUE_APP_SERVER_ENV
// console.log('-env-', browserEnv)

router.beforeEach((to, from, next) => {
  // console.log('-router-before-', to, from)
  if (!platform.isPc) {
    if (to.name == 'PcLive') {
      window.location.href = `http://live.whkuaiyu.com:8888/livemember/2021_concert?sign=h5`
      return
    }
    if (to.name == 'ConcertHall') {
      let anchorId = browserEnv === 'prod' ? roomIds.CONCERT_ROOM_ID : roomIds.TEST_ROOM_ID
      window.location.href = `${process.env.VUE_APP_SERVER_URL}/liveshare/index?anchorId=${anchorId}`
      return
    }
  }
  // console.log('-pc-')
  // first progress bar
  // NProgress.start()
  // 设置语言国际化
  glg.setLanguage(to, from)
  // 顶部状态栏高度(setStatusBarHeight)
  glg.setStatusBarHeight(to, from)
  // 存储登录状态(setLoginStatus)
  glg.setLoginStatus(to, from)
  // 判断用户是否需要登录访问(jumpNeedLogin)
  // glg.jumpNeedLogin(to, from)
  // 路由改变修改页面title(setDocumentTitle)
  glg.setDocumentTitle(to, from)

  next()
})

router.afterEach(() => {
  // finish progress bar
  // NProgress.done()
})
