<template>
  <div class="Tabfooter">
    <div
      :class="[
        'Tabfooter_item',
        itemindex === item.path ? 'tab_item_active' : 'tab_item',
      ]"
      v-for="(item, index) in items"
      :key="index"
      @click="$router.push(item.path)"
    >
      <div
        e-else
        :class="['iconfont', item.icon]"
        alt=""
        width="42%"
        style="margin-bottom: .2rem;"
      />
      

      <div>
        {{$t(item.title)}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  //接受父组件传来的
  props: {
    tabItems: Array,
  },
  data() {
    return {
      items: this.tabItems,
      itemindex: '', //默认选中首页
    }
  },
  watch: {
    $route: {
      handler: function(e) {
        this.itemindex = e.path
      },
      immediate: true,
    },
  },
  methods: {},
}
</script>
<style scoped lang="less">
.iconfont {
  font-size: 0.6rem;
}
.Tabfooter {
  width: 100%;
  height: 1.6rem;
  position: fixed;
  bottom: 0;
  left: 0;
  justify-content: space-around;
  display: flex;
  align-items: center;
  background: @tabfooter-color;
  color: @tabfooterfont-color;
  font-size: 15px;
}
.Tabfooter_item {
  text-align: center;
}

.tab_item_active {
  color: #c8a77f;
  font-size: 0.25rem;
}
</style>
