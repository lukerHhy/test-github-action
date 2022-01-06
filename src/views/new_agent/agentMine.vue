<template>
  <div id="mine">
    <div style="padding: 0.6rem 0.4rem;">
      <div class="member">
        <div class="avatar 222">
          <Loadimg :src="img"/>
        </div>
        <div class="right">
          <div class="name">{{ userInfo.username }}</div>
          <div class="desc">
            {{$t('这是您成为')}} {{ $t($config[$projectname].project) }}{{$t('代理的第')}}{{
              userInfo.day + 1
            }}{{$t('天')}}
          </div>
        </div>
      </div>
      <div class="infocard">
        <div class="flex">
          <dl>
            <img src="./images/comm.png" class="iconfont" alt=""/>
            <dd>{{$t('我的佣金')}}</dd>
            <dd class="t">
              {{ Number(userInfo.commission_money).toFixed(2) || 0.0 }}
            </dd>
          </dl>
          <dl>
            <img src="./images/money.png" alt="" class="iconfont"/>
            <dd>{{$t('我的钱包')}}</dd>
            <dd class="t">{{ userInfo.money || 0.0 }}</dd>
          </dl>
        </div>
        <div class="buttonGroup">
          <button class="btn withdraw" @click="withdraw">{{$t('提款')}}</button>
          <!-- <button v-if="userInfo.deposit_switch == 2" class="btn" @click="deposit">{{$t('充值')}}</button> -->
          <button class="btn deposit" @click="deposit">{{$t('充值')}}</button>
          <!-- <button v-else @click="depositServe" class="btn">{{$t('充值')}}</button> -->
          <button class="btn transfer" @click="transferIn">{{$t('转入')}}</button>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="list">
        <div class="lev" @click="$router.push('/moneyExchange')">
          <div>
            <span class="iconfont icon-caiwubaobiao1"></span>
            <span>{{$t('财务报表')}}</span>
          </div>
          <div>
            <span class="iconfont icon-dayuhao"></span>
          </div>
        </div>
      </div>
      <div class="list">
        <div class="lev border">
          <div>
            <span
                style="font-size:0.5rem"
                class="iconfont icon-activityshoujihaoma"/>
            <span>{{$t('手机号码')}}</span>
          </div>
          <div>
            <!-- {{ userInfo.mobile }} -->
            <span v-if="userInfo.mobile"
                  style="color: #fff"
                  class="act"
                  @click="openpop">{{
                userInfo.mobile.substr(0, 3) + ' **** ' + userInfo.mobile.substr(7, 11)
              }}
            </span>
            <!-- @click="passwordShow = true" -->
            <span class="act" v-else @click="openpop">{{$t('未绑定')}}</span>
            <span class="iconfont icon-dayuhao"/>
          </div>
        </div>
        <div class="lev border" @click="phoneEmailPop">
          <div>
            <span class="iconfont icon-activityyouxiangdizhi"></span>
            <span>{{$t('邮箱地址')}}</span>
          </div>
          <div>
            <span class="act">{{ userInfo.email ? $t('已绑定') : $t('未绑定') }}</span>
            <span class="iconfont icon-dayuhao"></span>
          </div>
        </div>
        <div class="lev border" @click="contactInfoPop">
          <div>
            <span class="iconfont icon-activityQQhaoma"></span>
            <span>{{$t('QQ号码')}}</span>
          </div>
          <div>
            <span class="act">{{ userInfo.qq ? $t('已绑定') : $t('未绑定') }}</span>
            <span class="iconfont icon-dayuhao"></span>
          </div>
        </div>
        <div class="lev border" @click="contactInfoPop">
          <div>
            <span class="iconfont icon-activityweixin"></span>
            <span>{{$t('微信')}}</span>
          </div>
          <div>
            <span class="act">{{ userInfo.wechat ? $t('已绑定') : $t('未绑定') }}</span>
            <span class="iconfont icon-dayuhao"></span>
          </div>
        </div>
        <div class="lev border" @click="contactInfoPop">
          <div>
            <span class="iconfont icon-activitySkype"></span>
            <span>Skype</span>
          </div>
          <div>
            <span class="act">{{ userInfo.skype ? $t('已绑定') : $t('未绑定') }}</span>
            <span class="iconfont icon-dayuhao"></span>
          </div>
        </div>
        <div class="lev border" @click="promotePop">
          <div>
            <span class="iconfont icon-activitytuiguang"></span>
            <span>{{$t('在推广页展示')}}</span>
          </div>
          <div>
            <!--          <span class="act">{{$t('未绑定')}}</span>-->
            <span class="iconfont icon-dayuhao"></span>
          </div>
        </div>
      </div>
      <div class="list">
        <div class="lev border" @click="passwordPop">
          <div>
            <span class="iconfont icon-activityQQhaoma"></span>
            <span>{{$t('修改登录密码')}}</span>
          </div>
          <div>
            <span class="iconfont icon-dayuhao"></span>
          </div>
        </div>
        <div class="lev border" @click="paymentPop">
          <div>
            <span class="iconfont icon-activityketikuanyue"></span>
            <span>{{$t('支付密码')}}</span>
          </div>
          <div>
            <span class="act">{{
                userInfo.pay_password !== null ? $t('已设置') : $t('未设置')
              }}</span>
            <span class="iconfont icon-dayuhao"></span>
          </div>
        </div>
        <div class="lev border" @click="addCard">
          <div>
            <span class="iconfont icon-activityyinhangka"></span>
            <span>{{$t('添加银行卡')}}</span>
          </div>
          <div>
            <span class="iconfont icon-dayuhao"></span>
          </div>
        </div>
      </div>
      <div class="list">
        <div class="lev">
          <button class="logout" @click="logOut">{{$t('退出登录')}}</button>
        </div>
      </div>
    </div>
    <Email
        :emailValue.sync="emailValue"
        :userInfo.sync="userInfo"
        @user="user"
        @cancel="cancel"
    />
    <contactInfo
        :contactValue.sync="contactValue"
        :userInfo.sync="userInfo"
        @user="user"
        @cancel="contactValue = false"
    />
    <PaymentPassword
        :paymentPassword.sync="paymentPassword"
        :userInfo.sync="userInfo"
        @user="user"
        @cancel="paymentPassword = false"
    />
    <transfer
        :transferInValue="transferInValue"
        :userInfo="userInfo"
        @cancel="transferInValue = false"
    />
    <popup :value="passwordValue">
      <div class="phonePop">
        <div class="title">{{$t('修改登录密码')}}</div>
        <div class="containerPop">
          <input
              type="password"
              v-model="setPass.old_password"
               :placeholder="$t('请输入原密码')"
          />
          <input
              type="password"
              v-model="setPass.password"
               :placeholder="$t('请输入新密码')"
          />
          <input
              type="password"
              v-model="setPass.repassword"
               :placeholder="$t('确认新密码')"
          />
          <div class="flex">
            <button class="cancel" @click="passwordValue = false">{{$t('取消')}}</button>
            <button class="submitBtn" @click="changePass">{{$t('提交')}}</button>
          </div>
        </div>
      </div>
    </popup>
    <popup :value="promoteValue">
      <div class="phonePop">
        <div class="title">{{$t('推广页展示')}}</div>
        <div class="containerPop">
          <p class="p-text">{{$t('筛选想要在推广图上展示的信息')}}</p>
          <div
              class="flex promote"
              v-for="(item, index) in typeContact"
              :key="index">
            <div>
              <span class="iconfont" :class="[type[index + 1]]"/>
              <span style="margin-left: 0.2rem">
                {{ $t(item[index + 1].replace('帐号', '')) }}
              </span>
            </div>
            <input
                type="checkbox"
                class="check"
                :checked="item.checked"
                :id="item[index + 1]"
                @change="pushList(item, index + 1)"/>
            <label :for="item[index + 1]"/>
          </div>
          <div class="flex">
            <button class="cancel" @click="promoteValue = false">{{$t('取消')}}</button>
            <button class="submitBtn" @click="submitType">{{$t('提交')}}</button>
          </div>
        </div>
      </div>
    </popup>
    <popup :value="depositPop">
      <div class="depositPop">
        <div class="close" @click="depositPop = false">
          <span class="iconfont icon-close"></span>
        </div>
        <div class="title">{{$t('钱包充值')}}</div>
        <div class="containerPop" style="    padding-bottom: 0.5rem;">
          <div class="img">
            <img src="./images/Personalcenter.png" alt=""/>
          </div>
          <p class="p-text" style="text-align: center;margin-top: 0.3rem">
{{$t('代理钱包充值请联系')}}
            <span class="serve" @click="$openKefu">{{$t('在线客服')}}</span>
          </p>
        </div>
      </div>
    </popup>
    <van-action-sheet
        closeable
        v-model:show="passwordShow"
         :description="$t('设置资金密码')">
      <p class="wj" @click="$router.push('/personalData')">{{$t('请输入新资金密码')}}</p>
      <van-password-input
          :value="pay_password"
          :gutter="10"
          :focused="showKeyboard"
          @focus="showKeyboard = true"
      />
      <p class="wj" @click="$router.push('/personalData')">{{$t('确认新资金密码')}}</p>
      <van-password-input
          :value="agepay_password"
          :gutter="10"
          :focused="ageshowKeyboard"
          @focus="ageshowKeyboard = true"
      />
      <p class="issue">
        {{$t('遇到问题，联系')}}<span @click="$openKefu()">{{$t('专属客服')}}</span>
      </p>
      <van-number-keyboard
          v-model="pay_password"
          :show="showKeyboard"
          @blur="showKeyboard = false"
      />
      <van-number-keyboard
          v-model="agepay_password"
          :show="ageshowKeyboard"
          @blur="ageshowKeyboard = false"
      />

      <!-- <van-button
        @click="pushagentdeposite"
        color="@primary-color"
        style="width: 80%;margin-left: .8rem;display: block;"
        >{{$t('确认')}}</van-button
      > -->
      <div :style="{ width: '100%', height: showKeyboard ? '6rem' : '1rem' }"/>
    </van-action-sheet>
    <loading :isShow="isLoading" :title="$t('提交中...')"/>
  </div>
