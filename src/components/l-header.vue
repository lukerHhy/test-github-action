<style scoped lang="less">
// @import '~@assets/styles/lheader/index.less';
// @primary-text-color: #BE8D24;
.aagames-nav-bar {
  // background:#1e1e1e;
  z-index: 1;
}
.aagames-nav-bar {
  background: @bg-color;
  color: @header-color;
}
.help {
  img {
    width: 50px !important;
    height: 50px !important;
    right: 0 !important;
  }
}
.van-icon-question-o {
  color: @primary-color;
}
.service {
  display: inline-block;
  width: 0.58666rem;
  height: 0.61333rem;
}
.callshow {
  width: 70%;
  padding: 40px;
  background-color: #ffffff;
  // border-radius: .13333rem;
  .aagames-button:last-child {
    margin-top: @margin-15;
  }
}
.callBack {
  padding: 40px;
  width: 640px;
  .title {
    color: #090705;
    font-size: 36px;
    font-weight: 700;
    .right {
      float: right;
      color: #e5e5e5;
      font-size: 36px;
    }
  }
  .website {
    padding: 30px 10px;
    color: #67382f;
    line-height: 64px;
    font-size: 32px;
    b {
      padding: 4px;
      color: #e63b19;
    }
  }
  .btn {
    display: flex;
    align-items: center;
    button {
      flex: 1;
      width: 100%;
      padding: 28px 0;
      border-radius: 4px;
      font-weight: 700;
      font-size: 32px;
      border: none;
    }
    .cancel {
      background-color: #ffcf6e;
      color: #67382f;
    }
  }
  .phone {
    position: relative;
    display: flex;
    align-items: center;
    input {
      flex: 1;
      padding: 20px;
      border: none;
      color: #8e9ab5;
      font-size: 32px;
      border-bottom: 1px solid #8e9ab5;
    }
    .areaNum {
      padding: 20px;
      display: inline-block;
      width: 150px;
      font-size: 32px;
      color: #8e9ab5;
      border-bottom: 1px solid #8e9ab5;
      white-space: nowrap;
      .van-icon {
        margin-left: 10px;
      }
    }
  }
}
.function {
  .select {
    background-color: #181c24;
    z-index: 2001;
    position: fixed;
    top: @main-top;
    left: 0;
    font-size: 24px;
    width: 100%;
    .activated {
      color: @primary-text-color;
    }
    .van-row {
      padding: 0.26666rem 0;
      text-align: center;
      .van-col {
        line-height: 1rem;
      }
    }
  }
  .overlay {
    z-index: 2000;
    position: fixed;
    top: 1.76rem;
    opacity: 0.5;
    width: 100%;
    height: 100%;
    background-color: #000000;
    left: 0;
  }
}
.mr-10 {
  // color: rgb(206, 172, 99);
  color: #ffffff;
  transform: rotate(90deg);
}
.bg-login {
  position: relative;
  padding: 200px 0 82px;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 88px;
  .logo {
    width: 300px;
    position: absolute;
    top: 75px;
  }
  .cooperation {
    width: 428px;
  }
  .icons {
    width: 480px;
    position: absolute;
    left: 50%;
    top: 240px;
    transform: translateX(-50%);
    img {
      display: block;
      width: 440px;
      margin: 0 auto;
    }
    ul {
      color: #fff;
      opacity: 0.6;
      display: flex;
      margin-top: 10px;
      li {
        white-space: nowrap;
        text-align: center;
        transform: scale(0.8);
      }
    }
  }
}
.free-rotation {
  display: inline-flex;
  align-items: center;
  > span {
    margin-right: @margin-5;
  }
}
.nav-left,
.nav-right {
  min-width: 150px;
  .link{
    font-size: 0.42rem;
  }
}
.nav-center {
  color: #fff;
}
.nav-right {
  .van-icon-cross {
    margin-top: 50px;
    font-size: 32px;
  }
  .link{
    font-size: 0.42rem;
  }
}
</style>
<template>
  <!--<el-header class="header">-->
  <!--<div class="el-icon-back"></div>-->
  <!--<div class="left">{{$t('关闭')}}</div>-->
  <!--{{ title }}-->
  <!--<div class="right" v-if="isLogin">{{ isLogin === '登录' ?  '登录' : '注册' }}</div>-->
  <!--</el-header>-->
  <!-- <el-header class="header aagames-nav-bar"> -->
  <div class="aagames-login-header">
    <div class="tool-bar"></div>
    <div
      class="aagames-nav-bar lheader"
      :style="{ position: isPopup ? 'absolute' : '' }"
    >
      <div class="nav-left">
        <template v-if="goback">
          <template v-if="(step > 2 || steps > 1) && !isloginReg && step != 10">

            <template>
              <van-icon name="arrow-left" @click="go" />
            </template>
          </template>
          <template
            v-else-if="
              $projectname !== '10050' &&
                (step == 2 || steps == 1 || isloginReg || step == 10)
            "
          >

            <template>
              <van-icon name="cross" @click="go" />
            </template>
          </template>
        </template>
        <template v-else-if="fanhui">
          <van-icon name="arrow-left" @click="go" />
        </template>
      </div>
      <div v-if="isShowLogo" class="nav-center">
        <img
          style="height:0.93333rem;"
          class="logo"
          v-if="h5LogoSrc"
          :src="h5LogoSrc"
          alt=""
        />
      </div>
      <div v-else-if="title" class="nav-center">
        <span>{{ title }}</span>
      </div>
      <div class="nav-right">
        <!--<span @click="loginPath" v-if="isLogin">{{ assemblyType === '登录' ?  '登录' : '注册' }}</span>-->
        <!-- <span @click="isOpenTurn" v-if="turn || turn == 0">{{ turn === 1 ? '关闭免转钱包' : '开启免转钱包' }}</span> -->
        <!--<span @click="agentLogin" v-if="isAgentRegister">{{$t('注册')}}</span>-->
        <!-- <van-icon size="0.5rem" @click="agentAddBank" v-if="isAgentAddBank" name="plus" />
          <div class="free-rotation" v-if="showTurn">
            <span>{{$t('免转')}}</span>
            <van-switch
              v-model="checked"
              size=".53333rem"
              active-color="#BE8D24"
              inactive-color="#4E4E4E"
              @input="isOpenTurn"
            />
          </div> -->
        <template v-if="step == 2 && $projectname == '10050'">
          <van-icon name="cross" @click="go" />
        </template>
        <!-- 客服 -->
        <div v-if="kefu">
          <div class="service" @click="callService"></div>
        </div>

        <span v-if="more" @click="$router.push({ path: '/more' })">
          <van-icon class="mr-10" name="ellipsis" size=".53333rem" />
        </span>

        <span v-if="getSwitch" @click="isSwitch = !isSwitch">
          <van-icon class="mr-10" name="ellipsis" size=".53333rem" />
        </span>

        <div class="function" v-show="isSwitch">
          <div class="select">
            <van-row>
              <van-col
                v-for="(item, index) in mySwitchList"
                :key="index"
                @click.native="clickSwitch(index, item.path)"
                span="8"
                :class="{ activated: activated === index }"
              >
                {{ item.name }}
              </van-col>
            </van-row>
          </div>
          <div class="overlay" @click="isSwitch = false"></div>
        </div>
        <div
          v-if="rightName"
          v-html="rightName"
          class="link"
          @click="$emit('rightClick')"
        ></div>
        <div class="help" @click="getHelp" v-if="help">
          <van-icon name="question-o" @click="help(1)" size="30" />
        </div>
      </div>
    </div>
    <div class="bg-login" v-if="isBanner">
      <!-- <img class="logo" :src="require('@assets/img3_0/login/logo@2x.png')" alt=""> -->
      <img class="logo" :src="h5LogoSrc" alt="" />
      <img
        class="cooperation"
        v-if="$projectname == 'wanqu' || $projectname == 'chashao'"
        :src="require('@assets/img3_0/login/cooperation@2x.png')"
        alt=""
      />
      <!-- <img src="@assets/img/login/logo@2x.png"  :alt="$t('万趣娱乐')" class="logo">
        <div class="icons">
          <img src="@assets/img/login/icons@2x.png">
          <ul>
            <li>AA集团</li>
            <li>AA贵宾厅</li>
            <li>AA游艇会</li>
            <li>AA俱乐部</li>
            <li>AA电投</li>
            <li>{{$t('牌照')}}</li>
          </ul>
        </div> -->
    </div>
  </div>
  <!-- </el-header> -->
