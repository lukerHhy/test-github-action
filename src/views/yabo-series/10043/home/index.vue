<template>
  <div id="home">
    <vtabbar class="m-footer" id="footer-yabo" :index="0"></vtabbar>
    <!-- <div class="newyear-gif">
      <van-image :src="require('@assets/img3_0/decorate/newyear.gif')"></van-image>
    </div> -->
    <div
      :class="[{ 'bg-img': ['Home'].indexOf($route.name) !== -1 }]"
      id="tab-wrap"
    >
      <!-- <div class="address_net" v-if="$projectname === 'takchun'">
        tyc.com
        <van-icon name="close"></van-icon>
      </div> -->
      <appInstall @handleChange="handleChange"></appInstall>

      <Banner pageName="featured" />
      <div class="db-mid-style">
        <Notice v-if="$projectname !== '10015'" />
        <div class="head-mid-box">
          <gheader class="m-header"></gheader>
        </div>
      </div>

      <tabStyle :appInstallStatus="appInstallStatus"></tabStyle>
    </div>

    <van-popup v-model="leftNav" position="left" class="leftnav">
      <div class="leftnav-logo">
        <p>
          <img :src="$imgs['home/logo_install']" alt="" /><span>{{$t('西宝娱乐')}}</span>
        </p>
      </div>
      <div class="leftnav-con">
        <h2>{{$t('西宝娱乐')}}</h2>
        <p class="leftnav-con-item" @click="linkTo('/news')">
          <img :src="$imgs['home/icon_sheet_1@2x']" alt="" /><span
            >{{$t('消息中心')}}</span
          >
        </p>
        <p class="leftnav-con-item">
          <img :src="$imgs['home/icon_sheet_4@2x']" alt="" /><span
            >{{$t('永久域名')}}</span
          ><i
            v-clipboard:copy="`https://${$config[$projectname].domain}`"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError"
            >{{ $config[$projectname].domain }}</i
          >
        </p>
        <p class="leftnav-con-item" @click="linkTo('/aboutWe')">
          <img :src="$imgs['home/icon_sheet_5@2x']" alt="" /><span
            >{{$t('关于我们')}}</span
          >
        </p>
      </div>
      <p class="leftnav-log" v-if="!access_token" @click="linkTo('/login')">
        <span>{{$t('立即登录')}}</span>
      </p>
      <p class="leftnav-log" v-else @click="signOut">
        <img :src="$imgs['home/icon_sheet_out@2x']" alt="" /><span class="c-999"
          >{{$t('安全退出')}}</span
        >
      </p>
    </van-popup>
    <van-dialog
      v-model="showBindBankCard"
      @confirm="bindCardConfirm"
      @cancel="bindCardCancel"
       :title="$t('银行卡绑定提示')"
       :confirmButtonText="$t('立即绑定')"
       :cancelButtonText="$t('暂不绑定')"
      showConfirmButton
      showCancelButton
    >
      <p class="bind-card-text">
        {{$t('您未绑定银行卡，我们无法为您打款到账户')}}<br />{{$t('遇到问题')}}
        <span @click="gokefu" :style="{ color: $colorjs.baseColor }"
          >{{$t('联系专属客服')}}</span
        >
      </p>
    </van-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
// import "swiper/dist/css/swiper.css";
import Gheader from "../../components/g-header";
import Vtabbar from "../../components/v-tabbar";
import AppBanner from "../../../home/components/app-banner";
import Banner from "../../../home/components/banner";
import Notice from "../../../home/components/notice";
import Featured from "../../../home/featured";

import appInstall from "../../components/app-install";
// import GameSearch from '@/components/search/search'
import { open } from "@/api/entertainment";
import { historylist, siteinfo } from "@/api/home";
import { member } from "@/api/memberCenter";
import "swiper/dist/css/swiper.css";
import { Swiper } from "vue-awesome-swiper";
import tabStyle from "./tabStyle";