</template>
<script>
import Loadimg from './components/img'
import Loading from '@/components/loading'
import popup from '../activity/wheelSurf/popup'
import {agentSetting, bankcardlist, bindType, contactTypeList, setpass, userinfo, agentonlinecheck} from '@/api/agent'
import Email from './components/email'
import contactInfo from '@/views/new_agent/components/contactInfo'
import PaymentPassword from './components/paymentPassword'
import transfer from './transferIn'
import moment from 'moment'
import {Dialog, Toast} from 'vant'
import {agPassword} from '@/utils'
import {mapActions, mapState} from 'vuex'

export default {
  components: {
    Loading,
    Loadimg,
    popup,
    Email,
    PaymentPassword,
    contactInfo,
    transfer,
  },
  data() {
    return {
      ageshowKeyboard: false,
      passwordShow: false,
      pay_password: '',
      agepay_password: '',
      showKeyboard: false,
      img: null,
      emailValue: false,
      passwordValue: false,
      promoteValue: false,
      paymentPassword: false,
      contactValue: false,
      transferInValue: false,
      bankList: [],
      userInfo: {},
      contactList: [],
      setPass: {
        old_password: '',
        password: '',
        repassword: '',
      },
      type: {
        '1': 'icon-activityQQhaoma',
        '2': 'icon-activityweixin',
        '3': 'icon-activitySkype',
      },
      type2: {
        QQ帐号: '1',
        微信帐号: '2',
        skype帐号: '3',
      },
      sbList: [],
      typeContact: [],
      isLoading: false,
      depositPop: false,
      depositSwitch: '',
      spreadSwitch: '',
    }
  },
  watch: {
    deep: true,
    userInfo(newval) {
      window.localStorage.setItem('userInfo', JSON.stringify(newval))
    },
    pay_password() {
      if (this.pay_password.length === 6) {
        this.ageshowKeyboard = true
      }
    },
    agepay_password() {
      if (this.agepay_password.length === 6) {
        if (this.agepay_password === this.pay_password) {
        } else {
          this.$toast(this.$t('两次密码不一致'))
        }
      }
    },
  },
  created() {
    this.agentSet() //代理的默认配置
    this.user()
    let img = null;
    try {
      img = require('@assets/img3_0/agent/touxiang.png')
    } catch (error) {
      img = require('./images/touxiang.png')
    }
    
    this.img = img
  },
  mounted() {
    this.Emit.$on('agentSet', this.agentSet)
    this.Emit.$on('user', this.user)
  },
  methods: {
    ...mapActions('global', ['setPopShow']),
    openpop() {
      this.setPopShow({telDisplay: true, status: true})
    },
    agentSet() {
      agentSetting({
        access_token: window.localStorage.agToken,
        merchant_no: process.env.VUE_APP_MERCHANT_NO,
      }).then((res) => {
        if (res.data.code === 0) {
          const data = res.data.data
          if (data.deposit_config) this.depositSwitch = data.deposit_config
        }
      })
    },
    addCard() {
      this.$router.push('agBankBind')
    },
    async user() {
      this.isLoading = true;
      const {data} = await userinfo({
        access_token: window.localStorage.agToken,
      })
      if (data.code === 0) {
        this.isLoading = false
        this.userInfo = data.data
        let t2 = moment(data.data.created_at)
        console.log(222, this.userInfo)
        this.userInfo.day = moment().diff(t2, 'days')
        window.localStorage.setItem('userInfo', JSON.stringify(data))
      }
      if (this.userInfo.deposit_switch) {
        this.depositSwitch = this.userInfo.deposit_switch
      }
    },
    //开启弹窗联系客服充值
    depositServe() {
      this.depositPop = true
    },
    deposit() {
      this.$router.push('/agentDeposit')
    },
    transferIn() {
      this.transferInValue = true
    },
    phoneEmailPop() {
      this.emailValue = true
    },
    passwordPop() {
      this.passwordValue = true
    },
    paymentPop() {
      this.paymentPassword = true
    },
    promotePop() {
      let that = this
      that.promoteValue = true
      this.isLoading = true
      this.user()
      contactTypeList({
        access_token: window.localStorage.token,
        merchant_no: process.env.VUE_APP_MERCHANT_NO,
      })
          .then((res) => {
            if (res.data.code === 0) {
              this.isLoading = false
              that.contactList = res.data.data
              that.typeContact = []
              // 先循环接口数据放到一个数组里
              for (let i in that.contactList) {
                that.typeContact.push({[i]: that.contactList[i]})
              }
              // 加checked 属性
              that.typeContact.forEach(function (element, index) {
                that.$set(that.typeContact[index], 'checked', false)
              })
              that.typeContact.forEach((item, index) => {
                let keyName = Object.keys(item)[0]
                let showItems = that.userInfo.contact_show
                if (showItems.indexOf(parseInt(keyName)) > -1) {
                  that.$set(that.typeContact[index], 'checked', true)
                }
              })
            }
          })
          .finally(() => {
            this.isLoading = false
          })
    },
    contactInfoPop() {
      this.contactValue = true
    },
    cancel() {
      this.emailValue = false
    },
    changePass() {
      if (!this.setPass.old_password) {
        this.$toast.fail(this.$t('请输入您的原登录密码'))
        return false
      }
      if (!agPassword(this.setPass.password)) {
        this.$toast.fail(this.$t('登录密码由6-12位英文字母或数字组成'))
        return false
      }
      if (this.setPass.password !== this.setPass.repassword) {
        this.$toast.fail(this.$t('您两次输入的登录密码不一致'))
        return false
      }
      setpass(this.setPass).then((res) => {
        if (res.data.code === 0) {
          const that = this
          this.$toast({
            message: this.$t('登录密码修改成功'),
          })
          this.passwordValue = false
          this.logOut()
        } else {
          this.$toast.fail(res.data.msg)
        }
      })
    },
    logOut() {
      const This = this
      Dialog.confirm({
        message: this.$t('是否退出登录？'),
      })
      .then(() => {
        this.setAgentStatus(window.localStorage.agToken)
        // window.localStorage.removeItem('agToken')
        // window.localStorage.removeItem('userInfoForAgent')
        // this.$router.push('agentAuth/login')
      })
      .catch(() => {
      })
    },
    setAgentStatus(access_token) {
      agentonlinecheck({access_token, option: 2}).then(res => {
        window.localStorage.removeItem('agToken')
        window.localStorage.removeItem('userInfoForAgent')
        this.$router.push('agentAuth/login')
      })
    },
    withdraw() {
      bankcardlist({access_token: window.localStorage.agToken}).then(
          (res) => {
            if (res.data.code === 0) {
              this.bankList = res.data.data
              if (this.bankList.length === 0) {
                Toast.fail(this.$t('请先添加银行卡'))
                this.$router.push('/agBankBind')
              } else {
                this.$router.push('/moneyWithdraw')
              }
            }
          }
      )
    },
    pushList(item, index) {
      const checked = document.getElementById(item[index]).checked
      if (checked) {
        this.sbList.push(this.type2[item[index]])
      } else {
        this.sbList.remove(this.type2[item[index]])
      }
    },
    bindType(type) {
      bindType({
        contact_show: type,
      }).then((res) => {
        if (res && res.data && res.data.code === 0) {
          Toast({
            message: this.$t('设置成功'),
            icon: '',
          });
          this.promoteValue = false
          this.user()
        }
      })
    },
    submitType() {
      console.log(this.sbList, '999')
      if (this.sbList.join(',') === '') {
        this.bindType('4')
      } else {
        this.bindType(this.sbList.join(','))
      }
    },
  },
}
</script>
<style scoped lang="less">
.agentApp {
  padding: 0.2rem 0 !important;
}

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
  color: #fff;
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

