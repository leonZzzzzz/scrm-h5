import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import api from "./api";
// 设置响应式rem 基数值
import "lib-flexible/flexible";
// 插件---vue列表无限加载
import infiniteScroll from "vue-infinite-scroll";
// 插件--复制内容到剪切板
import VueClipboard from "vue-clipboard2";
// js调试工具
import VConsole from "vconsole";
// 视频播放器相关
import VideoPlayer from "vue-video-player";
import "video.js/dist/video-js.css";
import "vue-video-player/src/custom-theme.css";
// 封装的函数
import { setPower, oursSetPower } from "./functions/index";
// vant相关
import "@vant/touch-emulator"; // 桌面端适配，监听桌面端的mouse事件
import "vant/lib/icon/local.css";
// 全局filters
import * as filters from "./filter";
import "./utils/emotionmethod";
import "./assets/css/emotion.css";
// 阿里iconfont Symbol图标（已在index.html中引入，此处无需再引入）
// import "./assets/font/iconfont.js"; 
// vant组件按需全局祖册
import authorize from "./utils/authorise";
import {
  IMGURL,
  DOMAINADDRESS,
  AGENTID,
  ISMOBILE,
  BASEURL,
  BASEAPI,
  IMGHOST,
  ISIPHONE,
} from "./config";

import {
  Dialog,
  Image as VanImage,
  Tab,
  Tabs,
  Swipe,
  SwipeItem,
  Button,
  Uploader,
  Cell,
  CellGroup,
  Notify,
  Icon,
  Collapse,
  CollapseItem,
  ImagePreview,
  Popup,
  Toast,
  Field,
  DatetimePicker,
  Progress,
  Loading,
  Lazyload,
  Overlay,
  Empty,
  RadioGroup,
  Radio,
  Switch,
  TreeSelect,
  PullRefresh,
  NavBar,
  List,
  Search,
  Tabbar,
  TabbarItem,
} from "vant";

Vue.config.productionTip = false;

{
  Vue.use(VueClipboard);
  Vue.use(Dialog);
  Vue.use(VanImage);
  Vue.use(Tab);
  Vue.use(Tabs);
  Vue.use(Swipe);
  Vue.use(SwipeItem);
  Vue.use(Button);
  Vue.use(Uploader);
  Vue.use(Cell);
  Vue.use(CellGroup );
  Vue.use(Icon);
  Vue.use(Collapse);
  Vue.use(CollapseItem);
  Vue.use(ImagePreview);
  Vue.use(Popup);
  Vue.use(Toast);
  Vue.use(Field);
  Vue.use(DatetimePicker);
  Vue.use(Progress);
  Vue.use(Loading);
  Vue.use(Lazyload);
  Vue.use(Notify);
  Vue.use(Overlay);
  Vue.use(Empty);
  Vue.use(RadioGroup);
  Vue.use(Radio);
  Vue.use(Switch);
  Vue.use(TreeSelect);
  Vue.use(PullRefresh);
  Vue.use(NavBar);
  Vue.use(List);
  Vue.use(Search);
  Vue.use(Tabbar);
  Vue.use(TabbarItem);

  Vue.use(VideoPlayer);
  Vue.use(infiniteScroll);
}

// 当前网址匹配成功则开启调试窗口
if (BASEURL.includes('wghjy')) {
  new VConsole();
}

// 注册全局过滤器
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});
// 全局api
Vue.prototype.$http = api;
// 图片前缀
Vue.prototype.imgUrl = IMGURL;
Vue.prototype.domainAddress = DOMAINADDRESS;
// 应用id
Vue.prototype.agentId = AGENTID;
// 判断当前设备是移动端或是pc端
Vue.prototype.isMobile = ISMOBILE;
Vue.prototype.baseApi = BASEAPI;
Vue.prototype.baseUrl = BASEURL;
// 图片前缀
Vue.prototype.imgHost = IMGHOST;
Vue.prototype.isIphone = ISIPHONE;
// 封装的授权函数
Vue.prototype.setPower = setPower;
Vue.prototype.oursSetPower = oursSetPower;
Vue.prototype.checkAuthorizeLogin = authorize.checkAuthorizeLogin;
Vue.prototype.getAuthorizeWxUserId = authorize.getAuthorizeWxUserId;

let $_vue = new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

export default $_vue
