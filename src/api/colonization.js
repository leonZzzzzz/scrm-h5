import { get, post ,json } from '../utils/http'

export default {
  // 加群-列表
  OgetPenEnterpriseChatRulePage: (params) => {
    return get('api/v1/open-enterprise-chat-rule/page',params)
  },
  // 加群-预览
  previewPenEnterpriseChatRule: (params) => {
    return get('api/v1/open-enterprise-chat-rule/preview',params)
  },
}