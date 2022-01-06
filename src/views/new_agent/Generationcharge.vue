<template>
  <div id="Generationcharge">
    <!-- <van-skeleton title avatar :row="3" /> -->
    <van-nav-bar
      left-arrow
      fixed
      @click-left="$router.go(-1)"
      @click-right=""
    >
      <template #title>
        <span style="color:#FFFFFF;">{{$t('下级代充')}}</span>
        <span
          @click="tipshow = true"
          style="color:#C8A77F;padding: 0 0 0 0.1rem ;"
          class="iconfont icon-wen "
        ></span>
      </template>
      <template #right>
        <span
          style="color:#FFFFFF;font-size: .4rem;"
          @click="
            $router.push({
              name: 'moneyExchange',
              query: {
                type: 6,
              },
            })
          "
        >{{$t('记录')}}</span>
      </template>
    </van-nav-bar>
    <div class="content">
      <Cell
        @click="selectshow = true"
        :title="$t('代充类型')"
        :icon="'icon-activitybianzu3'"
      >
        <span style="font-size: 0.37333rem">{{ changTypeText }}
          <span
            class="iconfont icon-dayuhao"
            style="margin-right: 0;    font-size: 0.4rem;"
          ></span>
        </span>
      </Cell>
      <Cell
        :title="$t('可代充金额')"
        :icon="'icon-activitybianzu3beifen'"
      >
        <span v-if="changtype === 0">
          {{ commission_money ? commission_money : '0.00' }}
        </span>
        <span v-else-if="changtype === 1">
          {{ money ? money : '0.00' }}
        </span>
        <span v-else>0</span>
      </Cell>
      <Cell
        @click="numbertypeshow = true"
        :title="$t('账号类型')"
        :icon="'icon-zhanghaoleixing1'"
      >
        <span>{{ numbertypetext }}
          <span
            class="iconfont icon-dayuhao"
            style="margin-right: 0;    font-size: 0.4rem;"
          ></span>
        </span>
      </Cell>
      <Cell
        :title="$t('下级账号')"
        :icon="'icon-activitybianzu7'"
      >
        <van-field
          center
          input-align="right"
          v-model="fromData.username"
          style="width: 3rem;padding: 0.2rem 0"
          :placeholder="$t('请输入下级账号')"
        />
      </Cell>
      <Cell
        :title="$t('代充金额')"
        :icon="'icon-activitybianzu7beifen'"
      >
        <van-field
          center
          input-align="right"
          style="width: 3rem;padding: 0.2rem 0"
          type="number"
          :placeholder="$t('请输入代充金额')"
          v-model="fromData.money"
        />
      </Cell>
      <p class="middletip">
        <span
          class="iconfont icon-gantanhao"
          style="margin-left: .2rem;    display: inline-block;
    vertical-align: middle;"
        ></span>
        {{$t('代充金额单次需满足')}}
        <span style="color:#999999">100≤单次代充量≤10,000</span>
      </p>
      <Cell
        :title="$t('提款流水倍数')"
        :icon="'icon-activitybianzu7beifen2'"
        v-if="fromData.user_type !== 2"
      >
        <van-field
          v-model="fromData.flow"
          style="width: 1.2rem;
          border: 1px solid #262626;
          border-radius: 0.1rem;
          height: .8rem;
          line-height: 0.8rem;
          padding-left: 0.2rem;
           "
          type="number"
          placeholder="0"
          class="rate multiple"
          border
        />&nbsp;{{$t('倍')}}
      </Cell>
      <Cell
        :title="$t('验证方式')"
        :icon="'icon-activitybianzu3beifen2'"
        @click="selectphone = true"
      >
        <span>{{ phoneTypeText }}</span>
        <span
          class="iconfont icon-dayuhao"
          style="margin-right: 0 ;font-size: 0.4rem;"
        ></span>
      </Cell>
      <!--      <Cell   :title="$t('手机号')" :icon="'icon-phone'"></Cell>-->
      <Cell
        :title="$t('手机号')"
        :icon="'icon-phone'"
      >
        <span v-if="mobile">{{ mobile }}</span>
        <div v-else>
          <span
            class="act"
            @click="openpop"
          >{{$t('立即绑定')}}</span>
          <span class="iconfont icon-dayuhao"></span>
        </div>
        <!--        <van-button-->
        <!--            @click="$router.push('/agent')"-->
        <!--            :loading="false"-->
        <!--            type="primary"-->
        <!--            loading-type="spinner"-->
        <!--            style="width: 2.5rem;-->
        <!--    height: 0.8rem;-->
        <!--    background: none;-->
        <!--    border: 0.01333rem solid #C8A77F;-->
        <!--    color: #C8A77F;-->
        <!--    line-height:.8rem"-->
        <!--        >立即绑定-->
        <!--        </van-button>-->
      </Cell>
      <!--      <van-cell is-link center v-if="mobile && fromData.valid_type != 2">-->
      <van-cell
        is-link
        center
        v-if="mobile"
      >
        <template #title>
          <span class="iconfont icon-bianzu72"></span>

          <van-field
            center
            v-model="fromData.sms_code"
            style="width: 4.5rem;display: inline-flex;border: none;"
            :placeholder="$t('请输入手机验证码')"
          />
        </template>
        <template #right-icon>
          <van-button
            v-show="codeshow"
            @click="getSmscode"
            :loading="false"
            type="primary"
            loading-type="spinner"
            class="get-code"
            style="width: 2.5rem;
    height: 0.8rem;
    background: none;
    border: 0.01333rem solid #C8A77F;
    color: #C8A77F;"
          >{{$t('获取验证码')}}
          </van-button>
          <van-button
            v-show="!codeshow"
            :loading="false"
            type="primary"
            loading-type="spinner"
            style="width: 2.5rem;
    height: 0.8rem;
    background: none;
    border: 0.01333rem solid #C8A77F;
    color: #C8A77F;
    line-height:.8rem"
          >{{ count }}s
          </van-button>
        </template>
      </van-cell>
      <Cell
        :title="$t('备注')"
        :icon="'icon-activitybianzu6beifen'"
      >
        <van-field
          center
          input-align="right"
          class="mark"
          style="padding: 0.2rem 0"
          :placeholder="$t('请输入备注，100字内')"
          v-model="fromData.mark"
        />
      </Cell>
      <p class="middletip">
        <span
          class="iconfont icon-gantanhao"
          style="margin-left: .2rem;"
        ></span>
        {{$t('备注可用通过系统消息发送到会员端')}}
      </p>
    </div>
    <van-button
      @click="pushagentdeposite"
      color="#C8A77F"
      style="width: 100%;display: block;"
    >{{$t('确认代充')}}
    </van-button>

    <van-popup
      v-model="selectshow"
      closeable
      close-icon-position="top-left"
      position="bottom"
      class="custom"
      :style="{overflow: 'hidden' }"
    >
      <van-picker
        :title="$t('代充类型')"
        show-toolbar
        :cancel-button-text="' '"
        :columns="columns"
        @confirm="onConfirm"
      />
    </van-popup>

    <van-popup
      v-model="selectphone"
      closeable
      close-icon-position="top-left"
      position="bottom"
    >
      <van-picker
        :title="$t('验证方式')"
        show-toolbar
        :cancel-button-text="' '"
        :columns="columnsPhone"
        @confirm="onConfirmphone"
      />
    </van-popup>

    <van-popup
      v-model="numbertypeshow"
      closeable
      close-icon-position="top-left"
      position="bottom"
    >
      <van-picker
        :title="$t('选择账号类型')"
        show-toolbar
        :cancel-button-text="' '"
        :columns="numbertypelist"
        @confirm="onConfirmnumber"
      />
    </van-popup>

    <van-overlay
      :show="markmaskshow"
      @click="markmaskshow = false"
    >
      <div
        class="wrapper"
        @click.stop
      >
        <div class="block" />
      </div>
    </van-overlay>

    <van-dialog
      v-model="tipshow"
      :title="$t('温馨提示')"
      :confirmButtonText="$t('知道了')"
    >
      <p
        class="tiptext"
        style="margin-top:.7rem"
      >{{$t('什么是下级代充')}}</p>
      <p class="tipcontent">
        {{$t(`代充是一种新的存款方式，可用参与网站优惠，并且计算代理首存和活跃；仅支持代理将佣金钱包的资金转账到自身下线会员的中心钱包。`)}}
      </p>
      <p
        class="tiptext"
        style="margin-top: 0.6rem"
      >{{$t('钱包代充')}}</p>
      <p class="tipcontent">
        {{$t(`当佣金钱包余额不够时，代理可通过钱包充值来对余额进行充值。钱包余额由平台管理员进行分配，额度不够时可联系在线客服进行充值。`)}}
      </p>
    </van-dialog>

    <van-action-sheet
      closeable
      :show="passwordShow"
      :description="$t('请输入资金密码')"
    >
      <!-- <van-field v-model="fromData.pay_password" type="password"  :label="$t('密码')" /> -->
      <van-password-input
        :value="fromData.pay_password"
        :gutter="10"
        :focused="showKeyboard"
        @focus="showKeyboard = true"
      />
      <p
        class="wj"
        @click="$router.push('/agent')"
      >{{$t('忘记资金密码')}}</p>
      <p class="issue">
        {{$t('遇到问题，联系')}}<span @click="$openKefu()">{{$t('专属客服')}}</span>
      </p>
      <van-number-keyboard
        v-model="fromData.pay_password"
        :show="showKeyboard"
        @blur="showKeyboard = false"
      />
      <!-- <van-button
        @click="pushagentdeposite"
        color="#C8A77F"
        style="width: 80%;margin-left: .8rem;display: block;"
        >{{$t('确认')}}</van-button
      > -->
      <div :style="{ width: '100%', height: showKeyboard ? '6rem' : '1rem' }"></div>
    </van-action-sheet>
    <van-dialog
      v-model="pay_passwordsshow"
      :title="$t('温馨提示')"
      close-on-click-overlay
      :confirmButtonText="$t('去设置')"
      @confirm="$router.push('/agent')"
    >
      <p class="pass">
        您还未设置支付密码，去设置？
      </p>
    </van-dialog>
  </div>
