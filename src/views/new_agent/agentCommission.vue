<template>
  <div id="Member">
    <Homelayout :title="$t('下级概览')">
      <div class="wrap">
        <ul class="card">
          <template v-if="commission.length !== 0">
            <li v-for="(item, i) in allInfo" :key="i" @click="notissuedClick(item.tips)">
              <p class="numCss">{{ commission[item.key] }}</p>
              <p class="card_text">{{ item.text }}
                <img style="width: 12px;position: relative;top:2px;" v-if="item.tips"
                  :src="require('../../assets/loginIcon/questionMark.png')">
              </p>
            </li>
          </template>
        </ul>
        <div class="img">
          <img src="./images/notissued.png" alt="" />
        </div>
      </div>

      <ul class="cardTwo">
        <li>
          <p class="numCss">{{ commission.money || 0 }}</p>
          <p class="card_text">{{$t('钱包余额')}}</p>
        </li>
        <li>
          <p class="numCss">{{ commission.commission_money || 0 }}</p>
          <p class="card_text">{{$t('佣金余额')}}</p>
        </li>
        <li>
          <p class="numCss">{{ commission.rate || 0 }}%</p>
          <p class="card_text">{{$t('佣金比例')}}</p>
        </li>
      </ul>
    </Homelayout>
    <div class="date-select">
      <span class="iconfont icon-bianzu11" /><span @click="select('START')">{{
              startDate
            }}</span><span class="date-select-separator" /><span @click="select('END')">{{ endDate }}
      </span>
    </div>
    <div class="cavans" v-show="colum">
      <ColumnEcharts :middleText="title" ref="ech" />
    </div>

    <!--    <van-button-->
    <!--        color="#C3A884"-->
    <!--        style="margin-bottom: 0.2rem;color: #fff !important;"-->
    <!--        :class="{start: startDate !== '选择开始时间' && endDate !== '选择结束时间',}"-->
    <!--        @click="getCommisionsheetList">查询-->
    <!--    </van-button>-->
    <Homelayout :title="$t('月度详细数据')">
      <div v-if="more">
        <div v-if="commissionList.length !== 0">
          <div v-for="(item, index) in commissionList" :key="index" class="listCommission" @click="handleDetail(item)">
            <div class="flex font">
              <div class="sub-title">{{item.date}}{{$t('佣金')}}</div>
              <div class="numColor">{{ item.commission }}</div>
            </div>
            <div class="flex colorFont">
              <div class="info-list" style="width: 75%">
                <div>
                  <div>
                    <span>{{$t('纯利')}}:</span><span>{{ item.profit }}{{$t('元')}}</span>
                  </div>
                  <div>
                    <span>{{$t('佣金比例')}}:</span><span>{{ item.rate * 100 }}%</span>
                  </div>
                  <div>
                    <span>{{$t('活跃会员')}}:</span><span>{{ item.active_members }}</span>
                  </div>
                  <div>
                    <span>{{$t('新增注册')}}:</span><span>{{ item.new_members }}</span>
                  </div>
                  <div>
                    <span>{{$t('扣减')}}:</span><span>{{ item.commission_deducted }}</span>
                  </div>
                  <div>
                    <span>{{$t('补发')}}:</span><span>{{ item.commission_replenish }}</span>
                  </div>
                  <div>
                    <span>{{$t('存取差')}}:</span><span>{{ item.sub }}</span>
                  </div>
                </div>
              </div>
              <div class="tips">{{$t('已结算佣金')}}
                <van-icon name="arrow" />
              </div>
            </div>
          </div>
        </div>
        <van-empty v-show="!commissionList.length" :image="EmptyIcon" :description="$t('没有找到相关记录')" />
      </div>
    </Homelayout>
    <div class="date">
      <van-popup v-model="datashow" position="bottom" get-container="#app">
        <van-datetime-picker v-model="currentDate" type="date" :min-date="minDate" :max-date="maxDate"
          @confirm="saveDate" @cancel="datashow = false" />
      </van-popup>
    </div>
  </div>
