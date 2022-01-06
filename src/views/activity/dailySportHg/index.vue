<template>
  <div class="dailySport">
    <lheader
      v-if="!$route.query.source"
      :title="title"
      :goback="true"
    ></lheader>
    <div class="container" :class="{ 'no-header': $route.query.source }">
      <img src="./assets/banner.png" class="full-img" alt="" />
      <div class="main">
        <img src="./assets/image_title1@2x.png" class="full-img" alt="" />
        <!-- <h2>{{$t('活动内容')}}</h2>
        <h3>{{$t('活动详细内容说明')}}</h3> -->

        <img src="./assets/txt_title1@2x.png" class="tit-img" alt="" />

        <div class="block detail">
          <div class="">
            <h4>{{$t('今日指定赛事')}}</h4>
            <div class="vs-item" v-show="info.id">
              <div class="item">
                <img :src="info.home_image" alt="" />
                <p>{{ info.home_team }}</p>
              </div>
              <span>VS</span>
              <div class="item">
                <img :src="info.away_image" alt="" />
                <p>{{ info.away_team }}</p>
              </div>
            </div>
            <van-button @click="$router.push({ path: '/' })" v-if="info.id">
{{$t('进入投注')}}
            </van-button>
            <p v-else style="text-align: center; margin: 30px 0 40px">
              暂无赛事！
            </p>
          </div>
          <div class="">
            <img src="./assets/banner02.png" alt="" />
            <div class="">
              <h5>{{$t('活动详情')}}</h5>
              <p class="detail-p">
                投注今日指定热门比赛，场上出现点球得分即可额外获得奖励，多进多得。
              </p>
            </div>
          </div>
        </div>

        <div class="block">
          <table>
            <tr>
              <th width="70">{{$t('等级')}}</th>
              <th v-for="(item, index) in datas02" :key="index">{{ item }}</th>
            </tr>
            <tr v-for="(item, index) in datas" :key="index">
              <td>{{ index }}</td>
              <td>
                <span v-if="item.benefit1">{{ item.benefit1 }}</span
                ><span v-else>x</span>
              </td>
              <td>
                <span v-if="item.benefit2">{{ item.benefit1 }}</span
                ><span v-else>x</span>
              </td>
              <td>
                <span v-if="item.benefit3">{{ item.benefit1 }}</span
                ><span v-else>x</span>
              </td>
              <td>
                <span v-if="item.benefit4">{{ item.benefit1 }}</span
                ><span v-else>x</span>
              </td>
              <td>
                <span v-if="item.benefit5">{{ item.benefit1 }}</span
                ><span v-else>x</span>
              </td>
            </tr>
          </table>

          <p>{{$t('奖金按照开始前单场累计投最高注额来计算')}}</p>
          <p>
            如：VIP1会员开赛前投注3,000今日指定热门比赛，出现点球得分即送8元彩金，出现两次点球得分16元彩金，以此类推。
          </p>
          <p>
            VIP6会员开赛前投注5,000今日指定热门比赛，出现点球得分即送68元彩金，出现两次点球得分136元彩金以此类推。
          </p>
          <p>
            点球只统计常规时间和加时赛，淘汰赛中若有出现点球大战，点球大战不予计算。
          </p>
        </div>
        <img src="./assets/txt_title2@2x.png" class="tit-img" alt="" />
        <div class="block">
          <p>
            1.参加活动会员需在指定赛事开始前投注额达{{
              datas02.bet1
            }}元或以上即可获得参加优惠资格；
          </p>
          <p>2.彩金仅需一倍流水即可出款，比赛结束后48小时内派发彩金；</p>
          <p>3.VIP会员等级以赛事当日北京时间下午16:00后系统等级为准；</p>
          <p>
            4.同时下注BBIN体育、沙巴体育和IM体育，满足条件的情况下皆按照对应的等级及赛前两个场馆的个别投注额进行派奖；
          </p>
          <p>5.本活动不与其他存送优惠共享（返水及存款优惠除外）；</p>
          <p>
            6.以上投注额，仅对已结算并产生输赢结果的投注额进行计算，任何走盘、串关、特殊投注、取消的赛事将不计算在有效投注。投注额计算仅限独赢，让球，大小，单双四个盘口的全场与半场。任何低于欧洲盘1.5或香港盘0.5水位的投注以及在同一赛事中同时投注对冲盘口，将不计算在投注额内；
          </p>
          <p>
            7.此优惠只限于 【体育】 赛事,
            任何虚拟体育/金融投注/彩票的投注将不被计算在内；
          </p>
          <p>
            8.每位真实有效玩家/每一手机号码/电子邮箱/户籍地址/现居地址/同一银行卡/每一IP地址/每一台电脑或上网设备，若有违规者，将不享受此红利；
          </p>
          <p>
            9.任何用户或团体以不正常的方式进行的投注或套取活动优惠，平台方保留在不通知的情况下冻结或关闭相关账户的权利，并不退还款项，且用户会被列入黑名单；
          </p>
          <p>10.此为避免文字理解差异，本公司保留本活动最终解释权。</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Lheader from "@/components/l-header";
