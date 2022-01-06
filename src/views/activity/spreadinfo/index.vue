<template>
  <div id="threeGift" :style="{'marginTop':!!$route.query.source && 0}">
    <lheader v-if="!$route.query.source" :title="title" :goback="true"></lheader>
    <div class="button" @click="getspreadmoney">{{$t('立即领取')}}</div>
    <div class="gift-get">
      <div class="gift-get1">
        <span class="tit">{{$t('已领取福利')}}</span>
        <p>{{ detail.has_get_benefits }} <span>{{$t('元')}}</span></p>
      </div>
      <div class="gift-get2">
        <span class="tit">{{$t('待领取福利')}}</span>
        <p>{{ detail.no_get_benefits }} <span>{{$t('元')}}</span></p>
      </div>
    </div>
    <div class="gift-link">
      <div class="">
        <div class="gift-count">
          <p>{{$t('累计')}}<br>{{$t('邀请好友')}}</p>
          <span>{{ detail.invit_users }}</span>
        </div>
        <div class="gift-count">
          <p>{{$t('累计')}}<br>{{$t('福利礼金')}}</p>
          <span>{{ detail.total_benefits }}元</span>
        </div>
      </div>

      <p class="gift-link-tit">- 【我的专属好友邀请链接和推广码】 -</p>
      <p class="gift-link-code" @click="copy($event, detail)">{{ detail.spread_url }}?code={{ detail.spread_code }}</p>
    </div>
    <div class="invite-rule">
      <div class="invite-rule-det">
        <p class="tit">{{$t('邀请好友明细')}}</p>
        <table>
          <tr>
            <th>{{$t('好友账号')}}</th>
            <th>{{$t('总投注金额')}}</th>
            <th>{{$t('拉新福利礼金')}}</th>
            <th>{{$t('日期')}}</th>
          </tr>
          <tr
              v-for="(item, index) in list"
              :key="index"
          >
            <td>{{ item.start_time }}</td>
            <td>{{ item.new_username }}</td>
            <td>{{ item.valid_bet }}</td>
            <td>{{ item.benefit_money }}</td>
          </tr>
        </table>
      </div>
      <div class="invite-rule-wrap">
        <p class="tit">{{$t('邀请规则')}}</p>
        <table>
          <tr>
            <th>{{$t('会员等级')}}</th>
            <th>{{$t('新手福利')}}</th>
            <th>{{$t('拉新福利')}}</th>
            <th>{{$t('享有时长')}}</th>
          </tr>
          <tr
            v-for="(item, index) in memberList"
            :key="index"
          >
            <td v-if="item.name">
              {{ item.name }}
            </td>
            <td v-if="item.condition">
              {{ item.condition.new_profite_money }}元额外注册礼金
            </td>
            <td v-if="item.condition">
              新人投注额 {{ item.condition.get_new_benefit }}
            </td>
            <td v-if="item.condition">
              {{ item.condition.druing_week }}
            </td>
          </tr>

        </table>
      </div>
    </div>
    <div class="invite-steps">
      <h2>- 【邀请流程】 -</h2>
      <div class="steps">
        <p>
          <span>{{$t('第一步')}}</span>
          <span>{{$t('获取专属邀请码')}}<br>{{$t('登录并进入')}}</span>
        </p>
        <p>
          <span>{{$t('第二步')}}</span>
        </p>
        <p>
          <span>{{$t('第三步')}}</span>
        </p>
      </div>
      <div class="invite-desc">
        <h3>{{$t('活动细则')}}</h3>
        <p>{{$t('此平台所有会员均可享受')}}</p>
        <p>{{$t('新手福利需要完成')}}</p>
        <p>{{$t('新手会员如果已经超过享有时长')}}</p>
        <p>{{$t('拉新福利必须是新人在有存款的情况下才计算')}}</p>
        <p>{{$t('系统判断单周如果有效拉新人数超过')}}</p>
        <p>{{$t('每月系统挑选出有效拉新人数最多的')}}</p>
        <p>{{$t('本优惠活动只限娱乐性质的会员参加')}}</p>
        <p>{{$t('为本公司保留对该活动的最终解释权')}}</p>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
  #threeGift{
    margin-top: 88px;
    background: #FFF4DB url("./img/banner_img1.png") center top no-repeat;
    background-size: 100% auto;
    padding: 808px 0 0;
    .button{
      background: #FD0733;
      margin: 0 auto 49px;
      text-align: center;
      line-height: 90px;
      color: #fff;
      font-size: 40px;
      box-sizing: content-box;
      cursor: pointer;
      width: 630px;
      height: 90px;
      background: #FD0733;
      box-shadow: 0px 10px 8px 0px #F1C1B4;
      border-radius: 65px;
    }
    .gift-get{
      display: flex;
      align-items: center;
      justify-content: center;
      padding-bottom: 45px;
      >div{
        position: relative;
        width: 366px;
        height: 482px;
        &:first-child{
          background: url("./img/img_yiling.png") center top no-repeat;
          background-size: 100% auto;
          margin-right: -36px;
        }
        &:last-child{
          background: url("./img/img_dailing.png") center top no-repeat;
          background-size: 100% auto;
        }
        .tit{
          position: absolute;
          width: 100%;
          text-align: center;
          font-size: 30px;
          color: #B00200;
          top: 290px;
          left: 0;
        }
        p{
          position: absolute;
          width: 100%;
          left: 0;
          bottom: 76px;
          font-size: 48px;
          color: #F9F0B0;
          text-align: center;
          span{
            font-size: 28px;
          }
        }
      }
    }
    .gift-link{

      padding: 10px 0 73px;
      background-color: #FFE2C1;
      .gift-count{
        width: 100%;
        position: relative;
        font-size: 30px;
        color: #E8343E;
        flex: 1;
        &:nth-child(1){
          height: 208px;
          background: url("./img/img_fu2@2x.png") center top no-repeat;
          background-size: 660px auto;
        }
        &:nth-child(2){
          height: 210px;
          background: url("./img/img_fu1@2x.png") center top no-repeat;
          background-size: 660px auto;
        }
        span{
          position: absolute;
          width: 225px;
          height: 62px;
          line-height: 62px;
          text-align: center;
          top: 120px;
          left: 52%;
          text-align: center;
        }
        p{
          position: absolute;
          width: 122px;
          top: 120px;
          font-size: 28px;
          color: #fff;
          left: 232px;
          text-align: center;
        }
      }
      .gift-link-tit{
        font-size: 28px;
        color: #B06800;
        margin: 92px 0 35px;
        text-align: center;
      }
      .gift-link-code{
        width: 630px;
        height: 90px;
        background: #FFEDD0;
        font-size: 36px;
        color: #FD0733;
        line-height: 90px;
        text-align: center;
        margin: 0 auto;
      }
    }
    .invite-rule{
      padding: 60px 40px;
      display: flex;
      align-items: flex-start;
      justify-content: center;
      flex-direction: column;
      .tit{
        height: 100px;
        line-height: 100px;
        text-align: center;
        font-size: 40px;
      }

      .invite-rule-wrap{
        width: 100%;
        margin-right: 15px;
        border: 2px solid #E9D1B1;
        .tit{
          background-color: #FFE2C1;
          color: #FF3537;
          border-bottom: 2px solid #E9D1B1;
        }
        table{
          width: 100%;
          table-layout: fixed;
          text-align: center;
          th{
            height: 35px;
            font-size: 16px;
            color: #B06800;
            font-weight: bold;
          }
          td{
            height: 35px;
            font-size: 14px;
            color: #333;
          }
          tr:nth-child(odd){
            background-color: #fff;
          }
        }
      }
      .invite-rule-det{
        width: 100%;
        margin-bottom: 40px;
        border: 2px solid #FF3537;
        .tit{
          background-color: #FF3537;
          color: #fff;
        }
        table{
          width: 100%;
          table-layout: fixed;
          text-align: center;
          font-size: 24px;
          color: #333;
          th{
            height: 35px;
            &:first-child{
              color: #FF3537;
            }
          }
          td{
            height: 35px;
            &:first-child{
              color: #FF3537;
            }
          }
        }
      }
    }
    .invite-steps{
      padding: 60px 0 130px;
      background-color: #E8343E;
      h2{
        text-align: center;
        font-size: 28px;
        color: #fff;
      }
      .steps{
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        flex-direction: column;
        margin: 50px 0 100px;
        > p{
          width: 710px;
          height: 120px;
          background: url("./img/steps-bg.png") no-repeat;
          background-size: 100% auto;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          font-size: 28px;
          color: #E8343E;
          margin-bottom: 20px;
          padding-left: 40px;
          &:first-child span:last-child{
            text-align: left;
          }
        }
      }
      .invite-desc{
        color: #fff;
        text-align: left;
        counter-reset: count;
        padding: 0 30px 0 40px;
        h3{
          font-size: 24px;
          margin-bottom: 10px;
        }
        p{
          font-size: 20px;
          line-height: 40px;
          padding-left: 34px;
          position: relative;
          &:before{
            content: counters(count,"") " ";
            counter-increment: count;
            position: absolute;
            left: 0;
            top: 10px;
            width: 24px;
            height: 24px;
            border: 1px solid #fff;
            border-radius: 50%;
            margin-right: 10px;
            line-height: 24px;
            text-align: center;
            font-size: 18px;
          }
        }
      }
    }
  }
