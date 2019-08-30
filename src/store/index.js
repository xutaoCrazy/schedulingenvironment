import Vue from 'vue'
import Vuex from 'vuex'

import user from './module/user'
import app from './module/app'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sideCollapse: false,
    trueName: '',
    systemVer: '',
    parameterArray: ''
  },
  mutations: {
    setSideCollapse(state, bool) {
      state.sideCollapse = bool
    },
    trueNameFlag(state, name) { //当前登录人
      debugger;
      state.trueName = name
    },
    systemVer(state, name) { //版本号
      state.systemVer = name
    },
    parameterArray(state, name) { //医院名称
      state.parameterArray = name
    }
  },
  actions: {

  },
  modules: {
    user,
    app
  }
})
