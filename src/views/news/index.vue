<template>
  <div class="container">
    <div class="message-title">
      <van-icon
        name="arrow-left"
        @click="$router.push({ name: 'memberCenter' })"
      />
      <!-- <img src="~@assets/img3_0/otherIcon/fanhui@2x.png" @click="$router.push({ name: 'memberCenter' })" /> -->
      <span>{{$t('消息中心')}}</span>
    </div>
    <div class="e-main">
      <van-tabs
        v-model="active"
        line-width=".64rem"
        line-height=".08rem"
        color="none"
        title-active-color="white"
      >
        <!-- 站内信 -->
        <van-tab>
          <div slot="title" class="tabsTitle">
{{$t('站内信')}}
            <i v-if="userInfo.user_notice_unread_counts !== 0">{{
              userInfo.user_notice_unread_counts
            }}</i>
          </div>
          <div class="main" v-show="messageList.length > 0">
            <ul>
              <van-list
                v-model="mloading"
                :finished="mfinished"
                @load="onMLoad"
              >
                <li
                  @click="readInfo(item, 2)"
                  class="clearfix"
                  :class="{ is_read: item.is_read === 2 }"
                  v-for="(item, index) in messageList"
                  :key="index"
                >
                  <i></i>
                  <div class="list">
                    <div class="item-header">
                      <span class="title">{{$t(item.title)}}</span>
                      <span class="time">{{ item.created_at }}</span>
                    </div>
                    <div class="content">{{ item.content }}</div>
                  </div>
                </li>
              </van-list>
            </ul>
          </div>
          <div class="empty" v-show="messageList.length == 0 && !mloading">
            <div class="emptyDiv">
              <div class="errorEmail"></div>
              <div class="text">
                <div class="chinese">{{$t('您还没有收到任何站内信')}}</div>
              </div>
            </div>
          </div>
        </van-tab>
        <!-- 公告 -->
        <van-tab>
          <div slot="title" class="tabsTitle">
{{$t('公告')}}
            <i v-if="userInfo.site_notice_unread_counts !== 0">{{
              userInfo.site_notice_unread_counts
            }}</i>
          </div>
          <div class="main" v-show="sitenoticeList.length > 0">
            <ul>
              <van-list v-model="loading" :finished="finished" @load="onSLoad">
                <li
                  @click="readInfo(item, 1)"
                  class="clearfix"
                  :class="{ is_read: item.is_read == 1 }"
                  v-for="(item, index) in sitenoticeList"
                  :key="index"
                >
                  <div class="list">
                    <div class="item-header">
                      <span class="title">
                        <van-tag
                          class="item-tag"
                          v-if="item.is_important == 1"
                          type="warning"
                          >{{$t('重要')}}</van-tag
                        >
                        {{$t(item.title)}}
                      </span>
                      <span class="time">{{ item.created_at }}</span>
                    </div>
                    <div class="content">{{ item.content }}</div>
                  </div>
                </li>
              </van-list>
            </ul>
          </div>
          <div class="empty" v-show="sitenoticeList.length == 0 && !loading">
            <div class="emptyDiv">
              <div class="errorImg"></div>
              <div class="text">
                <div class="chinese">{{$t('您还没有收到任何公告')}}</div>
              </div>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Vtabbar from "@/components/v-tabbar";