</style>

<script>
import Lheader from "@/components/l-header";
import toast from "@/components/toast";
import {
  specialdetail,
  spreadinfo,
  spreadrecord,
  getspreadmoney
} from "@/api/activity";
// import { memberlevellist } from '@/api/memberCenter'
import { Toast } from "vant";
import Clipboard from "clipboard";
// import { LEVEL } from "../const";
import { mapState, mapGetters } from "vuex";

export default {
  data() {
    return {
      title: this.$t('好礼三重送'),
      showToast: false,
      content: "",
      toastType: 0,
      id: 0, //活动id
      detail: {}, //页面信息
      // 邀请好友列表
      list: [],
      // 会员等级
      memberList: [],
      // 时间
      activeName: "first",
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: this.$t('今天'),
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: this.$t('昨天'),
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: this.$t('一周前'),
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      },
      value1: "",
      value2: "",
      activeTab: 0,
      page: 1,
      total: 1
    };
  },
  computed: {
    ...mapState("global",["memberLevel"]),
    ...mapGetters("users", ["isLogin", "token"]),
  },
  components: {
    Lheader,
    toast
  },
  methods: {
    //获取优惠详情
    getDetail() {
      specialdetail({
        id: this.id
      }).then(res => {
        console.log(res)
        let list = res.data.data.condition_setting;
        if(list.length) {
          this.memberList = list.map(val => {
            return {
              ...val,
              name: this.memberLevel[val.level].name || ""
            };
          });
        }
        console.log(this.memberList)
      });
    },
    //打开其他链接
    goOther(link) {
      window.open(`${link.spread_url}?code=${link.spread_code}`);
    },
    // 复制链接
    copy(e, text) {
      if(!this.token) {
        this.content = this.$t('请先登录账号');
        this.showToast = true;
        this.toastType = 2;
        return
      }
      const clipboard = new Clipboard(e.target, { text: () => text });
      clipboard.on("success", e => {
        this.$toast(this.$t('复制成功'));
        clipboard.destroy();
      });
      clipboard.on("error", e => {
        this.$toast(this.$t('该浏览器不支持自动复制'));
        clipboard.destroy();
      });
      clipboard.onClick(e);
    },
    sure() {
      if (this.toastType === 0) {
        this.showToast = false;
      } else if (this.toastType === 1) {
        this.$router.push({ path: "/deposit" });
      } else if (this.toastType === 2) {
        this.$router.push({ path: "/login" });
      }
    },
    close() {
      this.showToast = false;
    },
    //获取优惠信息
    getInfo() {
      if (this.token) {
        spreadinfo({
          id: this.id,
        }).then(res => {
          this.detail = res.data.data;
        });
      } else {
        this.content = this.$t('请先登录账号');
        this.showToast = true;
        this.toastType = 2;
      }
    },
    //邀请记录
    getList() {
      if (this.token) {
        spreadrecord({
          id: this.id,
          page: this.page
        }).then(res => {
          this.sum = res.data.data.total;
          this.list = res.data.data.data;
        });
      }
    },
    prev() {
      if (this.page > 1) {
        this.page--;
        this.getList();
      }
    },
    next() {
      if (this.page < this.total) {
        this.page++;
        this.getList();
      }
    },
    //领取福利
    getspreadmoney() {
      console.log(123123, this.token)
      if (this.token) {
        getspreadmoney({
          id: this.id,
        }).then(res => {
          if (res.data.code === 0) {
            this.content = this.$t('领取成功');
            this.showToast = true;
            this.toastType = 0;
            this.getInfo();
            this.getList();
          } else {
            Toast(res.data.msg);
          }
        });
      } else {
        this.content = this.$t('请先登录账号');
        this.showToast = true;
        this.toastType = 2;
      }
    }
  },
  async created() {
     
    this.id = this.$route.query.id;
    this.getDetail();
    this.getInfo();
    this.getList();
  }
};
</script>