export default {
  name: "Index",
  components: {
    Gheader,
    Banner,
    Notice,
    AppBanner,
    Featured,
    // GameSearch,
    Vtabbar,
    appInstall,
    tabStyle,
  },
  data() {
    return {
      showBindBankCard: false,
      leftNav: false,
      sixGiftIsAvailable: true,
      access_token: window.localStorage.token,
      slotsType: "",
      actived: 0,
      activedName: "sports",
      bannerPic: "",
      mySwiper1: null,
      appInstallStatus: true,
    };
  },
  watch: {
    active(val) {
      if (val !== 2) {
        this.slotsType = "";
      }
    },
  },
  created() {},
  mounted() {},
  computed: {
    ...mapState("global", ["gameSearch"], "users", ["isLogin"]),
  },
  methods: {
    openSidenav() {
      this.leftNav = true;
    },
    onCopy: function (e) {
      this.$toast(this.$t('复制成功'));
    },
    onError: function (e) {
      this.$toast.fail(this.$t('复制失败，请重试'));
    },
    linkTo(path) {
      console.log(path);
      if (this.access_token) {
        this.$router.push({ path });
      } else {
        this.$router.push({ path: "/login" });
      }
    },
    signOut() {
      this.$dialog
        .confirm({
          title: this.$t('温馨提示'),
          message: this.$t('是否退出登录？'),
        })
        .then(() => {
          // this.isLogin = false;
          this.$store.dispatch("users/logout").then(() => {});
          this.$router.push("/");
        })
        .catch(() => {
          // on cancel
        });
    },
    callService() {
      this.$openKefu();
    },
    slideCur(index) {
      this.activeIdx = index;
      this.mySwiper1.slideTo(index, 300, false);
    },
    onClickRight() {
      if (window.localStorage.token) {
        this.$router.push({
          name: "news",
        });
      } else {
        this.$store.dispatch("global/setNoLogin", true);
      }
    },
    listPath(path) {
      if (path === "agentHomepage") {
        this.$router.push("agentHomepage");
      } else {
        this.isLogin
          ? this.$router.push({ name: path })
          : this.$store.dispatch("global/setNoLogin", true);
      }
    },
    handleChange(val) {
      console.log("===", val);
      this.appInstallStatus = val;
    },
    bindCardConfirm() {
      this.$router.push({
        path: "/addBankCard",
        query: {
          getPath: "memberCenter",
        },
      });
    },
    bindCardCancel() {
      this.$router.push({
        path: "/memberCenter",
      });
    },
    gokefu() {
      alert(1);
      this.$openKefu();
    },
    handleWithdraw() {
      if (!this.isLogin) {
        this.$store.dispatch("global/setNoLogin", true);
        return;
      }
      const { bankList, userInfo } = this;
      if (!bankList || !bankList.length) {
        this.showBindBankCard = true;
        return;
      } else if (!userInfo.mobile) {
        this.$store.dispatch("global/setPopShow", {
          telDisplay: true,
          status: true,
        });
      } else {
        this.$store.dispatch("global/setFlow", true);
      }
    },
    govip() {
      // window.open("https://m.aavipjlb.com", "aavip");
      this.$router.push("/vip");
    },
    openGame() {
      if (!window.localStorage.token) {
        this.$router.push({
          path: "login",
        });
        return false;
      }
      let routeUrl = this.$router.resolve({
        path: "/game",
        query: {
          at: window.localStorage.token,
          game_id: 16,
        },
      });
      window.open(routeUrl.href, "_blank");
    },
    openGame(item) {
      if (window.localStorage.token) {
        let routeUrl = this.$router.resolve({
          path: "/game",
          query: {
            at: window.localStorage.token,
            game_id: item.default_game_id,
            platform_id: item.game_platform_id,
          },
        });
        window.open(routeUrl.href, "_blank");
      } else {
        this.$router.push({ path: "/login" });
      }
    },
    jump(path) {
      if (path === "liuheColor") {
        this.$router.push({
          name: "game",
          params: {
            id: 16,
          },
        });
      } else {
        this.$router.push({ path: path });
      }
    },
    onTabChange(index, title) {
      // console.log(this.$route)
      // console.log(index, title)
      // Object.assign(
      //   this.$route.query, {
      //     tab: index
      //   }
      // )
    },
    handleActive(val, active) {
      console.log("wowo", val);
      if (val) {
        this.active = 2;
        this.slotsType = val;
      } else {
        this.active = active;
      }
    },
    changeSlotsType() {
      this.slotsType = "";
    },
    sideTab(item, index) {
      this.actived = index;
      this.activedName = item.name;
      this.bannerPic = item.bannerPic;
    },
  },
};
</script>

