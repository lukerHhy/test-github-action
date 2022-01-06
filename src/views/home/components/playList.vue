<template>
  <ul class="play-list">
    <li v-for="(info, index) in playLists" :key="index" @click="$playGame(info, info.type)">
      <div class="text">
        <div class="title">{{info.title}}</div>
        <div class="sub-title">
          <p v-for="(d, index) in info.desc" :key="index">{{ $t(d) }}</p>
        </div>
      </div>
      <van-image lazy-load :src="$imgs[info.thumb]" />
    </li>
  </ul>
</template>

<script>
import { hotGames10040 } from "@/utils/platform";
import { mapState, mapActions } from "vuex";
export default {
  name: "PlayList",
  components: {},
  // props: [""],
  data() {
    return {
      playLists: hotGames10040.slice(0, 3)
    };
  },
  created() {},
  computed: {},
  methods: {
    // handleActive(temp, text) {
    //   console.log("------>>>", temp.name);
    //   if (this.$getGameStatus(temp, text)) {
    //     this.$playGame(temp, text);
    //     return;
    //   }
    //   // this.$emit("handleActive", temp.name);
    // }
  }
};
</script>

<style lang="less" scoped>
.play-list {
  color: #fff;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  & li:first-of-type {
    width: 690px;
    height: 276px;
    margin-bottom: 24px;
    .text {
      top: 24%;
    }
  }
  & li:nth-of-type(2),
  & li:nth-of-type(3) {
    width: 334px;
    height: 200px;
    .text {
      top: 32px;
    }
  }
  li {
    position: relative;
    background-repeat: no-repeat;
    background-position: top;
    background-size: 100% 100%;
    .van-image{
      width: 100%;
    }
    .text {
      position: absolute;
      left: 24px;
      top: 19%;
      z-index: 1;
      font-family: Microsoft YaHei, sans-serif;
      .title {
        font-size: 36px;
        margin-bottom: 12px;
      }
      .sub-title {
        font-size: 26px;
        display: flex;
        align-items: center;
        p {
          margin-right: 8px;
        }
      }
    }
  }
}
</style>
