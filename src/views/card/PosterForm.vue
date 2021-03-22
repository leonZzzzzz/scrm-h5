<template>
  <div :style="{ height: docmHeight + 'px' }">
    <qc-nav-bar></qc-nav-bar>
    <div class="content" id="content" style="display:block">
      <div id="imageWrapper" style="width:330px !important;">
        <img
          style="display:block;positon:relative"
          width="330"
          mode="widthFix"
          :src="backgroundImg"
        />
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

    <div class="picbox">
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
    </div>

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
        this.qrcodeList = res.data.data;
        this.qrcode = this.qrcodeList.host + this.qrcodeList.url;
        this.$http.baseTo({ imageHttpUrl: this.qrcode }).then((res) => {
          this.qrcode = "data:image/jpeg;base64," + res.data.message;
        });
      });
      this.isLoading = false;
    },
    setUserId() {
      this.$http
        .setUserId({ userId: "1c49f23477b14516b73783c1de4e038e" })
        .then(() => {
          this.getPosterPage();
          this.getQrcode(this.$route.query.id);
          this.imgToBase(this.backgroundImg);
          this.qrcodeStyle = {
            left: this.$route.query.qrcodeOffsetX + "px",
            top: this.$route.query.qrcodeOffsetY + "px",
            width: this.$route.query.qrcodeSize + "px",
          };
          // this.getBussinessUser();
        });
    },
    imgToBase(params) {
      this.$http.baseTo({ imageHttpUrl: params }).then((res) => {
        this.backgroundImg = "data:image/jpeg;base64," + res.data.message;
      });
    },
    //接口方法结束
  },
  created() {
    if (
      this.$route.query.background &&
      this.$route.query.height &&
      this.$route.query.host &&
      this.$route.query.id &&
      this.$route.query.name &&
      this.$route.query.qrcodeOffsetX &&
      this.$route.query.qrcodeOffsetY &&
      this.$route.query.qrcodeSize &&
      this.$route.query.width
    ) {
      this.item.background = this.$route.query.background;

      this.item.height = this.$route.query.height;
      this.item.host = this.$route.query.host;
      this.item.id = this.$route.query.id;
      this.item.name = this.$route.query.name;
      this.item.qrcodeOffsetX = this.$route.query.qrcodeOffsetX;
      this.item.qrcodeOffsetY = this.$route.query.qrcodeOffsetY;
      this.item.qrcodeSize = this.$route.query.qrcodeSize;
      this.item.width = this.$route.query.width;
      this.backgroundImg = this.item.host + this.$route.query.background;
      // this.setUserId();
      this.getAuthorizeWxUserId().then(wxUserId => {
        this.getPosterPage();
        this.getQrcode(this.$route.query.id);
        this.imgToBase(this.backgroundImg);
        this.qrcodeStyle = {
          left: this.$route.query.qrcodeOffsetX + "px",
          top: this.$route.query.qrcodeOffsetY + "px",
          width: this.$route.query.qrcodeSize + "px",
        };
      })
    }
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
  height: 500px;
  text-align: center;
  // margin-top: 30px;
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
  // z-index: 888;
}
</style>
