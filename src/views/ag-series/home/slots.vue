<template>
  <div class="slots">
    <vtabbar class="m-footer" id="footer-yabo" :index="0"></vtabbar>
    <div class="slots-head">
      <van-nav-bar
        class="m-header"
         :title="$t('更多电子游戏')"
        left-arrow
        @click-left="onClickLeft"
      >
      </van-nav-bar>
      <div class="slots-search-bar">
        <div class="search">
          <SearchTrigger
            :category="cateId"
            :nav="nav"
            :payforline="payforline"
            :platform="platform"
          />
        </div>
        <div class="my-save" @click="mySave">
          <img :src="$imgs['home/slots/more_icon_heart_nomal@2x']" alt="" />
          <span>{{$t('我的收藏')}}</span>
        </div>
      </div>
      <van-sticky>
        <nav class="filter-nav">
          <van-tabs
            v-model="active"
            :color="$colorjs.baseColor"
            line-height="2px"
            :ellipsis="false"
            @change="onTabChange"
            swipeable
          >
            <van-tab
              v-for="item in navs"
              :title="$t(item.title)"
              :key="item.name"
            />
          </van-tabs>
        </nav>
        <div class="filters" v-show="active !== 4">
          <div class="labels platform">
            <div>
              <label
                :class="{ active: !platform }"
                @click="onPlatformClick(null)"
                >{{$t('全部平台')}}</label
              >
              <template v-for="(item, index) in platformsSlot">
                <label
                  v-if="['ALLBET'].indexOf(item.name) === -1"
                  :key="index"
                  :class="{ active: platform && platform.id === item.id }"
                  @click="onPlatformClick(item)"
                  >{{ item.name }}</label
                >
              </template>
            </div>
          </div>
          <div class="labels">
            <label
              :class="{ active: !payforline }"
              @click="onPayforlineClick(null)"
              >{{$t('全部赔付线')}}</label
            >
            <label
              v-for="(val, key) in payforlineData"
              :key="key"
              :class="{ active: key === payforline }"
              @click="onPayforlineClick(key)"
              >{{ val.replace("线", "") }}</label
            >
          </div>
        </div>
      </van-sticky>
    </div>

    <!-- <div class="search-info" v-if="keyword">
      <span>{{ keyword }}</span>{{$t('的搜索结果')}}<span @click="clearSearch">{{$t('全部清除')}}</span>
    </div> -->

    <van-list
      class="games"
      v-model="loading"
      :finished="finished"
      :finished-text="$t('不要滑了，已经到底了！')"
      @load="onLoad"
      :immediate-check="false"
    >
      <template v-if="lists.length">
        <van-cell v-for="(item, index) in lists" :key="index">
          <div class="game-item" slot="default">
            <div
              class="item-image"
              :style="{ backgroundImage: `url(${item.pic})` }"
              @click="$playGame(item)"
            ></div>
            <div class="item-info">
              <div class="info">
                <h3>{{ item.name }}</h3>
                <span class="action">
                  <!-- <van-icon @click="doFavorite(item.id,index)" name='like' :color="item.is_favorite === 2 ? '#e8e9eb':'#9a5dff'" /> -->
                  <van-icon
                    @click="doFavorite(item.id, index)"
                    :name="
                      item.is_favorite === 2
                        ? 'like-o'
                        : token
                        ? 'like'
                        : 'like-o'
                    "
                  />
                </span>
              </div>
              <div class="info-bot">
                <!--                <template v-if="nav && nav.name === 'latest'">-->
                <!--                  <span v-if="item.is_new" :class="['tag', 'new']">new</span>-->
                <!--                  <span v-else-if="item.is_hot" :class="['tag', 'hot']">hot</span>-->
                <!--                </template>-->
                <!--                <template v-else>-->
                <!--                  <span v-if="item.is_hot" :class="['tag', 'hot']">hot</span>-->
                <!--                  <span v-else-if="item.is_new" :class="['tag', 'new']">new</span>-->
                <!--                </template>-->
                <span v-if="getPlatformNameById(item.game_platform_id)">{{
                  getPlatformNameById(item.game_platform_id)
                }}</span>
                <button @click="$playGame(item)">{{$t('立即游戏')}}</button>
              </div>
            </div>
          </div>
        </van-cell>
      </template>
      <template v-else>
        <div class="empty-game">
          <img src="@assets/img3_0/error/kong@2x.png" alt="" />
        </div>
      </template>
    </van-list>
    <!-- <GameSearch v-if="gameSearch && gameSearch.visible" @result="showResult" /> -->
  </div>
