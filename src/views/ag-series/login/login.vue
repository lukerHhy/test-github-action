<style lang="less" scoped>

@import '~@assets/styles/login/index.less';

</style>
<template>
  <div class="container login">
    <!--    <lheader :title="title" :isloginReg="1" :isLogin="login" :isBanner="true"></lheader>-->
    <div class="main" id="home">
      <div class="home">
        <div class="top-bar">
          <van-icon name="cross" @click="$router.push({path:"/"})" />
          <a href="javascript:;" @click="quick">{{$t('注册')}}</a>
        </div>
        <van-tabs class="login-tabs" @click="tabChange" line-width=".64rem" line-height=".08rem" :color="$colorjs.baseColor">
          <van-tab v-for="item in tab" :key="item" :title="item" class="tab-list"></van-tab>
        </van-tabs>
        <div class="fill">
          <!-- 账号密码登录入口 -->
          <div v-show="active === 0">
            <div class="aagames-form">
              <div class="input">
                <img class="img" :src="$imgs['login/user@2x']" alt/>
                <input type="text" v-model="account.username"  :placeholder="$t('游戏账号')"/>
              </div>
            </div>
            <div class="aagames-form">
              <div class="input">
                <img class="img" :src="$imgs['login/pass@2x']" alt/>
                <input type="password" v-model="account.password"  :placeholder="$t('请输入密码')"/>
              </div>
            </div>
            <div class="aagames-button-box funDiv">
              <!--<div class="left" @click="quick">{{$t('立即开户')}}</div>-->
              <!--<div class="right" @click="$router.push('forgetPassword')">{{$t('忘记密码')}}</div>-->
              <div class="left" @click="ForgetPasswordShow = true">{{$t('忘记密码')}}</div>
              <div class="right">
                <van-switch v-model="isRember" />
                <span>{{$t('记住用户名')}}</span>
              </div>
            </div>
          </div>
          <!-- 手机登录入口 -->
          <div v-show="active === 1">
            <div class="aagames-form">
              <div class="input">
                <img class="img phone"
                     :src="$imgs['login/mobile@2x']" alt/>
                <phoneArea v-model="areaCode">
                  <i class="areaNum">
                    &nbsp;+{{ areaCode }}
                    <img class="xiala" :src="require('@assets/img3_0/otherIcon/xiala@2x.png')" alt/>
                  </i>
                </phoneArea>

                <input type="text" v-model="phoneSign.phone"  :placeholder="$t('请输入手机号')"/>
              </div>
            </div>
            <gcode
                :account="phoneSign.phone"
                :withLabel="false"
                :withIcon="true"
                :areaCode="areaCode"
                @getCode="getCodeC"
                @myCode="myCodeC"
            ></gcode>
          </div>
        </div>
        <!-- 按钮 -->
        <div class="function">

          <div class="aagames-button-box">
            <van-button :loading="loading" :loading-text="$t('登录中...')" class="aagames-button sign-in" @click="signIn"
                        type="button">登录
            </van-button>
          </div>
<!--          <div class="aagames-button-box">-->
<!--            <van-button class="aagames-button line" @click="quick" type="button">{{$t('无账号')}}</van-button>-->
<!--          </div>-->
        </div>
        <van-image style="width: 100%" :src="$imgs['login/login-bg@2x']"></van-image>
        <div class="customer">
          <div class="wait" @click="go('/')">
            <img :src="require('@assets/img3_0/otherIcon/zaigg@2x.png')" alt/>
{{$t('再逛逛吧')}}
          </div>
          <div class="cut-up"></div>
          <div class="kefu" @click="$openKefu">
            <img :src="require('@assets/img3_0/otherIcon/kefu@2x.png')" alt/>
{{$t('专属客服')}}
          </div>
        </div>
      </div>
      <!--<van-popup v-model="show" position="bottom">-->
      <!--<van-picker-->
      <!--show-toolbar-->
      <!--@confirm="onConfirm"-->
      <!--value-key="text"-->
      <!--@cancel="onCancel"-->
      <!--:columns="columns"-->
      <!--/>-->
      <!--</van-popup>-->
    </div>

    <van-popup get-container="#app" v-model="ForgetPasswordShow" position="bottom">
      <ForgetPassword @hide="ForgetPasswordShow = false" v-model="ForgetPasswordShow"></ForgetPassword>
    </van-popup>
  </div>
</template>

<script>
import Lheader from "@/components/l-header";
// import PhoneArea from "@/components/phone-area";
import {login, mobilelogin, phonearea} from "@/api/login";
import Gcode from "@/components/g-code";
import ForgetPassword from "./forgetPassword";
import Vue from "vue";
import {isnum} from "@/utils/index";
import {Toast} from "vant";
import mixins from "@/mixins/index";

