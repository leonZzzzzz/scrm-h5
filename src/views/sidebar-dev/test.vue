<template>
  <div>请求时间：ms</div>
</template>

<script>
export default {
  created() {
    // this.getWxJsJdkConfig();
  },
  data() {
    return {
      contextType: "",
    };
  },
  methods: {
    // 1.0 获取授权
    getWxJsJdkConfig() {
      let options = [
        "sendChatMessage",
        "getContext",
        "getCurExternalContact",
        "getCurExternalChat",
      ];
      let code = window.location.pathname.split("/")[1];
      this.setPower(options, code, () => {
        this.getContext();
      });
    },
    // 2.0 获取页面入口环境
    getContext() {
      wx.invoke("getContext", {}, (res) => {
        if (res.err_msg == "getContext:ok") {
          // entry = res.entry;
          console.log("获取页面入口环境成功");
          this.getCurExternalContact();
          // if (entry == "single_chat_tools") {
          //   // 单聊
          //   this.contextType = "single";
          // } else if (entry == "group_chat_tools") {
          //   // 群聊
          //   this.contextType = "group";
          // } else {
          //   this.contextType = "single";
          // }
        } else {
          //错误处理
          console.log("获取入口失败");
        }
      });
    },
    // 5.0 获取当前外部联系人userid
    getCurExternalContact() {
      wx.invoke("getCurExternalContact", {}, (res) => {
        if (res.err_msg == "getCurExternalContact:ok") {
          console.log("当前外部联系人userId", res.userId);
          clearInterval(this.timer)
        } else {
          //错误处理
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>