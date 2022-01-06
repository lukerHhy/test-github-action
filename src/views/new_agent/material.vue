<template>
  <div id="material">
    <van-nav-bar
      left-arrow
      fixed
      @click-left="$router.go(-1)"
    >
      <template #title>
        <span style="color:#FFFFFF">{{$t('推广素材')}}</span>
      </template>
    </van-nav-bar>
    <div style="margin-bottom: 16px;">
      <Cell :title="$t('图片标题')">
        <van-field
          v-model="from.title"
          center
          input-align="right"
          class="mark"
          style="padding: 0.2rem 0;width: 4rem;"
          :placeholder="$t('图片标题')"
        />
      </Cell>
      <Cell
        :title="$t('图片类型')"
        @click="imgtypeshow = true"
      >
        <span style="font-size: 0.37333rem">{{ imgtypetext }}
          <span
            class="iconfont icon-dayuhao"
            style="margin-right: 0;font-size: 0.4rem;"
          />
        </span>
      </Cell>
      <Cell
        :title="$t('图片尺寸')"
        @click="imgsizeshow = true"
      >
        <span style="font-size: 0.37333rem">{{ imgsizetext }}
          <span
            class="iconfont icon-dayuhao"
            style="margin-right: 0;    font-size: 0.4rem;"
          ></span>
        </span>
      </Cell>
      <van-button
        color="#C8A77F"
        style="background: rgb(200, 167, 127);
              border-color: rgb(200, 167, 127);
              width: 90%;
              height: 1rem;
              color: #1E1E1E;
              margin:32px 0 5px 5%;
              "
        @click="() => getimgList()"
      >{{$t('查询')}}
      </van-button>
    </div>

    <van-empty
      v-show="!data.length"
      class="custom-image"
      :image="EmptyIcon"
      :description="$t('暂无数据')"
    />
    <div
      class="new"
      v-for="(item, i) in data"
      :key="i"
    >
      <img
        :src="item.pic"
        v-image-preview
      />
      <div class="new-content">
        <div class="info">
          <p style="color:#FFFFFF;font-size:16px;margin-bottom: .1rem;">
            {{$t(item.title)}}
          </p>
          <div
            class="creat"
            @click="share(item.pic)"
          >
            {{$t('生成')}}
          </div>
        </div>
        <p>
          {{$t('图片类型')}}：<span style="color:#CCCCCC">{{
            columnsPhone[item.pic_type]
          }}</span>
        </p>
        <div class="time">
          <span>{{$t('图片尺寸')}} {{
              imgsizelist[item.size]
            }}</span><span>{{ item.updated_at }}</span>
        </div>
      </div>
      <!-- <img :src="item.pic" alt="" class="qrcode-img" v-image-preview />
      <p class="qrcode-title">图片标题：{{$t(item.title)}}</p>
      <p class="qrcode-title">图片类型：{{ item.pic_type }}</p>
      <p class="qrcode-title">更新日期：{{ item.updated_at }}</p>
      <p class="qrcode-title">图片尺寸：{{ item.size }}</p>
      <van-button
        color="#C8A77F"
        style="background: rgb(200, 167, 127);
              border-color: rgb(200, 167, 127);
              width: 62%;
              height: 1rem;
              color: #1E1E1E;"
        @click="share(item.pic)"
        >{{$t('生成推广图')}}</van-button
      > -->
    </div>

    <van-popup
      v-model="popShow"
      closeable
      close-icon-position="top-left"
      position="bottom"
      title="asdasd"
      :style="{ height: '40%' }"
    >
    </van-popup>
    <van-popup
      duration="0.5"
      v-model="saveShow"
    >
      <div class="savePhoto">
        <img
          :src="url"
          alt=""
        />
        <input
          type="text"
          style="width: 7rem;
    margin-top: .3rem;
    margin-right: .2rem;"
          v-model="domainurl"
          :placeholder="$t('输入二维码URL')"
        />
        <van-button
          color="#C8A77F"
          style="margin-top: .5rem;
    width: 90%;"
          @click="downloadIamge(url, '推广')"
        >{{$t('保存到相册')}}
        </van-button>
      </div>
    </van-popup>

    <van-popup
      v-model="imgtypeshow"
      closeable
      close-icon-position="top-left"
      position="bottom"
    >
      <van-picker
        :title="$t('图片类型')"
        show-toolbar
        :cancel-button-text="' '"
        :columns="columnsPhone"
        @confirm="imgtype"
      />
    </van-popup>
    <van-popup
      v-model="imgsizeshow"
      closeable
      close-icon-position="top-left"
      position="bottom"
    >
      <van-picker
        :title="$t('图片尺寸')"
        show-toolbar
        :cancel-button-text="' '"
        :columns="imgsizelist"
        @confirm="imgsize"
      />
    </van-popup>
  </div>
