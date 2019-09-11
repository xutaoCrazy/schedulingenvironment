/** 
 * tabWeek  //顶部时间获取
 * shiftDeletion   //复制排班添加获取时间
 */
import {
  getDateStr
} from "@/api/date"; //获取时间
import {
  tableInit,
} from "@/common/loadTabel"; //加载表格
export const tabWeek = (_this, index) => {
  let now = new Date(); // 当前日期
  let nowDayOfWeek = now.getDay();
  _this.tabindex = index + 1;
  switch (index) {
    case 0:
      _this.startDate = getDateStr(0).year + " " + "00:00:00";
      _this.endDate = getDateStr(7 - nowDayOfWeek).year + " " + "23:59:59";
      break;
    case 1:
      _this.startDate = getDateStr(0, true).year + " " + "00:00:00";
      _this.endDate = getDateStr(6, true).year + " " + "23:59:59";
      break;
    case 2:
      var nows = new Date(); // 当前日期
      var nowMonth = nows.getMonth() + 1; // 当前月
      var nowYear = nows.getYear(); // 当前年
      nowYear += nowYear < 2000 ? 1900 : 0;
      var dateLen = new Date(nowYear, nowMonth, 0).getDate();
      _this.startDate = getDateStr(0, false).year + " " + "00:00:00";
      _this.endDate = getDateStr(dateLen - 1, false).year + " " + "23:59:59";
      break;
    case 3:
      _this.startDate = getDateStr().year + " " + "00:00:00";
      _this.endDate = getDateStr(6).year + " " + "23:59:59";
      break;
    case 4:
      _this.startDate = getDateStr().year + " " + "00:00:00";
      _this.endDate = getDateStr(13).year + " " + "23:59:59";
      break;
    case 5:
      _this.startDate = getDateStr().year + " " + "00:00:00";
      _this.endDate = getDateStr(29).year + " " + "23:59:59";
      break;
  }
  tableInit(_this);
}
export const shiftDeletion = (_this,data) => {
    let weekOfday = parseInt(_this.$moment().format("d")); // 计算今天是这周第几天 周日为一周中的第一天
      switch (data) {
        case "1": //本周
        _this.dupbatchDat.startDate = _this.$moment(
            _this.$moment().subtract(weekOfday, "days") + 86400000
          ).format("YYYY-MM-DD"); // 周一日期
          _this.dupbatchDat.endDate = _this.$moment(
            _this.$moment().add(7 - weekOfday - 1, "days") + 86400000
          ).format("YYYY-MM-DD"); // 周日日期

          break;
        case "2": //上周
        _this.dupbatchDat.startDate = _this.$moment(
            _this.$moment().subtract(weekOfday + 7, "days") + 86400000
          ).format("YYYY-MM-DD"); // 周一日期
          _this.dupbatchDat.endDate = _this.$moment(
            _this.$moment().subtract(weekOfday + 1, "days") + 86400000
          ).format("YYYY-MM-DD"); // 周日日期

          break;
        case "3": //本月
        _this.dupbatchDat.startDate =
        _this.$moment()
              .add("month", 0)
              .format("YYYY-MM") + "-01";
              _this.dupbatchDat.endDate = _this.$moment(_this.dupbatchDat.startDate)
            .add("month", 1)
            .add("days", -1)
            .format("YYYY-MM-DD");

          break;
      }
}