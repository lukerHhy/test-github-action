<template>
  <div class="everyday-entrance">
    <van-image
      class="entrance-bg"
      lazy
      :src="require('@/assets/common/img/everyday/everyday-bg@3x.png')"
    />
    <van-image
      class="entrance-btn"
      lazy
      :src="require('@/assets/common/img/everyday/everyday-btn@3x.png')"
    />
  </div>
</template>

<script>
export default {
  name: 'EverydayEntrance'
}
</script>

<style lang="less" scoped>
@keyframes scale {
	0% {
    transform: scale(0.6);
  }
	100% {
    transform: scale(1);
  }
}

.everyday-entrance {
  position: relative;
  width: 152px;
  height: 152px;

  .entrance-bg {
    width: 100%;
  }

  .entrance-btn {
    // width: 110px;
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    // margin-left: -55px;
    animation: scale .3s linear 0s infinite alternate;
  }

  /deep/ img {
    width: 100%;
    display: block;
  }
}
</style>
