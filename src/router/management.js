export default [
  // 批量加好友-列表
  {
    path: '/friend/list',
    component: () => import(/* webpackChunkName: "management" */ '@/views/management/friend-dev/list')
  },
  // 批量加好友-添加方式
  {
    path: '/friend/addway',
    component: () => import(/* webpackChunkName: "management" */ '@/views/management/friend-dev/addWay')
  },
  // 批量加好友-统计
  {
    path: '/friend/statistics',
    component: () => import(/* webpackChunkName: "management" */ '@/views/management/friend-dev/statistics')
  }
]