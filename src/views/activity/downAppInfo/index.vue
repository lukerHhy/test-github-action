<template>
  <div id="sign-detail" :style="{'marginTop':!!$route.query.source && 0}">
    <lheader v-if="!$route.query.source" :title="title" :goback="true"></lheader>
    <div class="main">
      <img class="img_money" src="./img/img_money.png" alt="">
      <div class="tab">
        <div :class="active02===0?'active':''" @click="active02=0">
          <span>{{$t('签到兑现金')}}</span>
        </div>
        <div :class="active02===1?'active':''" @click="active02=1">
          <span>{{$t('下载领豪礼')}}</span>
        </div>
      </div>
      <template v-if="active02===0">
        <div class="block block01">
          <img class="block-tit" src="./img/title_img2.png" alt="">
          <p>{{$t('天天签到领彩券')}}</p>
          <img style="width: 100%" src="./img/img_huodong.png" alt="">
          <div class="signcount">
            <p>本月累积签到')}}<br><span>0</span>{{$t('天')}}</p>
            <p>{{$t('今日有效投注额')}}<br><span>0</span></p>
          </div>
          <div class="button" @click="$router.push({path:'/downApp'})">{{$t('立即签到')}}</div>
          <p>{{$t('还需投注')}}<span>2888</span>  即可参与签到</p>
          <div class="month">
            <div class="item" v-for="(item,index) in fullDay">
              <div>
                <img src="./img/icon.png" alt="">
              </div>
              <p>第{{ index+1 }}天</p>
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="block block02">
          <img class="block-tit" src="./img/title_img.png" alt="">
          <p style="margin-top: 14px">{{$t('活动期间')}}</p>
          <div class="downapp">
            <img class="cover" src="./img/img_pic1.png" alt="">
            <div class="qrcode">
              <img :src="$imgs['appdown/Icon_logo@3x']">
              <p>
                <img :src="this.$imgs['appdownload/ios']" alt="">
                <img :src="this.$imgs['appdownload/android']" alt="">
                <span>{{$t('给您最极致的体验')}}</span>
              </p>
            </div>
          </div>
          <div class="button" @click="$router.push({path:'/appDownload'})">{{$t('立即下载')}}</div>
        </div>
      </template>
      <div class="block block02 desc">
        <img class="block-tit" src="./img/title-rule.png" alt="">
        <p>{{$t('活动时间')}}</p>
        <p>{{$t('此优惠只针对首次下载使用')}}</p>
        <p>{{$t('任何用户或团体以不正常的方式进行的投注或套取活动优惠')}}</p>
        <p>{{$t('为避免文字理解差异')}}</p>
      </div>
    </div>
    <toast
        v-if="showToast"
        :content="content"
        @sure="sure"
        @close="close"
    ></toast>
  </div>
