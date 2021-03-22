<template>
  <div class="image-list-item" v-if="data.type == 'image'">
    <div class="img" @click="imagePreview()">
      <img
        :src="
          data.imageUrl
            ? imgUrl + data.imageUrl
            : 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
        "
      />
    </div>
    <div class="info">
      <div class="title">{{ data.name || "--" }}</div>
      <div class="share"><Share :data="data"></Share></div>
    </div>
  </div>
</template>

<script>
import Share from "./Share";
import { ImagePreview } from "vant";
const dataObj = {
  name: "",
  imageUrl: "",
  type: "",
};
export default {
  props: {
    data: {
      type: Object,
      default: () => {
        return dataObj;
      },
    },
  },
  components: {
    Share,
  },
  methods: {
    imagePreview() {
      let img = this.imgUrl + this.data.imageUrl;
      ImagePreview([img]);
    },
  },
};
</script>

<style lang="less" scoped>
.image-list-item {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  overflow: hidden;
  break-inside: avoid;
}
.img {
  width: 100%;
  height: auto;
  display: flex;
  img {
    width: 100%;
    height: 100%;
  }
}
.info {
  display: flex;
  justify-content: space-between;
  padding: 10px;

  .title {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 30px;
  }
  .share {
    margin-left: 5px;
  }
}
</style>