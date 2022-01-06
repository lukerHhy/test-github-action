<template>
  <div class="withdraw-page">
    <van-nav-bar
      class="m-header transparent"
      :title="title"
      left-arrow
      :fixed="true"
       :right-text="$t('专属客服')"
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <div class="m-body gap">
      <van-tabs
        v-model="form.currency_type"
        line-width=".64rem"
        line-height=".08rem"
        color="none"
        title-active-color="white"
        v-show="limitInfo.dig_withdraw_status === 1"
      >
        <van-tab :title="$t('银行卡')" name="1" />
        <van-tab name="2">
          <div slot="title" class="tabsTitle">
            {{$t('数字货币')}}
            <span>{{$t('安全 便捷')}}</span>
          </div>
        </van-tab>
      </van-tabs>
      <ul class="withdraw-form">
        <li v-if="bankcard && form.currency_type === '1'" @click="showBank">
          <div class="input">
            <div class="input-head bank-icon">
              <BankIcon :bankCode="bankcard.icon_code" />
            </div>
            <div class="input-body">
              <h3>{{ bankcard.bank_name }}</h3>
              <p>{{$t('尾号')}}{{ bankcard.card_no && bankcard.card_no.slice(-4) }}</p>
            </div>
            <div class="input-foot">
              <span>{{$t('切换')}}</span>
              <van-icon name="arrow" />
            </div>
          </div>
        </li>
        <li>
          <label>{{$t('取款金额')}}</label>
          <div class="input">
            <div class="input-head">¥</div>
            <div class="input-body">
              <input
                type="text"
                @blur="checkNum"
                v-model="form.withdraw_money"
                :placeholder="`${$t(`最低取款金额${siteInfo.cost_manage.money_range[0]}元，最高取款金额${siteInfo.cost_manage.money_range[1]}元`)}`"
              />
            </div>
            <div class="input-foot">
              <span class="withdrawAll" @click="setAll">{{$t('全部提现')}}</span>
            </div>
          </div>
        </li>
        <template v-if="form.currency_type === '2'">
          <li class="ticker-tips">
            <p>{{$t('预计到账')}}<i>{{ fees.resFee&&ticker?(fees.resFee/ticker).toFixed(2):0 }}</i><span style="text-transform: uppercase;">{{ form.dig_mode_type }}</span>（{{$t('实时汇率')}}：{{ticker}}）</p>
          </li>
          <li class="dig-wrap">
            <label>{{$t('提款币种')}}</label>
            <div class="input" @click="showDig = true">
              <input style="text-transform:uppercase;" disabled type="text" v-model="form.dig_mode_type">
              <van-icon name="arrow-down" />
            </div>
          </li>
          <li class="dig-wrap">
            <label>{{$t('协议')}}</label>
            <div class="protocol" v-if="protocol.length">
              <span 
                :class="{'active':form.protocol === item.value}"
                @click="handleProtocol(item.value)"
                v-for="(item,index) in protocol.filter(m => m.type === form.dig_mode_type)[0].protocol" :key="index"
              >{{item.name}}</span>
            </div>
          </li>
          <li class="dig-wrap">
            <label>{{$t('收币地址')}}</label>
            <div class="input">
              <input type="text" @blur="handleAddress" v-model="form.address" :placeholder="$t('输入或者长按粘贴地址')">
              <span>
                <img @click="handleDig" :src="require('@/assets/common/img/ucenter/address@2x.png')" alt="">
              </span>
            </div>
          </li>
        </template>
        <li v-if="userInfo && userInfo.is_pay_password !== 2">
          <div class="input" @click="setFundPassword">
            <div class="input-body">
              <p class="red">{{$t('为保障您的资金安全')}}</p>
            </div>
            <div class="input-foot">
              <van-icon name="arrow" />
            </div>
          </div>
        </li>
        <li class="charge">
          <label @click="showTips">
            {{$t('费用管理')}}
            <van-icon name="question-o" />
          </label>
          <table class="table">
            <thead>
              <tr>
                <th>{{$t('手续费')}}</th>
                <th>{{$t('行政费')}}</th>
                <th>{{$t('扣除优惠')}}</th>
                <th>{{$t('最后可取')}}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ fees.fee | currency('¥') }}</td>
                <td>{{ fees.admin | currency('¥') }}</td>
                <td>{{ fees.profit | currency('¥') }}</td>
                <td>{{ fees.resFee < 0 ? 0 : fees.resFee | currency('¥') }}</td>
              </tr>
            </tbody>
          </table>
        </li>
      </ul>
      
      <div class="aagames-tips">{{$t('温馨提示：取款流水验证有1-3分钟数据延迟，3-5分钟提款到账')}}</div>
      <div class="ui-buttons">
        <van-button :disabled="!allowSubmit" :loading="submiting" type="primary" @click="submitBefore">{{$t('确认提交')}}</van-button>
      </div>
    </div>

    <!-- 银行卡下拉 -->
    <van-popup
      class="custom"
      v-model="show"
      closeable
      round
      close-icon-position="top-left"
      position="bottom"
      get-container="#app"
    >
      <div class="pop-head">
        <h2>{{$t('开户银行')}}</h2>
      </div>
      <div class="pop-body list-cells">
        <div class="cell" v-for="(item, index) in bankList" :key="index" @click="onSelect(item)">
          <div class="cell-head">
            <BankIcon :bankCode="item.icon_code" />
          </div>
          <div class="cell-body">{{ item.bank_name }}</div>
          <div class="cell-foot" v-if="bankcard.id === item.id">
            <van-icon name="success" />
          </div>
        </div>
      </div>
    </van-popup>
    <!-- 输入资金密码 -->
    <van-popup
      :class="['custom',{'topPass':showKeyboard}]"
      v-model="showCapital"
      closeable
      round
      close-icon-position="top-left"
      position="bottom"
      get-container="#app"
    >
      <div class="pop-head">
        <h2>{{$t('输入资金密码')}}</h2>
      </div>
      <div class="pop-body list-cells">
        <div class="input">
          <div class="input-body">
            <van-password-input
              :value="form.pay_password"
              :length="6"
              :gutter="15"
              :focused="showKeyboard"
              @focus="showKeyboard = true"
            />
          </div>
          <span v-show="!showKeyboard" class="forgetPass" @click="forgetFundPassword">{{$t('忘记资金密码')}}</span>
        </div>
        <div v-show="!showKeyboard" class="footer-tips">
          <p>
            {{$t('遇到问题，联系')}}
            <span @click="$openKefu">{{$t('专属客服')}}</span>
          </p>
        </div>
      </div>
    </van-popup>

    <van-popup
      class="custom"
      v-model="submitInfo"
      closeable
      round
      close-icon-position="top-left"
      position="bottom"
      get-container="#app"
      ref="test"
    >
      <div class="pop-head">
        <h2>{{$t('取款审核中')}}</h2>
      </div>
      <div class="pop-body">
        <!-- <img class="big-img" src="@assets/img/memberCenter/success.png" alt="pay-warn"> -->
        <div class="pay-mark">
          <div class="clock">
            <van-image :src="require('@assets/img3_0/deposit/clock.png')" />
            <van-count-down ref="countDown2" @finish="$refs['countDown2'][0].reset()" class="processing-time-deposit" :time="time" format="mm:ss" />
          </div>
          <div class="money-text">¥{{(form.withdraw_money*1 || 0).toFixed(2)}}</div>
          <p>{{$t('您的取款系统正在处理中')}}</p>
          <p>{{$t('请耐心等待')}}</p>
        </div>
        <div class="btn">
          <div class="aagames-button-box">
            <button
              class="aagames-button mt30"
              type="button"
              @click="submitInfo = false"
            >{{$t('确定')}}</button>
          </div>
          <div class="aagames-button-box">
            <button
              class="aagames-button dark"
              type="button"
              @click="$router.push({ name: 'businessRecord',query:{type:1}})"
            >{{$t('查看交易记录')}}</button>
          </div>
        </div>
      </div>
    </van-popup>

    <!-- 数字货币类型 -->
    <van-popup
      class="custom"
      v-model="showDig"
      closeable
      round
      close-icon-position="top-left"
      position="bottom"
      get-container="#app"
    >
      <div class="pop-head">
        <h2>{{$t('提款币种类型')}}</h2>
      </div>
      <div class="pop-body">
        <p 
          style="text-align:center;" 
          @click="handleChose(item)"
          v-for="(item,index) in protocol" :key="index"
        >{{item.type_name}}</p>
      </div>
    </van-popup>

    <!-- 数字键盘 -->
    <van-number-keyboard
      safe-area-inset-bottom
      :show="showKeyboard"
      @input="onInput"
      @delete="onDelete"
      @blur="showKeyboard = false"
      @hide="hideKeyboard"
      :z-index="9999"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import {parseTime} from '@/filters'
