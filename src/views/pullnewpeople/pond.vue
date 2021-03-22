<style lang="less" scoped>
.search {
  background: #fff;
  padding-top: 5px;
  padding-bottom: 5px;
  position: fixed;
  width: 100%;
  top: 0px;
  input {
    width: 94%;
    border: none;
    background: rgb(250, 248, 248);
    margin-left: 3%;
    height: 30px;
    line-height: 30px;
    text-align: center;
  }
}
.cut {
  display: flex;
  justify-content: space-between;
  background: #fff;
  padding: 15px 15px 0px 15px;
  .cutdiv {
    margin: 0 10px;
    padding-bottom: 4px;
  }
  .cutcheck {
    color: rgb(79, 115, 173);
    border-bottom: 2px solid rgb(79, 115, 173);
  }
}

.clientbox {
  display: flex;
  justify-content: space-between;
  background: #fff;
  margin: 0px 10px;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 7px;
  margin-top: 10px;
  .oneText {
    width: 50px;
    height: 70px;
    color: #fff;
    // border-radius: 50%;
    line-height: 60px;
    text-align: center;
    font-size: 26px;
    overflow: hidden;
    img {
      width: 60px;
      height: 80px;
      margin-top: -5px;
      margin-left: -5px;
    }
  }
  .content {
    margin-top: 7px;
    margin-left: 10px;
    .time {
      color: #999;
      font-size: 14px;
      margin-top: 12px;
    }
  }
}
.clientname {
  display: flex;
  justify-content: space-between;
  margin-bottom: 7px;
  .name {
    width: 85%;
    background: #fff;
    margin-right: 10px;
    margin: 0px 10px;
    padding: 10px;
    border-radius: 5px;
    .time {
      color: #999;
      font-size: 12px;
      margin-top: 7px;
    }
  }
  .copy {
    width: 5%;
    background: rgb(79, 115, 173);
    margin-right: 10px;
    padding: 10px 13px 10px 5px;
    border-radius: 5px;
    writing-mode: horizontal-tb; //默认：水平方向，从上到下
    // writing-mode: vertical-rl; //垂直方向，从右向左
    writing-mode: vertical-lr; //垂直方向，从左向右
    color: #fff;
    letter-spacing: 5px;
    text-align: center;
  }
}
::v-deep .van-cell {
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  box-sizing: border-box;
  /* width: 100%; */
  padding: 5px 10px;
  overflow: hidden;
  // color: #323233;
  font-size: 0.37333rem;
  line-height: 0.64rem;
  // background-color: #eee;
  margin: 0 10px;
  width: 94%;
  border: none;
  background: rgb(250, 248, 248);
  margin-left: 3%;
  // height: 30px;
  // line-height: 30px;
  text-align: center;
}
::v-deep .van-field__control {
  text-align: center;
}
</style>
<template>
  <div class="container" v-show="showmatters">   
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" v-show="singleChat">
      <div class="search">
        <van-cell-group>
          <van-field
            v-model="searchtitle"
            placeholder="请输入活动名称"
            right-icon="close"
            @input="searchinput"
            @click-right-icon="clearInput"
          />
        </van-cell-group>
      </div>
      <van-list
        v-model="loading"
        :finished="finished"
        :immediate-check="false"
        :finished-text="finishedtext"
        @load="onLoad"
        :style="{ marginTop: 55 + 'px'}"
      >
        <div v-if="seaPoollist.length>0">
          <!-- 企微成员 -->
          <div class='clientbox' v-for="(item,index) in seaPoollist" :key="index" @click="godetail(item.id,1)">
            <div style='display:flex'>
              <div class="oneText"><img :src="imageurl+item.link"/></div>
              <!-- <div class="oneText" :style="{'background':item.background}">{{item.title.substr(0,1)}}</div> -->
              <div class='content'>
                <div style="color:rgba(21, 176, 17, 1);font-size:16px">{{item.title}}<span style='color:rgba(21, 176, 17, 1);margin-left:10px;'></span></div>
                <div class='time' v-if="item.type&&item.type=='effective'">活动时间:长期有效</div>
                <div class='time' v-else>活动时间:{{item.startTime}} 至 {{item.endTime}}</div>
              </div>
            </div>
            <!-- <div style="width:70px;height:50px;text-align:right">
              <img style='width:15px;height:15px;margin-top:20px' src="http://athena-1255600302.cosgz.myqcloud.com/attachments/common/7158a3bbe2d0403190b338f8f62e9290.png"/>
            </div> -->
            <van-icon name="arrow" style="line-height:70px"/>
          </div>
        </div>
        <div v-else style="text-align:center">
          <img style="width:200px;height:200px;margin-top:20px;" src="http://athena-1255600302.cosgz.myqcloud.com/attachments/common/3e04fe229eb04ba594fd2e94b22067a7.png"/>
        </div>
      </van-list>
    </van-pull-refresh>
    <div v-if="!singleChat" style="text-align:center;margin-top:150px;">
      <img style="width:150px;" src="http://athena-1255600302.cosgz.myqcloud.com/attachments/scrm/1733c8c502de448585ef0c7076dadbdf.png"/>
      <div style="margin-top:20px;font-size:16px;">当前功能不支持群聊使用</div>
      <div style="margin-top:10px;color:#999">请选择单个用户使用</div>
    </div>
    <dia-loading :loading="isLoading"></dia-loading>
  </div>
