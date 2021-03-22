<template>
  <div class="card-div">
    <!-- 名片功能已开启 -->
    <div v-if="cardOpenStatus == 'open'">
      <div class="card-bg">
        <img
          v-if="companyData.cover"
          :src="companyData.host + companyData.cover"
          alt=""
        />
      </div>
      <div class="card-container">
        <div class="cardCover">
          <img
            class="Image"
            v-if="companyData.logo"
            :src="companyData.host + companyData.logo"
          />
          <div class="name">{{ companyData.name }}</div>
        </div>
      </div>
      <div class="container">
        <div class="containerDiv">
          <div class="container-item" v-if="isNoShow == false && timeout">
            <div class="item-top" style="color: #294a7b; margin-left: 15px">
              暂无名片权限，请联系管理员开通
            </div>
          </div>
          <div class="container-item" @click="openDetail" v-if="isNoShow == true">
            <div class="item-top" v-if="isShow == true">
              <div class="item-name">
                <div class="name">{{ tableData.name }}</div>
                <div class="position">{{ tableData.position }}</div>
              </div>
              <div class="cover">
                <img class="Image" :src="tableData.avatar" />
              </div>
            </div>
            <div class="item-top" style="color: #294a7b" v-if="isShow == false">
              点击创建名片
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 名片功能已关闭 -->
    <div class="permission-wrapper" v-if="cardOpenStatus == 'close'">
      <div class="permission-tips">
        <img
          src="../../assets/power.png"
          alt=""
          style="width: 150px;"
        />
        <p>尚未开启名片功能，请联系管理员开通</p>
      </div>
    </div>
    <DiaLoading :loading="isLoading"></DiaLoading>
  </div>
</template>

<script>
import DiaLoading from "../../components/common/loading";
export default {
  components: {
    DiaLoading,
  },
  data() {
    return {
      tableData: [],
      isShow: false,
      companyData: [],
      jssdk: {
        checkJsApi: false, // 判断当前客户端版本是否支持指定JS接口
      },
      authorizeUserId: "",
      isNoShow: false,
      timeout: false,
      isLoading: false,
      cardOpenStatus: "", // open已开启，close已关闭
    };
  },
  methods: {
    // 企业微信JSSDK相关配置
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
        wx.ready(function () {
          // config信息验证后执行ready方法，如果在页面加载时就需要调用相关接口，则须把相关接口放在此函数中执行
          // 先从后台获取应用的id
          that.getAgentId();
          wx.hideOptionMenu(); // 隐藏右上角菜单接口
        });
        wx.error(function (res) {
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
          success: function (res) {
            // 回调
            // 判断当前客户端是否支持指定的JS接口
            that.checkJsApi();
            that.isLoading = false;
          },
          fail: function (res) {
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
        success: function (res) {
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
          function (res) {
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
    openDetail() {
      this.$router.push("/card/detail");
    },
    getBussinessUser() {
      this.timeout = false;
      this.$http.getBussinessUser().then((res) => {
        this.isLoading = false;
        if (res.data.code == 20000) {
          this.isShow = true;
          this.tableData = res.data.data;
          // let avatar = "";
          // if (this.tableData.avatar.indexOf("http") > -1) {
          //   avatar = this.tableData.avatar;
          // } else {
          //   avatar = this.tableData.host + this.tableData.avatar;
          // }
          // this.tableData.avatar = avatar;
          this.isNoShow = true;
        } else if (res.data.code == 110) {
          this.timeout = true;
          this.tableData = [];
          this.isNoShow = false;
          this.isShow = true;
        } else {
          this.tableData = [];
          this.isShow = false;
          this.isNoShow = true;
          this.timeout = true;
        }
      });
    },
    getComPage() {
      this.$http.getComPage().then((res) => {
        if (res.data.data) {
          this.companyData = res.data.data;
        }
      });
    },
    setUserId() {
      this.$http
        .setUserId({ userId: "1b69782562ac42c48c725c3b2940ea8d" })
        .then(() => {
          this.getBussinessUser();
          this.getComPage();
        });
    },
    getBusinessCardOpenStatus() {
      return new Promise((resolve, reject) => {
        this.$http.getBusinessCardOpenStatus().then((res) => {
          let openStatus = res.data.data
          if (openStatus) {
            this.cardOpenStatus = 'open'
          } else {
            this.cardOpenStatus = 'close'
          }
          resolve(openStatus)
        })
      })
    }
  },
  created() {
    // this.setUserId();
    this.getBusinessCardOpenStatus().then(val => {
      console.log('名片状态值', val)
      if (val) {
        this.getAuthorizeWxUserId().then(wxUserId => {
          this.authorizeUserId = wxUserId
          this.getBussinessUser();
          this.getComPage();
        })
        this.getWxJsJdkConfig();
      }
    })
  },
  mounted() {
    document.title = "名片";
  },
};
</script>
<style lang="less" scoped>
.card-div {
  width: 100%;
  height: 100%;
  .card-bg {
    font-size: 0;
    img {
      width: 100%;
    }
  }

  .card-container {
    width: 100%;
    height: 50px;
    background-color: #fff;
    display: flex;
    box-shadow: 0 0px 10px 0 rgba(0, 0, 0, 0.2);
    .cardCover {
      margin-left: 10%;
      position: relative;
      .Image {
        box-shadow: 0 0px 10px 0 rgba(0, 0, 0, 0.2);
        position: absolute;
        bottom: 15px;
        width: 60px;
        height: 60px;
        border-radius: 10px;
      }
      .name {
        margin-left: 75px;
        font-weight: bold;
        font-size: 15px;
        line-height: 50px;
      }
    }
  }
  .container {
    .containerDiv {
      padding: 10px 0;
      .container-item {
        width: 90%;
        margin-left: 5%;
        margin-top: 20px;
        margin-bottom: 20px;
        background-color: #fff;
        box-shadow: 5px 5px 5px 0 rgba(0, 0, 0, 0.2);
        border-radius: 10px;
        .item-top {
          padding: 40px 40px 40px 40px;
          display: flex;
          justify-content: space-between;
          .item-name {
            .name {
              height: 50%;
              font-weight: bold;
              font-size: 16px;
            }
            .position {
              height: 50%;
              font-size: 14px;
              color: #4c4c4c;
            }
          }
          .cover {
            .Image {
              width: 50px;
              height: 50px;
              border-radius: 10px;
            }
          }
        }
      }
    }
  }
}
.permission-wrapper {
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  .permission-tips {
    text-align: center;
    p {
      text-align: center;
      color: #bfbfc4;
    }
  }
}
</style>
