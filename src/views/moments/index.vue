<template>
  <div class="detail" >
    <div class="d-header">
      <img src="../../assets/moment_default-cover.jpg" class="cover" />
      <div class="user">
        <div class="name">{{ member.name }}</div>
        <img :src="member.avatar" class="avatar" />
      </div>
      <!-- <van-icon
        name="add-o"
        color="#ffffff"
        class="ellipsis-icon"
        @click="createVanPopup = true"
        v-if="customerId"
      /> -->
    </div>
    <div class="d-content" v-if="!loading">
      <van-pull-refresh
        v-if="list.length > 0"
        :disabled="true"
        v-model="refreshing"
        @refresh="onRefresh"
      >
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="已到底了"
          @load="onLoad"
        >
          <div class="list-item" v-for="(item, index) in list" :key="index">
            <!-- <div class="item-left">
              <img class="left-img" :src="member.avatar" alt=""/>
            </div> -->
            <div class="item-left">
              <div
                class="left-time"
                v-html="formatterTime(item.pushTime)"
              ></div>
            </div>
            <div class="item-right">
              <!-- <div class="title">{{member.name}}@{{member.companyAbbreviation}}</div> -->
              <div class="content" v-html="parsingEmoji(item.content)">
                <!-- <div class="content" v-html="parsingEmojiImg(item.content)"> -->
                <!-- {{item.content}} -->
              </div>
              <!-- 图文素材类型，-1无，1图片，2视频，3图文链接 -->
              <template
                v-if="
                  item.momentsUploadContentList.length != 0 &&
                  item.momentsUploadContentList[0].type === '1'
                "
              >
                <div class="material">
                  <div
                    class="single-content"
                    v-if="item.momentsUploadContentList.length === 1"
                  >
                    <img
                      class="single-img"
                      :src="`${imgUrl}${item.momentsUploadContentList[0].url}`"
                      alt=""
                      @click="
                        handleImagePreview(item.momentsUploadContentList[0].url)
                      "
                    />
                  </div>
                  <div
                    class="four-content"
                    v-else-if="item.momentsUploadContentList.length === 4"
                  >
                    <img
                      class="four-img"
                      v-for="(obj, idx) in item.momentsUploadContentList"
                      :key="idx"
                      :src="`${imgUrl}${obj.url}`"
                      alt=""
                      @click="handleImagePreview(obj.url)"
                    />
                  </div>
                  <div class="multi-content" v-else>
                    <img
                      class="multi-img"
                      v-for="(obj, idx) in item.momentsUploadContentList"
                      :key="idx"
                      :src="`${imgUrl}${obj.url}`"
                      alt=""
                      @click="handleImagePreview(obj.url)"
                    />
                  </div>
                </div>
              </template>
              <template
                v-if="
                  item.momentsUploadContentList.length != 0 &&
                  item.momentsUploadContentList[0].type === '2'
                "
              >
                <div class="material">
                  <div class="video-wrapper">
                    <video
                      class="video-class"
                      :src="item.momentsUploadContentList[0].url"
                    ></video>
                    <div
                      class="wrapper-dark"
                      @click="showVideoDetail(item.momentsUploadContentList[0])"
                    >
                      <van-icon name="play-circle" class="play-icon" />
                    </div>
                  </div>
                </div>
              </template>
              <!-- 图文链接开始 -->
              <template
                v-if="
                  item.momentsUploadContentList.length != 0 &&
                  item.momentsUploadContentList[0].type === '3'
                "
              >
                <div class="material">
                  <div
                    class="link-box"
                    @click="openLink(item.momentsUploadContentList[0])"
                  >
                    <div class="left">
                      <div class="title">
                        {{ item.momentsUploadContentList[0].title }}
                      </div>
                      <div class="desc">
                        {{ item.momentsUploadContentList[0].description }}
                      </div>
                    </div>
                    <img
                      class="cover"
                      :src="`${imgUrl}${item.momentsUploadContentList[0].url}`"
                      alt=""
                    />
                  </div>
                </div>
              </template>
              <!-- 图文链接结束 -->
              <div class="push-time">
                {{ item.pushTime | formatPushTime }}
                <!-- <span class="push-time-delete" @click="momentDelete(index)"
                  >删除</span> -->
              </div>
            </div>
          </div>
        </van-list>
      </van-pull-refresh>
      <van-empty v-if="list.length <= 0" description="还没有发表朋友圈">
        <template #image>
          <img src="../../assets/empty-data.png" />
        </template>
      </van-empty>
    </div>
    <!-- 视频播放弹窗 -->
    <van-overlay :show="videoOverlay.show" class="van-overlay">
      <div class="overlay-wrapper">
        <video
          class="video-class"
          :src="videoOverlay.videoUrl"
          controls
          playsinline
          webkit-playsinline
          x5-playinline
        ></video>
        <!-- <video v-else style="width: 100%; height: 100%" :src="videoOverlay.videoUrl" controls></video> -->
        <div class="close-icon" @click="closeVideoPreview">
          <van-icon name="cross" class="cross" />
        </div>
      </div>
    </van-overlay>
    <!-- <van-overlay
      :show="loading"
      class="loading-overlay"
    >
      <div class="loading-wrapper">
        <img class="loading-img" src="../../assets/loading.gif"/>
      </div>
    </van-overlay> -->
    <!-- <van-overlay
      :show="qrCodeOverlay.show"
      class="van-overlay"
    >
      <div class="overlay-wrapper">
        <div class="qrcode-content">
          <img class="qrcode-img" src="../../assets/moment_default-cover.jpg" alt="" />
          <div class="qrcode-tips">长按识别二维码，添加xxx的企业微信</div>
        </div>
        <div class="close-icon" @click="closeQrCodePreview">
          <van-icon name="cross" class="cross" />
        </div>
      </div>
    </van-overlay> -->
    <van-popup
      v-model="createVanPopup"
      round
      position="bottom"
      :style="{ height: '150px' }"
    >
      <ul class="xfo-publish">
        <li @click="$router.push('/moments/create?type=text')">
          <img src="../../assets/wenzi.png" alt="" />
          <p>文字</p>
        </li>
        <li @click="$router.push('/moments/create?type=image')">
          <img src="../../assets/tupian.png" alt="" />
          <p>图片</p>
        </li>
        <li @click="$router.push('/moments/create?type=video')">
          <img src="../../assets/shipin.png" alt="" />
          <p>视频</p>
        </li>
        <li @click="$router.push('/moments/create?type=imageText')">
          <img src="../../assets/tuwen.png" alt="" />
          <p>图文链接</p>
        </li>
      </ul>
      <div class="xfo-btn-top-line"></div>
      <div class="xfo-btn" @click="createVanPopup = false">取消</div>
      <!-- <div class="xfo-line"></div> -->
      <!-- <ul class="xfo-cancel">
      </ul> -->
    </van-popup>
  </div>
