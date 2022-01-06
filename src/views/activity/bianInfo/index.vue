<template>
  <div id="welfare">
    <lheader
      v-if="!$route.query.source"
      :title="title"
      :goback="true"
    ></lheader>
    <div class="content" :class="{ 'no-header': !!$route.query.source }">
      <div class="content-header">
        <img src="./assets/bian-icon.png" alt="">
        <span>{{$t('币安')}}</span>
        <van-icon class="header-icon" name="arrow" />
      </div>
      <van-tabs @change="onTableChange" style="color:#fff" :ellipsis="false" v-model="index">
          <van-tab :title="menu.title" v-for="menu in menus" :key="menu.id">
            <template v-if="menu.id === 0">
              <div class="tab-info">
                <div class="info-header">
                  <div class="info-header-title">{{$t('注意事项')}}</div>
                  <p class="info-header-desc" v-for="(title, index) in headerList" :key="index">
                    {{title}}
                  </p>
                </div>
                <div class="info-item" v-for="(item, index) in content" :key="index">
                    <div class="item-title" v-if="item.title">{{item.title}}</div>
                    <div class="item-desc" v-if="item.desc">{{item.desc}}</div>
                    <img
                      class="item-img"
                      :src="item.imgUrl"
                    />                  
                </div>                          
              </div>
            </template>
            <template v-else>
              <div class="tab-info">              
                <div class="info-item" v-for="(item, index) in content" :key="index">
                    <div class="item-title" v-if="item.title">{{item.title}}</div>
                    <div class="item-desc" v-if="item.desc">{{item.desc}}</div>
                    <img
                      class="item-img"
                      :src="item.imgUrl"
                    />                  
                </div>
              </div>
            </template>
          </van-tab>          
      </van-tabs>
    </div>              
  </div>
</template>