import { withdraw, withdrawlimitinfo, staticprotocol, getticker, adddigwallet, digwalletlist } from "@/api/memberCenter";
import BankIcon from "@/components/bank-icon";
import BankcardList from "@/components/pop-bankcard-list";

export default {
  name: "Withdraw",
  components: {
    BankIcon,
    BankcardList
  },
  data() {
    return {
      title: this.$t('取款'),
      submiting: false,
      value: "1213",
      showKeyboard: false,
      // 数字货币弹窗
      showDig: false,
      // 当前选中银行卡
      bankcard: null,
      // columns: [],
      bindText: this.$t('请选择提现银行'),
      show: false,
      min_money: 100,
      ticker: 0,
      allowSubmit: false,
      form: {
        withdraw_money: "",
        user_bank_id: "",
        pay_password: "",
        protocol: '',
        dig_mode_type: '',
        currency_type: '1',
        address: '',
        user_dig_wallet_id: ''
      },
      protocol: [],
      errText: "",
      password: "",
      accountShow: false,
      showflow: false,
      loading: false,
      finished: false,
      rechargeData:[],
      limitInfo:{},
      // 手续费，行政费，优惠，可取
      fees:{
        fee:0,
        admin:0,
        profit:0,
        resFee:0
      },
      showCapital:false,
      time: 900000,
      submitInfo:false
    };
  },
  watch:{
    'form.withdraw_money'(val) {
      const { withdraw_fees, administrative_rate, dig_fee } = this.siteInfo.cost_manage
      if(this.form.currency_type === '1' && this.judgeCostMethod()) {
        withdraw_fees.some((item, index, _ary) => {
            if(item.withdraw_fee_type == 1) {
              this.fees.fee = item.withdraw_fee
            } else if (item.withdraw_fee_type == 2) {
              this.fees.fee =(val * (item.withdraw_fee/100)).toFixed(2)
            } else {
              this.fees.fee = item.withdraw_fee
            }
            return val <= item.withdraw_fee_max*1
        })
      } else if(this.form.currency_type === '2' && this.judgeCostMethod()) {
        this.fees.fee = (val * dig_fee).toFixed(2)
      }
      
      if(this.limitInfo.draw_limit_amount) {
        this.fees.admin = Math.min(this.limitInfo.draw_limit_amount,val) * administrative_rate
      }
      
      this.fees.profit = this.limitInfo.deduction_money
      this.fees.resFee = Math.max(val - this.fees.fee- this.fees.admin - this.fees.profit,0)
      this.watchform()
    },
    'form.user_bank_id' () {
      this.watchform()
    },
    'form.pay_password' () {
      this.watchform()
    },
    'form.dig_mode_type' () {
      this.watchform()
    },
    'form.protocol' () {
      this.watchform()
    },
    'form.address' () {
      this.watchform()
    },
    'form.currency_type' () {
      const { withdraw_fees, administrative_rate, dig_fee } = this.siteInfo.cost_manage
      if(this.form.currency_type === '1' && this.judgeCostMethod()) {
        withdraw_fees.some((item, index, _ary) => {
            if(item.withdraw_fee_type == 1) {
              this.fees.fee = item.withdraw_fee
            } else if (item.withdraw_fee_type == 2) {
              this.fees.fee =(this.form.withdraw_money * (item.withdraw_fee/100)).toFixed(2)
            } else {
              this.fees.fee = item.withdraw_fee
            }
            
            return this.form.withdraw_money*1 <= item.withdraw_fee_max*1
        })
      } else if(this.form.currency_type === '2' && this.judgeCostMethod()) {
        this.fees.fee = (this.form.withdraw_money * dig_fee).toFixed(2)
      }
      
      if(this.limitInfo.draw_limit_amount) {
        this.fees.admin = Math.min(this.limitInfo.draw_limit_amount,this.form.withdraw_money) * administrative_rate
      }
      
      this.fees.profit = this.limitInfo.deduction_money
      this.fees.resFee = Math.max(this.form.withdraw_money - this.fees.fee- this.fees.admin - this.fees.profit,0)
      this.watchform()
    }
  },
  computed: {
    ...mapState("users", ["userInfo", "isLogin','wallet", 'token']),
    ...mapState("global", ["siteInfo"]),
    // 个人绑定的银行卡列表
    bankList() {
      const { userInfo } = this;
      return userInfo.user_bank;
    },
    columns() {
      const { user_bank } = this.userInfo;
    }
  },
  created() {
    console.log('siteInfo', this.siteInfo, this.userInfo)
    const { token, userInfo, bankList } = this;
    if (!token) {
      this.$toast(this.$t('请先登录'));
      this.$router.push({
        name: "login"
      });
    }
    const query = this.$route.query.param?JSON.parse(this.$route.query.param):null
    console.log('query', query)
    if(query) {
      this.form.currency_type = String(query.type)
      this.form.address = query.address
      this.form.user_dig_wallet_id = query.id
      this.form.withdraw_money = query.withdraw_money || ''
      this.form.dig_mode_type = query.dig_mode_type || ''
      this.form.protocol = query.protocol || ''
    }
    this.getLimitinfo()
    this.bankcard = bankList[0];
    this.form.user_bank_id = this.bankcard.id
  },
  methods: {
    watchform () {
      console.log('aaa', this.form)
      if (this.form.currency_type === '1') {
        if (
          this.form.withdraw_money &&
          !/.*\..*/.test(this.form.withdraw_money) &&
          this.form.user_bank_id
        ) {
          this.allowSubmit = true
        } else {
          this.allowSubmit = false
        }
      } else {
        if (
          this.form.withdraw_money &&
          !/.*\..*/.test(this.form.withdraw_money) &&
          this.form.dig_mode_type &&
          this.form.protocol &&
          this.form.user_dig_wallet_id && 
          this.form.address
        ) {
          this.allowSubmit = true
        } else {
          this.allowSubmit = false
        }
      }
    },
    getFee(val) {
      const { administrative_rate, dig_fee } = this.siteInfo.cost_manage
      this.fees.fee = val * dig_fee
      
      if(this.limitInfo.draw_limit_amount) {
        this.fees.admin = Math.min(this.limitInfo.draw_limit_amount,val) * administrative_rate
      }
      
      this.fees.profit = this.limitInfo.deduction_money
      this.fees.resFee = Math.max(val - this.fees.fee- this.fees.admin - this.fees.profit,0)
    },
    handleDig() {
      // this.$router.push({name: 'digAddress',query:{param:JSON.stringify(this.form)}})
      this.$router.push({
        name: 'digAddress',
        query: {param:JSON.stringify(this.form)}
      })
    },
    onInput(key) {
      this.form.pay_password = (this.form.pay_password + key).slice(0, 6);
      console.log(this.form.pay_password)
      if (this.form.pay_password.length === 6) {
        this.showKeyboard = false
        this.submit()
      }
    },
    onDelete() {
      this.form.pay_password = this.form.pay_password.slice(
        0,
        this.form.pay_password.length - 1
      );
    },
    selectBankcard(item) {
      this.bankcard = item;
      this.show = false;
    },
    goback() {
      this.$router.push("memberCenter");
    },
    submitBefore() {
      const { form, userInfo, bankcard, siteInfo } = this
      let reg = /.*\..*/
      if(reg.test(this.form.withdraw_money)) {
        this.$toast.fail(this.$t('取款金额只能为正整数，不能带小数点'))
        return false
      }
      if(userInfo && userInfo.is_pay_password !== 2) {
        this.$dialog.confirm({
          message: this.$t('您当前未设置资金密码！'),
          title: this.$t('温馨提示'),
          confirmButtonText: this.$t('去设置')
        }).then(() => {
          this.setFundPassword()
        }).catch(()=> {

        })
        return false
      }
      if (!form.withdraw_money) {
       this.$toast.fail(this.$t('请输入取款金额'))
        return false
      }
      if (form.withdraw_money < siteInfo.cost_manage.money_range[0]*1 || form.withdraw_money > siteInfo.cost_manage.money_range[1]*1) {
       this.$toast.fail(this.$t(`最低取款金额${siteInfo.cost_manage.money_range[0]}元，最高取款金额${siteInfo.cost_manage.money_range[1]}元`))
        return false
      }
      if (form.currency_type === '1') {
        if (!bankcard || !bankcard.id) {
          this.$toast.fail(this.$t('请选择取款银行卡'))
          return false
        }
        form.user_bank_id = bankcard.id
      } else {
        if (!form.dig_mode_type) {
          this.$toast.fail(this.$t('请选择虚拟币类型'))
          return false
        }
        if (!form.protocol) {
          this.$toast.fail(this.$t('请选择协议类型'))
          return false
        }
        if (!form.user_dig_wallet_id) {
          this.$toast.fail(this.$t('请输入提币地址'))
          return false
        }
      }
      this.showCapital = true
    },
    submit() {
      // const { form, bankcard } = this
      // if (!bankcard || !bankcard.id) {
      //   this.$toast.fail(this.$t('请选择取款银行卡'))
      //   return false
      // }
      if (!this.form.pay_password) {
       this.$toast.fail(this.$t('请输入资金密码'))
        return false
      }
      this.submiting = true
      let obj = {}
      Object.assign(obj,this.form)
      obj.money = this.fees.resFee
      obj.administrative_charge = this.fees.admin
      obj.discounts = this.fees.profit
      obj.service_charge = this.fees.fee
      withdraw(obj).then(res=> {
        // this.$toast.clear();
        if (res.data.code === 0) {
          this.$toast(this.$t('提交成功'))
          this.showCapital = false
          // this.form.withdraw_money = ""
          this.form.pay_password = ""
          this.submitInfo = true
        } else {
          this.$toast.fail(res.data.msg)
        }
        this.submiting = false
      },err=> {
        this.submiting = false
        this.showKeyboard = false
      })
    },
    showTips() {
      this.$dialog
        .confirm({
          title: this.$t('扣款详情'),
          message: this.$t('手续费：取款时根据取款金额收取的手续费<br>行政费：领取红利产生未达标的流水按照比例扣除的费用<br>扣除优惠：领取红利之后未达标流水要求时申请取款需要扣除的红利金额<br>最后可取：扣除手续费、行政费和优惠之后可以取款的总金额'),
          cancelButtonText: this.$t('联系客服'),
          messageAlign:'left',
        })
        .then(() => {
          // on confirm
        })
        .catch(() => {
          this.$openKefu();
        });
    },
    setFundPassword() {
      this.$store.dispatch("global/setPopShow", {
        status: true,
        passDisplay: true
      });
    },
    forgetFundPassword() {
      this.$store.dispatch("global/setPopShow", {
        status: true,
        idDisplay: true
      });
    },
    setAll() {
      console.log('www', this.wallet, this.userInfo)
      this.form.withdraw_money = Math.floor(this.userInfo.user_wallet.money)
    },
    onClickLeft() {
      this.$router.push({
        name: "memberCenter"
      });
    },
    onClickRight() {
      this.$openKefu();
    },
    closeStatus() {
      this.accountShow = false;
    },
    showBank() {
      this.show = true
    },
    onSelect(val) {
      this.bankcard = val
      this.show = false
    },
    getLimitinfo() {
      withdrawlimitinfo().then(res => {
        this.limitInfo = res.data.data
        if(this.form.withdraw_money) {
          this.getFee(this.form.withdraw_money)
        }
      })
      staticprotocol().then(res => {
        this.protocol = res.data.data
        console.log('ccc', this.form)
        if(!this.form.protocol && !this.form.dig_mode_type) {
          this.form.dig_mode_type = res.data.data[0].type
          this.form.protocol = res.data.data[0].protocol[0].value
          this.handleTicker(res.data.data[0].protocol[0].value)
          return
        }
        this.handleTicker(this.form.protocol)
      })
    },
    handleProtocol (val) {
      console.log(val)
      this.form.protocol = val
      this.handleTicker(val)
    },
    async handleTicker (val) {
      let res = await getticker({ digital_mode_type: val })
      this.ticker = res.data.data.upCoin
    },
    judgeCostMethod () { // 判断是否需要手续费 true 需要 false 不需要
      const costManage = this.siteInfo.cost_manage
      if (this.form.currency_type === '1') {
        if (!costManage.bank_limit_open) {
          return false
        }
        if (costManage.level_limit.indexOf(this.userInfo.level) !== -1) {
          return false
        }
        if (costManage.white_list.split(',').indexOf(this.userInfo.username) !== -1) {
          return false
        }
        return true
      } else {
        if (costManage.level_limit.indexOf(this.userInfo.level) !== -1) {
          return false
        }
        if (costManage.white_list.split(',').indexOf(this.userInfo.username) !== -1) {
          return false
        }
        return true
      }
    },
    handleChose(val) {
      this.form.protocol = val.type
      this.showDig = false
    },
    hideKeyboard() {
      this.showCapital = true
      if(!this.form.pay_password) {
        this.$toast.fail(this.$t('资金密码不能为空'));
        return false;
      }
      if(this.form.pay_password.length < 6) {
        this.$toast.fail(this.$t('资金密码由6个数字组成'));
        return false;
      }
      // this.submit()
    },
    checkNum() {
      let reg = /.*\..*/
      if(reg.test(this.form.withdraw_money)) {
        this.$toast.fail(this.$t('取款金额只能为正整数，不能带小数点'))
        return
      }
    },
    async handleAddress() {
      const time = parseTime((new Date()).getTime(), '{h}:{i}')
      const param = {
        type: this.form.dig_mode_type,
        protocol: this.form.protocol,
        address: this.form.address,
        remark: `${this.form.protocol} ${time}`
      }
      if(this.form.address) await adddigwallet(param)
      const res = await digwalletlist()
      console.log('res', res)
      this.form.user_dig_wallet_id = res.data.data[0].id
    }
  }
};
</script>