</template>

<script>
import {
  List,
  PullRefresh,
  ImagePreview,
  Icon,
  Overlay,
  Empty,
  Loading,
  Popup,
  Toast,
} from "vant";
export default {
  components: {
    vanList: List,
    vanPullRefresh: PullRefresh,
    vanIcon: Icon,
    vanOverlay: Overlay,
    vanEmpty: Empty,
    vanLoading: Loading,
    vanPopup: Popup,
    Toast,
  },
  data() {
    return {
      height: "400px",
      loading: true,
      finished: false,
      refreshing: false,
      videoOverlay: {
        show: false,
        videoUrl: "",
      },
      list: [],
      page: {
        pageNum: 0,
        pageSize: 20,
        total: 0,
      },
      memberId: "", // 成员id
      member: {},
      qrCodeOverlay: {
        // 员工二维码
        show: false,
        qrCodeUrl: "",
      },
      createVanPopup: false,
      customerId: "",
    };
  },
  created() {
    if (this.$route.query.userId) {
      //   sessionStorage.setItem("momentId", this.$route.query.id);
      this.memberId = this.$route.query.userId;
      this.loading = true;
      this.getMemberDetail();
      this.onLoad();
    }
    // let id = sessionStorage.getItem("momentId");
    // this.memberId = id;
    // this.loading = true;
    // this.getMemberDetail();
    // this.onLoad();
    // this.oursSetPower("customerId");
  },
  mounted() {
    this.$nextTick(() => {
      // document.title = '企业动态'
      document.title = "动态圈";
      this.fullHeight();
      window.onresize = () => {
        this.fullHeight();
      };
    });
  },
  destroyed() {
    window.onresize = "";
  },
  filters: {
    // 格式化时间，刚刚，几分钟前，今天12:30，昨天12:24，9月8日
    formatPushTime(time) {
      let result = "";
      let date = new Date(time.replace(/\-/g, "/"));
      let now = new Date();
      let pubilshTime = parseInt(date.getTime() / 1000);
      let nowTime = parseInt(now.getTime() / 1000);
      let d = nowTime - pubilshTime;
      // let d_days = parseInt(d / 86400)
      let d_days = parseInt(
        parseInt(nowTime / 86400) - parseInt(pubilshTime / 86400)
      );
      let d_hours = parseInt(d / 3600);
      let d_minutes = parseInt(d / 60);
      let d_seconds = parseInt(d);
      // console.log('天数' + d_days + '-' + nowTime + '-' + pubilshTime)
      if (d_days <= 0) {
        if (d_seconds < 60) {
          result = "刚刚";
        } else if (d_hours <= 0 && d_minutes > 0) {
          result = d_minutes + "分钟前";
        }
      } else {
        result = time ? time.slice(0, 16) : "";
      }
      return result;
    },
    // formatPushTime(time) {
    //   return time ? time.slice(0, 16) : ''
    // }
  },
  methods: {
    momentDelete(index) {
      console.log(this.list[index]);
      let options = {
        id: this.list[index].id,
      };
      this.momentsDelete(options, (res) => {
        Toast.success("删除成功");
        this.onRefresh();
      });
    },
    momentsDelete(options, callback) {
      this.$http.momentsDelete(options).then((res) => {
        if (callback) {
          callback(res);
        }
      });
    },
    fullHeight() {
      this.height = window.innerHeight + "px";
    },
    getMemberDetail() {
      let id = this.memberId;
      this.$http.getWxCropUser({ id }).then((res) => {
        this.member = res.data.data;
      });
    },
    onLoad() {
      if (this.refreshing) {
        this.list = [];
        this.refreshing = false;
      }
      this.page.pageNum = this.page.pageNum + 1;
      let params = {
        id: this.memberId,
        pageSize: this.page.pageSize,
        pageNum: this.page.pageNum,
      };
      this.$http.getMomentsPage(params).then((res) => {
        this.loading = false;
        this.list = res.data.data.list;
        this.page.total = res.data.data.total;
        // list.forEach((item) => {
        //   this.list.push(item);
        // });
        // console.log('接口数据',list);
        // console.log(this.list);
        if (this.list.length >= this.page.total) {
          this.finished = true;
        }
      });
    },
    // 重新加载数据
    onRefresh() {
      this.page.pageNum = 0;
      this.finished = false;
      this.loading = true;
      this.onLoad();
    },
    // 图片预览
    handleImagePreview(url) {
      let imageUrl = this.imgUrl + url;
      ImagePreview({
        images: [imageUrl],
        closeable: true,
      });
    },
    // 查看视频
    showVideoDetail(obj) {
      let fileId = obj.fileId;
      this.$http.getVideoSignatureDetail({ fileId }).then((res) => {
        let videoUrl =
          res.data.data.file.url + res.data.data.playSignature.queryString;
        this.videoOverlay.show = true;
        this.videoOverlay.videoUrl = videoUrl;
      });
    },
    // 关闭视频
    closeVideoPreview() {
      this.videoOverlay.show = false;
      this.videoOverlay.videoUrl = "";
    },
    // 打开链接
    openLink(obj) {
      window.open(obj.link);
    },
    // 左边的时间格式
    formatterTime(time) {
      let result = "";
      let date = new Date(time.replace(/\-/g, "/"));
      let now = new Date();
      let pubilshTime = parseInt(date.getTime() / 1000);
      let nowTime = parseInt(now.getTime() / 1000);
      let d = nowTime - pubilshTime;
      // let d_days = parseInt(d / 86400)
      let d_days = parseInt(
        parseInt(nowTime / 86400) - parseInt(pubilshTime / 86400)
      );
      let d_hours = parseInt(d / 3600);
      let d_minutes = parseInt(d / 60);
      let d_seconds = parseInt(d);
      // console.log('天数' + d_days + '-' + nowTime + '-' + pubilshTime)
      if (d_days <= 0) {
        // if (d_seconds < 60) {
        //   result = '刚刚'
        // } else if (d_hours <= 0 && d_minutes > 0) {
        //   result = d_minutes + '分钟前'
        // } else {
        //   result = '今天' + date.getHours() + '点'
        // }
        result = "今天";
      } else if (d_days > 0 && d_days < 2) {
        // result = '昨天' + date.getHours() + '点'
        result = "昨天";
      } else {
        // result = (date.getMonth() + 1) + '月' + date.getDate() + '日'
        result =
          '<span class="time-bold">' +
          `${date.getDate() <= 9 ? "0" + date.getDate() : date.getDate()}` +
          '</span><span class="time-normal">' +
          `${
            date.getMonth() + 1 <= 9
              ? "0" + (date.getMonth() + 1) + "月"
              : date.getMonth() + 1 + "月"
          }` +
          "</span>";
      }
      return result;
    },
    closeQrCodePreview() {
      this.qrCodeOverlay.show = false;
    },
  },
};
</script>

