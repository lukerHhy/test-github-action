<template>
  <div id="sb">
    <div id="agentmanagement">
      <van-nav-bar
        left-arrow
        fixed
        @click-left="$router.go(-1)"
        @click-right=""
      >
        <template #title>
          <span style="color:#FFFFFF">{{$t('代理管理')}}</span>
        </template>
      </van-nav-bar>
      <Cell
        :title="$t('代理账号')"
        :icon="'icon-per'"
      >
        <van-field
          style="width: 3rem;"
          type="text"
          :placeholder="$t('请输入代理账号')"
          v-model="fromData.username"
        />
      </Cell>
      <!-- <Cell
        @click="selectshow = true"
          :title="$t('存款最小金额')"
        :icon="'icon-user1'"
      >
        <van-field
          style="width: 3rem;"
          type="number"
           :placeholder="$t('请输入存款最小金额')"
          v-model="fromData.minsave"
        />
      </Cell> -->
      <Cell
        :title="$t('存款金额')"
        :icon="'icon-aamoney'"
      >
        <van-field
          style="width: 2.1rem;"
          type="number"
          :placeholder="$t('最小金额')"
          v-model="fromData.deposit_money_min"
        />
        <span
          class="other"
          style="margin-top: -0.2rem;"
        >
          &nbsp;-&nbsp;
        </span>
        <van-field
          style="width: 2rem;"
          type="number"
          :placeholder="$t('最大金额')"
          v-model="fromData.deposit_money_max"
        />
      </Cell>
      <Cell
        :title="$t('注册人数')"
        :icon="'icon-reg'"
      >
        <van-field
          style="width: 3rem;"
          type="number"
          :placeholder="$t('最小人数')"
          v-model="fromData.member_counts"
        />
      </Cell>
      <Cell
        :title="$t('存款人数')"
        :icon="'icon-denum'"
      >
        <van-field
          style="width: 3rem;"
          type="number"
          :placeholder="$t('最小人数')"
          v-model="fromData.deposit_money_member_counts"
        />
      </Cell>
      <Cell
        :title="$t('活跃人数')"
        :icon="'icon-activeper'"
      >
        <van-field
          style="width: 3rem;"
          type="number"
          :placeholder="$t('最小人数')"
          v-model="fromData.activity_number"
        />
      </Cell>
      <!-- <Cell
        @click="selecttypeshow = true"
          :title="$t('选择类型')"
        :icon="'icon-user1'"
      >
        <span>{{$t('请选择')}}</span>
        <span class="iconfont icon-dayuhao" style="margin-right: 0"></span>
      </Cell> -->
      <Cell
        :title="$t('注册时间')"
        :icon="'icon-date'"
      >
        <span
          class="start"
          :class="[fromData.register_time_start ? 'colorful' : '']"
          @click="seledateEvent('STA')"
        >{{
            fromData.register_time_start
              ? fromData.register_time_start
              : $t('开始时间')
          }}</span>
        <span class="other">
          &nbsp;-&nbsp;
        </span>
        <span
          class="start"
          :class="[fromData.register_time_end ? 'colorful' : '']"
          @click="seledateEvent('END')"
        >{{
            fromData.register_time_end ? fromData.register_time_end : $t('结束时间')
          }}</span>
      </Cell>
      <Cell
        :title="$t('统计时间')"
        :icon="'icon-date'"
      >
        <span
          class="start"
          :class="[fromData.statistical_time_start ? 'colorful' : '']"
          @click="seledateEvent('rSTA')"
        >{{
            fromData.statistical_time_start
              ? fromData.statistical_time_start
              : $t('开始时间')
          }}</span>
        <span class="other">
          &nbsp;-&nbsp;
        </span>
        <span
          class="start"
          :class="[fromData.statistical_time_end ? 'colorful' : '']"
          @click="seledateEvent('rEND')"
        >{{
            fromData.statistical_time_end
              ? fromData.statistical_time_end
              : $t('结束时间')
          }}</span>
      </Cell>
      <van-button
        @click="sendhttp"
        :class="['pushbtn', 'avtiveBtn']"
        color="#4D4C4D"
        style="width: 90%;margin: 0.8rem auto;;display: block;"
      >{{$t('查询')}}</van-button>
      <div class="tableList-box">
        <ul class="tableList">
          <li
            class="wrap"
            style="color: #C8A77F;font-size:.4rem;margin-left: 0.2rem;"
          >
            <div>{{$t('代理账号')}}</div>
            <div>{{$t('注册时间')}}</div>
            <div>{{$t('总注册人数')}}</div>
            <div>{{$t('总存款人数')}}</div>
            <div>{{$t('总存款')}}</div>
            <div>{{$t('总取款')}}</div>
            <div>{{$t('总投注')}}</div>
            <div>{{$t('总盈亏')}}</div>
            <div>{{$t('佣金比例')}}</div>
            <div>{{$t('操作')}}</div>
          </li>
          <li
            class="wrapTwo"
            v-if="dataList.length !== 0"
            v-for="(item, i) in dataList"
            :key="i"
            style="color: #999;font-size:.4rem;"
          >
            <div style="margin-left: 0.2rem;">
              {{ item.username }}
            </div>
            <div>{{ item.created_at || 0 }}</div>
            <div>{{ item.member_counts || 0 }}</div>
            <div>{{ item.deposit_money_member_counts || 0 }}</div>
            <div>{{ item.deposit_money || 0 }}</div>
            <div>{{ item.draw_money || 0 }}</div>
            <div>{{ item.total_bet || 0 }}</div>
            <div>{{ item.win || 0 }}</div>
            <div>{{ item.rate || 0 }}</div>

            <div
              class="tioazheng"
              @click="setAdjustshow(item)"
            >{{$t('佣金调整')}}</div>
          </li>
          <li
            v-if="dataList.length === 0"
            class="nodata"
          >
          <van-empty
            :image="EmptyIcon"
            :description="$t('暂无数据')"
          />
      </li>
        </ul>
      </div>
      <van-popup
        v-model="selecttypeshow"
        closeable
        close-icon-position="top-left"
        position="bottom"
        :style="{ height: '40%' }"
      >
        <van-picker
          :title="$t('选择类型')"
          show-toolbar
          :cancel-button-text="' '"
          :columns="selecttype"
          @confirm="selecttypeEvent"
        />
      </van-popup>
      <van-popup
        v-model="statisticalshow"
        closeable
        close-icon-position="top-left"
        position="bottom"
        :style="{ height: '40%' }"
      >
        <van-picker
          :title="$t('选择时间')"
          show-toolbar
          :cancel-button-text="' '"
          :columns="statistical"
          @confirm="statisticalEvent"
        />
      </van-popup>

      <van-popup
        v-model="selectDateshow"
        position="bottom"
        :style="{ height: '40%' }"
      >
        <van-datetime-picker
          v-model="currentDate"
          type="date"
          :title="$t('选择时间')"
          :min-date="minDate"
          :max-date="maxDate"
          @confirm="saveDate"
          @cancel="selectDateshow = false"
        />
      </van-popup>
      <van-dialog
        class="adjust"
        v-model="Adjustshow"
        :title="$t('佣金调整')"
        style="background:#282828"
        show-cancel-button
        @confirm="pushdata"
      >
        <div class="adjustinfo">
          {{$t('当前佣金比例')}}：<span>{{ currtenamout }}%</span> {{$t('可分配佣金比例')}}：<span>{{ canamout - currtenamout }}%</span>
        </div>
        <div style="margin: .4rem 0;">
          {{$t('新佣金比例')}}：<input
            class="ipt-a"
            v-model="rate"
            type="text"
            :placeholder="$t('请输入新佣金比例')"
          />
        </div>
      </van-dialog>
    </div>
    <!-- <div class="tableList-box" style="    padding-bottom: 1.6rem;">
      <ul class="tableList">
        <li
          class="wrapTwo"
          v-if="dataList.length !== 0"
          v-for="(item, i) in dataList"
          :key="i"
          style="color: #999;font-size:.4rem"
        >
          <div style="margin-left: 0.2rem;">
            {{ item.username }}
          </div>
          <div>{{ item.created_at }}</div>
          <div>{{ item.member_counts }}</div>
          <div>{{ item.deposit_money_member_counts }}</div>
          <div>{{ item.deposit_money }}</div>
          <div>{{ item.draw_money }}</div>
          <div>{{ item.total_bet }}</div>
          <div>{{ item.win }}</div>
          <div>{{ item.rate }}</div>

          <div>{{$t('佣金调整')}}</div>
        </li>
        <li v-if="dataList.length === 0" class="nodata">{{$t('暂无数据')}}</li>
      </ul>
    </div> -->
  </div>
