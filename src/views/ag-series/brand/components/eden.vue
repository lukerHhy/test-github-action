<template>
  <div class="brand-det">
    <img
      :src="$imgs['brand/Brand_banner1@2x']"
      class="full-img"
      alt=""
    >
    <div class="brand-video">
      <!--<video
          id="bgVideo"
          loop="loop"
          autoplay="autoplay"
          playsinline=""
          webkit-playsinline=""
          x5-video-player-type="h5"
          x5-video-player-fullscreen="false"
          width="100%"
          height="100%"
          :poster="$imgs['brand/Brand_banner2@2x']"
          :controls="false">
        <source src="//wq-app.oss-accelerate.aliyuncs.com/app/0217aze-2.mp4" lang="cn" data-lang-token="FLAG" type="video/mp4">
      </video>-->
      <img
        :src="$imgs['brand/Brand_banner2@2x']"
        class="full-img"
        alt=""
      >
      <div class="video-cover"></div>
      <van-button
        class="play-btn"
        @click="showVideo=true;bgVideo=true;"
      >
        <van-icon name="play-circle" />
      </van-button>
      <!--      <img src="" alt="">-->
      <div class="brand-video-tab">
        <img
          :src="$imgs['brand/video2']"
          @click="showVideo=true;bgVideo02=true;"
          class="full-img"
          alt=""
        >
        <img
          :src="$imgs['brand/photo2']"
          @click="showVideo=true;picthumbs=true;"
          class="full-img"
          alt=""
        >
      </div>

      <div
        class="full-video"
        v-if="showVideo"
      >
        <van-icon
          name="clear"
          @click="showVideo=false;bgVideo=false;picthumbs=false;"
        />
        <video
          v-if="bgVideo"
          loop="loop"
          autoplay="autoplay"
          playsinline=""
          webkit-playsinline=""
          x5-video-player-type="h5"
          x5-video-player-fullscreen="false"
          width="100%"
          height="100%"
          id="bgVideo"
          muted
          :poster="$imgs['brand/Brand_banner2@2x']"
          :controls="false"
        >
          <source
            v-if="$projectname == '10030'"
            src="//wq-app.oss-accelerate.aliyuncs.com/app/0217aze-2.mp4"
            lang="cn"
            data-lang-token="FLAG"
            type="video/mp4"
          >
          <source
            v-if="$projectname == '10061'"
            src="https://wq-app.oss-accelerate.aliyuncs.com/app/pf7fRLPXxR1BzyC9ieZI1mUBKQw8a3uxS9AF5wvV.mp4"
            lang="cn"
            data-lang-token="FLAG"
            type="video/mp4"
          >
        </video>
        <video
          v-if="bgVideo02"
          id="bgVideo02"
          muted
          loop="loop"
          autoplay="autoplay"
          playsinline=""
          webkit-playsinline=""
          x5-video-player-type="h5"
          x5-video-player-fullscreen="false"
          width="100%"
          height="100%"
          :poster="$imgs['brand/Brand_banner2@2x']"
          :controls="false"
        >
          <source
            src="//wq-app.oss-accelerate.aliyuncs.com/app/0217aze-2.mp4"
            lang="cn"
            data-lang-token="FLAG"
            type="video/mp4"
          >
        </video>
        <div
          class="picthumbs"
          v-if="picthumbs"
        >
          <template v-for="(item,index) in pics">
            <van-image
              :key="index"
              :src="$imgs['brand/'+(index+1)+'']"
            ></van-image>
            <p>{{item}}</p>
          </template>

        </div>
      </div>
    </div>
    <!--    <img :src="$imgs['brand/Brand_banner2@2x']" class="full-img" alt="">-->
    <img
      :src="$imgs['brand/Brand_banner3@2x']"
      class="full-img"
      alt=""
    >
    <div class="profile">
      <img
        :src="$imgs['brand/profile']"
        alt=""
      >
      <P>{{$t('出生日期')}}<br>
        出生城市：比利时拉鲁维耶尔<br>
        效力球队：皇家马德里<br>
        场上位置：攻击型中场／边锋</P>
    </div>
    <div class="profile honor">
      <img
        :src="$imgs['brand/honor']"
        alt=""
      >
      <P>2010/11赛季法甲最佳青年球员<br>
        2011/12赛季法甲最佳青年球员<br>
        2014/15赛季英超年对最佳球员<br>
        2018年比利时年度最佳球员<br>
        2019年国际足联年度最佳阵容</P>
      <p>{{$t('阿扎尔是一名比利时足球运动员')}}</p>
    </div>
    <div class="paralla">
      <div class="list1">
        <div class="item">
          <van-image :src="$imgs['brand/desc01@2x']"></van-image>
          <p class="tit">1991</p>
          <p class="desc">{{$t('阿扎尔成长于比利时布莱恩')}}</p>
        </div>
        <div class="item">
          <van-image :src="$imgs['brand/desc02@2x']"></van-image>
          <p class="tit">2005</p>
          <p class="desc">{{$t('阿扎尔成长于比利时布莱恩')}}</p>
        </div>
        <div class="item">
          <van-image :src="$imgs['brand/desc03@2x']"></van-image>
          <p class="tit">2009</p>
          <p class="desc">20019/10赛季阿扎尔首次踏上欧洲赛场并取得进球，在联赛中也稳坐主力位置，虽然里尔以1分之差屈居殿军，但表现全面的阿扎尔还是卫冕了法甲年度最佳青年球员的奖项。</p>
        </div>
        <div class="item">
          <van-image :src="$imgs['brand/desc04@2x']"></van-image>
          <p class="tit">2015</p>
          <p class="desc">{{$t('凭借上赛季')}}</p>
        </div>
        <div class="item">
          <van-image :src="$imgs['brand/desc05@2x']"></van-image>
          <p class="tit">2018</p>
          <p class="desc">{{$t('作为国家队阵中的绝对核心')}}</p>
        </div>
      </div>
      <div class="list2">
        <div class="list2-img">
          <img
            :src="$imgs['brand/Brand_banner5@2x']"
            alt=""
          >
        </div>
        <div class="item">
          <p class="tit">1998</p>
          <p class="desc">{{$t('阿扎尔加入了当地的少年足球队')}}</p>
          <van-image :src="$imgs['brand/desc06@2x']"></van-image>
        </div>
        <div class="item">
          <p class="tit">2007</p>
          <p class="desc">17岁的阿扎尔首次代表里尔一线队出场，并入选了当年《法国足球》评选的十佳法甲新秀。</p>
          <van-image :src="$imgs['brand/desc07@2x']"></van-image>
        </div>
        <div class="item">
          <p class="tit">2012</p>
          <p class="desc">{{$t('阿扎尔以创当年英超记录')}}</p>
          <van-image :src="$imgs['brand/desc08@2x']"></van-image>
        </div>
        <div class="item">
          <p class="tit">2017</p>
          <p class="desc">{{$t('因为在俱乐部的出色表现')}}</p>
          <van-image :src="$imgs['brand/desc09@2x']"></van-image>
        </div>
        <div class="item">
          <p class="tit">2019</p>
          <p class="desc">6月8日，西甲豪门皇家马德里官方宣布从英超切尔西引进比利时球星阿扎尔，双方将签署一份为期5年的合同。</p>
          <van-image :src="$imgs['brand/desc10@2x']"></van-image>
        </div>
      </div>
    </div>
    <img
      :src="$imgs['brand/Brand_banner15@2x']"
      class="full-img"
      alt=""
    >
  </div>
