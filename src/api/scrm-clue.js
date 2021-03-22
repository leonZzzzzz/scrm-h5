import { get, post, json } from '../utils/http'
// 小数桔线索 接口文档：http://xyj.wego168.com/xiaoyaoji/doc/4ZOVnTyzEl
export default {
  // 推文-列表
  getScrmClueMaterialPage: (params) => {
    return get('api/v1/customer-clue-material/page', params)
  },
  // 推文-成员获取推文转发链接（需要在企微或微信浏览器内部调用）
  getScrmClueCustomerMaterialShareLink: (params) => {
    return get('api/v1/customer-clue-source/get', params)
  },
  // 推文-转发
  scrmClueMaterialShare: (params) => {
    return post('api/v1/customer-clue-material/share', params)
  },
  // 推文-富文本内容
  scrmClueSingleContent: (params) => {
    return get('api/v1/singleContent/get', params)
  },
  // 通过推文详情名片 返回的参数获取名片
  // 接口文档 http://xyj.wego168.com/xiaoyaoji/doc/4KMIA9fLvm
  scrmClueCardByMaterial: (params) => {
    return get('api/v1/crop-business-card/get-by-user', params)
  },

  // 统计- 今日数据
  getScrmClueSourceDataToday: (params) => {
    return get('api/v1/customer-clue-source-data/today', params)
  },
  // 统计- 累计数据
  getScrmClueSourceDataTotal: (params) => {
    return get('api/v1/customer-clue-source-data/total', params)
  },
  // 统计- 列表
  getScrmClueSourceDataList: (params) => {
    return get('api/v1/customer-clue-source-data/list', params)
  },
  // 统计- 分级
  getScrmClueSourceDataAction: (params) => {
    return get('api/v1/customer-clue-action-data/statistic', params)
  },

  // 线索- 列表
  getScrmClueCustomerCluePage: (params) => {
    return get('api/v1/customer-clue/page', params)
  },
  // 线索- 详情
  getScrmClueCustomerClueGet: (params) => {
    return get('api/v1/customer-clue/get', params)
  },
  // 线索- 分级数据线索列表
  getScrmClueCustomerCluePageByLevel: (params) => {
    return get('api/v1/customer-clue/page-by-level', params)
  },
  // 线索- 最关心列表
  // 此接口不是分页的，虽然格式是分页的格式，但后端会全部返回
  getScrmClueCustomerInterestedPage: (params) => {
    return get('api/v1/customer-clue-action/most-interested-material-list', params)
  },


  // 线索- 跟进记录列表
  scrmClueCustomerFollowPage: (params) => {
    return get('api/v1/customer-clue-follow/page', params)
  },
  // 线索- 跟进记录创建
  scrmClueCustomerFollowAdd: (params) => {
    return post('api/v1/customer-clue-follow/insert', params)
  },
  // 线索- 跟进记录删除
  scrmClueCustomerFollowDelete: (params) => {
    return post('api/v1/customer-clue-follow/delete', params)
  },
  // 线索- 跟进记录修改
  scrmClueCustomerFollowUpdate: (params) => {
    return post('api/v1/customer-clue-follow/update', params)
  },
  // 线索- 动态记录列表
  scrmClueCustomerActionPage: (params) => {
    return get('api/v1/customer-clue-action/page', params)
  },


  // 线索- 资料管理 获取资料
  scrmClueCustomerProfileGet: (params) => {
    return get('api/v1/customer-clue-profile/get', params)
  },
  // 线索- 资料管理-修改资料
  scrmClueCustomerProfileUpdate: (params) => {
    return post('api/v1/customer-clue-profile/update', params)
  },
  
}