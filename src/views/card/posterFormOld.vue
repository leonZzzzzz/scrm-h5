<template>
  <div :style="{ height: docmHeight + 'px' }">
    <qc-nav-bar></qc-nav-bar>
    <div class="content" id="content" style="display:block">
      <div
        id="imageWrapper"
        style="width:330px !important;;height:550px;background:#f9f9f9; "
      >
        <img
          style="display:block;positon:relative;"
          width="330"
          mode="widthFix"
          :src="backgroundImg"
        />
        <div class="parent">
          <div class="left">
            <img :src="tableData.avatar" />
          </div>
          <div class="right">
            <div class="content">
              <div class="imgbg">
                <div class="bg-name">{{ tableData.name }}</div>
                <div class="bg-position">{{ tableData.position || "--" }}</div>
              </div>

              <div class="test-tel">
                <div class="test-address-content">
                  {{ tableData.phone || "--" }}
                </div>
                <div class="test-address-Title">
                  <span
                    style="font-size: 12px;
color: #ddd;"
                    class="iconfont icon-dianhua1"
                  ></span>
                </div>
              </div>
              <div class="test-email">
                <div class="test-address-content">
                  {{ tableData.email || "--" | ellipsis }}
                </div>
                <div class="test-address-Title">
                  <span
                    style="font-size: 12px;
color: #ddd;"
                    class="iconfont icon-youxiang"
                  />
                </div>
              </div>
              <div class="test-address">
                <div class="test-address-content">
                  {{ tableData.address || "--" | addressEllipsis }}
                </div>
                <div class="test-address-Title">
                  <span
                    style="font-size: 12px;
color: #ddd;"
                    class="iconfont icon-dizhi"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="habs" :style="qrcodeStyle">
          <van-image
            :src="qrcode"
            @click="showUpDate = !showUpDate"
          ></van-image>
          <van-uploader
            class="picup"
            v-if="showUpDate"
            :after-read="afterRead"
            multiple
            :max-count="1"
          >
            <van-button class="alter" style="width: 90px !important;"
              >点击修改</van-button
            >
          </van-uploader>
        </div>
      </div>
    </div>

    <!-- <div class="picbox">
      <div
        v-for="(pic, index) in bottomPhoto"
        style="margin-right:10px;"
        :key="index"
      >
        <van-image
          width="60px"
          height="95px"
          :src="pic.host + pic.background"
          :class="pic.background != item.background ? 'surn' : ''"
          @click="onChange(pic)"
        ></van-image>
      </div>
    </div> -->

    <div class="btn" v-if="hidshow">
      <van-button class="btnicon" round type="info" @click="clickGeneratePic"
        >制作完成，保存图片</van-button
      >
    </div>
    <div v-if="showmodel" class="modelcon">
      <div
        @click="showmodel = false"
        style="width:100%;height:100%;position:fixed;top:0;left:0,z-index:8;background:#000;opacity:0.7"
      ></div>
      <div
        id="modelId"
        style="width:100%;top:30px;height:80%;overflow:auto;text-align:center;position:absolute;"
      >
        <span class="tips">长按图片保存到相册</span>
        <span class="delmodel" @click="showmodel = false">x</span>
      </div>
    </div>
    <dia-loading :loading="isLoading"></dia-loading>
  </div>
</template>

