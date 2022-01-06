<template>
  <div id="app" :class="`${language}`">
    <router-view />
    <!-- 底部弹窗 -->
    <template v-if="yaboBoxMiddle || esportBoxMiddle">
      <van-popup
        close-on-popstate
        @closed="popupClosed"
        :class="[
          'custom',
          { topPass: passInput },
          'close-top',
          $route.name === 'agent' ? 'drawer-agent' : '',
        ]"
        v-model="isPopupShow"
        :closeable="$projectname == 10052 || $projectname == 10056 || $projectname == 10055 || $projectname == 10036 ? true : popupShow.idDisplay"
        :position="popupShow.passDisplay && !isCenter ? 'bottom' : 'center'"
        round
        get-container="#app"
      >
        <i class="fanhui"></i>
        <Tips
          v-if="popupShow.tipsDisplay.show"
          :userInfo.sync="userInfo"
          :tipsDisplay="popupShow.tipsDisplay"
        ></Tips>
        <Tel v-if="popupShow.telDisplay" :userInfo.sync="userInfo" />
        <Email v-if="popupShow.emailDisplay" :userInfo.sync="userInfo" />
        <SetCapitalPass
          v-if="popupShow.passDisplay"
          :userInfo.sync="userInfo"
          @changPass="changPass"
        />
        <SetLoginPass v-if="popupShow.loginDisplay" :userInfo.sync="userInfo" />
        <SetPassProblem v-if="popupShow.proDisplay" />
        <VerifyIdentity
          v-if="popupShow.idDisplay"
          ref="verifyIdentity"
          :userInfo.sync="userInfo"
          :routeType.sync="routeName"
          @changPass="changPass"
        />

        <div v-if="!popupShow.hideFooter" class="footer-tips">
          <p>
            {{ $t('遇到问题，联系') }}
            <span id="zs" @click="goKefu">{{ $t("专属客服") }}</span>
          </p>
        </div>

        <div v-if="popupShow.tipsDisplay.type === 2" class="footer-tips">
          <p>
            <span
              @click="
              $router.push({ path: '/help/main' });
              popupClosed();
              "
            >{{ $t("查看新手教程") }}</span>
          </p>
        </div>
      </van-popup>
    </template>
    <template v-else>
      <van-popup
        close-on-popstate
        @closed="popupClosed"
        :class="[
          $route.name === 'agent' ? 'drawer-agent' : '',
          'custom',
          popupShow.customClass,
          {
            topPass: passInput,
            pop2: popupShow.telDisplay || popupShow.passDisplay,
            setPas: popupShow.passDisplay,
          },
        ]"
        v-model="isPopupShow"
        :closeable="!popupShow.idDisplay || popupShow.closeable"
        round
        :position="'bottom'"
        close-icon-position="top-right"
        get-container="#app"
      >
        <i class="fanhui"></i>
        <Tips
          v-if="popupShow.tipsDisplay.show"
          :userInfo.sync="userInfo"
          :tipsDisplay="popupShow.tipsDisplay"
        ></Tips>
        <Tel v-if="popupShow.telDisplay" :userInfo.sync="userInfo" />
        <Email v-if="popupShow.emailDisplay" :userInfo.sync="userInfo" />
        <SetCapitalPass
          v-if="popupShow.passDisplay"
          :userInfo.sync="userInfo"
          @changPass="changPass"
        />
        <SetLoginPass v-if="popupShow.loginDisplay" :userInfo.sync="userInfo" />
        <SetPassProblem v-if="popupShow.proDisplay" />
        <VerifyIdentity
          v-if="popupShow.idDisplay"
          ref="verifyIdentity"
          :userInfo.sync="userInfo"
          :routeType.sync="routeName"
          @changPass="changPass"
        />
        <div v-if="!popupShow.hideFooter" class="footer-tips">
          <p>
            {{ $t('遇到问题，联系') }}
            <span id="zs" @click="goKefu">{{ $t("专属客服") }}</span>
          </p>
        </div>
        <div v-if="popupShow.tipsDisplay.type === 2" class="footer-tips">
          <p>
            <span
              @click="
              $router.push({ path: '/help/main' });
              popupClosed();
              "
            >{{ $t("查看新手教程") }}</span>
          </p>
        </div>
      </van-popup>
    </template>
    <!-- 流水弹窗 -->
    <van-popup
      close-on-popstate
      class="custom flow-popup"
      @closed="flowClosed"
      v-model="isShowFlow"
      closeable
      round
      :close-icon-position="`${$projectname === '10052' ? 'top-right' : 'top-left'}`"
      position="bottom"
      get-container="#app"
    >
      <div class="pop-head">
        <h2>{{ $t("流水稽核") }}</h2>
      </div>
      <div class="pop-body list-cells">
        <div>
          <van-list :finished="finished" :finished-text="$t('没有更多了')" :immediate-check="false">
            <template v-if="rechargeData.length > 0">
              <table v-for="(item, i) in rechargeData" :key="i">
                <thead>
                  <tr>
                    <th>{{ $t("存款/红利金额") }}</th>
                    <th>{{ $t("已达到流水") }}</th>
                    <th>{{ $t("需完成流水") }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{{ item.money }}</td>
                    <td>{{ item.finish_flow_require }}</td>
                    <td>{{ item.unfinish_flow_require }}</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td colspan="4">{{ $t("存款时间") }} {{ item.created_at }}</td>
                  </tr>
                </tfoot>
              </table>
            </template>
            <template v-else>
              <!-- <van-loading size="24px">{{$t('加载中...')}}</van-loading> -->
              <p style="text-align: center">{{ $t("暂无数据") }}</p>
            </template>
          </van-list>
        </div>
      </div>
      <transfer
        :type="isShowFlow"
        v-if="
          wallet && wallet.all_platform_money > 10 && wallet.is_auto_trans !== 1 && $projectname !== '10051'
        "
      />
      <div v-else class="recharge-bottom">
        <div class="btn-group">
          <van-button
            type="primary"
            @click="
            () => {
              $router.push({ path: '/withdraw' });
              isShowFlow = false;
            }
            "
          >{{ $t('继续取款') }}</van-button>
          <van-button @click="isShowFlow = false">
            {{
              $t("暂不取款")
            }}
          </van-button>
        </div>
        <p class="tips">{{ $t("未达到流水强制提款将扣除一定行政费用！") }}</p>
      </div>
    </van-popup>
    <!-- 登录注册 -->
    <van-dialog
      get-container="#app"
      close-on-popstate
      :confirmButtonText="$t('登录/注册')"
      :cancelButtonText="$t('查看新手教程')"
      v-model="noLogin"
      show-cancel-button
      class="noLoginDialogWrap"
      :message="`${$t('为了您更好的体验')}${$t($t($config[$projectname].project))}${$t('游戏，建议您登录后进行游戏')}`"
      @confirm="goLogin"
      @cancel="goTutorial"
    >
      <p slot="title" style="position: relative">
        {{ $t('未登录提醒') }}
        <van-icon style="position: absolute; right: 0" name="cross" @click.stop="crossNologin" />
      </p>
    </van-dialog>
    <!-- 登录弹框 -->
    <van-popup class="login-dialog">
      <LoginModal></LoginModal>
    </van-popup>

    <!-- 每日任务 -->
    <DaliyDuty :isend="isend && userInfo" v-if="!($projectname === '10037')" />
    <template>
      <AppInstall
        v-if="
          siteInfo &&
          $route.name === 'Home' &&
          isLogin &&
          !($projectname === '10037') &&
          !($projectname === '10052')
        "
        :data="siteInfo"
      />
    </template>
    <!-- 新手指引 -->
    <Guide />
    <!-- 每日任务领取红包弹窗 -->
    <RewardPop v-if="showRedBag" />
    <!-- 鼠年活动首页弹窗 -->
    <!-- <MousePop /> -->
    <!--全局通知-->
    <van-overlay :show="GlobalMessage.show" class="overlay">
      <div class="global-message" @click.stop>
        <div class="block" :class="{ failure: GlobalMessage.failure }">
          <div class="title">{{ GlobalMessage.title }}</div>
          <div class="content">{{ GlobalMessage.content }}</div>
          <van-icon
            name="cross"
            class="cross"
            @click.native="readmessage(GlobalMessage.id, GlobalMessage.type)"
          />
        </div>
      </div>
    </van-overlay>

    <!-- 游戏模式转账弹窗 -->
    <TransferPop />
  </div>
</template>

<script>
import * as types from "./store/types";
import { mapActions, mapState } from "vuex";
import Email from "@/components/personalData/email";
import Tips from "@/components/personalData/Tips";
import Tel from "@/components/personalData/idTest";
import DaliyDuty from "@/components/daliy-duty";
// import Guide from "@/components/guide";
import RewardPop from "@/components/rewardPop";
import TransferPop from "@/components/transferPop";
import MousePop from "@/components/mousePop";
import LoginModal from "@/views/yabo-series/10042/login/login";
import transfer from "@/components/transfer";
import { executeScript } from "@/utils/utils";

// import {TelCurrent,EmailCurrent,SetLoginPassCurrent,SetCapitalPassCurrent,SetPassProblemCurrent} from "@/current_project/index"
import { memberupdatetips, readmessage } from "@/api/memberCenter";

let AppInstall = {};
let SetLoginPass = {};
let SetPassProblem = {};
let SetCapitalPass = {};
let VerifyIdentity = {};
AppInstall = require(`@/components/app-install`).default;
SetLoginPass = require("@/components/personalData/setLoginPass").default;
SetPassProblem = require("@/components/personalData/setPassProblem").default;
SetCapitalPass = require("@/components/personalData/setCapitalPass").default;
VerifyIdentity = require("@/components/personalData/verifyIdentity").default;

try {
  var {
    TelCurrent,
    EmailCurrent,
    SetLoginPassCurrent,
    SetCapitalPassCurrent,
    SetPassProblemCurrent,
    VerifyIdentityCurrent
  } = require(`@/current_project/index`);
} catch (e) {
  // console.log(e)
}

let Guide = {};
// let aoMenUi = ['takchun', 'Gdh', 'Js3', 'mgm8', 'Wns1', 'Cod8', 'Xpj28', 'Yh8', 'Yl0', 'ybh']
let aoMenUi = [
  "takchun",
  "10012",
  "10013",
  "mgm8",
  "10006",
  "10011",
  "10007",
  "10009",
  "10010",
  "10008",
  "10021",
  "10034",
];
if (aoMenUi.includes(process.env.VUE_APP_PROJECT_NAME)) {
  Guide = require(`@/components/guide/indexAoMen`).default;
} else {
  Guide = require(`@/components/guide/index`).default;
}
export default {
  name: "App",
  data() {
    return {
      password: "",
      isFirstSetPassword: "",
      passInput: false,
      isPopupShow: false,
      routeName: "",
      GlobalMessage: {
        show: false,
        content: "",
        title: "",
        type: "",
      },
      timer: null,
      oldScrollTop: 0,
      scrollTop: 0,
      isend: true,
      finished: false,
      isShowFlow: false,
      isCenter: process.env.VUE_APP_PROJECT_NAME == 10047 || process.env.VUE_APP_PROJECT_NAME == 10052 || process.env.VUE_APP_PROJECT_NAME == 10056 || process.env.VUE_APP_PROJECT_NAME == 10036 || process.env.VUE_APP_PROJECT_NAME == 10055,
      yaboBoxMiddle: [
        '10024',
        '10022',
        '10023',
        '10025',
        '10060',
        '10026',
        '10027',
        '10028',
        '10029',
        '10064',
        '10059',
        '10033',
        '10063',
        '10036',
        '10042',
        '10043',
        '10038',
        '10053',
        '10054',
        '10052',
        '10056',
        '10055'
      ].includes(process.env.VUE_APP_PROJECT_NAME),
      agBoxMiddle: ["10030", "10061"].includes(
        process.env.VUE_APP_PROJECT_NAME
      ),
      //电竞系列
      esportBoxMiddle: ["10050"].includes(process.env.VUE_APP_PROJECT_NAME),
    };
  },
  components: {
    Email: EmailCurrent || Email,
    Tips,
    Tel: TelCurrent || Tel,
    SetCapitalPass: SetCapitalPassCurrent || SetCapitalPass,
    SetLoginPass: SetLoginPassCurrent || SetLoginPass,
    SetPassProblem: SetPassProblemCurrent || SetPassProblem,
    VerifyIdentity: VerifyIdentityCurrent || VerifyIdentity,
    AppInstall,
    DaliyDuty,
    Guide,
    RewardPop,
    MousePop,
    LoginModal,
    TransferPop,
    transfer,
  },
  created() {
    this.globalAlertMaps = {
      1: this.$t("修改登录密码成功"),
      2: this.$t("修改资金密码成功"),
      3: this.$t("余额充值到账成功"),
      4: this.$t("充值审核被拒"),
      5: this.$t("提现出款操作成功"),
      6: this.$t("提现审核被拒"),
      7: this.$t("红利发放成功"),
      8: this.$t("人工推送站内信"),
      9: this.$t("会员升级通知"),
      10: this.$t("线下充值申请"),
      11: this.$t("充值失败"),
      12: this.$t("提款申请"),
      13: this.$t("注册礼金发放"),
      14: this.$t("修改资料成功"),
      15: this.$t("账户登录通知"),
      16: this.$t("充值红包发放"),
      17: this.$t("系统余额扣减"),
      18: this.$t("会员降级"),
      20: this.$t("游戏平台"),
    };
    // 亚博系-浅色
    const yabos = [
      "10022",
      "10023",
      "10024",
      "10025",
      "10026",
      "10060",
      "10027",
      "10028",
      "10029",
      "10064",
      "10033",
      "10063",
    ];
    // 根据projectname为body添加class名
    if (process.env.VUE_APP_PROJECT_NAME) {
      console.log(process.env.VUE_APP_PROJECT_NAME);
      document.body.classList.add(
        `app-name-${process.env.VUE_APP_PROJECT_NAME}`
      );
      if (yabos.includes(process.env.VUE_APP_PROJECT_NAME)) {
        document.body.classList.add(`app-theme-yabo`);
      }
    }
    // if (this.siteInfo) {
    //   this.favicon(this.siteInfo);
    //   this.loadThirdScript(this.siteInfo);
    // } else {
    //   this.getSiteInfo().then((data) => {
    //     this.favicon(data);
    //     this.loadThirdScript(data);
    //   });
    // }
    // 刷新更新网站数据
    this.getSiteInfo().then((data) => {
      this.favicon(data);
      this.loadThirdScript(data);
    });
    // 加快二级页面的渲染
    if (this.allPlatforms) {
      this.getAllPlatforms();
    }
    if (this.allCates) {
      this.getAllCates();
    }
    // if (!this.gameCatesPlatforms.length) {
    this.getAllGameCatesPlatforms();
    // }
    // 获取默认游戏id
    // if (!this.platformGameIds.length) {
    this.getPlatformGameIds();
    // }
    // 获取默认游戏id
    // if (!this.platformGameIdsv2.length) {
    this.getPlatformGameIdsv2();
    // }
    if (!this.memberLevel.length) {
      this.getMemberLevel();
    }
    if (this.timer) {
      clearInterval(this.timer);
    }
    this.timer = setInterval(this.memberupdatetipsApi, 10000);
  },
  computed: {
    ...mapState("games", [
      "gameCatesPlatforms",
      "allPlatforms",
      "allCates",
      "platformGameIds",
      "platformGameIdsv2",
    ]),
    ...mapState("global", [
      "popupShow",
      "siteInfo",
      "noLogin",
      "showFlow",
      "rechargeData",
      "memberLevel",
      "showRedBag",
      "LoginModal",
    ]),
    ...mapState("users", ["userInfo", "isLogin", "wallet"]),
    language() {
      const lang = window.localStorage.getItem("i18n")
      return lang !== 'zh' ? `en-wrap` : ''
    }
  },
  watch: {
    popupShow: {
      handler(val) {
        if (val.idDisplay) {
          this.$nextTick(() => {
            this.$refs.verifyIdentity.checkUserInfo();
          });
        }
        console.log("val", val.status);
        this.isPopupShow = val.status;
      },
      deep: true,
    },
    showFlow(val) {
      this.isShowFlow = val;
    },
    userInfo: {
      handler(val) {
        if (val) {
          this.password = val.is_pay_password;
          this.isFirstSetPassword = val.is_first_set_pass === 1;
        }
        this.getPlatformGameIdsv2();
      },
      deep: true,
    },
    $route(to, from) {
      this.routeName = to.name;
    },
    GlobalMessage: {
      handler(val) {
        if (val.show) {
          setTimeout(() => {
            this.GlobalMessage.show = false;
            this.readmessage(val.id, val.type);
            window.sessionStorage.setItem("wanquGameAlert", val.type);
          }, 5000);
        }
      },
      deep: true,
    },
    scrollTop(newValue, oldValue) {
      setTimeout(() => {
        if (newValue == window.scrollY) {
          this.oldScrollTop = newValue;
          this.isend = true;
        }
      }, 100);
      if (this.oldScrollTop == oldValue) {
        this.isend = false;
      }
    },
  },
  mounted() {
    this.handleScroll();
  },
  beforeDestroy() {
    // window.removeEventListener('scroll')
    clearInterval(this.timer);
  },
  methods: {
    ...mapActions("games", [
      "getAllGameCatesPlatforms",
      "getAllPlatforms",
      "getAllCates",
      "getPlatformGameIds",
      "getPlatformGameIdsv2",
    ]),
    ...mapActions("global", ["getSiteInfo", "getMemberLevel"]),
    popupClosed() {
      this.$store.dispatch("global/setPopShow", {
        status: false,
      });
    },
    flowClosed() {
      console.log(111);
      this.$store.dispatch("global/setFlow", false);
    },
    closeLogin() {
      this.$store.commit("global/" + types.SET_LOGINPOPUP_SHOW, false);
    },
    goLogin() {
      if (["10042"].includes(process.env.VUE_APP_PROJECT_NAME)) {
        this.$store.commit("global/" + types.SET_LOGINPOPUP_SHOW, true);
      } else {
        this.$router.push({ name: "login" });
      }

      this.$store.commit("global/" + types.SET_NO_LOGIN, false);
    },
    crossNologin() {
      this.$store.commit("global/" + types.SET_NO_LOGIN, false);
    },
    goTutorial() {
      if (
        [
          "10024",
          "10022",
          "10023",
          "10025",
          "10060",
          "10026",
          "10027",
          "10028",
          "10029",
          "10064",
          "10059",
          "10033",
          "10063",
          "10036",
          "10050",
          "10042",
          "10043",
          "10038",
        ].includes(process.env.VUE_APP_PROJECT_NAME)
      ) {
        this.$router.push({ name: "main" });
      } else {
        this.$router.push({ name: "tutorial" });
      }
      this.$store.commit("global/" + types.SET_NO_LOGIN, false);
    },
    changPass(val) {
      this.passInput = val;
    },
    goKefu() {
      // if (this.$route.name === 'agent' ) {
      //   this.$router.push('/newKf')
      // } else {
      this.$openKefu();
      // }
      this.$store.dispatch("global/setPopShow", {
        status: false,
        hideFooter: true,
      });
    },
    favicon(data) {
      const { title, description, h5_logo, icon } = data;
      if (description) {
        window.document.title = `${title}-${description}`;
      } else {
        window.document.title = `${title}`;
      }
      window.localStorage.setItem("h5-logo", h5_logo);
    },
    loadThirdScript(data) {
      this.loadShareInstallScript();
      setTimeout(() => {
        this.loadKefu(data);
      }, 3100);
    },
    loadKefu(data) {
      const search = window.location.search;
      // app嵌入h5的部分，url后面带source=android或者source=ios，不加载客服js
      if (
        search.indexOf("source=android") !== -1 ||
        search.indexOf("source=ios") !== -1
      )
        return;
      // console.log('fsdsfdsfssffsddss')
      const kefuType = (data && data.kf_online_type) || 1;
      const kefuScript = (data && data.h5_kf_js) || "";
      // js弹窗客服
      if (Number(kefuType) === 2 && kefuScript) {
        // console.log('kefuTypekefuTypekefuTypekefuTypekefuType', kefuType, kefuScript);
        setTimeout(() => {
          executeScript(kefuScript);
        }, 1000);
      }
    },
    loadShareInstallScript() {
      var lc = document.createElement("script");
      lc.type = "text/javascript";
      lc.async = true;
      lc.src =
        (document.location.protocol === "https:" ? "https://" : "http://") +
        "www.shareinstall.com.cn/js/page/jshareinstall.min.js";
      var s = document.getElementsByTagName("script")[0];
      s.parentNode.insertBefore(lc, s);
    },
    memberupdatetipsApi() {
      if (this.isLogin) {
        const isGameAlert = window.sessionStorage.getItem("wanquGameAlert");
        memberupdatetips(this.data).then((res) => {
          if (res.data.code === 0) {
            if (
              res.data.data &&
              res.data.data.type != 16 &&
              res.data.data.type != 9 &&
              !res.data.data["switch"]
            ) {
              if (
                (res.data.data.type === 20 && !isGameAlert) ||
                res.data.data.type !== 20
              ) {
                if (res.data.data.content.indexOf(this.$t("红包雨")) == -1) {
                  this.GlobalMessage = {
                    show: true,
                    content: res.data.data.content,
                    title: `${this.globalAlertMaps[res.data.data.type]} ${this.$t('提示')}`,
                    failure: [4, 6, 11, 18].indexOf(res.data.data.type) > -1,
                    id: res.data.data.id,
                    type: res.data.data.type,
                  };
                }
              }
              setTimeout(() => {
                if (this.GlobalMessage.show === true) {
                  this.readmessage(res.data.data.id, res.data.data.type);
                  if (
                    [3, 4, 5, 6, 7, 11, 13, 16].indexOf(res.data.data.type) !=
                    -1
                  ) {
                    this.$store.dispatch("users/getWallet");
                  }
                }
              }, 5000);
            }
          } else {
            this.$toast(res.data.msg);
          }
        });
      }
    },
    readmessage(id, type) {
      this.GlobalMessage.show = false;
      readmessage({
        id,
      }).then((res) => {
        if (res.data.code === 0) {
          this.$store.dispatch("users/getUserInfo");
          window.sessionStorage.setItem("wanquGameAlert", type);
        } else {
          this.$toast(res.data.msg);
        }
      });
    },
    handleScroll() {
      window.addEventListener("scroll", () => {
        this.scrollTop = window.scrollY;
      });
    },
  },
};
</script>
<style lang="less">
// @import "~@assets/styles/agent/fix-style.less";
</style>
<style lang="less" scoped>
@import "~@assets/styles/App/index.less";

#app {
  min-height: 100%;
  // overflow: auto;
  // -webkit-overflow-scrolling: touch;
  font-size: 24px;
  // .van-popup.custom1 {
  // background: none;
  // width: 630px;
  // display: flex;
  // flex-direction: column;
  // background: none;
  // justify-content: center;
  // .van-password-input li {
  //   background: #EDEFF6;
  // }
  // .input .forgetPass{
  //   display: block;
  //   margin-top: 30px;
  //   margin-bottom: 90px;
  //   font-size: 28px;
  //   font-family: PingFangSC-Regular, PingFang SC;
  //   font-weight: 400;
  //   color: #666666;
  // }
  // .footer-tips {
  //   margin: 60px auto;
  //   p {
  //     font-size: 28px;
  //     font-family: PingFangSC-Regular, PingFang SC;
  //     font-weight: 400;
  //     color: #999999;
  //     text-align:center;
  //     span {
  //       color: #FF5D38;
  //       border-bottom: 1px solid #FF5D38;
  //     }
  //   }
  // }
  // .close {
  //   width: 100%;
  //   height: 50px;
  //   display: flex;
  //   justify-content: flex-end;
  //   margin-bottom: 30px;
  //   img {
  //     width: 50px;
  //     height: 100%;
  //   }
  // }
  // .pop-head {
  //   background: #fff;
  //   border-radius: 24px 24px 0 0;
  //   padding: 30px 0;
  //   h2 {
  //     text-align: center;
  //     font-size: 36px;
  //     font-family: PingFangSC-Medium, PingFang SC;
  //     font-weight: 500;
  //     color: #333333;
  //   }
  // }
  //   .pop-body {
  //     margin-top: -2px;
  //     z-index: 1;
  //     background: #fff;
  //     .list-cells {
  //       table {
  //         border-radius: 4px;
  //         border: 2px solid #E6EAEF!important;
  //         tr th{
  //           background: #EDEFF6;
  //           border: 2px solid #fff;

  //         }
  //       }
  //     }
  //     .pay-mark {
  //       padding: 30px 0;
  //     }
  //     .ui-buttons, .btn {
  //       display: flex;
  //       justify-content: space-around;
  //       align-items: center;
  //       margin-bottom: 30px;
  //       margin-top: 30px;
  //       button {
  //         border: 1px solid #FF5D38;
  //         width: 270px!important;
  //         margin: 0;
  //       }
  //     }
  //   }
  //   .recharge-bottom {
  //     margin-top: -2px;
  //     z-index: 1;
  //     background: #fff;
  //     border-radius: 0 0 24px 24px;
  //     display: flex;
  //     flex-direction: column;
  //     justify-content: center;
  //     align-items: center;
  //     .btn-group {
  //       width: 100%;
  //       display: flex;
  //       justify-content: space-around;
  //       align-items: center;
  //       button {
  //         border: 1px solid #FF5D38;
  //         width: 270px!important;
  //       }
  //     }
  //     .tips {
  //       margin: 40px 0;
  //       font-size: 28px;
  //       font-family: PingFangSC-Regular, PingFang SC;
  //       font-weight: 400;
  //       color: #999999;
  //     }
  //   }
  // }
}

