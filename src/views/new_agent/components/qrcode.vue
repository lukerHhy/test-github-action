<template>
  <div v-if="data.length !== 0" style="margin-top: .3rem">
    <div class="qrcode-box" v-for="(item, i) in data" :key="i">
      <p class="qrcode-title">{{ title }}</p>
      <p class="qrcode-domain">{{ item.domain }}</p>
      <div>
        <img :src="item.url" alt="" class="qrcode-img" />
      </div>

      <van-button
        style="background: rgb(200, 167, 127);
              border-color: rgb(200, 167, 127);
              color:#1E1E1E;
              width: 62%;
              height: 1rem;
              line-height: 1rem;
              "
        @click="share(item.url)"
        >{{$t('分享二维码')}}</van-button
      >
      <van-button
        style="width: 62%;
            height: 1rem;
            margin-top: .5rem;
            line-height: 1rem;"
        v-clipboard:copy="item.domain"
        v-clipboard:success="firstCopySuccess"
        v-clipboard:error="firstCopyError"
        >{{$t('复制链接')}}</van-button
      >
    </div>
  </div>
</template>
<script>
export default {
  name: 'qrcode',
  props: {
    data: {
      default: () => [],
    },
    share: {
      type: Function,
    },
    title: {
      default: '',
    },
  },
  methods: {
    firstCopySuccess(e) {
      console.log(this.$parent)
      this.$toast(this.$t('复制成功'))
    },
    firstCopyError() {
      this.$toast(this.$t('复制失败'))
    },
  },
}
</script>
<style lang="less" scoped>
.qrcode-img {
  width: 62%;
  margin-top: 0.7rem;
  margin-bottom: 0.7rem;
  border: 14px solid #838383;
  border-radius: 0.2rem;
  background: #282828;
  box-shadow: 0px 2px 50px 0px rgba(0, 0, 0, 0.2);
}
.qrcode-domain {
  color: #c8a77f;
  text-align: center;
  // line-height: .8rem;
  font-size: 0.4rem;
}
.qrcode-title {
  color: #999999;
  text-align: center;
  line-height: 1rem;
  font-size: 0.5rem;
}
.qrcode-box {
  width: 90%;
  margin: auto;
  background: #282828;
  box-shadow: 0px 2px 50px 0px rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  height: 11.6rem;
  padding-top: 0.3rem;
  text-align: center;
  margin-bottom: 1rem;
}
</style>
