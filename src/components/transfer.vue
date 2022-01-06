<template>
  <div id="transfer">
    <!-- 额度转账二级弹窗 -->
    <div
      v-if="!type && $route.name !== 'memberCenter'"
      class="pop-head"
    >
      <h2>{{$t('额度转账')}}</h2>
    </div>
    <div class="pop-body">
      <div class="transfer_top">
        <span>{{$t('转出钱包')}}</span>
        <span>{{$t('转入钱包')}}</span>
      </div>
      <div class="account">
        <div
          @click="handleChose(0)"
          class="treasury"
        >{{`${list.from_platform_name}(${list.from_money})`}}</div>
        <!-- <div @click="handleChose(0)" class="treasury">{{value1}}</div> -->
        <img
          @click="changeType"
          :src="$imgs['memberCenter/choose']"
          alt
        />
        <div
          @click="handleChose(1)"
          class="master_account"
        >{{`${list.to_platform_name}(${list.to_money})`}}</div>
        <!-- <div @click="handleChose(1)" class="master_account">{{value2}}</div> -->
      </div>
      <div class="tranfer_amount">
        <p class="amount">{{$t('转入金额')}}</p>
        <div>
          <!-- <span class="icon">￥</span> -->
          <input
            class="input"
            type="number"
            :placeholder="$t('请输入转入金额')"
            @blur="changeNumber"
            v-model="money"
          />
          <span
            class="all"
            @click="money = allMoney"
          >{{$t('全部')}}</span>
        </div>
      </div>
      <div class="transfer_btn">
        <template v-if="dialogType === 'back'">
          <van-button
            :loading-text="'转账中...'"
            :loading="loading"
            @click="onSubmit"
          >{{$t('确定转账')}}</van-button>
          <van-button
            type="primary"
            @click="$store.dispatch('global/setTransfer',{show:false})"
          >{{$t('关闭弹窗')}}</van-button>
        </template>
        <template v-else-if="type">
          <van-button
            :loading-text="'转账中...'"
            :loading="loading"
            @click="onSubmit"
          >{{$t('确定转账')}}</van-button>
          <van-button
            type="primary"
            @click="handleWithdraw"
          >{{$t('继续取款')}}</van-button>
        </template>
        <template v-else>
          <van-button @click="goPlay">{{$t('进入游戏旁观')}}</van-button>
          <van-button
            :loading-text="'转账中...'"
            :loading="loading"
            type="primary"
            @click="onSubmit"
          >{{$t('确认')}}</van-button>
        </template>

      </div>
      <!-- <div class="text">{{$t('取款流水验证有')}}</div> -->
    </div>
    <van-popup
      close-on-popstate
      :class="['custom','close-top','platform-popup']"
      v-model="platformPop"
      :position="'bottom'"
      round
      get-container="#app"
    >
      <!-- <i class="fanhui" @click="$store.dispatch('global/setTransfer', true)"></i> -->
      <van-icon
        name="arrow-left"
        @click="handleClick(true,1)"
      />
      <div class="pop-head">
        <h2>{{[$t('转出钱包'),$t('转入钱包')][choseType]}}</h2>
      </div>
      <div class="choose">
        <div
          v-for="(item,index) in walletList"
          :key="index"
          class="father"
        >
          <div
            class="item"
            @click="chooseFather(item,index)"
          >
            <p class="name">{{item.game_platform_name}}({{item.money}})</p>
            <img
              src="@assets/img3_0/memberCenter/more.png"
              alt
              class="arrow_b"
              v-if="item.platform_list"
              :class='{"active":activeList.indexOf(index) != -1}'
            />
            <img
              src="@assets/img3_0/memberCenter/right.png"
              alt
              v-if="!item.platform_list && ((activeChooseFrom==0 && choseType === 0) || (activeChooseTo == 0 && choseType === 1))"
            />
          </div>
          <div
            v-for="(val,ind) in item.platform_list"
            :key="ind"
            class="son"
            v-show="activeList.indexOf(index) != -1"
          >
            <p
              @click="chooseSon(val, item.game_cate_id)"
              class="name"
            >{{val.game_platform_name}}({{val.money}})</p>
            <img
              src="@assets/img3_0/memberCenter/right.png"
              alt
              v-if="(activeChooseFrom==val.game_platform_id && choseType === 0) || (activeChooseTo==val.game_platform_id && choseType === 1)"
            />
            <img
              @click="shareMoney(val.money_code)"
              v-if="val.isShare && shareWallet[val.money_code].length>1"
              class="shareImg"
              src="@assets/img3_0/memberCenter/share.png"
              alt=""
            >
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import {
  trans,
  gamecateplatform,
  wallet,
} from "@/api/memberCenter";
import { mapState } from "vuex";
import { open } from "@/api/entertainment";
import store from '../store'
import { createSocket, oncloseWS } from '@/utils/socket'

