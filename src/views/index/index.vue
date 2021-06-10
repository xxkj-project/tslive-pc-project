<!--
 * @Author: wangshengxian
 * @Date: 2020-12-30 14:25:33
 * @LastEditors: wangshengxian
 * @LastEditTime: 2021-01-16 10:29:48
 * @Desc: 分享
-->
<template>
  <div class="share">
    <div class="header">
      <div class="headerLine"></div>
      <div class="headerBox">
        <div class="left">
          <img class="icon-pic" :src="infoData.image" alt="" v-if="infoData.image" />
        </div>
        <div class="right">
          <p class="userName">{{ infoData.nickName }}</p>
          <p class="userId">ID {{ infoData.userId }}</p>
        </div>
      </div>
    </div>
    <div class="main">
      <div class="container">
        <div class="playerWrap" @touchstart="onTouchVideo" v-show="isShowVideo">
          <video
            id="my-player"
            class="video-js"
            x5-video-player-type="h5-page"
            x5-video-player-fullscreen="true"
            x5-video-orientation="landscape"
          ></video>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="footerBox">
        <span class="giftBtn" @click="onOpenApp"></span>
        <span class="downloadBtn" @click="onJump"></span>
      </div>
    </div>

    <div class="noData" v-if="isNoData">
      <div class="noDataWrap">
        <p class="desc1">
          <span class="icon"></span>
          <span class="txt">主播正在赶来的路上</span>
        </p>
        <p class="desc2">
          下载APP，观看更多主播
        </p>
      </div>
    </div>

    <div class="maskWrap" @click="onMask" v-show="isMask">
      <span class="maskTxt"></span>
    </div>
  </div>
</template>

