<template>
  <div>
    <van-nav-bar
        class="m-header"
        :title="title"
        left-arrow
        v-if="!$route.query.source"
        @click-left="onClickLeft"
    >
    </van-nav-bar>
    <Eden v-if="id===1"></Eden>
  </div>
</template>

<script>
import Eden from './components/eden'
export default {
  name: "index",
  components: {
    Eden
  },
  data(){
    return{
      title:'',
      id:0
    }
  },
  created() {
    console.log(this.$route)
    this.id = this.$route.params.id*1;
    if(this.id===1){
      this.title = `${this.$config[this.$projectname].project}大使-艾登 · 阿扎尔`
    }
  },
  methods:{
    onClickLeft () {
      this.$router.push({
        path: '/brand'
      })
    },
    toDetail(){},
  }
}
</script>

<style scoped lang="less">
.m-header.van-nav-bar{
  background-color: #202126;
  z-index: 999999;
}
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
