<template>
  <div class="kefu">
    <van-nav-bar
      class="m-header"
      :title="$t('专属客服')"
      left-arrow
      :fixed="true"
      v-show="!$route.query.source"
      @click-left="onClickLeft"
    />
    <div
      class="m-body"
      :style="{paddingTop: $route.query.source && '0'}"
    >
      <!-- <div class="loading">
        <div class="logo"></div>
        <span class="title">{{$t('加载中')}}</span>
      </div> -->
      <iframe
        :src="link"
        ref="iframe"
      ></iframe>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'Kefu',
  data() {
    return {}
  },
  computed: {
    ...mapState('global', ['siteInfo']),
    ...mapState('users', ['userInfo']),
    link() {
      const { siteInfo, userInfo } = this
      let url = (siteInfo && siteInfo.h5_kf) || ''
      if (userInfo && userInfo.username) {
        if (url.indexOf('aichat') !== -1) {
          if (url.indexOf('referrer') !== -1) {
            url = `${url}?params={"username":"${userInfo.username}"}`
          } else {
            url = `${url}&params={"username":"${userInfo.username}"}`
          }
        }
      }
      return url
    }
  },
  created() {
    !this.link && this.getSiteInfo()
    this.$loading()
    this.$nextTick(() => {
      const iframe = this.$refs.iframe
      if (iframe.attachEvent) {
        iframe.attachEvent('onload', () => {
          this.$toast.clear()
        })
      } else {
        iframe.onload = () => {
          this.$toast.clear()
        }
      }
    })
  },
  methods: {
    ...mapActions('global', [
      'getSiteInfo'
    ]),
    onClickLeft() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less" scoped>
.kefu {
  height: 100%;
  .m-body {
    height: 88vh;
    padding-bottom: 0;
    overflow: hidden;
  }
}
iframe {
  width: 100%;
  height: 100%;
  border: none;
  // padding-bottom: 120px;
}
</style>