</template>
<script>
import Cell from './components/cell'
import { formateDate } from '../../utils'
import { agentlist_v2, userinfo, update_commission } from '@/api/agent'
import EmptyIcon from './images/empty@2x.png';
export default {
  name: 'agentmanagement',
  components: { Cell },
  data() {
    return {
      EmptyIcon,
      minDate: new Date(2010, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(),
      fromData: {
        username: '',
        activity_number: '',
        member_counts: '',
        statistical_time_start: '',
        statistical_time_end: '',
        deposit_money_min: '',
        register_time_start: '',
        register_time_end: '',
      },
      selecttype: [this.$t('注册人数'), this.$t('存款人数'), this.$t('活跃人数')],
      statistical: [this.$t('统计时间'), this.$t('首存时间'), this.$t('注册时间')],
      selecttypeshow: false,
      statisticalshow: false,
      selectDateshow: false,
      dataFlag: 'STA',
      dataList: [],
      Adjustshow: false,
      currtenamout: '',
      canamout: '',
      agent_id: '',
      rate: '',
    }
  },
  watch: {
    fromData: {
      handler(newVal) {
        console.log(newVal, 'newValnewVal')
      },
      deep: true,
    },
  },
  created() {
    this.sendhttp()
  },
  methods: {
    async pushdata() {
      const res = await update_commission({
        agent_id: this.agent_id,
        rate: this.rate,
      })
      this.rate = ''
      this.sendhttp()

      // console.log(res)
    },
    setAdjustshow(item) {
      console.log(item)
      userinfo({
        access_token: window.localStorage.agToken,
      }).then(({ data: { data } }) => {
        this.canamout = data.config.commission.rate
        this.currtenamout = item.rate
        this.agent_id = item.id
        this.Adjustshow = true
      })
    },
    async sendhttp() {
      const {
        data: { data },
      } = await agentlist_v2(this.fromData)
      this.dataList = data
      console.log(this.fromData)
    },
    seledateEvent(type) {
      this.dataFlag = type
      this.selectDateshow = true
    },
    statisticalEvent() { },
    selecttypeEvent() { },
    saveDate(time) {
      time = formateDate(time)
      switch (this.dataFlag) {
        case 'STA':
          this.fromData.register_time_start = time
          break
        case 'END':
          this.fromData.register_time_end = time
          break
        case 'rSTA':
          this.fromData.statistical_time_start = time
          break
        case 'rEND':
          this.fromData.statistical_time_end = time
          break
      }
      this.selectDateshow = false
    },
  },
}
</script>
<style lang="less" scoped>
/deep/ .van-picker .van-picker__toolbar {
  /* background-color: #D6BDA3; */
  // color: #FFFFFF;
  border-bottom: 2px solid #313133;
}
.ipt-a {
  border: 1px solid #ad9982 !important;
  border-radius: 8px;
  width: 50%;
  height: 1rem !important;
}
#sb {
  width: 100%;
  height: 100%;
  background: #151515;
}
.adjustinfo {
  display: flex;
  justify-content: space-between;
  margin: 0.5rem 0;
  font-size: 0.4rem;
}
/deep/ .adjust .van-dialog__header {
  color: #eee;
}
.start {
  color: #525152;
  // font-size: 0.4rem;
}
.van-field__control,.start{
  font-size: 28px;
}
.colorful {
  color: #999 !important;
}
.other {
  color: #999;
}
.adjust {
  padding: 0.4rem;
  input {
    flex: 1;
    background: none;
    padding-left: 30px;
    border: none;
    color: #cccccc;
    height: 40px;
    font-size: 28px;
    font-weight: 400;
    line-height: 40px;
  }
  input::placeholder {
    color: @text-color-placeholder;
  }
  /deep/.van-dialog__confirm {
    /deep/.van-button__text {
      color: #fff;
    }
  }
  /deep/.van-dialog__cancel {
    /deep/.van-button__text {
      color: #fff;
    }
  }
}
/deep/ .van-field__control {
  color: #999;
  text-align: right;
}
/deep/ .van-field__control::placeholder {
  color: #525152;
}
.pushbtn /deep/.van-button__text {
  color: #666666 !important;
}
.nodate {
  width: 1.6rem;
  margin-left: 4rem;
}
.tableList-box {
  width: 100%;
  overflow-x: scroll;
}
.tableList {
  width: 100%;
  color: #eeeeee;
  font-size: 0.35rem;
  width: 20rem;
  .nodata {
    width: 100vw;
    color: #999;
  }
  .wrap {
    display: flex;
    height: 0.7rem;
    width: 23rem;
    //line-height: 1rem;
    div {
      width: 400px;
      padding: 0.138rem;
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .van-button__content {
      width: 100%;
    }
  }
  .tioazheng {
    border: 1px solid rgb(200, 167, 127);
    border-radius: 8px;
    color: rgb(200, 167, 127);
  }
  .wrapTwo {
    /*display: flex;*/
    /*justify-content: space-between;*/
    /*align-items: center;*/
    /*width: 50%;*/
    /*height: 1rem;*/
    /*background: #282828;*/
    /*padding: 0.2rem 0;*/
    /*border-bottom: 1px solid #343434;*/

    display: flex;
    background: #282828;
    height: 1rem;
    width: 23rem;
    align-items: center;
    border-bottom: 1px solid #343434;

    div {
      width: 400px;

      padding: 0.138rem;
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
/deep/ .van-button.avtiveBtn {
  background: #c8a77f !important;
  span {
    color: #fff !important;
  }
}
/deep/ .van-cell {
  background: @bg-color;
  font-size: 0.4rem;
  color: #999999;
  height: 1.4rem;
  line-height: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}
/deep/ .van-icon-arrow-left {
  color: #ffffff;
  font-size: 0.5rem;
}
/deep/ .van-nav-bar {
  background: @bg-color;
}
#agentmanagement {
  width: 100%;
  // height: 100%;
  background: @bg-color;
  padding: 1rem 0.4rem 0.2rem;
}
</style>
