<template>
  <div class="form-div">
    <div class="form-container">
      <div class="title-bar"><span class="bar-tag"></span>图片信息</div>
      <div class="images-item">
        <div class="images-text">
          <span>我的照片（支持图片/PPT/PDF，单张图片像素不可大于5MB） </span>
        </div>
        <UploadImage
          :fileList="fileList"
          :count="100"
          :multiple="true"
          class="upclass"
          @success="success"
        ></UploadImage>

        <!-- <div class="images-text"><span>上传ppt转图片 </span></div>
        <van-uploader
          class="picup"
          :after-read="afterPpt"
          accept=".ppt,.pptx"
          v-if="upshow == true"
        ></van-uploader>
        <div class="loading-div" v-if="pptLoading == true">
          <van-loading size="24px">上传中...</van-loading>
        </div>
        <span class="upload-text-two" v-if="upshow == false" @click="openShow"
          >点击上传ppt转图片</span
        >
        <span class="upload-text" v-if="haveShow == true && pptLoading == false"
          >ppt已上传
        </span> -->
      </div>
      <!-- <van-dialog
        v-model="show"
        title="上传后，原本图片将被ppt转换后的图片覆盖。根据ppt文件大小，上传和转换时间将花费几分钟或几十分钟不等，转换成功后自动覆盖。是否继续上传ppt？"
        show-cancel-button
      >
      </van-dialog> -->
      <div class="sumbit-btn">
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
          >保存</van-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { Notify } from "vant";
import UploadImage from "../../components/common/UploadImage";
export default {
  components: {
    UploadImage,
  },
  data() {
    return {
      model: {},
      fileList: [],
      upshow: false,
      pptLoading: false,
      haveShow: false,
      show: false,
    };
  },

  methods: {
    cancelBtn() {
      this.$router.back();
    },
    success(val) {
      console.log(val);
    },
    sumbitBtn() {
      this.success();
      if (this.model.educationExperiences == null) {
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

      let images = this.fileList
        .filter((item) => item.status == "done" && item.url)
        .map((item) => item.url.replace(this.model.host, ""))
        .join(",");
      this.model.images = images;
      // if (this.model.images == "") {
      //   Notify({
      //     type: "warning",
      //     message: "图片不能为空",
      //   });
      //   return;
      // }
      // if (this.model.slogan == "" || this.model.slogan == null) {
      //   this.model.slogan = "你好,很高兴认识你";
      // }
      console.log(this.model);
      this.updateBussiness(this.model);
    },
    openShow() {
      this.show = true;
      this.upshow = true;
    },
    //点击上传ppt
    afterPpt(obj) {
      if (obj.file != undefined) {
        this.upshow = false;
        this.haveShow = true;
      }
      let formData = new FormData();
      formData.append("file", obj.file);
      if (obj.file == undefined) {
        Notify({
          type: "warning",
          message: "请重新上传ppt",
        });
        return;
      }
      this.pptLoading = true;
      this.$http.pptUpload(formData).then((res) => {
        if (res.data.code != 20000) {
          this.pptLoading = false;
          Notify({
            type: "warning",
            message: "上传失败",
          });
        } else {
          this.pptLoading = false;
          this.getCardIntroduction();
          Notify({
            type: "success",
            message: "上传成功",
          });
        }
      });
    },
    getCardIntroduction() {
      this.$http.getCardIntroduction().then((res) => {
        this.model.images = [];
        this.model = res.data.data;
        if (this.model.images) {
          this.fileList = this.model.images.split(",").map((s) => {
            return {
              url: this.model.host + s,
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

        // this.playerOptions.sources[0].src = this.model.videoUrl;
        // this.playerOptions.poster = this.model.videoCover;
      });
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
    setUserId() {
      this.$http
        .setUserId({ userId: "1b69782562ac42c48c725c3b2940ea8d" })
        .then(() => {
          // this.$nextTick(() => {
          this.getCardIntroduction();
        });
    },
  },
  created() {
    this.getAuthorizeWxUserId().then(wxUserId => {
      this.getCardIntroduction();
    })
    // this.setUserId();
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
        padding: 15px 15px;
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
      padding: 5px 20px 5px 45px;
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
  margin: 20px 0 10px 20px;
  border-radius: 5px;
  padding: 5px 10px;
  color: #646566;
  border: 1px solid green;
  &-two {
    margin: 20px 0 10px 45px;
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
</style>
