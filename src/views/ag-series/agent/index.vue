<style scoped lang="less">
@import url('~@assets/styles/agent/index.less');

.container {
  display: flex;
  min-height: 100vh;
  flex-direction: column;

  .main {
    padding: 0;

    .member {
      padding: 30px;
      box-sizing: border-box;
      display: flex;

      .avatar {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        margin-right: 26px;
        background-size: cover;
        background-position: center;
      }

      .right {
        flex: 1;

        .name {
          height: 56px;
          font-size: 40px;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
          line-height: 56px;
        }

        .desc {
          margin-top: 8px;
          height: 34px;
          font-size: 24px;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          line-height: 34px;
        }
      }
    }

    .user {
      padding: 40px;
      display: flex;
      height: 304px;
      flex-direction: column;
      border-radius: 8px;

      .name {
        height: 34px;
        font-size: 24px;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 34px;
      }

      .money {
        margin-top: 6px;
        height: 48px;
        font-size: 40px;
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
        line-height: 48px;
      }

      .left, .right {
        flex: 1;
      }

      .top {
        display: flex;
        flex: 1;

        .left {
          .name{
            color: rgba(255, 255, 255, 1);
          }
        }

        .but {
          text-align: center;
          width: 120px;
          height: 60px;
          border-radius: 8px;
          border: 2px solid rgba(255, 255, 255, 1);
          font-size: 28px;
          font-weight: 600;
          color: rgba(255, 255, 255, 1);
          line-height: 60px;
        }

        .money {
          height: 70px;
          font-size: 60px;
          font-weight: bold;
          line-height: 70px;
        }
      }

      .bottom {
        margin-top: 24px;
        flex: 1;
        display: flex;

        .left {
        }

        .right {

        }
      }
    }

    .domain {
      margin: 0 auto;
      .no-domain {
        margin: 0 auto;
        padding: 0 20px;
        font-size: .373333rem;
        font-weight: 400;
        color: #fff;
        margin-top: .466667rem;
      }

      .header {
        display: flex;
        justify-content: space-between;
        width: 100%;

        .title {
          font-size: .373333rem;
          font-weight: 600;
          color: #222;
        }

        .lookmore {
          font-size: .373333rem;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
        }

        .light-color {
          color: #AD7600;
        }
      }

      .list {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 20px;
        width: 690px;
        height: 88px;
        margin: 0 auto;

        .domain-name {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          width: 400px;
          height: 34px;
          font-size: 24px;
          font-weight: 400;
          color: @text-color-white;
          line-height: 34px;

          #domainFullPath {
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
          }
        }

        .copy {
          text-align: center;
          width: 80px;
          height: 40px;
          border-radius: 24px;
          border: 2px solid @text-color-white;
          font-size: 24px;
          font-weight: 400;
          color: @text-color-white;
          line-height: 40px;
        }

        .qrData {
          width: 44px;
          height: 44px;
        }
      }
    }

    // 个人中心-菜单入口
    .person-entr {
      /*background-color: #fff;;
      margin: @margin-10;*/

      .input {
        border-bottom: 1px solid @border-color;
        margin-right: 0;
        display: flex;
        align-items: center;
        padding: 0 20px 0 30px;
        height: 100px;

        .text{
          flex: 1;
          color: #999;
          font-size: 32px;
        }

        .icon {
          width: 40px;
          margin-right: 28px;

          &.dailibaobiao {
            width: 37px;
            position: relative;
          }
          &.iconpassword{
            width: 30px;
          }
        }

        .more {
          width: 44px;
        }
      }

      .noBorder {
        border-bottom: none;

        &:after {
          display: none;
        }
      }

      .br {
        width: 750px;
        height: 20px;
        background: @bg-color-4;
      }
    }

    // 退出
    .login-out {
      margin-top: 102px;
      // color: #CCCCCC;
      // background-color: #353435;
    }
  }
}

