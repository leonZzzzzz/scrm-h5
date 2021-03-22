<template>
  <div>
    <!-- 上传视频  -->
    <van-uploader
      v-model="fileList"
      accept="video/*"
      :max-count="1"
      :after-read="afterRead"
      :before-delete="beforeDelete"
    />
  </div>
</template>
<script>
import { Uploader } from "vant";
export default {
  components: {
    vanUploader: Uploader,
  },
  data() {
    return {
      fileList: [],
      uploader: {},
      percent: 0,
      fileName: "",
    };
  },
  methods: {
    getSignature() {
      return this.$http.uploadVideoSignature().then((res) => {
        // console.log('签名函数',res.data.data.signature)
        return res.data.data.signature;
      });
    },
    afterRead(fileData) {
      console.log("bbbb");
      console.log("上传的文件", fileData);
      console.log("签名函数", this.getSignature);
      this.fileName = fileData.file.name;
      const tcVod = new TcVod.default({
        getSignature: this.getSignature,
      });
      const uploader = tcVod.upload({
        mediaFile: fileData.file, // 需要上传的视频文件
      });
      this.uploader = uploader;
      uploader.on("media_progress", (info) => {
        console.log(info.percent * 100 + "%"); // 进度
        this.fileList = [
          {
            url: "",
            status: "uploading",
            message: (info.percent * 100).toFixed(0) + "%",
          },
        ];
      });
      uploader
        .done()
        .then((doneResult) => {
          console.log("doneResult", doneResult);
          let result = {
            fileId: doneResult.fileId,
            videoUrl: doneResult.video ? doneResult.video.url : "",
          };
          this.fileList = [
            {
              url: this.fileName,
              status: "",
              message: "",
            },
          ];
          this.$emit("success", result);
        })
        .catch((err) => {
          console.log("上传失败", err);
        });
    },
    beforeDelete() {
      console.log("删除文件");
      this.uploader.cancel();
      this.fileList = [];
      this.$emit("success",{})
    },
  },
};
</script>

<style lang="scss" scoped>
</style>