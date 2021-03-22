import { get, post, json } from "../utils/http";

export default {
  // 违规记录-获取列表
  getViolationPage: (params) => {
    return get(
      "api/v1/conversation-persistence/sensitive-message-page-by-receiver",
      params
    );
  },
  //违规记录--获取上下文
  getViolation(params) {
    return get(
      "api/v1/conversation-persistence/message-page-by-receiver",
      params
    );
  },
  // getLoginStatus(params) {
  //   return get("api/v1/crop/authorize/getLoginStatus", params);
  // },
};
