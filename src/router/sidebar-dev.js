export default [
  // {
  //   path: '/sidebar-dev/speechcraft',
  //   component: () => import('@/views/sidebar-dev/speechCraft')
  // },
  // {
  //   path: '/sidebar-dev/customerInfo',
  //   component: () => import('@/views/sidebar-dev/customerInfo')
  // },
  // 客户画像-客户标签编辑
  {
    path: '/',
    redirect: '/sidebar/speechcraft',
    component: () => import(/* webpackChunkName: "scrm" */ '@/views/sidebar-dev/speechCraft')
    
  },
  {
    path: '/sidebar-dev/customerTags',
    component: () => import(/* webpackChunkName: "sidebar" */ '@/views/sidebar-dev/customerTags')
  },
  // 客户画像-客户信息编辑
  {
    path: '/sidebar-dev/customerForm',
    component: () => import(/* webpackChunkName: "sidebar" */ '@/views/sidebar-dev/customerForm')
  },
  // 客户群-客户列表
  {
    path: '/sidebar-dev/groupChatList',
    component: () => import(/* webpackChunkName: "sidebar" */ '@/views/sidebar-dev/groupChatList')
  },
  // 客户详情
  {
    path: '/sidebar-dev/customerDetail',
    component: () => import(/* webpackChunkName: "sidebar" */ '@/views/sidebar-dev/customerDetail')
  },
  // 话术库
  {
    path: '/sidebar/speechcraft',
    component: () => import(/* webpackChunkName: "sidebar" */ '@/views/sidebar-dev/speechCraft')
  },
  // 客户画像
  {
    path: '/sidebar/customerInfo',
    component: () => import(/* webpackChunkName: "sidebar" */ '@/views/sidebar-dev/customerInfo')
  },
  // 客户详情
  {
    path: '/sidebar/customerDetailsInfo',
    component: () => import(/* webpackChunkName: "sidebar" */ '@/views/sidebar-dev/customerDetailsInfo'),
  },
  // 群聊详情
  {
    path: '/sidebar/customerGroupInfo',
    component: () => import(/* webpackChunkName: "sidebar" */ '@/views/sidebar-dev/customerGroupInfo'),
  },
  // 登录页
  {
    path: '/sidebar/login',
    component: () => import(/* webpackChunkName: "sidebar" */ '@/views/sidebar-dev/login')
  },
  // 客户-客户标签-个人标签编辑
  {
    path: '/sidebar/personalTags',
    component: () => import(/* webpackChunkName: "sidebar" */ '@/views/sidebar-dev/personalTags')
  },
  // 测试专用
  {
    path: '/sidebar/test',
    component: () => import(/* webpackChunkName: "sidebar" */ '@/views/sidebar-dev/test')
  },
]