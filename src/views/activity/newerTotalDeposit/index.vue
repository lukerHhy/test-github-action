<template>
  <div id="active-detail">
    <lheader v-if="!$route.query.source" :title="title" :goback="true"></lheader>
    <div id="xsc" :style="{'marginTop': $route.query.source && 0}">
      <div class="wrap">
        <img class="slogan" src="./assets/youhui_fuli@2x.png" alt="">
        <p class="main-tit">{{$t('业界首创')}}</p>
<!--        <div class="slogan" :style="{backgroundImage:$bImgs['active/fd/youhui_fuli@2x']}"><p>{{$t('业界首创')}}</p></div>-->
        <ul>
          <li class="nologin" :style="{backgroundImage:$bImgs['active/fd/pop-nologin']}">
            <p class="nologin-need"><span>{{ detail.gift?detail.gift:'0' }}</span>/18888</p>
            <p class="nologin-title">{{$t('首存')}}</p>
            <div class="nologin-bar">
              <i :style="{width:per?per:'46px'}"></i>
              <span v-if="!token">{{$t('尚未登录')}}</span>
              <span v-if="token && !detail.gift">{{$t('尚未存款')}}</span>
            </div>
            <div>
              <span>首存金额 {{detail.deposit?detail.deposit:'0'}}</span>
              <span class="right">有效投注 {{ detail.betSum?detail.betSum:'0' }}</span>
            </div>
            <p class="tips">{{$t('提示')}}<br>{{$t('最高')}}</p>

          </li>
        </ul>
        <button v-if=" detail.gift>0 " @click="getGift">{{$t('立即领取')}}</button>
        <button v-else @click="token?$router.push({path:'/deposit'}):$login.open()">{{$t('立即存款')}}</button>

        <div class="promo-tips" :style="{backgroundImage:$bImgs['active/fd/promo-bg']}">
          <p>7 天内累积存款 100 元及以上，且有效投注额满 10 倍流水，</p>
          <p>{{$t('立赠存款的')}}</p>
          <div><span>7天累积存款<br>{{$t('满')}}</span><span
          >{{$t('投注')}}<br>10倍流水</span><span>{{$t('最高赠')}}<br
          >18888元</span></div>
          <p class="sample">{{$t('举例')}}</p>
          <ul class="sample-box">
            <li>・ 会员A首次存款800元，7天内投注满8000，即可领取80元优惠金；</li>
            <li>・ 会员B首次存款800元，继续存款800元，7天内累计投注满16000，则可领取160元优惠金；</li>
            <li>・ 会员C想要领取18888元，仅需7天内累积存款满188880元且有效投注额满1888800，即可领取；</li>
          </ul>
        </div>

        <div class="rules-tips" :style="{backgroundImage:$bImgs['active/fd/rules-bg']}">
          <p>1. 此活动仅限网站从未存款过的新会员参与；</p>
          <p>2. 活动无需报名，首次存款成功后即可参与活动优惠；</p>
          <p>3. 除VR厅、BBIN厅、AGIN多台百家乐及特惠游戏外的所有游戏均可参与活动优惠；</p>
          <p>4. 首存成功的7天内，累计存款满100元及以上，且有效投注额满存款的10倍流水，即可申请活动优惠金，存款</p>
          <p>{{$t('越多赠送的优惠金越多')}}</p>
          <p>5. 首存成功的7天内，若会员未投注或未申请优惠，视为放弃此优惠；</p>
          <p>6. 首存成功的7天内，一旦提款成功，不再累计首存优惠和有效投注额，提款成功之前获得的优惠金仍可申请；</p>
          <p>7. 优惠金申请审核通过后，金额自动到账，无需流水可立即取款；</p>
          <p>8. 此优惠会员首存7天内仅可申请一次；</p>
          <p>9. 7天指非自然周，从首存金额成功到账后开始倒计时，如:会员首存成功时间为周六12:59:59，则到期日为次</p>
          <p> 周六 12:59:59；</p>
          <p>10. 此优惠与洗码优惠可共享；</p>
          <p>11. 同一IP，同一台设备、同一联系方式、同一银行卡只能有一个账户参与活动。如有违规套利者将取消获奖资</p>
          <p> 格，严重舞弊者{{$t($config[$projectname].project)}}有权在不事先通知的情况下作封号处理或扣除相关获利。</p>
          <p>12. 该活动的有效时间以官网通知为准，{{$t($config[$projectname].project)}}保留最终解释权。</p>
          <div>{{$t('注')}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
#xsc {
  background: #090A0C url("./assets/banner_bg@2x.png") center top no-repeat;
  padding-bottom: 88px;
  margin-top: 88px;
  .main-tit{
    display: block;
    font-size: 32px;
    color: #fff;
    text-align: center;
    position: relative;
    top: -100px;
  }
  .bg img{
    display: block;
    width: 100%;
  }

  .bg2 {
    height: 510px;
    background-size: 100% 100%
  }

  .bg3 {
    height: 614px;
    background-size: 100% 100%
  }

  .bg4 {
    height: 600px;
    background-size: 100% 100%
  }

  .wrap {
    width: 100%;
    padding: 0 30px;

    .slogan {
      width: 630px;
      margin: 40px auto;
      display: block;
      margin-top: 0;
    }

    ul{
      li{
        width: 894px;
        margin: auto;
        position: relative;
        .tips {
          font-size: 20px;
          color: #EE5027;
          text-align: center;
          margin-bottom: 30px
        }
        .go-promo {
          width: 228px;
          height: 50px;
          display: inline-block;
          border: 1px solid #bd9767;
          border-radius: 30px;
          text-align: center;
          line-height: 50px;
          color: #c1a565;
          font-size: 24px;
          position: absolute;
          top: 305px;
          left: 50%;
          margin-left: -114px;
          &:hover {
            color: #e2c48d;
            border-color: #e2c48d
          }
        }
        &.nologin {
          width: 100%;
          height: 360px;
          padding: 0 42px;
          position: relative;
          background: url("./assets/pop-nologin.png") center top no-repeat;
          background-size: 100% auto;
          .nologin-need{
            position: absolute;
            font-size:32px;
            color: #5D5747;
            top: 60px;
            right: 77px;
            span{
              color: #E2C48D;
            }
          }
          .nologin-bar{
            position: absolute;
            top: 140px;
            left: 44px;
            right: 44px;
            height: 46px;
            background: #5D5747;
            border-radius: 15px 25px 25px 15px;
            padding: 0;
            text-align: center;
            i{
              position: absolute;
              width: 26px;
              height: 46px;
              background: linear-gradient(270deg, #F8CD81 0%, #8B703D 100%);
              border-radius: 11px;
              top: 0;
              left: 0;
            }
            span{
              text-align: center;
              color: #1E1E1E;
              font-size: 24px;
              line-height: 46px;
              font-weight: bold;
            }
          }
          .nologin-title {
            line-height: 52px;
            font-size: 22px;
            color: #ecd08e;
            text-align: center;
            width: 566px;
            height: 52px;
            background: linear-gradient(180deg, #2D2B29 0%, #141312 100%);
            border-radius: 24px;
            margin: 0 auto;
            position: relative;
            top: -10px;
          }
          div {
            padding: 155px 12px 0 10px;
            margin-bottom: 40px;
            text-align: left;
            span {
              color: #E2C48D;
              font-size: 24px;
              &.right {
                float: right;
              }
            }
          }

        }
        &.no-save{
          height: 464px;
          .nologin-title {
            padding-top: 8px;
            height: 48px;
            line-height: 48px;
            font-size: 22px;
            color: #ecd08e;
            text-align: center
          }
          div {
            padding: 155px 108px 0 108px;
            margin-bottom: 75px;
            span {
              color: #9d8b68;
              font-size: 18px;
              &.right {
                float: right
              }
            }
          }
          a {
            width: 228px;
            height: 50px;
            display: inline-block;
            border: 1px solid #bd9767;
            border-radius: 30px;
            text-align: center;
            line-height: 50px;
            color: #c1a565;
            font-size: 24px;
            background: #191919;
            margin-left: 333px;
            &:hover {
              color: #e2c48d;
              border-color: #e2c48d
            }
          }
        }
        &.commonbg {
          width: 704px;
          height: 464px;
          padding: 0 90px 0 100px;
          .time-box {
            font-size: 23px;
            color: #ecd08e;
            text-align: center;
            line-height: 45px;
            span {
              font-size: 26px;
              color: #d75e4f
            }
          }
          .title-box {
            text-align: right;
            font-size: 26px;
            color: #ecd08e;
            margin: 40px 0 10px;
            span {
              color: #6f5d3c;
              font-size: 26px
            }
          }
          .process-box {
            width: 714px;
            height: 40px;
            background: #474545;
            border-radius: 20px;
            position: relative;
            .process-promo {
              min-width: 105px;
              height: 40px;
              border-radius: 20px;
              background: #958d7e;
              line-height: 40px;
              text-align: center;
              .lock {
                width: 16px;
                height: 40px;
                display: inline-block;
                background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAoCAYAAAD32nqhAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OUUwRDI5NzFBRDFFMTFFOTlDRDVFMzRFQjZCRjA4NjYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OUUwRDI5NzJBRDFFMTFFOTlDRDVFMzRFQjZCRjA4NjYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo5RTBEMjk2RkFEMUUxMUU5OUNENUUzNEVCNkJGMDg2NiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo5RTBEMjk3MEFEMUUxMUU5OUNENUUzNEVCNkJGMDg2NiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PmNA+nMAAAIFSURBVHja7FXLSiNBFE09uhOjGBwVzShGYUZUhoALHztduHThD8zCpaC48xvcKIy4cT1f4A8II7h1EWEG1CA+QERmFsFH0tXdZVXnXrlpfAVn4SIXDkVX7jl16z4qTGudeI/xxDutIfARBOTm6krarAIgAVaYET/bLAHAJ2soCdkB4B6NLiQkKuxLQnYBKMIAGmDJKh4ZhozklJNsaun9MrrgJNOzjLFO0+rXqnK3fX60v+V75VtyJY0CGHrSEFK5oYkNIWS+fFf6Wbm/OTJ6X1Pp1u/9wxMjxcLuoq4OT40AirjZgfyMkM7kv6vT5euLwz8QbqGzd/D3p67cj+7+b1OXJwc7NJGcJjDZ1DwWhsGZIR/biBD22+6baMZJxFHVJEmayxjPhEFQAiInSQzIvgvJVFiFxzzohOasSnLhBEZ6gIFoTblry6i1cbCITooJaGZ+FyBeoQIRWtuzOS6cz5zzTHduZFpXnSMz1Qk4F20J6fQZv77S38vDeATSkNZsDiwh09Ez/+TgCJk1futGYA47mMO9OJJfM/BDHvsY70EIqMeQE5UMx7Qew1YOOBnTekyhCIcPz1fe3puOrvp5tJVtV/Fi4dcS6XX5RCv7QLT+ZViVhE1MjCJ9TocpJFdVQPaoAHXyXngTAyKiUEDFBMQzr3IYe5mjJLLG33tD4H8IPAgwALNt0lpGdkwLAAAAAElFTkSuQmCC) no-repeat 50%
              }
              span {
                font-size: 22px;
                color: #000;
                vertical-align: top
              }
            }
            .process-promo-cny {
              margin-top: 5px;
              text-align: center;
              font-size: 20px;
              color: #edc383
            }
            .process-amount {
              width: 21px;
              height: 40px;
              border-radius: 20px;
              background: -webkit-gradient(linear, left top, right top, from(#eab663), to(#fff2d2));
              background: linear-gradient(-270deg, #eab663, #fff2d2);
              position: absolute;
              top: 0;
              left: 0;
              line-height: 40px;
              text-align: center;
              font-size: 22px;
              color: #000
            }
            .process-amount-cny {
              margin-top: 5px;
              text-align: center;
              font-size: 20px;
              color: #edc383
            }
          }
          .promo-amount {
            font-size: 18px;
            color: #E2C48D;
            margin: 35px 0 65px;
            text-indent: 1em;
            .right {
              float: right;
              font-size: 18px;
              color: #9d8b68
            }
            .amount {
              font-size: 22px;
              color: #edc383
            }
          }
          p {
            font-size: 16px;
            color: #d75e4f;
            text-align: center;
            &.grap {
              width: 100%;
              height: 21px
            }
          }
          .btn-box {
            margin-top: 30px;
            a {
              width: 228px;
              height: 50px;
              display: inline-block;
              border: 1px solid #bd9767;
              border-radius: 30px;
              text-align: center;
              line-height: 50px;
              color: #c1a565;
              font-size: 24px;
              &:nth-of-type(2) {
                margin: 0 9px
              }
              &.active {
                background: -webkit-gradient(linear, left top, right top, from(#eab663), to(#fff2d2));
                background: linear-gradient(-270deg, #eab663, #fff2d2);
                color: #000
              }
              &.gray {
                background: -webkit-gradient(linear, left top, right top, from(#514f4f), to(#626161));
                background: linear-gradient(-270deg, #514f4f, #626161);
                color: #757474;
                border: none
              }
              &.btn:hover {
                color: #e2c48d;
                border-color: #e2c48d
              }
            }
          }
        }
      }
    }
    button {
      display: inline-block;
      text-align: center;
      line-height: 46px;
      color: #D99576;
      font-size: 32px;
      font-weight: bold;
      width: 320px;
      height: 100px;
      border-radius: 8px;
      border: 3px solid #D99576;
      background: none;
      margin: 40px auto 66px;
      display: block;
      &:hover {
        color: #e2c48d;
        border-color: #e2c48d
      }
    }
    .promo-tips {
      width: 100%;
      padding-top: 80px;
      box-sizing: content-box;
      background: url("./assets/promo-bg.png") center top no-repeat;
      background-size: 100% auto;
      margin-bottom: 60px;
      p{
        font-size: 20px;
        color: #9d8b68;
        text-align: center;
        &:first-of-type,&:nth-of-type(2) {
          line-height: 35px;
        }
      }
      div {
        margin: 200px 0 0 16px;
        text-align: left;
        display: flex;
        align-items: center;
        justify-content: center;
        span {
          height: 50px;
          text-align: center;
          font-size: 16px;
          line-height: 24px;
          color: #e9e9e9;
          flex: 1;
          &:nth-of-type(2) {
            //margin: 0 80px
          }
        }
      }
      .sample {
        font-size: 36px;
        color: #E2C48D;
        text-align: left;
        line-height: 44x;
        margin-top: 40px;
        padding: 0 20px;
      }
      .sample-box li {
        font-size: 24px;
        color: #E2C48D;
        line-height: 30px;
        text-align: left;
        padding: 0 20px;
        width: 100%;
      }
    }
    .rules-tips {
      width: 100%;
      padding: 51px 50px 0;
      text-align: left;
      background: url("./assets/pro-list-bg.png") center top no-repeat;
      background-size: 100% auto;
      div,p{
        font-size: 28px;
        color: #E2C48D;
        line-height: 48px
      }
      div{
        margin-top: 12px
      }
    }
  }


}
</style>
<script>
import {mapState} from 'vuex'
import { newerTotalDeposit,newerRegSent } from '@/api/activity'
import Lheader from "@/components/l-header";

export default {
  components: {
    Lheader
  },
  data() {
    return {
      title:this.$t('优惠详情'),
      mainbanner: '',
      detail: {},
      per:0,
      merchant_no: process.env.VUE_APP_MERCHANT_NO, //商户号
      token: window.localStorage.token,
    }
  },
  computed: {
    id() {
      const {query} = this.$route
      return query.id
    }
  },
  created () {
    console.log(this.token)
    // this.$route.query.id
    //   ? (this.id = this.$route.query.id)
    //   : this.$router.go(-1)
    this.activitydetail()
  },
  methods: {
    async activitydetail() {
      this.$loading()
      let res = await newerTotalDeposit({merchant_no: this.merchant_no,id: this.id})
      this.detail = res.data.data.sent;
      this.per = this.detail.gift/18888 *100 +'%'
      this.$loading().close()
    },
    goOther(path) {
      this.$router.push(path)
    },
    getGift () {
      newerRegSent({merchant_no:this.merchant_no,id:this.id}).then(res=>{
        console.log(res)
        this.activitydetail()
      })
    },
  }
}
</script>
