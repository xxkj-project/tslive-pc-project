<!-- 
   直播大厅
-->
<template>
  <div class="liveHall">
    <div class="topWrap">
      <headerBar />
    </div>
    <div class="main">
      <div class="mainBox">
        <div class="content">
          <div class="leftWrap">
            <div class="leftTopBox">
              <span class="concertLogo"></span>
              <div class="txtBox">
                <span class="title">无线梦想音乐演唱会 2021</span>
                <!-- <span class="income">总收入: 234TST</span> -->
              </div>
            </div>
            <div class="bannerBox">
              <span class="bannerBg"></span>
            </div>
            <div class="descWrap">
              <div class="descBox">
                <p class="txt">首次线上演唱会【无线梦想音乐演唱会 2021】由唐僧直播独家播出！</p>
                <p class="txt">
                  <span>这是一场梦想的音乐！ </span>
                  <span>这是一场激动人心的演出！ </span>
                  <span>这是一次跨界思维的碰撞！ </span>
                  <span>所有的可能，这就是 “ 无限音乐，无限梦想 ” ！ </span>
                </p>
                <p class="txt">
                  只要带上耳机就能一秒步入这场“无限梦想”的音乐世界，快来观赏这场绝无仅有的线上演唱会吧！
                </p>
                <p class="txt">
                  * 【无线梦想音乐演唱会 2021】线上演唱会播出时间： 2021年5月1日（周六）18:30（北京时间）
                </p>
              </div>
            </div>

            <div class="operateBox">
              <span class="tips">*以下演唱会福利活动请下载APP观看参与!</span>
              <ul class="listBox">
                <li class="item" v-for="(item, index) in operateList" :key="index">
                  <span class="itemIcon" :class="'icon-operate' + index" @click="onOperate"></span>
                  <p class="itemTitle">{{ item.txt }}</p>
                </li>
              </ul>
              <img class="icon-qrcode" src="@/assets/images/concertHall/icon-qrcode.png" alt="" />
            </div>
          </div>
          <div class="videoWrap">
            <div class="videoContent">
              <div class="videoBox">
                <video
                  id="my-player"
                  class="video-js"
                  x5-video-player-type="h5-page"
                  x5-video-player-fullscreen="true"
                  x5-video-orientation="landscape"
                ></video>
              </div>
              <div class="videoFooter"></div>
              <authTicket :visible.sync="isAuthTicket" @success="handleAuthSuccess" />
            </div>
          </div>
        </div>
      </div>
      <div class="footerWrap">
        <footerLink />
      </div>
    </div>
  </div>
</template>

