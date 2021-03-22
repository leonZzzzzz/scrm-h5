import { get, post, json } from '../utils/http'

export default {
  // 企业动态-获取列表
  getMomentsPage: (params) => {
    return get('api/v1/moments/page', params)
  },
  // 企业动态-获取成员信息
  getWxCropUser: (params) => {
    return get('api/v1/moments/wx_crop_user', params)
  },
  getCropDeptTrees: (params) => {
    return get('api/v1/crop-dept/trees', params)
  },
  momentsInsert: (params) => {
    return json('api/v1/moments/insert', params)
  },
  momentsDelete: (params) => {
    return post('api/v1/moments/delete', params)
  },
}