<template>
  <div
    id="g-code"
    class="aagames-form"
  >
    <div class="input iphone">
      <!-- <i v-if="withIcon" class="iconfont icon-safety"></i> -->
      <template v-if="agUi">
        <img
          class="code-icon img"
          :src="$imgs['login/code@2x']"
          alt=""
        />
        |
      </template>
      <!-- <template v-if="baijiUi"><span>验证码</span></template> -->
      <input
        type="text"
        v-model="myCode"
        class="sryzm"
        :placeholder="$t('请输入验证码')"
      />
    </div>
    <button
      class="right-button send-sms"
      :disabled="!canClick"
      @click="countDown"
    >
      {{ content }}
    </button>
  </div>
</template>

<script>
import Vue from 'vue'
import { ismail, isnum } from '@/utils/index'
import { Toast } from 'vant'
import { smscode } from '@/api/login'
import { setemail } from '@/api/personalData'
import { bindsmscode, membertranssmscode } from '@/api/agent'

Vue.use(Toast)

export default {
  name: 'g-code',
  data() {
    return {
      content: this.$t('获取验证码'), // 按钮里显示的内容
      time: 60,
      totalTime: this.time,
      canClick: true,
      getCode: '',
      myCode: '',
      clock: '',
      agUi: ['10030', '10061'].includes(process.env.VUE_APP_PROJECT_NAME),
    }
  },
  props: {
    withIcon: {
      type: Boolean,
      default: false,
    },
    withLabel: {
      type: Boolean,
      default: true,
    },
    account: {
      default: '',
      type: String,
    },
    bind: {
      type: Boolean,
      default: true,
    },
    areaCode: {
      type: Number,
      default: 86,
    },
    updateType: {
      type: Boolean,
      default: false,
    },
  },
  created() {
    console.log(this.updateType)
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
          Toast.fail(this.$t('手机格式有误'))
          return false
        }
      }
      this.totalTime = this.time
      if (!this.canClick) return //改动的是这两行代码
      this.canClick = false
      this.send()
      this.content = this.totalTime + this.$t('秒后重新发送')
      this.clock = window.setInterval(() => {
        this.totalTime--
        this.content = this.totalTime + this.$t('秒后重新发送')
        if (this.totalTime < 0) {
          window.clearInterval(this.clock)
          this.content = this.$t('重新发送验证码')
          this.totalTime = this.time
          this.canClick = true //这里重新开启
        }
      }, 1000)
    },
    send() {
      if (this.updateType) {
        setemail({
          merchant_no: process.env.VUE_APP_MERCHANT_NO,
          email: this.account,
          access_token: window.localStorage.token,
        }).then((res) => {
          if (res.data.code == 0) {
            this.getCode = res.data.data.code
          } else {
            Toast(res.data.msg)
            window.clearInterval(this.clock)
            this.content = this.$t('重新发送验证码')
            this.totalTime = this.time
            this.canClick = true //这里重新开启
          }
        })
      } else if (this.bind) {
        console.log(
          window.localStorage.token,
          window.localStorage.agToken,
          this.$route.name !== 'agent'
        )
        let request = ''
        if (this.$route.path === '/agMemberWithdraw') {
          request = membertranssmscode
        } else if (this.$route.name === 'agent') {
          request = bindsmscode
        } else {
          request = smscode
        }
        request({
          merchant_no: process.env.VUE_APP_MERCHANT_NO,
          mobile: this.account,
          phone_area_code: this.areaCode,
          access_token:
            this.$route.name === 'agent'
              ? window.localStorage.agToken
              : window.localStorage.token,
        }).then((res) => {
          if (res.data.code == 0) {
            this.getCode = res.data.data.code
          } else {
            Toast(res.data.msg)
            window.clearInterval(this.clock)
            this.content = this.$t('重新发送验证码')
            this.totalTime = this.time
            this.canClick = true //这里重新开启
          }
        })
      } else {
        let request = ''
        if (this.$route.path === '/agMemberWithdraw') {
          request = membertranssmscode
        } else {
          request = smscode
        }
        request({
          merchant_no: process.env.VUE_APP_MERCHANT_NO,
          mobile: this.account,
          phone_area_code: '+' + this.areaCode,
          access_token: window.localStorage.agToken,
        }).then((res) => {
          if (res.data.code == 0) {
            this.getCode = res.data.data.code
          } else {
            Toast(res.data.msg)
            window.clearInterval(this.clock)
            this.content = this.$t('重新发送验证码')
            this.totalTime = this.time
            this.canClick = true //这里重新开启
          }
        })
      }
    },
  },
  watch: {
    getCode(val) {
      this.$emit('getCode', val)
    },
    myCode(val) {
      this.$emit('myCode', val)
    },
    account(val) {
      this.account = val
    },
  },
}
</script>

<style scoped lang="less">
.en-wrap{
  .send-sms{
    width: 240px;
    right: 25px;
    white-space: initial;
    line-height: 1 !important;
  }
}
.send-sms {
  width: 220px;
  height: 88px;
  background: @bg-color-2;
  border-radius: 8px;
  // border: 2px solid @border-color-base;
  border: none;
  position: absolute;
  right: 30px;
  top: 10px;
  text-align: center;
  font-size: 28px;
  white-space: nowrap;
  color: #fff;
}

#g-code {
  position: relative;

  .input {
    // width:440px;
  }

  .right-button {
    top: 50%;
    margin-top: -34px;
    height: 68px;
    line-height: 68px;
    margin-right: 10px;
  }

  .iphone1,
  .iphone1 input {
    background: #edeff6;
    color: #333;
  }

  .iphone1 input::placeholder {
    color: #98a4bd;
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
}

.form1 {
  .send-sms {
    background: none !important;
    color: #ff7400;
  }
}

.input {
  background: none;

  input {
    border-radius: 8px;
    background: none !important;
  }

  button {
    height: 88px !important;
    line-height: 88px !important;
    color: #fff;
  }
}
</style>
