<template>
  <div class="card-detail" @click="onPageClick">
    <div class="card-form" v-if="isCreated == true && (!isMobile || isIphone)">
      <div class="parent">
        <div class="left">
          <img :src="tableData.avatar" />
        </div>
        <div class="right">
          <div class="content">
            <div class="imgbg">
              <div class="bg-name">{{ tableData.name }}</div>
              <div class="bg-position">{{ tableData.position || "--" }}</div>
            </div>

            <div class="test-tel">
              <div class="test-address-content">
                {{ tableData.phone || "--" }}
              </div>
              <div class="test-address-Title">
                <span
                  style="font-size: 12px;
color: #ddd;"
                  class="iconfont icon-dianhua1"
                ></span>
              </div>
            </div>
            <div class="test-email">
              <div class="test-address-content">
                {{ tableData.email || "--" }}
              </div>
              <div class="test-address-Title">
                <span
                  style="font-size: 12px;
color: #ddd;"
                  class="iconfont icon-youxiang"
                />
              </div>
            </div>
            <div class="test-address">
              <div class="test-address-content">
                {{ tableData.address || "--" }}
              </div>
              <div class="test-address-Title">
                <span
                  style="font-size: 12px;
color: #ddd;"
                  class="iconfont icon-dizhi"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="card-form" v-if="isCreated == false && (!isMobile || isIphone)">
      <div class="parent">
        <div class="left">
          <div class="none-left">
            暂无数据
          </div>
        </div>
        <div class="right">
          <div class="content">
            <div
              class="test-none"
              @click.stop="$router.push('/card/addform?status=intro')"
              style="color:#294a7b"
            >
              点击创建
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- <div class="card-pc-div" v-if="isCreated == true && isMobile && isIphone">
      <div class="card-img">
        <img :src="tableData.avatar" alt="" />
      </div>
      <div class="card-line">
        <div class="line">
        </div>
      </div>
      <div class="line-content">
        <div class="line-right">
          <div class="test-bg">
            <div class="imgbg">
              <div class="bg-name">{{ tableData.name }}</div>
              <div class="bg-position">{{ tableData.position || "--" }}</div>
            </div>
          </div>
        </div>
      </div>
    </div> -->
    <div class="card-div" v-if="isCreated == false && isMobile && !isIphone">
      <div class="test-div">
        <div class="test-img-left">
          <div>暂无名片</div>
        </div>
        <div class="test-img-right">
          <div class="test-container">
            <div
              class="test-none"
              @click.stop="$router.push('/card/addform?status=intro')"
              style="color:#294a7b"
            >
              点击创建
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="card-div" v-if="isCreated == true && isMobile && !isIphone">
      <div class="test-div">
        <div class="test-img-left">
          <!-- <van-image-preview > -->
          <img :src="tableData.avatar" alt="" />
          <!-- </van-image-preview> -->
        </div>

        <div class="test-img-right">
          <div class="test-container">
            <div :class="isMobile && !isIphone ? 'test-bg' : 'test-pc-bg'">
              <div class="imgbg">
                <div class="bg-name">{{ tableData.name }}</div>
                <div class="bg-position">{{ tableData.position || "--" }}</div>
              </div>
            </div>

            <div :class="isMobile && !isIphone ? 'test-tel' : 'test-pc-tel'">
              <div class="test-address-content">
                {{ tableData.phone || "--" }}
              </div>
              <div class="test-address-Title">
                <span
                  style="font-size: 12px;
color: #ddd;"
                  class="iconfont icon-dianhua1"
                ></span>
              </div>
            </div>
            <div class="test-email">
              <div class="test-address-content">
                {{ tableData.email }}
              </div>
              <div class="test-address-Title">
                <span
                  style="font-size: 12px;
color: #ddd;"
                  class="iconfont icon-youxiang"
                />
              </div>
            </div>
            <div class="test-address">
              <div class="test-address-content">
                {{ tableData.address || "--" }}
              </div>
              <div class="test-address-Title">
                <span
                  style="font-size: 12px;
