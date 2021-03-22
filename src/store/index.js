import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
import customer from './customer'
import materialManagement from './materialManagement'
import scrmClue from './scrmClue'
export default new Vuex.Store({
  state: {
    // 微信sdk是否注册成功
    isWxSdkConfigOk: false,
    // 选择的个人标签列表
    personalTags: [],
    // 选择的企业标签列表
    cropTags: [],
    // 保存当前页面状态
    isAlive: false,
    // 首页-当前选择的标签页，speech话术库、material素材库、customer客户详情/群信息
    selectedTab: 'speech',
    // 判断是否需要登录
    isLogin: true,
    tagList: [],
  },
  mutations: {
    updateIsWxSdkConfigOk(state, data) {
      state.isWxSdkConfigOk = data
    },
    updatePersonalTags(state, data) {
      state.personalTags = data
    },
    updateCropTags(state, data) {
      state.cropTags = data
    },
    updateIsAlive(state, data) {
      state.isAlive = data
    },
    updateSelectedTab(state, data) {
      state.selectedTab = data
    },
    updateIsLogin(state, data) {
      state.isLogin = data
    },
    getNewTagLists(state, data) {
      state.tagList = data
    }
  },
  actions: {},
  modules: {
    customer,
    materialManagement,
    scrmClue
  }
});
