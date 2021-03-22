<template>
  <div>
    <!-- isManagerFlag -->
    <div v-if="isManagerFlag">
      <div class="top-nav">
        <van-nav-bar title="朋友圈"></van-nav-bar>
      </div>
      <van-pull-refresh
        v-model="isLoading"
        @refresh="getMomentsContentPage({})"
      >
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
        >
          <div class="xfo-list">
            <div class="xfo-item-content">
              <div class="xfo-time">
                <span class="day">今天</span>
              </div>
              <div class="xfo-content">
                <div class="xfo-upload-btn" @click="clickRightCreate">
                  <van-icon name="plus" />
                </div>
              </div>
            </div>
            <div v-for="(item, index) in momentList" :key="index">
              <div class="xfo-item" v-if="yearFilters(item.year)">
                {{ item.year }}年
              </div>
              <div
                class="xfo-item-content"
                v-for="(con, cIndex) in item.list"
                :key="cIndex"
              >
                <div class="xfo-time">
                  <span class="day">{{ con.day }}</span>
                  <span class="month">{{ con.month }}月</span>
                </div>
                <div class="xfo-content">
                  <!-- -1无，1图片，2视频，3图文链接 -->
                  <div class="xfo-text" v-if="con.type == -1">
                    {{ con.content }}
                  </div>
                  <div
                    class="xfo-image"
                    v-if="
                      con.momentsUploadContentList &&
                      con.momentsUploadContentList[0].type == 1
                    "
                  >
                    {{ con.content }}
                    <div
                      style="
                        margin-top: 10px;
                        display: flex;
                        justify-content: space-between;
                        flex-wrap: wrap;
                      "
                    >
                      <van-image
                        width="80"
                        height="80"
                        fit="cover"
                        style="margin-bottom: 10px"
                        v-for="(img, imgIndex) in con.momentsUploadContentList"
                        :key="imgIndex"
                        :src="imgHost + img.url"
                        @click="
                          showImage(con.momentsUploadContentList, imgIndex)
                        "
                      />
                    </div>
                  </div>
                  <div
                    class="xfo-video"
                    v-if="
                      con.momentsUploadContentList &&
                      con.momentsUploadContentList[0].type == 2
                    "
                  >
                    {{ con.content }}
                    <div class="video">
                      <van-image
                        width="100%"
                        height="150"
                        fit="cover"
                        :src="con.momentsUploadContentList[0].url"
                      />
                      <div class="xfo-btn">
                        <van-icon
                          name="play-circle-o"
                          @click="showVideo(con.momentsUploadContentList[0])"
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    class="xfo-image-text"
                    v-if="
                      con.momentsUploadContentList &&
                      con.momentsUploadContentList[0].type == 3
                    "
                  >
                    {{ con.content }}
                    <a
                      :href="con.momentsUploadContentList[0].link"
                      target="_bank"
                    >
                      <div class="image-text">
                        <div class="text">
                          <div class="title">
                            {{ con.momentsUploadContentList[0].title }}
                          </div>
                          <div class="content">
                            {{ con.momentsUploadContentList[0].description }}
                          </div>
                        </div>
                        <div class="image">
                          <van-image
                            width="44"
                            height="44"
                            :src="imgHost + con.momentsUploadContentList[0].url"
                          />
                        </div>
                      </div>
                    </a>
                  </div>
                  <div class="time-and-delete">
                    <span>{{ con.time }}</span>
                    <span class="delete" @click="deleteMoment(con.id)"
                      >删除</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </van-list>
      </van-pull-refresh>
      <van-popup v-model="videoShow" @close="videoPropupClose">
        <div class="xfo-video-propup">
          <video-player
            x5-video-player-type="h5-page"
            class="video-player vjs-custom-skin"
            ref="videoPlayer"
            :playsinline="true"
            :options="playerOptions"
          ></video-player>
        </div>
      </van-popup>
      <van-popup
        v-model="createVanPopup"
        round
        position="bottom"
        :style="{ height: '150px' }"
      >
        <ul class="xfo-publish">
          <li @click="$router.push('/moment-all/create?type=text')">
            <img src="../../assets/wenzi.png" alt="" />
            <p>文字</p>
          </li>
          <li @click="$router.push('/moment-all/create?type=image')">
            <img src="../../assets/tupian.png" alt="" />
            <p>图片</p>
          </li>
          <li @click="$router.push('/moment-all/create?type=video')">
            <img src="../../assets/shipin.png" alt="" />
            <p>视频</p>
          </li>
          <li @click="$router.push('/moment-all/create?type=imageText')">
            <img src="../../assets/tuwen.png" alt="" />
            <p>图文链接</p>
          </li>
        </ul>
        <div class="xfo-btn-top-line"></div>
        <div class="xfo-btn" @click="createVanPopup = false">取消</div>
      </van-popup>
    </div>
    <div v-else class="noPower">
      <div>
        <img
          src="../../assets/power.png"
          alt=""
          style="width: 150px; max-height: 150px"
        />
        <p>暂无权限</p>
      </div>
    </div>
  </div>
