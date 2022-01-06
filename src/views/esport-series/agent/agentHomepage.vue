<template>
  <div class="esport-landing">
    <es-header></es-header>
    <div class="main">
      <h2 class="in-tit">{{$t('合作计划')}}</h2>
      <div class="agentbox">
        <img :src="$imgs['agent/agent_icon24']" style="width: 100%;">
        <div class="conts">
          <div class="row first">
            <div class="rf-l">
              <h2 >{{$t('一')}}</h2>
              <small>{{$t('示例')}}</small>
              <table frame=void rules=none>
                <tr>
                  <th>{{$t('代理')}}</th>
                  <th>{{$t('单月纯利润')}}</th>
                  <th>{{$t('单月活跃玩家')}}</th>
                  <th>{{$t('佣金比例')}}</th>
                </tr>
                <tr>
                  <td>1级</td>
                  <td>0-50,000</td>
                  <td>≥5</td>
                  <td class="cor1">30%</td>
                </tr>
                <tr>
                  <td>2级</td>
                  <td>50,001-200,000</td>
                  <td>≥10</td>
                  <td class="cor1">35%</td>
                </tr>
                <tr>
                  <td>3级</td>
                  <td>200,001-600,000</td>
                  <td>≥15</td>
                  <td class="cor1">40%</td>
                </tr>
                <tr>
                  <td>4级</td>
                  <td>600,001-1,000,000</td>
                  <td>≥20</td>
                  <td class="cor1">45%</td>
                </tr>
                <tr>
                  <td>5级</td>
                  <td>1,000,001以上</td>
                  <td>≥30</td>
                  <td class="cor1">50%</td>
                </tr>
              </table>
            </div>
            <div class="rf-r">
              <h2>{{$t('计算公式')}}</h2>
              <div class="det">
                <div class="d-r">
                  <span>{{$t('游戏总输赢')}}<label>{{$t('例')}}</label></span>
                  <span>- 优惠红利<label>-10</label></span>
                  <span>- 平台费<label>-150</label></span>
                  <span>- 存提手续费<label>-10</label></span>
                  <span>- 返水<label>-0</label></span>
                </div>
                <div class="d-r">
                  <span>= 净利润<label>830</label></span>
                  <span>x 佣金比例<label>x30%</label></span>
                </div>
                <div class="d-r">
                  <span>= 代理佣金<label>249</label></span>
                  <span>+ 推荐奖金<label>+0</label></span>
                  <span>= 总佣金<label>249</label></span>
                </div>
              </div>
              <div class="xize">
                细则：平台费用 = 游戏总输赢 x 15% <br/><span>{{$t('手续费')}}</span>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="title">
              <h2>{{$t('二')}}</h2>
              <small class="cor1">{{$t('玩家在代理专属')}}</small>
            </div>
            <div class="info">
              <div class="i-pan">
                <p><span>1</span><label>{{$t('结算时间')}}<b class="cor4">{{$t('每月')}}</b>{{$t('开始计算佣金')}}</label></p>
                <p><span>2</span><label>{{$t('佣金提取')}}</label></p>
                <p><span>3</span><label>{{$t('佣金计算')}}<b class="cor4">{{$t('每月')}}</b></label></p>
                <p><span>4</span><label>{{$t('如何结算')}}</label></p>
              </div>
              <div class="i-ps">
                示例：合作伙伴2019年一月份（1号00:00:00-31号23:59:59）所产生的佣金，将在二月份 1-10 号期间进行结算。
              </div>
            </div>
          </div>
          <div class="row">
            <div class="title">
              <h2>{{$t('三')}}</h2>
            </div>
            <div class="info">
              <div class="i-pan">
                <p><span>1</span><label>{{$t('最低支付')}}</label></p>
                <p><span>2</span><label>{{$t('佣金比例')}}</label></p>
                <p><span>3</span><label>{{$t('活跃人数定义')}}</label></p>
                <p><span>4</span><label>{{$t('净利润负值')}}</label></p>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="title">
              <h2>{{$t('四')}}</h2>
            </div>
            <div class="info">
              <div class="i-pan">
                <p><span>1</span><label>{{$t('代理须有责任的推广狂竞技为您提供的站点')}}</label></p>
                <p><span>2</span><label>{{$t('代理不得作岀任何损害狂竞技网站声誉的行为和推广活动')}}</label></p>
                <p><span>3</span><label>{{$t('代理在未经狂竞技同意下')}}</label></p>
                <p><span>4</span><label>{{$t('代理不可使用不诚实的方法骗取狂竞技佣金')}}</label></p>
                <p><span>5</span><label>{{$t('在没有获得狂竞技官方批准的情况下')}}</label></p>
                <p><span>6</span><label>{{$t('代理本身的游戏账号不可以在自己的代理线下')}}</label></p>
                <p><span>7</span><label>{{$t('代理有责任检查其下线客户的一切活动')}}</label></p>
                <p><span>8</span><label>{{$t('狂竞技还会根据您的下线会员的真实度以及质量来考核您的业绩真实性')}}</label></p>
                <p><span>9</span><label>{{$t('代理若违反了任何一条合作条款狂竞技有权立即终止合作关系')}}</label></p>
                <p><span>10</span><label>{{$t('代理相关条款最终解释权归狂竞技所有')}}</label></p>
              </div>
            </div>
          </div>
          <div class="row second" v-if="!isLogin" @click="$router.push({path: '/agentAuth/login'})">{{$t('成为代理')}}</div>
          <div class="row second" v-if="isLogin" @click="$router.push({path: '/agent'})">{{$t('进入代理中心')}}</div>
        </div>
      </div>
    </div>
    <vtabbar class="m-footer" :index="3"></vtabbar>
  </div>
