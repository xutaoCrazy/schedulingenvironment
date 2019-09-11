/**
 * singleShiftsCheduling         点击人排班保存
 * batchSchedulingPreservation   批量排班保存
 * deleteScheduling              批量删除排班保存
 * saveTabelPerson               点击表格排班保存
 * singleDeletion                点击单个排班删除
 * 
 */
import {
  promiseShifts
} from "@/api/data";
import {
  shiftformdataclear
} from "@/common/resetFields"; //清空
import {
  tableInit,
} from "@/common/loadTabel"; //加载表格
export const singleShiftsCheduling = (_this) => {
  for (let i = 0; i < _this.shiftformdata.length; i++) {
    if (!_this.shiftformdata[i].zaa05) {
      return _this.$Message.warning({
        content: "班次配置" + (i + 1) + "班次不能为空",
        duration: 2
      });
    }
    if (!_this.shiftformdata[i].bck01) {
      return _this.$Message.warning({
        content: "班次配置" + (i + 1) + "科室不能为空",
        duration: 2
      });
    }
    if (!_this.shiftformdata[i].zaa15) {
      return _this.$Message.warning({
        content: "班次配置" + (i + 1) + "时间间隔不能为空",
        duration: 2
      });
    }

    if (!_this.shiftformdata[i].zaa11) {
      return _this.$Message.warning({
        content: "班次配置" + (i + 1) + "限约数不能为空",
        duration: 2
      });
    }
    if (!_this.shiftformdata[i].bcb01) {
      return _this.$Message.warning({
        content: "班次配置" + (i + 1) + "号别不能为空",
        duration: 2
      });
    }
  }
  debugger;
  _this.isBtnLoading = true;
  _this.loadingShow(_this, "保存中");
  promiseShifts(
    "/api/rateweb/cloud/SysSchedule/saveSchedule",
    "post", {
      commformStr: JSON.stringify(_this.shiftformdata),
      type: _this.showType,
      beginDate: _this.savebeginDate,
      endDate: _this.saveEndDate
    },
    true
  ).then(res => {
    if (res.status === 200 && res.data.result === "SUCCESS") {
      shiftformdataclear(_this);
      _this.departModel = !_this.departModel;
      _this.tabs = 1;
      tableInit(_this);
      _this.$Message.success({
        content: "保存成功",
        duration: 2
      });
    } else {
      _this.$Modal.error({
        title: "信息",
        content: res.data.resultMsg,
        className: "vertical-center-modal"
      });
    }
    _this.isBtnLoading = false;
    _this.loadingHide(_this);
  });
}

export const batchSchedulingPreservation = (_this) => {
  _this.isBtnLoading = true;
  _this.loadingShow(_this, "保存中");
  promiseShifts(
    "/api/rateweb/cloud/SysSchedule/saveSchedule",
    "post", {
      commformStr: JSON.stringify(_this.batchDat),
      type: _this.isSource,
      beginDate: _this.$moment(_this.batchDatbegindate).format(
        "YYYY-MM-DD 00:00:00"
      ),
      endDate: _this.$moment(_this.batchDatendDate).format(
        "YYYY-MM-DD 23:59:59"
      ),
      userListStr: JSON.stringify(_this.newTargetKeysArr)
    },
    true
  ).then(res => {
    if (res.status === 200 && res.data.result === "SUCCESS") {
      _this.curr = 1;
      tableInit(_this);
      _this.batchschedu = false;
      _this.batchClear();
      _this.$Message.success({
        content: "保存成功",
        duration: 2
      });
    } else {
      _this.$Modal.error({
        title: "信息",
        content: res.data.resultMsg,
        className: "vertical-center-modal"
      });
    }
    _this.isBtnLoading = false;
    _this.loadingHide(_this);
  });
}

export const deleteScheduling = (_this) => {
  _this.isBtnLoading = true;
  debugger;
  if (_this.checkAllGroup.length == 7) {
    _this.delbatchDat.weekNum = "";
  } else {
    _this.delbatchDat.weekNum = _this.checkAllGroup.join(",");
  }
  _this.delbatchDat.userIds = _this.delbatchDat.userIds.join(",");
  _this.delbatchDat.startDate = _this.$moment(
    _this.delbatchDat.startDate
  ).format("YYYY-MM-DD");
  _this.delbatchDat.endDate = _this.$moment(_this.delbatchDat.endDate).format(
    "YYYY-MM-DD"
  );
  _this.loadingShow(_this, "保存中");
  promiseShifts(
    "/api/rateweb/cloud/SysSchedule/removeBatchSourceData",
    "post",
    _this.delbatchDat,
    true
  ).then(res => {
    if (res.status === 200 && res.data.result === "SUCCESS") {
      _this.$Message.success({
        content: res.data.resultMsg,
        duration: 2
      });

      _this.curr = 1;
      tableInit(_this);
      _this.delclear();
    } else {
      _this.$Modal.error({
        title: "信息",
        content: res.data.resultMsg,
        className: "vertical-center-modal"
      });
    }
    _this.isBtnLoading = false;
    _this.loadingHide(_this);
  });
}

export const saveTabelPerson = (_this, zaa01) => {
  _this.showType = 4;
  _this.loadingShow(_this, "保存中");
  promiseShifts(
    "/api/rateweb/cloud/SysSchedule/saveSchedule",
    "post", {
      zaa01: zaa01,
      type: _this.showType
    },
    true
  ).then(res => {
    if (res.status === 200 && res.data.result === "SUCCESS") {
      tableInit(_this);
      _this.$Notice.success({
        title: "保存排班成功"
      });
    } else {
      _this.$Modal.error({
        title: "信息",
        content: res.data.resultMsg,
        className: "vertical-center-modal"
      });
    }
    _this.loadingHide(_this);
  });
}
export const singleDeletion = (_this, zaa01) => {
  promiseShifts("/api/rateweb/cloud/SysSchedule/removeSourceData", "post", {
    id: zaa01
  }).then(res => {
    if (res.status === 200 && res.data.result === "SUCCESS") {
      _this.$Message.success({
        content: "删除成功",
        duration: 2
      });
      tableInit(_this);
    } else {
      _this.$Modal.error({
        title: "信息",
        content: res.data.resultMsg,
        className: "vertical-center-modal"
      });
    }
  });
}
