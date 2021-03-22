export default [
  // 批量加好友-列表
  {
    path: "/lifecycle/list",
    component: () =>
      import(/* webpackChunkName: "management" */ "@/views/life-cycle/List"),
  },
];
