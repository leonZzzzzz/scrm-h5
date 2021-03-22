<template>
  <div class="image-texts-list-item" v-if="data.type == 'numerous_image_text'">
    <div class="bg-img">
      <a :href="data.link" target="_blank">
        <!-- 瀑布流模式 -->
        <!-- <img
          :src="
            data.imageUrl
              ? imgUrl + data.imageUrl
              : 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
          "
        /> -->
        <!-- 裁剪模式 -->
        <van-image
          width="100%"
          height="100%"
          fit="cover"
          :src="
            data.imageUrl
              ? imgUrl + data.imageUrl
              : 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
          "
        />
        <p class="title">{{ data.name }}</p>
      </a>
    </div>
    <!-- 多图文中单图文列表 -->
    <!-- <div class="list">
      <div
        class="list-item"
        v-for="(item, index) in data.materialQuoteList"
        :key="index"
      >
        <a :href="item.quoteMaterial.link" target="_blank">
          <div class="img">
            <img :src="imgUrl + item.quoteMaterial.imageUrl" />
          </div>
          <div class="info">
            {{ item.quoteMaterial.name || "--" }}
          </div>
        </a>
      </div>
    </div> -->
    <div class="bottom">
      <Time>{{ data.createTime || "--" }}</Time>
      <Share :data="data"></Share>
    </div>
  </div>
</template>

<script>
import Time from "./Time";
import Share from "./Share";
const dataObj = {
  createTime: "",
  imageUrl: "",
  content: "",
  materialQuoteList: [
    {
      quoteMaterial: {},
    },
  ],
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
a {
  width: 100%;
}
.image-texts-list-item {
  padding: 10px;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  .bg-img {
    width: 100%;
    position: relative;
    display: flex;
    height: 200px;
    overflow: hidden;
    img {
      width: auto;
      height: 100%;
    }
    .title {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 50px;
      margin: 0;
      background-color: rgba(0, 0, 0, 0.2);
      color: #fff;
      line-height: 30px;
      font-size: 16px;
      padding: 10px;
      box-sizing: border-box;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .list {
    width: 100%;
    .list-item {
      padding: 10px 0;
      border-bottom: 1px solid #f3f4f6;
      a {
        display: flex;
        color: #000;
      }

      .img {
        width: 78px;
        height: 78px;
        display: flex;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .info {
        flex: 1;
        padding-left: 10px;
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
        line-height: 22px;
        font-size: 14px;
      }
    }
  }
  .bottom {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  }
}
</style>