<style scoped lang="less">
@import "~@assets/styles/home/index.less";

#home {
  background: #f5f6fa;
  padding-bottom: @height-tab-bar;
  .bg-img {
    transition: all 1s;
    &.translateScrollMin {
      transform: translate3d(0, 0, 0) !important;
    }
    &.translateScrollMax {
      transform: translate3d(0, -120px, 0) !important;
    }
  }
}
/deep/ #banner {
  width: 100%;
  height: 380px;
  margin-bottom: 0;
  .banner {
    width: 100%;
    height: 100%;
    margin: 0;
    border-radius: 0;
    .van-swipe-item .van-image img {
      border-radius: 0;
    }
  }
  .van-swipe__indicators {
    bottom: 64px;
    background: none;
  }
}

.address_net {
  position: relative;
  margin: 0.25rem;
  height: 0.8rem;
  border-radius: 15px;
  background: #000;
  color: #fff;
  text-align: center;
  line-height: 0.8rem;
  font-size: 0.5rem;
  /deep/ .van-icon {
    position: absolute;
    top: 50%;
    right: 30px;
    transform: translateY(-50%);
    color: #fff;
    font-size: 0.6rem;
  }
}

.van-tabs {
  /deep/ .van-tabs__content {
    .page-linear-gradient();
    .van-tab__pane-wrapper {
      overflow: hidden;
      padding: 0 @space-gap;
      &.fishing {
        /*background: #1e1e1e url(~@assets/img3_0/home/fishing/bg@2x.jpg) no-repeat;*/
        background-size: cover;
        min-height: 84vh;
      }
      &.chess {
        /*background: #1e1e1e url(~@assets/img3_0/home/chess/bg@2x.jpg) repeat;*/
        background-size: contain;
      }
    }
  }
  /deep/ .van-tab--active {
    font-size: 36px;
  }
  .banner {
    margin-top: @space-gap;
  }
}

/deep/ .ui-title {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: @space-gap;
  h2 {
    margin: 0;
  }
  .addon {
    color: #ccc;
    font-size: 24px;
  }
}

/deep/ .games-wrap {
  display: flex;
  flex-wrap: wrap;
  margin-left: -@space-gap;
  &.mb-gap {
    margin-bottom: 88px;
  }
  .game-item {
    position: relative;
    width: calc(50% - @space-gap);
    margin-left: @space-gap;
    margin-bottom: @space-gap;
    box-shadow: 0px 16px 20px 0px rgba(123, 139, 171, 0.28);
    background: linear-gradient(
      180deg,
      rgba(180, 215, 255, 1) 0%,
      rgba(229, 228, 222, 1) 100%
    );
    .van-image {
      width: 100%;
      /deep/ img[lazy="loading"] {
        opacity: 0;
        max-width: 100%;
      }
    }
    .game-info {
      position: absolute;
      left: 98px;
      top: 22px;
      right: 0;
      z-index: 2;
    }
    h3 {
      font-size: 32px;
      margin: 0;
      background: linear-gradient(
        90deg,
        rgba(255, 255, 255, 1) 0%,
        rgba(206, 231, 254, 1) 30%,
        rgba(255, 255, 255, 1) 51%,
        rgba(202, 230, 254, 1) 78%,
        rgba(255, 255, 255, 1) 100%
      );
      -webkit-background-clip: text;
      color: transparent;
    }
    h4 {
      font-size: 16px;
      margin: 6px 0 0;
      background: linear-gradient(
        90deg,
        rgba(255, 255, 255, 1) 0%,
        rgba(206, 231, 254, 1) 30%,
        rgba(255, 255, 255, 1) 51%,
        rgba(202, 230, 254, 1) 78%,
        rgba(255, 255, 255, 1) 100%
      );
      -webkit-background-clip: text;
      color: transparent;
    }
    p {
      margin-bottom: 10px;
      opacity: 0.7;
      &.tag-p {
        margin-bottom: 20px;
      }
    }
    &.large {
      width: calc(100% - @space-gap);
    }
  }
  &.float-wrap {
    display: block;
    .clearfix();
    .game-item {
      float: left;
      &.allbet {
        clear: left;
      }
      &.tall ~ .game-item:nth-child(4) {
        clear: left;
      }
    }
  }
}

