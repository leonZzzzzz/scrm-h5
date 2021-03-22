<style  lang="less" scoped>
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
  .content {
    width: 100%;
    display: flex;
    justify-content: space-between;
    .leftbox {
      display: flex;
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
      .leftname {
        line-height: 35px;
        margin-left: 10px;
      }
    }
    .time {
      text-align: right;
      font-size: 13px;
      color: #999;
      // line-height: 35px;
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
.left-arrow {
  display: flex;
  align-items: center;
  height: 46px;
  line-height: 46px;
  color: #4f73ad;
  .left-arrow-icon {
    font-size: 16px;
    margin-top: -1px;
    margin-right: 3px;
    color: #4f73ad;
  }
  .left-arrow-icon-mobile {
    font-size: 16px;
    margin-top: -3px;
    margin-right: 3px;
    color: #4f73ad;
  }
}
</style>
<template>
<!-- :style="{background:'#fff',height: leftheight+'px'}" -->
  <div class="container" >  
    <van-nav-bar
      title="邀请列表"
      :left-arrow="true"
      left-text="返回"
      :fixed="true"
      @click-left="$router.back()">
      <template #left>
        <div class="left-arrow">
          <van-icon
            name="arrow-left"
            :class="isMobile ? 'left-arrow-icon-mobile' : 'left-arrow-icon'"
          />返回
        </div>
      </template>
    </van-nav-bar>
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
        <div class='clientbox' v-for="(item,index) in seaPoollist" :key="index">
          <div class="content">
            <div class="leftbox">
              <img :src="item.avatar"/>
              <div class="leftname">{{item.name}}</div>
            </div>
            <div class='time'>{{item.createTime}}
              <div style='color:#999;font-size:12px;margin-top:3px'>{{item.isJoined?'有效客户':'无效客户'}}</div>
            </div>
          </div>
        </div>
      </div>
      <div v-else style="text-align:center">
        <img style="width:200px;height:200px;margin-top:100px;" src="http://athena-1255600302.cosgz.myqcloud.com/attachments/common/3e04fe229eb04ba594fd2e94b22067a7.png"/>
      </div>
    </van-list>
  </div>
</template>

<script>
import notice from '../../components/common/notice'
import { Notify,List,Toast,NavBar} from 'vant'
// import DiaLoading from '../../components/loading'
import {ISMOBILE} from '../../config'
export default {
  components: {
    // DiaLoading,
    notice,
    vanList: List,
    VanNavBar: NavBar,
  },
  data () {
    return {
      note:['您有客户即将达到共享客户条件，请尽快跟进。'],
      toplist:['企微客户','非企微客户'],
      nowindex:'0',
      lifecycle:0,
      name:'',
      postop:'',
      finishedtext:'',

      imageurl:'http://athena-1255600302.cosgz.myqcloud.com',
      leftheight:document.documentElement.clientHeight,
      authorizeUserId:'',
      isLoading:true,
      jssdk: {
        // 判断是否有效值
        configValid: false,
        agentConfigValid: false,
      },
      timer:'',
      tips:'',
      seaPoollist:[],
      loading: false,
      finished: false,
      pageNum:1,
      type:'scrm_customer',
      configcontent:{},
      activityid:''
    }
  },
  mounted() {
    this.seaPoollist=[]
    this.$nextTick(() => {
      // window.onresize = () => {
        // this.postop=document.getElementById('topbox').clientHeight+10
      // }
    })
  },

  created(){
    this.seaPoollist=[]
    this.isLoading=false
    this.activityid = sessionStorage.getItem('pullid')
    this.invitelist()
  },
  methods: {
    onLoad(){
      this.pageNum++
      this.invitelist()
    },
    invitelist(){
      this.$http.inviteCustomers({externalUserId:this.$route.query.id,activityId:this.activityid,pageNum:this.pageNum}).then(res=>{
        var total=res.data.data.total
        this.seaPoollist=this.seaPoollist.concat(res.data.data.list);
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

