<template>
  <div class="avaswipe">
    <van-tabs v-model="levelActived" @click="slideCur" animated>
      <van-tab v-for="(item, index) in navs02" :key='index' :title="$t(item.title)">
        <template #title>
          <van-image
            class="norm"
            :src="$imgs['home/' + item.normalIcon + '']"
          ></van-image>
          <van-image
            class="active"
            :src="$imgs['home/' + item.activeIcon + '']"
          ></van-image>
        </template>
      </van-tab>
    </van-tabs>
    <div
      :class="['swiper-container', { iosBig: num === 7 && downAppHidden }]"
      id="swiper-container1"
    >
      <div class="swiper-pagination" id="pagination"></div>
      <div class="swiper-wrapper" id="swiper-dom">
        <div class="swiper-slide">
          <Sports />
        </div>
        <div class="swiper-slide">
          <Casino />
        </div>
        <div class="swiper-slide">
          <Slots :slotsType="slotsType" @changeSlotsType="changeSlotsType" />
        </div>
        <div class="swiper-slide">
          <Chess />
        </div>
        <div class="swiper-slide">
          <Lottery />
        </div>
        <div class="swiper-slide">
          <ESports />
        </div>
        <div class="swiper-slide">
          <Fishing />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Casino from "./casino";
import Chess from "../../home/chess";
import Slots from "./slots";
import Lottery from "../../home/lottery";
import Fishing from "../../home/fishing";
import Sports from "./sports";
import ESports from "../../home/esports";
import "swiper/dist/css/swiper.css";
import { Swiper } from "vue-awesome-swiper";
import { mapState } from "vuex";
export default {
  name: "tabStyle02",
  components: { Casino, Chess, Slots, Lottery, Fishing, Sports, ESports },
  props: ["appInstallStatus"],
  data() {
    return {
      navs02: [
        {
          title: this.$t('体育'),
          name: "sports",
          bannerPic: "",
          // that.$bImgs[`home/${that.navs02[i].normalIcon}`]
          // normalIcon:'home_icon_sport_nomal@2x',
          normalIcon: `home_icon_sport_nomal@2x`,
          activeIcon: "home_icon_sport_selected@2x",
        },
        {
          title: this.$t('真人'),
          name: "casino",
          bannerPic: "",
          normalIcon: "home_icon_live_nomal@2x",
          activeIcon: "home_icon_live_selected@2x",
        },
        {
          title: this.$t('电子'),
          name: "slots",
          bannerPic: "",
          normalIcon: "home_icon_slot_nomal@2x",
          activeIcon: "home_icon_slot_selected@2x",
        },
        {
          title: this.$t('棋牌'),
          name: "chess",
          bannerPic: "",
          normalIcon: "home_icon_board_nomal@2x",
          activeIcon: "home_icon_board_selected@2x",
        },
        {
          title: this.$t('彩票'),
          name: "lottery",
          bannerPic: "",
          normalIcon: "home_icon_lottery_nomal@2x",
          activeIcon: "home_icon_lottery_selected@2x",
        },
        {
          title: this.$t('电竞'),
          name: "esports",
          bannerPic: "",
          normalIcon: "home_icon_esports_nomal@2x",
          activeIcon: "home_icon_esports_selected@2x",
        },
        {
          title: this.$t('捕鱼'),
          name: "fishing",
          bannerPic: "",
          normalIcon: "home_icon_fishing_nomal@2x",
          activeIcon: "home_icon_fishing_selected@2x",
        },
      ],
      mySwiper1: null,
      mySwiper2: null,
      slotsType: "",
      activeIdx: 0,
      num: 5,
      downAppHidden: window.sessionStorage.getItem("downAppHidden") * 1,
      distanceY: 0,
      levelActived: 0,
    };
  },
  computed: {
    ...mapState("global", ["gameSearch"], "users", ["isLogin"]),
  },
  created() {},
  mounted() {
    this.initSwiper();
  },
  beforeDestroy() {
    document.getElementById("app").style.overflow = "unset";
  },
  methods: {
    slideCur(index) {
      console.log(index);
      this.$emit("getIndex", index);
      this.activeIdx = index;
      this.mySwiper1.slideTo(index, 300, false);
    },
    changeSlotsType() {
      this.slotsType = "";
    },
    initSwiper() {
      const that = this;
      that.num = 7;
      let deviceType = navigator.userAgent.toLowerCase();
      this.$nextTick(function () {
        this.mySwiper1 = new Swiper("#swiper-container1", {
          direction: "horizontal",
          autoHeight: true,
          on: {
            slideChangeTransitionStart: function (e) {
              console.log(this.activeIndex);
              that.$emit("getIndex", this.activeIndex);
              that.levelActived = this.activeIndex;
              that.activeIdx = this.activeIndex;
            },
          },
        });
      });
    },
  },
};
</script>

<style scoped lang="less">
#swiper-container1 {
  display: flex;
  justify-content: flex-start;
  position: relative;
  > .swiper-wrapper {
    width: 88%;
    margin-left: 12%;
  }
  > .swiper-pagination {
    width: 12%;
    height: 100%;
    left: 0;
    top: 0;
    transform: translateY(10px);
    /deep/.swiper-pagination-bullet {
      width: 90px !important;
      margin: 0 auto;
      background-color: transparent !important;
      height: 136px;
      background-size: 100%;
      opacity: 1 !important;
      transform: scale(1) !important;
      outline: none !important;
      background-repeat: no-repeat;
      img {
        width: 100%;
      }
    }
  }
  .swiper-container2 {
    transform: translate3d(0, 0, 0);
    overflow: hidden;
    > .swiper-wrapper {
      transform: translate3d(0, 0, 0);
    }
  }
}
@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
  // .swiper-container{
  //   height: 870px !important;
  //   &.iosBig{
  //     height: 950px !important;
  //   }
  // }
  // .swiper-pagination{
  //   top: 620px !important;
  // }
}
</style>
