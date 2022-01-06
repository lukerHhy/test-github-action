<template>
  <div class="privilege">
    <div class="privilege-service">
      <p @click="callService">
        <img
          :src="this.$imgs['otherIcon/service']"
          alt=""
        />
        <span>{{$t('客服')}}</span>
      </p>
    </div>
    <van-image
      class="banner"
      :src="this.$imgs['vip/banner@2x']"
    ></van-image>
    <div class="vip-bottom"><span>{{$t('贵宾会员每月进行更新')}}</span></div>
    <div class="vip-level">
      <div class="drag-frame">
        <div class="drag-container">
          <div class="level-badges">
            <template v-for="(item, index) in levelList">
              <div
                :key="index"
                class="level-cell v1-bg"
                :class="'v' + index + '-bg'"
                :style="{ backgroundImage: $bImgs['vip/VIP' + index + '@2x'] }"
                v-if="index > 0 && index < 5"
              >
                <p
                  class="top"
                  v-if="index === 4"
                >{{$t('顶级')}}</p>
                <p
                  class="top"
                  v-else
                >V{{ index }}</p>
                <button
                  class="button button1"
                  @click="$router.push({ path: '/' })"
                >
                  {{$t('立即投注')}}
                </button>
                <p class="bottom">月有效投注额{{ item.valid_bet_money }}万</p>
              </div>
            </template>
            <!-- <div
              class="level-cell v1-bg"
              :style="{ backgroundImage: $bImgs['vip/VIP1@2x'] }"
            >
              <p class="top">V1</p>
              <button
                class="button button1"
                @click="$router.push({ path: "/" })"
              >
{{$t('立即投注')}}
              </button>
              <p class="bottom">{{$t('月有效投注额')}}</p>
            </div>
            <div
              class="level-cell v2-bg"
              :style="{ backgroundImage: $bImgs['vip/VIP2@2x'] }"
            >
              <p class="top">V2</p>
              <button
                class="button button2"
                @click="$router.push({ path: "/" })"
              >
{{$t('立即投注')}}
              </button>
              <p class="bottom">{{$t('月有效投注额')}}</p>
            </div>
            <div
              class="level-cell v3-bg"
              :style="{ backgroundImage: $bImgs['vip/VIP3@2x'] }"
            >
              <p class="top">V3</p>
              <button
                class="button button3"
                @click="$router.push({ path: "/" })"
              >
{{$t('立即投注')}}
              </button>
              <p class="bottom">{{$t('月有效投注额')}}</p>
            </div>
            <div
              class="level-cell v4-bg"
              :style="{ backgroundImage: $bImgs['vip/VIP4@2x'] }"
            >
              <p class="top">{{$t('顶级')}}</p>
              <button
                class="button button4"
                @click="$router.push({ path: "/" })"
              >
{{$t('立即投注')}}
              </button>
              <p class="bottom">{{$t('月有效投注额')}}</p>
            </div> -->
          </div>
          <div class="level-step-bar">
            <ul class="progress">
              <li>
                <van-image
                  class="dian"
                  :src="this.$imgs['vip/dian@2x']"
                ></van-image>
                <p>V1</p>
              </li>
              <li>
                <van-image
                  class="dian"
                  :src="this.$imgs['vip/dian@2x']"
                ></van-image>
                <p>V2</p>
              </li>
              <li>
                <van-image
                  class="dian"
                  :src="this.$imgs['vip/dian@2x']"
                ></van-image>
                <p>V3</p>
              </li>
              <li>
                <van-image
                  class="dian"
                  :src="this.$imgs['vip/dian@2x']"
                ></van-image>
                <p>{{$t('顶级')}}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="vip-rights">
      <div
        class="vip-rights-bg"
        :style="{ backgroundImage: $bImgs['vip/vip-bg'] }"
      ></div>
      <div class="rights-head">
        <div
          class="rights-title-0"
          :style="{ backgroundImage: $bImgs['vip/rights-000'] }"
        ></div>
      </div>
      <div class="rights-content">
        <div
          class="rights-cell"
          @click="showPopIndex = 1"
        >
          <div
            class="close-mode"
            :style="{ backgroundImage: $bImgs['vip/VIP_chuma@2x'] }"
          >
            <p>{{$t('出码服务')}}</p>
          </div>
        </div>
        <div
          class="rights-cell"
          @click="showPopIndex = 2"
        >
          <div
            class="close-mode"
            :style="{ backgroundImage: $bImgs['vip/VIP_call@2x'] }"
          >
            <p>{{$t('专属客服')}}</p>
          </div>
        </div>
        <div
          class="rights-cell"
          @click="showPopIndex = 3"
        >
          <div
            class="close-mode"
            :style="{ backgroundImage: $bImgs['vip/VIP_call@2x'] }"
          >
            <p>{{$t('存款通道')}}</p>
          </div>
        </div>
        <div
          class="rights-cell"
          @click="showPopIndex = 4"
        >
          <div
            class="close-mode"
            :style="{ backgroundImage: $bImgs['vip/VIP_call@2x'] }"
          >
            <p>{{$t('专属域名')}}</p>
          </div>
        </div>
        <div
          class="rights-cell"
          @click="showPopIndex = 5"
        >
          <div
            class="close-mode"
            :style="{ backgroundImage: $bImgs['vip/VIP_call@2x'] }"
          >
            <p>{{$t('定制礼品')}}</p>
          </div>
        </div>
        <div
          class="rights-cell"
          @click="showPopIndex = 6"
        >
          <div
            class="close-mode"
            :style="{ backgroundImage: $bImgs['vip/VIP_call@2x'] }"
          >
            <p>{{$t('品牌特效')}}</p>
          </div>
        </div>
        <div :class="showPopIndex ? 'pops show-pops' : 'pops'">
          <div
            class="pop"
            v-if="showPopIndex === 1"
            :style="{ backgroundImage: $bImgs['vip/VIP_pic1@2x'] }"
          >
            <van-icon
              @click="showPopIndex = 0"
              class="close"
              name="cross"
            />
            <p class="pop-title">{{$t('出码资格')}}</p>
            <p class="pop-content">
              凡是VIP贵宾会会员均有资格申请“VIP贵宾厅出码”服务及高规格接待
            </p>
            <p class="pop-footer">{{$t('本权益需您联系')}}</p>
          </div>
          <div
            class="pop"
            v-if="showPopIndex === 2"
            :style="{ backgroundImage: $bImgs['vip/VIP_pic2@2x'] }"
          >
            <van-icon
              @click="showPopIndex = 0"
              class="close"
              name="cross"
            />
            <p class="pop-title">{{$t('专属客服')}}</p>
            <p class="pop-content">
              优先接听，第一时间告知客户网站优惠 为您提供最专业贴心的客服服务
            </p>
            <p class="pop-footer">{{$t('本权益需您联系')}}</p>
          </div>
          <div
            class="pop"
            v-if="showPopIndex === 3"
            :style="{ backgroundImage: $bImgs['vip/VIP_pic3@2x'] }"
          >
            <van-icon
              @click="showPopIndex = 0"
              class="close"
              name="cross"
            />
            <p class="pop-title">{{$t('存款通道')}}</p>
            <p class="pop-content">
              凡是龙门贵宾会会员均有资格申请“专属存款通道”
              存款更方便、安全、快捷
            </p>
            <p class="pop-footer">{{$t('本权益需您联系')}}</p>
          </div>
          <div
            class="pop"
            v-if="showPopIndex === 4"
            :style="{ backgroundImage: $bImgs['vip/VIP_pic4@2x'] }"
          >
            <van-icon
              @click="showPopIndex = 0"
              class="close"
              name="cross"
            />
            <p class="pop-title">{{$t('专属域名')}}</p>
            <p class="pop-content">{{$t('私人定制域名')}}</p>
            <p class="pop-footer">{{$t('本权益需您联系')}}</p>
          </div>
          <div
            class="pop"
            v-if="showPopIndex === 5"
            :style="{ backgroundImage: $bImgs['vip/VIP_pic5@2x'] }"
          >
            <van-icon
              @click="showPopIndex = 0"
              class="close"
              name="cross"
            />
            <p class="pop-title">{{$t('定制礼品')}}</p>
            <p class="pop-content">{{$t('凡是龙门贵宾会员均可申请')}}</p>
            <p class="pop-footer">{{$t('本权益需您联系')}}</p>
          </div>

          <div
            class="pop"
            v-if="showPopIndex === 6"
            :style="{ backgroundImage: $bImgs['vip/VIP_pic6@2x'] }"
          >
            <van-icon
              @click="showPopIndex = 0"
              class="close"
              name="cross"
            />
            <p class="pop-title">{{$t('品牌特邀')}}</p>
            <p class="pop-content">{{$t('特邀嘉宾可参与尊龙全球品牌活动')}}</p>
            <p class="pop-footer">{{$t('本权益需您联系')}}</p>
          </div>
        </div>
      </div>
      <div class="vip-rule">
        <h3>{{$t('贵宾会说明')}}</h3>
        <ul>
          <li>
            1.龙门贵宾会成员每月更新一次，当月有效投注额计入下月会员等级；
          </li>
          <li>2.龙门贵宾会会籍不可转让；</li>
          <li>3.如贵宾放弃参与所享福利，将不予任何形式折现；</li>
          <li>
            4.本活动的最终解释权归{{ $t($config[$projectname].project) }}所有。
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import VeHistogram from "v-charts/lib/histogram.common";

