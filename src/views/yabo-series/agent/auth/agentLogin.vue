<style scoped lang="less">
@import '../index';
.submit-form {
  padding: 0 60px;
}
</style>
<template>
  <div class="register submit-form">
    <div class="reset">
      <span
        ><img class="img" :src="$imgs['agent/agent_login_icon_geren@2x']" alt
      />
      </span>
<!--      <span class="iconfont icon-user "></span>-->
      <input type="text"  :placeholder="$t('请输入代理账号')" v-model="list.username" />
    </div>
    <div class="reset">
      <span
        ><img class="img" :src="$imgs['agent/agent_login_icon_mima@2x']" alt
      /></span>
      <input
        type="password"
         :placeholder="$t('请输入密码')"
        v-model="list.password"
        ref="psw"
      />
      <img
        class="password-view"
        v-if="showPsw"
        @click="showWord"
        :src="$imgs['agent/agent_icon_login_yanjing1@2x']"
        alt=""
      />
      <img
        class="password-view"
        v-else
        @click="hideWord"
        :src="$imgs['agent/agent_icon_login_yanjing2@2x']"
        alt=""
      />
    </div>
    <div class="error"></div>
    <div class="aagames-button-box">
      <button class="aagames-button sign-in" @click="loginBtn" type="button">
{{$t('登录')}}
      </button>
    </div>
    <div class="register-fr">
      <!--      <span><router-link to="/agRevisePassword">{{$t('忘记密码')}}</router-link></span>-->
      <span><router-link to="/agentAuth/register">{{$t('注册账号')}}</router-link></span>
    </div>
    <loading :isShow="isLoading" :title="$t('登录中...')"></loading>
  </div>
</template>

<script>
import Lheader from '@/components/l-header'

import Loading from '@/components/loading'
import agentRegister from './agentRegister'
import { getcaptcha, login } from '@/api/agent/index'

export default {
  name: 'login',
  components: {
    Loading,
    Lheader,
    agentRegister,
  },
  data() {
    return {
      isLoading: false,
      login: this.$t('注册'),
      title: this.$t('代理登录'),
      active: 0,
      list: {},
      isImg: true,
      captchaImg: '',
      showPsw: true,
    }
  },
  methods: {
    showWord() {
      this.showPsw = false
      this.$refs.psw.setAttribute('type', 'text')
    },
    hideWord() {
      this.showPsw = false
      this.$refs.psw.setAttribute('type', 'password')
    },
    capt() {
      getcaptcha().then((res) => {
        this.isImg = false
        this.captchaImg = res.data.data.captcha_url
      })
    },
    loginBtn() {
      if (!this.list.username) {
        this.$toast.fail(this.$t('请输入账号'))
        return false
      }
      if (!this.list.password) {
        this.$toast.fail(this.$t('请输入密码'))
        return false
      }
      // if (!this.list.captcha) {
      //   this.$toast(this.$t('请输入验证码'));
      //   return false;
      // }
      // if (!checkUser(this.list.username)) {
      //   this.$toast(this.$t('账号由6-12位英文字母或数字组成'));
      //   return false;
      // }
      // if (!checkPassword(this.list.password)) {
      //   this.$toast(this.$t('密码由6-12位英文字母或数字组成'));
      //   return false;
      // }
      this.list.merchant_no = process.env.VUE_APP_MERCHANT_NO
      this.isLoading = true
      login(this.list)
        .then((res) => {
          if (res.data.code === 0) {
            window.localStorage.agToken = res.data.data.access_token
            window.localStorage.agId = res.data.data.id
            this.$router.push({ path: '/agent' })
          } else {
            this.$toast.fail(res.data.msg)
          }
        })
        .finally(() => {
          this.isLoading = false
        })
    },
  },
  created() {
    try {
      let scrollY = document.getElementsByClassName('container')[0].offsetTop
      window.scrollTo(0, scrollY)
    } catch (error) {}
  },
}
</script>
