<template>
  <div class="container code-500">
    <!-- <lheader></lheader> -->
    <div class="main">
      <template v-if="$projectname === 'chobet'">
        <div class="bg-login" @click="$router.push('/')"  :style="{backgroundImage:  `url(${logo_403})`}"></div>
        <div v-show="resultImgs['people@2x']" class="people"  :style="{backgroundImage:  `url(${resultImgs['people@2x']})`}"></div>
      </template>
      <img class="top-logo" :src="this.$imgs['error/top']" />
      <p class="top-code"></p>

      <!-- <div class="people"  :style="{backgroundImage:  `url(${people})`}"></div> -->
      <div class="errorImg" :class="$projectname=='10014'?'imgCenter':''" :style="{backgroundImage: `url(${bg_500})`}"></div>
      <div class="text" :class="$projectname=='10014'?'textCenter':''">
        <!--        <p class="code">{{$t('IP访问限制')}}</p>-->
        <div class="error-text">
          当前网页正在维护！
        </div>
<!--        <router-link class="error-back" to="/">{{$t('返回首页')}}</router-link>-->
        <!--        <p class="code">Dear Customers</p>-->
        <!--        <div class="english">-->
        <!--          The current website is under maintenance,we are temporarily-->
        <!--          unable to provide services for you.We apologize for the-->
        <!--          inconvenience caused.-->
        <!--        </div>-->
        <div class="aagames-button-box">
          <button class="aagames-button" type="button" @click="$openKefu">联系专属客服
          </button>
        </div>
        <p class="hot-line" v-if="siteInfo.business_cooperation.length">拨打热线：{{ siteInfo.business_cooperation[3].contact }}</p>
      </div>

    </div>
  </div>
</template>

<script>
import Lheader from '@/components/l-header'
import resultImgs from '@/assets'
import {mapState} from 'vuex'

export default {
  components: {
    Lheader
  },
  data () {
    return {
      logo_403: require('@assets/img3_0/other/403_logo@2x.png'),
      bg_500: require('@assets/img3_0/other/500_bg@2x.png'),
      resultImgs
      // people: require('@assets/img3_0/other/people@2x.png')
    }
  },
  computed:{
    ...mapState('global',['siteInfo'])
  },
  created(){
    
  },
}
</script>

<style scoped lang="less">
@import '~@assets/styles/error/index.less';
.container {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  /deep/.aagames-nav-bar{
    background:transparent;
  }
  .main {
    // margin-top: @main-margin-top;
    height: 100%;
    position: relative;
    .bg-login {
      height: 90px;
      width: 632px;
      margin: 0 auto;
      display: flex;
      background-size: 100%;
      background-repeat: no-repeat;
      background-position: center;

    }
    .people {
      height: 506px;
      width:690px;
      margin: 62px auto;
      display: flex;
      background-size: 100%;
      background-repeat: no-repeat;
      background-position: center;

    }
    .errorImg {
      margin: 0 auto;
      width: 412px;
      height: 164px;
      background-size: 100% auto;
      background-repeat: no-repeat;
      background-position: top center;
    }
    .text {
      //position: absolute;
      //top: 750px;
      //color: @primary-text-color;
      margin-top: 40px;
      text-align: center;
      .code {
        margin: 10px;
        height: 44px;
        font-size: 32px;
        font-weight: 600;
        color: rgba(82, 81, 82, 1);
        line-height: 44px;
      }
      .chinese {
        //height: 88px;
        //margin: 0 32px;
        //font-size: 24px;
        //font-weight: 400;
        //color: rgba(82, 81, 82, 1);
        //line-height: 44px;
      }
      .english {
        margin: 0 32px;
        font-size: 24px;
        font-weight: 400;
        color: rgba(82, 81, 82, 1);
        line-height: 40px;
      }
      .aagames-button-box {
        width: 100%;
        margin: 1.5rem auto 0;
      }
    }

  }
}
</style>
