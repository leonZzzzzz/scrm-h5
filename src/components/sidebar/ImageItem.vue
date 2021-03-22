<template>
  <div class="img-item">
    <div class="item-info" @click="handleItemClick">
      <img class="img-class" :src="imgUrl + obj.imageUrl" alt="" />
      <div class="img-desc">{{ obj.name }}</div>
    </div>
    <div class="img-preview" @click="showImageDetail">查看大图</div>
  </div>
</template>

<script>
import { ImagePreview } from 'vant'
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
      this.$emit("handleItemClick")
    },
    showImageDetail() {
      let imageUrl = this.imgUrl + this.obj.imageUrl
      ImagePreview({
        images: [imageUrl],
        closeable: true
      })
    }
  }
};
</script>

<style lang="less" scoped>
.img-item {
  .item-info {
    width: 105px;
    height: 150px;
    background-color: #ffffff;
    border-radius: 4px;
    overflow: hidden;
    margin: 10px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    .img-class {
      width: 100%;
      height: 120px;
    }
    .img-desc {
      width: 100%;
      height: 30px;
      line-height: 30px;
      padding: 0 5px;
      box-sizing: border-box;
      white-space: nowrap;
      text-overflow: ellipsis;
      text-align: center;
      color: #222222;
    }
  }
  .img-preview {
    width: 105px;
    height: 24px;
    line-height: 24px;
    text-align: center;
    color: #ffffff;
    background-color: #294a7b;
    margin: 10px;
    border-radius: 4px;
    cursor: pointer;
  }
}
</style>