.drawer-agent {
  background: #282828 !important;

  .footer-tips {
    color: #4f4d49;

    #zs {
      color: #fff !important;
    }
  }

  .custom .footer-tips span {
    color: #fff !important;
  }
}

.topPass {
  transition: all 1s;
  height: 70%;
}

.pop-body {
  flex: 1;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;

  table {
    border-radius: 4px;
    // border: 2px solid #E6EAEF;
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 30px;

    thead {
      tr {
        // background: #EDEFF6;
        border-radius: 4px;

        th {
          font-size: 24px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #666;
          border: 2px solid #333;
          width: 25%;
          line-height: 96px;
        }
      }
    }

    tbody {
      tr {
        td {
          text-align: center;
          line-height: 100px;

          border: 2px solid #333;
          font-size: 32px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #666;
          // border-top: 2px solid rgba(53, 52, 53, 1);
          // border-right: 2px solid rgba(53, 52, 53, 1);
          // border-bottom: 2px solid rgba(53, 52, 53, 1);
          &:nth-child(4) {
            border-right: 0;
          }
        }
      }
    }

    tfoot {
      tr {
        td {
          text-align: center;
          font-size: 24px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #666666;
          line-height: 80px;
        }
      }
    }
  }
}

.recharge-bottom {
  padding: 0 @space-gap;

  .tips {
    font-size: 32px;
    color: #999;
    text-align: center;
    line-height: 44px;
    margin-top: 30px;
    margin-bottom: 30px;
  }

  .btn-group {
    .van-button {
      margin-top: 40px;
    }

    .van-button--default {
      background: @bg-card-color;
      border: 2px solid @border-color-base;
    }
  }
}

