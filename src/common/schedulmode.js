/**
 * scheduShow    表格点击弹窗
 * 
 * 
 */
import {
  saveTabelPerson,
} from "@/common/save"; //保存
import {
  promiseShifts
} from "@/api/data";
import {
  shiftformdataclear,
} from "@/common/resetFields"; //清空
//=============================================
export const scheduShow = (params, flag, timeJson, zaa01, $color, $item, _this) => {
  _this.tabs = 1;
  _this.tabeNum = 0;
  _this.tabName = "name1";
  if (zaa01 && $color === "null") {
    saveTabelPerson(_this, zaa01) //点击单个人保存
  } else {
    _this.shiftformdata = [];
    _this.shiftformdata.push({
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
    });
    _this.shiftformdata[0].bce01 = parseFloat(
      params.row.bce03.split(",")[1]
    );
    _this.shiftformdata[0].bce03 = params.row.bce03.split(",")[0];
    _this.bce01Name = parseFloat(params.row.bce03.split(",")[1]);
    _this.bce03Name = params.row.bce03.split(",")[0];
    _this.departModel = true;
    _this.showType = flag;

    switch (flag) {
      case 1:
        _this.showDate = false;
        _this.savebeginDate = timeJson.sartDate;
        _this.saveEndDate = timeJson.endDate;
        break;
      case 2:
        _this.showDate = true;
        _this.savebeginDate = timeJson;
        _this.saveEndDate = timeJson;
        _this.sameday = timeJson;
        break;
    }
    if (zaa01 && $color) {
      promiseShifts(
        "/api/rateweb/cloud/SysSchedule/getOneScheduById",
        "get", {
          id: zaa01
        }
      ).then(res => {
        // 挂号号别

        _this.showType = 3;
        if (res.status === 200) {
          let formData = _this.shiftformdata[0];
          let $data = res.data;
          formData.zaa05 = $data.zaa05;
          formData.zaa07 = $data.zaa07.split(" ")[1];
          formData.zaa08 = $data.zaa08.split(" ")[1];
          formData.bas02 = $data.bas02;
          formData.bck03 = $data.bck01;
          formData.bcb01 = $data.bcb01;
          formData.zaa12 = $data.zaa12;
          formData.zaa11 = $data.zaa11;
          formData.zaa09 = $data.zaa09;
          formData.wxenabled = $data.wxenabled.toString();
          formData.zaa13 = $data.zaa13.toString();
          formData.zaa01 = $data.zaa01;
          formData.bce01 = $data.bce01;
          formData.bce03 = $data.bce03;
          formData.bck01 = $data.bck01;
          formData.zaa15 = $data.zaa15;
          _this.selectBck01($data.bck01, $data.bas02);
        }
      });
    }
  }

}
