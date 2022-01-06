<template>
  <div>
    <h2 class="tit">{{ $t('推广') }}</h2>
    <van-tabs @click="onClick">
      <van-tab :title="$t('会员链接')">
        <Qrcodelist
          v-if="flag === 0"
          :title="$t('PC / H5会员注册链接')"
          :data="domainurl"
          :share="share"
        ></Qrcodelist>
      </van-tab>
      <van-tab
        :title="$t('代理链接')"
        v-if="spread_switch == 2"
      >
        <div style="margin: 10px 0;">
          <van-field
            class="asdf"
            border
            left-icon="star"
            size="150"
            :placeholder="$t('下级代理佣金比例')"
            v-model="rateval"
          />
          <van-button
            @click="set"
            class="ABC test"
            color="#C3A884"
          >{{ $t('设置') }}</van-button>
        </div>
        <p class="opit">
          <van-icon
            class="typ"
            name="info-o"
          />
          {{$t('不得高于自身比例')}}
        </p>
        <Qrcodelist
          v-if="flag === 1"
          :title="$t('PC / H5代理注册链接')"
          :data="agentdomainurl"
          :share="share"
        ></Qrcodelist>
      </van-tab>
      <van-tab :title="$t('专属域名')">
        <Qrcodelist
          v-if="flag === 2 || (spread_switch != 2 && flag === 1)"
          :title="$t('PC / H5专属域名')"
          :data="onlydomain"
          :share="share"
        ></Qrcodelist>
        <div
          v-if="!onlydomain"
          style="margin-top: .3rem"
        >
          <div class="qrcode-box">
            <p class="qrcode-title">{{$t('PC / H5专属域名')}}</p>
            <div style="margin-top: 3rem;color: #999999;font-size: 0.5rem;">{{ $t('尚未分配专属域名') }}</div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
    <van-popup
      v-model="popShow"
      closeable
      close-icon-position="top-left"
      position="bottom"
      title="asdasd"
      :style="{ height: '40%' }"
    >
      <div class="sharePop">
        <h2>{{ $t('分享邀请下级') }}</h2>
        <ul>
          <li @click="downloadImage(url, '推广')">
            <div>
              <span
                class="iconfont icon-baocunerweima"
                style="
                  color: #C8A77F;"
              ></span>
            </div>
            <p>{{ $t('保存二维码') }}</p>
          </li>
          <li @click="creatshare">
            <div>
              <span class="iconfont icon-activitytuiguangsucai"></span>
            </div>
            <p>{{ $t('生成推广图') }}</p>
          </li>
        </ul>
      </div>
    </van-popup>
    <van-popup
      v-model="saveShow"
      style="width: 100vw;height: 100vh;background: none;"
      duration="0.5"
      id="ercodePop"
      @click="saveShow = false"
    >
      <div
        ref="savePhoto"
        class="savePhoto"
      >
        <!--          1: "QQ帐号", 2: "微信帐号", 3: "skype帐号"-->
        <div
          v-if="wechat && contactShow.includes('2')"
          class="c-box"
        >
          <span class="iconfont icon-activityweixin" />
          <span class="name">{{$t('微信号：')}}</span>
          <span class="content">{{ wechat }}</span>
        </div>
        <div
          v-if="qq && contactShow.includes('1')"
          class="c-box"
        >
          <span class="iconfont icon-activityQQhaoma" />
          <span class="name">QQ：</span>
          <span class="content">{{ qq }}</span>
        </div>
        <div
          v-if="skype && contactShow.includes('3')"
          class="c-box"
        >
          <span class="iconfont icon-activitySkype" />
          <span class="name">Skype：</span>
          <span class="content">{{ skype }}</span>
        </div>
        <img :src="url" />
      </div>
      <van-button
        color="#C8A77F"
        style="position: absolute;bottom: 100px;width: 80%;margin-left: 10%;"
        @click="downloadImage(url, '推广')"
      >{{$t('保存到相册')}}
      </van-button>
    </van-popup>
  </div>
