<template>
  <div class="reportForm">
    <van-nav-bar
      :title="$t('佣金详情')"
      right-text=" "
      left-arrow
      fixed
      @click-left="onClickLeft"
      :border="false"
      color="#fff"
      style="background :#191919; color: #fff;"
    />
    <div class="mainContent">
      <p class="text-p">
        {{$t('佣金状态')}}
        <span style="color: #695338;">{{
            status[item.status]
          }}</span>
      </p>
      <div class="desc">
        <div class="border">
          <div class="p1">
            <div class="t1">{{$t('释放时间')}}</div>
            <div class="t2">{{ item.send_time }}</div>
          </div>
          <div class="p1">
            <div class="t1">{{$t('活跃用户')}}</div>
            <div class="t2">{{ item.active_members || 0 }}人</div>
          </div>
          <div class="p1">
            <div
              class="t1"
            >{{$t('总投注')}}
            </div>
            <div class="t2">{{ item.bet || 0.0 }}</div>
          </div>
          <div class="p1">
            <div
              class="t1"
              @click="$tips($t('下级玩家总参与游戏的有效投注额'))"
            >{{$t('总有效投注')}}
              <van-icon name="question-o" />
            </div>
            <div class="t2">{{ item.valid_bet || 0.0 }}</div>
          </div>
          <div class="p1">
            <div
              class="t1"
              @click="$tips($t('下级玩家总有效投注所产生的派奖金额'))"
            >{{$t('总派奖金额')}}
              <van-icon name="question-o" />
            </div>
            <div class="t2">{{ item.win || 0.0 }}</div>
          </div>
          <div class="p1">
            <div class="win">
              {{$t('用户输赢小计')}}
              <div v-html="priceFilter((item.bet - item.win).toFixed(2))" />
            </div>
          </div>
        </div>
        <div class="border">
          <div class="p1">
            <div class="t1">{{$t('总红利')}}</div>
            <div class="t2">{{ item.bonus }}</div>
          </div>
          <div class="p1">
            <div
              class="t1"
              @click="$tips($t('三方游戏抽成费用+三方充值抽成费用+平台服务费等'))"
            >{{$t('总平台费')}}
              <van-icon name="question-o" />
            </div>
            <div class="t2">{{ item.platform_fee }}</div>
          </div>
          <div class="p1">
            <div class="win">
              {{$t('纯利小计')}}
              <div v-html="priceFilter(((item.profit - item.platform_fee).toFixed(1)))" />
            </div>
          </div>
        </div>
        <div class="border">
          <div class="p1">
            <div class="t1">{{$t('佣金比例')}}</div>
            <div class="t2">{{ item.rate * 100 }}%</div>
          </div>
          <div class="p1">
            <div class="t1">{{$t('佣金补发')}}</div>
            <div class="t2">{{ item.month_fee || 0 }}</div>
          </div>
          <div class="p1">
            <div class="t1">{{$t('佣金扣减')}}</div>
            <div class="t2">{{ item.month_fee || 0 }}</div>
          </div>
          <div class="p1">
            <div class="win">
              {{$t('佣金')}} <span v-html="priceFilter(item.commission)" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { agentcommissionstatus } from '@/api/agent'
import { Toast } from "vant";

export default {
  data() {
    return {
      status: [],
      item: JSON.parse(window.sessionStorage.getItem('agent_report_detail')),
    }
  },
  created() {
    try {
      let scrollY = document.getElementsByClassName('container')[0].offsetTop
      window.scrollTo(0, scrollY)
    } catch (error) {
    }
    agentcommissionstatus({
      access_token: window.localStorage.agToken,
    }).then((res) => {
      this.status = res.data.data
    })
  },
  methods: {
    Toast,
    onClickLeft() {
      this.$router.back()
    },
    priceFilter(price) {
      return +price < 0 ? `<span style="color: #C55055">${price}</span>` : price
    }
  },
}
</script>
<style lang="less" scoped>
/deep/ .van-picker .van-picker__toolbar {
  /* background-color: #D6BDA3; */
  // color: #FFFFFF;
  border-bottom: 2px solid #313133;
}

.reportForm {
  background: #191919;
  width: 100%;
  height: 100%;

  .mainContent {
    padding-top: 1.7rem;
    font-size: 0.32rem;
    color: #fff;

    .text-p {
      padding: 0 0.5rem;
      font-size: 32px;
      display: flex;
      justify-content: space-between;
    }
    .van-icon-question-o {
      font-size: 24px;
    }
    .desc {
      width: 90%;
      margin: 0 auto;

      .border {
        border-bottom: 1px solid #2b2b2b;
      }

      .p1 {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        margin: 0.5rem 0;

        .t1 {
          color: #606060;
          display: flex;
          align-items: center;
          font-size: 24px !important;
          .van-icon {
            margin-left: 0.1rem;
            color: @primary-color !important;
          }
        }

        .t2 {
          color: #999999;
          text-align: right;
          font-size: 0.39rem;
        }

        .win,
        .num {
          width: 100%;
          color: #fff;
          font-size: 0.43rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          div,
          span {
            color: @primary-color !important;
            font-size: 40px !important;
          }
        }
      }
    }
  }
}

.red {
  color: #eb4d50 !important;
  font-size: 0.45rem !important;
}

.yellow {
  color: @primary-color !important;
  font-size: 0.45rem !important;
}

.green {
  color: #30ad8f !important;
  font-size: 0.45rem !important;
}

.van-nav-bar /deep/ .van-nav-bar__title,
.van-nav-bar /deep/ .van-nav-bar__left .van-icon,
.van-nav-bar /deep/ .van-nav-bar__right .van-nav-bar__text {
  color: #fff;
  font-size: 0.43rem;
}
</style>