</template>

<script>
import notice from '../../components/common/notice'
import { Notify,List,Toast} from 'vant'
import DiaLoading from '../../components/common/loading'
import {ISMOBILE} from '../../config'
export default {
  components: {
    DiaLoading,
    notice,
    vanList: List,
  },
  data () {
    return {
      showmatters:false,
      singleChat:false,
      imageurl:'http://athena-1255600302.cosgz.myqcloud.com',
      leftheight:document.documentElement.clientHeight,
      authorizeUserId:'',
      isLoading:false,
      jssdk: {
        // 判断是否有效值
        configValid: false,
      },
      timer:'',
      seaPoollist:[],
      loading: false,
      finished: false,
      finishedtext:'',
      pageNum:1,
      searchtitle:'',
    }
  },
  mounted() {
    this.$nextTick(() => {
      window.onresize = () => {
        // this.getFullHeight()
      }
    })
    this.timer = setTimeout(() => {
      if (this.isLoading) {
        this.isLoading = false
      }
    }, 2000)
  },
  beforeDestroy() {
    clearTimeout(this.timer)
  },
  destroyed() {
    window.onresize = ''
  },

  created(){
    this.isLoading=true
    this.seaPoollist=[]
    // this.getPool()
    
    // 判断是否企业成员
    this.getAuthorizeWxUserId().then(wxUserId => {
      // 企业成员
      this.authorizeUserId = wxUserId
      this.getPool()
    })
    this.getWxJsJdkConfig()
  },
  methods: {

    // 通过config接口注入权限验证配置---------------------------------------------start-----
    getWxJsJdkConfig() {
      let that = this;
      let url = that.domainAddress;
      that.$http.getWxJsJdkConfig({ url }).then((res) => {
        this.accessticket=res.data.data.ticket
        let config = res.data.data;
        wx.config({
          beta: true, // 必须这么写，否则wx.invoke调用形式的jsapi会有问题
          debug: false, // 开启调试模式
          appId: config.appId, // 企业微信的corpID
          timestamp: config.timeStamp, // 生成签名的时间戳
          nonceStr: config.nonceString, // 生成签名的随机串
          signature: config.signature, // 签名
          jsApiList: [
            "getContext",
            "sendChatMessage",
            "getCurExternalContact",
            "getCurExternalChat",
            "openUserProfile"
          ], // 需要使用的JS接口列表，凡是要调用的接口都需要传进来
        });
        that.jssdk.configValid = true;
        wx.ready(function() {
          // config信息验证后执行ready方法，如果在页面加载时就需要调用相关接口，则须把相关接口放在此函数中执行
          // 先从后台获取应用的id
          that.getAgentId();
        });
        wx.error(function(res) {
          // config信息验证失败执行相关处理
          Notify({ type: "warning", message: "config信息验证失败,暂无使用权限" });
          that.jssdk.configValid = false;
        });
      });
    },
    getAgentId() {
      let pathName = window.location.pathname
      let strs = pathName.split("/")
      let code = strs[1]
      // let code = 'hyzs'
      if (code) {
        this.$http.getAgentId({ code }).then((res) => {
          if (res.data.data.agentId) {
            this.getWxJsJdkAgentConfig(res.data.data.agentId)
          } else {
            Notify({ type: "warning", message: "请检查后台配置是否正确" })
          }
        })
      } else {
        Notify({ type: "warning", message: "请检查后台配置是否正确" })
      }
    },
    // 通过agentConfig注入应用的权限
    getWxJsJdkAgentConfig(agentId) {
      let that = this;
      let url = that.domainAddress;
      that.$http.getWxJsJdkAgentConfig({ url, agentId }).then((res) => {
        let agentConfig = res.data.data;
        wx.agentConfig({
          corpid: agentConfig.appId, // 必填，企业微信的corpid，必须与当前登录的企业一致
          agentid: agentConfig.agentId, // 必填，企业微信的应用id （e.g. 1000247）
          timestamp: agentConfig.timeStamp, // 必填，生成签名的时间戳
          nonceStr: agentConfig.nonceString, // 必填，生成签名的随机串
          signature: agentConfig.signature, // 必填，签名，见附录-JS-SDK使用权限签名算法
          jsApiList: [
            "getContext",
            "sendChatMessage",
            "getCurExternalContact",
            "getCurExternalChat",
            "openUserProfile"
          ],
          success: function(res) {
            // 回调
            // 判断当前客户端是否支持指定的JS接口
            that.getContext();
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

     // 获取H5页面的入口环境
    getContext() {
      let that = this;
      wx.invoke("getContext", {}, function (res) {
        if (res.err_msg == "getContext:ok") {
          that.showmatters=true
          let entry = res.entry; //返回进入H5页面的入口类型，目前有normal、contact_profile、single_chat_tools、group_chat_tools
          if (entry == "single_chat_tools") {
            // 单聊
            that.singleChat = true;
          } else if (entry == "group_chat_tools") {
            // 群聊
            // Notify({ type: "warning", message: "当前功能不支持群聊使用，请选择单个客户使用" });
            that.singleChat = false;
          } else {
            that.singleChat = true;
          }
        } else {
          //错误处理，仅在企业微信3.0.24及以后版本支持
          Notify({ type: "warning", message: "企业微信版本过低请升级" });
        }
      });
    },
    // --------------------------------------------end--------------------


    searchinput(e){
      this.searchtitle=e
      this.seaPoollist=[]
      this.getPool()
    },
    clearInput(){
      this.searchtitle=''
      this.seaPoollist=[]
      this.getPool()
    },

    onLoad(){
      this.pageNum++
      this.getPool()
    },
    // 获取随机颜色
    fnColor(){
      return '#' + Math.floor( Math.random() * 0xffffff ).toString(16);
    },
    // 数组去重
    unique(arr) {
      const res = new Map();
      return arr.filter((arr) => !res.has(arr.id) && res.set(arr.id, 1));
    },
    // 下拉刷新
    onRefresh() {
      setTimeout(() => {
        this.pageNum=1
        this.seaPoollist=[]
        // this.$toast('刷新成功');
        this.isLoading = false;
        this.getPool()
      }, 500);
    },
    // 列表接口
    getPool(){
      this.$http.GetmyCustomer({title:this.searchtitle,pageNum:this.pageNum}).then(res=>{
        this.isloading=false
        var total=res.data.data.total
        if(res.data.data.list.length==1){
          if(this.searchtitle==''){
            this.godetail(res.data.data.list[0].id,2)
            return
          }
        }
        this.seaPoollist=this.seaPoollist.concat(res.data.data.list);
        this.seaPoollist=this.unique(this.seaPoollist)
        this.seaPoollist.forEach(item=>{
          item.background=this.fnColor()
          if(item.background.length!=7){
            item.background=this.fnColor()
          }
        })
        if(total>this.seaPoollist.length){
          this.finished = false;
        }
        this.loading=false
        if(res.data.data.list.length==0){
          this.finished=true
          if(this.pageNum==1){
            this.finishedtext="暂无数据"
          }else{
            this.finishedtext="已经到底啦"
          }
          return
        } 
        if(total<=this.seaPoollist.length){
          this.finished=true
          this.finishedtext="已经到底啦"
        }
      })
    },
    godetail(id,num){
      sessionStorage.setItem('pullid',id)
      sessionStorage.setItem('pullshowback',num)
      sessionStorage.setItem('authorizeUserId',this.authorizeUserId)
      this.$router.push(`/pullnewpeople/custDetail`)
      // this.$router.push(`/pullnewpeople/custDetail?id=${id}&userId=${this.userId}&showback=${num}`)
    },

  },
  filters: {
    getupdateTime(time){
      var newtime=time.substring(0, time.length - 3)
      return newtime
    }
  }
}
</script>

