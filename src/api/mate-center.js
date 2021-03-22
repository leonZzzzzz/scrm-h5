import { get, post } from '../utils/http'

export default {
  // 海报素材分组
  posterClassify: () => {
    return get('api/v1/materialGroup/list')
  },
  // 海报素材列表
  posterMatterList: (params) => {
    return get('api/v1/material/page', params)
  },
  // 海报素材详情
  posterMatterDetail: (params) => {
    return get('api/v1/materialPoster/getDetail', params)
  },
}