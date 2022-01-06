<template>
  <div id="Member">
    <Homelayout :title="$t('下级概览')">
      <ul class="card">
        <li
          v-for="(item, i) in allInfo"
          :key="i"
        >
          <p class="numCss">{{ agentrelation[item.key] }}</p>
          <p class="card_text">{{ item.text }}</p>
        </li>
      </ul>
    </Homelayout>
    <van-tabs @click="onClick">
      <van-tab :title="$t('今日活跃')">
        <Echarts
          v-if="title === $t('今日活跃')"
          :middleText="$t(title)"
          :dataValue="$t('今日')"
        ></Echarts>
      </van-tab>
      <van-tab :title="$t('昨日活跃')">
        <Echarts
          v-if="title === $t('昨日活跃')"
          :middleText="$t(title)"
          :dataValue="$t('昨日')"
        ></Echarts>
      </van-tab>
      <van-tab :title="$t('本月活跃')">
        <Echarts
          v-if="title == $t('本月活跃')"
          :middleText="$t(title)"
          :dataValue="$t('本月')"
        ></Echarts>
      </van-tab>
      <van-tab
        disabled
        title=""
      ></van-tab>
      <van-tab
        disabled
        title=""
      ></van-tab>
    </van-tabs>
    <Homelayout :title="$t('下级成员列表')">
      <template #rightBtn>
        <span
          class="search-btn"
          @click="searchVisible = true"
        >
          <van-icon :name="SearchIcon" />{{$t('筛选')}}
        </span>
      </template>
      <Memberlist :list="list" />
      <van-empty
        v-show="!list.length"
        :image="EmptyIcon"
        :description="$t('暂无下级成员信息')"
      />
    </Homelayout>
    <van-popup
      v-model="searchVisible"
      position="bottom"
      get-container="#app"
    >
      <div class="pop-search-wrap">
        <div class="pop-search-wrap-title">
          <van-icon
            name="cross"
            @click="searchVisible = false"
          /><span>筛选成员列表</span>
        </div>
        <h3>{{$t('会员账号')}}</h3>
        <div class="pop-search-wrap-input">
          <van-field
            :placeholder="$t('请输入会员账号')"
            v-model="username"
          />
        </div>
        <h3>{{$t('统计时间')}}</h3>
        <div class="date-select">
          <span class="iconfont icon-bianzu11" /><span @click="select('START')">{{
              startDate || $t('开始')
            }}
            <van-icon
              name="play"
              class="start-arrow"
            />
          </span><span class="date-select-separator" /><span @click="select('END')">{{ endDate  || $t('结束') }}
            <van-icon
              name="play"
              class="end-arrow"
            />
          </span>
        </div>
        <div class="pop-search-wrap-dates">
          <span
            v-for="(item, index) in dateOptions"
            :key="index"
            :class="{active: searchActive === index}"
            @click="setDate(item.date, index)"
          >{{$t(item.label)}}</span>
        </div>
        <div class="pop-search-wrap-btn">
          <van-button
            @click="getmemberlist"
            color="#C8A77F"
          >{{$t('查询')}}</van-button>
          <!-- <van-button
          @click="clear"
          style="margin-bottom: 1.2rem;"
        >重置</van-button> -->
        </div>
      </div>
    </van-popup>
    <van-popup
      v-model="datashow"
      position="bottom"
      get-container="#app"
    >
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="saveDate"
        @cancel="datashow = false"
      />
    </van-popup>
  </div>
</template>
<script>
import Homelayout from './components/homeLayout'
import Echarts from './components/echarts'
import Memberlist from './components/memberlist'
import { formateDate } from '../../utils'
import { memberlist, memberOverview } from '@/api/agent'
import { getMonth } from '@/utils/utils'
import EmptyIcon from './images/empty@2x.png';
import SearchIcon from './images/search@2x.png';

// 获取指定日期的时间戳
const getTargetDate = (day = 1) => {
  const now = new Date();
  return formateDate(new Date(now.setTime(now.getTime() - 3600 * 1000 * 24 * day)))
}

const nowDate = formateDate(new Date())

const dateOptions = [
  { label: '全部', date: ['', ''], },
  { label: '一天', date: [getTargetDate(), nowDate], },
  { label: '三天', date: [getTargetDate(3), nowDate], },
  { label: '十五天', date: [getTargetDate(15), nowDate], },
  { label: '三十天', date: [getTargetDate(30), nowDate], },
]

