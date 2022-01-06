<template>
  <div class="detailPage">
    <div class="swiper-container swiper-container01">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <van-image :src="$imgs['brand/p1/banner01']" />
        </div>
      </div>
      <!-- 如果需要分页器 -->
<!--      <div class="swiper-pagination"></div>-->
    </div>
    <div class="main">
      <h2 class="detailPage-title">{{$t('签约视频')}}</h2>
      <video style="width: 100%" controls :poster="$imgs['brand/p1/shipin1@2x']">
        <source src="https://wq-app.oss-accelerate.aliyuncs.com/app/rInFob71cPExPW9SFrhUlXKy9WCFwQ6mF692MUVE.mp4">
      </video>
      <p class="detailPage-text">{{$t('北京时间')}}</p>
      <h2 class="detailPage-title">{{$t('精彩赛事')}}</h2>
      <div class="swiper-container swiper-container02">
        <div class="swiper-wrapper">
          <div class="swiper-slide" @click="showVideo(0)">
            <van-image :src="$imgs['brand/p1/videoBg1']" />
            <img class="play-btn" :src="$imgs['brand/p1/play']" alt="">
            <p>{{$t('皇马')}}</p>
          </div>
          <div class="swiper-slide" @click="showVideo(1)">
            <van-image :src="$imgs['brand/p1/videoBg2']" />
            <img class="play-btn" :src="$imgs['brand/p1/play']" alt="">
            <p>{{$t('皇马')}}</p>
          </div>
          <div class="swiper-slide" @click="showVideo(2)">
            <van-image :src="$imgs['brand/p1/videoBg3']" />
            <img class="play-btn" :src="$imgs['brand/p1/play']" alt="">
            <p>{{$t('清瓦伦西亚')}}</p>
          </div>
          <div class="swiper-slide" @click="showVideo(3)">
            <van-image :src="$imgs['brand/p1/videoBg4']" />
            <img class="play-btn" :src="$imgs['brand/p1/play']" alt="">
            <p>{{$t('亚特兰大')}}</p>
          </div>
          <div class="swiper-slide">
            <van-image :src="$imgs['brand/p1/nodata']" />
            <p>{{$t('敬请期待')}}</p>
          </div>
        </div>
      </div>
      <p class="detailPage-text-tit">{{$t('西甲瓦伦西亚足球俱乐部')}}</p>
      <p class="detailPage-text">{{$t('瓦伦西亚是西班牙足球超级联赛最成功的俱乐部之一')}}</p>
      <img :src="$imgs['brand/p1/bet_brand_image_a2@2x']" style="margin-top: 14px" class="full-img" alt="">
      <h2 class="detailPage-title">{{$t('荣誉')}}</h2>
      <div class="swiper-container swiper-container03">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <div>
              <img :src="$imgs['brand/p1/jiangbei-1']">
              <span>8</span>
              <p>{{$t('西班牙国王杯')}}</p>
            </div>
            <div>
              <img :src="$imgs['brand/p1/jiangbei-2']">
              <span>6</span>
              <p>{{$t('西甲联赛')}}</p>
            </div>
            <div>
              <img :src="$imgs['brand/p1/jiangbei-3']">
              <span>3</span>
              <p>{{$t('欧洲联盟杯')}}</p>
            </div>
            <div>
              <img :src="$imgs['brand/p1/jiangbei-4']">
              <span>2</span>
              <p>{{$t('欧洲超级杯')}}</p>
            </div>
          </div>
          <div class="swiper-slide">
            <div>
              <img :src="$imgs['brand/p1/jiangbei-5']">
              <span>1</span>
              <p>{{$t('欧洲优胜者杯')}}</p>
            </div>
            <div>
              <img :src="$imgs['brand/p1/jiangbei-6']">
              <span>1</span>
              <p>{{$t('西班牙超级杯')}}</p>
            </div>
          </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>
      </div>
      <h2 class="detailPage-title">{{$t('官方宣传')}}</h2>
      <img :src="$imgs['brand/p1/bet_brand_image_a4@2x']" class="full-img" alt="">
      <p class="detailPage-text">{{$t('北京时间')}}</p>
      <h2 class="detailPage-title">{{$t('业内最顶尖的原生')}}</h2>
      <img :src="$imgs['brand/p1/bet_brand_image_a5@2x']" class="full-img" alt="">
      <img :src="$imgs['brand/p1/bet_brand_image_a6@2x']" style="margin-top: 14px" class="full-img" alt="">
      <h2 class="detailPage-title">{{$t('官方宣传')}}</h2>
      <img :src="$imgs['brand/p1/bet_brand_image_a7@2x']" class="full-img" alt="">
      <h2 class="detailPage-title">{{$t('媒体报道')}}</h2>
      <img :src="$imgs['brand/p1/banner01']" class="full-img" alt="">
      <p class="detailPage-text">{{$t('北京时间')}}</p>
      <img :src="$imgs['brand/p1/bet_brand_image_a9@2x']" style="margin-top: 14px" class="full-img" alt="">
      <div class="totop" @click="toTop">
        <img :src="$imgs['brand/p1/top@2x']" alt="">
        <span>{{$t('回到顶部')}}</span>
      </div>
    </div>

    <van-dialog v-model="videobox" :showConfirmButton="false" closeOnClickOverlay>
      <video style="width: 100%" controls :poster="$imgs['brand/p1/videoBg1']" v-if="active===0">
        <source src="https://wq-app.oss-accelerate.aliyuncs.com/app/CvdhFO3LL81LE5rAebqjbzhMw3F1yppm7t7SttcS.flv">
      </video>
      <video style="width: 100%" controls :poster="$imgs['brand/p1/videoBg2']" v-if="active===1">
        <source src="https://wq-app.oss-accelerate.aliyuncs.com/app/SNqQP7VgVEQWavRY59IxZFd6gaKY58gS8I6omhLb.flv">
      </video>
      <video style="width: 100%" controls :poster="$imgs['brand/p1/videoBg3']" v-if="active===2">
        <source src="https://wq-app.oss-accelerate.aliyuncs.com/app/miPnR7ZVzE9BaVboNvguj4o9gbScjm7FhzMVcVu7.flv">
      </video>
      <video style="width: 100%" controls :poster="$imgs['brand/p1/videoBg4']" v-if="active===3">
        <source src="https://wq-app.oss-accelerate.aliyuncs.com/app/6Bzq1WnkCB49G5rUtWLAisGrn1XgOuSWxlfPGcHL.flv">
      </video>
    </van-dialog>
  </div>