color: #ddd;"
                  class="iconfont icon-dizhi"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="look-div" v-if="isCreated == true">
      <div class="look-text">
        <div class="img-look" @click.stop="openNone()">
          <div class="img-text">
            <img
              v-for="(headImage, headIndex) in tableData.viewPersonList"
              :key="headIndex"
              :src="headImage.headImage"
              alt=""
              style="width:25px;height:25px"
            />
          </div>
          <div class="look-look">{{ tableData.viewPersonQuantity }} 人浏览</div>
        </div>
      </div>
      <div class="thumb-text">
        靠谱 {{ tableData.phraseQuantity }}
        <span style="color:#1aad1a" class="iconfont icon-zan"></span>
      </div>
    </div>
    <!-- 预览-跳转至小程序 -->
    <div class="miniprogram-btn">
      <van-button
        v-if="tableData.appid"
        type="default"
        size="normal"
        block
        @click="launchMiniprogram"
        class="look-btn"
        >预览名片</van-button
      >
      <van-button
        type="default"
        size="normal"
        block
        @click="$router.push('/card/poster/form')"
        class="shen-btn"
        v-if="isCreated == true"
        >生成海报</van-button
      >
    </div>
    <div class="my-message">
      <div class="my-picture">
        <div class="picture-title">
          <div class="picture-left">
            <span class="iconfont icon-jianjie smile" />
            <div>我的个人简介</div>
          </div>

          <van-icon
            v-if="isMessage == true"
            name="edit"
            class="picture-right"
            @click.stop="openForm"
          />
        </div>
        <div style="text-align:center" v-if="isMessage == false">
          <img
            src="../../assets/empty-data.png"
            alt=""
            style="width:150px;height:150px;"
          />
          <div>
            点击<span
              style="color:#294a7b"
              @click.stop="$router.push('/card/addform?status=intro')"
              >创建</span
            >个人简介
          </div>
        </div>
        <div class="picture-contain" v-else>
          <div
            class="picture-none"
            v-if="
              messageData.educationExperiences == null &&
                messageData.tags == null &&
                messageData.slogan == ''
            "
          >
            <img
              src="../../assets/empty-data.png"
              alt=""
              style="width:150px;height:150px;"
            />
            <div>
              点击<span style="color:#294a7b" @click.stop="openForm">修改</span
              >个人简介
            </div>
          </div>
          <div class="picture-have" v-else>
            <div class="container-logan">{{ messageData.slogan }}</div>
            <div class="education-name" v-if="messageData.educationExperiences">
              教育经历
            </div>
            <div
              class="container-education"
              v-for="(item, index) in messageData.educationExperiences"
              :key="index"
            >
              <div class="education-school">{{ item.school }}</div>
              <div class="education-time">
                <span>
                  {{ item.startYear | isBaomi }} - {{ item.endYear | isBaomi }}
                </span>
                <span class="spcaility">{{ item.speciality | isBaomi }}</span>
                <span class="degree">{{ item.degree | isBaomi }}</span>
              </div>
            </div>
            <div class="container-tags">
              <ul>
                <li v-for="(items, indexs) in messageData.tags" :key="indexs">
                  {{ items.name }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="my-all-video">
        <div class="picture-title">
          <div class="picture-left">
            <span name="video" class="iconfont icon-video smile" />
            <div>
              我的视频
            </div>
          </div>

          <van-icon
            name="edit"
            v-if="isMessage == false"
            class="picture-right"
            @click.stop="$router.push('/card/addform?status=video')"
          />
          <van-icon
            name="edit"
            v-if="isMessage == true"
            class="picture-right"
            @click.stop="openVideo"
          />
        </div>
        <div
          style="text-align:center"
          v-if="isMessage == false && noneMsg.videoUrl && noneComMsg.videoUrl"
        >
          <img
            src="../../assets/empty-data.png"
            alt=""
            style="width:150px;height:150px;"
          />
          <div>
            点击<span
              style="color:#294a7b"
              @click.stop="$router.push('/card/addform?status=video')"
              >创建</span
            >我的视频
          </div>
        </div>
        <div
          style="text-align:center"
          v-if="
            isMessage == true &&
              noneMsg.videoUrl == '' &&
              noneComMsg.videoUrl == ''
          "
        >
          <img
            src="../../assets/empty-data.png"
            alt=""
            style="width:150px;height:150px;"
          />
          <div>
            点击<span style="color:#294a7b" @click.stop="openVideo">修改</span
            >我的视频
          </div>
        </div>
        <div class="video-div" v-else>
          <div>
            <video-player
              x5-video-player-type="h5-page"
              class="video-player vjs-custom-skin"
              ref="videoPlayer"
              :playsinline="true"
              :options="playerOptions"
              v-if="playerOptions.sources && playerOptions.sources[0].src"
              id="upvideo"
            ></video-player>
          </div>
          <!-- :style="{ display: videoHidden ? 'none' : 'block' }" -->
        </div>
      </div>
      <div class="my-all-pciture">
        <!-- v-if="messageData.images.length != 0 && isMessage == true" -->
        <div class="picture-title">
          <div class="picture-left">
            <span class="iconfont icon-guanggaotu smile" />
            <div>我的照片</div>
          </div>

          <van-icon
            name="edit"
            v-if="isMessage == false"
            class="picture-right"
            @click.stop="$router.push('/card/addform?status=images')"
          />
          <van-icon
            name="edit"
            v-if="isMessage == true"
            class="picture-right"
            @click.stop="openImage"
          />
        </div>
        <div
          style="text-align:center;"
          v-if="
            isMessage == false &&
              noneMsg.images == '' &&
              noneComMsg.images == ''
          "
        >
          <img
            src="../../assets/empty-data.png"
            alt=""
            style="width:150px;height:150px;"
          />
          <div>
            点击<span
              style="color:#294a7b"
              @click.stop="$router.push('/card/addform?status=images')"
              >创建</span
            >我的照片
          </div>
        </div>
        <div class="picture-container" v-else>
          <!-- v-if="messageData.images && messageData.images.length != 0" -->
          <div class="picture-item">
            <img
              v-for="(picItem, picIndex) in messageData.images"
              :key="picIndex"
              v-lazy="picItem"
              alt=""
              @click="open(messageData.images, picIndex)"
            />
          </div>
        </div>
        <div
          style="text-align:center;"
          v-if="
            isMessage == true && noneMsg.images == '' && noneComMsg.images == ''
          "
        >
          <img
            src="../../assets/empty-data.png"
            alt=""
            style="width:150px;height:150px;"
          />
          <div>
            点击<span style="color:#294a7b" @click.stop="openImage">修改</span
            >我的照片
          </div>
        </div>
      </div>
      <div class="daodi">
        <div class="daodi-border">已经到底了</div>
      </div>
    </div>

    <van-dialog
      v-model="isEdit"
      title="修改名片"
      show-cancel-button
      class="pupup-div"
      @confirm="addBtn"
      @cancel="cancelBtn"
    >
      <van-field
        class="input-text"
        label="姓名"
        placeholder="请输入姓名"
        v-model="editModel.name"
        required
        maxlength="10"
      ></van-field>
      <van-field
        class="input-text"
        label="职位"
        placeholder="请输入职位"
        v-model="editModel.position"
        maxlength="10"
      ></van-field>
      <van-field
        class="input-text"
        label="邮箱"
        placeholder="请输入邮箱"
        v-model="editModel.email"
        maxlength="40"
      ></van-field>
      <van-field
        class="input-text"
        label="电话"
        placeholder="请输入电话"
        v-model="editModel.phone"
        maxlength="30"
      ></van-field>
    </van-dialog>
    <van-dialog
      v-model="isAdd"
      title="创建名片"
      show-cancel-button
      class="pupup-div"
      @confirm="isAddBtn"
    >
      <van-field
        class="input-text"
        label="姓名"
        placeholder="请输入姓名"
        v-model="addModel.name"
        required
        maxlength="10"
      ></van-field>
      <van-field
        class="input-text"
        label="职位"
        placeholder="请输入职位"
        v-model="addModel.position"
        maxlength="10"
      ></van-field>
      <van-field
        class="input-text"
        label="邮箱"
        placeholder="请输入邮箱"
        v-model="addModel.email"
        maxlength="40"
      ></van-field>
      <van-field
        class="input-text"
        label="电话"
        placeholder="请输入电话"
        v-model="addModel.phone"
        maxlength="30"
      ></van-field>
    </van-dialog>
    <!-- <div class="removeHome">
      <span
        class="t-suspend-button"
        @touchstart="onTouchStart"
        @touchmove="onTouchMove"
        @touchend="onTouchEnd"
        ref="remove"
        :style="`left: ${oLeft}px; top: ${oTop}px;`"
      >
        <div class="yuanqiu">
          <div class="title" @click.stop="change">{{ title }}</div>
          <transition name="plus-icon-two">
            <div
              class="item-menu-two"
              @click.stop="openForm"
              v-if="isChange == true"
            >
              <span class="iconfont icon-jianjie text" />
            </div>
          </transition>
          <transition name="plus-icon-three">
            <div
              class="item-menu-three"
              @click.stop="openVideo"
              v-if="isChange == true"
            >
              <span class=" iconfont icon-video text" />
            </div>
          </transition>
          <transition name="plus-icon-four">
            <div
              class="item-menu-four"
              @click.stop="openImage"
              v-if="isChange == true"
            >
              <span class="iconfont icon-guanggaotu text" />
            </div>
          </transition>
        </div>
      </span>
    </div> -->

    <van-popup
      v-model="viewShow"
      class="dialog-test"
      close-icon-position="top-right"
      :style="{ maxHeight: '60%', width: '80%' }"
      @click.stop="popupNone"
    >
      <div class="none-container">
        <div class="title-none">
          <div>
            <span>&nbsp;</span>
          </div>
          <div>浏览记录</div>
          <div>
            <van-icon name="cross" class="icon" @click="closePopup" />
          </div>
        </div>
        <div class="look-none">
          <div
            class="none-item"
            v-for="(viewItem, viewIndex) in viewData"
            :key="viewIndex"
          >
            <div class="none-avatar">
              <img :src="viewItem.headImage | isImage" />
            </div>
            <div class="none-right">
              <div class="right-top">
                <div class="none-name">
                  {{ viewItem.name | isMobile }}
                </div>
                <!-- <span
                  class="sex-span"
                  v-if="viewItem.gender === 0 || viewItem.gender === null"
                  >未知</span
                >
                <i
                  class="iconfont icon-nanxing sex-icon"
                  style="color: #3671c9"
                  v-if="viewItem.gender === 1"
                ></i>
                <i
                  class="iconfont icon-nvxing sex-icon"
                  style="color: #ed4e9f"
                  v-if="viewItem.gender === 2"
                ></i> -->
              </div>
              <div class="right-bottom">{{ viewItem.mobile }}</div>
            </div>
          </div>
          <div
            class="none-more-none"
            v-if="viewPage.pageSize >= viewPage.total"
          >
            暂无更多
          </div>
          <div
            class="none-more"
            @click.stop="handleMore"
            v-if="viewPage.pageSize < viewPage.total"
          >
            点击加载更多
          </div>
        </div>
      </div>
    </van-popup>
    <!-- loading -->
    <dia-loading :loading="isLoading"></dia-loading>
  </div>
</template>
<script>
import { ImagePreview, Notify } from "vant";
import { videoPlayer } from "vue-video-player";
import "video.js/dist/video-js.css";
import utils from "../../utils/utils";
import DiaLoading from "../../components/common/loading";
export default {
  components: {
    videoPlayer,
    DiaLoading,
  },
  data() {
    return {
      isAdd: false, //绑定创建弹窗的是否
      isCreated: false, //是否创建的显示与隐藏
      isMessage: false, //下边信息的显示与否
      editModel: {
        name: "",
        position: "",
        email: "",
        phone: "",
      },
      addModel: {
        name: "",
        position: "",
        email: "",
        phone: "",
      },
      isEdit: false, //隐藏的pupou
      isShow: false, //点击修改事件的窗口显示隐藏
      playerOptions: {
        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            src: "", // 路径
            type: "video/mp4", // 类型
          },
        ],
        poster: "", //你的封面地址
        width: document.documentElement.clientWidth,
        notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true, //全屏按钮
        },
      },
      tableData: [],
      messageData: {
        educationExperiences: [],
        host: "",
        images: [],
        tags: [],
        slogan: "",
        videoCover: "",
        videoId: "",
        videoUrl: "",
      },
      videoHidden: false,
      title: "修改",

      oLeft: "",
      oTop: "200",
      $vm: null, // 悬浮按钮
      moving: false, // 移动状态
      oW: null, // 悬钮距离
      oH: null,
      htmlWidth: null, // 页面宽度
      htmlHeight: null,
      bWidth: null, // 悬钮宽度
      bHeight: null,
      click: false, // 是否是点击
      isChange: false,
      posterImg: "", //视频第一帧
      viewPage: {
        pageSize: 20,
        pageNum: 1,
        total: 0,
      },
      viewData: [],
      viewShow: false,
      iconShow: false,
      jssdk: {
        checkJsApi: false, // 判断当前客户端版本是否支持指定JS接口
      },
      isLoading: true,
      timer: "",
      authorizeUserId: "",
      noneMsg: {},
      noneComMsg: {},
    };
  },
  watch: {
    videoHidden(val) {
      console.log(val);
      this.videoHidden = val;
    },
  },
  methods: {
    // 函数部分

    //获取视频第一帧

    //点击popup框
    popupNone() {},
    //关闭pupup的按钮
    closePopup() {
      this.viewShow = false;
    },
    //点击加载更多按钮
    handleMore() {
      this.viewPage.pageSize += 20;
      this.getViewPage();
    },
    //点击多少人浏览窗口
    openNone() {
      this.viewShow = true;
      this.getViewPage();
      // this.$router.push({
      //   path:"/card/customer-dynamic-record"
      // })
    },
    openImage() {
      if (!this.isMessage) {
        Notify({ type: "warning", message: "请先创建信息" });
        return;
      } else {
        this.$router.push("/card/imageform");
      }
    },
    openVideo() {
      if (!this.isMessage) {
        Notify({ type: "warning", message: "请先创建信息" });
        return;
      } else {
        this.$router.push("/card/videoform");
      }
    },
    //点击视频容器
    // videoWrape() {
    //   this.isVideoHide = false;
    // },
    isHidden() {
      return {
        visibility: "hidden",
      };
    },
    onPageClick() {
      this.isShow = false;
      this.isChange = false;
      this.viewShow = false;
      console.log("点击整个页面事件");
    },
    //点击前往创建按钮
    openAdd() {
      this.$router.push("/card/addform");
    },
    //点击创建或者修改成员
    openForm() {
      if (!this.isMessage) {
        Notify({ type: "warning", message: "请先创建信息" });
        return;
      } else {
        this.$router.push("/card/form");
      }
    },
    //点击创建名片弹窗确定按钮
    isAddBtn() {
      if (this.addModel.name == "") {
        Notify({ type: "warning", message: "姓名不能为空" });
        return;
      }
      // if (this.addModel.position == "") {
      //   Notify({ type: "warning", message: "职位不能为空" });
      //   return;
      // }
      // if (this.addModel.email == "") {
      //   Notify({ type: "warning", message: "邮箱不能为空" });
      //   return;
      // }
      // if (this.addModel.phone == "") {
      //   Notify({ type: "warning", message: "电话不能为空" });
      //   return;
      // }
      console.log(this.addModel);
      this.addCart(this.addModel);
    },
    //点击创建名片按钮
    addCard() {
      this.isAdd = true;
    },
    //点击修改信息确认按钮
    cancelBtn() {
      this.isShow = false;
      this.videoHidden = false;
    },
    addBtn() {
      if (this.editModel.name == "") {
        Notify({ type: "warning", message: "姓名不能为空" });
        return;
      }
      // if (this.editModel.position == "") {
      //   Notify({ type: "warning", message: "职位不能为空" });
      //   return;
      // }
      // if (this.editModel.email == "") {
      //   Notify({ type: "warning", message: "邮箱不能为空" });
      //   return;
      // }
      // if (this.editModel.phone == "") {
      //   Notify({ type: "warning", message: "电话不能为空" });
      //   return;
      // }
      this.isShow = false;
      this.videoHidden = false;
      this.updateCard(this.editModel);
    },
    //设置图片预览数组
    open(item, index) {
      // this.videoHidden = true;
      // ImagePreview({
      //   images: item,
      //   startPosition: index,
      //   closeable: true,
      // });
    },
    //点击修改按钮
    edit() {
      this.isShow = !this.isShow;
      console.log(111);
    },
    //点击修改名片信息按钮
    openPopuCard() {
      this.isEdit = true;
      this.isShow = false;
      this.videoHidden = true;
      this.tableData = Object.assign({}, this.tableData);
      this.editModel.name = this.tableData.name;
      this.editModel.position = this.tableData.position;
      this.editModel.email = this.tableData.email;
      this.editModel.phone = this.tableData.phone;
    },

    //接口部分
    //创建成员名片接口
    addCart(params) {
      this.$http.addCart(params).then(() => {
        Notify({ type: "success", message: "添加成功" });
        this.getBussinessUser();
      });
    },
    //修改成员名片接口
    updateCard(params) {
      this.$http.updateCard(params).then(() => {
        Notify({ type: "success", message: "修改成功" });
        this.getBussinessUser();
      });
    },
    //获取用户信息
    getBussinessUser() {
      this.$http.getBussinessUser().then((res) => {
        if (res.data.code == 20000) {
          this.tableData = res.data.data;
          // let avatar = "";
          // if (this.tableData.avatar.indexOf("http") > -1) {
          //   avatar = this.tableData.avatar;
          // } else {
          //   avatar = this.tableData.host + this.tableData.avatar;
          // }
          // this.tableData.avatar = avatar;
          // console.log(this.tableData.avatar);
          this.isCreated = true;
          console.log("名片信息");
        } else {
          this.tableData = [];
          this.isCreated = false;
        }
      });
    },
    getViewPage() {
      let params = {
        pageSize: this.viewPage.pageSize,
        pageNum: this.viewPage.pageNum,
      };
      this.$http.getViewPage(params).then((res) => {
        this.viewData = res.data.data.list;
        this.viewPage.total = res.data.data.total;
      });
    },
    //测试跑授权接口
    setUserId() {
      this.$http
        .setUserId({ userId: "1b69782562ac42c48c725c3b2940ea8d" })
        .then(() => {
          this.isLoading = false;
          this.getBussinessUser();
          setTimeout(() => {
            this.getCardIntroduction();
          }, 100);
        });
    },
    //获取更加详细的信息接口
    getCardIntroduction() {
      this.messageData = {};
      let videoUrl = [];
      console.log("个人信息");
      this.$http.getCardIntroduction().then((res) => {
        // res.data.code = 1009;
        if (res.data.code == 20000) {
          this.noneMsg = res.data.data;
          console.log("创建后获取的个人信息", this.noneMsg);
        } else {
          this.noneMsg = {
            educationExperiences: null,
            host: "",
            id: "",
            images: "",
            slogan: "",
            tags: null,
            videoCover: "",
            videoId: "",
            videoUrl: "",
          };
          console.log("如果没有个人信息就跑这里");
        }
        let code = res.data.code;
        // code = 1009;
        if (code == 1009) {
          this.isMessage = false;
          this.$http.getComPage().then((resData) => {
            this.noneComMsg = resData.data.data;
            console.log(
              "如果没有个人信息没有创建就用企业的信息",
              this.noneComMsg
            );

            if (
              resData.data.data.images != "" &&
              resData.data.data.images != null
            ) {
              let images = resData.data.data.images;
              this.messageData.images = images.split(",").map((s) => {
                return resData.data.data.host + s;
              });
            }
            if (
              resData.data.data.videoUrl != "" ||
              resData.data.data.videoUrl != null
            ) {
              this.playerOptions.sources[0].src = resData.data.data.videoUrl;
            }
            // console.log(this.messageData.images);
          });
        } else {
          this.isMessage = true;
          this.messageData = res.data.data;
          this.$http.getComPage().then((resData) => {
            this.noneComMsg = resData.data.data;
            console.log("如果个人信息创建le就不用的企业信息", this.noneComMsg);
            let comData = resData.data.data;

            if (this.messageData.images != "") {
              this.messageData.images = this.messageData.images
                .split(",")
                .map((s) => {
                  return this.messageData.host + s;
                });
            } else {
              if (comData.images != "") {
                this.messageData.images = comData.images.split(",").map((s) => {
                  return this.messageData.host + s;
                });
              } else {
                this.messageData.images = [];
              }
            }
            if (
              this.messageData.videoUrl == "" ||
              this.messageData.videoUrl == null
            ) {
              this.playerOptions.sources[0].src = comData.videoUrl;
            } else {
              this.playerOptions.sources[0].src = this.messageData.videoUrl;
            }
          });
        }
      });
    },
    change() {
      this.isChange = !this.isChange;
    },
    // 移动触发
    onTouchStart(e) {
      e = e.touches[0];
      this.click = true;
      this.oH = e.clientY - this.$refs.remove.getBoundingClientRect().top;
      this.htmlHeight = document.documentElement.clientHeight;
      this.bHeight = this.$refs.remove.offsetHeight;
      let oTop = e.clientY - this.oH;
      this.oTop = oTop;
      this.moving = true;
    },
    // 移动结束
    onTouchEnd(e) {
      this.moving = false;
      this.$refs.remove.class + " t-suspend-button-animate";
    },
    // 开始移动
    onTouchMove(e) {
      this.$refs.remove.class = "t-suspend-button";
      this.moving && this.onMove(e);
    },
    // 移动中
    onMove(e) {
      e = e.touches[0];
      this.click = false;
      let oTop = e.clientY - this.oH;
      if (oTop < 0) {
        oTop = 0;
      } else if (oTop > this.htmlHeight - this.bHeight) {
        oTop = this.htmlHeight - this.bHeight;
      }
      this.oTop = oTop;
    },
    //接口结束

    // 企业微信JSSDK相关配置
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
            // 回调
            // 判断当前客户端是否支持指定的JS接口
            that.checkJsApi();
            that.isLoading = false;
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
        jsApiList: ["launchMiniprogram"], // 需要检测的JS接口列表，所有JS接口列表见附录2,
        success: function(res) {
          // 以键值对的形式返回，可用的api值true，不可用为false
          // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
          if (res.checkResult.launchMiniprogram) {
            that.jssdk.checkJsApi = true;
          } else {
            that.jssdk.checkJsApi = false;
          }
        },
      });
    },
    // 跳转到名片小程序
    launchMiniprogram() {
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
        wx.invoke(
          "launchMiniprogram",
          {
            appid: this.tableData.appid, // 需跳转的小程序appid
            path: "/pages/scrm/card/index?id=" + this.tableData.id || "", // 所需跳转的小程序内页面路径及参数。
          },
          function(res) {
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
  },
  created() {
    // this.setUserId();
    this.getAuthorizeWxUserId().then(wxUserId => {
      this.authorizeUserId = wxUserId
      this.getBussinessUser();
      setTimeout(() => {
        this.getCardIntroduction();
      }, 100);
    })
    // 配置企业微信JSSDK
    this.isLoading = true;
    this.getWxJsJdkConfig();
  },
  mounted() {
    document.title = "名片";

    // this.$refs.remove.addEventListener(
    //   "touchmove",
    //   (e) => {
    //     if (e.cancelable) {
    //       e.preventDefault();
    //     }
    //   },
    //   { passive: false }
    // );

    this.timer = setTimeout(() => {
      if (this.isLoading) {
        this.isLoading = false;
      }
    }, 10000);
  },
  beforeDestroy() {
    clearTimeout(this.timer);
  },
  filters: {
    isBaomi(options) {
      if (options == "保密") {
        return "";
      } else {
        return options;
      }
    },
    isGender(options) {
      if (options == 0 || options == null || options == "") {
        return "?";
      }
      if (options == 1) {
        return "♂";
      }
      if (options == 2) {
        return "♀";
      }
    },
    isImage(option) {
      if (option == null || option == "") {
        return (option =
          "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png");
      } else {
        return option;
      }
    },
    isMobile(option) {
      if (option == null || option == "") {
        return (option = "暂无");
      } else {
        return option;
      }
    },
  },
  // beforeRouteEnter(to, from, next) {
  //   router.afterEach(async function(transition) {
  //     const jsApiList = ["closeWindow", "hideOptionMenu"];
  //     let res = await API.get("/_caagw/wxwork/getWxworkJSAPIConfig");
  //     if (res.success) {
  //       let resData = res.data;
  //       let wxOpts = {
  //         beta: true, // 必须这么写，否则wx.invoke调用形式的jsapi会有问题
  //         debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
  //         appId: resData.corpId, // 必填，企业微信的corpID
  //         timestamp: resData.timestamp, // 必填，生成签名的时间戳
  //         nonceStr: resData.nonceStr, // 必填，生成签名的随机串
  //         signature: resData.wxSign, // 必填，签名，见 附录-JS-SDK使用权限签名算法
  //         jsApiList: jsApiList, // 必填，需要使用的JS接口列表，凡是要调用的接口都需要传进来
  //       };
  //       wx.config(wxOpts);
  //       wx.ready(() => {
  //         wx.hideOptionMenu();
  //       });
  //       wx.error(function(res) {
  //         // alert("企业微信sdk初始化失败："+res)
  //       });
  //     }
  //   });
  // },
};
</script>

<style lang="less" scoped>
.card-detail {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  .card-form {
    // margin-top: 20px;
    // width: calc(100% - 2%);
    // height: 200px;
    // background-color: #ffffff;
    // display: flex;
    .parent {
      // box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      margin: 20px 10px 0 5px;
      width: calc(100%-5%);
      height: 200px;
      background-color: #f6f6f6;
      overflow: hidden;
      border-radius: 15px;
      .left {
        float: left;
        width: 49%;
        height: 350px;
        // background-color: #fff;
        transform: skew(-7deg) translate(-15px, 0px);
        overflow: hidden;
        img {
          border-top-left-radius: 15px;
          border-bottom-left-radius: 15px;
          transform: skew(7deg) translate(15px, 0px);
          width: 200px;
          height: 200px;
        }
        .none-left {
          color: #616161;
          background-color: #fff;
          text-align: center;
          line-height: 200px;
          transform: skew(7deg) translate(15px, 0px);
        }
      }
      .right {
        float: left;
        padding-left: 5px;
        width: 49%;
        height: 400px;
        transform: skew(-7deg) translate(0px, 0);
        background-color: #fff;
        overflow: hidden;
        .content {
          transform: skew(7deg) translate(0px, 0);
          .test-none {
            text-align: center;
            line-height: 200px;
          }
          .imgbg {
            display: block;
            // border: 1px solid red;
            // margin-top: -10px;
            border-top-right-radius: 15px;
            background-image: url(../../assets/card-pc.png);
            background-repeat: no-repeat;
            width: 200px;
            height: 59px;
            text-align: left;
            margin-left: -10px;
            .bg-name {
              padding-top: 5px;
              margin-left: 30px;
              color: #353535;
              font-weight: bold;
              font-size: 18px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            .bg-position {
              margin-left: 30px;
              font-size: 12px;
              color: #737373;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
          .test-tel {
            margin-top: 10px;
            display: flex;
            color: #383838;
            font-size: 12px;
            text-align: right;
            padding: 0 20px 0 50px;
            .test-address-content {
              margin-left: auto;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
            }
            .test-address-Title {
              margin-left: 5px;
            }
          }
          .test-email {
            margin: 10px 0;
            display: flex;
            color: #383838;
            font-size: 12px;
            text-align: right;
            padding: 0 20px 0 10px;

            .test-address-content {
              word-wrap: break-word;
              margin-left: auto;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
            }
            .test-address-Title {
              font-size: 14px;
              margin-left: 5px;
            }
          }
          .test-address {
            margin-top: 10px;
            display: flex;
            color: #383838;
            font-size: 12px;
            text-align: left;
            padding: 0 20px 0 10px;

            .test-address-content {
              // border: 1px solid red;
              flex: 1;
              text-align: right;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
            }
            .test-address-Title {
              margin-left: auto;
              font-size: 14px;
              margin-left: 5px;
            }
          }
        }
      }
    }
  }
  .card-pc-div {
    margin-top: 20px;
    width: calc(100% - 2%);
    height: 200px;
    background-color: #f9f9f9;
    position: relative;
    overflow: hidden;
    .card-img,
    .line-content {
      width: 250px;
      height: 200px;
    }
    .card-img {
      img {
        border-top-left-radius: 15px;
        border-top-right-radius: 15px;
        width: 200px;
        height: 200px;
      }
      margin-left: 2%;
    }
    .line-content {
      border-radius: 15px;
      width: 400px;
      position: absolute;
      right: 0;
      top: 0;
      text-align: right;
      display: flex;
      .line-right {
        margin-left: auto;
        width: 200px;

        .test-bg {
          display: flex;
          justify-content: start;

          .imgbg {
            margin-top: -2px;
            border-top-right-radius: 15px;
            background-image: url(../../assets/card-bg.png);
            background-repeat: no-repeat;
            margin-left: auto;
            width: 178px;
            height: 60px;
            text-align: left;

            .bg-name {
              margin-top: 10px;
              margin-left: 30px;
              color: #353535;
              font-weight: bold;
              font-size: 18px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            .bg-position {
              margin-left: 30px;
              font-size: 12px;
              color: #737373;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
        }
      }
    }
    .card-line {
      width: 1000px;
      height: 450px;
      background-color: #fff;
      transform: rotateZ(-80deg);
      position: absolute;
      left: -120px;
      top: 0px;
    }
    .line {
      width: 100%;
      height: 10px;
      background-color: #6e6c6c;
    }
  }
  .top-nav {
    line-height: 40px;
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    z-index: 9999;
    height: 40px;
    background-color: #fff;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
  }
  .card-div {
    padding-top: 20px;
    background-image: linear-gradient(#dfdfdf, rgb(250, 250, 250));
    // background: #f5f5f5;

    .test-div {
      width: calc(100% - 50px);
      // width: 98%;
      margin-left: 2%;
      // border: 1px solid green;
      display: flex;
      .test-img-left {
        clip-path: polygon(0 0, 100% 0, 75% 100%, 0% 100%);
        img {
          box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
          border-top-left-radius: 15px;
          border-bottom-left-radius: 15px;
          width: 200px;
          height: 200px;
        }
        div {
          background-color: #fff;
          box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
          border-top-left-radius: 15px;
          border-bottom-left-radius: 15px;
          width: 200px;
          height: 200px;
          text-align: center;
          line-height: 200px;
          color: #616161;
        }
      }
      .test-img-right {
        margin-left: -40px;
        clip-path: polygon(25% 0, 100% 0, 100% 100%, 0% 100%);
        .test-container {
          background-color: #fff;
          box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
          width: 200px;
          height: 200px;
          border-top-right-radius: 15px;
          border-bottom-right-radius: 15px;
          .test-none {
            text-align: center;
            line-height: 200px;
            color: #616161;
          }
          .test-top {
            padding: 15px 20px;
            font-size: 16px;
            color: #616161;
            display: flex;
            justify-content: start;
            .comlogo {
              margin-left: auto;
              display: flex;
              img {
                width: 15px;
                height: 15px;
                border-radius: 5px;
              }
              .comname {
                margin-right: 5px;
                margin-left: 5px;
                font-size: 12px;
              }
            }
          }
          .test-bg {
            display: flex;
            justify-content: start;
            margin: 0;
            padding: 0;
            // border: 1px solid red;
            .imgbg {
              margin-top: -2px;
              border-top-right-radius: 15px;
              background-image: url(../../assets/card-bg.png);
              background-repeat: no-repeat;
              margin-left: auto;
              width: 170px;
              height: 60px;
              .bg-name {
                margin-top: 10px;
                margin-left: 30px;
                color: #353535;
                font-weight: bold;
                font-size: 18px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
              .bg-position {
                margin-left: 30px;
                font-size: 12px;
                color: #737373;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
            }
          }

          .test-introduct {
            display: flex;
            color: #8d8e97;
            font-size: 12px;
            padding: 0 20px 0 60px;
            .test-introContent {
              flex: 1;
              text-align: right;
              padding-right: 5px;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
            }
            .test-introTitle {
              margin-left: auto;
              font-size: 14px;
            }
          }
          .test-address {
            margin-top: 10px;
            display: flex;
            color: #383838;
            font-size: 12px;
            text-align: left;
            padding: 0 20px 0 30px;

            .test-address-content {
              // border: 1px solid red;
              flex: 1;
              text-align: right;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
            }
            .test-address-Title {
              margin-left: auto;
              font-size: 14px;
              margin-left: 5px;
            }
          }
          .test-pc-bg {
            display: flex;
            justify-content: start;
            margin: 0;

            width: 200px;
            .imgbg {
              // font-size: 0;
              // margin-bottom: -1px;
              // font-size: 0;
              border-top-right-radius: 15px;
              background: #efefef;
              // background-repeat: no-repeat;
              // margin-left: auto;
              width: 100%;
              height: 59px;
              .bg-name {
                margin-top: 10px;
                margin-left: 60px;
                color: #353535;
                font-weight: bold;
                font-size: 18px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
              .bg-position {
                margin-left: 60px;
                font-size: 12px;
                color: #737373;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
            }
          }
          .test-pc-tel {
            display: flex;
            color: #383838;
            font-size: 12px;
            text-align: right;
            padding: 10px 20px 0 50px;
            .test-address-content {
              margin-left: auto;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
            }
            .test-address-Title {
              margin-left: 5px;
            }
          }
          .test-tel {
            margin-top: 10px;
            display: flex;
            color: #383838;
            font-size: 12px;
            text-align: right;
            padding: 0 20px 0 50px;
            .test-address-content {
              margin-left: auto;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
            }
            .test-address-Title {
              margin-left: 5px;
            }
          }
          .test-email {
            margin: 10px 0;
            display: flex;
            color: #383838;
            font-size: 12px;
            text-align: right;
            padding: 0 20px 0 30px;

            .test-address-content {
              word-wrap: break-word;
              margin-left: auto;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
            }
            .test-address-Title {
              font-size: 14px;
              margin-left: 5px;
            }
          }
        }
      }
    }
  }
  .look-div {
    padding: 10px 0;
    margin: 0 auto;
    width: 90%;
    display: flex;
    justify-content: space-between;
    color: #838383;
    .look-text {
      .img-look {
        display: flex;
        .img-text {
          font-size: 0;
          max-width: 165px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          img {
            margin-right: 2px;
          }
        }
        .look-look {
          margin-left: 5px;
          line-height: 25px;
        }
      }
    }
    .thumb-text {
      line-height: 25px;
      span {
        position: relative;
      }
      .editDiv {
        background-color: #4a4a4a;
        margin-top: 10px;
        right: 7%;
        width: 100px;
        // height: 60px;
        position: absolute;
        color: #fff;
        text-align: center;
        border-radius: 10px;
        padding: 10px 0;
        div {
          line-height: 30px;
          margin: 0 5px;
          // padding: 5px 0;
          &:nth-child(1) {
            border-bottom: 1px solid #858585;
          }
          &:nth-child(2) {
            border-bottom: 1px solid #858585;
          }
          &:nth-child(3) {
            border-bottom: 1px solid #858585;
          }
          &:active {
            background-color: #363636;
          }
        }
        &::after {
          top: -17px;
          left: 39px;
          width: 0px;
          height: 0px;
          border-width: 10px;
          border-style: solid;
          border-color: transparent transparent #4a4a4a transparent;
          position: absolute;
          content: " ";
        }
      }
      .noneDiv {
        background-color: #4a4a4a;
        margin-top: 10px;
        right: 7%;
        width: 100px;
        height: 30px;
        position: absolute;
        color: #fff;
        text-align: center;
        border-radius: 10px;
        padding: 10px 0;
        div {
          line-height: 30px;
          margin: 0 5px;
          // padding: 5px 0;
          &:nth-child(1) {
            border-bottom: 1px solid #858585;
          }
          &:active {
            background-color: #363636;
          }
        }
        &::after {
          top: -17px;
          left: 39px;
          width: 0px;
          height: 0px;
          border-width: 10px;
          border-style: solid;
          border-color: transparent transparent #4a4a4a transparent;
          position: absolute;
          content: " ";
        }
      }
      .fsont {
        font-size: 16px;
      }
    }
  }
  .my-message {
    padding: 10px 0;
    width: 100%;
    background-color: #f5f5f5;
    .my-picture {
      margin-top: 20px;
      .picture-title {
        padding-bottom: 10px;
        margin: 10px auto;
        width: 90%;
        display: flex;
        .picture-left {
          display: flex;
          .smile {
            font-size: 20px;
          }
          div {
            margin-left: 5px;
            font-weight: bold;
            line-height: 20px;
          }
        }
        .picture-right {
          margin-left: auto;
          font-size: 18px;
          color: #8d8e97;
        }
      }
      .picture-contain {
        .picture-none {
          text-align: center;
        }
        .picture-have {
          // border: 1px solid green;
          border-radius: 5px;
          margin: 0 auto;
          width: 90%;
          background-color: #fff;
          padding: 10px 0;
          .container-logan {
            white-space: pre-wrap;
            white-space: -moz-pre-wrap;
            white-space: -o-pre-wrap;
            word-wrap: break-word;
            padding: 10px;
            // font-size: 12px;
            color: #434343;
          }
          .education-name {
            padding: 5px 10px;
            // color: #434343;
            // font-size: 14px;
            // font-weight: bold;
          }
          .container-education {
            padding: 0px 10px;
            .education-school {
              color: #5e5e5e;
              margin: 5px 0;
            }
            .education-time {
              margin: 5px 0;
              color: #868686;
              font-size: 12px;
              .spcaility {
                margin-left: 10px;
              }
              .degree {
                margin-left: 10px;
              }
            }
          }
          .container-tags {
            display: flex;
            padding: 5px 10px;
            ul {
              li {
                float: left;
                border-radius: 5px;
                margin-right: 10px;
                margin-bottom: 5px;
                padding: 2px 10px;
                border: 1px solid #1aad1a;
                color: #1aad1a;
                font-size: 12px;
              }
            }
          }
        }
      }
    }
    .my-all-video {
      margin-top: 20px;
      .picture-title {
        padding: 10px;
        margin: 10px auto;
        width: 90%;
        display: flex;
        .picture-left {
          display: flex;
          .smile {
            font-size: 18px;
          }
          div {
            margin-left: 5px;
            font-weight: bold;
            line-height: 20px;
          }
        }
        .picture-right {
          margin-left: auto;
          font-size: 18px;
          color: #8d8e97;
        }
      }
      .video-div {
        width: 100%;
      }
    }
    .my-all-pciture {
      margin-top: 20px;
      background-color: #f5f5f5;
      .picture-title {
        padding: 10px;
        margin: 10px auto;
        width: 90%;
        display: flex;
        .picture-left {
          display: flex;
          .smile {
            font-size: 16px;
          }
          div {
            margin-left: 5px;
            font-weight: bold;
            line-height: 20px;
          }
        }
        .picture-right {
          margin-left: auto;
          font-size: 18px;
          color: #8d8e97;
        }
      }
      .picture-container {
        .picture-item {
          font-size: 0;
          overflow-x: hidden;
          padding: 0;
          margin: 0;
          img {
            margin: 0;
            padding: 0;
            width: 100%;
          }
        }
      }
    }
    .daodi {
      padding: 20px 0;
      text-align: center;
      .daodi-border {
        display: inline;
        color: #838383;
        // margin: 0 40px;
        position: relative;
        &::before {
          top: 8px;
          left: -42px;
          width: 40px;
          height: 1px;
          position: absolute;
          content: "";
          background-color: rgba(0, 0, 0, 0.2);
        }
        &::after {
          top: 8px;
          width: 40px;
          height: 1px;
          position: absolute;
          content: "";
          background-color: rgba(0, 0, 0, 0.2);
        }
      }
    }
  }
}
.video-div {
  // width: 100%;
  // visibility: hidden;
  /deep/.vjs-custom-skin > .video-js .vjs-big-play-button {
    background-color: rgba(0, 0, 0, 0.45);
    font-size: 3.5em;
    border-radius: 50%;
    height: 1.5em !important;
    line-height: 1.5em !important;
    margin-top: -1em !important;
    margin-left: -0.75em !important;
    width: 1.5em !important;
    outline: none;
  }

  /deep/.video-js .vjs-big-play-button .vjs-icon-placeholder:before {
    // z-index: 999;
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
  }
  /deep/.vjs-custom-skin > .video-js {
    z-index: 1;
  }
}
.pupup-div {
  .input-text {
    margin: 5px 0;
  }
}
.none-div {
  padding: 5px 10px;
}
/deep/.van-image-preview {
  z-index: 9999 !important;
}
.menu-contain {
  position: relative;
}

.removeHome {
  .t-suspend-button {
    position: fixed;
    bottom: 2%;
    right: 0px;
    // width: 3rem;
    height: 2.5rem;
    border-radius: 2rem;
    z-index: 99999;
  }

  .t-suspend-button img {
    width: 100%;
    height: 100%;
  }

  .t-suspend-button-animate {
    transition-duration: 12s;
  }
  .yuanqiu {
    position: relative;
    color: #fff;
    .title {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      line-height: 40px;
      background-color: rgba(0, 0, 0, 0.5);
      text-align: center;
      margin-right: 0px;
      font-size: 12px;
    }
    .item-menu {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      line-height: 50px;
      text-align: center;
      position: absolute;
      top: -70px;
      right: 5px;
      background-color: rgba(0, 0, 0, 0.5);
      .text {
        font-size: 20px;
        line-height: 50px;
      }
      &-two {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        line-height: 50px;
        text-align: center;
        position: absolute;
        top: -70px;
        right: 5px;
        background-color: rgba(0, 0, 0, 0.5);
        .text {
          font-size: 20px;
          line-height: 50px;
        }
      }
      &-three {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        line-height: 50px;
        text-align: center;
        position: absolute;
        top: -2px;
        right: 60px;
        background-color: rgba(0, 0, 0, 0.5);
        .text {
          font-size: 16px;
          line-height: 50px;
        }
      }
      &-four {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        line-height: 50px;
        text-align: center;
        position: absolute;
        top: 60px;
        right: 5px;
        background-color: rgba(0, 0, 0, 0.5);
        .text {
          font-size: 16px;
          line-height: 50px;
        }
      }
    }
  }
}
.plus-icon-first-enter-active {
  transition: opacity 0.3s;
}
.plus-icon-first-enter {
  opacity: 0;
}
.plus-icon-first-leave-active {
  transition: opacity 1.2s;
}
.plus-icon-first-leave-to {
  opacity: 0;
}
.plus-icon-two-enter-active {
  transition: opacity 0.6s;
}
.plus-icon-two-enter {
  opacity: 0;
}
.plus-icon-two-leave-active {
  transition: opacity 0.9s;
}
.plus-icon-two-leave-to {
  opacity: 0;
}
.plus-icon-three-enter-active {
  transition: opacity 0.9s;
}
.plus-icon-three-enter {
  opacity: 0;
}
.plus-icon-three-leave-active {
  transition: opacity 0.6s;
}
.plus-icon-three-leave-to {
  opacity: 0;
}
.plus-icon-four-enter-active {
  transition: opacity 1.2s;
}
.plus-icon-four-enter {
  opacity: 0;
}
.plus-icon-four-leave-active {
  transition: opacity 0.3s;
}
.plus-icon-four-leave-to {
  opacity: 0;
}
/deep/.van-popup--center {
  overflow-y: none;
}
.title-none {
  width: 100%;
  background-color: #fff;
  text-align: center;
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  div {
    .icon {
      margin-right: 5px;
      // margin-left: auto;
    }
  }
}
.look-none {
  max-height: 400px;
  overflow-y: auto !important;
  color: #838383;
  padding: 0 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  &::-webkit-scrollbar-track-piece {
    background-color: rgba(0, 0, 0, 0);
    border-left: 1px solid rgba(0, 0, 0, 0);
  }
  &::-webkit-scrollbar {
    width: 5px;
    height: 13px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.5);
    background-clip: padding-box;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    min-height: 28px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: rgba(0, 0, 0, 0.5);
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
  }
  .none-item {
    // width: 100%;
    margin: 10px 0;
    height: 50px;
    display: flex;
    .none-avatar {
      img {
        width: 40px;
        height: 40px;
        border-radius: 10px;
        padding: 5px;
      }
    }
    .none-right {
      .right-top {
        margin-top: 5px;
        display: flex;
        height: 20px;
        line-height: 20px;
        .none-name {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          max-width: 200px;
          font-size: 14px;
        }
        .sex-icon {
          // font-size: 20px;
          margin-left: 5px;
        }
        .sex-span {
          font-size: 12px;
          background-color: #3671c9;
          color: #ffffff;
          border-radius: 3px;
          margin-left: 5px;
          padding: 0 4px;
          display: flex;
          align-items: center;
        }
        // .gender-none {
        //   margin-top: 2px;
        //   line-height: 15px;
        //   height: 15px;
        //   margin-left: 5px;
        //   padding: 0px 4px;
        //   border-radius: 3px;
        //   color: #fff;
        //   background-color: #cccccc;
        //   font-size: 14px;
        // }
        // .gender-woman {
        //   margin-top: 2px;
        //   line-height: 15px;
        //   height: 15px;
        //   margin-left: 2px;
        //   padding: 0px 2px;
        //   border-radius: 3px;
        //   color: #fff;
        //   background-color: #ff6e85;
        //   font-size: 12px;
        // }
        // .gender-man {
        //   margin-top: 2px;
        //   line-height: 15px;
        //   height: 15px;
        //   margin-left: 5px;
        //   // padding: 0px 5px;
        //   padding: 0px 2px;
        //   border-radius: 3px;
        //   font-size: 12px;
        //   background-color: #04baff;
        //   color: #fff;
        // }
      }
      .right-bottom {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        line-height: 20px;
        font-size: 12px;
        width: 100px;
        height: 20px;
      }
    }
  }
  .none-more {
    padding: 5px 0;
    text-align: center;
    color: #294a7b;
    font-size: 12px;
    &-none {
      padding: 5px 0;
      font-size: 12px;
      text-align: center;
      color: #838383;
    }
  }
}
/deep/ .van-popup--center {
  border-radius: 10px;
}
.miniprogram-btn {
  margin: 10px auto 0 auto;
  width: 90%;
  display: flex;
  .look-btn {
    border-radius: 5px;
    border: 1px solid #ebedf0;
    text-align: center;
    padding: 12px 0;
    background: #fff;
    margin-right: 5px;
  }
  .shen-btn {
    border-radius: 5px;
    border: 1px solid #ebedf0;
    text-align: center;
    padding: 12px 0;
    background: #fff;
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
</style>