export default {
  components: { Homelayout, Echarts, Memberlist },
  data() {
    return {
      EmptyIcon,
      SearchIcon,
      minDate: new Date(2010, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(),
      allInfo: [
        {
          key: 'members',
          text: this.$t('下级成员总计(人)'),
        },
        {
          key: 'new_members',
          text: this.$t('本月新增(人)'),
        },
        {
          key: 'active_members',
          text: this.$t('本月活跃成员(人)'),
        },
        {
          key: 'total_deposit_count',
          text: this.$t('本月新增有效(人)'),
        },
      ],
      active: 2,
      timeFlag: '',
      title: this.$t('今日活跃'),
      datashow: false,
      endDate: this.$t('结束'),
      startDate: this.$t('开始'),
      agentrelation: {},
      list: [],
      username: '',
      searchVisible: false,
      dateOptions,
      searchActive: null
    }
  },
  created() {
    const time = {
      start_date: getMonth('s', 0),
      end_date: getMonth('e', 0),
    }
    this.getmemberlist()
    this.getmemberdata(time)
    // console.log(getMonth('s', 0))
  },
  methods: {
    clear() {
      this.list = []
      this.username = ''
      this.endDate = this.$t('结束')
      this.startDate = this.$t('开始')
      this.searchVisible = false
    },
    setDate([startDate, endDate], index) {
      this.startDate = startDate;
      this.endDate = endDate;
      this.searchActive = index
    },
    getmemberlist() {
      memberlist({
        access_token: window.localStorage.agToken,
        username: '',
        statinfo_start: this.startDate === this.$t('开始') ? '' : this.startDate,
        statinfo_end: this.endDate === this.$t('结束') ? '' : this.endDate,
        size: 99999999,
      }).then((res) => {
        this.searchVisible = false
        if (res.data.data && res.data.data.length != 0) {
          this.list = res.data.data.data
          // this.list = this.list.concat(res.data.data.data);
        }
      })
    },
    async getmemberdata(fromdata) {
      const {
        data: { data },
      } = await memberOverview({
        start_date: fromdata.start_date,
        end_date: fromdata.end_date,
      })
      this.agentrelation = data
    },
    saveDate(item) {
      const time = formateDate(item)
      if (this.timeFlag === 'END') {
        this.endDate = time
      } else {
        this.startDate = time
      }
      this.datashow = false
      this.searchActive = null
    },
    select(i) {
      this.timeFlag = i
      this.datashow = true
    },
    // formatter(type, val) {
    //   if (type === 'month') {
    //     return `${val}月`
    //   } else if (type === 'day') {
    //     return `${val}日`
    //   }
    //   return val
    // },
    onClick(name, title) {
      this.title = title
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

// /deep/.van-picker {
//   background-color: #282828;
// }
/deep/ .van-cell-group .van-cell .van-cell__value input,
.van-cell-group .van-cell .van-cell__value textarea {
  color: #ebedf0;
  font-size: 0.37333rem;
}

/deep/ .van-cell-group .van-cell .van-cell__value {
  padding-right: 0;
}

/deep/ .van-picker {
  color: #999;
  // background-color: #999;
}

// /deep/.van-picker .van-picker-column__item {
//   color: #fff;
// }
.date {
  width: 100%;
  /* width: 91%; */
  left: 0;
  position: fixed;
  bottom: 29px;
}

.iconfont {
  color: #999;
  font-size: 0.4rem;
}

.custom-title {
  color: #999;
  font-size: 0.37333rem;
}

.search-btn {
  display: flex;
  align-items: center;
  color: #999;
  font-size: 28px;
  .van-icon {
    padding-right: 0.1rem;
    font-size: 32px;
    color: #999;
  }
}

.pop-search-wrap {
  h3 {
    color: #fff;
    font-size: 32px;
    font-weight: 400;
    padding-left: 20px;
    padding-top: 10px;
  }
  &-title {
    font-size: 32px;
    height: 100px;
    line-height: 100px;
    color: #ccc;
    text-align: center;
    display: flex;
    border-bottom: 2px solid #3d3d3d;
    .van-icon {
      font-size: 40px;
      padding-top: 30px;
      padding-left: 40px;
    }
    span:last-child {
      flex: 1;
      padding-right: 40px;
    }
  }
  /deep/.van-field {
    padding-top: 0;
    background: transparent;
    .van-field__control {
      line-height: 88px;
      height: 88px;
      border-radius: 8px;
      border: 2px solid #343434;
      padding: 0 30px;
      color: #ccc;
      font-size: 28px;
    }
  }
  &-dates {
    display: flex;
    flex-wrap: wrap;
    margin-left: 20px;

    span {
      width: calc(32% - 15px);
      height: 80px;
      line-height: 80px;
      margin: 0 30px 30px 0;
      font-size: 28px;
      color: #ccc;
      border: 2px solid #343434;
      text-align: center;
      border-radius: 8px;
      &:nth-child(3n) {
        margin-right: 0;
      }
      &.active {
        background-color: #c8a77f;
        color: #fff;
      }
    }
  }
  &-btn {
    margin: 30px auto 90px;
    width: 630px;
    height: 90px;
    .van-button__text {
      color: #191919;
      font-size: 32px;
    }
  }
}

.date-select {
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 88px;
  border-radius: 8px;
  border: 2px solid #343434;
  color: #999;
  margin: 30px 17px 32px;
  padding-right: 30px;
  .start-arrow,
  .end-arrow {
    transform: rotate(90deg);
    color: #c8a77f;
  }
  span {
    &:nth-child(2),
    &:nth-child(4) {
      font-size: 28px;
      color: #ccc;
    }
  }
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

/deep/ .van-tabs .van-tabs__nav {
  background-color: transparent !important;
}

/deep/ .van-tabs__line {
  height: 0.1rem;
  width: 1.5rem;
  background: #c8a77f;
}

#Member {
  color: #f5f5f5;
}

.card {
  display: flex;
  background: #282828;
  flex-wrap: wrap;
  align-items: center;
  padding: 0 0 54px;
  border-radius: 8px;

  li {
    width: 50%;
    padding-left: 50px;
    padding-top: 54px;

    .numCss {
      color: #c8a77f;
      font-size: 32px;
      margin-bottom: 10px;
    }

    .card_text {
      font-size: 24px;
      color: #999999;
    }
  }
}
</style>
