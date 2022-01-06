<template>
  <div class="notice-dialog theme">
    <van-overlay class="pop-wrap" :show="show" @click="close">
      <div class="img-wrap">
        <van-icon name="close" />
        <!-- <p>{{popData.name}}</p> -->
        <van-image
          fit="contain"
          @click="go()"
          :src="showImgUrl"
        />
        <!-- <van-button type="primary" @click="go(popData.url)">{{$t('马上领')}}</van-button> -->
      </div>
    </van-overlay>
    <van-dialog
      class="notice-wrap"
      @confirm="handleClose"
      v-model="visible"
      :show-confirm-button="false"
    >
      <!-- <div class="delete-icon-wrap" @click="handleClose">
        <div class="delete-icon"></div>
      </div>       -->
      <div class="dialog-header-wrap">
        <div class="header-close" @click="handleClose"></div>
        <div class="header-icon"></div>
        <div class="header-title">{{$t('重要公告')}}</div>
      </div>
      <div class="dialog-content-wrap">
        <van-swipe :autoplay="3000" class="my-swipe"  indicator-color="white">
          <van-swipe-item v-for="item in notice" :key="item.id">
            <div class="content">
              <div class="content-item" @click="noticeView(item)">
                <div class="content-title">{{item.title}}</div>
                <p class="content-desc">{{item.content}}</p>
              </div>
            </div>
          </van-swipe-item>
        </van-swipe>
        <div class="content-btn" @click="handleClose">
          <span>{{`${$t('确认')}`}}<em>({{`${seconds}s`}})</em></span>
        </div>
      </div>
    </van-dialog>

  </div>
</template>

