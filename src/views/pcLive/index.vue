<!--pc网页直播-->
<template>
  <div class="pcTive">
    <div class="tiveTop" align="center">
      <div class="tiveWrap">
        <headerBar>
          <div class="headerSlotBox" slot="left"><i></i>{{ headerData.logoTxt }}</div>
        </headerBar>
        <div class="middle">
          <div class="videoCover">
            <videoPlay class="videoWrap" :videoUrl="videoUrl" :posterUrl="posterUrl" />
          </div>
          <div class="brief">
            <div class="briefImg"></div>
            <div class="briefContent">
              <h4>{{ introData.title }}</h4>
              <div class="briefTitle">
                <p v-for="(itemOptions, index) in introData.options" :key="index">
                  <span v-for="item in itemOptions.list" :key="item">{{ item }}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="fotter">
          <div class="fotterLeft">
            <h4 class="title">{{ ticketsData.title }}</h4>
            <p class="introduce">{{ ticketsData.desc }}</p>
            <p class="price">
              {{ ticketsData.labelTxt }}<span>{{ price }}</span>
            </p>
          </div>
          <div class="fotterRight">
            <button class="buy" @click="onBuyTicket">{{ ticketsData.btnTxt }}</button>
          </div>
        </div>
      </div>
    </div>
    <div class="artistWrap">
      <div class="artist">
        <h4 class="inviteArt">{{ i18nData.artistTitle }}</h4>
        <ul class="itemBox">
          <li class="item" v-for="(item, index) in currList" :key="index">
            <img :src="item.imgUrl" alt="" class="img" />
            <h4 class="name">{{ item.zhName }}</h4>
            <p class="englishName">{{ item.enName }}</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="noticeWrap">
      <div class="notice">
        <h4>{{ noticeData.title }}</h4>
        <div class="noticeNum">
          <p v-for="(item, index) in noticeData.list" :key="index">{{ item }}</p>
        </div>
        <div class="footerWrap">
          <footerLink />
        </div>
      </div>
    </div>
    <handleConfirm :visible.sync="isConfirmShow" />
  </div>
</template>

