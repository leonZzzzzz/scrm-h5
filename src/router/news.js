export default [
  {
    path: '/news',
    component: () => import(/* webpackChunkName: "news" */ '@/views/news/index')
  },
  {
    path: '/moreGrap',
    component: () => import(/* webpackChunkName: "news" */ '@/views/news/grap')
  },
  {
    path: '/video',
    component: () => import(/* webpackChunkName: "news" */ '@/views/news/video')
  }
]