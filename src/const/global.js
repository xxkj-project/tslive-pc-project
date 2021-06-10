/**
 * h5 直播拉流域名
 */
export const videoPullBaseUrl = 'http://h5pull.whkuaiyu.com'

/**
 * 图片视频资源基础路径
 */
export const resourceBaseUrl = 'http://video.whkuaiyu.com/h5'

/**
 * app下载页地址
 */
export const appDownloadUrl = (() => {
  const urls = {
    test: 'http://twww.tangseng.io/download/index.html',
    prod: 'http://down.tangseng.io/download/index.html'
  }
  return process.env.VUE_APP_SERVER_ENV === 'prod' ? urls.prod : urls.test
})()

/**
 * socket连接地址
 */
export const socketUrl = (() => {
  const wsUrls = {
    test: 'ws://54.222.167.84:50669/api/v1/tickets',
    prod: 'ws://live.whkuaiyu.com:50669/api/v1/tickets'
  }
  return process.env.VUE_APP_SERVER_ENV === 'prod' ? wsUrls.prod : wsUrls.test
})()

/**
 * 唤起客户端app协议url
 */
export const protocolHead = {
  android: 'app://com.xinxin.tangseng',
  ios: 'tangsengLive://'
}

/**
 * 播放界面限制的房间id
 */
export const roomIds = {
  /**
   * 测试房间 id
   */
  TEST_ROOM_ID: '2008189',
  /**
   * 2021五一音乐演唱会活动直播房间 id
   */
  CONCERT_ROOM_ID: '19999699'
}
