/**
 * shiftformdataclear       单个或班次清空
 * delclearReset            批量排班清空
 * delclearReset            批量删除清空
 *
 */

export const shiftformdataclear = (_this) => {

  let arr = [{
    zaa05: "",
    zaa07: "",
    zaa08: "",
    bas02: "",
    bck03: "",
    bcb01: "",
    zaa12: 0,
    zaa11: 0,
    zaa09: "",
    wxenabled: "0",
    zaa13: "0",
    zaa15: 0,
    zaa01: null,
    bce01: _this.bce01Name,
    bce03: _this.bce03Name,
    bck01: _this.Department
  }];
  return arr;

}

export const bathClearReset = (_this) => {
  for (var item in _this.batchDat[0]) {
    _this.batchDat[0][item] = "";
  }
  _this.batchDat[0].zaa12 = 0;
  _this.batchDat[0].zaa11 = 0;
  _this.batchDat[0].zaa15 = 0;
  _this.batchDat[0].wxenabled = "0";
  _this.batchDat[0].zaa13 = "0";
  _this.batchDatbegindate = "";
  _this.batchDatendDate = "";
  _this.batchschedu = false;
  _this.mockData = [];
  _this.newTargetKeysArr = [];
  _this.isSource = 5;
}

export const delclearReset = (_this) => {
  _this.batchdeletion = false;
  for (let item in _this.delbatchDat) {
    _this.delbatchDat[item] = "";
  }
  _this.delbatchDat.userIds = [];
  _this.delmockData = [];
  _this.checkAll = false;
  _this.checkAllGroup = [];
}

export const cancelReset = (_this, index) => {
  if (index === 1) {
    _this.batchschedu = !_this.batchschedu;
  } else {
    _this.departModel = !_this.departModel;
    _this.tabs = 1;
    _this.tabName = "name1";
  }
}
