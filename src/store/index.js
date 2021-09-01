import Vue from 'vue'
import Vuex from 'vuex'
import users from './users'
import test from './test'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    users,
    test
  }
})
