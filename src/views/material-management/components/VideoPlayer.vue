<template>
  <div>
    <van-overlay :show="show">
      <div class="hide" @click="hide">
        <van-icon name="close" />
      </div>
      <div class="xfo-video">
        <videoPlayer
          class="videoPlayer"
          ref="videoPlayer"
          :playsinline="true"
          :options="playerOptions"
        ></videoPlayer>
      </div>
    </van-overlay>
  </div>
</template>

<script>
import { videoPlayer } from "vue-video-player";
import "video.js/dist/video-js.css";
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    url: {
      type: String,
      default: "",
    },
    img: {
      type: String,
      default: "",
    },
  },
  watch: {
    isShow() {
      this.show = this.isShow;
    },
  },
  components: {
    videoPlayer,
  },
  data() {
    return {
      show: false,
      playerOptions: {
        playbackRates: [0.5, 1.0, 1.5, 2.0], // 可选的播放速度
        autoplay: false, // 如果为true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 是否视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "video/mp4", // 类型
            src: this.url, // url地址
          },
        ],
        poster: this.imgUrl + this.img, // 封面地址
        notSupportedMessage: "此视频暂无法播放，请稍后再试", // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true, // 当前时间和持续时间的分隔符
          durationDisplay: true, // 显示持续时间
          remainingTimeDisplay: true, // 是否显示剩余时间功能
          fullscreenToggle: true, // 是否显示全屏按钮
        },
      },
    };
  },
  methods: {
    hide() {
      this.show = false;
      this.$emit("hide");
      this.$refs.videoPlayer.player.pause(); // 暂停
      this.$refs.videoPlayer.player.src(this.url); // 重置进度条
    },
  },
};
</script>

<style lang="less" scoped>
.van-overlay {
  z-index: 2001;
}
.hide {
  color: #fff;
  font-size: 30px;
  position: fixed;
  top: 20px;
  right: 20px;
}
.xfo-video {
  width: 100%;
  height: 100%;
  //   // background-color: pink;
  display: flex;
  justify-content: center;
  align-items: center;
  .videoPlayer {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    ::v-deep .vjs-user-active {
      position: relative;
    }
    ::v-deep .vjs-big-play-button {
      height: 48px;
      width: 48px;
      border-radius: 50%;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -24px;
      margin-left: -24px;
    }
  }
}
</style>