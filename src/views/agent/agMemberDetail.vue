<template>
  <div class="container agMemberDetail">
    <van-nav-bar
      left-arrow
      fixed
      @click-left="$router.go(-1)"
    >
      <template #title>
        <span style="color:#FFFFFF">{{$t('会员详情')}}</span>
        <!-- <span style="color:#C8A77F" class="iconfont icon-wen"></span> -->
      </template>
    </van-nav-bar>
    <div class="main">
      <div class="list">
        <!-- <van-list
          v-model="loading"
          :finished="finished"
          @load="onLoad"
          :offset='50'
        > -->
        <div class="item">
          <div class="p p1">
            <div>
              <h4>{{ item.username }}</h4>
              <div class="top">
                <i :style="{ background: item.is_online ? '#7ED321' : '#ccc' }"></i>{{ item.is_online ? $t('在线') : $t('离线') }}
              </div>
            </div>
            <div>
              <!--              <span>{{$t('有效会员')}}</span>&nbsp;|&nbsp;&nbsp;-->
              <!--              <span>{{$t('已绑定银行卡')}}</span>-->
              <!--              <span v-if="item.is_valid_mobile"-->
              <!--              >&nbsp;&nbsp;|&nbsp;&nbsp;已绑定手机号</span>-->
              {{ item.first_recharge_money !== 0 ? $t('有效会员') : $t('无效会员') }} |
              {{ item.user_bank.length === 0 ?  $t('未绑定银行卡') :  $t('已绑定银行卡') }} | {{ item.mobile ? $t('已绑定手机号') : $t('未绑定手机号') }}
            </div>
            <div class="justify-center">
              <div>
                <div style="padding-bottom: 0.2rem;">
                  <span>{{$t('注册时间')}}</span>{{
                  item.created_at
                }}
                </div>
                <div>
                  <span style="color:#999">{{$t('最后登录')}}</span>{{
                  item.last_login_time
                }}
                </div>
              </div>
              <div
                class="transfer-accounts-btn"
                @click="$router.push({ name: 'agMemberWithdraw' })"
              >{{$t('转账')}}</div>
            </div>
          </div>
          <div class="p p2">
            <ReportFilterTime
              @onConfirm="onConfirm"
              type="date"
            />
            <div>
              <span>{{$t('首存金额')}}</span>
              <span>{{ item.first_recharge_money }}</span>
            </div>
            <div>
              <span>{{$t('纯利')}}</span>
              <span>{{ item.profit }}</span>
            </div>
            <div>
              <span>{{$t('代充总额')}}</span>
              <span>{{ item.agent_recharge_money }}</span>
            </div>
            <div>
              <span>{{$t('充值总额')}}</span>
              <span>{{ item.user_wallet_static.deposit_money }}</span>
            </div>
            <div>
              <span>{{$t('提款总额')}}</span>
              <span>{{ item.user_wallet_static.draw_money }}</span>
            </div>
            <div>
              <span>{{$t('红利总额')}}</span>
              <span>{{ item.user_wallet_static.benefit_money }}</span>
            </div>
            <div>
              <span>{{$t('投注总额')}}</span>
              <span>{{ item.user_wallet_static.valid_bet }}</span>
            </div>
            <div>
              <span>{{$t('派彩总额')}}</span>
              <span>{{ item.user_wallet_static.payout }}</span>
            </div>
            <div>
              <span>{{$t('投注单数')}}</span>
              <span>{{ item.bet_totals }}</span>
            </div>
          </div>
        </div>
        <!-- </van-list> -->
      </div>
    </div>
  </div>
</template>

<script>
import Lheader from '@/components/l-header'
import Loading from '@/components/loading'
import { memberlist } from '@/api/agent'
import ReportFilterTime from '@/components/report-filter-time'
import moment from 'moment'

