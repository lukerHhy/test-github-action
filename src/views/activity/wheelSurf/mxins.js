export const countdown = {
  data() {
    return {
      curStartTime: '2020-11-12 16:19:55',
      day: '0',
      hour: '00',
      min: '00',
      second: '00',
    }
  },
  methods: {
    // 倒计时
    countTime() {
      // 获取当前时间
      let date = new Date()
      let now = date.getTime()
      // 设置截止时间
      let endDate = new Date(this.curStartTime) // this.curStartTime需要倒计时的日期
      let end = endDate.getTime()
      // 时间差
      let leftTime = end - now
      // 定义变量 d,h,m,s保存倒计时的时间
      if (leftTime >= 0) {
        // 天
        this.day = Math.floor(leftTime / 1000 / 60 / 60 / 24)
        // 时
        let h = Math.floor(leftTime / 1000 / 60 / 60 % 24)
        this.hour = h < 10 ? '0' + h : h
        // 分
        let m = Math.floor(leftTime / 1000 / 60 % 60)
        this.min = m < 10 ? '0' + m : m
        // 秒
        let s = Math.floor(leftTime / 1000 % 60)
        this.second = s < 10 ? '0' + s : s
      } else {
        this.day = 0
        this.hour = '00'
        this.min = '00'
        this.second = '00'
      }
      // 等于0的时候不调用
      if (Number(this.hour) === 0 && Number(this.day) === 0 && Number(this.min) === 0 && Number(this.second) === 0) {
        this.timeStatus = 4
        return
      } else {
        // 递归每秒调用countTime方法，显示动态时间效果,
        setTimeout(this.countTime, 1000)
      }
    },
    countTime1() {
      if (this.curStartTime1 == '') {
        this.tipdate = this.$t('长期有效')
        return
      }
      // 获取当前时间
      let date = new Date()
      let now = date.getTime()
      let day, hour, min, second = 0
      // 设置截止时间
      let endDate = new Date(this.curStartTime1) // this.curStartTime需要倒计时的日期
      let end = endDate.getTime()
      // 时间差
      let leftTime = end - now
      // 定义变量 d,h,m,s保存倒计时的时间
      if (leftTime >= 0) {
        // 天
        day = Math.floor(leftTime / 1000 / 60 / 60 / 24)
        // 时
        let h = Math.floor(leftTime / 1000 / 60 / 60 % 24)
        hour = h < 10 ? '0' + h : h
        // 分
        let m = Math.floor(leftTime / 1000 / 60 % 60)
        min = m < 10 ? '0' + m : m
        // 秒
        let s = Math.floor(leftTime / 1000 % 60)
        second = s < 10 ? '0' + s : s
      } else {
        day = 0
        hour = '00'
        min = '00'
        second = '00'
      }
      // 等于0的时候不调用
      if (Number(hour) === 0 && Number(day) === 0 && Number(min) === 0 && Number(second) === 0) {
        this.tipdate = this.$t('已过期')
        return
      } else {
        this.tipdate = `${this.$t('请于')}${day}${this.$t('天')}${hour}${this.$t('小时')}${min}${this.$t('分内进行兑换')}`
        // 递归每秒调用countTime方法，显示动态时间效果,
        setTimeout(this.countTime1, 1000)
      }
    }
  }
}