import { get, post, json } from "../utils/http";
export default {
    getMomentsContentPage(params) {
        return get("api/v1/moments/content/page", params);
    },
    // 发布朋友圈
    addMomentsContent(params) {
        return json("api/v1/moments/content/add", params);
    },
    // 删除朋友圈
    deleteMomentsContent(params) {
        return post("api/v1/moments/content/deleted", params);
    },
    getMomentsManager(params) {
        return get("api/v1/moments/manager", params)
    },
    getMomentsUserInList(params) {
        return get("api/v1/moments-user/in-list", params)
    }

}