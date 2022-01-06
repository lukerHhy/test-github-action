<template>
  <div
    class="sports"
    v-if="sportsLists.length"
  >
    <div class="sports-title">
      <div
        v-for="item in games"
        :key="item.text"
        :class="[
          item.text,
          item.text === 'shaba' ? 'large' : '',
          { 'gray-scal': $getGameStatus(item, '体育') },
        ]"
        @click="$playGame(item, '体育')"
      >
        <p class="game-title">
          {{$t(item.title)}}
          <span v-show="$getGameStatus(item, '体育')">(维护中)</span>
        </p>
      </div>
    </div>
    <!-- <div class="recommend-live">
      <div class="recommend-wrap">
        <div class="item" v-for="item in 10">
          <p class="name">
            <img :src="$imgs['home/bet_home_logo_left@2x']" /><span
              >{{$t('利物浦')}}</span
            >
          </p>
          <p class="name">
            <img :src="$imgs['home/bet_home_logo_left@2x']" /><span
              >{{$t('切尔西')}}</span
            >
          </p>
          <p class="time">{{$t('今天')}}</p>
        </div>
      </div>
    </div> -->
    <!-- <van-list
      class="live-item"
      v-model="loading"
      :finished="finished"
       :finished-text="$t('没有更多了')"
      @load="onLoadSports"
      :immediate-check="false"
    >
      <template v-if="sportsLists.length">
        <div class="live-item" v-for="(item, index) in sportsLists">
          <div class="title">
            <p><i></i>{{ item.league.league_name }}</p>
          </div>
          <div class="content">
            <div class="info">
              <p class="name">
                {{ item.home_team
                }}<i v-if="item.home_score">{{ item.home_score }}</i>
              </p>
              <p class="name">
                {{ item.away_team
                }}<i v-if="item.away_score">{{ item.away_score }}</i>
              </p>
              <p class="time">{{ item.remind }}</p>
            </div>
          </div>
        </div>
      </template>
    </van-list> -->

    <div
      class="live-item"
      v-for="(item, index) in sportsLists"
      :key="index"
    >
      <div class="title">
        <p><i></i>{{ item.league.league_name }}</p>
      </div>
      <div
        class="content"
        @click="$playGame(sport, '体育')"
      >
        <div>
          <div class="info">
            <p class="name">
              {{ item.home_team }}<i>{{ item.home_score }}</i>
            </p>
            <p class="name">
              {{ item.away_team }}<i>{{ item.away_score }}</i>
            </p>
          </div>
          <p class="comp-time">{{ item.match_time }}</p>
        </div>
        <van-icon
          name="arrow-up"
          v-if="!item.show"
          @click.stop="showDet(item, index)"
        />
        <van-icon
          name="arrow-down"
          v-else
          @click.stop="showDet(item, index)"
        />
      </div>
      <p
        class="comp-score"
        v-if="item.show"
      >
        <template v-if="item.odd">
          <span>{{$t('主胜')}}<i>{{ item.odd.home_win }}</i></span>
          <span>{{$t('平局')}}<i>{{ item.odd.home_draw }}</i></span>
          <span>{{$t('主负')}}<i>{{ item.odd.home_lose }}</i></span>
        </template>
        <template v-else>
          <span>{{$t('主胜')}}<i>0.00</i></span>
          <span>{{$t('平局')}}<i>0.00</i></span>
          <span>{{$t('主负')}}<i>0.00</i></span>
        </template>
        <!-- <span v-for="(item02, index02) in item.scroreList" :key="index02"
          >{{ item02.type }} <i>{{ item02.dealPrice }}</i></span
        > -->
      </p>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { GAME_CATE_ID_SPORTS } from "@/store/types";
