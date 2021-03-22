export default [
  {
    path: "/violation/list",
    component: () =>
      import(/* webpackChunkName: "moments" */ "@/views/violation/index"),
  },
  {
    path: "/violation/detail",
    component: () =>
      import(/*webpackChunkName :"moments"*/ "@/views/violation/detail"),
  },
];
