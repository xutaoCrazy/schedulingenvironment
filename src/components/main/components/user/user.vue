<template>
  <div class="user-avatar-dropdown user-admin">
    <div style="line-height: 44px;">
      欢迎你：
      <span @click="bulletFlag=true">{{trueName}}</span>
    </div>
    <Modal v-model="bulletFlag" title="人员信息">
      <div class="userbody">
        <Row>
          <Col span="24">
            <span>登录名:{{loginName}}</span>
          </Col>
        </Row>
        <Row>
          <Col span="24">
            <span>真实姓名:{{trueName}}</span>
          </Col>
        </Row>
        <Row>
          <Col span="24">
            <span>所属科室:{{bck03}}</span>
          </Col>
        </Row>
        <Row>
          <Col span="24">
            <span>登陆时间:{{loginTime}}</span>
          </Col>
        </Row>
      </div>
      <div slot="footer">
        <Button style="margin-left: 8px" @click="bulletFlag=false">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import "./user.less";
import { axiosFunc } from "@/api/data";
import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      bulletFlag: false,
      bck03: "",
      loginTime: "",
      centerurl: ""
    };
  },
  computed: {
    ...mapState(["trueName", "loginFilter", "loginName"])
  },

  methods: {
    ...mapMutations([
      "trueNameFlag",
      "systemVer",
      "parameterArray",
      "loginFilters",
      "loginNames"
    ]),
    promiseShifts(url, type, params, flag) {
      let data = new Promise((resolve, reject) => {
        let save = axiosFunc(url, type, params, flag);
        resolve(save);
      });
      return data;
    },
    loginPersonInformation() {
      this.promiseShifts(
        "/api/rateweb/cloud/SysSchedule/getSeverUserConfig",
        "get",
        {}
      ).then(res => {
        debugger;
        if (res.status === 200) {
          this.trueNameFlag(res.data.map.trueName);
          this.systemVer(res.data.map.systemVer);
          this.parameterArray(res.data.map.parameterArray);
          this.centerurl = res.data.map.centerurl;
          this.loginFilters(res.data.map.loginFilter);
          this.bck03 = res.data.map.bck03;
          this.loginNames(res.data.map.loginName);
          this.loginTime = this.$moment(
            parseFloat(res.data.map.loginTime)
          ).format("YYYY-MM-DD HH:mm:ss");
        }
      });
    },
    init() {
      this.loginPersonInformation();
    },
    beforeunloadHandler(e) {
      // var confirmationMessage = "确定离开此页吗？";
      // (e || window.event).returnValue = confirmationMessage;
      // return confirmationMessage;
    },
    focusEventUser(e) {
      let $this = this;
      $.ajax({
        dataType: "jsonp",
        type: "get",
        url:
          this.centerurl + "/cloud/sysUser/getUserCode?code=" + this.loginName,
        async: false,
        success: function(data) {
          debugger;
          if (data) {
            if (data.result == "SUCCESS") {
              debugger;
              if ($this.loginFilter != data.loginFilter) {
                $this.$Modal.warning({
                  title: "提示",
                  content: "同一浏览器不能同时登录多个帐号！",
                  onOk: () => {
                    window.location.href = $this.centerurl + "/login.jsp";
                  }
                });
              }
            } else {
              $this.$Modal.warning({
                title: "提示",
                content: data.loginFilter,
                onOk: () => {
                  window.location.href = $this.centerurl + "/login.jsp";
                }
              });
            }
          } else {
            //跳转到登录页面；
            window.location.href = $this.centerurl + "/login.jsp";
          }
        }
      });
    }
  },
  mounted() {
    this.init();
    window.addEventListener("beforeunload", e => this.beforeunloadHandler(e));
    //判断登陆用户同一个浏览器只能登录一个
    document.addEventListener("focus", e => this.focusEventUser(e), true);
  }
};
</script>
