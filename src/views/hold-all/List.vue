<template>
  <div class="hold-all-div">
    <!-- <div class="hold-main" style="margin:0;padding: 20px 10px 0 10px;">
      <div class="hold-item" v-for="(item, index) in otherMenu" :key="index">
        <div class="hold-name">
          {{ item.titleName }}
        </div>
        <div class="hold-statistics">
          <div class="statistics-div">
            <div class="statistics-item">
              <div class="statistic-item-num">87</div>
              <div class="statistic-item-font">今日拉新</div>
            </div>
            <div class="statistics-item">
              <div class="statistic-item-num">79</div>
              <div class="statistic-item-font">今日排行</div>
            </div>
            <div class="statistics-item">
              <div class="statistic-item-num">52</div>
              <div class="statistic-item-font">总客户</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="hold-main" style="margin:0;padding: 20px 10px 0 10px;">
      <div class="hold-item" v-for="(item, index) in lifeMenu" :key="index">
        <div class="hold-name">
          {{ item.titleName }}
        </div>
        <div class="hold-life">
          <div class="life-div">
            <span
              :class="item.active ? 'life-item-active' : 'life-item'"
              v-for="(item, index) in navBar"
              :key="index"
              @click="changeActive(item, index)"
            >
              {{ item.text }}
            </span>
          </div>
        </div>
        <div class="life-con">
          <div class="life-con-div">
            <div class="life-content-item-num">87</div>
            <div class="life-content-item-font">今日拉新</div>
          </div>
        </div>
      </div>
    </div> -->
    <div class="hold-main">
      <div class="hold-item" v-for="(item, index) in menu" :key="index">
        <div class="hold-name">{{ item.titleName }}</div>
        <div class="hold-icon-item">
          <div
            class="box"
            v-for="(items, indexs) in item.list"
            :key="indexs"
            @click="changeLine(items.link)"
          >
            <div class="box-icon">
              <svg class="symbol-icon" aria-hidden="true">
                <use :xlink:href="'#' + items.icon"></use>
              </svg>
              <!-- <span :class="items.icon" class="icon-style"></span> -->
            </div>
            <div class="box-name">{{ items.name }}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="hold-tabbar">
      <div
        :class="tabbar.length != 1 ? 'tabbar-item' : 'tabbar-item-two'"
        v-for="(itemss, indexss) in tabbar"
        :key="indexss"
        @click="changeTabbar(itemss.index)"
      >
        <div
          :class="
            tabbarIndex == itemss.index ? 'tabbar-icon-active' : 'tabbar-icon'
          "
        >
          <span :class="itemss.icon"></span>
        </div>
        <div
          :class="
            tabbarIndex == itemss.index ? 'tabbar-name-active' : 'tabbar-name'
          "
        >
          {{ itemss.name }}
        </div>
      </div>
    </div> -->
    <!-- <DiaLoading :loading="isLoading"></DiaLoading> -->
  </div>
</template>

<script>
// import DiaLoading from "../../components/common/loading";

