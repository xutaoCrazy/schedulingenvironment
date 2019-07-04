import Vue from 'vue'
import Vuex from 'vuex'

import user from './module/user'
import app from './module/app'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 
    sideCollapse: false,
  },
  mutations: {
    //
    setSideCollapse (state, bool) {
      state.sideCollapse = bool
    }
  },
  actions: {
    //
  },
  modules: {
    user,
    app
  }
})
