<template>
  <div class="esport-goods-record">
    <div class="shop-title">
      <van-icon name="arrow-left" @click="$router.go(-1)" />
      <span>{{$t('商品账变记录')}}</span>
    </div>
    <div class="m-body">
      <div class="top">
        <div class="one">
          <input type="text" v-model="queryData.type"  :placeholder="$t('账变类型')" @click="typeShow = true"/>
          <img class="xiala" :src="$imgs['otherIcon/xiala@2x']" alt />
        </div>
        <div class="two">
          <input type="text" v-model="queryData.start_time"  :placeholder="$t('开始时间')" @click="showStartDate = true"/>
          <span class="con">{{'-'}}</span>
          <input type="text" v-model="queryData.end_time"  :placeholder="$t('结束时间')" class="end" @click="showEndDate = true;"/>
          <img class="xiala" :src="$imgs['otherIcon/xiala@2x']" alt />
        </div>
      </div>
      <div class="second">
        <div class="select-button" @click="determine()">{{$t('查询')}}</div>
      </div>
      <div class="record-table">
        <div class="title">
          <span>{{$t('帐变时间')}}</span>
          <span>{{$t('帐变类型')}}</span>
          <span>{{$t('数量')}}</span>
          <span>{{$t('帐变前')}}</span>
          <span>{{$t('帐变后')}}</span>
          <span>{{$t('帐变明细')}}</span>
        </div>
        <van-list
          v-model="oloading"
          :finished="ofinished"
           :finished-text="$t('已加载全部')"
          @load="onOLoad"
          v-if="list.length > 0"
        >
          <div class="title wrap" v-for="(item, index) in list" :key="index">
            <span>{{item.updated_at}}</span>
            <span><p>{{typeList[item.type].slice(0, 4)}}</p></span>
            <span>{{item.coin}}</span>
            <span>{{item.before_coin}}</span>
            <span>{{item.after_coin}}</span>
            <span>{{item.mark}}</span>
          </div>
        </van-list>
        <van-empty  :description="$t('暂无数据')" v-else/>
      </div>
    </div>
    <!-- 开始时间 -->
    <van-popup v-model="showStartDate" position="bottom">
      <van-datetime-picker v-model="start_time" @confirm="onConfirmStartDate" @cancel="onCancelStartDate" type="date" />
    </van-popup>

    <!-- 结束时间 -->
    <van-popup v-model="showEndDate" position="bottom">
      <van-datetime-picker v-model="end_time" @confirm="onConfirmEndDate" @cancel="onCancelEndDate" type="date" />
    </van-popup>

    <van-popup
      v-model="typeShow"
      @click.stop
      class="custom esport-type"
      closeable
      round
      close-icon-position="top-left"
      position="bottom"
      get-container="#app">
      <div class="pop-head">
        <h2>{{$t('账变类型')}}</h2>
      </div>
      <div class="pop-body list-cells">
        <div class="cell" v-for="(item, index) in typeList" :key="index" @click="onSelect(item, index)">
          <div class="cell-body">{{ item }}</div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import popup from "@/components/popup";