</template>

<script>
  import "swiper/dist/css/swiper.css";
  import { Swiper } from "vue-awesome-swiper";
  export default {
    name: "xbPage01",
    data () {
      return {
        competitions:[
            {tit:this.$t('瓦伦西亚2月精彩进球集锦')},
          {tit:this.$t('瓦伦西亚1月精彩进球集锦')},
          {tit:this.$t('欧宝助威瓦伦西亚力克巴塞罗那')},
          {tit:this.$t('瓦伦西亚12月精彩进球集锦')}],
        videobox:false,
        active:0,
        activeIndex:0
      };
    },
    created() {
      this.$nextTick(() => {
        new Swiper('.swiper-container01', {
          pagination: {
            el: '.swiper-pagination',
            bulletClass: 'my-bullet',//需设置.my-bullet样式
          },
          autoplay: {
            delay: 3000,
            disableOnInteraction: false,
          },
        })
        new Swiper('.swiper-container02', {
          freeMode:true,
          slidesPerView: 'auto',
          spaceBetween: 14,
        })
        new Swiper('.swiper-container03', {
          pagination: {
            el: '.swiper-pagination',
            bulletClass: 'my-bullet',//需设置.my-bullet样式
          },
          autoplay: {
            delay: 3000,
            disableOnInteraction: false,
          },
        })
      })
    },
    methods:{
      showVideo(i){
        this.active = i;
        this.videobox = true;
      },
      toTop(){
        document.body.scrollTop = document.documentElement.scrollTop = 0;
      },
    }
  }
