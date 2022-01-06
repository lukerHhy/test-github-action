<template>
  <div class="register">
      <div class=" submit-form">
        <div class="item">
          <div class="reset">
            <img class="img" style="margin-right: 6px;" :src="require('@assets/img3_0/otherIcon/user@2x.png')" alt/>
            <input type="text" autocomplete="off" v-model="agent.username"  :placeholder="$t('请输入代理账户')">
          </div>
          <div class="reset">
            <img class="img" style="margin-right: 6px;" :src="require('@assets/img3_0/otherIcon/pass@2x.png')" alt/>
            <input type="password" autocomplete="off" v-model="agent.password"  :placeholder="$t('请输入登录密码')">
          </div>
          <div class="reset">
            <img class="img" style="margin-right: 6px;" :src="require('@assets/img3_0/otherIcon/wechat@2x.png')" alt/>
            <input type="text" autocomplete="off" v-model="agent.wechat"  :placeholder="$t('请输入微信号')">
          </div>
          <div class="reset" v-show="false">
            <img class="img" style="margin-right: 6px;" :src="require('@assets/img3_0/otherIcon/skype@2x.png')" alt/>
            <input type="text" autocomplete="off" v-model="agent.skype" :placeholder="'请输入Skype账号'">
          </div>
          <div class="reset">
            <img class="img" style="margin-right: 6px;" :src="require('@assets/img3_0/otherIcon/shouji@2x.png')" alt />

            <input type="text" autocomplete="off" v-model="agent.mobile"  :placeholder="$t('请输入手机号码')">
          </div>
        </div>
        <div class="function">
          <div class="aagames-button-box">
            <button type="button" class="aagames-button" @click="register">{{$t('注册')}}</button>
          </div>
        </div>
      </div>
      <van-popup v-model="isShowAreaCode" position="bottom">
        <van-picker show-toolbar @confirm="onConfirmAreaCode" value-key="text" @cancel="onCancelAreaCode" :columns="arrAreaCode" />
      </van-popup>
    <loading :isShow="isLoading" :title="loadingText"></loading>
  </div>
</template>

<script>
import Lheader from "@/components/l-header";
import Loading from '@/components/loading';

import { getcaptcha, register, login } from "@/api/agent/index";
import { phonearea } from '@/api/login/index';
import { ismail, isnum, checkPassword, checkUser, qqAcount } from "@/utils/index";

export default {
  name: "register",
  components: {
    Lheader,
    Loading,
  },
  data() {
    return {
      isLoading: false,
      loadingText: this.$t('注册中...'),
      login: this.$t('登录'),
      title: this.$t('代理注册'),
      active: 0,
      isAgree: false,
      isImg: true,
      isShowAreaCode: false, // 是否显示国际区号上拉框
      // captcha: "",
      captchaImg: "",
      arrAreaCode: [],
      agent: {
        merchant_no: process.env.VUE_APP_MERCHANT_NO,
        mobile: "",
        phone_area_code: 86,
        username: "",
        password: "",
        repassword: "",
        email: "",
        qq: "",
        skype: "123",
        realname: ""
      }
    };
  },
  methods: {
    // 验证码
    capt() {
      getcaptcha().then(res => {
        this.isImg = false;
        this.captchaImg = res.data.data.captcha_url;
      });
    },
    // 链接
    linkTo(path) {
      this.$router.push({
        path: path
      })
    },
    // 获取手机国际区号
    async getPhoneAreaCode() {
      phonearea().then(res=> {
        if (res.data.code === 0) {
          this.arrAreaCode = res.data.data.map(item => {
            item = '+' + item;
            return item;
          });
        }
      })
    },
    // 关闭弹框
    onCancelAreaCode(val) {
      this.isShowAreaCode = false;
    },
    // 确认弹框
    onConfirmAreaCode(val) {
      this.isShowAreaCode = false;
      this.agent.phone_area_code = Number(val);
    },
    // 确认注册
    register() {
      // if (!this.isAgree) {
      //   this.$toast(this.$t('请同意并接受《合作代理条款》'));
      //   return false;
      // }
      if (!this.agent.username) {
        this.$toast.fail(this.$t('请输入账号'));
        return false;
      }
      if (!this.agent.password) {
        this.$toast.fail(this.$t('请输入密码'));
        return false;
      }
      // if (!this.agent.repassword) {
      //   this.$toast(this.$t('请再次输入密码'));
      //   return false;
      // }
      if (!this.agent.mobile) {
        this.$toast.fail(this.$t('请输入手机号码'));
        return false;
      }
      if (!this.agent.skype) {
        this.$toast.fail(this.$t('请输入skype账号'));
        return false;
      }
      // if (!this.agent.email) {
      //   this.$toast(this.$t('请输入邮箱'));
      //   return false;
      // }
      // if (!this.agent.qq) {
      //   this.$toast(this.$t('请输入QQ号'));
      //   return false;
      // }
      // if (!this.agent.realname) {
      //   this.$toast(this.$t('请输入真实姓名'));
      //   return false;
      // }
      /* if (!this.agent.captcha) {
        Toast(this.$t('请输入验证码'));
        return false;
      } */
      if (!checkUser(this.agent.username)) {
        this.$toast.fail(this.$t('账号由6-12位英文字母或数字组成'));
        return false;
      }
      if (!checkPassword(this.agent.password)) {
        this.$toast.fail(this.$t('密码由6-12位英文字母或数字组成'));
        return false;
      }
      // if (this.agent.password !== this.agent.repassword) {
      //   this.$toast(this.$t('两次密码不一致'));
      //   return false;
      // }
      if (!isnum(this.agent.mobile)) {
        this.$toast.fail(this.$t('无效的手机号码'));
        return false;
      }
      // if (!ismail(this.agent.email)) {
      //   this.$toast(this.$t('无效的邮箱地址'));
      //   return false;
      // }
      // if (!qqAcount(this.agent.qq)) {
      //   this.$toast(this.$t('请输入5-12位数字'));
      //   return false;
      // }
      this.isLoading = true;
      this.loadingText = this.$t('注册中...');
      this.agent.repassword = this.agent.password
      register(this.agent).then(res => {
        if (res.data.code === 0) {
          // this.loadingText = this.$t('注册成功，登录中...');
          this.$toast(this.$t('注册成功，登录中...'));
          this.isLoading = true;
          login(this.agent).then(res => {
            if (res.data.code === 0) {
              window.localStorage.agToken = res.data.data.access_token;
              window.localStorage.agId = res.data.data.id;
              this.$router.push("/agent");
            } else {
              this.$toast.fail(res.data.msg);
            }
          }).finally(()=>{
            this.isLoading = false;
          });
        } else {
          this.$toast.fail(res.data.msg);
        }
      }).finally(()=>{
        this.isLoading = false;
      })
    }
  },
  created() {
    try {
      let scrollY = document.getElementsByClassName('container')[0].offsetTop;
      window.scrollTo(0, scrollY);
    } catch (error) {

    }
    this.getPhoneAreaCode();
  }
};
</script>

<style scoped lang="less">
  //@import "../index";
  @import '~@assets/styles/agentAuth/index.less';

</style>
