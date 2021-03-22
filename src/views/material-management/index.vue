<template>
  <div class="material">
    <div class="nav-bar">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div
            :class="['swiper-slide', { active: item.isActive }]"
            v-for="(item, index) in navBar"
            :key="index"
          >
            {{ item.text }}
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
    </div>
    <div class="mian-content">
      <List :type="type" :activeIndex="`0`"></List>
    </div>
    <Loading :loading="loading"></Loading>
  </div>
</template>

<script>
import Swiper from "swiper";
import "swiper/swiper.min.css";
import List from "./List";
export default {
  components: {
    List,
  },

  data() {
    return {
      navBar: [
        // { text: "文本", isActive: true, type: "text" },
        // { text: "图片", isActive: false, type: "image" },
        { text: "单图文", isActive: true, type: "image_text" },
        { text: "多图文", isActive: false, type: "numerous_image_text" },
        { text: "文件", isActive: false, type: "file" },
        { text: "视频", isActive: false, type: "video" },
        // { text: "小程序", isActive: false, type: "program" },
      ],
      navBarIndex: 0,
      type: "image_text",
      loading: true,
      externalUserId: "",
      chatId: "",
      customerModel: "",
      groupChatModel: "",
      authorizeUserId: "",
    };
  },
  created() {
    this.getAuthorizeWxUserId().then(wxUserId => {
      this.authorizeUserId = wxUserId;
      sessionStorage.setItem("authorizeUserId", this.authorizeUserId);
    })
    this.applyPage();
    this.getWxJsJdkConfig();
  },
  mounted() {
    this.swiper();
  },
  methods: {
    /* 页面渲染 */
    swiper() {
      new Swiper(".swiper-container", {
        slidesPerView: 6.5,
        spaceBetween: 0,
        freeMode: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        on: {
          click: (data) => {
            this.navBar.forEach((item) => {
              item.isActive = false;
            });
            this.navBar[data.clickedIndex].isActive = true;
            this.navBarIndex = data.clickedIndex;
            this.type = this.navBar[data.clickedIndex].type;
            sessionStorage.setItem("materialNavType", this.type);
          },
        },
      });
    },
    // 页面回绑
    applyPage() {
      let type = sessionStorage.getItem("materialNavType");
      if (type) {
        this.type = type;
        this.navBar.map((item) => {
          item.isActive = false;
          if (type == item.type) {
            item.isActive = true;
          }
          return item;
        });
      }
    },
    /* 页面渲染 */
    // 1.0 获取授权
    getWxJsJdkConfig() {
      let options = [
        "sendChatMessage",
        "getContext",
        "getCurExternalContact",
        "getCurExternalChat",
      ];
      let code = window.location.pathname.split("/")[1];
      this.loading = true;
      console.log("开始授权");
      this.setPower(options, code, () => {
        console.log("获取授权成功");
        this.getContext();
      });
    },
    // 2.0 获取页面入口环境
    getContext() {
      wx.invoke("getContext", {}, (res) => {
        if (res.err_msg == "getContext:ok") {
          var entry = res.entry; //返回进入h5的入口类型
          // if (entry != "single_chat_tools" && entry != "group_chat_tools") {
          //   this.loading = true;
          //   return;
          // }
          if (entry == "single_chat_tools") {
            // 单聊
            this.$nextTick(() => {
              this.getCurExternalContact();
            });
          } else if (entry == "group_chat_tools") {
            // 群聊
            this.$nextTick(() => {
              this.getCurExternalChat();
            });
          } else {
            this.$nextTick(() => {
              this.getCurExternalContact();
            });
          }
          this.loading = false;
          console.log("获取入口环境成功");
        }
      });
    },
    // 获取外部联系人id
    getCurExternalContact() {
      var that = this;
      wx.invoke("getCurExternalContact", {}, function (res) {
        if (res.err_msg == "getCurExternalContact:ok") {
          that.$nextTick(() => {
            that.externalUserId = res.userId; //返回当前外部联系人userId
            console.log("获取联系人id", that.externalUserId);
            sessionStorage.setItem("setCustomerId", that.externalUserId);
            that.getCustomerDetail(that.externalUserId);
            // this.$store.commit(
            //   "materialManagement/setCustomerId",
            //   that.externalUserId
            // );
          });
        } else {
          //错误处理
          Notify({ type: "warning", message: "无法获取客户信息" });
        }
      });
    },
    // 获取当前客户群的群ID
    getCurExternalChat() {
      var that = this;
      wx.invoke("getCurExternalChat", {}, function (res) {
        if (res.err_msg == "getCurExternalChat:ok") {
          let chatId = res.chatId; //返回当前客户群的群聊ID
          that.chatId = chatId;
          that.getCustomerGroupDetail(chatId);
        } else {
          //错误处理
          Notify({ type: "warning", message: "无法获取客户群信息" });
        }
      });
    },
    // 获取客户详情
    getCustomerDetail(externalUserId) {
      this.$http.getCustomerDetail({ id: externalUserId }).then((res) => {
        this.customerModel = res.data.data;
        sessionStorage.setItem("personId", this.customerModel.id);
        sessionStorage.setItem("singleChat", true);
      });
    },
    // 获取客户群详情
    getCustomerGroupDetail(chatId) {
      this.$http.getGroupDetailByWxId({ chatId: chatId }).then((res) => {
        this.groupChatModel = res.data.data;
        sessionStorage.setItem("flockId", this.groupChatModel.id);
        sessionStorage.setItem("singleChat", false);
      });
    },
  },
};
</script>

<style lang="less" scoped>
.nav-bar {
  position: fixed;
  border-bottom: 2px solid #fbfbfb;
  background-color: #fff;
  z-index: 2000;
  width: 100%;
}
.mian-content {
  padding-top: 40px;
}
.material {
  width: 100%;
  min-height: 100%;
  background-color: #fff;
}
.swiper-container {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  width: 20%;
  text-align: center;
  font-size: 14px;
  background: #fff;
  color: #bebebe;
  padding: 10px 0;
  &.active {
    color: #444444;
    position: relative;
    &::before {
      content: "";
      display: block;
      width: 20px;
      height: 3px;
      background-color: #eec16d;
      position: absolute;
      bottom: 4px;
      left: 0;
      right: 0;
      margin: 0 auto;
    }
  }
}
::v-deep .van-search {
  padding-right: 5px;
}
::v-deep .van-pull-refresh {
  overflow: unset;
}
</style>