<style lang="less" scoped>
.detail {
  overflow: auto;
  box-sizing: border-box;
  background-color: #ffffff;
  .d-header {
    position: relative;
    height: 245px;
    .cover {
      position: absolute;
      z-index: 1;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      -o-object-fit: cover;
      object-fit: cover;
    }
    .user {
      position: absolute;
      bottom: -20px;
      right: 20px;
      z-index: 10;
      display: flex;
      .name {
        font-size: 24px;
        color: #fff;
        text-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
        margin-right: 10px;
        text-align: right;
      }
      .avatar {
        width: 66px;
        height: 66px;
        border-radius: 6px;
      }
    }
    .ellipsis-icon {
      position: absolute;
      z-index: 1000;
      font-size: 30px;
      top: 15px;
      right: 15px;
    }
  }
  .d-content {
    padding-top: 20px;
    .list-item {
      display: flex;
      border-bottom: 1px solid #f7f8fa;
      padding: 18px 18px 10px 18px;
      .item-left {
        width: 70px;
        .left-img {
          width: 40px;
          height: 40px;
          border-radius: 3px;
          overflow: hidden;
        }
        .left-time {
          font-weight: bold;
          font-size: 28px;
        }
      }
      .item-right {
        line-height: 24px;
        width: calc(100% - 70px);
        .title {
          font-weight: bold;
        }
        .content {
          font-size: 16px;
        }
        .material {
          margin-top: 10px;
          .single-content {
            overflow: hidden;
            .single-img {
              max-height: 160px;
              max-width: 100%;
              cursor: pointer;
            }
          }
          .four-content {
            display: flex;
            flex-flow: wrap;
            max-width: 180px;
            .four-img {
              width: 75px;
              height: 75px;
              margin: 0 10px 10px 0;
              cursor: pointer;
            }
          }
          .multi-content {
            display: flex;
            flex-flow: wrap;
            max-width: 280px;
            .multi-img {
              width: 75px;
              height: 75px;
              margin: 0 10px 10px 0;
              cursor: pointer;
            }
          }
          .video-wrapper {
            width: 160px;
            height: 120px;
            position: relative;
            margin: 0 10px 10px 0;
            .video-class {
              width: 160px;
              height: 120px;
            }
            .wrapper-dark {
              position: absolute;
              width: 160px;
              height: 120px;
              left: 0;
              top: 0;
              display: flex;
              justify-content: center;
              align-items: center;
              cursor: pointer;
              background-color: #222222;
              .play-icon {
                font-size: 32px;
                color: grey;
                background-color: #ffffff;
                border-radius: 16px;
              }
            }
          }
          .link-box {
            display: flex;
            width: 100%;
            padding: 10px;
            box-sizing: border-box;
            background: #f8f8f8;
            cursor: pointer;
            margin-bottom: 10px;
            .left {
              width: calc(100% - 70px);
              margin-right: 10px;
              .title {
                line-height: 24px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
              }
              .desc {
                line-height: 20px;
                color: #909399;
                overflow: hidden;
                -webkit-line-clamp: 2;
                line-clamp: 2;
                -webkit-box-orient: vertical;
                box-orient: vertical;
                display: -webkit-box;
                display: -moz-box;
              }
            }
            .cover {
              width: 60px;
              height: 60px;
            }
          }
        }
      }
      .push-time {
        color: #969799;
        .push-time-delete {
          font-size: 12px;
          color: #4e73ad;
          margin-left: 10px;
        }
      }
    }
  }
}
.van-overlay {
  background-color: rgba(0, 0, 0, 1);
  position: absolute;
  z-index: 999;
}
.overlay-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  position: relative;
  z-index: 999;
  .video-class {
    width: 100%;
    height: 280px;
  }
  .close-icon {
    position: absolute;
    top: 20px;
    right: 10px;
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
.loading-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.loading-overlay {
  background-color: rgba(0, 0, 0, 0);
}
.loading-img {
  width: 75px;
}
.qrcode-content {
  text-align: center;
  color: #ffffff;
  .qrcode-img {
    width: 200px;
    height: 200px;
  }
  .qrcode-tips {
    margin: 10px 20px;
  }
}
/deep/ .time-bold {
  font-size: 26px;
  margin-right: 0px;
}
/deep/ .time-normal {
  font-size: 12px;
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
.xfo-line {
  width: 100%;
  height: 4px;
  background-color: #f2f2f2;
}
.xfo-cancel {
  li {
    height: 36px;
    text-align: center;
    line-height: 36px;
  }
}
</style>