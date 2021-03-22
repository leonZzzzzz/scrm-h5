<template>
  <div class="form-div">
    <div class="form-container">
      <div class="title-bar"><span class="bar-tag"></span>名片信息</div>
      <div class="avatar-div">
        <div class="avatar-text">
          <span>头像</span>

          <div class="avatar-img" v-if="!isShow">
            <img :src="editModel.avatar" alt="" />
            <van-icon class="avatar-close" name="cross" @click="changeNone" />
          </div>
          <van-uploader
            style="margin-left:65px; margin-top:2px;"
            max-count="1"
            :fileList="fileList"
            accept=".jpg,.jpeg,.png"
            :after-read="afterReadImage"
            :before-delete="beforeRead"
            :deletable="true"
            v-else
          >
          </van-uploader>

          <div class="tongbu-btn" @click="avatarRefresh">
            <van-icon class="replay-icon" name="replay" />
            <span>同步头像</span>
          </div>
        </div>
        <!-- <div class="avatar-img" v-if="!isShow">
          <img :src="editModel.avatar" alt="" />
          <van-icon class="avatar-close" name="cross" @click="changeNone" />
        </div>
        <van-uploader
          style="margin-left:93px; margin-top:15px;font-size:0"
          max-count="1"
          :fileList="fileList"
          accept=".jpg,.jpeg,.png"
          :after-read="afterReadImage"
          :before-delete="beforeRead"
          :deletable="true"
          v-else
        >
        </van-uploader> -->
      </div>

      <van-field
        class="input-text"
        label="姓名"
        placeholder="请输入姓名"
        v-model="editModel.name"
        required
        maxlength="10"
        clearable
      ></van-field>
      <van-field
        class="input-text"
        label="职位"
        placeholder="请输入职位"
        v-model="editModel.position"
        maxlength="10"
        clearable
      ></van-field>
      <van-field
        class="input-text"
        label="邮箱"
        placeholder="请输入邮箱"
        v-model="editModel.email"
        maxlength="40"
        clearable
      ></van-field>
      <van-field
        class="input-text"
        label="电话"
        placeholder="请输入电话"
        v-model="editModel.phone"
        maxlength="30"
        clearable
      ></van-field>
      <van-field
        class="input-text"
        label="地址"
        placeholder="请输入地址"
        v-model="editModel.address"
        maxlength="128"
        clearable
      >
      </van-field>
      <div class="title-bar">
        <span class="bar-tag"></span>个人简介信息<span
          style="margin-left:10px;color:#6e6c6c;font-weight:400"
          >(选填)</span
        >
      </div>
      <van-field
        class="input-text"
        placeholder="请输入个人简介"
        maxlength="128"
        type="textarea"
        rows="3"
        v-model="model.slogan"
        clearable
        show-word-limit
        autosize
      ></van-field>
      <div class="tarbar-item">
        <span class="bar-tag"></span>教育经历<span
          style="margin-left:10px;color:#6e6c6c;font-weight:400"
          >(选填)</span
        >
        <!-- <van-icon name="add-o" class="add-icon" @click="addEducation" /> -->
      </div>

      <div
        class="education-item"
        v-for="(item, index) in model.educationExperiences"
        :key="index"
      >
        <div class="item">
          <div>
            <van-field
              class="input-text"
              label="学校名称"
              placeholder="请输入学校名称"
              maxlength="30"
              v-model="item.school"
              clearable
            ></van-field>
            <div class="select-div">
              <span>选择时间</span>
              <data-select
                :startYear="item.startYear"
                :endYear="item.endYear"
                class="select-border"
                @startYear="startYear"
                @eTime="eTime"
                :num="index"
                @success="success"
                @cancel="cancel"
              >
              </data-select>
            </div>
            <van-field
              label="学院/专业"
              maxlength="10"
              placeholder="请输入学院/专业"
              v-model="item.speciality"
              clearable
            ></van-field>
            <van-field
              label="学位"
              maxlength="10"
              placeholder="请输入学位"
              v-model="item.degree"
              clearable
            >
            </van-field>
          </div>
          <div
            class="icon-minu"
            v-if="model.educationExperiences.length >= 2"
            @click="minuItem(item, index)"
          >
            <van-icon name="close" />
          </div>
        </div>
      </div>
      <div class="tarbar-item-add">
        <van-icon name="plus" class="add-icon" @click="addEducation" />
      </div>

      <div class="title-bar">
        <span class="bar-tag"></span>标签信息
        <span style="margin-left:10px;color:#6e6c6c;font-weight:400"
          >(选填)</span
        >
      </div>
      <div class="choose-time">
        <span>标签</span>
        <van-icon name="add-o" class="add-icon" @click="addTag" />
      </div>
      <div class="education-item">
        <div
          class="item-tags"
          v-for="(tagItem, tagIndex) in model.tags"
          :key="tagIndex"
        >
          <div>
            <van-field
              label="标签名"
              maxlength="10"
              placeholder="请输入标签名"
              v-model="tagItem.name"
              clearable
            ></van-field>
          </div>
          <div class="icon-minu" @click="minuTag(tagItem, tagIndex)">
            <van-icon name="close" />
          </div>
        </div>
      </div>
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
import DataSelect from "../../components/common/DateSelect";
export default {
  components: {
    UploadImage,
    DataSelect,
  },
  data() {
    return {
      model: {},
      editModel: {
        name: "",
        position: "",
        email: "",
        phone: "",
        avatar: "",
        address: "",
      },
      isEducation: false,
      isTag: false,
      fileList: [],
      isShow: false,
    };
  },
  methods: {
    //点击图片的关闭按钮
    changeNone() {
      this.isShow = true;
      this.editModel.avatar = "";
    },
    cancel(val) {
      this.model.educationExperiences.forEach((item, index) => {
        if (val.index == index) {
          item.startYear = val.start;
          item.endYear = val.end;
        }
      });
    },
    startYear(val) {
      console.log(val);
    },
    eTime(val) {
      console.log(val);
    },
    success(val) {
      this.model.educationExperiences.forEach((item, index) => {
        if (val.index == index) {
          item.startYear = val.start;
          item.endYear = val.end;
        }
      });
      console.log(this.model.educationExperiences);
    },
    //点击删除标签按钮
    minuTag(items, indexs) {
      // if (this.model.tags.length > 1) {
      this.model.tags.splice(indexs, 1);
      // return;
      // } else {
      //   Notify({
      //     type: "warning",
      //     message: "标签不能少于一个",
      //   });
      // }
    },
    //点击添加标签按钮
    addTag() {
      let isTrue = true;
      if (this.model.tags == null) {
        this.model.tags = [];
        this.model.tags.push({
          name: "",
          id: "",
        });
        return;
      }
      this.model.tags.forEach((item, index) => {
        if (index >= 2) {
          isTrue = false;
          Notify({
            type: "warning",
            message: "标签不能多于三个",
          });
        }
        if (item.name == "") {
          isTrue = false;
          Notify({
            type: "warning",
            message: "请填写标签名再进行添加",
          });
          return;
        }
      });
      if (isTrue == true) {
        this.model.tags.push({
          name: "",
          id: "",
        });
      }
    },
    //点击取消按钮
    cancelBtn() {
      this.$router.back();
    },
    //点击保存按钮
    sumbitBtn() {
      if (this.editModel.avatar == "") {
        Notify({
          type: "warning",
          message: "头像不能为空",
        });
        return;
      }
      if (this.editModel.name == "") {
        Notify({
          type: "warning",
          message: "姓名不能为空",
        });
        return;
      }
      if (this.model.educationExperiences != null) {
        if (this.model.educationExperiences.length == 1) {
          this.model.educationExperiences.forEach((items) => {
            if (
              items.school == "" &&
              items.degree == "" &&
              items.startYear == "" &&
              items.endYear == "" &&
              items.speciality == ""
            ) {
              this.model.educationExperiences = null;
            }
          });
        }

        if (this.model.educationExperiences != null) {
          console.log("非空进来");
          for (var i = 0; i < this.model.educationExperiences.length; i++) {
            let items = this.model.educationExperiences;
            if (
              items[i].degree == "" ||
              items[i].startYear == "" ||
              items[i].endYear == "" ||
              items[i].speciality == ""
            ) {
              if (items[i].school == "") {
                Notify({ type: "warning", message: "学校名称不能为空" });
                return;
              }
            }
            if (
              items[i].degree != "" &&
              items[i].startYear != "" &&
              items[i].endYear != "" &&
              items[i].speciality != ""
            ) {
              if (items[i].school == "") {
                Notify({ type: "warning", message: "学校名称不能为空" });
                return;
              }
            }
            if (items[i].school != "") {
              if (items[i].degree == "") {
                items[i].degree = "保密";
              }
              if (items[i].startYear == "") {
                items[i].startYear = "保密";
              }
              if (items[i].endYear == "") {
                items[i].endYear = "保密";
              }
              if (items[i].speciality == "") {
                items[i].speciality = "保密";
              }
            }
          }
        }
      }
      if (this.isEducation == true) {
        this.isEducation = false;
        return;
      }
      if (this.model.tag && this.model.tags.length != 0) {
        this.model.tags.forEach((item) => {
          this.isTag = false;
          if (item.name == "") {
            this.isTag = true;
          }
        });
      }
      if (this.isTag == true) {
        Notify({ type: "warning", message: "标签名不能为空" });
        return;
      }
      this.updateCard(this.editModel);
    },
    minuItem(item, index) {
      if (this.model.educationExperiences.length != 0) {
        this.model.educationExperiences.splice(index, 1);
      }
    },
    addEducation() {
      let isTure = true;
      if (this.model.educationExperiences == null) {
        this.model.educationExperiences = [
          {
            degree: "",
            school: "",
            startYear: "",
            endYear: "",
            speciality: "",
          },
        ];
        return;
      }
      this.model.educationExperiences.forEach((items) => {
        if (
          items.degree == "" &&
          items.school == "" &&
          items.startYear == "" &&
          items.endYear == "" &&
          items.speciality == ""
        ) {
          isTure = false;
          Notify({
            type: "warning",
            message: "请填写教育经历在进行添加",
          });
          return;
        }
      });
      if (isTure == true) {
        this.model.educationExperiences.push({
          school: "",
          startYear: "",
          endYear: "",
          speciality: "",
          degree: "",
        });
      }
    },
    //上传成功的回调函数
    async afterReadImage(obj, detail) {
      if (
        obj.file.type == "image/png" ||
        obj.file.type == "image/jpg" ||
        obj.file.type == "image/jpeg"
      ) {
        let imgFile = obj.file;
        let _file = {
          content: obj.content,
          url: "",
          status: "uploading",
          message: "上传中...",
        };
        this.fileList.push(_file); // 插入数据才会显示上传效果
        // 大于1Mb的图片才压缩
        if (imgFile.size <= 0.5 * 1024 * 1024) {
          let imgUrl = await this.uploadImage(imgFile, imgFile, detail);
          console.log("上传成功===>" + imgUrl);
          // 先删除前面插入的占位数据，再传入成功的数据
          this.fileList.splice(this.fileList.length - 1, 1, {
            url: this.imgHost + imgUrl,
            status: "done",
            message: "",
          });
          this.editModel.avatar = imgUrl;
          return;
        }

        _file.message = "压缩中...";
        this.zipImgPromise(imgFile)
          .then(async (blob) => {
            // 压缩后的图片还是超过大小限制
            if (blob.size > 3 * 1024 * 1024) {
              _file.status = "failed";
              _file.message = "图片不能大于 3Mb";
              return;
            }
            // 开始上传图片（跑腾讯云的接口单独上传）
            _file.message = "上传中...";
            let imgUrl = await this.uploadImage(blob, imgFile, detail);
            console.log("上传成功===>" + imgUrl);
            // 先删除前面插入的占位数据，再传入成功的数据
            this.fileList.splice(this.fileList.length - 1, 1, {
              url: this.imgHost + imgUrl,
              status: "done",
              message: "",
            });
            this.editModel.avatar = imgUrl;
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
            this.fileList.splice(this.fileList.length - 1, 1, {
              url: this.imgHost + imgUrl,
              status: "done",
              message: "",
            });
            this.editModel.avatar = imgUrl;
          });
        return;
      } else {
        Notify({
          type: "warning",
          message: "请上传正确的图片",
        });
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
    beforeRead(file) {
      this.fileList.forEach((item, index) => {
        if (item == file) {
          this.fileList.splice(index, 1);
          this.editModel.avatar = "";
        }
      });
    },
    //接口开始
    //点击同步头像接口
    avatarRefresh() {
      this.$http.refreshAvatar().then((res) => {
        if (res.data.code == 20000) {
          this.isShow = false;
          Notify({
            type: "success",
            message: "同步并保存头像成功",
          });
          this.getBussinessUser();
          this.getCardIntroduction();
          return;
        } else {
          Notify({
            type: "success",
            message: "同步并保存头像失败",
          });
        }
      });
    },
    //修改成员名片接口
    updateCard(params) {
      this.$http.updateCard(params).then((res) => {
        if (res.data.code != 20000) {
          Notify({
            type: "warning",
            message: res.data.message,
          });
          return;
        } else {
          this.updateBussiness(this.model);
        }
      });
    },
    //获取名片信息接口
    getBussinessUser() {
      this.$http.getBussinessUser().then((res) => {
        if (res.data.code == 20000) {
          let data = res.data.data;
          this.editModel.name = data.name;
          this.editModel.position = data.position;
          this.editModel.email = data.email;
          this.editModel.phone = data.phone;
          if (data.avatar != "" || data.avata != null) {
            // let avatar = "";
            // if (data.avatar.indexOf("http") > -1) {
            //   avatar = data.avatar;
            // } else {
            //   avatar = data.host + data.avatar;
            // }
            this.editModel.avatar = data.avatar;
          }
          this.editModel.address = data.address;
        } else {
          this.editModel = {};
          this.isShow = false;
        }
      });
    },
    //获取个人介绍接口
    getCardIntroduction() {
      this.$http.getCardIntroduction().then((res) => {
        this.model.images = [];
        this.model.educationExperiences = [];
        this.model = res.data.data;
        if (this.model.educationExperiences != null) {
          this.model.educationExperiences.forEach((item) => {
            if (item.startYear == "保密") {
              item.startYear = "";
            }
            if (item.endYear == "保密") {
              item.endYear = "";
            }
            if (item.speciality == "保密") {
              item.speciality = "";
            }
            if (item.degree == "保密") {
              item.degree = "";
            }
          });
        }
      });
    },
    //修改接口
    updateBussiness(params) {
      this.$http.updateBussiness(params).then((res) => {
        if (res.data.code == 20000) {
          Notify({
            type: "success",
            message: "保存成功",
          });
          this.$router.back();
          this.getCardIntroduction();
        } else {
          Notify({
            type: "warning",
            message: "保存失败,请重新进行保存",
          });
          this.getCardIntroduction();
        }
      });
    },
    setUserId() {
      this.$http
        .setUserId({ userId: "1b69782562ac42c48c725c3b2940ea8d" })
        .then(() => {
          // this.$nextTick(() => {
          this.getBussinessUser();
          this.getCardIntroduction();
        });
    },
    //接口结束
  },
  created() {
    this.getAuthorizeWxUserId().then(wxUserId => {
      this.getBussinessUser();
      this.getCardIntroduction();
    })
    // this.setUserId();
    // this.getSignature();
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
    .avatar-div {
      color: #646566;
      padding: 0.26667rem 0.42667rem;
      .avatar-text {
        display: flex;
        span {
          margin-top: 30px;
        }
        .tongbu-btn {
          // border: 1px solid green;
          margin-top: 30px;
          height: 20px;
          line-height: 20px;
          margin-left: auto;
          span {
            vertical-align: 2px;
            // border: 1px solid black;
            // padding: 0;
          }
          .replay-icon {
            margin-right: 5px;
          }
        }
      }
      .avatar-img {
        // border: 1px solid green;
        margin-top: 2px;
        margin-left: 65px;
        position: relative;
        font-size: 0;
        img {
          width: 80px;
          height: 80px;
          border-radius: 10px;
        }
        .avatar-close {
          top: -5px;
          border-radius: 50%;
          position: absolute;
          left: 70px;
          color: #fff;
          background-color: #969799;
          font-size: 12px;
          padding: 3px;
        }
      }
      // .avatar-img {
      //   // border: 1px solid green;
      //   margin-top: 15px;
      //   margin-left: 93px;
      //   position: relative;
      //   font-size: 0;
      //   img {
      //     width: 80px;
      //     height: 80px;
      //     border-radius: 10px;
      //   }
      //   .avatar-close {
      //     top: -5px;
      //     border-radius: 50%;
      //     position: absolute;
      //     left: 70px;
      //     color: #fff;
      //     background-color: #969799;
      //     font-size: 12px;
      //     padding: 3px;
      //   }
      // }
    }
    .card-item {
      padding: 10px;
    }
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
  // display: inline-block;
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
.tarbar-item-add {
  text-align: center;
  .add-icon {
    background-color: #f7f8fa;
    font-size: 20px;
    color: #ccc;
    // border: 1px solid red;
    padding: 30px;
    border-radius: 10px;
  }
  .minu-icon {
    background-color: #f7f8fa;
    font-size: 20px;
    color: #ccc;
    padding: 30px;
    border-radius: 10px;
  }
}
.tarbar-item {
  // border: 1px solid red;
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
  .add-icon {
    margin-left: auto;
    font-size: 20px;
    margin-right: 15px;
  }
}
.select-div {
  border-bottom: 1px solid #f6f6f6;
  display: flex;
  span {
    padding: 5px 0;
    margin-left: 15px;
    line-height: 30px;
    color: #646566;
  }
  .select-border {
    margin: 5px 0;
    border: none;
    margin-left: 35px;
  }
}
</style>
