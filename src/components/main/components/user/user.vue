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
      loginName: "",
      loginTime: ""
    };
  },
  computed: {
    ...mapState(["trueName"])
  },
  methods: {
    ...mapMutations(["trueNameFlag", "systemVer", "parameterArray"]),
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
          this.bck03 = res.data.map.bck03;
          this.loginName = res.data.map.loginName;
          this.loginTime = this.$moment(
            parseFloat(res.data.map.loginTime)
          ).format("YYYY-MM-DD HH:mm:ss");
        }
      });
    },
    init() {
      this.loginPersonInformation();
    }
  },
  mounted() {
    this.init();
  }
};
</script>