<script>
import { sitenotice, indexpop } from "@/api/news";
import { dateFormat } from '@/utils';
export default {
  name: "siteNotice",
  data() {
    return {
      visible: false,
      notice: [],
      checked: false,
      nowTime: 0,
      show: false,
      popData: {
        name: "",
        h5_pop_pic: "",
        url: "",
      },
      timer: null,
      closeTimer: null,
      seconds: 0,
      showImgUrl: '',
      imgNotice: {},
      imgShouldShow: false
    };
  },
  watch: {
    async $route(val) {
      if (val.path == "/") {
        // this.loadIndexPop();
        // const {data} = await this.$store.dispatch('global/getImpNotice')
        // this.notice = data.filter(item => item.is_important == 1)
      }
    },
  },
  mounted() {
    const _this = this;
    this.timer = setTimeout(()=>{
      if ( this.seconds > 0 ) {
        return;
      }
      sitenotice().then(res => {
        if ( res.data && res.data.data) {
          _this.handleNoticeData(res.data.data);
        }
      })
    }, 500)
  },
  methods: {
    noticeView(item) {
      this.$router.push({
        name: 'newsDetail',
        query: {
          id: item.id,
          type: 1,
          title: item.title,
          content: item.content,
          created_at: item.created_at,
          updated_at: item.updated_at,
          is_read: item.is_read,
          from:'Home'
        }
      })
      this.visible = false;
      clearInterval(this.closeTimer)
    },
    startCloseTimer() {
      this.closeTimer = setInterval(()=>{
        if ( this.seconds <= 0 ) {
          this.visible = false;
          if ( this.imgShouldShow ) {
            this.show = true;
            this.imgShouldShow = false;
          }
          clearInterval(this.closeTimer)
          return;
        }
        this.seconds -= 1;
      }, 1000)
    },
    handleNoticeData(data) {

      let noticeData = [];
      let imgNoticeData = [];

      let noticeIds = [];
      let noticeRededIds = [];
      if ( window.localStorage.getItem('red_notice_ids') ) {
        noticeRededIds = window.localStorage.getItem('red_notice_ids').split(',');
        noticeRededIds = noticeRededIds.map(ele=>parseInt(ele));
      }

      let currentTime = dateFormat('YYYY-mm-dd', (new Date()).getTime())
      let popTime =  window.localStorage.getItem('pop_day_time');
      let isPoped = currentTime === popTime;

      if ( data && data.data && Array.isArray(data.data) ) {
        data.data.forEach((ele, index) => {
          noticeIds.push(ele.id);

          if ( ele.is_important === 1 ) {
            if ( isPoped ) {
              if ( !noticeRededIds.includes(ele.id) ) {
                if ( ele.is_pic === 1 ) {
                  imgNoticeData.push(ele);
                } else {
                  noticeData.push(ele)
                }
              }
            } else {
              if ( ele.is_pic === 1 ) {
                  imgNoticeData.push(ele);
              } else {
                noticeData.push(ele)
              }
            }
          }
        });

        if ( isPoped ) {
          if ( noticeData.length && imgNoticeData.length ) {

            noticeData.sort((a,b)=>{
              let aTime = a.publish_time || a.updated_at || a.created_at;
              let bTime = b.publish_time || b.updated_at || b.created_at;
              return new Date(aTime).getTime() - new Date(bTime).getTime()
            })
            let showNotice = noticeData[noticeData.length-1];

            imgNoticeData.sort((a,b)=>{
              let aTime = a.publish_time || a.updated_at || a.created_at;
              let bTime = b.publish_time || b.updated_at || b.created_at;
              return new Date(aTime).getTime() - new Date(bTime).getTime()
            })

            let showImgNotice = imgNoticeData[imgNoticeData.length-1];
            let noticeMaxTime = showNotice.publish_time || showNotice.updated_at || showNotice.created_at;
            let imgNoticeMaxTime = showImgNotice.publish_time || showImgNotice.updated_at || showImgNotice.created_at;
            if ( new Date(noticeMaxTime).getTime() > new Date(imgNoticeMaxTime).getTime() ) {
              this.visible = true;
              this.seconds = 10;
              this.startCloseTimer();
            } else {
              let content = {
                  pic: ''
              }
              try {
                  content = JSON.parse(showImgNotice.content)
              } catch (error) {}

              this.showImgUrl = content.pic;
              this.imgNotice = showImgNotice;
              this.show = true;
            }

          } else if ( noticeData.length ) {
            window.localStorage.setItem('pop_day_time', currentTime);
            this.visible = true;
            this.seconds = 10;
            this.startCloseTimer();
          } else if ( imgNoticeData.length ) {
            imgNoticeData.sort((a,b)=>{
              let aTime = a.publish_time || a.updated_at || a.created_at;
              let bTime = b.publish_time || b.updated_at || b.created_at;
              return new Date(aTime).getTime() - new Date(bTime).getTime()
            })

            let showImgNotice = imgNoticeData[imgNoticeData.length-1];
            let content = {
                pic: ''
            }
            try {
                content = JSON.parse(showImgNotice.content)
            } catch (error) {}

            this.showImgUrl = content.pic;
            this.imgNotice = showImgNotice;
            this.show = true;
          }
        } else {
          if ( noticeData.length ) {
            window.localStorage.setItem('pop_day_time', currentTime);
            this.visible = true;
            this.seconds = 10;
            this.startCloseTimer();
          }
          if ( imgNoticeData.length ) {
            imgNoticeData.sort((a,b)=>{
              let aTime = a.publish_time || a.updated_at || a.created_at;
              let bTime = b.publish_time || b.updated_at || b.created_at;
              return new Date(aTime).getTime() - new Date(bTime).getTime()
            })
            let showImgNotice = imgNoticeData[imgNoticeData.length-1];
            let content = {
                h5_pic: ''
            }
            try {
                content = JSON.parse(showImgNotice.content)
            } catch (error) {}

            this.showImgUrl = content.h5_pic;
            this.imgNotice = showImgNotice;
            this.imgShouldShow = true
          }
        }

        if ( noticeIds.length ) {
          window.localStorage.setItem('red_notice_ids', noticeIds);
        }
        this.notice = noticeData.flat();
      }
    },
    go(url) {
      this.show = false
      if ( this.imgNotice && this.imgNotice.pic_url ) {
        if ( this.imgNotice.pic_url_type == 1 ) {
          this.$router.push({
            path: this.imgNotice.pic_url
          })
        } else if ( this.imgNotice.pic_url_type == 2 ) {
          window.open(this.imgNotice.pic_url, 'thirdActivity')
        }
      }

    },
    close() {
      this.show = false;
      window.sessionStorage.setItem("pop_status", true);
    },
    handleClose(done) {
      this.visible = false
      if ( this.imgShouldShow ) {
        this.show = true;
        this.imgShouldShow = false;
      }
    },
    loadIndexPop() {
      indexpop().then((res) => {
        if (res.data.data) {
          this.popData = res.data.data;
        }
        if (
          !Boolean(window.sessionStorage.getItem("pop_status")) &&
          this.popData.h5_pop_pic
        ) {
          this.show = true;
        } else if (
          Boolean(window.sessionStorage.getItem("pop_status")) &&
          this.popData.h5_pop_pic
        ) {
          this.show = false;
        }
      });
    }
  },
  destroyed() {
    clearInterval(this.timer);
    clearInterval(this.closeTimer);
  },
};
</script>

<style lang="less" scoped>
@import '~@assets/styles/notice/index.less';
/deep/.van-checkbox {
  margin-top: 20px;
  padding: 10px 0;
  .van-checkbox__icon,
  .van-checkbox__label {
    font-size: 30px;
  }
  .van-checkbox__icon--checked .van-icon {
    background-color: @primary-color;
    border-color: @primary-color;
  }
  .van-checkbox__label {
    color: @primary-text-color;
  }
  .van-checkbox__icon .van-icon {
    border-color: @primary-color;
  }
}

