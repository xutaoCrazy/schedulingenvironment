import {
  getBreadCrumbList,
  setTagNavListInLocalstorage,
  getMenuByRouter,
  getTagNavListFromLocalstorage,
  getHomeRoute,
  getNextRoute,
  routeHasExist,
  routeEqual,
  getRouteTitleHandled,
  localSave,
  localRead
} from '@/libs/util'
import {
  saveErrorLogger
} from '@/api/data'
import router from '@/router'
import routers from '@/router/routers'
import config from '@/config'
import {
  axiosFunc
} from "@/api/data";
const {
  homeName
} = config

const closePage = (state, route) => {
  const nextRoute = getNextRoute(state.tagNavList, route)
  state.tagNavList = state.tagNavList.filter(item => {
    return !routeEqual(item, route)
  })
  router.push(nextRoute)
}

export default {
  state: {
    breadCrumbList: [],
    tagNavList: [],
    homeRoute: {},
    local: localRead('local'),
    errorList: [],
    hasReadErrorPage: false,
    menuLists: []
  },
  getters: {
    menuList: (state, getters, rootState) => state.menuLists, // 修改左侧路由菜单
    errorCount: state => state.errorList.length
  },
  mutations: {
    setMenuLists(state, menuLists) { // 修改左侧路由
      state.menuLists = menuLists
    },
    setBreadCrumb(state, route) {
      state.breadCrumbList = getBreadCrumbList(route, state.homeRoute)
    },
    setHomeRoute(state, routes) {
      state.homeRoute = getHomeRoute(routes, homeName)
    },
    setTagNavList(state, list) {
      let tagList = []
      if (list) {
        tagList = [...list]
      } else tagList = []
      if (tagList[0] && tagList[0].name !== homeName) tagList.shift()
      let homeTagIndex = tagList.findIndex(item => item.name === homeName)
      if (homeTagIndex > 0) {
        let homeTag = tagList.splice(homeTagIndex, 1)[0]
        tagList.unshift(homeTag)
      }
      state.tagNavList = tagList
      // setTagNavListInLocalstorage([...tagList])
    },
    closeTag(state, route) {
      let tag = state.tagNavList.filter(item => routeEqual(item, route))
      route = tag[0] ? tag[0] : null
      if (!route) return
      closePage(state, route)
    },
    addTag(state, {
      route,
      type = 'unshift'
    }) {
      let router = getRouteTitleHandled(route)
      if (!routeHasExist(state.tagNavList, router)) {
        if (type === 'push') state.tagNavList.push(router)
        else {
          if (router.name === homeName) state.tagNavList.unshift(router)
          else state.tagNavList.splice(1, 0, router)
        }
        // setTagNavListInLocalstorage([...state.tagNavList])
      }
    },
    setLocal(state, lang) {
      localSave('local', lang)
      state.local = lang
    },
    addError(state, error) {
      state.errorList.push(error)
    },
    setHasReadErrorLoggerStatus(state, status = true) {
      state.hasReadErrorPage = status
    }
  },
  actions: {
    addErrorLog({
      commit,
      rootState
    }, info) {
      if (!window.location.href.includes('error_logger_page')) commit('setHasReadErrorLoggerStatus', false)
      const {
        user: {
          token,
          userId,
          userName
        }
      } = rootState
      let data = {
        ...info,
        time: Date.parse(new Date()),
        token,
        userId,
        userName
      }
    },
    bb({
      state,
      commit,
      rootState
    }) {
      const promiseShifts = (url, type, params, flag) => {
        let data = new Promise((resolve, reject) => {
          let save = axiosFunc(url, type, params, flag);
          resolve(save);
        });
        return data;
      }
      promiseShifts(
        "/api/rateweb/cloud/SysSchedule/getSeverUserConfig",
        "get", {}
      ).then(res => {
        debugger;
        if (res.status === 200 && res.data.result == "SUCCESS") {
          let map = res.data.map
          commit('trueNameFlag', map.trueName)
          commit('systemVer', map.systemVer)
          commit('parameterArray', map.parameterArray)
          commit('centerurls', map.centerurl)
          commit('loginFilters', map.loginFilter)
          commit('loginNames', map.loginName)
          commit('bck03', map.bck03)
          commit('loginTimes', map.loginTime)
          commit('userId', map.userId)
          commit('jsessionids', map.jsessionids)
          Promise.all([getMainLeftBottomData()])
            .then(function (params) {
              debugger
              routerJson(params[0])
              commit('setMenuLists', getMenuByRouter(routers, rootState.access))
            })

        } else {
          window.location.href = res.data.split("'")[1];
        }
      });
      const getMainLeftData = () => {
        let p = new Promise((resolve, reject) => {
          $.ajax({
            type: "GET",
            url: rootState.centerurl + "/cloud/sysUser/getCloudOMenuByUserId",
            data: {
              'language': 'zh-CN',
              'userId': rootState.userId,
              'loginCode': rootState.loginName,
              'sysModId': 2254,
              'jsessionids': rootState.jsessionids
            },
            dataType: "jsonp",
            crossDomain: true,
            jsonp: "callback",
            jsonpCallback: "success_jsonp",
            success: function (data) {
              debugger;
              let parms = [];
              for (let i = 0; i < data.length; i++) {
                parms.push(data[i].attributes.codeOmit)
              }
              resolve(parms)
            }
          });
        })
        return p
      };
      const getMainLeftBottomData = () => {
        let p1 = new Promise((resolve, reject) => {
          $.ajax({
            type: "GET",
            url: rootState.centerurl + "/cloud/sysUser/getCloudOMenuByUserId",
            data: {
              'language': 'zh-CN',
              'userId': rootState.userId,
              'loginCode': rootState.loginName,
              'sysModId': 2254,
              'sysModSId': 2255,
              'jsessionids': rootState.jsessionids
            },
            dataType: "jsonp",
            crossDomain: true,
            jsonp: "callback",
            jsonpCallback: "success_jsonp",
            success: function (data) {
              debugger;
              let parms = [];
              for (let i = 0; i < data.length; i++) {
                parms.push(data[i].attributes.codeOmit)
              }
              resolve(parms)
            }
          });
        })
        return p1
      };
      const routerJson = (parms) => {
        debugger;
        parms.indexOf(routers[2].meta.code) != -1 ? routers[2].meta.hideInMenu = false : routers[2].meta.hideInMenu = true
        parms.indexOf(routers[3].children[0].meta.code) != -1 ? routers[3].meta.hideInMenu = false : routers[3].meta.hideInMenu = true
        parms.indexOf(routers[4].children[0].meta.code) != -1 ? routers[4].meta.hideInMenu = false : routers[4].meta.hideInMenu = true
        if (routers[2].children.length == 0) {
          router[2].meta.showAlways = false;
          router[2].meta.hideInMenu = true;
        }
      }
    }
  },
}
