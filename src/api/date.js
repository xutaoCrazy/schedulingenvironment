import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';

export const calculatingDate = (type,data1,_this) => {
  let now = new Date();                    //当前日期
  let nowDayOfWeek = now.getDay();
  let TimeJson={};
  switch(type){
    case 1:
      TimeJson.sartDate=getDateStr(0).year
      TimeJson.endDate=getDateStr(7-nowDayOfWeek).year
      break;

  }
  let mangementArr=[
    {
      title: '员工姓名',
      key: 'bce03',
      width: '130',
      align: 'center',
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
              marginLeft:'16px'

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
                _this.show(params,1,TimeJson)
              }
            }
          }, '编辑')
        ])
      }
    }
  ]
  if(type==1){
    
    if(nowDayOfWeek===0){
      nowDayOfWeek=7
    }
    let j=-1
  
    for(var i=nowDayOfWeek;i<=7;i++){
      debugger;
      j++
      let jsonTime=getDateStr(j)
      let indexItem=0;
      let mangementJson={
        title:jsonTime.date+'('+jsonTime.week+')' ,
        key: 'list',
        align: 'center',
        render: (h, params) => {
         
          
            return h('div', {
              attrs: {
                class: 'subCol'
              }
            }, [
              h('div',{
                'style': {
                  'height': '90px'
                },
              } ,data1[params.index].list.map(item => {
                let $timeFlag=true
                if (item[0][jsonTime.time] != undefined) {
                  $timeFlag=false
                  indexItem=0;
                  params.row.list.filter((item, index)=> {
                    debugger
                     if(item[0] && Object.keys(item[0]).indexOf(jsonTime.time)>-1){
                      indexItem++
                     }
                  })
                  let jsonParams = item[0][jsonTime.time].split(',')              
                  return h('div', {
                    'style': {
                      'background':jsonParams[3],
                      'height': 'calc(100% / '+indexItem+')',
                      'textAlign':'center',
                      'lineHeight':90/indexItem+'px',
                      'cursor':'pointer'
                    },
                    on: {
                      click: () => {
                        _this.show(params,2,jsonTime.year,jsonParams[2],jsonParams[3])
                      }
                    }
                  }, jsonParams[0])
                }else if($timeFlag && Object.keys(item[0])[0]==jsonTime.time){
                  debugger;
                  return h('div', {
                    'style': {
                      'background':'',
                      'height': 'calc(100% / 1)',
                      'textAlign':'center',
                      'cursor':'pointer'

                    },
                    on: {
                      click: () => {
                        _this.show(params,2,jsonTime.year,)
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
  }
  
 
   return mangementArr
}

export const getDateStr =(dayCount)=>{
  if(null == dayCount){
    dayCount = 0;
  }
   let  weekJson=['周天','周一','周二','周三','周四','周五','周六']
   let jsonDate={};
   var dd = new Date();
   dd.setDate(dd.getDate()+dayCount);//设置日期
   var m = dd.getMonth()+1;//获取当前月份的日期
   var w=dd.getDay()
   var y=dd.getFullYear()
   if(m !=10 || m!=11 || m!=12){
      m ='0'+m
   }
   var d = dd.getDate();
   jsonDate.time=m+d;  //合并时间
   jsonDate.date=m+'-'+d; // 天
   jsonDate.week=weekJson[w];  //周
   jsonDate.year= y+'-'+ jsonDate.date//年
   return jsonDate
}


function getMonthDays(myMonth){
  var monthStartDate = new Date(nowYear, myMonth, 1);
  var monthEndDate = new Date(nowYear, myMonth + 1, 1);
  var days = (monthEndDate - monthStartDate)/(1000   *   60   *   60   *   24);
  return  days
}
