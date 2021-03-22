<style lang="less" scoped>
.container {
  // background: rgb(236, 243, 252);
  // padding: 20px 10px;
  // margin-top: 55px;
  .person {
    margin: 8px;
    background: #fff;
    border-radius: 5px;
    .title {
      background: #fff;
      color: #000;
      padding: 10px 15px;
      display: flex;
      justify-content: space-between;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      border-bottom: 1px solid #eee;
      div {
        border-left: 3px solid orange;
        padding-left: 10px;
      }
    }
  }

  .posterbox {
    background: #fff;
    margin: 10px 0px;
    padding: 10px 0;
    border-radius: 7px;
    text-align: center;
    .img_box {
      position: relative;
      width: 330px !important;
      margin: 0 auto;
      .logostyle {
        position: absolute;
      }
      #oImg {
        width: 330px;
        display: block;
      }
    }
    .box {
      width: 330px;
      margin: 0 auto;
      userselect: none;
      overflow: hidden;
      .avtor {
        // padding: 20px;
        width: 330px;
        // margin-left: -10px;
        display: block;
      }
    }

    .namebox {
      margin-left: 15px;
    }
    .intive {
      display: flex;
      justify-content: space-between;
      padding: 0 30px 0px 30px;
      margin-top: 20px;
      .send {
        background: #4f73ad;
        color: #fff;
        width: 100%;
        height: 35px;
        line-height: 35px;
        // padding: 6px 10px;
        border: 1px solid #4f73ad;
        border-radius: 5px;
      }
      .vite {
        border: 1px solid #999;
        color: rgb(73, 72, 72);
        border-radius: 5px;
        width: 100px;
        height: 35px;
        line-height: 35px;
      }
    }
  }
  .trick {
    display: flex;
    margin: 10px 20px;
    padding-bottom: 10px;
    .preview {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 27px;
      min-width: 27px;
      font-size: 12px;
      color: #ffffff;
      background-color: #4f73ad;
      border-radius: 8px;
      margin-right: 10px;
      writing-mode: vertical-rl;
      cursor: pointer;
    }
    .trcon {
      padding: 10px;
      text-align: left;
      background: #fff;
      border-radius: 5px;
    }
  }
  .tags {
    display: flex;
    flex-wrap: wrap;
    margin: 10px 15px;
    padding-bottom: 10px;
    div {
      background: rgba(88, 129, 196, 0.1);
      color: #4f73ad;
      margin-right: 7px;
      border-radius: 3px;
      padding: 3px 8px;
      margin-top: 3px;
      margin-bottom: 3px;
    }
    .add {
      background: #fff;
      color: #fff;
      background: #4f73ad;
      border: 1px solid #4f73ad;
    }
  }
  .active {
    // background: rgba(146, 185, 248, 0.1);
    background: #fff;
    padding: 10px 15px;
    div {
      margin: 3px 0px;
      color: #999;
      span {
        color: #000;
        margin-left: 10px;
      }
    }
  }
}
.overmodel {
  background: #fff;
  margin-top: 30%;
  width: calc(62% - 20px);
  margin-left: 19%;
  border-radius: 3px;
  padding: 10px 10px 0 10px;
  .btn-group {
    display: flex;
    .com-btn {
      width: 50%;
      text-align: center;
      padding: 10px 0;
    }
    .btn-cancel {
      border-right: 1px solid #ddd;
    }
  }
}
.info-right {
  flex: 1;
  background-color: #ffffff;
  border-radius: 3px;
  width: calc(100% - 37px);
  padding: 10px;
  box-sizing: border-box;
  cursor: pointer;
  .item-top-image {
    display: flex;
    // margin-bottom: 10px;
    .img-class {
      width: 90px;
      height: 70px;
      margin-right: 10px;
      object-fit: cover;
      cursor: pointer;
    }
    .img-item-right {
      width: calc(100% - 100px);
      .img-title {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #101010;
        margin-bottom: 7px;
      }
    }
  }
  .item-top-video {
    display: flex;
    .video-wrapper {
      position: relative;
      width: 90px;
      height: 70px;
      margin-right: 10px;
      .video-class {
        width: 90px;
        height: 70px;
      }
      .video-mask {
        position: absolute;
        width: 90px;
        height: 70px;
        left: 0;
        top: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        background-color: #222222;
        .play-icon {
          font-size: 32px;
          color: #ffffff;
          border-radius: 16px;
        }
      }
    }
    .video-item-right {
      width: calc(100% - 100px);
      .video-title {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #101010;
        margin-bottom: 7px;
      }
      .video-tags {
        display: flex;
        flex-wrap: wrap;
        max-height: 45px;
        overflow: hidden;
      }
    }
  }
  .item-top-image-text {
    display: flex;
    .img-class {
      width: 90px;
      height: 70px;
      margin-right: 10px;
      object-fit: cover;
    }
    .right-content {
      width: calc(100% - 100px);
      .image-text-title {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #101010;
        margin-bottom: 7px;
      }
      .image-text-content {
        line-height: 16px;
        color: #9f9e9e;
        -webkit-line-clamp: 2;
        -moz-box-orient: vertical;
        -webkit-box-orient: vertical;
        display: -moz-box;
        display: -webkit-box;
        overflow: hidden;
      }
    }
  }
  .item-top-text {
    .text-content {
      line-height: 18px;
      color: #101010;
      -webkit-line-clamp: 2;
      -moz-box-orient: vertical;
      -webkit-box-orient: vertical;
      display: -moz-box;
      display: -webkit-box;
      overflow: hidden;
      cursor: pointer;
    }
  }
  .item-top-file {
    display: flex;
    align-items: center;
    .left-icon {
      font-size: 32px;
      margin-right: 10px;
    }
    .right-title {
      width: calc(100% - 34px);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: #101010;
    }
  }
  .item-top-program {
    .program-content {
      line-height: 18px;
      color: #101010;
      .program-tag {
        margin-right: 8px;
      }
    }
  }
  .item-bottom {
    margin-top: 10px;
    .bottom-tags {
      display: flex;
      flex-flow: wrap;
      .tag-item {
        padding: 0 7px;
        border: 1px solid #4f73ad;
        border-radius: 3px;
        font-size: 12px;
        color: #4f73ad;
        margin-right: 4px;
        margin-bottom: 4px;
        background-color: #f2f3f5;
      }
      .search-tag-item {
        padding: 3px 7px;
      }
    }
  }
}
.img-overlay-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: #232323;
  overflow-y: auto;
  .img-class {
    width: 100%;
    object-fit: contain;
  }
  .img-close-icon {
    position: absolute;
    font-size: 28px;
    bottom: 28px;
    left: calc(50% - 13px);
    cursor: pointer;
    z-index: 999;
    color: #c8c9cc;
  }
}
.overlay-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  position: relative;
  background-color: #232323;
  .img-class {
    width: 100%;
    object-fit: contain;
  }
  .img-close-icon {
    position: absolute;
    font-size: 28px;
    bottom: 28px;
    left: calc(50% - 13px);
    cursor: pointer;
    z-index: 999;
    color: #c8c9cc;
    // color: rgba(255, 255, 255, .9)
  }
  .video-class {
    width: 100%;
    height: 280px;
  }
  .bottom-group {
    position: absolute;
    bottom: 28px;
    left: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .close-icon {
      font-size: 28px;
      cursor: pointer;
      z-index: 999;
      color: #c8c9cc;
      // color: rgba(255, 255, 255, .9)
    }
    .arrow-left {
      font-size: 28px;
      cursor: pointer;
      z-index: 999;
      color: #c8c9cc;
      // color: rgba(255, 255, 255, .9);
      margin-left: 28px;
    }
  }
}

