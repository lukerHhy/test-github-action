<template>
  <div class="withdraw">
    <van-nav-bar
         :title="$t('佣金提款')"
        left-arrow
        fixed
        @click-left="onClickLeft"
        :border="false"
        color="#fff"
        style="background :#191919; color: #fff;"
    />
    <div style="margin-top: 1rem"/>
    <van-tabs @disabled="onClickDisabled">
      <van-tab  :title="$t('提款至银行卡')">
        <withdrawBank/>
      </van-tab>
      <van-tab  :title="$t('提款至钱包')">
        <withdrawWallet/>
      </van-tab>
      <van-tab  :title="$t('钱包充值')" disabled/>
    </van-tabs>
    <popup :value="depositWallet">
      <div class="depositpPop">
        <div class="close" @click="close">
          <span class="iconfont icon-close"/>
        </div>
        <div class="title">{{$t('钱包充值')}}</div>
        <div class="containerPop">
          <div class="img">
            <img src="./images/Personalcenter.png"/>
          </div>
          <p class="p-text">{{$t('代理钱包充值请联系')}}</p>
          <p class="serve" @click="$openKefu">{{$t('在线客服')}}</p>
        </div>
      </div>
    </popup>
  </div>
</template>
<script>
import withdrawBank from './withdrawBank'
import withdrawWallet from './withdrawWallet'
import popup from '../activity/wheelSurf/popup'

export default {
  components: {withdrawBank, withdrawWallet, popup},
  data() {
    return {
      url: '',
      depositWallet: false,
    }
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    onClickDisabled() {
      this.depositWallet = true
    },
    close() {
      this.depositWallet = false
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

.withdraw {
  background: #191919;
  width: 100%;
  height: 100%;
}

/deep/ .van-tabs__line {
  height: 0.1rem;
  width: 0.8rem !important;
  background: #c8a77f;
}

.van-nav-bar /deep/ .van-nav-bar__title,
.van-nav-bar /deep/ .van-nav-bar__left .van-icon,
.van-nav-bar /deep/ .van-nav-bar__right .van-nav-bar__text {
  color: #fff;
  font-size: 0.43rem;
}

.depositpPop {
  width: 80%;
  background: #282828;
  border-radius: 0.2rem;
  margin: 28% auto 0;
  position: relative;

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

    .icon-gantanhao {
      color: #999999;
      font-size: 1rem;
    }

    .p-text {
      font-size: 0.42rem;
      color: #999999;
      padding: 0.4rem 0 0;
      text-align: center;
    }

    .serve {
      font-size: 0.42rem;
      text-align: center;
      padding: 0.2rem 0 0.8rem;
      color: #c8a77f;
    }

    .flex {
      display: flex;
      justify-content: space-between;
      //align-items: center;
    }
  }
}
</style>