<script>
import html2canvas from "html2canvas";
import DiaLoading from "../../components/common/loading";
import QcNavBar from "../../components/common/QcNavBar";
import { Notify } from "vant";
export default {
  components: {
    DiaLoading,
    QcNavBar,
  },
  data() {
    return {
      item: {
        background: "",
        height: "",
        host: "",
        id: "",
        name: "",
        qrcodeOffsetX: 0,
        qrcodeOffsetY: 0,
        qrcodeSize: 0,
        width: 0,
      },
      docmHeight: "0", //默认屏幕高度
      showHeight: "0", //实时屏幕高度
      hidshow: true, //显示或者隐藏footer,
      isResize: false, //默认屏幕高度是否已获取,
      bottomPhoto: [],
      qrcodeList: {},
      qrcodeStyle: {},
      qrcode: "",
      showUpDate: false,
      isLoading: true,
      showmodel: false,
      backgroundImg: "",
      tableData: [],
    };
  },
  methods: {
    //保存截图
    clickGeneratePic() {
      this.showmodel = true;
      this.showUpDate = false;
      this.isLoading = true;
      var targetDom = document.getElementById("imageWrapper");
      var opts = {
        scale: 2,
        dpi: 300,
        allowTaint: true,
        taintTest: true,
        letterRendering: true,
      };

      html2canvas(targetDom, opts).then((canvas) => {
        let saveUrl = canvas.toDataURL("image/png");
        let oImg = document.createElement("img");
        oImg.id = "oImg";
        oImg.className = "o-img";
        oImg.src = saveUrl; //imgUrl是html2canvas返回的截图的base64码
        oImg.style.width = "85%";
        var modelId = document.getElementById("modelId");
        this.isLoading = false;
        modelId.appendChild(oImg); //将生成的截图放到页面中
      });
    },

    afterRead(e) {
      this.qrcode = e.content;
      this.showUpDate = false;
    },
    onChange(pic) {
      this.showUpDate = false;
      this.item = pic;
      this.$http
        .baseTo({ imageHttpUrl: this.item.host + this.item.background })
        .then((res) => {
          this.backgroundImg = "data:image/jpeg;base64," + res.data.message;
        });
      this.qrcodeStyle = {
        left: this.item.qrcodeOffsetX + "px",
        top: this.item.qrcodeOffsetY + "px",
        width: this.item.qrcodeSize + "px",
      };
      this.isLoading = true;
      setTimeout(() => {
        this.getQrcode(pic.id);
      }, 1000);
    },
    //接口方法开始
    //获取背景图片和位置的接口
    getPosterPage() {
      this.$http.getPosterPage().then((res) => {
        this.bottomPhoto = res.data.data;
      });
    },
    getQrcode(id) {
      let params = {
        businessCardId: id,
        page: "pages/scrm/card/index",
        type: "weapp",
      };
      this.$http.getQrcode(params).then((res) => {
        if (res.data.code != 20000) {
          Notify({
            type: "warning",
            message: res.data.message,
          });
          return;
        } else {
          this.qrcodeList = res.data.data;
          this.qrcode = this.qrcodeList.host + this.qrcodeList.url;
          this.$http.baseTo({ imageHttpUrl: this.qrcode }).then((res) => {
            this.qrcode = "data:image/jpeg;base64," + res.data.message;
          });
        }
      });
      this.isLoading = false;
    },
    setUserId() {
      this.$http
        .setUserId({ userId: "1b69782562ac42c48c725c3b2940ea8d" })
        .then(() => {
          this.getPosterPage();
          // this.getQrcode(this.$route.query.id);
          // this.imgToBase(this.backgroundImg);
          this.getBussinessUser();
          // this.qrcodeStyle = {
          //   left: this.$route.query.qrcodeOffsetX + "px",
          //   top: this.$route.query.qrcodeOffsetY + "px",
          //   width: this.$route.query.qrcodeSize + "px",
          // };
          // this.getBussinessUser();
        });
    },
    imgToBase(params) {
      this.$http.baseTo({ imageHttpUrl: params }).then((res) => {
        this.backgroundImg = "data:image/jpeg;base64," + res.data.message;
      });
    },
    //获取用户信息
    getBussinessUser() {
      this.$http.getBussinessUser().then((res) => {
        if (res.data.code == 20000) {
          this.tableData = res.data.data;
          let avatar = this.tableData.avatar;
          this.$http
            .baseTo({ imageHttpUrl: this.tableData.avatar })
            .then((res) => {
              this.tableData.avatar =
                "data:image/jpeg;base64," + res.data.message;
            });
        }
        this.getQrcode(res.data.data.id);
        this.qrcodeStyle = {
          left: 65 + "px",
          top: 295 + "px",
          width: 200 + "px",
        };
      });
    },
    //接口方法结束
  },
  created() {
    // if (
    //   this.$route.query.background &&
    //   this.$route.query.height &&
    //   this.$route.query.host &&
    //   this.$route.query.id &&
    //   this.$route.query.name &&
    //   this.$route.query.qrcodeOffsetX &&
    //   this.$route.query.qrcodeOffsetY &&
    //   this.$route.query.qrcodeSize &&
    //   this.$route.query.width
    // ) {
    //   this.item.background = this.$route.query.background;
    //   this.item.height = this.$route.query.height;
    //   this.item.host = this.$route.query.host;
    //   this.item.id = this.$route.query.id;
    //   this.item.name = this.$route.query.name;
    //   this.item.qrcodeOffsetX = this.$route.query.qrcodeOffsetX;
    //   this.item.qrcodeOffsetY = this.$route.query.qrcodeOffsetY;
    //   this.item.qrcodeSize = this.$route.query.qrcodeSize;
    //   this.item.width = this.$route.query.width;
    //   this.backgroundImg = this.item.host + this.$route.query.background;
    // this.setUserId();
    this.getAuthorizeWxUserId().then(wxUserId => {
      this.getPosterPage();
      this.getBussinessUser();
    })
    // }
  },
  filters: {
    ellipsis(value) {
      if (!value) return "";
      if (value.length > 28) {
        return value.slice(0, 28) + "...";
      }
      return value;
    },
    addressEllipsis(value) {
      if (!value) return "";
      if (value.length > 17) {
        return value.slice(0, 17) + "...";
      }
      return value;
    },
  },
  mounted() {
    window.onresize = () => {
      return (() => {
        if (!this.isResize) {
          //默认屏幕高度
          this.docmHeight = document.documentElement.clientHeight;
          this.isResize = true;
        }
        //实时屏幕高度
        this.showHeight = document.body.clientHeight;
      })();
    };
  },
  watch: {
    showHeight: function() {
      console.log(this.docmHeight, this.showHeight);
      if (this.docmHeight > this.showHeight) {
        this.hidshow = false;
      } else {
        this.hidshow = true;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.modelcon {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 888;
}
.tips {
  position: fixed;
  bottom: 10%;
  color: #fff;
  text-align: center;
  width: 100%;
  left: 0;
  font-size: 16px;
}
.delmodel {
  position: fixed;
  bottom: 5%;
  color: #fff;
  text-align: center;
  width: 100%;
  left: 0;
  font-size: 16px;
}
.habs {
  position: absolute;
  padding: 5px;
}
.noinput {
  background: transparent;
  border: none;
  font-size: 12px;
  display: block;
  // width: 125px;
}
.qrpos {
  position: absolute;
}
.alter {
  color: #fff;
  border: none;
  font-size: 12px;
  height: 15px;
  background: #000;
  border-radius: 20px;
  opacity: 0.8;
  padding: 15px 10px;
}
.picup {
  // width: 85px;
  font-size: 10px;
  margin-top: 5px;
}
#imageWrapper {
  // width: 330px;
  // height: 450px;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
  margin-bottom: 20px;
  margin: 0 auto;
  margin-top: 50px;
}
.surn {
  opacity: 0.4;
}
.picbox {
  position: fixed;
  bottom: 60px;
  width: 96%;
  margin-left: 2%;
  display: flex;
  overflow-x: auto;
}
.btn {
  position: fixed;
  bottom: 10px;
  width: 80%;
  left: 10%;
  .btnicon {
    width: 100%;
  }
}
.content {
  height: 550px;
  text-align: center;
  // margin-right: 10px;
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
  // z-index: 888;
}
.parent {
  margin-right: 10px;
  top: 50px;
  height: 200px;
  position: absolute;
  background-color: #f9f9f9;
  overflow: hidden;
  border-radius: 15px;
  .left {
    float: left;
    width: 49%;
    height: 350px;
    // background-color: #fff;
    transform: skew(-7deg) translate(-15px, 0px);
    overflow: hidden;
    img {
      border-top-left-radius: 15px;
      border-bottom-left-radius: 15px;
      transform: skew(7deg) translate(15px, 0px);
      width: 200px;
      height: 200px;
    }
    .none-left {
      color: #616161;
      background-color: #fff;
      text-align: center;
      line-height: 200px;
      transform: skew(7deg) translate(15px, 0px);
    }
  }
  .right {
    float: left;
    padding-left: 5px;
    width: 49%;
    height: 400px;
    transform: skew(-7deg) translate(0px, 0);
    background-color: #fff;
    overflow: hidden;
    .content {
      transform: skew(7deg) translate(20px, 0);
      .test-none {
        text-align: center;
        line-height: 200px;
      }
      .imgbg {
        display: block;
        // border: 1px solid red;
        // margin-top: -10px;
        border-top-right-radius: 15px;
        background-image: url(../../assets/card-pc.png);
        background-repeat: no-repeat;
        width: 200px;
        height: 59px;
        text-align: left;
        // margin-left: -10px;
        .bg-name {
          padding-top: 5px;
          margin-left: 30px;
          color: #353535;
          font-weight: bold;
          font-size: 18px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .bg-position {
          margin-left: 30px;
          font-size: 12px;
          color: #737373;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      .test-tel {
        margin-top: 10px;
        display: flex;
        color: #383838;
        font-size: 12px;
        text-align: right;
        padding: 0 20px 0 30px;
        .test-address-content {
          // border: 1px solid red;
          margin-left: auto;
          // overflow: hidden;
          // text-overflow: ellipsis;
          // display: -webkit-box;
          // -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .test-address-Title {
          margin-left: 5px;
        }
      }
      .test-email {
        margin: 10px 0;
        display: flex;
        color: #383838;
        font-size: 12px;
        text-align: right;
        padding: 0 20px 0 15px;

        .test-address-content {
          padding-bottom: 5px;
          // border: 1px solid red;
          word-wrap: break-word;
          margin-left: auto;
          overflow: hidden;
          // text-overflow: ellipsis;
          // display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .test-address-Title {
          font-size: 14px;
          margin-left: 5px;
        }
      }
      .test-address {
        margin-top: 10px;
        display: flex;
        color: #383838;
        font-size: 12px;
        text-align: left;
        padding: 0 20px 0 10px;

        .test-address-content {
          // border: 1px solid red;
          flex: 1;
          text-align: right;
          overflow: hidden;
          // text-overflow: ellipsis;
          // display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .test-address-Title {
          margin-left: auto;
          font-size: 14px;
          margin-left: 5px;
        }
      }
    }
  }
}
</style>
