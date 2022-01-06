<template>
  <div class="home-layout">
    <p class="tip">
      <!-- <span class="iconfont icon-bianzu6" style="font-size:12px"> </span> -->
      <img
        src="../images/bianzu.png"
        style="width:.5rem"
      />
      <span style="margin-left: 5px;font-size: 0.45rem;">{{ title }}</span>
      <span class="right-btn"><slot name="rightBtn" /></span>
    </p>
    <slot />
  </div>
</template>
<script>
import img from './img.vue'
export default {
  components: { img },
  props: {
    title: String,
  },
}
</script>
<style lang="less" scoped>
.home-layout {
  position: relative;
  .tip {
    line-height: 1rem;
    font-size: 0.5rem;
    height: 1rem;
    position: relative;
    display: flex;
    align-items: baseline;
    .right-btn {
      margin-left: auto;
    }
  }
  .icon-bianzu6 {
    color: @text-color;
  }
}
</style>
