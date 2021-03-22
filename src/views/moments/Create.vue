<template>
  <div class="page" :style="`height:${pageHeight}px`">
    <div class="nav-bar">
      <van-icon
        name="arrow-left"
        class="left-arrow"
        :class="isMobile ? 'left-arrow-icon-mobile' : 'left-arrow-icon'"
        @click="$router.go(-1)"
        />
      <p class="page-title">发布动态圈</p>
      <div :class="['submit', { active: isHas }]" @click="submit">发布</div>
    </div>
    <div class="main-content">
      <div class="message">
        <van-field
          class="message-text"
          v-model="message.content"
          autosize
          type="textarea"
          placeholder="在此输入文字内容..."
          @input="vanFieldChange"
        />
        <div class="enclosure">
          <!-- 图片 -->
          <div class="image" v-if="type == 'image'">
            <upload-image
              :fileList="imageFileList"
              :count="9"
              acceptTypes=".jpg,.jpeg,.png,.gif"
              class="upclass"
            ></upload-image>
          </div>
          <!-- 视频 -->
          <div class="video" v-if="type == 'video'">
            <upload-video @success="videoSuccess"></upload-video>
          </div>
          <!-- 图文链接 -->
          <div class="image_text" v-if="type == 'imageText'">
            <ul class="xfo-form">
              <li class="xfo-form-item">
                <div class="xfo-label">链接标题</div>
                <div class="xfo-item">
                  <van-field
                    v-model="imageText.title"
                    placeholder="请输入链接标题"
                    @input="imageTextChange"
                  />
                </div>
              </li>
              <li class="xfo-form-item">
                <div class="xfo-label">链接简介</div>
                <div class="xfo-item">
                  <van-field
                    v-model="imageText.description"
                    placeholder="请输入链接简介"
                    @input="imageTextChange"
                  />
                </div>
              </li>
              <li class="xfo-form-item">
                <div class="xfo-label">链接地址</div>
                <div class="xfo-item">
                  <van-field
                    v-model="imageText.link"
                    placeholder="请输入链接地址"
                    @input="imageTextChange"
                  />
                </div>
              </li>
              <li class="xfo-form-item">
                <div class="xfo-label">链接封面</div>
                <div class="xfo-item">
                  <upload-image
                    :fileList="imageTextFileList"
                    :count="1"
                    class="upclass"
                    style="margin-left: 16px; margin-top: 10px"
                  ></upload-image>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import debounce from 'lodash/debounce';
