<template>
  <div class="washcode" :class="!list.length ? 'empty' : ''">
    <lheader
      :title="title"
      path="111"
      :goback="true"
      @rightClick="$router.push({ path: '/historyRecord',query:{money} })"
       :rightName="$t('历史记录')"
    ></lheader>
    <div class="container">
      <template v-if="yaboUi || $projectname === '10050' || agUi">
        <div class="main" v-if="list.length">
          <div class="wash-money">
            <div class="money">
              <p>￥{{money || '0.00'}}</p>
              <p
                @click="showMsg"
                class="canWash"
              >
                <span>{{$t('可洗码金额')}}</span>
                <van-icon name="question" />
              </p>
            </div>
            <van-button
              type="primary"
              :loading="loading"
              class="btn-wash"
              @click="dowashcode"
            >{{$t('一键洗码')}}</van-button>
          </div>
          <div class="list" v-if="list.length && !isloading">
            <div class="detail">
              <div class="wash" v-for="(item, index) in list" :key="index">
                <div class="wash-top">
                  <div>
                    <p>{{$t('游戏类型')}}</p>
                    <p>{{platforms[item.game_cate_id]}}-{{allPlatforms[item.game_platform_id]}}</p>
                  </div>
                  <div class="flex2">
                    <p>{{$t('投注')}}</p>
                    <p>¥{{item.today_valid_bet}}</p>
                  </div>
                  <div>
                    <p>{{$t('可洗码')}}</p>
                    <p class="primary-color">¥{{item.promotion_money}}</p>
                  </div>
                </div>
                <div class="wash-bottom">
                  <div>
                    <p>{{$t('洗码比例')}}</p>
                    <p>{{ (item.rate*100).toFixed(2) }}%</p>
                  </div>
                  <div class="flex2">
                    <p>{{$t('未结算')}}</p>
                    <p>¥{{item.no_settle_valid_bet}}</p>
                  </div>
                  <div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="main" v-if="list.length">
          <div class="wash-money">
            <div class="money">
              <p>￥{{money || '0.00'}}</p>
              <p
                @click="showMsg"
                class="canWash"
              >
                <span>{{$t('可洗码金额')}}</span>
                <van-icon name="question" />
              </p>
            </div>
            <van-button
              type="primary"
              :loading="loading"
              class="btn-wash"
              @click="dowashcode"
            >{{$t('一键洗码')}}</van-button>
          </div>
          <div class="list" v-if="list.length && !isloading">
            <div class="detail">
              <div class="wash" v-for="(item, index) in list" :key="index">
                <div class="wash-top">
                  <div>
                    <p>{{$t('游戏类型')}}</p>
                    <p>{{platforms[item.game_cate_id]}}-{{allPlatforms[item.game_platform_id]}}</p>
                  </div>
                  <div class="flex2">
                    <p>{{$t('投注')}}</p>
                    <p>¥{{item.today_valid_bet}}</p>
                  </div>
                  <div>
                    <p>{{$t('可洗码')}}</p>
                    <p class="primary-color">¥{{item.promotion_money}}</p>
                  </div>
                </div>
                <div class="wash-bottom">
                  <div>
                    <p>{{$t('洗码比例')}}</p>
                    <p>{{ (item.rate*100).toFixed(2) }}%</p>
                  </div>
                  <div class="flex2">
                    <p>{{$t('未结算')}}</p>
                    <p>¥{{item.no_settle_valid_bet}}</p>
                  </div>
                  <div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>

      <div class="empty" v-if="!list.length && !isloading">
        <div
          class="errorMoney background-image"
          :style="{
            backgroundImage: `url(${require('@assets/img3_0/otherIcon/touzhu@2x.png')})`,
          }"
        ></div>
        <div class="text">
          <div class="chinese">
{{$t('尊敬的用户')}}
            <br />{{$t('当前由于您尚未达到任何游戏种类的洗码结算要求，暂时无法为您洗码，多多游戏才能多多洗码哦~')}}
          </div>
        </div>
      </div>
      <div v-show="siteInfo.auto_wash === 1" class="footer-tips">
        <p>{{$t('温馨提示：系统每天16点自动结算')}}</p>
      </div>
    </div>
    <van-popup
      class="custom"
      v-model="successWash"
      closeable
      round
      close-icon-position="top-left"
      position="bottom"
      @close="close"
      get-container="#app"
    >
      <div class="pop-head">
        <h2>{{$t('自助洗码成功')}}</h2>
      </div>
      <div class="pop-body">
        <div>￥{{money || '0.00'}}</div>
        <p>{{$t('恭喜您自助洗码获得优惠金额')}}</p>
        <div class="btn">
          <van-button
            type="primary"
            @click="$router.push('/memberCenter')"
          >{{$t('前往查看')}}</van-button>
          <van-button @click="close">{{$t('暂不查看')}}</van-button>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import Vue from "vue";
import Lheader from "@/components/l-header";
import { dowashcode, washcodelist } from "@/api/memberCenter";
import { allgamecate } from "@/api/entertainment";
import { Toast } from "vant";
import { mapState } from 'vuex'

