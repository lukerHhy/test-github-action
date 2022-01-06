<template>
  <div class="newSlots">
    <h2 class="title">
      <span>{{$t('即时游戏')}}</span>
      <i @click="go('/slotsSearch', 0, '')">{{$t('更多')}}</i>
    </h2>
    <div class="top3">
      <div v-for="(item, index) in hotlists" :key="index" v-if="index < 3">
        <van-image :src="item.pic" fit="cover" lazy @click="$playGame(item)" />
        <p>{{ item.name }}</p>
      </div>
    </div>
    <div class="ohters">
      <van-list
        class="games"
        v-model="loading"
        :finished="finished"
        :finished-text="$t('不要滑了，已经到底了！')"
        @load="onLoad"
        :immediate-check="false"
      >
        <template v-if="lists.length">
          <van-cell
            v-for="(item, index) in lists"
            :key="index"
            v-if="index > 2"
          >
            <div class="game-item" slot="default">
              <van-image
                :src="item.pic"
                fit="cover"
                lazy
                @click="$playGame(item)"
              />
              <template v-if="nav && nav.name === 'latest'">
                <span v-if="item.is_new" :class="['tag', 'new']">new</span>
                <span v-else-if="item.is_hot" :class="['tag', 'hot']">hot</span>
              </template>
              <template v-else>
                <span v-if="item.is_hot" :class="['tag', 'hot']">hot</span>
                <span v-else-if="item.is_new" :class="['tag', 'new']">new</span>
              </template>
              <div class="info">
                <h3>
                  <span v-if="getPlatformNameById(item.game_platform_id)">{{
                    getPlatformNameById(item.game_platform_id)
                  }}</span
                  >{{ item.name }}
                </h3>
              </div>
            </div>
          </van-cell>
        </template>
        <template v-else>
          <div class="empty-game">
            <img :src="$imgs['error/kong@2x']" alt="" />
          </div>
        </template>
      </van-list>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { mapState, mapActions } from "vuex";
import { GAME_CATE_ID_SLOTS } from "@/store/types";
import mixins from "@/mixins/chess-slots";
import { getHotGameLists } from "@/api/games";
export default {
  name: "slots",
  data() {
    return {
      loading: false,
      hotlists: [],
    };
  },
  mixins: [mixins],
  created() {
    this.nav = {
      title: this.$t('最热'),
      name: "hot",
    };
    this.pageNo = 1;
    this.loadData(true);
    this.hotLists();
  },
  computed: {
    // ...mapState('games', ['allPlatforms']),
    ...mapState("global", ["dataProfitsRankOriginal"]),
  },
  methods: {
    go(path, i, item) {
      if (i) {
        this.$router.push({ path: path, query: { platform: item.name } });
      } else {
        this.$router.push({ path: path });
      }
    },
    hotLists() {
      let params = {
        game_cate_id: 2,
        page: 1,
        per_page: 1,
      };
      getHotGameLists(params).then((res) => {
        this.hotlists = res.data.data.data;
      });
    },
  },
};
</script>

<style scoped lang="less">
.title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0;
  font-size: 30px;
  color: #fff;
  margin: 28px 0;
  i {
    font-size: 28px;
    color: rgba(255, 255, 255, 0.49);
  }
}
.top3 {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 20px;
  div {
    width: 218px;
    .van-image {
      height: 162px;
      display: block;
      border: 0;
    }
    p {
      text-align: center;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 24px;
      color: #fff;
      margin-top: 20px;
      line-height: 1;
    }
  }
}
div.games.van-list {
  justify-content: space-between;
  .van-cell {
    width: 330px;
    border: 0;
    background: none;
    .game-item .info {
      justify-content: center;
    }
    .van-image {
      height: 230px;
    }
  }
}
</style>