<script>
import Lheader from "@/components/l-header";
export default {
  data() {
    return {
      title: "了解虚拟币",
      index: 0,
      menus: [{
        title: this.$t('下载注册认证'),
        id: 0
      },{
        title: this.$t('购买USDT'),
        id: 1
      },{
        title: this.$t('平台USDT存款'),
        id: 2
      },{
        title: this.$t('平台USDT取款'),
        id: 3
      },{
        title: this.$t('USDT兑换人民币'),
        id: 4
      }],
      headerList: [
        this.$t('操作时请尽快完成[购买USDT]与[平台USDT存款]步骤，以免长时间未完成操作导致二维码失效。'),
        this.$t('请购买与存款页面所相对应的USDT类型，如在存款页面选择ERC20则购买时也选择ERC20，不同类型转账将导致失败。'),
        this.$t('转出时需要支付少量手续费，请在买币前联系火币客服了解手续费数量。'),
        this.$t('若三次取消交易当日将无法再进行买入。'),
        this.$t('如遇商家网站无法打开时建议尝试更换浏览器或开启VPN进行操作。'),
        this.$t('进行任意交易前请确认好信息。'),
        this.$t('本教程为热门交易所功能介绍，不负责担保任何交易结果，使用中若遇到操作、账户类的问题，请在火币[帮助中心]联系[在线客服]。'),
        this.$t('若交易所的内容有所变更，一切以交易所官方信息为准。')        
      ]            
    };
  },
  computed: {   
    content() {
      let _data = [];
      switch (this.menus[this.index].id) {
        case 0:
          _data = [{
            title: this.$t('步骤1/6'),
            desc: this.$t('您可在此处下载币安App。安卓下载安装后可直接打开App注册，IOS请参考后面的步骤'),
            imgUrl: require('./assets/1-1.png')
          },{
            title: this.$t('步骤2/6'),
            desc: this.$t('点击[IOS内测版]'),
            imgUrl: require('./assets/1-2.png')
          },{            
            desc: this.$t('[点击下载TestFlight]'),
            imgUrl: require('./assets/1-3.png')
          },{            
            desc: this.$t('点击[获取]'),
            imgUrl: require('./assets/1-4.png')
          },{
            title: this.$t('步骤3/6'),
            desc: this.$t('TestFlight下载完毕后返回浏览器[点击下载Binance App]'),
            imgUrl: require('./assets/1-5.png')
          },{          
            desc: this.$t('在欢迎页面中点击[继续]'),
            imgUrl: require('./assets/1-6.png')
          },{
            title: this.$t('步骤4/6'),
            desc: this.$t('点击[安装]'),
            imgUrl: require('./assets/1-7.png')
          },{            
            desc: this.$t('安装完毕后打开App点击[下一步]'),
            imgUrl: require('./assets/1-8.png')
          },{            
            desc: this.$t('点击[开始测试]'),
            imgUrl: require('./assets/1-9.png')
          },{
            title: this.$t('步骤5/6'),
            desc: this.$t('输入手机号与密码后点击[注册]'),
            imgUrl: require('./assets/1-10.png')
          },{          
            desc: this.$t('输入收到的验证码后[提交]'),
            imgUrl: require('./assets/1-11.png')
          },{            
            desc: this.$t('此时您已经拥有了币安账号并正处于登录状，点击左上角头像，开始认证。认证后方可进行交易'),
            imgUrl: require('./assets/1-12.png')
          },{
            title: this.$t('步骤6/6'),
            desc: this.$t('点击账号后方的[去认证]字样'),
            imgUrl: require('./assets/1-13.png')
          },{            
            desc: this.$t('开始[认证]，建议完成高级认证'),
            imgUrl: require('./assets/1-14.png')
          }]
          break; 
        case 1:
          let _oneImgUrl = require('./assets/2-1.png');
          let _desc1 = this.$t(`打开${this.$config[this.$projectname].project}[存款]选择[虚拟币充值]-[ERC20]并填写存入金额后点击[立即存款]`);
          if ( this.$projectname !== 'wanqu' ) {
            _oneImgUrl = require(`./assets/2-1-${this.$projectname}.png`);
          }
          // if ( this.$projectname === '10062' ) {
          //   _oneImgUrl = require('./assets/2-1-1.png');
          // }
          _data =  [{
            title: this.$t('步骤1/6'),
            desc: _desc1,
            imgUrl: _oneImgUrl
          },{
            title: this.$t('步骤2/6'),
            desc: this.$t('将二维码页面截图保存至相册。二维码即平台的收款地址，28.944USDT代表您填写的人民币对应的USDT数量'),
            imgUrl: require('./assets/2-2.png')
          },{
            title: this.$t('步骤3/6'),            
            desc: this.$t('在首页的[更多]中联系客服咨询转账手续费，然后至[快捷买币]中购买USDT'),
            imgUrl: require('./assets/2-3.png')
          },{         
            title: this.$t('步骤4/6'),      
            desc: this.$t('在[自选区]找到合适的卖家点击[购买]'),
            imgUrl: require('./assets/2-4.png')
          },{     
            title: this.$t('步骤5/6'),         
            desc: this.$t('按[购买数量]填写后[购买USDT]。购买数量=存款页面显示的转入USDT数+手续费'),
            imgUrl: require('./assets/2-5.png')
          },{                      
            desc: this.$t('在[请付款]页面点击[付款方式]查看后选择您想使用的方式付款，下方可复制对方收款账户'),
            imgUrl: require('./assets/2-6.png')
          },{           
            title: this.$t('步骤6/6'),
            desc: this.$t('付款后返回交易页面[确认]'),
            imgUrl: require('./assets/2-7.png')
          },{                        
            desc: this.$t('确认后即完成交易，点击[划转到现货钱包]'),
            imgUrl: require('./assets/2-8.png')
          }]
          break; 
        case 2:
          _data =  [{
            title: this.$t('步骤1/7'),
            desc: this.$t('点击首页左上方头像，在[我的]点击[设置]'),
            imgUrl: require('./assets/3-1.png')
          },{
            title: this.$t('步骤2/7'),
            desc: this.$t('在[设置]中点击[提现地址]'),
            imgUrl: require('./assets/3-2.png')
          },{
            title: this.$t('步骤3/7'),            
            desc: this.$t('[添加新地址]'),
            imgUrl: require('./assets/3-3.png')
          },{
            title: this.$t('步骤4/7'),            
            desc: this.$t('选择USDT并选择[ERC20]，使用页面中的扫码功能扫描刚刚保存在相册中的二维码，勾选[加入白名单]后保存'),
            imgUrl: require('./assets/3-4.png')
          },{
            title: this.$t('步骤5/7'),            
            desc: this.$t('在[资金]中点击[提现]'),
            imgUrl: require('./assets/3-5.png')
          },{
            title: this.$t('步骤6/7'),            
            desc: this.$t('在[数字货币]的[币种列表]选中[USDT]'),
            imgUrl: require('./assets/3-6.png')
          },{
            title: this.$t('步骤7/7'),            
            desc: this.$t('选择[ERC20]后在地址簿中选择刚刚添加的平台存款地址并输入[提现金额]后[提现]。提现金额=存款页面显示的转入USDT数+手续费'),
            imgUrl: require('./assets/3-7.png')
          }]
          break;  
        case 3:
          let _fourImgUrl = require('./assets/4-4.png');
          let _fiveImgUrl = require('./assets/4-5.png');
          let _desc = this.$t(`将您的币安收款地址与${this.$config[this.$projectname].project}账户绑定`);
          if ( this.$projectname === '10029' ) {
            _fourImgUrl = require('./assets/4-4-0.png');
            _fiveImgUrl = require('./assets/4-5-0.png');
          }
          _data =  [{
            title: this.$t('步骤1/2'),
            desc: this.$t('在[资产]中点击[充币]'),
            imgUrl: require('./assets/4-1.png')
          },{            
            desc: this.$t('搜索[USDT]并选中'),
            imgUrl: require('./assets/4-2.png')
          },{            
            desc: this.$t('选择[ERC20]后[保存二维码]并复制下方文字地址'),
            imgUrl: require('./assets/4-3.png')
          },{
            title: this.$t('步骤2/2'),            
            desc: _desc,
            imgUrl: _fourImgUrl
          },{            
            desc: this.$t('提交您的取款申请'),
            imgUrl: _fiveImgUrl
          }]
          break; 
        case 4:
          _data =  [{
            title: this.$t('步骤1/4'),
            desc: this.$t('点击首页左上方头像，在[我的]点击[收款方式]'),
            imgUrl: require('./assets/5-1.png')
          },{
            title: this.$t('步骤2/4'),
            desc: this.$t('添加[收款方式]'),
            imgUrl: require('./assets/5-2.png')
          },{
            title: this.$t('步骤3/4'),            
            desc: this.$t('在[我要卖]中选择USDT后寻找商家[出售]'),
            imgUrl: require('./assets/5-3.png')
          },{
            title: this.$t('步骤4/4'),            
            desc: this.$t('输入出售的数量并选择收款方式后[出售USDT]'),
            imgUrl: require('./assets/5-4.png')
          }]
          break;     
        default:
          break;
      }
      return _data;
    }    
  },
  components: {
    Lheader,
  },
  mounted() {
    if(['10062', '10029', '10063', '10064'].includes(this.$projectname)) {
      this.menus.splice(3,1);
    }
  },
  methods:{
    onTableChange(){
      window.scrollTo({
        top: 0,
        behavior: "instant"
      })
    }
  }
};
</script>

<style src="./style.less" lang="less" scoped></style>
