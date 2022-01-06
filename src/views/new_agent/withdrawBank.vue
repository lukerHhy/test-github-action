<template>
  <div class="container agMemberWithdraw">
    <lheader :title="title" :goback="true" :get-switch="false"></lheader>
    <div class="main">
      <div class="p_text">
        <span
            class="iconfont icon-gantanhao"
            style="    vertical-align: bottom;margin-right: 0.05rem"
        ></span>
        {{$t('请仔细核对银行卡信息，信息错误将导致提款失败。有疑问请联系')}}
        <span class="serve" @click="$openKefu">{{$t('在线客服')}}</span>
      </div>
      <div class="amount">
        <div class="register">
          <div class="reset">
            <div class="flex list">
              <p class="title">
                <span
                    class="iconfont icon-activityyinhangka"
                    style="font-size: 0.45rem"></span>
{{$t('请选择银行')}}
              </p>
              <BankcardList
                  style="flex: 1"
                  v-model="query.bank_id"
                  :bankText.sync="bankText">
                <input
                    type="text"
                    style="padding-right: 0"
                    v-model="bankText"
                    readonly
                    @click="show = true"
                     :placeholder="$t('请选择')"
                />
              </BankcardList>
              <van-icon name="arrow"/>
            </div>
          </div>
          <div class="reset">
            <div class="flex list">
              <div class="title">
                <span class="iconfont icon-activityketikuanyue"></span> <span class="lb">{{$t('提款金额')}}</span>
              </div>
              <input
                  type="text"
                  onkeyup="value=value.replace(/[^\d\.]/g,'')"
                  onblur="value=value.replace(/[^\d\.]/g,'')"
                  v-model="query.withdraw_money"
                  :placeholder="$t('单次提款金额需≥100元')"
              />
            </div>
            <van-number-keyboard
                safe-area-inset-bottom
                extra-key="."
                 :close-button-text="$t('完成')"
                v-model="query.withdraw_money"
                :show="keyboardshow"
                @blur="keyboardshow = false"
            />
          </div>
          <div class="reset">
            <div class="flex list">
              <div class="title">
                <span
                    class="iconfont icon-activitytikuanjine"
                    style="font-size: 0.5rem"></span>
<span class="lb">{{$t('可提款余额')}}</span>
              </div>
              <div class="money">{{ userInfoForAgent.commission_money }}</div>
            </div>
          </div>
          <div class="hidden-phone" v-if="!query.phone">
            <div class="reset">
              <div class="flex list">
                <div class="title">
                  <span class="iconfont icon-activityshoujihaoma"></span>
                  <div class="inline">{{$t('手机号')}}</div>
                </div>
                <span class="act" @click="openpop">{{$t('立即绑定')}}</span>
                <span class="iconfont icon-dayuhao"></span>
              </div>
            </div>
          </div>
          <div class="hidden-phone" v-else>
            <div class="reset">
              <div class="flex list">
                <p><span class="iconfont icon-activityshoujihaoma"></span><span class="lb">{{$t('绑定手机号')}}</span></p>
                <input type="text" v-model="query.phone" disabled/>
              </div>
            </div>
            <div class="reset">
              <div class="flex list">
                <p class="title" style="width: 30%">
                <span
                    class="iconfont icon-activityqingshurushoujiyanzhengma"
                ></span>
<span class="lb code">{{$t('验证码')}}</span>
                </p>
                <gcode
                    :account="query.phone"
                    :withLabel="false"
                    :withIcon="false"
                    :areaCode="areaCode"
                    @getCode="getCodeC"
                    @myCode="myCodeC"
                ></gcode>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="aagames-button-box">
        <button type="button" @click="submit">{{$t('确认提款')}}</button>
      </div>
    </div>
  </div>
</template>

<script>
import Lheader from '@/components/l-header'
import Loading from '@/components/loading'
import Gcode from './components/code'
import {withdraw} from '@/api/agent'
import {Dialog} from 'vant'
import BankcardList from './chooseBank'
import {mapActions} from "vuex";


export default {
  name: 'memberList',
  components: {
    Loading,
    Lheader,
    Gcode,
    BankcardList,
  },
  data() {
    var self = this
    return {
      title: this.$t('佣金提款'),
      bankText: '',
      keyboardshow: false,
      areaCode: 86,
      mobileReg: /^1[3456789]\d{9}$/,
      query: {
        withdraw_money: '',
        code: '',
        phone: '',
        bank_id: '',
      },
    }
  },

  async created() {
    this.userInfoForAgent = JSON.parse(window.localStorage.getItem('userInfoForAgent'))
    this.query.phone = this.userInfoForAgent.mobile
  },
  methods: {
    ...mapActions('global', ['setPopShow']),
    onConfirm(value) {
      this.bankText = value.name
      this.addBank.bank_id = value.id
      this.show = false
    },
    openpop() {
      console.log(this.query.phone)
      this.setPopShow({telDisplay: true, status: true})
    },
    submit() {
      if (!this.query.bank_id) {
        this.$toast.fail(this.$t('请选择银行'))
        return false
      }
      if (!this.query.withdraw_money) {
        this.$toast.fail(this.$t('金额不能小于100元'))
        return false
      }
      if (!this.query.phone) {
        this.$toast.fail(this.$t('手机号不能为空'))
        return false
      }
      if (!this.mobileReg.test(this.query.phone)) {
        this.$toast.fail(this.$t('手机格式有误'))
        return false
      }
      if (!this.query.code) {
        this.$toast.fail(this.$t('验证码不能为空'))
        return false
      }
      if (this.userInfoForAgent.commission_money < this.query.withdraw_money) {
        this.$toast.fail(this.$t('提款金额大于可提款金额'))
        return false
      }
      Dialog.confirm({
        message: this.$t('确认提款？'),
      }).then(() => {
        const params = {
          valid_sms_code: this.query.code,
          withdraw_money: this.query.withdraw_money,
          money: this.userInfoForAgent.money,
          user_bank_id: this.query.bank_id,
        }
        withdraw(params)
            .then((res) => {
              if (res.data.code === 0) {
                // Toast.success(this.$t('转账成功'))
                this.$toast(this.$t('提现已发起审核中'));
                this.$router.go(-1);
              }
            })
      })
          .catch(() => {
            // on cancel
          })
    },
    getCodeC(val) {
      this.getCode = val
    },
    myCodeC(val) {
      this.query.code = val
    },
  },
}
</script>

