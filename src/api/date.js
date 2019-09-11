export const calculatingDate = (type, data1, _this) => {
  let now = new Date() // 当前日期
  let nowDayOfWeek = now.getDay()
  let TimeJson = {}
  let nowDate = 0
  let width = 'auto'
  switch (type) {
    case 1:
      TimeJson.sartDate = getDateStr().year
      TimeJson.endDate = getDateStr(7 - nowDayOfWeek).year
      if (nowDayOfWeek === 0) {
        nowDayOfWeek = 7
      }
      nowDate = 7
      width = 'auto'
      break
    case 2:
      TimeJson.sartDate = getDateStr(0, true).year
      TimeJson.endDate = getDateStr(6, true).year
      nowDayOfWeek = 0
      nowDate = 6
      width = 'auto'

      break
    case 3:
      var nows = new Date() // 当前日期
      var nowMonth = nows.getMonth() + 1 // 当前月
      var nowYear = nows.getYear() // 当前年
      nowYear += (nowYear < 2000) ? 1900 : 0
      var dateLen = new Date(nowYear, nowMonth, 0).getDate()
      TimeJson.sartDate = getDateStr(0, false).year
      TimeJson.endDate = getDateStr(dateLen - 1, false).year
      nowDayOfWeek = 0
      nowDate = dateLen - 1
      width = '130'
      break
    case 4:
      TimeJson.sartDate = getDateStr().year
      TimeJson.endDate = getDateStr(6).year
      nowDayOfWeek = 0
      nowDate = 6
      width = 'auto'
      break
    case 5:
      TimeJson.sartDate = getDateStr().year
      TimeJson.endDate = getDateStr(13).year
      nowDayOfWeek = 0
      nowDate = 13
      width = 'auto'
      break
    case 6:
      TimeJson.sartDate = getDateStr().year
      TimeJson.endDate = getDateStr(29).year
      nowDayOfWeek = 0
      nowDate = 29
      width = '130'
      break
    case 7:
      TimeJson.sartDate = getDateStr().year
      TimeJson.endDate = getDateStr(60).year
      nowDayOfWeek = 0
      nowDate = 60
      width = '130'
      break
    case 8:
      TimeJson.sartDate = getDateStr().year
      TimeJson.endDate = getDateStr(90).year
      nowDayOfWeek = 0
      nowDate = 90
      width = '130'
      break
  }

  let mangementArr = [{
    title: '员工姓名',
    key: 'bce03',
    width: '130',
    align: 'center',
    fixed: 'left',
    tooltip: true,
    render: (h, params) => {
      return h('div', {
        style: {
          textAlign: 'center'
        }
      }, [
        h('div', {
          style: {
            float: 'left',
            cursor: 'pointer',
            marginLeft: '16px'

          }
        }, params.row.bce03.split(',')[0]),
        h('img', {
          style: {
            marginRight: '5px',
            cursor: 'pointer',
            float: 'left',
            marginLeft: '5px'
          },
          attrs: {
            src: require('../assets/images/edit.png'),
            title: '编辑'
          },
          on: {
            click: () => {
              _this.show(params, 1, TimeJson)
            }
          }
        }, '编辑')
      ])
    }
  }]

  var $jsonTime = ''
  let dateArr = {};
  for (let k = 0; k < data1.length; k++) { //计算当前列 是否有排班
    dateArr[data1[k].bce03.split(',')[1]] = [];
    let arrList = data1[k].list
    for (let g = 0; g < arrList.length; g++) {
      for (var key in arrList[g][0]) {
        dateArr[data1[k].bce03.split(',')[1]].push(key);
      }
    }
  }
  let j = -1
  for (let i = nowDayOfWeek; i <= nowDate; i++) {
    j++
    if (type === 2) {
      $jsonTime = getDateStr(j, true)
    } else if (type === 3) {
      $jsonTime = getDateStr(j, false)
    } else {
      $jsonTime = getDateStr(j)
    }
    let jsonTime = $jsonTime
    let indexItem = 0

    let mangementJson = {
      title: jsonTime.date + '(' + jsonTime.week + ')',
      key: 'list',
      align: 'center',
      width: width,
      render: (h, params) => {

        return h('div', {
          attrs: {
            class: 'subCol'
          }
        }, [
          h('div', {
            'style': {
              'height': '90px'
            }
          }, data1[params.index].list.map(item => {

            if (dateArr[params.row.bce03.split(',')[1]].indexOf(jsonTime.time) > -1 && item[0][jsonTime.time]) {
              indexItem = 0
              params.row.list.filter((item, index) => {
                if (item[0] && Object.keys(item[0]).indexOf(jsonTime.time) > -1) {
                  indexItem++
                }
              })
              let jsonParams = item[0][jsonTime.time].split(',')
              let component = 'Tooltip'
              let children = [
                h('div', {
                  slot: 'content',
                  style: {
                    whiteSpace: 'normal',
                    wordBreak: 'break-all'
                  }
                }, [
                  h('p', [
                    h('span', {
                      slot: 'content',
                    }, '科室:'),
                    h('span', {
                      slot: 'content',
                    }, jsonParams[4])
                  ]),
                  h('p', [
                    h('span', {
                      slot: 'content',
                    }, '诊室:'),
                    h('span', {
                      slot: 'content',
                    }, jsonParams[5] == 'null' ? '' : jsonParams[5])
                  ]),
                  h('p', [
                    h('span', {
                      slot: 'content',
                    }, '限约数:'),
                    h('span', {
                      slot: 'content',
                    }, jsonParams[6])
                  ]),
                  h('p', [
                    h('span', {
                      slot: 'content',
                    }, '时间:'),
                    h('span', {
                      slot: 'content',
                    }, jsonParams[7])
                  ])
                ]),
                h('div', {
                  'style': {
                    'background': jsonParams[3],
                    'height': 'calc(100% )',
                    'textAlign': 'center',
                    'cursor': 'pointer',
                    'width': '100%',
                    'position': 'relative'
                  },
                  on: {
                    click: () => {
                      _this.show(params, 2, jsonTime.year, jsonParams[2], jsonParams[3])
                    },
                    mouseenter: () => { //移入
                      if (jsonParams[3] != 'null') {
                        _this.imgIndex = jsonParams[2]
                      }
                    },
                    mouseleave: () => { //移除
                      _this.imgIndex = ''
                    }
                  }
                }, [
                  h('img', {
                    style: {
                      cursor: 'pointer',
                      padding: '3px',
                      background: '#fff',
                      display: jsonParams[2] === _this.imgIndex ? 'inline-block' : 'none',
                      position: 'absolute',
                      right: '5px',
                      top: '5px',
                    },
                    attrs: {
                      src: require('../assets/images/delete.png'),
                      title: '删除'
                    },
                    on: {
                      click: () => {
                        _this.removeWork(jsonParams[2])
                      }
                    }
                  }, '删除'),
                  h('span', jsonParams[0]),
                ])
              ]
              if (jsonParams[3] == 'null') {
                component = 'div'
                children = [h('span', jsonParams[0])]
              }
              return h(component, {
                style: {
                  'background': jsonParams[3],
                  'height': 'calc(100% / ' + indexItem + ')',
                  'textAlign': 'center',
                  'lineHeight': 90 / indexItem + 'px',
                  'cursor': 'pointer',
                  'width': '100%'
                },
                key: jsonParams[2],
                props: {
                  placement: 'right',
                  theme: "light",
                  transfer: true,
                  // disabled: _this.TooltipFlag
                },
                on: {
                  click: () => {
                    _this.show(params, 2, jsonTime.year, jsonParams[2], jsonParams[3])
                  },

                }

              }, children)
            } else if (dateArr[params.row.bce03.split(',')[1]].indexOf(jsonTime.time) === -1) {
              return h('div', {
                'style': {
                  'background': '',
                  'height': 'calc(100% / 1)',
                  'textAlign': 'center',
                  'cursor': 'pointer'

                },
                on: {
                  click: () => {
                    _this.show(params, 2, jsonTime.year)
                  }
                }
              }, '')
            }
          }))
        ])
      }
    }
    mangementArr.push(mangementJson)
  }

  return mangementArr
}
export const getDateStr = (dayCount, flag) => { // daycount 天数   flag  下周
  if (dayCount === null || undefined === dayCount) {
    dayCount = 0
  }
  let weekJson = ['周天', '周一', '周二', '周三', '周四', '周五', '周六']
  let jsonDate = {}
  if (flag === true) {
    var dd = new Date(setlastDay(1))
  } else if (flag === false) {
    var now = new Date() // 当前日期
    var nowMonth = now.getMonth() // 当前月
    var nowYear = now.getYear() // 当前年
    nowYear += (nowYear < 2000) ? 1900 : 0
    var dd = new Date(nowYear, nowMonth, 1)
  } else {
    var dd = new Date()
  }
  dd.setDate(dd.getDate() + dayCount) // 设置日期
  var m = dd.getMonth() + 1 // 获取当前月份的日期
  var w = dd.getDay()
  var y = dd.getFullYear()
  if (m != 10 && m != 11 && m != 12) {
    m = '0' + m
  }
  var d = dd.getDate()
  if (d < 10) {
    d = '0' + d
  }
  jsonDate.time = m.toString() + d.toString() // 合并时间
  jsonDate.date = m.toString() + '-' + d.toString() // 天
  jsonDate.week = weekJson[w] // 周
  jsonDate.year = y + '-' + jsonDate.date // 年
  return jsonDate
}

export const setlastDay = (num) => { // 计算下周
  var now = new Date()
  var nowTime = now.getTime()
  var day = now.getDay()
  var oneDayTime = 24 * 60 * 60 * 1000
  if (num === 1) {
    var MondayTime = nowTime - (day - parseFloat(num)) * oneDayTime + 86400000 * 7 // 下周一
  } else {
    var MondayTime = nowTime + (parseFloat(num) - day) * oneDayTime + 86400000 * 7 // 下周天
  }
  return MondayTime
}

export const getTime = (n) => {

  var now = new Date();
  var year = now.getFullYear();
  var month = now.getMonth() + 1;
  var day = now.getDay(); //返回星期几的某一天;
  n = day == 0 ? n + 6 : n + (day - 1)
  now.setDate(now.getDate() - n);
  var date = now.getDate();
  return date;
}