.site-notice {
  max-height: 600px;
  overflow: auto;
  li {
    border-bottom: 2px solid @border-color;
    padding-bottom: 20px;
    &:last-child {
      border-bottom: 0;
    }
    h4 {
      margin: 20px 0;
      // color: #000;
    }
    p {
      line-height: 36px;
      // color: #000;
    }
    .van-checkbox__label{
      // color: #000;
    }
  }
}
.van-icon-close {
  // color: @primary-color;
  color: #fff;
  font-size: 60px;
  position: absolute;
  right: 0;
  bottom: 0;
  margin-left: -245px;
  left: 50%;
}
.img-wrap {
  position: relative;
  width: 500px;
  top: 350px;
  left: 50%;
  margin-left: -250px;
  text-align: center;
  padding: 20px;
  padding-bottom: 80px;
  p {
    color: #999;
    font-size: 40px;
    margin-bottom: 30px;
  }
  .van-image {
    width: 100%;
    height: 400px;
    border-radius: 8px;
    overflow: hidden;
  }
  .van-button {
    height: 60px;
    line-height: 60px;
    margin-top: 40px;
    width: 200px;
  }
}
/deep/.van-overlay.pop-wrap {
  z-index: 9999 !important;
}

.notice-dialog {
  position: relative;
  /deep/.van-dialog {
    padding: 0;
    background-color: transparent !important;
  }
  /deep/.van-dialog .van-dialog__footer {
    margin: 0;
  }
  .delete-icon-wrap {
    position: absolute;
    right: 20px;
    top: 25px;
    width: 70px;
    height: 70px;
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;
    .delete-icon {
        width: 45px;
        height: 45px;
        background-image: url('../assets/common/img/notice-dialog/header-delete-icon.png');
        background-size: 100% 100%;
      }
  }
  .dialog-header-wrap {
    background-image: url('../assets/common/img/notice-dialog/notice-dialog-bg.png');
    background-size: 100% 100%;
    margin-top: 22px;
    padding-top: 80px;
    height: 160px;
    position: relative;
    .header-icon {
      background-image: url('../assets/common/img/notice-dialog/header-icon.png');
      background-size: 100% 100%;
      position: absolute;
      width: 70px;
      height: 77px;
      top: -22px;
      left: 50%;
      margin-left: -35px;
    }
    .header-close {
      background-image: url('../assets/common/img/notice-dialog/header-close.png');
      background-size: 100% 100%;
      position: absolute;
      width: 44px;
      height: 44px;
      top: 26px;
      right: 33px;
      cursor: pointer;
    }
    .header-title {
      font-size: 36px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #C8A77F;
      text-align: center;
    }
  }
  .dialog-content-wrap {
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
    height: 460px;
    padding-top: 10px;
    margin-top: -10px;
    background: linear-gradient(360deg, #1F2025 0%, #47484D 100%);
    box-shadow: 0px -3px 10px 0px rgba(0, 0, 0, 0.23);
    /deep/.van-swipe {
      height: 320px;
    }
    /deep/.van-swipe__indicator:not(:last-child) {
      margin-right: 18px;
    }
    /deep/.van-swipe__indicator {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background-color: #616266;
    }
    /deep/.van-swipe__indicator.van-swipe__indicator--active {
      background-color: #C8A77F !important;
    }
    .content {
      height: 290px;
      overflow-y: auto;
      padding: 34px 34px 20px 70px;
      color: #CCCCCC;
      text-align: left;
      .content-item {
        margin-bottom: 15px;
      }
      .content-title {
        font-size: 34px;
        line-height: 38px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        position: relative;
        &::before {
          content: '';
          display: block;
          top: 50%;
          left: -32px;
          margin-top: -8px;
          position: absolute;
          width: 12px;
          height: 12px;
          background-color: #B59167;
          transform:rotate(45deg);
        }
      }
      .content-desc {
        margin-top: 30px;
        line-height: 37px;
        font-size: 28px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        -webkit-line-clamp: 3;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        text-overflow: ellipsis;
        word-break: break-all;
        overflow: hidden;
      }
    }
    .content-btn {
      text-align: center;
      margin-top: 20px;
      span {
        cursor: pointer;
        display: inline-block;
        width: 368px;
        font-size: 30px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #333333;
        line-height: 76px;
        height: 76px;
        background: #C8A77F;
        border-radius: 6px;
        &:hover{
          background:rgba(200, 167, 127, 0.9);
        }
      }
      em {
        font-size: 28px;
        font-family: PingFangSC-Regular, PingFang SC;
        letter-spacing: 1px;
        font-weight: 400;
        display: inline-block;
        width: 50px;
        margin-left: 5px;
      }
    }
  }
}
</style>
