
<style scoped lang="less">
  .steps{
    margin: 0 auto;
    width: 640px;
    ul{
      display: flex;
      align-items: center;
      justify-content: center;
      li{
        text-align: center;
        color: #CCCCCC;
        &:first-child{
          &:before{
            display: none;
          }
        }
        &.active{
          color: #F5F5F5;
          font-size: 30px;
          width:35%;
          .iconfont{
            background-color: #BE8D24;
            color: #fff;
          }
          &:before{
            background-color: #BE8D24;
          }
        }
      }
    }
  }
  .app-name-10024 {
    .steps{}
  }
</style>
<template>
  <div class="steps">
    <ul >
      <template v-if="type == 1">
        <li class="pr" v-for="(item, index) in steps1" :key="index" :class="{ active: step === index + 1  }">
            <span :class="{'shrink':lang==='en'}"> {{$t(item.title)}}</span> 
        </li>
      </template>
      
      <template v-else-if="type == 2">
        <li class="pr" v-for="(item, index) in steps2" :key="index" :class="{ active: step === index + 1  }">
          <span :class="{'shrink':lang==='en'}"> {{$t(item.title)}}</span> 
        </li>
      </template>
      
      <template v-else-if="type == 3">
        <li class="pr" v-for="(item, index) in steps3" :key="index" :class="{ active: step === index + 1  }">
           <span :class="{'shrink':lang==='en'}"> {{$t(item.title)}}</span> 
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'securityStep',
  props: {
    step: {
      type: Number,
      default: 1
    },
    type: {
      type: Number,
      default: 1
    }
  },
  data () {
    const steps1 = [{
      icon: 'user',
      title: this.$t('输入您的账号')
    }, {
      icon: 'safety',
      title: `>${this.$t('身份验证')}`
    }, {
      icon: 'password',
      title: `>${this.$t('重置密码')}`
    }];
    const steps2 = [{
      icon: 'user',
      title: this.$t('输入您的账号')
    }, {
      icon: 'safety',
      title: `>${this.$t('身份验证')}`
    }, {
      icon: 'password',
      title: `>${this.$t('设置新密保问题')}`
    }];
    const steps3 = [{
      icon: 'user',
      title: this.$t('输入您的账号')
    }, {
      icon: 'safety',
      title: `>${this.$t('身份验证')}`
    }, {
      icon: 'password',
      title: `>${this.$t('设置新资金密码')}`
    }];
    return {
      steps1,
      steps2,
      steps3
    }
  }
}
</script>

