<template>
  <div class="time"><i class="iconfont icon-shijian"></i> <slot></slot></div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.time {
  font-size: 12px;
  display: flex;
  color: #BFBFBF;
  line-height: 18px;
  align-items: center;
  i {
    margin-right: 5px;
    font-size: 13px;
  }
}
</style>