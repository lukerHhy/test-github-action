
<template>
  <div class="activities">
    <van-nav-bar
      class="m-header"
      :title="title"
      :fixed="true"
      @click-right="$openKefu"
    >
      <van-icon name="service" slot="right" class="kefu" />
    </van-nav-bar>
    <vtabbar class="m-footer" :index="3"></vtabbar>
    <div class="m-body">
      <van-tabs
        class="custom-card-tabs"
        v-model="active"
        type="card"
        sticky
        animated
        swipeable
        :swipe-threshold="4"
        v-if="$config[$projectname].default"
      >
        <van-tab
          v-for="(item, index) in tabList"
          :key="index"
          :title="$t(item.title)"
        >
          <List :tab="item" />
        </van-tab>
      </van-tabs>
      <template v-else>
        <div class="tab-wrapper">
          <List :tab="{id: '', title: '全部'}" />
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import Vtabbar from "@/components/v-tabbar"
import List from './components/list'
// import Loading from '@/components/loading'
// import TLoading from '@/components/t-loading'

export default {
  name: 'Brand',
  components: {
    Vtabbar,
    // Loading,
    // TLoading,
    List
  },
  data () {
    return {
      title: this.$t('品牌'),
      active: 0,
      tabList: [
        {
          id: '',
          title: this.$t('全部')          
        },
        {
          id: 1,
          title: this.$t('品牌代言')          
        },
        {
          id: 2,
          title: this.$t('战略合作')          
        },
        {
          id: 3,
          title: this.$t('线下实体')          
        },
        {
          id: 4,
          title: this.$t('公益赞助')          
        }
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

