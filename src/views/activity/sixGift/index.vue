<template>
  <div id="welfare">
    <lheader v-if="!$route.query.source" :title="title" :goback="true"></lheader>
    <div class="content" :class="{ 'no-header': !!$route.query.source }">
      <div class="banner">
        <img src="./assets/banner@2x.png" alt="" />
        <img class="caijin" src="./assets/songcaijin@2x.png" alt="" />
        <div class="detail">
          <div class="top">
            <span>{{$t('优惠力度')}}</span>
            <img src="./assets/up@2x.png" alt="" />
            <span>300%</span>
            &nbsp;
            <span>{{$t('到账时间')}}</span>
            <img src="./assets/up@2x.png" alt="" />
            <span>90%</span>
          </div>
          <span class="bottom-line"></span>
          <div class="bottom">
            <label>{{$t('已送出奖金')}}</label>
            <span>{{ sixInfo.money }}</span>
            <i>{{$t('元')}}</i>
          </div>
          <div class="bottom">
            <label>{{$t('领取人数')}}</label>
            <span>{{ sixInfo.user }}</span>
            <i>{{$t('人')}}</i>
          </div>
        </div>
      </div>
      <div class="finish-time">
        <div class="top">
          <img src="./assets/clock@2x.png" alt="" />
          <span>{{$t('距离活动结束时间')}}</span>
        </div>
        <div class="bottom">
          <div v-if="!isLogin">
            请您登录后查看活动剩余时间！您的优惠正在慢慢流失啦！
          </div>
          <div v-else>
            <van-count-down
              v-if="finishTime > 0"
              :time="finishTime"
              format="DD 天 HH 时 mm 分 ss 秒"
            />
            <p v-else>
              七天倒计时新手活动已结束，感谢您的参与！
            </p>
          </div>
        </div>
      </div>
      <div class="chongzhi" @click="handlerProfit">
{{$t('立即存款')}}
      </div>
      <div class="mfcaijin">
        <div class="card" v-for="(item, index) in profit_arr" :key="index">
          <p class="money">{{ item.benefit_money }}<span>{{$t('元')}}</span></p>
          <p class="freemoney">免费彩金 {{ item.flow }}倍流水</p>
          <p class="depositmoney">
            单笔存款<span>{{ item.recharge_money }}</span
            >元
          </p>
          <p class="paifa">{{$t('以上即可派发')}}</p>
          <div class="get-btn">
            <div v-if="item.haveReceive">
              <img src="./assets/check@2x.png" alt="" />
              <p>{{$t('已领取')}}</p>
            </div>
            <button @click="handleClickGetRedPacket(index)" v-else>
{{$t('领取')}}
            </button>
          </div>
        </div>
      </div>
      <div class="miaobian">
        <img src="./assets/sawtooth_bg@2x.png" alt="" />
      </div>
      <div class="lingqujilu">
        <img src="./assets/lqjl@2x.png" alt="" />
        <table>
          <tr>
            <td>{{$t('领取时间')}}</td>
            <td>{{$t('游戏账号')}}</td>
            <td>{{$t('领取状态')}}</td>
            <td>{{$t('领取金额')}}</td>
          </tr>
          <tr v-for="(item, index) in tableData" :key="index">
            <td>{{ item.created_at }}</td>
            <td>{{ item.username }}</td>
            <td>{{ item.status == 1 ? '成功领取' : '领取失败' }}</td>
            <td :class="{ red: item.money * 1 > 1000 }">{{ item.money }}</td>
          </tr>
        </table>

        <div class="paging">
          <van-pagination
            @change="handleCurrentChange"
            v-model="page"
            :total-items="total"
            :show-page-size="10"
            force-ellipses
          />
        </div>
      </div>
      <div class="miaobian miaobian2">
        <img src="./assets/sawtooth_bg@2x.png" alt="" />
      </div>
      <div class="mingze">
        <img src="./assets/mingze@2x.png" alt="" />
        <div>
          <p>1. {{$t($config[$projectname].secName)}}所有新手会员均可享受。</p>
          <p>2. 会员需要达成每次存款最低要求即可获得存款礼金。</p>
          <p>3. 如果单次存款金额达到多个层级，按照最高可以领取层级领取。流水倍数公式：（本金+礼金）*当前层级流水倍数=提款所需流水。</p>
          <p>4. 新手任务从会员注册日起，只保留7天。</p>
          <p>5. 每个层级礼金均只能领取一次。</p>
          <p>6. 本活动不与返水活动共享。</p>
          <p>
            7.
            本优惠活动只限娱乐性质的会员参加，如发现用户拥有超过一个账户，包括同一姓名，同一邮箱，同一/相似IP地址，同一住址，同一银行卡，同一电脑，禁止多开窗口进行投注，软件投注和套免费游戏等其他任何不正常投注行为，一经发现我们将保留冻结账户以及没收所有余额的权利。
          </p>
          <p>8. {{$t($config[$projectname].secName)}}拥有最终解析权。</p>
        </div>
      </div>
      <div class="miaobian-bottom">
        <img src="./assets/sawtooth_bg@2x.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import Lheader from "@/components/l-header";