/deep/ .shrink{
      transform: scale(0.8) translate(0,0);
      transform-origin: center center;
      position: relative;
      display: inline-block;
      top:0;
      line-height: 1 !important;

}
/deep/ .pr{
  position:relative;
  display:flex;
  align-items:center;
  justify-content:center;
  height:100%;
}

// .custom{
//   transition:all 1s;
// }
/deep/ .van-tabs {
  .van-tabs__nav {
    background-color: transparent;
    // background: @bg-color;
    .van-tab {
      color: #ccc;
    }

    .van-tab--active {
      color: #fff;
    }
  }
}

/deep/ .m-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  // .van-icon-arrow-left{
  //   font-size: 24px;
  // }
  &.van-nav-bar {
    background: @bg-color;
    // height: @height-nav-bar;
    .van-nav-bar__left {
      .van-icon-arrow-left {
        font-size: 32px;
      }
    }

    .van-nav-bar__right {
      .van-nav-bar__text {
        margin-right: 0;
      }
    }
  }

  &.transparent {
    background: transparent;
  }

  ~ .m-body {
    top: @height-nav-bar;
  }
}

/deep/ .m-body {
  // position: fixed;
  // left: 0;
  // right: 0;
  // top: 0;
  // bottom: 0;
  // overflow: auto;
  color: #fff;
  padding-top: @height-nav-bar;
  padding-bottom: @height-nav-bar;
  -webkit-overflow-scrolling: touch;
  // z-index: 2;
  &.gap {
    padding: @space-gap;
  }
}

