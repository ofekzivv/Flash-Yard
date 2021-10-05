const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {path: 'feed', component: () => import('pages/Feed')},
      {path: 'order', component: () => import('pages/Order')},
      {path: 'yardPage', component: () => import('pages/YardPage')},
      {path: 'addYard', component: () => import('pages/AddYard')},
      {path: 'sumOrder', component: () => import('pages/sumOrder')},
      {path: 'payment', component: () => import('pages/payment')},
      { path: 'MyProfile', component: () => import('pages/MyProfile') },
      { path: 'Test', component: () => import('pages/Test') }
    ]
  },
  {
    path: '/login',
    component: () => import('pages/Login')
  },
  {
    path: '/reset',
    component: () => import('pages/ResetPassword')
  },
  {
    path: '/test',
    component: () => import('pages/test')
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }

]

export default routes
