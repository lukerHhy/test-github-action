<style lang="less" scoped>
@import "login";
@import "~@assets/styles/login/index.less";
div.container {
  padding-bottom: 0;
}
div.container .main {
  padding-top: 0;
  .van-tabs /deep/.van-tabs__wrap {
    border-bottom: 0 !important;
  }
  .aagames-form .input {
    border-radius: 0;
    > input {
      border-radius: 0;
    }
  }
  .aagames-form /deep/.input {
    border-radius: 0;
  }
  .form01 .aagames-form .input input:focus {
    border-left: 8px solid #43d0a5;
  }
  .function .aagames-button-box .sign-in {
    border-radius: 0;
  }
  .customer {
    padding-top: 60px;
  }
  .function .funDiv .rem-pass {
    /deep/ .van-checkbox__icon {
      height: 40px;
      &.van-checkbox__icon--checked .van-icon {
        background-color: @primary-color;
        &::before {
          font-size: 28px;
        }
      }
    }
    /deep/ .van-checkbox__label {
      font-size: 28px;
    }
    /deep/ .van-icon {
      border-radius: 0;
      width: 40px;
      height: 40px;
    }
  }
}
</style>
<template>
  <div class="container login">
    <!-- <div class="con-header">
      <img :src="$imgs['login/logo@2x']" alt="">
      <van-icon name="cross" @click="$router.push({path:"/"})" />
    </div> -->
    <div class="main" id="home">
      <div class="home">
        <van-tabs
          @click="tabChange"
          line-width=".64rem"
          line-height=".08rem"
          :color="$colorjs.baseColor"
        >
          <van-tab
            v-for="item in tab"
            :key="item"
            :title="item"
            class="tab-list"
          ></van-tab>
        </van-tabs>
        <div class="fill">
          <!-- 账号密码登录入口 -->
          <div v-show="active === 0" class="form01">
            <div class="aagames-form">
              <div class="input">
                <input
                  type="text"
                  v-model="account.username"
                   :placeholder="$t('游戏账号')"
                />
              </div>
            </div>
            <div class="aagames-form">
              <div class="input">
                <input
                  type="password"
                  v-model="account.password"
                   :placeholder="$t('请输入密码')"
                />
              </div>
            </div>
          </div>
          <!-- 手机登录入口 -->
          <div v-show="active === 1">
            <div class="aagames-form">
              <div class="input">
                <!--                <img class="img phone" :src="$imgs['otherIcon/shouji@2x']" alt />-->
                <phoneArea v-model="areaCode">
                  <i class="areaNum">
                    &nbsp;+{{ areaCode }}
                    <img class="xiala" :src="$imgs['otherIcon/xiala@2x']" alt />
                  </i>
                </phoneArea>

                <input
                  type="text"
                  v-model="phoneSign.phone"
                   :placeholder="$t('请输入手机号')"
                />
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
          <div class="aagames-button-box funDiv">
            <div class="left rem-pass" @click="togglePass">
              <!-- <van-icon name="circle" v-if="passCheck" /><van-icon v-else name="checked" /><span>{{$t('记住密码')}}</span> -->
              <van-checkbox v-model="passCheck" shape="square"
                >{{$t('记住密码')}}</van-checkbox
              >
            </div>
            <!--<div class="right" @click="$router.push('forgetPassword')">{{$t('忘记密码')}}</div>-->
          </div>
          <div class="aagames-button-box" v-if="active === 0">
            <van-button
              :loading="loading"
              :loading-text="$t('登录中...')"
              :disabled="!(account.username && account.password)"
              class="aagames-button sign-in"
              @click="signIn"
              type="button"
              >{{$t('登录')}}</van-button
            >
          </div>
          <div class="aagames-button-box" v-else>
            <van-button
              :loading="loading"
              :loading-text="$t('登录中...')"
              :disabled="!(phoneSign.phone && phoneSign.code)"
              class="aagames-button sign-in"
              @click="signIn"
              type="button"
              >{{$t('登录')}}</van-button
            >
          </div>
        </div>
        <div class="bet-log">
          <div class="left" @click="goForget">{{$t('忘记密码')}}</div>
          <span @click="quick">{{$t('立即注册')}}</span>
        </div>
        <div class="customer">
          <div class="wait" @click="goIndex">
            <img :src="$imgs['otherIcon/zaigg@2x']" alt />
{{$t('再逛逛吧')}}
          </div>
          <div class="cut-up"></div>
          <div class="kefu" @click="$openKefu">
            <img :src="$imgs['otherIcon/kefu@2x']" alt />
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

    <van-popup get-container="#app" v-model="ForgetPasswordShow">
      <ForgetPassword @hide="ForgetPasswordShow = false" v-model="ForgetPasswordShow"></ForgetPassword>
    </van-popup>
  </div>
