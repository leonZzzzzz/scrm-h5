export default [
  {
    path: '/moments',
    component: () => import(/* webpackChunkName: "moments" */ '@/views/moments/index')
  },
  {
    path: '/moments/create',
    component: () => import(/* webpackChunkName: "moments" */ '@/views/moments/Create')
  },
  {
    path: '/moments/customer',
    component: () => import(/* webpackChunkName: "moments" */ '@/views/moments/Customer')
  },
]