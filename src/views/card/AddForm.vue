<template>
  <div class="form-div">
    <div class="form-container">
      <div class="title-bar" v-if="$route.query.status == 'intro'">
        <span class="bar-tag"></span>名片信息
      </div>
      <div class="avatar-div" v-if="$route.query.status == 'intro'">
        <div class="avatar-text">
          <span>头像</span>

          <div class="avatar-img" v-if="showImg == true">
            <img :src="editModel.avatar" alt="" />
            <van-icon class="avatar-close" name="cross" @click="changeNone" />
          </div>
          <!-- <van-uploader
            style="margin-left:65px; margin-top:2px;"
            max-count="1"
            :fileList="fileList"
            accept=".jpg,.jpeg,.png"
            :after-read="afterReadImage"
            :before-delete="beforeRead"
            :deletable="true"
            v-else
          >
          </van-uploader> -->
          <van-uploader
            style="margin-left:65px; margin-top:2px;"
            max-count="1"
            :fileList="fileListAvatar"
            accept=".jpg,.jpeg,.png"
            :after-read="afterReadImage"
            :before-delete="beforeRead"
            :deletable="true"
            v-else
          >
          </van-uploader>
        </div>
      </div>
      <van-field
        class="input-text"
        label="姓名"
        placeholder="请输入姓名"
        v-model="editModel.name"
        required
        maxlength="10"
        v-if="$route.query.status == 'intro'"
        clearable
      ></van-field>
      <van-field
        class="input-text"
        label="职位"
        placeholder="请输入职位"
        v-model="editModel.position"
        maxlength="10"
        v-if="$route.query.status == 'intro'"
        clearable
      ></van-field>
      <van-field
        class="input-text"
        label="邮箱"
        placeholder="请输入邮箱"
        v-model="editModel.email"
        maxlength="40"
        v-if="$route.query.status == 'intro'"
        clearable
      ></van-field>
      <van-field
        class="input-text"
        label="电话"
        placeholder="请输入电话"
        v-model="editModel.phone"
        maxlength="30"
        v-if="$route.query.status == 'intro'"
        clearable
      ></van-field>
      <van-field
        class="input-text"
        label="地址"
        placeholder="请输入地址"
        v-model="editModel.address"
        maxlength="128"
        v-if="$route.query.status == 'intro'"
        clearable
      ></van-field>

      <div class="title-bar" v-if="$route.query.status == 'intro'">
        <span class="bar-tag"></span>个人简介信息<span
          style="margin-left:10px;color:#6e6c6c;font-weight:400"
          >(选填)</span
        >
      </div>
      <van-field
        v-if="$route.query.status == 'intro'"
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
      <div class="tarbar-item" v-if="$route.query.status == 'intro'">
        <span class="bar-tag"></span>教育经历
        <span style="margin-left:10px;color:#6e6c6c;font-weight:400"
          >(选填)</span
        >
        <!-- <van-icon name="add-o" class="add-icon" @click="addEducation" /> -->
      </div>
      <div
        class="education-item"
        v-for="(item, index) in model.educationExperiences"
        :key="index"
      >
        <div class="item" v-if="$route.query.status == 'intro'">
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
            <!-- <van-field
              label="开始日期"
              maxlength="5"
              placeholder="请输入日期"
              v-model="item.startYear"
            ></van-field>
            <van-field
              label="结束日期"
              maxlength="5"
              placeholder="请输入日期"
              v-model="item.endYear"
            ></van-field> -->
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
          <!-- </div> -->
        </div>
      </div>
      <div class="tarbar-item-add" v-if="$route.query.status == 'intro'">
        <van-icon name="plus" class="add-icon" @click="addEducation" />
      </div>
      <div class="title-bar" v-if="$route.query.status == 'images'">
        <span class="bar-tag"></span>图片信息
      </div>
      <div class="images-item" v-if="$route.query.status == 'images'">
        <div class="images-text">
          <span>我的照片（支持图片/PPT/PDF，单张图片像素不可大于3MB） </span>
        </div>
        <UploadImage
          :fileList="fileList"
          :count="100"
          :multiple="true"
          class="upclass"
        ></UploadImage>
      </div>
      <div class="title-bar" v-if="$route.query.status == 'video'">
        <span class="bar-tag"></span>视频信息
      </div>
      <div class="choose-time" v-if="$route.query.status == 'video'">
        <span>视频(视频格式限制为MP4,大小不超过40MB)</span>
      </div>
      <div class="video-div" v-if="$route.query.status == 'video'">
        <van-uploader
          class="upload-div"
          :after-read="afterReadVideo"
          multiple
          :max-count="1"
          accept="video/*"
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
        <!-- <span class="video-block" v-if="videoList.length != 0">视频已存在</span> -->
        <span
          class="video-block"
          @click="beforeVideo"
          v-if="videoList.length != 0"
        >
          点击重新上传视频
        </span>
        <span
          class="video-block"
          @click="sumbitUpload"
          v-if="videoFile != null && videoList.length != 0"
          >点击确认上传</span
        >
      </div>
      <div class="tarbar-item" v-if="$route.query.status == 'intro'">
        <span class="bar-tag"></span>标签<span
          style="margin-left:10px;color:#6e6c6c;font-weight:400"
          >(选填)</span
        >
        <van-icon name="add-o" class="add-icon" @click="addTag" />
      </div>

      <div class="education-item-tag" v-if="$route.query.status == 'intro'">
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
              :required="true"
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
          @click="sumbitCardBtn"
          v-if="$route.query.status == 'intro'"
          >保存</van-button
        >
        <van-button
          type="default"
          size="small"
          class="sumbit"
          @click="sumbitImageBtn"
          v-if="$route.query.status == 'images'"
          >保存</van-button
        >
        <van-button
          type="default"
          size="small"
          class="sumbit"
          @click="sumbitVideoBtn"
          v-if="$route.query.status == 'video'"
          >保存</van-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { Notify } from "vant";
