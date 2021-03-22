<template>
  <div class="form-div">
    <div class="form-container">
      <div class="title-bar"><span class="bar-tag"></span>视频信息</div>
      <!-- <div class="choose-time">
        <span>视频封面(视频封面显示1张,封面大小不超过3MB)</span>
      </div>
      <div class="video-div">
        <div class="video-btn">
          <van-uploader
            class="upload-div"
            :after-read="afterReadCover"
            multiple
            :max-count="1"
            :fileList="fileCover"
            accept="image/*"
            :before-delete="beforeDel"
          >
          </van-uploader>
        </div>
      </div> -->
      <div
        class="choose-time"
        v-if="playerOptions.sources && playerOptions.sources[0].src"
      >
        个人视频
      </div>
      <div
        style="width:90%;margin:20px"
        v-if="playerOptions.sources && playerOptions.sources[0].src"
      >
        <video-player
          x5-video-player-type="h5-page"
          class="video-player vjs-custom-skin"
          ref="videoPlayer"
          :playsinline="true"
          :options="playerOptions"
          v-show="vShowVideo"
        ></video-player>
      </div>

      <div class="choose-time">
        <span>上传个人视频(视频格式限制为MP4,大小不超过40MB)</span>
      </div>

      <div class="video-div">
        <van-uploader
          class="upload-div"
          :after-read="afterReadVideo"
          multiple
          :max-count="1"
          accept=".mp4"
          :fileList="videoList"
          :before-delete="beforeVideo"
          v-if="videoList.length == 0"
        >
        </van-uploader>
        <van-progress
          class="video-progress"
          :percentage="parseInt(percent * 100)"
          stroke-width="3"
          v-if="loading == true"
        />
        <div style="text-align:center">
          <van-button
            type="default"
            size="small"
            class="video-block"
            @click="sumbitUpload"
            v-if="videoFile && loading == false && showBtnSumbit && !isShowBtn"
            :disabled="loading"
            >确认上传视频</van-button
          >
          <van-button
            type="default"
            size="small"
            class="video-block"
            @click="beforeVideo"
            v-if="videoList.length != 0 && loading == false"
            :disabled="loading"
            style="margin-bottom:0 auto;"
            >重新上传视频</van-button
          >
          <van-button
            type="default"
            size="small"
            class="video-block"
            @click="deteleVideo"
            v-if="
              playerOptions.sources &&
                playerOptions.sources[0].src &&
                showPeoVideo &&
                showDelete == 1
            "
            >删除个人视频</van-button
          >
        </div>
      </div>
      <div
        class="choose-time"
        v-if="playerOptionsTwo.sources && playerOptionsTwo.sources[0].src"
      >
        企业视频
      </div>
      <div
        style="width:90%;margin:20px"
        v-if="playerOptionsTwo.sources && playerOptionsTwo.sources[0].src"
      >
        <video-player
          x5-video-player-type="h5-page"
          class="video-player vjs-custom-skin"
          ref="videoPlayer"
          :playsinline="true"
          :options="playerOptionsTwo"
          v-show="vShowVideo"
        ></video-player>
      </div>
      <div
        style="text-align:center"
        v-if="
          playerOptionsTwo.sources && playerOptionsTwo.sources[0].src && qiyeBtn
        "
      >
        <van-button
          type="default"
          size="small"
          @click="chooseEnVideo"
          :class="activeChoo ? 'active' : 'chooseAc'"
          >使用企业视频</van-button
        >
        <div style="color:#646566;margin-top:5px">
          选择使用企业视频,个人视频将会被清空
        </div>
      </div>

      <!-- <div
        style="padding: 10px 15px 5px 15px;
      color: #646566;"
      >
        选择视频
      </div> -->
      <!-- <van-radio-group v-model="isNow" style="margin: 15px 0 0 15px;">
        <van-radio name="1" v-if="showPeoVideo">个人视频</van-radio>
        <van-radio name="2" v-if="playerOptionsTwo.sources[0].src != ''"
          >企业视频(选择企业视频,个人视频将会被清空)</van-radio
        >
      </van-radio-group> -->

      <div class="sumbit-btn" v-show="vShowVideo">
        <van-button
          type="default"
          size="small"
          class="cancel"
          @click="cancelBtn"
          >取消</van-button
        >
        <van-button
          type="default"
          size="small"
          class="sumbit"
          @click="sumbitBtn"
          :disabled="isOk"
          >保存</van-button
        >
      </div>
    </div>

    <van-dialog
      v-model="isDelete"
      show-cancel-button
      class="pupup-div"
      title="确认删除个人视频"
      @confirm="deleteCon"
      @cancel="deleteCan"
    >
    </van-dialog>
    <!-- <van-dialog
      v-model="isChoose"
      show-cancel-button
      class="pupup-div"
      title="确认选择企业视频"
      @confirm="chooseCon"
      @cancel="chooseCan"
    >
    </van-dialog> -->
  </div>
