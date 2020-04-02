import {
  calculatingDate
} from "@/api/date"; //获取时间
import {
  axiosFunc,
  promiseShifts
} from "@/api/data";
export const tableInit = (_this) => {
  // 加载表格数据
  _this.tabelloading = true;
  promiseShifts(
    "/rateweb/cloud/SysSchedule/getSearchScheduRecordsList",
    "get", {
      bck01: _this.Department,
      bce01: _this.bce01Arr.join(","),
      startDate: _this.startDate,
      endDate: _this.endDate,
      page: 1,
      rows: 500,

    }
  ).then(res => {
    _this.tabelloading = false;
    if (res.status === 200) {

      switch (_this.tabindex) {
        case 1:
          _this.data1 = res.data.list;
          _this.columns1 = calculatingDate(1, _this.data1, _this);
          break;
        case 2:
          _this.data2 = res.data.list;
          _this.columns2 = calculatingDate(2, _this.data2, _this);
          break;
        case 3:
          _this.data3 = res.data.list;
          _this.columns3 = calculatingDate(3, _this.data3, _this);
          break;
        case 4:
          _this.data4 = res.data.list;
          _this.columns4 = calculatingDate(4, _this.data4, _this);
          break;
        case 5:
          _this.data5 = res.data.list;
          _this.columns5 = calculatingDate(5, _this.data5, _this);
          break;
        case 6:
          _this.data6 = res.data.list;
          _this.columns6 = calculatingDate(6, _this.data6, _this);
          break;
        case 7:
          _this.data7 = res.data.list;
          _this.columns7 = calculatingDate(7, _this.data7, _this);
          break;
        case 8:
          _this.data8 = res.data.list;
          _this.columns8 = calculatingDate(8, _this.data8, _this);
          break;
      }
    }
  });
}

export const getpersonnelPageList = (_this) => {
  promiseShifts(
    "/rateweb/cloud/SysSchedule/getPersonnelPageList",
    "get", {
      id: _this.Department,
      aaa01: _this.docter,
      page: _this.curr,
      rows: _this.pageSize,
      type: _this.tableType
    }
  ).then(res => {
    if (res.status === 200 && res.data.rows != null) {
      _this.bce01Arr = [];
      _this.total = res.data.total;
      for (let i = 0; i < res.data.rows.length; i++) {
        _this.bce01Arr.push(res.data.rows[i].bce01);
      }
      tableInit(_this);
    } else {
      _this.total = 0
    }
  });
}

export const selectDoctor = (_this) => {
  promiseShifts(
    "/rateweb/cloud/SysSchedule/getBusinessList",
    "get", {}
  ).then(res => { //职务
    if (res.status === 200) {
      _this.docterList = res.data;
    }
  });
  promiseShifts("/rateweb/cloud/SysSchedule/getBck1List", "get", {
    keyWord: "",
    page: 1,
    rows: 30
  }).then(res => {
    // 科室

    if (res.status === 200 && res.data.result === "SUCCESS") {
      _this.DepartmentList = res.data.list;
    }
  });
  promiseShifts(
    "/rateweb/cloud/SysSchedule/getShiftsList",
    "get", {}
  ).then(res => {
    // 班次
    if (res.status === 200 && res.data) {
      _this.zaa05List = res.data;
    }
  });
  promiseShifts(
    "/rateweb/cloud/SysSchedule/getCategory",
    "get", {}
  ).then(res => {
    // 挂号号别

    if (res.status === 200) {
      _this.bcb01List = res.data;
    }
  });
}
