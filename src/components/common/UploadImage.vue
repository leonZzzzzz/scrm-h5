<!--小程序上传图片组件-->

<!--示例：名片->修改个人资料，图片-->

<!--一、引入方式

   import UploadImage from "../../components/common/UploadImage";   

二、使用例子
<UploadImage :fileList="fileList" :count="100" class="upclass"></UploadImage>

三、属性

参数        类型        说明
fileList    Array    绑定的文件数组（url需要完整的链接地址）
count       Number   图片上传的最大个数（默认为1）
disabled    Boolean  是否显示禁用文件上传
deletable   Boolean  是否显示删除按钮
multiple    Boolean  是否开启图片多选

四、属性说明
  参数                              说明
fileList    [{ url: this.imgHost + imgUrl, status: "done", message: "",}]

五、使用注意
1、fileList 进入页面即可绑定，组件会进行回显
2、保存的时候获取fileList

六、特别声明
此组件灵活性小，选择性使用
-->

<template>
  <div>
    <div class="loading-div" v-if="pptLoading == true">
      <van-progress :percentage="prenecter" />
    </div>
    <van-uploader
      v-if="pptLoading == false"
      class="picup"
      :max-count="count"
      :multiple="multiple"
      :fileList="fileList"
      :accept="acceptTypes"
      :after-read="afterReadImage"
      :before-delete="beforeRead"
      :disabled="disabled"
      :deletable="deletable"
    >
    </van-uploader>
    <van-dialog
      v-model="show"
      title="上传后，原本图片将被ppt转换后的图片覆盖。根据ppt文件大小，上传和转换时间将花费几分钟或几十分钟不等，转换成功后自动覆盖。是否继续上传ppt？"
      show-cancel-button
    >
    </van-dialog>
  </div>
</template>

