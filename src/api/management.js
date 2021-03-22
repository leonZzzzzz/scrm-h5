import { get, post, json } from '../utils/http'

export default {
  // 管理-批量添加好友-获取添加的客户列表
  getMgmtPageCustomer: (params) => {
    return get('api/v1/friend/pageCustomer', params)
  },
  // 管理-批量添加好友-记录复制信息
  copycustomer: (params) => {
    return get('api/v1/friend/copyCustomer', params)
  }
}