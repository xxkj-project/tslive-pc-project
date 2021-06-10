<!--
动态生成二维码
-->
<template>
  <div class="qrcode" v-show="imgUrl">
    <img :src="imgUrl" alt="" />
    <slot />
  </div>
</template>

<script>
import qrCode from 'qrcode'
export default {
  name: '',
  data() {
    return {
      imgUrl: ''
    }
  },
  props: {
    wxUrl: {
      type: String,
      default: ''
    }
  },
  watch: {
    wxUrl(val) {
      // console.log('-val-', val)
      if (val) {
        this.getData(val)
      } else {
        this.imgUrl = ''
      }
    }
  },
  computed: {},
  components: {},
  created() {},
  mounted() {},
  methods: {
    getData(data) {
      qrCode
        .toDataURL(data)
        .then(res => {
          // console.log('-res-', res)
          this.imgUrl = res
        })
        .catch(err => {
          console.log('-err-', err)
        })
    }
  }
}
</script>
<style lang="less" scoped>
.qrcode {
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 134px;
    height: 134px;
  }
}
</style>
