
import Vue from '@/main'
import Store from '@/store/index'
import ApiSidebar from '@/api/sidebar'
// sdk文档 https://work.weixin.qq.com/api/doc/90001/90144/90545

export default {
  // 通过config接口注入权限验证配置
  async getWxJsJdkConfig() {
    const that = this;
    return new Promise((resolve, reject) => {
      // 微信Sdk是否注入，已注入的则直接返回ok，避免重复注入
      const isDone = Store.state.isWxSdkConfigOk
      if (isDone) return resolve()
      // 请求配置参数
      ApiSidebar.getWxJsJdkConfig({ url: Vue.domainAddress })
      .then((res) => {
        let config = res.data.data;
        wx.config({
          beta: true, // 必须这么写，否则wx.invoke调用形式的jsapi会有问题
          debug: false, // 开启调试模式
          appId: config.appId, // 企业微信的corpID
          timestamp: config.timeStamp, // 生成签名的时间戳
          nonceStr: config.nonceString, // 生成签名的随机串
          signature: config.signature, // 签名
          jsApiList: [
            // "updateTimelineShareData",
            // "updateAppMessageShareData",
            "onMenuShareAppMessage",
            "onMenuShareWechat",
            "onMenuShareTimeline", 
            "showOptionMenu",
            "hideOptionMenu",
            "showAllNonBaseMenuItem",
          ], // 需要使用的JS接口列表，凡是要调用的接口都需要传进来
        })
        // 注册成功会触发wx.ready回调
        // 注册失败会触发wx.error回调
        // wxsdk已经注册（不代表注册成功）
        Store.commit('updateIsWxSdkConfigOk', true)
        // 完成回调
        resolve()
        // 显示所有菜单
        that.showAllNonBaseMenuItem()
        // 错误监听
        wx.error(function(err) {
          // config信息验证失败执行相关处理
          // Notify({ type: "warning", message: "config信息验证失败" });
          console.log('wxSdkConfig信息验证失败', err)
          Store.commit('updateIsWxSdkConfigOk', false)
        })
      })
      .catch(err =>  reject())
    })
  },
  // 调用转发/分享
  async shareSetting(model = {}) {
    // 微信Sdk是否注册成功
    const isDone = Store.state.isWxSdkConfigOk
    console.log('微信Sdk是否注册成功==》'+isDone)
    if (isDone) {
      this.onMenuShare(model)
    } else {
      await this.getWxJsJdkConfig(() => {
        this.onMenuShare(model)
      })
    }
  },
  // 配置转发/分享
  onMenuShare(model) {
    let params = {
      // title: '素材海报', // 分享标题
      // desc:'素材海报生成工具-小数桔',
      // link: config.url + model.link, // 分享链接
      // imgUrl: 'http://athena-1255600302.cosgz.myqcloud.com/attachments/common/9f88b4a8a50d4d7f86eeccbaa898649b.png', // 分享图标
      // success: function (data) {
      //   // layer.open({ content: '分享成功', time: 1 });
      //   //alert('分享成功');
      // },
      // cancel: function (data) {
      //   //alert('已取消分享');
      // }
    }
    model = Object.assign(params, model)
    wx.ready(function() {
      // 发送给朋友
      wx.onMenuShareAppMessage(model)
      // 分享微信朋友圈
      wx.onMenuShareTimeline(model)
      // 分享微信好友
      wx.onMenuShareWechat(model)
    })
  },
  // 显示所有菜单按钮
  showAllNonBaseMenuItem() {
    wx.ready(function() {
      // 显示右上角菜单接口
      wx.showOptionMenu();
      // 显示所有功能按钮接口
      wx.showAllNonBaseMenuItem();
    })
  },
  /**
   * 注入config配置信息，传入参数jsApiList为需要使用的js接口列表
   * by-wsh
   */
  setWxJsJdkConfig(jsApiList) {
    return new Promise((resolve, reject) => {
      this.$http.getWxJsJdkConfig({ url: Vue.domainAddress }).then(res => {
        let config = res.data.data
        wx.config({
          beta: true, // 必须这么写，否则wx.invoke调用形式的jsapi会有问题
          debug: false, // 开启调试模式
          appId: config.appId, // 企业微信的corpID
          timestamp: config.timeStamp, // 生成签名的时间戳
          nonceStr: config.nonceString, // 生成签名的随机串
          signature: config.signature, // 签名
          jsApiList: jsApiList, // 需要使用的JS接口列表，凡是要调用的接口都需要传进来
        })
        wx.ready(function() {
          // 注入config信息成功
          resolve()
        })
        wx.error(function(res) {
          // 注入config信息失败
          reject(res)
        })
      })
      .catch(err => {
        reject(err)
      })
    })
  },
  /**
   * 注入config和agentConfig配置信息,传入参数jsApiList为需要使用的js接口列表
   * by-wsh
   */
  setWxJsJdkAgentConfig(jsApiList) {
    let url = Vue.domainAddress
    let pathName = window.location.pathname
    let strs = pathName.split("/")
    let code = strs[1]
    return new Promise((resolve, reject) => {
      ApiSidebar.getWxJsJdkConfig({ url: Vue.domainAddress }).then(res => {
        let config = res.data.data
        wx.config({
          beta: true, // 必须这么写，否则wx.invoke调用形式的jsapi会有问题
          debug: false, // 开启调试模式
          appId: config.appId, // 企业微信的corpID
          timestamp: config.timeStamp, // 生成签名的时间戳
          nonceStr: config.nonceString, // 生成签名的随机串
          signature: config.signature, // 签名
          jsApiList: jsApiList, // 需要使用的JS接口列表，凡是要调用的接口都需要传进来
        })
        wx.ready(function() {
          // 注入config信息成功
          // 先从后台获取应用的id
          ApiSidebar.getAgentId({ code }).then(res => {
            let agentId = res.data.data.agentId
            ApiSidebar.getWxJsJdkAgentConfig({ url, agentId }).then(res => {
              let agentConfig = res.data.data
              wx.agentConfig({
                corpid: agentConfig.appId, // 必填，企业微信的corpid，必须与当前登录的企业一致
                agentid: agentConfig.agentId, // 必填，企业微信的应用id （e.g. 1000247）
                timestamp: agentConfig.timeStamp, // 必填，生成签名的时间戳
                nonceStr: agentConfig.nonceString, // 必填，生成签名的随机串
                signature: agentConfig.signature, // 必填，签名，见附录-JS-SDK使用权限签名算法
                jsApiList: [jsApiList],
                success: function(res) {
                  // 成功回调
                  resolve()
                },
                fail: function(res) {
                  if (res.errMsg.indexOf("function not exist") > -1) {
                    // alert('版本过低请升级')
                    Notify({ type: "warning", message: "企业微信版本过低请升级" });
                  }
                  reject(res)
                },
              });
            })
            .catch(err => {
              reject(err)
            })
          })
          .catch(err => {
            reject(err)
          })
        })
        wx.error(function(res) {
          // 注入config信息失败
          reject(res)
        })
      })
      .catch(err => {
        reject(err)
      })
    })
  },
}
