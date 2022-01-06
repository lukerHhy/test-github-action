<template>
  <div id="home">
    <vtabbar class="m-footer" id="footer-yabo" :index="0"></vtabbar>
    <appInstall @handleChange="handleChange"></appInstall>
    <Notice />
    <div :class="[{'bg-img':['Home'].indexOf($route.name) !== -1}]">
      <zbHeader></zbHeader>
      <Banner pageName="featured"/>
      <img class="full-img" :src="$imgs['home/home_banner_more@2x']" alt="" @click="$router.push({path:'/brand'})">
<!--      <van-image class="full-img" lazy-load :src="this.$imgs['home/home_banner_more@2x']" />-->
      <div class="main-block">
        <div class="main-block-w1 h1" @click="$playGame(casinoPlatforms[0],'真人')">
          <van-image class="casino" lazy-load :src="casinoPlatforms[0].thumb" />
          <p class="title">{{ casinoPlatforms[0].title }}</p>
          <p class="desc">{{ casinoPlatforms[0].game_platform_mark }}</p>
        </div>
        <div class="main-block-w2 h1" @click="choose('esports')">
          <van-image lazy-load :src="this.$imgs['home/gaming-avia@2x']" />
          <p class="title">{{$t('电竞')}}</p>
          <p class="desc">{{$t('尖端全面多元的')}}<br>{{$t('电竞游戏')}}</p>
        </div>
      </div>

      <div class="main-block">
        <div class="main-block-w1 h2" @click="choose('chess')">
          <van-image lazy-load :src="this.$imgs['home/chess-wanqu@2x']" />
          <p class="title">{{$t('棋牌')}}</p>
        </div>
        <div class="main-block-w2 h2" @click="$router.push({path:'/vip'})">
          <van-image lazy-load :src="this.$imgs['home/home_slot_pic@2x']" />
          <p class="title">{{$t('龙门电投厅')}}</p>
        </div>
      </div>

      <div class="main-block">
        <div class="main-block-w3 slots h3">
          <div class="slots-head">
            <p class="title">{{$t('电子游戏')}}<br/>{{$t('奖')}}</p>
            <div class="slots-money">
              ￥
              <v-countup
                  :duration="jackpotSettings.duration"
                  :decimals="jackpotSettings.decimals"
                  :start-value="jackpotSettings.startVal"
                  :end-value="jackpotSettings.endVal"
              />
            </div>
          </div>
          <div class="slots-item">
            <div v-for="(item,index) in slotsLists" v-if="index<3" @click="$playGame(item)">
<!--              <img :src="item.pic" alt="">-->
              <van-image :src="item.pic"></van-image>
              <span>{{ item.name }}</span>
            </div>
            <div @click="$router.push({path:'/slots'})">
              <p><van-icon name="ellipsis" /></p>
              <span>{{$t('更多')}}</span>
            </div>
          </div>
        </div>
        <div class="main-block-w4 h3" @click="choose('fish')">
          <van-image lazy-load :src="this.$imgs['home/fishing-ag@2x']" />
          <p class="title">{{$t('捕鱼')}}</p>
          <p class="desc">{{$t('花式捕鱼')}}<br>{{$t('爽快捞金')}}</p>
        </div>
      </div>
      <div class="main-block">
        <div class="main-block-w5 h2" @click="choose('lottery')">
          <van-image lazy-load :src="this.$imgs['home/lottery-vr@2x']" />
          <p class="title">{{$t('彩票')}}</p>
          <p class="desc">{{$t('VR彩 SG彩 IG彩')}}</p>
        </div>
        <div class="main-block-w5 h2" @click="choose('sport')">
          <van-image lazy-load :src="this.$imgs['home/sports-shaba@2x']" />
          <p class="title">{{$t('体育')}}</p>
          <p class="desc">{{$t('沙巴')}}</p>
        </div>
        <div class="main-block-w4 h2" @click="choose('casino')">
          <van-image lazy-load :src="this.$imgs['home/casino-ag@2x']" />
          <p class="title">{{$t('真人')}}</p>
        </div>
      </div>
    </div>

    <div class="mask" v-if="showDia"></div>
    <div :class="['platform-dia',showDia?'show':'']">
      <h2 class="platform-dia-tit">{{$t('请选择游戏平台')}}</h2>
      <div class="platform-list">
        <van-radio-group v-model="platformItem">
          <van-radio v-for="(item,index) in navList" :name="index" :key="index">{{$t(item.title)}}</van-radio>
        </van-radio-group>
      </div>
      <div class="platform-dia-btn">
        <p @click="cancle">{{$t('取消')}}</p>
        <p @click="toPlay">{{$t('确定')}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapState } from 'vuex'