<script>
import platform from '@/utils/platform'
import wsPlayer from '@/utils/wsPlay'
import md5 from 'js-md5'
import { getShareData } from '@/api'
// import '@/utils/rotate'
import noKey from '@/mixins/noKey'
import { entryVideoHlsUrl } from '@/utils/utils'
import { videoPullBaseUrl, appDownloadUrl, protocolHead } from '@/const/global'
export default {
  name: '',
  mixins: [noKey],
  data() {
    return {
      isShowVideo: true, // 是否显示视频
      isOpenApp: false,
      isMask: false,
      isNoData: true, // 是否没有直播拉流，默认为true
      anchorId: '',
      infoData: {},
      wsVideo: null, // 播放器实例
      count: 0,
      timerObj: null, // 延时器
      countDown: 0 // 倒计时
    }
  },
  computed: {
    // 是否例外
    isException() {
      return this.anchorId == '20073630'
    },
    // 拉流地址
    videoHlsUrl() {
      return `${videoPullBaseUrl}/live/${this.anchorId}/playlist.m3u8`
    }
  },
  components: {},
  watch: {},
  created() {
    this.anchorId = this.$route.query.anchorId
    // this.getData()
  },
  mounted() {
    // TODO: 主播切换后台的时候，当前的拉流会断掉
    console.log('--', this.isException)
  },
  destroyed() {
    console.log('-清除延时任务-', this.timerObj)
    this.timerObj && clearTimeout(this.timerObj)
  },
  methods: {
    setConfig() {
      console.log('-设置延时任务-')
      this.timerObj = setTimeout(() => {
        window.location.href = appDownloadUrl
      }, 60000)
    },
    validateFunc(callback) {
      if (platform.isWechat) {
        this.isMask = true
        return
      }
      if (this.isException) {
        this.$dialog
          .confirm({
            message: '对不起，本场直播需要门票才能进入，是否购买？',
            confirmButtonText: '去购买',
            confirmButtonColor: '#000',
            cancelButtonColor: '#666'
          })
          .then(() => {
            console.log('-去购买门票-')
            this.clickEventFunc()
          })
          .catch(() => {})
        return
      }
      callback()
    },
    onPlayHLS() {
      let videoUrl = entryVideoHlsUrl(this.videoHlsUrl)
      console.log('-url-', videoUrl)
      this.wsVideo = wsPlayer.play('my-player', videoUrl, 'hls', eventType => {
        console.log(111, eventType)
        // console.log('-is-no-data-', this.isNoData)
        if (eventType === 'play') {
          this.isOpenApp = true
        }
        // if (eventType === 'playing') {
        // }
        if (eventType === 'error') {
          this.isNoData = true
        }
        if (eventType === 'waiting') {
          // this.wsVideo.pause()
        }
      })
      console.log('-ws-', this.wsVideo)
    },

    onMask() {
      this.isMask = false
    },
    onTouchVideo() {
      // TODO: android端手机自带浏览器事件不生效，需要再寻找方法
      console.log('-touch-', this.isOpenApp)
      console.log('-唤起app-')
    },
    // TODO: 唤起app时，先把播放暂停，android端有些不会自动暂停播放，需要手动暂停
    onOpenApp() {
      this.validateFunc(() => {
        if (platform.isAndroid) {
          console.log('-android-')
          // 尝试打开安卓客户端app
          window.location.href = `${protocolHead.android}?anchorId=${this.anchorId}`
        }
        if (platform.isIos) {
          console.log('-ios-')
          // 尝试打开ios客户端app
          window.location.href = protocolHead.ios // 进入app首页
          // window.location.href = `tangsengLive://${this.anchorId}` // 进入对应的直播间
        }
      })
    },
    onJump() {
      this.validateFunc(() => {
        console.log('-jump-')
        // TODO: 跳转的时候，android端有些手机自带浏览器不会关闭视频播放，需要手动把视频隐藏掉
        // TODO: 后退的时候，暂时没办法刷新当前页面，再次播放，后续再进行处理
        if (platform.isAndroid) {
          if (this.wsVideo) {
            console.log('-anroid-', this.wsVideo)
            this.wsVideo.pause()
            this.isShowVideo = false
            this.isNoData = true
          }
        }
        window.location.href = this.downloadUrl
      })
    },
    getData() {
      this.$loading.show()
      const params = { id: this.anchorId }
      console.log('-params-', params)
      getShareData(params)
        .then(res => {
          this.$loading.hide()
          console.log('-res-', res)
          const data = res.data
          console.log('-data-', data)
          this.infoData = data
          if (!this.infoData.open) {
            this.isNoData = true
            return
          }
          console.log('--', this.isException)
          if (this.infoData.open && this.isException) {
            this.setConfig()
          }
          this.isNoData = false
          this.onPlayHLS()
        })
        .catch(err => {
          console.log('-share-err-', err)
          this.$loading.hide()
        })
    }
  }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
@imgUrl: '~@/assets/images/share/';

/deep/ .video-js {
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

.share {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: url('@{imgUrl}noBg.png') no-repeat center / cover;
  overflow: hidden;

  .header {
    height: 50px;
  }

  .main {
    flex: 1;
  }

  .footer {
    height: 56px;
  }
}

.headerBox {
  position: absolute;
  left: 10px;
  top: 5px;
  z-index: 800;
  display: flex;
  align-items: center;
  height: 40px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 20px;
  padding: 0 10px 0 5px;

  .left {
    display: inline-block;
    margin-right: 6px;
    .icon-pic {
      display: block;
      width: 30px;
      height: 30px;
      background: rgb(94, 180, 180);
      border-radius: 15px;
    }
  }

  .right {
    display: inline-block;
    font-size: 12px;
    color: #fff;
  }
}

.container {
  height: 100%;
}

.footerBox {
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 800;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 56px;
  padding: 0 14px;

  .giftBtn {
    width: 44px;
    height: 44px;
    background: url('@{imgUrl}giftBtn.png') no-repeat center;
    background-size: 100% 100%;
  }

  .downloadBtn {
    width: 155px;
    height: 37px;
    background: url('@{imgUrl}downloadBtn.png') no-repeat center / cover;
  }
}

.noData {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 700;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: url('@{imgUrl}noBg.png') no-repeat center / cover;
  font-size: 15px;
  color: #fff;

  .desc1 {
    display: flex;
    justify-content: center;
    margin-bottom: 26px;

    .icon {
      width: 9px;
      height: 10px;
      background: url('@{imgUrl}icon-dot.png') no-repeat center / cover;
    }

    .txt {
      padding: 6px 0 0 4px;
    }
  }

  .desc2 {
    display: flex;
    justify-content: center;
    font-size: 18px;
  }
}

.playerWrap {
  width: 100%;
  height: 100%;

  .video-js {
    width: 100%;
    height: 100%;
    // height: 50px;
  }
}

.maskWrap {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  z-index: 999;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: flex-end;
  padding: 8px 25px 0 0;
  .maskTxt {
    display: block;
    width: 281px;
    height: 150px;
    background: url('@{imgUrl}mask_txt.png') no-repeat center / cover;
  }
}
</style>