</template>
<script>
import Cell from './components/cell'
import { agentdeposite, getSmscode, userinfo } from '@/api/agent'
import { mapActions } from "vuex";

export default {
  name: 'Generationcharge',
  components: { Cell },
  data() {
    return {
      selectshow: false,
      selectphone: false,
      columns: [this.$t('佣金代充'), this.$t('钱包代充')],
      columnsPhone: [this.$t('手机短信'), this.$t('支付密码')],
      numbertypelist: [this.$t('代理账号'), this.$t('会员帐号')],
      changTypeText: this.$t('请选代充值类型'),
      phoneTypeText: this.$t('请选择验证方式'),
      numbertypetext: this.$t('选择账号类型'),
      fromData: {
        flow: '',
        money: '',
        username: '',
        mark: '',
        money_type: '',
        valid_type: '',
        phone_area_code: '',
        pay_password: '',
        user_type: '',
        sms_code: '',
      },
      markmaskshow: false,
      tipshow: false,
      money: '',
      commission_money: '',
      mobile: '',
      changtype: '',
      timer: null,
      codeshow: true,
      count: '',
      passwordShow: false,
      password: '',
      showKeyboard: false,
      numbertypeshow: false,
      pay_passwordstatus: '',
      pay_passwordsshow: false,
    }
  },
  watch: {
    'fromData.pay_password': {
      handler() {
        if (this.fromData.pay_password.length === 6) {
          this.passwordShow = false
          this.showKeyboard = false
        }
      },
    },
  },
  created() {
    userinfo({
      access_token: window.localStorage.agToken,
    }).then(
      ({
        data: {
          data: {
            money,
            commission_money,
            mobile,
            phone_area_code,
            pay_password,
          },
        },
      }) => {
        this.fromData.phone_area_code = phone_area_code
        this.money = money
        this.commission_money = commission_money
        this.mobile = mobile
        this.pay_passwordstatus = pay_password
      }
    )
  },
  methods: {
    ...mapActions('global', ['setPopShow']),
    openpop() {
      this.setPopShow({ telDisplay: true, status: true })
    },
    onConfirmnumber(item, i) {
      this.numbertypetext = item
      if (i === 0) {
        this.fromData.user_type = 2
      } else {
        this.fromData.user_type = 1
      }
      this.numbertypeshow = false
    },
    async pushagentdeposite() {
      if (this.changtype === '') {
        this.$toast(this.$t('请选择代充类型'))
        return
      }
      if (this.fromData.valid_type === '') {
        this.$toast(this.$t('请选择验证方式'))
        return
      }
      if (this.fromData.valid_type === 2 && !this.pay_passwordstatus) {
        this.pay_passwordsshow = true
        return
      }
      if (this.fromData.valid_type === 2 && this.fromData.pay_password === '') {
        this.passwordShow = true
        return
      }
      const { data } = await agentdeposite({...this.fromData, mobile: this.mobile})
      this.fromData.pay_password = ''
      if (data.code === 0) {
        this.$toast(this.$t('提交成功'))
        this.$router.go(-1)
      }
      this.passwordShow = false
      console.log(res)
    },
    async getSmscode() {
      this.getCode()
      const res = await getSmscode({
        mobile: this.mobile,
        phone_area_code: this.fromData.phone_area_code,
      })
      console.log(res)
    },
    onConfirm(item, i) {
      this.changTypeText = item
      this.selectshow = false
      this.changtype = i
      i === 0 ? (this.fromData.money_type = 2) : (this.fromData.money_type = 1)
    },
    onConfirmphone(item, i) {
      this.phoneTypeText = item
      this.selectphone = false
      if (i === 0) {
        this.fromData.valid_type = 1
      } else {
        if (this.pay_passwordstatus) {
          this.fromData.valid_type = 2
          this.passwordShow = true
        } else {
          // console.log(this.$t('未绑定'))
          this.fromData.valid_type = 2

          this.pay_passwordsshow = true
        }
      }
      console.log(i)
    },
    getCode() {
      const TIME_COUNT = 60
      if (!this.timer) {
        this.count = TIME_COUNT
        this.codeshow = false
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--
          } else {
            this.codeshow = true
            clearInterval(this.timer)
            this.timer = null
          }
        }, 1000)
      }
    },
  },
}
</script>
<style lang="less" scoped>
.en-wrap {
  background: red;
  .get-code span{
    font-size: 12px;
    line-height: 0.9;
  }
}

