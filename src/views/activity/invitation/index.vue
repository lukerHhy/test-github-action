<template>
  <div id="invitation">
    <lheader v-if="!$route.query.source" :title="title" :goback="true"></lheader>
    <div class="container" :class="{ 'no-header': !!$route.query.source }">
      <div>
        <div class="top">
          <!-- 领取福利 -->
          <div class="receive">
            <div class="receiveNum">
              <div>
                <div class="left fl">{{$t('已领取福利')}}</div>
                <div class="right fr">{{ detail.has_get_benefits }}</div>
              </div>
              <div>
                <div class="left fl">{{$t('待领取福利')}}</div>
                <div class="right active fr">{{ detail.no_get_benefits }}</div>
              </div>
            </div>
            <div class="immediately" @click="getspreadmoney">
              <p>{{$t('立即')}}</p>
              <p>{{$t('领取')}}</p>
            </div>
          </div>
          <!-- 累计邀请好友 -->
          <div class="cumulative">
            <div>
              <p>{{$t('累计邀请好友')}}</p>
              <p>{{ detail.invit_users }}</p>
            </div>
            <div>
              <p>{{$t('累计福利礼金')}}</p>
              <p>{{ detail.total_benefits }}</p>
            </div>
          </div>
          <!-- 我的专属好友邀请链接和推广码 -->
          <div class="code">
            <p>{{$t('我的专属好友邀请链接')}}</p>
            <div class="clickToGet">
              <p
                @click="
                  copy(
                    $event,
                    `${detail.spread_url}?code=${detail.spread_code}`
                  )
                "
              >
                {{ detail.spread_url }}?code={{ detail.spread_code }}
              </p>
              <!-- <p @click="goOther(detail)">{{detail.spread_url}}?code={{detail.spread_code}}</p> -->
            </div>
          </div>
        </div>
        <!-- 我的好友，邀请规则 -->
        <div class="list">
          <div class="title">
            <div
              class="goodfriend"
              :class="{active: activeTab === 0}"
              @click="activeTab = 0"
            >
{{$t('我的好友')}}
            </div>
            <div
              class="rules"
              :class="{active: activeTab === 1}"
              @click="activeTab = 1"
            >
{{$t('邀请规则')}}
            </div>
          </div>
          <!-- 我的好友内容 -->
          <div class="goodfriendContent" v-if="activeTab === 0">
            <p class="top">< 邀请好友明细></p>
            <!-- <div class="time">
              <div>
                <p>{{$t('开始时间')}}</p>
                <div>2019/07/06</div>
              </div>
              <div>
                <p>{{$t('结束时间')}}</p>
                <div>2019/07/06</div>
              </div>
            </div>
            <div class="query">{{$t('查询')}}</div>-->
            <table>
              <tr class="title">
                <th>{{$t('日期')}}</th>
                <th>{{$t('好友账号')}}</th>
                <th>{{$t('总投注金额')}}</th>
                <th>{{$t('拉新福利礼金')}}</th>
              </tr>
              <tr v-for="(item, index) in list" :key="index">
                <td>{{ item.start_time }}</td>
                <td>{{ item.new_username }}</td>
                <td>{{ item.valid_bet }}</td>
                <td>{{ item.benefit_money }}</td>
              </tr>
            </table>

            <div class="pagingBtn">
              <div class="previousPage" @click="prev">{{$t('上一页')}}</div>
              <div class="nextPage" @click="next">{{$t('下一页')}}</div>
            </div>
          </div>
          <!-- 邀请规则内容 -->
          <div class="rulesContent" v-if="activeTab === 1">
            <p class="top">&lt;会员等级介绍&gt;</p>
            <table>
              <tr class="title">
                <th>{{$t('会员等级')}}</th>
                <th>{{$t('新手福利')}}</th>
                <th>{{$t('拉新福利')}}</th>
                <th>{{$t('享有时长')}}</th>
              </tr>
              <tr v-for="(item, index) in memberList" :key="index">
                <td>{{ item.name }}</td>
                <td v-if="item.condition">
                  {{ item.condition.new_profite_money }}元额外注册礼金
                </td>
                <td v-if="item.condition">
                  新人投注额 {{ item.condition.get_new_benefit }}
                </td>
                <td v-if="item.condition">{{ item.condition.druing_week }}</td>
              </tr>
            </table>
          </div>
        </div>
        <!-- 邀请流程 -->
        <div class="invitationProcess">
          <p>&lt;邀请流程&gt;</p>
          <div class="lists">
            <div>
              <img src="./assets/Group1.png" alt />
              <p>{{$t('第一步')}}</p>
            </div>
            <img src="./assets/arrow.png" alt />
            <div>
              <img src="./assets/Group2.png" alt />
              <p>{{$t('第二步')}}</p>
            </div>
            <img src="./assets/arrow.png" alt />
            <div>
              <img src="./assets/Group3.png" alt />
              <p>{{$t('第三步')}}</p>
            </div>
          </div>
        </div>
        <!-- 邀请说明 -->
        <div class="rule">
          <P>
            <span>1</span>
            <span>{{$t($config[$projectname].secName)}}所有会员均可享受。</span>
          </P>
          <P>
            <span>2</span>
            <span
              >{{$t('新手福利需要完成')}}</span
            >
          </P>
          <P>
            <span>3</span>
            <span
              >{{$t('新手会员如果已经超过享有时长')}}</span
            >
          </P>
          <P>
            <span>4</span>
            <span
              >{{$t('拉新福利必须是新人在有存款的情况下才计算')}}</span
            >
          </P>
          <P>
            <span>5</span>
            <span
              >{{$t('系统判断单周如果有效拉新人数超过')}}</span
            >
          </P>
          <P>
            <span>6</span>
            <span
              >{{$t('每月系统挑选出有效拉新人数最多的')}}</span
            >
          </P>
          <P>
            <span>7</span>
            <span>
              本优惠活动只限娱乐性质的会员参加，如发现用户拥有超过一个账户，包括同一姓名，同一邮箱，同一/相似IP地址，同一住址，同一银行卡，同一电脑，禁止多开窗口进行投注，软件投注和套免费游戏等其他任何不正常投注行为，
              一经发现我们将保留冻结帐户以及没收所有余额的权利。
            </span>
          </P>
          <P>
            <span>8</span>
            <span>{{$t($config[$projectname].secName)}}拥有最终解析权。</span>
          </P>
        </div>
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
      title: this.$t('推荐好友'),
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
        let list = res.data.data.condition_setting;
        this.memberList = list.map(val => {
          return {
            ...val,
            name: this.memberLevel[val.level].name || ""
          };
        });
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

<style src="./style.less" lang="less" scoped></style>
