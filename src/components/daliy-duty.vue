<template>
  <div
    v-show="
      $route.name == 'Home' &&
      !isClose &&
      daliyData.length > 0 &&
      !yaboBoxMiddle &&
      !exportBoxMiddle
    "
    class="duty"
  >
    <!-- <div class="duty"> -->
    <div v-if="time !== 'off'" class="redpack" @click="handleGo">
      <img src="@assets/img3_0/home/daliy-duty/redpack.gif" alt />
      <!-- <span></span> -->
      <div class="info">
        <template v-if="time > 0">
          <countdown
            class="tickTime"
            :time="time"
            :transform="transformSlotProps"
            @progress="handleCountdownProgress"
            @end="handleCountdownEnd"
          >
            <template slot-scope="props">
              <span v-show="props.days">
                {{ props.days }}
                <small>{{ $t('天') }}</small>
              </span>
              <span v-show="props.hours">
                {{ props.hours }}
                <small>{{ $t('时') }}</small>
              </span>
              <span>
                {{ props.minutes }}
                <small>{{ $t('分') }}</small>
              </span>
              <span>
                {{ props.seconds }}
                <small>{{ $t('秒') }}</small>
              </span>
            </template>
          </countdown>
        </template>
        <template v-else>
          <p>{{ time == "on" ? $t('活动进行中') : $t('活动已结束') }}</p>
        </template>
      </div>
    </div>
    <!-- <div
      v-else
      @click="checkStatus"
      :class="['hideDuty', { 'hideDuty-right': !isend }]"
    >
      <span>{{$t('每日')}}<br />{{$t('任务')}}</span>
    </div>-->
    <EverydayEntrance v-else v-show="isend" @click.native="checkStatus" />

    <van-popup
      :class="['custom']"
      v-model="isShow"
      :closeable="true"
      round
      close-icon-position="top-right"
      position="bottom"
      get-container="#app"
    >
      <div class="pop-head">
        <!-- <h2>{{$t('领取每日福利')}}</h2> -->
        <van-image :src="require('@/assets/common/img/everyday/everyday-gift@2x.png')" lazy />
      </div>
      <div class="list">
        <div class="daliy-main" v-for="(item, index) in daliyData" :key="index">
          <!-- <van-image
            fit="cover"
            lazy-load
            :src="
              require(`@assets/img3_0/home/daliy-duty/${
                iconArr[item.name]
              }@2x.png`)
            "
          />-->
          <div class="middle">
            <h3>{{ $t(item.name) }}</h3>
            <p v-if="item.name == '每日签到'">
              {{ $t('每日存款') }}{{ item.recharge_amount }}{{ $t('元') }}{{
                item.required_flow
              }}{{ $t('倍流水奖励') }}{{ item.reward_amount.min }}-{{
  item.reward_amount.max
}}{{ $t('元') }}
            </p>
            <p v-if="item.name == '任意投注'">
              {{ $t('每日参与任意投注') }}{{ item.daily_bet_amount }}{{ $t('次，奖励') }}{{
                item.reward_amount.min
              }}-{{ item.reward_amount.max }}{{ $t('元') }}
            </p>
            <p
              v-if="
                item.name == '累计投注金额' ||
                item.name == '累计充值'
              "
            >
              {{ $t(item.name) }}{{ $t('达') }}{{
                item.cumulative_bet_amount || item.daily_cumulative_recharge
              }}{{ $t('元，奖励') }}{{ item.reward_amount.min }}-{{
  item.reward_amount.max
}}{{ $t('元') }}
            </p>
            <p v-if="item.name == '完成全部任务'">
              {{ $t('完成每日任务，奖励') }}{{ item.reward_amount.min }}-{{
                item.reward_amount.max
              }}{{ $t('元') }}
            </p>
            <!-- <p v-else>{{item.content}}</p> -->
          </div>
          <van-button
            :disabled="item.status == 2"
            :class="{ 'un-finished': item.status === 0 }"
            type="primary"
            @click="dutyAction(index, item)"
          >{{ item.status == 1 ? $t('领取') : $t(item.msg) }}</van-button>
        </div>
      </div>

      <!-- <div style="text-align: center">
        <img class="task-logo" :src="h5_logo" alt />
      </div>-->
    </van-popup>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { dailytasks, getreward } from "@/api/home";
import { getRedRainInfo } from "@/api/activity";
import EverydayEntrance from '@/components/EverydayEntrance'
import { dateFormat } from '@/utils'

