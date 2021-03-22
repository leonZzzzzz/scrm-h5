<template>
  <div v-if="loading" :class="mask ? 'loading-overlay loading-mask' : 'loading-overlay'">
    <img class="loading-img" src="../../assets/loading.gif" />
  </div>
</template>

<script>
export default {
  props: {
    loading: {
        type: Boolean,
        default: false
    },
    // 是否显示遮罩层
    mask: {
      type: Boolean,
      default: false
    }
  },
}
</script>

<style lang="less" scoped>
.loading-overlay {
  z-index: 9999;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0px;
  text-align: center;
  img {
    margin-top: 200px;
    width: 200px;
  }
}
.loading-mask {
  background: rgba(0, 0, 0, .3) !important;
}
</style>