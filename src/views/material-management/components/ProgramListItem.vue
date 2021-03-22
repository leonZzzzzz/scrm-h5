<template>
  <div class="program-list-item" v-if="data.type == 'program'">
    <div class="sign">
      <img
        :src="
          data.imageUrl
            ? imgUrl + data.imageUrl
            : 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
        "
      />
      <span>{{ data.name || "--" }}</span>
    </div>
    <div class="bottom">
      <Share :data="data"></Share>
    </div>
  </div>
</template>

<script>
import Share from "./Share";
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
};
</script>

<style lang="less" scoped>
.program-list-item {
  border-radius: 4px;
  padding: 14px;
  overflow: hidden;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  break-inside: avoid;
  display: flex;
  justify-content: space-between;
  .sign {
    display: flex;
    align-items: center;
    display: flex;
    img {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      overflow: hidden;
    }
    span {
      margin-left: 10px;
      color: #000;
      font-size: 14px;
    }
  }
  .title {
    font-size: 14px;
    line-height: 20px;
    padding: 5px 0;
    text-align: justify;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .img {
    width: 100%;
    display: flex;
    img {
      width: 100%;
    }
  }
  .bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>