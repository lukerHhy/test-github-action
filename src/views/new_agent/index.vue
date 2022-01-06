<template>
  <div class="agentApp" :class="{'agentNoBorder':$route.path ==='/agent'}">
    <!-- <transition :name="transitionName"> -->
    <router-view></router-view>
    <!-- </transition> -->
    <Tabfooter
        :tabItems="tabItems"
        v-show="!this.$route.meta.isShowTabbar"
    ></Tabfooter>
  </div>
</template>
<script>
import Tabfooter from './components/tabfooter'
import {userinfo} from '@/api/agent'

export default {
  components: {Tabfooter},
  watch: {
    $route(to, from) {
      //如果to索引大于from索引,判断为前进状态,反之则为后退状态
      if (to.meta.index > from.meta.index) {
        //设置动画名称
        this.transitionName = 'slide-left'
      } else {
        this.transitionName = 'slide-right'
      }
    },
  },
  data() {
    return {
      tabItems: [
        {
          icon: 'icon-shouye_liebiaotubiao',
          title: this.$t('首页'),
          path: '/agent/agentHomepage',
        },
        {
          icon: 'icon-chengyuan',
          title: this.$t('成员'),
          path: '/agent/agentMember',
        },
        {
          icon: 'icon-tuiguang',
          title: this.$t('推广'),
          path: '/agent/agentExtension',
        },
        {
          icon: 'icon-yongjin2',
          title: this.$t('佣金'),
          path: '/agent/agentCommission',
        },
        {
          icon: 'icon-wode',
          title: this.$t('我的'),
          path: '/agent',
        },
      ],
      transitionName: '',
    }
  },
  created() {
    userinfo({
      access_token: window.localStorage.agToken,
    }).then((res) => {
      if (res.data.code === 0) {
        // let t2 = moment(res.data.data.created_at)

        window.localStorage.setItem(
            'userInfoForAgent',
            JSON.stringify(res.data.data)
        )
      } else {
        window.localStorage.removeItem('userInfoForAgent')
        window.localStorage.removeItem('agToken')
        window.localStorage.removeItem('agId')
        this.$router.back()
      }
    })
  },
}
</script>
<style lang="less" scoped>
.agentApp {
  width: 100%;
  height: 100%;
  background: @bg-color;
  padding: 0.2rem 0.4rem;
  overflow-y: auto;
  padding-bottom: 1.6rem;
  overflow-x: hidden;
}

.agentNoBorder {
  padding: 0.2rem 0;
}

.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 500ms;
  position: absolute;
}

.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}

.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
</style>