import { Field, Cell, CellGroup, Toast, Icon, Image } from "vant";
import QcNavBar from "../../components/common/QcNavBar.vue";
import UploadImage from "../../components/common/UploadImage.vue";
import UploadVideo from "../../components/common/UploadVideo.vue";
export default {
  components: {
    QcNavBar,
    vanField: Field,
    vanCell: Cell,
    vanCellGroup: CellGroup,
    vanToast: Toast,
    vanIcon: Icon,
    vanImage: Image,
    UploadImage,
    UploadVideo,
  },
  watch: {
    imageFileList() {
      if (this.imageFileList.length != 0 && this.message.content != "") {
        this.isHas = true;
      } else {
        this.isHas = false;
      }
    },
    imageTextFileList() {
      if (
        this.message.content != "" &&
        (this.imageFileList.length != 0 ||
          this.videoFileId != "" ||
          (this.imageText.title &&
            this.imageText.link &&
            this.imageText.description &&
            this.imageTextFileList.length != 0))
      ) {
        this.isHas = true;
      } else {
        this.isHas = false;
      }
    },
  },
  created() {
    this.getCustomerList();
    this.type = this.$route.query.type;
    // this.$http.setUserId({ userId: "686085b7e58b4175b08105a5048387ca" });
  },
  mounted() {
    this.$nextTick(() => {
      this.getPageHeight();
    });
  },
  destroyed() {
    this.$store.commit("customer/setCustomerList", []);
  },
  data() {
    return {
      message: {
        content: "",
      },
      pageHeight: 400,
      isHas: false,
      imageUrl: [],
      customerList: [],
      type: "text",
      imageFileList: [],
      imageTextFileList: [],
      imageText: {
        type: "3",
        title: "",
        link: "",
        description: "",
      },
      videoFileId: "",
      videoFileUrl: "",
    };
  },
  methods: {
    getPageHeight() {
      this.pageHeight = window.innerHeight;
    },
    getCustomerList() {
      this.customerList = this.$store.state.customer.customerList;
      console.log(this.customerList);
    },
    vanFieldChange: debounce(function() {
      if (this.type == "text") {
        if (this.message.content != "") {
          this.isHas = true;
        } else {
          this.isHas = false;
        }
        return;
      }
      if (this.type == "image") {
        if (this.message.content != "" && this.imageFileList.length != 0) {
          this.isHas = true;
        } else {
          this.isHas = false;
        }
        return;
      }
      if (this.type == "video") {
        if (this.message.content != "" && this.videoFileId != "") {
          this.isHas = true;
          return;
        } else {
          this.isHas = false;
        }
        return;
      }
      if (this.type == "imageText") {
        if (
          this.message.content != "" &&
          this.imageText.title &&
          this.imageText.link &&
          this.imageText.description &&
          this.imageTextFileList.length != 0
        ) {
          this.isHas = true;
        } else {
          this.isHas = false;
        }
        return;
      }
    }, 500),
    imageTextChange() {
      if (
        this.message.content != "" &&
        this.imageText.title &&
        this.imageText.link &&
        this.imageText.description &&
        this.imageTextFileList.length != 0
      ) {
        this.isHas = true;
      } else {
        this.isHas = false;
      }
    },
    videoSuccess(val) {
      console.log("视频上传成功", val);
      this.videoFileId = val.fileId || "";
      this.videoFileUrl = val.videoUrl || "";
      console.log("this.message.content", this.message.content);
      console.log("this.videoFileId", this.videoFileId);
      if (this.message.content != "" && this.videoFileId != "") {
        this.isHas = true;
      } else {
        this.isHas = false;
      }
    },
    chooseCustomer() {
      this.$router.push({
        path: "/moments/customer",
      });
    },
    submit() {
      if (this.isHas) {
        let options = {
          content: this.message.content,
          momentsUploadContentList: [],
        };
        let reg = new RegExp(this.imgHost);
        if (this.type == "text") {
          options.type = "-1";
          options.momentsUploadContentList = [
            {
              type: "-1",
            },
          ];
        }
        if (this.type == "image") {
          options.type = "1";
          this.imageFileList.forEach((item) => {
            let url = item.url.split(reg)[1];
            options.momentsUploadContentList.push({
              type: "1",
              url,
            });
          });
        }
        if (this.type == "imageText") {
          options.type = "3";
          let url = this.imageTextFileList[0].url
            ? this.imageTextFileList[0].url.split(reg)[1]
            : "";
          options.momentsUploadContentList = [
            {
              type: "3",
              title: this.imageText.title,
              link: this.imageText.link,
              description: this.imageText.description,
              url,
            },
          ];
        }
        if (this.type == "video") {
          options.type = "2";
          options.momentsUploadContentList = [
            {
              type: "2",
              url: this.videoFileUrl,
              fileId: this.videoFileId,
            },
          ];
        }
        console.log("数据", options);
        this.momentsInsert(options, (res) => {
          console.log(res);
          this.$router.go(-1);
        });
      }
    },
    momentsInsert(options, callback) {
      this.$http.momentsInsert(options).then((res) => {
        if (callback) {
          callback(res);
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
@black-color: #323233;
@gray-color: #c0c0c0;
@theme-color: #294a7b;

::v-deep .van-cell {
  font-size: 16px;
}

.page {
  min-height: 100%;
  color: @black-color;
  font-size: 16px;
  background-color: #fff;
  overflow: auto;
  -webkit-overflow-scrolling: touch; 
  overflow-scrolling: touch;
}
.nav-bar {
  position: sticky;
  top: 0;
  left: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  .submit {
    width: 72px;
    padding: 5px 20px;
    border-radius: 4px;
    color: #bcd5fa;
    box-sizing: border-box;
    &.active {
      color: #294a7b;
    }
  }
  .page-title {
    font-size: 16px;
  }
  .left-arrow {
    width: 72px;
    padding: 0px 10px;
    height: 45px;
    line-height: 45px;
    font-size: 20px;
    color: @black-color;
    box-sizing: border-box;
  }
}
.main-content {
  width: 100%;
  padding: 0 10px;
  box-sizing: border-box;
  position: relative;
  background-color: #fff;
  .message {
    min-height: 200px;
    .message-text {
      max-height: 50vh;
      overflow: auto;
      -webkit-overflow-scrolling: touch; 
      overflow-scrolling: touch;
    }
    .enclosure {
      padding: 10px 20px;
    }
    ::v-deep .van-cell::after {
      display: none;
    }
  }
  
  .van-cell-right {
    display: flex;
    align-items: center;
    .van-image {
      margin-right: 3px;
    }
  }

  .xfo-form {
    width: 100%;
    .xfo-form-item {
      margin-bottom: 16px;
      display: flex;
      color: #3c4043;
      font-size: 16px;
      min-height: 44px;
      line-height: 44px;
      .xfo-item {
        flex: 1;
      }
    }
  }
}

.right-content {
  display: flex;
  align-items: center;
  color: @gray-color;
  & > p {
    font-size: 14px;
  }
  .search-icon {
    color: #e2e2e2;
    font-size: 15px;
    margin-left: 5px;
  }
  ul {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    max-width: 200px;
    li {
      margin-right: 5px;
      height: 27px;
    }
  }
}
.xfo-title {
  display: flex;
  align-items: center;
  color: @black-color;
  height: 100%;
  // flex: 1;
  .van-icon {
    font-size: 20px;
    margin-right: 10px;
  }
}
.xfo-line {
  width: calc(100% - 50px);
  margin: 0 auto;
  pointer-events: none;
  border-bottom: 1px dashed #ebedf0;
  transform: scaleY(.5);
}
.xfo-cell {
  width: auto;
  margin: 0 25px;
  padding-left: 0;
  padding-right: 0;
  box-sizing: border-box;
}
::v-deep .xfo-cell.van-cell::after {
  display: none;
}
</style>
