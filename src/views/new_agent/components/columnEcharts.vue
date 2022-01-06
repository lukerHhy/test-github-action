<template>
  <div>
    <div
      id="columnnChart"
      :style="{ width: '100vw', height: '300px' }"
    ></div>
    <!-- <span class="text">78972348</span>
    <span style="top:2.65rem" class="text">78972348</span>
    <span style="top:3.25rem;left:6.6rem" class="text">78972348</span> -->
  </div>
</template>

<script>
import echarts from "echarts";
let variables = {}
try{
  variables = require(`@/current_project/styles/agent/fix-style.less`)
} catch(e) {}

export default {
  name: 'echarts',
  props: {
    middleText: Boolean,
    dataValue: Object,
  },
  data() {
    return {}
  },
  mounted() {
    // this.$nextTick(function() {
    //   const list = this.$parent._data.echartsList.list
    //   let xAxis = [],
    //     data = []
    //   list &&
    //     list.reduceRight((item, nxt) => {
    //       // console.log(item, nxt)
    //       xAxis.push(nxt.month)
    //       data.push(1500)
    //     }, [])
    //   console.log(xAxis, data)
    //   this.drawLine(xAxis, data)
    // })
  },
  methods: {
    show() {
      const list = this.$parent._data.echartsList.list
      console.log(11112,list);
      let xAxis = [],
        data = []

      list &&
        list.reduceRight((item, next) => {
          xAxis.push(next.month.replace('年', '-').replace('月', ''))
<<<<<<< HEAD
          data.push(next.bonus)
=======
          data.push(next.month_fee)
>>>>>>> 86c77e88b29725dc51edb96e81a6a0a5208fed9f
        }, [])
      this.drawLine(xAxis, data)
    },
    drawLine(xAxis, data) {
      // 初始化echarts实例
      let myChart = echarts.init(document.getElementById('columnnChart'))
      // 绘制图表
      myChart.setOption({
        color: [variables.color3 || '#999999', variables.color3 || '#999999'],
        grid: { top: '5%', left: '8%' },
<<<<<<< HEAD
        tooltip: {},
=======
        tooltip: {
          formatter: `已派发佣金 <br /> {c}`,
        },
>>>>>>> 86c77e88b29725dc51edb96e81a6a0a5208fed9f
        xAxis: {
          type: 'category',
          data: xAxis,
          axisLine: {
            lineStyle: {
                color: variables.linecolor || '#999999'
            }
          },
          axisLabel: {
            show: true,
            left: '10%',
            textStyle: {
              color: variables.linecolor || '#999999',
              fontSize: 14,
            },
          },
          axisTick: {
            show: false,
          },
        },
        yAxis: {
          axisLine: {
            lineStyle: {
                color: variables.linecolor || '#999999'
            }
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: variables.linecolor || '#999999',
              fontSize: 14,
            },
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed',
              color: variables.dashcolor || '#353435',
            },
          },
        },
        series: [
          {
            name: '',
            type: 'bar',
            data,
          },
        ],
      })
    },
  },
}
</script>

<style scoped lang="less">
#myChart {
  position: relative;
}
.text {
  position: absolute;
  left: 250px;
  top: 81px;
  font-size: 0.4rem;
  color: @text-color;
}
</style>
<<<<<<< HEAD
=======

>>>>>>> 86c77e88b29725dc51edb96e81a6a0a5208fed9f
