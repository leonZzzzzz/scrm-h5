export default [

  { // 小数桔线索首页
    path: '/scrmClue',
    redirect: '/scrmClue/article',
    component: () => import(/* webpackChunkName: "scrmClue" */ '@/views/scrm-clue/home/index'),
    children: [
      {// 获客推文
        path: 'article',
        meta: {isTabbar: true},
        component: () => import(/* webpackChunkName: "scrmClue" */ '@/views/scrm-clue/article/index'),
      },
      {// 客户线索
        path: 'customerClue',
        meta: {isTabbar: true},
        component: () => import(/* webpackChunkName: "scrmClue" */ '@/views/scrm-clue/customer-clue/index')
      },
      {// 统计
        path: 'statistics',
        meta: {isTabbar: true},
        component: () => import(/* webpackChunkName: "scrmClue" */ '@/views/scrm-clue/statistics/index')
      },
      {// 推文详情
        path: 'article/detail',
        component: () => import(/* webpackChunkName: "scrmClue" */ '@/views/scrm-clue/article/detail/index'),
      },
      {// 线索客户详情
        path: 'customerClue/customer',
        component: () => import(/* webpackChunkName: "scrmClue" */ '@/views/scrm-clue/customer-clue/customer/index'),
      },
      {// 分级线索列表
        path: 'customerClue/actionClueList',
        component: () => import(/* webpackChunkName: "scrmClue" */ '@/views/scrm-clue/customer-clue/actionClueList'),
      },
      {// 线索编辑客户资料
        path: 'customerClue/editCustomer',
        component: () => import(/* webpackChunkName: "scrmClue" */ '@/views/scrm-clue/customer-clue/customer/editCustomer'),
      },
    ]
  }
]