<template>
  <div class="video-item">
    <div class="video-wrapper">
      <video class="video-class" :src="obj.videoUrl"></video>
      <div class="wrapper" v-if="isActive && !isMobile" @click="showVideoDetail">
        <van-icon name="play-circle" class="play-icon" />
      </div>
      <div class="wrapper wrapper-dark" v-if="isActive && isMobile" @click="showVideoDetail">
        <van-icon name="play-circle" class="play-icon" />
      </div>
      <div class="wrapper wrapper-dark" v-if="!isActive" @click="loadVideo">
        <van-icon name="replay" class="replay-icon" />
      </div>
      </div>
    <div class="item-info">
      <div class="info-title">{{obj.name}}</div>
      <div class="video-send" @click="handleItemClick">发送</div>
    </div>
    <!-- 视频播放弹窗 -->
    <van-overlay
      :show="videoOverlay.show">
      <div class="overlay-wrapper">
        <video v-if="isMobile" style="width: 100%; height: 280px;" :src="videoOverlay.videoUrl" controls playsinline webkit-playsinline x5-playinline></video>
        <video v-else style="width: 100%; height: 100%" :src="videoOverlay.videoUrl" controls></video>
        <div class="close-icon" @click="videoOverlay.show = false">
          <van-icon name="cross" class="cross" />
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
import { Icon, Tag, Notify, Overlay } from 'vant'
export default {
  components: {
    vanIcon: Icon,
    vanTag: Tag,
    vanOverlay: Overlay
  },
  props: {
    obj: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      isActive: false,
      videoOverlay: {
        show: false,
        videoUrl: ''
      }
    }
  },
  methods: {
    handleItemClick() {
      this.$emit('handleItemClick')
    },
    // videoPlay(item, index) {
    //   event.stopPropagation()
    //   this.$emit('videoPlay', item, index)
    // },
    loadVideo() {
      let that = this
      let fileId = that.obj.fileId
      if (fileId) {
        that.$http.getVideoSignatureDetail({ fileId }).then(res => {
          let videoUrl = res.data.data.file.url + res.data.data.playSignature.queryString
          that.$set(that.obj, 'videoUrl', videoUrl)
          this.isActive = true
        })
      } else {
        Notify({ type: 'warning', message: '无效的素材内容，请重新上传' })
      }
      this.isActive = true
    },
    showVideoDetail() {
      this.videoOverlay.show = true
      this.videoOverlay.videoUrl = this.obj.videoUrl
    }
  }
}
</script>

<style lang="less" scoped>
.video-item {
  display: flex;
  width: 100%;
  height: 110px;
  background-color: #ffffff;
  padding: 5px 10px;
  box-sizing: border-box;
  margin-bottom: 2px;
  align-items: center;
  cursor: pointer;
  .video-wrapper {
    width: 120px;
    height: 90px;
    margin-right: 10px;
    position: relative;
    .video-class {
      width: 120px;
      height: 90px;
    }
    .wrapper {
      position: absolute;
      width: 120px;
      height: 90px;
      left: 0;
      top: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      .play-icon {
        font-size: 32px;
        color: grey;
        background-color: #ffffff;
        border-radius: 16px;
      }
      .replay-icon {
        font-size: 32px;
        color: grey;
      }
    }
  }
  .wrapper-dark {
    background-color: #222222;
  }
  .item-info {
    width: 100%;
    overflow: hidden;
    .video-send {
      width: 60px;
      height: 24px;
      line-height: 24px;
      text-align: center;
      border-radius: 5px;
      color: #ffffff;
      background-color: #294a7b;
      cursor: pointer;
    }
    .info-title {
      height: 40px;
      line-height: 20px;
      color: #222222;
      -webkit-line-clamp: 2;
      -moz-box-orient: vertical;
      -webkit-box-orient: vertical;
      display: -moz-box;
      display: -webkit-box;
      overflow: hidden;
      margin-bottom: 10px;
    }
  }
}
.overlay-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  position: relative;
  .close-icon {
    position: absolute;
    top: 20px;
    left: 10px;
    width: 40px;
    height: 40px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    .cross {
      font-size: 26px;
      color: #ffffff;
    }
  }
}
</style>