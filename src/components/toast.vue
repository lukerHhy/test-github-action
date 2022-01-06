<template>
  <div
    v-if="show"
    class="toast"
  >
    <div class="box">
      <div class="title">
        <span>{{title || i18n.t('系统提示')}}</span>
        <!-- <span @click='close'></span> -->
        <van-icon
          @click='close'
          name="cross"
        />
      </div>
      <p
        class="content"
        v-html="content"
      />
      <div
        class="btn"
        @click='sure'
      >{{btnTxt || i18n.t('我知道了')}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tips',
  props: {
    title: {
      type: String,
      defualt: ''
    },
    content: {
      type: String,
      defualt: ''
    },
    btnTxt: {
      type: String,
      defualt: ''
    },
    onClose: {
      type: Function,
      defualt: () => { }
    },
    onSure: {
      type: Function,
      defualt: () => { }
    }
  },
  data() {
    return {
      show: false
    }
  },
  methods: {
    sure() {
      this.show = false
      this.onSure()
      this.$emit("sure", 1);
    },
    close() {
      this.show = false
      this.onClose()
      this.$emit("close", 1);
    }
  }
}
</script>

<style lang="less" scoped>
.toast {
  background-color: rgba(0, 0, 0, 0.8);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10000;
  display: flex;
  justify-content: center;
  align-items: center;
  > .box {
    width: 670px;
    background-color: @bg-color;
    border-radius: 12px;
    position: relative;
    overflow: hidden;
    > .title {
      height: 120px;
      line-height: 120px;
      background-color: @bg-color;
      color: #fff;
      font-weight: bold;
      text-align: center;
      border-radius: 0.08rem 0.08rem 0 0;
      width: 100%;
      border-bottom: 2px solid #3d3d3d;
      > span {
        text-align: center;
        font-size: 36px;
      }
      > i {
        position: absolute;
        top: 30px;
        right: 30px;
        font-size: 40px;
        color: #ccc;
      }
    }
    > .content {
      font-size: 32px;
      color: #999;
      line-height: 48px;
      padding: 60px 45px;
      text-align: center;
    }
    > .btn {
      width: 360px;
      height: 90px;
      line-height: 90px;
      margin: 0 auto 56px;
      text-align: center;
      color: #232321;
      font-size: 0.4rem;
      background: @primary-color;
      border-radius: 0.08rem;
      font-weight: bold;
    }
  }
}
</style>