/deep/ .van-action-sheet__description {
  color: #fff;
  font: 28px;
}

/deep/ .van-popup--bottom {
  background: #282828 !important;
}

/deep/ .van-picker .van-picker__toolbar {
  /* background-color: #D6BDA3; */
  // color: #FFFFFF;
  border-bottom: 2px solid #313133;
}

.infocard {
  width: 100%;
  height: 3.8rem;
  background: url(images/bg.png) no-repeat;
  background-size: 100% 100%;
  margin-top: 0.5rem;
}

#mine {
  //padding: 0.6rem 0.4rem;
  background-color: #151515;
}


.member {
  box-sizing: border-box;
  display: flex;

  .avatar {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    margin-right: 26px;
    background-size: cover;
    background-position: center;
    img{
      width: 100%;
    }
  }

  .right {
    flex: 1;

    .name {
      height: 56px;
      font-size: 40px;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      line-height: 56px;
      margin-top: 10px;
    }

    .desc {
      margin-top: 10px;
      height: 34px;
      font-size: 24px;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      line-height: 34px;
    }
  }
}

.infocard {
  .flex {
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: #fff7ec;
    font-size: 0.4rem;

    dl {
      margin-top: 0.5rem;
    }

    .t {
      color: #f5f5f5;
      font-size: 0.4rem;
      margin-top: 0.2rem;
      text-align: center;
    }
  }

  .buttonGroup {
    width: 92%;
    margin: 0.2rem auto;
    display: flex;

    .btn {
      width: 3.92rem;
      height: 0.96rem;
      background: #ffecd1;
      border-radius: 0.13rem;
      border: none;
      margin: 0 0.1rem;
      color: #6d4e2a;
      font-size: 0.43rem;
    }

    .empty {
      background: none;
      color: #ffecd1;
      border: 1px solid #ffecd1;
      margin-left: 0.32rem;
    }
  }

  .iconfont {
    font-size: 0.9rem;
    color: #956b3b;
    float: left;
  }
}

