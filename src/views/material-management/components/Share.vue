<template>
  <div class="share">
    <img @click="share" src="../../../assets/material/share.png" />
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    // 如果素材分享失败，有可能是素材过期（三天有效期，请与后台进行沟通，或查看官方文档https://work.weixin.qq.com/api/doc/90000/90135/90253）
    share() {
      let link = "";
      var personId = sessionStorage.getItem("personId");
      var authorizeUserId = sessionStorage.getItem("authorizeUserId");
      console.log("this.data", this.data);
      if (this.data.radarId) {
        if (this.data.radarId && this.data.isRadar) {
          // 单聊构建雷达链接
          link = `${this.baseUrl}/api/v1/radar/redirect?customerId=${personId}&id=${this.data.radarId}&userId=${authorizeUserId}&channel=material`;
        }
      }
      let options = {};
      console.log("嘟嘟嘟", link);
      // 文本(“text”)
      if (this.data.type == "text") {
        let customerId = sessionStorage.getItem("setCustomerId");
        console.log(customerId, authorizeUserId);
        if (!customerId || !authorizeUserId) {
          Toast.fail("授权失败，请刷新重试");
          return;
        }
        let pamars = {
          id: this.data.id,
          userId: authorizeUserId,
          customerId,
        };
        console.log("发送文本");
        this.getSpeechcraftManagementPage(pamars, (res) => {
          console.log("获取成功", res);
          options = {
            msgtype: "text",
            text: {
              content: res.data.data.content,
            },
          };
          this.invokeFun(options);
        });
        return;
      }
      // 图片(“image”)
      if (this.data.type == "image") {
        options = {
          msgtype: "image",
          image: {
            mediaid: this.data.mediaId,
          },
        };
      }
      // 视频(“video”)
      if (this.data.type == "video") {
        // if(link){
          options = {
            msgtype: "news",
            news: {
              link: link?link:this.data.videoUrl, // h5消息页面url必填
              title: this.data.name, // 消息标题
              desc: '点击播放视频', // 消息摘要
              imgUrl: this.imgUrl + this.data.imageUrl, // 消息封面图片URL
            },
          };
        // }else{
        //   options = {
        //     msgtype: "video",
        //     video: {
        //       mediaid: this.data.mediaId,
        //     },
        //   };
        // }
      }
      // H5(“news”
      if (
        this.data.type == "image_text" ||
        this.data.type == "numerous_image_text"
      ) {
        if (!this.data.link) {
          Toast.fail("图文信息不完整");
        }
        options = {
          msgtype: "news",
          news: {
            link: link ? link : this.data.link,
            title: this.data.name,
            desc: this.data.content,
            imgUrl: this.imgUrl + this.data.imageUrl,
          },
        };
      }
      // 文件(“file”)
      if (this.data.type == "file") {
        let title = this.data.name;
        let desc = "点击查看文件"; // 当前默认

        let fileType = this.checkFileSuffix(this.data.file);
        let imgUrl =
          this.imgUrl +
          "/attachments/scrm/96514dde897b4d9fbf9830e9bba9561d.png"; // 默认图片
        if (fileType === "pdf") {
          imgUrl =
            this.imgUrl +
            "/attachments/scrm/f272ae33bf3c45979eb80ad521fd9def.png";
        } else if (fileType === "xls") {
          imgUrl =
            this.imgUrl +
            "/attachments/scrm/74999bb38e7f4000b04bcd7a6f3aecd5.png";
        } else if (fileType === "docx") {
          imgUrl =
            this.imgUrl +
            "/attachments/scrm/27cf0772ebb34efb9a78b38994357695.png";
        } else if (fileType === "txt") {
          imgUrl =
            this.imgUrl +
            "/attachments/scrm/96514dde897b4d9fbf9830e9bba9561d.png";
        } else if (fileType === "ppt") {
          imgUrl =
            this.imgUrl +
            "/attachments/scrm/e7efa247eb694908bae29a53b87aa909.png";
        }
        if (link) {
          options = {
            msgtype: "news",
            news: {
              link: link, // h5消息页面url必填
              title: title, // 消息标题
              desc: desc, // 消息摘要
              imgUrl: imgUrl, // 消息封面图片URL
            },
          };
        } else {
          options = {
            msgtype: "file",
            file: {
              mediaid: this.data.mediaId,
            },
          };
        }
      }
      // 小程序(“miniprogram”)
      if (this.data.type == "program") {
        options = {
          msgtype: "miniprogram",
          miniprogram: {
            appid: this.data.programId,
            title: this.data.name,
            imgUrl: this.imgUrl + this.data.imageUrl,
            page: this.data.link,
          },
        };
      }
      console.log(options);
      this.invokeFun(options);
    },

    // 文件名后缀
    checkFileSuffix(name) {
      let fileSuffix = name.substring(name.lastIndexOf(".") + 1);
      let value = "";
      if (fileSuffix === "pdf") {
        value = "pdf";
      } else if (fileSuffix === "xls" || fileSuffix === "xlsx") {
        value = "xls";
      } else if (fileSuffix === "doc" || fileSuffix === "docx") {
        value = "docx";
      } else if (fileSuffix === "ppt" || fileSuffix === "pptx") {
        value = "ppt";
      } else {
        value = "txt";
      }
      return value;
    },
    //
    invokeFun(options) {
      wx.invoke("sendChatMessage", options, (res) => {
        console.log("进来了哈哈哈");
        if (res.err_msg == "sendChatMessage:ok") {
          //发送成功
          console.log("发送成功");
        } else {
          console.log("发送失败");
          console.log("this.data.type", this.data.type);
          if (this.data.type == "program") {
            Toast.fail("参数配置错误");
          } else {
            Toast.fail("素材已过期");
          }

          // Toast.fail("素材已过期或参数配置错误");
        }
      });
    },
    // 预览文本素材，替换昵称
    getSpeechcraftManagementPage(options, callback) {
      this.$http.getSpeechcraftManagementPage(options).then((res) => {
        console.log("getSpeechcraftManagementPage", res);
        if (callback) {
          callback(res);
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.share {
  display: flex;
  align-items: center;
  img {
    width: 30px;
    height: 30px;
  }
}
</style>