// 进游戏相关
var gamePlayWin
var gamePlayId
var gameCheckTimer
var platformId
var cateId
var allMoney
// 定时器函数
const gameCheck = () => {
  console.log('test', gamePlayWin, gamePlayId, gameCheckTimer)
  let wallet = store.dispatch('users/getWallet')
  const { token } = store.state.users
  // if (gameCheckTimer) {
  //   clearInterval(gameCheckTimer)
  // }
  // gameCheckTimer = setInterval(async () => {
  if (gamePlayWin && !gamePlayWin.closed) {
    if (gamePlayId) {
      // 调用onlinecheck
      // store.dispatch('games/gameOnlineCheck', {
      //   game_id: gamePlayId
      // }).then(res => {
      //   // Notify('online check successful')
      // })
      createSocket(`${process.env.VUE_APP_WS_URL}/connect?token=${token}&ctype=user`)
    }
  } else if (gamePlayId) {
    wallet = store.dispatch('users/getWallet')
    // 窗口关闭，且存在gameId，表明是进了游戏再关闭了
    // 调用 backtrans
    const { gameCatesPlatforms } = store.state.games
    // 判断当前游戏额度是否大于10
    gameCatesPlatforms.map(m => {
      if (m.game_cate_id === cateId) {
        m.platform_list.map(n => {
          if (n.game_platform_id === platformId) {
            allMoney = wallet[n.money_code]
          }
        })
      }
    })
    console.log(allMoney)
    // 未开启免转并且游戏额度大于10
    if (wallet.is_auto_trans === 2 && allMoney > 10) {
      // transferPop.install({ dialogType: 'back', platformId, cateId, allMoney })
      store.dispatch('global/setTransfer', { show: true, platformId, cateId, allMoney, dialogType: 'back', })
      // clearInterval(gameCheckTimer)
      oncloseWS()
      return false
    }
    // store.dispatch('games/gameBacktrans', {
    //   game_id: gamePlayId,
    //   access_token: token,
    //   merchant_no: process.env.VUE_APP_MERCHANT_NO
    // }).then(res => {
    //   // Notify('game back transfer successful')
    // })
    // 再关闭定时器
    // clearInterval(gameCheckTimer)
    oncloseWS()
  }
  // }, 5000)
}


