<template>
  <div class="image-text-list-item" v-if="data.type == 'image_text'">
    <div class="img">
      <a :href="data.link" target="_blank">
        <img
          :src="
            data.imageUrl
              ? imgUrl + data.imageUrl
              : 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
          "
        />
      </a>
    </div>
    <div class="details">
      <a :href="data.link" target="_blank">
        <h3>
          {{ data.name || "--" }}
        </h3></a
      >
      <div class="details-bottom">
        <Time>{{ data.createTime || "--" }}</Time>
        <Share :data="data"></Share>
      </div>
    </div>
  </div>
</template>

<script>
import Time from "./Time";
import Share from "./Share";
const dataObj = {
  content: "",
  createTime: "",
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
    Time,
    Share,
  },
};
</script>

<style lang="less" scoped>
.image-text-list-item {
  padding: 10px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  .img {
    width: 78px;
    height: 78px;
    display: flex;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .details {
    flex: 1;
    padding-left: 10px;
    h3 {
      font-size: 14px;
      text-align: justify;
      color: #000;
      margin: 0 0 4px 0;
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
      min-height: 38px;
      font-weight: normal;
    }
    .details-bottom {
      display: flex;
      justify-content: space-between;
      margin-top: 10px;
    }
  }
}
</style>