import { dailySport, moneyball } from "@/api/activity";

export default {
  name: "index",
  components: {
    Lheader,
  },
  data() {
    return {
      title: this.$t('活动'),
      datas: [],
      datas02: [],
      info: null,
    };
  },
  created() {
    this.getData();
    this.getTableData();
  },
  methods: {
    splitString(obj) {
      return obj.split("p")[1];
    },
    getData() {
      this.$loading({
        mask: false,
      });
      dailySport().then((res) => {
        const { code, data, msg } = res.data;
        console.log(data);
        if (code === 0) {
          this.info = data;
          this.$toast.clear();
        } else {
          console.log(msg);
        }
      });
    },
    getTableData() {
      this.$loading({
        mask: false,
      });
      moneyball({ id: this.$route.query.id, activity_type: 19 }).then((res) => {
        const { code, data, msg } = res.data;
        console.log(data);
        if (code === 0) {
          this.datas = data.condition_setting.benefit_config.benefits;
          this.datas02 = data.condition_setting.benefit_config.bet;
          this.$toast.clear();
        } else {
          console.log(msg);
        }
      });
    },
  },
};
</script>

<style scoped lang="less">
.container {
  padding-top: 88px;
  background: #262137;
  min-height: 100vh;
  padding-bottom: 86px;
  &.no-header {
    padding-top: 0;
    margin-top:0;
  }
  .full-img {
    display: block;
    width: 100%;
  }
  .main {
    padding: 0 28px;
    h2 {
      font-size: 24px;
      color: @primary-color;
      text-align: center;
      margin-top: 38px;
    }
    h3 {
      font-size: 16px;
      color: #fff;
      text-align: center;
      margin-bottom: 50px;
    }
    .block {
      background: url("./assets/bg-c.png") repeat-y;
      background-size: 100% auto;
      border-radius: 8px;
      padding: 46px 30px;
      position: relative;
      margin-bottom: 100px;
      &::before {
        content: "";
        position: absolute;
        width: 100%;
        background: url("./assets/bg-t.png") no-repeat;
        background-size: 100% auto;
        height: 40px;
        left: 0;
        top: -30px;
      }
      &::after {
        content: "";
        position: absolute;
        width: 100%;
        background: url("./assets/bg-b.png") no-repeat;
        background-size: 100% auto;
        height: 60px;
        left: 0;
        bottom: -54px;
      }
      p {
        font-size: 24px;
        color: #717273;
        line-height: 48px;
        margin-bottom: 24px;
      }
      h4 {
        text-align: center;
        font-size: 28px;
        color: #000;
        margin: 0;
      }
      h5 {
        font-size: 24px;
        color: #d2b796;
        text-align: center;
        margin: 0;
      }
      &.detail {
        margin-bottom: 80px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        > div:first-child {
          width: 332px;
          height: 344px;
          border-radius: 3px;
          border: 1px solid #cccccc;
          h4 {
            padding: 24px 0;
          }
          p {
            line-height: 36px;
          }
        }
        > div:last-child {
          width: 280px;
          img {
            display: block;
            width: 100%;
            margin-top: -14px;
          }
          > div {
            width: 288px;
            height: 228px;
            border-radius: 3px 3px 3px 0px;
            border: 1px solid #cccccc;
            margin-top: 12px;
            padding: 0 22px;
            p {
              line-height: 36px;
            }
            h5 {
              padding: 14px 0;
            }
          }
        }
        .van-button {
          width: 220px;
          height: 38px;
          background: linear-gradient(90deg, #ccad8c 0%, #f1d7b6 100%);
          border-radius: 19px;
          margin: 20px auto;
          display: block;
          color: #fff;
          font-size: 24px;
          border: 0;
        }
        .vs-item {
          display: flex;
          align-items: flex-start;
          justify-content: center;
          margin-top: 50px;
          .item {
            margin: 0 34px;
            text-align: center;
            flex: 1;
            img {
              width: 54px;
              height: 54px;
              border-radius: 50%;
              background-color: #ccc;
              border: none;
            }
            p {
              color: #666;
              margin-bottom: 0;
            }
          }
          span {
            color: #000;
            font-size: 30px;
            line-height: 54px;
          }
        }
      }
    }
    table {
      width: 100%;
      table-layout: fixed;
      border-collapse: collapse;
      border-radius: 8px;
      font-size: 24px;
      text-align: center;
      margin-bottom: 40px;
      border-radius: 8px 8px 0px 0px;
      overflow: hidden;
      th {
        background-color: #d3bda5;
        color: #fff;
        height: 48px;
        border: 2px solid #d3bda5;
      }
      td {
        border: 2px solid #d3bda5;
        color: #999;
        height: 46px;
      }
    }
  }
}
.tit-img {
  display: block;
  width: 100%;
  margin: 60px 0;
}
</style>