.postermodel {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  .modelsurn {
    width: 100%;
    height: 100%;
    background: #000;
    opacity: 0.4;
  }
  .modelcontent {
    background: #fff;
    width: 330px;
    margin-left: 20px;
    top: 10%;
    position: absolute;
    height: 80%;
    overflow: auto;
    #oImg {
      width: 330px;
      display: block;
    }
    .img_box {
      position: relative;
      width: 330px !important;
      .logostyle {
        position: absolute;
      }
    }
    .modelbtns {
      width: 330px;
      justify-content: space-between;
      display: flex;
      position: fixed;
      background: #fff;
      // bottom: 20px;
      div {
        padding: 7px 30px;
        border: 1px solid #999;
        margin: 10px 30px;
        border-radius: 5px;
      }
      .btn_one {
        background: #4f73ad;
        border: 1px solid #4f73ad;
        color: #fff;
      }
    }
  }
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
.tips {
  font-size: 12px;
  text-align: left;
  background: rgba(79, 115, 173, 0.1);
  margin: 15px 10px 0px 10px;
  padding: 10px;
  color: #333;
  border: 1px solid #8fa5c9;
}
</style>
<template>
  <div>
    <van-nav-bar
      v-if="showback==1"
      title="活动详情"
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
    <div class='container' :style="showback=='1'?'margin-top:55px':'margin-top:0px'">
      <!-- <div class='active'>
        <div>活动名称 <span>{{activitDetail.title}}</span></div>
        <div>活动时间 
          <span v-if="activitDetail.type&&activitDetail.type=='effective'">长期有效</span>
          <span v-else>{{activitDetail.startTime}} 至 {{activitDetail.endTime}}</span>
        </div>
      </div> -->
      <!-- <div class='person'>
        <div class="title"><div>活动标签</div></div>
        <div class='tags'>
          <div v-for="(item,index) in activitDetail.tagList" :key="index">{{item.name}}</div>
          <div class='add' @click="updateTags"><van-icon name="edit" style="margin-right:5px"/>编辑</div>
        </div>
      </div> -->
      <div class='person'>
        <div class="title"><div>{{activitDetail.title}}</div></div>
        <div class='posterbox'>
          <!-- <div class="box">
            <img class='avtor' :src="imgUrl+activitDetail.link"/>
          </div> -->
          <div class="img_box" id="imageWrapper">
            <img id="oImg" :src="poster"/>
            <img  v-for="(sub,i) in activitDetail.subs" v-if="sub.mark=='logo'" :key="i" :src="logo" class="logostyle" :style="{
              width: sub.style.width+'px !important' ,
              lineHeight: sub.style.lineHeight + 'px',
              fontSize: sub.style.fontSize + 'px',
              letterSpacing: sub.style.letterSpacing + 'px',
              top: sub.style.top,
              left: sub.style.left,
              zIndex:sub.style.zIndex,
              borderRadius:sub.style.borderRadius}"/>
            <img v-for="(sub,i) in activitDetail.subs" v-if="sub.mark=='code'" :key="i" :src="qrcode" class="logostyle" :style="{
              width: sub.style.width+'px !important',
              lineHeight: sub.style.lineHeight + 'px',
              fontSize: sub.style.fontSize + 'px',
              letterSpacing: sub.style.letterSpacing + 'px',
              top: sub.style.top,
              left: sub.style.left,
              zIndex:sub.style.zIndex,
              borderRadius:sub.style.borderRadius}"/>
            <div v-for="(item,i) in activitDetail.subs" :key="i" v-if="item.type === 'text'" class="logostyle" :style="{
              height: item.style.height,
              width:item.style.width,
              lineHeight: item.style.lineHeight + 'px',
              fontSize: item.style.fontSize + 'px',
              letterSpacing: item.style.letterSpacing + 'px',
              color: item.style.color,
              background: item.style.background,
              fontWeight: item.style.fontWeight,
              fontStyle: item.style.fontStyle,
              textAlign: item.style.textAlign,
              alignItems: item.style.alignItems,
              borderRadius:item.style.borderRadius,
              top: item.style.top,
              left: item.style.left,
              zIndex:item.style.zIndex}">{{ item.content }}</div>
          </div>
          <div class='intive'>
            <div class='send' @click="save">发送专属海报</div>
          </div>
          <div class='intive' @click="$router.push('./invite?id='+externalUserId)">
            <div style="text-align:left">
              <span>邀请来的客户</span>
              <div style="font-size:28px">{{total}}人</div>
            </div>
            <div style="color:#4f73ad;margin-top:25px">查看全部</div>
          </div>
        </div>
      </div>
      <!-- <img id="oImg" width="330px" style="margin-left:10px;" :src="saveUrl"/> -->
      <div class='person'>
        <div class="title"><div>活动话术</div></div>
        <div class='trick'>
          <div class='preview' @click="deitionText(activitDetail.activityWords)">预&nbsp;览</div>
            <div class="info-right" @click="sendNewText(activitDetail.activityWords)">
            <div class="item-top item-top-text">
              <div class="text-content" v-html="formatterTextContent(activitDetail.activityWords)"></div>
            </div>
           </div>
        </div>
        <!-- <div class='trick'>
          <div class='preview' @click="previewSpeechContent(activitDetail.speechcraft)">预&nbsp;览</div>
          <div class="info-right" @click="_handleItemClick(activitDetail.speechcraft)">
            <div class="item-top item-top-image" v-if="activitDetail.speechcraft.type === 'image'">
              <img :src="`${imgUrl}${activitDetail.speechcraft.imageUrl}`" class="img-class" alt=""/>
              <div class="img-item-right">
                <div class="img-title">{{ activitDetail.speechcraft.name }}</div>
              </div>
            </div>
            <div class="item-top item-top-video" v-if="activitDetail.speechcraft.type === 'video'">
              <div class="video-wrapper">
                <video class="video-class" :src="activitDetail.speechcraft.videoUrl"></video>
                <div class="video-mask">
                  <van-icon name="play-circle" class="play-icon"></van-icon>
                </div>
              </div>
              <div class="video-item-right">
                <div class="video-title">{{ activitDetail.speechcraft.name }}</div>
              </div>
            </div>
            <div class="item-top item-top-image-text" v-if="activitDetail.speechcraft.type === 'image_text'">
              <img :src="`${imgUrl}${activitDetail.speechcraft.imageUrl}`" class="img-class" alt=""/>
              <div class="right-content">
                <div class="image-text-title">{{ activitDetail.speechcraft.name }}</div>
                <div class="image-text-content">{{ activitDetail.speechcraft.content }}</div>
              </div>
            </div>
            <div class="item-top item-top-text" v-if="activitDetail.speechcraft.type === 'text'">
              <div class="text-content" v-html="formatterTextContent(activitDetail.speechcraft.content)"></div>
            </div>
            <div class="item-top item-top-file" v-if="activitDetail.speechcraft.type === 'file'">
              <i
                class="iconfont icon-PDFwenjian left-icon"
                style="color: #ee0a24"
                v-if="checkFileSuffix(activitDetail.speechcraft.file) === 'pdf'"
              ></i>
              <i
                class="iconfont icon-EXCELwenjian left-icon"
                style="color: #1AA89D"
                v-if="checkFileSuffix(activitDetail.speechcraft.file) === 'xls'"
              ></i>
              <i
                class="iconfont icon-wordwenjian left-icon"
                style="color: #568CF0"
                v-if="checkFileSuffix(activitDetail.speechcraft.file) === 'docx'"
              ></i>
              <i
                class="iconfont icon-TXTwenjian left-icon"
                style="color: #FAB169"
                v-if="checkFileSuffix(activitDetail.speechcraft.file) === 'txt'"
              ></i>
              <i class="iconfont icon-pptwenjian left-icon"
                style="color: #FC8A5F" v-if="checkFileSuffix(activitDetail.speechcraft.file) === 'ppt'"></i>
              <div class="right-title">{{ activitDetail.speechcraft.name }}</div>
            </div>
            <div class="item-top item-top-program" v-if="activitDetail.speechcraft.type === 'program'">
              <div class="program-content">
                <van-tag
                  type="success"
                  size="large"
                  color="#f0f9eb"
                  text-color="#67c23a"
                  class="program-tag"
                >
                  小程序
                </van-tag>
                {{ activitDetail.speechcraft.name }}
              </div>
            </div>
          </div>
        </div> -->
      </div>
      <div class="tips">
        <div>一客一码可以为每一个客户生成专属海报，让客户带来客户，还能统计不同客户带来的添加好友数</div>
      </div>
      <div style="height:15px;"></div>
      <!-- v-if="modelshow" -->
      <div v-if="modelshow==true" class="postermodel">
        <div class="modelsurn"></div>
        <div class="modelcontent">
          <div class="img_box" id="imageWrapper">
            <img id="oImg" :src="poster"/>
            <img  v-for="(sub,i) in activitDetail.subs" v-if="sub.mark=='logo'" :key="i" :src="logo" class="logostyle" :style="{
              height: sub.style.height,
              width: sub.style.width+'px',
              lineHeight: sub.style.lineHeight + 'px',
              fontSize: sub.style.fontSize + 'px',
              letterSpacing: sub.style.letterSpacing + 'px',
              top: sub.style.top,
              left: sub.style.left,
              zIndex:sub.style.zIndex,
              borderRadius:sub.style.borderRadius}"/>
            <img v-for="(sub,i) in activitDetail.subs" v-if="sub.mark=='code'" :key="i" :src="qrcode" class="logostyle" :style="{
              height: sub.style.height,
              width: sub.style.width+'px',
              lineHeight: sub.style.lineHeight + 'px',
              fontSize: sub.style.fontSize + 'px',
              letterSpacing: sub.style.letterSpacing + 'px',
              top: sub.style.top,
              left: sub.style.left,
              zIndex:sub.style.zIndex,
              borderRadius:sub.style.borderRadius}"/>
            <div v-for="(item,i) in activitDetail.subs" :key="i" v-if="item.type === 'text'" class="logostyle" :style="{
              height: item.style.height,
              width:item.style.width,
              lineHeight: item.style.lineHeight + 'px',
              fontSize: item.style.fontSize + 'px',
              letterSpacing: item.style.letterSpacing + 'px',
              color: item.style.color,
              background: item.style.background,
              fontWeight: item.style.fontWeight,
              fontStyle: item.style.fontStyle,
              textAlign: item.style.textAlign,
              alignItems: item.style.alignItems,
              borderRadius:item.style.borderRadius,
              top: item.style.top,
              left: item.style.left,
              zIndex:item.style.zIndex}">{{ item.content }}</div>
          </div>

          <!-- <div v-else class="img_box" >
            <img id="newimg" />
          </div> -->
          <div class="modelbtns" :style="{bottom:posbottom+'px'}">
            <div class="btn_one" @click="save">发送</div>
            <div @click="modelshow=false">取消</div>
          </div>
        </div>
      </div>
    </div>
    <dia-loading :loading="isLoading"></dia-loading>
    <!-- 图片预览弹窗 -->
    <van-overlay :show="imagePreview.show">
      <div class="img-overlay-wrapper">
        <img class="img-class" :src="imagePreview.imageUrl" alt="" />
        <van-icon
          name="close"
          class="img-close-icon"
          @click="closeImagePreview"
        ></van-icon>
      </div>
    </van-overlay>
    <!-- 视频预览弹窗 -->
    <van-overlay :show="videoPreview.show">
      <div class="overlay-wrapper">
        <video
          class="video-class"
          :src="videoPreview.videoUrl"
          controls
          playsinline
          webkit-playsinline
          x5-playinline
        ></video>
        <div class="bottom-group">
          <van-icon
            name="close"
            class="close-icon"
            @click="closeVideoPreview"
          ></van-icon>
          <i
            class="iconfont icon-feiji arrow-left"
            @click="handleSendVideo"
          ></i>
        </div>
      </div>
    </van-overlay>
    <!-- 文本编辑预览弹窗 -->
    <!-- <com-popup-text
      :show="textPreview.show"
      commitText="发送"
      @onCancel="textPreview.show = false"
      @onCommit="commitTextChange"
    > -->
    <com-popup-text
      :show="textPreview.show"
      commitText="发送"
      @onCancel="textPreview.show = false"
      @onCommit="preTextChange"
    >
      <div class="text-popup">
        <van-field
          v-model="textPreview.model.content"
          rows="5"
          type="textarea"
          placeholder="请输入话术内容"
          autofocus
          :style="{
            background: '#F7F7F9',
            borderRadius: '3px',
            border: '1px solid #DFE2E8'
          }"
        >
        </van-field>
      </div>
    </com-popup-text>
  </div>