/deep/ .filter-nav {
  margin: @space-gap -@space-gap;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid @border-color;
  .van-tabs {
    width: 70%;
    border-bottom: none;
    /deep/ .van-tabs__nav {
      background-color: @bg-color !important;
    }
    .van-tab,
    .van-tabs__wrap,
    .van-tabs__nav {
      height: 80px;
      line-height: 80px;
      font-size: 28px;
    }
    .van-tabs__wrap {
      border-bottom: none;
    }
  }
  .search {
    width: 30%;
    padding: 0 30px;
  }
}

/deep/ .labels {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: @space-gap;
  &.platform {
    display: block;
    overflow-x: scroll;
    overflow-y: hidden;
    &::-webkit-scrollbar {
      display: none;
    }
    > div {
      // width:1100px;
      // overflow: hidden;
      // overflow: auto;
      // display: flex;
      // justify-content: space-between;
      display: flex;
      float: left;
      min-width: 100%;
      label {
        &:first-child {
          min-width: 180px;
        }
        min-width: 40px;
        text-align: center;
        // float:left;
        // line-height: 68px;
        // height:68px;
      }
    }
  }
  label {
    width: auto;
    padding: 0 @space-gap;
    line-height: 68px;
    color: #ccc;
    border-radius: 68px;
    // transition: all .45s ease-out;
    border: 2px solid transparent;
    &.active {
      color: @primary-color;
      border-color: @primary-color;
      font-weight: 500;
    }
  }
}

/deep/ .search-info {
  margin-bottom: @space-gap;
  text-align: center;
  margin-top: @space-gap + 50;
  > span {
    color: @primary-color;
    margin-right: 10px;
  }
}

/deep/ .van-list {
  &.games {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 90px;
    justify-content: space-around;
    .empty-game {
      width: 100%;
      text-align: center;
      img {
        width: 120px;
        margin: 0 auto;
      }
    }
    .van-cell {
      position: relative;
      width: calc(50% - @space-gap);
      margin-bottom: @space-gap;
      // margin-right: @space-gap;
      padding: 0;
      border-radius: 8px;
      overflow: hidden;
      background: @bg-card-color;
      border: 2px solid @border-color-base;
      // &:nth-child(2n) {
      //   margin-left: @space-gap;
      //   margin-right: 0;
      // }
      &:after {
        border-bottom: none !important;
      }
      .game-item {
        color: #fff;
        position: relative;
        .tag {
          width: 100px;
          height: 100px;
          position: absolute;
          right: 0;
          top: 0;
          text-align: center;
          padding-top: 70px;
          line-height: 30px;
          font-size: 20px;
          background-image: linear-gradient(to right, #ff9a5d, #ff3937);
          text-transform: uppercase;
          transform: rotate(45deg) translate(-20%, -20%);
          transform-origin: 100% 100%;
          &.new {
            background-image: linear-gradient(to right, #05d0da, #279cf8);
          }
        }
        .info {
          padding: 20px 15px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .van-icon {
            font-size: 40px;
            color: #979797;
            &.van-icon-like {
              color: @primary-color;
            }
          }
        }
      }
      h3 {
        font-size: 28px;
        margin: 0;
        span {
          background-color: @primary-color;
          color: #fff;
          font-size: 20px;
          padding: 2px 6px;
          font-weight: 300;
          margin-right: 6px;
          border-radius: 5px;
        }
      }
    }
    .van-list__loading,
    .van-list__finished-text {
      width: 100%;
      padding-bottom: @space-gap;
    }
  }
}

/deep/ .notice {
  margin: -48px 0 0;
  height: 48px;
  background: rgba(245, 246, 250, 0.8);
  border-radius: 24px 24px 0px 0px;
  border: 0;
  .van-icon {
    color: #51c1ff;
  }
}
.head-mid-box {
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(244, 248, 255, 1) 100%
  );
  box-shadow: 0px 4px 16px 0px rgba(128, 150, 194, 0.2);
  border-radius: 0px 0px 24px 24px;
  padding: 0 30px 6px;
  /deep/ .quick-link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    li {
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 88px;
        margin-right: 8px;
      }
      span {
        font-size: 22px;
        color: #98a4bd;
      }
    }
  }
}