<script>
import { Notify } from "vant";
const types = ".jpg,.jpeg,.png,.pdf,.ppt,.pptx";
export default {
  props: {
    fileList: {
      type: Array,
      default: () => {
        return [];
      },
    },
    count: {
      type: Number,
      default: 1,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    deletable: {
      type: Boolean,
      default: true,
    },
    acceptTypes: {
      // 允许上传的类型列表
      type: String,
      default: types,
    },
    limitSize: {
      // 单张图片的大小限制
      type: Number,
      default: 5,
    },
  },
  data() {
    return {
      show: false,
      pptLoading: false,
      prenecter: 0,
      timer: "",
    };
  },
  methods: {
    //上传多张图片的回调处理
    async afterReadImage(obj, detail) {
      // xfo
      if (obj.content == undefined) {
        // let _File = {};
        console.log("进来上传多张图片的方法>>>");
        obj.forEach(async (item) => {
          let itemFile = item.file;
          if (item.file.size >= this.limitSize * 1024 * 1024) {
            Notify({
              type: "warning",
              message: "图片不能大于" + this.limitSize + "MB",
            });
            return;
          }
          let _File = {
            content: item.content,
            url: "",
            status: "uploading",
            message: "上传中...",
          };
          this.fileList.push(_File);
          // 大于3Mb的图片才压缩
          if (item.file.size <= 3 * 1024 * 1024) {
            let itemUrl = await this.uploadImage(item.file, item.file, detail);
            // this.fileList.push({
            //   url: this.imgHost + itemUrl,
            //   status: "done",
            //   message: "",
            // });
            console.log(
              "被替换的索引",
              this.fileList.findIndex((item) => item.content === _File.content)
            );
            this.fileList.splice(
              this.fileList.findIndex((item) => item.content === _File.content),
              1,
              {
                url: this.imgHost + itemUrl,
                status: "done",
                message: "",
              }
            );
            return;
          }
          _File.message = "压缩中...";
          this.zipImgPromise(item.file)
            .then(async (blob) => {
              console.log(blob.size);
              // 压缩后的图片还是超过大小限制
              if (blob.size > 3 * 1024 * 1024) {
                console.log("如果大于3MB就返回");
                _File.status = "failed";
                _File.message = "压缩后图片不能大于3Mb";
                return;
              }
              // 开始上传图片（跑腾讯云的接口单独上传）
              _File.message = "上传中...";
              let itemUrl = await this.uploadImage(blob, item.file, detail);
              console.log("上传成功===>之后" + itemUrl);
              // 先删除前面插入的占位数据，再传入成功的数据
              // this.fileList.push({
              //   url: this.imgHost + itemUrl,
              //   status: "done",
              //   message: "",
              // });
              console.log(
                "被替换的索引",
                this.fileList.findIndex(
                  (item) => item.content === _File.content
                )
              );
              this.fileList.splice(
                this.fileList.findIndex(
                  (item) => item.content === _File.content
                ),
                1,
                {
                  url: this.imgHost + itemUrl,
                  status: "done",
                  message: "",
                }
              );
            })
            .catch(async (error) => {
              // 处理zipImgPromise和前一个回调函数运行时发生的错误
              console.log("压缩图片发生错误", error);
              Notify({
                type: "warning",
                message: "压缩失败",
              });
              // 不压缩继续上传
              _File.message = "上传中...";
              let itemUrl = await this.uploadImage(
                item.file,
                item.file,
                detail
              );
              // 先删除前面插入的占位数据，再传入成功的数据
              // this.fileList.push({
              //   url: this.imgHost + itemUrl,
              //   status: "done",
              //   message: "",
              // });
              this.fileList.splice(
                this.fileList.findIndex(
                  (item) => item.content === _File.content
                ),
                1,
                {
                  url: this.imgHost + itemUrl,
                  status: "done",
                  message: "",
                }
              );
            });
        });
      } else {
        console.log("如果是单张的话>>>>");
        // for (var i = 0; i < this.fileList.length; i++) {
        //   if (this.fileList[i].content) {
        //     Notify({
        //       type: "warning",
        //       message: "请等待其他照片上传完毕再进行上传",
        //     });
        //     return;
        //   }
        // }
        if (
          obj.file.type == "image/png" ||
          obj.file.type == "image/jpg" ||
          obj.file.type == "image/jpeg"
        ) {
          let imgFile = obj.file;
          if (imgFile.size >= this.limitSize * 1024 * 1024) {
            Notify({
              type: "warning",
              message: "图片不能大于" + this.limitSize + "MB",
            });
            return;
          }
          let _file = {
            content: obj.content,
            url: "",
            status: "uploading",
            message: "上传中...",
          };
          this.fileList.push(_file); // 插入数据才会显示上传效果
          // 大于0.5Mb的图片才压
          if (imgFile.size <= 3 * 1024 * 1024) {
            let imgUrl = await this.uploadImage(imgFile, imgFile, detail);
            console.log("上传成功===>" + imgUrl);
            // 先删除前面插入的占位数据，再传入成功的数据
            // this.fileList.splice(this.fileList.length - 1, 1, {
            //   url: this.imgHost + imgUrl,
            //   status: "done",
            //   message: "",
            // });
            this.fileList.splice(
              this.fileList.findIndex((item) => item.content === _file.content),
              1,
              {
                url: this.imgHost + imgUrl,
                status: "done",
                message: "",
              }
            );
            return;
          }

          _file.message = "压缩中...";

          this.zipImgPromise(imgFile)
            .then(async (blob) => {
              // 压缩后的图片还是超过大小限制
              if (blob.size > 3 * 1024 * 1024) {
                _file.status = "failed";
                _file.message = "压缩后图片不能大于3Mb";
                return;
              }
              // 开始上传图片（跑腾讯云的接口单独上传）
              _file.message = "上传中...";

              let imgUrl = await this.uploadImage(blob, imgFile, detail);
              console.log("上传成功===>" + imgUrl);
              // 先删除前面插入的占位数据，再传入成功的数据
              // this.fileList.splice(
              //   // this.fileList.findIndex((item) => console.log(item))
              //   this.fileList.length - 1,
              //   1,
              //   {
              //     url: this.imgHost + imgUrl,
              //     status: "done",
              //     message: "",
              //   }
              // );
              this.fileList.splice(
                this.fileList.findIndex(
                  (item) => item.content === _file.content
                ),
                1,
                {
                  url: this.imgHost + imgUrl,
                  status: "done",
                  message: "",
                }
              );
              console.log("压缩之后的数组", this.fileList);
            })
            .catch(async (error) => {
              // 处理zipImgPromise和前一个回调函数运行时发生的错误
              console.log("压缩图片发生错误", error);
              this.$toast("压缩失败");
              // 不压缩继续上传
              _file.message = "上传中...";
              let imgUrl = await this.uploadImage(imgFile, imgFile, detail);
              console.log("上传成功===>" + imgUrl);
              // 先删除前面插入的占位数据，再传入成功的数据
              // this.fileList.splice(this.fileList.length - 1, 1, {
              //   url: this.imgHost + imgUrl,
              //   status: "done",
              //   message: "",
              // });
              this.fileList.splice(
                this.fileList.findIndex(
                  (item) => item.content === _file.content
                ),
                1,
                {
                  url: this.imgHost + imgUrl,
                  status: "done",
                  message: "",
                }
              );
            });
          return;
        }
        if (
          obj.file.type == "application/vnd.ms-powerpoint" ||
          obj.file.type ==
            "application/vnd.openxmlformats-officedocument.presentationml.presentation" ||
          obj.file.type == "application/pdf"
        ) {
          this.show = true;
          this.pptLoading = true;
          let formData = new FormData();
          this.timer = setInterval(this.addPrecncer, 1000);
          formData.append("file", obj.file);
          if (obj.file == undefined) {
            Notify({
              type: "warning",
              message: "请重新上传ppt",
            });
            return;
          }

          this.$http.pptUpload(formData).then((res) => {
            if (res.data.code != 20000) {
              this.pptLoading = false;
              Notify({
                type: "warning",
                message: "上传失败",
              });
            } else {
              this.prenecter = 100;
              setTimeout(() => {
                this.pptLoading = false;
                Notify({
                  type: "success",
                  message: "上传成功,请等待1-2分钟后进行刷新查看",
                });
              }, 2000);
              clearInterval(this.timer);
              this.$emit("success", this.prenecter);
            }
          });
        }
      }
    },
    addPrecncer() {
      this.prenecter += 2;
      if (this.prenecter >= 96) {
        this.prenecter = 97;
        return;
      }
    },
    /**
     * 上传图片
     * @param blob 压缩后的图片数据
     * @param originFile 压缩前的file对象
     * @param detail 表单对象里面有name用于区分是哪个字段
     */
    async uploadImage(blob, originFile, detail) {
      return new Promise((success, reject) => {
        let file = new FormData(); // 创建form对象
        file.append("file", blob, originFile.name); // 通过append向form对象添加数据
        file.append("imageType", "scrm-card"); // 添加form表单中其他数据

        this.$http
          .uploadImage(file)
          .then((res) => {
            let data = res.data.data;
            if (!data || !data.imageUrl) return reject("上传失败");
            success(res.data.data.imageUrl);
          })
          .catch((error) => {
            console.log(error);
            return reject("上传失败");
          });
      });
    },
    // 压缩图片
    zipImgPromise(imgFile) {
      return new Promise((resolve, reject) => {
        let reader = new FileReader(); // 定义一个fileReader
        reader.readAsDataURL(imgFile); // 将图片转换成base64后可以得到图片的宽高
        let img = new Image();
        reader.onload = () => {
          img.src = reader.result;
        };
        img.onload = () => {
          // 图片原始尺寸
          let originWidth = img.width;
          let originHeight = img.height;
          let canvas = document.createElement("canvas");
          let context = canvas.getContext("2d");
          // 最大尺寸限制
          let maxWidth = 800,
            maxHeight = 800;
          // 目标尺寸
          let targetWidth = originWidth,
            targetHeight = originHeight;
          // 图片尺寸超过800x800的限制
          if (originWidth > maxWidth || originHeight > maxHeight) {
            if (originWidth / originHeight > maxWidth / maxHeight) {
              // 更宽，按照宽度限定尺寸
              targetWidth = maxWidth;
              targetHeight = Math.round(
                maxWidth * (originHeight / originWidth)
              );
            } else {
              targetHeight = maxHeight;
              targetWidth = Math.round(
                maxHeight * (originWidth / originHeight)
              );
            }
          }
          // canvas对图片进行缩放
          canvas.width = targetWidth;
          canvas.height = targetHeight;
          // 清除画布
          context.clearRect(0, 0, targetWidth, targetHeight);
          // 图片压缩
          context.drawImage(img, 0, 0, targetWidth, targetHeight);

          // canvas转换成dataUrl
          let dataUrl = canvas.toDataURL("image/png");
          // 转换成formdata格式用于上传图片
          let blob = this.dataURItoBlob(dataUrl);

          if (blob) {
            resolve(blob);
          } else {
            reject(new Error("Error！！"));
          }
        };
      });
    },
    // dataUrl转换成formdata格式用于上传图片
    dataURItoBlob(dataUrl) {
      let byteString = atob(dataUrl.split(",")[1]);
      let mimeString = dataUrl
        .split(",")[0]
        .split(":")[1]
        .split(";")[0];
      let ab = new ArrayBuffer(byteString.length);
      let ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      let bb = new Blob([ab], { type: mimeString });
      return bb;
    },
    //删除事件
    beforeRead(file) {
      this.fileList.forEach((item, index) => {
        if (item == file) {
          this.fileList.splice(index, 1);
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.loading-div {
  width: 90%;
}
</style>
