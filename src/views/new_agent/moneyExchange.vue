<template>
  <div class="container moneyExchange">
    <lheader :title="title" :goback="true" :get-switch="false" :rightName="$t('筛选')" @rightClick="onFilter" />
    <div class="main">
      <div class="list">
        <van-list v-model="loading" :finished="finished" @load="onLoad" :offset="50">
          <div class="item" v-for="(item, index) in list" :key="index" @click="handleDetail(item)">
            <div class="p p1">
              <span class="left"><b>{{ accountChangeType[item.type] }}</b>{{ item.money | priceParse }}</span>
              <span class="right">{{ item.created_at }}</span>
            </div>
            <div class="p p2">
              <span class="left"><span class="label">{{$t('现余额')}}:</span>
                {{
                  item.after_money * 1 + item.after_commission_money * 1
                }}
                ({{$t('代理')}}{{ item.after_money * 1 }}/{{$t('佣金')}}{{
                  item.after_commission_money * 1
                }})</span>
              <span class="right">
                <div>
                  <span class="label">{{$t('帐变前余额')}}:</span>
                  {{
                  item.before_money * 1 + item.before_commission_money * 1
                }}
                ({{$t('代理')}}{{ item.before_money * 1 }}/{{$t('佣金')}}{{
                  item.before_commission_money * 1
                }})
                </div>
                <van-icon v-if="item.type === 6" name="arrow" />
              </span>
               <span class="right">
                <div>
                  <span class="label">{{$t('帐变前累积结余')}}:</span>
                  {{
                  item.before_commission_loss
                }}
                </div>
              </span>
               <span class="right">
                <div>
                  <span class="label">{{$t('帐变后累积结余')}}:</span>
                 {{
                  item.after_commission_loss
                }}
                </div>
              </span>
            </div>
          </div>
        </van-list>
        <div class="nomore" v-if="finished && list.length !== 0">{{$t('没有更多')}}</div>
        <div class="list_empty" v-show="!isLoading && list.length === 0">
          <div class="emptyDiv">
            <div class="errorImg"></div>
            <div class="text">
              <div class="chinese">{{$t('未找到相关数据')}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ReportFilter type="date" v-model="filterShow" @onConfirm="onConfirm">
      <div class="select-input" slot="input">
        <p class="title">{{$t('帐变类型')}}</p>
        <div class="days">
          <div class="_day" v-for="(val, key) in accountChangeType" :key="key">
            <div class="day" :class="{ active: key == typeValue }" @click="onType(key)">
              {{ val }}
            </div>
          </div>
        </div>
        <input
            class="userInput"
            type="text"
            v-model="username"
            :placeholder="$t(`输入需要搜索的会员代充账号`)"
        />
      </div>
    </ReportFilter>
    <popup :value="transfer">
      <div class="transferPop">
        <div class="close" @click="cancel">
          <span class="iconfont icon-close"></span>
        </div>
        <div class="title">{{$t('转账详情')}}</div>
        <div class="containerPop">
          <div class="item">
            <span class="itemText"> {{$t('转入会员帐号')}}：</span>{{ detail.username }}
          </div>
          <div class="item">
            <span class="itemText">{{$t('转账金额')}}：</span> {{ detail.money }}
          </div>
          <div class="item">
            <span class="itemText">{{$t('注册时间')}}：</span> {{ detail.register_time }}
          </div>
          <div class="item">
            <span class="itemText">{{$t('转账时间')}}：</span>{{ detail.updated_at }}
          </div>
        </div>
      </div>
    </popup>
  </div>
</template>

<script>
  import Lheader from '@/components/l-header'
  import ReportFilter from './components/report-filter'
  import popup from '../activity/wheelSurf/popup'
  import {
    agentaccountchangelog,
    agentaccountchangetype
  } from '@/api/agent'

  export default {
    name: 'moneyExchange',
    components: {
      Lheader,
      ReportFilter,
      popup,
    },
    data() {
      var self = this
      return {
        title: this.$t('帐变记录'),
        filterShow: false,
        isLoading: false,
        finished: true,
        loading: false,
        accountChangeType: {},
        username: '',
        typeValue: '0',
        transfer: false,
        topData: [{
            key: 'moneyTotal',
            val: this.$t('总帐变金额'),
            money: 0,
          },
          {
            key: 'sumTotal',
            val: this.$t('总结算金额'),
            money: 0,
          },
          {
            key: 'withdrawTotal',
            val: this.$t('总提款金额'),
            money: 0,
          },
          {
            key: 'exchangeTotal',
            val: this.$t('总转账金额'),
            money: 0,
          },
        ],
        list: [],
        detail: {
          username: '',
          money: '',
          register_time: '',
          updated_at: '',
        },
      }
    },
    async created() {
      try {
        let scrollY = document.getElementsByClassName('container')[0].offsetTop
        window.scrollTo(0, scrollY)
      } catch (error) {}
      this.isLoading = true
      const {
        data
      } = await agentaccountchangetype({
        access_token: window.localStorage.agToken,
      })
      this.accountChangeType = data.data
      this.accountChangeType[0] = this.$t('全部')
      this.isLoading = false
      this.onLoad()
      if (this.$route.query) {
        this.onConfirm({
          start_text: this.$t('开始时间'),
          end_text: this.$t('结束时间'),
          start_date: '',
          end_date: '',
        })
      }
    },
    filters: {
      priceParse(price) {
        const num = +price
        return num.toFixed ? num.toFixed(2) : `${num}.00`
      }
    },
    methods: {
      onFilter() {
        this.filterShow = true
      },
      onConfirm(data) {
        console.log(data, this.typeValue, this.username)
        const params = {
          type: this.typeValue,
          username: this.username,
          ...data,
        }
        this.onLoad(params)
      },
      onType(value) {
        this.typeValue = value
        // this.onConfirmStartDate(moment().subtract(value - 1, 'days'))
        // this.onConfirmEndDate(new Date())
      },
      async onLoad(val) {
        this.loading = true
        agentaccountchangelog({
          access_token: window.localStorage.agToken,
          ...val,
        }).then((res) => {
          this.list = res.data.data.data
          this.loading = false
        })
      },
      cancel() {
        this.transfer = false
      },
      handleDetail(item) {
        if (item.type !== 6) return
        this.transfer = true
        this.detail.username = item.username
        this.detail.money = item.money
        this.detail.register_time = item.register_time
        this.detail.updated_at = item.updated_at
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

  .p3mb {
    padding-bottom: 50px !important;
  }

  .titledata {
    width: 100%;
    display: flex;
    justify-content: space-between;

    li {
      background: #282828;
      width: 23%;
      border-radius: 4px;
      padding: 10px 0;

      p {
        line-height: 40px;
      }

      p:first-child {
        color: #5d5d5d;
        text-align: center;
      }

      p:nth-child(2) {
        color: #b9b9b9;
      }
    }
  }

  .van-dialog /deep/ .van-dialog__header {
    color: red;
  }

  .transfer /deep/ .van-dialog__footer {
    justify-content: center !important;
    padding-bottom: 0.2rem !important;
  }

  .container {
    display: flex;
    min-height: 100vh;
    flex-direction: column;

    .main {
      padding-top: @main-top;
      background: #161616;

      .top {
        display: flex;
        justify-content: space-between;
        padding: 0 30px;

        >div {
          width: 160px;
          height: 142px;
          background-color: @bg-card-color;
          border-radius: 12px;

          p {
            &:first-child {
              color: #999;
              font-size: 24px;
              margin-top: 30px;
            }

            color: #fff;
            font-size: 28px;
            text-align: center;
            margin-top: 14px;
          }
        }
      }

      .list {
        width: 710px;
        margin: 30px auto 0;
        position: relative;

        .item {
          padding: 50px 0 0;
          /*padding-bottom: 100px;*/
          box-sizing: border-box;
          border-bottom: 2px solid rgba(#fff, 0.06);

          .p {
            display: flex;
          }

          .p1 {
            height: 44px;
            font-size: 32px;
            font-weight: 400;
            color: rgba(204, 204, 204, 1);
            line-height: 44px;

            .left {
              font-size: 32px;
              color: #c8a77f;

              b {
                color: #ccc;
                padding-right: 20px;
              }
            }

            .right {
              height: 44px;
              font-size: 28px;
              color: #999;
              line-height: 44px;

              .label {
                color: #999;
                font-size: 24px;
              }
            }
          }

          .p2 {
            margin: 30px 0 40px;
            font-size: 24px;
            font-weight: 400;
            color: rgba(153, 153, 153, 1);
            line-height: 34px;
            flex-direction: column;

            .label {
              color: #606060;
              padding-right: 5px;
            }

            .left,
            .right {
              color: #999;
              font-size: 24px;
              margin-bottom: 10px;
            }

            .right {
              margin-top: 12px;
              display: flex;
              justify-content: space-between;
              align-items: center;
            }
          }

          .p3 {
            margin-top: -6px;
            flex-direction: row-reverse;
            margin-bottom: 40px;

            .van-button {
              width: 150px;
              height: 60px;
              background-color: transparent;
              border: 2px solid #c8a77f;

              .van-button__text {
                display: block;
                //line-height: 60px;
                font-size: 24px;
                color: #c8a77f;
              }
            }
          }

          @media only screen and (max-width: 320px) {
            .p3 {
              margin-top: 1rem;
              flex-direction: row-reverse;
              margin-bottom: 20px;

              .van-button {
                width: 170px;
                height: 60px;
                background-color: transparent;
                border: 2px solid #c8a77f;

                .van-button__text {
                  display: block;
                  font-size: 24px;
                  line-height: 60px;
                  color: #c8a77f;
                }
              }
            }
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
          color: #ccc;
        }
      }
    }
  }

  .select-input {
    padding: 20px 0;
    font-size: 24px;

    .userInput {
      width: 9.15rem;
      height: 100px;
      border-radius: 8px;
      border: 2px solid rgba(82, 81, 82, 1);
      padding: 15px;
      margin: 15px;
      background: transparent;
      color: #fff;
    }

    .title {
      height: 44px;
      font-size: 32px;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 44px;
      margin: 40px 20px 20px;
    }

    .van-row {
      padding: 15px;
      box-sizing: border-box;
      text-align: center;
      display: flex;
      justify-content: space-between;

      .van-col {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 28px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(34, 34, 34, 1);
      }

      .commission {
        width: 202px;
        height: 92px;
        border-radius: 6px;
        border: 1px solid rgba(235, 235, 235, 0.08);
      }

      .col-s,
      .col-e {
        color: #fff;
        height: 92px;
        border-radius: 6px;
        border: 1px solid rgba(235, 235, 235, 0.08);
      }

      i {
        display: inline-block;
        margin-left: 0.24rem;
        width: 0;
        height: 0;
        border-left: 12px solid transparent;
        border-right: 12px solid transparent;
        border-top: 16px solid rgba(102, 102, 102, 1);
      }
    }

    .days {
      display: flex;
      flex-wrap: wrap;

      ._day {
        flex: 0 0 33.3%;
        padding: 15px;
        box-sizing: border-box;
      }

      .day {
        text-align: center;
        line-height: 80px;
        height: 80px;
        border-radius: 8px;
        border: 2px solid rgba(255, 255, 255, 0.08);
        font-size: 0.37333rem;
        font-weight: 400;
        color: @text-color-light;
      }

      .active {
        border: 2px solid @primary-color;
        background-color: @primary-color;
        font-weight: 600;
        color: @button-color-active;
      }
    }
  }

  .transferPop {
    width: 80%;
    background: #282828;
    border-radius: 10px;
    margin: 50% auto;
    position: relative;

    .close {
      font-size: 0.56rem;
      color: #999;
      text-align: right;
      position: absolute;
      right: 0.2rem;
      top: 0.2rem;
    }

    .title {
      color: #f5f5f5;
      font-size: 0.48rem;
      text-align: center;
      border-bottom: 1px solid #343434;
      padding: 0.35rem 0;
    }

    .containerPop {
      width: 90%;
      padding: 0.5rem 0;
      font-size: 0.37333rem;
      color: #999;
      position: relative;
      margin: 0 auto;

      .itemText {
        color: #606060;
      }

      .item {
        margin: 0.4rem 0;
        padding: 0 0.3rem;
        display: flex;
        justify-content: space-between;
      }

      .flex {
        display: flex;
        justify-content: space-between;
        //align-items: center;
      }

      .submitBtn {
        background: none;
        border: 1px solid #c8a77f;
        color: #c8a77f;
        font-size: 0.37rem;
        height: 1.1rem;
        width: 3.2rem;
        border-radius: 10px;
        margin: 0.3rem auto 0.5rem;
        display: inline-block;
      }

      .submitBtn {
        background: #c8a77f;
        color: #191919;
        border: none;
      }
    }
  }
</style>