.list {
  margin: 0 0 0.4rem;
  //width: 100vw;
  position: relative;


  .iconfont {
    font-size: 0.4rem;
    vertical-align: middle;
    margin-right: 0.25rem;
    color: #515151;
  }

  .lev {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #999999;
    font-size: 0.43rem;
    padding: 0.4rem 0.4rem;
    //border-bottom: 1px solid #353333;
    background: #191919;
  }

  .border {
    border-bottom: 1px solid #343434;

    .act {
      font-size: 0.37rem;
      color: #515151;
      margin-right: 0.3rem;
    }
  }

  .logout {
    background: #353435;
    color: #ccc;
    width: 8.4rem;
    height: 1.3rem;
    border: none;
    border-radius: 10px;
    margin: 0 auto 70px;
  }
}

.emailPop,
.phonePop,
.depositPop {
  width: 80%;
  background: #282828;
  border-radius: 10px;
  margin: 50% auto 0;
  position: relative;

  .title {
    color: #f5f5f5;
    font-size: 0.48rem;
    text-align: center;
    border-bottom: 1px solid #343434;
    padding: 0.5rem 0;
  }

  .close {
    font-size: 0.56rem;
    color: #ccc;
    text-align: right;
    position: absolute;
    right: 11px;
    top: 7px;
  }

  .img {
    text-align: center;
  }

  .containerPop {
    width: 90%;
    margin: 0.3rem auto 0;

    .flex {
      display: flex;
      justify-content: space-between;
      //align-items: center;
    }

    input {
      width: 100%;
      height: 1.12rem;
      border: 1px solid #505050;
      border-radius: 10px;
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
      border: 1px solid @primary-color;
      color: @primary-color;
      font-size: 0.37rem;
      height: 1.1rem;
      border-radius: 10px;
    }

    .cancel,
    .submitBtn {
      background: none;
      border: 1px solid @primary-color;
      color: @primary-color;
      font-size: 0.37rem;
      height: 1.1rem;
      width: 3.2rem;
      border-radius: 10px;
      margin-top: 0.3rem;
      margin-bottom: 0.5rem;
    }

    .submitBtn {
      background: @primary-color;
      color: #191919;
      border: none;
    }

    .p-text {
      color: #ccc;
      font-size: 0.37rem;
      margin: 0.2rem 0;
    }

    .serve {
      font-size: 0.42rem;
      text-align: center;
      padding: 0.2rem 0 0.8rem;
      color: @primary-color;
    }

    .promote {
      color: #ccc;
      font-size: 0.37rem;
      align-items: center;
      margin: 0.4rem 0;

      .check + label {
        width: 0.5rem;
        height: 0.5rem;
        background: none;
        border-radius: 5px;
        border: 1px dotted #727272;
        display: inline-block;
        text-align: center;
        vertical-align: middle;
        line-height: 20px;
      }

      .check:checked + label {
        background-color: @primary-color;
      }

      .check:checked + label:after {
        content: '✓';
        line-height: initial;
        text-align: center;
        color: #fff;
      }

      .check {
        display: none;
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
