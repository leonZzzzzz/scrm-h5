<template>
  <div :style="{ height: docmHeight + 'px' }">
    <div class="content" id="content" style="display:block">
      <div v-if="userInfo.name">
        {{ userInfo.name }}
        <img
          :src="userInfo.qrCode"
          style="width:30px;height:30px;border:1px solid #000"
        />
      </div>
      <div id="imageWrapper" style="width:330px !important;">
        <!-- <van-image
          width="330"
          mode="widthFix"
          :src="poster"
          @click="showUpDate = false"
        ></van-image> -->
        <img
          style="display:block"
          width="330"
          mode="widthFix"
          :src="poster"
          @click="showUpDate = false"
        />
        <div
          v-for="(item, i) in posterDetail.posterSubs"
          :key="i"
          v-if="item.mark == 'clientName'"
          :style="item.style"
          class="habs"
        >
          <input
            :value="item.content"
            class="noinput"
            :style="'font-size:' + item.style.fontSize"
          />
        </div>
        <div
          v-for="(item, i) in posterDetail.posterSubs"
          :key="i"
          v-if="item.mark == 'memberName'"
          :style="item.style"
          class="habs"
        >
          <input
            :value="userInfo.name"
            class="noinput"
            :style="'font-size:' + item.style.fontSize"
          />
        </div>
        <div
          class="habs"
          v-for="(item, i) in posterDetail.posterSubs"
          :key="i"
          v-if="item.mark == 'code'"
          :style="item.style"
        >
          <van-image
            style="width:90px;height:90px;"
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
    <div class="picbox" v-if="hidshow">
      <div v-for="(pic, index) in bottomPhoto" style="margin-right:10px;">
        <van-image
          width="60px"
          height="95"
          :class="posterDetail.imageUrl == pic.imageUrl ? 'surn' : ''"
          :src="pic.imageUrl"
          @click="onChange(pic.id)"
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
export default {
  components: {
    DiaLoading,
  },
  data() {
    return {
      isLoading: true,
      bottomPhoto: [],
      poster: "",
      qrcode: "",
      showUpDate: false,
      posterDetail: {},
      showmodel: false,
      docmHeight: "0", //默认屏幕高度
      showHeight: "0", //实时屏幕高度
      hidshow: true, //显示或者隐藏footer,
      isResize: false, //默认屏幕高度是否已获取,
      userInfo: {
        name: "",
        qrCode: "",
      },
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
  created() {
    if (this.$route.query.groupId) {
      var userInfo = sessionStorage.getItem("userInfo");
      if (userInfo) {
        this.userInfo = JSON.parse(userInfo);
      }
      var groupId = this.$route.query.groupId;
      this.gainPosterList(groupId);
      this.posterRefer(this.$route.query.id);
    }
  },
  methods: {
    // 图片转base64
    imageUrlToBase64(url, num) {
      //一定要设置为let，不然图片不显示
      let image = new Image();
      //解决跨域问题
      image.setAttribute("crossOrigin", "anonymous");
      image.crossOrigin = "";
      image.src = url + "?v=" + Math.random();
      let that = this;
      //image.onload为异步加载
      image.onload = () => {
        var canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        var context = canvas.getContext("2d");
        context.drawImage(image, 0, 0, image.width, image.height);
        var quality = 0.8;
        //这里的dataurl就是base64类型
        var dataURL = canvas.toDataURL("image/jpeg", quality); //使用toDataUrl将图片转换成jpeg的格式,不要把图片压缩成png，因为压缩成png后base64的字符串可能比不转换前的长！
        if (num == 1) {
          that.poster = dataURL;
          this.isLoading == false;
        } else if (num == 2) {
          this.isLoading = false;
          that.qrcode = dataURL;
        }
      };
    },
    // 修改二维码
    afterRead(e) {
      this.qrcode = e.content;
      this.showUpDate = false;
    },
    // 详情
    posterRefer(id) {
      this.$http.posterMatterDetail({ id: id }).then((res) => {
        this.posterDetail = res.data.data;
        this.poster = "data:image/jpeg;base64," + this.posterDetail.link;
        // this.imageUrlToBase64(this.posterDetail.imageUrl,1)
        this.posterDetail.posterSubs.forEach((val) => {
          if (val.type == "text") {
          } else if (val.type == "img") {
            this.imageUrlToBase64(val.imgUrl, 2);
            val.style.width = "90px";
            val.style.height = "90px";
          }
        });
        this.isLoading = false;
      });
    },
    // 海报列表
    gainPosterList(id) {
      this.$http
        .posterMatterList({ type: "poster", groupId: id })
        .then((res) => {
          this.bottomPhoto = res.data.data.list;
        });
    },
    // 切换图片
    onChange(id) {
      this.showUpDate = false;
      this.isLoading = true;
      setTimeout(() => {
        this.posterRefer(id);
      }, 1000);
    },
    // 保存海报
    clickGeneratePic() {
      var that = this;
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
        // oImg.style.position='absolute'
        // oImg.style.left='0px'
        // oImg.style.top='50px'
        // oImg.style.marginTop='30px'
        oImg.style.width = "85%";
        var modelId = document.getElementById("modelId");
        this.isLoading = false;
        modelId.appendChild(oImg); //将生成的截图放到页面中

        // var image=new Image()
        // image.src=saveUrl
        // image.setAttribute("crossOrigin", "anonymous");
        // image.onload = function() {
        //   let aLink = document.createElement('a')
        //   let blob = that.base64ToBlob(image.src)
        //   let evt = document.createEvent('HTMLEvents')
        //   evt.initEvent('click', true, true)
        //   aLink.download = '海报.jpg'
        //   aLink.href = URL.createObjectURL(blob)
        //   aLink.click()
        // };
      });
    },

    //这里把图片转base64
    base64ToBlob(code) {
      let parts = code.split(";base64,");
      let contentType = parts[0].split(":")[1];
      let raw = window.atob(parts[1]);
      let rawLength = raw.length;
      let uInt8Array = new Uint8Array(rawLength);
      for (let i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
      }
      return new Blob([uInt8Array], { type: contentType });
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