// import "swiper/dist/css/swiper.css";
import Gheader from '../components/g-header'
import Vtabbar from '../components/v-tabbar'
import SixGift from '../../home/sixGift.vue'
import AppBanner from '../../home/components/app-banner'
import Banner from '../../home/components/banner'
import Notice from '../../home/components/notice'
import Featured from '../../home/featured'
import appInstall from '../components/app-install'
import zbHeader from '../components/zb-header'

import "swiper/dist/css/swiper.css";
import { Swiper } from "vue-awesome-swiper";
import { esportsPlatforms, sportsPlatforms, chessPlatforms } from '@/utils/platform'

import {getGameLists, jackpots} from "@/api/games";
import VueCountUp from 'vue-countupjs'
Vue.use(VueCountUp)

export default {
  name: 'Index',
  components: {
    Gheader,
    Banner,
    Notice,
    AppBanner,
    Featured,
    // GameSearch,
    Vtabbar,
    appInstall,
    zbHeader
  },
  data () {
    return {
      leftNav:false,
      sixGiftIsAvailable: true,
      access_token: window.localStorage.token,
      slotsType: '',
      actived:0,
      activedName:'sports',
      bannerPic:'',
      mySwiper1:null,
      appInstallStatus: true,
      showDia: false,
      platformItem:'',
      navList:[],
      casinoPlatforms: [
        {
          default_game_id: 1,
          game_platform_id: 1,
          game_platform_name: "AG",
          game_platform_mark: this.$t('亚洲市场占有率第一领导品牌'),
          name: 'ag',
          title: this.$t('AG真人'),
          thumb: this.$imgs['home/nvyou@2x'],
          classname: 'tall',
          desc: [this.$t('亚洲市场'), this.$t('占有率第一领导品牌')]
        },
        {
          default_game_id: 15,
          game_platform_id: 3,
          game_platform_name: "BBIN",
          game_platform_mark: this.$t('最具影响力真人平台'),
          name: 'bbin',
          title: 'BBIN',
          thumb: require('@assets/img3_0/home/casino/bbin@2x.png'),
          desc: [this.$t('最具影响力'), this.$t('真人平台')]
        },
        {
          default_game_id: 2101,
          game_platform_id: 20,
          game_platform_name: "OG",
          game_platform_mark: this.$t('贴近亚洲文化市场'),
          name: 'og',
          title: this.$t('OG平台'),
          thumb: require('@assets/img3_0/home/casino/og@2x.png'),
          desc: [this.$t('贴近亚洲'), this.$t('文化市场')]
        },
        {
          default_game_id: 14,
          game_platform_id: 4,
          game_platform_name: "ALLBET",
          game_platform_mark: this.$t('首创超级多台百家乐'),
          name: 'allbet',
          thumb: require('@assets/img3_0/home/casino/allbet@2x.png'),
          title: this.$t('ALLBET平台'),
          desc: [this.$t('首创超级'), this.$t('多台百家乐')]
        },
        {
          default_game_id: 3158,
          game_platform_id: 105,
          game_platform_name: "EBET",
          game_platform_mark: this.$t('互动多合一快感加倍'),
          name: 'ebet',
          thumb: require('@assets/img3_0/home/casino/ebet@2x.png'),
          title: this.$t('eBET真人'),
          desc: []
        }
      ],
      lotteryPlatforms: [
        {
          default_game_id: 4393,
          game_platform_id: 121,
          text: 'official',
          name: 'vr',
          thumb: require('@assets/img3_0/home/lottery/official@2x.png'),
          title: this.$t('VR彩票-官方彩'),
          classname: 'tall',
          desc: [this.$t('强大的录号系统'), this.$t('确保第一时间开奖')]
        }, {
          default_game_id: 4400,
          game_platform_id: 121,
          text: 'mark-six',
          name: 'vr',
          thumb: require('@assets/img3_0/home/lottery/mark-six@2x.png'),
          title: this.$t('六合彩'),
          desc: [this.$t('标准/双面玩法'), this.$t('各类生肖玩法齐全')]
        }, {
          default_game_id: 4379,
          game_platform_id: 121,
          text: 'vr',
          name: 'vr',
          thumb: require('@assets/img3_0/home/lottery/vr@2x.png'),
          title: this.$t('VR彩'),
          desc: [this.$t('美女主播靓'), this.$t('开彩赢')]
        }, {
          default_game_id: 4338,
          game_platform_id: 120,
          name: 'ig',
          text: 'ig',
          thumb: require('@assets/img3_0/home/lottery/ig@2x.png'),
          title: this.$t('IG彩票'),
          desc: [this.$t('实现您对彩票'), this.$t('的所有期望')]
        }, {
          default_game_id: 4421,
          game_platform_id: 122,
          name: 'sg',
          text: 'sg',
          thumb: require('@assets/img3_0/home/lottery/sg@2x.png'),
          title: this.$t('双赢彩票'),
          desc: [this.$t('以小博大'), this.$t('创造双赢')]
        }
      ],
      fishingPlatforms: [
        {
          default_game_id: 12,
          game_platform_id: 31,
          name: 'ag',
          text: 'ag3d',
          thumb: 'ag3d@2x.png',
          title: this.$t('AG捕鱼王3D'),
          desc: [this.$t('顶级渔场，一炮致富')]
        }, {
          default_game_id: 12,
          game_platform_id: 31,
          name: 'ag',
          text: 'ag',
          thumb: 'ag@2x.png',
          title: this.$t('AG捕鱼王'),
          desc: [this.$t('四炮同场'), this.$t('称霸海洋')]
        }, {
          default_game_id: 627,
          game_platform_id: 3,
          name: 'bbin',
          text: 'bbin2',
          thumb: 'bbin2@2x.png',
          title: this.$t('BBIN捕鱼大师2'),
          desc: [this.$t('万炮齐发'), this.$t('一网打尽')]
        }, {
          default_game_id: 620,
          game_platform_id: 3,
          name: 'bbin',
          text: 'bbin',
          thumb: 'bbin@2x.png',
          title: this.$t('BBIN捕鱼大师'),
          desc: [this.$t('打鱼利器'), this.$t('一手掌握')]
        }, {
          default_game_id: 620,
          game_platform_id: 3,
          name: 'bbin',
          text: 'bbin-dr',
          thumb: 'bbin-dr@2x.png',
          title: this.$t('BBIN捕鱼达人'),
          desc: [this.$t('多样化技能'), this.$t('快感加倍')]
        }, {
          default_game_id: 3076,
          game_platform_id: 101,
          name: 'mw',
          text: 'mw',
          thumb: 'mw@2x.png',
          title: this.$t('MW千炮捕鱼'),
          desc: [this.$t('最高奖金400倍')]
        }],
      name:'',
      jackpotSettings: {},
      decimals: 2,
      duration: 10000000,
      slotsLists: []
    }
  },
  watch: {
    active (val) {
      if (val !== 2) {
        this.slotsType = ''
      }
    }
  },
  created () {
    this.getJackpots ();
    this.getSlotsLIst()
  },
  mounted () {
    // console.log(casinoPlatforms)
  },
  computed: {
    ...mapState('global', ['gameSearch'],"users", ["isLogin"])
  },
  methods: {
    async getSlotsLIst(){
      let res = await getGameLists({page:1,game_cate_id: 2})
      this.slotsLists = res.data.data.data
      console.log(res)
    },
    choose(i){
      let that = this
      if(i==='esports'){
        that.navList = esportsPlatforms;
        that.name = this.$t('电竞');
      }else if(i==='casino'){
        that.navList = that.casinoPlatforms;
        that.name = this.$t('真人');
      }else if(i==='chess'){
        that.navList = chessPlatforms;
        that.name = this.$t('棋牌');
      }else if(i==='fish'){
        that.navList = that.fishingPlatforms;
        that.name = this.$t('捕鱼');
      }else if(i==='lottery'){
        that.navList = that.lotteryPlatforms;
        that.name = this.$t('彩票');
      }else{
        that.navList = sportsPlatforms;
        that.name = this.$t('体育');
      }
      this.showDia = true
    },
    cancle(){
      this.showDia = false;
      this.navList = [];
      this.name = '';
    },
    getJackpots () {
      const { decimals, duration } = this;
      jackpots().then(res => {
        const { code, data, msg } = res.data
        if (code === 0) {
          const jackpot = data[1].pot_money
          this.jackpotSettings = {
            startVal: jackpot,
            endVal: jackpot * 2,
            duration,
            decimals
          }
        } else {
          console.log(msg)
        }
      })
    },
    toPlay(){
      console.log(this.platformItem)
      this.$playGame(this.navList[this.platformItem],this.name)
    },
    openSidenav(){
      this.leftNav = true;
    },
    onCopy: function(e) {
      this.$toast(this.$t('复制成功'));
    },
    onError: function(e) {
      this.$toast.fail(this.$t('复制失败，请重试'));
    },
    linkTo(path) {
      console.log(path);
      if(this.access_token){
        this.$router.push({ path });
      }else{
        this.$router.push({path:'/login'});
      }

    },
    signOut() {
      this.$dialog
          .confirm({
            title:this.$t('温馨提示'),
            message: this.$t('是否退出登录？')
          })
          .then(() => {
            // this.isLogin = false;
            this.$store.dispatch("users/logout").then(() => {});
            this.$router.push('/')
          })
          .catch(() => {
            // on cancel
          });
    },
    callService() {
      this.$openKefu();
    },
    slideCur(index){
      this.activeIdx = index;
      this.mySwiper1.slideTo(index, 300, false)
    },
    onClickRight() {
      if (window.localStorage.token) {
        this.$router.push({
          name: "news"
        });
      } else {
        this.$store.dispatch("global/setNoLogin",true)
      }
    },
    listPath(path) {
      if (path === "agentHomepage") {
        this.$router.push("agentHomepage");
      } else {
        this.isLogin
            ? this.$router.push({ name: path })
            : this.$store.dispatch("global/setNoLogin",true)
      }
    },
    handleChange(val) {
      console.log('===',val)
      this.appInstallStatus = val
    },
    handleWithdraw() {
      if(!this.isLogin) {
        this.$store.dispatch("global/setNoLogin",true)
        return
      }
      const { bankList, userInfo } = this;
      if (!bankList || !bankList.length) {
        const vm = this;
        this.$dialog
            .confirm({
              message: `${this.$t('您未绑定银行卡，我们无法为您打款到账户')}<br>${this.$t('遇到问题')} <span style="color:${this.$colorjs.baseColor};">${this.$t('联系专属客服')}<span>`,
              title: this.$t('银行卡绑定提示'),
              confirmButtonText: this.$t('立即绑定'),
              cancelButtonText: this.$t('暂不绑定')
            })
            .then(() => {
              vm.$router.push({
                path: "/addBankCard",
                query: {
                  getPath: "memberCenter"
                }
              });
            })
            .catch(() => {
              vm.$router.push({
                path: "/"
              });
            });
        return;
      } else if(!userInfo.mobile) {
        this.$store.dispatch('global/setPopShow',{ telDisplay: true, status: true });
      } else {
        this.$store.dispatch('global/setFlow',true)
      }
    },
    govip() {
      // window.open("https://m.aavipjlb.com", "aavip");
      this.$router.push('/vip')
    },
    openGame () {
      if (!window.localStorage.token) {
        this.$router.push({
          path: 'login'
        })
        return false
      }
      let routeUrl = this.$router.resolve({
        path: '/game',
        query: {
          at: window.localStorage.token,
          game_id: 16
        }
      })
      window.open(routeUrl.href, '_blank')
    },
    openGame (item) {
      if (window.localStorage.token) {
        let routeUrl = this.$router.resolve({
          path: '/game',
          query: {
            at: window.localStorage.token,
            game_id: item.default_game_id,
            platform_id: item.game_platform_id
          }
        })
        window.open(routeUrl.href, '_blank')
      } else {
        this.$router.push({path: '/login'})
      }
    },
    jump (path) {
      if (path === 'liuheColor') {
        this.$router.push({
          name: 'game',
          params: {
            id: 16
          }
        })
      } else {
        this.$router.push({path: path})
      }
    },
    onTabChange (index, title) {
      // console.log(this.$route)
      // console.log(index, title)
      // Object.assign(
      //   this.$route.query, {
      //     tab: index
      //   }
      // )
    },
    handleActive (val, active) {
      console.log('wowo', val)
      if (val) {
        this.active = 2
        this.slotsType = val
      } else {
        this.active = active
      }
    },
    changeSlotsType () {
      this.slotsType = ''
    },
    sideTab(item,index){
      this.actived = index;
      this.activedName = item.name;
      this.bannerPic = item.bannerPic;
    },
  }
}
</script>

