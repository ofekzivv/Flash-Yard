import Vue from 'vue'
import Vuex from 'vuex'
import users from './users'

Vue.use(Vuex)



export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
    users
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING
  })

  return Store
}