export default {
  name: "daliy-duty",
  props: ["isend"],
  components: {
    EverydayEntrance
  },
  data() {
    return {
      daliyData: [],
      isShow: false,
      isClose: false,
      iconArr: {
        [this.$t('每日签到')]: "sign",
        [this.$t('任意投注')]: "touzhu",
        [this.$t('累计投注金额')]: "touzhujine",
        [this.$t('累计充值')]: "deposit",
        [this.$t('完成全部任务')]: "done",
      },
      time: "off",
      h5_logo: "",
      yaboBoxMiddle: ["10024"].includes(process.env.VUE_APP_PROJECT_NAME),
      exportBoxMiddle: ["10050"].includes(process.env.VUE_APP_PROJECT_NAME),
      startTime: null
    };
  },
  watch: {
    async $route(to, from) {
      console.log(123123, to, from);
      if (to.name == "Home") {
        this.isClose = false;
        await this.getRedpackData();
        this.initData();
      }
    },
    token(val) {
      if (val && this.$route.name === "Home") {
        dailytasks().then((res) => {
          this.daliyData = res.data.data;
        });
      }
    },
    siteInfo: {
      handler(val) {
        console.log(val);
        this.h5_logo = val.h5_logo;
      },
      deep: true,
    },
  },
  computed: {
    ...mapState("users", ["token"]),
    ...mapState("global", ["siteInfo"]),
  },
  async created() {
    if (this.token) {
      await this.getRedpackData();
      this.initData();
    }
  },
  methods: {
    transformSlotProps(props) {
      const formattedProps = {}

      Object.entries(props).forEach(([key, value]) => {
        if (key === 'seconds') formattedProps[key] = value < 10 ? `0${value}` : String(value)
        else formattedProps[key] = value
      })

      return formattedProps
    },
    initData() {
      if (this.token) {
        dailytasks().then((res) => {
          this.daliyData = res.data.data;
        });
      }
    },
    getRedpackData() {
      let startTime = null
      let endTime = null
      let currTime = (new Date()).getTime()
      let timeType = null
      let actEndTime = null
      getRedRainInfo().then((res) => {
        const { data } = res.data;
        this.activityInfo = data.benefit_setting
        if (data.benefit_setting) timeType = data.benefit_setting.time_limit_type || null
        if (timeType * 1 === 1) { // 固定时间
          this.startTime = startTime = (new Date((data.start_time).replace(/-/g, '/'))).getTime()
          endTime = (new Date((data.end_time).replace(/-/g, '/'))).getTime()
        } else if (timeType * 1 === 2) { // 每日固定时间
          let year = new Date().getFullYear()
          let month = new Date().getMonth() + 1
          let date = new Date().getDate()
          this.startTime = startTime = (new Date((`${year}-${month}-${date} ${this.activityInfo.fixed_time_setting['start']}`).replace(/-/g, '/'))).getTime()
          endTime = (new Date((`${year}-${month}-${date} ${this.activityInfo.fixed_time_setting['start']}`).replace(/-/g, '/'))).getTime() + this.activityInfo.fixed_time_setting['time_duration'] * [60, 1][this.activityInfo.fixed_time_setting['time_duration_type'] * 1 - 1] * 60 * 1000
        } else if (timeType * 1 === 3) { // 间隔时间
          let firstTime = (new Date(`${this.activityInfo.interval_time_setting['start'][0]}`)).getTime()
          let subTime = currTime - firstTime
          let per = this.activityInfo.interval_time_setting['interval'] * [60, 1][this.activityInfo.interval_time_setting['interval_time_type'] * 1 - 1] * 60 * 1000 + this.activityInfo.interval_time_setting['time_duration'] * [60, 1][this.activityInfo.interval_time_setting['time_duration_type'] * 1 - 1] * 60 * 1000
          let count = Math.ceil(subTime / per) * 1
          this.startTime = startTime = firstTime + (count - 1) * per
          endTime = firstTime + (count - 1) * per + this.activityInfo.interval_time_setting['time_duration'] * [60, 1][this.activityInfo.interval_time_setting['time_duration_type'] * 1 - 1] * 60 * 1000
          actEndTime = (new Date(`${this.activityInfo.interval_time_setting['start'][1]}`)).getTime()
        }
        // debugger
        if (startTime - currTime > 0) {
          let subTime = startTime - currTime
          if (subTime > this.activityInfo.remind * 60 * 1000) {
            this.time = 'off'
          } else {
            this.time = subTime
          }
        } else if (currTime - startTime > 0 && currTime - endTime < 0) {
          this.time = 'on'
        } else if (currTime - endTime > 0) {
          this.time = 'off'
          if (currTime - actEndTime > 0) {
            return
          }
          if (timeType * 1 === 3) { // 处理活动状态
            this.startTime = startTime = startTime + this.activityInfo.interval_time_setting['interval'] * [60, 1][this.activityInfo.interval_time_setting['interval_time_type'] * 1 - 1] * 60 * 1000 + this.activityInfo.interval_time_setting['time_duration'] * [60, 1][this.activityInfo.interval_time_setting['time_duration_type'] * 1 - 1] * 60 * 1000
            endTime = startTime + this.activityInfo.interval_time_setting['time_duration'] * [60, 1][this.activityInfo.interval_time_setting['time_duration_type'] * 1 - 1] * 60 * 1000
            let subTime = startTime - currTime
            if (this.activityInfo.remind) { // 设置提醒时间
              if (subTime > this.activityInfo.remind * 60 * 1000) {
                this.time = 'off'
              } else {
                this.time = subTime
              }
            } else {
              this.time = subTime
            }
          }
        }
      });
    },
    handleCountdownProgress(data) {
      if (!data.totalSeconds) {
        this.time = "on";
      }
    },
    handleCountdownEnd() {
      this.time = 'on'
    },
    checkStatus() {
      this.isShow = true;
    },
    dutyAction(i) {
      const { daliyData } = this;
      if (!this.token) {
        this.$toast(this.$t('请登录后在参与活动'));
        return;
      }
      if (daliyData[i].status == 0) {
        if (
          [this.$t('每日签到'), this.$t('累计充值')].indexOf(
            daliyData[i].name
          ) != -1
        ) {
          this.$router.push("/deposit");
          this.isShow = false;
        } else if (daliyData[i].name == this.$t('完成全部任务')) {
          this.$toast.fail(this.$t('请先完成所有任务'));
        } else {
          this.isShow = false;
        }
        return;
      }
      if (daliyData[i].status == 1) {
        this.draw(i);
        // this.$store.dispatch('global/setRedBag',[true,daliyData[i],10])
        // this.isShow = false;
      }
    },
    draw(i) {
      const params = {
        step: i + 1,
        money: this.daliyData[i].money,
      };
      getreward(params).then((res) => {
        if (res.data.code == 0) {
          // if (daliyData[i].name == this.$t('完成全部任务')) {
          //   this.$toast(`恭喜你完成今日任务${this.daliyData[i].money}金额`);
          // } else {
          //   this.$toast(`每日任务奖励${this.daliyData[i].money}金额`);
          // }
          this.$store.dispatch("global/setRedBag", [
            true,
            this.daliyData[i],
            params.step === 6 ? res.data.data[0].money : res.data.data.money,
          ]);
          this.isShow = false;
          this.initData();
        }
      });
    },
    handleGo() {
      if (this.token) {
        if (this.time > 0) {
          this.$toast(`红包雨将在 ${dateFormat('YYYY年mm月dd日 HH时MM分', this.startTime)} 开启`)
          return
        }
        sessionStorage.setItem('wq-time-rain', this.startTime)
        this.$router.push('/activity/redEnvelopeRain')
      } else {
        this.$router.push('/login')
      }
    }
  },
};
</script>