</template>
<script>
  import Homelayout from './components/homeLayout'
  import ColumnEcharts from '@/views/new_agent/components/columnEcharts'
  import {
    formateDate
  } from '../../utils'
  import {
    agentcommissionlog,
    commisionsheet,
    commissionOverview
  } from '@/api/agent'
  import {
    getDate
  } from "@/utils/utils";
  import EmptyIcon from './images/empty@2x.png';

  export default {
    components: {
      Homelayout,
      ColumnEcharts
    },
    data() {
      return {
        EmptyIcon,
        title: '',
        minDate: new Date(2020, 0, 1),
        maxDate: new Date(2025, 10, 1),
        currentDate: new Date(),
        allInfo: [{
            key: 'reachable_commission',
            tips: this.$t('未派发佣金之和，达到指定派发时间将自动派发至佣金钱包哦！'),
            text: this.$t('未派发佣金(周期)'),
          },
          {
            key: 'month_commission',
            text: this.$t('累计赚取佣金(元)'),
          },
        ],
        active: 2,
        timeFlag: '',
        datashow: false,
        endDate: this.$t('结束'), //getDate(0).toString(),
        startDate: this.$t('开始'), //this.gettime().starDate,
        colum: false,
        discountData: {
          page: 1,
          access_token: window.localStorage.agToken,
          size: 200,
          start_date: this.gettime().starDate,
          // start_date: '2021-01-01',
          end_date: this.gettime().endDate,
        },
        commissionList: [],
        commission: {
          reachable_commission: 0,
          month_commission: 0,
          money: 0,
          rate: 0,
          commission_money: 0,
        },
        echartsList: '',
        more: true,
      }
    },
    created() {
      this.commisionsheetList()
      this.commissionEvent()
      this.getCommisionsheetList(this.gettime().starDate, this.gettime().endDate)
    },
    methods: {
      moreActive() {
        this.more = !this.more
      },
      notissuedClick(tips) {
        tips && this.$tips(this.$t(tips));
      },
      async getCommisionsheetList(startDate, endDate) {
        const {
          data: {
            data
          },
        } = await commisionsheet({
          start_date: startDate && startDate !== this.$t('开始') ? startDate : this.startDate,
          end_date: endDate && endDate !== this.$t('结束') ? endDate : this.endDate,
          size: 9999,
        })
        this.echartsList = data
        this.colum = true
        this.$refs.ech.show()
        this.discountData.start_date = startDate
        this.discountData.end_date = endDate
      },
      commissionEvent() {
        let that = this
        commissionOverview({
          access_token: window.localStorage.token,
          merchant_no: process.env.VUE_APP_MERCHANT_NO,
        }).then((res) => {
          if (res.data.code === 0) {
            that.commission = res.data.data
          }
        })
      },
      saveDate(item) {
        const time = formateDate(item)
        if (this.timeFlag === 'END') {
          this.endDate = time
        } else {
          this.startDate = time
        }
        this.datashow = false
        const {
          startDate,
          endDate
        } = this
        if (startDate !== this.$t('开始') && endDate !== this.$t('结束')) {
          this.commisionsheetList()
          this.getCommisionsheetList(this.startDate, this.endDate);
        }
      },
      select(i) {
        console.log(this.$t('点击出发'))
        this.timeFlag = i
        this.datashow = true
      },
      formatter(type, val) {
        if (type === 'month') {
          return `${val}${this.$t('月')}`
        } else if (type === 'day') {
          return `${val}${this.$t('日')}`
        }
        return val
      },
      onClick(name, title) {
        this.title = !this.title
      },
      gettime() {
        var nowDate = new Date()
        var cloneNowDate = new Date()
        var fullYear = nowDate.getFullYear()
        var month = nowDate.getMonth() + 1 // getMonth 方法返回 0-11，代表1-12月
        var endOfMonth = new Date(fullYear, month, 0).getDate() // 获取本月最后一天
        function getFullDate(targetDate) {
          var D, y, m, d
          if (targetDate) {
            D = new Date(targetDate)
            y = D.getFullYear()
            m = D.getMonth() + 1
            d = D.getDate()
          } else {
            y = fullYear
            m = month
            d = date
          }
          m = m > 9 ? m : '0' + m
          d = d > 9 ? d : '0' + d
          return y + '-' + m + '-' + d
        }

        var endDate = getFullDate(cloneNowDate.setDate(endOfMonth)) //当月最后一天
        var starDate = getFullDate(cloneNowDate.setDate(1)) //当月第一天
        return {
          starDate,
          endDate,
        }
      },
      commisionsheetList() {
        agentcommissionlog(this.discountData).then((res) => {
          if (res.data.code === 0) {
            this.commissionList = res.data.data.data
          }
        })
      },
      handleDetail(val) {
        window.sessionStorage.setItem('agent_report_detail', JSON.stringify(val))
        this.$router.push('/reportFormDetail')
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

  #Member /deep/ .van-button {
    color: #fff !important;
  }

  /deep/ .van-picker {
    color: #999;
    background-color: #282828;
  }

  /deep/ .van-button {
    color: #666666 !important;
  }

  /deep/ .van-cell__title .custom-title,
  span {
    font-size: 0.37333rem;
  }

  .start {
    background: #c8a77f !important;
    color: #191919 !important;
  }

  .more {
    position: absolute;
    right: 0;
    top: 0.2rem;
    //border: 0.01333rem dotted #727272;
    width: 0.65rem;
    height: 0.62rem;
    text-align: center;

    .iconfont {
      font-size: 0.2rem;
      color: #999;
      margin-top: 0.2rem;
      display: inline-block;
    }
  }

  .date {
    width: 100%;
    /* width: 91%; */
    left: 0;
    position: fixed;
    bottom: 29px;
  }

  .iconfont {
    color: #999;
  }

  .custom-title {
    color: #999;
  }

  .date-select {
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 88px;
    border-radius: 8px;
    border: 2px solid #343434;
    color: #999;
    margin: 30px 0 32px;

    &-separator {
      height: 2px;
      width: 20px;
      background-color: #999;
    }
  }

  /deep/ .van-tabs .van-tab,
  .van-tabs .van-tabs__wrap,
  .van-tabs .van-tabs__nav {
    width: 4rem;
  }

  /deep/ .van-tabs__line {
    height: 0.1rem;
    width: 1.5rem;
    background: #c8a77f;
  }

  #Member {
    color: #f5f5f5;
    // overflow-y: auto;
    padding-bottom: 1rem;

    .flex {
      display: flex;
      justify-content: space-between;

      .tips {
        color: #999;
        font-size: 24px;
        width: 25%;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
      }
    }
  }

  .cardTwo {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #212121;
    padding: 0 0.1rem;

    li {
      width: 50%;
      padding: 0.4rem 0 0.4rem 0;

      .numCss {
        color: #c8a77f;
        font-size: 0.42rem;
        margin-bottom: 0.2rem;
        text-align: center;
      }

      .card_text {
        color: #999999;
        text-align: center;
      }

      .qmi {
        width: 15px;
      }
    }
  }

  .wrap {
    position: relative;

    .img {
      position: absolute;
      right: 0;
      top: 0;

      img {
        width: 1.5rem;
      }
    }
  }

  .card {
    display: flex;
    background: #282828;
    flex-wrap: wrap;
    align-items: center;
    padding: 0.1rem;

    li {
      width: 50%;
      padding: 0.4rem 0 0.2rem 0;

      .numCss {
        color: #c8a77f;
        font-size: 0.5rem;
        margin-bottom: 0.2rem;
        text-align: center;
      }

      .card_text {
        color: #999999;
        text-align: center;
      }
    }
  }

  .listCommission {
    width: 100%;
    margin-bottom: 20px;

    .font {
      font-size: 24px;
    }

    .colorFont {
      color: #606060;

      div span {
        color: #999;
        font-size: 24px;

        &:nth-child(odd) {
          color: #606060;
          padding-right: 5px;
        }
      }
    }

    .sub-title {
      font-size: 32px;
      color: #ccc;
      padding: 10px 0 28px;
    }

    .info-list {
      >div {
        display: flex;
        flex-wrap: wrap;

        >div {
          width: 50%;
          padding-bottom: 20px;

          span {
            &:last-child {
              padding-left: 8px;
              color: #999;
            }
          }
        }
      }
    }

    .numColor {
      color: #c8a77f;
      font-size: 40px;
    }

    .btn {
      background: none;
      border: 1px solid #c8a77f;
      padding: 0.2rem;
      border-radius: 0.2rem;
      color: #c8a77f;
    }
  }

  .empty {
    width: 100%;
    text-align: center;
    color: #ccc;
    margin: 0.5rem 0;
  }
</style>