</template>
<style lang="less" scoped>
  #sign-detail{
    margin-top: 88px;
    position: relative;
    background:#2F2E58 url("./img/banner_img1.png") center top no-repeat;
    background-size: 100% auto;
    padding-top: 376px;
    padding-bottom: 68px;
    .main{
      width: 100%;
      text-align: center;
      .img_money{
        display: block;
        width: 418px;
        margin: 0 auto 16px;
      }
      .tab{
        display: flex;
        align-items: center;
        justify-content: center;
        div{
          width: 332px;
          height: 90px;
          background: #403E78;
          border-radius: 45px;
          margin: 0 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
          color: #fff;
          &.active{
            background: linear-gradient(90deg, #E97F37 0%, #FF434B 100%);
          }
        }
      }
      .block{
        width: 710px;
        margin: 40px auto 0;
        padding: 87px 44px 0;
        text-align: center;
        .block-tit{
          height: 38px;
        }
        &.block01{
          height: 1576px;
          background: url("./img/img_bg1.png") center top no-repeat;
          background-size: 100% auto;
        }
        &.desc{
          counter-reset: count;
          p{
            font-size: 28px;
            line-height: 52px!important;
            padding-left: 34px;
            position: relative;
            color: #ACA9D5;
            width: 100%!important;
            &:before{
              content: counters(count,"") " ";
              counter-increment: count;
              position: absolute;
              left: 0;
              top: 14px;
              margin-right: 10px;
              line-height: 24px;
              text-align: center;
              font-size: 32px;
              color: #fff;
            }
          }
        }
        p{
          text-align: left;
          font-size: 16px;
          color: #ACA9D5;
          line-height: 1.5;
          margin: 30px 0 46px;
        }
        .button{
          width: 420px;
          height: 90px;
          background: linear-gradient(90deg, #E97F37 0%, #FF434B 100%);
          border-radius: 45px;
          text-align: center;
          line-height: 90px;
          margin: 53px auto 49px;
          font-size: 32px;
          color: #fff;
        }
        &.block02{
          height: 838px;
          background: url("./img/img_bg2@2x.png") center top no-repeat;
          background-size: 100% auto;
          p{
            margin: 0;
            line-height: 30px;
            width: 80%;
          }
          h2{
            font-size: 20px;
            font-family: SFNSDisplay;
            color: #FEDC80;
            line-height: 23px;
            text-align: left;
            margin: 20px 0 9px;
          }

        }
        .month{
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          justify-content: space-between;
          .item{
            margin: 0 11px 20px;
            font-size: 22px;
            color: #9092BB;
            text-align: center;
            div{
              width: 70px;
              height: 67px;
              margin-bottom: 10px;
              background: #4E518C;
              border-radius: 8px;
              img{
                width: 100%;
              }
            }
            p{
              margin: 0;
              text-align: center;
            }
          }
        }
        .signcount{
          display: flex;
          align-items: center;
          justify-content: center;
          width: 600px;
          height: 134px;
          background: #494F84;
          margin: 28px auto 0;
          p{
            flex: 1;
            text-align: center;
            font-size: 24px;
            color: #fff;
            line-height: 1.5;
            margin: 0;
            span{
              font-size: 40px;
            }
          }
          p:first-child{
            border-right: 2px solid #5B608F;
          }
        }
      }
      .game-item{
        display: flex;
        align-items: center;
        justify-content: center;
        > div{
          position: relative;
          margin: 0 10px;
          cursor: pointer;
          p{
            position: absolute;
            font-size: 16px;
            color: #ACA9D5;
            width: 100%;
            text-align: center;
            left: 0;
            bottom: 20px;
          }
        }
      }
      .downapp{
        display: flex;
        align-items: center;
        justify-content: space-between;
        .cover{
          width: 334px;
        }
        .qrcode{
          width: 334px;
          height: 334px;
          background: #434693;
          border-radius: 10px;
          margin-right: 49px;
          padding-top: 30px;
          #er_code{
            width: 240px;
            height: 240px;
            background: #FFFFFF;
            border-radius: 10px;
          }
          p{
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
            color: #ACA9D5;
            width: 100%;
            margin-top: 20px;
            img{
              width: 22px;
            }
          }
        }
      }
    }
  }
