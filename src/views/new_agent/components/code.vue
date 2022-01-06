<template>
  <div id="g-code">
    <div class="input iphone">
      <!-- <i v-if="withIcon" class="iconfont icon-safety"></i> -->
      <!--      <template v-if="agUi"><img class="code-icon img" :src="$imgs['login/code@2x']" alt=""> |</template>-->
      <input type="text" v-model="myCode" class="sryzm"  :placeholder="$t('请输入验证码')">
    </div>
    <button class="send-sms" :disabled="!canClick" @click="countDown"><span :class="{'shrink':lang==='en'}">{{ content }}</span></button>
  </div>
</template>

<script>
import Vue from 'vue'
import {ismail, isnum} from '@/utils/index'
import {Toast} from 'vant'
import {smscode} from '@/api/login'
import {getEmailcode} from '@/api/agent'



Vue.use(Toast);

export default {
  name: "g-code",
  data() {
    return {
      content: this.$t('获取验证码'),  // 按钮里显示的内容
      time: 60,
      totalTime: this.time,
      canClick: true,
      getCode: '',
      myCode: '',
      clock: '',
      agUi: ['10030', '10061'].includes(process.env.VUE_APP_PROJECT_NAME)
    }
  },
  props: {
    withIcon: {
      type: Boolean,
      default: false
    },
    withLabel: {
      type: Boolean,
      default: true
    },
    account: {
      default: '',
      type: String
    },
    bind: {
      type: Boolean,
      default: true
    },
    areaCode: {
      type: Number,
      default: 86
    },
    updateType: {
      type: Boolean,
      default: false
    }
  },
  created() {
    console.log(this.updateType);
    if (this.updateType) {
      this.time = 180
    }
  },
  methods: {
    countDown() {
      if (this.updateType) {
        if (!ismail(this.account)) {
          Toast.fail(this.$t('请输入正确的邮箱地址'))
          return false
        }
      } else {
        if (!isnum(this.account)) {
          Toast.fail(this.$t('手机格式有误'));
          return false;
        }
      }
      this.totalTime = this.time
      if (!this.canClick) return  //改动的是这两行代码
      this.canClick = false
      this.send()
      this.content = this.$t('重新获取') + this.totalTime
      this.clock = window.setInterval(() => {
        this.totalTime--
        this.content = this.$t('重新获取') + this.totalTime
        if (this.totalTime < 0) {
          window.clearInterval(this.clock)
          this.content = this.$t('重新获取')
          this.totalTime = this.time
          this.canClick = true  //这里重新开启
        }
      }, 1000)
    },
    send() {
      if (this.updateType) {
        getEmailcode({
          merchant_no: process.env.VUE_APP_MERCHANT_NO,
          email: this.account,
          access_token: window.localStorage.token
        }).then(res => {
          if (res.data.code == 0) {
            this.getCode = res.data.data.code;
          } else {
            Toast(res.data.msg);
            window.clearInterval(this.clock)
            this.content = this.$t('重新获取')
            this.totalTime = this.time
            this.canClick = true  //这里重新开启
          }
        })
      } else if (this.bind) {
        let request = ''
        request = smscode
        request({
          merchant_no: process.env.VUE_APP_MERCHANT_NO,
          mobile: this.account,
          phone_area_code: this.areaCode,
          access_token: window.localStorage.agToken
        }).then(res => {
          if (res.data.code == 0) {
            this.getCode = res.data.data.code;
          } else {
            Toast(res.data.msg);
            window.clearInterval(this.clock)
            this.content = this.$t('重新获取')
            this.totalTime = this.time
            this.canClick = true  //这里重新开启
          }
        })
      } else {
        let request = ''
        request = smscode
        request({
          merchant_no: process.env.VUE_APP_MERCHANT_NO,
          mobile: this.account,
          phone_area_code: '+' + this.areaCode,
          access_token: window.localStorage.agToken
        }).then(res => {
          if (res.data.code == 0) {
            this.getCode = res.data.data.code;
          } else {
            Toast(res.data.msg);
            window.clearInterval(this.clock)
            this.content = this.$t('重新获取')
            this.totalTime = this.time
            this.canClick = true  //这里重新开启
          }
        })
      }

    },
  },
  watch: {
    getCode(val) {
      this.$emit('getCode', val);
    },
    myCode(val) {
      this.$emit('myCode', val);
    },
    account(val) {
      this.account = val
    }
  }
}
</script>

<style scoped lang="less">

.send-sms {
  width: 180px;
  height: 70px;
  border-radius: 10px;
  border: 1px solid @primary-color;
  position: absolute;
  right: 9px;
  top: -15px;
  text-align: center;
  font-size: 0.37rem;
  color: @primary-color;
  line-height: 50px;
  background: none;
  padding: 0;
}

#g-code {
  position: relative;
  flex: 1;

  .sryzm {
    color: #ccc !important;
    background: none !important;
    border: none;
    float: left;
    text-align: left;
    margin-right: 140px;
  }

  .iphone1, .iphone1 input {
    background: #EDEFF6;
    color: #333;
  }

  .iphone1 input::placeholder {
    color: #98A4BD;
  }

  .iphone1 {
    span {
      margin-left: 20px;
      font-size: 28px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #333333;
    }
  }
  .shrink{
      transform: scale(0.8);
      transform-origin: center 2px;
      position: relative;
      display: inline-block;
      line-height: 1;
    }
}

.form1 {
  .send-sms {
    background: none !important;
    color: #FF7400;
  }
}

.input {
  input {
    border-radius: 8px;
  }

  button {
    height: 88px !important;
    line-height: 88px !important;
    color: #fff;
  }
}

</style>
