// import Vue from 'vue'
// import { route } from 'quasar/wrappers'
// import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
// import routes from './routes'

import Vue from 'vue'
import VueRouter from 'vue-router'
// import fbi from '../middleware/firebase'
// import firebasePresenceSystem from '../middleware/database'
import routes from './routes'

Vue.use(VueRouter)

export default function () {
  const router = new VueRouter({
    scrollBehavior: () => ({x: 0, y: 0}),
    routes,

    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })
  return router
}


// export default route(function (/* { store, ssrContext } */) {
//   const createHistory = process.env.SERVER
//     ? createMemoryHistory
//     : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)
//
//   const Router = createRouter({
//     scrollBehavior: () => ({ left: 0, top: 0 }),
//     routes,
//
//     history: createHistory(process.env.MODE === 'ssr' ? void 0 : process.env.VUE_ROUTER_BASE)
//   })
//
//   return Router
// })
