import { get, post, json } from '../utils/http'

export default {
  // 配置项
  getConfigByKey: (params) => {
    return get('api/v1/config/'+params)
  }
}