<style scoped lang="less">
@import "../../views/login/login.less";
@import "~@assets/styles/personalData/index.less";

.container {
  // position: relative;
  // display: flex;
  /*min-height: 100vh;*/
  // flex-direction: column;
  &.verify {
    /deep/ .aagames-nav-bar {
      background: @bg-card-color;
    }
  }

  // .aagames-nav-bar{
  //   position: absolute;
  // }
  .main {
    width: 100%;
    // flex: 1;
    padding: @main-top 30px 30px;

    .steps {
      height: 100px;
      line-height: 100px;
      box-sizing: border-box;
      width: 100%;
      // border-top: 2px solid #4a4a4a !important;
    }

    .no-binding {
      .msg {
        margin: 60px auto;
        text-align: center;
        width: 670px;
        height: 80px;
        font-size: 28px;
        font-weight: 400;
        color: @primary-text-color;
        line-height: 40px;
      }

      .aagames-button-box {
        display: flex;
      }
    }

    // background-color: #090705;
    .aagames-form {
      position: relative;
      background: @bg-card-color;

      .label-text {
        margin-left: 0;
      }

      .username {
        padding-left: 36px;
      }

      .input {
        padding: 0 20px;
        height: 88px;
        border-radius: 8px;
        background-color: @bg-color-input;

        &:after {
          display: none;
        }
      }

      .xiala {
        width: 40px;
        height: 40px;
        top: 50%;
        margin-top: -20px;
        position: absolute;
        right: 10px;
      }
    }

    .step-one {
      margin-top: 0.85333rem;
    }

    .retrievePassword {
      .aagames-button-box {
        padding: 0;

        .dark {
          background: #353435;
          color: #fff;
          border: 0;
        }
      }

      .mode {
        p {
          color: #333;
          font-size: 26px;
          margin-top: 60px;
          margin-bottom: 20px;
          margin-left: 20px;
        }

        .jiantou {
          position: relative;
          // display: flex;
          label {
            position: absolute;
            top: 50%;
            left: 15px;
            transform: translateY(-50%);
          }

          input {
            width: 100%;
            padding: 0.2rem;
            padding-right: 1rem;
            border: none;
            // background-color: #090705;
            color: #8e9ab5;
            font-size: 26px;
            // border-bottom: 1px solid #8E9AB5;
            text-align: right;
          }

          .icon {
            position: absolute;
            top: 50%;
            right: 0;
            transform: translateY(-50%);
          }
        }
      }

      .van-cell {
        padding: 20px 40px;
        font-size: 28px;
        line-height: 45px;

        > * {
          align-self: center;
        }
      }

      .verification {
        margin-top: 30px;

        p {
          color: @primary-text-color;
          font-size: 28px;
          font-weight: 600;
          // margin-left: 40px;
          span {
            color: #969696;
          }
        }

        .code {
          position: relative;
          margin-top: 10px;
          display: flex;

          .img {
            margin-left: 20px;
            width: 44px;
          }

          .send {
            margin-left: 26px;
            width: 220px;
            height: 88px;
            border-radius: 8px;
            // border: 2px solid @border-color-base;
            line-height: 1.2;
            text-align: center;
            color: @primary-color;
            font-size: 28px;
            display:flex;
            justify-content: center;
            align-items: center;
            // border-left: 1px solid #8E9AB5;
          }
        }

        input {
          height: 100%;
          // line-height: 88px;
          border-radius: 8px;
          flex: 1;
          border: none;
          // background-color: #090705;
          color: #fff;
          font-size: 32px;
          // border-bottom: 1px solid #8E9AB5;
        }
      }

      button {
        margin: 50px auto 0;
      }
    }

    .reset {
      p {
        color: #c5cfd6;
        font-size: 26px;
        // margin-left: 40px;
      }

      input {
        width: 100%;
        /*padding: 20px 40px;*/
        border: none;
        // background-color: #090705;
        color: #fff;
        font-size: 32px;
        // border-bottom: 1px solid #8E9AB5;
      }

      .dark {
        // margin: 40px auto 0;
      }

      .aagames-button-box {
        padding: 0;
      }
    }
  }

  .pop {
    width: 80%;
    padding: 40px;

    .title {
      color: #222222;
      font-size: 36px;
    }

    span {
      display: block;
      color: #222222;
      font-size: 32px;
      margin: 20px;
      line-height: 64px;
    }
  }
}
</style>
<template>
  <div class="container verify">
    <lheader
        :title="title"
        :isPopup="true"
        :kefu="true"
        :step="step"
        :isLogin="login"
        @goback="close"
    ></lheader>
    <div class="main">
      <SecurityStep :step="step" :type="routeType == 'withdraw'?3:2" v-if="step < 10"/>
      <!-- 验证身份第一步，输入账号名称 -->
      <div v-if="step === 1">
        <div class="aagames-form">
          <div class="input username">
            <img class="img" v-if="aoMenUi.includes($projectname)" style="margin-right: 6px;"
                 :src="require('../../assets/loginIcon/user@2x.png')" alt/>
            <img class="img" v-else style="margin-right: 6px;" :src="require('@assets/img3_0/otherIcon/user@2x.png')"
                 alt/>
            <input type="text" v-model="username"  :placeholder="$t('请输入账户名或手机号')"/>
          </div>
        </div>
        <div class="aagames-button-box step-one">
          <button class="aagames-button dark" type="button" @click="checkUserInfo">{{$t('下一步')}}</button>
        </div>
      </div>
      <!-- 没有绑定手机邮箱 -->
      <div v-if="step === 10" class="no-binding">
        <div class="msg">{{$t('由于您未绑定手机号')}}</div>
        <div class="aagames-button-box">
          <button class="aagames-button dark" type="button" @click="bindMsg">{{$t('绑定资料')}}</button>
          <div class="px30"></div>
          <button class="aagames-button dark" type="button" @click="$openKefu">{{$t('在线客服解决')}}</button>
        </div>
      </div>
      <div class="retrievePassword" v-else-if="step === 2">
        <template v-if="selectWay">
          <div class="aagames-form verification">
            <p>
              <span>{{$t('验证方式')}}</span>
            </p>
            <div class="input" @click="showWay = true">
              <img class="xiala" style="margin-right: 6px;" :src="require('@assets/img3_0/otherIcon/xiala@2x.png')"
                   alt/>
              <input type="text" disabled v-model="selectWay.text"  :placeholder="$t('请选择验证方式')"/>
            </div>
          </div>
          <!--<van-cell  :title="$t('请选择验证方式')" @click="show = true" is-link v-model="selectWay.text" />-->
          <div class="aagames-form verification" v-show="selectWay.type === 'mobile'">
            <p>
              <span>{{$t('已绑定手机')}}</span>
              {{ userSafeinfo.mobile }}
            </p>
            <div class="code">
              <div class="input">
                <img class="img" v-if="aoMenUi.includes($projectname)" style="margin-right: 6px;"
                     :src="require('../../assets/loginIcon/mbwt@2x.png')" alt/>
                <img class="img" v-else style="margin-right: 6px;"
                     :src="require('@assets/img3_0/otherIcon/mbwt@2x.png')" alt/>
                <input type="text" v-model="code"  :placeholder="$t('请输入验证码')"/>
              </div>

              <div
                  class="send"
                  :style="{width:content.length > 5?'5rem':''}"
                  @click="countDown"
              >{{ content }}
              </div>
            </div>
          </div>
          <div class="aagames-form verification" v-show="selectWay.type === 'email'">
            <p>
              <span>{{$t('已绑定邮箱')}}</span>
              {{ userSafeinfo.email }}
            </p>
            <div class="code">
              <div class="input">
                <img class="img" v-if="aoMenUi.includes($projectname)" style="margin-right: 6px;"
                     :src="require('../../assets/loginIcon/mbwt@2x.png')" alt/>
                <img class="img" v-else style="margin-right: 6px;"
                     :src="require('@assets/img3_0/otherIcon/mbwt@2x.png')" alt/>
                <input type="text" v-model="code"  :placeholder="$t('请输入验证码')"/>
              </div>
              <div class="send" @click="countDown">{{ content }}</div>
            </div>
          </div>
          <div class="aagames-form verification" v-show="selectWay.type === 'question'">
            <p>
              <span>{{$t('密保问题')}}</span>
              {{ question.name }}
            </p>
            <div class="code">
              <div class="input">
                <input v-model="answer" type="text"  :placeholder="$t('请输入答案')"/>
              </div>
            </div>
          </div>
          <div class="aagames-button-box">
            <button :class="['aagames-button',{'dark':!code && !answer }]" type="button" :disabled="!code && !answer"
                    @click="forgetFn" v-if="$projectname==='10030'||$projectname === '10061'">{{$t('下一步')}}
            </button>
            <button :class="['aagames-button',{'dark':!code && !answer }]" type="button" @click="forgetFn" v-else>
              {{$t('下一步')}}
            </button>
          </div>
        </template>
      </div>

      <div class="reset" v-else-if="step === 3">
        <!-- <div class="newPass aagames-form">
          <p>{{$t('请输入新登录密码')}}</p>
          <div class="input">
            <img class="img" style="margin-right: 6px;" :src="require('@assets/img3_0/otherIcon/pass@2x.png')" alt />
            <input type="password" v-model="password" placeholder="8-12位字符，由数字、字母、符号组成" />
          </div>
        </div>
        <div class="confirmPass aagames-form">
          <p>{{$t('确认新密码')}}</p>
          <div class="input">
            <img class="img" style="margin-right: 6px;" :src="require('@assets/img3_0/otherIcon/pass@2x.png')" alt />
            <input type="password" v-model="repassword"  :placeholder="$t('请再次输入密码')" />
          </div>
        </div>-->
        <template v-if="routeType == 'withdraw'">
          <div class="input-cells">
            <div class="aagames-form">
              <p class="label-text">{{$t('请输入新资金密码')}}</p>
              <van-password-input
                  :value="setPassData.password"
                  @focus="changeKeyboard(1)"
                  :focused="showKeyboard1"
                  :length="6"
                  gutter="11"
              />
            </div>
          </div>
          <div class="input-cells">
            <div class="aagames-form">
              <p class="label-text">{{$t('确认新资金密码')}}</p>
              <van-password-input
                  :value="setPassData.repassword"
                  @focus="changeKeyboard(2)"
                  :focused="showKeyboard2"
                  :length="6"
                  gutter="11"
              />
            </div>
          </div>
        </template>
        <template v-else>
          <div class="input-cells">
            <div class="aagames-form">
              <p>{{$t('密保问题')}}</p>
              <div class="select">
                <img class="xiala" style="margin-right: 6px;" :src="require('@assets/img3_0/otherIcon/xiala@2x.png')"
                     alt/>
                <input
                    type="text"
                    v-model="problem"
                    readonly
                    @click="show = true"
                    class="centre"
                     :placeholder="$t('请选择密保问题')"
                />
              </div>
            </div>
          </div>
          <div class="input-cells">
            <div class="aagames-form">
              <p>{{$t('密保答案')}}</p>
              <div class="input">
                <input type="text" v-model="setAnswer.answer"  :placeholder="$t('请输入密保答案')"/>
              </div>
            </div>
          </div>
          <div class="input-cells">
            <div class="aagames-form">
              <p>{{$t('确认密保答案')}}</p>
              <div class="input">
                <input type="text" v-model="setAnswer.re_answer"  :placeholder="$t('请再次输入密保答案')"/>
              </div>
            </div>
          </div>
        </template>

        <div v-show="routeType != 'withdraw'" class="aagames-button-box">
          <button type="button"
                  :class="['aagames-button',{'dark':routeType == 'withdraw'?(!setPassData.password || !setPassData.repassword):(!setAnswer.answer || !setAnswer.re_answer || !problem)}]"
                  :disabled="routeType == 'withdraw'?(!setPassData.password || !setPassData.repassword):(!setAnswer.answer || !setAnswer.re_answer || !problem)"
                  v-if="$projectname==='10030'||$projectname === '10061'" @click="submit">{{$t('完成')}}
          </button>
          <button type="button"
                  :class="['aagames-button',{'dark':routeType == 'withdraw'?(!setPassData.password || !setPassData.repassword):(!setAnswer.answer || !setAnswer.re_answer || !problem)}]"
                  v-else @click="submit">{{$t('完成')}}
          </button>
        </div>
      </div>
      <!-- 校验下拉 -->
      <van-popup get-container="#app" v-model="show" position="bottom">
        <van-picker
            show-toolbar
            value-key="name"
            @confirm="onConfirm"
            @cancel="onCancel"
            :columns="questionList"
        />
      </van-popup>
      <van-popup get-container="#app" v-model="showWay" position="bottom">
        <van-picker show-toolbar @confirm="onConfirmWay" @cancel="onCancel" :columns="vertifyWays"/>
      </van-popup>
    </div>
    <van-number-keyboard
        safe-area-inset-bottom
        :show="showKeyboard"
        @input="onInput"
        @delete="onDelete"
        @blur="blurKeyboard"
        @hide="hideKeyboard"
    />
  </div>
