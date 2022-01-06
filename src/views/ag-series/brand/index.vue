<template>
  <div>
    <van-nav-bar
        class="m-header"
        :title="`${$t($config[$projectname].project)}品牌`"
        left-arrow
        @click-left="onClickLeft"
        v-if="!$route.query.source"
    >
      <template slot="right">
        <div class="head-r-kf" @click="$openKefu()">
          <img :src="$imgs['otherIcon/icon_call@2x']" alt="">
          <span>{{$t('客服')}}</span>
        </div>
      </template>
    </van-nav-bar>
    <vtabbar v-if="!$route.query.source" class="m-footer" id="footer-yabo" :index="6"></vtabbar>
    <div class="brand-list">
      <div class="brand-list-item" @click="toDetail(1)">
        <van-image :src="$imgs['brand/icon01']"></van-image>
        <span>皇马著名球星艾登阿扎尔成为{{$t($config[$projectname].project)}}大使</span>
      </div>
    </div>
  </div>
</template>

<script>
import Vtabbar from '../components/v-tabbar'
import RankSwipe from "@/views/ag-series/home/rank-swipe";
export default {
  name: "index",
  components: {
    Vtabbar
  },
  data(){
    return{}
  },
  methods:{
    onClickLeft () {
      this.$router.push({
        path: "/"
      })
    },
    toDetail(i){
      if(this.$route.query.source) {
        this.$router.push({path:'/brand/'+i+'',query:this.$route.query})
      } else {
        this.$router.push({path:'/brand/'+i+''})
      }
    },
  }
}
</script>

<style scoped lang="less">

  .head-r-kf{
    display: flex;
    align-items: center;
    font-size: 24px;
    color: #ABAEBA;
    flex-direction: column;
    img{
      width: 48px;
    }
    span{
      line-height: 1;
    }
  }
  .brand-list{
    padding: 20px;
    margin-top: 88px;
  }
  .brand-list-item{
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    font-size: 28px;
    color: #D8D8D8;
    justify-content: flex-start;
    .van-image{
      width: 100%;
      height: 276px;
      background-size: cover;
      margin-bottom: 18px;
    }
  }
</style>
