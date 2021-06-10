/*
 * 网宿播放插件
 */

/* eslint-disable */
/**
 * 视频格式 CODEC
 */
const videoType = {
  mp3: WSPlayer.CODEC.MP3, // xxx.mp3
  mp4: WSPlayer.CODEC.MP4, // xxx.mp4
  hlv: WSPlayer.CODEC.HDL, // xxx.flv
  hls: WSPlayer.CODEC.HLS // xxx.m3u8
}

/**
 * 控制栏组件隐藏
 */
const controlChildrenConfig = {
  enable: false, //是否启用该功能
  hideLive: false, // 是否隐藏直播提示
  hideVolume: true, // 是否隐藏音量控制栏
  hidePlayPause: false, // 是否隐藏播放暂停按钮
  hideProgress: false, // 是否隐藏播放进度条
  hideCurrentTime: true, // 是否隐藏当前播放播放时间及分隔符
  hideDurationTime: true, // 是否隐藏视频时长
  hideFullscreen: true // 是否隐藏全屏按钮
}

/**
 * 播放配置参数
 */
function parseConfig(src, type) {
  type = type || videoType.hlv
  let params = {
    muted: false, // 是否静音
    autoplay: true, // 是否自动播放，移动端需要手动触发
    controls: false, // 是否显示播放控制栏
    // isFullScreen: true,
    // HLS播放配置
    hlsConfig: {
      mediaDataSource: {
        isLive: true // 是否直播 true直播 false点播
      },
      overrideNative: true, // 覆盖原生强制使用SDK播放
      cacheEncryptionKeys: true, // 是否缓存密钥
      reconnectConfig: {
        // 重连机制配置
        enable: true,
        timerTime: 3, // 重连间隔(s)
        timerLimit: 2 // 重连次数
      }
    },
    controlChildrenConfig, //控制栏组件
    sources: [
      // 音视频源
      {
        src, // 音视频播放地址
        type: videoType[type] // 音视频格式
      }
    ]
  }
  return params
}

/**
 * 事件类型
 */
const wsEvent = {
  play: WSPlayer.WSEvent.PLAY, // play 播放类型事件
  clarity: WSPlayer.WSEvent.CLARITY // clarity 清晰度类型事件
}

/**
 * 播放事件
 */
const playEvent = WSPlayer.WSEvent.PLAY

/**
 * @param {string} id video 标签的id
 * @param {string} type 播放源的类型
 * @param {string} src 播放源的url
 * @return 播放器实例
 */
function play(id, src, type, callback) {
  let config = parseConfig(src, type)
  // console.log('-config-', config)
  let player = WSPlayer(id, config, () => {
    WSPlayer.log('Your player is ready!')
    if (!player) {
      WSPlayer.log('no player')
      return
    }
    let eventType = ''
    player.on(playEvent.PLAY, function() {
      WSPlayer.log('播放--video play')
      eventType = 'play'
      callback(eventType)
    })
    player.on(playEvent.PLAYING, function() {
      WSPlayer.log('准备播放--video playing')
      eventType = 'playing'
      callback(eventType)
    })
    player.on(playEvent.PAUSE, function() {
      WSPlayer.log('暂停--video pause')
      eventType = 'pause'
      callback(eventType)
    })
    player.on(playEvent.WAITING, function() {
      WSPlayer.log('播放缓冲--video waiting')
      eventType = 'waiting'
      callback(eventType)
    })
    player.on(playEvent.ENDED, function() {
      WSPlayer.log('播放完成--video ended')
      eventType = 'end'
      callback(eventType)
    })
    player.on(playEvent.ERROR, function(event, error) {
      WSPlayer.log('播放出错--video error', error)
      eventType = 'error'
      callback(eventType)
    })
    // 清晰度切换
    player.on(WSPlayer.WSEvent.CLARITY.CURRENT_UPDATE, function(e, data) {
      WSPlayer.log('清晰度切换--clarity switch to =>', data)
      // changeCurrentClaritySrc(player, data.clarityLabel, data.clarityIndex);
      eventType = 'clarify'
      callback(eventType)
    })
  })
  return player
}

/**
 * 播放器实例
 */
export default {
  play
}