</template>
<script>
import { agentSetting, contactTypeList, setchildrate, userinfo } from '@/api/agent'
import QRCode from 'qrcode'
import Qrcodelist from './components/qrcode'
import html2canvas from "html2canvas"


export default {
  components: { Qrcodelist },
  data() {
    return {
      flag: 0,
      url: '',
      popShow: false,
      saveShow: false,
      domainurl: '',
      agentdomainurl: '',
      onlydomain: '',
      rateval: '',
      spread_switch: '',
      userInfo: '',
      qq: '',
      wechat: '',
      skype: '',
      contactShow: '',
    }
  },
  async mounted() {
    await this.reload()
    contactTypeList({
      access_token: window.localStorage.token,
      merchant_no: process.env.VUE_APP_MERCHANT_NO,
    }).then(res => {
      console.log(res)
    })
  },
  methods: {
    getUserInfo() {
      userinfo({
        access_token: window.localStorage.agToken,
      }).then(({
        data: {
          data: { rand_domain, contact_show, spread_switch, member_spread_url, qrcode_member_domain, child_rate, id, special_domain, qq, wechat, skype },
        },
      }) => {
        this.qq = qq;
        this.wechat = wechat;
        this.skype = skype;
        this.contactShow = contact_show || '';
        this.rateval = child_rate * 100 || '';
        if(spread_switch) this.spread_switch = spread_switch
        // console.log(res)
        this.domainurl = [{domain: member_spread_url ,qr: qrcode_member_domain}]
        this.agentdomainurl = [
          {
            domain: window.location.host + `/agentAuth/register?id=${id}`,
            url: this.toDataURL(
              'https://ab.qb-bo.vip/index.php?r=' +
              window.location.host +
              `/agentAuth/register?id=${id}`
            ),
          },
        ]
        if (special_domain) {
          this.onlydomain = [
            {
              domain: special_domain,
              url: this.toDataURL(
                'https://ab.qb-bo.vip/index.php?r=' + special_domain
              ),
            },
          ];
        }

        this.domainurl &&
          this.domainurl.map((item) => {
            QRCode.toDataURL(
              item.qr,
              { errorCorrectionLevel: 'L' },
              (err, url) => {
                item.url = url
              }
            )
          })
      }
      )
    },
    reload() {
      agentSetting({
        access_token: window.localStorage.agToken,
        merchant_no: process.env.VUE_APP_MERCHANT_NO,
      }).then(({ data: { data } }) => {
        this.getUserInfo()
        if (data.unlimited_level_config) {
          this.spread_switch = data.unlimited_level_config
        }
      })
    },
    async set() {
      const res = await setchildrate({
        child_rate: this.rateval,
      })
      // console.log(res)
      if (res.data.code === 0) {
        this.$toast(this.$t('设置成功'))
        this.getUserInfo()
      }
    },
    toDataURL(domain) {
      let res = ''
      QRCode.toDataURL(domain, { errorCorrectionLevel: 'L' }, (err, url) => {
        res = url
      })
      return res
    },
    share(url) {
      this.url = url
      this.popShow = true
    },
    creatshare() {
      console.log(111)
      this.popShow = false
      this.saveShow = true
    },
    saveImg() {
      html2canvas(this.$refs.savePhoto).then(canvas => {
        // let dataURL = canvas.toDataURL("image/png");
        // console.log('dataURL:' + dataURL)
        let link = document.createElement("a");
        link.href = canvas.toDataURL();//下载链接
        link.setAttribute("download", this.$t('推广.png'));
        link.style.display = "none";//a标签隐藏
        document.body.appendChild(link);
        link.click();
      })
    },
    downloadImage(imgsrc, name) {
      this.saveImg();
      this.saveShow = false
    },
    onClick(title) {
      console.log(title)
      this.flag = title
    },
  },
}
</script>
<style scoped lang="less">
/deep/ .van-picker .van-picker__toolbar {
  /* background-color: #D6BDA3; */
  // color: #FFFFFF;
  border-bottom: 2px solid #313133;
}

