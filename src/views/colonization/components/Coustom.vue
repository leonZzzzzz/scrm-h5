<template>
  <div class="coustom">
    <img :style="`width: ${size}px;height: ${size}px;`" :src="url" />
    <p>{{ name }}</p>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: "",
    },
    url: {
      type: String,
      default: "",
    },
    size: {
      type: Number,
      default: 44,
    },
  },
};
</script>

<style lang="less" scoped>
.coustom {
  display: inline-block;
  text-align: center;
  p {
    font-size: 12px;
    color: #323233;
    text-align: center;
    margin: 0;
    padding: 0;
  }
}
</style>