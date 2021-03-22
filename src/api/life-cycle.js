import { get, post, json } from "../utils/http";

export default {
  getCustomerCategory(params) {
    return get("api/v1/customer-category/list", params);
  },
  getLifeCycleDaily(params) {
    return get("api/v1/life-cycle-daily-list/user", params);
  },
  getUserCycleDaily(params) {
    return get("api/v1/life-cycle-daily-list/user", params);
  },
  getAdminCycleDeily(params) {
    return get("api/v1/life-cycle-daily-list/admin", params);
  },
  isAdminCycle(params) {
    return get("api/v1/life-cycle-daily-list/is-admin", params);
  },
};
