import Vue from 'vue';
import Vuex from 'vuex';
import users from './users';
import yards from './yards';
import payment from './payment';
import test from './test';
import order from './order';
import createPersistedState from 'vuex-persistedstate';
import SecureLS from "secure-ls";

const ls = new SecureLS({isCompression: false});

Vue.use(Vuex)

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      users,
      yards,
      payment,
      test,
      order
    },
    plugins:[

    ],
    strict: process.env.DEBUGGING
  })

  return Store
}