</script>

<style scoped lang="less">
.full-img{
  display: block;
  width: 100%;
}
  .detailPage{
    background-color: #fff;
    overflow: hidden;
  }
  .swiper-container01{
    height: 424px;
    .swiper-pagination-bullets{
      bottom: 20px;
    }
    /deep/ .my-bullet {
      display: inline-block;
      width: 12px;
      height: 12px;
      margin-left: 10px;
      border-radius: @border-radius-5px;
      background: #E3E3E3;
      opacity: .4;

    }
    /deep/ .swiper-pagination-bullet-active {
      opacity: 1;
      width: 20px;
      background-color: #fff;
    }
    /deep/ .swiper-pagination{
      width:100%;
      height:12px;
    }
  }
  .main{
    padding: 0 28px;
  }
  .detailPage-title{
    font-size: 28px;
    color: #333;
    border-left: 4px solid #333;
    padding-left: 10px;
    margin: 40px 0 32px 0;
    font-weight: bold;
  }
  .detailPage-text{
    font-size: 24px;
    color: #333;
    line-height: 42px;
    margin-top: 40px;
    text-indent: 2em;
  }
  .swiper-container02{
    margin: -20px -30px;
    .swiper-wrapper{
      padding: 40px 30px;
    }
    .swiper-slide{
      width: 256px;
      border-radius: 12px;
      box-shadow:0px 6px 30px 0px rgba(0,34,80,0.1);
      position: relative;
      .play-btn{
        width: 68px;
        position: absolute;
        top: 50px;
        left: 50%;
        margin-left: -34px;
      }
      .van-image{
        height: 165px;
        border-radius: 12px 12px 0 0;
        overflow: hidden;
      }
      p{
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        height: 50px;
        line-height: 50px;
        font-size: 20px;
        color: #333;
        padding: 0 10px;
        border-radius: 0 0 12px 12px;
      }
    }
  }
  .detailPage-text-tit{
    font-size: 32px;
    color: #333;
    margin: 60px 0 30px;
    text-align: center;
    font-weight: bold;
  }
  .totop{
    padding: 50px 0;
    text-align: center;
    img{
      width: 22px;
    }
    span{
      display: block;
      font-size: 24px;
      color: #999;
      margin-top: 10px;
    }
  }
  .van-dialog{
    padding: 0;
    background-color: transparent;
  }
  .swiper-container03{
    margin-bottom:60px;
    padding-bottom: 60px;
    .swiper-pagination-bullets{
      bottom: 10px;
    }
    /deep/ .my-bullet {
      display: inline-block;
      width: 12px;
      height: 12px;
      margin-left: 10px;
      border-radius: @border-radius-5px;
      border: 1px solid #C3C9DB;
      opacity: .4;

    }
    /deep/ .swiper-pagination-bullet-active {
      opacity: 1;
      width: 20px;
      background-color: #C3C9DB;
    }
    /deep/ .swiper-pagination{
      width:100%;
      height:12px;
    }
    .swiper-slide{
      font-size: 0;
      div{
        display: inline-block;
        vertical-align: top;
        width: 25%;
        text-align: center;
        border-right: 2px solid #dedede;
        padding: 0 10px;
        &:last-child{
          border-right: 0;
        }
        img{
          width: 100px;
        }
        span{
          display: block;
          text-align: center;
          color: rgb(254, 160, 116);
          font-weight: bold;
          font-size: 36px;
        }
        p{
          color: rgb(51, 51, 51);
          text-align: center;
          font-size: 24px;
          margin-top: 10px;
        }
      }
    }
  }
</style>
