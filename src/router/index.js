import Vue from "vue";
import VueRouter from "vue-router";
import news from "./news";
import management from "./management";
import sidebarDev from "./sidebar-dev";
import mateCenter from "./mate-center";
import violation from "./violation";
import lifeCycle from "./life-cycle";
import card from "./card";
// 管理员朋友圈
import momentAll from "./moment-all";
// 成员朋友圈
import moments from "./moments";
import pullnewpeople from "./pullnewpeople";
import noShared from "./noShared";
import materialManagement from "./material-management";
import colonization from "./colonization";
import holdAll from "./hold-all";
// 小数桔线索
import scrmClue from "./scrm-clue";
import sopManagement from "./sop-management";

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    ...news,
    ...moments,
    ...management,
    ...sidebarDev,
    ...mateCenter,
    ...violation,
    ...lifeCycle,
    ...card,
    ...momentAll,
    ...pullnewpeople,
    ...noShared,
    ...materialManagement,
    ...colonization,
    ...holdAll,
    ...scrmClue,
    ...sopManagement,
  ],
});
