<template>
  <div class="speech-craft">
    <div class="tabbar">
      <div
        class="tab-item"
        v-for="(item, index) in tabs"
        :key="index"
        :class="tabActive === item.value ? 'tab-active' : ''"
        @click="tabChange(item)"
      >
        {{ item.name }}
      </div>
    </div>
    <div class="speech-top" style="margin-top:46px">
      <div class="s-t-enterprise" v-if="tabActive === 'company'">
        <div class="search">
          <van-search
            v-model="company.searchContent"
            :show-action="false"
            placeholder="请输入关键词"
            :clearable="false"
            @input="onCompSpeechSearch"
          >
            <template #left-icon>
              <van-icon
                name="search"
                class="search-icon"
                @click="onCompSpeechSearch"
              ></van-icon>
            </template>
            <template #right-icon>
              <van-icon
                name="cross"
                class="clear-icon"
                @click="clearCompSpeechSearch"
              ></van-icon>
            </template>
          </van-search>
        </div>
        <div class="group" v-if="!company.isSearch">
          <!-- <div class="g-list" id="g-list-box"
            :class="company.showExpendBtn && company.isFold ? 'g-list-max' : 'g-list-self'"
          >
            <div class="g-item"
              v-for="(item, index) in company.speechGroup"
              :key="index"
              :class="company.selectedGroupId === item.id ? 'g-active' : ''"
              @click="compSpeechGroupChange(item)"
            >
              {{item.name}}
            </div>
          </div> -->
          <!-- <template v-if="company.showExpendBtn">
            <div class="expend-btn" v-if="company.isFold" @click="onExpendBtnChange">展开<van-icon name="arrow-down" class="arrow-down-icon" /></div>
            <div class="expend-btn" v-else @click="onExpendBtnChange">收起<van-icon name="arrow-up" class="arrow-up-icon" /></div>
          </template> -->
          <div
            class="g-list"
            id="g-list-box"
            :class="getGroupListClass(company.showExpendBtn)"
          >
            <div
              class="g-item"
              v-for="(item, index) in company.speechGroup"
              :key="index"
              :class="company.selectedGroupId === item.id ? 'g-active' : ''"
              @click="compSpeechGroupChange(item)"
            >
              {{ item.name }}
            </div>
          </div>
          <template v-if="company.showExpendBtn">
            <div
              class="expend-btn"
              v-if="company.isFold"
              @click="onExpendBtnChange"
            >
              展开<van-icon name="arrow-down" class="arrow-down-icon" />
            </div>
            <div class="expend-btn" v-else @click="onExpendBtnChange">
              收起<van-icon name="arrow-up" class="arrow-up-icon" />
            </div>
          </template>
        </div>
        <div
          class="speech-content"
          id="speech-content"
          :style="{ height: fullContentHeight }"
        >
          <div class="company-box" v-if="tabActive === 'company'">
            <template v-if="!company.isSearch">
              <div class="collapse" v-if="company.speechList.length > 0">
                <van-collapse
                  v-model="company.speechActiveName"
                  accordion
                  :border="false"
                  @change="onSpeechCollapseChange"
                >
                  <van-collapse-item
                    v-for="(item, index) in company.speechList"
                    :key="index"
                    :name="index"
                    :border="false"
                  >
                    <template #title>
                      <div class="collapse-item-title">
                        <van-icon
                          name="smile-comment-o"
                          class="collapse-item-icon"
                        ></van-icon
                        >{{ item.name }}
                      </div>
                    </template>
                    <div class="collapse-item-content">
                      <div
                        class="base-item-info"
                        v-for="(obj, idx) in item.list"
                        :key="idx"
                      >
                        <div
                          class="info-left"
                          @click="previewSpeechContent(obj)"
                        >
                          预&nbsp;览
                          <!-- <i class="iconfont icon-feiji arrow-left"></i> -->
                        </div>
                        <div class="info-right" @click="_handleItemClick(obj)">
                          <div
                            class="item-top item-top-image"
                            v-if="obj.type === 'image'"
                          >
                            <img
                              :src="`${imgUrl}${obj.imageUrl}`"
                              class="img-class"
                              alt=""
                            />
                            <div class="img-item-right">
                              <div class="img-title">{{ obj.name }}</div>
                            </div>
                          </div>
                          <div
                            class="item-top item-top-video"
                            v-if="obj.type === 'video'"
                          >
                            <div class="video-wrapper">
                              <video
                                class="video-class"
                                :src="obj.videoUrl"
                              ></video>
                              <div class="video-mask">
                                <van-icon
                                  name="play-circle"
                                  class="play-icon"
                                ></van-icon>
                              </div>
                            </div>
                            <div class="video-item-right">
                              <div class="video-title">{{ obj.name }}</div>
                            </div>
                          </div>
                          <div
                            class="item-top item-top-image-text"
                            v-if="obj.type === 'image_text'"
                          >
                            <img
                              :src="`${imgUrl}${obj.imageUrl}`"
                              class="img-class"
                              alt=""
                            />
                            <div class="right-content">
                              <div class="image-text-title">{{ obj.name }}</div>
                              <div class="image-text-content">
                                {{ obj.content }}
                              </div>
                            </div>
                          </div>
                          <div
                            class="item-top item-top-text"
                            v-if="obj.type === 'text'"
                          >
                            <div
                              class="text-content"
                              v-html="formatterTextContent(obj.content)"
                            ></div>
                          </div>
                          <div
                            class="item-top item-top-file"
                            v-if="obj.type === 'file'"
                          >
                            <i
                              class="iconfont icon-PDFwenjian left-icon"
                              style="color: #ee0a24"
                              v-if="checkFileSuffix(obj.file) === 'pdf'"
                            ></i>
                            <i
                              class="iconfont icon-EXCELwenjian left-icon"
                              style="color: #1AA89D"
                              v-if="checkFileSuffix(obj.file) === 'xls'"
                            ></i>
                            <i
                              class="iconfont icon-wordwenjian left-icon"
                              style="color: #568CF0"
                              v-if="checkFileSuffix(obj.file) === 'docx'"
                            ></i>
                            <i
                              class="iconfont icon-TXTwenjian left-icon"
                              style="color: #FAB169"
                              v-if="checkFileSuffix(obj.file) === 'txt'"
                            ></i>
                            <i
                              class="iconfont icon-pptwenjian left-icon"
                              style="color: #FC8A5F"
                              v-if="checkFileSuffix(obj.file) === 'ppt'"
                            ></i>
                            <div class="right-title">{{ obj.name }}</div>
                          </div>
                          <div
                            class="item-top item-top-program"
                            v-if="obj.type === 'program'"
                          >
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
                              {{ obj.name }}
                            </div>
                          </div>
                          <div
                            class="item-bottom"
                            v-if="
                              obj.searchWordList &&
                                obj.searchWordList.length > 0
                            "
                          >
                            <div class="bottom-tags">
                              <span
                                class="tag-item"
                                v-for="(word, indx) in obj.searchWordList"
                                :key="indx"
                                >{{ word }}</span
                              >
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        class="collapse-data-tips load-more"
                        v-if="company.page.total > item.list.length"
                        @click="loadMoreCompSpeechData(index)"
                      >
                        显示更多
                      </div>
                      <div
                        class="collapse-data-tips"
                        v-else-if="
                          company.page.total <= item.list.length &&
                            company.page.total != 0
                        "
                      >
                        已经到底啦
                      </div>
                      <div class="collapse-data-tips" v-else>暂无数据</div>
                    </div>
                  </van-collapse-item>
                </van-collapse>
              </div>
              <van-empty v-else description="暂无数据">
                <template #image>
                  <img src="../../assets/empty-data.png" />
                </template>
              </van-empty>
            </template>
            <template v-else>
              <div class="search-list">
                <div class="search-content">
                  <div
                    class="base-item-info"
                    v-for="(obj, idx) in company.speechSearchList"
                    :key="idx"
                  >
                    <div class="info-left" @click="previewSpeechContent(obj)">
                      预&nbsp;览
                      <!-- <i class="iconfont icon-feiji arrow-left"></i> -->
                    </div>
                    <div class="info-right" @click="_handleItemClick(obj)">
                      <div
                        class="item-top item-top-image"
                        v-if="obj.type === 'image'"
                      >
                        <img
                          :src="`${imgUrl}${obj.imageUrl}`"
                          class="img-class"
                          alt=""
                        />
                        <div class="img-item-right">
                          <div class="img-title">{{ obj.name }}</div>
                        </div>
                      </div>
                      <div
                        class="item-top item-top-video"
                        v-if="obj.type === 'video'"
                      >
                        <div class="video-wrapper">
                          <video
                            class="video-class"
                            :src="obj.videoUrl"
                          ></video>
                          <div class="video-mask">
                            <van-icon
                              name="play-circle"
                              class="play-icon"
                            ></van-icon>
                          </div>
                        </div>
                        <div class="video-item-right">
                          <div class="video-title">{{ obj.name }}</div>
                        </div>
                      </div>
                      <div
                        class="item-top item-top-image-text"
                        v-if="obj.type === 'image_text'"
                      >
                        <img
                          :src="`${imgUrl}${obj.imageUrl}`"
                          class="img-class"
                          alt=""
                        />
                        <div class="right-content">
                          <div class="image-text-title">{{ obj.name }}</div>
                          <div class="image-text-content">
                            {{ obj.content }}
                          </div>
                        </div>
                      </div>
                      <div
                        class="item-top item-top-text"
                        v-if="obj.type === 'text'"
                      >
                        <div
                          class="text-content"
                          v-html="formatterTextContent(obj.content)"
                        ></div>
                      </div>
                      <div
                        class="item-top item-top-file"
                        v-if="obj.type === 'file'"
                      >
                        <i
                          class="iconfont icon-PDFwenjian left-icon"
                          style="color: #ee0a24"
                          v-if="checkFileSuffix(obj.file) === 'pdf'"
                        ></i>
                        <i
                          class="iconfont icon-EXCELwenjian left-icon"
                          style="color: #1AA89D"
                          v-if="checkFileSuffix(obj.file) === 'xls'"
                        ></i>
                        <i
                          class="iconfont icon-wordwenjian left-icon"
                          style="color: #568CF0"
                          v-if="checkFileSuffix(obj.file) === 'docx'"
                        ></i>
                        <i
                          class="iconfont icon-TXTwenjian left-icon"
                          style="color: #FAB169"
                          v-if="checkFileSuffix(obj.file) === 'txt'"
                        ></i>
                        <i
                          class="iconfont icon-pptwenjian left-icon"
                          style="color: #FC8A5F"
                          v-if="checkFileSuffix(obj.file) === 'ppt'"
                        ></i>
                        <div class="right-title">{{ obj.name }}</div>
                      </div>
                      <div
                        class="item-top item-top-program"
                        v-if="obj.type === 'program'"
                      >
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
                          {{ obj.name }}
                        </div>
                      </div>
                      <div
                        class="item-bottom"
                        v-if="
                          obj.searchWordList && obj.searchWordList.length > 0
                        "
                      >
                        <div class="bottom-tags">
                          <span
                            class="tag-item search-tag-item"
                            v-for="(word, indx) in obj.searchWordList"
                            :key="indx"
                            >{{ word }}</span
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="search-data-tips load-more"
                  v-if="company.page.total > company.speechSearchList.length"
                  @click="loadMoreCompSpeechSearchData"
                >
                  显示更多
                </div>
                <div
                  class="search-data-tips"
                  v-else-if="
                    company.page.total <= company.speechSearchList.length &&
                      company.page.total != 0
                  "
                >
                  已经到底啦
                </div>
                <!-- <div class="search-data-tips no-data" v-else>暂无数据</div> -->
                <van-empty v-else description="暂无数据">
                  <template #image>
                    <img src="../../assets/empty-data.png" />
                  </template>
                </van-empty>
              </div>
            </template>
          </div>
          <div class="personal-box" v-if="tabActive === 'personal'"></div>
        </div>
      </div>
      <div class="s-t-personal" v-if="tabActive === 'personal'">
        <div class="search">
          <van-search
            :show-action="false"
            placeholder="请输入关键词"
            :clearable="false"
          >
            <template #left-icon>
              <van-icon name="search" class="search-icon"></van-icon>
            </template>
            <template #right-icon>
              <van-icon name="cross" class="clear-icon"></van-icon>
            </template>
          </van-search>
        </div>
      </div>
    </div>

    <!-- 关键词列表 -->
    <van-overlay
      :show="company.showKeyWords"
      @click="company.showKeyWords = false"
      class="overlay-class"
    >
      <van-popup
        v-model="company.showKeyWords"
        :overlay="false"
        class="popup-class"
      >
        <div class="keyword-popup">
          <div class="popup-title">关键词:</div>
          <div class="popup-content">
            <div
              class="keyword"
              v-for="(item, index) in company.keyWordList"
              :key="index"
              @click="onCompSelectKeyword(item)"
            >
              {{ item.name }}
            </div>
          </div>
        </div>
      </van-popup>
    </van-overlay>
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
    <com-popup-text
      :show="textPreview.show"
      commitText="发送"
      @onCancel="textPreview.show = false"
      @onCommit="commitTextChange"
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
        <!-- <div class="text-content" v-html="formatterTextContent(textPreview.model.content)"></div> -->
      </div>
    </com-popup-text>
    <dia-loading :loading="isLoading"></dia-loading>
  </div>
