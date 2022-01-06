<template>
  <div style="position: relative">
    <div class="ava-msg" v-if="$projectname === '10022'||$projectname === '10028'||$projectname === '10029'||$projectname === '10064'||$projectname === '10060'||$projectname === '10059'||$projectname==='10043'">
      <img :src="h5LogoSrc" alt="">
      <img @click="onClickRight" class="msg-img" :src="$imgs['home/bet_icon_me_message_sqare@2x']" alt />
<!--      <langPop /> -->
    </div>
    <template v-if="pageName === 'featured'">
      <van-swipe v-if="!banner && pageName === 'featured'" :autoplay="4000" class="banner">
        <van-swipe-item
          @click="go(item)"
          v-for="(item, index) in lists"
          :key="index"
        >
          <van-image :src="item.h5_pic" @click="go(item.h5_link)" />
        </van-swipe-item>
      </van-swipe>
    </template>
    <template v-else>
      <div
        id="banner"
        v-if="banner"
        :style="{
          padding: aoMenUi.includes($projectname) && !banner && '0 0.4rem',
        }"
      >
        <van-image :src="banner" />
      </div>
    </template>
  </div>


</template>

<script>
import { indexbanner } from "@/api/home"
import { mapState } from "vuex";
import { siteinfo } from "@/api/home";
import langPop from '@/components/langPop'
export default {
  props:['banner', 'pageName'],
  data () {
    return {
      lists: [],
      h5LogoSrc: '',
      aoMenUi:['takchun', '10012', '10013', 'mgm8', '10006', '10011', '10007', '10009', '10010', '10008', '10021','10034','10057']
    }
  },
  components: {
    langPop
  },
  computed: {
    ...mapState("global", ["siteInfo"]),
  },
  created () {
    this.getData()
    if(!this.siteInfo) {
      siteinfo(process.env.VUE_APP_MERCHANT_NO).then(res => {
        if (res.data.code === 0) {
          this.h5LogoSrc = res.data.data.h5_logo;
        }
      });
    } else {
      this.h5LogoSrc = this.siteInfo.h5_logo
    }
  },
  methods: {
    onClickRight() {
      if (window.localStorage.token) {
        this.$router.push({
          name: "news"
        });
      } else {
        this.$store.dispatch("global/setNoLogin",true)
      }
    },
    getData () {
      indexbanner(process.env.VUE_APP_MERCHANT_NO).then(res => {
        if (res.data.code === 0) {
          this.lists = res.data.data
        }
      })
    },
    go(item) {
      if (item.h5_link) {
        const param = item.h5_link.indexOf('http') !== -1 || item.h5_link.indexOf('https') !== -1
        param ? window.open(item.h5_link) : this.$router.push(item.h5_link)
      }
    }
  }
}
</script>

<style lang="less" scoped>
#banner{
  width: 100%;
  height: 240px;
  background: @bg-color;
  margin-bottom: 24px;
  >.van-image{
    // margin-bottom: @space-gap;
    // padding-top: @space-gap;
    border-radius: 8px;
    overflow:hidden;
  }
}
.msg-img{
  width: 40px;
}
/deep/#lang{
  .pop{
    background: #fff !important;
    box-shadow: 0px 4px 16px 0px rgba(0,34,80,0.15);
    &::after{
      border-bottom-color: #fff !important;
    }
    li{
      color: #9AA4C2 !important;
      &.active{
        background: #CED2D5 !important;
        color: #fff !important;
      }
    }
  }
}
.banner {
  // width: 100%;
  width: 690px;
  height: 240px;
  position: relative;
  border-radius: 6px;
  overflow: hidden;
  margin:0 auto;
  margin-bottom: @space-gap;
  margin-top: @space-gap;
  /deep/ .van-swipe-item {
    .van-image{
      width: 100%;
      height:100%;
      img{
        border-radius: 8px;
        &[lazy="loading"]{
          opacity: 0;
          max-width: 100%
        }
      }
      .van-image__error,
      .van-image__loading{
        background-color: @bg-color;
        border-radius: 8px;
      }
      .van-image__loading{
        // background-image: url(../@assets/img3_0/common/loading.png);
        // background-position: center center;
        // background-repeat: no-repeat;
        // background-size: 280px 86px;
        // z-index: 10;
        // .van-icon{
        //   opacity: 0;
        // }
      }
    }
    // img {
    //   margin: 0;
    //   display: inline-block;
    //   width: 100px;
    //   max-width: 100%;
    //   vertical-align: middle;
    //   &[lazy="loaded"]{
    //     width: 100%;
    //     height: 120px * 2;
    //     display: block;
    //   }
    //   &[lazy="loading"],
    //   &[lazy="error"]{
    //     max-width: 345px * 2;
    //     max-height: 120px * 2;
    //   }
    // }
  }
  /deep/ .van-swipe__indicators{
    padding: 6px 15px;
    //background-color: rgba(@bg-card-color, .3);
    border-radius: 25px;

    >i{
      width: 12px;
      height: 6px;
      background-color: #fff;
      opacity: .4;
      border-radius: 10px;

      &.van-swipe__indicator--active{
        width: 26px;
        opacity: 1;
      }
    }
  }
}
</style>
