export default [
  {
    path: '/noShared/list',
    component: () => import(/* webpackChunkName: "sidebar" */ '@/views/noShared/list')
  },


]