import Lheader from "@/components/l-header";
import {
  sitenotice,
  message,
  readallnotice,
  readallmessage,
  readnotice,
  messagetypelist,
} from "@/api/news";
import { member } from "@/api/memberCenter";
import Loading from "@/components/loading";
import { siteinfo } from "@/api/home";
import { Toast } from "vant";
import { userinfo } from "@/api/agent";
import { mapState } from "vuex";
Vue.use(Toast);
export default {
  name: "index",
  data() {
    return {
      title: this.$t('消息'),
      active: 0,
      siteNotice: 0,
      userNotice: 0,
      sitenoticeList: [],
      messageList: [],
      finished: false,
      page: 1,
      loading: true,
      mfinished: false,
      mpage: 1,
      mloading: true,
      messageType: {},
    };
  },
  created() {},
  computed: {
    ...mapState("users", ["userInfo"]),
  },
  methods: {
    readInfo(item, type) {
      this.$router.push({
        name: "newsDetail",
        query: {
          id: item.id,
          type: type,
          title: item.title,
          content: item.content,
          created_at: item.created_at,
          updated_at: item.updated_at,
          is_read: item.is_read,
        },
      });
    },
    getSitenoticelist() {
      sitenotice({
        uid: this.userInfo.id,
        page: this.page,
        is_pic: 0,
      }).then((res) => {
        if (res.data.code === 0) {
          // this.sitenoticeList = res.data.data.data;
          let arr = [];
          // 加载状态结束
          this.loading = false;
          // this.sitenoticeList.concat(res.data.data.data);
          this.sitenoticeList = this.sitenoticeList.concat(res.data.data.data);
          if (this.page === res.data.data.last_page) {
            this.finished = true;
          }
        } else {
          Toast(res.data.msg);
        }
      });
    },
    messagetypelist() {
      this.$loading();
      messagetypelist(
        process.env.VUE_APP_MERCHANT_NO,
        window.localStorage.token
      ).then((res) => {
        if (res.data.code == 0) {
          this.messageType = res.data.data;
          this.getMessageList();
        }
      });
    },
    getMessageList(reload) {
      this.userNotice = 0;
      message({
        page: this.mpage,
        uid: this.userInfo.id,
      }).then((res) => {
        if (res.data.code === 0) {
          this.$toast.clear();
          // 加载状态结束
          this.mloading = false;
          for (let k in this.messageType) {
            res.data.data.data.forEach((element) => {
              element.type == k ? (element.title = this.messageType[k]) : "";
            });
          }
          if (reload) {
            this.messageList = res.data.data.data;
          } else {
            this.messageList = this.messageList.concat(res.data.data.data);
          }
          if (this.mpage === res.data.data.last_page) {
            this.mfinished = true;
          }
        }
      });
    },
    onMLoad() {
      // 异步更新数据
      this.mpage++;
      this.getMessageList();
    },
    onSLoad() {
      // 异步更新数据
      this.page++;
      this.getSitenoticelist();
    },
  },
  mounted() {
    this.active = this.$route.query.active || 0;
    this.getSitenoticelist();
    // this.getMessageList()
    this.messagetypelist();
  },
  components: {
    Vtabbar,
    Lheader,
    Loading,
  },
};
</script>

<style scoped lang="less">
@import "~@assets/styles/news/index.less";
.message-title {
  position: fixed;
  top: 0;
  height: 88px;
  width: 100%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99;
  font-size: 32px;
  background: @bg-color;

  .van-icon {
    width: 30px;
    position: absolute;
    left: 20px;
  }
}

.item-tag {
  margin-right: 10px;
  background-color: @primary-color;
  width:auto;
  text-align: center;
  line-height: 36px;
  font-size: 24px;
}

