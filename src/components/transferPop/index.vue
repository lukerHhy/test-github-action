<template>
  <div id="transferPop">
    <!-- 额度转账一级弹窗 -->
    <van-popup
      close-on-popstate
      :class="['custom','close-top']"
      v-model="transferPop"
      :closeable="true"
      :position="'bottom'"
      round
      @close="$store.dispatch('global/setTransfer', {show: false})"
      get-container="#app"
    >
      <transfer />
    </van-popup>
  </div>
</template>

<script>
import transfer from '@/components/transfer'
import { mapState } from "vuex";

export default {
  data() {
    return {
      transferPop: false,
    }
  },
  components: {
    transfer
  },
  computed: {
    ...mapState("global", [
      "showTransfer"
    ]),
  },
  watch: {
    showTransfer:{
      handler(val) {
        console.log(val)
        this.transferPop = val.show
      },
      deep: true
    }
  }
}
</script>

<style>

</style>