/deep/ .van-field__control {
  color: #999;
  font-size: 0.4rem;
}

.typ {
  color: #999;
  vertical-align: text-top;
  margin-right: 8px;
}

.opit {
  padding: 0 40px;
  font-size: 0.3rem;
  color: #999;
  height: 40px;
  line-height: 40px;
}

.ABC {
  width: 20%;
  height: 1rem;
  margin-left: 40px;
}

.asdf {
  background: #141414;
  height: 1rem;
  line-height: 0.8rem;
  border: 1px solid #999;
  border-radius: 8px;
  width: 66%;
  margin-left: 40px;
  /* display: inline-block; */
  float: left;

  /deep/ .van-icon {
    transform: scale(0.58);
    color: red;
  }
}

/deep/ .van-button.van-button--default {
  border: 0.02667rem solid #b1987f;
  background: none;
  color: #b1987f;
}

.savePhoto {
  width: 85%;
  margin: 20% 7.5% 0;
  text-align: center;
  padding-top: 0.5rem;
  padding-bottom: 0.7rem;
  background-color: #282828;
  border-radius: 20px;

  img {
    width: 50%;
    border-radius: 20px;
    margin-top: 40px;
  }

  .c-box {
    width: 80%;
    padding: 20px 0;
    margin: 25px auto;
    display: flex;
    align-items: baseline;
    justify-content: center;
    background-color: #212121;
    border-radius: 20px;

    span {
      font-size: 30px !important;
    }

    .name {
      color: #999999;
      margin-left: 20px;
    }

    .content {
      color: #f5f5f5;
      max-width: 50%;
      word-break: break-all;
    }
  }
}

.iconfont {
  font-size: 0.9rem;
}

/deep/ .van-popup--bottom {
  background-color: #282828;
}

/deep/ .van-popup--bottom .van-icon,
.van-popup--bottom .nav-center {
  font-size: 0.6rem;
}

/deep/ .van-popup__close-icon--top-left {
  top: 0.35333rem;
  left: 0.41333rem;
}

.sharePop {
  width: 100%;
  height: 4.8rem;

  h2 {
    text-align: center;
    color: #cccccc;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    height: 0.9rem;
  }

  ul {
    color: #999999;
    display: flex;

    li {
      width: 33%;
      text-align: center;

      p {
        font-size: 0.4rem;
      }

      div {
        width: 1.5rem;
        background: #343434;
        height: 1.4rem;
        margin: auto;
        line-height: 1.4rem;
        /* font-size: 3.4rem; */
        border-radius: 9px;
        margin-bottom: 0.3rem;
      }
    }
  }
}

.qrcode-img {
  width: 62%;
  margin-top: 0.7rem;
  margin-bottom: 0.7rem;
  border: 1px;
  border-radius: 0.2rem;
  background: #282828;
  box-shadow: 0px 2px 50px 0px rgba(0, 0, 0, 0.2);
}

.qrcode-domain {
  color: #c8a77f;
  text-align: center;
  line-height: 2;
  font-size: 0.4rem;
}

.qrcode-title {
  color: #999999;
  text-align: center;
  line-height: 1rem;
  font-size: 0.5rem;
}

.qrcode-box {
  width: 90%;
  margin: auto;
  background: #282828;
  box-shadow: 0px 2px 50px 0px rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  min-height: 11.6rem;
  padding-top: 0.3rem;
  text-align: center;
  margin-bottom: 1rem;
}

/deep/ .van-tabs__line {
  height: 0.1rem;
  width: 0.8rem;
  background: #c8a77f;
}

.tit {
  text-align: center;
  color: #ffffff;
}

.icon-activityweixin {
  color: #0db807;
}

.icon-activityQQhaoma {
  color: #18acfc;
}

.icon-activitySkype {
  color: #00aff0;
}
</style>