// import EventApply from './components/EventApply'
import { vipBasicInfo, vipLevelProfile, vipPrivilege } from "@/api/vip";
import { memberlevellist } from "@/api/memberCenter";
import { indexbanner } from "@/api/home";
import {
  GAME_CATE_ID_CASINO,
  GAME_CATE_ID_SLOTS,
  GAME_CATE_ID_FISHING,
  GAME_CATE_ID_LOTTERY,
  GAME_CATE_ID_CHESS,
  GAME_CATE_ID_SPORTS,
  GAME_CATE_ID_ESPORTS,
} from "@/store/types";
import { mapState } from "vuex";

export default {
  name: "Privilege",
  components: {
    // BarChart,
    // VeLine,
    // VeBar,
    VeHistogram,
    // VePie,
    // EventApply
  },
  data() {
    const platforms = [
      {
        game_cate_id: GAME_CATE_ID_CASINO,
        game_cate_name: this.$t('真人'),
      },
      {
        game_cate_id: GAME_CATE_ID_SLOTS,
        game_cate_name: this.$t('电子'),
      },
      {
        game_cate_id: GAME_CATE_ID_FISHING,
        game_cate_name: this.$t('捕鱼'),
      },
      {
        game_cate_id: GAME_CATE_ID_LOTTERY,
        game_cate_name: this.$t('彩票'),
      },
      {
        game_cate_id: GAME_CATE_ID_CHESS,
        game_cate_name: this.$t('棋牌'),
      },
      {
        game_cate_id: GAME_CATE_ID_SPORTS,
        game_cate_name: this.$t('体育'),
      },
      {
        game_cate_id: GAME_CATE_ID_ESPORTS,
        game_cate_name: this.$t('电竞'),
      },
    ];
    return {
      showPopIndex: 0,
      showPopup: false,
      applyTitle: "",
      applyId: 0,
      basicInfo: {
        level: 0,
        level_name: this.$t('新手上路Lv0'),
        week_valid_bet: 0,
        all_valid_bet: 0,
        all_benefit_money: 0,
        next_benefit_money: 0,
        need_valid_bet: 0,
        all_wash_code_money: 0,
      },
      platforms,
      platform: platforms[0],
      privilege1: [],
      privilege2: [],
      rowsCached: {},
      chartData: {
        // labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        columns: ["level", "proportion"],
        // x轴连续数值轴，没用
        // xAxisType: 'value',
        rows: [],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        labelMap: {
          max_money: this.$t('有效投注额'),
          proportion: this.$t('可享受洗码'),
        },
      },
      aoMenUi: ["10009", "10010", "10011", "10012", "10034"],
      levelList: [],
      // chartDataOriginal:
    };
  },
  async created() {
    // this.init();
    // const res = await indexbanner(process.env.VUE_APP_MERCHANT_NO, {
    //   game_cate_id: 1001,
    // });
    // console.log(res);
    memberlevellist().then((res) => {
      if (res.data.code === 0) {
        console.log(res);
        this.levelList = res.data.data;
      }
    });
  },
  computed: {
    ...mapState("users", ["userInfo", "isLogin"]),
  },
  methods: {
    callService() {
      this.$openKefu();
    },
    init() {
      Promise.all([
        this.getVipBasicInfo(),
        this.getVipLevelProfile(),
        // 1 特享 2 权益
        this.getVipPrivilege(1),
        this.getVipPrivilege(2),
      ]);
    },
    getVipBasicInfo() {
      if (this.isLogin) {
        vipBasicInfo().then((res) => {
          if (res.data.code === 0) {
            const { data } = res.data;
            this.basicInfo = data;
            window.sessionStorage.setItem("myVipInfo", JSON.stringify(data));
          }
        });
      }
    },
    getVipLevelProfile() {
      const { rowsCached } = this;
      const { game_cate_id } = this.platform;
      if (rowsCached[game_cate_id]) {
        this.chartData.rows = rowsCached[game_cate_id];
        return;
      }
      vipLevelProfile({
        game_cate_id,
      }).then((res) => {
        if (res.data.code === 0) {
          const rows = res.data.data;
          // const rows = res.data.data.map(x => {
          //   x.level = 'lv' + x.level
          //   return x
          // })
          this.chartData.rows = rows;
          this.rowsCached[game_cate_id] = rows;
        }
      });
    },
    getVipPrivilege(type) {
      vipPrivilege({
        type,
      }).then((res) => {
        if (res.data.code === 0) {
          const { data } = res.data;
          this[`privilege${type}`] = data;
          console.log(this.$t('活动'), this.privilege1);
        }
      });
    },
    onPlatformSelected(item) {
      this.platform = item;
      this.getVipLevelProfile();
    },
    goAnalysis() {
      // console.log(this.chartData,this.basicInfo,this.chartData.rows[this.basicInfo.level-1].proportion)
      if (this.isLogin) {
        this.$router.push({
          name: "analysis",
          query: {
            proportion: this.chartData.rows[this.basicInfo.level - 1]
              ? this.chartData.rows[this.basicInfo.level - 1].proportion
              : 0,
          },
        });
      } else {
        this.$router.push({ name: "login" });
      }
    },
    eventApply(item) {
      if (this.isLogin) {
        if (item.id) {
          this.applyTitle = item.title;
          this.applyId = item.id;
        } else {
          this.applyTitle = "[请后台配置数据] - 测试用活动标题" + item;
          this.applyId = item;
        }
        this.showPopup = true;
      } else {
        this.$router.push({ name: "login" });
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@assets/styles/vip/index.less";

.privilege {
  background-color: #2c2e40;
  height: 100%;
  padding-bottom: 150px;
  .privilege-service {
    display: flex;
    justify-content: flex-end;
    padding: 10px 20px 0;

    p {
      text-align: center;
      font-size: 24px;
      color: #abaeba;

      img {
        width: 48px;
        display: block;
      }
    }
  }

  .banner {
    width: 732px;
    margin: 0 auto;
  }

  .vip-bottom {
    padding-right: 20px;
    margin-top: 20px;
    height: 100px;
    line-height: 100px;
    color: #8e8e93;
    font-size: 24px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -ms-flex-direction: row;
    flex-direction: row;
    -webkit-box-pack: end;
    -ms-flex-pack: end;
    justify-content: flex-end;
    -webkit-box-align: start;
    -ms-flex-align: start;
    align-items: flex-start;
    flex-grow: 1;
    flex-shrink: 0;
  }

  .vip-level {
    height: 530px;

    .drag-frame {
      height: 100%;
      overflow: scroll;

      .drag-container {
        width: fit-content;

        .level-badges {
          padding: 0 30px;
          width: 1920px;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-orient: horizontal;
          -webkit-box-direction: normal;
          -ms-flex-direction: row;
          flex-direction: row;
          -webkit-box-pack: justify;
          -ms-flex-pack: justify;
          justify-content: space-between;
          -webkit-box-align: start;
          -ms-flex-align: start;
          align-items: flex-start;
          -webkit-box-flex: 1;
          flex-grow: 1;
          flex-shrink: 0;

          .top {
            font-size: 60px;
            color: #fff;
            padding-left: 170px;
            padding-top: 52px;
            //font-weight: bold;
          }

          .button {
            display: block;
            width: 240px;
            height: 80px;
            border-radius: 40px;
            border: none;
            margin: 80px auto 0;
            font-size: 28px;
          }

          .bottom {
            font-size: 28px;
            color: #fff;
            margin-top: 84px;
            padding-left: 40px;
          }

          .button1 {
            background: rgba(255, 255, 255, 1);
            color: rgba(51, 51, 51, 1);
          }

          .button2 {
            background: rgba(249, 202, 167, 1);
            color: rgba(125, 77, 52, 1);
          }

          .button3 {
            background: rgba(255, 233, 194, 1);
            color: rgba(186, 141, 69, 1);
          }

          .button4 {
            background: linear-gradient(
              90deg,
              rgba(96, 96, 96, 1) 0%,
              rgba(135, 135, 135, 1) 100%
            );
            color: rgba(255, 255, 255, 1);
          }
        }

        .level-step-bar {
          padding: 36px 0 0 30px;
          height: 90px;
          width: auto;

          li {
            float: left;
            width: 25%;
            position: relative;
            text-align: center;
            color: #fff;
            font-size: 26px;

            .dian {
              width: 28px;
              height: 28px;
            }

            p {
              line-height: 40px;
              font-size: 28px;
            }

            &:first-child:after {
              content: none;
            }

            &:after {
              content: "";
              position: absolute;
              width: 94.5%;
              height: 2px;
              background-color: rgba(142, 142, 147, 0.5);
              top: 12px;
              left: -47%;
              z-index: 1;
            }
          }
        }
      }
    }
  }

  .level-cell {
    height: 400px;
    width: 440px;
    border-radius: 12px;
    background-repeat: no-repeat;
    background-position: 50%;
    background-size: 100% 100%;
  }

  .vip-rights {
    margin-top: 30px;
    position: relative;
    height: 15rem;

    .vip-rights-bg {
      width: 100%;
      height: 100%;
      opacity: 0.2;
      position: absolute;
      top: -0.3rem;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 0;
      background-repeat: no-repeat;
      background-position: 50%;
      background-size: 100%;
    }

    .rights-head {
      height: 260px;
      position: relative;
      z-index: 1;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      -ms-flex-direction: column;
      flex-direction: column;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      justify-content: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      -webkit-box-flex: 1;
      flex-grow: 1;
      flex-shrink: 0;

      .rights-title-0 {
        margin-bottom: 60px;
        width: 400px;
        height: 185px;
        background-repeat: no-repeat;
        background-position: 50%;
        background-size: 100% 100%;
      }
    }

    .rights-content {
      padding: 0 40px 0 40px;
      //height: 3rem;
      -ms-flex-wrap: wrap;
      flex-wrap: wrap;
      align-content: flex-start;
      position: relative;
      z-index: 1;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-orient: horizontal;
      -webkit-box-direction: normal;
      -ms-flex-direction: row;
      flex-direction: row;
      -webkit-box-pack: justify;
      -ms-flex-pack: justify;
      justify-content: space-between;
      -webkit-box-align: start;
      -ms-flex-align: start;
      align-items: flex-start;
      -webkit-box-flex: 1;
      flex-grow: 1;
      flex-shrink: 0;

      .rights-cell {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-direction: column;
        flex-direction: column;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-flex: 0;
        flex-grow: 0;

        .close-mode {
          width: 218px;
          height: 218px;
          background-size: cover;
          margin-bottom: 8px;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-orient: vertical;
          -webkit-box-direction: normal;
          -ms-flex-direction: column;
          flex-direction: column;
          -webkit-box-pack: justify;
          -ms-flex-pack: justify;
          justify-content: space-between;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          -webkit-box-flex: 0;
          flex-grow: 0;

          p {
            color: rgba(216, 216, 216, 1);
            font-size: 28px;
            text-align: center;
            margin-top: 166px;
          }
        }
      }

      .pops {
        width: 100%;
        height: 100%;
        padding: 0 40px 0 40px;
        position: absolute;
        top: 0;
        right: 0;
        opacity: 0;
        transition: 0.5s;
        z-index: -1;

        &.show-pops {
          opacity: 1;
          z-index: 9;
        }

        .pop {
          width: 100%;
          height: 100%;
          background-repeat: no-repeat;
          background-position: 50%;
          background-size: 100% 100%;

          .close {
            font-size: 44px;
            color: #ae7f65;
            background: #fff;
            border-radius: 50%;
            position: absolute;
            right: 60px;
            top: 20px;
          }

          .pop-title {
            color: #fff;
            font-size: 36px;
            text-align: center;
            padding-top: 105px;

            &:after {
              content: "";
              width: 55px;
              height: 2px;
              border-bottom: 1px solid #fff;
              display: inline-block;
              position: relative;
              bottom: 10px;
              right: -22px;
            }

            &:before {
              content: "";
              width: 55px;
              height: 2px;
              border-bottom: 1px solid #fff;
              display: inline-block;
              position: relative;
              bottom: 10px;
              left: -22px;
            }
          }

          .pop-content {
            margin-top: 44px;
            font-size: 28px;
            color: #fff;
            text-align: center;
            line-height: 40px;
          }

          .pop-footer {
            color: rgba(216, 216, 216, 1);
            font-size: 24px;
            text-align: center;
            margin-top: 104px;
          }
        }
      }
    }
    .vip-rule {
      padding: 0 40px 80px 40px;
      margin-top: 100px;
      h3 {
        margin: 0 0 20px 0;
        height: 40px;
        font-size: 28px;
        color: #d19881;
        border-bottom: 1px solid #d19881;
        display: inline-block;
      }
      li {
        font-size: 28px;
        line-height: 48px;
        color: #c7cbda;
        text-align: left;
      }
    }
  }
}
</style>