<script>
import headerBar from '@/views/layout/headerBar'
import footerLink from '@/views/layout/footerLink'
import authTicket from '@/views/concertHall/components/handletAuthTicket'
import wsPlayer from '@/utils/wsPlay'
import Socket from '@/utils/socket'
import { entryVideoHlsUrl } from '@/utils/utils'
import { videoPullBaseUrl, roomIds, socketUrl } from '@/const/global'
import { getShareData } from '@/api/index'
import { mapState } from 'vuex'
export default {
  name: '',
  data() {
    return {
      isNoData: '',
      anchorId: '', // 房间id
      ticketsCode: '', // 票据码
      socketObj: null, // socket 模块类
      socketCode: '', // 接收的socket code值 1正常连接，2踢人
      isInit: true, // 是否是初始化
      videoObj: null, // 播放器实例
      isAuthTicket: false
    }
  },
  computed: {
    ...mapState('globalStatus', ['locale']),
    operateList() {
      return [{ txt: '辛运抽奖' }, { txt: '红包雨' }, { txt: '打榜活动' }]
    },
    // 拉流地址
    videoHlsUrl() {
      // return 'http://ivi.bupt.edu.cn/hls/szhd.m3u8'
      return `${videoPullBaseUrl}/live/${this.anchorId}/playlist.m3u8`
    }
  },
  components: { headerBar, footerLink, authTicket },
  created() {
    // TODO: 需要先判断浏览器是否支持WebSocket
    this.$i18n.locale = this.locale
    this.anchorId = this.$route.query.anchorId
    if (!this.anchorId) {
      this.toastFunc('活动暂未开始，请耐心等待', 'toastWhiteBg', 3000)
      return
    }
    this.getData()
  },
  mounted() {},
  methods: {
    onOperate() {
      let toastClassName = !this.isAuthTicket ? 'toastWhiteBg' : ''
      this.toastFunc('请您扫码下载APP观看参与', toastClassName)
    },
    // 验证房间id
    handleValidRoomId(roomId) {
      let ids = [roomIds.TEST_ROOM_ID, roomIds.CONCERT_ROOM_ID]
      if (ids.includes(roomId)) {
        this.ticketsCode = sessionStorage.getItem('tickets_code')
        if (this.ticketsCode) {
          this.isAuthTicket = false
          this.initSocket()
        } else {
          this.isAuthTicket = true
        }
        return
      }
      // 播放没有限制条件
      this.onPlayHLS()
    },
    handleAuthSuccess(data) {
      // console.log('-success-data-', data)
      this.ticketsCode = data
      this.toastFunc('票据验证成功!', 'toastWhiteBg')
      // 票据验证成功后，开始接通websockt
      this.initSocket()
    },
    initSocket() {
      this.socketObj = new Socket({ url: socketUrl })
      this.socketObj.onOpen(() => this.handleOpen())
      this.socketObj.onMessage(res => this.handleMessage(res))
      this.socketObj.onClose(e => this.handleReconnect())
      this.socketObj.onError(e => this.handleReconnect())
    },
    handleOpen() {
      if (this.isInit) this.onPlayHLS()
      let msg = JSON.stringify({ type: 1, data: { ticket: this.ticketsCode } })
      // console.log('-send-msg-', msg)
      this.socketObj.ws.send(msg)
    },
    handleMessage(res) {
      // console.log('-接收到消息-', res)
      this.socketCode = res.data.code
      console.log('-socket-code-', this.socketCode)
      if (this.socketCode == 2) this.handleRepeatLogin()
    },
    // websocket 重连
    handleReconnect() {
      if (this.socketCode === 2) return
      this.isInit = false
      this.socketObj.reconnect(() => {
        this.socketObj = null
        this.initSocket()
      })
    },
    /**
     * 用户被踢下线
     * 1、清除 tickets_code 本地存储，2、暂停播放，3、关闭websocket
     */
    handleRepeatLogin() {
      sessionStorage.removeItem('tickets_code')
      this.videoObj && this.videoObj.pause()
      this.socketObj.ws.close()
      this.$dialog
        .alert({
          title: '提示',
          message: '检测到您的账号在别的地方登录了'
        })
        .then(() => {})
        .catch(() => {})
    },
    onPlayHLS() {
      let videoUrl = entryVideoHlsUrl(this.videoHlsUrl)
      // console.log('-url-', videoUrl)
      this.videoObj = wsPlayer.play('my-player', videoUrl, 'hls', eventType => {
        // console.log('-111-', eventType)
        // if (eventType === 'play') {
        //   console.log('-video-play-')
        // }
        // // if (eventType === 'playing') {
        // // }
        // if (eventType === 'error') {
        //   console.log('-video-error-')
        // }
        // if (eventType === 'waiting') {
        //   // this.videoObj.url = ''
        //   // this.videoObj.pause()
        // }
      })
    },
    getData() {
      const params = { id: this.anchorId }
      getShareData(params)
        .then(res => {
          const data = res.data
          if (!data.open) {
            this.isNoData = true
            this.toastFunc('活动暂未开始，请您耐心等待', 'toastWhiteBg')
            return
          }
          // 正在直播中
          this.isNoData = false
          this.handleValidRoomId(this.anchorId)
        })
        .catch(err => {})
    },
    toastFunc(message, className, duration = 2000) {
      this.$toast({
        message,
        className,
        duration,
        getContainer: '.videoContent'
      })
    }
  }
}
</script>
<style lang="less" scoped>
@imgUrl: '~@/assets/images/concertHall/';

