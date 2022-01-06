<template>
  <div class="fishing">    
    <div class="games-wrap float-wrap mb-gap">
      <div class="game-item"
        v-for="(item, index) in games"
        :key="index"
        :class="[item.text, item.text === 'ag3d' ? 'tall' : item.text === 'bbin-dr' ? 'large' : '',{'gray-scal':$getGameStatus(item,'捕鱼')}]"
        @click="$playGame(item,'捕鱼')"
      >
        <van-image lazy-load :src="require(`@assets/img3_0/home/fishing/${item.thumb}`)" />
        <div class="game-info">
          <h3>
            {{ $t(item.title) }}
            <span v-show="$getGameStatus(item,'捕鱼')">(维护中)</span> 
          </h3>
          <p v-if="item.name === 'ag3d'" class="tag-p"><van-tag color="#fff" text-color="#2F47A1">{{$t('主推')}}</van-tag></p>
          <p v-for="(d, index) in item.desc" :key="index">{{$t(d)}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { GAME_CATE_ID_FISHING } from '@/store/types'
// import { getGameLists } from '@/api/games'
import { fishingPlatforms as games } from '@/utils/platform'
export default {
  name: 'Fishing',
  data () {
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
      games,
      lists: [],
      cateId: GAME_CATE_ID_FISHING
    }
  },
  created () {
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
.fishing{
  padding-top: 30px;
}
.games-wrap{
  .game-item{
    > .van-image{
      min-height: 180px;
      /deep/ img[lazy="loading"]{
        height: 180px;
        width: auto;
      }
    }
    &.tall{
      > .van-image {
        min-height: 390px;
        /deep/ img[lazy="loading"]{
          height: 390px;
          width: auto;
        }
      }
    }
    &.large{
      > .van-image {
        min-height: 220px;
        /deep/ img[lazy="loading"]{
          height: 220px;
          width: auto;
        }
      }
    }
  }
}
</style>