</template>

<script>
export default {
  name: "index",
  components: {

  },
  data() {
    return {
      title: '',
      id: 0,
      showVideo: false,
      bgVideo: false,
      bgVideo02: false,
      picthumbs: false,
      pics: [`本次签约标志着${this.$config[this.$projectname].project}进入品牌和战略全面领先的时代`,
      `${this.$config[this.$projectname].project}品牌总监表示阿扎尔尊贵优雅的气质非常契合${this.$config[this.$projectname].project}的品牌形象`,
      `阿扎尔表示${this.$config[this.$projectname].project}是业内领先的博彩品牌，实力和理念都与自己非常契合`,
      `随着签约完成，阿扎尔正式担任${this.$config[this.$projectname].project}大使`,
      `${this.$config[this.$projectname].project}品牌总监对本次合作前景充满期待，期许携手阿扎尔共创泛娱乐新业态`,
      `阿扎尔对本次签约表示满意，并期待携手${this.$config[this.$projectname].project}续写新传奇`,
      `阿扎尔表示将会和${this.$config[this.$projectname].project}一起演绎“人生就是搏”的品牌精神`]
    }
  },
  created() {

  },
  mounted() {
    let video = null
    if (this.bgVideo) {
      video = document.getElementById('bgVideo')
    } else if (this.bgVideo02) {
      video = document.getElementById('bgVideo02')
    }
    setTimeout(() => {
      video.play()
    }, 1000)
  },
  methods: {

  }
}
</script>

