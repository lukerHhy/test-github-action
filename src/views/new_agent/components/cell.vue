<template>
  <div>
    <van-cell @click="onclik" is-link center>
      <!-- 使用 title 插槽来自定义标题 -->
      <template #title>
        <span :class="['iconfont', icon]"></span>
        <span class="custom-title">{{ title }}</span>
      </template>
      <template #right-icon>
        <slot></slot>
      </template>
    </van-cell>
  </div>
</template>
<script>
export default {
  props: {
    title: String,
    icon: String,
  },
  methods: {
    onclik() {
      this.$emit('click')
    },
  },
}
</script>
<style lang="less" scoped>
.van-cell__title{
  display: flex;
  align-items: center;
}
.custom-title {
  font-size: 28px;
  line-height: 1;
}
.iconfont {
  margin-right: 0.2rem;
  font-size: 40px;
}
</style>
