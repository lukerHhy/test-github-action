<style lang="less" scoped>
@import '~@assets/styles/agent/agentHomepage.less';
/deep/ .aagames-nav-bar {
  z-index: 15;
}
.agentHome {
  height: 100%;
  background-color: #d0d9ea;
}
.container {
  padding-top: @height-nav-bar;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  text-align: center;
  color: #cccccc;
  height: 100%;
  .join-us {
    width: 92%;
    padding: 32px;
    text-align: center;
    border-radius: 10px;
    background: @bg-gradient-color;
    color: #ffffff;
    margin: -140px auto 0;
    position: relative;
    z-index: 10;
  }
  .swiper-container {
    width: 100%;
    height: 100%;

    .swiper-slide {
      background-size: 100% 100%;
      position: relative;
      padding-bottom: 180px;
      height: auto;
      background-color: #d0d9ea;
    }

    .slide01 {
      .item {
        width: 690px;
        height: 130px;
        box-sizing: border-box;
        margin: 0 auto 20px;
        background: #fff;
        border-radius: 20px;
        padding: 18px 30px;
        position: relative;
        box-shadow: 0px 2px 10px 0px rgba(0, 34, 80, 0.05);

        img {
          width: 80px;
          height: 80px;
          float: left;
          margin-right: 18px;
        }

        .line {
          width: 2px;
          height: 100%;
          background: #e6eaef;
          float: left;
          margin-right: 30px;
        }

        .info_detail {
          float: left;
          text-align: left;

          p {
            font-weight: bold;
            color: rgba(51, 51, 51, 1);
          }

          h3 {
            color: rgba(51, 51, 51, 1);
          }
        }

        .btn {
          display: block;
          width: 128px;
          height: 50px;
          border-radius: 8px;
          border: 2px solid @bg-gradient-color;
          font-size: 24px;
          color: @bg-gradient-color;
          line-height: 48px;
          float: right;
          margin-top: 20px;
        }
      }

      .bg {
        width: 92%;
        position: absolute;
        z-index: 0;
        left: 4%;
        top: 240px;
      }

      .title01 {
        margin-bottom: 240px;
      }
    }

    .slide02 {
      .box {
        padding: 30px 32px;
        overflow: hidden;

        .item {
          width: 50%;
          padding: 16px;
          float: left;

          .item-box {
            background: #fff;
            border-radius: 10px;
            text-align: center;
            padding: 30px 0;
            box-shadow: 0px 4px 28px 0px rgba(207, 219, 250, 0.5),
              0px 6px 30px 0px rgba(0, 34, 80, 0.1);

            .img-box {
              height: 220px;

              img {
                height: 80%;
              }
            }

            p {
              color: #333;
              font-size: 26px;
              line-height: 48px;
              font-weight: bold;
            }

            h3 {
              color: #999;
              font-size: 20px;
              /*-webkit-transform: scale(0.75);*/
              /*transform: scale(0.75);*/
            }
          }
        }
      }
    }

    .slide03 {
      .top-box {
        width: 90%;
        margin: auto;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;

        .top-item {
          -webkit-box-flex: 1;
          -webkit-flex: 1;
          -ms-flex: 1;
          flex: 1;
          text-align: center;
          font-size: 20px;
          color: rgba(65, 70, 85, 0.5);

          img {
            width: 110px;
          }
        }
      }

      .mid-box {
        width: 100%;
        padding: 0 24px;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: justify;
        -webkit-justify-content: space-between;
        -ms-flex-pack: justify;
        justify-content: space-between;
        -webkit-box-align: center;
        -webkit-align-items: center;
        -ms-flex-align: center;
        align-items: center;
        margin-top: 32px;

        ul {
          width: 100%;
          margin: 0 auto;

          li {
            width: 100%;
            display: -webkit-box;
            display: -webkit-flex;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-pack: start;
            -webkit-justify-content: flex-start;
            -ms-flex-pack: start;
            justify-content: flex-start;
            -webkit-box-align: center;
            -webkit-align-items: center;
            -ms-flex-align: center;
            align-items: center;
            background: #fff;
            margin-bottom: 16px;
            border-radius: 10px;
            padding: 0 3px;
            box-shadow: 0px 2px 10px 0px rgba(0, 34, 80, 0.05);
            border-radius: 20px;

            .mid-img-box {
              display: block;
              padding: 36px;

              img {
                display: block;
                height: 64px;
                width: auto;
              }
            }

            .mid-txt-box {
              margin: 16px 10px;
              text-align: left;

              .mid-txt01 {
                font-size: 24px;
                padding-top: 6px;
                color: #414655;
                display: block;
                font-weight: bold;
              }

              .mid-txt02 {
                display: block;
                margin-left: -66px;
                width: 120%;
                font-size: 24px;
                -webkit-transform: scale(0.8);
                transform: scale(0.8);
                line-height: 32px;
                color: rgba(65, 70, 85, 0.5);
                padding-top: 4px;
              }
            }
          }
        }
      }
    }
    .swiper-pagination {
      bottom: 20px;
      /deep/ .my-bullet {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        border: 2px solid @bg-gradient-color;
        margin: 0 6px;
        display: inline-block;
        vertical-align: top;
        &.swiper-pagination-bullet-active {
          background-color: @bg-gradient-color;
          width: 22px;
          border-radius: 6px;
        }
      }
    }
  }

  .title01 {
    font-size: 48px;
    font-weight: 600;
    color: rgba(93, 100, 118, 1);
    text-align: center;
    padding-top: 40px;
    line-height: 66px;
  }

  .title02 {
    font-size: 28px;
    line-height: 40px;
    font-weight: 500;
    text-align: center;
  }
}
</style>
<template>
  <div class="agentHome">
    <lheader
       :title="$t('合营计划')"
      :goback="true"
      :get-switch="false"
    ></lheader>
    <div class="container">
      <div class="swiper-container">
        <div
          class="swiper-wrapper"
          :style="{ backgroundImage: $bImgs['agent/home/join us_bg2@2x'] }"
        >
          <div
            class="swiper-slide slide01"
            :style="{ backgroundImage: $bImgs['agent/home/join us_bg@2x'] }"
          >
            <template v-if="$projectname == '10042' || $projectname == '10043'">
              <p class="title01">{{$t('是成为传奇')}}</p>
              <p class="title02">{{$t('还是成为传奇的歌颂者')}}</p>
            </template>
            <p class="title01" v-else>
              致力于为合营伙伴提供<br />最全最顶尖的服务
            </p>

            <img class="bg" :src="$imgs['agent/home/join us_image@2x']" />
            <div class="item-wrap">
              <div
                class="item"
                v-for="(i, index) in contracts"
              >
                <img
                  v-if="contracts.length > 0"
                  :src="i.icon"
                  alt="‘2’"
                />
                <!--<img v-else :src="require(`@assets/img3_0/agent/home/${(i.icon).toLowerCase()}.png`)" alt=‘1’/>-->
                <img
                  v-else
                  :src="$imgs['agent/home/' + i.icon.toLowerCase() + '']"
                  alt="‘1’"
                />
                <p class="line"></p>
                <div class="info_detail">
                  <a
                    :href="i.url"
                    target="_blank"
                    v-if="contracts.length > 0"
                  >
                    <p>{{ i.name }}</p>
                    <h3>{{ i.contact }}</h3>
                  </a>
                  <a href="javascript:;" v-else>
                    <p>{{ i.title }}</p>
                  </a>
                </div>
                <a
                  href="javascript:;"
                  class="btn"
                  v-clipboard:copy="`${i.contact}`"
                  v-clipboard:success="onCopy"
                  v-clipboard:error="onError"
                  >{{$t('复制')}}</a
                >
              </div>
            </div>
          </div>
          <div
            class="swiper-slide slide02"
            :style="{ backgroundImage: $bImgs['agent/home/join us_bg2@2x'] }"
          >
            <template
              v-if="
                $projectname === '10029' ||
                $projectname === '10064' ||
                $projectname === '10060' ||
                  $projectname === '10059' ||
                  $projectname === '10043' ||
                  $projectname == '10042'
              "
            >
              <p class="title01">
                {{ $t($config[$projectname].project) }}重新定义了行业
              </p>
              <p class="title02">
                会员统计实时更新，实时数据<br />分析报表，清晰简单
              </p>
            </template>
            <template v-else>
              <p class="title01">{{$t('智能数据领先全行业')}}</p>
              <p class="title02">{{$t('会员统计实时更新')}}</p>
            </template>
            <div class="box">
              <div class="item">
                <div class="item-box">
                  <div class="img-box">
                    <img :src="$imgs['agent/home/join us_image1@2x']" />
                  </div>
                  <p>{{$t('会员统计')}}</p>
                  <h3>{{$t('会员统计实时更新')}}</h3>
                </div>
              </div>
              <div class="item">
                <div class="item-box">
                  <div class="img-box">
                    <img :src="$imgs['agent/home/join us_image2@2x']" />
                  </div>
                  <p>{{$t('报表明细')}}</p>
                  <h3>{{$t('数据分析表清晰简单')}}</h3>
                </div>
              </div>
              <div class="item">
                <div class="item-box">
                  <div class="img-box">
                    <img :src="$imgs['agent/home/join us_image3@2x']" />
                  </div>
                  <p>{{$t('平台报表')}}</p>
                  <h3>{{$t('流水')}}</h3>
                </div>
              </div>
              <div class="item">
                <div class="item-box">
                  <div class="img-box">
                    <img :src="$imgs['agent/home/join us_image4@2x']" />
                  </div>
                  <p>{{$t('佣金报表')}}</p>
                  <h3>{{$t('高佣金比例数据报表')}}</h3>
                </div>
              </div>
            </div>
            <!--            <div class="join-us" v-if="!isLogin" @click="$router.push({path: '/agentAuth/login'})">{{$t('加入我们')}}</div>-->
            <!--            <div class="join-us" v-if="isLogin" @click="$router.push({path: '/agent'})">{{$t('进入代理中心')}}</div>-->
          </div>
          <div
            class="swiper-slide slide03"
            :style="{ backgroundImage: $bImgs['agent/home/join us_bg2@2x'] }"
          >
            <template
              v-if="
                $projectname === '10029' ||
                $projectname === '10064' ||
                $projectname === '10060' ||
                  $projectname === '10059' ||
                  $projectname === '10043' ||
                  $projectname == '10042'
              "
            >
              <p class="title01">
                {{ $t($config[$projectname].project) }}最给力的手机APP
              </p>
              <p class="title02">
                PC端&H5还有独家开发的移动端<br />全面支持IOS及安卓系统下全部移动设备
              </p>
              <img
                class="qb-slideimg03"
                :src="$imgs['agent/home/bet_plan_image_long@3x']"
                alt=""
              />
            </template>
            <template v-else>
              <p class="title01">{{$t('业内最顶尖的手机投注')}}</p>
              <p class="title02">{{$t('一体化纯原生态')}}</p>
              <div class="top-box">
                <div class="top-item">
                  <img :src="$imgs['agent/home/join us_icon_pc@2x']" />
                  <p>PC</p>
                </div>
                <div class="top-item">
                  <img :src="$imgs['agent/home/join us_icon_h5@2x']" />
                  <p>H5</p>
                </div>
                <div class="top-item">
                  <img :src="$imgs['agent/home/join us_icon_shouji@2x']" />
                  <p>APP</p>
                </div>
                <div class="top-item">
                  <img :src="$imgs['agent/home/join us_icon_zhuanh@2x']" />
                  <p>{{$t('高转化')}}</p>
                </div>
                <div class="top-item">
                  <img :src="$imgs['agent/home/join us_icon_gao@2x']" />
                  <p>{{$t('高留存')}}</p>
                </div>
                <div class="top-item">
                  <img :src="$imgs['agent/home/join us_icon_vip@2x']" />
                  <p>{{$t('行业第一')}}</p>
                </div>
              </div>
              <div class="mid-box">
                <ul>
                  <li>
                    <div class="mid-img-box">
                      <img :src="$imgs['agent/home/anquan@2x']" />
                    </div>
                    <div class="mid-txt-box">
                      <span class="mid-txt01">{{$t('更安全')}}</span
                      ><span class="mid-txt02"
                        >{{$t('每天为您提供近千场精彩体育赛事')}}</span
                      >
                    </div>
                  </li>
                  <li>
                    <div class="mid-img-box">
                      <img :src="$imgs['agent/home/wending@2x']" />
                    </div>
                    <div class="mid-txt-box">
                      <span class="mid-txt01">{{$t('更稳定')}}</span
                      ><span class="mid-txt02"
                        >{{$t('独家开发')}}</span
                      >
                    </div>
                  </li>
                  <li>
                    <div class="mid-img-box">
                      <img :src="$imgs['agent/home/fengfu@2x']" />
                    </div>
                    <div class="mid-txt-box">
                      <span class="mid-txt01">{{$t('更丰富')}}</span
                      ><span class="mid-txt02"
                        >{{$t('引领市场的卓越技术')}}</span
                      >
                    </div>
                  </li>
                  <li>
                    <div class="mid-img-box">
                      <img :src="$imgs['agent/home/kuai@2x']" />
                    </div>
                    <div class="mid-txt-box">
                      <span class="mid-txt01">{{$t('更快速')}}</span
                      ><span class="mid-txt02"
                        >{{$t('最新技术自主研发的财务处理系统')}}</span
                      >
                    </div>
                  </li>
                </ul>
              </div>
            </template>
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
      <div
        class="join-us"
        v-if="!isLogin"
        @click="$router.push({ path: '/agentAuth/login' })"
      >
{{$t('加入我们')}}
      </div>
      <div
        class="join-us"
        v-if="isLogin"
        @click="$router.push({ path: '/agent' })"
      >
{{$t('进入代理中心')}}
      </div>
    </div>
    <loading :isShow="isLoading"></loading>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'