.domain-dialog {
  background: none;
  height: 800px;

  .website {
    background-color: #FFFFFF;
    border-radius: 20px;
    position: relative;
    color: #67382F;
    line-height: 64px;
    font-size: 32px;
    text-align: center;
    padding-bottom: 30px;

    .url {
      font-size: 30px;
      color: #B4B4B4;
      text-align: center;
    }

    .qrData {
      width: 520px;
      height: 520px;
    }

    .download {
      text-align: center;
      font-size: 28px;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      margin-top: -50px;
    }

    .cross {
      width: 80px;
      position: absolute;
      bottom: -134px;
      left: 50%;
      margin-left: -40px;
    }
  }
}
</style>
<template>
  <div class="container agentIndex">
    <lheader :goback="true" :get-switch="false" :title="title"></lheader>
    <div class="main">
      <div class="member">
        <div class="avatar" :style="{backgroundImage:`url(${require('@assets/img3_0/memberCenter/login-out.png')})`}">

        </div>
        <div class="right">
          <div class="name">{{ list.username }}</div>
          <div class="desc">
             {{$t('这是您成为')}} 
             {{ $t($config[$projectname].project) }}
             {{$t('代理的第')}}{{
              list.day + 1
            }}{{$t('天')}}
          </div>
        </div>
      </div>

      <!-- 推广域名 -->
      <div class="domain">
        <!-- 用户信息 -->
        <div class="user">
          <div class="top">
            <div class="left">
              <div class="name">
{{$t('本月有效投注')}}
              </div>
              <div class="money">{{ usercount.valid_invest }}</div>
            </div>
            <div class="but" @click="carryCash">
{{$t('取款')}}
            </div>
          </div>
          <div class="bottom">
            <div class="left">
              <div class="name">
{{$t('佣金钱包')}}
              </div>
              <div class="money">{{ list.commission_money }}</div>
            </div>
            <div class="left">
              <div class="name">
{{$t('代理钱包')}}
              </div>
              <div class="money">{{ list.money }}</div>
            </div>
            <div class="right">
              <div class="name">
{{$t('本月佣金')}}
              </div>
              <div class="money">{{ list.month_commission_v2 }}</div>
            </div>
          </div>
        </div>
        <div class="list" v-if="agent_domain.length>0" v-for="(item, index) in agent_domain" :key="index">
          <div class="domain-name">{{$t('推广域名')}}<span id="domainFullPath">{{ item.domainFullPath }}</span></div>

          <div class="copy" data-clipboard-target="#domainFullPath" @click="copy">
{{$t('复制')}}
          </div>
          <div style="flex:1"></div>
          <img class="qrData" @click="clickDomain(item)" :src="require('@assets/img3_0/agent/home/agentqrcode.png')"
               alt="">
        </div>
        <div class="no-domain list" v-if="!agent_domain.length">{{$t('暂无域名')}}</div>
      </div>
      <!-- 菜单 -->
      <div class="person-entr">
        <div class="submit-form">
          <template v-for="(item,index) in menuList">
            <div :key="index" v-if="item.text" class="input" :class="{noBorder: item.noBorder}"
                 @click="goPage(item.path)">
              <img :class="['icon',item.icon]" :src="require(`@assets/img3_0/otherIcon/${item.icon}@2x.png`)" alt="">
              <p class="text">{{ item.text }}</p>
              <img class="more" :src="require('@assets/img3_0/otherIcon/more@2x.png')" alt="">
            </div>
            <div :key="index" class="br" v-if="!item.text"></div>
          </template>
          <div class="br"></div>
        </div>
      </div>
      <!-- 退出登录 -->

      <div class="aagames-button-box">
        <button type="button" class="aagames-button login-out dark" @click="signOut">{{$t('退出登录')}}</button>
      </div>
    </div>

    <van-popup class="domain-dialog" v-model="show">
      <div class="website">
        <!--<div class="url" id="domainFullPath">{{curDomain.domainFullPath}}</div>-->
        <img class="qrData" @click="download" :src="list.qrData" alt="">
        <div class="download">{{$t('点击保存二维码')}}</div>
        <img :src="require('@assets/img3_0/agent/home/agentclose.png')" class="cross" @click="show = false" alt="">

      </div>

    </van-popup>
    <vipOpen v-model="vipOpenShow"></vipOpen>

    <!-- <loading :isShow="isLoading" :title="'获取信息中...'"></loading> -->
  </div>
</template>

<script>
import moment from 'moment'
import Vue from 'vue'
import Clipboard from 'clipboard'
import QRCode from 'qrcode'
import {Dialog} from 'vant'
import Lheader from '@/components/l-header'
import Loading from '@/components/loading'
import vipOpen from '../../agent/vipOpen'
import {usercount, userinfo} from '@/api/agent'

Vue.use(Dialog)

