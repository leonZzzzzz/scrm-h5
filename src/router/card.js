export default [
  {
    path: "/card/list",
    component: () =>
      import(/* webpackChunkName: "management" */ "@/views/card/List"),
  },
  {
    path: "/card/detail",
    component: () =>
      import(/* webpackChunkName: "management" */ "@/views/card/Detail"),
  },
  {
    path: "/card/customer-dynamic-record",
    component: () =>
      import(
        /* webpackChunkName: "management" */ "@/views/card/CustomerDynamicRecord"
      ),
  },
  {
    path: "/card/form",
    component: () =>
      import(/* webpackChunkName: "management" */ "@/views/card/Form"),
  },
  {
    path: "/card/addform",
    component: () =>
      import(/* webpackChunkName: "management" */ "@/views/card/AddForm"),
  },
  {
    path: "/card/videoform",
    component: () =>
      import(/* webpackChunkName: "management" */ "@/views/card/VideoForm"),
  },
  {
    path: "/card/imageform",
    component: () =>
      import(/* webpackChunkName: "management" */ "@/views/card/ImageForm"),
  },
  // {
  //   path: "/card/follow-up-record",
  //   component: () =>
  //     import(
  //       /* webpackChunkName: "management" */ "@/views/card/FollowUpRecord"
  //     ),
  // },
  {
    path: "/card/poster",
    component: () =>
      import(/* webpackChunkName: "management" */ "@/views/card/Poster"),
  },
  {
    path: "/card/poster/form",
    component: () =>
      import(/* webpackChunkName: "management" */ "@/views/card/posterFormOld"),
  },
];
