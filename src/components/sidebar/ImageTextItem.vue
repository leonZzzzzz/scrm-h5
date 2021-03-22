<template>
  <div class="image-text-item">
    <div class="item-left" @click="handleItemClick">
      <img class="img-class" :src="imgUrl + obj.imageUrl" alt="">
      <div class="item-info">
        <div class="info-title">{{obj.name}}</div>
        <div class="info-desc">{{obj.content}}</div>
      </div>
    </div>
    <div class="item-right" @click="showImageTextDetail">预览</div>
  </div>
</template>

<script>
export default {
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
    },
    showImageTextDetail() {
      // window.location.href = this.obj.link
      window.open(this.obj.link)
    }
  }
}
</script>

<style lang="less" scoped>
.image-text-item {
  display: flex;
  width: 100%;
  height: 76px;
  background-color: #ffffff;
  padding: 8px 10px;
  box-sizing: border-box;
  margin-bottom: 2px;
  align-items: center;
  cursor: pointer;
  .item-left {
    display: flex;
    width: calc(100% - 35px);
    height: 60px;
    align-items: center;
    .img-class {
      width: 80px;
      height: 60px;
      margin-right: 10px;
    }
    .item-info {
      width: 100%;
      -webkit-line-clamp: 2;
      -moz-box-orient: vertical;
      -webkit-box-orient: vertical;
      display: -moz-box;
      display: -webkit-box;
      overflow: hidden;
      margin-right: 10px;
      .info-title {
        line-height: 20px;
        color: #222222;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .info-desc {
        line-height: 20px;
        color: #a7a5a5;
      }
    }
  }
  .item-right {
    width: 35px;
    height: 100%;
    color: #294a7b;
    display: flex;
    align-items: flex-end;
    cursor: pointer;
  }
}
</style>