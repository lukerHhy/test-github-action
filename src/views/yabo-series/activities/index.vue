
<template>
  <div class="activities">
    <template v-if="!$route.query.source">
      <van-nav-bar
          v-if="$projectname==='10042'"
          :left-text="title"
          class="m-header a"
          :fixed="true"
      >
        <template #title>
          <van-image class="bet-nav-title" :src="$imgs['otherIcon/nav-title@2x']" />
        </template>
      </van-nav-bar>
      <van-nav-bar
          v-else
          class="m-header a"
          :title="title"
          :fixed="true"
      />
    </template>
    <vtabbar class="m-footer" :index="1"></vtabbar>
    <div class="m-body">
      <van-tabs
        class="custom-card-tabs"
        v-model="active"
        type="line"
        sticky
        animated
        swipeable
        :title-active-color="$colorjs.baseColor"
        title-inactive-color="#7B8BAB"
        :swipe-threshold="4"
      >
        <van-tab
          v-for="(item, index) in tabList"
          :key="index"
          :title="$t(item.title)"
        >
          <List :tab="item" />
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import Vtabbar from "../components/v-tabbar"
import List from './components/list'
// import Loading from '@/components/loading'
// import TLoading from '@/components/t-loading'
import { allbenefit } from "@/api/activity"

export default {
  name: 'activity',
  components: {
    Vtabbar,
    // Loading,
    // TLoading,
    List
  },
  data () {
    return {
      title: this.$t('优惠活动'),
      active: 0,
      tabList: [
        // 1: this.$t('新手红利')
        // 2: this.$t('常规红利')
        // 3: this.$t('专题红利')
        // 4: this.$t('限时红利')
        // 5: this.$t('VIP红利')
        {
          id: 0,
          title: this.$t('全部红利'),
          img: '',
          imgActive: ''
        },
        {
          id: 5,
          title: this.$t('VIP红利'),
          img: '',
          imgActive: ''
        },
        {
          id: 1,
          title: this.$t('新手红利'),
          img: '',
          imgActive: ''
        },
        {
          id: 3,
          title: this.$t('专题红利'),
          img: '',
          imgActive: ''
        },
        {
          id: 2,
          title: this.$t('常规红利'),
          img: '',
          imgActive: ''
        },
        {
          id: 4,
          title: this.$t('限时红利'),
          img: '',
          imgActive: ''
        },
      ]
    };
  },
  created() {
    // this.onRefresh();
  },
  methods: {
  }
};
</script>

<style scoped lang="less" src="@assets/styles/custom-tabs.less"></style>
<style scoped  lang="less">
  /deep/ .van-nav-bar__title{
    font-weight: bold;
  }
  /deep/.van-nav-bar__content{
    line-height: 88px;
    height: 88px;
  }
  /deep/ .van-nav-bar__left{
    .van-nav-bar__text{
      color: #fff;
    }
  }
  /deep/ .events.van-list{
    background-color: transparent;
  }
</style>