</template>

<script>
import { Search, Icon, Collapse, CollapseItem, Overlay, Popup, Notify, Empty, Field, Loading, Tag } from 'vant'
import ComPopupText from '../../components/common/ComPopupText'
import DiaLoading from '../../components/common/loading'
import utils from '../../utils/utils'
export default {
  components: {
    vanSearch: Search,
    vanIcon: Icon,
    vanCollapse: Collapse,
    vanCollapseItem: CollapseItem,
    vanOverlay: Overlay,
    vanPopup: Popup,
    vanEmpty: Empty,
    vanField: Field,
    vanLoading: Loading,
    ComPopupText,
    vanTag: Tag,
    DiaLoading,
  },
  data() {
    return {
      tabs: [
        { name: '企业话术', value: 'company' },
        // { name: '个人话术', value: 'personal' }
        // { name: '素材中心', value: 'material' }
      ],
      tabActive: 'company',
      singleChat: true, // 判断入口是群聊还是单聊
      authorizeUserId: '', // 授权登录后获取的userId, Wu
      customerModel: {},
      groupChatModel: {},
      jssdk: {
        // 判断是否有效值
        configValid: false,
        agentConfigValid: false,
      },
      userId: '', // 客户userId(Wu)
      chatId: '', // 群聊chatId(wrHAu2DQAAlCHcqB9AQVp-P0sQsBDPPQ)
      company: {
        speechGroup: [], // 分组列表
        selectedGroupId: '', // 选中的分组id
        speechActiveName: null,
        speechList: [], // 分组下的话术列表
        page: { // 话术分页
          pageNum: 1,
          pageSize: 20,
          total: 0
        },
        searchContent: '',
        showKeyWords: false, // 关键词搜索弹出层
        keyWordList: [], // 关键词列表
        selectedKewordId: 'xxx', // 当前选中的关键词id
        isSearch: false, // 搜索
        speechSearchList: [], // 搜索的话术列表
        showExpendBtn: false,
        isFold: true
      },
      personal: {
        speechGroup: [],
        selectedGroupId: '',
      },
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
      fullContentHeight: '400px',
      isLoading: true, // 数据加载中
      timer: ''
    }
  },
  mounted() {
    this.$nextTick(() => {
      // this.getFullHeight()
      window.onresize = () => {
        this.getFullHeight()
      }
    })
    this.timer = setTimeout(() => {
      if (this.isLoading) {
        this.isLoading = false
      }
    }, 10000)
  },
  beforeDestroy() {
    clearTimeout(this.timer)
  },
  destroyed() {
    window.onresize = ''
  },
  created() {
    this.getAuthorizeWxUserId().then(wxUserId => {
      this.authorizeUserId = wxUserId
    })
    this.isLoading = true
    this.initData()
  },
  
  methods: {
    // 获取成员信息
    // getmembership(){
    //   this.$http.getUserInfo().then(res=>{
    //      sessionStorage.setItem('userInfo', JSON.stringify(res.data.data))
    //   })
    // },
    tabChange(item) {
      this.tabActive = item.value
    },
    initData() {
      this.getWxJsJdkConfig()
      this.getCompSpeechGroup()
    },
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
            "sendChatMessage",
            "getContext",
            "getCurExternalContact",
            "getCurExternalChat",
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
            "sendChatMessage",
            "getContext",
            "getCurExternalContact",
            "getCurExternalChat",
          ],
          success: function(res) {
            // 回调
            // 判断当前客户端是否支持指定的JS接口
            that.checkJsApi();
            // 获取H5页面的入口环境
            that.getContext();
          },
          fail: function(res) {
            if (res.errMsg.indexOf("function not exist") > -1) {
              // alert('版本过低请升级')
              Notify({ type: "warning", message: "企业微信版本过低请升级" });
            }
            // that.jssdk.agentConfigValid = false
          },
        });
      });
    },
    checkJsApi() {
      let that = this;
      wx.checkJsApi({
        jsApiList: [
          "sendChatMessage",
          "getContext",
          "getCurExternalContact",
          "getCurExternalChat",
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
      wx.invoke("getContext", {}, function(res) {
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
    // 获取外部联系人useid
    getCurExternalContact() {
      let that = this;
      wx.invoke("getCurExternalContact", {}, function(res) {
        if (res.err_msg == "getCurExternalContact:ok") {
          let userId = res.userId; //返回当前外部联系人userId
          that.userId = userId
          that.getCustomerDetail(userId);
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
          that.getCustomerGroupDetail(chatId);
        } else {
          //错误处理
          Notify({ type: "warning", message: "无法获取客户群信息" });
        }
      });
    },
    // 获取客户详情
    getCustomerDetail(userId) {
      this.isLoading = false
      let id = userId
      // let id = '179832ca3bb94b59a925f053cf9ec134'
      this.$http.getCustomerDetail({ id }).then((res) => {
        this.customerModel = res.data.data
      })
    },
    // 获取客户群详情
    getCustomerGroupDetail(chatId) {
      this.isLoading = false
      // this.$http.getGroupChatDetail({ chatId }).then((res) => {
      //   this.groupChatModel = res.data.data
      // })
      this.$http.getGroupDetailByWxId({ chatId }).then(res => {
        this.groupChatModel = res.data.data
      })
    },
    // 企业-分组列表
    getCompSpeechGroup() {
      let parentId = 0
      this.$http.getSpeechcraftGroupList({ parentId }).then(res => {
        let list = res.data.data
        if (list.length > 0) {
          // 默认选中第一项
          this.company.selectedGroupId = list[0].id
          this.company.speechGroup = list
          this.getCompSpeechList(list[0].id)
          this.$nextTick(() => {
            this.checkGroupListHeight()
          })
        }
      })
    },
    checkGroupListHeight() {
      let height = document.querySelector('#g-list-box').offsetHeight
      if (height > 80) {
        // 显示展开或收起按钮
        this.company.showExpendBtn = true
        this.company.isFold = true
      }
      this.$nextTick(() => {
        this.getFullHeight()
      })
    },
    onExpendBtnChange() {
      this.company.isFold = !this.company.isFold
      this.$nextTick(() => {
        this.getFullHeight()
      })
    },
    getGroupListClass() {
      let groupClass = ''
      if (this.company.showExpendBtn) {
        if (this.company.isFold) {
          groupClass = 'g-list-max'
        } else {
          groupClass = 'g-list-self'
        }
      }
      // console.log('返回class值' + groupClass)
      return groupClass
    },
    // 企业-折叠面板高度
    getFullHeight() {
      // console.log('页面高度' + window.innerHeight + '距离顶部高度' + document.querySelector('#group-list').offsetTop)
      this.fullContentHeight = window.innerHeight - document.querySelector('#speech-content').offsetTop + 'px'
    },
    // 企业-分组切换
    compSpeechGroupChange(item) {
      let id = item.id
      
      this.company.selectedGroupId = id
      this.getCompSpeechList(id)
    },
    // 企业-获取分组下的话术列表
    getCompSpeechList(parentId) {
      this.$http.getSpeechcraftGroupList({ parentId }).then(res => {
        let list = res.data.data
        // 新增话术列表属性，用于存储话术列表
        list.forEach(item => {
          this.$set(item, 'list', [])
        })
        this.company.speechList = list
        if (this.company.speechList.length > 0) {
          if(list.length>1){
            this.company.speechActiveName = null
          }
          if(list.length==1){
            this.company.speechActiveName = 0
          }
          // 默认展开第一项
          this.company.page.pageNum = 1
          this.getCompSpeechcraftPage(this.company.speechList[0], 0)
        }
      })
    },
    // 企业-获取分组下对应的话术列表
    getCompSpeechcraftPage(obj, idx) {
      let params = {
        groupId: obj.id, // 分组的id
        pageNum: this.company.page.pageNum,
        pageSize: this.company.page.pageSize
      }
      this.$http.getSpeechcraftPage(params).then(res => {
        let list = res.data.data.list
        this.company.page.total = res.data.data.total
        list.forEach(item => {
          this.company.speechList[idx].list.push(item)
        })
      })
    },
    // 折叠面板切换
    onSpeechCollapseChange(idx) {
      if (idx !== '') {
        let obj = this.company.speechList[idx]
        this.company.page.pageNum = 1
        this.company.page.total = 0
        this.company.speechList[idx].list = []
        this.getCompSpeechcraftPage(obj, idx)
      }
    },
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
    // 企业-获取更多话术
    loadMoreCompSpeechData(idx) {
      let obj = this.company.speechList[idx]
      this.company.page.pageNum++
      this.getCompSpeechcraftPage(obj, idx)
    },
    // 企业-话术库搜索
    onCompSpeechSearch() {
      console.log('搜索内容改变' + this.company.searchWordName)
      this.company.showKeyWords = false
      this.company.page.pageNum = 1
      this.company.page.total = 0
      this.company.speechSearchList = []
      if (this.company.searchContent) {
        this.company.isSearch = true
        this.getCompSpeechSearchData()
        this.$nextTick(() => {
          this.getFullHeight()
        })
      } else {
        this.company.selectedKewordId = 'xxx'
        this.company.isSearch = false
        this.getCompSpeechGroup()
        this.$nextTick(() => {
          this.getFullHeight()
        })
      }
    },
    // // 企业-获取搜索的话术列表
    getCompSpeechSearchData() {
      let params = {
        pageNum: this.company.page.pageNum,
        pageSize: this.company.page.pageSize,
        searchWordName: this.company.searchContent, // 搜索的内容
      }
      this.$http.getSpeechcraftPageByKeyWord(params).then(res => {
        let list = res.data.data.list
        list.forEach(item => {
          this.company.speechSearchList.push(item)
        })
        this.company.page.total = res.data.data.total
      })
    },
    // // 企业-获取搜索的话术列表
    // getCompSpeechSearchData() {
    //   let params = {
    //     pageNum: this.company.page.pageNum,
    //     pageSize: this.company.page.pageSize,
    //     searchWordId: this.company.selectedKewordId, // 搜索的关键词id
    //   }
    //   this.$http.getSpeechcraftPageByKeyWord(params).then(res => {
    //     let list = res.data.data.list
    //     list.forEach(item => {
    //       this.company.speechSearchList.push(item)
    //     })
    //     this.company.page.total = res.data.data.total
    //   })
    // },
    // 企业-搜索关键词弹窗
    showCompKeyWordsPopup() {
      this.$http.getSpeechSearchWordList().then(res => {
        this.company.keyWordList = res.data.data
      })
      this.company.showKeyWords = true
    },
    // 企业-选择关键词
    onCompSelectKeyword(item) {
      this.company.isSearch = true
      this.company.searchContent = item.name
      this.company.selectedKewordId = item.id
      this.company.page.pageNum = 1
      this.company.speechSearchList = []
      this.getCompSpeechSearchData()
      // this.$nextTick(() => {
      //   this.fullListHeight()
      // })
    },
    // 企业-清空搜索内容
    clearCompSpeechSearch() {
      this.company.showKeyWords = false
      this.company.searchContent = ''
      this.company.page.pageNum = 1
      this.company.page.total = 0
      this.company.speechSearchList = []
      this.company.isSearch = false
      this.company.selectedKewordId = 'xxx'
      this.getCompSpeechGroup()
      this.$nextTick(() => {
        this.getFullHeight();
      })
    },
    // 企业-加载更多
    loadMoreCompSpeechSearchData() {
      this.company.page.pageNum++
      this.getCompSpeechSearchData()
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
    closeImagePreview() {
      this.imagePreview.show = false
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
    handleSendVideo() {
      this.videoPreview.videoUrl = ''
      this.videoPreview.show = false
      this._handleItemClick(this.videoPreview.model)
    },
    closeVideoPreview() {
      this.videoPreview.videoUrl = ''
      this.videoPreview.show = false
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
          id: obj.id,
          userId: this.authorizeUserId,
          customerId: this.userId
        }
      } else {
        params = {
          id: obj.id,
          userId: this.authorizeUserId,
          customerId: this.chatId,
          chatType: 'group'
        }
      }
      this.$http.getSpeechcraftDetail(params).then(res => {
        this.textPreview.model = res.data.data
        this.textPreview.show = true
      })
      // this.textPreview.model = Object.assign('', obj)
      // this.textPreview.show = true
    },
    // 发送文本
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
                that.recordSendNumber(form)
                that.recordBehaviorScore(form)
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
        // console.log('文本内容' + str2)
        return str2
      }
    },
    _handleItemClick(item) {
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
          id: obj.id,
          userId: that.authorizeUserId,
          customerId: that.userId
        }
      } else {
        params = {
          id: obj.id,
          userId: that.authorizeUserId,
          customerId: that.chatId, // 群聊id
          chatType: 'group'
        }
      }
      that.$http.getSpeechcraftDetail(params).then(res => {
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
              that.recordSendNumber(form)
              that.recordBehaviorScore(form)
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
              that.recordSendNumber(obj)
              that.recordBehaviorScore(obj)
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
    sendImageTextMessage(obj,num) {
      let that = this
      let link = obj.link
      // 判断是否关联了雷达
      // if (obj.isRadar && that.singleChat) {
      //   // 单聊构建雷达链接
      //   link = `${that.baseUrl}/api/v1/radar/redirect?customerId=${that.customerModel.id}&id=${obj.id}&userId=${that.authorizeUserId}&channel=speechcraft`
      // } else if (obj.isRadar && !that.singleChat) {
      //   // 群聊构建雷达链接
      //   link = `${that.baseUrl}/api/v1/radar/redirect?id=${obj.id}&userId=${that.authorizeUserId}&channel=speechcraft`
      // } else {
      //   link = obj.link
      // }
      // 话术已经关联了雷达，并且雷达id不为空
      if (obj.radarId) {
        if (obj.radarId !== '' && that.singleChat) {
          // 单聊构建雷达链接
          link = `${that.baseUrl}/api/v1/radar/redirect?customerId=${that.customerModel.id}&id=${obj.radarId}&userId=${that.authorizeUserId}&channel=speechcraft`
        }
      }
      console.log('构建链接', link,obj)
      wx.invoke(
        "sendChatMessage",
        {
          msgtype: "news",
          news: {
            link: link, // h5消息页面url必填
            title: obj.name, // 消息标题
            desc: obj.content, // 消息摘要
            imgUrl: this.imgUrl + obj.imageUrl, // 消息封面图片URL
          },
        },
        function(res) {
          if (res.err_msg == "sendChatMessage:ok") {
            // if (that.isMobile) {
            //   Notify({ type: 'success', message: '发送成功' })
            // }
            that.recordSendNumber(obj)
            that.recordBehaviorScore(obj)
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
      let link=obj.videoUrl
      if (obj.isRadar) {
        if (obj.radarId !== '') {
          // 单聊构建雷达链接
          link = `${that.baseUrl}/api/v1/radar/redirect?customerId=${that.customerModel.id}&id=${obj.radarId}&userId=${that.authorizeUserId}&channel=speechcraft`
        }
      }
      console.log('视频连接',link)
      if (obj.mediaId) {
          wx.invoke(
            "sendChatMessage",
            {
            msgtype: "news",
            news: {
              link: link, // h5消息页面url必填
              title: obj.name, // 消息标题
              desc: '点击播放视频', // 消息摘要
              imgUrl: 'https://athena-1255600302.cosgz.myqcloud.com/attachments/common/9ed8b8461e8e4857994842ca4f91e463.jpg', // 消息封面图片URL
            },
          },
          function(res) {
            if (res.err_msg == "sendChatMessage:ok") {
              // if (that.isMobile) {
              //   Notify({ type: 'success', message: '发送成功' })
              // }
              that.recordSendNumber(obj)
              that.recordBehaviorScore(obj)
            } else if (res.err_msg == "sendChatMessage:cancel") {
              // 不作处理
            } else {
              // Notify({ type: "warning", message: res.err_msg });
              Notify({ type: "warning", message: "素材已过期" });
            }
          }
        );
        // wx.invoke(
        //   "sendChatMessage",
        //   {
        //     msgtype: "video",
        //     video: {
        //       mediaid: obj.mediaId, // 视频的素材id
        //     },
        //   },
        //   function(res) {
        //     if (res.err_msg == "sendChatMessage:ok") {
        //       // if (that.isMobile) {
        //       //   Notify({ type: 'success', message: '发送成功' })
        //       // }
        //       that.recordSendNumber(obj)
        //       that.recordBehaviorScore(obj)
        //     } else if (res.err_msg == "sendChatMessage:cancel") {
        //       // 不作处理
        //     } else {
        //       // Notify({ type: "warning", message: res.err_msg });
        //       Notify({ type: "warning", message: "素材已过期" });
        //     }
        //   }
        // );
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
              that.recordSendNumber(obj)
              that.recordBehaviorScore(obj)
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
                that.recordSendNumber(obj)
                that.recordBehaviorScore(obj)
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
        // let index = obj.link.lastIndexOf(".")
        // if (index >= 0) {
        //   let ext = obj.link.substring(index + 1)
        //   if (['html'].indexOf(ext) >= 0) {
        //     page = obj.link
        //   } else {
        //     page = obj.link + '.html'
        //   }
        // } else {
        //   page = obj.link + '.html'
        // }
        page = obj.link
        console.log('小程序跳转路径', page)
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
              that.recordSendNumber(obj)
              that.recordBehaviorScore(obj)
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
    // 记录话术发送的次数
    recordSendNumber(obj) {
      let params = {}
      if (this.singleChat) {
        params = {
          id: obj.id,
          customerId: this.customerModel.id
        }
      } else {
        params = {
          id: obj.id,
          customerId: this.groupChatModel.id
        }
      }
      this.$http.insertSendRecord(params).then(() => {})
    },
    // 记录行为标签的分值
    recordBehaviorScore(obj) {
      let params = {}
      if (this.singleChat) {
        params = {
          customerId: this.customerModel.id,
          speechcraftId: obj.id
        }
      } else {
        params = {
          customerId: this.groupChatModel.id,
          speechcraftId: obj.id
        }
      }
      this.$http.insertBehaviorRecord(params).then(() => {})
    }
  }
}
</script>

<style lang="less" scoped>
.speech-craft {
  .tabbar {
    display: flex;
    background-color: #ffffff;
    border-bottom: 1px solid #e8eaf0;
    padding: 0 12px;
    box-sizing: border-box;
    position: fixed;
    top: 0px;
    height: 46px;
    width: 100%;
    background: rgb(255, 255, 255);
    z-index: 2;
    .tab-item {
      padding: 10px;
      margin-right: 20px;
      border-bottom: 2px solid rgba(0, 0, 0, 0);
      color: #9f9e9e;
      margin-bottom: -1px;
      cursor: pointer;
    }
    .tab-active {
      color: #4f73ad;
      border-bottom: 2px solid #4f73ad;
      font-weight: bold;
    }
  }
  .speech-top {
    background-color: rgb(239, 240, 243);
    .s-t-enterprise {
      .search {
        .search-icon {
          font-size: 24px;
          color: #9f9e9e;
          cursor: pointer;
        }
        .clear-icon {
          cursor: pointer;
        }
      }
      .group {
        // margin-top: 20px;
        display: flex;
        justify-content: space-between;
        background: #ffffff;
        .g-list {
          display: flex;
          flex-wrap: wrap;
          padding: 0 12px;
          box-sizing: border-box;
          position: relative;
          .g-item {
            padding: 5px 10px;
            // height: 30px;
            // line-height: 30px;
            border-radius: 6px;
            margin-right: 10px;
            margin-bottom: 10px;
            color: #58595b;
            background-color: #f5f6f9;
            cursor: pointer;
            display: flex;
            align-items: center;
          }
          .g-active {
            color: #ffffff;
            background-color: #4f73ad;
          }
        }
        .g-list-max {
          width: calc(100% - 60px);
          max-height: 76px;
          overflow: hidden;
        }
        .g-list-self {
          width: calc(100% - 60px);
        }
        // .expend-btn {
        //   display: flex;
        //   justify-content: center;
        //   background-color: #ffffff;
        //   padding: 4px 0 12px 0;
        //   color: #4f73ad;
        //   cursor: pointer;
        // }
        .expend-btn {
          display: flex;
          justify-content: center;
          background-color: #ffffff;
          padding: 0 12px 0 0;
          box-sizing: border-box;
          color: #4f73ad;
          align-items: center;
          height: 20px;
          cursor: pointer;
        }
      }
    }
  }
  .speech-content {
    margin-top: 10px;
    overflow-y: auto;
    .company-box {
      .collapse {
        .collapse-item-title {
          display: flex;
          align-items: center;
          font-size: 13px;
          color: #4f73ad;
          .collapse-item-icon {
            font-size: 24px;
            margin-right: 5px;
          }
        }
        .collapse-item-content {
          padding: 12px;
          background-color: #eff0f3;
          .collapse-data-tips {
            font-size: 12px;
            color: #9f9e9e;
            text-align: center;
          }
          .load-more {
            cursor: pointer;
          }
        }
      }
      .search-list {
        padding: 0 12px;
        box-sizing: border-box;
        .search-data-tips {
          font-size: 12px;
          color: #9f9e9e;
          text-align: center;
          padding: 15px 0;
        }
        .load-more {
          cursor: pointer;
        }
        .no-data {
          margin-top: 100px;
        }
      }
    }
  }
}
.base-item-info {
  display: flex;
  margin-bottom: 15px;
  .info-left {
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
    .arrow-left {
      font-size: 12px;
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
      margin-bottom: 10px;
      .img-class {
        width: 78px;
        height: 78px;
        margin-right: 10px;
        object-fit: cover;
        cursor: pointer;
      }
      .img-item-right {
        width: calc(100% - 88px);
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
        width: 78px;
        height: 78px;
        margin-right: 10px;
        object-fit: cover;
      }
      .right-content {
        width: calc(100% - 88px);
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
}
.keyword-popup {
  width: 100%;
  height: 150px;
  padding: 12px;
  box-sizing: border-box;
  background-color: #ffffff;
  overflow-y: auto;
  .popup-title {
    font-size: 12px;
    color: #5e6166;
    margin-bottom: 10px;
  }
  .popup-content {
    display: flex;
    flex-flow: wrap;
    .keyword {
      padding: 8px 12px;
      margin: 0 10px 10px 0;
      cursor: pointer;
      font-size: 12px;
      color: #222222;
      background-color: #f2f8fe;
      border-radius: 3px;
    }
  }
}
.overlay-class {
  top: 90px;
}
.popup-class {
  height: 150px;
  width: 100%;
  top: 162px;
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
.text-popup {
  padding: 20px 12px;
  box-sizing: border-box;
  .text-content {
    width: 100%;
    height: 100px;
    line-height: 18px;
    overflow-y: auto;
  }
}
.loading-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.loading-overlay {
  background-color: rgba(0, 0, 0, 0);
}
.loading-img {
  width: 75px;
}
/deep/ .van-collapse-item {
  margin-bottom: 10px;
  overflow: hidden;
}
/deep/ .van-collapse-item__content {
  padding: 0;
}
</style>