</template>

<script>
import Lheader from "../../components/l-header";
// import PhoneArea from "@/components/phone-area";
import { login, mobilelogin, phonearea } from "@/api/login";
import Gcode from "@/components/g-code";
import ForgetPassword from "./forgetPassword";
import Vue from "vue";
import { isnum } from "@/utils/index";
import { Toast } from "vant";
import mixins from "@/mixins/index";
import { mapState } from "vuex";

Vue.use(Toast);

export default {
  mixins: [mixins],
  name: "login",
  data() {
    return {
      login: this.$t('注册'),
      title: this.$t('账号登录'),
      tab: [this.$t('账号密码登录'), this.$t('手机快捷登录')],
      active: 0,
      account: {
        password: "",
        username: "",
      },
      phoneSign: {
        phone: "",
        code: "",
      },
      getCode: "",
      areaCode: 86,
      show: false,
      ForgetPasswordShow: false,
      columns: [],
      loading: false,
      passCheck: false,
      timer: null,
    };
  },
  components: {
    Lheader,
    Gcode,
    ForgetPassword,
  },
  created() {
    // phonearea().then(res => {
    //   if (res.data.code === 0) {
    //     this.columns = res.data.data;
    //   }
    // });
  },
  mounted() {},
  methods: {
    togglePass() {
      this.passCheck = !this.passCheck;
    },
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
        this.loading = true;
        login({
          merchant_no: process.env.VUE_APP_MERCHANT_NO,
          username: this.account.username,
          password: this.account.password,
          phone_area_code: "+" + this.areaCode,
        }).then(
          (res) => {
            this.loading = false;
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
              This.$store.dispatch("global/setLoginPopShow", false);
              Toast({
                message: this.$t('登录成功！'),
                onClose() {
                  console.log(window.localStorage.getItem("isAuth"));

                  if (window.localStorage.getItem("isAuth") == "true") {
                    This.$router.push("ytAuth");
                  } else {
                    This.$router.push("/");
                  }
                },
              });
            } else {
              this.$toast.fail(res.data.msg);
            }
          },
          (err) => {
            this.loading = false;
          }
        );
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
        this.loading = true;
        mobilelogin({
          merchant_no: process.env.VUE_APP_MERCHANT_NO,
          mobile: this.phoneSign.phone,
          code: this.phoneSign.code,
          phone_area_code: "+" + this.areaCode,
        }).then(
          (res) => {
            this.loading = false;
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
                },
              });
            } else {
              this.$toast.fail(res.data.msg);
            }
          },
          (err) => {
            this.loading = false;
          }
        );
      }
    },
    getCodeC(val) {
      this.getCode = val;
    },
    myCodeC(val) {
      this.phoneSign.code = val;
    },
    quick() {
      this.$store.dispatch("global/setLoginPopShow", false);
      this.$router.push({ path: "/register" });
    },
    goForget() {
      this.$store.dispatch("global/setLoginPopShow", false);
      this.$router.push({ path: "/forgetPassword" });
    },
    goIndex() {
      this.$store.dispatch("global/setLoginPopShow", false);
      this.$router.push({ path: "/" });
    },
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
};
</script>