</template>

<script>
import Vue from "vue";
import { mapState, mapActions } from "vuex";
import { GAME_CATE_ID_SLOTS } from "@/store/types";
import RankSwipe from "./rank-swipe";
// import GameSearch from '../../components/search/search'
import { jackpots, getpayforline, getplatformgameidsv2 } from "@/api/games";

import mixins from "@/mixins/chess-slots";
import Vtabbar from "../components/v-tabbar";
import VueCountUp from "vue-countupjs";
Vue.use(VueCountUp);

export default {
  name: "Slots",
  mixins: [mixins],
  props: ["slotsType"],
  components: {
    RankSwipe,
    Vtabbar,
    // GameSearch
  },
  data() {
    const navs = [
      {
        title: this.$t('全部'),
        name: "",
      },
      {
        title: this.$t('最热'),
        name: "hot",
      },
      {
        title: this.$t('最新'),
        name: "latest",
      },
      {
        title: this.$t('奖金池'),
        name: "reward",
      },
      // , {
      //   title: this.$t('我的收藏'),
      //   name: 'fav'
      // }
    ];
    return {
      navs,
      payforlineData: null,
      payforline: 0,
      cateId: GAME_CATE_ID_SLOTS,
      jackpotSettings: {},
      decimals: 2,
      duration: 10000000,
      projectName: process.env.VUE_APP_PROJECT_NAME,
      platformsSlot: [],
      // aoMenUi:['takchun','Gdh','Js3','Mgm8','Wns1','Cod8','Xpj28','Yh8','Yl0','ybh']
      aoMenUi: [
        "takchun",
        "10012",
        "10013",
        "10014",
        "10020",
        "mgm8",
        "10006",
        "10011",
        "10007",
        "10009",
        "10010",
        "10008",
        "10018",
        "10019",
        "10034",
        "10057",
      ],
    };
  },
  created() {
    this.init();
    this.getJackpots();
    !this.dataProfitsRankOriginal && this.getProfitsRank();
    this.getpayforline();
    this.getPlatFormSlot();
  },
  computed: {
    // ...mapState('games', ['allPlatforms']),
    ...mapState("global", ["dataProfitsRankOriginal"]),
    winnerlists() {
      const { dataProfitsRankOriginal } = this;
      if (!dataProfitsRankOriginal) {
        return [];
      }
      return dataProfitsRankOriginal[1] ? dataProfitsRankOriginal[1].list : [];
    },
  },
  watch: {
    payforline() {
      this.pageNo = 1;
      this.loadData(true);
    },
    slotsType() {
      this.loadData();
    },
  },
  methods: {
    mySave() {
      // this.active=3;
      // this.onTabChange(3,this.$t('我的收藏'))
      this.nav = {
        title: this.$t('我的收藏'),
        name: "fav",
      };
      this.pageNo = 1;
      this.loadData(true);
    },
    onClickLeft() {
      this.$router.push({
        path: "/",
      });
    },
    async getPlatFormSlot() {
      const { cateId } = this;
      const { data } = await getplatformgameidsv2();
      data.data.map((item) => {
        if (item.game_cate_id == cateId) {
          this.platformsSlot =
            item.list_data.filter((item) => item.status === 1) || [];
        }
      });
    },
    getJackpots() {
      const { decimals, duration } = this;
      jackpots().then((res) => {
        const { code, data, msg } = res.data;
        if (code === 0) {
          const jackpot = data[1].pot_money;
          this.jackpotSettings = {
            startVal: jackpot,
            endVal: jackpot * 2,
            duration,
            decimals,
          };
        } else {
          console.log(msg);
        }
      });
    },
    getpayforline() {
      getpayforline().then((res) => {
        const { code, data, msg } = res.data;
        if (code === 0) {
          this.payforlineData = data;
        } else {
          console.log(msg);
        }
      });
    },
    onPayforlineClick(payforline) {
      this.payforline = payforline;
    },
  },
};
</script>

