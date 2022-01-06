<template>
  <div>
    <popup v-model="show" direction="right">
      <div class="container">
        <div class="nav-top">
          <van-icon name="arrow-left" @click="show = false" />
        </div>
        <img class="activityimg" src="./assets/img/activityrule.png" />
        <div class="cot">
          <p v-for="i in text" :key="i">
            {{ i }}
          </p>
        </div>
      </div>
    </popup>
  </div>
</template>
<script>
import popup from './popup'
import Lheader from '@/components/l-header'
export default {
  components: { popup, Lheader },
  data() {
    return {
      show: false,
      text: '',
    }
  },
  methods: {
    isshow() {
      this.show = true
    },
    getconfig(item) {
      const { luxurious, newer } = item
      this.text = [
        `01.本活动分为新手转盘和豪客转盘，新手转盘只有新注册账号并在注册后的${newer.condition.newer_days}天内享有旋转资格(注:新注册账号绑定银行卡，手机号并填写全部个人信息免费赠送一次新手转盘机会)`,
        `02.新手转盘获得旋转机会方式：单笔存款${
          newer.condition.recharge
        }元,满足${
          newer.condition.flow
        }倍流水即可享有1次新手转盘机会,单笔存款${newer.condition.recharge *
          10}元，满足${
          newer.condition.flow
        }倍流水直接赠送10次旋转机会，单笔存款${
          luxurious.condition.recharge
        }元，满足豪客转盘要求则直接赠送豪客转盘旋转机会`,
        `03.豪客转盘活动选择机会方式单笔存款${
          luxurious.condition.recharge
        }元，满足${
          luxurious.condition.flow
        }倍流水即可享有1次豪客转盘机会，单笔存款${luxurious.condition.recharge *
          10}元，满足${
          luxurious.condition.flow
        }倍流水直接赠送10次豪客转盘旋转机会`,
        `04.所有直送礼金只需要${newer.gift_config.bonus_withdraw}倍流水即可提款`,
        `05.所有存送机会需要满足流水倍数才能提款，新手转盘存送满足${newer.gift_config.bonus_recharge}倍流水，豪客转盘存送满足${luxurious.gift_config.bonus_recharge}倍流水即可申请提款。`,
        '06.本活动与洗码活动共享',
        '07.本优惠活动只针对娱乐性质的会员，如发现用户拥有超过-一个账户，包括同-姓名，同一邮箱，同一相似P地址，同一住址，同-银行卡,同一电脑，软件投注和套免费游戏等其他任何不正常投注行为，一经发现万趣娱乐将保留东结帐户盈利及余额的权利。',
        '08.万趣娱乐拥有最终解析权',
      ]
    },
  },
}
</script>
<style scoped lang="less">
.nav-top {
  padding-left: 0.3rem;
  font-size: 0.6rem;
  color: #fff;
  height: 1rem;
  line-height: 2rem;
}
.activityimg {
  width: 82%;
  margin: auto;
  display: block;
  margin: 0 0 0.3rem 0.6rem;
}
.container {
  width: 100%;
  height: 100%;
  background: url(./assets/img/bg-normal.jpg) no-repeat center top;
  background-size: cover;
  overflow-y: scroll;
}
.cot {
  width: 88%;
  border: 1px solid #cbab85;
  border-radius: 5px;
  margin: auto;
  padding: 0.3rem;
  margin-bottom: 1rem;
  p {
    color: #cbab85;
    font-size: 3vw;
    line-height: 0.5rem;
    margin-bottom: 0.4rem;
    line-height: 0.5rem;
    font-family: system-ui;
  }
}
</style>