export default {
  props: ['type'],
  data() {
    return {
      platformPop: false,
      iconType: false,
      money: '',
      allMoney: '',
      chooseMoney: 0,
      choseType: 0,
      walletList: [],
      shareWallet: {},
      activeList: [],
      activeChooseFrom: 0,
      activeChooseTo: 0,
      list: {
        pay_password: "1",
        from_platform_id: 0,
        to_platform_id: 0,
        from_platform_name: this.$t('主账户'),
        to_platform_name: this.$t('主账户'),
        from_money_code: 'money',
        from_money: '0',
        to_money_code: 'money',
        to_money: '0',
      },
      walletMoney: {},
      gameId: '',
      platformId: '',
      cateId: '',
      gameData: {},
      dialogType: '',
      loading: false
    }
  },
  computed: {
    ...mapState("global", [
      "showTransfer"
    ]),
    ...mapState("users", [
      "wallet", "token"
    ]),
    ...mapState("games", [
      "gameCatesPlatforms"
    ]),
  },
  watch: {
    showTransfer: {
      handler(val) {
        if (val.show) {
          this.gameId = val.gameId || ''
          this.platformId = val.platformId || ''
          this.cateId = val.cateId || ''
          this.dialogType = val.dialogType || ''
          this.allMoney = val.allMoney || ''
          console.log('allmoney', this.allMoney)
          this.walletM()
          this.initMoney()
        }
      },
      deep: true
    },
    type(val) {
      if (val) {
        this.walletM()
        this.initMoney()
      }
    }
  },
  created() {
    this.walletMoney = JSON.parse(JSON.stringify(this.wallet))
    this.gameId = this.showTransfer.gameId || '',
      this.platformId = this.showTransfer.platformId || '',
      this.cateId = this.showTransfer.cateId || ''
    this.gameId && open({
      game_id: this.gameId
    }).then(res => {
      this.gameData = res.data.data
    })
    const data = JSON.parse(JSON.stringify(this.gameCatesPlatforms));
    for (let a of data) {
      a.game_platform_name = a.game_cate_name;
    }
    data.unshift({
      game_platform_name: this.$t('主账户'),
      game_platform_id: 0,
      game_cate_id: 0,
      money: (this.wallet && this.wallet.money) || 0
    });
    // 筛选共享钱包
    let tmp = []
    let arr = []
    data.forEach(item => {
      if (item.platform_list) {
        item.platform_list.forEach(a => {
          arr.push(a.money_code)
        })
      }
    })
    arr.concat().sort().sort((a, b) => {
      if (a == b && tmp.indexOf(a) === -1) tmp.push(a);
    });
    // 标记共享钱包
    data.forEach(item => {
      if (item.platform_list) {
        item.platform_list.forEach(a => {
          tmp.forEach(b => {
            if (a.money_code == b) {
              a.isShare = true
            }
          })
        })
      }
    })
    // 标记共享钱包平台
    tmp.forEach(item => {
      this.shareWallet[item] = []
      data.forEach(a => {
        if (a.platform_list) {
          a.platform_list.forEach(b => {
            if (b.money_code == item && this.shareWallet[item].indexOf(b.game_platform_name) == -1) {
              this.shareWallet[item].push(b.game_platform_name)
            }
          })
        }
      })
    })
    this.walletList = data;
    this.walletM()
    this.initMoney()
  },
  methods: {
    handleClick(val) {
      // !this.type && this.$store.dispatch('global/setTransfer', {show: val})
      this.platformPop = !val
    },
    changeType() {
      this.iconType = !this.iconType
      const temp = JSON.parse(JSON.stringify(this.list))
      this.list.from_platform_id = temp.to_platform_id
      this.list.to_platform_id = temp.from_platform_id
      this.list.from_platform_name = temp.to_platform_name
      this.list.to_platform_name = temp.from_platform_name
      this.list.from_money_code = temp.to_money_code
      this.list.to_money_code = temp.from_money_code
      this.list.from_money = temp.to_money
      this.list.to_money = temp.from_money
      this.activeChooseFrom = temp.to_platform_id
      this.activeChooseTo = temp.from_platform_id
      this.allMoney = temp.to_money
      console.log(this.list)
    },
    handleChose(val) {
      this.choseType = val
      this.handleClick(false)
    },
    chooseFather(item, index) {
      if (this.activeList.indexOf(index) == -1) {
        this.activeList.push(index);
      } else {
        this.activeList.splice(this.activeList.indexOf(index), 1);
      }
      if (index == 0) {
        if (this.choseType === 0) {
          this.activeChooseFrom = 0;
          this.list.from_platform_id = 0;
          this.list.from_platform_name = this.$t('主账户')
          this.allMoney = this.wallet.money;
          this.list.from_money = this.wallet.money;
        } else {
          this.activeChooseTo = 0;
          this.list.to_platform_id = 0;
          this.list.to_platform_name = this.$t('主账户')
          this.list.to_money = this.wallet.money;
        }
        this.platformPop = false
      }
    },
    chooseSon(val, cateId) {
      const temp = this.walletList.filter(item => item.game_cate_id === cateId)[0].game_cate_name

      if (this.choseType === 0) {
        this.activeChooseFrom = val.game_platform_id;
        this.list.from_platform_id = val.game_platform_id;
        this.list.from_platform_name = `${temp}/${val.game_platform_name}`
        this.list.from_money = val.money || '0.00'
        this.list.from_money_code = val.money_code
        this.allMoney = this.list.from_money
      } else {
        this.activeChooseTo = val.game_platform_id;
        this.list.to_platform_id = val.game_platform_id;
        this.list.to_platform_name = `${temp}/${val.game_platform_name}`
        this.list.to_money = val.money || '0.00'
        this.list.to_money_code = val.money_code
      }
      this.platformPop = false
    },
    walletM() {
      this.list.from_money = this.wallet.money || '0.00'
      if (!this.allMoney) this.allMoney = this.list.from_money
      this.walletMoney = this.wallet
      let list = this.walletList;
      list.forEach(val => {
        if (val.game_cate_id == this.wallet.last_platform_cate_id) {
          val.hot = 1
        } else {
          delete val.hot
        }
        val.money = 0;
        // 游戏分类金额
        for (let key in this.walletMoney) {
          if (val.game_cate_id == key.split('_')[1]) {
            val.money = (this.walletMoney[key] * 1).toFixed(2);
          }
          if (key == 'money') {
            val.money = (this.walletMoney[key] * 1).toFixed(2);
          }
        }
        // 游戏平台金额
        if (val.platform_list) {
          val.platform_list.forEach(item => {
            for (let key in this.walletMoney) {
              if (item.money_code == key) {
                item.money = (this.walletMoney[key] * 1).toFixed(2);
              }
            }
          });
        }
      });
      if (this.wallet.last_platform_cate_id == 0) {
        list[0].hot = 1;
      }
      this.walletList = list;
    },
    initMoney() {
      if (this.dialogType === 'back') {
        this.list.to_money = this.walletMoney.money
        this.list.to_platform_id = 0
        this.list.to_platform_name = this.$t('主账户')
        this.list.from_platform_id = this.platformId
        this.activeChooseFrom = this.platformId
        this.walletList.map(item => {
          if (item.game_cate_id === this.cateId) {
            item.platform_list.map(m => {
              if (m.game_platform_id === this.platformId) {
                this.list.from_platform_name = `${item.game_cate_name}/${m.game_platform_name}`
                this.list.from_money = `${this.walletMoney[m.money_code]}`
                this.list.from_money_code = m.money_code
              }
            })
          }
        })
        return false
      }
      if (this.type) {
        this.list.to_money = this.walletMoney.money
        this.list.to_platform_id = 0
        this.list.to_platform_name = this.$t('主账户')
        const temp = JSON.parse(JSON.stringify(this.walletList))
        console.log(111, this.walletList)
        let maxMoney = 0
        let maxMoneyId = 0
        let maxCate = ''
        let maxPlat = ''
        temp.forEach(item => {
          // if (['gm_ag_money', 'gm_bbin_money'].indexOf(item.money_code) !== -1) {
          //   return
          // }
          item.platform_list && item.platform_list.forEach(p => {
            if (this.wallet[p.money_code] > maxMoney) {
              maxMoneyId = p.game_platform_id
              maxMoney = this.wallet[p.money_code]
              maxCate = item.game_cate_name
              maxPlat = p.game_platform_name
            }
          })
        })
        console.log(222, maxMoney, maxMoneyId, maxCate, maxPlat)
        this.list.from_money = maxMoney
        this.activeChooseFrom = maxMoneyId
        this.list.from_platform_id = maxMoneyId
        this.list.from_platform_name = `${maxCate}/${maxPlat}`
        this.allMoney = maxMoney
        return false
      }
      this.list.from_money = this.walletMoney.money
      this.list.from_platform_id = 0
      this.list.from_platform_name = this.$t('主账户')
      this.list.to_platform_id = this.platformId
      this.activeChooseTo = this.platformId
      this.walletList.map(item => {
        if (item.game_cate_id === this.cateId) {
          item.platform_list.map(m => {
            if (m.game_platform_id === this.platformId) {
              this.list.to_platform_name = `${item.game_cate_name}/${m.game_platform_name}`
              this.list.to_money = `${this.walletMoney[m.money_code]}`
              this.list.to_money_code = m.money_code
            }
          })
        }
      })
    },
    onSubmit() {
      let { from_platform_id, to_platform_id } = this.list
      if (!from_platform_id && from_platform_id !== 0) {
        return this.$toast.fail(this.$t('请选择转出游戏账户类型'))
      }
      if (from_platform_id !== 0 && to_platform_id !== 0) {
        return this.$toast.fail(this.$t('游戏平台间不能进行转账'))
      }
      if ((!to_platform_id && to_platform_id !== 0) || from_platform_id === to_platform_id) {
        return this.$toast.fail(this.$t('请选择转入游戏账户类型'))
      }
      if (!this.money) {
        return this.$toast.fail(this.$t('请输入转账金额'))
      }
      this.submitLoading = true
      const data = {
        money: this.money,
        from_platform_id,
        to_platform_id
      }
      this.loading = true
      trans(data)
        .then(res => {
          this.loading = false
          this.$toast(this.$t('转账成功'))
          this.money = ''
          // this.list.from_platform_id = [0]
          // this.list.to_platform_id = [0]
          this.$store.dispatch('users/getWallet')
          console.log('type', this.dialogType)
          if (this.dialogType !== 'back' && this.gameId) {
            this.goPlay()
          } else {
            console.log('gameid', this.dialogType)
            if (this.dialogType) this.$store.dispatch('global/setTransfer', { show: false })
            else this.handleWithdraw()
            // !this.gameId && this.handleWithdraw()
          }
        })
        .catch(() => {
          this.loading = false
        })
    },
    // onMoneyChange (value) {
    //   console.log(value)
    //   // this.money = Math.floor(parseFloat(value))
    // },
    changeNumber() {
      let str = '' + this.money
      if (str.indexOf('.') != -1) {
        let arr = str.split('.')
        arr.splice(arr.length - 1)
        let str2 = arr.join('')
        this.money = +str2
      }
    },
    newWin(url) {
      const isSafari = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent)
      if (isSafari) {
        // 回调前打开一个新窗口
        const win = window.open("", "_blank");
        // 打开新窗口
        win.location = url;
      } else {
        //创建A标签
        var a = document.createElement('a');
        //给创建好的a标签赋值
        a.setAttribute('href', url);
        //设置css 隐藏属性
        a.setAttribute('style', 'display:none');  
        //设置 a标签为新窗口打开
        a.setAttribute('target', '_blank');  
        //将设置好的a标签，添加到 body 内
        document.body.appendChild(a);
        //模拟点击
        a.click();
        //移除a标签
        a.parentNode.removeChild(a);
      }
    },
    goPlay() {
      platformId = this.platformId
      cateId = this.cateId
      console.log(this.wallet)
      this.$store.dispatch('global/setTransfer', { show: false })
      // gamePlayWin = window.open('', 'gamePlayWin')
      if (this.wallet.open_mode === 2) {
        // gamePlayWin = window.open(this.gameData.url, 'gamePlayWin')
        // gamePlayWin.location = this.gameData.url
        this.newWin(this.gameData.url)
        gamePlayId = this.gameId
        gameCheck()
        return false
      }
      let routeUrl = this.$router.resolve({
        path: '/game',
        query: {
          game_id: this.gameId || '',
          platform_id: this.platformId,
          cate_id: this.cateId,
          at: this.token
        }
      })
      console.log(routeUrl.href)
      this.newWin(routeUrl.href)
      // gamePlayWin.location = routeUrl.href
      // gamePlayWin = window.open(routeUrl.href, 'gamePlayWin')
      // openUrl(routeUrl.href)
      gameId = this.gameId
      gameCheck()
    },
    handleWithdraw() {
      this.$store.dispatch('global/setFlow', false)
      this.$router.push('/withdraw')
    }
  }
}
</script>

