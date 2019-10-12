import Vue from 'vue'
import Vuex from 'vuex'

import user from './module/user'
import app from './module/app'
import moment from 'moment'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sideCollapse: false,
    trueName: '', //
    systemVer: '', //版本号
    parameterArray: '', //医院名称
    baseHospitalid: '', //默认选中
    loginFilters: '',
    loginName: '',
    centerurl: '',
    bck03: '',
    loginTime: '',
    userId: '',
    jsessionids: '',
    jsonpFlag: false,
    btnCode: []
  },
  mutations: {
    setSideCollapse(state, bool) {
      state.sideCollapse = bool
    },
    trueNameFlag(state, name) { //当前登录人
      state.trueName = name
    },
    systemVer(state, name) { //版本号
      state.systemVer = name
    },
    parameterArray(state, name) { //医院名称
      let parame = JSON.parse(name)[0].children
      state.parameterArray = parame
      state.baseHospitalid = parame[0].id

    },
    loginFilters(state, name) { //医
      state.loginFilter = name

    },
    loginNames(state, name) { // 登录人编码
      state.loginName = name

    },
    centerurls(state, name) { //控制中心url
      state.centerurl = name
    },
    bck03(state, name) { //科室
      state.bck03 = name
    },
    loginTimes(state, name) { //登陆时间
      state.loginTime = moment(parseFloat(name)).format(
        "YYYY-MM-DD HH:mm:ss"
      )
    },
    userId(state, name) { //登录人ID
      state.userId = name
    },
    jsessionids(state, name) { //jsessionids
      state.jsessionids = name
    },
    jsonpFlags(state, flag) {
      state.jsonpFlag = flag
    },
    btnCodes(state, btnCode) {
      state.btnCode = btnCode
    },
  },
  actions: {

  },
  modules: {
    user,
    app
  }
})