export default {
  name: 'memberList',
  components: {
    Loading,
    Lheader,
    ReportFilterTime,
  },
  data() {
    var self = this
    return {
      title: this.$t('会员详情'),
      showStartDate: false,
      currentDate: new Date(),
      item: {},
      minDate: new Date(2017, 0, 1),
      maxDate: new Date(),
      discountData: {
        page: 1,
        access_token: window.localStorage.agToken,
        size: 200,
        start_date: self.gettime(),
        end_date: self.gettime(),
        username: '',
      },
    }
  },
  async created() {
    try {
      let scrollY = document.getElementsByClassName('container')[0].offsetTop
      window.scrollTo(0, scrollY)
    } catch (error) {
    }
    this.item = JSON.parse(window.sessionStorage.getItem('wanqu_member_detail'))
    console.log(this.item)
    this.isLoading = true
    this.discountData.username = this.item.username
  },
  methods: {
    async onConfirm(data) {
      this.discountData = {
        ...this.discountData,
        ...data,
      }
      this.list = []
      // await this.memberlevellist();
      // this.memberlist();
      memberlist({
        access_token: window.localStorage.agToken,
        ...this.discountData,
      }).then((res) => {
        this.item = res.data.data.data[0]
      })
    },
    gettime() {
      return moment().format('YYYY-MM-DD')
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

/deep/ .van-icon-arrow-left {
  color: #ffffff;
  font-size: 0.5rem;
}

/deep/ .van-nav-bar {
  background: @bg-color;
}

.container {
  min-height: 100vh;
  flex-direction: column;
  background-color: @bg-color;

  .main {
    padding-top: @main-top;
  }

  .paddingdiv {
    width: 100%;
    height: 1.17333rem;
  }

  /deep/ .report-filter-time {
    .aagames-button-box {
      width: 220px;
    }

    .select {
      margin-left: 10px;
      width: 530px;

      .col-s,
      .col-e {
        font-size: 20px;
      }
    }
  }

  .transfer-accounts-btn {
    width: 174px;
    height: 80px;
    background: #c8a77f;
    border-radius: 8px;
    font-size: 28px;
    color: #000;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
  }
  .list {
    width: 710px;
    margin: 0 auto 0;
    /*background: white;*/
    position: relative;

    .item {
      box-sizing: border-box;
      .p {
        display: flex;
        flex-direction: column;

        > div {
          display: flex;
          width: 100%;
          margin-bottom: 20px;
          justify-content: space-between;
        }
      }

      .p1 {
        font-size: 0.3rem;
        font-weight: 400;
        color: rgba(204, 204, 204, 1);
        padding: 40px 30px;
        width: 690px;
        margin: 0 auto;
        background: #282828;
        border-radius: 8px;
        color: #999;

        > div {
          justify-content: flex-start;
          font-size: 24px;
          &:first-child {
            justify-content: space-between;
            align-items: center;
            color: #ccc;
          }
          span {
            margin: 0 16px;
            &:first-child {
              margin-left: 0;
            }
          }

          h4 {
            margin: 0;
            font-size: 0.4rem;
          }
        }

        .top {
          display: inline-block;
          font-size: 24px;
          color: #999;

          i {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            display: inline-block;
            margin-left: 30px;
            margin-right: 8px;
          }
        }

        .van-button {
          width: 150px;
          height: 60px;
          background-color: transparent;
          border: 2px solid @primary-color;

          .van-button__text {
            display: block;
            line-height: 60px;
            font-size: 24px;
            color: @primary-color;
          }
        }
        .justify-center {
          margin-top: 0.2rem;
          display: flex;
          justify-content: space-between !important;
        }

        .right {
          height: 44px;
          font-size: 32px;
          font-weight: 600;
          color: @primary-color;
          line-height: 44px;
        }
      }

      .p2 {
        width: 690px;
        margin: 20px auto 0;
        font-size: 24px;
        font-weight: 400;
        > div {
          padding: 0 0 26px;
          color: #606060;
          &:first-child {
            padding: 10px 0 40px;
            margin: 0;
          }
          span:last-child {
            font-size: 28px;
            color: #999;
          }
        }
      }

      .p3 {
        margin-top: 10px;
        font-size: 24px;
        font-weight: 400;
        color: rgba(82, 81, 82, 1);
      }

      .left {
        flex: 1;
      }
    }

    .loading_ing {
      width: 100%;
      text-align: center;
      line-height: 80px;
      position: absolute;
      bottom: -31px;
      background: white;
      color: #bd8c24;

      img {
        width: 50px;
        position: relative;
        top: 15px;
      }

      .loading-1 {
        width: 30px;
        height: 30px;
        position: relative;
        left: 40px;
        top: 5px;
      }

      .loading-2 {
        animation: rotation 1s linear infinite;
      }
    }

    .chanebac {
      background: none;
      color: #fff;
    }

    .nomore {
      width: 100%;
      text-align: center;
      line-height: 80px;
    }
  }
}
</style>