<style scoped lang="less">
@import '~@assets/styles/home/index.less';

#home {
  padding-bottom: 1.4rem;
  .bg-img{
    transition: all 1s;
    background-color: #1A1A1E;
    &.translateScrollMin{
      transform: translate3d(0,0,0) !important;
    }
    &.translateScrollMax{
      transform: translate3d(0,-120px,0) !important;
    }
  }
}
/deep/ #banner{
  width: 100%;
  height: 380px;
  margin-bottom: 0;
  .banner{
    width: 100%;
    height: 100%;
    margin: 0;
    border-radius: 0;
    .van-swipe-item .van-image img{
      border-radius: 0;
    }
  }
  .van-swipe__indicators{
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
    box-shadow:0px 16px 20px 0px rgba(123,139,171,0.28);
    background:linear-gradient(180deg,rgba(180,215,255,1) 0%,rgba(229,228,222,1) 100%);
    .van-image {
      width: 100%;
      /deep/ img[lazy="loading"] {
        opacity: 0;
        max-width: 100%
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
      background:linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(206,231,254,1) 30%, rgba(255,255,255,1) 51%, rgba(202,230,254,1) 78%, rgba(255,255,255,1) 100%);
      -webkit-background-clip: text;
      color: transparent;
    }
    h4{
      font-size: 16px;
      margin: 6px 0 0;
      background:linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(206,231,254,1) 30%, rgba(255,255,255,1) 51%, rgba(202,230,254,1) 78%, rgba(255,255,255,1) 100%);
      -webkit-background-clip: text;
      color: transparent;
    }
    p {
      margin-bottom: 10px;
      opacity: .7;
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
          background-image: linear-gradient(to right, #FF9A5D, #FF3937);
          text-transform: uppercase;
          transform: rotate(45deg) translate(-20%, -20%);
          transform-origin: 100% 100%;
          &.new {
            background-image: linear-gradient(to right, #05D0DA, #279CF8);
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

/deep/ .notice{
  margin: -48px 0 0;
  height: 48px;
  background:rgba(245,246,250,0.8);
  border-radius:24px 24px 0px 0px;
  border: 0;
  border-bottom: 2px solid #303030;
  .van-icon{
    color: #51C1FF;
  }
}
.head-mid-box{
  background:linear-gradient(180deg,rgba(255,255,255,1) 0%,rgba(244,248,255,1) 100%);
  box-shadow:0px 4px 16px 0px rgba(128,150,194,0.2);
  border-radius:0px 0px 24px 24px;
  padding: 0 30px 6px;
  /deep/ .quick-link{
    display: flex;
    align-items: center;
    justify-content: space-between;
    li{
      display: flex;
      align-items: center;
      justify-content: center;
      img{
        width: 88px;
        margin-right: 8px;
      }
      span{
        font-size: 22px;
        color: #98A4BD;
      }
    }
  }
}

/deep/ .nav-type-index{
  color: #fff;

}
/deep/ .index-main{
  padding: 22px 0;
  position: relative;
  overflow: hidden;
  .index-main-flex1{
    width: 100%;
    padding-right: 30px;
    box-sizing: border-box;
    float: right;
  }
  .van-sticky{
    float: left;
    width: 114px;
    margin-left: -114px;
  }
  .index-side-nav{
    text-align: center;
    img{
      width: 90px;
    }
  }
  .van-sticky--fixed{
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
    .van-tab__text img{
      width: 90px;
    }
    .van-tab .nav-active-icon{
      display: none;
    }
    .van-tab .nav-norm-icon{
      display: block;
    }
    .van-tab--active .nav-active-icon{
      display: block;
    }
    .van-tab--active .nav-norm-icon{
      display: none;
    }
    .van-tab,
    .van-tabs__wrap,
    .van-tabs__nav {
      height: auto!important;
      line-height: 80px;
      font-size: 28px;
      flex-direction: column;
    }
    .van-tabs__wrap {
      border-bottom: none!important;
      &:after{content: none}
    }
    .van-tabs__nav{
      flex-direction: column;
      .van-tab{
        flex-basis: auto!important;
      }
    }
    .van-tabs__content{
      float: right;
      padding: 10px 30px 0 0;
      width: 100%;
    }
    .van-tabs__line{display: none}
  }
}
/deep/ .games-wrap.float-wrap{
  .game-item{
    float: none;
    display: inline-block;
    vertical-align: top;
  }

}
/deep/ .games-wrap{
  .game-item{
    height: 276px;
    background:linear-gradient(180deg,rgba(180,215,255,1) 0%,rgba(229,228,222,1) 100%);
    border-radius:20px;
    border: 0;
    .game-info{
      background:linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(206,231,254,1) 30%, rgba(255,255,255,1) 51%, rgba(202,230,254,1) 78%, rgba(255,255,255,1) 100%);
      -webkit-background-clip: text;
      color: transparent;
    }
    .van-image{
      width: 100%;
      position: absolute;
      right: 0;
      bottom: 0;
    }
  }
  .game-item.ag.tall{
    width: calc(100% - 30px);
    height: 276px;
  }

}
/deep/ .sports{
  .game-item.shaba,.game-item.bbin,.game-item.im{
    width: calc(100% - 30px);
  }
}
/deep/ .lottery{

  .game-item.official.tall{
    width: calc(100% - 30px);
  }
}
/deep/ .chess{
  padding-top: 0;
  .games-wrap .game-item .van-image{
    width: 100%;
  }

}
/deep/ .esports{
  .games-wrap {
    .game-item {
      height: 426px;
    }
  }
}
/deep/ .fishing{
  padding-top: 0;
  .games-wrap {
    .game-item{
      .game-info{
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
.index-main-flex1{
  /deep/ #banner{
    height: auto;
    margin-bottom: 24px;
    background: none;
  }
}
.app-install{
  display: flex!important;
}
/deep/ .notice .action{
  display: none;
}
/deep/ .games-wrap .game-item .game-info-more{
  left: 18px;
}
.full-img{
  display: block;
  width: 100%;
  margin-bottom: 20px;
}
</style>
