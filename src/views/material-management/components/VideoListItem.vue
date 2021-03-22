<template>
  <div class="image-list-item" v-if="data.type == 'video'">
    <div class="img">
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
      <div class="play" @click="playVideo">
        <i class="iconfont icon-shipin1"></i>
      </div>
    </div>
    <div class="info">
      <div class="title">{{ data.name || "--" }}</div>
      <div class="share"><Share :data="data"></Share></div>
    </div>
    <VideoPlayer
      :isShow="show"
      :url="data.videoUrl"
      :img="data.imageUrl"
      @hide="hide"
    ></VideoPlayer>
  </div>
</template>

<script>
import Share from "./Share";
import VideoPlayer from "./VideoPlayer";
const dataObj = {
  videoUrl: "",
  imageUrl: "",
  content: "",
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
    VideoPlayer,
  },
  data() {
    return {
      show: false,
    };
  },
  methods: {
    playVideo() {
      this.show = true;
    },
    hide() {
      this.show = false;
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
  height: 170px;
  position: relative;
  z-index: 100;
  display: flex;
  .play {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 200;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    i {
      color: #f5f6f9;
      font-size: 40px;
    }
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
}
</style>