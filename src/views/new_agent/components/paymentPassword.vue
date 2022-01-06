<template>
  <van-popup v-model="paymentPasswordVisible" position="bottom" :class="{'keyboardUp':showKeyboard}">
    <div class="emailPop">
      <van-icon @click="cancel()" class="close-btn" name="cross" color="#fff" size="20px"/>
      <div class="title">{{ userInfo.pay_password ? $t('修改支付密码') : $t('设置支付密码') }}</div>
      <div class="containerPop">
        <!--        <input type="password" v-if="userInfo.pay_password!==null" v-model="password.old_password"-->
        <!--                :placeholder="$t('请输入旧资金密码')"/>-->
        <!--        <input type="password" v-model="password.password" :placeholder="'请输入6位纯数字的资金密码'"/>-->
        <!--        <input type="password" v-model="password.repassword"  :placeholder="$t('请再次输入资金密码')"/>-->
        <p v-if="userInfo.pay_password!==null">{{$t('请输入旧资金密码')}}</p>
        <van-password-input
            v-if="userInfo.pay_password!==null"
            :value="password.old_password"
            :focused="inputIndex === 'old_password'"
            :gutter="10"
            @focus="handleShowKeyboard('old_password')"/>
        <p>{{$t('请输入')}}</p>
        <van-password-input
            :value="password.password"
            :focused="inputIndex === 'password'"
            :gutter="10"
            @focus="handleShowKeyboard('password')"/>
        <p>{{$t('请再次输入资金密码')}}</p>
        <van-password-input
            :value="password.repassword"
            :focused="inputIndex === 'repassword'"
            :gutter="10"
            @focus="handleShowKeyboard('repassword')"/>
        <van-number-keyboard
            v-model="password[inputIndex]"
            :show="showKeyboard"
            :maxlength="6"
            @blur="showKeyboard = false"/>
        <div class="flex" style="height: .5rem;"/>
        <!--          <button class="cancel" @click="cancel">{{$t('取消')}}</button>-->
        <!--          <button class="submitBtn" @click="submitPayment">{{$t('提交')}}</button>-->
      </div>
    </div>
  </van-popup>
</template>
<script>
import popup from '../../activity/wheelSurf/popup'
import {setpaypass} from '@/api/agent'

export default {
  props: ['paymentPassword', 'userInfo'],
  components: {popup},
  data() {
    return {
      password: {
        old_password: '',
        password: '',
        repassword: '',
      },
      showKeyboard: false,
      // userInfo:JSON.parse(window.localStorage.getItem('userInfo'))
      inputIndex: '',
    }
  },
  computed: {
    paymentPasswordVisible() {
      return this.paymentPassword
    }
  },
  watch: {
    password: {
      handler() {
        if (this.password.password.length === 6 && this.password.repassword.length === 6) {
          this.submitPayment();
          return;
        }

        switch (this.inputIndex) {
          case "old_password":
            if (this.password.old_password.length === 6) {
              this.inputIndex = 'password'
            }
            break;
          case "password":
            if (this.password.password.length === 6) {
              this.inputIndex = 'repassword'
            }
            break;
        }
      },
      deep: true
    }
  },
  methods: {
    handleShowKeyboard(index) {
      this.showKeyboard = true;
      this.inputIndex = index;
    },
    cancel() {
      this.$emit('cancel', false)
    },
    submitPayment() {
      if (
          this.password.password.length < 6 ||
          this.password.repassword.length < 6 ||
          (this.password.old_password.length < 6 &&
              this.password.old_password)
      ) {
        this.$toast.fail(this.$t('资金密码由6个数字组成'));
        return false;
      }

      if (this.password.password !== this.password.repassword) {
        this.$toast.fail(this.$t('您两次输入资金密码不同'));
        return false;
      }
      setpaypass(this.password).then((res) => {
        if (res.data.code === 0) {
          this.$toast.fail(this.$t('资金密码设置成功'));
          this.password.repassword = ''
          this.$emit('user');
          this.$emit('cancel', false)
        }
      })
    }
  }
}
</script>
<style scoped lang="less">

.keyboardUp {
  height: 80%;
}

.emailPop,
.phonePop {
  width: 100%;
  background: #282828;
  border-radius: 0.2rem;
  position: relative;
  height: 100%;

  .close-btn {
    position: absolute;
    right: 50px;
    margin-top: 35px;
  }

  .title {
    color: #f5f5f5;
    font-size: 0.48rem;
    text-align: center;
    border-bottom: 1px solid #343434;
    padding: 0.5rem 0;
  }

  .containerPop {
    width: 90%;
    margin: 0.3rem auto 0;

    p {
      font-size: 28px;
      color: #fff;
      line-height: 80px;
    }

    .flex {
      display: flex;
      justify-content: space-between;
      //align-items: center;
    }

    input {
      width: 100%;
      height: 1.12rem;
      border: 1px solid #505050;
      border-radius: 0.2rem;
      background: none;
      margin-bottom: 0.3rem;
      padding-left: 0.2rem;
      color: #fff;
    }

    .inp {
      width: 65%;
    }

    .codeBtn {
      background: none;
      border: 1px solid #c8a77f;
      color: #c8a77f;
      font-size: 0.37rem;
      height: 1.1rem;
      border-radius: 0.2rem;
    }

    .cancel,
    .submitBtn {
      background: none;
      border: 1px solid #c8a77f;
      color: #c8a77f;
      font-size: 0.37rem;
      height: 1.1rem;
      width: 3.2rem;
      border-radius: 0.2rem;
      margin-top: 0.3rem;
      margin-bottom: 0.5rem;
    }

    .submitBtn {
      background: #c8a77f;
      color: #191919;
      border: none;
    }

    .p-text {
      color: #ccc;
      font-size: 0.37rem;
      margin: 0.2rem 0;
    }

    .promote {
      color: #ccc;
      font-size: 0.37rem;
      align-items: center;
      margin: 0.2rem 0;

      .check {
        width: 0.5rem;
        height: 0.5rem;
      }

      .iconfont {
        font-size: 0.6rem;
        vertical-align: middle;
      }

      .icon-activityweixin {
        color: #0db807;
      }

      .icon-activityQQhaoma {
        color: #18acfc;
      }

      .icon-activitySkype {
        color: #00aff0;
      }
    }
  }
}
</style>
