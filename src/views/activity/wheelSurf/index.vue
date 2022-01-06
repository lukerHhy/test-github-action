<template>
  <div class="container">
    <Lheader :rightName="rightbtn" @rightClick="$refs.rule.isshow()"></Lheader>
    <div class="title">
      <img :src="require(`./assets/img/title-normal${version}.png`)" alt="" />
    </div>
    <div class="btns">
      <div
        :class="['mode-btn', { active: version === 1 }]"
        @click="() => cut(1)"
      >
{{$t('新手版')}}
      </div>
      <div
        :class="['mode-btn', { active: version === 2 }]"
        @click="() => cut(2)"
      >
{{$t('豪华版')}}
      </div>
    </div>
    <!-- 4F1B00 -->
    <div class="lucky-wheel">
      <div class="wheel-main">
        <img class="rait" src="./assets/img/rait_bg.png" alt="" />
        <div class="wheel-pointer" ref="wheelbtn" @click="beginRotate()"></div>
        <div class="wheel-bg" ref="wheelbg" :style="rotateStyle">
          <div class="prize-list">
            <div
              class="prize-item"
              v-for="(item, index) in prizeList"
              :key="index"
              :style="item.style"
            >
              <div
                class="prize-type"
                :style="{ color: version === 1 ? 'rgb(158, 1, 1)' : '#4F1B00' }"
                v-if="item.type === 1 || item.type === 3"
              >
                {{ item.gift_money }}元{{ item.gift_name }}
              </div>
              <div
                class="prize-type"
                :style="{ color: version === 1 ? 'rgb(158, 1, 1)' : '#4F1B00' }"
                v-if="item.type === 2"
              >
                存{{ item.recharge_money }}送{{ item.gift_money }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <ul class="info" v-show="version === 1">
          <li>
            <p v-if="timeStatus === 1">{{$t('活动还未开始')}}</p>
            <p v-if="timeStatus === 2">{{$t('活动长期有效')}}</p>
            <p v-if="timeStatus === 3">{{ day }}天{{ hour }}小时{{ min }}分</p>
            <p v-if="timeStatus === 4">{{$t('活动已结束')}}</p>
            <p>{{$t('新手转盘倒计时')}}</p>
          </li>
          <li>
            <p>{{ newcount }}次</p>
            <p>{{$t('剩余转盘机会')}}</p>
          </li>
        </ul>
        <p v-show="version === 2" class="middletip">
          您还有<span>{{ count }}</span
          >次旋转机会
        </p>

        <div class="selbtn">
          <div
            :class="{ switchFlag: switchFlag === 0 }"
            @click="() => (switchFlag = 0)"
          >
{{$t('中奖记录')}}
          </div>
          <div
            :class="{ switchFlag: switchFlag === 1 }"
            @click="() => getMyGift()"
          >
{{$t('我的礼品')}}
          </div>
        </div>
      </div>
      <Rolling
        :switchFlag="switchFlag"
        :rollingData="rollingData"
        :giftList="giftList"
      ></Rolling>
    </div>
    <rule ref="rule"></rule>
    <div class="toast-mask" v-show="prize">
      <div class="toast">
        <img class="toast-bg" src="./assets/img/win_bg.png" alt="" />
        <p class="toast-tip">～{{$t('恭喜您转到了')}}～</p>
        <p class="text" v-html="toastTitle"></p>
        <p class="bottom-tip">{{ tipdate }}</p>
        <img
          class="toast-close"
          @click="closeToast"
          src="./assets/img/colse.png"
          alt=""
        />
      </div>
    </div>
  </div>
</template>
<script>
// 重写date 兼容safari Ie8  大坑啊！！！！
Date = (function(Date) {
  MyDate.prototype = Date.prototype
  return MyDate

  function MyDate() {
    // 当只有一个参数并且参数类型是字符串时，把字符串中的-替换为/
    if (arguments.length === 1) {
      let arg = arguments[0]
      if (
        Object.prototype.toString.call(arg) === '[object String]' &&
        arg.indexOf('T') === -1
      ) {
        arguments[0] = arg.replace(/-/g, "/")
        // console.log(arguments[0]);
      }
    }
    let bind = Function.bind
    let unbind = bind.bind(bind)
    return new (unbind(Date, null).apply(null, arguments))()
  }
})(Date)
const CIRCLE_ANGLE = 360

const config = {
  // 总旋转时间
  duration: 4000,
  // 旋转圈数
  circle: 8,
  mode: 'ease-in-out',
}
const uid = JSON.parse(localStorage.getItem('userInfo')).id
import Rolling from './rolling'
import Lheader from '@/components/l-header'
import popup from '@/components/popup'
import { countdown } from './mxins'
import rule from './rule'
import {
  getRouletteRecord,
  getRouletteMyGift,
  getRouletteTimes,
  getRouletteResult,
  specialdetail,
} from '@/api/activity'
export default {
  components: { Rolling, Lheader, popup, rule },
  mixins: [countdown],
  data() {
    return {
      curStartTime1: '',
      tipdate: '',
      version: 1, // 版本  默认新手版
      count: 10, // 剩余抽奖次数
      duration: 3000, // 转盘旋转时间
      prizeList: [], // 奖品列表
      rotateAngle: 0, // 旋转角度
      index: 0,
      prize: null,
      switchFlag: 0,
      rollingData: [],
      giftList: [],
      activityId: this.$route.query.id,
      newcount: 0,
      newer: '',
      toastTitle: '',
      timeStatus: 1,
    }
  },
  async created() {
    this.cut()
    // 初始化一些值
    this.angleList = []
    // 是否正在旋转
    this.isRotating = false
    // 基本配置
    this.config = config

    // 获取奖品列表
    // this.initPrizeList()
    //获取抽奖次数
    this.getcount()
    this.getRouletteRecord()
  },
  watch: {
    version: {
      handler: function(val) {
        this.$nextTick(() => {
          let { wheelbg, wheelbtn } = this.$refs
          wheelbtn.style.background = `url(${require('./assets/img/draw_btn' +
            val +
            '.png')}) no-repeat center top`
          wheelbtn.style['background-size'] = '100%'
          wheelbg.style.background = `url(${require('./assets/img/draw_wheel' +
            val +
            '.png')}) no-repeat center top`
          wheelbg.style['background-size'] = '100%'
        })

        // this.$refs.wheelbtn.style.background = `url("./assets/img/draw_btn${val}.png") no-repeat center top`
      },
    },
  },
  computed: {
    rightbtn() {
      return `
      <div style='border: 1px solid #C9AE8F;
    text-align: center;
    border-radius: 10px;
    line-height: .5rem;' @click="log">${this.$t('活动规则')}</div>
      `
    },
    rotateStyle() {
      return `
        -webkit-transition: transform ${this.config.duration}ms ${this.config.mode};
        transition: transform ${this.config.duration}ms ${this.config.mode};
        -webkit-transform: rotate(${this.rotateAngle}deg);
            transform: rotate(${this.rotateAngle}deg);`
    },
    // toastTitle() {
    //   return this.prize && this.prize.isPrize === 1
    //     ? this.$t('恭喜您，获得') + this.prize.name
    //     : this.$t('未中奖')
    // },
    toastIcon() {
      return this.prize && this.prize.isPrize === 1
        ? require('./assets/img/congratulation.png')
        : require('./assets/img/sorry.png')
    },
  },
  methods: {
    cut(n = 1) {
      this.version = n
      // const info = JSON.parse(
      //   JSON.parse(localStorage.getItem('tableInfo')).condition_setting
      // )
      specialdetail({
        id: this.activityId,
      }).then((res) => {
        const {
          data: {
            data: { condition_setting, end_time, start_time },
          },
        } = res
        this.$refs.rule.getconfig(condition_setting)
        if (start_time) {
          if (+new Date().getTime() - +new Date(start_time).getTime() > 0) {
            if (end_time !== null) {
              this.curStartTime = end_time
              if (new Date().getTime() - new Date(end_time).getTime() < 0) {
                // 活动正在进行中
                this.countTime()
                this.timeStatus = 3
              } else {
                // 活动已过期
                this.timeStatus = 4
              }
            } else {
              // 活动已开始  并且长期有效
              this.timeStatus = 2
            }
          } else {
            this.timeStatus = 1
          }
        } else {
          // 活动还未开始
          this.timeStatus = 1
        }
        if (this.version === 1) {
          this.newer = condition_setting.newer
        } else {
          this.newer = condition_setting.luxurious
        }
        this.initPrizeList()
      })
    },
    // 性能极差  别学哦
    async getRouletteRecord(num = 6) {
      try {
        // 解构有风险  慎用！
        const {
          data: {
            data: { list, total_page, total },
          },
        } =
          (await getRouletteRecord({
            id: this.$route.query.id,
            page_limit: num,
          })) || {}
        this.rollingData = list
        if (total_page > 1) {
          this.getRouletteRecord(total)
        }
      } catch (err) {
        console.log(err.message)
      }
    },
    getcount() {
      getRouletteTimes({
        id: this.activityId,
        uid,
      }).then((res) => {
        const {
          data: {
            data: { luxurious, newer },
          },
        } = res || {}
        this.newcount = newer
        this.count = luxurious
      })
    },
    async getMyGift(num = 6) {
      const {
        data: {
          data: { list, total_page },
        },
      } = await getRouletteMyGift({
        id: this.activityId,
        uid,
        page_limit: num,
      })
      this.giftList = list
      this.switchFlag = 1
      if (total_page > 1) {
        this.getMyGift(total)
      }
    },
    rightClick() {
      console.log(this.$refs)
    },
    initPrizeList() {
      // 这里可以发起请求，从服务端获取奖品列表
      // 这里使用模拟数据

      this.prizeList = this.formatPrizeList(this.newer.gift_items)
    },
    // 格式化奖品列表，计算每个奖品的位置
    formatPrizeList(list) {
      // 记录每个奖的位置
      const angleList = []

      const l = list.length
      // 计算单个奖项所占的角度
      const average = CIRCLE_ANGLE / l

      const half = average / 2

      // 循环计算给每个奖项添加style属性
      list.forEach((item, i) => {
        // 每个奖项旋转的位置为 当前 i * 平均值 + 平均值 / 2
        const angle = -(i * average + half)
        // 增加 style
        item.style = `-webkit-transform: rotate(${angle}deg);
                      transform: rotate(${angle}deg);`

        // 记录每个奖项的角度范围
        angleList.push(i * average + half)
      })

      this.angleList = angleList

      return list
    },
    beginRotate() {
      // 添加次数校验
      if (
        (this.version === 1 && this.newcount === 0) ||
        (this.version === 2 && this.count === 0)
      ) {
        this.$toast(this.$t('暂无抽奖机会'))
        return
      }
      if (this.isRotating) return
      // 开始抽奖
      // 这里这里向服务端发起请求，得到要获得的奖
      // 可以返回下标，也可以返回奖品 id，通过查询 奖品列表，最终得到下标
      getRouletteResult({
        id: this.activityId,
        uid,
        roulette_type: this.version,
      }).then((res) => {
        const {
          data: {
            data: {
              lucky_postion,
              gift_type,
              gift_item,
              gift_money,
              end_time,
              recharge_money,
            },
          },
        } = res || {}
        this.curStartTime1 = end_time
        this.countTime1()
        this.index = lucky_postion
        // 开始旋转
        this.rotating()
        switch (gift_type) {
          case 1:
            // 减少剩余抽奖次数
            this.version === 1 ? this.newcount-- : this.count--
            this.toastTitle = `<span style='font-size:.7rem'>${gift_money}</span>${gift_item}`
            break
          case 2:
            // 减少剩余抽奖次数
            this.version === 1 ? this.newcount-- : this.count--
            this.toastTitle = `${this.$t('存')} <span style='font-size:.7rem'>${recharge_money}</span>${this.$t('送')} <span style='font-size:.7rem'>${gift_money}</span>${this.$t('兑换券')}`
            break
          case 3:
            // 减少剩余抽奖次数
            this.version === 1 ? this.newcount-- : this.count--
            this.toastTitle = `<span style='font-size:.7rem'>${gift_money}</span>元实物`
            break
          default:
            this.toastTitle = this.$t('很遗憾！未中奖')
        }
      })
    },
    // random(max, min = 0) {
    //   return parseInt(Math.random() * (max - min + 1) + min)
    // },
    rotating() {
      const { isRotating, angleList, config, rotateAngle, index } = this

      if (isRotating) return

      this.isRotating = true

      // 计算角度
      const angle =
        // 初始角度
        rotateAngle +
        // 多旋转的圈数
        config.circle * CIRCLE_ANGLE +
        // 奖项的角度
        angleList[index] -
        (rotateAngle % CIRCLE_ANGLE)
      this.rotateAngle = angle

      // 旋转结束后，允许再次触发
      setTimeout(() => {
        this.rotateOver()
      }, config.duration + 1000)
    },
    rotateOver() {
      this.isRotating = false
      this.prize = this.newer.gift_items[this.index]
    },
    //关闭弹窗
    closeToast() {
      this.prize = null
    },
  },
}
</script>
<style src="./style.less" lang="less" scoped></style>