Vue.use(Toast);

export default {
  mixins: [mixins],
  name: "login",
  data() {
    return {
      login: this.$t('注册'),
      title: this.$t('账号登录'),
      tab: [this.$t('账号登录'), " 手机登录"],
      active: 0,
      account: {
        password: "",
        username: ""
      },
      phoneSign: {
        phone: "",
        code: ""
      },
      getCode: "",
      areaCode: 86,
      show: false,
      ForgetPasswordShow: false,
      columns: [],
      loading: false,
      isRember: false
    };
  },
  components: {
    Lheader,
    Gcode,
    ForgetPassword
  },
  created() {
    // phonearea().then(res => {
    //   if (res.data.code === 0) {
    //     this.columns = res.data.data;
    //   }
    // });
  },
  methods: {
    // 切换登录方式
    tabChange(index) {
      this.active = index;
    },
    signIn() {
      if (this.active === 0) {
        if (!this.account.username) {
          this.$toast.fail(this.$t('请输入游戏账号'));
          return false;
        }
        if (!this.account.password) {
          this.$toast.fail(this.$t('请输入密码'));
          return false;
        }
        this.loading = true
        login({
          merchant_no: process.env.VUE_APP_MERCHANT_NO,
          username: this.account.username,
          password: this.account.password,
          phone_area_code: "+" + this.areaCode
        }).then(res => {
          this.loading = false
          if (res.data.code === 0) {
            this.$store.dispatch(
                "users/updateToken",
                res.data.data.access_token
            );
            this.$store.dispatch("users/getUserInfo");
            // // window.localStorage.token = res.data.data.access_token
            // window.localStorage.id = res.data.data.id
            // window.localStorage.username = res.data.data.username
            const This = this;
            Toast({
              message: this.$t('登录成功！'),
              onClose() {
                console.log(window.localStorage.getItem("isAuth"));
                if (window.localStorage.getItem("isAuth") == "true") {
                  This.$router.push("ytAuth");
                } else {
                  This.$router.push("/");
                }
              }
            });
          } else {
            this.$toast.fail(res.data.msg);
          }
        }, err => {
          this.loading = false
        });
      } else {
        // if (!this.getCode || (this.getCode != this.phoneSign.code)) {
        //   Toast(this.$t('验证码输入有误'));
        //   return false;
        // }
        if (!isnum(this.phoneSign.phone)) {
          this.$toast.fail(this.$t('手机格式有误'));
          return false;
        }
        if (!this.phoneSign.code) {
          this.$toast.fail(this.$t('验证码输入有误'));
          return false;
        }
        this.loading = true
        mobilelogin({
          merchant_no: process.env.VUE_APP_MERCHANT_NO,
          mobile: this.phoneSign.phone,
          code: this.phoneSign.code,
          phone_area_code: "+" + this.areaCode
        }).then(res => {
          this.loading = false
          if (res.data.code === 0) {
            console.log(res);
            this.$store.dispatch(
                "users/updateToken",
                res.data.data.access_token
            );
            this.$store.dispatch("users/getUserInfo");
            // // window.localStorage.token = res.data.data.access_token
            // window.localStorage.id = res.data.data.id
            // window.localStorage.username = res.data.data.username
            const This = this;
            Toast({
              message: this.$t('登录成功！'),
              onClose() {
                console.log(window.localStorage.getItem("isAuth"));
                if (window.localStorage.getItem("isAuth") == "true") {
                  This.$router.push("/ytAuth");
                } else {
                  This.$router.push("/");
                }
              }
            });
          } else {
            this.$toast.fail(res.data.msg);
          }
        }, err => {
          this.loading = false
        })
      }
    },
    getCodeC(val) {
      this.getCode = val;
    },
    myCodeC(val) {
      this.phoneSign.code = val;
    },
    quick() {
      this.$router.push({path: "/register"});
      // quickregister({
      //   merchant_no:process.env.VUE_APP_MERCHANT_NO,
      //   domain : window.location.host
      // }).then(res=>{
      //   if (res.data.msg === 'success') {
      //     this.$router.push({
      //       name:'registerSuccess',
      //       params:{
      //         account:res.data.data.username,
      //         pass: res.data.data.password
      //       }
      //     })
      //   }
      // })
    },
    // onConfirm(val) {
    //   this.show = false;
    //   this.areaCode = val;
    // },
    // onCancel(val) {
    //   this.show = false;
    // }
  }
};
</script>