import Lheader from '@/components/l-header'
import { Swiper } from 'vue-awesome-swiper'
import { excellentagent } from '@/api/memberCenter'
import Loading from '@/components/loading'
import vueSvgDraw from 'vue-svg-draw'
import { mapState } from 'vuex'

const contracts = [
  {
    icon: 'skype',
    title: '198681681@qq.com',
  },
  {
    icon: 'telegram',
    title: '@wanqudaili',
  },
  {
    icon: 'agentWhatsApp',
    title: '13218765428',
  },
  {
    icon: 'QQ',
    title: '198681681',
  },
  // {
  //   icon: 'agentwechat',
  //   title: this.$t('微信:AAwanqu')
  // }, {
  //   icon: 'agentdianhua',
  //   title: this.$t('手机号：1231232332')
  // },
]

export default {
  name: 'agent_home',
  components: {
    Loading,
    Lheader,
    vueSvgDraw,
  },
  data() {
    return {
      contracts: [
        {
          icon: 'skype',
          title: '198681681@qq.com',
        },
        {
          icon: 'telegram',
          title: '@wanqudaili',
        },
        {
          icon: 'agentWhatsApp',
          title: '13218765428',
        },
        {
          icon: 'QQ',
          title: '198681681',
        },
        // {
        //   icon: 'agentwechat',
        //   title: this.$t('微信:AAwanqu')
        // }, {
        //   icon: 'agentdianhua',
        //   title: this.$t('手机号：1231232332')
        // },
      ],
      tab: true,
      title: this.$t('合作伙伴计划'),
      isLogin: false,
      isLoading: false,
      activeNames: ['1'],
      data: {
        merchant_no: process.env.VUE_APP_MERCHANT_NO,
      },
      users: [],
      commission: [
        [this.$t('级别'), this.$t('公司本月总盈利'), this.$t('活跃玩家数最低要求'), this.$t('佣金百分比')],
        ['1', '1~50,000', '3', '30.00%'],
        ['2', '50,001~200,000', '10', ' 35.00%'],
        ['3', '200,001~600,000', '30', ' 40.00%'],
        ['4', '600,001~1,000,000', '60', ' 45.00%'],
        ['5', '1,000,001', '100', ' 50.00%'],
      ],
      photo: [],
    }
  },
  computed: {
    ...mapState('global', ['siteInfo']),
    contracts () {
      const { siteInfo } = this
      if (siteInfo && 'business_cooperation' in siteInfo) {
        return siteInfo.business_cooperation || contracts
      }
      return contracts
    }
  },
  watch: {
    // siteInfo: {
    //   hanler(val) {
    //     if (val && 'business_cooperation' in val) {
    //       this.contracts = val.business_cooperation || ''
    //     }
    //   },
    //   immediate: true,
    //   deep: true,
    // },
  },
  mounted() {
    // 有需要代理
    // this.isLoading = true;
    this.$nextTick(() => {
      new Swiper('.swiper-container', {
        pagination: {
          el: '.swiper-pagination',
          bulletClass: 'my-bullet', //需设置.my-bullet样式
        },
        // autoplay: {
        //   delay: 3000,
        //   disableOnInteraction: false,
        // },
      })
    })
    excellentagent(this.data)
      .then((res) => {
        if (res.data.code === 0) {
          this.users = res.data.data
        }
      })
      .finally(() => {
        this.isLoading = false
      })
    // if (
    //   this.siteInfo &&
    //   this.siteInfo.business_cooperation &&
    //   this.siteInfo.business_cooperation.length > 0
    // ) {
    //   this.contracts = this.siteInfo.business_cooperation
    // }
    // console.log(123, this.siteInfo.business_cooperation, this.contracts)
    let agToken = window.localStorage.agToken,
      agId = window.localStorage.agId
    if (agToken && agId) {
      this.isLogin = true
    } else {
      this.isLogin = false
    }
  },
  created() {},
  methods: {
    onCopy: function(e) {
      this.$toast(this.$t('复制成功'))
    },
    onError: function(e) {
      this.$toast.fail(this.$t('复制失败，请重试'))
    },
    formatName(name) {
      let newStr
      if (name.length === 2) {
        newStr = name.substr(0, 1) + '*'
      } else if (name.length > 2) {
        let char = ''
        for (let i = 0, len = name.length - 2; i < len; i++) {
          char += '*'
        }
        newStr = name.substr(0, 1) + char + name.substr(-1, 1)
      } else {
        newStr = name
      }

      return newStr
    },
  },
}
</script>
