import { get, post } from '../utils/http'

export default {
  // 获取图文消息详情
  getTransferFailed: (params) => {
    return get('api/v1/highSeasPool/getTransferFailed', params)
  },
  // 获取生命周期
  capturnLifeCycle: (params) => {
    return get('api/v1/customer-life-cycle/tree', params)
  },
}