<template>
  <div id="home">
    <van-nav-bar
      left-text=""
      left-arrow
      fixed
      @click-left="$router.push('/')"
    >
      <template #title>
        <span style="color:#FFFFFF">{{ siteInfo.title }}</span>
      </template>
    </van-nav-bar>
    <Banner></Banner>
    <Homolayout :title="$t('数据概览')">
      <div class="date-line">
        <van-tabs
          @click="fetchAgentRelation"
        >
          <van-tab :title="$t('今天')" />
          <van-tab :title="$t('昨天')" />
          <van-tab :title="$t('本周')" />
          <van-tab :title="$t('本月')" />
        </van-tabs>
      </div>
      <ul class="overviewCss">
        <li
          v-for="(item, i) in getOverview"
          :key="i"
          @click="overviewTipsClick(item.tips)"
        >
          <p
            class="overviewCssAmout"
            v-html="priceFilter(agentrelation[item.key])"
          />
          <p class="overviewCssText">{{ item.text }}
            <van-icon
              v-if="item.tips"
              name="question-o"
            />
          </p>
        </li>
      </ul>
    </Homolayout>

    <Homolayout
      :title="$t('快捷入口')"
      style="margin-top: .2rem;"
    >
      <ul class="entry">
        <li @click="$router.push('/agent/agentMember')">
          <p class="iconfont icon-chengyuanguanli1"></p>
          <p class="entry_name">{{ $t('成员管理') }}</p>
        </li>
        <li @click="$router.push('/agent/agentExtension')">
          <p class="iconfont icon-tuiguanggongju1"></p>
          <p class="entry_name">{{ $t('推广工具') }}</p>
        </li>
        <li @click="$router.push('/agent/agentCommission')">
          <p class="iconfont icon-tuiguanggongju1"></p>
          <p class="entry_name">{{ $t('佣金报表') }}</p>
        </li>
        <li @click="$router.push('/Generationcharge')">
          <p class="iconfont icon-xiajidaichong1"></p>
          <p class="entry_name">{{ $t('下级代充') }}</p>
        </li>
        <li @click="onAddBankCard()">
          <!--           @click="$router.push('/moneyWithdraw')"-->
          <p class="iconfont icon-yongjintikuan1"></p>
          <p class="entry_name">{{ $t('佣金提款') }}</p>
        </li>
        <li @click="$router.push('/material')">
          <p class="iconfont icon-tuiguangsucai1"></p>
          <p class="entry_name">{{ $t('推广素材') }}</p>
        </li>
        <li @click="$router.push('/omit')">
          <p class="iconfont icon-yiloushenqing1"></p>
          <p class="entry_name">{{ $t('遗漏申请') }}</p>
        </li>
        <li
          v-if="depositSwitch === 2"
          @click="agentDeposit()"
        >
          <p class="iconfont icon-educhongzhi1"></p>
          <p class="entry_name">{{ $t('额度充值') }}</p>
        </li>
        <li
          v-else
          @click="depositServe"
        >
          <p class="iconfont icon-educhongzhi1"></p>
          <p class="entry_name">{{ $t('额度充值') }}</p>
        </li>
        <li @click="$router.push('/moneyExchange')">
          <p class="iconfont icon-caiwubaobiao1"></p>
          <p class="entry_name">{{ $t('财务报表') }}</p>
        </li>
        <li @click="$router.push('/vipOpen')">
          <p class="iconfont icon-huiyuankaihu1"></p>
          <p class="entry_name">{{ $t('会员开户') }}</p>
        </li>
        <li
          v-if="flag && spreadSwitch === 2"
          @click="$router.push('/agentmanagement')"
        >
          <p class="iconfont icon-dailiguanli1"></p>
          <p class="entry_name">{{ $t('代理管理') }}</p>
        </li>
        <li
          v-if="flag && spreadSwitch === 2"
          @click="$router.push('/creatAccount')"
        >
          <p class="iconfont icon-dailikaihu1"></p>
          <p class="entry_name">{{ $t('代理开户') }}</p>
        </li>
      </ul>
    </Homolayout>
    <popup :value="depositPop">
      <div class="depositPop">
        <div
          class="close"
          @click="depositPop = false"
        >
          <span class="iconfont icon-close"></span>
        </div>
        <div class="title">{{ $t('钱包充值') }}</div>
        <div
          class="containerPop"
          style="padding-bottom: 0.5rem;"
        >
          <div class="img">
            <img
              src="./images/Personalcenter.png"
              alt=""
            />
          </div>
          <p
            class="p-text"
            style="text-align: center;margin-top: 0.3rem"
          >
            {{$t('代理钱包充值请联系')}}
            <span
              class="serve"
              @click="$openKefu"
            >{{ $t('在线客服') }}</span>
          </p>
        </div>
      </div>
    </popup>
    <loading
      :isShow="isLoading"
      :title="$t('加载中...')"
    />
  </div>