</template>

<script>
import {
  Icon,
  List,
  NavBar,
  PullRefresh,
  ImagePreview,
  Image,
  Popup,
  Toast,
} from "vant";
import { videoPlayer } from "vue-video-player";
export default {
  components: {
    vanIcon: Icon,
    vanList: List,
    vanNavBar: NavBar,
    vanPullRefresh: PullRefresh,
    vanImage: Image,
    vanPopup: Popup,
    [ImagePreview.Component.name]: ImagePreview.Component,
    videoPlayer,
  },
  data() {
    return {
      momentList: [],
      loading: false,
      isLoading: false,
      finished: false,
      videoShow: false,
      pageData: {
        pageSize: 50,
        pageNum: 1,
        pageTotal: 0,
      },
      playerOptions: {
        playbackRates: [1.0, 2.0, 3.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "video/mp4",
            type: "video/ogg",
            src: "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4", //url地址
          },
        ],
        poster:
          "https://surmon-china.github.io/vue-quill-editor/static/images/surmon-1.jpg", //你的封面地址
        width: document.documentElement.clientWidth,
        notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true, //全屏按钮
        },
      },
      createVanPopup: false,
      customerId: "",
      isManagerFlag: false,
    };
  },
  created() {
    // 授权
    this.getAuthorizeWxUserId().then(wxUserId => {
      // this.authorizeUserId = wxUserId
    })

    this.getMomentsContentPage({});
    this.isManager();
  },
  methods: {
    // 模拟登录
    async setUserId() {
      await this.$http.setUserId({ userId: "1329adff559c4557969b94b3d5cfb1fb" })
      await this.$http.setWXUserId({ userId: "1329adff559c4557969b94b3d5cfb1fb" })
    },
    // 页面渲染
    showImage(list, index) {
      let images = [];
      list.forEach((img) => {
        images.push(this.imgHost + img.url);
      });
      ImagePreview({
        images,
        startPosition: index,
      });
    },
    showVideo(data) {
      console.log(data);
      this.playerOptions.sources[0].src = data.url;
      this.videoShow = true;
      this.$nextTick(() => {
        this.$refs.videoPlayer.player.play();
      });
    },
    videoPropupClose() {
      this.$refs.videoPlayer.player.pause();
    },
    clickRightCreate() {
      console.log("aaaa");
      this.createVanPopup = true;
    },
    deleteMoment(id) {
      console.log(id);
      this.deleteMomentsContent({ id }, (res) => {
        this.getMomentsContentPage({});
        Toast("删除成功");
      });
    },
    setTime(data) {
      let timeArr = [];
      data.forEach((item) => {
        let year = item.createTime.split(" ")[0].split("-")[0];
        let month = item.createTime.split(" ")[0].split("-")[1];
        let day = item.createTime.split(" ")[0].split("-")[2];
        let time = item.createTime.split(" ")[1].slice(0, 5);
        this.$set(item, "year", year);
        this.$set(item, "month", month);
        this.$set(item, "day", day);
        this.$set(item, "time", time);
      });
      console.log("处理后数据", data);
      data.forEach((item) => {
        let length = timeArr.length;
        console.log(length);
        console.log(item);
        if (length == 0) {
          timeArr = [
            {
              year: item.year,
              list: [item],
            },
          ];
        } else {
          if (item.year === timeArr[length - 1].year) {
            timeArr[length - 1].list.push(item);
          } else {
            timeArr.push({
              year: item.year,
              list: [item],
            });
            length++;
          }
        }
      });
      // console.log("timeArr", timeArr);
      this.momentList = timeArr;
    },
    yearFilters(options) {
      if (new Date().getFullYear() == options) {
        return false;
      } else {
        return true;
      }
    },
    // 获取数据
    getMomentsContentPage(options) {
      this.loading = false;
      this.finished = false;
      options.pageSize = this.pageData.pageSize;
      options.pageNum = this.pageData.pageNum;
      this.$http
        .getMomentsContentPage(options)
        .then((res) => {
          console.log("接口数据", res);
          this.momentList = res.data.data.list;
          this.setTime(this.momentList);
          this.isLoading = false;
          this.loading = true;
          this.finished = true;
          console.log("this.momentList", this.momentList);
        })
        .catch((err) => {
          console.log("错误信息", err);
        });
    },
    deleteMomentsContent(options, callback) {
      this.$http.deleteMomentsContent(options).then((res) => {
        if (callback) {
          callback(res);
        }
      });
    },
    getVideoSignatureDetail(options, callback) {
      this.$http.getVideoSignatureDetail(options).then((res) => {
        if (callback) {
          callback(res);
        }
      });
    },
    isManager() {
      this.getAuthorizeWxUserId().then(wxUserId => {
        this.getMomentsUserInList()
      })
    },
    getMomentsManager(callback) {
      this.$http.getMomentsManager().then((res) => {
        console.log("getMomentsManager管理员", res);
        if (callback) {
          callback(res);
        }
      });
    },
    getMomentsUserInList() {
      this.$http.getMomentsUserInList().then((res) => {
        console.log(res);
        this.isManagerFlag = res.data.data.userInList
      });
    },
  },
};
</script>

