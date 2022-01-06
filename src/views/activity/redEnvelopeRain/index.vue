<template>
  <div class="redEnvelopeRain" :class="{'en-redEnvelopeRain': lang !== 'zh'}">
    <!-- <p>{{$t('红包雨')}}</p> -->
    <lheader v-if="!$route.query.source" :title="$t('红包雨活动')" :goback="true"></lheader>
    <div class="section-1">
      <img src="./assets/redbag.png" alt />
      <div>
        <p>{{ $t('红包活动倒计时') }}</p>
        <div class="time">
          <template v-if="time > 0">
            <countdown
              :time="time"
              :transform="transformSlotProps"
              @end="handleCountdownEnd"
              @progress="handleCountdownProgress"
            >
              <template slot-scope="props">
                <span v-if="props.days">
                  {{ props.days }}
                  <small>{{ $t('天') }}</small>
                </span>
                <span v-if="props.hours">
                  {{ props.hours }}
                  <small>{{ $t('时') }}</small>
                </span>
                <span v-if="props.minutes">
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
            <p>{{ time == 'on' ? $t('活动进行中') : $t('活动已结束') }}</p>
          </template>
        </div>
        <!-- <p>{{$t('距离活动开始时间')}}</p> -->
        <img
          v-show="!Boolean(this.$route.query.token || this.token)"
          @click="$router.push('/login')"
          src="./assets/login.png"
          alt
        />
      </div>
    </div>
    <div class="section-2">
      <img class="title" src="./assets/reward_title.png" alt />
      <div class="reward">
        <h2>{{ $t('红包大奖名单') }}</h2>
        <div>
          <div class="top">
            <ul>
              <li>{{ $t('中奖账号') }}</li>
              <li>{{ $t('中奖金额') }}</li>
            </ul>
            <ul>
              <li>{{ $t('中奖账号') }}</li>
              <li>{{ $t('中奖金额') }}</li>
            </ul>
          </div>
          <div class="bottom">
            <vue-list-marquee class="my-marquee" :listData="list1" :option="option">
              <template slot-scope="{ item }">
                <ul class="list-item">
                  <li>{{ item.username }}</li>
                  <li>{{ item.money }}</li>
                </ul>
              </template>
            </vue-list-marquee>
            <vue-list-marquee class="my-marquee" :listData="list2" :option="option">
              <template slot-scope="{ item }">
                <ul class="list-item">
                  <li>{{ item.username }}</li>
                  <li>{{ item.money }}</li>
                </ul>
              </template>
            </vue-list-marquee>
          </div>
        </div>
      </div>
    </div>
    <div class="section-3">
      <img class="title" src="./assets/step_title.png" alt />
      <div v-for="(item, index) in step" :key="index">
        <img :src="require(`./assets/step_${index + 1}.png`)" alt />
        <div class="content">
          <h2>{{ $t('第') }}{{ index + 1 }}{{ $t('步') }}</h2>
          <p>{{ item }}</p>
        </div>
      </div>
    </div>
    <!-- 点击领取红包效果 -->
    <RedpacketRain
      v-show="time === 'on'"
      :time="time"
      :activityInfo="activityInfo"
      @changeTime="changeTime"
    />
  </div>
</template>

<script>
import { getRedRainInfo, getRedRainWinList } from "@/api/activity";
import 'vue-list-marquee/dist/vue-list-marquee.css'
import { VueListMarquee } from 'vue-list-marquee'
import RedpacketRain from './RedpacketRain'
import { mapState } from "vuex";
import Lheader from "@/components/l-header";

export default {
  data() {
    return {
      step: [
        this.$t('● 活动开始前会提前倒计时，    倒计时结束后开启红包雨 '),
        this.$t('● 每次选中到红包出现金额，    将代表中奖 '),
        this.$t('● 活动结束后将自动到账主钱包，    无需手动再次领取')],
      list1: [],
      list2: [],
      option: {
        // 滚动一个条目高度的过渡时间
        moveTime: 1000,
        // 每滚动一个条目，是否需要停顿；如果为false，restTime属性将无效；
        needRestTime: false,
        // 每滚动一个条目后的停顿时间(尽量大于100，否则效果不好)，默认2000，needRestTime为true时，才有效；
        restTime: 1000,
        // 当鼠标移入和移出时，是否需要暂停和继续滚动；
        needHover: true,
        // 当滚动列表数据更新时，等待该延迟时间后，再进行滚动；
        delayTime: 3000,
        // 速度曲线【可选值： linear、ease、ease-in、ease-out、ease-in-out、cubic-bezier(n,n,n,n)】；当needRestTime为true时，才有效；
        timingFunc: 'linear'
      },
      time: 'off',
      activityInfo: {},
      lang: window.localStorage.getItem("i18n") ||
          ((navigator.language && navigator.language.substr(0, 2)) == "en"
              ? "en"
              : "zh") || "zh",
    }
  },
  components: {
    VueListMarquee,
    RedpacketRain,
    Lheader
  },
  computed: {
    ...mapState("users", ["token"])
  },
  created() {
    this.getData()
    this.getList()
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
    handleCountdownProgress(data) {
      if (!data.totalSeconds) {
        this.time = 'on'
      }
    },
    handleCountdownEnd() {
      this.time = 'on'
    },
    getData() {
      let startTime = null
      let endTime = null
      let currTime = (new Date()).getTime()
      let timeType = null
      let actEndTime = null
      Boolean(this.$route.query.token || this.token) && getRedRainInfo().then((res) => {
        const { data } = res.data;
        this.activityInfo = data.benefit_setting
        timeType = data.benefit_setting.time_limit_type
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
    getList() {
      getRedRainWinList({ page: 1 }).then(res => {
        this.list1 = res.data.data.list
      })
      getRedRainWinList({ page: 2 }).then(res => {
        this.list2 = res.data.data.list
      })
    },
    changeTime() {
      this.time = 'off'
    }
  }
}
</script>

<<<<<<< HEAD

















<style src="./style.less" lang="less" scoped>
</style>
=======
<style src="./style.less" lang="less" scoped></style>
>>>>>>> i18n-style-fix
