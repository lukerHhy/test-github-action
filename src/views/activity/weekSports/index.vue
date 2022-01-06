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
        <h2>{{$t('活动内容')}}</h2>
        <h3>{{$t('活动详细内容说明')}}</h3>
        <div class="block detail" v-if="info.id">
          <h4>{{$t('本周指定赛事')}}</h4>
          <div class="vs-item">
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
          <van-button @click="$router.push({ path: '/' })" v-if="info.id"
            >{{$t('进入投注')}}</van-button
          >
          <p v-else style="text-align: center; margin: 30px 0 40px">
            暂无赛事！
          </p>
          <h5>{{$t('活动详情')}}</h5>
          <p class="detail-p">
            每周五前完成要求流水即可参加当周周末保险赛，每周平台将指定一场周末体育赛事，如玩家在指定周末赛事首笔投注为负盈利，即可享受100%本金返还！
          </p>
        </div>
        <div class="block">
          <table>
            <tr>
              <th>{{$t('等级要求')}}</th>
              <th>{{$t('流水要求')}}</th>
              <th>{{$t('返还上限')}}</th>
              <th>{{$t('返还比例')}}</th>
              <th>{{$t('要求倍数')}}</th>
            </tr>
            <tr v-for="(item, index) in datas" :key="index">
              <td>
                <!-- <span v-if="index < datas.length - 1"
                  >VIP{{ splitString(index) }}~{{ lastVal }}</span
                >
                <span v-else>VIP{{ splitString(item.level) }}</span> -->
                <span>{{ item.level }}</span>
                <!-- <span v-else>{{ item.level }}</span> -->
              </td>
              <td>
                <span v-if="item.info.bet">≥{{ item.info.bet }}</span
                ><span v-else>x</span>
              </td>
              <td>
                <span v-if="item.info.benefit">≥{{ item.info.benefit }}</span
                ><span v-else>x</span>
              </td>
              <td>
                <span v-if="item.info.benefit_rate"
                  >≥{{ item.info.benefit_rate }}%</span
                ><span v-else>x</span>
              </td>
              <td>
                <span v-if="item.info.flow_rate"
                  >{{ item.info.flow_rate }}倍</span
                ><span v-else>x</span>
              </td>
            </tr>
          </table>
        </div>
        <h2>{{$t('规则说明')}}</h2>
        <h3>{{$t('该活动所需要满足的条件')}}</h3>
        <div class="block">
          <p>
            1. 此优惠彩金需完成3倍流水提款（计算方式如：18*3=54需完成流水）；
          </p>
          <p>
            2.
            此优惠返仅限该场首笔非滚球注单为准，玩家在该场指定赛事的首笔投注如为负盈利将根据可返还的最大金额返还给玩家;
          </p>
          <p>
            3.
            任何无效投注、取消投注、未产生胜负、对押、串关以及特别投注的注单将不能用以申请；
          </p>
          <p>
            4.
            每位有效玩家、每一手机号码、电子邮箱、相同银行卡、每一个IP地址、每一台电脑者每期只能享受一次优惠，如发现有违规者我们将保留无限期审核扣回红利的权利；
          </p>
          <p>
            5.
            无论是个人或团体，如有任何威胁、滥用此优惠套取利益，一经核实，超博体育有权利取消、收回优惠以及优惠产生的盈利；
          </p>
          <p>
            6.
            本公司保留对本次活动的修改、修订和最终解释权，以及在无通知情况下修改本次活动的权利。
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Lheader from "@/components/l-header";
import { weekSports, moneyball } from "@/api/activity";

export default {
  name: "index",
  components: {
    Lheader,
  },
  data() {
    return {
      title: this.$t('活动'),
      datas: [],
      info: null,
      lastVal: null,
    };
  },
  created() {
    this.getData();
    this.getTableData();
  },
  methods: {
    splitString(obj) {
      return obj.split("P")[1];
    },
    getData() {
      this.$loading({
        mask: false,
      });
      weekSports().then((res) => {
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
      let that = this;
      moneyball({ id: this.$route.query.id, activity_type: 20 }).then((res) => {
        const { code, data, msg } = res.data;
        console.log(data);
        if (code === 0) {
          // this.datas = data.condition_setting.benefit_config;
          this.lastVal = this.splitString(
            Object.keys(data.condition_setting.benefit_config).slice(-1)[0]
          );
          for (let key in data.condition_setting.benefit_config) {
            if (key.split("P")[1] === that.lastVal) {
              that.datas.push({
                level: key,
                info: data.condition_setting.benefit_config[key],
              });
            } else {
              that.datas.push({
                level: key + "~" + that.lastVal,
                info: data.condition_setting.benefit_config[key],
              });
            }
          }

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
  background: #1f1f1f;
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
      background: #454545;
      border: 2px solid #525252;
      border-radius: 8px;
      padding: 46px 30px;
      p {
        font-size: 24px;
        color: #999;
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
      &.detail {
        margin-bottom: 40px;
        background-image: url("./assets/bg.png");
        background-size: 100% 100%;
        .detail-p {
          width: 480px;
          margin: 20px auto 0;
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
              color: #fff;
              margin-bottom: 0;
            }
          }
          span {
            color: #fff;
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
      th {
        background-color: @primary-color;
        color: #fff;
        height: 48px;
        border: 2px solid @primary-color;
      }
      td {
        border: 2px solid @primary-color;
        color: #999;
        height: 46px;
      }
    }
  }
}
</style>
