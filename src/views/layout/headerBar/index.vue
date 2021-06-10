<!-- 
   layout -header
-->
<template>
  <div class="header">
    <div class="header-content">
      <div class="left">
        <span class="logo"></span>
        <slot name="left" />
      </div>
      <div class="right" @click="onOpenHome">
        <span class="icon-home"></span>
        <span>{{ i18nData.backBtnTxt }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: '',
  data() {
    return {}
  },
  computed: {
    ...mapState('globalStatus', ['locale']),
    i18nData() {
      return this.$t('header')
    }
  },
  components: {},
  created() {},
  mounted() {},
  methods: {
    onOpenHome() {
      let lang = this.locale === 'zh' ? 'zh-cn' : 'en-us'
      window.open(`http://www.tangseng.io/?lang=${lang}`, '_blank')
    }
  }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
@imgUrl: '~@/assets/images/common/';
.header {
  width: 100%;

  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 1200px;
    line-height: 80px;
    margin: 0 auto;

    .left {
      display: flex;
      align-items: center;
    }

    .logo {
      width: 116px;
      height: 40px;
      background: url('@{imgUrl}logo2.png') no-repeat center / cover;
      cursor: pointer;
    }

    .right {
      display: flex;
      align-items: center;
      color: #4b0db9;
      font-size: 14px;
      cursor: pointer;

      .icon-home {
        width: 9px;
        height: 9px;
        background: url('@{imgUrl}icon-home1.png') no-repeat center / cover;
        margin-right: 6px;
      }
    }
  }
}
</style>
