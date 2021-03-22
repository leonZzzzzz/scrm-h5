<template>
  <div class="file-item" @click="handleItemClick">
    <van-icon name="column" class="item-icon" />
    <div class="item-info">
      <div class="info-title">{{obj.name || obj.fileName}}</div>
      <div class="info-desc">{{obj.createTime}}</div>
    </div>
  </div>
</template>

<script>
import { Icon } from 'vant'
export default {
  components: {
    vanIcon: Icon
  },
  props: {
    obj: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  methods: {
    handleItemClick() {
      this.$emit('handleItemClick')
    }
  }
}
</script>

<style lang="less" scoped>
.file-item {
  display: flex;
  width: 100%;
  height: 60px;
  background-color: #ffffff;
  padding: 5px 10px;
  box-sizing: border-box;
  margin-bottom: 2px;
  align-items: center;
  cursor: pointer;
  .item-icon {
    font-size: 50px;
    color: #5879a9;
    margin-right: 10px;
  }
  .item-info {
    width: 100%;
    overflow: hidden;
    .info-title {
      line-height: 20px;
      color: #222222;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .info-desc {
      line-height: 20px;
      color: #a7a5a5;
      white-space: nowrap;
      text-overflow: ellipsis;
      span {
        margin-left: 10px;
      }
    }
  }
}
</style>