</template>

<script>
  import esHeader from "../components/es-header"
  import Vtabbar from "../components/v-tabbar"
  export default {
    components: {
      Vtabbar,
      esHeader
    },
    computed: {
    },
    data() {
      return {
        isLogin: false
      }
    },
    mounted() {
      let agToken = window.localStorage.agToken
      let agId = window.localStorage.agId
      this.isLogin = (agToken && agId) ? true : false
    }
  }
</script>

<style lang="less" scoped>
.esport-landing {
  padding-top: 88px;
  padding-bottom: 104px;
  .main {
    .in-tit {
      text-align: center;
      display: inline-block;
      width: 100%;
      line-height: 60px;
      font-size: 36px;
      color: #DADADA;
    }
    .conts {
      // padding: 0 24px 100px;
      h1 {
        margin-bottom: 20px;
        text-align: left;
        font-size: 17px;
        font-weight: bold;
      }
      .cor1 {
        color: #5be7fb;
      }
      .row {
        color: hsla(0,0%,100%,.75);
        text-align: left;
        .title {
          padding: 24px 20px;
          h2 {
            font-size: 32px;
            color: #fff;
            margin-bottom: 20px;
          }
          .cor1 {
            color: #5be7fb;
            font-size: 13px;
          }
        }
        .info {
          .i-pan {
            background-color: #202020;
            padding: 15px;
            line-height: 1.8;
            p {
              padding: 20px 0;
              display: flex;
              span {
                width: 40px;
                text-align: center;
                height: 40px;
                line-height: 40px;
                flex: 0 0 40px;
                margin-right: 10px;
                border-radius: 50%;
                font-size: 24px;
                background-color: #414141;
                color: #fff;
                vertical-align: middle;
              }
              label {
                font-size: 24px;
                b {
                  font-weight: 400;
                  margin: 0 2px;
                }
              }
            }
          }
          .i-ps {
            padding: 20px;
            color: hsla(0,0%,100%,.6);
            font-size: 22px;
            line-height: 1.5;
          }
        }
      }
      .first {
        .rf-l {
           h2 {
            font-size: 30px;
            margin-bottom: 20px;
            padding-left: 20px;
            color: #fff;
            text-align: left;
          }
          small {
            font-size: 22px;
            color: #999999;
            padding-left: 20px;
          }
          table {
            width: 100%;
            background-color: #212121;
            margin-top: 20px;
            tr:nth-of-type(odd) {
              background-color: rgba(0,0,0,.2);
              th {
                color: #fff;
                font-weight: 600;
              }
              td, th {
                padding: 32px 10px;
                text-align: center;
              }
            }
            tr {
              td {
                padding: 19px 6px;
                text-align: center;
              }
            }
          }
        }
        .rf-r {
          text-align: left;
          h2 {
            font-size: 30px;
            margin-bottom: 5px;
            margin-left: 20px;
            font-weight: bold;
            color: #fff;
          }
          .det {
            background-color: #212121;
            color: hsla(0,0%,100%,.55);
            padding: 10px 40px;
            margin-top: 30px;
            .d-r {
              border-bottom: 1px solid hsla(0,0%,100%,.03);
              span {
                display: flex;
                justify-content: space-between;
                padding: 12px 0;
                color: hsla(0,0%,100%,.75);
                font-size: 22px;
              }
            }
          }
          .xize {
            padding: 15px 20px;
            color: hsla(0,0%,100%,.6);
            font-size: 22px;
            span {
              display: inline-block;
              padding: 20px 0 0 70px;
            }
          }
        }
      }
      .second {
        margin: 60px auto;
        width: 80%;
        height: 88px;
        line-height: 88px;
        background-color: #0FC59E;
        border-radius:8px;
        color: #fff;
        font-weight: 600;
        text-align: center;
        font-size: 30px;
      }
    }
  }
}
</style>