<style lang="less" scoped>
.duty {
  position: fixed;
  right: 0;
  bottom: 400px;
  z-index: 2;
  .redpack {
    // width:80px;
    img {
      width: 160px;
    }
    .info {
      position: absolute;
      top: 50px;
      width: 100%;
      text-align: center;
      p {
        color: #fff;
        line-height: 40px;
        font-size: 20px;
        font-weight: bold;
      }
      .tickTime {
        color: #fff;
        font-weight: bold;
        width: 100%;
        text-align: center;
        display: block;
      }
    }
  }
  .main {
    width: 174px;
  }
  .close {
    width: 44px;
    position: absolute;
    top: -20px;
    right: 0;
  }
  .hideDuty {
    width: 68px;
    height: 68px;
    background-image: @bg-gradient-color;
    background-color: @bg-gradient-color;
    border-radius: 10px 0 0 10px;
    color: #fff;
    text-align: center;
    padding: 10px;
    transition: all 0.5s;
    overflow: hidden;
    span {
      font-size: 22px;
      white-space: nowrap;
    }
  }
  .hideDuty-right {
    width: 0;
    span {
      display: none;
    }
    // margin-left: 68px;
  }
}
.van-popup.custom {
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, #264db9 0%, #162d97 100%);
  overflow: visible;
  .pop-head {
    text-align: center;
    h2 {
      border-bottom: none;
    }
    .van-image {
      width: 488px;
      height: 200px;
      position: relative;
      margin: 0 auto;
      /deep/ img {
        width: 100%;
        height: 274px;
        position: absolute;
        left: 0;
        bottom: 0;
        // transform: translateX(-50%);
      }
    }
  }
  .list {
    flex: 1;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    padding: 30px;
    .daliy-main {
      // background: @bg-color-2;
      background: #fff;
      overflow: hidden;
      // height:140px;
      margin-bottom: 20px;
      padding: 20px;
      border-radius: 4px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .van-image {
        width: 80px;
        float: left;
        margin-right: 18px;
      }
      .middle {
        color: #6c6c6c;
        display: flex;
        flex-direction: column;
        height: 60px;
        h3 {
          margin: 0;
          margin-bottom: 10px;
          font-size: 28px;
          color: #1e1e1e;
        }
        p {
          font-size: 20px;
        }
      }
      .van-button {
        float: right;
        width: 160px;
        height: 60px;
        line-height: 60px;
        font-size: 20px;
        color: #fff !important;
        background: #ff8f26 !important;
        background-image: none !important;
        border-color: transparent !important;
        &.un-finished {
          background: #e12937 !important;
          background-image: none !important;
        }
      }
    }
  }
}
.task-logo {
  height: 60px;
}
</style>
