<template>
  <div @click="show = true" class="select-bank">
    <slot></slot>
    <van-popup
        @click.stop
        class="custom yabo-bank"
        v-model="show"
        closeable
        round
        close-icon-position="top-left"
        position="bottom"
        get-container="#app">
      <div class="pop-head">
        <h2>{{$t('开户银行')}}</h2>
      </div>
      <div class="pop-body list-cells">
        <div :key="index" class="cell" v-for="(item, index) in bankcards" @click="onSelect(item)">
          <div class="cell-head">
            <BankIcon :bankCode="item.icon_code"/>
          </div>
          <div class="cell-body">{{
              item.bank_name +
              `（${$t('尾号')}` + item.card_no.substr(item.card_no.length - 4,
                  item.card_no.length) + '）'
            }}
          </div>
          <div class="cell-foot" v-if="value === item.id">
            <van-icon name="success"/>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import BankIcon from "@/components/bank-icon";
import {bankcardlist} from "@/api/agent";

export default {
  name: "BankcardList",
  data() {
    return {
      show: false,
      bankcards: []
    };
  },
  components: {
    BankIcon
  },
  props: ["bankText", "value"],
  // computed: {
  //   lists () {
  //     return this.lists && this.lists.length ? this.lists : []
  //   }
  // },
  created() {
    bankcardlist().then(res => {
      if (res.data.code === 0) {
        this.bankcards = res.data.data;
      }
    });
  },
  methods: {
    onSelect(bankcard) {
      this.$emit("input", bankcard.id);
      this.$emit("update:bankText", bankcard.bank_name);
      this.$emit("update:bank", bankcard);
      this.show = false;
    }
  }
};
</script>
<style scoped lang="less">
.select-bank {
  display: flex;
  flex: 1;

  input {
    flex: 1;
  }
}

.custom {
  display: flex;
  flex-direction: column;

  .pop-body {
    flex: 1;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
  }
}
</style>