<style lang="less">
.withdraw-page {
  height: 100%;
  .m-body {
    padding-top: calc(@height-nav-bar + 20px) !important;
    height: 100%;
    background: #fff;
    &:after {
      content: "";
      position: absolute;
      height: 20px;
      top: @height-nav-bar;
      left: 0;
      width: 100%;
      background: #f5f6fa;
    }
  }
  /deep/ .m-header {
    background-color: @bg-color-white!important;
    box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.06);
  }
  .ui-buttons {
    // position: absolute;
    // bottom: 100px;
    padding: 0 30px;
    padding-bottom: 100px;
    width: 100%;
    // left: 0;
    .van-button.van-button--disabled {
      background-color: @bg-gradient-color!important;
      opacity: 0.5 !important;
      .van-button__text {
        color: #fff;
      }
    }
  }
  /deep/ .van-button {
    border-radius: 90px;
  }
  .van-tabs {
  .van-tabs__wrap{
    overflow: unset;
  }
  .van-tabs__nav {
    border-radius: 0.25rem;
    height: 80px !important;
    line-height: 80px !important;
    background: rgba(@bg-card-color, .1) !important;
    padding-bottom: 0 !important;
    .van-tab {
      border-radius: 0.25rem;
      height: 80px;
      line-height: 80px;
    }

    .van-tab--active {
      background: rgba(@color-tab-bar-active,.1);
    }
  }
  .van-tab__text--ellipsis{
    overflow: unset;
  }
  .tabsTitle{
    position: relative;
    span{
      font-size: 20px;
      padding:4px 10px;
      background: @primary-color;
      border-radius: 10px 10px 10px 2px;
      color: #191919;
      position: absolute;
      top:-6px;
      right: -100px;
      display: block;
      // width:122px;
      height: 36px;
      line-height: 36px;
      z-index: 9;
    }
  }
}

