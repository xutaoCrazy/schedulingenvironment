<template>
  <div>
    <Header style="height:45px!important;line-height:35px!important;text-align:right;width:800px">
      <Button type="primary" @click="open">
        <Icon type="md-add" />新增
      </Button>
    </Header>
    <Content>
      <Table border :columns="columns1" :data="data1" class="tabel-padding" width="800"></Table>
    </Content>
    <Modal v-model="modal1" :title="modalTiele" :fullscreen="closes" :loading="loading">
      <p slot="close">
        <Icon type="md-remove" class="icon-colse-works" @click.stop="minimize" />
        <Icon type="md-open" class="icon-colse-works" @click.stop="close" />
        <Icon type="ios-close" style="color:#fff" @click.stop="cancel"></Icon>
      </p>
      <div id>
        <Layout>
          <Content class="workcontent">
            <Form label-position="left" :label-width="100" :model="formCustom" ref="formCustom">
              <FormItem label="班次名称" prop="bco02">
                <Input clearable v-model="formCustom[0].value" name="bco02" />
              </FormItem>
              <FormItem label="颜色">
                <ColorPicker v-model="formCustom[1].value" name="bco06" />
              </FormItem>
              <FormItem label="开始时间">
                <DatePicker
                  type="time"
                  placeholder="开始时间"
                  style="width:100%"
                  v-model="formCustom[2].value"
                  name="bco03"
                ></DatePicker>
              </FormItem>
              <FormItem label="结束时间">
                <DatePicker
                  type="time"
                  placeholder="结束时间"
                  style="width:100%"
                  v-model="formCustom[3].value"
                  name="bco04"
                ></DatePicker>
              </FormItem>
            </Form>
          </Content>
        </Layout>
      </div>
      <div slot="footer">
        <Button type="primary" @click="save" :loading="isBtnLoading">保存</Button>
        <Button style="margin-left: 8px" @click="cancel">取消</Button>
      </div>
    </Modal>
    <div v-show="closeModal" class="moodal-anim-works">
      <div>
        <span>{{iconText}}</span>
      </div>
      <div>
        <Icon type="md-open" class="icon-colse-works" @click="maximization" />
        <Icon type="md-close" class="icon-colse-works icon-magin-left" @click="maxClose" />
      </div>
    </div>
    <div id="mask" v-show="makshow"></div>
  </div>
