<template>
  <div>
    <div style="text-align:center;margin:80px 0;color:#4f73ad">
      <img
        style="width:300px"
        src="http://athena-1255600302.cosgz.myqcloud.com/attachments/common/92e11ef049734aedad3554135512fa9a.png"
      />
      <div>素材海报生成器</div>
    </div>
    <div class="import">
      <van-icon
        name="contact"
        color="#4f73ad"
        size="24"
        style="margin-top:5px"
      />
      <input placeholder="请输入您的账号" v-model="model.username" />
    </div>
    <div class="import">
      <img
        style="width:25px;height:25px;margin-top:3px"
        src="http://athena-1255600302.cosgz.myqcloud.com/attachments/null/78a8e36f95aa421087ab187b90f78cbf.png"
      />
      <input placeholder="请输入您的密码" v-model="model.password" />
    </div>
    <div
      @click="register"
      style="margin-top:100px;text-align:center;width:70%;margin-left:15%;background:#4f73ad;color:#fff;border-radius:5px;padding:10px 0;"
    >
      登录
    </div>
    <!-- <div v-if="isLoading" style="position:absolute;top:0;width:100%;height:100%;background:#eee">
    </div> -->
    <!-- <dia-loading :loading="isLoading"></dia-loading> -->
  </div>
</template>

<script>
import DiaLoading from '../../components/common/loading'
import { Search, Icon, Collapse, CollapseItem, Overlay, Popup, Notify, Empty, Field, Loading } from 'vant'
export default {
  components:{
    DiaLoading,
    vanIcon: Icon,
  },
  data () {
    return {
      model:{
        username:'',
        password:"",
        type:"poster"
      },
      authorizeUserId:'',
      isLoading:true,
    }
  },
  watch: {
   
  },  
  mounted() {
   
  },
  created() {
    this.getWxJsJdkConfig()
  },
  methods: {
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
          jsApiList: [
            "updateTimelineShareData",
            "updateAppMessageShareData",
            "onMenuShareTimeline",
            "onMenuShareAppMessage",
            "onMenuShareWechat"
            
          ], // 需要使用的JS接口列表，凡是要调用的接口都需要传进来
        });
        wx.ready(function() {
          // config信息验证后执行ready方法，如果在页面加载时就需要调用相关接口，则须把相关接口放在此函数中执行
          // 先从后台获取应用的id
          // 分享到朋友圈
          wx.onMenuShareTimeline({
            title: '素材海报', // 分享标题
            desc:'素材海报生成工具-小数桔',
            link: config.url+'#/sidebar/speechcraft', // 分享链接
            imgUrl: 'http://athena-1255600302.cosgz.myqcloud.com/attachments/common/9f88b4a8a50d4d7f86eeccbaa898649b.png', // 分享图标
            success: function (data) {
              layer.open({ content: '分享成功', time: 1 });
              //alert('分享成功');// 用户确认分享后执行的回调函数
            },
            cancel: function (data) {
              //alert('已取消分享');// 用户取消分享后执行的回调函数
            }
          });
          // 发送给朋友
          wx.onMenuShareAppMessage({
            title: '素材海报', // 分享标题
            desc: '素材海报生成工具-小数桔', // 分享描述
            link: config.url+'#/sidebar/speechcraft', // 分享链接
            imgUrl: 'http://athena-1255600302.cosgz.myqcloud.com/attachments/common/9f88b4a8a50d4d7f86eeccbaa898649b.png', // 分享图标
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function (data) {
              layer.open({ content: '分享成功', time: 1 });
              //alert('分享成功');// 用户确认分享后执行的回调函数
            },
            cancel: function (data) {
              //alert('已取消分享');// 用户取消分享后执行的回调函数
            }
          });
          // 获取“微信”按钮点击状态及自定义分享内容接口
          wx.onMenuShareWechat({
            title: '素材海报', // 分享标题
            desc: '素材海报生成工具-小数桔', // 分享描述
            link: config.url+'#/sidebar/speechcraft', // 分享链接
            imgUrl: 'http://athena-1255600302.cosgz.myqcloud.com/attachments/common/9f88b4a8a50d4d7f86eeccbaa898649b.png', // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
          });
          wx.updateTimelineShareData({ 
            title: '素材海报', // 分享标题
            link: config.url+'#/sidebar/speechcraft', // 分享链接
            imgUrl: 'http://athena-1255600302.cosgz.myqcloud.com/attachments/common/9f88b4a8a50d4d7f86eeccbaa898649b.png', // 分享图标
            success: function () {
              // 设置成功
            }
          });
          wx.updateAppMessageShareData({ 
            title: '素材海报', // 分享标题
            desc: '素材海报生成工具-小数桔', // 分享描述
            link: config.url+'#/sidebar/speechcraft', // 分享链接
            imgUrl: 'http://athena-1255600302.cosgz.myqcloud.com/attachments/common/9f88b4a8a50d4d7f86eeccbaa898649b.png', // 分享图标
            success: function () {
              // 设置成功
            }
          });
          // wx.invoke(
          //   "shareAppMessage", {
          //     title: '素材海报', // 分享标题
          //     desc: '素材海报生成工具-小数桔', // 分享描述
          //     link:config.url+'#/sidebar/speechcraft', // 分享链接
          //     imgUrl: 'http://athena-1255600302.cosgz.myqcloud.com/attachments/common/9f88b4a8a50d4d7f86eeccbaa898649b.png', // 分享图标
          //   }, function(res) {
          //       if (res.err_msg == "shareAppMessage:ok") {
          //       }
          //   }
          // );
          // wx.invoke(
          //   "shareWechatMessage", {
          //     title: '素材海报', // 分享标题
          //     desc: '素材海报生成工具-小数桔', // 分享描述
          //     link:config.url+'#/sidebar/speechcraft', // 分享链接
          //     imgUrl: 'http://athena-1255600302.cosgz.myqcloud.com/attachments/common/9f88b4a8a50d4d7f86eeccbaa898649b.png', // 分享图标
          //   }, function(res) {
          //       if (res.err_msg == "shareWechatMessage:ok") {
          //       }
          //   }
          // );
          wx.invoke("shareToExternalContact", {
            title: '素材海报', // 分享标题
            desc:'素材海报生成工具-小数桔',
            link: config.url+'#/sidebar/speechcraft', // 分享链接
            imgUrl: 'http://athena-1255600302.cosgz.myqcloud.com/attachments/common/9f88b4a8a50d4d7f86eeccbaa898649b.png', // 分享图标
            },function(res) {
                if (res.err_msg == "shareToExternalContact:ok") {
                }
            }
          );

        });
        wx.error(function(res) {
          // config信息验证失败执行相关处理
          // Notify({ type: "warning", message: "config信息验证失败" });

        });
      });
    },
    
    register(){
      this.$http.UnMemberCompLogin(this.model).then((res)=>{
        console.log(res)
        if(res.data.code==20000){
          Notify({ type: 'success', message: '登陆成功' })
          setTimeout(() => {
            this.$router.push(`/sidebar/speechcraft`)
          }, 1000);
        }else{
          Notify({ type: 'warning', message: res.data.message })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
input {
  border: transparent;
}
.import {
  display: flex;
  justify-content: center;
  margin-top: 15px;
  input {
    width: 260px;
    height: 40px;
    border: 1px solid #6a8fca;
    margin-left: 5px;
    padding: 0 10px;
    border-radius: 10px;
  }
}
</style>