<style lang="less" scoped>
.van-icon-arrow-left {
  position: absolute;
  font-size: 40px;
  top: @space-gap;
  left: @space-gap;
  color: #fff;
  z-index: 99;
}
#transfer {
  .pop-body {
    .transfer_top {
      display: flex;
      span {
        &:nth-child(2) {
          position: relative;
          left: 30px;
        }
        flex: 1;
      }
      margin-bottom: 20px;
    }
    .account {
      display: flex;
      align-items: center;
      .rotateChose {
        transform: rotate(180deg);
      }
      > img {
        width: 28px;
        height: 28px;
        top: 50%;
        margin-top: -14px;
        margin-left: 24px;
        margin-right: 24px;
      }
      .treasury,
      .master_account {
        width: 300px;
        background-color: #191919;
        height: 88px;
        line-height: 88px;
        border-radius: 8px;
        font-size: 28px;
        padding-left: 20px;
      }
    }
    .tranfer_amount {
      margin-top: 40px;
      margin-bottom: 40px;
      > div {
        position: relative;
        .icon {
          position: absolute;
        }
        .all {
          position: absolute;
          font-size: 28px;
          right: 24px;
          top: 50%;
          margin-top: -14px;
        }
      }
      .amount {
        margin-bottom: 20px;
      }
      .input {
        width: 100%;
        background: #191919;
        height: 88px;
        border: 0;
        outline: none;
        border-radius: 8px;
        padding: 30px 24px;
      }
    }
    .transfer_btn {
      display: flex;
      justify-content: space-between;
      .van-button {
        width: 330px;
      }
    }
  }
}