.van-tabs__wrap {
  border-bottom: none !important;
  border-radius: 0.25rem;
  height: 80px;
  line-height: 80px;
}

.van-tabs__line {
  background: none !important;
}
}
.withdraw-form {
  display: flex;
  flex-wrap: wrap;
  > li {
    width: 100%;
    border-bottom: 2px solid @border-color;
    color: #999;
    padding: 10px 0;
    &.ticker-tips{
      p{
        margin-top: 8px;
        font-size: 24px;
      }
      border:0;
    }
    &.dig-wrap{
      border:0;
      .input{
        height: 88px;
        line-height: 88px;
        border:2px solid @border-color;
        border-radius: 8px;
        margin-top: 30px;
        input{
          width: 100%;
          padding-left: 40px;
          font-size: 28px;
        }
        i{
          margin-right: 36px;
        }
        span{
          position: relative;
        }
        img{
          position: absolute;
          top: 50%;
          right: 36px;
          margin-top: -18px;
          width: 36px;
        }
      }
      .protocol{
        margin-top: 10px;
        span{
          display: inline-block;
          width: 200px;
          height: 80px;
          border-radius: 12px;
          border: 2px solid @border-color;
          line-height: 80px;
          text-align: center;
          font-size: 28px;
          margin-right: 20px;
          &.active{
            border: 4px solid @primary-color;
            color: @primary-color;
            opacity: 1;
          }
        }
      }
    }
    &:last-child {
      border: 0;
    }
    > label {
      display: block;
      font-size: 32px;
      line-height: 40px;
      margin-top: @space-gap;
      color: #333;
    }
    .input {
      height: 120px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 28px;
      &-head {
        color: #333;
        min-width: 40px;
        &.bank-icon {
          width: 100px;
        }
      }
      &-body {
        width: 100%;
        text-align: left;
        font-size: 32px;
        line-height: 40px;
        input,
        textarea {
          width: 100%;
          background-color: transparent;
          border: none;
        }
      }
      &-foot {
        min-width: 60px;
        display: flex;
        align-items: center;
        white-space: nowrap;
        .van-icon {
          font-size: 40px;
          margin-left: 10px;
          margin-right: 20px;
        }
        .withdrawAll {
          margin-right: 24px;
        }
      }
      .van-image {
        width: 60px;
      }
      h3 {
        margin: 0;
        font-weight: 500;
        margin-bottom: 10px;
        color: #333;
      }
      .red {
        color: #f66;
      }
    }
    .van-password-input {
      margin: @space-gap 0;
      li {
        i {
          background-color: @primary-color;
        }
      }
    }
    &.charge {
      label {
        color: #333;
        font-weight: bold;
        display: flex;
        align-items: center;
        .van-icon {
          color: @bg-gradient-color;
          margin-left: 20px;
        }
      }
    }
  }
}

