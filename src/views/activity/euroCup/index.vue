<template>
  <div id="euroCup">
    <lheader v-if="!$route.query.source" :title="title" :goback="true"></lheader>
    <div class="bg1"></div>   
    <div class="bg2">      
      <img class="title_one" v-lazy="require('./img/title_one.png')" alt="">
      <img class="banner" v-lazy="VUE_APP_PROJECT_NAME === 'wanqu'?require('./img/banner.png'):require('./img/banner2.png')"  alt="" @click="handleBannerLink">
      <div class="bg2-desc">
        <div>{{$t('欧洲杯期间每个有比赛的夜晚提前完成100元存款')}}</div>
        <div>{{$t('和投注即可参与红包雨活动')}}</div>             
      </div>
      <div class="rule-box">
        <div class="rule-title">活动规则:</div>
        <div class="rule-desc"><span>1. </span>当日完成100元存款以及100投注才可参与红包雨活动</div>
        <div class="rule-desc"><span>2. </span>红包雨开启时间为每晚8点至8点30</div>
        <div class="rule-desc"><span>3. </span>红包雨每次持续时间为10秒</div>
        <div class="rule-desc"><span>4. </span>所获彩金必须投注与体育平台的欧洲杯比赛</div>
        <div class="rule-desc"><span>5. </span>彩金完成1倍流水即可出款</div>
      </div>
    </div>
    <div class="bg3">      
      <img class="title_two" v-lazy="require('./img/title_two.png')" alt="">
      <div class="competition-forecast">
        <div class="forecast-title">
          预测赛事为:
        </div>
        <div class="forecast-item" v-for="(detail, index) in detailContent" :key="index">          
          <div v-html="detail"></div>
        </div>
      </div>
      <div class="from">
        <div class="from-header">第1轮竞猜题</div>
        <div class="from-item" v-for="question in questions" :key="question.id">
          <div class="item-title">
            {{question.title}}
          </div>
          <div class="item-btns">
            <span :class="question.answerId == answer.id? 'btn-item selected':'btn-item'" 
            v-for="(answer, index) in question.answersData" :key="index"
            @click="onCheckAnswer(question, answer)">
              {{answer.title}}
            </span>          
          </div>
        </div>
      </div>
      <div class="from-btn">       
        <span class="btn-submit" @click="onSubmit">
          {{$t('提交')}}
        </span>
      </div>
      <div class="look-record">
        <span @click="lookRecord">
          <span>查看竞猜记录</span>
          <img class="right-icon" v-lazy="require('./img/to_right.png')" alt="">
        </span>        
      </div>
      <div class="bg3-list">
        <div class="list-item" v-for="(award, index) in awards" :key="index">
          <img v-if="index===0" class="icon" v-lazy="require('./img/icon_one.png')" alt="">
          <img v-else-if="index===1" class="icon" v-lazy="require('./img/icon_two.png')" alt="">
          <img v-else-if="index===2" class="icon" v-lazy="require('./img/icon_three.png')" alt="">
          <img v-else class="icon" v-lazy="require('./img/icon.png')" alt="">
          <span class="title">{{award.title}}：中{{award.corrected}}题</span>
          <span class="desc"><span v-if="award.divided_type==1">平分</span><span v-if="award.divided_type==2">每人领取</span>{{award.amounts}}元</span>
        </div>               
      </div>
      <div class="center-rule-box">
        <div class="rule-title">活动规则:</div>
        <div class="rule-desc"><span>1. </span>当日完成≥{{flowAmounts}}体育投注流水，以及≥{{depositAmounts}}存款金额即可参与竞猜</div>        
        <div class="rule-desc"><span>2. </span>每位会员每轮只可参与一次竞猜</div>
        <div class="rule-desc"><span>3. </span>每轮竞猜将于比赛开始前30分钟截止答题</div>
        <div class="rule-desc"><span>4. </span>猜中1题以上即可获得奖金，奖金将在每轮最后一场赛事结束后的24小时内自动派送至会员主钱包</div>        
        <div class="rule-desc"><span>5. </span>奖金仅限投注与IM以及IBC体育平台，完成3倍流水即可提款</div>        
        <div class="rule-desc"><span>6. </span>竞猜题目准确答案包括加时以及点球大战时的数据</div>
        <div class="rule-desc"><span>7. </span>此优惠可与其他优惠共享，参与条件需单独完成不重复计算，且其它优惠彩金产生的流水将不计算入此累计有效投注流水</div>                
      </div>
    </div>
    <div class="bg4">
      <img class="title_three" v-lazy="require('./img/title_three.png')" alt="">
      <div class="bg4-table">
        <table>
          <thead>
            <tr>
              <th>{{ $t("有效存款") }}</th>
              <th>{{ $t("完成有效流水") }}</th>
              <th>{{ $t("VIP1-VIP5彩金") }}</th>
              <th>{{ $t("VIP6-VIP10彩金") }}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>5,000</td>
              <td>10,000</td>
              <td>18元</td>
              <td>88元</td>
            </tr>
            <tr>
              <td>10,000</td>
              <td>50,000</td>
              <td>88元</td>
              <td>188元</td>
            </tr>
            <tr>
              <td>30,000</td>
              <td>200,000</td>
              <td>288元</td>
              <td>388元</td>
            </tr>
            <tr>
              <td>80,000</td>
              <td>600,000</td>
              <td>688元</td>
              <td>888元</td>
            </tr>
            <tr>
              <td>100,000</td>
              <td>1,000,000</td>
              <td>888元</td>
              <td>1,688元</td>
            </tr>
            <tr>
              <td>20,000</td>
              <td>1,500,000</td>
              <td>1,888元</td>
              <td>3,888元</td>
            </tr>
          </tbody>          
        </table>
      </div>
      <div class="bg4-table bottom">
        <table>
          <thead>
            <tr>
              <th style="width:50%">{{ $t("累计周期") }}</th>
              <th style="width:50%">{{ $t("兑换彩金时间") }}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>小组赛 6月12日至6月24日</td>
              <td>6月25日至6月26日</td>
            </tr>
            <tr>
              <td>1/8决赛 6月27日至6月30日</td>
              <td>7月1日至7月2日</td>
            </tr>
            <tr>
              <td>1/4决赛 7月3日至7月4日</td>
              <td>7月5日至7月6日</td>
            </tr>
            <tr>
              <td>半决赛 7月7日至7月8日</td>
              <td>7月9日至7月11日</td>
            </tr>
            <tr>
              <td class="title" colspan="2">{{ $t("冲击7月12日决赛对决") }}</td>
            </tr>
          </tbody>          
        </table>
      </div>     
      <div class="bg4-rule">
        <div class="rule-title">活动规则:</div>
        <div class="rule-desc"><span>1. </span>会员可选择在每轮累计周期结束后兑换彩金或是继续累计至下一轮或是决赛前兑换；</div>        
        <div class="rule-desc"><span>2. </span>彩金兑换后即重新累计计算存款和流水；</div>
        <div class="rule-desc"><span>3. </span>有效流水即为已结算并产生输赢结果的投注额，任何走盘、取消的赛事、对押等(包括串关)赔率低于欧洲盘1.5，香港盘0.5，马来盘0.5的投注将不计算在有效流水内</div>                
        <div class="rule-desc"><span>4. </span>彩金仅限投注与IM以及IBC体育平台，完成3倍流水即可提款</div>
        <div class="rule-desc"><span>5. </span>此优惠可与其他优惠共享，参与条件需单独完成不重复计算，且其它优惠彩金产生的流水将不计算入此累计有效投注流水</div>                
      </div>
    </div>
    <div class="bottom-box">
      <div class="bottom">
        <div class="bottom-item">所有优惠活动仅限真实有效会员参与，会员需完成手机验证以及成功绑定银行账号；每个手机号码/电子邮箱/户籍地址/银行地址/同一银行卡/同一IP/每一电脑或上网设备将被判定为同一个会员玩家。</div>
        <div class="bottom-item">任何以不当行为方式参与优惠和违反规则的会员将被取消参与活动资格，严重者将被冻结账号并扣除彩金以及所产生的所有盈利。</div>        
      </div>
    </div>
    <van-dialog v-model="show" title="标题" :showConfirmButton="false" class="dialog-box">
      <div slot="title">
        <div class="dialog-title">
          <span>竞猜记录</span>
        </div>        
      </div>
      <div class="dialog-content">
        <div class="content-filter">
          <span>竞猜场次：</span>
          <!-- <van-popover
            v-model="showPopover"
            trigger="click"
            :actions="actions"
            @select="onSelect"
          >
          </van-popover> -->
          
          <van-popover
            v-model="showPopover"
            class="euro-cup-popover"            
            trigger="click"     
            @select="onSelect"       
            :actions="actions"
          >
            <template #reference>
              <!-- <van-button type="primary">深色风格</van-button> -->
              <span>
                <span class="title">{{currentTurnsTitle}}</span>
                <van-icon class="icon" name="arrow-down" />            
              </span> 
            </template>
          </van-popover>                    
        </div>
        <div v-if="!records.length" class="empty-wrap">
          <img class="empty-img" v-lazy="require('./img/empty.png')" alt="">
          <div class="empty-title">
            暂无竞猜记录
          </div>
        </div>
        <div v-if="records.length">
          <table>
            <thead>
              <tr>
                <th class="order">顺序</th>
                <th>竞猜内容</th>
                <th class="result">选择答案</th>
                <th class="result">正确答案</th>
              </tr>
            </thead>
          </table>
          <div class="content">        
            <table>
              <tbody>
                <tr v-for="(record, index) in records" :key="record.no">
                  <td class="order">{{index+1}}</td>
                  <td>{{record.title}}</td>                                  
                   <td :class="record.user_answer===record.correct||(!record.correct||record.correct==='')?'result green':'result red'">{{record.user_answer}}</td>
                  <td :class="!record.correct||record.correct===''?'result wait':'result'">{{!record.correct||record.correct===''?'待更新':record.correct}}</td>
                </tr>                
              </tbody>            
            </table>
          </div>
        </div>
        <div class="dialog-btn">        
          <van-button class="btn-ok" @click="handleClose">
            {{$t('知道了')}}
          </van-button>
        </div>
      </div>   
    </van-dialog>
    
  </div>
