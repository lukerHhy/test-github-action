<template>
  <popup :value="contactValue">
    <div class="phonePop">
      <div class="title">{{ $t('绑定联系方式') }}</div>
      <div class="containerPop">
        <input type="text" v-model="userInfo.qq"  :placeholder="$t('请输入您的QQ')"/>
        <input type="text" v-model="userInfo.wechat" :placeholder="$t('请输入您的微信')"/>
        <input type="text" v-model="userInfo.skype"  :placeholder="$t('请输入您的Skype')"/>
        <div class="flex">
          <button class="cancel" @click="cancel">{{ $t('取消') }}</button>
          <button class="submitBtn" @click="contactInfo">{{ $t('提交') }}</button>
        </div>
      </div>
    </div>
  </popup>
</template>
<script>
import popup from '../../activity/wheelSurf/popup'
import {bindContact} from "@/api/agent";

export default {
  props: ['userInfo', 'contactValue'],
  components: {popup},
  data() {
    return {}
  },
  methods: {
    cancel() {
      this.$emit('cancel', false)
    },
    contactInfo() {
      bindContact({
        qq: this.userInfo.qq,
        wechat: this.userInfo.wechat,
        skype: this.userInfo.skype,
      }).then(res => {
        if (res.data.code === 0) {
          this.$emit('cancel', false)
          this.$toast({
            message: this.$t('提交成功'),
          })
          this.$emit('user');
        } else {
          this.$toast(res.data.msg)
        }
      })
    },
  }
}
</script>
<style scoped lang="less">
.phonePop {
  width: 80%;
  background: #282828;
  border-radius: 10px;
  margin: 50% auto;

  .title {
    color: #f5f5f5;
    font-size: 0.48rem;
    text-align: center;
    border-bottom: 1px solid #343434;
    padding: 0.5rem 0;
  }

  .containerPop {
    width: 90%;
    margin: 0.3rem auto 0;

    .flex {
      display: flex;
      justify-content: space-between;
      //align-items: center;
    }

    input {
      width: 100%;
      height: 1.12rem;
      border: 1px solid #505050;
      border-radius: 10px;
      background: none;
      margin-bottom: 0.3rem;
      padding-left: 0.2rem;
      color: #fff;
    }

    .inp {
      width: 50%;
    }

    .codeBtn {
      background: none;
      border: 1px solid @primary-color;
      color: @primary-color;
      font-size: 0.37rem;
      height: 1.1rem;
      border-radius: 10px;
    }

    .cancel,
    .submitBtn {
      background: none;
      border: 1px solid @primary-color;
      color: @primary-color;
      font-size: 0.37rem;
      height: 1.1rem;
      width: 3.2rem;
      border-radius: 10px;
      margin-top: 0.3rem;
      margin-bottom: 0.5rem;
    }

    .submitBtn {
      background: @primary-color;
      color: #191919;
      border: none;
    }

    .p-text {
      color: #ccc;
      font-size: 0.37rem;
      margin: 0.2rem 0;
    }

    .promote {
      color: #ccc;
      font-size: 0.37rem;
      align-items: center;
      margin: 0.2rem 0;

      .check {
        width: 0.5rem;
        height: 0.5rem;
      }

      .iconfont {
        font-size: 0.6rem;
        vertical-align: middle;
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
    }
  }
}
</style>
