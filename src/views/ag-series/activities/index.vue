<template>
  <div class="activities">
<!--    <van-nav-bar-->
<!--      class="m-header"-->
<!--      :title="title"-->
<!--      :fixed="true"-->
<!--    />-->
    <vtabbar class="m-footer" :index="1"></vtabbar>
    <div class="m-body">
      <van-tabs
        class="custom-card-tabs"
        v-model="active"
        type="line"
        sticky
        animated
        swipeable
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
      title: this.$t('红利'),
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

<style scoped lang="less" src="@assets/styles/custom-tabs.less" />
<style>
  .activities .m-body{
    padding-top: 0;
  }
</style>