</template>

<script>
import { autotrans } from '@/api/memberCenter'
import Vue from 'vue'
import { Toast } from 'vant'
Vue.use(Toast)

export default {
  name: 'l-header',
  props: {
    title: {
      // type: String,
      default: '',
    },
    kefu: {
      default: false,
    },
    help: {
      default: false,
    },
    isShowLogo: {
      default: false,
    },
    isLogin: {
      // type: String,
      default: '',
    },
    isAgentRegister: {
      default: false,
    },
    isAgentAddBank: {
      default: false,
    },
    path: {
      // type: String,
      default: '',
    },
    rightName: {
      // type: String,
      default: '',
    },
    getSwitch: {
      // type: Boolean,
      default: false,
    },
    type: {
      // type: String,
      default: '',
    },
    goback: {
      default() {
        return true
      },
    },
    fanhui: {
      default() {
        return true
      },
    },
    goHome: {
      // type: Boolean,
      default: false,
    },
    memberCenter: {
      // type: Boolean,
      default: false,
    },
    turn: {
      // type: Number,
      default: 0,
    },
    showTurn: {
      default: 0,
    },
    // 是否显示公司logo作为顶部banner，参见登录，注册页面
    isBanner: {
      // type: Boolean,
      default: false,
    },
    more: {
      default: false,
    },
    isPopup: {
      default: false,
    },
    step: {
      default: 3,
    },
    steps: {
      default: 1,
    },
    isloginReg: {
      default: 0,
    },
  },
  data() {
    return {
      mySwitchList: [
        { name: this.$t('关于我们'), path: 'aboutWe' },
        { name: this.$t('合法牌照'), path: 'legalLicence' },
        { name: this.$t('常见问题'), path: 'commonProblem' },
        { name: this.$t('联系我们'), path: 'callWe' },
        { name: this.$t('博彩责任'), path: 'duty' },
        { name: this.$t('隐私安全'), path: 'secrets' },
        { name: this.$t('免责声明'), path: 'relief' },
      ],
      activated: 0,
      isSwitch: false,
      assemblyType: '',
      checked: false,
      data: {
        access_token: window.localStorage.token,
        merchant_no: process.env.VUE_APP_MERCHANT_NO,
      },
    }
  },
  watch: {
    turn(val) {
      if (val == 1) {
        this.checked = true
      } else {
        this.checked = false
      }
    },
  },
  computed: {
    autoTrans() {
      this.checked = this.turn === 1
      return this.turn === 1
    },
    h5LogoSrc() {
      return window.localStorage.getItem('h5-logo')
    },
  },
  created() {
    this.activated = this.$route.query.activated
  },
  mounted() {
    this.assemblyType = this.isLogin
  },
  methods: {
    clickSwitch(idx, path) {
      this.activated = idx
      this.$router.push({ name: path, query: { activated: idx } })
    },
    close() {
      this.$router.push({ path: '/memberCenter' })
    },
    go() {
      if (this.$route.name == 'ytAuth') {
        this.$router.push({ path: '/memberCenter' })
        return
      }
      if (this.isLogin == this.$t('登录') || this.isLogin == this.$t('注册')) {
        this.$router.push({ path: "/" })
        return
      }
      if (this.goHome) {
        this.$router.push({ path: "/" })
      } else {
        if (this.isPopup) {
          this.$emit('goback')
        } else if (typeof this.goback == 'function') {
          this.$emit('goback', 1)
        } else {
          this.$router.go(-1)
        }
      }
    },
    isOpenTurn(checked) {
      if (checked) {
        this.data.is_auto_trans = 1
      } else {
        this.data.is_auto_trans = 2
      }
      // let _is_auto_trans = this.turn === 1 ? 2 : 1;

      autotrans(this.data).then((res) => {
        if (this.data.is_auto_trans === 2) {
          Toast(this.$t('关闭成功'))
        } else {
          Toast(this.$t('开启成功'))
        }
        this.$emit('update', this.data.is_auto_trans)
        this.checked = checked
      })
    },
    loginPath() {
      if (this.type) {
        this.assemblyType = this.assemblyType === this.$t('登录') ? this.$t('注册') : this.$t('登录')
        this.$emit('agentLoginType', this.assemblyType)
      } else {
        if (this.isLogin === this.$t('登录')) {
          this.$router.push({ name: 'login' })
        } else {
          this.$router.push({ name: 'register' })
        }
      }
    },
    // 代理登录
    agentLogin() {
      this.$router.push({ path: '/agentRegister' })
    },
    // 代理新增银行卡
    agentAddBank() {
      this.$router.push({ path: '/agAddBankBind' })
    },
    callService() {
      this.$openKefu()
    },
    getHelp() {
      this.$dialog.confirm({
        title: this.$t('温馨提示'),
        message:
          this.$t('1.开启后，进入游戏时系统会自动将主账户余额充进游戏平台<br>2.不同游戏类型标识共享钱包时游戏余额共享'),
        messageAlign: 'left',
        showCancelButton: false
      })
    },
  },
}
</script>