.choose {
  padding: 0.1333rem 0.4rem 1.0667rem;
  overflow: hidden;
  padding-left: 0.4rem;
  height: 10.6667rem;
  overflow-y: scroll;
  > .father {
    line-height: 98px;
    font-size: 0.4267rem;
    border-bottom: 2px solid @border-color;
    > .item {
      overflow: hidden;
      > .name {
        color: #999;
        float: left;
      }
      > img {
        display: block;
        width: 0.5867rem;
        height: 0.5867rem;
        margin: 0.3733rem 0.4rem 0 0;
        float: right;
      }
      > .arrow_b {
        transform: rotate(90deg);
        transition: all 0.5s;
        &.active {
          transform: rotate(-90deg);
        }
      }
    }
    > .son {
      line-height: 98px;
      font-size: 0.4267rem;
      border-bottom: 2px solid @border-color;
      height: 98px;
      padding-left: 0.4rem;
      position: relative;
      display: flex;
      &:last-child {
        border-bottom: 0;
      }
      > .name {
        color: #999;
        float: left;
        flex: 1;
      }
      > img {
        display: block;
        width: 0.5867rem;
        height: 0.5867rem;
        margin: 0.3733rem 0.4rem 0 0;
        &.shareImg {
          position: absolute;
          // transform: rotate(270deg);
          left: 0;
          top: -4px;
          margin: 0;
        }
      }
    }
  }
}
</style>