</template>

<script>
import { Notify } from "vant";
import { videoPlayer } from "vue-video-player";
export default {
  data() {
    return {
      model: {},
      fileCover: [],
      videoList: [],
      loading: false,
      isUpload: false,
      coverFile: null,
      videoFile: null,
      uploader: {},
      percent: 0,
      isShow: false,
      playerOptions: {
        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            src: "", // 路径
            type: "video/mp4", // 类型
          },
        ],
        poster: "", //你的封面地址
        width: document.documentElement.clientWidth,
        notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true, //全屏按钮
        },
      },
      playerOptionsTwo: {
        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            src: "", // 路径
            type: "video/mp4", // 类型
          },
        ],
        poster: "", //你的封面地址
        width: document.documentElement.clientWidth,
        notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true, //全屏按钮
        },
      },
      isNow: 1,
      isDelete: false,
      showPeoVideo: false,
      showDelete: 1,
      vShowVideo: true,
      // isChoose: false,
      showBtnSumbit: false,
      activeChoo: false,
      isShowBtn: false,
      qiyeBtn: true,
      isUploadShow: true,
      uploadNum: 0,
      isOk: false,
    };
  },
  methods: {
    //弹窗确认
    chooseCon() {
      this.vShowVideo = true;
      this.model.videoUrl = "";
      if (this.model.educationExperiences == null) {
        this.model.educationExperiences = [];
        this.model.educationExperiences.push({
          school: "",
          startYear: "",
          endYear: "",
          speciality: "",
          degree: "",
        });
      }
      this.model.educationExperiences.forEach((items) => {
        if (
          items.degree == "" &&
          items.school == "" &&
          items.startYear == "" &&
          items.endYear == "" &&
          items.speciality == ""
        ) {
          this.model.educationExperiences = null;
        }
      });
      this.$http.updateBussiness(this.model).then((res) => {
        if (res.data.code == 20000) {
          Notify({
            type: "success",
            message: "保存成功",
          });
          this.playerOptions.sources[0].src = "";
          this.showPeoVideo = false;
          this.isNow = "0";
          this.getCardIntroduction();
          this.getComPage();
        } else {
          Notify({
            type: "success",
            message: res.data.message,
          });
        }
      });
    },
    //弹窗取消
    chooseCan() {
      this.vShowVideo = true;
    },
    //点击选择企业视频，个人视频将会被清空
    chooseEnVideo() {
      this.activeChoo = !this.activeChoo;
      if (!this.activeChoo) {
        this.isNow = "1";
      }
      if (this.activeChoo) {
        this.isNow = "2";
        this.isUploadShow = true;
        this.uploadNum = 0;
        console.log("进来了");
      }
    },
    //弹窗确认删除
    deleteCon() {
      this.model.videoId = "";
      this.model.videoUrl = "";
      if (this.model.educationExperiences == null) {
        this.model.educationExperiences = [];
        this.model.educationExperiences.push({
          school: "",
          startYear: "",
          endYear: "",
          speciality: "",
          degree: "",
        });
      }
      this.model.educationExperiences.forEach((items) => {
        if (
          items.degree == "" &&
          items.school == "" &&
          items.startYear == "" &&
          items.endYear == "" &&
          items.speciality == ""
        ) {
          this.model.educationExperiences = null;
        }
      });
      this.$http.updateBussiness(this.model).then((res) => {
        if (res.data.code == 20000) {
          Notify({
            type: "success",
            message: "删除成功",
          });
          this.playerOptions.sources[0].src = "";
          this.showPeoVideo = false;
          this.isNow = "0";
          this.videoList = [];
          this.getCardIntroduction();
          this.getComPage();
        } else {
          Notify({
            type: "success",
            message: res.data.message,
          });
        }

        // this.getCardIntroduction();
      });
      this.isDelete = false;
      this.vShowVideo = true;
    },
    //弹窗取消删除
    deleteCan() {
      this.isDelete = false;
      this.vShowVideo = true;
    },
    //点击取消按钮
    cancelBtn() {
      this.$router.back();
    },
    sumbitBtn() {
      if (this.model.educationExperiences == null) {
        this.model.educationExperiences = [];
        this.model.educationExperiences.push({
          school: "",
          startYear: "",
          endYear: "",
          speciality: "",
          degree: "",
        });
      }
      this.model.educationExperiences.forEach((items) => {
        if (
          items.degree == "" &&
          items.school == "" &&
          items.startYear == "" &&
          items.endYear == "" &&
          items.speciality == ""
        ) {
          this.model.educationExperiences = null;
        }
      });
      // if (this.videoFile != null) {
      //   if (this.coverFile == null) {
      //     Notify({
      //       type: "warning",
      //       message: "请重新上传封面",
      //     });
      //     return;
      //   }
      //   if (this.isUpload == false) {
      //     Notify({
      //       type: "warning",
      //       message: "请点击确认上传",
      //     });
      //     return;
      //   }
      // }
      if (this.isUpload == true) {
        if (this.percent != 1) {
          Notify({
            type: "warning",
            message: "请等待视频上传完成再进行保存",
          });
          return;
        }
      }
      if (this.isUploadShow == false && this.uploadNum != 1) {
        Notify({
          type: "warning",
          message: "请先确认上传视频",
        });
        return;
      }
      // if (this.coverFile != null) {
      if (this.isNow == 1) {
        if (this.model.videoUrl == "") {
          this.updateBussiness(this.model);
          console.log("个人视频为空");
          return;
        } else {
          console.log(this.model);
          this.updateBussiness(this.model);
        }
      } else if (this.isNow == 2) {
        this.model.videoUrl = "";
        this.updateBussiness(this.model);
      }

      // if (this.videoFile == null) {
      //   Notify({
      //     type: "warning",
      //     message: "请重新上传视频",
      //   });
      //   return;
      // }
      // // }
      // if (this.isUpload == true) {
      //   if (this.percent != 1) {
      //     Notify({
      //       type: "warning",
      //       message: "请等待视频上传完成再进行保存",
      //     });
      //     return;
      //   }
      // }
      // if (this.model.tags != null) {
      //   this.model.tags.forEach((item) => {
      //     item.id = "";
      //   });
      // }
      // if (this.model.slogan == "" || this.model.slogan == null) {
      //   this.model.slogan = "你好,很高兴认识你";
      // }
      // console.log(this.model);
      // this.updateBussiness(this.model);
    },
    //修改接口
    updateBussiness(params) {
      this.$http.updateBussiness(params).then(() => {
        Notify({
          type: "success",
          message: "保存成功",
        });
        this.$router.back();
        // this.getCardIntroduction();
      });
    },
    //删除视频事件
    beforeVideo(file) {
      if (this.videoList.length != 0) {
        this.videoList.splice(0, 1);
      }
      this.isShow = true;
      this.showDelete = 2;
      this.showBtnSumbit = false;
      this.isShowBtn = false;
      this.uploadNum = 0;
    },
    //点击删除个人视频
    deteleVideo() {
      this.isDelete = true;
      this.vShowVideo = false;
    },
    sumbitUpload() {
      this.isUpload = !this.isUpload;
      this.isShow = false;
      this.model.videoCover = "";
      this.showDelete = 3;
      this.isOk = true;
      console.log(this.isUpload);
      // if (this.videoFile != null) {
      //   if (this.coverFile == null) {
      //     Notify({
      //       type: "warning",
      //       message: "请重新上传封面",
      //     });
      //     return;
      //   }
      // }
      // if (this.coverFile != null) {
      //   if (this.videoFile == null) {
      //     Notify({
      //       type: "warning",
      //       message: "请重新上传视频",
      //     });
      //     return;
      //   }
      // }
      this.uploadFile();
    },
    getSignature() {
      return this.$http.uploadVideoSignature().then((res) => {
        return res.data.data.signature;
      });
    },
    uploadFile(file) {
      this.loading = true;
      this.percent = 0;
      try {
        const tcVod = new TcVod.default({
          getSignature: this.getSignature, // 前文中所述的获取上传签名的函数
        });
        const uploader = tcVod.upload({
          mediaFile: this.videoFile, // 视频文件，类型为 File
          // coverFile: this.coverFile, // 封面文件，类型为 File
        });

        this.uploader = uploader;
        console.log(this.uploader);
        uploader.on("media_progress", (info) => {
          this.percent = info.percent;
          if (this.percent >= 0.99) {
            this.percent = 0.99;
            setTimeout(() => {
              this.percent = 1;
            });
          }
          // console.log('上传进度==》'+info.percent) // 进度
        });

        uploader
          .done()
          .then((doneResult) => {
            this.loading = false;
            this.model.videoId = doneResult.fileId;
            this.model.videoUrl = doneResult.video.url;
            this.showPeoVideo = true;
            this.isNow = "1";
            this.playerOptions.sources[0].src = this.model.videoUrl;
            this.isShowBtn = true;
            this.qiyeBtn = true;
            this.uploadNum = 1;
            this.isUploadShow = true;
            this.isOk = false;
          })
          .catch((err) => {
            this.loading = false;
            this.showPeoVideo = false;
            this.isNow = "0";

            let errMsg =
              err && err.data && err.data.data.message
                ? err.data.data.message
                : JSON.stringify(err);
            Notify({
              type: "warning",
              message: "上传失败",
            });
          });
      } catch (err) {
        this.loading = false;
        this.showPeoVideo = false;
        this.isNow = "0";
        Notify({
          type: "warning",
          message: "上传失败",
        });
      }
    },
    //删除封面图前的回调事件
    beforeDel(file) {
      this.fileCover.forEach((item, index) => {
        if (item == file) {
          this.fileCover.splice(index, 1);
        }
      });
    },
    //上传视频封面时候的回调事件
    async afterReadCover(obj, detail) {
      // // 将上传后获取到的file文件赋值给coverFile，
      let imgFile = obj.file;
      // //定义一个空的对象，

      let _file = {
        content: obj.content,
        url: "",
        status: "uploading",
        message: "上传中...",
      };
      // //然后追加到数组的最后一项
      this.fileCover.push(_file);

      // //判断图片的大小。如果不超过0.5MB
      if (imgFile.size <= 0.5 * 1024 * 1024) {
        _file.message = "上传中";
        this.fileCover.splice(this.fileCover.length - 1, 1, {
          content: obj.content,
          url: "",
          status: "done",
          message: "上传成功",
        });
        this.coverFile = obj.file;
        return;
      }
      this.zipImgPromise(imgFile)
        .then(async (blob) => {
          // 压缩后的图片还是超过大小限制
          if (blob.size > 3 * 1024 * 1024) {
            _file.status = "failed";
            _file.message = "图片不能大于 3Mb";
            return;
          }
          console.log("进来了1");
          this.fileCover.splice(this.fileCover.length - 1, 1, {
            content: obj.content,
            url: "",
            status: "done",
            message: "上传成功",
          });
          this.coverFile = obj.file;
        })
        .catch(async (error) => {
          // 处理zipImgPromise和前一个回调函数运行时发生的错误
          console.log("压缩图片发生错误", error);
          this.$toast("压缩失败");
          // 不压缩继续上传
          _file.message = "上传中...";
          console.log("进来了2");
          // 先删除前面插入的占位数据，再传入成功的数据
          this.fileCover.splice(this.fileCover.length - 1, 1, {
            content: obj.content,
            url: "",
            status: "done",
            message: "上传成功",
          });
          this.coverFile = obj.file;
        });
    },
    //上传视频的回调事件
    afterReadVideo(obj) {
      if (obj.file.type != "video/mp4") {
        Notify({ type: "warning", message: "请上传视频文件" });
        return;
      }
      let videoFile = obj.file;
      let _file = {
        content: obj.content,
        url: "",
        status: "uploading",
        message: "上传中...",
      };
      if (videoFile.size >= 40 * 1024 * 1024) {
        // _file.message = "视频不能大于 10Mb";
        Notify({
          type: "warning",
          message: "视频不能大于40MB",
        });
        return;
      }
      this.videoList.push(_file);
      this.videoFile = videoFile;
      this.showBtnSumbit = true;
      this.isUploadShow = false;
    },

    authorizeLogin(code) {
      this.$http.authorizeLogin({ code }).then((res) => {
        // 将是否需要登录的参数值设为false，表示不再需要登录
        if (res.data.code === 20000) {
          this.authorizeUserId = res.data.data.userId;

          this.getCardIntroduction();
          this.getComPage();
          this.$store.commit("updateIsLogin", false);
        } else if (res.data.code === 12003) {
          this.checkLoginStatus();
        }
      });
    },
    checkLoginStatus() {
      this.$http.getLoginStatus().then((res) => {
        this.authorizeUserId = res.data.data.wxUserId;
        this.getCardIntroduction();
        this.getComPage();
      });
    },
    setUserId() {
      this.$http
        .setUserId({ userId: "1b69782562ac42c48c725c3b2940ea8d" })
        .then(() => {
          // this.$nextTick(() => {
          this.getCardIntroduction();
          this.getComPage();
        });
    },
    getCardIntroduction() {
      this.$http.getCardIntroduction().then((res) => {
        this.model = res.data.data;
        if (this.model.videoCover) {
          this.fileCover = this.model.videoCover.split(",").map((s) => {
            return {
              url: s,
              status: "done",
              message: "",
            };
          });
        }
        if (this.model.videoUrl) {
          this.videoList = this.model.videoUrl.split(",").map((s) => {
            return {
              url: s,
              status: "done",
              message: "",
            };
          });
        }
        if (this.model.educationExperiences == null) {
          this.model.educationExperiences = [];
          this.model.educationExperiences.push({
            school: "",
            startYear: "",
            endYear: "",
            speciality: "",
            degree: "",
          });
        }
        if (this.model.videoUrl && this.model.videoUrl != "") {
          this.playerOptions.sources[0].src = this.model.videoUrl;
          this.showPeoVideo = true;
          this.isNow = "1";
          this.showDelete = 1;
        } else {
          this.isNow = "2";
          this.qiyeBtn = false;
        }
      });
    },
    getComPage() {
      this.$http.getComPage().then((resData) => {
        let data = resData.data.data;
        this.playerOptionsTwo.sources[0].src = data.videoUrl;
        if (this.model.videoUrl == "") {
          this.isNow = "2";
        }
      });
    },
  },
  created() {
    this.setUserId();
    // if (this.$route.query.code && this.$store.state.isLogin) {
    //   let code = this.$route.query.code;
    //   this.authorizeLogin(code);
    // } else {
    //   this.checkLoginStatus();
    // }
  },
};
</script>

