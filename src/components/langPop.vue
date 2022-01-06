<template>
  <div id="lang">
    <img
      @click="show = !show"
      :src="require(`@/assets/common/img/otherIcon/lang/${lang}.png`)"
      alt=""
    >
    <ul
      v-show="show"
      class="pop"
    >
      <li
        @click="chooseLang(item)"
        :class="{'active': lang === item}"
        v-for="(item, index) in langArr"
        :key="index"
      >
        <img
          :src="require(`@/assets/common/img/otherIcon/lang/${item}.png`)"
          alt=""
        >
        <p>{{langObj[item]}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import store from '@/store'
export default {
  data() {
    return {
      show: false,
      lang: window.localStorage.getItem("i18n") ||
        ((navigator.language && navigator.language.substr(0, 2)) == "en"
          ? "en"
          : "zh") || "zh",
      langObj: {
        zh: '中文',
        vn: 'Tiếng Việt',
        th: 'ไทย',
        en: 'English'
      },
      langArr: []
    }
  },
  computed: {
    ...mapState('global', ['siteInfo'])
  },
  watch: {
    siteInfo: {
      handler(val) {
        this.langArr = JSON.parse(val.lang)
        for (let key = this.langArr.length; key >= 0; key--) {
          try {
            const img = require(`@/assets/common/img/otherIcon/lang/${this.langArr[key]}.png`)
          } catch (e) {
            // console.log(333333, e, key)
            this.langArr.splice(key, 1)
          }
        }
      },
      deep: true
    }
  },
  created() {
    console.log('site', this.siteInfo)
    if (this.siteInfo) this.langArr = JSON.parse(this.siteInfo.lang)
    console.log(this.langArr)

  },
  methods: {
    chooseLang(lan) {
      this.show = false
      if (lan === 'zh') {
        this.lang = 'zh'
      } else {
        this.lang = lan
      }
      window.localStorage.setItem('i18n', lan)
      this.$i18n.locale = lan
      location.reload();
    }
  }
}
</script>

<style lang="less" scoped>
#lang {
  position: relative;
  > img {
    width: 42px !important;
    height: 42px !important;
  }
  .pop {
    position: absolute;
    top: 60px;
    right: 0px;
    z-index: 99;
    background: #323232;
    border-radius: 10px;
    &::after {
      content: "";
      width: 0;
      height: 0;
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      border-bottom: 10px solid #323232;
      position: absolute;
      top: -10px;
      right: 12px;
    }
    li {
      line-height: 82px;
      font-size: 28px;
      min-width: 280px;
      color: #bbb;
      color: @primary-color;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding-left: 40px;
      padding-right: 40px;
      overflow: hidden;
      &.active {
        background: #404040;
        color: #bbb;
      }
      p {
        line-height: 80px;
      }
      img {
        width: 42px;
        height: 42px;
        margin-right: 10px;
      }
    }
  }
}
</style>
