<template>
  <div class="detail">
    <!-- <van-nav-bar
      :left-arrow="true"
      left-text="返回"
      :fixed="true"
      @click-left="goBack"
    >
      <template #left>
        <div class="left-arrow">
          <van-icon
            name="arrow-left"
            :class="isMobile ? 'left-arrow-icon-mobile' : 'left-arrow-icon'"
          />返回
        </div>
      </template>
    </van-nav-bar> -->
    <div class="title-box">
      <p class="title">{{ data.title }}</p>
      <p class="desc">{{ data.createTime }}</p>
    </div>
    <div
      v-html="data.content"
      class="d-content"
      @click="getContent"
      ref="content"
    ></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {},
      imgList: [],
    };
  },
  mounted() {
    this.newsGet();
  },
  methods: {
    async newsGet() {
      try {
        let res = await this.$http.newsGet({ id: this.$route.query.id });
        res.data.data.createTime = res.data.data.createTime.substr(0, 16);
        this.data = res.data.data;
        // console.log('文章标题', res.data.data.title)
        document.title = res.data.data.title;
        this.contentReset();
        let contentImg = this.data.content.split('src="');
        if (contentImg.length > 0) {
          contentImg.map((item, i) => {
            if (i > 0) {
              this.imgList.push(item.split('"')[0]);
            }
          });
        }
        this.onMenuShare();
        this.$nextTick(() => {
          document.title = this.data.title;
        });
      } catch (err) {
        // alert('singleContent')
        // alert(JSON.stringify(err.data))
      }
    },
    // onMenuShare () {
    //   wx.onMenuShareAppMessage(
    //     this.data.title,
    //     this.data.info,
    //     `${this.$ROOTPATH}/mobile/POUND/news/detail?wo=1&wot=2&woacm=1&mpl=1&id=${this.$route.query.id}`,
    //     `${this.$COSPATH}${this.data.iconUrl}`
    //   )
    // },
    contentReset() {
      let offsetWidth = this.$refs.content.offsetWidth;
      let contentList = this.data.content.split("width: ");
      console.log(contentList);
      contentList.map((item, i) => {
        if (i > 0) {
          console.log(123);
          if (Number(item.split("px")[0]) > 0) {
            if (Number(item.split("px")[0]) > offsetWidth) {
              let arr = item.split("px");
              arr[0] = "100%";
              item = "";
              arr.map((label, i) => {
                if (i === 0) {
                  item = item + label;
                } else {
                  item = item + label + "px";
                }
              });
              contentList[i] = item;
            }
          }
        }
      });
      this.data.content = "";
      contentList.map((item) => {
        this.data.content = this.data.content + item + "width: ";
        console.log(this.data.content);
      });
      this.data.content = this.data.content.substring(
        0,
        this.data.content.length - 7
      );
      this.data.content = this.data.content.replace(
        /<img/g,
        '<img style="width: 100%"'
      );
      this.data.content = this.data.content.replace(
        /<embed/g,
        '<embed style="width: 100%"'
      );
    },
    nodeToString(node) {
      var tmpNode = document.createElement("div");
      tmpNode.appendChild(node.cloneNode(true));
      var str = tmpNode.innerHTML;
      tmpNode = node = null; // prevent memory leaks in IE
      return str;
    },
    getContent(event) {
      console.log(event);
      let src = this.nodeToString(event.target);
      if (/<img/.test(src)) {
        let contentImg = src.split('src="')[1].split('"')[0];
        this.previewImage(contentImg);
      }
    },
    goBack() {
      this.$router.go(-1);
    },
    previewImage(imgUrl) {
      // wx.previewImage(imgUrl, this.imgList)
      wx.previewImage({
        current: imgUrl,
        urls: this.imgList,
      });
    },
  },
};
</script>

<style lang="less" scoped>
.detail {
  background: #fff;
  padding: 18px;
  overflow: hidden;
  .title-box {
    padding-bottom: 15px;
    margin-bottom: 11px;
    border-bottom: 1px solid #eee;
    .title {
      font-size: 18px;
    }
    .desc {
      font-size: 12px;
      color: rgb(136, 136, 136);
      margin-top: 8px;
    }
  }
}
.left-arrow {
  display: flex;
  align-items: center;
  height: 46px;
  line-height: 46px;
  color: #4f73ad;
  .left-arrow-icon {
    font-size: 16px;
    margin-top: -1px;
    margin-right: 3px;
  }
  .left-arrow-icon-mobile {
    font-size: 16px;
    margin-top: -3px;
    margin-right: 3px;
  }
}
</style>