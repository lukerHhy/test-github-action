<template>
  <div class="moneyBall">
    <DailySport v-if="id==26"></DailySport>
    <WeekSports v-if="id==27"></WeekSports>
    <Bet01 v-if="id==25"></Bet01>
    <Bet02 v-if="id==24"></Bet02>
  </div>
</template>

<script>
import DailySport from "../dailySport";//点球成金
import WeekSports from "../weekSports";//周末福利赛
import Bet01 from "../weeklySave";//周周存
import Bet02 from "../streakWins";//连赢爆单

export default {
  name: "index",
  components: {
    DailySport,
    WeekSports,
    weeklySave,
    streakWins
  },
  data(){
    return{
      id:''
    }
  },
  created(){
    this.id = this.$route.query.id
    console.log(this.id)
  },
}
</script>

<style scoped lang="less">
  .container{
    padding-top: 88px;
    background: #1F1F1F;
    min-height: 100vh;
    padding-bottom: 86px;
    &.no-header{
      padding-top: 0;
      margin-top:0;
    }
    .full-img{
      display: block;
      width: 100%;
    }
    .main{
      padding: 0 28px;
      h2{
        font-size: 24px;
        color: @primary-color;
        text-align: center;
        margin-top: 38px;
      }
      h3{
        font-size: 16px;
        color: #fff;
        text-align: center;
        margin-bottom: 50px;
      }
      .block{
        background: #454545;
        border: 2px solid #525252;
        border-radius: 8px;
        padding: 46px 30px;
        p{
          font-size: 24px;
          color: #999;
          line-height: 48px;
          margin-bottom: 24px;
        }
        h4{
          text-align: center;
          font-size: 28px;
          color: #fff;
          margin: 0;
        }
        h5{
          font-size: 24px;
          color: #fff;
          text-align: center;
          margin: 0;
        }
        &.detail{
          margin-bottom: 40px;
          .detail-p{
            width: 480px;
            margin: 20px auto 0;
          }
          .van-button{
            width: 220px;
            height: 38px;
            background: #18926C;
            border-radius: 19px;
            margin: 48px auto 52px;
            display: block;
            color: #fff;
            font-size: 24px;
          }
          .vs-item{
            display: flex;
            align-items: flex-start;
            justify-content: center;
            margin-top: 50px;
            .item{
              margin: 0 34px;
              text-align: center;
              img{
                width: 54px;
                height: 54px;
                border-radius: 50%;
                background-color: #ccc;
                border: none;
              }
            }
            span{
              color: #fff;
              font-size: 30px;
              line-height: 54px;
            }
          }
        }
      }
      table{
        width: 100%;
        table-layout: fixed;
        border-collapse: collapse;
        border-radius: 8px;
        font-size: 24px;
        text-align: center;
        margin-bottom: 40px;
        th{
          background-color: @primary-color;
          color: #fff;
          height: 48px;
          border: 2px solid @primary-color;
        }
        td{
          border: 2px solid @primary-color;
          color: #999;
          height: 46px;
        }
      }
    }
  }
</style>