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
        <div class="block detail">
          <h5>{{$t('活动详情')}}</h5>
          <p class="detail-p">
            完成当周存款流水即可在下周申请20%最高{{ maxData }}元再存红利
          </p>
        </div>
        <div class="block">
          <table>
            <tr>
              <th>{{$t('VIP等级')}}</th>
              <th>{{$t('当周存款要求')}}</th>
              <th>{{$t('流水要求')}}</th>
              <th>{{$t('奖金上限')}}</th>
            </tr>
            <tr v-for="(item, index) in datas" :key="index">
              <td>
                VIP{{ splitString(item.vip_level)[0] }}~{{
                  splitString(item.vip_level)[1]
                }}
              </td>
              <td>
                <span v-if="item.week_deposit">≥{{ item.week_deposit }}</span
                ><span v-else>x</span>
              </td>
              <td>
                <span v-if="item.bet">≥{{ item.bet }}</span
                ><span v-else>x</span>
              </td>
              <td>
                <span v-if="item.benefit">{{ item.benefit }}</span
                ><span v-else>x</span>
              </td>
            </tr>
          </table>
        </div>
        <h2>{{$t('规则说明')}}</h2>
        <h3>{{$t('该活动所需要满足的条件')}}</h3>
        <div class="block">
          <p>1. 此活动与返水共享。</p>
          <p>2. 此活动再存最低要求{{ datas.level1.week_deposit }}元以上。</p>
          <p>3. 提款要求（本金+红利）*12=提款所需流水。</p>
          <p>
            4.
            若完成充值后12小时内没有在活动页面申请本活动礼金，我们将视为您放弃本优惠；若会员不申请此优惠，存款金额只需一倍流水即可申请提款。
          </p>
          <p>
            5.
            本优惠每位玩家，每账户信息（姓名，手机，邮箱），支付方式（卡号，银行户名）及IP地址只能享有一次优惠，一旦确认为套利玩家，立即没收盈利和本金。
          </p>
          <p>6. 本公司享有最终解释权。</p>
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
      maxData: null,
    };
  },
  created() {
    this.getTableData();
  },
  methods: {
    splitString(obj) {
      return obj.split("-");
    },
    getTableData() {
      this.$loading({
        mask: false,
      });
      let that = this;
      moneyball({ id: this.$route.query.id, activity_type: 21 }).then((res) => {
        const { code, data, msg } = res.data;
        console.log(data);
        if (code === 0) {
          that.datas = data.condition_setting.benefit_config;
          let arr = [];
          for (let key in that.datas) {
            arr.push(that.datas[key].benefit * 1);
          }
          that.maxData = Math.max(...arr);
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
        background-size: cover;
        height: 320px;
        padding-top: 120px;
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
