<template>
  <div class="container agMemberList">
    <lheader :title="title" :goback="true" :get-switch="false"  :rightName="$t('筛选')" @rightClick="onFilter"></lheader>
    <div class="main">
      <div class="line-10037" v-if="$projectname === '10037'"></div>
      <div class="list">
        <van-list
          v-model="loading"
          :finished="finished"
          @load="onLoad"
          :offset='50'
        >
          <div class="item" v-for="(item, index) in list" :key="index">
            <div class="p p1">
              <span class="left">{{item.username}}</span>有效投注:
              <span class="right">{{ item.user_wallet_static.valid_bet }}</span>
            </div>
            <div class="p p2">
              <span class="left">等级：{{ item.levelName }} &#12288存款：{{ item.deposit_money }}</span>
              <span class="right">提款：{{ item.draw_money }}</span>
            </div>
          </div>
        </van-list>
        <div class="nomore" v-if="finished && list.length !== 0">{{$t('没有更多')}}</div>
        <div class="list_empty" v-show="!isLoading && list.length === 0">
          <div class="emptyDiv">
            <div class="errorImg"></div>
            <div class="text">
              <div class="chinese">{{$t('未找到相关数据')}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ReportFilter v-model="filterShow" @onConfirm="onConfirm" type="date"></ReportFilter>
  </div>
</template>

<script>
import Lheader from "@/components/l-header";
import Loading from "@/components/loading";
import { memberlevellist, memberlist } from "@/api/agent";
import ReportFilter from "@/components/report-filter.vue";
import moment from "moment";

export default {
  name: "memberList",
  components: {
    Loading,
    Lheader,
    ReportFilter,
  },
  data() {
    var self = this;
    return {
      title: this.$t('会员列表'),
      showStartDate: false,
      currentDate: new Date(),
      isLoading: false,
      loading: false,
      filterShow: false,

      showEndDate: false,
      list: [],
      finished: false,
      loadingflag: true,
      minDate: new Date(2017, 0, 1),
      maxDate: new Date(),
      discountData: {
        page: 1,
        access_token: window.localStorage.agToken,
        size: 200,
        start_date: self.gettime(),
        end_date: self.gettime(),
      },
      status: [],
      levellist: [],
    };
  },
  async created() {
    try {
      let scrollY = document.getElementsByClassName("container")[0].offsetTop;
      window.scrollTo(0, scrollY);
    } catch (error) {}
    this.isLoading = true;
  },
  methods: {
    onFilter() {
      this.filterShow = true;
    },
    async onConfirm(data) {
      this.discountData = {
        ...this.discountData,
        ...data,
      };
      this.list = [];
      await this.memberlevellist();
      this.memberlist();
    },
    async onLoad() {
      if (this.levellist && this.levellist.length) {
        this.memberlist();
        return;
      }
      this.memberlist();
    },
    memberlevellist() {
      memberlevellist({
        access_token: window.localStorage.agToken,
        merchant_no: process.env.VUE_APP_MERCHANT_NO,
      }).then((res) => {
        this.levellist = this.levellist.concat(res.data.data);
      });
    },
    memberlist() {
      memberlist({
        access_token: window.localStorage.agToken,
        ...this.discountData,
      }).then((res) => {
        if (res.data.data && res.data.data.length != 0) {
          this.isLoading = false;
          this.discountData.page++;
          this.loadingflag = false;
          this.loading = false;
          if (res.data.data.data.length < this.discountData.size) {
            this.finished = true;
          }
          res.data.data.data.map((item) => {
            item.levelName = "";
            this.levellist.forEach((sub) => {
              if (item.level == sub.level) {
                item.levelName = sub.name;
              }
            });
            return item;
          });
          this.list = this.list.concat(res.data.data.data);
          console.log(this.list);
        }
      });
    },
    gettime() {
      return moment().format("YYYY-MM-DD");
    },
  },
};
</script>

<style scoped lang="less">
@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
  .line-10037{
    height: 20px;
    width: 100%;
    background: #F5F6FA;
  }
.container {
  min-height: 100vh;
  flex-direction: column;
  background-color: @bg-color;
  .main {
    padding-top: @main-top;
  }
  .paddingdiv {
    width: 100%;
    height: 1.17333rem;
  }
  .list {
    width: 710px;
    margin: 30px auto 0;
    /*background: white;*/
    position: relative;
    .item {
      padding: 40px 0;
      box-sizing: border-box;
      .p {
        display: flex;
      }
      .p1 {
        height: 44px;
        font-size: 32px;
        font-weight: 400;
        color: rgba(204, 204, 204, 1);
        line-height: 44px;
        .right {
          height: 44px;
          font-size: 32px;
          font-weight: 600;
          color: @primary-color;
          line-height: 44px;
        }
      }
      .p2 {
        margin-top: 20px;
        height: 34px;
        font-size: 24px;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 34px;
      }
      .p3 {
        margin-top: 10px;
        height: 34px;
        font-size: 24px;
        font-weight: 400;
        color: rgba(82, 81, 82, 1);
        line-height: 34px;
      }
      .left {
        flex: 1;
      }
    }
    .loading_ing {
      width: 100%;
      text-align: center;
      line-height: 80px;
      position: absolute;
      bottom: -31px;
      background: white;
      color: #bd8c24;
      img {
        width: 50px;
        position: relative;
        top: 15px;
      }
      .loading-1 {
        width: 30px;
        height: 30px;
        position: relative;
        left: 40px;
        top: 5px;
      }
      .loading-2 {
        animation: rotation 1s linear infinite;
      }
    }
    .chanebac {
      background: none;
      color: #fff;
    }
    .nomore {
      width: 100%;
      text-align: center;
      line-height: 80px;
    }
  }
}
</style>
