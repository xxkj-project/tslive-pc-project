import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    name: 'Index',
    component: () => import(/* webpackChunkName: 'index' */ '@/views/index'),
    meta: {
      title: '分享'
    }
  },
  {
    path: '/pcLive',
    name: 'PcLive',
    component: () => import(/* webpackChunkName: 'pcLice' */ '@/views/pcLive'),
    meta: {
      title: '五一演唱会购票'
    }
  },
  {
    path: '/concertHall',
    name: 'ConcertHall',
    component: () => import(/* webpackChunkName: 'concertHall' */ '@/views/concertHall'),
    meta: {
      title: '直播大厅'
    }
  }
]

// console.log('-base-url-', process.env.BASE_URL)
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
