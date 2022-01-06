<template>
    <div class="drawer">
        <div class="pop-head">
            <h2>{{types[tipsDisplay.type].title}}</h2>
        </div>
        <h4>{{types[tipsDisplay.type].desc}}</h4>
        <div class="cells cells-1">
            <div class="div">{{$t('主钱包')}}</div>
            <div class="border"></div>
            <div class="div">{{$t('游戏额度')}}</div>
            <div class="border"></div>
            <div class="div">{{$t('理财小金库')}}</div>
        </div>
        <div class="cells cells-2">
            <div class="div">{{ (wallet && wallet.money || 0) | currency('') }}</div>
            <div class="border"></div>
            <div class="div">{{ (wallet && wallet.all_platform_money || 0) | currency('') }}</div>
            <div class="border"></div>
            <div class="div">{{ (wallet && wallet.financing_money || 0) | currency('') }}</div>
        </div>
        <div class="input-cells">
            <div class="aagames-button-box">
                <button class="aagames-button aagames-button-default" type="button" @click="onCancel">
                    {{types[tipsDisplay.type].cancelButtonText}}
                </button>
                <button class="aagames-button" type="button" @click="onConfirm">
                    {{types[tipsDisplay.type].confirmButtonText}}
                </button>
            </div>
        </div>
    </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    props: {
      'tipsDisplay': {
        type: Object, default () {
          return {}
        }
      },
    },
    data () {
      return {
        getCode: '',
        code: '',
        areaCode: 86,
        columns: [],
        show: false,
        types: {
          1: {
            title: this.$t('余额不足'),
            desc: this.$t('您的账户余额不足，是否进入游戏'),
            confirmButtonText: this.$t('立即存款'),
            cancelButtonText: this.$t('进入游戏旁观'),
          },
          2: {
            title: this.$t('温馨提示'),
            desc: this.$t('您首次进入本游戏，建议您先查看新手教程，助利您盈利多多哦!'),
            confirmButtonText: this.$t('进入游戏'),
            cancelButtonText: this.$t('立即存款'),
          },
          3: {
            title: this.$t('温馨提示'),
            desc: this.$t('您可以选择自动转账进入游戏，将自动把主钱包余额带入游戏哦！'),
            confirmButtonText: this.$t('进入游戏旁观'),
            cancelButtonText: this.$t('自动转入游戏'),
          }
        }
      }
    },
    created () {

    },
    computed: {
      ...mapState('users', ['token', 'wallet', 'userInfo', 'username'])
    },
    components: {},
    mounted () {},
    methods: {
      closeByButton () {
        this.$store.dispatch('global/setPopShow', {status: false,hideFooter:true})
      },
      onConfirm (val) {
        this.closeByButton()
        this.tipsDisplay.confirm && this.tipsDisplay.confirm()
      },
      onCancel () {
        this.closeByButton()
        this.tipsDisplay.cancel && this.tipsDisplay.cancel()
      },
    }
  }
</script>

<style lang="less" scoped>
    h4{
        padding: 0 20px;
    }
    .cells {
        width: 692px;
        height: 200px;
        border-radius: 4px;
        display: flex;
        border: 2px solid rgba(53, 52, 53, 1);
        .div {
            text-align: center;
            flex: 1;
            line-height: 100px;

        }
        .border {
            width: 2px;

        }

    }

    .cells-1 {
        margin: 40px auto 0;

        height: 100px;
        background-color: rgba(53, 52, 53, .5);
        .div {
            color: #999999;
            font-size: 28px;
            font-weight: 400;
            color: rgba(153, 153, 153, 1);
        }
        .border {
            background-color: #353435
        }
    }

    .cells-2 {
        margin: 0 auto 40px;
        height: 100px;
        .div {
            color: #F5F5F5;
            font-size: 32px;
            font-weight: bold;
        }
        .border {
            background-color: rgba(53, 52, 53, 1)
        }
    }
    .input-cells{
      .aagames-button{
        width:320px;
      }
    }
</style>
