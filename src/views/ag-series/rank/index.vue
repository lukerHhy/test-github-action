<template>
  <div class="profits-rank">
    <vtabbar v-if="!$route.query.source" class="m-footer" id="footer-yabo" :index="3"></vtabbar>
    <van-sticky>
      <p class="rank-tab-main">
        <span :class="active===0?'active':''" @click="getData(1)">{{$t('今日排行')}}</span>
        <span :class="active===1?'active':''" @click="getData(7)">{{$t('本周排行')}}</span>
      </p>
      <p class="rank-tab-sub">
        <span @click="qukuan" :class="subActive===0?'active':''">{{$t('取款排行榜')}}</span>
        <span @click="yingli" :class="subActive===1?'active':''">{{$t('盈利排行榜')}}</span>
        <span @click="mzRate" :class="subActive===2?'active':''">{{$t('命中率排行榜')}}</span>
      </p>
    </van-sticky>
    <div class="rank-top3">
      <div class="rank-top3-item" v-for="(item,index) in list" v-if="index<3" :style="{backgroundImage:$bImgs['rank/ranking'+(index+1)+'@2x']}">
        <div>
          <p>{{ item.username }}</p>
          <p class="tit">最近上线{{ item.last_date }}</p>
        </div>
        <div>
          <p class="tit-orange">{{$t('今日取款金额')}}</p>
          <p class="num">￥{{ item.money | currency('') }}</p>
        </div>
        <div>
          <p class="tit">{{$t('今日有效投注额')}}</p>
          <p class="num">￥{{ item.bet | currency('') }}</p>
        </div>
        <div>
          <p class="tit">{{$t('今日投资收益率')}}</p>
          <p class="num">{{ item.win_rate }}%</p>
        </div>
      </div>
    </div>
    <div class="rank-other">
      <div class="item" v-for="(item,index) in list" v-if="index>2" :style="{backgroundImage:$bImgs['rank/bg']}">
        <p class="rank-num">No.{{ index+1 }}</p>
        <div class="left">
          <p>{{ item.username }}</p>
        </div>
        <div class="right">
          <div class="t">
            <p>最近上线时间 {{ item.last_date }}</p>
            <p>{{$t('今日取款金额')}}<span>¥ {{ item.money | currency('') }}</span></p>
          </div>
          <div class="b">
            <div>
              <p>{{$t('今日有效投注额')}}</p>
              <p>¥ {{ item.bet | currency('') }}</p>
            </div>
            <div>
              <p>{{$t('今日投资收益率')}}</p>
              <p>{{ item.win_rate }}%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { withdrawtop10, wintop10, hittop10 } from '@/api/memberCenter'
import { mapState, mapActions } from 'vuex'
import Vtabbar from '../components/v-tabbar'
export default {
  name: "WithdrawRank",
  data() {
    return {
      active: 0,
      day:1,
      subActive:0,
      list:[],
      loading:null,
    }
  },
  components: {
    Vtabbar
  },
  created() {
    this.qukuan();
  },
  methods: {
    // 取款
    async qukuan () {
      this.$loading();
      this.subActive = 0
      let res = await withdrawtop10 ({ day:this.day });
      console.log(res)
      this.list = res.data.data
    },
    // 盈利排行榜
    async yingli () {
      this.$loading();
      this.subActive = 1
      let res = await wintop10 ({day:this.day});
      this.list = res.data.data
    },
    // 命中率排行榜
    async mzRate () {
      this.$loading();
      this.subActive = 2
      let res = await hittop10 ({day:this.day});
      this.list = res.data.data
    },
    getData(i){
      this.$loading();
      this.day = i;
      if(i===1){
        this.active = 0;
      }else{
        this.active = 1;
      }
      if(this.subActive===0){
        this.qukuan ();
      }else if(this.subActive===1){
        this.yingli ();
      }else{
        this.mzRate();
      }
    },
  }
}
</script>

<style scoped lang="less">
@import '~@assets/styles/withdrawRank/index.less';
.profits-rank{
  background-color: @bg-color-black;
  padding-bottom: 1.3rem;
  /deep/ .van-sticky--fixed{
    background-color: @bg-color-black;
  }
  .rank-tab-main{
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px 0;
    span{
      width: 166px;
      height: 64px;
      border-radius: 8px;
      opacity: 0.5;
      border: 2px solid #FFFFFF;
      font-size: 28px;
      color: rgb(255,255,255);
      text-align: center;
      line-height: 64px;
      margin: 0 30px;
      &.active{
        opacity: 1;
      }
    }
  }
  .rank-tab-sub{
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 30px 0;
    span{
      font-size: 24px;
      color: rgba(255,255,255,.5);
      padding: 0 24px;
      border-right: 2px solid rgba(255,255,255,.5);
      &:last-child{
        border-right: 0;
      }
      &.active{
        color: #fff;
      }
    }
  }
  .rank-top3{
    overflow-x: auto;
    width: 100%;
    padding: 0 20px;
    flex-wrap: nowrap;
    font-size: 0;
    white-space: nowrap;
    .rank-top3-item{
      width: 278px;
      height: 595px;
      padding-top: 174px;
      background-size: 100% auto;
      margin-right: 20px;
      background-repeat: no-repeat;
      display: inline-block;
      vertical-align: top;
      &:last-child{
        margin-right: 0;
      }
      >div{
        text-align: center;
        border-bottom: 2px solid rgba(255,255,255,.1);
        font-size: 24px;
        white-space: normal;
        line-height: 1.6;
        padding: 10px 0;
        &:first-child p:first-child{
          color: #fff;
        }
        &:last-child{
          border-bottom: 0;
        }
        .tit{
          color: #8E8E93;
        }
        .num{
          color: #D8D8D8;
        }
        .tit-orange{
          color: #D1A173;
        }
      }
    }
  }
  .rank-other{
    padding: 0 18px;
    margin-top: 60px;
    .item{
      background-color: #30252D;
      height: 268px;
      border-radius: 16px;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      position: relative;
      background-size: 100% auto;
      background-repeat: no-repeat;
      .left{
        width: 205px;
        color: #fff;
        font-size: 24px;
        text-align: center;
      }
      .right{
        flex: 1;
        padding: 0 14px;
        height: 268px;
        > div{
          height: 50%;
          line-height: 1.5;
          &:first-child{
            border-bottom: 2px solid rgba(255,255,255,.1);
          }
          &.t{
            p:first-child{
              text-align: right;
              font-size: 24px;
              color: #635360;
              padding: 20px 0;
            }
            p:last-child{
              text-align: center;
              font-size: 28px;
              color: #D1A173;
              span{
                color: #fff;
                padding-left: 20px;
              }
            }
          }
          &.b{
            font-size: 0;
            >div{
              display: inline-block;
              height: 100%;
              width: 50%;
              vertical-align: top;
              font-size: 28px;
              color: #D8D8D8;
              text-align: center;
              padding-top: 22px;
              &:first-child{
                border-right: 2px solid rgba(255,255,255,.1);
              }
              p:first-child{
                color: #8E8E93;
              }
            }
          }
        }
      }
      .rank-num{
        position: absolute;
        font-size: 24px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #D1A173;
        line-height: 34px;
        text-shadow: 0px 4px 8px rgba(0, 0, 0, 0.5);
        top: 26px;
        left: 20px;
      }
    }
  }
}
</style>
