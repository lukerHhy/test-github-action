<template>
  <div class="lottery">
    <div class="games-wrap float-wrap">
      <div
        class="game-item"
        v-for="(item, index) in games"
        :key="item.text"
        :class="[
          item.text,
          item.text === 'official' ? 'tall' : '',
          { 'gray-scal': $getGameStatus(item, '彩票', index) },
        ]"
        @click="$playGame(item, '彩票', index)"
      >
        <van-image lazy-load :src="item.thumb" />
        <div class="game-info">
          <h3>
            {{$t(item.title)}}
            <span v-show="$getGameStatus(item, '彩票', index)">(维护中)</span>
          </h3>
          <h4>
            <i>{{ item.name.toUpperCase() }} LOTTERY</i>
          </h4>
        </div>
      </div>
    </div>

    <!-- 热门彩种 -->
    <!--<div class="lotteries">-->
    <!--<div class="ui-title">-->
    <!--<h2>{{$t('热门彩种')}}</h2>-->
    <!--</div>-->
    <!--<div class="games-wrap lottery mb-gap">-->
    <!--<div class="game"-->
    <!--v-for="(item,index) in gamesLottery"-->
    <!--:key="index"-->
    <!--:class="{'gray-scal':$getGameStatus(item,'彩票',index+3)}"-->
    <!--@click="$playGame(item,'彩票',index)"-->
    <!--&gt;-->
    <!--<van-image :src="require(`@assets/img3_0/home/lottery/${item.thumb}`)" fit="cover" lazy />-->
    <!--<h3>-->
    <!--{{$t(item.title)}}-->
    <!--<span v-show="$getGameStatus(item,'彩票',index)">{{'(维护中)'}}</span> -->
    <!--</h3>-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
  </div>
</template>

<script>
import { GAME_CATE_ID_LOTTERY } from "@/store/types";
import { hotLottery } from "@/api/games";
// import { lotteryPlatforms as games } from '@/utils/platform'
import { hotLotteryGames as gamesLottery } from "@/utils/platform";
export default {
  name: "Lottery",
  data() {
    const games = [
      {
        default_game_id: 4393,
        game_platform_id: 121,
        text: "official",
        name: "vr",
        thumb: require("@assets/img3_0/home/lottery/official@2x.png"),
        title: this.$t('VR彩票-官方彩'),
        classname: "tall",
        desc: [this.$t('强大的录号系统')), this.$t(this.$t('确保第一时间开奖')],
      },
      {
        default_game_id: 4400,
        game_platform_id: 121,
        text: "mark-six",
        name: "vr",
        thumb: require("@assets/img3_0/home/lottery/mark-six@2x.png"),
        title: this.$t('六合彩'),
        desc: [this.$t('标准/双面玩法')), this.$t(this.$t('各类生肖玩法齐全')],
      },
      {
        default_game_id: 4379,
        game_platform_id: 121,
        text: "vr",
        name: "vr",
        thumb: require("@assets/img3_0/home/lottery/vr@2x.png"),
        title: this.$t('VR彩票'),
        desc: [this.$t('美女主播靓')), this.$t(this.$t('开彩赢')],
      },
      {
        default_game_id: 4421,
        game_platform_id: 122,
        name: "sg",
        text: "sg",
        thumb: require("@assets/img3_0/home/lottery/sg@2x.png"),
        title: this.$t('双赢彩票'),
        desc: [this.$t('以小博大')), this.$t(this.$t('创造双赢')],
      },
      {
        default_game_id: 4338,
        game_platform_id: 120,
        name: "ig",
        text: "ig",
        thumb: require("@assets/img3_0/home/lottery/ig@2x.png"),
        title: this.$t('IG彩票'),
        desc: [this.$t('实现您对彩票')), this.$t(this.$t('的所有期望')],
      },
    ];
    return {
      games,
      gamesLottery,
      lists: [],
      cateId: GAME_CATE_ID_LOTTERY,
    };
  },
  created() {
    this.getLottery();
  },
  methods: {
    getLottery() {
      this.$loading({
        mask: false,
      });
      const { cateId } = this;
      hotLottery({
        game_cate_id: cateId,
      }).then((res) => {
        const { code, data, msg } = res.data;
        if (code === 0) {
          this.lists = data;
          // const lists = []
          // data.data.forEach(item => {
          //   if (item.is_hot && item.pic) {
          //   lists.push(item)
          //   }
          // })
          // this.lists = lists
          this.$toast.clear();
        } else {
          console.log(msg);
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.float-wrap {
  .game-item {
    > .van-image {
      /deep/ img[lazy="loading"] {
        height: 180px;
        width: auto;
      }
    }
    &.tall {
      > .van-image {
        /deep/ img[lazy="loading"] {
          height: 390px;
          width: auto;
        }
      }
    }
  }
}

.lotteries {
  .lottery {
    padding-left: 30px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .game {
    text-align: center;
    float: left;
    width: 25%;
    /deep/ .van-image {
      img {
        border-radius: 8px;
        width: 120px;
        height: 120px;
      }
    }
    h3 {
      text-align: center;
      margin-top: 10px;
      margin-bottom: 30px;
      line-height: 60px;
      font-size: 24px;
    }
  }
}
</style>