<style lang="less" scoped>
.top-nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #fff;
  z-index: 1997;
}
.xfo-list {
  padding: 0 20px;
  padding-top: 46px;
  background-color: #fff;
  .xfo-item {
    padding: 10px 0;
    font-size: 20px;
    font-weight: bold;
  }
  .xfo-item-content {
    padding: 10px 0;
    display: flex;
    .xfo-time {
      width: 70px;
      .day {
        font-size: 26px;
        font-weight: bold;
      }
      .month {
        font-size: 12px;
        font-weight: bold;
      }
    }
    .xfo-content {
      padding-left: 10px;
      text-align: justify;
      width: calc(100% - 70px);
    }
    .xfo-upload-btn {
      width: 80px;
      height: 80px;
      background-color: #f7f8fa;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      .van-icon {
        font-size: 30px;
        color: #dcdee0;
      }
    }
    .xfo-image-text {
      width: 100%;
    }
    .image-text {
      padding: 10px;
      margin-top: 10px;
      display: flex;
      box-sizing: border-box;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      .text {
        width: calc(100% - 54px);
        .title {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: #000000;
        }
        .content {
          text-overflow: -o-ellipsis-lastline;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          -webkit-box-orient: vertical;
          font-size: 12px;
          color: #575454;
        }
      }
      .image {
        margin-left: 10px;
      }
    }
    .xfo-video {
      .video {
        margin-top: 10px;
        position: relative;
        .xfo-btn {
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          position: absolute;
          top: 0;
          left: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          .van-icon {
            color: #fff;
            font-size: 40px;
          }
        }
      }
    }
  }
}
/deep/.vjs-custom-skin > .video-js .vjs-big-play-button {
  background-color: rgba(0, 0, 0, 0.45);
  font-size: 3.5em;
  border-radius: 50%;
  height: 1.5em !important;
  line-height: 1.5em !important;
  margin-top: -1em !important;
  margin-left: -0.75em !important;
  width: 1.5em !important;
  outline: none;
}

/deep/.video-js .vjs-big-play-button .vjs-icon-placeholder:before {
  // z-index: 999;
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
}
/deep/.vjs-custom-skin > .video-js {
  z-index: 1;
}
.van-popup {
  width: 100%;
}
.xfo-video-propup {
  width: 100%;
  // height: 200px;
}
.xfo-publish {
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  li {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100px;
    img {
      width: 44px;
      height: 44px;
    }
    p {
      text-align: center;
      margin: 0;
    }
  }
}
.xfo-btn-top-line {
  height: 5px;
  background-color: #f1f3f4;
}
.xfo-btn {
  text-align: center;
  height: 45px;
  line-height: 45px;
}
.time-and-delete {
  margin-top: 10px;
  font-size: 12px;
  .delete {
    margin-left: 10px;
    color: #294a7b;
  }
}
.noPower {
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  p {
    text-align: center;
    color: #bfbfc4;
  }
}
</style>