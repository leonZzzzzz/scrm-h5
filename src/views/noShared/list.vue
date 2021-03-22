<style lang="less" scoped>
.search {
  background: #fff;
  padding-top: 5px;
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
    width: 60px;
    height: 60px;

    color: #fff;
    border-radius: 50%;
    line-height: 60px;
    text-align: center;
    font-size: 26px;
  }
  .content {
    margin-top: 3px;
    margin-left: 10px;
    .time {
      color: #999;
      font-size: 14px;
      margin-top: 9px;
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
.share {
  background: rgb(79, 115, 173);
  color: #fff;
  height: 27px;
  line-height: 27px;
  padding: 0px 20px;
  border-radius: 5px;
  margin-top: 12px;
}
.choose {
  display: flex;
  padding: 10px 0px;
  background: #fff;
  position: fixed;
  top: 0px;
  width: 100%;
}
</style>
<template>
  <div class="container">   
    <div style="position: fixed; width: 100%; height: 100%" v-if="showtree">
      <div
        style="background: #000; opacity: 0.5; width: 100%; height: 100%"
        @click="showtree = false"
      ></div>
      <div style="position: absolute; top: 0px; background: #fff">
        <van-tree-select
          :style="{ width: leftwidth + 'px' }"
          :items="cyclelist"
          :active-id.sync="activeId"
          :main-active-index.sync="activeIndex"
          @click-item="checkTree"
          @click-nav="clickNav"
        />
      </div>
    </div>
    <div
      @click="showtree = !showtree"
      class="choose"
    >
      <div style="margin-left:15px;">{{ lifename ? lifename : "请选择" }}</div>
      <van-icon
        name="arrow-down"
        style="margin-top: 3px; margin-left: 5px"
      />
    </div>
    <van-list
      v-model="loading"
      :finished="finished"
      :immediate-check="false"
      :finished-text="finishedtext"
      @load="onLoad"
      :style="{ marginTop: 50 + 'px'}"
    >
      <div v-if="seaPoollist.length>0">
        <div class='clientbox' v-for='(item,i) in seaPoollist' :key="i">
          <div style='display:flex'>
            <img style='width:50px;height:50px;' :src="item.avatar"/>
            <div class='content'>
              <div style="color:rgba(21, 176, 17, 1);font-size:16px">{{item.name}}<span style='color:rgba(21, 176, 17, 1);margin-left:10px;'></span></div>
              <div class='time'>已被{{item.userName}}领取</div>
            </div>
          </div>
          <div class="share" @click="personInfo(item.customerId)">去共享</div>
        </div>
      </div>
      <div v-else style="text-align:center">
        <img style="width:200px;height:200px;margin-top:20px;" src="http://athena-1255600302.cosgz.myqcloud.com/attachments/common/3e04fe229eb04ba594fd2e94b22067a7.png"/>
      </div>
    </van-list>
    <!-- <dia-loading :loading="isLoading"></dia-loading> -->
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
      leftwidth: document.documentElement.clientWidth,
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
      lifeCycleId:'',
      showtree:false,
      lifename:'',
      cyclelist:[],
      activeIndex: "0",
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.seaPoollist=[]
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
    this.seaPoollist=[]
    clearTimeout(this.timer)
  },
  destroyed() {
    this.seaPoollist=[]
    window.onresize = ''
  },

  created(){
    document.title = "待共享客户";
    this.seaPoollist=[]
    this.pageNum=1
    // 判断是否企业成员
    this.getAuthorizeWxUserId().then(wxUserId => {
      // 企业成员
      this.authorizeUserId = wxUserId
      this.getPool(this.lifeCycleId)
    })
    this.getWxJsJdkConfig()
  },
  methods: {
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
          Notify({ type: "warning", message: "config信息验证失败" });
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
            "openUserProfile"
          ],
          success: function(res) {
            // 回调
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
    personInfo(externalUserId){
      wx.invoke('openUserProfile', {
        "type": 2, //1表示该userid是企业成员，2表示该userid是外部联系人
        "userid":externalUserId //可以是企业成员，也可以是外部联系人
      }, function(res) {
        console.log('openUserProfile',res)
        if(res.err_msg != "openUserProfile:ok") {
            //错误处理
        }
      });
    },

    // 获取生命周期
    getLife() {
      this.$http.capturnLifeCycle().then((res) => {
        this.cyclelist = [];
        res.data.data.forEach((item) => {
          var list = { text: item.name, children: item.children, id: item.id };
          item.children.forEach((val) => {
            val.text = val.name;
          });
          this.cyclelist.push(list);
        });
        // var a = { text: "全部", children: [{ text: "全部" }], id: "" };
        var a = { text: "全部", children: [], id: "" };
        this.cyclelist.unshift(a);
        console.log(this.cyclelist)
      });
    },
    // 选择生命周期
    checkTree(e) {
      console.log(e);
      this.showtree = false;
      this.lifeCycleId = e.id;
      this.lifename = e.name;
      this.seaPoollist = [];
      this.getPool(this.lifeCycleId);
    },
    clickNav(index){
      if(index == 0){
        this.lifeCycleId = ""
        this.showtree = false;
        this.getPool(this.lifeCycleId);
      }
    },

    onLoad(){
      console.log('onload')
      this.pageNum++
      this.getPool(this.lifeCycleId)
    },
    // 数组去重
    unique(arr) {
        const res = new Map();
        return arr.filter((arr) => !res.has(arr.id) && res.set(arr.id, 1));
      },
    // 列表接口
    getPool(lifeCycleId){
      this.$http.getTransferFailed({lifeCycleId,pageNum:this.pageNum}).then(res=>{
        this.getLife()
        this.isloading=false
        var total=res.data.data.total
        this.seaPoollist=this.seaPoollist.concat(res.data.data.list);
        this.seaPoollist=this.unique(this.seaPoollist)
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
  },
  filters: {
    getupdateTime(time){
      var newtime=time.substring(0, time.length - 3)
      return newtime
    }
  }
}
</script>