</template>
<script>
import { promotion_source } from '@/api/agent'
import QRCode from 'qrcode'
import Qrcodelist from './components/qrcode'
import Cell from './components/cell'
import { Toast } from 'vant'
import EmptyIcon from './images/empty@2x.png';

export default {
  components: { Qrcodelist, Cell },
  data() {
    return {
      EmptyIcon,
      flag: true,
      url: '',
      popShow: false,
      saveShow: false,
      domainurl: '',
      agentdomainurl: '',
      columnsPhone: [
        this.$t('全部'),
        this.$t('综合推广图'),
        this.$t('APP推广图'),
        this.$t('赞助推广图'),
        this.$t('赠送推广图'),
      ],
      imgtypeshow: false,
      imgtypetext: this.$t('请选择图片类型'),
      imgsizetext: this.$t('请选择图片尺寸'),
      imgsizeshow: false,
      imgsizelist: [this.$t('全部'), '1210*588', '400*632', '750*1334', '1080*1920'],
      data: [],
      from: {
        title: '',
        type: '',
        size: '',
      },
      mergeUrl: '',
    }
  },
  mounted() {
    this.getimgList(true)
    console.log(this.url)
    // this.downloadIamge(
    //   'https://storage.yifanradio.com/202012/alymtk88cHJRTsNo3bMNhUtIM9JNmKEW20dbUNPH.png',
    //   this.$t('推广')
    // )
  },
  methods: {
    imgsize(item, i) {
      this.imgsizetext = item
      this.from.size = i ? i : ''
      this.imgsizeshow = false
    },
    imgtype(item, i) {
      // console.log(item, i)
      this.from.type = i ? i : ''
      this.imgtypetext = item
      this.imgtypeshow = false
    },
    getimgList(isFirst = false) {
      if (!isFirst) {
        const { imgtypetext, imgsizetext } = this
        const [sizeText, typeText] = [this.$t('请选择图片尺寸'), this.$t('请选择图片类型')]
        if (imgsizetext === sizeText && imgtypetext === typeText) {
          Toast.fail(this.$t('请选择查询条件'))
          return
        }
      }
      promotion_source(this.from).then(
        ({
          data: {
            data: { data },
          },
        }) => {
          this.data = data
        }
      )
    },
    share(url) {
      this.url = url
      this.saveShow = true
      // this.popShow = true
    },
    creatshare() {
      console.log(111)
      this.popShow = false
      this.saveShow = true
    },

    downloadIamge(imgsrc, name) {
      QRCode.toDataURL(
        this.domainurl,
        { errorCorrectionLevel: 'L' },
        (err, url) => {
          this.url = url
        }
      )
      // console.log(this.url)
      let image = new Image()
      let qrimg = new Image()
      console.log()
      qrimg.setAttribute('crossOrigin', 'anonymous')
      image.src = this.url
      qrimg.src = this.url
      image.setAttribute('crossOrigin', 'anonymous')
      image.onload = function () {
        let canvas = document.createElement('canvas')
        canvas.width = image.width
        canvas.height = image.height
        let context = canvas.getContext('2d')
        context.drawImage(image, 0, 0, image.width, image.height)
        context.drawImage(
          qrimg,
          image.width / 2 - 35,
          image.height / 2 - 35,
          70,
          70
        )
        let url = canvas.toDataURL('image/png') //得到图片的base64编码数据
        this.mergeUrl = url

        console.log(this.mergeUrl, Window)
        let a = document.createElement('a') // 生成一个a元素
        let event = new MouseEvent('click') // 创建一个单击事件
        a.download = name || this.$t('海报') // 设置图片名称没有设置则为默认
        a.href = url // 将生成的URL设置为a.href属性
        a.dispatchEvent(event) // 触发a的单击事件
      }
      image.src = imgsrc
      this.saveShow = false
      this.domainurl = ''
    },
    onClick() {
      this.flag = !this.flag
    },
  },
}
</script>
<style scoped lang="less">
/deep/ .van-field__control {
  color: #999;
}

