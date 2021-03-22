<template>
  <div class="article-detail" :class="{'isShowBack': isShowBack}">
    <qc-nav-bar v-if="isShowBack" color="#222" />
    <section class="card" v-if="card && card.id">
      <img class="carf-img" :src="card.avatar" alt="" />
      <div class="card-info">
        <div class="card-name">{{ card.name }}</div>
        <div class="card-company">{{ card.company }}</div>
      </div>
      <div class="card-btn" v-if="!authorizeLoading" @click.stop="launchMiniprogram(card.id)">进入名片</div>
    </section>
    <p class="article-detail-title">{{ detail.name }}</p>
    <div class="article-detail-content" v-html="(singleContent && singleContent.content) || detail.content"></div>
  </div>
</template>

<script>
import wxSdk from '@/utils/wxSdk';
import ApiScrmClue from '@/api/scrm-clue';
import QcNavBar from "@/components/common/QcNavBar";
import Utils from '@/utils/utils'
export default {
  components: { QcNavBar },
  data() {
    return {
      authorizeLoading: true, // 授权状态
      isShowBack: false,
      wxUserId: '', // 用于获取名片详情
      card: {
        id: '',
        appId: ''
      }, // 名片信息
      detail: {
        name: '',
        content: ''
      },
      // 富文本
      singleContent: {},
    }
  },
  created() {
    console.log('created===>', this.$route)
    if (window && window.history && window.history.length > 1) {
      this.isShowBack = true
    }
    this.getDetail()

    // 企业微信环境才获取名片
    if (Utils.envJudge()) {
      this.getWxJsJdkConfig()
      this.getWXUserId()
      this.getBussinessUser()
    }
  },
  methods: {
    // 获取推文详情，推文详情 = 项目中其他地方写的素材详情
    async getDetail() {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
      });
      this.$http.getMaterialDetail({id: this.$route.query.id}).then(res => {
        this.$toast.clear()
        this.detail = res.data.data
        // 获取富文本内容
        if (this.detail.fileId) this.getContent(this.detail.fileId)
        // 获取分享链接
        this.setShareLink()
      }).catch(() => this.$toast.clear())
    },
    // 获取富文本详情
    async getContent(fileId) {
      let res = await this.$http.scrmClueSingleContent({id: fileId})
      this.singleContent = res.data.data
    },
    // 获取分享链接
    setShareLink() {
      // if (Utils.envJudge()) {
      // 企业微信环境才获取
      ApiScrmClue.getScrmClueCustomerMaterialShareLink({
        materialId: this.detail.id, // 推文ID
        materialType: 'article', // 固定值
        from: '', 
        client: '', // 开发环境才需要传，用于测试; 传client=wework暗示在企微内，传client=wechat暗示在微信内，不然会报错code=40000
      })
      .then(linkRes => {
        let { shareUrl } = linkRes.data.data
        let model = {
          title: this.detail.name,
          desc: '',
          link: shareUrl,
          imgUrl: this.imgHost + this.detail.imgUrl,
        }
        wxSdk.shareSetting(model)
      })
      // }
    },
    async getWXUserId() {
      let wxUserId = await this.getAuthorizeWxUserId()
      this.wxUserId = wxUserId
      this.$http.scrmClueCardByMaterial().then(res => {
        this.card = res.data.data
      })
    },
    // 跳转到名片小程序
    launchMiniprogram() {
      let that = this;
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
        that.$toast.loading({
          message: '加载中...',
          forbidClick: true,
        });
        wx.invoke(
          "launchMiniprogram",
          {
            appid: this.card.appid, // 需跳转的小程序appid
            path: "/pages/scrm/card/index?id=" + this.card.id || "", // 所需跳转的小程序内页面路径及参数。
          },
          function(res) {
            that.$toast.clear()
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
    // 企业微信JSSDK相关配置
    // 通过config接口注入权限验证配置
    getWxJsJdkConfig() {
      let that = this;
      let url = that.domainAddress;
      this.cardBtnLoading = true
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
    // 获取应用ID
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
            this.authorizeLoading = false
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
  }
}
</script>

<style lang="less" scoped>
p {
  margin: 0;
  padding: 0;
}

.article-detail {
  min-height: calc(100vh - 46px);
  color: var(--blank-color);
  background: #fff;
  -webkit-overflow-scrolling: touch; 
  &-title {
    padding: 15px;
    font-size: 19px;
    font-weight: bold;
    line-height: 1.6;
    color: #222;
  }
  &-content {
    padding: 15px;
    padding-top: 0;
    font-size: var(--font-sm);
  }
  .card {
    display: flex;
    // height: 60px;
    margin-bottom: 0;
    margin: 15px;
    padding: 15px;
    align-items: center;
    border-radius: 5px;
    background: #F6F6F6;
    overflow: hidden;
    .carf-img {
      flex-shrink: 0;
      width: 45px;
      height: 45px;
      border-radius: 50%;
      margin-right: 15px;
      background: #f6f6f6;
    }
    .card-info {
      flex: 1;
    }
    .card-name {
      margin-bottom: 5px;
      min-height: 20px;
      font-size: 16px;
      font-weight: bold;
      color: #222222;
    }
    .card-company {
      min-height: 15px;
      font-size: 14px;
      margin-right: 15px;
      color: #58585A;
    }
    .card-btn {
      flex-shrink: 0;
      width: 77px;
      height: 27px;
      line-height: 27px;
      border-radius: 13px;
      text-align: center;
      border: 1px solid #3671C9;
      font-size: 13px;
      font-weight: bold;
      color: #3671C9;
    }
  }
}

.isShowBack {
  padding-top: 46px;
}
</style>