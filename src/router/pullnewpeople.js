export default [
  {
    path: '/pullnewpeople/pond',
    component: () => import(/* webpackChunkName: "sidebar" */ '@/views/pullnewpeople/pond')
  },
  {
    path: '/pullnewpeople/custDetail',
    component: () => import(/* webpackChunkName: "sidebar" */ '@/views/pullnewpeople/custDetail')
  },
  {
    path: '/pullnewpeople/tags',
    component: () => import(/* webpackChunkName: "sidebar" */ '@/views/pullnewpeople/tags')
  },
  {
    path: '/pullnewpeople/invite',
    component: () => import(/* webpackChunkName: "sidebar" */ '@/views/pullnewpeople/invite')
  },

]