<script>
import headerBar from '@/views/layout/headerBar'
import videoPlay from '@/components/videoPlay'
import handleConfirm from './components/handleConfirm'
import footerLink from '@/views/layout/footerLink'
import { resourceBaseUrl } from '@/const/global'
import { mapState } from 'vuex'
export default {
  name: '',
  data() {
    return {
      currList: [], //艺人数据
      isConfirmShow: false //确认订单弹框
    }
  },
  components: { headerBar, videoPlay, handleConfirm, footerLink },
  computed: {
    ...mapState('globalStatus', ['locale']),
    price() {
      return this.locale === 'zh' ? '￥200' : '125'
    },
    videoUrl() {
      return `${resourceBaseUrl}/concert_active_video2.mp4`
    },
    posterUrl() {
      return `${resourceBaseUrl}/buyTicketVideoBg.png`
    },
    i18nData() {
      return this.$t('pcLive')
    },
    headerData() {
      return this.i18nData.header
    },
    introData() {
      return this.i18nData.intro
    },
    ticketsData() {
      return this.i18nData.tickets
    },
    noticeData() {
      return this.i18nData.notice
    }
  },
  created() {
    this.$i18n.locale = this.locale
    this.getData()
  },
  mounted() {},
  methods: {
    onBuyTicket() {
      if (this.locale === 'zh') {
        this.isConfirmShow = true
        return
      }
      window.open('https://my.tangseng.io', '_blank')
    },
    getData() {
      this.currList = this.actorList()
    },
    actorList() {
      let list = [
        {
          zhName: '茜拉',
          enName: 'Shila Amzah',
          imgUrl: require('@/assets/images/buyTicket/actorBg1.png')
        },
        {
          zhName: '李佩玲',
          enName: 'Jeryi',
          imgUrl: require('@/assets/images/buyTicket/actorBg2.png')
        },
        {
          zhName: '菲道尔',
          enName: 'Firdhaus',
          imgUrl: require('@/assets/images/buyTicket/actorBg3.png')
        },
        {
          zhName: '蔡恩雨',
          enName: 'Priscilla Abby',
          imgUrl: require('@/assets/images/buyTicket/actorBg4.png')
        },
        {
          zhName: '朱浩仁',
          enName: 'Haoren',
          imgUrl: require('@/assets/images/buyTicket/actorBg5.png')
        },
        {
          zhName: '黄隽贤',
          enName: 'Sammicci',
          imgUrl: require('@/assets/images/buyTicket/actorBg6.png')
        },
        {
          zhName: '刘雨妮',
          enName: 'Veny',
          imgUrl: require('@/assets/images/buyTicket/actorBg7.png')
        }
      ]
      return list
    }
  }
}
</script>
<style lang="less" scoped>
//@importurl();引入公共css类
@imgUrl: '~@/assets/images/buyTicket/';
@imgComUrl: '~@/assets/images/common/';
.pcTive {
  width: 100%;
  .tiveTop {
    width: 100%;
    // height: 730px;
    background: url('@{imgUrl}mainBg.png') no-repeat center / cover;
    padding-bottom: 17px;
    .tiveWrap {
      min-width: 1200px;
      width: 1200px;

      .headerSlotBox {
        display: flex;
        align-items: center;
        font-size: 20px;
        color: #fff;

        i {
          display: inline-block;
          height: 30px;
          border-right: 1px solid #dddee9;
          margin: 0 8px;
        }
      }

      /deep/ .header-content {
        .left {
          .logo {
            background: url('@{imgComUrl}logo1.png') no-repeat center / cover;
          }
        }
        .right {
          color: #fff;

          .icon-home {
            background: url('@{imgComUrl}icon-home2.png') no-repeat center / cover;
          }
        }
      }

      .middle {
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: 500px;
        .videoCover {
          width: 889px;
          height: 500px;
        }
        .brief {
          display: flex;
          flex-direction: column;
          width: 311px;
          height: 500px;
          background-color: #0e0e31;
          padding: 14px 16px 0 14px;
          .briefImg {
            width: 283px;
            height: 160px;
            background: url('@{imgUrl}descCover.png') no-repeat center / cover;
          }
          .briefContent {
            overflow-y: auto;
            flex: 1;
            font-size: 12px;
            color: #fff;
            text-align: left;
            padding: 14px 0;
            h4 {
              font-size: 18px;
              font-weight: 600;
              margin-bottom: 18px;
            }
            .briefTitle {
              line-height: 20px;
              p {
                margin-bottom: 10px;
              }
              p:nth-last-of-type(1) {
                margin-bottom: 0;
              }
              span {
                display: block;
              }
            }
          }
        }
      }
      .fotter {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 1200px;
        height: 116px;
        background-color: #060620;
        padding: 20px;
        .fotterLeft {
          text-align: left;
          .title {
            font-size: 24px;
            color: #fff;
            font-weight: 600;
            margin-bottom: 8px;
          }
          .introduce {
            font-size: 12px;
            color: #c4c3cf;
            margin-bottom: 14px;
          }
          .price {
            font-size: 12px;
            color: #c4c3cf;
            span {
              display: inline-block;
              font-size: 24px;
              color: #fc3b52;
              margin-left: 12px;
            }
          }
        }
        .fotterRight {
          display: flex;
          flex-direction: column;
          justify-content: center;
          // align-items: center;
          // width: 300px;
          width: 272px;
          height: 100%;

          button {
            height: 48px;
            background-color: #fc3b52;
            text-align: center;
            line-height: 48px;
            color: #fff;
            font-size: 18px;
            border-radius: 25px;
          }
        }
      }
    }
  }
  .artistWrap {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    .artist {
      min-width: 1200px;
      width: 1200px;
      padding: 48px 0;
      .inviteArt {
        font-size: 30px;
        color: #191919;
        margin-bottom: 20px;
      }
      .itemBox {
        display: flex;
        justify-content: space-between;
        width: 1200px;
        clear: both;
        .item {
          width: 140px;
          text-align: center;
          .img {
            border-radius: 10px;
            width: 140px;
            height: 196px;
            margin-bottom: 14px;
          }
          .name {
            font-size: 16px;
            color: #333;
            margin-bottom: 8px;
          }
          .englishName {
            font-size: 12px;
            color: #999;
          }
        }
      }
    }
  }
  .noticeWrap {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    .notice {
      min-width: 1200px;
      width: 1200px;
      padding-top: 50px 0 80px 0;
      h4 {
        font-size: 18px;
        color: #191919;
        font-weight: 500;
        margin-bottom: 14px;
      }
      .noticeNum {
        line-height: 36px;
        p {
          font-size: 12px;
          margin-bottom: 10px;
          color: #7a7a7a;
        }
      }
      .fotterTitle {
        text-align: center;
        font-size: 12px;
        color: #a7a7a7;
      }
    }
  }
}
</style>
