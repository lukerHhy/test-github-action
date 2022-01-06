<template>
  <popup :value="emailValue">
    <div class="emailPop">
      <div class="title">{{$t('绑定邮箱地址')}}</div>
      <div class="containerPop">
        <input type="text" v-model="userInfo.email"  :placeholder="$t('请输入您的邮箱地址')" />
        <div class="flex">
          <input class="inp" v-model="code" type="text"  :placeholder="$t('验证码')" />
          <button class="codeBtn" @click="getCode" :disabled="!canClick">{{ content }}</button>
        </div>
        <div class="flex">
          <button class="cancel"  @click="cancel">{{$t('取消')}}</button>
          <button class="submitBtn" @click="submitEmail">{{$t('提交')}}</button>
        </div>
      </div>
    </div>
  </popup>
</template>
<script>
import popup from '../../activity/wheelSurf/popup'
import {getEmailcode,bindemail} from "@/api/agent";
import {ismail} from "@/utils";
import {Toast} from "vant";

export default {
    props:['emailValue','userInfo'],
    components: {popup},
    data(){
      return{
        activeEmail:false,
        content:this.$t('获取验证码'),
        canClick: true,
        time:10,
        code:'',
      }
    },
    methods:{
      cancel() {
        this.$emit('cancel',false)
      },
      submitEmail(){
        if (!ismail(this.userInfo.email)) {
          Toast.fail(this.$t('请输入正确的邮箱地址'));
          return false;
        }
        if (!this.code){
          Toast.fail(this.$t('请输入正确的验证码'));
          return false;
        }
        bindemail({
          access_token:window.localStorage.token,
          merchant_no:process.env.VUE_APP_MERCHANT_NO,
          email:this.userInfo.email,
          code:this.code,
        }).then((res,err)=>{
          if (res.data.code == 0) {
            this.$emit('cancel',false)
            Toast(res.data.msg);
            this.$emit('user');
          }else{
            Toast(this.$t('获取验证码失败'));
          }
        })
      },
      getCode(){
        if (!ismail(this.userInfo.email)) {
          Toast.fail(this.$t('请输入正确的邮箱地址'));
          return false;
        }
        this.totalTime = this.time
        if (!this.canClick) return  //改动的是这两行代码
        this.canClick = false
        this.send()
        this.content = this.totalTime + this.$t('秒后重新发送')
        this.clock = window.setInterval(() => {
          this.totalTime--
          this.content = this.totalTime + this.$t('秒后重新发送')
          if (this.totalTime < 0) {
            window.clearInterval(this.clock)
            this.content = this.$t('重新发送验证码')
            this.totalTime = this.time
            this.canClick = true  //这里重新开启
          }
        },1000)

      },
      send(){
        if (!ismail(this.userInfo.email)) {
          Toast.fail(this.$t('请输入正确的邮箱地址'));
          return false;
        }
        getEmailcode({
          merchant_no:process.env.VUE_APP_MERCHANT_NO,
          email:this.userInfo.email,
          access_token:window.localStorage.token
        }).then((res)=>{
          if (res.data.code == 0) {
            this.code = res.data.data.code;
          } else {
            Toast(res.data.msg);
            window.clearInterval(this.clock)
            this.content = this.$t('重新发送验证码')
            this.totalTime = this.time
            this.canClick = true  //这里重新开启
          }
        })
      }
  }
}
</script>
<style scoped lang="less">
.emailPop{
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
      border-radius:10px;
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
