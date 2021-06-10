<!-- 
   layout - footerLink
-->
<template>
  <div class="footerLink">
    <p class="txt">{{ i18nData.copyRight }}</p>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {}
  },
  computed: {
    i18nData() {
      return this.$t('footer')
    }
  },
  components: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
.footerLink {
  padding: 36px 0 18px 0;

  .txt {
    font-size: 12px;
    color: #a7a7a7;
    text-align: center;
  }
}
</style>
