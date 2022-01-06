<template>
  <div class="casino">
    <main class="main">
      <!-- <van-image @click="$router.push('/baccarat')" class="brand" lazy-load :src="require('@assets/img3_0/home/casino/banner@2x.jpg')" /> -->
      <Roadmap
        :canvasHeight="76"
        :defaultVid="vid"
        :cellSize="12"
        :gameData="casinos.filter(item => item.name == 'ag')[0]"
        :type="'casino'"
      />
    </main>

    <div class="games-wrap float-wrap mb-gap">
      <div class="game-item"
        v-for="item in casinos"
        :key="item.name"
        :class="[item.name, item.name === 'ag' ? 'tall' : '',{'gray-scal':$getGameStatus(item,'真人')}]"
        @click="$playGame(item,'真人')"
      >
        <!-- <img v-lazy="require(`@assets/img3_0/home/casino/${item.thumb}`)"> -->
        <van-image lazy-load :src="item.thumb" />
        <div class="game-info">

          <h3 v-if="$projectname==='10057'">
            {{ item.title?$t(item.title):$t(item.name) }}
            <span v-show="$getGameStatus(item,'真人')">(维护中)</span>
          </h3>
          <h3 v-else>
            {{ $t(item.title) }}
            <span v-show="$getGameStatus(item,'真人')">(维护中)</span>
          </h3>
          <p  v-for="(d, index) in item.desc" :key="index">{{ $t(d) }}</p>
          <template v-if="!item.desc.length&&item.title=='eBET'">
            <p>{{$t('首创超级')}}</p>
            <p>{{$t('多台百家乐')}}</p>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Roadmap from '@/components/roadmap'
import { casinoPlatforms as casinos } from '@/utils/platform'
export default {
  name: 'Casino',
  components: {
    Roadmap
  },
  data () {
    // const casinos = [{
    //   name: 'ag',
    //   thumb: 'ag@2x.png',
    //   title: this.$t('AG平台'),
    //   desc: [this.$t('亚洲市场'), this.$t('占有率第一领导品牌')]
    // }, {
    //   name: 'bbin',
    //   thumb: 'bbin@2x.png',
    //   title: 'BBIN',
    //   desc: [this.$t('最具影响力')), this.$t(this.$t('真人平台')]
    // }, {
    //   name: 'og',
    //   thumb: 'og@2x.png',
    //   title: this.$t('OG平台'),
    //   desc: [this.$t('贴近亚洲')), this.$t(this.$t('文化市场')]
    // }, {
    //   name: 'allbet',
    //   thumb: 'allbet@2x.png',
    //   title: this.$t('ALLBET平台'),
    //   desc: [this.$t('首创超级')), this.$t(this.$t('多台百家乐')]
    // }, {
    //   name: 'sunbet',
    //   thumb: 'sunbet@2x.png',
    //   title: this.$t('SunBet平台'),
    //   desc: [this.$t('互动多合一')), this.$t(this.$t('快感加倍')]
    // }]
    return {
      casinos,
      vid: null
    }
  },
  created () {
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
.main{
  margin: @space-gap 0;
  background: @bg-card-color;
  border-radius: @border-radius-8px;
  .brand{
    width: 100%;
    min-height: 240px;
    /deep/ img{
      display: block;
      width: 100%;
      border-radius: 10px 10px 0 0;
      &[lazy="loading"]{
        height: 240px;
        width: auto;
      }
    }
  }
  .roadmap{
    background-color: @bg-card-color;
    border-radius: 0 0 8px 8px;
  }
}

.float-wrap{
  .game-item{
    // .van-image__img{
    //   border: 2px solid @border-color-base;
    // }
    // border-radius: @border-radius-8px;
    overflow: hidden;
    height: 180px;
    > .van-image{
      // border: 2px solid @border-color-base;
      border-radius: @border-radius-8px;
      /deep/ img[lazy="loading"]{
        height: 180px;
        width: auto;
      }
    }
    &.tall{
      height: 390px;
      > .van-image {
        /deep/ img[lazy="loading"]{
          height: 390px;
          width: auto;
        }
      }
    }
  }
}
</style>