</template>

<script>
import { Notify,NavBar} from 'vant'
import html2canvas from "html2canvas";
import DiaLoading from '../../components/common/loading'
import ComPopupText from '../../components/common/ComPopupText'
export default {
  components:{
    ComPopupText,
    DiaLoading,
    VanNavBar: NavBar,
  },
  data () {
    return {
      modelshow:false,
      imgUrl:'http://athena-1255600302.cosgz.myqcloud.com',
      isLoading:true,
      poster:'',
      qrcode:'',
      logo:'',
      activitDetail:{},
      height:document.documentElement.clientHeight,
      docmHeight: document.documentElement.clientHeight,  //默认屏幕高度
      showHeight: document.body.clientHeight,  //实时屏幕高度
      hidshow:true,  //显示或者隐藏footer,
      isResize:false, //默认屏幕高度是否已获取,
      top:'',
      activityid:'',
      tagId:'',
      imagePreview: { // 图片预览
        show: false,
        imageUrl: ''
      },
      videoPreview: { // 视频预览
        show: false,
        videoUrl: '',
        model: {}
      },
      textPreview: { // 文本预览
        show: false,
        model: {}
      },
      showback:1,
      externalUserId:'',
      jssdk: {
        // 判断是否有效值
        configValid: false,
        agentConfigValid: false,
      },
      singleChat:true,
      customerModel:{},
      accessticket:'',
      posbottom:20,
      saveUrl:'',
      authorizeUserId:'',
      chatId:'',//群聊id
      total:'0'
    }
  },
  watch: {
    showHeight:function() {
      if(this.docmHeight > this.showHeight){
        this.hidshow=false
      }else{
        this.hidshow=true
      }
    }
  },  
  mounted() {
    this.$nextTick(() => {
      this.posbottom=document.documentElement.clientHeight*0.1-52.5
    })
    window.onresize = ()=>{
      return(()=>{
        if (!this.isResize) {
          //默认屏幕高度
          this.docmHeight=document.documentElement.clientHeight 
          this.isResize = true
        }
        //实时屏幕高度
        this.showHeight = document.body.clientHeight 
      })()
    }
  },
  created() {
    this.showback=sessionStorage.getItem('pullshowback')
    this.activityid = sessionStorage.getItem('pullid')
    this.authorizeUserId = sessionStorage.getItem('authorizeUserId')
    // this.posterRefer()
    this.getWxJsJdkConfig()
  },
  methods: {
    // 活动详情
    posterRefer(externalUserId){
      this.$http.activityDetail({id:this.activityid,userId:this.authorizeUserId,externalUserId}).then(res=>{
        this.activitDetail=res.data.data
        this.activitDetail.subs.forEach(val => {
          if(val.mark== "clientName"){
            val.style.width=val.style.width.substring(0,val.style.width.length-2)-12+'px'
            val.style.height=val.style.height.substring(0,val.style.height.length-2)-12+'px'
          }else if(val.mark=='code'){
            val.style.width=val.style.width-12
          }else if(val.mark=='logo'){
            val.style.width=val.style.width-12
          }
        });
        this.$store.commit("getNewTagLists", this.activitDetail.tagList);
        // sessionStorage.setItem('tagList',JSON.stringify(this.activitDetail.tagList))
        this.poster=res.data.data.imgUrl
        this.imgToBase64(res.data.data.imgUrl,1)
        this.isLoading=false
      })
    },
    // 获取客户活码
    getcode(id,externalUserId){
      this.$http.newActivityGetQrcode({activityId:id,externalUserId}).then(res=>{
        this.imgToBase64(res.data.data.qrcodeUrl,2)
      })
    },
    // 获取头像，昵称
    getCustomerDetail() {
     this.$http.getUserInfo().then((res) => {
        var name = res.data.data.name
        var avatar = res.data.data.avatar
        this.activitDetail.subs.forEach(val => {
          if(val.mark== "clientName"){
            val.content=name
          }else if(val.mark=='code'){
          }else if(val.mark=='logo'){
            val.imgUrl=avatar
            this.imgToBase64(avatar,3)
          }
        });
      });
    },
    // 获取邀请客户数
    invitelist(externalUserId){
      this.$http.inviteCustomers({externalUserId,activityId:this.activityid}).then(res=>{
        this.total=res.data.data.total
      })
    },

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
            "getContext",
            "sendChatMessage",
            "getCurExternalContact",
            "getCurExternalChat",
            "openUserProfile"
          ],
          success: function(res) {
            // 回调
            // 判断当前客户端是否支持指定的JS接口
            that.checkJsApi();
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
    checkJsApi() {
      let that = this;
      wx.checkJsApi({
        jsApiList: [
          "getContext",
          "sendChatMessage",
          "getCurExternalContact",
          "getCurExternalChat",
          "openUserProfile"
        ], // 需要检测的JS接口列表，所有JS接口列表见附录2,
        success: function(res) {
          // 以键值对的形式返回，可用的api值true，不可用为false
          // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
          if (res.checkResult.sendChatMessage) {
            that.jssdk.agentConfigValid = true;
          } else {
            that.jssdk.agentConfigValid = false;
          }
        },
      });
    },
     // 获取H5页面的入口环境
    getContext() {
      let that = this;
      wx.invoke("getContext", {}, function (res) {
        if (res.err_msg == "getContext:ok") {
          let entry = res.entry; //返回进入H5页面的入口类型，目前有normal、contact_profile、single_chat_tools、group_chat_tools
          if (entry == "single_chat_tools") {
            // 单聊
            that.singleChat = true;
            that.getCurExternalContact();
          } else if (entry == "group_chat_tools") {
            // 群聊
            that.singleChat = false;
            that.getCurExternalChat();
          } else {
            that.singleChat = true;
            that.getCurExternalContact();
          }
        } else {
          //错误处理，仅在企业微信3.0.24及以后版本支持
          Notify({ type: "warning", message: "企业微信版本过低请升级" });
        }
      });
    },
    // --------------------------------------------end--------------------
    // 获取外部联系人useid
    getCurExternalContact() {
      let that = this;
      wx.invoke("getCurExternalContact", {}, function(res) {
        if (res.err_msg == "getCurExternalContact:ok") {
          that.externalUserId = res.userId//返回当前外部联系人userId
          console.log('外部联系人wxid',res.userId)
          that.posterRefer(res.userId)
          that.invitelist(res.userId)
          that.getcode(that.activityid,res.userId)
          that.getCustomerDetail()
        } else {
          //错误处理
          Notify({ type: "warning", message: "无法获取客户信息" });
        }
      });
    },
    // 获取当前客户群的群ID
    getCurExternalChat() {
      let that = this;
      wx.invoke("getCurExternalChat", {}, function(res) {
        if (res.err_msg == "getCurExternalChat:ok") {
          let chatId = res.chatId; //返回当前客户群的群聊ID
          that.chatId = chatId
          // that.getCustomerGroupDetail(chatId);
        } else {
          //错误处理
          Notify({ type: "warning", message: "无法获取客户群信息" });
        }
      });
    },
    
    // 编辑标签
    // updateTags(){
    //   this.$router.push(`./tags?id=${this.activityid}`)
    // },

    // new活动话术预览
    deitionText(content){
      this.textPreview.model.content = content
      this.textPreview.show = true
    },
    // new活动话术发送
    sendNewText(content){
      console.log(content)
      wx.invoke(
          "sendChatMessage",
          {
            msgtype: "text",
            text: {
              content:content, // 文本内容
            },
          },
          function(res) {
            if (res.err_msg == "sendChatMessage:ok") {
              // 发送成功
              // if (that.isMobile) {
              //   Notify({ type: 'success', message: '发送成功' })
              // }
              // that.recordSendNumber(form)
              // that.recordBehaviorScore(form)
            } else if (res.err_msg == "sendChatMessage:cancel") {
              // 不作处理
            } else {
              Notify({ type: "warning", message: res.err_msg });
            }
          }
        );
    },
    // 预览后发送文本
    preTextChange(){
      console.log(this.textPreview.model.content)
      wx.invoke(
        "sendChatMessage",
        {
          msgtype: "text",
          text: {
            content: this.textPreview.model.content, // 文本内容
          },
        },
        function(res) {
          if (res.err_msg == "sendChatMessage:ok") {
            // 发送成功
            // if (that.isMobile) {
            //   Notify({ type: 'success', message: '发送成功' })
            // }
            // that.recordSendNumber(form)
            // that.recordBehaviorScore(form)
          } else if (res.err_msg == "sendChatMessage:cancel") {
            // 不作处理
          } else {
            Notify({ type: "warning", message: res.err_msg });
          }
        }
      );
      this.textPreview.show = false
    },


    // ---------------------------发送惠东话术内容start-------------------------------------------
    // 文件名后缀
    checkFileSuffix(name) {
      let fileSuffix = name.substring(name.lastIndexOf('.') + 1)
      let value = ''
      if (fileSuffix === 'pdf') {
        value = 'pdf'
      } else if (fileSuffix === 'xls' || fileSuffix === 'xlsx') {
        value = 'xls'
      } else if (fileSuffix === 'doc' || fileSuffix === 'docx') {
        value = 'docx'
      } else if (fileSuffix === 'ppt' || fileSuffix === 'pptx') {
        value = 'ppt'
      } else {
        value = 'txt'
      }
      return value
    },
    // 话术预览
    previewSpeechContent(obj) {
      let type = obj.type
      console.log('预览' + type)
      if (type === 'image') {
        this.previewImage(obj)
      } else if (type === 'video') {
        this.previewVideo(obj)
      } else if (type === 'image_text') {
        if(obj.mark=='numerousImageText'){
          this.previewImageText(obj,1)
        }else{
          this.previewImageText(obj,2)
        }
      } else if (type === 'file') {
        this.filePreview(obj)
      } else if (type === 'text') {
        this.showTextPreview(obj)
      } else if (type === 'program') {
        Notify({ type: 'warning', message: '小程序暂不支持预览功能' })
      }
    },
    // 图片预览
    previewImage(obj) {
      this.imagePreview.imageUrl = `${this.imgUrl}${obj.imageUrl}`
      this.imagePreview.show = true
    },
    // 视频预览
    previewVideo(obj) {
      let fileId = obj.fileId
      if (fileId) {
        this.$http.getVideoSignatureDetail({ fileId }).then(res => {
          let videoUrl = res.data.data.file.url + res.data.data.playSignature.queryString
          this.$set(this.videoPreview, 'videoUrl', videoUrl)
          this.videoPreview.model = obj
          this.videoPreview.show = true
        })
      } else {
        Notify({ type: 'warning', message: '无效的素材内容，请重新上传' })
      }
    },
    // 图文预览
    previewImageText(obj,num) {
      if(num==1){
        var link=obj.link+'&userId='+this.authorizeUserId+'&customerId='+this.userId
        window.open(link)
      }else{
        window.open(obj.link)
      }
    },
    // 文件预览
    filePreview(obj) {
      if (this.isMobile) {
        window.open(`${this.imgUrl}${obj.file}`);
      } else {
        window.location.href = `${this.imgUrl}${obj.file}`
      }
    },
    // 文本预览
    showTextPreview(obj) {
      let params = {}
      if (this.singleChat) {
         params = {
          id: that.activityid,
          userId: that.authorizeUserId,
          externalUserId: that.externalUserId
        }
      } else {
        params = {
          id: obj.id,
          userId: this.authorizeUserId,
          customerId: this.chatId,
          chatType: 'group'
        }
      }
      this.$http.activityDetail(params).then(res => {
        this.textPreview.model = res.data.data
        this.textPreview.show = true
      })
    },
    // 预览文本后发送文本
    commitTextChange() {
      if (this.jssdk.configValid && this.jssdk.agentConfigValid) {
        let that = this
        let form = this.textPreview.model
        if (form.content !== '') {
          wx.invoke(
            "sendChatMessage",
            {
              msgtype: "text",
              text: {
                content: form.content, // 文本内容
              },
            },
            function(res) {
              if (res.err_msg == "sendChatMessage:ok") {
                // 发送成功
                // if (that.isMobile) {
                //   Notify({ type: 'success', message: '发送成功' })
                // }
                // that.recordSendNumber(form)
                // that.recordBehaviorScore(form)
              } else if (res.err_msg == "sendChatMessage:cancel") {
                // 不作处理
              } else {
                Notify({ type: "warning", message: res.err_msg });
              }
            }
          );
          this.textPreview.show = false
        } else {
          Notify({ type: "warning", message: "请输入话术内容" });
        }
      } else {
        Notify({ type: "warning", message: "暂无此接口权限" });
      }
    },
    // 文本格式转换
    formatterTextContent(content) {
      if (content) {
        // let str = this.parsingEmoji(content)
        let repContent1 = '<span style="color: #4f73ad">&lt;客户昵称&gt;</span>'
        let repContent2 = '<span style="color: #4f73ad">&lt;成员昵称&gt;</span>'
        let str1 = content.replace(/<客户昵称>/g, repContent1)
        let str2 = str1.replace(/<成员昵称>/g, repContent2)
        return str2
      }
    },
    // 发送话术
    _handleItemClick(item) {
      console.log('_handleItemClick',item)
      let type = item.type;
      if (this.jssdk.configValid && this.jssdk.agentConfigValid) {
        if (type == "text") {
          this.sendTextMessage(item);
        } else if (type == "image") {
          this.sendImageMessage(item);
        } else if (type == "image_text") {
          if(item.mark=='numerousImageText'){
            this.sendImageTextMessage(item,1)
          }else{
            this.sendImageTextMessage(item,2);
          }
        } else if (type == "video") {
          this.sendVideoMessage(item);
        } else if (type == "program") {
          this.sendProgramMessage(item);
        } else if (type == "file") {
          this.sendFileMessage(item);
        }
      } else {
        Notify({ type: "warning", message: "暂无此接口权限" });
      }
    },
    
    // 文本消息
    sendTextMessage(obj) {
      let that = this
      let params = {}
      if (that.singleChat) {
        params = {
          id: that.activityid,
          userId: that.authorizeUserId,
          externalUserId: that.externalUserId
        }
      } else {
        params = {
          id: that.activityid,
          userId: that.authorizeUserId,
          customerId: that.chatId, // 群聊id
          chatType: 'group'
        }
      }
      that.$http.activityDetail(params).then(res => {
        let form = res.data.data
        wx.invoke(
          "sendChatMessage",
          {
            msgtype: "text",
            text: {
              content: form.content, // 文本内容
            },
          },
          function(res) {
            if (res.err_msg == "sendChatMessage:ok") {
              // 发送成功
              // if (that.isMobile) {
              //   Notify({ type: 'success', message: '发送成功' })
              // }
              // that.recordSendNumber(form)
              // that.recordBehaviorScore(form)
            } else if (res.err_msg == "sendChatMessage:cancel") {
              // 不作处理
            } else {
              Notify({ type: "warning", message: res.err_msg });
            }
          }
        );
      })
    },
    // 图片消息
    sendImageMessage(obj) {
      let that = this
      if (obj.mediaId) {
        wx.invoke(
          "sendChatMessage",
          {
            msgtype: "image",
            image: {
              mediaid: obj.mediaId, // 图片的素材id
            },
          },
          function(res) {
            if (res.err_msg == "sendChatMessage:ok") {
              // if (that.isMobile) {
              //   Notify({ type: 'success', message: '发送成功' })
              // }
              // that.recordSendNumber(obj)
              // that.recordBehaviorScore(obj)
            } else if (res.err_msg == "sendChatMessage:cancel") {
              // 不作处理
            } else {
              // Notify({ type: "warning", message: res.err_msg });
              Notify({ type: "warning", message: '素材已过期' });
            }
          }
        );
      } else {
        Notify({ type: "warning", message: "无效的素材内容，请重新上传" });
      }
    },
    // 图文消息
    sendImageTextMessage(obj) {
      let that = this
      let link = obj.link
      // 话术已经关联了雷达，并且雷达id不为空
      if (obj.radarId) {
        if (obj.radarId !== '' && that.singleChat) {
          // 单聊构建雷达链接
          link = `${that.baseUrl}/api/v1/radar/redirect?customerId=${that.customerModel.id}&id=${obj.radarId}&userId=${that.authorizeUserId}&channel=speechcraft`
        }
      }
      wx.invoke(
        "sendChatMessage",
        {
          msgtype: "news",
          news: {
            link: link, // h5消息页面url必填
            title: obj.name, // 消息标题
            desc: obj.content, // 消息摘要
            imgUrl: that.imgUrl + obj.imageUrl, // 消息封面图片URL
          },
        },
        function(res) {
          if (res.err_msg == "sendChatMessage:ok") {
            // if (that.isMobile) {
            //   Notify({ type: 'success', message: '发送成功' })
            // }
            // that.recordSendNumber(obj)
            // that.recordBehaviorScore(obj)
          } else if (res.err_msg == "sendChatMessage:cancel") {
            // 不作处理
          } else {
            Notify({ type: "warning", message: res.err_msg });
          }
        }
      );
    },
    // 视频消息
    sendVideoMessage(obj) {
      let that = this
      if (obj.mediaId) {
        wx.invoke(
          "sendChatMessage",
          {
            msgtype: "video",
            video: {
              mediaid: obj.mediaId, // 视频的素材id
            },
          },
          function(res) {
            if (res.err_msg == "sendChatMessage:ok") {
              // if (that.isMobile) {
              //   Notify({ type: 'success', message: '发送成功' })
              // }
              // that.recordSendNumber(obj)
              // that.recordBehaviorScore(obj)
            } else if (res.err_msg == "sendChatMessage:cancel") {
              // 不作处理
            } else {
              // Notify({ type: "warning", message: res.err_msg });
              Notify({ type: "warning", message: "素材已过期" });
            }
          }
        );
      } else {
        Notify({ type: "warning", message: "无效的素材内容，请重新上传" });
      }
    },
    // 文件消息
    sendFileMessage(obj) {
      let that = this
      // 话术已经关联了雷达，并且雷达id不为空
      if (obj.radarId && obj.radarId !== '' && that.singleChat) {
        let link = `${that.baseUrl}/api/v1/radar/redirect?customerId=${that.customerModel.id}&id=${obj.radarId}&userId=${that.authorizeUserId}&channel=speechcraft`
        let title = obj.name
        let desc = '点击查看文件' // 当前默认
        if (obj.fileDescribe) {
          desc = obj.fileDescribe
        }
        let fileType = this.checkFileSuffix(obj.file)
        let imgUrl = this.imgUrl + '/attachments/scrm/96514dde897b4d9fbf9830e9bba9561d.png' // 默认图片
        if (fileType === 'pdf') {
          imgUrl = this.imgUrl + '/attachments/scrm/f272ae33bf3c45979eb80ad521fd9def.png'
        } else if (fileType === 'xls') {
          imgUrl = this.imgUrl + '/attachments/scrm/74999bb38e7f4000b04bcd7a6f3aecd5.png'
        } else if (fileType === 'docx') {
          imgUrl = this.imgUrl + '/attachments/scrm/27cf0772ebb34efb9a78b38994357695.png'
        } else if (fileType === 'txt') {
          imgUrl = this.imgUrl + '/attachments/scrm/96514dde897b4d9fbf9830e9bba9561d.png'
        } else if (fileType === 'ppt') {
          imgUrl = this.imgUrl + '/attachments/scrm/e7efa247eb694908bae29a53b87aa909.png'
        }
        console.log('构建雷达链接' + link + '/n文件类型' + fileType)
        wx.invoke(
          "sendChatMessage",
          {
            msgtype: "news",
            news: {
              link: link, // h5消息页面url必填
              title: title, // 消息标题
              desc: desc, // 消息摘要
              imgUrl: imgUrl, // 消息封面图片URL
            },
          },
          function(res) {
            if (res.err_msg == "sendChatMessage:ok") {
              // if (that.isMobile) {
              //   Notify({ type: 'success', message: '发送成功' })
              // }
              // that.recordSendNumber(obj)
              // that.recordBehaviorScore(obj)
            } else if (res.err_msg == "sendChatMessage:cancel") {
              // 不作处理
            } else {
              Notify({ type: "warning", message: res.err_msg });
            }
          }
        );
      } else {
        if (obj.mediaId) {
          console.log('发送文件')
          wx.invoke(
            "sendChatMessage",
            {
              msgtype: "file",
              file: {
                mediaid: obj.mediaId, // 文件的素材id
              },
            },
            function(res) {
              console.log('文件发送回调信息', res)
              if (res.err_msg == "sendChatMessage:ok") {
                // if (that.isMobile) {
                //   Notify({ type: 'success', message: '发送成功' })
                // }
                // that.recordSendNumber(obj)
                // that.recordBehaviorScore(obj)
              } else if (res.err_msg == "sendChatMessage:cancel") {
                // 不作处理
              } else {
                console.log('素材已过期')
                // Notify({ type: "warning", message: res.err_msg });
                Notify({ type: "warning", message: "素材已过期" });
              }
            }
          );
        } else {
          Notify({ type: "warning", message: "无效的素材内容，请重新上传" });
        }
      }
    },
    // 小程序消息
    sendProgramMessage(obj) {
      let that = this
      // 小程序类型的消息格式仅企业微信3.1.0及以后版本支持；小程序必须已经关联到工作台，否则会报错 “not allow to cross corp”。
      let ua = navigator.userAgent
      let version = ''
      if (ua.match(/wxwork\/([\d.]+)/)) {
        version = ua.match(/wxwork\/([\d.]+)/)[1];
      }
      if (version == '') {
        Notify({ type: "warning", message: "请在企业微信中使用此功能" });
        return
      }
      if (utils.compareVersion(version, '3.1.0') >= 0) {
        let page = ''
        let index = obj.link.lastIndexOf(".")
        if (index >= 0) {
          let ext = obj.link.substring(index + 1)
          if (['html'].indexOf(ext) >= 0) {
            page = obj.link
          } else {
            page = obj.link + '.html'
          }
        } else {
          page = obj.link + '.html'
        }
        wx.invoke(
          "sendChatMessage",
          {
            msgtype: "miniprogram",
            miniprogram: {
              appid: obj.programId,//小程序的appid
              title: obj.name, //小程序消息的title
              imgUrl: `${that.imgUrl}${obj.imageUrl}`,//小程序消息的封面图。必须带http或者https协议头，否则报错 $apiName$:fail invalid imgUrl
              page: page, //小程序消息打开后的路径，注意要以.html作为后缀，否则在微信端打开会提示找不到页面
            },
          },
          function(res) {
            if (res.err_msg == "sendChatMessage:ok") {
              // if (that.isMobile) {
              //   Notify({ type: 'success', message: '发送成功' })
              // }
              // that.recordSendNumber(obj)
              // that.recordBehaviorScore(obj)
            } else if (res.err_msg == "sendChatMessage:cancel") {
              // 不作处理
            } else {
              // Notify({ type: "warning", message: res.err_msg });
              Notify({ type: "warning", message: "请确保小程序已关联到企业微信工作台" })
              console.log('发送小程序消息', res.err_msg);
            }
          }
        );
      } else {
        Notify({ type: "warning", message: "当前企业微信版本过低，无法使用该功能，请升级到最新版本后重试。" });
      }
    },
    // 关闭图片预览
    closeImagePreview(){
      this.imagePreview.show = false
    },
    // 关闭视频预览
    closeVideoPreview(){
      this.videoPreview.videoUrl = ''
      this.videoPreview.show = false
    },
    // 视频预览
    handleSendVideo(){
      this.videoPreview.videoUrl = ''
      this.videoPreview.show = false
      this._handleItemClick(this.videoPreview.model)
    },
    // ----------------发送活动话术内容end------------------------------------------------




    // 图片转base64--接口转
    imgToBase64(img,num){
      this.$http.imgToBase64({img}).then(res=>{
        var img='data:image/jpeg;base64,'+res.data.message
        if(num==1){
          this.poster=img
        }else if(num==2){
          this.qrcode=img
        }else if(num==3){
          this.logo=img
        }
      })
    },

    // 点击弹出海报窗口
    clickGeneratePic(){
      this.modelshow=true
      // this.save()//在此处生成由于dom还没有创建完成，所以获取不到 imageWrapper
    },
    save(){
      console.log('开始绘制')
      this.isLoading=true
      window.pageYoffset = 0;
      window.pageXoffset = 0;
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      var targetDom=document.getElementById("imageWrapper")
      var rect = targetDom.getBoundingClientRect()
      console.log(rect.left,rect.top)
      var opts={x:rect.left,y:rect.top,scrollX:0,scrollY:0,width: targetDom.clientWidth,height: targetDom.clientHeight,
      useCORS:true,scale:2,dpi:300,allowTaint:true,taintTest: true ,letterRendering:true}
      html2canvas(targetDom,opts).then(canvas => {
        let saveUrl = canvas.toDataURL('image/png')
        // this.saveUrl=saveUrl
        this.imagecodejpg(saveUrl)
      });
    },
    // 获取图片meid
    imagecodejpg(link){
      console.log('获取图片mediaid')
      let file = this.dataURLtoFile(link, '')
      let params = new FormData()
      // params.append('imageType', 'scrm')
      params.append('file', file)
      this.$http.generateImages(params).then(res => {
        this.isLoading=false
        this.sendImageMessage({mediaId:res.data.message})
      })
    },
      //将base64转换为文件
    dataURLtoFile(dataurl, filename) {
      var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
      while(n--){
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, {type:mime});
    },
    
  }
}
</script>

