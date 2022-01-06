<template>
  <div class="fishing">
    <div class="games-wrap float-wrap">
      <div class="game-item"
           v-for="(item, index) in games"
           :key="index"
           :class="[item.text, 'large', {'gray-scal':$getGameStatus(item,'捕鱼')}]"
           @click="$playGame(item,'捕鱼')"
           v-if="item.title!=='GG捕鱼天下'"
      >
        <van-image lazy-load :src="require(`@assets/img3_0/home/fishing/${item.thumb}`)" @load="item.loaded = true"/>
        <img :src="$imgs['home/recommend']" class="recommend" alt="" v-show="item.recommend">
        <div class="game-info" v-show="item.loaded">
          <div class="flow-wrapper">
            <img lazy-load :src="$imgs['home/flow-bg']"/>
            <div class="flow">最高返水{{ $getWashRate(item, '捕鱼') }}%</div>
          </div>
          <span>
            {{ $t(item.title) }}
            <span v-show="$getGameStatus(item, '捕鱼')">(维护中)</span>
          </span>
          <!--          <h3>-->
          <!--            {{$t(item.title)}}-->
          <!--            <span v-show="$getGameStatus(item,'捕鱼')">(维护中)</span>-->

          <!--          </h3>-->
          <!--          <h4><i>{{item.name.toUpperCase()}} FISHING</i></h4>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {GAME_CATE_ID_FISHING} from '@/store/types'
// import { getGameLists } from '@/api/games'
import {fishingPlatforms as games} from '@/utils/platform'

export default {
  name: 'Fishing',
  data() {
    // const games = [{
    //   name: 'ag3d',
    //   thumb: 'ag3d@2x.png',
    //   title: this.$t('AG捕鱼王3D'),
    //   desc: [this.$t('顶级渔场，一炮致富')]
    // }, {
    //   name: 'pt',
    //   thumb: 'pt@2x.png',
    //   title: this.$t('PT深海大赢家'),
    //   desc: [this.$t('爆爽捕鱼快感')]
    // }, {
    //   name: 'ag',
    //   thumb: 'ag@2x.png',
    //   title: this.$t('AG捕鱼王'),
    //   desc: [this.$t('四炮同场')), this.$t(this.$t('称霸海洋')]
    // }, {
    //   name: 'bbin2',
    //   thumb: 'bbin2@2x.png',
    //   title: this.$t('BBIN捕鱼大师2'),
    //   desc: [this.$t('万炮齐发')), this.$t(this.$t('一网打尽')]
    // }, {
    //   name: 'bbin',
    //   thumb: 'bbin@2x.png',
    //   title: this.$t('BBIN捕鱼大师'),
    //   desc: [this.$t('打鱼利器')), this.$t(this.$t('一手掌握')]
    // }, {
    //   name: 'bbin-dr',
    //   thumb: 'bbin-dr@2x.png',
    //   title: this.$t('BBIN捕鱼达人'),
    //   desc: [this.$t('多样化技能')), this.$t(this.$t('快感加倍')]
    // }, {
    //   name: 'mw',
    //   thumb: 'mw@2x.png',
    //   title: this.$t('MW千炮捕鱼'),
    //   desc: [this.$t('最高奖金400倍')]
    // }, {
    //   name: 'gg',
    //   thumb: 'gg@2x.png',
    //   title: this.$t('GG捕鱼天下'),
    //   desc: [this.$t('天天捕 天天赢')]
    // }]
    return {
      games: games.map(item => ({...item, loaded: false})),
      lists: [],
      cateId: GAME_CATE_ID_FISHING
    }
  },
  created() {
    // this.getLottery()
  },
  methods: {
    // getLottery () {
    //   this.$loading({
    //     mask: false
    //   })
    //   const { cateId } = this
    //   getGameLists({
    //     game_cate_id: cateId
    //   }).then(res => {
    //     const { code, data, msg } = res.data
    //     if (code === 0) {
    //       const lists = []
    //       data.data.forEach(item => {
    //         if (item.is_hot && item.pic) {
    //         lists.push(item)
    //         }
    //       })
    //       this.lists = lists
    //       this.$toast.clear()
    //     } else {
    //       console.log(msg)
    //     }
    //   })
    // }
  }
}
</script>

<style lang="less" scoped>
.fishing {
  padding-top: 30px;
}

.games-wrap {
  .game-item {
    &:last-child {
      position: absolute;
      width: calc(50% - 87px);
      bottom: 306px;
      right: 30px;
    }

    > .van-image {
      min-height: 180px;

      /deep/ img[lazy="loading"] {
        height: 180px;
        width: auto;
      }
    }

    &.tall {
      > .van-image {
        min-height: 390px;

        /deep/ img[lazy="loading"] {
          height: 390px;
          width: auto;
        }
      }
    }

    &.large {
      > .van-image {
        min-height: 220px;

        /deep/ img[lazy="loading"] {
          height: 220px;
          width: auto;
        }
      }
    }
  }
}
</style>