<style scoped lang="less">
.brand-det {
  background-color: #18181c;
  padding-bottom: 100px;
}
.picthumbs {
  height: 100%;
  overflow: auto;
  padding: 30px;
  .van-image {
    display: block;
    width: 100%;
  }
  p {
    font-size: 28px;
    color: #fff;
    margin: 10px 0 30px;
  }
}
.full-video {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000000;
  background: rgba(0, 0, 0, 0.9);
  .van-icon {
    position: absolute;
    color: @primary-color;
    font-size: 48px;
    right: 30px;
    top: 30px;
    z-index: 10000000;
  }
  video {
    width: 100%;
  }
}
.brand-video {
  position: relative;
  #bgVideo {
    width: 100%;
  }
  .play-btn {
    position: absolute;
    width: 186px;
    height: 186px;
    border: 2px solid #fff;
    border-radius: 50%;
    top: 35%;
    left: 50%;
    transform: translateX(-50%);
    padding: 0;
    text-align: center;
    z-index: 6;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
    .van-icon {
      color: #fff;
      font-size: 120px;
    }
  }
  .video-cover {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 5;
  }
  .brand-video-tab {
    position: absolute;
    bottom: 20%;
    left: 0;
    text-align: center;
    width: 100%;
    z-index: 10;
    img {
      display: inline-block;
      vertical-align: top;
      width: 218px;
    }
  }
}
.full-img {
  display: block;
  width: 100%;
}
.profile {
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  padding-right: 40px;
  margin-top: -160px;
  &.honor {
    align-items: flex-start;
    padding-left: 40px;
    margin-top: 80px;
  }
  img {
    width: 160px;
    margin-bottom: 15px;
  }
  p {
    font-size: 28px;
    color: #abaeba;
    line-height: 40px;
    margin-bottom: 32px;
  }
}
.paralla {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 0 40px;
  margin-top: 80px;
  margin-bottom: 136px;
  .list1 {
    padding-top: 48px;
    .item {
      padding-bottom: 30px;
    }
  }
  .list1,
  .list2 {
    width: 322px;
    .item {
      background: #262626;
      border-radius: 12px;
      overflow: hidden;
      margin-bottom: 20px;
    }
    .tit {
      font-size: 60px;
      color: #abaeba;
      padding: 0 18px;
      line-height: 1.5;
    }
    .desc {
      font-size: 24px;
      color: #abaeba;
      padding: 0 18px;
      line-height: 38px;
    }
  }
  .list2-img {
    text-align: center;
    img {
      width: 264px;
    }
  }
}
</style>
