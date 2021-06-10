<!--
确认订单
-->
<template>
  <div class="confirm">
    <div class="mask" v-show="dialogVisiable"></div>
    <van-dialog
      v-model="dialogVisiable"
      :title="i18nData.title"
      :width="width"
      :showConfirmButton="false"
      :overlay="false"
    >
      <span class="closeIcon" @click="onCloseDialog"></span>
      <div class="confirmContent">
        <h5>{{ itemOne.label }}</h5>
        <input class="email" v-model="email" type="email" :placeholder="itemOne.placeholder" @blur="handleInputBlur" />
        <h5>{{ itemTwo.label }}</h5>
        <div class="buyNum">
          <van-stepper v-model="buyNum" disable-input min="1" max="5" @change="changeBuyNum" />
          <span>（{{ itemTwo.tips }}）</span>
          <p>
            {{ itemTwo.priceLabel }}<span>￥{{ totalPrice }}</span>
          </p>
        </div>
        <p class="remark">{{ i18nData.remark }}</p>
        <div class="paymentCode" align="center">
          <div class="codeContent">
            <qrCode :wxUrl="wxUrl">
              <p class="codePay">
                <span class="codeIcon"></span><span>{{ i18nData.wxTipsTxt }}</span>
              </p>
            </qrCode>
          </div>
        </div>
        <div class="btn" align="center">
          <van-button color="#fc3b52" :disabled="!!wxUrl" @click="onGetCode">{{ i18nData.btnTxt }}</van-button>
        </div>

        <p class="bottomTitle">{{ i18nData.kf }}</p>
      </div>
    </van-dialog>
  </div>
</template>

<script>
import { getQrCode } from '@/api'
import qrCode from '@/components/qrCode'
import { validEmail } from '@/utils/validate.js'
import tools from '@/utils/tools'
export default {
  name: '',
  data() {
    return {
      currMail: '',
      wxUrl: '',
      buyNum: 1,
      email: ''
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    i18nData() {
      return this.$t('pcLive').dialog
    },
    itemOne() {
      return this.i18nData.item1
    },
    itemTwo() {
      return this.i18nData.item2
    },
    width() {
      let wid = (window.innerWidth / 1920) * 632 + 'px'
      return wid
    },
    totalPrice() {
      return this.buyNum > 0 ? this.buyNum * 200 : 200
    },
    dialogVisiable: {
      get() {
        return this.visible
      },
      set(val) {
        this.$emit('update:visible', val)
      }
    },
    throttleGetCode() {
      return tools.throttle(this.getQrCode, 2000)
    }
  },
  created() {},
  mounted() {},
  methods: {
    changeBuyNum() {
      console.log('-aaa-', this.buyNum)
      if (this.wxUrl) this.getQrCode()
    },
    initData() {
      this.buyNum = 1
      this.email = ''
      this.wxUrl = ''
    },
    onCloseDialog() {
      this.dialogVisiable = false
      this.initData()
    },
    handleInputBlur() {
      if (this.currMail === this.email) {
        return
      }
      this.currMail = this.email
      if (this.wxUrl) this.getQrCode()
    },
    onGetCode() {
      this.throttleGetCode()
    },
    getQrCode() {
      // console.log('-num-', this.buyNum)
      if (this.email == '') {
        this.$toast(this.i18nData.toast.mail)
        return
      }
      if (!validEmail(this.email)) {
        this.$toast(this.i18nData.toast.mailValid)
        return
      }
      this.$loading.show()
      const params = { mail: this.email, num: this.buyNum }
      // console.log('-params-', params)
      getQrCode(params)
        .then(res => {
          this.wxUrl = res.data
          this.$loading.hide()
        })
        .catch(err => {
          console.log('-err-', err)
          this.$loading.hide()
        })
    }
  },
  components: { qrCode }
}
</script>
<style lang="less" scoped>
@imgUrl: '~@/assets/images/buyTicket/';
.confirm {
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 200;
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 130;
  }
  /deep/ .van-dialog {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #ffff;
    /deep/ .van-dialog__header {
      position: relative;
      font-size: 22px;
      color: #191919;
      font-weight: 600;
    }
    .closeIcon {
      position: absolute;
      top: 25px;
      right: 20px;
      display: inline-block;
      width: 16px;
      height: 16px;
      background: url('@{imgUrl}icon-close.png') no-repeat center / cover;
      cursor: pointer;
    }
  }
  .confirmContent {
    width: 100%;
    padding: 30px 50px 20px 50px;
    h5 {
      font-size: 16px;
      color: #191919;
      margin-bottom: 20px;
    }
    .email {
      width: 100%;
      height: 60px;
      background-color: #fff;
      border: 15px solid #f6f6f6;
      padding-left: 12px;
      margin-bottom: 40px;
    }
    .buyNum {
      width: 100%;
      height: 30px;
      line-height: 30px;
      margin-bottom: 30px;
      /deep/ .van-stepper {
        float: left;
      }
      p {
        float: right;
        font-size: 12px;
        color: #757575;
        span {
          font-size: 24px;
          margin-left: 8px;
          color: #fc3b52;
        }
      }
    }
    .remark {
      padding-bottom: 10px;
    }
    .paymentCode {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      // margin-bottom: 42px;
      margin-bottom: 12px;
      .codeContent {
        display: flex;
        justify-content: center;
        // width: 100%;
        // width: 134px;
        height: 158px;
        border: 2px solid #f6f6f6;
      }
      .codePay {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 12px;
        color: #666;
        .codeIcon {
          width: 22px;
          height: 22px;
          background: url('@{imgUrl}icon-pay-wx.png') no-repeat center / cover;
          margin-right: 4px;
        }
      }
    }
    .btn {
      margin-bottom: 15px;
      button {
        background-color: #fc3b52;
        text-align: center;
        line-height: 40px;
        color: #fff;
        font-size: 16px;
        border-radius: 20px;
        padding: 0 20px;
      }
    }
    .bottomTitle {
      text-align: center;
      font-size: 12px;
      color: #a7a7a7;
    }
  }
}
</style>