</style>
<script>
import Lheader from "@/components/l-header";
import toast from "@/components/toast";
import { signinfo, signrecord, joinsign , downAppSign,downAppInfo,downAppExchange } from "@/api/activity";
import { member } from "@/api/memberCenter";
export default {
  data() {
    return {
      title: this.$t('签到'),
      active02:0,
      merchant_no: process.env.VUE_APP_MERCHANT_NO, //商户号
      access_token: window.localStorage.token,
      id: 0, //活动id
      detail: {}, //签到详情
      year: 1970, //年
      month: 1, //月
      day: 1, //日
      dayList: [], //日期数组
      info: {}, //基本信息
      isSign: false, //是否签到
      normal: [], //普通签到数组
      re: [], //补签数组
      active: [], //礼包数组
      isNow: 0, //当前月
      showToast: false,
      content: "",
      activeDefault: ["3", "11", "20", "30"],
      giftDefault: ["6", "16", "26"],
      fullDay: 0,
    };
  },
  components: {
    Lheader,
    toast
  },
  created() {
    if (this.$route.query.token) {
      localStorage.setItem("token", this.$route.query.token);
      this.access_token = this.$route.query.token;
    }
     
    this.initDate();
    this.id = this.$route.query.id;
    this.getInfo();
  },
  methods: {
    //初始化日历
    initDate(date) {
      this.dayList = [];
      let dat = "";
      if (date) {
        dat = new Date(date);
      } else {
        dat = new Date();
      }
      let currentDay = dat.getDate();
      let currentYear = dat.getFullYear();
      let currentMonth = dat.getMonth() + 1;
      dat.setDate(1);
      let currentWeek = dat.getDay();
      let then = new Date(currentYear, currentMonth, 0);
      let days = then.getDate();
      this.fullDay = then.getDate();
      this.day = currentDay;
      this.year = currentYear;
      this.month = currentMonth;
      let arr = [];
      for (let i = 0; i < currentWeek; i++) {
        arr.push({ day: "" });
      }
      for (let i = 0; i < days; i++) {
        arr.push({ day: i + 1 });
      }
      this.dayList = arr;
      console.log(days)
      if (window.localStorage.token) {
        this.getsignrecord(currentYear, currentMonth, days);
      }
    },
    //上个月
    prev() {
      this.isNow--;
      let year = this.year;
      let month = this.month;
      let day = this.day;
      month -= 1;
      if (month === 0) {
        month += 12;
        year -= 1;
      }
      month < 10 ? (month = "0" + month) : month;
      day < 10 ? (day = "0" + day) : day;
      let str = year + "-" + month + "-" + day;
      this.initDate(str);
    },
    //下个月
    next() {
      this.isNow++;
      let year = this.year;
      let month = this.month;
      let day = this.day;
      month += 1;
      if (month >= 13) {
        month -= 12;
        year += 1;
      }
      month < 10 ? (month = "0" + month) : month;
      day < 10 ? (day = "0" + day) : day;
      let str = year + "-" + month + "-" + day;
      this.initDate(str);
    },
    //获取基本信息
    getInfo() {
      if (window.localStorage.token) {
        downAppExchange({
          merchant_no: this.merchant_no,
          id: 13,
        }).then(res => {
          console.log(45613)
          console.log(res)
          this.info = res.data.data;
        });
      } else {
        this.content = this.$t('请先登录账号');
        this.showToast = true;
        this.toastType = 2;
      }
    },
    //获取签到记录
    getsignrecord(y, m, d) {
      m < 10 ? (m = "0" + m) : m;
      d < 10 ? (d = "0" + d) : d;
      signrecord({
        start_time: y + "-" + m + "-" + "01",
        end_time: y + "-" + m + "-" + d,
        type: 1,
        access_token: this.access_token
      }).then(res => {
        let then = [];
        let arr = res.data.data;
        arr.forEach(val => {
          then.push(val.date.split("-")[2]);
          if (val.date.split("-")[2] === this.day) {
            this.isSign = true;
          }
        });
        this.normal = then;
      });
      signrecord({
        start_time: y + "-" + m + "-" + "01",
        end_time: y + "-" + m + "-" + d,
        type: 2,
        access_token: this.access_token
      }).then(res => {
        let then = [];
        let arr = res.data.data;
        arr.forEach(val => {
          then.push(val.date.split("-")[2]);
        });
        this.re = then;
      });
      signrecord({
        start_time: y + "-" + m + "-" + "01",
        end_time: y + "-" + m + "-" + d,
        type: 3,
        access_token: this.access_token
      }).then(res => {
        let then = [];
        let arr = res.data.data;
        arr.forEach(val => {
          then.push(val.date.split("-")[2]);
        });
        this.active = then;
      });
      let arrT = this.dayList;
      this.dayList = [];
      arrT.forEach(item => {
        item.day = item.day.toString();
        if (item.day) {
          if (this.isNow === 0) {
            if (this.active.indexOf(item.day) !== -1) {
              item.name = this.$t('礼包');
              item.class = "green";
            } else if (this.re.indexOf(item.day) !== -1) {
              item.name = this.$t('补签');
              item.class = "green";
            } else if (this.normal.indexOf(item.day) !== -1) {
              item.name = item.day + this.$t('日');
              item.class = "green";
            } else if (item.day === this.day) {
              item.name = item.day + this.$t('日');
              item.class = "red";
            } else if (
                this.normal.indexOf(item.day) === -1 &&
                item.day < this.day
            ) {
              item.name = this.$t('漏签');
              item.class = "blue";
            } else if (
                this.activeDefault.indexOf(item.day) !== -1 &&
                item.day > this.day
            ) {
              item.name = this.$t('礼包');
              item.class = "yellow";
            } else {
              item.name = item.day + this.$t('日');
              item.class = "";
            }
          } else if (this.isNow > 0) {
            if (this.active.indexOf(item.day) !== -1) {
              item.name = this.$t('礼包');
              item.class = "green";
            } else {
              item.name = item.day + this.$t('日');
              item.class = "";
            }
          } else if (this.isNow < 0) {
            if (this.active.indexOf(item.day) !== -1) {
              item.name = this.$t('礼包');
              item.class = "yellow";
            } else if (this.re.indexOf(item.day) !== -1) {
              item.name = this.$t('补签');
              item.class = "green";
            } else if (this.normal.indexOf(item.day) !== -1) {
              item.name = item.day + this.$t('日');
              item.class = "red";
            } else if (this.normal.indexOf(item.day) === -1) {
              item.name = this.$t('漏签');
              item.class = "blue";
            } else {
              item.name = item.day + this.$t('日');
              item.class = "";
            }
          }
        }
      });
      this.dayList = arrT;
    },
    //签到接口
    sign() {
      if (window.localStorage.token) {
        if (!this.isSign) {
          let dat = new Date();
          let currentDay = dat.getDate();
          let currentYear = dat.getFullYear();
          let currentMonth = dat.getMonth() + 1;
          currentMonth < 10
              ? (currentMonth = "0" + currentMonth)
              : currentMonth;
          currentDay < 10 ? (currentDay = "0" + currentDay) : currentDay;
          let str = currentYear + "-" + currentMonth + "-" + currentDay;
          joinsign({
            id: this.id,
            sign_type: 1,
            date: str,
            access_token: this.access_token
          }).then(res => {
            if (res.data.code === 0) {
              this.content = this.$t('签到成功');
              this.showToast = true;
              this.toastType = 0;
              this.info = {};
              this.getInfo();
              this.initDate();
              this.isSign = true;
            } else {
              this.$toast(res.data.msg);
            }
          });
        }
      } else {
        this.content = this.$t('请先登录账号');
        this.showToast = true;
        this.toastType = 2;
      }
    },
    //补签
    reSign(item) {
      if (item.class === "blue") {
        let year = this.year;
        let month = this.month;
        let day = item.day;
        month < 10 ? (month = "0" + month) : month;
        day < 10 ? (day = "0" + day) : day;
        let str = year + "-" + month + "-" + day;
        joinsign({
          id: this.id,
          sign_type: 2,
          date: str,
          access_token: this.access_token
        }).then(res => {
          if (res.data.code === 0) {
            this.content = this.$t('补签成功');
            this.showToast = true;
            this.toastType = 0;
            this.getInfo();
            this.initDate();
          } else {
            this.$toast(res.data.msg);
          }
        });
      }
    },
    preSign() {
      let giftDate =
          this.dayList.filter(
              item => item.name === this.$t('礼包') && item.class === "yellow"
          ) || [];
      if (giftDate.length > 0) {
        let item = giftDate[0];
        let year = this.year;
        let month = this.month;
        let day = item.day;
        month < 10 ? (month = "0" + month) : month;
        day < 10 ? (day = "0" + day) : day;
        let str = year + "-" + month + "-" + day;
        joinsign({
          id: this.id,
          sign_type: 3,
          date: str,
          access_token: this.access_token
        }).then(res => {
          if (res.data.code === 0) {
            this.content = this.$t('超签成功');
            this.showToast = true;
            this.toastType = 0;
            this.getInfo();
            this.initDate();
          } else {
            this.$toast(res.data.msg);
          }
        });
      } else {
        this.$toast(this.$t('本月已经没有神秘礼包啦'));
      }
    },
    sure() {
      if (this.toastType === 0) {
        this.showToast = false;
      } else if (this.toastType === 1) {
        this.$router.push({ path: "/deposit" });
      } else if (this.toastType === 2) {
        if (this.$route.query.source) {
          location.href = "wanquapp://login";
        } else {
          this.$router.push({ path: "/login" });
        }
      }
    },
    close() {
      this.showToast = false;
    }
  }
};
</script>
