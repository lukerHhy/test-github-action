<style scoped lang="less">
@import '~@assets/styles/downApp/index.less';

.container {
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
  background: linear-gradient(180deg, #FC9958 0%, #F88756 100%);
  -webkit-overflow-scrolling: touch;

  /deep/ .van-overlay {
    top: 1.173333rem;
    background-color: rgba(0, 0, 0, 0.8);
  }

  /deep/ .van-popup {
    background-color: transparent;
  }

  .aagames-nav-bar {
    height: 88px;
  }

  .guid {
    width: 100%;
    height: 100%;

    > img {
      width: 308px;
      position: absolute;
      right: 0.8rem;
    }

    div {
      margin-top: 402px;
      text-align: center;

      p {
        margin-top: @margin-30;
        height: 44px;
        font-size: 32px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: rgba(237, 237, 237, 1);
        line-height: 44px;
      }
    }
  }

  .project-name {
    text-align: center;
    color: #FFFFFF;
    letter-spacing: 50px;
    font-size: 44px;
    padding-top: 145px;
    margin-bottom: 40px;
  }

  .nav-bar {
    width: 100%;
    padding: 0 30px;
    box-sizing: border-box;
    height: 88px;
    display: flex;
    align-content: center;
    position: absolute;
    top: 20px;
    left: 20px;

    .left {
      flex: 1;
      font-size: 32px;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 88px;
    }

    .right {
      margin-top: 16px;
      display: flex;
      // height: .8rem;
      > div {
        text-align: center;
        width: 140px;
        height: 56px;
        line-height: 56px;
        background: rgba(53, 52, 53, 1);
        border-radius: 8px;

        &:first-child {
          color: @primary-color;
          background: none;
          border: 2px solid @primary-color;
        }

        &:last-child {
          margin-left: 20px;
          color: #232321;
          background: linear-gradient(90deg,
          @primary-color 0%,
          rgba(171, 138, 97, 1) 99%);
        }
      }
    }
  }

  .downAppBtn {
    width: 388px;
    margin: 0 auto;
    border-radius: 10px;
    overflow: hidden;
    position: absolute;
    bottom: 20px;
    left: 50%;
    margin-left: -194px;
    button {
      width: 100%;
      height: 102px;
      background: linear-gradient(180deg, #7C7EFE 0%, #4AA6FF 100%);
      border: none;
      font-size: 44px;
      font-family: PingFangSC-Semibold, PingFang SC;
      color: #fff;
      line-height: 48px;

      span {
        font-size: 44px;
      }

      a {
        color: #fff;
        height: 100%;
        width: 100%;
        display: block;
        line-height: 88px;
      }
    }

    .shadow {
      transition: all 1s;
      position: absolute;
      width: 100%;
      height: 100%;
      top: 1px;
      right: 0;
      background: rgba(0, 0, 0, 0.3);
    }
  }

  .main {
    font-family: PingFangSC-Semibold, PingFang SC;
    height: 836px;
    width: 100%;
    background-size: 90% 836px;
    background-position: center;
    background-repeat: no-repeat;
    position: relative;
    .new-tip{
      width: 168px;
      height: 56px;
      background: linear-gradient(180deg, #2BC4FE 0%, #1FE0EF 100%);
      border-radius: 27px;
      position: absolute;
      text-align: center;
      font-size: 28px;
      color: #FFFFFF;
      line-height: 56px;
      right: 190px;
      bottom: 140px;
    }
    .experience {
      margin-top: 22px;
      text-align: center;
      height: 40px;
      font-size: 28px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: @primary-text-color;
      line-height: 40px;
    }
    .tutorial {
      text-align: center;
      height: 44px;
      font-size: 32px;
      font-weight: 500;
      color: rgba(82, 81, 82, 1);
      line-height: 44px;
      margin-top: 60px;
    }



    .tech {
      background: linear-gradient(270deg,
      rgba(22, 19, 13, 1),
      rgba(44, 40, 28, 1));
      // height: calc(100vh - 6rem - 1.17333rem);
      // height: 0;
      transition: all 2s;
      overflow: hidden;
      position: relative;

      .tips {
        text-align: center;

        > p:first-child {
          display: inline-block;
          margin-top: @margin-15;
          font-size: @margin-15;
          font-family: PingFang-SC-Medium;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
          opacity: 0.2;
        }

        > p:last-child {
          margin-top: @margin-10;
          font-size: @font-size-13;
          font-family: PingFang-SC-Medium;
          font-weight: 500;
          color: rgba(199, 138, 0, 1);
        }
      }
    }

    .site-logo {
      transition: all 2;
      display: flex;
      justify-content: center;
      margin: 0.5rem auto 0;

      .logo {
        width: 1.5rem;
        height: 1.5rem;

        > img {
          display: inline-block;
          width: 100%;
          height: 100%;
        }
      }

      .site-name {
        > div:first-child {
          font-size: 1.1rem;

          > span:first-child {
            background: linear-gradient(270deg,
            rgba(254, 220, 147, 1) 0%,
            rgba(254, 200, 84, 1) 100%);
            background-clip: text;
            -webkit-text-fill-color: transparent;
          }

          > span:last-child {
            color: #ffffff;
          }
        }

        > div:last-child {
          height: 0.72rem;
          font-size: 0.35rem;
          font-family: PingFang-SC-Regular;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          opacity: 0.7;
          margin-top: 0.08rem;
        }
      }
    }

    .site-logo1 {
      transition: all 2;
      display: flex;
      justify-content: center;
      margin: 1.5rem auto 0;
      flex-direction: column;
      align-items: center;

      .logo {
        width: 2.5rem;
        height: 2.5rem;

        > img {
          display: inline-block;
          width: 100%;
          height: 100%;
        }
      }

      .site-name {
        > div:first-child {
          font-size: 1.1rem;
          margin-top: 0.3rem;

          > span:first-child {
            background: linear-gradient(270deg,
            rgba(254, 220, 147, 1) 0%,
            rgba(254, 200, 84, 1) 100%);
            background-clip: text;
            -webkit-text-fill-color: transparent;
          }

          > span:last-child {
            color: #ffffff;
          }
        }

        > div:last-child {
          height: 0.72rem;
          font-size: 0.35rem;
          font-family: PingFang-SC-Regular;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          opacity: 0.7;
          margin-top: 0.38rem;
        }
      }
    }

    .left-poup {
      position: absolute;
      left: 0;
      top: 1.2rem;
      background: linear-gradient(270deg,
      rgba(254, 225, 163, 1) 0%,
      rgba(254, 199, 82, 1) 100%);
      border-radius: 0rem 1rem 1rem 0rem;
      text-align: center;
      width: 2rem;
      height: 0.7rem;
      line-height: 0.7rem;
      color: rgba(32, 28, 23, 1);
    }

    .nav-bar {
      width: 100%;
      height: 1.173333rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 @margin-10;
      // background-color: rgba(0,0,0,0.4);
      .left {
        > img {
          width: 0.8rem;
        }
      }

      .right {
        display: flex;
        // height: .8rem;
        > div {
          width: 1.373333rem;
          height: 0.7rem;
          line-height: 0.7rem;
          text-align: center;
          font-size: @font-size-14;

          &:first-child {
            background: rgba(199, 138, 0, 0);
            border: 0.026666rem solid @primary-color;
            border-radius: 0.053333rem;
            color: @primary-color;
          }

          &:last-child {
            background: @primary-color;
            border-radius: 0.053333rem;
            color: #ffffff;
            margin-left: @margin-5;
          }
        }
      }
    }

    /*  .logo {
                img {
                  width: 138px;
                  height: 150px;
                  margin-top: 171px;
                }
              } */

    .explain {
      margin-top: 50px;
      color: #ffffff;
      font-size: 40px;

      .title1 {
        margin-top: 30px;
        font-size: 28px;
        color: #c5cfd6;
      }
    }

    .appImg {
      margin-top: 89px;

      .explainImg {
        width: 230px;
        height: 230px;
        background-size: 100% 100%;
      }

      .android {
        background-image: initial !important;
      }

      .appExplain {
        margin-top: 40px;
        color: #c5cfd6;
        font-size: 28px;
      }

      .step {
        margin-top: 20px;
        color: #ffcf6e;
        font-size: 24px;
      }
    }

    .downAppBtn1 {
      margin-top: 500px;
    }

    .trustBtn {
      margin: 0 40px;
      margin-top: 30px;
      position: relative;

      button {
        width: 100%;
        border: none;
        border-radius: @border-radius-5px;
        background: linear-gradient(270deg,
        rgba(63, 57, 46, 1),
        rgba(84, 80, 67, 1));
        font-size: 32px;
        font-weight: 700;
        height: 88px;

        a {
          color: #fff;
        }
      }
    }
  }
  .swiper-container{
    margin-top: 80px;
    margin-bottom: 70px;
    /deep/ .my-bullet {
      display: inline-block;
      width: 16px;
      height: 8px;
      margin-left: 10px;
      border-radius: @border-radius-5px;
      background: #fff;
      opacity: 0.36;
      vertical-align: top;
    }

    /deep/ .swiper-pagination-bullet-active {
      opacity: 1;
      width: 40px;
    }

    /deep/ .swiper-pagination {
      width: 100%;
      height: 8px;
    }

    .lunbo {
      height: 0;
      width: 100%;
      background-color: @bg-color;
      position: absolute;
      bottom: 0;
      transition: all 2s;
      overflow: hidden;

      .swiper-container {
        text-align: center;
        overflow: unset;

        &:nth-child(7) {
          width: 517px;
        }

        img {
          width: 605px;
        }
      }
    }

    /deep/ .swiper-button-prev {
    }

    /deep/ .swiper-button-next {
    }
    .swiper-slide:first-child img{
      width: 310px;
      height: 288px;
    }
    .swiper-slide:nth-child(2) img{
      width: 606px;
      height: 288px;
    }
    .swiper-slide img{
      width: 480px;
      height: 288px;
    }
    .swiper-slide p{
      padding: 40px 0 20px;
      text-align: center;
      color: #FFFFFF;
      font-size: 28px;
    }
  }


  .wecharDown {
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    color: #ffcf6e;
    font-size: 28px;

    .right {
      margin-right: 53px;
      margin-top: 30px;

      img {
        width: 302px;
        height: 162px;
      }
    }

    .introduce {
      li {
        margin: 20px;
        margin-top: 40px;

        .step {
          width: 100px;
          display: inline-block;
        }

        .introduceText {
          width: 300px;
          display: inline-block;
          text-align: left;
          white-space: nowrap;
        }
      }
    }
  }

  .wrap-app {
    text-align: center;

    img {
      display: block;
      margin: 0 auto;
    }

    p {
      color: #fff;
      font-size: 30px;
      line-height: 40px;
      margin-top: 20px;
      margin-bottom: 30px;
    }

    .title {
      width: 176px;
      height: 52px;
      margin-top: 37px;
      margin-bottom: 60px;
    }

    .icon {
      width: 64px;
      height: 67px;
    }

    .step {
      width: 650px;
      margin-bottom: 30px;
    }
  }

  .swiper-container02 {
    width: 100%;
    padding-bottom: 28px;
    .swiper-slide {
      text-align: center;
    }
  }

  .down-tip {
    text-align: center;
    font-size: 24px;
    color: #333;
    margin-top: 40px;
    width: 670px;
    line-height: 44px;
  }

  .slide-down {
    margin-top: 5%;
    text-align: center;

    span {
      display: block;

      font-size: 28px;
      color: @bg-gradient-color;
    }

    img {
      width: 32px;
      margin-top: 5%;
    }
  }

  .main02 {
    img:first-child {
      width: 100px;
    }

    img:last-child {
      width: 100%;
    }
  }
}
</style>
<template>
  <div class="container downApp">
    <div class="nav-bar">
      <div class="left" @click="$router.push('/')">{{$t('返回首页')}}</div>
<!--      <div class="right" v-if="!isLogin">-->
<!--        <div @click="$router.push('register')">{{$t('注册')}}</div>-->
<!--        <div @click="$router.push('login')">{{$t('登录')}}</div>-->
<!--      </div>-->
    </div>
    <p class="project-name">{{$t($config[$projectname].project)}}</p>

    <div class="main" :style="{backgroundImage: `url(${require('@assets/img3_0/appdown/bg@3x.png')})`}">
      <div class="downAppBtn" >
        <van-button type="info" :loading="loading" :loading-text="$t('加载中...')" @click="downApp">
          <span v-show="percent == 100">{{$t('立即安装')}}</span>
          <span v-show="percent<100 && percent>0">下载{{ (100 - percent).toFixed(2) }}%</span>
          <span v-show="percent<0">{{$t('下载完成')}}</span>
        </van-button>
        <div v-show="percent<100" class="shadow" :style="{width:`${percent}%`}"></div>
      </div>
      <p class="new-tip">{{$t('新版')}}</p>
    </div>
    <div class="swiper-container swiper-container02">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <img :src="$imgs['appdown/pic_b@2x']" :alt="id">
          <p>{{$t('使用')}}</p>
        </div>
        <div class="swiper-slide">
          <img :src="$imgs['appdown/pic_c@2x']" :alt="id">
          <p>{{$t('第一步')}}</p>
        </div>
        <div class="swiper-slide">
          <img :src="$imgs['appdown/pic_d@2x']" :alt="id">          <p></p>
          <p>{{$t('第二步')}}</p>
        </div>
        <div class="swiper-slide">
          <img :src="$imgs['appdown/pic_e@2x']" :alt="id">
          <p>{{$t('第三步')}}</p>
        </div>
        <div class="swiper-slide">
          <img :src="$imgs['appdown/pic_f@2x']" :alt="id">
          <p>{{$t('第四步')}}</p>
        </div>
        <div class="swiper-slide">
          <img :src="$imgs['appdown/pic_g@2x']" :alt="id">
          <p>{{$t('第五步')}}</p>
        </div>
        <div class="swiper-slide">
          <img :src="$imgs['appdown/pic_h@2x']" :alt="id">
          <p>{{$t('第六步')}}</p>
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>

<script>
import {member} from "@/api/memberCenter";
import {siteinfo} from "@/api/home";
import "swiper/dist/css/swiper.css";
import {Swiper} from "vue-awesome-swiper";
import {mapState} from "vuex";
// import slide01 from '@assets/img3_0/appdown/download_image1@2x.png'
// import slide02 from '@assets/img3_0/appdown/download_image2@2x.png'
// import slide03 from '@assets/img3_0/appdown/download_image3@2x.png'
// import slide04 from '@assets/img3_0/appdown/download_image4@2x.png'
// import slide05 from '@assets/img3_0/appdown/download_image5@2x.png'

export default {
  name: "index",
  data() {
    return {
      title: `${this.$config[this.$projectname].secName}APP下载`,
      isShow: false,
      isIos: "", //下载地址
      type: "ios", //手机种类
      //引导图片
      // bannerArray:[slide01,slide02,slide03,slide04,slide05],
      weixin: false,
      percent: 100,
      titleArr: [
        {main: 'iOS安装教程', sub: this.$t('请依照下图教程完成安装')},
        {main: this.$t('第一步：打开【设置】'), sub: ''},
        {main: this.$t('第二步：进入【通用】'), sub: ''},
        {main: this.$t('第三步：进入【设备管理】'), sub: ''},
        {main: this.$t('第四步：找到对应的选项'), text: '【China Telecom ******** *******… 】'},
        {main: this.$t('第五步：点击【信任】选项'), text: '【 信任 China Telecom ******** ******* *… 】'},
        {main: this.$t('第六步：点击【信任】'), sub: this.$t('回到桌面 即可正常进入')}
      ],
      isLogin: false,
      loading: false,
      // aoMenUi:['takchun','Gdh','Js3','Mgm8','Wns1','Cod8','Xpj28','Yh8','Yl0','ybh']
      aoMenUi: ['takchun', '10012', '10013', '10014', '10020', 'mgm8', '10006', '10011', '10007', '10009', '10010', '10008', '10015', '10019', '10021', '10034', '10057']
    };
  },
  computed: {
    ...mapState("users", ["token"])
  },
  created() {
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
      this.type = "ios";
    } else if (/(Android)/i.test(navigator.userAgent)) {
      this.type = "android";
    }
    this.isWeiXin();
    if (this.token) {
      this.isLogin = true;
      member({
        merchant_no: process.env.VUE_APP_MERCHANT_NO,
        access_token: window.localStorage.token
      }).then(res => {
        if (res.data.code === 0) {
          if (res.data.data.wechat) {

          }
        }
      });
    }

    this.$nextTick(() => {
      new Swiper('.swiper-container', {
        pagination: {
          el: '.swiper-pagination',
          bulletClass: 'my-bullet',//需设置.my-bullet样式
        },
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
      })
    })
    siteinfo({
      merchant_no: process.env.VUE_APP_MERCHANT_NO,
      access_token: window.localStorage.token || ""
    }).then(res => {
      if (res.data.code === 0) {
        console.log(res.data.data)
        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
          this.isIos = res.data.data.ios_down_url;
        } else if (/(Android)/i.test(navigator.userAgent)) {
          this.isIos = res.data.data.android_down_url;
        }
      }
    });
    this.$nextTick(() => {
      // if (this.$projectname == '10010') {
      //   let ele = document.getElementById('down_logo').src = require('../../../assets/10010/img3_0/appdown/logo.png');
      // }
      // if (this.$projectname == '10011') {
      //   let ele = document.getElementById('down_logo').src = require('../../../assets/10011/img3_0/appdown/logo.png');
      // }
      // if (this.$projectname == '10034') {
      //   let ele = document.getElementById('down_logo').src = require('../../../assets/10034/img3_0/appdown/logo.png');
      // }
      let ele = document.getElementById('down_logo').src=this.$imgs['appdown/logo'];
    })
  },
  methods: {
    downApp() {
      this.loading = true
      // console.log(this.isIos)
      // request({
      //   url:this.isIos
      // },{
      //   onDownloadProgress (progress) {
      //       console.log(Math.round(progress.loaded / progress.total * 100) + '%');
      //   }
      // })
      // window.location.href = this.isIos;
      window.location.href = this.isIos
      let timer = null;
      setTimeout(() => {
        this.loading = false
        timer = setInterval(() => {
          if (this.percent < 0) {
            clearInterval(timer);
          }
          this.percent = this.percent - 100 / 12;
        }, 1000);
      }, 10000);
    },
    isWeiXin() {
      var ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        this.weixin = true;
        this.isShow = true;
      } else {
        this.weixin = false;
      }
    }
  }
};
</script>