.container {
  display: flex;
  // min-height: 100vh;
  flex-direction: column;
  // background-color: #090705;
  // overflow: hidden;
  // margin: 0 0.5rem;

  .e-main {
    // flex: 1;
    // overflow: hidden;
    margin: 0 30px;
    margin-top: 90px;
    padding-bottom: 0.6667rem;
    padding: 0 0 1.33333rem;
  }

  .main {
    padding: 0.1867rem 0;
    /deep/.van-list__loading {
      margin-top: 20px;
    }
    li {
      margin-top: 0.25rem;
      background-color: @bg-card-color;
      position: relative;
      border-radius: 0.2rem;

      .list {
        padding: 0.5333rem 0.4rem;
        color: #fff;

        .item-header {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #c5cfd6;
          font-size: 0.3247rem;
          line-height: 0.2133rem;
          margin-bottom: 0.3467rem;

          > span {
            font-size: @font-size-12;
          }

          .title {
            position: relative;
            padding-left: 24px;
            font-size: 30px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            width: 450px;
            display: block;
            line-height: 30px;

            &::before {
              content: "";
              position: absolute;
              top: 8px;
              left: 0;
              width: 0.2133rem;
              height: 0.2133rem;
              background-color: #ff5700;
              border-radius: 0.21333rem;
            }
          }

          .time {
            color: #999999;
            line-height: 1.2;
            transform: scale(0.8);
            transform-origin:center center;
          }
        }

        .content {
          line-height: 0.5333rem;
          font-size: @font-size-14;
        }
      }

      &.is_read {
        .list {
          color: #999;
        }
        .item-header {
          .title {
            text-indent: 0;

            &::before {
              content: none;
            }
          }
        }

        i {
          background: transparent;
        }
      }
    }

    li:first-child {
      margin-top: 0.3rem;
    }
  }

  .empty {
    height: 800px;
    width: 100%;
    padding-top: 1.12rem;
    // background-color: #232C39;
    display: flex;
    .emptyDiv {
      margin: auto;
      transform: translateY(-50%);

      .errorImg {
        width: 1.8rem;
        height: 1.8rem;
        margin: 0 auto;
        background-image: url(~@assets/img3_0/error/emptyMail.png);
        background-size: contain;
        background-repeat: no-repeat;
      }

      .errorEmail {
        width: 1.8rem;
        height: 1.8rem;
        margin: 0 auto;
        background-image: url(~@assets/img3_0/error/emptyMail.png);
        background-size: contain;
        background-repeat: no-repeat;
      }

      .text {
        color: white;
        text-align: center;

        .chinese {
          margin-top: 0.1rem;
          font-size: 36px;
          color: #999999;
          line-height: 70px;
        }

        .refresh {
          display: inline-flex;
          align-items: center;
        }

        button {
          height: 0.74666rem;
          line-height: 0.74666rem;
          background-color: transparent;
          border-radius: 3px;
          border: none;
          font-size: @font-size-13;
        }
      }
    }
  }

  .tabsTitle {
    height: 100%;
    font-size: 30px;
    line-height: 72px;
    position: relative;
    width:100%;
    i {
      position: absolute;
      right: -50px;
      font-size: 0.32rem;
      color: #ffffff;
      display: inline-block;
      width: 0.53333rem;
      height: 0.5333rem;
      background-color: #f25637;
      border-radius: 50%;
      line-height: 0.5333rem;
      top: 34%;
      -webkit-transform: translateY(-50%);
      transform: translateY(-50%);
      text-align: center;
    }
  }
}

/deep/ .van-tabs {
  .van-tabs__nav {
    border-radius: 0.25rem;
    height: 72px;
    line-height: 72px;
    background: @bg-card-color;
    .van-tab {
      border-radius: 0.25rem;
      height: 72px;
      line-height: 72px;
    }

    .van-tab--active {
      background: @color-tab-bar-active;
    }
  }
  .van-tab__text--ellipsis{
    overflow: unset;
  }
}

/deep/ .van-tabs__wrap {
  border-bottom: none !important;
  border-radius: 0.25rem;
  height: 72px;
  line-height: 72px;
}

/deep/ .van-tabs__line {
  background: none !important;
}

.loading {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  &.active {
    top: -0.6667rem;
  }

  .logo {
    // background-image: url('@assets/img/home/loading-1.png');
    background-size: 45%;
    background-position: center;
    background-repeat: no-repeat;
    height: 2rem;
    width: 2rem;
  }

  .title {
    font-size: @font-size-15;
    font-family: PingFang-SC-Regular;
    font-weight: 400;
    margin-top: 10px;
    color: rgba(189, 140, 36, 1);
  }

  .icon {
    animation: rotate 1.2s linear infinite;
    width: inherit;
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }
}
</style>