</template>>
<script>
import "./workforcemanagement.less";
import { axiosFunc } from "@/api/data";
import { loadingShow, loadingHide } from "@/api/loading";
import { setTimeout } from "timers";
export default {
  data() {
    return {
      columns1: [
        {
          title: "",
          type: "index",
          width: 60,
          align: "center"
        },
        {
          title: "班次名称",
          key: "bco02",
          align: "center",
          tooltip: true
        },
        {
          title: "颜色",
          key: "bco06",
          align: "center",
          render: (h, params) => {
            return h("div", {
              style: {
                background: params.row.bco06,
                height: "30px"
              }
            });
          }
        },
        {
          title: "开始时间",
          key: "bco03",
          align: "center",
          tooltip: true
        },
        {
          title: "结束时间",
          key: "bco04",
          align: "center",
          tooltip: true
        },
        {
          title: "操作",
          key: "action",
          width: 100,
          align: "center",
          render: (h, params) => {
            return h(
              "div",
              {
                style: {
                  textAlign: "center"
                }
              },
              [
                h(
                  "img",
                  {
                    style: {
                      marginRight: "5px",
                      cursor: "pointer"
                    },
                    attrs: {
                      src: require("../../../assets/images/edit.png"),
                      title: "编辑"
                    },
                    on: {
                      click: () => {
                        this.show(params);
                      }
                    }
                  },
                  "编辑"
                ),
                h(
                  "img",
                  {
                    style: {
                      marginLeft: "10px",
                      cursor: "pointer"
                    },
                    attrs: {
                      src: require("../../../assets/images/delete.png"),
                      title: "删除"
                    },
                    on: {
                      click: () => {
                        this.remove(params);
                      }
                    }
                  },
                  "Delete"
                )
              ]
            );
          }
        }
      ],
      data1: [],
      modal1: false,
      modalTiele: "新增",
      closes: false,
      closeModal: false,
      makshow: false,
      iconText: "新增",
      loading: true,
      datetime: "",
      isBtnLoading: false,
      formCustom: [
        { name: "bco02", value: "" },
        { name: "bco06", value: "" },
        { name: "bco03", value: "" },
        { name: "bco04", value: "" },
        { name: "bco01", value: "" },
        { name: "bco05", value: "0" }
      ]
    };
  },
  methods: {
    show(params) {
      debugger;
      this.modal1 = true;
      this.modalTiele = "编辑";
      let paramsArr = params.row;
      this.formCustom[0].value = paramsArr.bco02;
      this.formCustom[1].value = paramsArr.bco06;
      this.formCustom[2].value = paramsArr.bco03;
      this.formCustom[3].value = paramsArr.bco04;
      this.formCustom[4].value = paramsArr.bco01;
      this.formCustom[5].value = paramsArr.bco05;
    },
    remove(params) {
      // debugger
      // this.$Modal.confirm({
      //   title: '信息',
      //   content: res.data.resultMsg
      // })
      this.$Modal.confirm({
        title: "提示",
        content: "确认删除当前班次吗？",
        onOk: () => {
          this.promiseShifts(
            "/api/rateweb/cloud/SysSchedule/removeShifts",
            "post",
            { id: params.row.bco01 }
          ).then(res => {
            if (res.data.result === "SUCCESS") {
              this.tabelGetList();
              this.$Message.success({
                content: "删除成功",
                duration: 2
              });
              this.resetFieldsName();
            } else {
              this.$Modal.error({
                title: "信息",
                content: res.data.resultMsg
              });
            }
          });
        },
        onCancel: () => {}
      });
    },
    close() {
      // 弹框最大化
      this.closes = !this.closes;
    },
    open() {
      this.modal1 = true;
      this.modalTiele = "新增";
    },
    minimize() {
      // 弹框最小化
      this.modal1 = false;
      this.closeModal = true;
      this.makshow = true;
    },
    maximization() {
      // 弹框正常
      this.modal1 = true;
      this.closeModal = false;
      this.makshow = false;
    },
    maxClose() {
      // 关闭整个弹窗
      this.closeModal = false;
      this.makshow = false;
      this.resetFieldsName();
    },
    cancel() {
      this.modal1 = false;
      this.resetFieldsName();
      setTimeout(() => {
        this.closes = false;
      }, 300);
    },
    promiseShifts(url, type, params, flag) {
      let data = new Promise((resolve, reject) => {
        let save = axiosFunc(url, type, params, flag);
        resolve(save);
      });
      return data;
    },
    resetFieldsName() {
      this.formCustom[0].value = "";
      this.formCustom[1].value = "";
      this.formCustom[2].value = "";
      this.formCustom[3].value = "";
      this.formCustom[4].value = "";
      this.formCustom[5].value = "0";
    },
    tabelGetList() {
      this.promiseShifts(
        "/api/rateweb/cloud/SysSchedule/getShiftsList",
        "get",
        {}
      ).then(res => {
        if (res.status === 200) {
          this.data1 = res.data;
        }
      });
    },
    save() {
      // 保存
      debugger;
      this.isBtnLoading = true;
      // loadingShow('保存中')
      this.promiseShifts(
        "/api/rateweb/cloud/SysSchedule/saveShifts",
        "post",
        { commformStr: JSON.stringify(this.formCustom) },
        true
      ).then(res => {
        if (res.data.result === "SUCCESS") {
          this.resetFieldsName();
          this.modal1 = false;
          this.$Spin.hide();
          this.isBtnLoading = false;
          this.tabelGetList();
          this.$Message.success({
            content: "保存成功",
            duration: 2
          });
          this.resetFieldsName();
        } else {
          this.isBtnLoading = false;
          this.$Spin.hide();
          this.$Modal.error({
            title: "信息",
            content: res.data.resultMsg
          });
        }
      });
    }
  },
  mounted() {
    this.tabelGetList();
  }
};
</script>
<style scoped>
</style>
