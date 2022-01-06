<template>
  <div id="roulette-detail" :style="{'marginTop': !!$route.query.source && 0}">
    <lheader v-if="!$route.query.source" :title="title" :goback="true"></lheader>
    <div class="enter-desc">
      <p>{{$t('累计投注额')}}<img src="./assets/img_9999@2x.png" alt=""> 即可领取彩金</p>
      <p>{{$t('每日投注')}}<img src="./assets/img1888@2x.png" alt=""></p>
      <p>{{$t('达标彩金将于次日添加到账')}}</p>
    </div>
    <img class="enter-button" @click="toGame" src="./assets/title_img@2x.png" alt="">
    <div class="enter-info">
      <table>
        <tr>
          <th></th>
          <th width="50%">{{$t('当日累积有效投注')}}</th>
          <th>{{$t('优惠金额')}}</th>
        </tr>
        <tr v-for="(item,index) in list">
          <td>
            <img v-if="index===0" src="./assets/icon_img1@2x.png" alt="">
            <img v-if="index===1" src="./assets/icon_img2@2x.png" alt="">
            <img v-if="index===2" src="./assets/icon_img3@2x.png" alt="">
            <img v-if="index===3" src="./assets/icon_img4@2x.png" alt="">
            <img v-if="index===4" src="./assets/icon_img5@2x.png" alt="">
          </td>
          <td>{{item.bet|moneyFilter}}</td>
          <td>{{item.money}}</td>
        </tr>
      </table>
    </div>
    <p class="tit">{{$t('活动规则')}}</p>
    <div class="enter-tips">
      <p>{{$t('此活动仅限')}}</p>
      <p>{{$t('每日仅可领取最高等级奖金')}}</p>
      <p>{{$t('礼金仅需')}}</p>
      <p>{{$t('此活动和网站其他优惠可共享')}}</p>
      <p>{{$t('同一')}}</p>
      <p>{{$t('会员参与本次活动')}}</p>
    </div>
  </div>
</template>
<style lang="less" scoped>
  #roulette-detail{
    margin-top: 88px;
    background: url("./assets/img_bg@2x.png") center top no-repeat;
    background-size: 100% auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 538px;
    padding-bottom: 112px;
    .enter-desc{
      display: flex;
      font-size: 32px;
      color: #fff;
      justify-content: space-around;
      margin-bottom: 57px;
      flex-direction: column;
      p{
        margin-bottom: 38px;
        text-align: center;
        img{
          vertical-align: middle;
        }
        &:first-child img{
          width: 280px;
        }
        &:nth-child(2) img{
          width: 300px;
        }
      }
    }
    .enter-button{
      transition: .3s;
      cursor: pointer;
      width: 565px;
      &:hover{
        transform: scale(1.1);
      }
    }
    .enter-info{
      width: 742px;
      height: 858px;
      margin-top: 40px;
      padding: 80px 88px 0 88px;
      background: url("./assets/img_yu@2x.png") center top no-repeat;
      background-size: 100% auto;
      table{
        table-layout: fixed;
        width: 100%;
        text-align: center;
        img{
          width: 94px;
        }
        th{
          font-size: 29px;
          color: #FFE823;
          height: 120px;
        }
        td{
          font-size: 29px;
          color: #fff;
          height: 110px;
        }
      }
    }
    .tit{
      font-size: 40px;
      color: #FFE823;
      margin: 166px 0 50px;
    }
    .enter-tips{
      width: 100%;
      padding: 0 64px 0 57px;
      p{
        font-size: 29px;
        color: #fff;
        line-height: 42px;
        padding-left: 22px;
        position: relative;
        text-align: left;
        margin-bottom: 20px;
        &:after{
          content: '';
          position: absolute;
          width: 12px;
          height: 12px;
          background: #FFE823;
          left: 0;
          top: 15px;
        }
      }
    }
  }
</style>
<script>
import Lheader from "@/components/l-header";
import toast from "@/components/toast";
import {mapState} from 'vuex'
import {fishHappyUnlimited,fishHappyPlay} from '@/api/activity'

export default {
  components: {
    Lheader,
    toast
  },
  data() {
    return {
      title:this.$t('鱼乐无限'),
      list:[],
      agData:{
        default_game_id: 12,
        game_platform_id: 31,
        name: 'ag',
        text: 'ag3d',
        thumb: 'ag3d@2x.png',
        title: this.$t('AG捕鱼王3D'),
        desc: [this.$t('顶级渔场，一炮致富')]
      }
    }
  },
  filters: {
    moneyFilter (money) {
      if (money) {
        var result = []
        var counter = 0
        money = (money || 0).toString().split('')
        for (var i = money.length - 1; i >= 0; i--) {
          counter++
          result.unshift(money[i])
          if (!(counter % 3) && i !== 0) {
            result.unshift(',')
          }
        }
        result = result.join('')
      }
      if (result) {
        if (result.indexOf('.') === -1) {
          return result + '.00'
        } else {
          return result
        }
      }
    }
  },
  created () {
     
    this.getData()
  },
  methods: {
    getData(){
      fishHappyUnlimited({gid:this.agData.default_game_id,id:this.$route.query.id}).then(res=>{
        console.log(res)
        this.list = res.data.data
      })
    },
    toGame(){
      fishHappyPlay({gid:this.agData.default_game_id,id:this.$route.query.id}).then(res=>{
        console.log(res)
      })
      this.$playGame(this.agData,this.$t('捕鱼'))
    },
  }
}
</script>
