<template>
  <img v-if="show" :src="src" @onerror="imgLoadError" />
  <img v-else :src="defaultImg" />
</template>

<script>
export default {
  name: 'ErroImg',
  props: {
    src: {
      type: String,
      default: '',
    },
    defaultImg: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      show: true,
    }
  },
  methods: {
    imgLoadError() {
      this.show = false
    },
  },
}
</script>
