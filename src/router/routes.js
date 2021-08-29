
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'feed', component: () => import('pages/Feed') },
      { path: 'order', component: () => import('pages/Order') },
      { path: 'yardPage', component: () => import('pages/YardPage') },
      { path: 'addYard', component: () => import('pages/AddYard') },


    ]

  },
  {
    path: '/login',
    component: () => import('pages/Login')
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
