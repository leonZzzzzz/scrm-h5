export function setPower(options, code, callback) {
    /*
       options 需要使用的JS接口列表，凡是要调用的接口都需要传进来
       code 当前的地址信息

     */
    this.$http.getWxJsJdkConfig({ url: this.domainAddress }).then((res) => {
        console.log("获取权限配置信息", res);
        let data = res.data.data;
        wx.config({
            beta: true,
            debug: false,
            appId: data.appId,
            timestamp: data.timeStamp,
            nonceStr: data.nonceString,
            signature: data.signature,
            jsApiList: options,
        });
        wx.ready(() => {
            console.log("权限配置成功");
            this.$http.getAgentId({ code }).then((res) => {
                console.log("获取企业微信应用id成功", res);
                let agentId = res.data.data.agentId
                this.$http
                    .getWxJsJdkAgentConfig({ url: this.domainAddress, agentId })
                    .then((res) => {
                        console.log("获取注入应用权限", res);
                        let data = res.data.data;
                        wx.agentConfig({
                            corpid: data.appId,
                            agentid: data.agentId,
                            timestamp: data.timeStamp,
                            nonceStr: data.nonceString,
                            signature: data.signature,
                            jsApiList: options,
                            success: (res) => {
                                console.log("注入应用权限成功", res);
                                // 回调
                                if (callback) {
                                    callback()
                                }
                            },
                            fail: (res) => {
                                console.log("注入应用失败");
                                if (res.errMsg.indexOf("function not exist") > -1) {
                                    alert("版本过低请升级");
                                }
                            },
                        });
                    });
            });
        });
        wx.error((res) => {
            Notify({ type: "warning", message: res });
        });
    });
}
// memberId 客户id存储字段
export function oursSetPower(memberId, callback) {
    if (this.$route.query.code) {
        let code = this.$route.query.code
        // 登录
        this.$http.authorizeLogin({ code }).then(res => {
            // 将是否需要登录的参数值设为false，表示不再需要登录
            if (res.data.code === 20000) {
                this[memberId] = res.data.data.userId
                console.log("aa");
            } else if (res.data.code === 12003) {
                this.$http.getLoginStatus().then(res => {
                    this[memberId] = res.data.data.wxUserId
                    console.log("bb");
                    if (callback) {
                        callback(res.data.data.wxUserId)
                    }
                })
            }
        })
    } else {
        this.$http.getLoginStatus().then(res => {
            this[memberId] = res.data.data.wxUserId
            console.log("cc");
            if (callback) {
                callback(res.data.data.wxUserId)
            }
        })
    }
}

// 获取到组件data选项 return 出的对象
export function getVueOptionData() {
  let optionData = this.$options.data()
  let cacheData = {}
  // 只存data选项中的字段，排除掉methods的函数等
  Object.keys(optionData).forEach(k => {
    cacheData[k] = this.$data[k]
  })
  return cacheData
}
