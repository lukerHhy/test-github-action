<style lang="less" scoped>
@import "~@assets/styles/agent/agentHomepage.less";
.container {
  padding-top: @height-nav-bar;
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  text-align: center;
  color: #cccccc;
  /deep/.svgColorStroke{
    stroke: @primary-color;
  }
  /deep/.svgColorFill{
    fill: @primary-color;
  }
  .Join {
    display: none;
    margin: 0 auto;
    width: 750px;
    padding-top: 766px;
    box-sizing: border-box;
    height: 1448px;
    background-position: top center;
    background-size: 100% auto;
    background-repeat:no-repeat;
    h2 {
      margin: 60px auto 0;
      width: 448px;
      height: 90px;
      font-size: 64px;
      font-weight: 500;
      color: rgba(200, 167, 127, 1);
      line-height: 90px;
      white-space: nowrap;
    }
    h3 {
      margin: 20px auto 0;
      // width: 320px;
      height: 56px;
      font-size: 40px;
      font-weight: 500;
      color: rgba(200, 167, 127, 1);
      line-height: 56px;
    }
    .feature {
      display: flex;
      margin-top: 66px;

      height: 212px;
      .item {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        .img {
          width: 132px;
          height: 132px;
          background-position: center;
          background-size: contain;
          background-repeat: no-repeat;
        }
        p {
          margin-top: 20px;
          text-align: center;
          height: 40px;
          font-size: 28px;
          font-weight: 400;
          color: @primary-text-color;
          line-height: 40px;
        }
      }
      .aagames-button {
        width: 240px;
        height: 80px;
      }
    }
    .join-us {
      text-align: center;
      display: block;
      width: 240px;
      height: 80px;
      background: @primary-color;
      border-radius: 4px;
      font-size: 32px;
      font-weight: 500;
      color: #fff;
      line-height: 80px;
      margin: 60px auto 0;
    }
  }
  .title-h2 {
    padding: 0 40px;
    height: 60px;
    font-size: 44px;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    line-height: 60px;
    margin: 80px auto 0;
    position: relative;
    &:after, 
    &:before {
      content: "";
      display: block;
      width: 80px;
      height: 4px;
      background: rgba(47, 47, 47, 1);
      border-radius: 4px;
      position: absolute;
      left: -80px;
      top: 28px;
    }
    &:before {
      left: auto;
      right: -80px;
    }
  }
  .title-h3 {
    margin: 30px auto 0;
    text-align: center;
    height: 40px;
    font-size: 28px;
    font-weight: 400;
    color: @primary-text-color;
    line-height: 40px;
  }
  .statistics {
    margin-top: 54px;
    display: flex;
    box-sizing: border-box;
    padding: 15px;
    justify-content: space-between;
    flex-direction: row;
    flex-wrap: wrap;
    text-align: center;
    ._item {
      width: 50%;
      box-sizing: border-box;
      padding: 15px;
      display: flex;
    }
    .item {
      height: 432px;
      flex: 1;
      background-color: #282828;
      box-sizing: border-box;
      padding: 20px;
      display: flex;
      flex-direction: column;
      .title {
      }
      .p {
      }
      .vuesvg {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
  .proxy {
    ._item {
    }
    .item {
      height: 264px;
      padding: 0;
      font-size: 24px;
      line-height: 34px;
      font-weight: 400;
      text-align: left;
      background: @bg-card-color;
      .member {
        margin-top: 30px;
        padding: 0 30px;
        font-weight: 400;
        color: rgba(82, 81, 82, 1);
      }
      .commission {
        color: @primary-text-color;
        padding: 0 30px;
        margin-top: 10px;
      }
      .household {
        font-size: 28px;
        font-weight: 600;
        color: rgba(255, 255, 255, 1);
        line-height: 40px;
        padding: 20px 30px;
        border-bottom: 2px solid rgba(53, 52, 53, 1);
      }
      .date {
        margin-top: 20px;
        color: #bebebe;
        padding: 0 30px;
      }
    }
  }

  .commission-plan {
    padding: 30px;

    > div{
      overflow-x: auto;
    }

    table {
      width: 120%;
      border-collapse: collapse;
      font-size: 24px;
      text-align: center;
      border: 2px solid rgba(227, 227, 227, 0.1);

      td,
      th {
        border: 1px solid rgba(227, 227, 227, 0.1);
        height: 96px;
      }
      th {
        // background:#000;
        color: @primary-text-color;
      }
      td {
        color: rgba(245, 245, 245, 1);
        &:first-child{
          color: #A3A3A3;
        }
      }
    }
  }
  .commission-info {
    text-align: left;
    width: 690px;
    font-size: 28px;
    font-weight: 400;
    color: @primary-text-color;
    line-height: 40px;
    margin: 40px auto 0;
  }

  .step {
    margin-top: 1rem;
    .item {
      width: 690px;
      height: 298px;
      background: @bg-card-color;
      border-radius: 4px;
      text-align: center;
      margin: 0 auto 26px;
      padding-top: 50px;
      box-sizing: border-box;
      .text {
        height: 50px;
        font-size: 36px;
        font-weight: 500;
        color: @primary-color;
        line-height: 50px;
      }
      .desc {
        margin-top: 20px;
        height: 40px;
        font-size: 28px;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 40px;
      }
      .p {
        width: 610px;
        margin: 20px auto 0;
        height: 68px;
        font-size: 24px;
        font-weight: 400;
        color: @primary-text-color;
        line-height: 34px;
      }
    }
  }
  .contract {
    margin: 1rem @margin-10 0;
    /deep/ .van-collapse {
      .van-collapse-item--border:after{
        border: 0;
      }
      .van-collapse-item {
        .van-cell {
          background: none;
          height: 60px;
          font-size: 28px;
          font-weight: 400;
          line-height: 60px;
          padding: 0;
          .van-cell__title {
            color: rgba(255, 255, 255, 1);
            span{
              display: block;
            }
          }
          .van-icon{
              top:30%;
            }
          &:not(:last-child)::after {
            display: none;
          }
        }
        .van-collapse-item__content {
          background: none;
          font-size: 24px;
          font-weight: 400;
          color: @primary-text-color;
          line-height: 34px;
          p{
            text-align: justify;
          }
        }
      }
    }
    .items {
      background-color: @bg-color;
      padding: 15px;
      box-sizing: border-box;
      display: flex;
      flex-wrap: wrap;
      .list {
        flex: 1 0 50%;
        padding: 15px;
        height: 224px;
        display: flex;
        width: 50%;
        .item {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          float: left;
          width: 100%;
          text-align: center;
          .img {
            position: relative;
            img {
              width: 60px;
              height: 60px;
              margin-bottom: 34px;
            }
            .mark {
              position: absolute;
              top: -34px;
              left: 60px;
              height: 34px;
              line-height: 34px;
              font-size: 24px;
              color: #fff;
              background-size: 100% auto;
              background-repeat: no-repeat;
            }
            .mark-gj {
              width: 64px;
              // background-image: url(~@assets/img/contactUsIcon/label_bg1@2x.png);
            }
            .mark-flb {
              width: 84px;
              // background-image: url(~@assets/img/contactUsIcon/label_bg2@2x.png);
            }
          }
          .text {
            font-size: 32px;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            line-height: 44px;
          }
        }
        .item:nth-child(1) {
        }
        .item:nth-child(2) {
        }
        .item:nth-child(3) {
        }
        .item:nth-child(4) {
        }
      }
    }
  }
}
</style>
<template>
  <div>
    <lheader  :title="$t('加盟代理')" :goback="true" :get-switch="false"></lheader>
    <div class="container">
      <div class="Join" :style="{backgroundImage: $bImgs['agent/brand2@3x']}">
        <h2>{{$t('加入')}}{{$t($config[$projectname].project)}}{{$t('合伙人')}}</h2>
        <h3>{{$t('开启人生精彩时刻')}}</h3>
        <div class="feature">
          <div class="item">
            <div class="img" :style="{backgroundImage: $bImgs['agent/home/agenthome1@3x']}"></div>
            <p>{{$t('超高返佣')}}</p>
          </div>
          <div class="item">
            <div class="img" :style="{backgroundImage: $bImgs['agent/home/agenthome2@3x']}"></div>
            <p>{{$t('最优质的产品')}}</p>
          </div>
          <div class="item">
            <div class="img" :style="{backgroundImage: $bImgs['agent/home/agenthome3@3x']}"></div>
            <p>{{$t('丰富的游戏支持')}}</p>
          </div>
        </div>

        <!-- 加入我们 -->
        <div class="join-us" v-if="!isLogin" @click="$router.push({path: '/agentAuth/login'})">{{$t('加入我们')}}</div>
        <div class="join-us" v-if="isLogin" @click="$router.push({path: '/agent'})">{{$t('代理中心')}}</div>
      </div>
      <div style="display: none" class="title-h2">{{$t('详细数据分析报表')}}</div>
      <div style="display: none" class="title-h3">{{$t('盈利数据')}}</div>
      <div style="display: none" class="statistics">
        <div class="_item">
          <div class="item">
            <div class="title">{{$t('会员统计')}}</div>
            <p class="p">{{$t('注册会员和有效会员随时查看')}}</p>
            <div class="vuesvg">
              <vue-svg-draw
                :file="require('@assets/img3_0/agent/account_total.svg')"
                type="oneByOne"
                ref="vuesvg"
                vivusId="vuesvg"
                :onReady="onReady"
                pathTiming="EASE_OUT"
              ></vue-svg-draw>
            </div>
          </div>
        </div>
        <div class="_item">
          <div class="item">
            <div class="title">{{$t('会员盈利数据')}}</div>
            <p class="p">{{$t('会员盈利情况一目了然')}}</p>
            <div class="vuesvg">
              <vue-svg-draw
                :file="require('@assets/img3_0/agent/account_profit.svg')"
                type="oneByOne"
                ref="vuesvg1"
                vivusId="vuesvg1"
                :onReady="onReady"
                pathTiming="EASE_OUT"
              ></vue-svg-draw>
            </div>
          </div>
        </div>

        <div class="_item">
          <div class="item">
            <div class="title">{{$t('会员报表')}}</div>
            <p class="p">{{$t('会员动态一清二楚')}}</p>
            <div class="vuesvg">
              <vue-svg-draw
                :file="require('@assets/img3_0/agent/account_report.svg')"
                :style="{'color':'red'}"
                type="oneByOne"
                ref="vuesvg2"
                vivusId="vuesvg2"
                :onReady="onReady"
                pathTiming="EASE_OUT"
              ></vue-svg-draw>
            </div>
          </div>
        </div>

        <div class="_item">
          <div class="item">
            <div class="title">{{$t('代理提现便捷')}}</div>
            <p class="p">{{$t('代理每月提现方便快捷')}}</p>
            <div class="vuesvg">
              <vue-svg-draw
                :file="require('@assets/img3_0/agent/account_withdraw.svg')"
                type="oneByOne"
                ref="vuesvg3"
                vivusId="vuesvg3"
                :onReady="onReady"
                pathTiming="EASE_OUT"
              ></vue-svg-draw>
            </div>
          </div>
        </div>
      </div>
      <div style="display: none" class="title-h2">{{$t('上月优秀代理')}}</div>
      <div style="display: none" class="statistics proxy">
        <div class="_item" v-for="(user, index) in users" :key="index">
          <div class="item">
            <div class="member">{{$t('会员')}} {{formatName(user.username)}}</div>
            <div class="commission"><span :class="{shrink:lang==='en'}" style="transform-origin:left 50%;">{{$t('上月佣金')}}：￥{{user.month_fee}}</span></div>
            <p class="household pr"><span :class="{shrink:lang==='en'}" style="transform-origin:left 50%;">{{$t('累计开户')}}：{{user.members}}{{$t('户')}}</span></p>
            <p class="date">{{$t('已运营')}}{{parseInt(user.months/12)}}{{$t('年')}}{{user.months%12}}{{$t('月')}}</p>
          </div>
        </div>
      </div>
      <div class="sign01">
        <div class="sign01-item">
          <h3>{{$t('加盟代理')}}</h3>
          <p><img :src="$imgs['agent/home/tel']" alt="">{{ phoneNum }}</p>
        </div>
        <div class="sign01-item">
          <img class="sign-img01" :src="$imgs['agent/jiameng_pic@2x']">
        </div>
        <div class="sign01-item">
          <h3>{{$t('致富有你')}}</h3>
          <p><img :src="$imgs['agent/home/tel']" alt="">{{ phoneNum }}</p>
        </div>
      </div>
      <div class="sign02">
        <div class="sign02-item">
          <img class="img01" :src="$imgs['agent/jiameng_pic2@2x']">
          <p>{{$t('阿扎尔倾情代言')}}<br/>{{$t('世界巨星放心之选')}}</p>
        </div>
        <div class="sign02-item">
          <img class="img01" :src="$imgs['agent/jiameng_pi3@2x']">
          <p>{{$t('佣金周结')}}<br/>{{$t('快速到账')}}</p>
        </div>
        <div class="sign02-item">
          <div class="sign02-item-inner">
            <img class="img02" :src="$imgs['agent/jiangmeng_pic5@2x']">
            <span>&</span>
            <img class="img03" :src="$imgs['agent/jiameng_pic4@2x']">
          </div>
          <p>{{$t('战略合作伙伴')}}<br/>{{$t('实力领先')}}</p>
        </div>
      </div>
      <div class="title-h2">{{$t('佣金计划')}}</div>
      <div class="commission-plan">
        <div>
          <table>
            <tr v-for="(i,index) in commission" :key="index">
              <th v-if="index === 0" v-for="(j,k) in i" :key="k">{{j}}</th>
              <td v-if="index > 0" v-for="(j,k) in i" :key="k">{{j}}</td>
            </tr>
          </table>
        </div>
      </div>

      <p class="commission-info">{{$t('每月')}}</p>
      <div class="aagames-button-box">
        <van-button @click="stepsShow=true">{{$t('代理合作协议')}}</van-button>
        <van-button @click="isLogin?$router.push({path: '/agent'}):$router.push({path: '/agentAuth/login'})">{{$t('查看您的佣金')}}</van-button>
      </div>
      <div style="display: none" class="title-h2">{{$t('加入流程')}}</div>
      <!-- 开通流程 -->
      <div style="display: none" class="step">
        <div class="item">
          <div class="text">{{$t('第一步')}}</div>
          <p class="desc">{{$t('提交申请')}}</p>
          <p class="p">{{$t('填写代理申请表')}}</p>
        </div>
        <div class="item">
          <div class="text">{{$t('第二步')}}</div>
          <p class="desc">{{$t('资格审核')}}</p>
          <p class="p">{{$t('提交申请后留下联系方式')}}</p>
        </div>
        <div class="item">
          <div class="text">{{$t('第三步')}}</div>
          <p class="desc">{{$t('立即推广')}}</p>
          <p class="p">{{$t('除了运用您本身的资源以外')}}</p>
        </div>
        <div class="item">
          <div class="text">{{$t('第四步')}}</div>
          <p class="desc">{{$t('立即盈利')}}</p>
          <p class="p">{{$t('您的佣金来自每一位您带来的会员')}}</p>
        </div>
      </div>
      <!-- 合约 -->
      <div style="display: none" class="contract">
        <van-collapse v-model="activeNames" accordion v-if="$i18n && $i18n.locale == 'en'">
          <van-collapse-item :title="$t('One.Registration Agreement')" name="1">
            <p>
              1. In order to effectively prevent non-integrity partners from abusing the agency preferential system provided by {{$t($config[$projectname].secName)}}, the company review department will strictly review the personal data provided by each agent during registration ( Including name, email and phone number, etc.) If the agent is found to have any unscrupulous profit-making attempts, or collusive arbitrage with other agents or members and other dishonest acts, {{$t($config[$projectname].secName)}} The account of the cooperative agent will be closed and all commissions and discounts of the agent will be recovered.
            </p>
            <p>
              2. The members of the same IP/same name/same collection account can only be the offline members of one partner, and the partner cannot become the offline member of itself and other partners. The same IP/same name/same collection account can only apply for one partner account.
            </p>
          </van-collapse-item>
          <van-collapse-item :title="'2. Terms of Rights and Responsibilities'" name="2">
            <p>1. Partners' rights and obligations</p>
            <p>
              1.1.
              Partners need to do their responsibilities to actively sell and promote {{$t($config[$projectname].secName)}} in order to maximize the profits of both parties. Partners must conduct positive publicity, sales and promotion {{$t($config[$projectname].secName)}} without violating the law. The resulting publicity, sales and promotion expenses shall be borne by the partners themselves.
            </p>
            <p>
              1.2.
              Partners are not allowed to privately reprint, publish, or distribute related materials including homepage, domain name, logo, reports, game screens, graphics, etc. In addition, when promoting, partners must protect the interests of {{$t($config[$projectname].secName)}}. Any behavior that damages the company’s reputation will be terminated immediately upon discovery.
            </p>
            <p>2.{{$t($config[$projectname].secName)}} Rights and Obligations to Partners</p>
            <p>
              2.1.
              The customer service representative of {{$t($config[$projectname].secName)}} will assist the partners to open an account for the offline and observe their betting status. Agents and members must agree to and abide by {{$t($config[$projectname].secName)}}’s membership regulations, policies and operating procedures. Partners can login to the management backstage at any time to learn about the account statements of their offline members.
            </p>
            <p>2.2. {{$t($config[$projectname].secName)}} reserves the right to reject or freeze the accounts of cooperative agents or members. </p>
            <p>
              2.3.
              In some cases after careful review {{$t($config[$projectname].secName)}} reserves the right to unilaterally modify any clauses in the cooperation agreement, {{$t($config[$projectname].secName )}} will be published on the website of the modification to inform partners. Modifications may include: commission range, payment procedures, and other regulations. If the partner expresses objection to the modification, the partner can terminate the contract. After the modification, if the partner does not make any objections, it will be regarded as tacit acceptance and approval of the new agreement.
            </p>
          </van-collapse-item>
          <van-collapse-item :title="'Three. Term of Agreement and Termination'" name="3">
            <p>
              1. Term and Termination
              <br />The cooperation agreement will be implemented after the partner’s application is successful. The partner can terminate this contract at any time, but must notify the other party of the termination of the contract in written form within 7 days in advance. The partner can send the notification by email to: {{siteInfo.email}}
              If a partner violates the cooperation agreement, {{$t($config[$projectname].secName)}} has the right to terminate the contract without notice.
            </p>
            <p>
              2. Confidential information
              <br />During the execution of the contract, the partner agrees not to disclose the confidential cooperation data related to {{$t($config[$projectname].secName)}} to a third party, except that {{$t($config[ $projectname].secName)}} Written consent and these confidential documents can be used for contract follow-up when necessary in the future. Partners are obliged to maintain confidentiality of confidential documents after the termination of the contract.
            </p>
            <p>
              3. Unconditional termination
              <br />If the partner promotes the service of {{$t($config[$projectname].secName)}} through mass spam emails under any circumstances, we will immediately terminate this agreement unconditionally and cooperate Re-review and freeze the funds of the partner account. Partners may not make any requests or statements related to us, or give any promises, and you have no right to bind us under any obligations.
            </p>
            <p>
              4. No promise
              <br />Regarding cooperation projects, we do not make any statement about the operation of our website will be free of interference and error, so we will not be held responsible even if there is a problem.
            </p>
            <p>
              5. Management organization
              <br />No matter under the control of any laws and regulations, this agreement will be subject to the laws of the Philippines. Any legal actions related to this agreement must be brought to the Philippine government. You acknowledge and carefully read this agreement and agree to all its rules and terms. At any time, you confirm that you have independently assessed your willingness to participate and do not rely on any remarks, guarantees and statements outside this agreement. By downloading our promotional articles and creating a link on your website to our website, you expressly agree to be bound by the rules and terms of this agreement.
            </p>
          </van-collapse-item>
        </van-collapse>

        <van-collapse v-model="activeNames" accordion v-else>
          <van-collapse-item :title="$t('一、注册规约')" name="1">
            <p>
              1. 为有效防止非诚信合作商滥用{{$t($config[$projectname].secName)}}所提供的代理优惠制度，公司审查部门将严格审核每位代理商注册时提供的个人资料（包括姓名，邮件及电话等）若经审核发现代理商有任何不良营利企图，或与其他代理商、会员进行合谋套利等不诚信行为，{{$t($config[$projectname].secName)}}将关闭该合作代理商之账户并收回该代理商的所有佣金与优惠。
            </p>
            <p>
              2. 同一IP/同一姓名/同一收款账号的会员只能是一个合作商的下线，合作商自已不能成为自已及其他合作商的下线会员。同一IP/同一姓名/同一收款账号只能申请一个合作伙伴账号。
            </p>
          </van-collapse-item>
          <van-collapse-item :title="'二、权责条款'" name="2">
            <p>1. 合作伙伴的权利和义务</p>
            <p>
              1.1.
              合作伙伴需尽其责任积极销售及推广{{$t($config[$projectname].secName)}}以求双方利润最大化。合作伙伴必须在不违反法律的前提下，进行正面宣传、销售及推广{{$t($config[$projectname].secName)}}。由此产生的宣传、销售及推广时所产生的费用需由合作伙伴自行承担。
            </p>
            <p>
              1.2.
              合作伙伴不得私自转载、公开、分发包括主页、域名、logo、报表、游戏画面、图文等在内的相关资料。另外，在推广时，合作伙伴要保障{{$t($config[$projectname].secName)}}的利益，任何有损公司声誉的行为，一经发现立即终止合作关系。
            </p>
            <p>2.{{$t($config[$projectname].secName)}}对合作伙伴的权利与义务</p>
            <p>
              2.1.
              {{$t($config[$projectname].secName)}}的客服代表将会协助合作伙伴给下线办理开户业务并观察其投注状况。代理商及会员皆须同意并遵守{{$t($config[$projectname].secName)}}的会员条例、政策及操作程序。合作伙伴可随时登入管理后台了解其下线会员的账户报表。
            </p>
            <p>2.2. {{$t($config[$projectname].secName)}}保留所有对合作代理商或会员之账户加以拒绝或冻结的权利。</p>
            <p>
              2.3.
              在某些情况下经过认真审查{{$t($config[$projectname].secName)}}保留单方面修改合作协议上的任何条款的权利，{{$t($config[$projectname].secName)}}会在网站刊登修改情况告知合作伙伴。修改内容可能包括：佣金范围、付款程序、及其它条例。如合作伙伴对于修改表示反对，合作伙伴可终止合约。修改后合作伙伴不作任何异议，便视作默认接受和对新协议表示认可。
            </p>
          </van-collapse-item>
          <van-collapse-item :title="'三、协议期限和终止'" name="3">
            <p>
              1. 期限和终止
              <br />合作协议从合作伙伴申请成功后开始执行。合作伙伴在任何时间均可终止此合约，但必须以书面形式提前7日内通知对方有关合约的终止，合作伙伴可将通知以电邮形式寄致：{{siteInfo.email}}
              如合作伙伴违反合作协议，{{$t($config[$projectname].secName)}}有权在没有通知的情况下终止合约。
            </p>
            <p>
              2.保密信息
              <br />在合约执行期间，合作伙伴同意不会透露相关{{$t($config[$projectname].secName)}}的合作机密数据于第三方，除得到{{$t($config[$projectname].secName)}}书面同意及可利用这些机密文件作为日后必要时作合约之跟进之用。合作伙伴有义务在合约终止后仍执行机密文件的保密。
            </p>
            <p>
              3. 无条件终止
              <br />如果合作伙伴在任何情形下，通过大批量发送垃圾电子邮件宣传{{$t($config[$projectname].secName)}}的服务，我们将无条件立即终止此协议，并将合作伙伴账户重新审核及冻结其款项。合作商不可以提出任何与我们有关的要求或声明、或给出任何承诺，同时您也没有任何权力将我们约束在任何义务之下。
            </p>
            <p>
              4. 不承诺
              <br />有关于合作项目，我们不发表任何关于我们网站运作将会无干扰和无错误的声明，因而即便一旦出现问题我们也将对此不负任何责任。
            </p>
            <p>
              5. 管理条理
              <br />无论是在任何法律条例的管制下，此协议都将受制于菲律宾的法律。任何与此协议相关的法律行为必须被带到菲律宾政府。您认可并认真阅读了此协议并同意其所有的规则及条款，在任何时候您确认您已经自主评估了参与的意愿并不依赖于任何在此协议之外的言论、保证和声明。通过下载我们的宣传文章和在您的网站上创建一个链接到我们的网站上，您明确地同意被此协议的规则和条款所约制。
            </p>
          </van-collapse-item>
        </van-collapse>
      </div>
      <!-- 合约 -->
      <div class="contract footer" style="margin-bottom: 1.5rem;display: none">
        <div class="items">
          <div class="list" v-for="(i, index) in siteInfo.business_cooperation" :key="index">
            <div class="item">
              <div v-if="i.icon" class="img">
                <!-- {{(i.icon).toLowerCase()}} -->
                <img v-if="siteInfo.business_cooperation && siteInfo.business_cooperation.length>0" :src="i.icon" alt=‘2’ />
                <img v-else :src="require(`@assets/img3_0/agent/home/${(i.icon).toLowerCase()}.png`)" alt=‘1’ />
                <br />
              </div>
              <div v-if="siteInfo.business_cooperation && siteInfo.business_cooperation.length>0" class="text"><a :href="i.url" target="_blank"></a>{{i.name}}:{{i.contact }}</a></div>
              <div v-else class="text">{{i.title }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <loading :isShow="isLoading"></loading>
    <van-popup v-model="stepsShow" class="custom agent-steps-dia" round closeable close-icon="close" close-icon-position="top-right" get-container="#app">
      <div class="agent-steps">
        <div class="pop-head">
          <p>{{$t('加入流程')}}</p>
        </div>
        <div class="step">
          <div class="item">
            <div class="text">{{$t('一')}}</div>
            <p class="desc">1. 为有效防止非诚信合作商滥用{{$t($config[$projectname].secName)}}所提供的代理优惠制度，公司审查部门将严格审核每位代理商注册时提供的个人资料（包括姓名，邮件及电话等）若经审核发现代理商有任何不良营利企图，或与其他代理商、会员进行合谋套利等不诚信行为，{{$t($config[$projectname].secName)}}将关闭该合作代理商之账户并收回该代理商的所有佣金与优惠。</p>
            <p class="desc">2. 同一IP/同一姓名/同一收款账号的会员只能是一个合作商的下线，合作商自已不能成为自已及其他合作商的下线会员。同一IP/同一姓名/同一收款账号只能申请一个合作伙伴账号。</p>
          </div>
          <div class="item">
            <div class="text">{{$t('二')}}</div>
            <p class="desc">1. 合作伙伴的权利和义务</p>
            <p class="p">1.1.
              合作伙伴需尽其责任积极销售及推广{{$t($config[$projectname].secName)}}以求双方利润最大化。合作伙伴必须在不违反法律的前提下，进行正面宣传、销售及推广{{$t($config[$projectname].secName)}}。由此产生的宣传、销售及推广时所产生的费用需由合作伙伴自行承担。</p>
            <p class="p">
              1.2.
              合作伙伴不得私自转载、公开、分发包括主页、域名、logo、报表、游戏画面、图文等在内的相关资料。另外，在推广时，合作伙伴要保障{{$t($config[$projectname].secName)}}的利益，任何有损公司声誉的行为，一经发现立即终止合作关系。
            </p>
            <p class="desc">2.{{$t($config[$projectname].secName)}}对合作伙伴的权利与义务</p>
            <p class="p">
              2.1.
              {{$t($config[$projectname].secName)}}的客服代表将会协助合作伙伴给下线办理开户业务并观察其投注状况。代理商及会员皆须同意并遵守{{$t($config[$projectname].secName)}}的会员条例、政策及操作程序。合作伙伴可随时登入管理后台了解其下线会员的账户报表。
            </p>
            <p class="p">2.2. {{$t($config[$projectname].secName)}}保留所有对合作代理商或会员之账户加以拒绝或冻结的权利。</p>
            <p class="p">
              2.3.
              在某些情况下经过认真审查{{$t($config[$projectname].secName)}}保留单方面修改合作协议上的任何条款的权利，{{$t($config[$projectname].secName)}}会在网站刊登修改情况告知合作伙伴。修改内容可能包括：佣金范围、付款程序、及其它条例。如合作伙伴对于修改表示反对，合作伙伴可终止合约。修改后合作伙伴不作任何异议，便视作默认接受和对新协议表示认可。
            </p>
          </div>
          <div class="item">
            <div class="text">{{$t('三')}}</div>
            <p class="desc">{{$t('立即推广')}}</p>
            <p class="p">{{$t('除了运用您本身的资源以外')}}</p>
            <p class="desc">
              1. 期限和终止</p>
            <p class="p">合作协议从合作伙伴申请成功后开始执行。合作伙伴在任何时间均可终止此合约，但必须以书面形式提前7日内通知对方有关合约的终止，合作伙伴可将通知以电邮形式寄致：{{siteInfo.email}}
              如合作伙伴违反合作协议，{{$t($config[$projectname].secName)}}有权在没有通知的情况下终止合约。
            </p>
            <p class="desc">
              2.保密信息</p>
            <p class="p">在合约执行期间，合作伙伴同意不会透露相关{{$t($config[$projectname].secName)}}的合作机密数据于第三方，除得到{{$t($config[$projectname].secName)}}书面同意及可利用这些机密文件作为日后必要时作合约之跟进之用。合作伙伴有义务在合约终止后仍执行机密文件的保密。
            </p>
            <p class="desc">
              3. 无条件终止</p>
            <p class="p">如果合作伙伴在任何情形下，通过大批量发送垃圾电子邮件宣传{{$t($config[$projectname].secName)}}的服务，我们将无条件立即终止此协议，并将合作伙伴账户重新审核及冻结其款项。合作商不可以提出任何与我们有关的要求或声明、或给出任何承诺，同时您也没有任何权力将我们约束在任何义务之下。
            </p>
            <p class="desc">
              4. 不承诺</p>
            <p class="p">有关于合作项目，我们不发表任何关于我们网站运作将会无干扰和无错误的声明，因而即便一旦出现问题我们也将对此不负任何责任。
            </p>
            <p class="desc">
              5. 管理条理</p>
            <p class="p">无论是在任何法律条例的管制下，此协议都将受制于菲律宾的法律。任何与此协议相关的法律行为必须被带到菲律宾政府。您认可并认真阅读了此协议并同意其所有的规则及条款，在任何时候您确认您已经自主评估了参与的意愿并不依赖于任何在此协议之外的言论、保证和声明。通过下载我们的宣传文章和在您的网站上创建一个链接到我们的网站上，您明确地同意被此协议的规则和条款所约制。
            </p>
          </div>
        </div>
      </div>

    </van-popup>
  </div>
</template>

<script>
import "swiper/dist/css/swiper.css";

import Lheader from "@/components/l-header";
import { Swiper } from "vue-awesome-swiper";
import { excellentagent } from "@/api/memberCenter";
import Loading from "@/components/loading";
import vueSvgDraw from "vue-svg-draw";
import {mapState} from 'vuex'

export default {
  name: "agent_home",
  components: {
    Loading,
    Lheader,
    vueSvgDraw
  },
  data() {
    return {
      onReady: e => {},
      contracts: [
        {
          icon: "skype",
          title: "198681681@qq.com"
        },
        {
          icon: "telegram",
          title: "@wanqudaili"
        },
        {
          icon: 'agentWhatsApp',
          title: '13218765428'
        },
        {
          icon: "QQ",
          title: "198681681"
        }
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
      activeNames: ["1"],
      data: {
        merchant_no: process.env.VUE_APP_MERCHANT_NO
      },
      users: [],
      commission: [
        [this.$t('级别'), this.$t('公司本月总盈利'), this.$t('活跃玩家数最低要求'), this.$t('佣金百分比')],
        ["1", "1~50,000", "3", "30.00%"],
        ["2", "50,001~200,000", "10", " 35.00%"],
        ["3", "200,001~600,000", "30", " 40.00%"],
        ["4", "600,001~1,000,000", "60", " 45.00%"],
        ["5", "1,000,001", "100", " 50.00%"]
      ],
      stepsShow:false,
      phoneNum: null
    };
  },
  computed:{
    ...mapState('global',['siteInfo'])
  },
  watch:{
    siteInfo:{
      hanler(val) {
        if(val.business_cooperation && val.business_cooperation>0) {
          this.contracts = val.business_cooperation
        }
      },
      deep:true
    }
  },
  mounted() {},
  created() {
    // 有需要代理
    this.isLoading = true;
    excellentagent(this.data)
      .then(res => {
        if (res.data.code === 0) {
          this.users = res.data.data;
          this.$nextTick(() => {
            var bannerSwiper = new Swiper(".swiper-container", {
              slidesPerView: 2,
              slidesPerGroup: 2
            });
          });
        }
      })
      .finally(() => {
        this.isLoading = false;
      });

    if(this.siteInfo.business_cooperation && this.siteInfo.business_cooperation.length>0) {
      this.contracts = this.siteInfo.business_cooperation
    }
    
    this.contracts.map((v,i)=>{
      if(v.name==='WhatsApp'){
        this.phoneNum = v.contact
      }
    })
    console.log(123, this.siteInfo.business_cooperation,this.contracts)
    let agToken = window.localStorage.agToken,
      agId = window.localStorage.agId;
    if (agToken && agId) {
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }
  },
  methods: {
    formatName(name) {
      let newStr;
      if (name.length === 2) {
        newStr = name.substr(0, 1) + "*";
      } else if (name.length > 2) {
        let char = "";
        for (let i = 0, len = name.length - 2; i < len; i++) {
          char += "*";
        }
        newStr = name.substr(0, 1) + char + name.substr(-1, 1);
      } else {
        newStr = name;
      }

      return newStr;
    }
  }
};
</script>