<style lang="less" scoped>
.slots {
  background: #18181c;
  min-height: 100%;
  /deep/ .m-header.van-nav-bar {
    background: none !important;
  }
}
.jackpot {
  position: relative;
  margin: @space-gap 0;
  width: 688px;
  height: 156px;
  background-image: url("~@assets/img3_0/home/slots/jackpot-bg@2x.png");
  background-size: contain;
  background-repeat: no-repeat;
  .bg {
    display: block;
    width: 100%;
    // box-shadow: 0 20px 20px 0 rgba(@primary-color, .3);
  }
  .light,
  .light2 {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
  }
  .light2 {
    animation: fade 1s linear infinite forwards;
  }
  // .light{
  //   animation: fade 2s 1s linear infinite forwards;
  // }
  .jackpot-text {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    padding: @space-gap;
    pointer-events: none;
    text-align: center;
    h3 {
      color: @primary-color;
      font-size: 44px;
      margin: 0 0 15px;
      dfn {
        font-style: normal;
      }
    }
    p {
      font-size: 24px;
      color: #ccc;
    }
  }
}

.filters {
  padding-top: 20px;
}
.labels {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: flex-start;
  padding-bottom: @space-gap;
  margin: 0 30px;
  &.platform {
    display: block;
    overflow-x: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
    > div {
      display: flex;
      float: left;
      min-width: 100%;
      label {
        &:first-child {
          min-width: 180px;
        }
        min-width: 40px;
        text-align: center;
      }
    }
  }
  label {
    width: auto;
    padding: 0 @space-gap;
    line-height: 56px;
    color: #ccc;
    border-radius: 8px;
    font-size: 24px;
    border: 2px solid transparent;
    &.active {
      color: @primary-color;
      border-color: @primary-color;
      font-weight: 500;
    }
  }
}
@keyframes fade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.winner-lists {
  width: 100%;
  margin-bottom: @space-gap;
}
.search-trigger {
  .van-icon {
    color: @primary-color;
  }
  color: #fff !important;
}
.filter-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .van-tabs {
    flex: 1;
  }

  .search-trigger {
    width: 150px;
  }
}
.slots-head,
/deep/ .van-sticky--fixed {
  background: linear-gradient(134deg, #0d2235 0%, #47362e 100%);
}

.m-header {
  position: relative;
}
.slots-search-bar {
  display: flex;
  align-items: center;
  padding: 0 20px;
  .search {
    width: 470px;
    height: 76px;
    /deep/ .search-trigger {
      height: 76px;
      background-color: rgba(255, 255, 255, 0.2);
      justify-content: flex-start;
      padding-left: 30px;
      border-radius: 8px;
      position: relative;
      span {
        color: rgba(255, 255, 255, 0.2);
      }
      .van-icon-search {
        position: absolute;
        right: 22px;
        color: #abaeba;
      }
    }
  }
  .my-save {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32px;
    color: #fff;
    flex: 1;
    img {
      width: 40px;
      margin-right: 8px;
    }
  }
}
.games.van-list {
  .van-cell {
    background-color: transparent;
    padding: 0 40px;
  }
  .game-item {
    display: flex;
    align-items: center;
    .item-image {
      width: 124px;
      height: 124px;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      margin-right: 28px;
      border-radius: 20px;
      overflow: hidden;
    }
    .item-info {
      flex: 1;
      height: 172px;
      border-bottom: 2px solid @border-color;
      .info {
        display: flex;
        align-items: center;
        color: #fff;
        font-size: 32px;
        line-height: 1.5;
        padding: 20px 0 24px 0;
        h3 {
          margin: 0 16px 0 0;
          font-size: 32px;
        }
        .action {
          font-size: 38px;
          line-height: 1;
        }
      }
      .info-bot {
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;
        height: 68px;
        > span {
          width: 118px;
          height: 56px;
          background: #3e3f48;
          border-radius: 28px;
          font-size: 24px;
          color: #999;
          text-align: center;
          line-height: 56px;
        }
        button {
          position: absolute;
          right: 0;
          bottom: 10px;
          width: 190px;
          height: 68px;
          border-radius: 68px;
          background: none;
          color: @primary-color;
          font-size: 24px;
          border: 2px solid @primary-color;
        }
      }
    }
  }
}
/deep/ .van-tab--active span {
  color: @primary-color;
  font-weight: bold;
}
.empty-game {
  text-align: center;
  padding-top: 10vh;
  img {
    width: 20%;
  }
}
</style>