import {
  specialdetail,
  sixinforecord,
  sixinfo,
  getsixinfoReward
} from "@/api/activity";
import { paytype } from "@/api/memberCenter";
import { member } from "@/api/memberCenter";
import dayjs from "dayjs";
import { Toast } from "vant";
export default {
  data() {
    return {
      title: this.$t('六重礼金'),
      merchant_no: process.env.VUE_APP_MERCHANT_NO, //商户号
      access_token: window.localStorage.token,
      profit_arr: [],
      tableData: [],
      page: 1,
      total: 0,
      totalPage: 1,
      isLogin: false,
      timer: null,
      sixInfo: {},
      id: "",
      detail: [],
      finishTime: 0,
      userInfo: ""
    };
  },
  components: {
    Lheader
  },
  methods: {
    async init() {
      await sixinfo({
        merchant_no: this.merchant_no
      }).then(res => {
        this.sixInfo = res.data.data;
      });
      this.id = this.$route.query.id;
      this.getDetail();
    },
    async handleCurrentChange(val) {
      await sixinforecord({
        page: val
      }).then(res => {
        this.tableData = res.data.data.list;
        this.total = res.data.data.total;
      });
    },
    handlerProfit() {
      if (!localStorage.getItem("token")) {
        if(['10042'].includes(process.env.VUE_APP_PROJECT_NAME)){
          this.$store.dispatch("global/setLoginPopShow", true)
        }else{
          this.$router.push({ name: "login" });
        }
      } else {
        this.$router.push("/deposit");
      }
    },
    // 领取新手六重礼
    handleClickGetRedPacket(index) {
      if (this.isLogin) {
        getsixinfoReward({ step: index + 1 }).then(res => {
          // Toast({
          //   text: `领取第${index + 1}重礼成功`,
          //   type: "success"
          // });
          this.$toast(`领取第${index + 1}重礼成功`)
          this.init()
        });
      }
    },
    handleMember() {
      member({
        merchant_no: this.merchant_no,
        access_token: this.access_token
      }).then(res => {
        this.userInfo = res.data.data;

        // 账户创建时间
        const { created_at } = this.userInfo;
        if (created_at) {
          // 活动到期时间
          const endDay = dayjs(created_at).add(this.detail.save_days, "day");
          this.timer = setInterval(() => {
            // 当前时间
            const newDay = dayjs(new Date());
            // 活动到期时间-当前时间
            const leftTime = endDay - newDay;

            if (leftTime < 0) {
              this.finishTime = -1;
            } else {
              this.finishTime = leftTime;
            }
          }, 1000);
        }
      })
    },
    //获取优惠详情
    getDetail() {
      specialdetail({
        merchant_no: this.merchant_no,
        id: this.id
      }).then(res => {
        this.detail = res.data.data.condition_setting;
        const { get_status } = this.sixInfo;
        this.profit_arr = res.data.data.condition_setting.condition.map(
          (item, index) => {
            let haveReceive = false;
            if (get_status && get_status[index + 1]) {
              haveReceive = true;
            }
            return {
              ...item,
              haveReceive
            };
          }
        )
        this.handleMember()
      })
    }
  },
  mounted() {},
  async created() {
    if (this.$route.query.token) {
      window.localStorage.setItem("token", this.$route.query.token);
    }
     
    if (window.localStorage.getItem("token")) {
      this.isLogin = true;
      this.access_token = window.localStorage.getItem("token");
    } else {
      this.isLogin = false;
    }
    sixinforecord().then(res => {
      this.tableData = res.data.data.list;
      this.total = res.data.data.total;
      this.totalPage = Math.floor(res.data.data.total / 10);
    });
    this.init()
  },
  beforeDestroy() {
    clearInterval(this.timer);
  }
};
</script>

<style src="./style.less" lang="less" scoped></style>