<style lang="less" scoped>
.form-div {
  width: 100%;
  height: 100%;
  .form-container {
    width: 100%;
    height: 100%;
    padding: 10px 0 70px 0;
    background-color: #fff;
    .choose-time {
      display: flex;
      justify-content: space-between;
      padding: 10px 15px;
      color: #646566;
      .add-icon {
        font-size: 20px;
      }
    }
    .education-item {
      padding: 10px 20px;
      background-color: #fff;
      .item-tags {
        display: flex;
        .van-field {
          border-bottom: 1px solid #f5f6f7;
        }
        .icon-minu {
          margin: 10px 0px 0 10px;
          color: #646566;
          font-size: 20px;
        }
      }
      .item {
        display: flex;
        div {
          .flex-input {
            display: flex;
          }
        }
        .icon-minu {
          margin: 10px 0px 0 10px;
          color: #646566;
          font-size: 20px;
        }
      }
    }
    .images-item {
      .images-text {
        color: #646566;
        padding: 10px 15px;
      }
      .picup {
        margin-left: 45px;
        width: 80%;
      }
    }
    .sumbit-btn {
      width: 100%;
      background-color: #fff;
      position: fixed;
      bottom: 0;
      z-index: 9999;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 10px 0;
      .cancel {
        border-radius: 5px;
        padding: 0 20px;
        margin-right: 10px;
      }
      .sumbit {
        border-radius: 5px;
        padding: 0 20px;
        background-color: #294a7b;
        color: #fff;
      }
    }
    .video-div {
      padding: 5px 20px 5px 15px;
      .video-block {
        // margin-left: 10px;
        border-radius: 5px;
        padding: 5px 10px;
        color: #646566;
        border: 1px solid green;
        &:nth-child(2) {
          margin-left: 20px;
        }
      }
      .video-progress {
        margin-bottom: 20px;
      }
    }
  }
}
.picup-ppt {
  margin-left: 45px;
  border-radius: 5px;
  padding: 5px 10px;
  color: #646566;
  border: 1px solid green;
}
.upload-text {
  margin: 10px 0 10px 20px;
  border-radius: 5px;
  padding: 5px 10px;
  color: #646566;
  border: 1px solid green;
  &-two {
    margin: 10px 0 10px 45px;
    border-radius: 5px;
    padding: 5px 10px;
    color: #646566;
    border: 1px solid green;
  }
}
/deep/.van-dialog__header {
  color: #646566;
  margin: 0 20px;
  // padding: 0 20px;
}
.loading-div {
  margin: 0 0 10px 45px;
  padding: 10px 0;
}
.upclass {
  margin-left: 45px;
}
.title-bar {
  display: flex;
  align-items: center;
  // font-size: 13px;
  font-weight: bold;
  color: #222222;
  margin: 12px 0;
  .bar-tag {
    width: 4px;
    height: 12px;
    border-radius: 2px;
    background-color: #4f73ad;
    margin-right: 8px;
  }
  .bar-tips {
    font-weight: normal;
    color: #5e6166;
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
/deep/.van-radio__label {
  color: #646566;
}
/deep/.van-radio {
  margin-bottom: 5px;
}
.active {
  background-color: #294a7b;
  border: none;
  color: #fff;
  border-radius: 5px;
  padding: 5px 10px;
}
.chooseAc {
  border-radius: 5px;
  padding: 5px 10px;
  color: #646566;
  border: 1px solid green;
}
</style>
