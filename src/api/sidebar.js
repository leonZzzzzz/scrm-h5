import { get, post, json } from '../utils/http'

export default {
  // 获取config配置信息
  getWxJsJdkConfig: (params) => {
    return get('api/v1/crop/jssdk/getJsapiTicket', params)
  },
  // 获取agentConfig配置信息
  getWxJsJdkAgentConfig: (params) => {
    return get('api/v1/crop/jssdk/getAppJsapiTicket', params)
  },
  // 获取应用的id
  getAgentId: (params) => {
    return get('api/v1/crop/jssdk/getAgentId', params)
  },

  /**
   * 话术库
   */
  // 获取话术分组,当parentId为0时获取第一级数据如我的话术、通用话术，parentId为{我的话术ID}时，获取该分组下的列表数据
  getSpeechcraftGroupList: (params) => {
    return get('api/v1/speechcraftGroup/list', params)
  },
  // 获取分组下对应的话术列表，groupId分组id，content搜索内容
  getSpeechcraftPage: (params) => {
    return get('api/v1/speechcraft/page', params)
  },
  // 话术库-编辑(userId, customerId企微官方, chatType)，备注customerId，群聊的时候传群聊的Id
  updateSpeechcraft: (params) => {
    return json('api/v1/speechcraft/update', params)
  },
  // 话术库-详情-预览(userId,customerId企微官方)，备注customerId，群聊的时候传群聊的Id,群聊多加一个参数chatType=group
  getSpeechcraftDetail: (params) => {
    return get('api/v1/speechcraft/get', params)
  },
  // 话术库-搜索关键词(同素材库)
  getSpeechSearchWordList: (params) => {
    return get('api/v1/materialSearchWord/list', params)
  },
  // 素材库-关键词搜索，type=&searchWordId=
  getSpeechcraftPageByKeyWord: (params) => {
    return get('api/v1/speechcraft/page', params)
  },

  /**
   * 素材库
   */
  // 获取分组下对应的素材列表
  getMaterialPage: (params) => {
    return get('api/v1/material/page', params)
  },
  // 获取视频信息和签名
  getVideoSignatureDetail: (params) => {
    return get('api/v1/vod/file/get', params)
  },
  // 获取类别下的分组列表
  getMaterialGroupList: (params) => {
    return get('api/v1/materialGroup/pageByMaterialType', params)
  },
  // 获取该分组下的素材列表
  getMaterialPageByGroup: (params) => {
    return get('api/v1/material/page', params)
  },
  // 素材库-搜索关键词
  getMaterialSearchWordList: (params) => {
    return get('api/v1/materialSearchWord/list', params)
  },
  // 素材库-编辑(userId, customerId企微官方，chatType)，备注customerId群聊的时候传群聊Id
  updateMaterial: (params) => {
    return json('api/v1/material/update', params)
  },
  // 素材库-素材详情-预览(userId,customerId企微官方)，备注customerId群聊的时候传群聊的Id，群聊多加一个参数chatType=group
  getMaterialDetail: (params) => {
    return get('api/v1/material/get', params)
  },
  // 记录行为标签分值(customerId, behaviorTagId)，备注customerId群聊的时候传群聊Id
  recordBehaviorTagScore: (params) => {
    return post('api/v1/customerBelongBehaviorTag/addScore', params)
  },
  // 素材库-关键词搜索，type=&searchWordId=
  getMaterialPageByKeyWord: (params) => {
    return get('api/v1/material/page', params)
  },


  /**
   * 客户详情
   */
  // 获取客户详情-userId企业微信
  getCustomerDetail: (params) => {
    return get('api/v1/customer/getByExternalUserId', params)
  },
  // 获取客户详情-id
  getCustomerDetailById: (params) => {
    return get('api/v1/customer/get', params)
  },
  // 编辑客户信息
  updateCustomer: (params) => {
    return json('api/v1/customer/update', params)
  },
  // 获取企业标签和个人标签
  getCustomerTagList: (params) => {
    return get('api/v1/customerPersonalTag/list', params)
  },
  // 添加个人标签
  addPersonalTag: (params) => {
    return json('api/v1/personalTag/add', params)
  },
  // 设置客户标签
  saveCustomerTag: (params) => {
    return post('api/v1/customerPersonalTag/save', params)
  },
  // 获取群聊详情-chatId
  getGroupChatDetail: (params) => {
    return get('api/v1/wxCropCustomerGroupChat/statsChatCustomer', params)
  },
  // 编辑客户扩展信息
  updateExternalProfile: (params) => {
    return json('api/v1/customer/saveExternalProfile', params)
  },
  // 获取客户扩展列表-客户id
  getExternalProfileById: (params) => {
    return get('api/v1/customer/listExternalProfile', params)
  },
  // 客户详情个人-动态记录-列表
  getCustomerFollowRecordPage: (params) => {
    return get('api/v1/customerFollowRecord/page', params)
  },
  // 客户详情个人-动态记录-新增
  addCustomerFollowRecord: (params) => {
    return json('api/v1/customerFollowRecord/add', params)
  },
  // 客户详情个人-动态记录-修改
  updateCustomerRecord(params) {
    return json('api/v1/customerFollowRecord/update', params)
  },
  // 客户详情个人-动态记录-删除
  deteleCustomerRecord(params) {
    return post('api/v1/customerFollowRecord/delete', params)
  },
  // 客户详情个人-订单记录-分页列表(keyword,customerId)
  getCustomerOrderPage: (params) => {
    return get('api/v1/scrm_order/page', params)
  },
  // 客户详情个人-订单记录-绑定淘宝账号
  bindTaobaoMember: (params) => {
    return json('api/v1/scrm_order/bind_taobao_member', params)
  },
  // 客户详情个人-客户加入的群列表
  getCustomerGroupPage(params) {
    return get('api/v1/customer/groupPage', params)
  },
  // 客户详情个人-添加过外部联系人的内部人员
  getCustomerUserPage(params) {
    return get('api/v1/customer/userPage', params)
  },

  /**
   * 客户生命周期
   */
  // 查询客户生命周期阶段
  getCustomerLifeCycle: (params) => {
    return get('api/v1/customer_life_cycle/users', params)
  },
  // 生命周期阶段列表
  getCustomerLifeCycleList: (params) => {
    return get('api/v1/customer_life_cycle/list', params)
  },
  // 设置客户生命周期阶段
  setCustomerLifeCycle: (params) => {
    return json('api/v1/customer_life_cycle/users', params)
  },
  // 客户群-群客户列表（chatId: 企业微信群id，name：客户名称）
  getGroupChatCustomerPage: (params) => {
    return get('api/v1/wxCropCustomerGroupChat/pageCustomer', params)
  },
  // 话术库-记录话术发送次数（id: 话术id，customerId：客户id，群聊时传群聊id）
  insertSendRecord: (params) => {
    return post('api/v1/materialSendRecord/insert', params)
  },
  // 话术库-记录话术行为标签分值（customerId： 客户id，群聊时传群聊id）
  insertBehaviorRecord: (params) => {
    return post('api/v1/customerBelongBehaviorTag/addScoreBySpeechcraftId', params)
  },
  // 客户群详情-chatId企业微信群聊id
  getGroupDetailByWxId: (params) => {
    return get('api/v1/wxCropCustomerGroupChat/getByChatId', params)
  },
  // 同步客户的数据(customerId：企业微信客户id)
  customerDataSync: (params) => {
    return post('api/v1/customer/refreshByWxCustomerId', params)
  },
  // 同步客户群的数据(wxChatId：企业微信群聊id)
  groupChatDataSync: (params) => {
    return post('api/v1/wxCropCustomerGroupChat/refreshByWxChatId', params)
  },
  // 客户生命周期-生命周期树
  getCustomerLifeCycleTree: (params) => {
    return get('api/v1/customer-life-cycle/tree', params)
  },
  // 非企业成员账号密码登陆
  UnMemberCompLogin: (params) => {
    return post('api/v1/scrm/account/login', params)
  },
  // 领取为我的客户
  GetForMyClient: (params) => {
    return post('api/v1/highSeasPool/claim', params)
  },
  // 获取订单列表接口（新接口）
  getCropOrderPage: (params) => {
    return get('api/v1/crop-order/page', params)
  },
  // 个人标签-列表
  getPersonalTags: (params) => {
    return get('api/v1/personalTag/list', params)
  },
  // 个人标签-修改
  updatePersonalTags: (params) => {
    return json('api/v1/personalTag/update', params)
  },
  // 个人标签-删除
  deletePersonalTags: (params) => {
    return post('api/v1/personalTag/delete', params)
  },
  // 延期
  PostdelayRecovery: (params) => {
    return post('api/v1/customer/delayRecovery', params)
  },
  // 退回到公海池
  sendBackHighSeas: (params) => {
    return post('api/v1/highSeasPool/goBackHighSeas', params)
  },
  // 获取回收规则
  getCycleRule: () => {
    return get('api/v1/recoveryRule/getRule')
  },
  // 复制非企微客户电话
  copyClaimClientNumber: (params) => {
    return post('api/v1/customer/copyCustomer', params)
  },
  // 非企微客户详情
  notEnterproseMicro: (params) => {
    return get('api/v1/highSeasPool/getDetail', params)
  },
  // 非企微客户修改
  notUpdateEnterPrise: (params) => {
    return json('api/v1/highSeasPool/update', params)
  },
  // 非企微客户获取标签
  acquireTagsnotCorporate: (params) => {
    return get('api/v1/highSeasPool/getCustomerTag', params)
  },
  // 非企微客户修改标签
  notEnterpriseLabel: (params) => {
    return post('api/v1/highSeasPool/updateTag', params)
  },
  // 非企微客户获取所属员工
  notEnterpriseMembers: (params) => {
    return get('api/v1/highSeasPool/getClaimUser', params)
  },
};