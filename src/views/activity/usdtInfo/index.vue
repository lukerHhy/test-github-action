<template>
  <div id="welfare">
    <lheader v-if="!$route.query.source" :title="title" :goback="true"></lheader>
    <div class="content" :class="{ 'no-header': !!$route.query.source }">
      <van-button
        class="join"
        @click="
          token
            ? $router.push({ path: '/deposit' })
            : $router.push({ path: '/login' })
        "
        >{{ $t("立即参与") }}</van-button
      >
      <p class="tip01">{{$t('还没有用过数字货币吗')}}</p>
      <img class="line-img" src="./assets/XQ_line@2x.png"/>
      <p class="tip02">{{$t('数字货币是现代社会中最有价值的发明之一')}}</p>
    </div>
    <div class="item-box">
      <img src="./assets/XQ6_img1@2x.png" />
      <div class="item-txt">
        <h3>{{ $t("安全有保障") }}</h3>
        <p>{{ $t("与银行卡等传统支付方式相比") }}</p>
      </div>
    </div>
    <div class="item-box">
      <img src="./assets/XQ6_img2@2x.png" />
      <div class="item-txt">
        <h3>{{ $t("交易速度快") }}</h3>
        <p>{{ $t("数字货币所采用的区块链技术具有去中心化特点") }}</p>
      </div>
    </div>
    <div class="item-box">
      <img style="margin-right: 50px" src="./assets/XQ6_img3@2x.png" />
      <div class="item-txt">
        <h3>{{ $t("高度匿名性") }}</h3>
        <p>{{ $t("不由央行或当局发行") }}</p>
      </div>
    </div>
    <p class="tip01" style="margin-top: 30px">{{ $t("USDT泰达币优势") }}</p>
    <img class="line-img" src="./assets/XQ_line@2x.png" />
    <p class="tip02">{{ $t("泰达币") }}</p>
    <div class="item-box item-box02">
      <div class="item-txt">
        <h3>{{ $t("安稳") }}</h3>
        <p><i></i>{{ $t("匿名购买") }}</p>
        <p><i></i>{{ $t("不受银行监管") }}</p>
        <p><i></i>{{ $t("价格稳定") }}</p>
      </div>
      <img src="./assets/XQ6_img4@2x.png" />
    </div>
    <div class="item-box item-box02">
      <div class="item-txt">
        <h3>{{ $t("易用") }}</h3>
        <p><i></i>{{ $t("交易快速到账") }}</p>
        <p><i></i>24小时随时交易</p>
        <p><i></i>{{ $t("交易额度无上限") }}</p>
      </div>
      <img src="./assets/XQ6_img5@2x.png" />
    </div>
    <div class="quick-desc">
      <div class="quick-desc-tit">
        <p class="tip01">{{ $t("数字货币买卖指南") }}</p>
        <img class="line-img" src="./assets/XQ_line@2x.png" />
      </div>
      <!-- <div class="quick-bar">
        <span>Huobi Global</span>
        <span>Okex</span>
        <span>{{ $t("币安") }}</span>
      </div> -->
      <p class="quick-steps-tit">{{ h5[h5Index].name }}</p>
      <p class="quick-steps-desc">{{ h5[h5Index].desc }}</p>

      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <img src="./assets/img2@2x.png" alt="" />
          </div>
          <div class="swiper-slide">
            <img src="./assets/img3@2x.png" alt="" />
          </div>
        </div>
        <!-- Add Arrows -->
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
      </div>
    </div>
    <div class="active-items">
      <div class="quick-desc-tit">
        <p class="tip01">{{ $t("优惠活动") }}</p>
        <img class="line-img" src="./assets/XQ_line@2x.png" />
      </div>
      <div class="active-items-wrap">
        <div @click="$router.push({ name: 'usdt' })">
          <img src="./assets/usdt.png" />
          <p>USDT40%大让利</p>
        </div>
        <!-- <div>
          <img src="./assets/usdt.png" />
          <p>{{ $t("每日使用") }}</p>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import Lheader from "@/components/l-header";
import { specialdetail } from "@/api/activity";
import "swiper/dist/css/swiper.css";
import { Swiper } from "vue-awesome-swiper";
import { mapState } from "vuex";

export default {
  data() {
    return {
      title: this.$t("新时代新支付新起点"),
      merchant_no: process.env.VUE_APP_MERCHANT_NO, //商户号
      id: 0, //活动id
      note: [], //规则
      isShowHeader: true,
      h5: [
        {
          name: "第一步",
          desc: "登录账号内点击快速存款",
        },
        {
          name: "第二步",
          desc: "选择数字货币存款方式",
        },
        {
          name: "第三步",
          desc: "选择对应数字货币存款的币种",
        },
        {
          name: "第四步",
          desc:
            "输入存款金额、所提交的协议跳转点击下一步跳转至收银台，复制收币链接进行提币。转款完成系统自动上分。",
        },
      ],
      h5Index: 0,
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
  components: {
    Lheader,
  },
  methods: {
    //获取优惠详情
    getDetail() {
      specialdetail({
        merchant_no: this.merchant_no,
        id: this.id,
      }).then((res) => {
        this.note = res.data.data.condition_setting;
      });
    },
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
  created() {
    // if (this.$route.query.token) {
    //   localStorage.setItem("token", this.$route.query.token);
    // }
    // if (this.$route.query.source) {
    //   this.isShowHeader = false;
    // }
    // this.id = this.$route.query.id;
    // this.getDetail();
    let that = this;
    this.$nextTick(() => {
      new Swiper(".swiper-container", {
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        on: {
          slideChange: function () {
            console.log(this.activeIndex);
            that.h5Index = this.activeIndex;
            console.log(this.h5Index);
          },
        },
      });
    });
  },
};
</script>

<style src="./style.less" lang="less" scoped></style>