import menu from "./menu";
export default {
  mixins: [menu],
  // components: {
  //   DiaLoading,
  // },
  data() {
    return {
      // isLoading: false, // 是否显示
      tabbarIndex: 0,
      navbarIndex: 0,
    };
  },
  methods: {
    //函数开始
    //点击客户生命周期
    changeActive(item, index) {
      this.navbarIndex = index;
      this.navBar.forEach((items) => {
        items.active = false;
      });
      this.navBar[this.navbarIndex].active = true;
    },
    //点击底部tabbar栏事件
    changeTabbar(index) {
      this.tabbarIndex = index;
    },
    //点击每个图标
    changeLine(link) {
      window.open(link);
    },
    //函数结束
    setUserId() {
      this.$http
        .setUserId({ userId: "1b69782562ac42c48c725c3b2940ea8d" })
        .then(() => {
          this.isLoading = true;
          this.isLoading = false;
        });
    },

    // 通过config接口注入权限验证配置
    getWxJsJdkConfig() {
      let that = this;
      let url = that.domainAddress;
      that.$http.getWxJsJdkConfig({ url }).then((res) => {
        let config = res.data.data;
        wx.config({
          beta: true, // 必须这么写，否则wx.invoke调用形式的jsapi会有问题
          debug: false, // 开启调试模式
          appId: config.appId, // 企业微信的corpID
          timestamp: config.timeStamp, // 生成签名的时间戳
          nonceStr: config.nonceString, // 生成签名的随机串
          signature: config.signature, // 签名
          jsApiList: ["launchMiniprogram"], // 需要使用的JS接口列表，凡是要调用的接口都需要传进来
        });
        wx.ready(function() {
          // config信息验证后执行ready方法，如果在页面加载时就需要调用相关接口，则须把相关接口放在此函数中执行
          // 先从后台获取应用的id
          that.getAgentId();
          wx.hideOptionMenu(); // 隐藏右上角菜单接口
        });
        wx.error(function(res) {
          // config信息验证失败执行相关处理
          Notify({ type: "warning", message: "config信息验证失败" });
        });
      });
    },
    getAgentId() {
      let pathName = window.location.pathname;
      let strs = pathName.split("/");
      let code = strs[1];
      // let code = 'hyzs'
      if (code) {
        this.$http.getAgentId({ code }).then((res) => {
          if (res.data.data.agentId) {
            this.getWxJsJdkAgentConfig(res.data.data.agentId);
          } else {
            Notify({ type: "warning", message: "请检查后台配置是否正确" });
          }
        });
      } else {
        Notify({ type: "warning", message: "请检查后台配置是否正确" });
      }
    },
    // 通过agentConfig注入应用的权限
    getWxJsJdkAgentConfig(agentId) {
      let that = this;
      let url = this.domainAddress;
      that.$http.getWxJsJdkAgentConfig({ url, agentId }).then((res) => {
        let agentConfig = res.data.data;
        wx.agentConfig({
          corpid: agentConfig.appId, // 必填，企业微信的corpid，必须与当前登录的企业一致
          agentid: agentConfig.agentId, // 必填，企业微信的应用id （e.g. 1000247）
          timestamp: agentConfig.timeStamp, // 必填，生成签名的时间戳
          nonceStr: agentConfig.nonceString, // 必填，生成签名的随机串
          signature: agentConfig.signature, // 必填，签名，见附录-JS-SDK使用权限签名算法
          jsApiList: ["launchMiniprogram"],
          success: function(res) {
            // 回调
            // 判断当前客户端是否支持指定的JS接口
            that.checkJsApi();
            that.isLoading = false;
          },
          fail: function(res) {
            if (res.errMsg.indexOf("function not exist") > -1) {
              // alert('版本过低请升级')
              Notify({ type: "warning", message: "企业微信版本过低请升级" });
            }
          },
        });
      });
    },
    checkJsApi() {
      let that = this;
      wx.checkJsApi({
        jsApiList: ["launchMiniprogram"], // 需要检测的JS接口列表，所有JS接口列表见附录2,
        success: function(res) {
          // 以键值对的形式返回，可用的api值true，不可用为false
          // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
          if (res.checkResult.launchMiniprogram) {
            that.jssdk.checkJsApi = true;
          } else {
            that.jssdk.checkJsApi = false;
          }
        },
      });
    },
    // 跳转到名片小程序
    launchMiniprogram() {
      let ua = navigator.userAgent;
      let version = "";
      let isMac = false;
      if (ua.match(/wxwork\/([\d.]+)/)) {
        version = ua.match(/wxwork\/([\d.]+)/)[1];
      }
      if (!this.isMobile) {
        isMac = /macintosh|mac os x/i.test(ua);
      }
      if (isMac) {
        Notify({ type: "warning", message: "mac平台暂不支持此功能" });
        return;
      }
      if (version == "") {
        Notify({ type: "warning", message: "请在企业微信中使用此功能" });
        return;
      }
      console.log(
        "当前版本号:" + version + "->是否为Mac平台:" + isMac + "->ua信息:" + ua
      );
      if (utils.compareVersion(version, "3.0.36") >= 0) {
        wx.invoke(
          "launchMiniprogram",
          {
            appid: this.tableData.appid, // 需跳转的小程序appid
            path: "/pages/scrm/card/index?id=" + this.tableData.id || "", // 所需跳转的小程序内页面路径及参数。
          },
          function(res) {
            if (res.err_msg == "launchMiniprogram:ok") {
              // 正常
              console.log("跳转正常", res);
            } else {
              // 错误处理
              console.log("跳转出错", res);
            }
          }
        );
      } else {
        Notify({
          type: "warning",
          message:
            "当前企业微信版本过低，无法使用该功能，请升级到最新版本后重试。",
        });
      }
    },

    //接口部分的
  },
  created() {
    // this.setUserId();
    this.getAuthorizeWxUserId().then(wxUserId => {
      console.log('返回wxUserId', wxUserId)
    })
    this.getWxJsJdkConfig();
  },
  mounted() {
    document.title = "工作台-小数桔SCRM";
  },
};
</script>
<style lang="less" scoped>
.symbol-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.hold-all-div {
  width: 100%;
  height: 100%;
  overflow-x: hidden;

  .hold-main {
    padding: 20px 10px;
    width: 100%;
    height: 100%;
    .hold-item {
      .hold-name {
        color: #1f1e1e;
        font-size: 16px;
        // font-weight: 700;
      }
      .hold-icon-item {
        // border: 1px solid red;
        padding: 10px 0 20px 0;
        height: 80px;
        text-align: center;
        .box {
          padding-bottom: 10px;
          width: 30%;
          height: 100%;
          margin: 1%;
          float: left;
          .box-icon {
            // color: #e1e7fe;
            height: 50px;
            line-height: 50px;
            .symbol-icon {
              font-size: 24px;
            }
          }
          .box-name {
            font-size: 15px;
            color: #4e4e4e;
          }
        }
      }
      .hold-statistics {
        width: 92%;
        height: 100px;
        margin: 10px 0 0px 0;
        border-radius: 15px;
        background-color: #3672c9;
        box-shadow: 5px 10px 5px rgba(#3672c9, 0.2);
        .statistics-div {
          display: flex;
          height: 100%;
          .statistics-item:not(:last-child)::before {
            position: absolute;
            top: 35px;
            right: 0px;
            width: 1px;
            height: 30px;
            content: "";
            background: #d3ddf2;
          }
          .statistics-item {
            text-align: center;
            margin: 0 auto;
            width: 30%;
            color: #fff;
            position: relative;
            .statistic-item-num {
              margin-top: 15px;
              line-height: 50px;
              font-size: 36px;
              font-weight: blod;
            }
            .statistic-item-font {
              margin-top: 5px;
              font-size: 14px;
              color: #d3ddf2;
            }
          }
        }
      }
      .hold-life {
        width: 95%;
        margin: 10px 0 0px 0;
        overflow-x: scroll !important;
        white-space: nowrap;
        -webkit-overflow-scrolling: touch;

        .life-div {
          width: 95%;
          display: flex;
          .life-item {
            margin-right: 15px;
            border-radius: 15px;
            color: #ff8940;
            padding: 5px 10px;
            background-color: #fde5d4;
            &-active {
              padding: 5px 10px;
              margin-right: 15px;
              border-radius: 15px;
              color: #fff;
              background-color: #fd8f4a;
            }
          }
        }
      }
      .hold-life::-webkit-scrollbar {
        width: 0;
      }
      .life-con {
        margin-top: 10px;
        width: 92%;
        height: 100%;
        background-color: #fd8c44;
        border-radius: 15px;
        box-shadow: 5px 10px 5px rgba(#fd8c44, 0.2);
        display: inline-block;
        color: #fff;
        text-align: center;
        .life-con-div {
          margin-left: 2%;
          float: left;
          width: 30%;
          height: 100px;
          position: relative;
          &:not(:nth-child(3n-2))::after {
            position: absolute;
            top: 35px;
            left: 0px;
            width: 1px;
            height: 30px;
            content: "";
            background: #d3ddf2;
          }
          .life-content-item-num {
            margin-top: 15px;
            line-height: 50px;
            font-size: 36px;
            font-weight: blod;
          }
          .life-content-item-font {
            margin-top: 5px;
            font-size: 14px;
            color: #fee4d7;
          }
        }
      }
    }
  }
  .hold-tabbar {
    bottom: 0;
    left: 0;
    position: absolute;
    width: 100%;
    border-top: 1px solid #ecedef;
    height: 60px;
    .tabbar-item {
      height: 60px;
      text-align: center;
      width: 50%;
      .tabbar-icon {
        padding-top: 10px;
        line-height: 25px;
      }
      .tabbar-icon-active {
        padding-top: 10px;
        line-height: 25px;
        color: #4065dc;
      }
      .tabbar-name {
        line-height: 25px;
        font-size: 12px;
      }
      .tabbar-name-active {
        color: #4065dc;
        line-height: 25px;
        font-size: 12px;
      }
    }
    .tabbar-item-two {
      width: 100%;
      height: 60px;
      text-align: center;
      .tabbar-icon {
        color: #d4d4d4;
        padding-top: 20px;
        line-height: 10px;
      }
      .tabbar-icon-active {
        padding-top: 20px;
        line-height: 10px;
        color: #4065dc;
      }
      .tabbar-name {
        color: #d4d4d4;
        line-height: 25px;
        font-size: 12px;
      }
      .tabbar-name-active {
        color: #4065dc;
        line-height: 25px;
        font-size: 12px;
      }
    }
  }
}
</style>
