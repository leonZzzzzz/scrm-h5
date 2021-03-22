<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { IS_DEV } from '@/config';
export default {
  beforeDestroy() {
    sessionStorage.removeItem("wxUserId")
    sessionStorage.removeItem("momentData");
  },
  created() {
    if (IS_DEV) {
      // 本地测试环境开启模拟登录
      this.setUserId()
    } else {
      // 授权登录
      this.checkLoginStatus()
    }
  },
  methods: {
    // 模拟登录
    async setUserId() {
      await this.$http.setUserId({ userId: "236e3b2c0ff94eaf8f4dd401ed233164" })
      await this.$http.setWXUserId({ userId: "236e3b2c0ff94eaf8f4dd401ed233164" })
    },
    // 授权登录
    async checkLoginStatus() {
      let url = location.search
      let theRequest = {}
      if (url.indexOf("?") != -1) {
        let str = url.substr(1)
        let strs = str.split("&")
        for (let i = 0; i < strs.length; i++) {
          theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1])
        }
      }
      if (theRequest.code) {
        await this.checkAuthorizeLogin().then(wxUserId => {
          console.log('返回授权的成员信息', wxUserId)
        })
        .catch(err => {
          console.log('错误', err)
        })
      }
    }
  }
};
</script>

<style lang="less">
// 重置html标签默认样式
// @import url('../node_modules/reset-css/less/reset.less');
// @import url('./assets/css/reset.css');
// 阿里iconfont字体图标
@import url("//at.alicdn.com/t/font_2249009_wqgqmhfnk78.css");
@import url("//at.alicdn.com/t/font_2082024_xdm4owf062n.css");
// @import url("//at.alicdn.com/t/font_2249009_pvzjssrahm.css");
// @import url("//at.alicdn.com/t/font_1365381_n74pjff6ezh.css");

// 引入本地字体文件
@import url("./assets/font/font-fase.css"); 

/* 
配置vant icon组件中使用第三方或自定义的字体图标样式 
使用通过 class-prefix 指定类名为 v-font，name为图标名
<van-icon class-prefix="v-font" name="icon-share" />
本文件依赖 iconfont，需要放在阿里字体图标iconfont后面引入
*/
@import url("./assets/font/v-font.css"); 


body {
  width: 100%;
  height: 100%;
  background-color: #f9f9f9;
  font-size: 14px !important;
}
#app {
  font-family: 'PingFang-Medium', 'PingFang SC', 'Noto Sans SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
  background-color: #f9f9f9;
}
</style>
