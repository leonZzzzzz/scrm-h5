import { get, post, json, upload } from '../utils/http'

export default {
  // 获取config配置信息
  getWxJsJdkConfig: (params) => {
    return get('api/v1/crop/jssdk/getJsapiTicket', params)
  },
  // 获取agentConfig配置信息
  getWxJsJdkAgentConfig: (params) => {
    return get('api/v1/crop/jssdk/getAppJsapiTicket', params)
  },
  // 获取应用id
  getConfigAgentId: (params) => {
    return get('api/v1/crop/jssdk/getAgentId', params)
  },
  // 活动列表
  GetmyCustomer: (params) => {
    return post('api/v1/newActivity/getOnGoingActivity', params)
  },
  // 活动详情
  activityDetail: (params) => {
    return get('api/v1/newActivity/getDetail', params)
  },
  // 全部标签
  getAllLabelTags: () => {
    return get('api/v1/behaviorTagGroup/listByGroup')
  },
  // 添加修改活动标签
  AddorUpdatetag: (params) => {
    return json('api/v1/newActivity/addTag', params)
  },
  // 获取客户活码
  newActivityGetQrcode: (params) => {
    return get('api/v1/newActivity/getQrcode', params)
  },
  // 详情-预览(userId,customerId企微官方)，备注customerId，群聊的时候传群聊的Id,群聊多加一个参数chatType=group
  // getSpeechcraftDetail: (params) => {
  //   return get('api/v1/speechcraft/get', params)
  // },
  // 获取视频信息和签名
  getVideoSignatureDetail: (params) => {
    return get('api/v1/vod/file/get', params)
  },
  // 查看客户邀请列表
  inviteCustomers: (params) => {
    return get('api/v1/customerAddNewRank/getNewCust', params)
  },
  // 生成图片mediaid
  generateImages: (params) => {
    return upload('api/v1/newActivity/getMediaId', params)
  },
  // 获取成员信息
  getUserInfo: () => {
    return get('api/v1/crop/authorize/getUserInfo')
  },




  // 图片转base64
  imgToBase64: (params) => {
    return get('api/v1/newActivity/imgToBase64', params)
  },

};