Vue.use(Toast);
export default {
  name: "washcode",
  data() {
    return {
      title: this.$t('自助洗码'),
      money: "",
      list: [
        // {
        //   today_valid_bet: "976.00", //当日本轮有效投注额
        //   no_settle_valid_bet: "976.00", //未结算
        //   promotion_money: 4.88, //戏码金额
        //   rate: 0.005, //比例
        //   game_cate_id: 5 //游戏分类
        // },
        // {
        //   today_valid_bet: "976.00", //当日本轮有效投注额
        //   no_settle_valid_bet: "976.00", //未结算
        //   promotion_money: 4.88, //戏码金额
        //   rate: 0.005, //比例
        //   game_cate_id: 5 //游戏分类
        // }
      ],
      platforms: {},
      data: {
        merchant_no: process.env.VUE_APP_MERCHANT_NO,
        access_token: window.localStorage.token,
      },
      loading: false,
      successWash: false,
      isloading: true,
      yaboUi: [
        "10022",
        "10023",
        "10024",
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
        "10043",
        "10042",
        "10038",
      ].includes(process.env.VUE_APP_PROJECT_NAME),
      agUi: ["10030','10061"].includes(process.env.VUE_APP_PROJECT_NAME)
      // washMoney:''
    };
  },
  computed: {
    ...mapState('games', ['allPlatforms']),
    ...mapState('global', ['siteInfo']),
  },
  methods: {
    dowashcode() {
      dowashcode(this.data).then((res) => {
        console.log("quickly wash code", res.data);
        if (res.data.code === 0) {
          this.successWash = true;
        }
        // this.washMoney = res.data.money*1 || 0
      });
    },
    washcodelist() {
      this.$loading();
      washcodelist(this.data).then(
        (res) => {
          if (res.data.code === 0) {
            // console.log('list', res.data)
            const data = res.data.data;
            this.list = data.list;
            this.isloading = false;
            this.money = data.total_money;
            this.$toast.clear();
          }
        },
        (err) => {
          this.$toast.clear();
        }
      );
    },
    getPlatforms() {
      allgamecate(this.data).then((res) => {
        if (res.data.code === 0) {
          this.platforms = res.data.data;
          this.washcodelist();
        }
      });
    },
    showMsg() {
      this.$dialog
        .confirm({
          title: this.$t('温馨提示'),
          message: this.$t('产生有效投注额将可以按照您星级洗码比例赠送红利'),
          showCancelButton: false,
          messageAlign: "center",
          className: "buttonWidth100"
        })
        .then(() => {
          // on confirm
        })
        .catch(() => {
          this.washcodelist();
        });
    },
    close() {
      this.successWash = false;
      this.washcodelist();
    },
  },
  created() {
    this.getPlatforms();
    // this.washcodelist()
  },
  components: {
    Lheader,
  },
};
</script>

<style scoped lang="less">
.van-dialog__confirm{
  width: 100%;
}
.pop-body {
  text-align: center;
  > div {
    font-size: 60px;
    color: #ccc;
  }
  > p {
    font-size: 32px;
    color: #999;
    margin: 30px 0;
  }
  .van-button {
    margin-bottom: 30px;
  }
}
.container {
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  padding-top: @main-top;
  right: 0;
  bottom: @main-top;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  height: 100%;
  .footer-tips {
    color: #666;
    font-size: 24px;
    text-align: center;
    position: absolute;
    bottom: 30px;
    width: 100%;
  }
  .main {
    padding: 0;
    .wash-money {
      height: 324px;
      // background-color: @bg-card-color;
      padding: 0 @margin-20;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .money {
        text-align: center;
        .canWash {
          display: flex;
          align-items: center;
          .van-icon {
            margin-left: 10px;
            color: @primary-text-color;
            font-size: 28px;
          }
        }
        > p:first-child {
          height: 72px;
          font-size: 60px;
          color: rgba(255, 255, 255, 1);
          line-height: 72px;
        }
        > p:last-child {
          height: 34px;
          font-size: 24px;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          line-height: 34px;
          margin-bottom: 40px;
        }
      }
      .btn-wash {
        width: 320px;
        height: 100px;
        line-height: 100px;
        text-align: center;
        background: @primary-color;
        border-radius: 8px;
        font-size: 30px;
      }
    }
    .list {
      padding: 0 @margin-10;
      margin-top: @margin-10;
      .header {
        height: 1.68rem;
        background: rgba(250, 250, 250, 1);
        border-radius: 0rem 0.11rem 0rem 0.11rem;
        text-align: center;
        position: relative;
        &::after {
          .border-bottom;
        }
        /deep/ .van-col {
          font-size: 0.37rem;
          font-weight: 600;
          color: rgba(0, 0, 0, 0.85);
          line-height: 0.56rem;
        }
      }
      .detail {
        // background-color: #ffffff;
        color: rgba(177, 177, 177, 1);
        .wash {
          border-bottom: 2px solid rgba(255, 255, 255, 0.06);
          padding: 40px 0;
          p {
            line-height: 50px;
            font-size: 32px;
          }
          .wash-top {
            display: flex;
            div {
              flex: 1;
              &.flex2 {
                flex: 2;
                margin-right: 30px;
                border-right: 2px solid rgba(255, 255, 255, 0.06);
              }
              p:nth-child(1) {
                color: #666;
              }
              p:nth-child(2) {
                color: #b1b1b1;
              }
              .primary-color {
                color: @primary-color !important;
              }
            }
          }
          .wash-bottom {
            display: flex;
            div {
              flex: 1;
              &.flex2 {
                flex: 2;
              }
              p:nth-child(1) {
                color: #666;
              }
              p:nth-child(2) {
                color: #b1b1b1;
              }
            }
          }
        }
      }
    }
  }
  .empty {
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 690px;
    margin-top: 100px;

    .errorImg {
      width: 224px;
      height: 224px;
      margin: 0 auto;
      margin-top: 2.53333rem;
      background-image: url(~@assets/img3_0/error/empty.png);
      background-repeat: no-repeat;
      background-size: contain;
    }
    .errorMoney {
      width: 200px;
      margin: 0 auto;
      height: 100px;
      background-repeat: no-repeat;
      background-size: contain;
    }
    .text {
      color: #c5cfd6;
      text-align: center;
      .chinese {
        margin-top: 60px;
        font-size: 28px;
        color: #aaaaaa;
        line-height: 48px;
      }
    }
  }
}
</style>
