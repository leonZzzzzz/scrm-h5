export default {
  // 授权处理
  checkAuthorizeLogin() {
    return new Promise((resolve, reject) => {
      console.log('location对象', location)
      // 获取location.search字符串，分割出code
      let url = location.search
      let theRequest = {}
      if (url.indexOf("?") != -1) {
        let str = url.substr(1)
        let strs = str.split("&")
        for (let i = 0; i < strs.length; i++) {
          theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1])
        }
      }
      console.log('code对象', theRequest)
      // code如果存在进行授权
      if (theRequest.code) {
        let code = theRequest.code
        // 授权登录，异常情况都去获取登录状态
        this.$http.authorizeLogin({ code }).then(res => {
          if (res.data.code === 20000) {
            console.log('login成功返回对象', res.data.data)
            // 重置授权次数限制
            sessionStorage.setItem("authorizeTimes", 0)
            let wxUserId = res.data.data.userId
            sessionStorage.setItem("wxUserId", wxUserId)
            resolve(wxUserId)
          } else if (res.data.code === 12003) {
            this.$http.getLoginStatus().then(res => {
              console.log('checklogin成功返回对象', res.data.data)
              // 重置授权次数限制
              sessionStorage.setItem("authorizeTimes", 0)
              let wxUserId = res.data.data.wxUserId
              sessionStorage.setItem("wxUserId", wxUserId)
              resolve(wxUserId)
            })
            .catch(err => {
              reject(err)
            })
          }
        })
        .catch(err => {
          this.$http.getLoginStatus().then(res => {
            console.log('checklogin成功返回对象', res.data.data)
            // 重置授权次数限制
            sessionStorage.setItem("authorizeTimes", 0)
            let wxUserId = res.data.data.wxUserId
            sessionStorage.setItem("wxUserId", wxUserId)
            resolve(wxUserId)
          })
          .catch(err => {
            reject(err)
          })
        })
      } else {
        // 不存在则去获取登录状态
        this.$http.getLoginStatus().then(res => {
          console.log('checklogin成功返回对象', res.data.data)
          // 重置授权次数限制
          sessionStorage.setItem("authorizeTimes", 0)
          let wxUserId = res.data.data.wxUserId
          sessionStorage.setItem("wxUserId", wxUserId)
          resolve(wxUserId)
        })
        .catch(err => {
          reject(err)
        })
      }
    })
  },
  // 获取wxUserId
  getAuthorizeWxUserId() {
    return new Promise((resolve, reject) => {
      let wxUserId = sessionStorage.getItem('wxUserId') || ''
      console.log('获取wxUserId', wxUserId)
      if (!wxUserId) {
        this.$http.getLoginStatus().then(res => {
          // 重置授权次数限制
          sessionStorage.setItem("authorizeTimes", 0)
          let wxUserId = res.data.data.wxUserId
          sessionStorage.setItem("wxUserId", wxUserId)
          resolve(wxUserId)
        })
        .catch(err => {
          reject(err)
        })
      } else {
        resolve(wxUserId)
      }
    })
  }
}