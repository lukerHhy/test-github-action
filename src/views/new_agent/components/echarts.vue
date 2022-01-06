<template>
  <div>
    <div
      id="myChart"
      :style="{ width: '345px', height: '150px' }"
    ></div>
    <!-- <span class="text">78972348</span>
    <span style="top:2.65rem" class="text">78972348</span>
    <span style="top:3.25rem;left:6.6rem" class="text">78972348</span> -->
  </div>
</template>

<script>
import { memberOverview } from '@/api/agent'
import { getDate, getMonth } from '@/utils/utils'
import echarts from "echarts";
let variables = {}
try{
  variables = require(`@/current_project/styles/agent/fix-style.less`)
} catch(e) {}

console.log(variables)

export default {
  name: 'echarts',
  props: {
    middleText: String,
    dataValue: String,
    // data: Object,
  },
  data() {
    return {}
  },
  async mounted() {
    // let time = {
    //   start_date: getMonth('s', 0),
    //   end_date: getMonth('e', 0),
    // }
    // if (!this.dataValue) {
    //   time = {
    //     start_date: getDate(0),
    //     end_date: getDate(0),
    //   }
    // } else {
    //   time = {
    //     start_date: getMonth('s', 0),
    //     end_date: getMonth('e', 0),
    //   }
    // }
    console.log(this.dataValue)
    let time = {}
    switch (this.dataValue) {
      case this.$t('今日'):
        time = {
          start_date: getDate(0),
          end_date: getDate(0),
        }
        break;
      case this.$t('昨日2'):
        time = {
          start_date: getDate(-1),
          end_date: getDate(-1),
        }
        break;
      case this.$t('本月'):
        time = {
          start_date: getMonth('s', 0),
          end_date: getMonth('e', 0),
        }
        break;
    }
    const {
      data: { data },
    } = await memberOverview(time)
    this.drawLine(data)
  },
  methods: {
    drawLine(item) {
      console.log(11111, item)
      let _this = this;
      // 初始化echarts实例
      let myChart = echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption({
        color: variables.color0 ? [variables.color0, variables.color1, variables.color2] : ['#C8A77F', '#976346', '#80AAFF'],
        title: [{
          text: this.dataValue + '\n' + _this.$t("活跃"),
          top: 45,
          left: 45,
          textStyle: {
            fontSize: 18,
            fontWeight: 'bold',
            color: variables.fontColor,
          }
        }],
        tooltip: {
          backgroundColor: variables.tipBgColor || '#fff',
          textStyle: {
            color: variables.tipColor || '#000',
          },
          trigger: 'item',
          formatter: `${this.dataValue}{b}: {c} ({d}%)`,
        },
        legend: {
          orient: 'vertical',
          // center: ['90%', '30%'],
          left: 140,
          top: 30,
          formatter: function (name) {
            switch (name) {
              case _this.$t('新增  '):
                // return (_this.dataValue ? name : this.$t('本日新增')) + '  ' + item.new_members
                return _this.dataValue + _this.$t('新增  ') + item.new_members
              case _this.$t('活跃  '):
                return _this.dataValue + _this.$t('活跃  ') + item.active_members
              case _this.$t('新增有效  '):
                return _this.dataValue + _this.$t('新增有效  ') + item.total_deposit_count
            }
            // return name + '234242'
          },
          textStyle: {
            fontSize: 15,
            color: '#999999',
          },
          // data: [this.$t('本月新增'), this.$t('本月活跃'), this.$t('本月新增有效')],
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: ['35%', '70%'],
            center: ['20%', '45%'],
            // left: 10,
            // top: 10,
            avoidLabelOverlap: false,
            itemStyle: {
              borderWidth: 7, //设置border的宽度有多大
              borderColor: variables.borderColor || '#191919',
            },
            label: {
              show: false,
              position: 'center',
            },
            emphasis: {
              label: {
                show: false,
                fontSize: '30',
                fontWeight: 'bold',
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: item.new_members, name: this.$t('新增  ') },
              { value: item.active_members, name: this.$t('活跃  ') },
              { value: item.total_deposit_count, name: this.$t('新增有效  ') },
            ],
          },
        ],
      })
      // window.addEventListener('resize', () => {
      //   // 自动渲染echarts
      //   myChart.resize()
      // })
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
