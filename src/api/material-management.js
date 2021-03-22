import { get, post } from '../utils/http'

export default {
  // 素材管理-分组
  getMaterialGroupList: (params) => {
    return get('api/v1/materialGroup/list', params)
  },
  // 素材管理-分组列表
  getMaterialPage: (params) => {
    return get('api/v1/material/page', params)
  },
  // 素材管理-多图文列表
  getMaterialMultiTextPage: (params) => {
    return get('api/v1/material/multiTextPage', params)
  },
  // 替换关键字
  getSpeechcraftManagementPage: (params) => {
    return get('api/v1/material/get', params)
  },
}