/deep/ .van-toast {
  &.toastWhiteBg {
    background: #fff;
    color: #000;
  }
}

.liveHall {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 1200px;
  height: 100%;
  font-size: 12px;
  color: #fff;

  .main {
    overflow-y: auto;
    flex: 1;
    display: flex;
    flex-direction: column;
    width: 100%;
    background: url('@{imgUrl}mainBg.png') no-repeat center;
    background-size: 100% 100%;
  }

  .mainBox {
    overflow-y: auto;
    flex: 1;

    .content {
      display: flex;
      width: 1200px;
      height: 100%;
      margin: 0 auto;
      padding-top: 30px;

      .leftWrap {
        display: flex;
        flex-direction: column;
        width: 334px;
        height: 100%;
        background: rgba(22, 22, 36, 0.8);
        padding: 0 14px;
      }

      .videoWrap {
        flex: 1;
        display: flex;
        justify-content: center;
        background: rgba(22, 22, 36, 0.8);
        margin-left: 13px;
      }
    }
  }
}

.leftWrap {
  .leftTopBox {
    display: flex;
    border-bottom: 1px solid #4f5777;
    padding: 14px 0 20px 0;

    .concertLogo {
      width: 50px;
      height: 50px;
      background: url('@{imgUrl}icon-concert-logo.png') no-repeat center;
      background-size: 100% 100%;
    }

    .txtBox {
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding-left: 10px;

      .title {
        font-size: 16px;
      }

      .income {
        padding-top: 10px;
        color: #fc3b52;
      }
    }
  }

  .bannerBox {
    padding: 14px 0 14px 0;

    .bannerBg {
      display: block;
      width: 100%;
      height: 180px;
      background: url('@{imgUrl}bannerBg.png') no-repeat center;
      background-size: 100% 100%;
    }
  }

  .descWrap {
    flex: 1;
    overflow-y: auto;
    line-height: 24px;
    border-bottom: 1px solid #4f5777;
    padding-bottom: 20px;

    .txt {
      margin-bottom: 4px;

      span {
        display: block;
      }
    }
  }

  .operateBox {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 10px;

    .tips {
      color: #fc3b52;
      padding: 10px 0 10px 0;
    }

    .listBox {
      display: flex;
      width: 100%;
      margin-bottom: 10px;

      .item {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 33.33%;

        .itemIcon {
          width: 50px;
          height: 50px;
          cursor: pointer;
          margin-bottom: 10px;

          &.icon-operate0 {
            background: url('@{imgUrl}icon-operate1.png') no-repeat center / cover;
          }
          &.icon-operate1 {
            background: url('@{imgUrl}icon-operate2.png') no-repeat center / cover;
          }
          &.icon-operate2 {
            background: url('@{imgUrl}icon-operate3.png') no-repeat center / cover;
          }
        }
      }
    }
  }
}

.videoContent {
  position: relative;
  display: flex;
  flex-direction: column;
  // width: 506px;
  width: 100%;
  height: 100%;

  /deep/ .van-toast {
    position: absolute;
  }

  .videoBox {
    flex: 1;
    background: url('@{imgUrl}videoBg.png') no-repeat center / cover;

    /deep/ .video-js {
      width: 100%;
      height: 100%;
      .vjs-big-play-contain {
        height: 100%;
        z-index: 600;
      }
      .vjs-big-play-button {
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        z-index: 600;
      }
    }
  }

  .videoFooter {
    width: 100%;
    height: 50px;
    // background: rgba(22, 22, 36, 0.5);
    background: rgba(0, 0, 0, 0.5);
  }
}
</style>