</template>

<script>
import Lheader from "@/components/l-header";
import SecurityStep from "@/components/security-step";
import {
  forgetpass,
  forgetpasscode,
  forgetpassemailcode,
  forgetpassemailcodecheck,
  forgetpasssmscode,
  forgetsafequestion,
  passquestion,
  setpassquestion
} from "@/api/personalData";
import {setpaypass} from "@/api/memberCenter";
import Vue from "vue";
import {Toast} from "vant";

Vue.use(Toast);

export default {
  name: "ForgetPassword",
  data() {
    return {
      login: "",
      title: this.$t('身份验证'),
      active: 0,
      isAgree: true,
      show: false,
      showWay: false,
      retrieve: true,
      step: 2,
      username: "",
      userSafeinfo: {},
      vertifyWays: [],
      selectWay: {},
      questionList: null,
      question: "",
      answer: "",
      forgetpassList: {},
      errorShow: false,
      code: "",
      getCode: "",
      password: "",
      repassword: "",
      canClick: true,
      totalTime: 60,
      clock: "",
      content: this.$t('获取验证码'),
      setAnswer: {
        question_id: "",
        answer: "",
        re_answer: ""
      },
      problem: "",
      stepType: 2,
      type: 0,
      showKeyboard: false,
      showKeyboard1: false,
      showKeyboard2: false,
      setPassData: {
        password: "",
        repassword: "",
        old_password: "",
        is_reset: 1
      },
      aoMenUi: ['10009', '10010', '10011', '10012', '10034']
    };
  },
  props: {
    userInfo: {
      type: Object,
      default: {}
    },
    routeType: {
      type: String,
      default: "memberCenter"
    }
  },
  components: {
    Lheader,
    SecurityStep
  },
  created() {
    passquestion().then(res => {
      if (res.data.code === 0) {
        console.log(res.data)
        this.questionList = res.data.data;
        this.checkUserInfo()
      }
    });
  },
  watch: {
    step(step) {
      if (this.routeType == "withdraw") {
        const maps = ["", this.$t('身份验证'), this.$t('设置新资金密码')];
        this.title = maps[step - 1];
      } else {
        const maps = ["", this.$t('身份验证'), this.$t('设置新密保问题')];
        this.title = maps[step - 1];
      }
    },
    routeType(val) {
      console.log(val)
      if (val == "withdraw") {
        this.stepType = 3;
      } else {
        this.stepType = 2;
      }
    }
  },
  methods: {
    close() {
      console.log(this.step);
      if (this.step > 2) {
        this.step = this.step - 1;
      } else {
        // this.$emit("input", false);
        this.$store.dispatch("global/setPopShow", {status: false, hideFooter: true});
      }
    },
    checkUserInfo() {
      // if (!this.username) {
      //   Toast.fail(this.$t('请输入账户名或手机号'));
      //   return false;
      // }
      forgetpass({
        merchant_no: process.env.VUE_APP_MERCHANT_NO,
        username: this.userInfo.username
      }).then(res => {
        if (res.data.code === 0) {
          this.userSafeinfo = res.data.data;
          const {mobile, email, pass_question_id} = this.userSafeinfo;
          if (!mobile && !email && !pass_question_id) {
            this.errorShow = true;
            this.step = 10;

            return false;
          }
          this.vertifyWays = [];

          let num = 0;
          // 判断是否有下拉校验
          if (mobile) {
            this.vertifyWays.push({
              text: this.$t('手机号验证'),
              type: "mobile"
            });
          }
          if (email) {
            this.vertifyWays.push({
              text: this.$t('邮箱验证'),
              type: "email"
            });
          }
          if (pass_question_id) {
            this.vertifyWays.push({
              text: this.$t('密保验证'),
              type: "question"
            });

            for (let i = 0; i < this.questionList.length; i++) {
              if (this.questionList[i].id === pass_question_id) {
                this.question = this.questionList[i];
                break;
              }
            }
          }

          if (this.vertifyWays.length) {
            this.selectWay = this.vertifyWays[0];
            this.step = 2;
          }
        }
      });
    },
    forgetFn() {
      const data = {
        merchant_no: process.env.VUE_APP_MERCHANT_NO,
        uid: this.userSafeinfo.id
      };
      const {answer, code, question} = this;
      const type = this.selectWay.type;
      let request;
      if (type === "question") {
        if (!answer) {
          this.$toast.fail(this.$t('请输入密保问题答案'));
        }
        Object.assign(data, {
          pass_question_id: question.id,
          pass_answer: answer
        });
        request = forgetsafequestion(data);
      } else {
        if (!code) {
          this.$toast.fail(this.$t('请输入验证码'));
          return false;
        }
        // if (code !== this.getCode) {
        //   Toast(this.$t('验证码输入有误'))
        //   return false;
        // }
        Object.assign(data, {
          code,
          phone_area_code: this.userSafeinfo.phone_area_code
        });
        if (type === "mobile") {
          request = forgetpasscode(data);
        } else if (type === "email") {
          request = forgetpassemailcodecheck(data);
        }
      }
      if (request) {
        request.then(res => {
          if (res.data.code === 0) {
            this.step = 3;
          } else {
            Toast(res.data.msg);
          }
        });
      }
    },
    onConfirm(value) {
      console.log(value);
      this.problem = value.name;
      this.setAnswer.question_id = value.id;
      this.show = false;
    },
    onConfirmWay(val) {
      console.log(val);
      this.selectWay = val;
      this.content = this.$t('获取验证码');
      this.canClick = true;
      window.clearInterval(this.clock);
      this.totalTime = 60;
      this.showWay = false;
    },
    onCancel(val) {
      this.show = false;
      this.showWay = false;
    },
    phoneCode() {
      forgetpasssmscode({
        merchant_no: process.env.VUE_APP_MERCHANT_NO,
        uid: this.userSafeinfo.id,
        phone_area_code: this.userSafeinfo.phone_area_code
      }).then(res => {
        if (res.data.code == 0) {
          this.getCode = res.data.data.code;
        } else {
          this.$toast.fail(res.data.msg);
          window.clearInterval(this.clock);
          this.content = this.$t('重新发送验证码');
          this.totalTime = 60;
          this.canClick = true; //这里重新开启
        }
      });
    },
    emailCode() {
      forgetpassemailcode({
        merchant_no: process.env.VUE_APP_MERCHANT_NO,
        uid: this.userSafeinfo.id
      }).then(res => {
        if (res.data.code == 0) {
          this.getCode = res.data.data.code;
        } else {
          Toast(res.data.msg);
          window.clearInterval(this.clock);
          this.content = this.$t('重新发送验证码');
          this.totalTime = 60;
          this.canClick = true; //这里重新开启
        }
      });
    },
    countDown() {
      if (!this.canClick) return; //改动的是这两行代码
      this.canClick = false;
      if (this.selectWay.type === "mobile") {
        this.phoneCode();
      } else {
        this.emailCode();
      }
      this.content = this.totalTime + this.$t('秒后重新发送');
      this.clock = window.setInterval(() => {
        this.totalTime--;
        this.content = this.totalTime + this.$t('秒后重新发送');
        if (this.totalTime < 0) {
          window.clearInterval(this.clock);
          this.content = this.$t('重新发送验证码');
          this.totalTime = 60;
          this.canClick = true; //这里重新开启
        }
      }, 1000);
    },
    onInput(key) {
      if (this.type === 0) {
        this.setPassData.old_password = (
            this.setPassData.old_password + key
        ).slice(0, 6);
      } else if (this.type === 1) {
        this.setPassData.password = (this.setPassData.password + key).slice(
            0,
            6
        );
      } else {
        this.setPassData.repassword = (this.setPassData.repassword + key).slice(
            0,
            6
        );
      }
    },
    onDelete() {
      if (this.type === 0) {
        this.setPassData.old_password = this.setPassData.old_password.slice(
            0,
            this.setPassData.old_password.length - 1
        );
      } else if (this.type === 1) {
        this.setPassData.password = this.setPassData.password.slice(
            0,
            this.setPassData.password.length - 1
        );
      } else {
        this.setPassData.repassword = this.setPassData.repassword.slice(
            0,
            this.setPassData.repassword.length - 1
        );
      }
    },
    changeKeyboard(val, e) {
      this.showKeyboard = true
      this.type = val;
      this.$emit("changPass", true);
      if (val == 1) {
        this.showKeyboard1 = true
        this.showKeyboard2 = false
      } else {
        this.showKeyboard2 = true
        this.showKeyboard1 = false
      }
    },
    blurKeyboard() {
      this.showKeyboard = false;
      this.$emit("changPass", false);
    },
    hideKeyboard() {
      this.submit()
      // this.step = 3
      // this.$store.dispatch("global/setPopShow", { status: true, idDisplay: true });
    },
    submit() {
      if (this.routeType == "withdraw") {
        this.saveCapitalPassword()
      } else {
        this.savePassProblem()
      }
    },
    savePassProblem() {
      if (!this.setAnswer.answer) {
        this.$toast.fail(this.$t('答案不能为空'));
        return false;
      }

      if (this.setAnswer.answer !== this.setAnswer.re_answer) {
        this.$toast.fail("2次输入答案不同");
        return false;
      }

      setpassquestion(this.setAnswer).then(res => {
        let that = this;
        if (res.data.code === 0) {
          Toast({
            message: this.$t('密保设置成功'),
            onClose() {
              that.$store.dispatch("users/getUserInfo");
              that.$store.dispatch("global/setPopShow", {status: false});
            }
          });
        } else {
          this.$toast.fail(res.data.msg);
        }
      });
    },
    saveCapitalPassword() {
      if (
          this.setPassData.password.length < 6 ||
          this.setPassData.repassword.length < 6 ||
          (this.setPassData.old_password.length < 6 &&
              this.setPassData.old_password)
      ) {
        this.$toast.fail(this.$t('资金密码6个数字组成'));
        return false;
      }
      if (this.setPassData.password !== this.setPassData.repassword) {
        this.$toast.fail("2次输入密码不同");
        return false;
      }
      this.setPassData.access_token = window.localStorage.token;
      if (this.setPassType == 1) {
        this.setPassData.is_reset = 1;
      }

      setpaypass(this.setPassData).then(res => {
        const that = this;
        if (res.data.code === 0) {
          this.setPassType = 0;
          Toast({
            message: this.$t('资金密码设置成功'),
            onClose() {
              if (that.$route.query.getPath) {
                that.$router.push(that.$route.query.getPath);
              } else {
                that.$store.dispatch("users/getUserInfo");
                that.$store.dispatch("global/setPopShow", {status: false});
              }
            }
          });
        } else {
          this.$toast.fail(res.data.msg);
        }
      });
    },
    bindMsg() {
      this.$router.push('/personalData')
      this.$store.dispatch("global/setPopShow", {status: false});
    }
  }
};
</script>