import DataSelect from "../../components/common/DateSelect";
import UploadImage from "../../components/common/UploadImage";
export default {
  components: {
    DataSelect,
    UploadImage,
  },
  data() {
    return {
      editModel: {
        name: "",
        position: "",
        email: "",
        phone: "",
        avatar: "",
        address: "",
      },
      model: {
        slogan: "",
        educationExperiences: null,
        images: "",
        videoCover: "",
        videoId: "",
        videoUrl: "",
        tags: [
          // {
          //   id: "",
          //   name: "",
          // },
        ],
      },
      fileList: [],
      fileCover: [],
      videoList: [],
      coverFile: null,
      videoFile: null,
      uploader: {},
      loading: false,
      percent: 0,
      isUpload: false,
      isEducation: false,
      isTag: false,
      show: false,
      upshow: false,
      haveShow: false,
      pptLoading: false,
      fileListAvatar: [],
      isShow: false,
      showImg: false,
    };
  },
  methods: {
    changeNone() {
      this.showImg = false;
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
    success(val) {
      this.model.educationExperiences.forEach((item, index) => {
        if (val.index == index) {
          item.startYear = val.start;
          item.endYear = val.end;
        }
      });
      console.log(this.model.educationExperiences);
    },
    startYear(val) {
      console.log(val);
    },
    eTime(val) {
      console.log(val);
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
          // this.getCardIntroduction();
          Notify({
            type: "success",
            message: "上传成功",
          });
        }
      });
    },
    //点击确认上传按钮事件
    sumbitUpload() {
      this.isUpload = !this.isUpload;

      if (this.videoFile == null) {
        Notify({
          type: "warning",
          message: "请重新上传视频",
        });
        return;
      }

      this.uploadFile();
    },
    //删除封面图前的回调事件
    beforeDel(file) {
      this.fileCover.forEach((item, index) => {
        if (item == file) {
          this.fileCover.splice(index, 1);
        }
      });
    },

    //上传视频封面回调事件
    // inputChangeCover(e) {
    //   // console.log(e);
    //   console.log(e.target.files);
    // },
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
      console.log("点击了取消");
    },
    //点击名片
    sumbitCardBtn() {
      if (this.isShow == true) {
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
        if (this.model.tag && this.model.tags.length != 0) {
          this.model.tags.forEach((item) => {
            this.isTag = false;
            item.id = "";
            if (item.name == "") {
              this.isTag = true;
            }
          });
          if (this.isTag == true) {
            Notify({ type: "warning", message: "标签名不能为空" });
            return;
          }
        }
        this.addCart(this.editModel);
      } else {
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
        if (this.model.tag && this.model.tags.length != 0) {
          this.model.tags.forEach((item) => {
            this.isTag = false;
            item.id = "";
            if (item.name == "") {
              this.isTag = true;
            }
          });
          if (this.isTag == true) {
            Notify({ type: "warning", message: "标签名不能为空" });
            return;
          }
        }
        this.updateCard(this.editModel);
      }
    },
    updateCard(params) {
      this.$http.updateCard(params).then((res) => {
        if (res.data.code == 20000) {
          this.addBussiness(this.model);
        } else {
          Notify({
            type: "warning",
            message: "保存失败,请重新进行保存",
          });
          return;
        }
      });
    },
    updateBussiness(params) {
      this.$http.updateBussiness(params).then((res) => {
        if (res.data.code == 20000) {
          this.addBussiness(this.model);
        } else {
          Notify({
            type: "warning",
            message: "保存失败,请重新进行保存",
          });
          return;
        }
      });
    },

    //点击视频
    sumbitVideoBtn() {
      if (this.isUpload == true) {
        if (this.percent != 1) {
          Notify({
            type: "warning",
            message: "请等待视频上传完成再进行保存",
          });
          return;
        }
      }

      this.model.tags = [];
      this.addBussiness(this.model);
    },
    //点击图片
    sumbitImageBtn() {
      let images = this.fileList
        .filter((item) => item.status == "done" && item.url)
        .map((item) => item.url.replace(this.imgHost, ""))
        .join(",");
      this.model.images = images;
      if (this.model.images == "") {
        Notify({
          type: "warning",
          message: "图片不能为空",
        });
        return;
      }

      this.model.tags = [];
      this.addBussiness(this.model);
    },
    //点击保存名片/简介按钮
    // sumbitBtn() {
    //   if (this.editModel.name == "") {
    //     Notify({
    //       type: "warning",
    //       message: "姓名不能为空",
    //     });
    //     return;
    //   }
    //   if (this.model.slogan == "") {
    //     Notify({
    //       type: "warning",
    //       message: "个性签名不能为空",
    //     });
    //     return;
    //   }
    //   if (this.model.educationExperiences != null) {
    //     if (this.model.educationExperiences.length == 1) {
    //       this.model.educationExperiences.forEach((items) => {
    //         if (
    //           items.school == "" &&
    //           items.degree == "" &&
    //           items.startYear == "" &&
    //           items.endYear == "" &&
    //           items.speciality == ""
    //         ) {
    //           this.model.educationExperiences = null;
    //         }
    //       });
    //     }

    //     if (this.model.educationExperiences != null) {
    //       for (var i = 0; i < this.model.educationExperiences.length; i++) {
    //         let items = this.model.educationExperiences;
    //         if (
    //           items[i].degree == "" ||
    //           items[i].startYear == "" ||
    //           items[i].endYear == "" ||
    //           items[i].speciality == ""
    //         ) {
    //           if (items[i].school == "") {
    //             Notify({ type: "warning", message: "学校名称不能为空" });
    //             return;
    //           }
    //         }
    //         if (
    //           items[i].degree != "" &&
    //           items[i].startYear != "" &&
    //           items[i].endYear != "" &&
    //           items[i].speciality != ""
    //         ) {
    //           if (items[i].school == "") {
    //             Notify({ type: "warning", message: "学校名称不能为空" });
    //             return;
    //           }
    //         }
    //         if (items[i].school != "") {
    //           if (items[i].degree == "") {
    //             items[i].degree = "保密";
    //           }
    //           if (items[i].startYear == "") {
    //             items[i].startYear = "保密";
    //           }
    //           if (items[i].endYear == "") {
    //             items[i].endYear = "保密";
    //           }
    //           if (items[i].speciality == "") {
    //             items[i].speciality = "保密";
    //           }
    //         }
    //       }
    //     }
    //   }
    //   let images = this.fileList
    //     .filter((item) => item.status == "done" && item.url)
    //     .map((item) => item.url.replace(this.imgHost, ""))
    //     .join(",");
    //   this.model.images = images;
    //   // if (this.model.images == "") {
    //   //   Notify({
    //   //     type: "warning",
    //   //     message: "图片不能为空",
    //   //   });
    //   //   return;
    //   // }

    //   if (this.isUpload == true) {
    //     if (this.percent != 1) {
    //       Notify({
    //         type: "warning",
    //         message: "请等待视频上传完成再进行保存",
    //       });
    //       return;
    //     }
    //   }

    //   this.model.tags.forEach((item) => {
    //     this.isTag = false;
    //     item.id = "";
    //     if (item.name == "") {
    //       this.isTag = true;
    //     }
    //   });
    //   if (this.isTag == true) {
    //     Notify({ type: "warning", message: "标签名不能为空" });
    //     return;
    //   }
    //   console.log(this.model);
    //   this.addBussiness(this.model);
    // },

    minuItem(item, index) {
      // if (this.model.educationExperiences.length == 1) {
      //   Notify({ type: "warning", message: "至少一段教育经历" });
      //   return;
      // }
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
    //接口开始
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
        this.fileListAvatar.push(_file); // 插入数据才会显示上传效果
        // 大于1Mb的图片才压缩
        if (imgFile.size <= 0.5 * 1024 * 1024) {
          let imgUrl = await this.uploadImage(imgFile, imgFile, detail);
          console.log("上传成功===>" + imgUrl);
          // 先删除前面插入的占位数据，再传入成功的数据
          this.fileListAvatar.splice(this.fileListAvatar.length - 1, 1, {
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
            this.fileListAvatar.splice(this.fileListAvatar.length - 1, 1, {
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
            this.fileListAvatar.splice(this.fileListAvatar.length - 1, 1, {
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
    //删除头像
    beforeRead(file) {
      this.fileListAvatar.forEach((item, index) => {
        if (item == file) {
          this.fileListAvatar.splice(index, 1);
          this.editModel.avatar = "";
        }
      });
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
        console.log(tcVod);

        const uploader = tcVod.upload({
          mediaFile: this.videoFile, // 视频文件，类型为 File
          // coverFile: this.coverFile, // 封面文件，类型为 File
        });

        this.uploader = uploader;
        console.log(this.uploader);
        uploader.on("media_progress", (info) => {
          this.percent = info.percent;
          console.log(this.percent);
          // console.log('上传进度==》'+info.percent) // 进度
        });

        uploader
          .done()
          .then((doneResult) => {
            this.loading = false;
            this.model.videoId = doneResult.fileId;
            this.model.videoUrl = doneResult.video.url;
            // this.model.videoCover = doneResult.cover.url;
          })
          .catch((err) => {
            this.loading = false;
            let errMsg =
              err && err.data && err.data.data.message
                ? err.data.data.message
                : JSON.stringify(err);
            Notify({
              type: "warning",
              message: errMsg,
            });
          });
      } catch (err) {
        this.loading = false;
        let errMsg =
          err && err.data && err.data.data.message
            ? err.data.data.message
            : JSON.stringify(err);
        Notify({
          type: "warning",
          message: errMsg,
        });
      }
    },
    //删除视频事件
    beforeVideo(file) {
      if (this.videoList.length != 0) {
        this.videoList.splice(0, 1);
      }
    },
    //上传视频的回调事件
    afterReadVideo(obj) {
      let videoFile = obj.file;
      let _file = {
        content: obj.content,
        url: "",
        status: "uploading",
        message: "上传中...",
      };
      if (videoFile.size >= 40 * 1024 * 1024) {
        Notify({
          type: "warning",
          message: "视频不能大于40MB",
        });
        return;
      }
      this.videoList.push(_file);
      this.videoFile = videoFile;
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

    //创建成员名片接口
    addCart(params) {
      this.$http.addCart(params).then((res) => {
        if (res.data.code != 20000) {
          Notify({ type: "warning", message: res.data.message });
          return;
        } else {
          this.addBussiness(this.model);
        }
      });
    },
    addBussiness(params) {
      this.$http.addBussiness(params).then((res) => {
        if (res.data.code == 1009) {
          Notify({ type: "warning", message: res.data.message });
          return;
        } else {
          Notify({ type: "success", message: "保存成功" });
          this.$router.back();
        }
      });
    },
    getBussinessUser() {
      this.$http.getBussinessUser().then((res) => {
        if (res.data.code == 1009) {
          this.isShow = true;
        } else {
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
          this.showImg = true;
          this.isShow = false;
        }
      });
    },
    setUserId() {
      this.$http
        .setUserId({ userId: "9b3b7180967c49de88e8295000390005" })
        .then(() => {
          this.getBussinessUser();
        });
    },
    //接口结束
  },
  created() {
    this.getAuthorizeWxUserId().then(wxUserId => {
      this.getBussinessUser()
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
    padding: 10px 0;
    background-color: #fff;
    .avatar-div {
      color: #646566;
      padding: 0.26667rem 0.42667rem;
      .avatar-text {
        display: flex;
        span {
          margin-top: 30px;
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
        .tongbu-btn {
          // border: 1px solid green;
          height: 20px;
          line-height: 20px;
          margin-left: auto;
          span {
            vertical-align: 2px;
            // border: 1px solid black;
            // padding: 0;
          }
          .replay-icon {
            margin-left: 5px;
          }
        }
      }
      .avatar-img {
        margin-left: 45px;
        position: relative;
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
    .tarbar-item {
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
    .education-item-tag {
      padding: 10px 20px;
      background-color: #fff;
      margin-bottom: 50px;
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
    .images-item {
      .images-text {
        color: #646566;
        padding: 10px 15px;
      }
      .upclass {
        margin-left: 45px;
      }
      .picup {
        margin-left: 45px;
        width: 80%;
      }
    }
    .sumbit-btn {
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
        margin-left: 10px;
        border-radius: 5px;
        padding: 5px 10px;
        color: #646566;
        border: 1px solid green;
      }
      .video-progress {
        margin-bottom: 20px;
      }
    }
  }
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
.loading-div {
  margin: 0 0 10px 45px;
  padding: 10px 0;
}
.picup-ppt {
  margin-left: 45px;
  border-radius: 5px;
  padding: 5px 10px;
  color: #646566;
  border: 1px solid green;
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
