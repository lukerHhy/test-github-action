<template>
  <div>
    <van-list>
      <div
        class="item"
        v-for="(item, index) in list"
        :key="index"
        @click="handleDetail(item)"
      >
        <div class="p p1">
          <span class="left">{{ item.username }}</span>
          <span class="right">{{ item.user_wallet_static.valid_bet }}</span>
        </div>
        <div class="p p2">
          <div class="left">
            <span>{{$t('等级')}}:<em>{{ item.levelName || 0 }}</em></span>
            <span>{{$t('存款')}}:<em>{{ item.user_wallet_static.deposit_money || 0 }}</em></span>
            <span>{{$t('提款')}}:<em>{{
              item.user_wallet_static.draw_money || 0
            }}</em></span>
          </div>
          <span class="right">{{$t('有效投注')}}
            <van-icon name="arrow" />
          </span>
        </div>
        <!-- <div class="p p3">
          <van-button @click="handleDetail(item)">{{$t('查看详情')}}</van-button>
        </div> -->
      </div>
    </van-list>
  </div>
</template>
<script>
// import {  memberlist } from "@/api/agent";
export default {
  name: 'Memberlist',
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      // list:[]
    }
  },
  created() {
    // this.getdata()
  },
  methods: {
    handleDetail(val) {
      window.sessionStorage.setItem('wanqu_member_detail', JSON.stringify(val))

      this.$router.push({ name: 'agMemberDetail' })
    }
    // getdata(){
    //   memberlist({ access_token: window.localStorage.agToken,username:'',start_date:'',end_date:''}).then(res => {
    //     if(res.data.data && res.data.data.length !=0){
    //       this.list = res.data.data.data
    //       // this.list = this.list.concat(res.data.data.data);
    //     }

    //   });
    // }
  }
}
</script>
<style lang="less" scoped>
.item {
  padding: 40px 0;
  box-sizing: border-box;
  border-bottom: 2px solid rgba(#fff, 0.06);

  .p {
    display: flex;
  }

  .p1 {
    height: 44px;
    font-size: 32px;
    font-weight: 400;
    color: rgba(204, 204, 204, 1);
    line-height: 44px;
    .left {
      font-size: 32px;
      color: #ccc;
    }
    .right {
      height: 44px;
      font-size: 32px;
      font-weight: 600;
      color: @primary-color;
      line-height: 44px;
    }
  }

  .p2 {
    margin-top: 20px;
    height: 34px;
    font-size: 24px;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    line-height: 34px;
    .left {
      color: #666;
      span {
        padding-right: 20px;
        em {
          padding-left: 10px;
          color: #999;
        }
      }
    }
    .right {
      display: flex;
      align-items: center;
    }
  }

  .p3 {
    margin-top: 40px;
    margin-bottom: 62px;

    .van-button {
      width: 150px;
      height: 60px;
      background-color: transparent;
      border: 2px solid @primary-color;

      .van-button__text {
        display: block;
        line-height: 60px;
        font-size: 24px;
        color: @primary-color;
      }
    }
  }

  .left {
    flex: 1;
  }
}
</style>
