<template>
  <div class="lottery">    
    <div class="games-wrap float-wrap">
      <div class="game-item"
        v-for="(item,index) in gamesList"
        :key="index"
        @click="$playGame(item,'彩票')"
        :class="{'gray-scal':$getGameStatus(item,'彩票')}"
      >
        <van-image lazy-load :src="item.thumb" />
      </div>
    </div>

    <!-- 热门彩种 -->
    <div class="lotteries">
      <div class="ui-title">
        <div 
        v-for="(item,index) in cpTypelist"
          :key="index"
          :class="index==curCpType?'active':''" @click="cpTypeChange(index)"
        >
          {{item.text}}
        </div>
      </div>
      <div class="games-wrap lottery mb-gap">
        <div class="game"
          v-for="(item,index) in cpTypelist[curCpType].list"
          :key="index"
          @click="$playGame(item,'彩票')"
          :class="{'gray-scal':$getGameStatus(item,'彩票')}"
        >
          <van-image :src="item.pic" fit="cover" lazy />
          <p class="title_desc">
              {{ item.text }}
            </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { GAME_CATE_ID_LOTTERY } from '@/store/types'
import { hotLottery } from '@/api/games'
import { lotteryPlatforms as games } from '@/utils/platform'
import { hotLotteryGames as gamesLottery } from '@/utils/platform'
export default {
  name: 'Lottery',
  data () {
    const gamesList = [{
      default_game_id: 4409,
      game_platform_id: 121,
      name: "VR",
      thumb: this.$imgs['home/1'],
      title: this.$t('腾讯分分彩'),
      status: '1'
      // desc: [this.$t('强大的录号系统')), this.$t(this.$t('确保第一时间开奖')]
    }, {
      default_game_id: 4393,
      game_platform_id: 121,
      name: "VR",
      thumb: this.$imgs['home/2'],
      title: this.$t('重庆时时彩'),
      status: '1'
      // desc: [this.$t('标准/双面玩法')), this.$t(this.$t('各类生肖玩法齐全')]
    }, {
      name: "VR",
      default_game_id: 4397,
      game_platform_id: 121,
      thumb: this.$imgs['home/3'],
      title: this.$t('北京赛车'),
      status: '1'
      // desc: [this.$t('美女主播靓')), this.$t(this.$t('开彩赢')]
    }]
    // const gamesLottery = [
    //   {
    //     name: this.$t('腾讯分分彩'),
    //     thumb: 'cp_tx@2x.png'
    //   },
    //   {
    //     name: this.$t('重庆时时彩'),
    //     thumb: 'cp_ssc@2x.png'
    //   },
    //   {
    //     name: this.$t('北京赛车'),
    //     thumb: 'cp_sc@2x.png'
    //   },
    //   {
    //     name: this.$t('香港六合彩'),
    //     thumb: 'cp_lhc@2x.png'
    //   },
    //   {
    //     name: this.$t('幸运28'),
    //     thumb: 'cp_xy28@2x.png'
    //   },
    //   {
    //     name: this.$t('幸运飞艇'),
    //     thumb: 'cp_ft@2x.png'
    //   },
    //   {
    //     name: this.$t('VR彩票百家乐'),
    //     thumb: 'cp_vrdjl@2x.png'
    //   },
    //   {
    //     name: this.$t('澳洲幸运彩'),
    //     thumb: 'cp_az@2x.png'
    //   }
    // ]
    return {
      games,
      gamesList,
      gamesLottery,
      lists: [],
      cateId: GAME_CATE_ID_LOTTERY,
      curCpType: 0,
      cpTypelist: [
        {
          text: this.$t('VR彩票'),
          list: [
            {
              text: this.$t('十分彩'),
              pic: this.$imgs['home/位图1'],name: "VR",
              default_game_id:4393,
              platform_id:121
            },
            {
              text: this.$t('重庆时时彩'),
              pic: this.$imgs['home/位图2'],name: "VR",
              default_game_id:4393,
              platform_id:121
            },
            {
              text: this.$t('水星分分彩'),
              pic: this.$imgs['home/位图3'],name: "VR",
              default_game_id:4393,
              platform_id:121
            },
            {
              text: '11选5',
              pic: this.$imgs['home/位图4'],name: "VR",
              default_game_id:4393,
              platform_id:121
            },
            {
              text: this.$t('北京赛车'),
              pic: this.$imgs['home/位图5'],name: "VR",
              default_game_id:4393,
              platform_id:121
            },
            {
              text: this.$t('木星赛车'),
              pic: this.$imgs['home/位图6'],name: "VR",
              default_game_id:4393,
              platform_id:121
            },
            {
              text: this.$t('幸运28'),
              pic: this.$imgs['home/位图7'],name: "VR",
              default_game_id:4393,
              platform_id:121
            },
            {
              text: this.$t('快三'),
              pic: this.$imgs['home/位图8'],name: "VR",
              default_game_id:4393,
              platform_id:121
            },
          ]
        },
        {
          text: this.$t('时时彩'),
          list: [
            {
              text: this.$t('极速时时彩'),
              pic: this.$imgs['home/位图9'],name: "VR",
              default_game_id:4393,
              platform_id:121
            },
            {
              text: this.$t('腾讯分分彩'),
              pic: this.$imgs['home/位图10'],name: "VR",
              default_game_id:4393,
              platform_id:121
            },
            {
              text: this.$t('一份时时彩'),
              pic: this.$imgs['home/位图11'],name: "VR",
              default_game_id:4393,
              platform_id:121
            },
            {
              text: this.$t('三份时时彩'),
              pic: this.$imgs['home/位图12'],name: "VR",
              default_game_id:4393,
              platform_id:121
            },
            {
              text: this.$t('河内五份时时彩'),
              pic: this.$imgs['home/位图13'],name: "VR",
              default_game_id:4393,
              platform_id:121
            }
          ]
        },
        {
          text: 'KP10',
          list: [
            {
              text: this.$t('北京KP10'),
              pic: this.$imgs['home/位图14'],name: "VR",
              default_game_id:4393,
              platform_id:121
            },
            {
              text: this.$t('幸运飞艇'),
              pic: this.$imgs['home/位图15'],name: "VR",
              default_game_id:4393,
              platform_id:121
            },
            {
              text: this.$t('极速赛车'),
              pic: this.$imgs['home/位图16'],name: "VR",
              default_game_id:4393,
              platform_id:121
            },
            {
              text: this.$t('一分赛车'),
              pic: this.$imgs['home/位图17'],name: "VR",
              default_game_id:4393,
              platform_id:121
            },
            {
              text: this.$t('一分赛车'),
              pic: this.$imgs['home/位图18'],name: "VR",
              default_game_id:4393,
              platform_id:121
            }
          ]
        },
        {
          text: '11选5',
          list: [
            {
              text: '11选5',
              pic: this.$imgs['home/位图19'],name: "VR",
              default_game_id:4393,
              platform_id:121
            },
            {
              text: this.$t('三分11选5'),
              pic: this.$imgs['home/位图20'],name: "VR",
              default_game_id:4393,
              platform_id:121
            }
          ]
        },
        {
          text: this.$t('快3'),
          list: [
            {
              text: this.$t('极速快3'),
              pic: this.$imgs['home/位图21'],name: "VR",
              default_game_id:4393,
              platform_id:121
            },
            {
              text: this.$t('三分11选5'),
              pic: this.$imgs['home/位图22'],name: "VR",
              default_game_id:4393,
              platform_id:121
            }
          ]
        },
        {
          text: this.$t('六合彩'),
          list: [
            {
              text: this.$t('极速六合彩'),
              pic: this.$imgs['home/位图23'],name: "VR",
              default_game_id:4393,
              platform_id:121
            },
            {
              text: this.$t('十分六合彩'),
              pic: this.$imgs['home/位图24'],name: "VR",
              default_game_id:4393,
              platform_id:121
            },
            {
              text: this.$t('六合彩'),
              pic: this.$imgs['home/位图25'],name: "VR",
              default_game_id:4393,
              platform_id:121
            },
          ]
        },
      ],
    }
  },
  created () {
    this.getLottery()
  },
  methods: {
    cpTypeChange(index){
      this.curCpType = index
    },
    getLottery () {
      this.$loading({
        mask: false
      })
      const { cateId } = this
      hotLottery({
        game_cate_id: cateId
      }).then(res => {
        const { code, data, msg } = res.data
        if (code === 0) {
          this.lists = data
          // const lists = []
          // data.data.forEach(item => {
          //   if (item.is_hot && item.pic) {
          //   lists.push(item)
          //   }
          // })
          // this.lists = lists
          this.$toast.clear()
        } else {
          console.log(msg)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.float-wrap{
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
  }
}

.lotteries{
  .lottery{
    padding-left: 30px;
    display: flex;
    justify-content: space-between;
    flex-wrap:wrap;
  }
  .game{
    text-align: center;
    float:left;
    width: 25%;
    /deep/ .van-image{
      img{
        border-radius: 8px;
        width:120px;
        height:120px;
      }
    }
    h3{
      text-align: center;
      margin-top: 10px;
      margin-bottom: 30px;
      line-height: 60px;
      font-size: 24px;
    }
  }
}
</style>