</template>
<style lang="less" scoped>
#euroCup {
  // background-color: #11A6BA;
  background-color: #fff;
  padding-top: 80px;
  font-family: PingFangSC-Regular, PingFang SC;
  .bg1{
    height: 680px;
    background: url("./img/bg1.png") center top no-repeat;
    background-size: 100% 100%;
  }
  .bg2{
    margin-top: -60px;
    background: url("./img/bg2.png") center top no-repeat;
    position: relative;
    background-size: 100% 100%;
    text-align: center;    
    padding: 80px 25px 100px;
    .title_one {
      height: 166px;
      width: 388px;
    }
    .banner {
      width: 100%;
      height: 214px;
      margin-top: 10px;
    }
    .bg2-desc {
      font-size: 24px;
      margin-top: 24px;   
      line-height: 34px;   
      font-weight: 400;
      color: #D1F8FF;
    }
    .rule-box {           
      margin: 40px auto 0;
      background: url("./img/rule_bg1.png") center top no-repeat;
      background-size: 100% 100%;      
      padding: 37px 35px 50px;
      text-align: left;
      .rule-title {
        font-size: 28px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #FFFFFF;
        line-height: 36px; 
        margin-bottom: 15px;       
      }     
      .rule-desc {
        font-size: 24px;                
        font-weight: 400;
        color: #D1F8FF;
        line-height: 44px;
        padding-left: 25px;
        position: relative;
        span {
          position: absolute;
          left: 0;
        }  
      }
    }
  }
  .bg3 {    
    margin-top: -65px;    
    text-align: center;    
    background: url("./img/bg3.png") center top no-repeat;
    background-size: 100% 100%;
    padding: 90px 25px 100px;
    .title_two {
      height: 190px;
      width: 366px;
    }
    .competition-forecast {
      margin: 20px auto 0;         
      background: #178494;
      border-radius: 8px;
      border: 2px solid #11A6BA;
      text-align: left;
      padding: 28px 0 28px 30px;
      .forecast-title {        
        font-size: 28px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        margin-bottom: 25px;
        color: #FFFFFF;
      }
      .forecast-item {
        font-size: 24px;        
        font-weight: 400;
        color: #D1F8FF;
        line-height: 40px;        
      }
    }
    .from {
      margin: 90px auto 0;
      padding: 40px 30px 60px;
      width: 100%;      
      background: #178494;
      border-radius: 8px;
      border: 2px solid #11A6BA;
      position: relative;
      .from-header {
        position: absolute;
        left: 50%;
        top: -40px;
        margin-left: -212px;
        background: url("./img/from_header.png") center top no-repeat;
        background-size: 100% 100%;
        width: 424px;
        height: 83px;
        line-height: 83px;
        font-size: 30px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #FFFFFF;
      }
      .from-item {        
        margin-top: 50px;        
        text-align: left;
        .item-title {          
          font-size: 28px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #FFFFFF;
          line-height: 33px;
        }
        .item-btns {    
          padding-left: 48px;
          text-align: left;                  
          .btn-item {   
            display: inline-block;         
            width: 230px;
            height: 70px;     
            font-size: 28px;
            text-align: center;
            line-height: 70px;    
            color: #D1F8FF;
            background: #087184;
            border-radius: 36px;
            border: 2px solid #0B95B0;
            margin-top: 20px;
            margin-right: 80px;  
            &:nth-child(even) {
              margin-right: 0;
            }
            &.selected {
              background: linear-gradient(270deg, #E4FFFD 0%, #FFFFFF 100%);
              box-shadow: 0px 3px 5px 0px #0D6572, 0px 6px 0px 0px #12FFFF, 0px 4px 4px 0px #0A8EAA, 0px 2px 0px 0px #FFFFFF;              
              color: #087184;
            }  
          }         
        }
      }
    }
    .from-btn {
      margin-top: 40px;
      .btn-submit {
        display: inline-block;
        line-height: 80px;
        font-size: 28px;
        width: 540px;
        height: 80px;
        background: #F7E122;
        box-shadow: 0px 4px 0px 0px #12AAC0, 0px 2px 0px 0px #FFF6AD !important;
        border-radius: 47px;
        color: #087184;
        border: 0;
        &:hover {
          border: 0;
        }
      }
    }
    .look-record {
      margin-top: 15px;      
      span {        
        display: inline-block;
        line-height: 50px;
        height: 50px;
        font-size: 24px;                
        color: #FFFFFF;       
        cursor: pointer;
      }
      .right-icon {
        vertical-align: middle;        
        height: 20px;
        width: 12px;
        margin-left: 10px;
      }
    }
    .center-rule-box {
      margin: 50px auto 0;      
      background: url("./img/rule_bg.png") center top no-repeat;
      background-size: 100% 100%;
      width: 100%;
      padding: 30px;
      text-align: left;
      .rule-title {
        font-size: 28px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #FFFFFF;
        line-height: 36px;
      }
      .rule-desc {
        margin-top: 12px;
        font-size: 24px;
        color: #D1F8FF;        
        line-height: 38px;
        padding-left: 25px;
        position: relative;
        span {
          position: absolute;
          left: 0;
        }  
      }
    }
    .bg3-list {      
      margin: 40px auto 0;     
      border: 2px solid #11A6BA;
      border-radius: 8px;
      background-color: #178494;
      .list-item {        
        text-align: left;
        font-size: 26px;        
        font-weight: 400;
        color: #D1F8FF;        
        border-bottom: 2px solid #11A6BA;
        line-height: 84px;
        padding: 0 30px 0 38px;
        &:last-child {
          border-bottom: none;
        }
        .title {          
          font-weight: 400;          
          color: #FFFFFF;
        }
        .desc {
          float: right;                   
          font-weight: 400;
          color: #F7E122;          
        }
        .icon {
          width: 33px;
          height: 44px;
          vertical-align: middle;
          margin-right: 15px;
        }
      }      
    }
  }
  .bg4 {    
    text-align: center;
    margin-top: -65px;    
    width: 100%;        
    background: url("./img/bg4.png") center top no-repeat;   
    background-size: 100% 100%;
    padding: 80px 25px 100px;
    .title_three {
      margin-top: 10px;
      height: 188px;
      width: 416px;
    }
    .bg4-table {
      width: 100%;
      margin: 30px auto 0;
      border: 2px solid #11A6BA;
      border-radius: 10px;   
      overflow: hidden;
      table {        
        border-spacing: 0;
        width: 100%;
        tr {
          background: #086778;
        }
        th, td {          
          padding: 20px 0;
          border-right: 2px solid #11A6BA;
          border-bottom: 2px solid #11A6BA;
          &:last-child {
            border-right: none;
          }
        }
        tbody tr:last-child {
          td {
            border-bottom: none;
          }
        }
        th {
          font-size: 24px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #F7E122;
        }
        td {
          text-align: center;
          font-size: 22px;        
          font-weight: 400;
          color: #D1F8FF;
          &.title {
            font-size: 24px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #F7E122;
          }
        }
      }
    }
    .bg4-rule {
      width: 100%;
      margin: 40px auto 0;
      text-align: left;
      .rule-title {
        font-size: 28px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #FFFFFF;
        line-height: 36px;
        margin-bottom: 20px;
      }
      .rule-desc {
        padding-left: 25px;
        margin-top: 10px;
        font-size: 24px;        
        font-weight: 400;
        color: #D1F8FF;
        line-height: 38px;
        position: relative;
        span {
          position: absolute;
          left: 0;
        }        
      }
    }
  }
  .bottom-box {
    margin-top: -70px;
    background: url("./img/bg5.png") center top no-repeat;
    background-size: 100% 100%;       
    padding: 50px 25px 0px;
    .bottom {    
      margin: 40px auto 0;
      text-align: left;
      padding-bottom: 67px;      
      .bottom-item {
        margin-top: 10px;
        font-size: 24px;        
        font-weight: 400;
        color: #72D7E9;
        line-height: 40px;
        padding-left: 30px;
        position: relative;
        &::before {
          left: 0;
          top: 8px;        
          content: '';
          position: absolute;
          display: block;
          width: 24px;
          height: 24px;
          background: url("./img/bottom-icon.png") center top no-repeat;
          background-size: 100% 100%;
        }
      }
    }
  }
  .dialog-box {
    text-align: center;
    .dialog-title {
      position: relative;
      height: 10px;
      span {
        position: absolute;
        width: 300px;
        height: 70px;        
        line-height: 70px;
        left: 50%;
        top: 0px;
        margin-left: -150px;
        background: url("./img/dialog-header.png") center top no-repeat;
        background-size: 100% 100%;
        display: inline-block;
        font-size: 30px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #FFFFFF;
      }
    }
    .dialog-content {
      background-color: #fff;
      padding-bottom: 50px;
      border-radius: 20px;
      overflow: hidden;
      border: 4px solid #11A6BA;
      overflow: hidden;
      padding-top: 55px;
      .empty-wrap {
        padding-top: 60px;
        padding-bottom: 40px;
        .empty-img {
          width: 160px;
          height: 105px;
        }
        .empty-title {
          margin-top:18px;
          font-size: 24px;
          color: #C6C6C6;
        }
      }
      .content-filter {
        padding: 15px 0 20px;
        font-size: 26px;
        line-height: 55px;
        font-weight: 400;
        color: #333333;
        .title {
          font-size: 26px;
          color: #333333;
          font-weight: 600;
          cursor: pointer;
        }
        .icon {     
          vertical-align: middle; 
          font-size: 26px;    
          color: #666;
          margin-left: 5px;
          margin-top: -5px;
        }
      }
      .content {
        max-height: 450px;
        overflow-y: auto;
      }    
      table {
        width: 100%;
        border-spacing: 0;
        &:first-child {
          margin-bottom: 20px;
        }
        tbody {
          margin-bottom: 10px;
        }
        th {
          font-size: 24px;                
          color: #178494;
          line-height: 33px;
          background: #E2F7FE;
          text-align: left;
          padding: 15px 0; 
          &.order {
            text-align: center;
            width: 120px;
          }
          &.result {
            text-align: center;
            width: 140px;
          }
        }
        td {
          font-size: 24px;
          color: #333333;
          line-height: 33px;
          background: #F3FCFF;
          padding: 15px 0; 
          text-align: left;
          &.order {
            text-align: center;
            width: 120px;
          }
          &.result {
            text-align: center;
            width: 140px;
            &.red {
              color: #FF3F3F;
            }
            &.green {
              color: #37BB77;
            }
            &.wait {
              color: #999999;
            }
          }       
        }
        tbody {
          tr {
            &:nth-child(even) {
              td {
                background: #fff;
              }            
            }
          }
        }
      } 
      .dialog-btn {
        margin-top: 20px;
        .btn-ok {
          display: inline-block;
          width: 480px;
          color: #461515;
          height: 80px;          
          font-weight: 500;
          background: #F7E122;
          box-shadow: 0px 4px 0px 0px #F6B821, 0px 2px 0px 0px #FFF6AD;
          border-radius: 47px;
          font-size: 28px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #461515;
        }
      }   
    }
  }
  /deep/.van-dialog {
    padding: 0;
  }
  /deep/.van-dialog .van-dialog__content {
    background-color: transparent !important;
  }
  /deep/.van-dialog .van-dialog__footer {
    margin: 0;
  }
  /deep/.van-dialog .van-dialog__header {
    padding: 0;
  }
}
</style>
<style>
.van-popup {
    width: 253px;
    background-color: transparent !important;
}
.van-popover__content {
  border: 2px solid #11A6BA;
}
.van-popover[data-popper-placement=bottom] .van-popover__arrow {
  color: #11A6BA;
}
.van-popover__action {
  width: 100%;
}
</style>
<script>
import { getEuroCupRecord, joinGuessEuroCup, getEuroCupInfo, getEuroCupTurns } from '@/api/activity'
import { Toast } from 'vant'
import { mapGetters } from "vuex";
import Lheader from "@/components/l-header";
export default {
  data() {
    return {  
      title: this.$t("欧洲杯活动"),
      show: false,
      showPopover: false,
      actions: [],      
      questions: [],
      awards: [],
      records: [],      
      currentTurnsTitle: '',
      flowAmounts: 0,
      depositAmounts: 0,
      VUE_APP_PROJECT_NAME: process.env.VUE_APP_PROJECT_NAME,
      detailContent: []
    }
  },
  components: {
    Lheader,
  },
  computed: {
    id () {
      const { query } = this.$route
      return query.id
    },    
    ...mapGetters("users", ["isLogin"]),
  },
  watch: {
    id: {
      handler (value) {
        if (!value) {
          this.$router.go(-1)
        }
      },
      immediate: true
    }
  },
  created() {
    console.log(this.token)
  },
  mounted() {
    this.$loading({
        mask: true,
    });
    const { id } = this.$route.query;
    let _this = this;
    
    getEuroCupInfo({id:id}).then(data=>{
      this.$toast.clear();
      const res = data && data.data &&data.data.data ? data.data.data:null;
      if ( res.detail_content ) {
        this.detailContent = res.detail_content.split('\n');
      }
      this.title = res.title;
      if (res && res.condition_setting ) {
        if (res.condition_setting.condition && res.condition_setting.condition.deposit&& res.condition_setting.condition.flow) {
          _this.flowAmounts = res.condition_setting.condition.flow.amounts;
          _this.depositAmounts = res.condition_setting.condition.deposit.amounts;          
        }
        
        if ( res.condition_setting.awards && Array.isArray(res.condition_setting.awards) ) {
                    
          _this.awards = res.condition_setting.awards;          
        }
        if ( res.condition_setting.questions  ) {
          
          Object.values(res.condition_setting.questions).forEach(ele=>{
            if ( ele.answers ) {
              let _answers = [];

              Object.values(ele.answers).forEach((childEle, index)=>{
                if ( childEle !== null && childEle !== undefined && childEle.length ) {
                  _answers.push({
                    id: index,
                    title: childEle
                  })                  
                }
              })
              ele.answersData = [..._answers];
            }
          })

          _this.questions = Object.values(res.condition_setting.questions);          
        }
      }
    })
  },
  methods: {
    handleBannerLink() {
     if (process.env.VUE_APP_PROJECT_NAME === 'wanqu') {
        this.$router.push({path: '/activity/redEnvelopeRain', query: {id:28}})
      } else {
        this.$router.push({path: '/activity/redEnvelopeRain', query: {id:32}})
      }      
    },
    onSubmit() {
      if (!this.isLogin) {
        this.$router.push('/login')
        return
      }
      const { id } = this.$route.query;
      let _answers = {};
      this.questions.forEach(ele=>{
        _answers[ele.id] = ele.answer
      })

      let canSubmit = true;
      for (const key in _answers) {
        if (Object.hasOwnProperty.call(_answers, key)) {
          const element = _answers[key];
          if ( element ===null || element===undefined || element==="") {
            canSubmit = false
          }
        }
      }     
      if ( !canSubmit ) {                
        Toast.fail(this.$t('竞猜题未做完！'));
        return
      }
      
      let params = {
        id: id,
        answers: JSON.stringify(_answers)
      }      
      this.$loading({
        mask: true,
      });
      joinGuessEuroCup(params).then(res=>{        
        Toast(this.$t('竞猜成功！'))
      })      
    },      
    onCheckAnswer(question, answer) {
      this.$set(question, 'answer', answer.title)
      this.$set(question, 'answerId', answer.id)
      // question.answer = answer;
    },
    onShowPopover() {
      this.showPopover = !this.showPopover;
    },
    onSelect(item) {
      this.currentTurnsTitle = item.text;
      this.refreshRecordData({
        turns: item.text
      })
    },
    handleClose() {
      this.show = false;
    },  
    lookRecord() {
      if (!this.isLogin) {
        this.$router.push('/login')
        return
      }
      this.show = true;
      let _turns = [];
      getEuroCupTurns().then(res=>{
        
        if ( res && res.data && res.data.data) {
          for (const key in res.data.data) {
            if (Object.hasOwnProperty.call(res.data.data, key)) {
              const ele = res.data.data[key];
              if ( !_turns.includes(ele) ) {
               _turns.push(ele); 
              }              
            }
          }
          this.actions = _turns.map(ele=>{
            return {
              text: ele||'-',             
            }
          })          
        }        
      })
      this.refreshRecordData();      
    },
    refreshRecordData(params={}) {
      let _params = {
        id:this.id,
        pagesize:1000,
        ...params
      }
      setTimeout(() => {
        this.$loading({
          mask: true,
        });
      }, 0);
      this.records = [];
      getEuroCupRecord(_params).then(res=>{
        this.$toast.clear();        
        if (res&&res.data&&res.data.data&&res.data.data.data&&Array.isArray(res.data.data.data)&&res.data.data.data[0]&&res.data.data.data[0].result) {
          this.records = res.data.data.data[0].result;          
          if ( res.data.data.data[0] ) {            
            this.currentTurnsTitle = res.data.data.data[0].turns;
          }
        }        
      })      
    },
  }
}
</script>
