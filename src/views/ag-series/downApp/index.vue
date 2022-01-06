<style scoped lang="less">
@import '~@assets/styles/downApp/index.less';

.container {
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
  -webkit-overflow-scrolling: touch;

  .main {
    font-family: PingFangSC-Semibold, PingFang SC;
    height: 100%;
    padding: 120px 30px 0;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    box-sizing: border-box;
    // flex: 1;
    .down-item {
      width: 100%;
      height: 160px;
      background: #202126;
      display: flex;
      align-items: center;
      padding: 25px 30px;
      box-sizing: border-box;
      border-radius: 12px;
      img {
        width: 110px;
        height: 110px;
        border-radius: 30px;
        margin-right: 24px;
      }
      p{
        color: #FFFFFF;
        font-weight: 500;
        font-size: 28px;
        flex: 1;
      }
      button{
        font-size: 28px;
        width: 128px;
        color: #FFFFFF;
        height: 50px;
        border-radius: 25px;
        background: linear-gradient(90deg, #C7977C 0%, #AD7A62 100%);
      }
    }
  }

}
</style>
<template>
  <div class="container downApp">
    <van-nav-bar
        class="m-header"
        :title="$t('下载中心')"
        left-arrow
        @click-left="$router.push('/')"
    >
    </van-nav-bar>
    <div class="main">
      <div class="down-item">
        <img :src="$imgs['appdown/Icon@2x']">
        <p>{{$t($config[$projectname].project)}}APP</p>
        <van-button @click="$router.push('/downDetail')">{{$t('去下载')}}</van-button>
      </div>
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

