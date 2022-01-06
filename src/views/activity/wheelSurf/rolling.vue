<template>
  <div class="comBox">
    <ul class="title" v-show="switchFlag === 0">
      <li v-for="(t, i) in tList" :key="i">
        {{ t }}
      </li>
    </ul>
    <div class="outer-box" v-show="switchFlag === 0">
      <div class="inner-box1">
        <div v-for="(i, index) in rollingData" :key="index">
          <div class="title">
            <p>{{ i.username }}</p>
            <p>{{ i.created_at }}</p>
            <p>{{ i.gift_item }}</p>
          </div>
        </div>
      </div>
      <!--注意inner-box1和inner-box2的数据必须一样，并且样式也得一样
        inner-box2包裹的顶部要注意和inner-box1的底部的距离应和其包裹的
        每两个div之间的距离一样否则会出现卡顿的效果-->
      <div class="inner-box2">
        <div v-for="i in rollingData" :key="i.index">
          <div class="title">
            <p>{{ i.username }}</p>
            <p>{{ i.created_at }}</p>
            <p>{{ i.gift_item }}</p>
          </div>
        </div>
      </div>
    </div>
    <div v-if="switchFlag === 1 && giftList.length > 0" class="giftbox">
      <ul class="clum" v-for="item in giftList" :key="item.index">
        <li style="width:25%">
{{$t('恭喜您转到了')}}
        </li>
        <li style="width:50%">{{ item.gift_money }}元{{ item.gift_item }}</li>
        <!-- <li style="width:50%" v-if="item.gift_type===2">
          {{ item.gift_item }}
        </li> -->
        <li
          style="width:25%"
          class="now"
          @click="
            $router.push({
              name: 'deposit',
              params: {
                table: item,
              },
            })
          "
          v-if="item.gift_type !== 1 && item.is_get === 0"
        >
{{$t('立即兑换')}}
        </li>
        <li style="width:25%" class="nowed" v-if="item.gift_type === 1">
{{$t('已兑换')}}
        </li>
        <li
          style="width:25%"
          class="nowed"
          v-if="item.gift_type === 2 && item.is_get === 1"
        >
{{$t('已领取')}}
        </li>
      </ul>
    </div>
    <div v-else class="no">
{{$t('暂无中奖记录')}}
    </div>
  </div>
</template>
<script>
export default {
  props: {
    switchFlag: {
      type: Number,
      default: 0,
    },
    rollingData: {
      type: Array,
      default: () => [],
    },
    giftList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      tList: [this.$t('名称'), this.$t('时间'), this.$t('奖品')],
      timer: null,
    }
  },
  watch: {},
  mounted() {
    console.log(this.tList)
    let outerBox = document.getElementsByClassName('outer-box')[0]
    let innerBox1 = document.getElementsByClassName('inner-box1')[0]
    // console.log(innerBox1.offsetHeight)
    // console.log(outerBox.scrollTop)
    console.log(this.$parent)
    this.timer = setInterval(() => {
      this.scrollFunc(outerBox, innerBox1)
    }, 60)
  },
  destroyed() {
    clearInterval(this.timer)
  },
  methods: {
    scrollFunc(outerBox, innerBox) {
      if (outerBox.scrollTop < innerBox.offsetHeight) {
        outerBox.scrollTop++
      } else {
        outerBox.scrollTop = 0
      }
    },
    mounse() {
      console.log(this.$t('我进入了'))
    },
  },
  components: {},
}
</script>

<style lang="less">
@boredeColoe: #d7ba94;
.no {
  width: 100%;
  height: 100%;
  line-height: 3.2rem;
  text-align: center;
}
.giftbox {
  height: 3rem;
  margin: 0.1rem auto;
  overflow-y: scroll;
}
.giftbox::-webkit-scrollbar {
  width: 0 !important;
}
.clum {
  width: 100%;
  display: flex;
  li {
    text-align: center;
    line-height: 0.5rem;
    color: @boredeColoe;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .now {
    background: #f9d7af;
    border-radius: 1rem;
    margin-bottom: 0.1rem;
    color: #000;
  }
  .nowed {
    border-radius: 1rem;
    margin-bottom: 0.1rem;
    color: #f9d7af;
    border: 1px solid #f9d7af;
  }
}
.comBox {
  width: 93%;
  margin: auto;
  border: 2px solid @boredeColoe;
  color: @boredeColoe;
  overflow: hidden;
  padding: 0 0.2rem;
  border-radius: 0.15rem;
  height: 3.2rem;
  margin-top: 0.5rem;
}
.outer-box {
  text-align: center;
  height: 180px;
  overflow: hidden;
  width: 100%;
}
.title {
  display: flex;
  width: 100%;

  li,
  p {
    width: 33.3%;
    line-height: 0.7rem;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.inner-box1 div,
.inner-box2 div {
  height: 40px;
}
</style>