/deep/ .nav-type-index {
  color: #fff;
}
/deep/ .index-main {
  padding: 22px 0;
  position: relative;
  overflow: hidden;
  .index-main-flex1 {
    width: 100%;
    padding-right: 30px;
    box-sizing: border-box;
    float: right;
  }
  .van-sticky {
    float: left;
    width: 114px;
    margin-left: -114px;
  }
  .index-side-nav {
    text-align: center;
    img {
      width: 90px;
    }
  }
  .van-sticky--fixed {
    background: none;
    margin-left: 0;
  }
  .van-tabs {
    border-bottom: none;
    background-color: transparent;
    overflow: hidden;
    padding-left: 114px;
    /deep/ .van-tabs__nav {
      background-color: transparent;
    }
    .van-tab__text img {
      width: 90px;
    }
    .van-tab .nav-active-icon {
      display: none;
    }
    .van-tab .nav-norm-icon {
      display: block;
    }
    .van-tab--active .nav-active-icon {
      display: block;
    }
    .van-tab--active .nav-norm-icon {
      display: none;
    }
    .van-tab,
    .van-tabs__wrap,
    .van-tabs__nav {
      height: auto !important;
      line-height: 80px;
      font-size: 28px;
      flex-direction: column;
    }
    .van-tabs__wrap {
      border-bottom: none !important;
      &:after {
        content: none;
      }
    }
    .van-tabs__nav {
      flex-direction: column;
      .van-tab {
        flex-basis: auto !important;
      }
    }
    .van-tabs__content {
      float: right;
      padding: 10px 30px 0 0;
      width: 100%;
    }
    .van-tabs__line {
      display: none;
    }
  }
}
/deep/ .games-wrap.float-wrap {
  .game-item {
    float: none;
    display: inline-block;
    vertical-align: top;
  }
}
/deep/ .games-wrap {
  .game-item {
    height: 276px;
    background: linear-gradient(
      180deg,
      rgba(180, 215, 255, 1) 0%,
      rgba(229, 228, 222, 1) 100%
    );
    border-radius: 20px;
    border: 0;
    .game-info {
      background: linear-gradient(
        90deg,
        rgba(255, 255, 255, 1) 0%,
        rgba(206, 231, 254, 1) 30%,
        rgba(255, 255, 255, 1) 51%,
        rgba(202, 230, 254, 1) 78%,
        rgba(255, 255, 255, 1) 100%
      );
      -webkit-background-clip: text;
      color: transparent;
    }
    .van-image {
      width: 100%;
      position: absolute;
      right: 0;
      bottom: 0;
    }
  }
  .game-item.ag.tall {
    width: calc(100% - 30px);
    height: 276px;
  }
}
/deep/ .sports {
  .game-item.shaba,
  .game-item.bbin,
  .game-item.im {
    width: calc(100% - 30px);
  }
}
/deep/ .lottery {
  .game-item.official.tall {
    width: calc(100% - 30px);
  }
}
/deep/ .chess {
  padding-top: 0;
  .games-wrap .game-item .van-image {
    width: 100%;
  }
}
/deep/ .esports {
  .games-wrap {
    .game-item {
      height: 426px;
    }
  }
}
/deep/ .fishing {
  padding-top: 0;
  .games-wrap {
    .game-item {
      .game-info {
        left: 18px;
      }
      .van-image {
        width: 240px;
        min-height: auto;
      }
    }
    .game-item.tall {
      height: 276px;
      width: calc(100% - 30px);
      .van-image {
        width: 400px;
        min-height: auto;
      }
    }

    .game-item.large {
      .van-image {
        min-height: auto;
        width: 400px;
      }
    }
  }
}
.index-main-flex1 {
  /deep/ #banner {
    height: auto;
    margin-bottom: 24px;
    background: none;
  }
}
.app-install {
  display: flex !important;
}
/deep/ .notice .action {
  display: none;
}
/deep/ .games-wrap .game-item .game-info-more {
  left: 18px;
}
</style>
