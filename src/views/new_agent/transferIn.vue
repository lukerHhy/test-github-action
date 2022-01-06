<template>
  <popup :value="transferInValue">
    <div class="transferInPop">
      <div
        class="close"
        @click="close"
      >
        <span class="iconfont icon-close"></span>
      </div>
      <div class="title">{{$t('代理钱包充值')}}</div>
      <div class="containerPop ">
        <p class="text">
          {{$t('可用余额')}}：<span style="color: #ccc"
            >{{ userInfo.commission_money }}元</span
          >
        </p>
        <div>
          <label style="margin-right: 0.3rem">{{$t('内充金额')}}</label><input
            type="number"
            v-model="money"
            :placeholder="$t('请输入金额')"
            class="input"
          />
        </div>
        <div class="flex">
          <div
            class="line"
            :class="{ isActive: active === 1 }"
            @click="transfer(1)"
          >
            {{$t('在线充值')}}
          </div>
          <div
            class="line pr"
            :class="{ isActive: active === 2}"
            @click="transfer(2)"
          >
          <span :class="{'shrink':lang==='en'}"> {{$t('佣金钱包转移')}}</span> 
          </div>
        </div>
        <div style="text-align: center;">
          <button
            class="submitBtn"
            @click="agentDeposite"
          >{{$t('确认')}}</button>
        </div>
      </div>
    </div>
  </popup>
</template>
<script>
import popup from '../activity/wheelSurf/popup'
import { commissiontrans } from '@/api/agent'
import { Toast } from 'vant'
export default {
  components: { popup },
  props: ['transferInValue', 'userInfo'],
  data() {
    return {
      active: 1,
      money: '',
    }
  },
  methods: {
    transfer(val) {
      this.active = val
      if (this.active === 1) {
        this.$router.push('/agentDeposit')
      }
    },
    agentDeposite() {
      if (this.money === '') {
        Toast.fail(this.$t('请输入内充金额'))
      }
      commissiontrans({
        money: this.money,
      }).then((res) => {
        if (res.data.code === 0) {
          // this.transferInValue = false
          console.log(this.$parent)
          //       this.user()
          // this.agentSet()
          this.$parent.user()
          this.$parent.agentSet()
          this.$parent.transferInValue = false
          Toast.fail(this.$t('转入成功'))
        }
      })
    },
    close() {
      this.$emit('cancel', false)
    },
  },
}
</script>
<style scoped lang="less">
/deep/ .van-picker .van-picker__toolbar {
  /* background-color: #D6BDA3; */
  // color: #FFFFFF;
  border-bottom: 2px solid #313133;
}
.transferInPop {
  width: 80%;
  background: #282828;
  border-radius: 0.2rem;
  margin: 50% auto 0;
  position: relative;
  .close {
    font-size: 0.56rem;
    color: #999;
    text-align: right;
    position: absolute;
    right: 11px;
    top: 7px;
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
    color: #999;
    .radio {
      width: 0.4rem;
      height: 0.4rem;
      vertical-align: sub;
    }
    label {
      font-size: 0.37rem;
    }
    .text {
      text-align: left;
      font-size: 0.37rem;
      margin: 0.3rem 0 0.3rem 0;
    }
    .submitBtn {
      font-size: 0.37rem;
      height: 1.1rem;
      width: 100%;
      border-radius: 10px;
      margin: 0.3rem auto 0.5rem;
      background: #c8a77f;
      color: #191919;
      border: none;
    }
  }
  .input {
    width: 75%;
    height: 1.12rem;
    border: 1px solid #525152;
    border-radius: 5px;
    background: none;
    margin-bottom: 0.3rem;
    padding-left: 0.2rem;
    color: #fff;
  }
  .input::placeholder {
    color: #999;
  }
}
.flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .line {
    border: 1px solid #525152;
    color: #c8a77f;
    font-size: 0.37rem;
    height: 1.1rem;
    width: 3.2rem;
    border-radius: 5px;
    margin-top: 0.3rem;
    margin-bottom: 0.5rem;
    text-align: center;
    line-height:1.1rem;
  }
  .isActive {
    border: 1px solid #c8a77f;
  }
}
/deep/ .van-tabs__line {
  height: 0.1rem;
  width: 0.8rem !important;
  background: #c8a77f;
}
.van-nav-bar /deep/ .van-nav-bar__title,
.van-nav-bar /deep/ .van-nav-bar__left .van-icon,
.van-nav-bar /deep/ .van-nav-bar__right .van-nav-bar__text {
  color: #fff !important;
  font-size: 0.43rem;
}
</style>
