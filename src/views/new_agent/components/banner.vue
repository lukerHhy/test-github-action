<template>
  <div style="position: relative">
    <template>
      <van-swipe :autoplay="4000" class="banner">
        <van-swipe-item
            @click="go(item)"
            v-for="(item, index) in lists"
            :key="index">
          <van-image lazy-load :src="item.h5_pic" @click="go(item.h5_link)"/>
        </van-swipe-item>
      </van-swipe>
    </template>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {siteinfo} from '@/api/home'
import {indexbanner} from "@/api/agent";

export default {
  props: ['banner', 'pageName'],
  data() {
    return {
      lists: [],
      h5LogoSrc: '',
    }
  },
  computed: {
    ...mapState('global', ['siteInfo']),
  },
  created() {
    this.getData()
    if (!this.siteInfo) {
      siteinfo(process.env.VUE_APP_MERCHANT_NO).then((res) => {
        if (res.data.code === 0) {
          this.h5LogoSrc = res.data.data.h5_logo
        }
      })
    } else {
      this.h5LogoSrc = this.siteInfo.h5_logo
    }
  },
  methods: {
    onClickRight() {
      if (window.localStorage.token) {
        this.$router.push({
          name: 'news',
        })
      } else {
        this.$store.dispatch('global/setNoLogin', true)
      }
    },
    getData() {
      indexbanner(process.env.VUE_APP_MERCHANT_NO).then((res) => {
        if (res.data.code === 0) {
          this.lists = res.data.data
        }
      })
    },
    go(item) {
      if (item.h5_link) {
        const param =
            item.h5_link.indexOf('http') !== -1 ||
            item.h5_link.indexOf('https') !== -1
        param ? window.open(item.h5_link) : this.$router.push(item.h5_link)
      }
    },
  },
}
</script>

<style lang="less" scoped>
#banner {
  width: 100%;
  height: 240px;
  background: @bg-color;
  margin-bottom: 24px;

  > .van-image {
    border-radius: 8px;
    overflow: hidden;
  }
}

.banner {
  // width: 100%;
  width: 690px;
  height: 240px;
  position: relative;
  border-radius: 6px;
  overflow: hidden;
  margin: 0 auto;
  margin-bottom: @space-gap;
  // margin-top: @space-gap;
  /deep/ .van-swipe-item {
    .van-image {
      width: 100%;
      height: 100%;

      img {
        border-radius: 8px;

        &[lazy='loading'] {
          opacity: 0;
          max-width: 100%;
        }
      }

      .van-image__error,
      .van-image__loading {
        background-color: @bg-color;
        border-radius: 8px;
      }

      .van-image__loading {
      }
    }
  }

  /deep/ .van-swipe__indicators {
    padding: 6px 15px;
    background-color: rgba(@bg-card-color, 0.3);
    border-radius: 25px;

    > i {
      width: 10px;
      height: 10px;
      background-color: #fff;
      opacity: 0.4;
      border-radius: 10px;

      &.van-swipe__indicator--active {
        width: 40px;
        opacity: 1;
      }
    }
  }
}
</style>
