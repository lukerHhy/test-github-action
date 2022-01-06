<template>
  <div>
    <lheader
      v-if="!$route.query.source"
      :title="`${$t($config[$projectname].secName)}${$t('演唱会赞助')}`"
      :goback="true"
    ></lheader>
    <ToTop />
    <div class="suncity-wraper">
      <p
        class="suncity-info"
        v-if="$i18n && $i18n.locale == 'en'"
      >{{ $t($config[$projectname].secName) }} United Suncity Group has sponsored various celebrity concerts and entertainment experience at the top Cotai Arena. The strong atmosphere of the scene and the stunning audio-visual equipment create a dazzling stage effect. Only {{ $t($config[$projectname].secName) }} and Sun City’s valued customers provide the highest quality audio-visual and entertainment feast.</p>
      <p
        class="suncity-info"
        v-else
      >{{ $t($config[$projectname].secName) }}联合太阳城集团实力赞助各类明星大咖演唱会，顶级金光综艺馆娱乐体验。现场强烈的气氛加上惊艳四射的视听设备，打造出耀目的舞台效果。只为{{ $t($config[$projectname].secName) }}和太阳城的尊贵客户提供最优质的视听和娱乐盛宴。</p>
      <img class="suncity-img" src="./assets/img2.png" alt />
    </div>
  </div>
</template>

<script>
import Lheader from "@/components/l-header";
import ToTop from "@/components/to-top";
export default {
  components: {
    Lheader,
    ToTop
  },
  data() {
    return {

    };
  }
};
</script>

<style lang="less" scoped>
.logoImg {
  width: 100%;
  height: auto;
  position: absolute;
  top: 1.17333rem;
  left: 0;
}
.suncity-wraper {
  width: 100%;
  height: 1400px;
  background: url(./assets/bg1.png) no-repeat center;
  background-size: cover;
  position: relative;
  .suncity-info {
    position: absolute;
    left: 50%;
    top: 420px;
    margin-left: -242px;
    width: 485px;
    font-size: 18px;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 36px;
    text-align: center;
  }
  .suncity-img {
    position: absolute;
    left: 50%;
    top: 671px;
    margin-left: -242px;
    width: 485px;
  }
}
</style>