.new {
  width: 100%;
  /* margin-top: .3rem; */
  border-bottom: 1px solid #444;
  padding: 20px 0;
  position: relative;
  display: flex;
  color: #999;
  &-content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    padding-left: 20px;
    > p {
      padding: 10px 0 20px;
    }
    .time{
      display: flex;
      justify-content: space-between;
      span{
        line-height: 1.2;
        &:nth-child(1){
        padding-left: 5px;
        margin-right: auto;
      }
        &:last-child{
          flex: 1;
          text-align: right;
        }
      }
    }
  }

  img {
    width: 150px;
    height: 128px;
  }

  .info {
    color: #999;
    line-height: 45px;
    display: flex;
    justify-content: space-between;
  }

  .creat {
    width: 130px;
    height: 60px;
    border-radius: 8px;
    text-align: center;
    line-height: 60px;
    border: 1px solid #c8a77f;
    color: #c8a77f;
  }
}

input {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  background: none;
  padding-left: 0.4rem;
  border: 1px solid #525152;
  color: #cccccc;
  font-size: 0.37333rem;
  border-radius: 4px;
  height: 1rem;
  margin: 0 0.2rem;
  font-weight: 400;
  line-height: 0.53333rem;
  margin-bottom: 0.2rem;
  width: 3.8rem;
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
  // line-height: .8rem;
  font-size: 0.4rem;
}

.qrcode-title {
  color: #999999;

  text-align: left !important;
  padding-left: 0.6rem;

  line-height: 1rem;
  font-size: 0.4rem;
}

.qrcode-box {
  width: 90%;
  margin: auto;
  background: #282828;
  box-shadow: 0px 2px 50px 0px rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  height: 11.6rem;
  padding-top: 0.3rem;
  text-align: center;
  margin-bottom: 1rem;
}

.savePhoto {
  width: 9rem;
  text-align: center;
  padding-top: 0.5rem;
  padding-bottom: 0.7rem;

  img {
    width: 90%;
  }
}

/deep/ .van-popup--bottom {
  background-color: #282828;
}

/deep/ .van-picker__toolbar {
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
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

/deep/ .van-tabs__line {
  height: 0.1rem;
  width: 0.8rem;
  background: #c8a77f;
}

/deep/ .van-icon-arrow-left {
  color: #ffffff;
  font-size: 0.5rem;
}

/deep/ .van-nav-bar {
  background: @bg-color;
}

.tit {
  text-align: center;
  color: #ffffff;
}

/deep/ .van-cell {
  background: @bg-color;
  font-size: 0.4rem;
  color: #999999;
  height: 1.4rem;
  line-height: 1.4rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  padding: 0.2rem 0.2rem 0.2rem 0;
}

/deep/ .van-nav-bar {
  background: @bg-color;
}

#material {
  width: 100%;
  height: 100%;
  background: @bg-color;
  padding: 0.6rem 0.4rem;
  overflow-y: auto;
  padding-top: 1.6rem;
}
</style>
