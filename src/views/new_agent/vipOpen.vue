<template>
  <div id="vipOpen">
    <van-nav-bar left-arrow fixed @click-left="$router.go(-1)">
      <template #title>
        <span style="color:#FFFFFF">{{$t('会员开户')}}</span>
      </template>
    </van-nav-bar>
    <div class="vipOpen">
      <div class="reseter">
        <div class="reset">
          <div class="text">{{$t('会员帐号')}}</div>
          <div class="input">
            <input
                type="text"
                v-model="list.username"
                 :placeholder="$t('请输入会员账户')"
            />
          </div>
        </div>
        <div class="reset">
          <div class="text">{{$t('会员密码')}}</div>
          <div class="input">
            <input
                type="password"
                v-model="list.password"
                :placeholder="$t('密码8-12位数字及字母组成')"
            />
          </div>
        </div>
        <div class="reset">
          <div class="text">{{$t('确认密码')}}</div>
          <div class="input">
            <input
                type="password"
                v-model="list.repassword"
                 :placeholder="$t('再次输入登陆密码')"
            />
          </div>
        </div>
      </div>
      <loading :isShow="isLoading" :title="$t('正在开户...')"></loading>
      <div class="aagames-button-box">
        <button
            type="button"
            class="defaultBtn submit"
            :class="[activeBtn ? 'activeBtn' : '']"
            @click="submit">
{{$t('确定')}}
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import Lheader from '@/components/l-header'
import Loading from '@/components/loading'
import {addmember} from '@/api/agent'
import {agPassword20} from '@/utils/index'

export default {
  name: 'discountCore',
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
      title: this.$t('会员开户'),
      isLoading: false,
      list: {
        username: '',
        password: '',
        repassword: '',
      },
      activeBtn: false,
    }
  },
  watch: {
    value(newVal) {
      console.log(newVal, this.$t('数据'))
      return (this.show = newVal)
    },
    list: {
      handler(val) {
        if (this.paramsValidate(val)) {
          this.activeBtn = true
        } else {
          this.activeBtn = false
        }
      },
      deep: true,
    },
    activeBtn(newVla) {
      return newVla
    },
  },
  created() {
    try {
      let scrollY = document.getElementsByClassName('container')[0].offsetTop
      window.scrollTo(0, scrollY)
    } catch (error) {
    }
  },
  methods: {
    closed() {
      this.$emit('input', false)
    },
    submit() {
      if (!this.list.username) {
        this.$toast.fail(this.$t('请输入会员账户'))
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
      this.list.access_token = window.localStorage.agToken
      this.isLoading = true
      addmember(this.list)
          .then((res) => {
            if (res.data.code === 0) {
              const This = this
              this.$toast({
                message: this.$t('会员开户成功'),
                onClose() {
                  This.closed();
                  This.$router.back();
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
/deep/ .van-picker .van-picker__toolbar {
  /* background-color: #D6BDA3; */
  // color: #FFFFFF;
  border-bottom: 2px solid #313133;
}

.loading {
  background: rgba(0, 0, 0, 0.7);
}

/deep/ .van-toast {
  width: auto;
  min-width: 5.33333rem;
  height: 1.33333rem;
  line-height: 1.33333rem;
  background-color: #fff;
  color: #b1987f;
  z-index: 9999 !important;
  -webkit-box-shadow: 0 0.10667rem 0.26667rem 0 rgba(0, 0, 0, 0.3);
  box-shadow: 0 0.10667rem 0.26667rem 0 rgba(0, 0, 0, 0.3);
  border-radius: 0.10667rem;
}

/deep/ .van-overlay {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
}

/deep/ .overlay {
  z-index: 999 !important;
}

.vipOpen {
  padding-left: 0;
  padding-right: 0;
  box-sizing: border-box;
  margin-top: 0.8rem;

  .reseter {
    padding: 0 32px;
    box-sizing: border-box;
  }

  .reset {
    margin: 0.4rem 0;

    .text {
      color: #999999;
      font-size: 0.37333rem;
    }

    .input {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 88px;
      background: @bg-color-input !important;
      border-radius: 8px;
      margin-top: 20px;
      border: 1px solid #525152;

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

  .defaultBtn {
    width: 100%;
    height: 1.33333rem;
    background-color: #4d4c4d;
    border: none;
    border-radius: 0.10667rem;
    color: #666666;
    font-weight: 600;
    text-align: center;
    line-height: 1.33333rem;
    font-size: 0.42667rem;
  }

  .activeBtn {
    background-color: #c8a77f;
    color: #1e1e1e;
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

#vipOpen {
  width: 100%;
  height: 100%;
  background: @bg-color;
  padding: 0.6rem 0.4rem;
  overflow-y: auto;
  padding-bottom: 1.6rem;
  padding-right: 0;
}
</style>
