<template>
  <div id="welfare">
    <lheader
      v-if="!$route.query.source"
      :title="title"
      :goback="true"
    ></lheader>
    <div
      class="content"
      :class="{ 'no-header': !!$route.query.source }"
    >
      <img
        class="top-img"
        src="./assets/top@2x.png"
      />
      <van-button
        class="join"
        @click="$openKefu()"
      >{{$t('立即参与')}}</van-button>
      <img
        class="title-img"
        src="./assets/title.png"
      />
      <p class="tip01">{{$t('任意金额')}}</p>
    </div>
    <div class="table-box">
      <div class="table-top table-wrap">
        <div>{{ $t("首存款金额") }}</div>
        <div>{{ $t("红利百分比") }}</div>
        <div>{{ $t("红利上限") }}</div>
        <div>{{ $t("流水倍数") }}</div>
      </div>
      <div class="table-middle table-wrap">
        <div>≥100</div>
        <div>40%</div>
        <div>1888USDT</div>
        <div style="line-height: 20px; margin-top: 15px">（本金+红利） X25</div>
      </div>
      <p class="tip02">
        *计价单位：USDT<br />{{ $t("本活动会员可依据当前星级任选一档位参与") }}
      </p>
    </div>
    <div class="rule-box">
      <img
        class="title"
        src="./assets/title2.png"
      />
      <p>
        <i>1</i>
        <span>{{
          $t("本活动每位玩家仅可参与一次，并且只有首次存款USDT可以申请礼金。")
        }}</span>
      </p>
      <p>
        <i>2</i>
        <span>{{ $t("完成存款后联系客服领取红利。") }}</span>
      </p>
      <p>
        <i>3</i>
        <span>{{
          $t(
            "此优惠仅限会员≥1级以上用户参与，如发现个人或团体合谋套利，网站有权扣除套利所得。"
          )
        }}</span>
      </p>
      <p>
        <i>4</i>
        <span>{{
          $t(
            "本优惠每位玩家，每账户信息（姓名，手机），支付方式（卡号，银行户名）及IP地址只能享有一次优惠，一旦确认为套利玩家，立即没收盈利和本金。"
          )
        }}</span>
      </p>
      <p>
        <i>5</i>
        <span>{{ $t("本活动最终解释权归本公司所有") }}</span>
      </p>
    </div>
  </div>
</template>

<script>
import Lheader from "@/components/l-header";
import { specialdetail } from "@/api/activity";
import { mapState } from "vuex";
export default {
  data() {
    return {
      title: "USDT40%大让利",
      merchant_no: process.env.VUE_APP_MERCHANT_NO, //商户号
      id: 0, //活动id
      note: [], //规则
      list: [
        {
          starClass: this.$t("四品官员"),
          hotel: this.$t("三星酒店"),
          beauty: this.$t("模特"),
          age: "18-25",
          cycle: "1次/6个月",
        },
        {
          starClass: this.$t("三品官员"),
          hotel: this.$t("四星酒店"),
          beauty: this.$t("模特"),
          age: "18-25",
          cycle: "1次/3个月",
        },
        {
          starClass: this.$t("二品官员"),
          hotel: this.$t("五星酒店"),
          beauty: this.$t("模特,空姐,学生"),
          age: "18-25",
          cycle: "1次/1个月",
        },
        {
          starClass: this.$t("一品官员"),
          hotel: this.$t("五星豪华"),
          beauty: this.$t("二线明星"),
          age: "18-25",
          cycle: "1次/1个月",
        },
        {
          starClass: this.$t("乾隆大帝"),
          hotel: this.$t("顶级豪华"),
          beauty: this.$t("二线明星"),
          age: "18-25",
          cycle: "2次/1个月",
        },
      ],
    };
  },
  computed: {
    ...mapState("users", [
      "token",
      "userInfo",
      "username",
      "isLogin",
      "wallet",
    ]),
  },
  components: {
    Lheader,
  },
  methods: {
    //获取优惠详情
  },
  created() {

  }
};
</script>

<style src="./style.less" lang="less" scoped></style>
