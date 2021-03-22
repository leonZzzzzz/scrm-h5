import { get, post, json, upload } from "../utils/http";

export default {
  // 测试用的接口
  setUserId(params) {
    return get("api/v1/test/setUserId", params);
  },
  setWXUserId(params) {
    return get("api/v1/test/setWxUserId", params);
  },
  // 测试用的接口

  getBussinessUser(params) {
    return get("api/v1/crop-business-card/user/get", params);
  },
  getCardIntroduction(params) {
    return get("api/v1/h5/crop-business-card-introduction/get", params);
  },
  updateCard(params) {
    return post("api/v1/crop-business-card/user/update", params);
  },
  addCart(params) {
    return post("api/v1/crop-business-card/user/insert", params);
  },
  uploadImage(params) {
    return upload("/api/v1/attachments/images/tencent_cloud", params);
  },
  updateBussiness(params) {
    return json("api/v1/crop-business-card-introduction/update", params);
  },
  uploadVideoSignature(params) {
    return get("api/v1/vod/upload/signature", params);
  },
  addBussiness(params) {
    return json("api/v1/crop-business-card-introduction/insert", params);
  },
  pptUpload(params) {
    return json("api/v1/crop-business-card/user/upload-ppt", params);
  },
  getViewPage(params) {
    return get("api/v1/crop-business-card-customer/view-page", params);
  },
  getActionTraceList(params) {
    return get("api/v1/actionTrace/list", params);
  },
  getComPage(params) {
    return get("api/v1/h5/crop-company/get", params);
  },
  getPosterPage(params) {
    return get("api/v1/crop-company-poster/list", params);
  },
  getQrcode(params) {
    return get("api/v1/crop-business-card-qrcode/get", params);
  },
  baseTo(params) {
    return get("api/v1/to-base64", params);
  },
  refreshAvatar(params) {
    return post("api/v1/crop-business-card/user/refresh-avatar", params);
  },
  // 获取名片开启状态
  getBusinessCardOpenStatus(params) {
    return get("api/v1/ability-is-open/scrm-businesscard", params);
  },
};
