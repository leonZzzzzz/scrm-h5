import { get, post } from '../utils/http'

export default {
  // 获取图文消息详情
  newsGet: (params) => {
    return get('api/v1/singleContent/get', params)
  },
  // 获取多图文消息详情
  numerGrapic: (params) => {
    return get('api/v1/material/get', params)
  }
}