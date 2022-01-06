<template>
  <div :class="['drawer', $route.name === 'agent' || $route.name === 'moneyWithdraw' ? 'drawer-agent' : '']">
    <div class="pop-head">
      <h2>{{$t('绑定手机号')}}</h2>
    </div>
    <p v-if="$route.name == 'memberCenter'">
      {{$t('为了保障你的资金安全')}}
    </p>
    <p v-else>{{$t('为了保障您的账号安全')}}</p>
    <div class="input-cells">
      <div class="aagames-form">
        <div class="input">
          <phoneArea v-model="areaCode">
            <i class="areaNum">
              &nbsp;+{{ areaCode }}
              <img
                class="xiala"
                :src="require('@assets/img3_0/otherIcon/xiala@2x.png')"
                alt
              />
            </i>
          </phoneArea>
          <input
            type="text"
            v-model="phone"
             :placeholder="$t('请填写您的手机号码')"
          />
        </div>
      </div>
    </div>
    <div class="input-cells">
      <gcode
        :bind="true"
        :areaCode="areaCode"
        :account="phone"
        @getCode="getCodeC"
        @myCode="myCodeC"
      ></gcode>
    </div>
    <div class="input-cells">
      <div class="aagames-button-box">
        <button
          class="aagames-button aagames-button-default"
          type="button"
          @click="closeByButton"
        >
          {{$t('暂不绑定')}}
        </button>
        <button class="aagames-button scuss" type="button" @click="send">
          {{$t('确定')}}
        </button>
      </div>
    </div>
    <van-popup v-model="show" position="bottom">
      <van-picker
        show-toolbar
        @confirm="onConfirm"
        value-key="text"
        @cancel="onCancel"
        :columns="columns"
      />
    </van-popup>
  </div>
</template>

<script>
import Gcode from '../g-code'
import { isnum } from '@/utils/index'
import { Toast } from 'vant'
import { bindmobile } from '@/api/personalData'
import { agbindmobile } from '@/api/agent'
import { phonearea } from '@/api/login'
export default {
  props: ['userInfo'],
  data() {
    return {
      phone: this.userInfo.mobile || '',
      getCode: '',
      code: '',
      areaCode: 86,
      columns: [],
      show: false,
    }
  },
  created() {
    phonearea().then((res) => {
      if (res.data.code === 0) {
        this.columns = res.data.data
      }
    })
  },
  components: {
    Gcode,
  },
  mounted() {},
  methods: {
    closeByButton() {
      this.$store.dispatch('global/setPopShow', {
        status: false,
        hideFooter: true,
      })
      if (this.$route.name !== 'personalData' && this.$route.name !== 'agent' && this.$route.name !== 'moneyWithdraw') {
        // this.$router.push('/withdraw')
        this.$store.dispatch('global/setFlow', true)
      }
    },
    getCodeC(val) {
      this.getCode = val
    },
    myCodeC(val) {
      this.code = val
    },
    send() {
      if (!isnum(this.phone)) {
        Toast.fail(this.$t('手机格式有误'))
        return false
      }
      if (!this.code) {
        Toast.fail(this.$t('验证码不能为空'))
        return false
      }
      let req = ''
      if (this.$route.name === 'agent' || this.$route.name === 'moneyWithdraw') {
        req = agbindmobile
      } else {
        req = bindmobile
      }
      req({
        mobile: this.phone,
        code: this.code,
        phone_area_code: this.areaCode,
        access_token:
          (this.$route.name === 'agent' || this.$route.name === 'moneyWithdraw')
            ? window.localStorage.agToken
            : window.localStorage.token,
      }).then((res) => {
        if (res.data.code === 0) {
          const self = this
          Toast({
            message: this.$t('绑定成功'),
            onClose() {
              if (self.$route.name === 'agent' || self.$route.name === 'moneyWithdraw') {
                self.Emit.$emit('agentSet')
                self.Emit.$emit('user')

                // console.log(this.Emit)
                self.$store.dispatch('global/setPopShow', { status: false })
              } else {
                self.$store.dispatch('users/getUserInfo')
                self.$store.dispatch('global/setPopShow', { status: false })
                if (self.$route.name == 'memberCenter') {
                  self.$router.push('/withdraw')
                }
              }
            },
          })
          // console.log(this.$parent.$parent.$children[8].$children)
        } else {
          Toast(res.data.msg)
        }
      })
    },
    onConfirm(val) {
      this.show = false
      this.areaCode = val
    },
    onCancel(val) {
      this.show = false
    },
  },
}
</script>

<style lang="less" scoped>
.drawer-agent {
  background: #282828;
  .pop-head {
    color: #fff ;
  }
  .aagames-form .input,
  /deep/.aagames-form .input {
    background: #191919 ;
    input {
      background: #191919 ;
    }
    .areaNum {
      border-right-color: #202020 ;
    }
  }
  /deep/ .send-sms {
    color: #fff;
    border-left: 2px solid #202020 ;
    background: #353435 ;
  }
  .input-cells .aagames-button-box {
    .aagames-button-default {
      background: #353435 ;
      border: none;
    }
    .scuss {
      background: #c3a884 ;
      color: #000 ;
    }
  }
}
.drawer {
  p {
    text-align: center;
    font-size: 28px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #666666;
    margin-top: 40px;
    margin-bottom: 40px;
  }
  .input-cells {
    // .input {
    //   background: #EDEFF6;
    //   input {
    //     background: #EDEFF6;
    //   }
    // }
    // #g-code {
    //   .phone, .input input {
    //     background: #EDEFF6!important;
    //   }
    // }
    .aagames-button {
      width: 320px;
    }
  }
}
</style>