</template>
<script>
import Banner from './components/banner'
import popup from '../activity/wheelSurf/popup'
import Loading from '@/components/loading'
import Homolayout from './components/homeLayout'
import { agentrelation, agentSetting, bankcardlist, userinfo } from '@/api/agent'
import { mapState } from "vuex";
import {Toast} from 'vant';

export default {
  components: { Banner, Homolayout, popup, Loading },
  data() {
    return {
      overview: [
        {
          text: this.$t('新增下级(人)'),
          key: 'new_members',
        },
        {
          text: this.$t('投注人数(人)'),
          key: 'bet_number_count',
        },
        {
          text: this.$t('首存人数(人)'),
          key: 'first_deposit_count',
        },
        {
          text: this.$t('总存款(元)'),
          key: 'total_deposit',
        },
        {
          text: this.$t('本月纯利(元)'),
          key: 'profit',
        },
        {
          text: this.$t('本月佣金(元)'),
          key: 'commission',
        },
      ],
      depositPop: false,
      agentrelation: {},
      user: '',
      depositSwitch: '',
      spreadSwitch: '',
      isLoading: false,
      flag: false,
      title: this.$t('今天'),
    }
  },
  computed: {
    ...mapState('global', ['siteInfo']),
    ...mapState('users', ['userInfo']),
    getOverview() {
      return [
        {
          text: this.$t('新增下级(人)'),
          key: 'new_members',
        },
        {
          text: this.$t('投注人数(人)'),
          key: 'bet_number_count',
        },
        {
          text: this.$t('首存人数(人)'),
          key: 'first_deposit_count',
        },
        {
          text: this.$t('总存款(元)'),
          key: 'total_deposit',
        },
        {
          text: `${this.title}${this.$t('纯利(元)')}`,
          tips: '纯利Tips',
          key: 'profit',
        },
        {
          text: `${this.title}${this.$t('佣金(元)')}`,
          tips: '佣金Tips',
          key: 'commission',
        },
      ]
    }
  },
  async created() {
    this.agentSet()
    this.isLoading = true;
    this.fetchAgentRelation('', this.$t('今天'));
    const result = await userinfo()
    // console.log(result)
    this.user = result.data.data
    // console.log(this.user)
    // const {
    //   data: {data},
    // } = await agentrelation(time)
    // this.agentrelation = data
    // if (this.user.deposit_switch) {
    //   this.depositSwitch = this.user.deposit_switch
    // } else {
    //   if (this.depositSwitch === 1) {
    //     this.depositSwitch = 2
    //   }
    // }
    this.isLoading = false;
    if (this.user.spread_switch) {
      this.spreadSwitch = this.user.spread_switch
    }
    this.flag = true
  },
  methods: {
    async fetchAgentRelation(name, title) {
      this.isLoading = true;
      this.title = title;
      let type = '';
      switch (title) {
        case this.$t('今天'):
          type = 'today'
          break;
        case this.$t('昨天'):
          type = 'yesterday'
          break;
        case this.$t('本周'):
          type = 'week'
          break;
        case this.$t('本月'):
          type = 'month'
          break;
      }
      const {
        data: { data },
      } = await agentrelation({ 'date_type': type })
      this.agentrelation = data
      if (this.user.deposit_switch) {
        this.depositSwitch = this.user.deposit_switch
      } else {
        if (this.depositSwitch === 1) {
          this.depositSwitch = 2
        }
      }
      this.isLoading = false;
    },
    onAddBankCard() {
      bankcardlist({ access_token: window.localStorage.agToken }).then(
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
    depositServe() {
      this.depositPop = true
    },
    agentDeposit() {
      if (this.userInfo.deposit_switch == 2) {
        this.$router.push('/agentDeposit')
      } else {
        this.depositPop = true;
      }
    },
    agentSet() {
      agentSetting({
        access_token: window.localStorage.agToken,
        merchant_no: process.env.VUE_APP_MERCHANT_NO,
      }).then((res) => {
        if (res.data.code === 0) {
          const data = res.data.data
          if (data.deposit_config) {
            this.depositSwitch = data.deposit_config
          }
          if (data.unlimited_level_config) {
            this.spreadSwitch = data.unlimited_level_config
          }
        }
      })
    },
    overviewTipsClick(tips) {
      tips && this.$tips(this.$t(tips)(this.$t(this.title)))
    },
    priceFilter(price) {
      return +price < 0 ? `<span style="color: #ff3535">${price}</span>` : price
    }
  },
}
</script>
<style lang="less" scoped>
@homeColor: #999999;

.en-wrap{
  .date-line {
    .van-tabs {
      width: 100% !important; 
    }
  }
}

.entry {
  display: flex;
  align-items: center;
  //justify-content: center;
  flex-wrap: wrap;

  li {
    flex: 0 0 25%;
    text-align: center;
    margin-top: 0.4rem;
    margin-bottom: 0.2rem;

    .iconfont {
      font-size: 0.7rem;
      color: #c2c2c2;
    }

    .entry_name {
      margin-top: 0.2rem;
      color: #999999;
    }
  }
}

#home {
  color: #f5f5f5;
  padding-top: 1.2rem;
}

.overviewCss {
  width: 100%;
  display: flex;
  align-items: stretch;
  flex-wrap: wrap;
  justify-content: space-between;

  li {
    width: 32%;
    min-height: 1.4rem;
    background: #282828;
    border-radius: 4px;
    padding: 0 10px 10px;
    margin-top: 0.2rem;
    display: flex;
    flex-direction: column;
  }

  .overviewCssAmout {
    font-size: 32px;
    margin-top: 0.25rem;
    color: @text-color;
  }

  .overviewCssText {
    font-size: 24px;
    margin-top: 9px;
    color: @homeColor;
    display: flex;
    align-items: center;
    flex-grow: 1;
    .van-icon {
      margin-left: 8px;
      font-size: 24px;
      color: @text-color;
    }
  }
}

.date-line {
  border-bottom: 0.1px solid #3c3c3c;
  /deep/.van-tabs {
    &__wrap {
      height: 90px;
      line-height:90px;
      width: 500px;
      .van-tab{
        width: 300px;
      }
    }
    &__text {
      font-size: 30px;
    }
  }
}

/deep/ .van-tabs .van-tab,
.van-tabs .van-tabs__wrap,
.van-tabs .van-tabs__nav {
  /*width: 10rem;*/
  /*background-color: rgb(21,21,21);*/
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}

/deep/ .van-tabs__wrap {
  border-bottom: none;
}

/deep/ .van-tabs__line {
  height: 0.1rem;
  width: 0.8rem;
  background: #c8a77f;
  z-index: 998;
  left: -30px !important;
  /*top: 2px !important;*/
}

/deep/ .van-nav-bar {
  background: #191919;
}

/*/deep/ .van-tabs {*/
/*.van-tabs__nav {*/
/*  background-color: transparent!important;*/
/*// background: @bg-color;*/
/*.van-tab {*/
/*  color: #ccc;*/
/*}*/

.van-tab--active {
  color: #fff;
}

/deep/ .van-tabs {
  .van-tabs__nav {
    background-color: transparent !important;

    .van-tab {
      color: #ccc;
    }
  }
}

/deep/ .van-nav-bar {
  background: #191919;
}

/deep/ .van-nav-bar__left {
  i {
    font-size: 0.42667rem;
  }
}

/deep/ .van-picker__toolbar {
  border-bottom: 1px solid #343434;
}

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
      border: 1px solid #c8a77f;
      color: #c8a77f;
      font-size: 0.37rem;
      height: 1.1rem;
      border-radius: 10px;
    }

    .cancel,
    .submitBtn {
      background: none;
      border: 1px solid #c8a77f;
      color: #c8a77f;
      font-size: 0.37rem;
      height: 1.1rem;
      width: 3.2rem;
      border-radius: 10px;
      margin-top: 0.3rem;
      margin-bottom: 0.5rem;
    }

    .submitBtn {
      background: #c8a77f;
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
      color: #c8a77f;
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
        background-color: #c8a77f;
      }

      .check:checked + label:after {
        content: "✓";
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
