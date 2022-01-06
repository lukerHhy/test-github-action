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
        <img src="./assets/txt_title1@2x.png" class="tit-img" alt="" />
        <div class="block detail">
          <img src="./assets/banner02.png" alt="" />
          <div>
            <h5>{{$t('活动详情')}}</h5>
            <p class="detail-p">{{$t('根据')}}</p>
          </div>
        </div>
        <div class="block">
          <table>
            <tr>
              <th>8场比赛总有效流水</th>
              <th>{{$t('赠送彩金')}}</th>
            </tr>
            <tr v-for="(item, index) in datas" :key="index">
              <td>
                <span v-if="item.bet">{{ item.bet }}</span
                ><span v-else>x</span>
              </td>
              <td>
                <span v-if="item.benefit">{{ item.benefit }}</span
                ><span v-else>x</span>
              </td>
            </tr>
          </table>
        </div>
        <img src="./assets/txt_title2@2x.png" class="tit-img" alt="" />
        <div class="block">
          <p>
            1.申请方式：
            会员可完成过关后找客服申请（申请时需要提供比赛注单号），客服会提交至优惠中心审核，通过后奖金将在将于48小时内派发到会员主账户。如会员在过关完成后24小时内未联系客服进行申请，视为主动放弃该活动奖金，活动奖金仅需一倍流水即可出款。
          </p>
          <p>
            2.凡是投注的体育注单出现提前结算（兑现）的情况，连赢将被终止并重新计算；
          </p>
          <p>
            3.有效投注额仅对已结算并产生输赢结果的投注额进行计算，任何平局、取消的赛事将不计算在有效投注。（例如：下注100元，香港盘赔率0.6，如赢派彩60元，有效投注为60元；如输本金100元，有效投注为100元。）
          </p>
          <p>
            4.任何低于欧洲盘1.5或香港盘0.5水位的投注将不计算在内，同个盘口多个注单不予计算，同场比赛多个盘口给予计算。
            （通过客服查询审核为准）
          </p>
          <p>
            5.如果在连赢期间存在下注虚拟体育/金融投注/彩票/串关，或者赛事被取消，结局平局的注单，对连赢结果不产生影响，连赢场次依次顺延。
          </p>
          <p>
            6.此优惠只限于【体育】赛事，任何真人投注/彩票投注等将不被计算在内。
          </p>
          <p>7.此活动遵循一般规则与条款。</p>
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
    };
  },
  created() {
    this.getTableData();
  },
  methods: {
    getTableData() {
      this.$loading({
        mask: false,
      });
      moneyball({ id: this.$route.query.id, activity_type: 22 }).then((res) => {
        const { code, data, msg } = res.data;
        console.log(data);
        if (code === 0) {
          this.datas = data.condition_setting.benefit_config;
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
        color: #fff;
        margin: 0;
      }
      h5 {
        font-size: 24px;
        color: #fff;
        text-align: center;
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
        justify-content: center;
        padding: 24px 24px 0;
        img {
          width: 346px;
        }
        .detail-p {
          font-size: 24px;
          color: #686868;
          margin-top: 10px;
          line-height: 36px;
        }
        .van-button {
          width: 220px;
          height: 38px;
          background: #18926c;
          border-radius: 19px;
          margin: 48px auto 52px;
          display: block;
          color: #fff;
          font-size: 24px;
        }
        div {
          width: 332px;
          height: 162px;
          border-radius: 3px 3px 3px 0px;
          border: 1px solid #cccccc;
          margin-left: -4px;
          padding: 20px 32px;
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
