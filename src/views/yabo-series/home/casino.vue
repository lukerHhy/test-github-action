<template>
  <div class="casino">
    <div class="games-wrap float-wrap">
      <div class="game-item"
           v-for="item in casinos"
           :key="item.name"
           :class="['large', {'gray-scal':$getGameStatus(item,'真人')}]"
           @click="$playGame(item,'真人')"
           v-if="item.name!=='sunbet'"
      >
        <van-image lazy-load :src="item.thumb" @load="item.loaded = true" />
        <img :src="$imgs['home/recommend']" class="recommend" alt="" v-show="item.recommend">
        <div class="game-info" v-show="item.loaded">
          <div class="flow-wrapper">
            <img lazy-load :src="$imgs['home/flow-bg']"/>
            <div class="flow">最高返水{{ $getWashRate(item, '真人') }}%</div>
          </div>
          <span>
            {{ $t(item.title) }}
            <span v-show="$getGameStatus(item, '真人')">(维护中)</span>
          </span>
          <!--          <h3>-->
          <!--            {{$t(item.title)}}-->
          <!--            <span v-show="$getGameStatus(item,'真人')">(维护中)</span>-->
          <!--          </h3>-->
          <!--          <h4><i>{{item.name.toUpperCase()}} LIVE</i></h4>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Roadmap from '@/components/roadmap'
import {casinoPlatforms as casinos} from '@/utils/platform'

export default {
  name: 'Casino',
  components: {
    Roadmap
  },
  data() {
    return {
      casinos: casinos.map(item => ({...item, loaded: false})),
      vid: null
    }
  },
  created() {
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.main {
  margin: @space-gap 0;
  background: @bg-card-color;
  border-radius: @border-radius-8px;

  .brand {
    width: 100%;
    min-height: 240px;

    /deep/ img {
      display: block;
      width: 100%;
      border-radius: 10px 10px 0 0;

      &[lazy="loading"] {
        height: 240px;
        width: auto;
      }
    }
  }

  .roadmap {
    background-color: @bg-card-color;
    border-radius: 0 0 8px 8px;
  }
}

.float-wrap {
  .game-item {
    border: 2px solid @border-color-base;
    border-radius: @border-radius-8px;
    overflow: hidden;
    height: 180px;

    > .van-image {
      /deep/ img[lazy="loading"] {
        height: 180px;
        width: auto;
      }
    }

    &.tall {
      height: 390px;

      > .van-image {
        /deep/ img[lazy="loading"] {
          height: 390px;
          width: auto;
        }
      }
    }
  }
}
</style>