/deep/ .van-field__control {
  color: #999 !important;
}

///deep/ .van-picker__columns {
//  height: 326px !important;
//}

.pass {
  text-align: center;
  line-height: 1rem;
}

.issue {
  color: #444443;
  text-align: center;
  line-height: 1rem;

  span {
    color: #929497;
    text-decoration: underline;
  }
}

.wj {
  line-height: 1rem;
  color: #999;
  padding-left: 20px;
}

/deep/ .van-password-input {
  padding: 0 20px;
}

/deep/ .van-popup--bottom {
  background: #282828;
}

/deep/ .van-password-input li {
  background: #101010;
}

/deep/ .van-password-input .van-password-input__security i {
  background: #999;
}

/deep/ .van-action-sheet__description::after {
  border: none;
}

.mark {
  width: 320px;
}

.icon-wen {
  font-size: 32px;
}

/deep/ .van-picker__toolbar {
  border-bottom: 1px solid #343434;
}

/deep/.van-popup__close-icon {
  font-size: 40px;
}

/deep/.van-picker__cancel {
  width: 12%;
}
/deep/.van-picker__title {
  width: 100%;
}

/deep/ .rate .van-field__control {
  line-height: inherit;
  font-size: 0.37333rem;
}

.tipcontent {
  line-height: 0.55rem;
  margin-bottom: 0.3rem;
  color: #cccccc;
}