export default {
  name: 'login',
  components: {
    Loading,
    Lheader,
    vipOpen
  },
  data() {
    return {
      login: this.$t('注册'),
      title: this.$t('代理中心'),
      vipOpenShow: false,
      isLoading: false,
      active: 0,
      isAgree: false,
      show: false,
      message: '',
      list: {},
      usercount: {},
      menuList: [
        {
          icon: 'dailibaobiao',
          path: 'agentFrom',
          text: this.$t('代理报表')
        },
        {
          icon: 'lcjl',
          path: 'reportForm',
          text: this.$t('佣金报表')
        },
        {
          icon: 'zbjl',
          path: 'moneyExchange',
          text: this.$t('帐变记录'),
          noBorder: true,
        },
        {},
        {
          icon: 'iconhuiyuan',
          path: 'agMemberList',
          text: this.$t('会员列表')
        },
        {
          icon: 'icokaihu',
          path: 'vipOpen',
          text: this.$t('会员开户'),
          noBorder: true,
        },
        {},

        {
          icon: 'icocard',
          path: 'agBankBind',
          text: this.$t('银行卡管理')
        },
        {
          icon: 'iconcontact',
          path: 'contactInfo',
          text: this.$t('联系方式')
        },
        {
          icon: 'iconpassword',
          path: 'agRevisePassword',
          text: this.$t('密码修改'),
          noBorder: true,
        }
      ],
      agent_domain: [],
      curDomain: {}
    }
  },
  methods: {
    goPage(path) {
      if (path === 'vipOpen') {
        this.vipOpenShow = true
      } else {
        this.$router.push({path: path})
      }
    },
    copy() {
      var clipboard = new Clipboard('.copy')
      clipboard.on('success', e => {
        this.show = false
        this.$toast(this.$t('复制成功'))
        clipboard.destroy()
      })
      clipboard.on('error', e => {
        console.log(this, this.$t('该浏览器不支持自动复制!'), 'warning')
        clipboard.destroy()
      })
    },
    extension() {
      if (this.agent_domain.length === 0) {
        Dialog.alert({
          title: this.$t('温馨提示'),
          message: this.$t('暂无推广域名，请联系市场专员分配')
        }).then(() => {
          // on close
        })
      } else {
        this.show = true
      }
    },
    carryCash() {
      if (this.list.agent_bank.length === 0) {
        const This = this
        Dialog.confirm({
          message: this.$t('您当前未绑定银行卡，无法提现！'),
          title: this.$t('温馨提示'),
          confirmButtonText: this.$t('去绑定')
        })
            .then(() => {
              This.$router.push({
                path: '/agAddBankBind',
                query: {
                  getPath: 'carryCash'
                }
              })
            })
            .catch(() => {
            })
      } else {
        this.$router.push({path: '/carryCash'})
      }

    },
    signOut() {
      const This = this
      Dialog.confirm({
        message: this.$t('是否退出登录？')
      }).then(() => {
        window.localStorage.removeItem('agToken')
        window.localStorage.removeItem('userInfoForAgent')
        This.$router.push('agentHomepage')
      }).catch(() => {
        // on cancel
      })
    },
    clickDomain(item) {
      this.curDomain = item
      this.show = true
    },
    // 下载图片
    download() {
      var image = new Image()
      // 解决跨域 Canvas 污染问题
      image.setAttribute('crossOrigin', 'anonymous')
      image.src = this.list.qrData
      image.onload = function () {
        var canvas = document.createElement('canvas')
        canvas.width = image.width
        canvas.height = image.height
        var context = canvas.getContext('2d')
        context.drawImage(image, 0, 0, image.width, image.height)
        var url = canvas.toDataURL('image/png')
        // 生成一个a元素
        var a = document.createElement('a')
        // 创建一个单击事件
        var event = new MouseEvent('click')
        // 将a的download属性设置为我们想要下载的图片名称，若name不存在则使用‘下载图片名称’作为默认名称
        a.download = this.$t('域名二维码.png')
        // 将生成的URL设置为a.href属性
        a.href = url
        // 触发a的单击事件
        a.dispatchEvent(event)
      }
    },
  },
  created() {
    try {
      let scrollY = document.getElementsByClassName('container')[0].offsetTop
      window.scrollTo(0, scrollY)
    } catch (error) {

    }
    this.isLoading = true
    usercount({
      access_token: window.localStorage.agToken
    }).then(res => {
      if (res.data.code === 0) {
        this.usercount = res.data.data
      }
    })
    userinfo({
      access_token: window.localStorage.agToken
    }).then(res => {
      if (res.data.code === 0) {

        let t2 = moment(res.data.data.created_at)
        this.list = res.data.data
        this.list.day = moment().diff(t2, 'days')
        window.localStorage.setItem('userInfoForAgent', JSON.stringify(res.data.data))
        this.list.agent_domain && this.list.agent_domain.forEach(async (item) => {
          let obj = {}
          obj.domainFullPath = item.domain
          obj.visible = false
          this.agent_domain.push(obj)
        })
        QRCode.toDataURL(this.list.qrcode_agent_domain, (err, url) => {
          this.list.qrData = url
        })
      } else {
        window.localStorage.removeItem('userInfoForAgent')
        window.localStorage.removeItem('agToken')
        window.localStorage.removeItem('agId')
        this.$router.back()
      }
    }).finally(() => {
      this.isLoading = false
    })
    // }
  }
}
</script>

