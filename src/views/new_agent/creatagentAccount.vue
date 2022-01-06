<template>
  <div id="creatagentAccount">
    <van-nav-bar left-arrow fixed @click-left="$router.go(-1)">
      <template #title>
        <span style="color:#FFFFFF">{{$t('代理开户')}}</span>
      </template>
    </van-nav-bar>
    <div class="vipOpen">
      <div class="reseter">
        <div class="reset">
          <p>{{$t('代理账户')}}</p>
          <div class="input">
            <input
              type="text"
              v-model="list.username"
               :placeholder="$t('请输入代理账户')"
            />
          </div>
        </div>

        <div class="reset">
          <p>{{$t('登录密码')}}</p>
          <div class="input">
            <input
              type="password"
              v-model="list.password"
              :placeholder="$t('密码8-12位数字及字母组成')"
            />
          </div>
        </div>
        <div class="reset">
          <p>{{$t('确认密码')}}</p>
          <div class="input">
            <input
              type="password"
              v-model="list.repassword"
               :placeholder="$t('再次输入登陆密码')"
            />
          </div>
        </div>
        <div class="reset">
          <p>{{$t('佣金比例')}}</p>
          <div class="input">
            <input v-model="list.rate"  :placeholder="$t('佣金比例不得超过自身比例')" />
          </div>
        </div>
      </div>
      <loading :isShow="isLoading" :title="$t('正在开户...')"></loading>
      <div class="aagames-button-box">
        <button type="button" class="defaultBtn submit" :class="[activeBtn?'activeBtn':'']"  @click="submit">
{{$t('确定')}}
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import Lheader from '@/components/l-header'
import Loading from '@/components/loading'
import { addagent } from '@/api/agent'
import { agPassword, agPassword20 } from '@/utils/index'

export default {
  name: 'creatagentAccount',
  components: {
    Lheader,
    Loading,
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      show: true,
      title: this.$t('代理开户'),
      isLoading: false,
      activeBtn:false,
      list: {
        username:'',
        password:'',
        repassword:'',
        rate:'',
      },
    }
  },
  watch: {
    list:{
      handler(val){
        if(this.paramsValidate(val)){
          this.activeBtn = true;
        }else{
          this.activeBtn = false;
        }
      },
      deep:true
    },
    activeBtn(newVla){
      return newVla
    }
  },
  created() {
    try {
      let scrollY = document.getElementsByClassName('container')[0].offsetTop
      window.scrollTo(0, scrollY)
    } catch (error) {}
  },
  methods: {
    closed() {
      this.$emit('input', false)
    },
    submit() {
      if (!this.list.username) {
        this.$toast.fail(this.$t('请输入代理账户'))
        return
      }
      if (!this.list.password) {
        this.$toast.fail(this.$t('请输入登录密码'))
        return
      }
      if (!this.list.repassword) {
        this.$toast.fail(this.$t('请输入确认密码'))
        return
      }
      if (this.list.username && !agPassword20(this.list.username)) {
        this.$toast.fail(this.$t('账号由6-20位英文字母或数字组成'))
        return
      }
      if (this.list.password && !agPassword20(this.list.password)) {
        this.$toast.fail(this.$t('密码由8-12位数字+字母组成'))
        return
      }
      if (this.list.password !== this.list.repassword) {
        this.$toast.fail(this.$t('两次输入密码不一致'))
        return
      }
      if (!this.list.rate) {
        this.$toast.fail(this.$t('请输入佣金比例'))
        return
      }
      this.list.access_token = window.localStorage.agToken
      this.isLoading = true
      addagent(this.list)
        .then((res) => {
          if (res.data.code === 0) {
            const That = this
            this.$toast({
              message: this.$t('代理开户成功'),
              onClose() {
                That.closed()
                That.$router.back();
              },
            })
          } else {
            this.$toast(res.data.msg)
          }
        })
        .finally(() => {
          this.isLoading = false
        })
    },
  },
}
</script>
<style scoped lang="less">
.loading {
  background: rgba(0, 0, 0, 0.7);
}
.vipOpen {
  padding-left: 0;
  padding-right: 0;
  box-sizing: border-box;
  .reseter {
    padding: 0 32px;
    box-sizing: border-box;
  }
  .reset {
    .input {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 88px;
      background: @bg-color-input !important;
      border-radius: 8px;
      margin-top: 20px;
      border:1px solid #525152;
      img,
      .img {
        width: 50px;
        margin-left: 20px;
      }
    }

    p {
      height: 40px;
      font-size: 28px;
      font-weight: 400;
      line-height: 40px;
      min-width: 140px;
      color: #333333;
      margin-top: 40px;
      color: rgba(150, 150, 150, 1);
    }
    input {
      flex: 1;
      background: none;
      padding-left: 30px;
      border: none;
      color: #cccccc;
      height: 40px;
      font-size: 28px;
      font-weight: 400;
      line-height: 40px;
    }
    input::placeholder {
      color: #515151;
    }


    span {
      color: #ffcf6e;
      font-size: 22px;
      margin-top: 30px;
      display: inline-block;
      margin-bottom: 20px;
    }
    button {
      padding: 28px;
      border: none;
      color: #f3cb75;
      font-size: 32px;
      border-radius: 2px;
      font-weight: 700;
    }
  }
  .defaultBtn{
    width: 100%;
    height: 1.33333rem;
    background-color: #4D4C4D;
    border: none;
    border-radius: 0.10667rem;
    color: #666666;
    font-weight: 600;
    text-align: center;
    line-height: 1.33333rem;
    font-size: 0.42667rem;
  }
  .activeBtn{
    background-color: #C8A77F;
    color: #1E1E1E;
  }
  .submit {
    margin-top: 40px;
  }
}
/deep/ .van-icon-arrow-left {
  color: #ffffff;
  font-size: 0.5rem;
}
/deep/ .van-nav-bar {
  background: @bg-color;
}
#creatagentAccount {
  width: 100%;
  height: 100%;
  background: @bg-color;
  padding: 0.6rem 0.4rem;
  overflow-y: auto;
  padding-bottom: 1.6rem;
}
</style>