import { formateDate } from "@/utils/index";
import { coinaccounttype, getShopTypeList } from '@/api/shopMall'
export default {
  data() {
    return {
      list: [],
      typeList: [],
      showStartDate: false,
      showEndDate: false,
      queryData: {
        start_time: '',
        end_time: '',
        type: ''
      },
      start_time: new Date(),
      end_time: new Date(),
      typeShow: false,
      selectIndex: '',
      oloading: false,
      ofinished: false,
      page: 1,
      total: 0
    }
  },
  created () {
    this.getType()
    this.determine()
  },
  methods: {
    getType () {
      coinaccounttype().then(res => {
        this.typeList = res.data.data
      })
    },
    onSelect(item, index) {
      this.queryData.type = item
      this.selectIndex = index
      this.typeShow = false
    },
    determine(isLoad) {
      let data = {
        start_date: this.queryData.start_time,
        end_date: this.queryData.end_time,
        type: this.selectIndex,
        page: this.selectIndex == '' ? this.page : 1
      }
      getShopTypeList(data).then(res => {
        this.oloading = false;
        if (isLoad) {
          this.list = this.list.concat(res.data.data.data);
        } else {
          this.list = res.data.data.data;
          this.total = res.data.data.total
          this.total > 10 && this.queryList(this.total)
        }
        if (this.page >= res.data.data.last_page) {
          this.ofinished = true;
        }
      })
    },
    onOLoad() {
      this.page++;
      this.determine(true);
    },
    queryList(total) {
      const len = Math.ceil(total/10)
      for (let i = 1; i < len; i++) {
        let data = {
          start_date: this.queryData.start_time,
          end_date: this.queryData.end_time,
          type: this.selectIndex,
          page: ++i
        }
        getShopTypeList(data).then(res => {
          this.list = this.list.concat(res.data.data.data);
        })
      }
    },
    onCancelStartDate(value) {
      this.showStartDate = false;
    },
    formateDate(val) {
      var today = new Date();
      var start = new Date(today.getTime() - 1 * 24 * 3600 * 1000);
      if (val == "start") {
        return formateDate(start);
      } else {
        return formateDate(today);
      }
    },
    onConfirmStartDate(value) {
      this.start_time = value
      this.queryData.start_time = formateDate(value)
      this.showStartDate = false;
    },
    onConfirmEndDate(value) {
      this.end_time = value
      this.queryData.end_time = formateDate(value)
      this.showEndDate = false;
    },
    onCancelEndDate(value) {
      this.showEndDate = false;
    },
  }
}
</script>
<style lang="less" scoped>
.esport-goods-record {
  padding-bottom: 80px;
  .shop-title {
    position: fixed;
    top: 0;
    height: 88px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32px;
    width: 100%;
    z-index: 1;
    background-color: @bg-color;
    .query {
      margin-right: 40px;
    }

    .van-icon {
      width: 30px;
      position: absolute;
      left: 0;
    }
  }
  .m-body {
    padding-bottom: 0;
    .top {
      display: flex;
      .one {
        position: relative;
        input {
          height:74px;
          border-radius: 4px;
          border:2px solid rgba(229,229,229,1);
          text-indent: 20px;
          margin: 40px 0 0 30px;
          width: 240px;
          color: #000;
          &::placeholder {
            font-size: 20px;
          }
        }
        img {
          width: 28px;
          position: absolute;
          right: 20px;
          top: 60px;
        }
      }
      .two {
        position: relative;
        input {
          height:74px;
          border-radius: 4px;
          border:2px solid rgba(229,229,229,1);
          text-indent: 20px;
          margin: 40px 0 0 0px;
          width: 210px;
          color: #000;
          &::placeholder {
            font-size: 20px;
          }
          &:first-child {
            margin-left: 30px;
            border-right: none;
          }
        }
        .end {
          border-left: none;
        }
        img {
          width: 28px;
          position: absolute;
          right: 20px;
          top: 60px;
        }
        .con {
          position: absolute;
          top: 50px;
          left: 208px;
          font-size: 40px;
          color: #000;
        }
      }
    }
    .second {
      height: 150px;
      width: 100%;
      background: #fff;
      margin-top: 20px;
      padding-top: 50px;
      .select-button {
        background:rgba(15,197,158,1);
        border-radius:8px;
        font-size: 28px;
        color: #fff;
        height: 64px;
        width: 240px;
        margin: 0 auto;
        text-align: center;
        line-height: 64px;
      }
    }
    .record-table {
      position: relative;
      min-height: 300px;
      .title {
        height: 72px;
        line-height: 72px;
        background: #F5F5F5;
        display: flex;
        overflow: hidden;
        span {
          display: inline-block;
          color:#666666;
          font-size: 20px;
          width: 15%;
          text-align: center;
          margin: auto 0;
          &:first-child{
            width: 22%;
            overflow: hidden;
          }
          &:nth-child(2){
            width: 13%;
          }
          &:nth-child(5), &:nth-child(3){
            text-align: center;
            margin: auto 4px;
          }
        }
      }
      .wrap {
        height: 126px;
        line-height: 1.7;
        background: #fff;
        border-bottom:2px solid rgba(229,229,229,1);
        span {
          &:first-child{
            line-height: 1.5;
          }
          &:nth-child(2){
            padding: 10px 0 0 20px;
          }
          p{

            width: 60px;
            height: 60px;
            line-height: 1.2;
            font-size: 20px;
            text-align: center;
            color: #3CA6FC;
            background: #E8F5FF;
          }
        }

      }
      .van-empty {
        background: #fff;
        min-height: 60vh;
      }
      /deep/.van-list__finished-text {
        background: #fff;
        color: #969799;
      }
    }
  }
}

.van-popup {
  .pop-head {
    color: #333;
    font-size: 0.48rem;
    position: relative;
    background-color: #0FC59E;
    h2 {
      color: #fff;
    }
  }
  .pop-body {
    .cell {
      .cell-body {
        text-align: center;
      }
    }
  }
  /deep/.van-icon-cross {
    color: #fff;
  }
}
</style>