.tiptext {
  color: rgb(200, 167, 127);
  font-size: 0.44rem;
  margin-bottom: 0.3rem;
}

/deep/ .van-dialog {
  background: #282828;
  padding-bottom: 0.8rem;
}

/deep/ .van-dialog .van-dialog__footer .van-button {
  margin: auto;
  color: #1e1e1e;
}

/deep/ .van-dialog .van-dialog__header {
  color: #f5f5f5;
}

/deep/ .van-field__control::placeholder {
  color: #999;
  line-height: 1.4rem;
}

/deep/ .van-button.van-button--primary {
  width: 2.5rem;
  height: 0.8rem;
  background: none;
  border: 1px solid @btn-color;
  color: @btn-color;
}

.middletip {
  height: 1rem;
  line-height: 1rem;
  color: #515151;
}

.content {
  margin-top: 1rem;
  font-size: 0.37333rem;

  span {
    padding-left: 8px;
    font-size: 0.37333rem;
    line-height: 1.2;
    &:not(.iconfont) {
      display: flex;
    }
  }

  /deep/ .van-cell__title {
    .iconfont {
      font-size: 0.533rem;
      display: inline-block;
      margin-right: 0.3rem;
      vertical-align: middle;
    }
  }

  .multiple {
    /deep/ .van-field__body {
      position: relative;

      input {
        color: red;
        position: absolute;
        left: -0.2rem;
        top: -0.2rem;
        width: 100%;
        padding-left: 0.2rem;
      }
    }
  }
}

/deep/ .van-cell {
  background: @bg-color;
  font-size: 0.4rem;
  color: #999999;
  height: 1.4rem;
  line-height: 1.4rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  padding: 0.2rem 0 0.2rem 0;
}

/deep/ .van-icon-arrow-left {
  color: #ffffff;
  font-size: 0.5rem;
}

/deep/ .van-nav-bar {
  background: @bg-color;
}

#Generationcharge {
  width: 100%;
  height: 100%;
  background: @bg-color;
  padding: 0.6rem 0.4rem;
  overflow-y: auto;
  padding-bottom: 1.6rem;
}
</style>
