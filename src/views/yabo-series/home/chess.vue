<template>
  <div class="chess">
    <div class="games-wrap">
      <div
          :class="['large',{'gray-scal':$getGameStatus(item,'棋牌')}]"
          class="game-item"
          v-for="(item, index) in games"
          :key="index"
          @click="$playGame(item,'棋牌')"
      >
        <van-image :src="item.thumb" lazy-load @load="item.loaded = true"/>
        <img :src="$imgs['home/recommend']" class="recommend" alt="" v-show="item.recommend">
        <div class="game-info" v-show="item.loaded">
          <div class="flow-wrapper">
            <img lazy-load :src="$imgs['home/flow-bg']"/>
            <div class="flow">最高返水{{ $getWashRate(item, '棋牌') }}%</div>
          </div>
          <span>
            {{ $t(item.title) }}
            <span v-show="$getGameStatus(item, '棋牌')">(维护中)</span>
          </span>
          <!--          <h3>-->
          <!--            {{ $t(item.title) }}-->
          <!--            <span v-show="$getGameStatus(item,'棋牌')">(维护中)</span>-->
          <!--          </h3>-->
          <!--          <h4><i>{{ item.name.toUpperCase() }} BOARD</i></h4>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {GAME_CATE_ID_CHESS} from '@/store/types'
import {chessPlatforms as games} from '@/utils/platform'

export default {
  name: 'Chess',
  components: {},
  data() {
    return {
      games: games.map(item => ({...item, loaded: false})),
      cateId: GAME_CATE_ID_CHESS
    }
  },
  created() {
  },
  computed: {},
  methods: {}
}
</script>

<style lang="less" scoped>

</style>
