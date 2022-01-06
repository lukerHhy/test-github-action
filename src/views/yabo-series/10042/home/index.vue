<template>
  <div id="home" :class="{ dark: isSports }">
    <vtabbar class="m-footer" id="footer-yabo" :index="0"></vtabbar>
    <div
      :class="[
        { 'bg-img': ['Home'].indexOf($route.name) !== -1 },
        { 'show-left': leftNav },
      ]"
      id="tab-wrap"
    >
      <div class="index-nav">
        <div class="index-nav-left" @click="openSidenav">
          <img :src="$imgs['home/nav-left']" alt="" />
          <span>A-Z</span>
        </div>
        <div class="index-nav-center">
          <img :src="$imgs['home/bet_home_logo_left@2x']" alt="" />
        </div>
        <div class="index-nav-right">
          <p v-if="!isLogin">
            <router-link to="/register">{{$t('立即加入')}}</router-link>
            <a @click="openLogin">{{$t('登录')}}</a>
          </p>
          <div
            :class="{
              dot:
                userInfo &&
                userInfo.site_notice_unread_counts +
                  userInfo.user_notice_unread_counts >
                  0,
            }"
            v-else
          >
            <img
              :src="$imgs['home/bet_icon_me_message_sqare@2x']"
              @click="$router.push({ path: '/news' })"
              alt=""
            />
          </div>
        </div>
      </div>

      <appInstall @handleChange="handleChange"></appInstall>
      <Banner pageName="featured" />

      <div class="db-mid-style">
        <Notice v-if="$projectname !== '10015'" />
        <div class="head-mid-box" v-if="isLogin">
          <gheader class="m-header"></gheader>
        </div>
      </div>
      <tabStyle
        :appInstallStatus="appInstallStatus"
        @getIndex="getIndex"
      ></tabStyle>
    </div>

    <div class="leftnav" v-show="leftNav" @click="leftNav = false"></div>
    <div class="leftnav-con" :class="leftNav ? 'active' : ''">
      <van-cell-group>
        <van-cell
          class="type-item"
          :class="navActive===index?'active':''"
          :title="item.name"
          v-for="(item, index) in typeList"
          :key="index"
          @click="navTab(item.id,index)"
        >
          <!-- 使用 right-icon 插槽来自定义右侧图标 -->
          <template #right-icon>
            <van-icon name="star-o" v-if="navActive!==index" />
            <van-icon name="star" v-else />
          </template>
        </van-cell>
      </van-cell-group>
    </div>

    <!-- 重要公告 -->
    <SiteNotice v-if="showNotice" />
  </div>
</template>

<script>
import { leagueType, liveIndex } from "@/api/live";
import { mapState } from "vuex";
// import "swiper/dist/css/swiper.css";
import Gheader from "../../components/g-header";
import Vtabbar from "../../components/v-tabbar";
import SixGift from "../../../home/sixGift.vue";
import AppBanner from "../../../home/components/app-banner";
import Banner from "../../../home/components/banner";
import Notice from "../../../home/components/notice";
import Featured from "../../../home/featured";
import appInstall from "../../components/app-install";
// import GameSearch from '@/components/search/search'
import SiteNotice from "@/components/siteNotice";

import { open } from "@/api/entertainment";
import { historylist, siteinfo } from "@/api/home";
import { member } from "@/api/memberCenter";
import "swiper/dist/css/swiper.css";
import { Swiper } from "vue-awesome-swiper";
import tabStyle from "./tabStyle";
import * as types from "@/store/types";

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
    SiteNotice
  },
  data() {
    return {
      leftNav: false,
      sixGiftIsAvailable: true,
      access_token: window.localStorage.token,
      slotsType: "",
      actived: 0,
      activedName: "sports",
      bannerPic: "",
      mySwiper1: null,
      appInstallStatus: true,
      isSports: false,
      typeList: [],
      navActive: 0,
    };
  },
  watch: {
    active(val) {
      if (val !== 2) {
        this.slotsType = "";
      }
    },
    userInfo(val01, val02) {},
  },
  created() {
    this.getNavList();
  },
  mounted() {
    console.log(this.userInfo);
  },
  computed: {
    ...mapState("users", [
      "isLogin",
      "token",
      "userInfo",
      "username",
      "wallet",
    ]),
    showNotice() {
      const { lang } = this.$route.query
      if(lang) this.locale = lang
      return this.$route.name !== 'luckyway'
    },
  },
  methods: {
    openLogin() {
      this.$store.dispatch("global/setLoginPopShow", true);
    },
    navTab(id,index) {
      this.navActive = index;
      this.leftNav = false;
      this.$store.commit("global/" + types.SET_LIVETYPE, id);
    },
    getNavList() {
      leagueType({
        type: 1,
      }).then((res) => {
        const { code, data, msg } = res.data;
        if (code === 1) {
          this.typeList = res.data.data.reverse();
          console.log(4554545);
          console.log(res);
          this.$store.commit(
            "global/" + types.SET_LIVETYPE,
            this.typeList[0].id
          );
        } else {
          console.log(msg);
        }
      });
    },
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
    handleWithdraw() {
      if (!this.isLogin) {
        this.$store.dispatch("global/setNoLogin", true);
        return;
      }
      const { bankList, userInfo } = this;
      if (!bankList || !bankList.length) {
        const vm = this;
        this.$dialog
          .confirm({
            message: `${this.$t('您未绑定银行卡，我们无法为您打款到账户')}<br>${this.$t('遇到问题')} <span style="color:${this.$colorjs.baseColor};">${this.$t('联系专属客服')}<span>`,
            title: this.$t('银行卡绑定提示'),
            confirmButtonText: this.$t('立即绑定'),
            cancelButtonText: this.$t('暂不绑定'),
          })
          .then(() => {
            vm.$router.push({
              path: "/addBankCard",
              query: {
                getPath: "memberCenter",
              },
            });
          })
          .catch(() => {
            vm.$router.push({
              path: "/memberCenter",
            });
          });
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
    getIndex(data) {
      console.log(data);
      if (data === 2) {
        this.isSports = true;
      } else {
        this.isSports = false;
      }
    },
  },
};
</script>

<style scoped lang="less">
@import "~@assets/styles/home/index.less";

#home {
  #tab-wrap {
    transition: 0.3s;
    //transform: translate3d(0,-50%,0);
    position: relative;
    right: 0%;
  }
  padding-bottom: @height-tab-bar;
  .leftnav {
    position: fixed;
    height: 100%;
    width: 100%;
    border-radius: 0;
    background: rgba(0, 0, 0, 0.5);
    left: 0;
    top: 0;
    z-index: 10000;
  }
  .leftnav-con {
    width: 80%;
    height: 100%;
    background-color: #333;
    transition: 0.3s;
    transform: translateX(-100%);
    position: fixed;
    left: 0;
    top: 0;
    z-index: 10001;
    &.active {
      transform: translateX(0);
    }
  }
  .van-cell-group {
    padding: 0;
    margin: 0;
  }
  .type-item {
    height: 88px;
    padding: 0 30px;
    line-height: 88px;
    background: none;
    transition: 0.3s;
    color: #999999;
    font-size: 30px;
    &:active,&.active {
      background: rgba(255, 255, 255, 0.1);
      .van-cell__title {
        span {
          color: #fff;
        }
      }
      i {
        color: @primary-color;
      }
    }
    i {
      line-height: 88px;
      font-size: 36px;
    }
  }
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
div.dark {
  background-color: #222222 !important;
}
</style>
