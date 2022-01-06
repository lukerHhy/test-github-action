<style scoped lang="less">
@import "../agent/index";
.aagames-nav-bar{
  color: #ccc!important;
}
.container {
  position: absolute;
  left: 0;
  top: @main-top;
  right: 0;
  bottom: 0;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  background: #191919;
  color: #ccc;
  .main {
    height: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 0;
    .submit-form {
      flex: 1;
      .input {
        .van-icon{
          color: @text-color-2;
          font-size: 20px;
        }
        input {
          text-align: right;
        }
        p {
        }
        /deep/ .province-city {
          flex: 1;
          .input {
            text-align: right;
          }
        }
      }
    }
    .aagames-button-box {
      margin-top: @margin-10;
      .aagamesBtn{
        width: 100%;
        height: 1.33333rem;
        background: #C8A77F;
        border: none;
        border-radius: 0.10667rem;
        color: #1E1E1E;
        font-weight: 600;
        text-align: center;
        line-height: 1.33333rem;
        font-size: 0.42667rem;
      }
    }
  }
}
.yabo-bank .pop-head{
  color: #191919;
}
</style>
<template>
  <div class="container agAddBankBind">
    <lheader :title="title" :goback="true" :get-switch="false"></lheader>
    <div class="main">
      <div class="submit-form">
        <!-- 持卡人姓名 -->
        <div class="input">
          <p class="title">{{$t('持卡人姓名')}}</p>
          <input type="text" v-model="addBank.name" :disabled="isName"  :placeholder="$t('请输入真实姓名')" />
        </div>
        <!-- 银行账户 -->
        <div class="input">
          <p class="title">{{$t('请输入银行卡卡号')}}</p>
          <input type="text" v-model="addBank.card_no"  :placeholder="$t('请输入银行卡卡号')" />
        </div>
        <!-- 选择银行 -->
        <div class="input">
          <p class="title">{{$t('请选择银行')}}</p>
          <BankcardList style="flex: 1" v-model="addBank.bank_id" :bankText.sync="bankText">
            <input
                type="text"
                style="padding-right: 0"
                v-model="bankText"
                readonly
                @click="show = true"
                 :placeholder="$t('请选择')"
            />
          </BankcardList>
          <van-icon name="arrow" />
        </div>
        <!-- 选择城市 -->
        <div class="input">
          <p class="title">{{$t('开户省份和城市')}}</p>
          <province-city @update="onUpdateProvinceCity"></province-city>
          <van-icon name="arrow" />
        </div>
        <!-- <div class="aagames-select-box">
                  <div class="select">
                    <input type="text" v-model="regionText" @click="regionShow = true" readonly  :placeholder="$t('请选择省份和城市')">
                    <i class="el-icon-caret-bottom"></i>
                  </div>
        </div>-->
        <!-- 开户分行名称 -->
        <div class="input">
          <p class="title">{{$t('开户支行')}}</p>
          <input type="text" v-model="branch"  :placeholder="$t('请输入开户支行')" />
        </div>
      </div>
      <div class="aagames-button-box">
        <button class="aagamesBtn" type="button" @click="submit">{{$t('确定绑定')}}</button>
      </div>
    </div>
    <loading :isShow="isLoading" :title="$t('提交中...')"></loading>
  </div>
</template>

<script>
import Lheader from "@/components/l-header";
import Loading from "@/components/loading";
import ProvinceCity from "@/components/province-city-2";
import BankcardList from "@/components/pop-bankcard-list";
import { addbankcard} from "@/api/agent";

export default {
  name: "discountCore",
  components: {
    Loading,
    Lheader,
    ProvinceCity,
    BankcardList
  },
  data() {
    return {
      title: this.$t('新增银行卡'),
      show: false,
      isName: false,
      isLoading: false,
      columns: [],
      bankText: "",
      addBank: {},
      province: "",
      city: "",
      branch: ""
    };
  },
  methods: {
    onCancel(value, index) {
      this.show = false;
    },
    onConfirm(value) {
      this.bankText = value.name;
      this.addBank.bank_id = value.id;
      this.show = false;
    },
    onUpdateProvinceCity(data) {
      this.province = data.province;
      this.city = data.city;
    },
    submit() {
      if (!this.addBank.card_no) {
        this.$toast(this.$t('请输入银行账户'));
        return false;
      }
      if (!this.bankText) {
        this.$toast(this.$t('请选择银行'));
        return false;
      }
      if (!this.province) {
        this.$toast(this.$t('请选择省份'));
        return false;
      }
      if (!this.city) {
        this.$toast(this.$t('请选择城市'));
        return false;
      }
      if (!this.branch) {
        this.$toast(this.$t('请填写开户分行'));
        return false;
      }
      if (!/^\d{16,20}$/.test(this.addBank.card_no)) {
        this.$toast(this.$t('银行账户仅支持输入数字，16-20位'));
        return false;
      }
      if (!/^[\u4e00-\u9fa5]{0,5}$/.test(this.addBank.name)) {
        this.$toast(this.$t('输入真实姓名，最多5汉字'));
        return false;
      }
      this.addBank.access_token = window.localStorage.agToken;
      this.addBank.bank_of_deposit = this.province + this.city + this.branch;
      this.isLoading = true;
      addbankcard(this.addBank)
          .then(res => {
            const that = this;
            if (res.data.code === 0) {
              this.$toast({
                message: this.$t('提交成功'),
                onClose() {
                  that.$router.push({
                    path: "agBankBind"
                  });
                }
              });
            } else {
              this.$toast(res.data.msg);
            }
          })
          .finally(() => {
            this.isLoading = false;
          });
    }
  },
  created() {
    try {
      let scrollY = document.getElementsByClassName("container")[0].offsetTop;
      window.scrollTo(0, scrollY);
    } catch (error) {}
    if (this.$route.query.name) {
      this.addBank.name = this.$route.query.name;
    }
    // allbanklist({
    //   access_token: window.localStorage.agToken
    // }).then(res => {
    //   if (res.data.code === 0) {
    //     this.columns = res.data.data
    //   }
    // })
  }
};
</script>

