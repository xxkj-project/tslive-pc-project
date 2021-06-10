<!-- 支付成功Page -->
<template>
  <div class="payment">
    <div class="mask" v-show="dialogVisiable"></div>
    <van-dialog v-model="dialogVisiable" title="支付成功" :width="632" :showCancelButton="true" :overlay="false">
      <span class="closeIcon" @click="onCloseDialog"></span>
      <div class="paymentContent">
        <h4>您好!</h4>
        <div class="paymentText">
          <p>感谢您购买<span>无限梦想音乐演唱会2021</span>入场票据</p>
          <p>
            您购买的{{ num }}张演唱会入场票据已接受成功，您再 2021-05-01 18:30
            演唱会开始时，打开【唐僧直播观看地址-演唱会直播间】前往输入入场票据码，进入观看
          </p>
        </div>
        <div class="paperCodeWrap" align="center">
          <div class="paperCode">
            <div class="paperImg"></div>
            <p>我的入场票据码</p>
            <ul :class="[dataList.length == 1 ? 'listBox' : 'itemBox']">
              <li class="item" v-for="(item, index) in dataList" :key="index">{{ item }}</li>
            </ul>
          </div>
        </div>
        <p class="hintTXT">温馨提示：票据码可以去邮箱查看，或者演唱会当天支付的可点击复制此票据码进入直播间观看</p>
      </div>
    </van-dialog>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      num: 2,
      dataList: ['wx2021']
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    dialogVisiable: {
      get() {
        return this.visible
      },
      set(val) {
        this.$emit('update:visible', val)
      }
    }
  },
  components: {},
  created() {},
  mounted() {},
  methods: {
    initData() {
      this.num = 1
      this.dataList = ['wx2021']
    },
    onCloseDialog() {
      this.dialogVisiable = false
      this.initData()
    }
  }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
@imgUrl: '~@/assets/images/buyTicket/';
.payment {
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 200;
  padding-top: 20px;
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
    background-color: #fff;
    /deep/ .van-dialog__header {
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
  .paymentContent {
    width: 100%;
    padding: 20px 50px;
    h4 {
      font-size: 20px;
      color: #191919;
      font-weight: 500;
    }
    .paymentText {
      font-size: 16px;
      color: #555;
      p {
        line-height: 25px;
        padding-top: 20px;
        span {
          font-size: 16px;
          color: #fc3b52;
        }
      }
    }
    .paperCodeWrap {
      width: 100%;
      padding: 20px 0;
      .paperCode {
        width: 314px;
        border-radius: 25px;
        border: 1px solid #f2f2f5;
        .paperImg {
          height: 140px;
          border-top-left-radius: 25px;
          border-top-right-radius: 25px;
          background: url('@{imgUrl}paperImg.png') no-repeat center / cover;
        }
        p {
          font-size: 20px;
          color: #49484d;
          padding-top: 18px;
        }
        .itemBox {
          overflow-y: auto;
          height: 150px;
        }
        .itemBox,
        .listBox {
          padding: 22px 15px;

          .item {
            width: 100%;
            height: 36px;
            text-align: center;
            line-height: 36px;
            background-color: #f2f2f5;
            border-radius: 20px;
            margin-bottom: 22px;
          }
          .item:nth-last-of-type(1) {
            margin-bottom: 0;
          }
        }
      }
    }
    .hintTXT {
      width: 100%;
      text-align: center;
      font-size: 12px;
      color: #a7a7a7;
    }
  }
}
</style>
