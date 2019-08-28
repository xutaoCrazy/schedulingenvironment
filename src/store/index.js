import Vue from 'vue'
import Vuex from 'vuex'

import user from './module/user'
import app from './module/app'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sideCollapse: false,
    trueName: '',
    systemVer: ''
  },
  mutations: {
    setSideCollapse(state, bool) {
      state.sideCollapse = bool
    },
    trueNameFlag(state, name) {
      debugger;
      state.trueName = name
    },
    bck03Flag(state, name) {
      state.trueName = name
    },
    systemVer(state, name) {
      state.systemVer = name
    }
  },
  actions: {

  },
  modules: {
    user,
    app
  }
})