<style scoped lang="less">
@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.container {
  min-height: 100vh;
  flex-direction: column;
  background-color: @bg-color;

  .main {
    padding-top: 0.2rem;

    .p_text {
      padding: 0.1rem 1rem;
      background: #282828;
      color: #606060;
      line-height: 0.6rem;

      .serve {
        font-size: 0.37rem;
        color: #c8a77f;
      }
    }

    .aagames-button-box {
      margin-top: 20px;
      button {
        background: #c8a77f;
        /*margin: .8rem 0;*/
        width: 85%;
        height: 1.33333rem;
        border: none;
        border-radius: 0.10667rem;
        color: #1e1e1e;
        font-weight: 600;
        text-align: center;
        line-height: 1.33333rem;
        font-size: 0.42667rem;
        bottom: 0;
        position: fixed;
        left: -.2rem;
        margin: 1rem;
      }
    }

    .amount {
      flex: 1;

      .top {
        p,
        .title {
          color: #606060;
          font-size: 24px;
          line-height: 60px;

          span {
            color: #999;
          }
        }
      }

      .reset {
        width: 100%;
        display: flex;
        box-sizing: border-box;

        .act {
          font-size: 0.37rem;
          color: #515151;
          margin-right: -4.7rem;
        }

        .iconfont {
          color: #525152;
          margin: 0 0.2rem;
          font-size: 0.56rem;
          vertical-align: middle;
        }

        .money {
          color: #ccc;
          font-size: 0.37rem;
          padding-right: 0.4rem;
        }

        .tx {
          margin-bottom: 16px;
          width: 100%;

          /deep/ #g-code {
            border-bottom: 2px solid #323232;

            .right-button {
              top: -160px;
              background: transparent;
              border: 2px solid @primary-color;
              color: @primary-color;
            }
          }

          .iphone {
            background: none !important;
          }

          .input {
            display: flex;
            align-items: center;
            justify-content: center;
            border-bottom: 1px solid @border-color;

            span {
              width: 20px;
              font-size: 32px;
              font-weight: 400;
              color: @text-color-placeholder;
              line-height: 44px;
            }

            .text {
              height: 40px;
              font-size: 28px;
              font-weight: 400;
              color: rgba(153, 153, 153, 1);
              line-height: 40px;
            }
          }

          input {
            flex: 1;
            background: none !important;
            width: 100%;
            padding: 0 20px;
            border: none;
            font-size: 28px;
            height: 98px;
            font-weight: 400;
            color: #ccc;
          }

          input::placeholder {
            color: @text-color-placeholder;
          }
        }

        p,
        .title {
          height: 40px;
          font-size: 28px;
          font-weight: 400;
          color: @text-color-placeholder;
          line-height: 40px;
          flex: 1;
          display: flex;
          align-items: center;
          padding-right:15px;
          width:60%;
          .inline {
            display: inline-block;
          }
        }

        >span {
          color: #ffcf6e;
          font-size: 22px;
          margin-top: 30px;
          display: inline-block;
          margin-bottom: 20px;
        }

        .flex {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;

          input {
            -webkit-box-flex: 1;
            flex: 1;
            padding: 0.26667rem;
            padding-left: 0;
            border: none;
            font-size: 0.37rem;
            line-height: normal;
            background: none !important;
            color: #666666;
            text-align: end;
          }
        }

        .list {
          height: 1.33333rem;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          margin: 0 0.53333rem;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          position: relative;
          border-bottom: 0.02667rem solid #323232;
          span.lb{
            line-height: 1.2;
            width:100%;
            white-space: nowrap;
          }
        }
      }

      .mt {
        width: 100%;
        height: 120px;
        display: flex;
        color: @text-color-placeholder;
        align-items: center;
        justify-content: center;
        border-bottom: 1px solid @border-color;

        .icon {
          width: 60px;
          height: 60px;
          margin-right: 20px;
        }

        .center {
          flex: 1;
          font-size: 32px;
          font-weight: 600;
          color: rgba(177, 177, 177, 1);
          line-height: 44px;

          .name {
          }

          .card_no {
            color: rgba(153, 153, 153, 1);
          }
        }

        .more {
          width: 55px;
        }
      }
    }
  }
}
</style>
