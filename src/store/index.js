import Vue from 'vue'
import Vuex from 'vuex'

import user from './module/user'
import app from './module/app'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sideCollapse: false,
    trueName: '', //
    systemVer: '', //版本号
    parameterArray: '', //医院名称
    baseHospitalid: '', //默认选中
    loginFilters: '',
    loginName: ''
  },
  mutations: { //取值
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
      debugger;
      let parame = JSON.parse(name)[0].children
      state.parameterArray = parame
      state.baseHospitalid = parame[0].id

    },
    loginFilters(state, name) { //医院名称
      debugger;
      state.loginFilter = name

    },
    loginNames(state, name) { //医院名称
      debugger;
      state.loginName = name

    }
  },
  actions: {

  },
  modules: {
    user,
    app
  }
})
