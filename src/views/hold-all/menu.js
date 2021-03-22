export default {
  data() {
    return {
      menu: [
        {
          titleName: "客户管理",
          list: [
            {
              link: `${this.baseApi}/Asea/#/seapool/pond`,
              name: "公海池",
              icon: "icon-gonghaichi",
            },
            {
              link: `${this.baseApi}/Asea/#/seapool/customer`,
              name: "我的客户",
              icon: "icon-wodekehu",
            },
            // {
            //   link: `${this.baseApi}/scrm/POUND/scrmClue`,
            //   name: "客户线索",
            //   icon: "icon-kehuxiansuo",
            // },
          ],
        },
        {
          titleName: "赋能工具",
          list: [
            {
              link: `${this.baseApi}/H5/#/sidebar/speechcraft`,
              name: "素材海报",
              icon: "icon-sucaihaibao",
            },
            // {
            //   link: `${this.baseApi}/scrm/#/material-management/index`,
            //   name: "素材库",
            //   icon: "icon-sucaiku",
            // },
            // {
            //   link: "https://x.wego168.com/wghjy/scrm/#/sidebar/speechcraft",
            //   name: "话术库",
            //   icon: "icon-huashuku",
            // },
            {
              link: `${this.baseApi}/H5/POUND/ranking/pullNewUsers`,
              name: "拉新排行榜",
              icon: "icon-paihangbang",
            },
            {
              link: `${this.baseApi}/scrm/#/card/list`,
              name: "我的名片",
              icon: "icon-mingpian",
            },
            {
              link: `${this.baseApi}/scrm/#/moment-all/index`,
              name: "企业动态圈",
              icon: "icon-qiyepengyouquan",
            },
          ],
        },
      ],
      otherMenu: [
        {
          titleName: "客户统计",
        },
      ],
      lifeMenu: [
        {
          titleName: "客户生命周期看板",
        },
      ],
      navBar: [
        { text: "客户", active: true },
        { text: "我的客户", active: false },
        { text: "你的客户", active: false },
        { text: "他的客户", active: false },
        { text: "大家的客户", active: false },
      ],

      tabbar: [
        {
          name: "工作台",
          icon: "icon-dianhua1",
          index: 0,
        },
      ],
    };
  },
};