.aagames-tips {
  margin-top: @space-gap;
  width: 100%;
  text-align: center;
}

.table {
  margin-top: @space-gap;
}
.table thead th {
  background-color: #edeff6;
  border: 2px solid rgba(255, 255, 255, 1);
}
.table tbody td {
  border-color: #edeff6;
  box-sizing: border-box;
  &:last-child {
    color: #4180ff;
  }
}
.van-popup {
  max-height: 70%;
}
.pop-head {
  // position: absolute;
  // top:0;
  // top:30%;
  // width:100%;
}
.custom {
  display: flex;
  flex-direction: column;
  .footer-tips {
    margin-top: 20px;
  }
  &.topPass {
    transition: all 1s;
    height: 70%;
  }
  .input {
    min-height: 120px;
    // display: flex;
    // align-items: center;
    justify-content: space-between;
    font-size: 28px;
    &-body {
      width: 100%;
      text-align: left;
      font-size: 32px;
      line-height: 40px;
      input,
      textarea {
        width: 100%;
        background-color: transparent;
        border: none;
      }
    }
  }
  .forgetPass {
    display: block;
    font-size: 32px;
    line-height: 40px;
    margin-top: @space-gap;
  }
}
.pop-body {
  flex: 1;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  table {
    border-radius: 4px;
    border: 2px solid @border-color;
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 30px;
    thead {
      tr {
        th {
          width: 25%;
          line-height: 96px;
        }
      }
    }
    tbody {
      tr {
        td {
          text-align: center;
          line-height: 100px;
          border-top: 2px solid @border-color;
          border-right: 2px solid @border-color;
          border-bottom: 2px solid @border-color;
          &:nth-child(4) {
            border-right: 0;
          }
        }
      }
    }
    tfoot {
      tr {
        td {
          text-align: center;
          font-size: 28px;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
          line-height: 80px;
        }
      }
    }
  }
}
.recharge-bottom {
  padding: 0 @space-gap;
  .tips {
    font-size: 32px;
    color: #999;
    text-align: center;
    line-height: 44px;
    margin-top: 30px;
    margin-bottom: 30px;
  }
  .btn-group {
    .van-button {
      margin-top: 40px;
    }
  }
}
.pay-mark {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  text-align: center;
  > * {
    width: 100%;
  }
  .clock {
    margin-bottom: @space-gap;
    .van-image {
      width: 120px;
      height: 120px;
      margin-bottom: @space-gap / 2;
    }
    span {
      display: block;
      width: 100%;
      color: @primary-color;
    }
  }
  .money-text {
    font-size: 60px;
    color: #ccc;
  }
  h3 {
    margin: 0;
    font-size: 36px;
    color: #ccc;
    margin-bottom: @space-gap;
  }
  p {
    line-height: 1.4;
  }
}
</style>