import { liveIndex, leagueIndex, basketball, football } from "@/api/live";
import { sportsPlatforms as games } from "@/utils/platform";
import { hotGamesSport as gamesSport } from "@/utils/platform";
//import Match from './components/match'
export default {
  name: "Sports",
  components: {
    //    Match
  },
  watch: {
    liveType(n, o) {
      console.log(n);
      this.navActive = n;
      this.allGames(n);
    },
  },
  computed: {
    ...mapState("global", ["liveType"]),
  },
  data() {
    return {
      games,
      gamesSport,
      sportsLists: [],
      cateId: GAME_CATE_ID_SPORTS,
      page: 1,
      reload: true,
      loading: false,
      finished: false,
      isSports: true,
      sport: {
        status: false,
        title: "IM",
        default_game_id: 4223,
        game_platform_id: 117,
        name: "IMSB",
      },
      navActive: 2,
    };
  },
  created() {
    // this.getGameLists();
    this.isSports = true;
    this.allGames(2);
  },
  methods: {
    onLoadSports() {
      if (this.isSports) {
        this.pageNo = 1;
        this.allGames(1);
      }
    },
    showDet(item, idx) {
      let that = this;
      item.show = !item.show;
      that.sportsLists = JSON.parse(JSON.stringify(that.sportsLists));
    },
    // 赛事
    async allGames(id) {
      let that = this;
      liveIndex({
        live_status: 3,
        sort: "live_type desc,match_time asc,id desc",
        live_type: id,
        page_size: 99999999,
        page: this.page,
      }).then((res02) => {
        that.sportsLists = res02.data.data.data;
        res02.data.data.data.map((val, idx) => {
          that.sportsLists[idx].show = true;
          that.sportsLists[idx].scroreList = [];
        });
        that.$toast.clear();
      });
    },
    destroyed() {
      this.isSports = false;
    },
  },
};
</script>

<style lang="less" scoped>
.sports {
  padding-top: 28px;
}
.sports-title {
  height: 82px;
  background: #18926c;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  color: #fff;

  .game-title {
    margin: 0 30px;
  }
}

.live-item {
  width: 100%;

  .title {
    height: 44px;
    background: #a7a7a7;
    display: flex;

    p {
      width: 50%;
      font-size: 24px;
      color: #333333;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: left;

      i {
        width: 6px;
        height: 24px;
        background: #25765c;
        display: inline-block;
        margin-left: 12px;
        margin-right: 10px;
      }
    }

    .pl-title {
      width: 50%;
      display: flex;
      align-items: center;
      justify-content: space-around;

      span {
        display: inline-block;
        color: #333333;
        font-size: 24px;
        font-weight: 400;
      }
    }
  }

  .content {
    display: flex;
    align-items: center;
    background: #666666;
    > div {
      flex: 1;
    }

    .van-icon {
      color: #fff;
      font-size: 28px;
      width: 80px;
      height: 80px;
      text-align: center;
      line-height: 80px;
    }

    .info {
      width: 100%;
      color: #ffffff;

      padding: 8px 24px;
      box-sizing: border-box;
      flex: 1;

      .name {
        line-height: 42px;
        font-size: 24px;

        i {
          float: right;
          color: #fedc00;
        }
      }

      .time {
        font-size: 24px;
        color: #bbbbbb;
        line-height: 42px;
      }
    }

    .pl {
      width: 50%;
      display: flex;
      align-items: center;
      justify-content: space-around;

      p {
        background: #585858;
        color: #fedc00;
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
}
.recommend-live {
  width: 100%;
  overflow-x: scroll;
  .recommend-wrap {
    display: flex;
    .item {
      flex-shrink: 0;
      width: 406px;
      height: 156px;
      background: #666;
      box-sizing: border-box;
      padding: 8px 24px;
      border-right: 1px solid #474747;
      .name {
        height: 42px;
        line-height: 42px;
        display: flex;
        align-items: center;
        justify-content: left;
        margin-bottom: 12px;
        color: #fff;
        img {
          width: 40px;
          height: 40px;
          margin-right: 24px;
        }
      }
      .time {
        color: #bbbbbb;
        font-size: 24px;
        line-height: 40px;
      }
    }
  }
}
.comp-time {
  font-size: 24px;
  color: #bbb;
  background: #666;
  padding: 0 0 20px 24px;
}
.comp-score {
  background-color: #5e5e5e;
  display: flex;
  align-items: center;
  height: 72px;
  span {
    flex: 1;
    color: #d6d6d6;
    text-align: left;
    padding-left: 28px;
    i {
      color: #fedc00;
      padding-left: 28px;
      font-style: normal;
    }
    &:not(:last-child) {
      border-right: 2px solid rgba(255, 255, 255, 0.09);
    }
  }
}
</style>