/deep/ .m-footer {
  ~ .m-body {
    bottom: @height-nav-bar;
  }
}

/deep/ .custom {
  display: flex;
  flex-direction: column;

  .pop-body {
    flex: 1;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
  }
}

.overlay {
  z-index: 999 !important;
}

.global-message {
  display: flex;
  align-items: flex-start;
  padding-top: 50px;
  box-sizing: border-box;
  justify-content: center;
  height: 100%;

  .block {
    position: relative;
    padding: 16px 20px;
    box-sizing: border-box;
    width: 690px;
    height: 100px;
    background: @primary-color;
    box-shadow: 0px 8px 20px 0px rgba(0, 0, 0, 0.3);
    border-radius: 8px;

    .title {
      height: 34px;
      font-size: 24px;
      font-weight: 600;
      color: #191919;
      line-height: 34px;
    }

    .content {
      margin-top: 6px;
      height: 28px;
      font-size: 20px;
      font-weight: 400;
      color: #191919;
      line-height: 28px;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
    }

    .cross {
      font-size: 30px;
      color: #191919;
      top: 35px;
      position: absolute;
      right: 24px;
    }
  }

  .failure {
    background-color: #c55055;

    .title {
      color: #ffffff;
    }

    .content {
      color: #ffffff;
    }

    .cross {
      color: #ffffff;
    }
  }
}
</style>

