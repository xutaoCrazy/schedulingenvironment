<template>
  <div class="mangement">
    <Layout>
      <Header>
        <Row :gutter="16">
          <Col span="17">
            <Form :label-width="60">
              <i-Col span="5">
                <FormItem label="科室">
                  <Select v-model="Department" filterable clearable @on-change="selectDepartment">
                    <Option
                      v-for="item in DepartmentList"
                      :value="item.bck01"
                      :key="item.bck01"
                    >{{ item.bck03 }}</Option>
                  </Select>
                </FormItem>
              </i-Col>
              <i-Col span="5">
                <FormItem label="职务">
                  <Select v-model="docter" filterable @on-change="selectDepartment">
                    <Option
                      v-for="item in docterList"
                      :value="item.aaa01"
                      :key="item.aaa01"
                    >{{ item.aaa02 }}</Option>
                  </Select>
                </FormItem>
              </i-Col>
              <i-Col span="5">
                <FormItem label="人员">
                  <Select :label-in-value="true" filterable clearable @on-change="selectPersonnel">
                    <Option
                      v-for="item in personnelList"
                      :value="item.bce01"
                      :key="item.bce01"
                    >{{ item.bce03 }}</Option>
                  </Select>
                </FormItem>
              </i-Col>
            </Form>
            <Form :label-width="10">
              <Col span="9">
                <FormItem>
                  <Button type="primary" icon="ios-search" @click="searchTabel">查询</Button>
                  <Checkbox>仅显示有排班的</Checkbox>
                </FormItem>
              </Col>
            </Form>
          </Col>
          <Col span="7" style="text-align:right" class="buttongroup">
            <Button type="primary" @click="batchdeletion=true">批量删除</Button>
            <Button type="primary" @click="batchschedu=true">批量排班</Button>
            <Button type="primary" @click="duplicatescheduling=true">复制排班</Button>
          </Col>
        </Row>
      </Header>
      <Content>
        <Tabs :animated="false" @on-click="handleTab">
          <TabPane label="本周">
            <Table border :columns="columns1" :data="data1" disabled-hover :loading="tabelloading"></Table>
            <Page :total="total" :page-size="5" show-total @on-change="changePage" />
          </TabPane>
          <TabPane label="下周">
            <Table border :columns="columns2" :data="data2" disabled-hover :loading="tabelloading"></Table>
            <Page :total="total" :page-size="5" show-total @on-change="changePage" />
          </TabPane>
          <TabPane label="本月">
            <Table
              border
              :columns="columns3"
              :data="data3"
              disabled-hover
              ref="table"
              :loading="tabelloading"
            ></Table>
            <Page :total="total" :page-size="5" show-total @on-change="changePage" />
          </TabPane>
          <TabPane label="7天内">
            <Table
              border
              :columns="columns4"
              :data="data4"
              disabled-hover
              ref="table"
              :loading="tabelloading"
            ></Table>
            <Page :total="total" :page-size="5" show-total @on-change="changePage" />
          </TabPane>
          <TabPane label="14天内">
            <Table
              border
              :columns="columns5"
              :data="data5"
              disabled-hover
              ref="table"
              :loading="tabelloading"
            ></Table>
            <Page :total="total" :page-size="5" show-total @on-change="changePage" />
          </TabPane>
          <TabPane label="30天内">
            <Table
              border
              :columns="columns6"
              :data="data6"
              disabled-hover
              ref="table"
              :loading="tabelloading"
            ></Table>
            <Page :total="total" :page-size="5" show-total @on-change="changePage" />
          </TabPane>
        </Tabs>
      </Content>
    </Layout>
    <Modal v-model="departModel" title="班次配置">
      <Tabs @on-click="tabTriggerEvent" v-model="tabName">
        <TabPane v-for="tab in tabs" :key="tab" :label="'班次配置' + tab" :name="'name'+tab">
          <Form :label-width="100" style="padding-right:30px" ref="formValidate">
            <FormItem label="班次" :prop="shiftformdata[tab-1].zaa05">
              <Select
                :label-in-value="true"
                v-model="shiftformdata[tab-1].zaa05"
                :clearable="false"
              >
                <Option
                  v-for="item in zaa05List"
                  :value="item.bco02"
                  :key="item.bco01"
                  :data-time="item.bco03"
                  @click.native="getMoreParams(item)"
                  ref="dataTime"
                >{{ item.bco02}}</Option>
              </Select>
            </FormItem>

            <FormItem label="日期" v-show="showDate">
              <Input v-model="sameday" readonly />
            </FormItem>
            <Row>
              <i-Col span="12">
                <FormItem label="开始时间">
                  <TimePicker
                    type="time"
                    placeholder="开始时间"
                    v-model="shiftformdata[tab-1].zaa07"
                    :clearable="false"
                  ></TimePicker>
                </FormItem>
              </i-Col>
              <i-Col span="12">
                <FormItem label="时间">
                  <TimePicker
                    type="time"
                    placeholder="结束时间"
                    v-model="shiftformdata[tab-1].zaa08"
                    :clearable="false"
                  ></TimePicker>
                </FormItem>
              </i-Col>
            </Row>

            <Row>
              <i-Col span="12">
                <FormItem label="科室">
                  <Select v-model="shiftformdata[tab-1].bck03" @on-change="selectBck01" clearable>
                    <Option
                      v-for="item in DepartmentList"
                      :value="item.bck01"
                      :key="item.bck01"
                    >{{ item.bck03 }}</Option>
                  </Select>
                </FormItem>
              </i-Col>
              <i-Col span="12">
                <FormItem label="诊室">
                  <Select v-model="shiftformdata[tab-1].bas02" clearable>
                    <Option
                      v-for="item in bas02List"
                      :value="item.bas02"
                      :key="item.bas01"
                    >{{ item.bas02 }}</Option>
                  </Select>
                </FormItem>
              </i-Col>
            </Row>
            <Row>
              <Col span="12">
                <FormItem label="号别">
                  <Select v-model="shiftformdata[tab-1].bcb01" clearable>
                    <Option
                      v-for="item in bcb01List"
                      :value="item.bcb01"
                      :key="item.bcb01"
                    >{{ item.bcb03 }}</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="时间间隔">
                  <InputNumber clearable v-model="shiftformdata[tab-1].zaa15" style="width:100%" />
                </FormItem>
              </Col>
            </Row>

            <Row>
              <Col span="12">
                <FormItem label="是否启用">
                  <Select v-model="shiftformdata[tab-1].zaa13">
                    <Option
                      v-for="item in zaa13List"
                      :value="item.value"
                      :key="item.value"
                    >{{ item.label }}</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="是否关闭微信" clearable>
                  <Select v-model="shiftformdata[tab-1].wxenabled">
                    <Option
                      v-for="item in wxenabledList"
                      :value="item.value"
                      :key="item.value"
                    >{{ item.label }}</Option>
                  </Select>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <FormItem label="限号数">
                  <InputNumber clearable v-model="shiftformdata[tab-1].zaa12" style="width:100%" />
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="限约数">
                  <InputNumber clearable v-model="shiftformdata[tab-1].zaa11" style="width:100%" />
                </FormItem>
              </Col>
            </Row>
            <FormItem label="备注">
              <Input clearable v-model="shiftformdata[tab-1].zaa09" />
            </FormItem>
          </Form>
        </TabPane>
        <Button type="primary" @click="handleTabsAdd" slot="extra">新增</Button>
      </Tabs>
      <div slot="footer">
        <Button type="primary" @click="save" :loading="isBtnLoading">保存</Button>
        <Button style="margin-left: 8px" @click="cancel">取消</Button>
      </div>
    </Modal>
    <Modal title="批量排班" v-model="batchschedu" width="650" style :mask-closable="false">
      <Form :label-width="100" style="padding-right:30px;overflow:auto;height:400px" ref>
        <Row>
          <i-Col span="12">
            <FormItem label="科室">
              <Select clearable @on-change="selectionScheduling" v-model="batchDat[0].bck01">
                <Option
                  v-for="item in DepartmentList"
                  :value="item.bck01"
                  :key="item.bck01"
                >{{ item.bck03 }}</Option>
              </Select>
            </FormItem>
          </i-Col>
          <i-Col span="12">
            <FormItem label="职务">
              <Select
                filterable
                clearable
                v-model="batchDat[0].aaa01"
                @on-change="selectionScheduling"
              >
                <Option
                  v-for="item in docterList"
                  :value="item.aaa01"
                  :key="item.aaa01"
                >{{ item.aaa02 }}</Option>
              </Select>
            </FormItem>
          </i-Col>
        </Row>
        <Row>
          <i-Col span="12">
            <FormItem label="班次">
              <Select :label-in-value="true" clearable v-model="batchDat[0].zaa05">
                <Option
                  v-for="item in zaa05List"
                  :value="item.bco02"
                  :key="item.bco01"
                  :data-time="item.bco03"
                  @click.native="getMoreParams(item,1)"
                  ref="dataTime"
                >{{ item.bco02}}</Option>
              </Select>
            </FormItem>
          </i-Col>
          <i-Col span="12">
            <FormItem label="号别">
              <Select clearable v-model="batchDat[0].bcb01">
                <Option
                  v-for="item in bcb01List"
                  :value="item.bcb01"
                  :key="item.bcb01"
                >{{ item.bcb03 }}</Option>
              </Select>
            </FormItem>
          </i-Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem label="开始时间">
              <TimePicker
                type="time"
                placeholder="开始时间"
                v-model="batchDat[0].zaa07"
                :transfer="true"
              ></TimePicker>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="结束时间">
              <TimePicker
                type="time"
                placeholder="结束时间"
                v-model="batchDat[0].zaa08"
                :transfer="true"
              ></TimePicker>
            </FormItem>
          </Col>
        </Row>

        <Row>
          <i-Col span="12">
            <FormItem label="限号数">
              <InputNumber clearable v-model="batchDat[0].zaa12" style="width:100%" />
            </FormItem>
          </i-Col>
          <i-Col span="12">
            <FormItem label="限约数">
              <InputNumber clearable v-model="batchDat[0].zaa11" style="width:100%" />
            </FormItem>
          </i-Col>
        </Row>
        <Row>
          <i-Col span="12">
            <FormItem label="诊室">
              <Select clearable v-model="batchDat[0].bas01">
                <Option
                  v-for="item in bas02List"
                  :value="item.bas01"
                  :key="item.bas01"
                >{{ item.bas02 }}</Option>
              </Select>
            </FormItem>
          </i-Col>
          <i-Col span="12">
            <FormItem label="时间间隔">
              <InputNumber clearable v-model="batchDat[0].zaa15" style="width:100%" />
            </FormItem>
          </i-Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem label="开始日期">
              <DatePicker
                type="date"
                placeholder="开始日期"
                v-model="batchDatbegindate"
                :options="optionsBegindate"
              ></DatePicker>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="结束日期">
              <DatePicker
                type="date"
                placeholder="结束日期"
                v-model="batchDatendDate"
                :options="optionsdendDate"
              ></DatePicker>
            </FormItem>
          </Col>
        </Row>

        <Row>
          <i-Col span="12">
            <FormItem label="是否启用">
              <Select v-model="batchDat[0].zaa13">
                <Option
                  v-for="item in zaa13List"
                  :value="item.value"
                  :key="item.value"
                >{{ item.label }}</Option>
              </Select>
            </FormItem>
          </i-Col>
          <i-Col span="12">
            <FormItem label="是否关闭微信">
              <Select v-model="batchDat[0].wxenabled">
                <Option
                  v-for="item in wxenabledList"
                  :value="item.value"
                  :key="item.value"
                >{{ item.label }}</Option>
              </Select>
            </FormItem>
          </i-Col>
        </Row>
        <FormItem label="备注">
          <Input clearable v-model="batchDat[0].zaa09" />
        </FormItem>
        <FormItem label="人员">
          <Transfer
            :data="mockData"
            :target-keys="targetKeys1"
            :render-format="render1"
            @on-change="handleChange1"
            :titles="titleArr"
            :on-selected-change="selectedchange"
          ></Transfer>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" @click="batchSvae" :loading="isBtnLoading">保存</Button>
        <Button style="margin-left: 8px" @click="cancel(1)">取消</Button>
      </div>
    </Modal>
    <Modal title="批量删除" v-model="batchdeletion" width="650" style :mask-closable="false">
      <Form :label-width="100" style="padding-right:30px;overflow:auto;height:480px" ref>
        <Row>
          <Col span="12">
            <FormItem label="开始日期">
              <DatePicker
                type="date"
                placeholder="开始日期"
                v-model="delbatchDat.startDate"
                :options="optionsBegindate"
              ></DatePicker>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="结束日期">
              <DatePicker
                type="date"
                placeholder="结束日期"
                v-model="delbatchDat.endDate"
                :options="optionsdendDate"
              ></DatePicker>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="24">
            <FormItem label="星期">
              <Checkbox
                style="float:left"
                :value="checkAll"
                @click.prevent.native="handleCheckAll"
              >全部</Checkbox>
              <CheckboxGroup v-model="checkAllGroup" @on-change="checkAllGroupChange" size="large">
                <Checkbox label="1">周一</Checkbox>
                <Checkbox label="2">周二</Checkbox>
                <Checkbox label="3">周三</Checkbox>
                <Checkbox label="4">周四</Checkbox>
                <Checkbox label="5">周五</Checkbox>
                <Checkbox label="6">周六</Checkbox>
                <Checkbox label="7">周日</Checkbox>
              </CheckboxGroup>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="24">
            <FormItem label="科室">
              <Select clearable @on-change="delScheduling" v-model="delbatchDat.bck01">
                <Option
                  v-for="item in DepartmentList"
                  :value="item.bck01"
                  :key="item.bck01"
                >{{ item.bck03 }}</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="24">
            <FormItem label="职务">
              <Select filterable clearable v-model="delbatchDat.aaa01" @on-change="delScheduling">
                <Option
                  v-for="item in docterList"
                  :value="item.aaa01"
                  :key="item.aaa01"
                >{{ item.aaa02 }}</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <FormItem label="人员">
          <Transfer
            :data="delmockData"
            :target-keys="targetKeys2"
            :render-format="render2"
            @on-change="handleChange3"
            :titles="titleArr"
            :on-selected-change="selectedchange"
          ></Transfer>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" @click="delSvae" :loading="isBtnLoading">保存</Button>
        <Button style="margin-left: 8px" @click="batchdeletion=false">取消</Button>
      </div>
    </Modal>

    <Modal title="复制排班" v-model="duplicatescheduling" width="650" style :mask-closable="false">
      <Form :label-width="100" style="padding-right:30px;overflow:auto;height:530px" ref>
        <Row>
          <Col span="24">
            <FormItem label="科室">
              <Select clearable @on-change="dupScheduling" v-model="dupbatchDat.bck01">
                <Option
                  v-for="item in DepartmentList"
                  :value="item.bck01"
                  :key="item.bck01"
                >{{ item.bck03 }}</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="24">
            <FormItem label="职务">
              <Select filterable clearable v-model="dupbatchDat.aaa01" @on-change="dupScheduling">
                <Option
                  v-for="item in docterList"
                  :value="item.aaa01"
                  :key="item.aaa01"
                >{{ item.aaa02 }}</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <FormItem label="人员">
          <Transfer
            :data="dupmockData"
            :target-keys="targetKeys3"
            :render-format="render3"
            @on-change="handleChange3"
            :titles="titleArr"
            :on-selected-change="selectedchange"
          ></Transfer>
        </FormItem>
        <Row>
          <Col span="24">
            <FormItem>
              <RadioGroup size="large" @on-change="radioAllGroupChange">
                <Radio label="1">本周</Radio>
                <Radio label="2">上周</Radio>
                <Radio label="3">本月</Radio>
              </RadioGroup>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem label="复制开始日期">
              <Input placeholder readonly v-model="dupbatchDat.startDate"></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="复制结束日期">
              <Input placeholder readonly v-model="dupbatchDat.endDate"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem label="目标开始日期">
              <DatePicker
                type="date"
                placeholder="目标开始日期"
                v-model="delbatchDat.startDate"
                :options="optionsBegindate"
              ></DatePicker>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="目标结束日期">
              <DatePicker
                type="date"
                placeholder="目标结束日期"
                v-model="delbatchDat.endDate"
                :options="optionsdendDate"
              ></DatePicker>
            </FormItem>
          </Col>
        </Row>
      </Form>
      <div slot="footer">
        <Button type="primary" @click="delSvae" :loading="isBtnLoading">保存</Button>
        <Button style="margin-left: 8px" @click>取消</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import "./index.less";
import { axiosFunc } from "@/api/data";
import { calculatingDate, getDateStr, setlastDay, getTime } from "@/api/date";
export default {
  data() {
    return {
      columns1: [], //本周
      columns2: [], //下周
      columns3: [], //本月
      columns4: [], //七天内
      columns5: [], //14天内
      columns6: [], //30天内
      titleArr: ["全部人员", "已选人员"],
      data1: [],
      data2: [],
      data3: [],
      data4: [],
      data5: [],
      data6: [],
      tabName: "name1",
      checkAll: false,
      showTrue: {},
      tabeNum: 0,
      docter: "",
      docterList: "",
      Department: "",
      DepartmentList: "",
      departModel: false,
      batchschedu: false,
      batchdeletion: false, //批量删除
      duplicatescheduling: false, //复制排班
      tabs: 1,
      personnelList: "",
      zaa05List: [],
      isBtnLoading: false,
      tabelloading: false,
      bce01Arr: [],
      showDate: true,
      showType: "",
      sameday: "",
      total: 0,
      pageSize: 5,
      curr: 1,
      shiftformdata: this.shiftformdataclear(),
      batchDat: [
        {
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
          bck01: "",
          zaa15: 0
        }
      ],
      delbatchDat: {
        bck01: "",
        startDate: "",
        endDate: "",
        weekNum: "",
        userIds: []
      },
      dupbatchDat: {
        bck01: "",
        aaa01: "",
        startDate: "",
        endDate: ""
      },
      batchDatbegindate: "",
      batchDatendDate: "",
      tabId: 1,
      tabindex: 0,
      bas02List: [], // 诊室集合
      bcb01List: "", // 挂号号别
      checkAllGroup: [],
      zaa13List: [
        {
          label: "正常",
          value: "0"
        },
        {
          label: "停诊",
          value: "1"
        },
        {
          label: "删除",
          value: "2"
        }
      ],
      wxenabledList: [
        {
          label: "否",
          value: "0"
        },
        {
          label: "是",
          value: "1"
        }
      ],
      bce03Name: "",
      bce01Name: "",
      startDate: "",
      endDate: "",
      savebeginDate: "",
      saveEndDate: "",
      mockData: [],
      delmockData: [],
      dupmockData: [],
      targetKeys1: [],
      targetKeys2: [],
      targetKeys3: [],
      newTargetKeysArr: [],
      newTargetKeysArr2: [],
      newTargetKeysArr3: [],
      optionsBegindate: {
        disabledDate(date) {
          return date && date.valueOf() < Date.now() - 86400000;
        }
      },
      optionsdendDate: {
        disabledDate(date) {
          return date && date.valueOf() < Date.now() - 86400000;
        }
      },
      tabelIndex: 1,
      imgIndex: "", // 当前显示的删除图标编号,
      TooltipFlag: false //左侧悬浮框显示隐藏
    };
  },
  methods: {
    shiftformdataclear() {
      let arr = [
        {
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
          bce01: this.bce01Name,
          bce03: this.bce03Name,
          bck01: this.Department
        }
      ];
      return arr;
    },
    handleCheckAll() {
      //CheckBox 全选反选
      debugger;
      this.checkAll = !this.checkAll;
      if (this.checkAll) {
        this.checkAllGroup = ["1", "2", "3", "4", "5", "6", "7"];
      } else {
        this.checkAllGroup = [];
      }
    },
    checkAllGroupChange(data) {
      //点击单个CheckBox 选择

      if (data.length === 7) {
        this.checkAll = true;
      } else {
        this.checkAll = false;
      }
    },
    radioAllGroupChange(data) {
      debugger;

      let weekOfday = parseInt(this.$moment().format("d")); // 计算今天是这周第几天 周日为一周中的第一天
      switch (data) {
        case "1": //本周
          this.dupbatchDat.startDate = this.$moment(
            this.$moment().subtract(weekOfday, "days") + 86400000
          ).format("YYYY-MM-DD"); // 周一日期
          this.dupbatchDat.endDate = this.$moment(
            this.$moment().add(7 - weekOfday - 1, "days") + 86400000
          ).format("YYYY-MM-DD"); // 周日日期

          break;
        case "2": //上周
          this.dupbatchDat.startDate = this.$moment(
            this.$moment().subtract(weekOfday + 7, "days") + 86400000
          ).format("YYYY-MM-DD"); // 周一日期
          this.dupbatchDat.endDate = this.$moment(
            this.$moment().subtract(weekOfday + 1, "days") + 86400000
          ).format("YYYY-MM-DD"); // 周日日期

          break;
        case "3": //本月
          this.dupbatchDat.startDate =
            this.$moment()
              .add("month", 0)
              .format("YYYY-MM") + "-01";
          this.dupbatchDat.endDate = this.$moment(this.dupbatchDat.startDate)
            .add("month", 1)
            .add("days", -1)
            .format("YYYY-MM-DD");

          break;
      }
    },
    promiseShifts(url, type, params, flag) {
      let data = new Promise((resolve, reject) => {
        let save = axiosFunc(url, type, params, flag);
        resolve(save);
      });
      return data;
    },
    tableInit() {
      // 加载表格数据
      this.tabelloading = true;
      this.promiseShifts(
        "/api/rateweb/cloud/SysSchedule/getSearchScheduRecordsList",
        "get",
        {
          bck01: this.Department,
          bce01: this.bce01Arr.join(","),
          startDate: this.startDate,
          endDate: this.endDate,
          page: 1,
          rows: 500
        }
      ).then(res => {
        this.tabelloading = false;
        if (res.status === 200) {
          switch (this.tabindex) {
            case 1:
              this.data1 = res.data.list;
              this.columns1 = calculatingDate(1, this.data1, this);
              break;
            case 2:
              this.data2 = res.data.list;
              this.columns2 = calculatingDate(2, this.data2, this);
              break;
            case 3:
              this.data3 = res.data.list;
              this.columns3 = calculatingDate(3, this.data3, this);
              break;
            case 4:
              this.data4 = res.data.list;
              this.columns4 = calculatingDate(4, this.data4, this);
              break;
            case 5:
              this.data5 = res.data.list;
              this.columns5 = calculatingDate(5, this.data5, this);
              break;
            case 6:
              this.data6 = res.data.list;
              this.columns6 = calculatingDate(6, this.data6, this);
              break;
            case 7:
              this.data7 = res.data.list;
              this.columns7 = calculatingDate(7, this.data7, this);
              break;
            case 8:
              this.data8 = res.data.list;
              this.columns8 = calculatingDate(8, this.data8, this);
              break;
          }
        }
      });
    },
    selectDoctor() {
      this.promiseShifts(
        "/api/rateweb/cloud/SysSchedule/getBusinessList",
        "get",
        {}
      ).then(res => {
        if (res.status === 200) {
          this.docterList = res.data;
        }
      });
      this.promiseShifts("/api/rateweb/cloud/SysSchedule/getBck1List", "get", {
        keyWord: "",
        page: 1,
        rows: 30
      }).then(res => {
        // 科室

        if (res.status === 200 && res.data.result === "SUCCESS") {
          this.DepartmentList = res.data.list;
        }
      });
      this.promiseShifts(
        "/api/rateweb/cloud/SysSchedule/getShiftsList",
        "get",
        {}
      ).then(res => {
        // 班次

        if (res.status === 200 && res.data) {
          this.zaa05List = res.data;
        }
      });
      this.promiseShifts(
        "/api/rateweb/cloud/SysSchedule/getCategory",
        "get",
        {}
      ).then(res => {
        // 挂号号别

        if (res.status === 200) {
          this.bcb01List = res.data;
        }
      });
    },

    init() {
      this.selectDoctor();
      let $json = calculatingDate(1, "", this);
      this.columns1 = this.columns1.concat($json);
      this.handleTab(0);
    },
    show(params, flag, timeJson, zaa01, $color, $item) {
      this.tabs = 1;
      this.tabeNum = 0;
      this.tabName = "name1";
      if (zaa01 && $color === "null") {
        this.showType = 4;
        this.promiseShifts(
          "/api/rateweb/cloud/SysSchedule/saveSchedule",
          "post",
          { zaa01: zaa01, type: this.showType },
          true
        ).then(res => {
          if (res.status === 200 && res.data.result === "SUCCESS") {
            this.tableInit();
            this.$Notice.success({
              title: "保存排班成功"
            });
          } else {
            this.$Modal.error({
              title: "信息",
              content: res.data.resultMsg,
              className: "vertical-center-modal"
            });
          }
        });
      } else {
        this.shiftformdata = [];
        this.shiftformdata.push({
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
          bce01: this.bce01Name,
          bce03: this.bce03Name,
          bck01: this.Department
        });
        this.shiftformdata[0].bce01 = parseFloat(
          params.row.bce03.split(",")[1]
        );
        this.shiftformdata[0].bce03 = params.row.bce03.split(",")[0];
        this.bce01Name = parseFloat(params.row.bce03.split(",")[1]);
        this.bce03Name = params.row.bce03.split(",")[0];
        this.departModel = true;
        this.showType = flag;

        switch (flag) {
          case 1:
            this.showDate = false;
            this.savebeginDate = timeJson.sartDate;
            this.saveEndDate = timeJson.endDate;
            break;
          case 2:
            this.showDate = true;
            this.savebeginDate = timeJson;
            this.saveEndDate = timeJson;
            this.sameday = timeJson;
            break;
        }
        if (zaa01 && $color) {
          this.promiseShifts(
            "/api/rateweb/cloud/SysSchedule/getOneScheduById",
            "get",
            { id: zaa01 }
          ).then(res => {
            // 挂号号别

            this.showType = 3;
            if (res.status === 200) {
              let formData = this.shiftformdata[0];
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
              this.selectBck01($data.bck01, $data.bas02);
            }
          });
        }
      }
    },

    handleTabsAdd() {
      // 点击新增tabs 动态添加保存数据

      if (this.zaa05List.length <= this.tabs) {
        return false;
      }
      this.shiftformdata.push({
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
        bce01: this.bce01Name,
        bce03: this.bce03Name,
        bck01: this.Department,
        zaa15: 0
      });
      this.tabs++;
    },
    selectDepartment(flag, $bck01) {
      // 选择科室、职务回填人员
      this.promiseShifts(
        "/api/rateweb/cloud/SysSchedule/getPersonnelList",
        "get",
        { id: this.Department, aaa01: this.docter }
      ).then(res => {
        if (res.status === 200) {
          this.personnelList = res.data;
        }
      });
      this.curr = 1;
      this.shiftformdata[0].bck01 = this.Department;
      this.getpersonnelPageList();
    },
    selectionScheduling(val) {
      // 批量排班多选

      this.promiseShifts(
        "/api/rateweb/cloud/SysSchedule/getPersonnelList",
        "get",
        { id: this.batchDat[0].bck01, aaa01: this.batchDat[0].aaa01 }
      ).then(res => {
        if (res.status === 200 && res.data.length) {
          this.mockData = [];
          this.targetKeys1 = [];
          this.newTargetKeysArr = [];
          for (let i = 0; i < res.data.length; i++) {
            this.mockData.push({
              key: res.data[i].bce01,
              label: res.data[i].bce03
            });
          }
        }
      });
      this.promiseShifts("/api/rateweb/cloud/SysSchedule/getOffice", "get", {
        id: val
      }).then(res => {
        if (res.status === 200) {
          this.bas02List = res.data;
        }
      });
    },
    delScheduling(val) {
      // 批量删除排班多选

      this.promiseShifts(
        "/api/rateweb/cloud/SysSchedule/getPersonnelList",
        "get",
        { id: this.delbatchDat.bck01, aaa01: this.delbatchDat.aaa01 }
      ).then(res => {
        if (res.status === 200 && res.data.length) {
          this.delmockData = [];
          this.targetKeys2 = [];
          this.newTargetKeysArr2 = [];
          for (let i = 0; i < res.data.length; i++) {
            this.delmockData.push({
              key: res.data[i].bce01,
              label: res.data[i].bce03
            });
          }
        }
      });
      this.promiseShifts("/api/rateweb/cloud/SysSchedule/getOffice", "get", {
        id: val
      }).then(res => {
        if (res.status === 200) {
          this.bas02List = res.data;
        }
      });
    },
    dupScheduling(val) {
      // 批量删除排班多选
      this.promiseShifts(
        "/api/rateweb/cloud/SysSchedule/getPersonnelList",
        "get",
        { id: this.dupbatchDat.bck01, aaa01: this.dupbatchDat.aaa01 }
      ).then(res => {
        if (res.status === 200 && res.data.length) {
          this.dupmockData = [];
          this.targetKeys3 = [];
          this.newTargetKeysArr3 = [];
          for (let i = 0; i < res.data.length; i++) {
            this.dupmockData.push({
              key: res.data[i].bce01,
              label: res.data[i].bce03
            });
          }
        }
      });
      this.promiseShifts("/api/rateweb/cloud/SysSchedule/getOffice", "get", {
        id: val
      }).then(res => {
        if (res.status === 200) {
          this.bas02List = res.data;
        }
      });
    },
    render1(item) {
      return item.label;
    },
    render2(item) {
      return item.label;
    },
    render3(item) {
      return item.label;
    },
    handleChange1(newTargetKeys, direction, moveKeys) {
      //  点击左边右边 图标 切换  存储人已选人员列表
      this.targetKeys1 = newTargetKeys;

      this.newTargetKeysArr = [];
      this.mockData.filter((item, index) => {
        if (newTargetKeys.indexOf(item.key) > -1) {
          this.newTargetKeysArr.push({
            bce01: item.key,
            bce03: item.label
          });
        }
      });
    },
    handleChange2(newTargetKeys, direction, moveKeys) {
      debugger;
      //批量删除
      //  点击左边右边 图标 切换  存储人已选人员列表
      this.targetKeys2 = newTargetKeys;
      this.newTargetKeysArr2 = [];
      this.delbatchDat.userIds = newTargetKeys;
      this.delmockData.filter((item, index) => {
        if (newTargetKeys.indexOf(item.key) > -1) {
          this.newTargetKeysArr2.push(item.key);
          this.delbatchDat.userIds = this.newTargetKeysArr2;
        }
      });
    },
    handleChange3(newTargetKeys, direction, moveKeys) {
      debugger;
      //复制排班
      this.targetKeys3 = newTargetKeys;
      this.newTargetKeysArr3 = [];
      this.delbatchDat.userIds = newTargetKeys;
      this.dupmockData.filter((item, index) => {
        if (newTargetKeys.indexOf(item.key) > -1) {
          this.newTargetKeysArr2.push(item.key);
          this.delbatchDat.userIds = this.newTargetKeysArr3;
        }
      });
    },
    selectedchange(sourceSelectedKeys, targetSelectedKeys) {},

    getpersonnelPageList() {
      // 加载表格
      this.promiseShifts(
        "/api/rateweb/cloud/SysSchedule/getPersonnelPageList",
        "get",
        {
          id: this.Department,
          aaa01: this.docter,
          page: this.curr,
          rows: this.pageSize
        }
      ).then(res => {
        if (res.status === 200 && res.data.rows != null) {
          this.bce01Arr = [];
          this.total = res.data.total;
          for (let i = 0; i < res.data.rows.length; i++) {
            this.bce01Arr.push(res.data.rows[i].bce01);
          }
          this.tableInit();
        }
      });
    },
    getMoreParams(item, index) {
      debugger;
      // 选择班次 回填开始时间和结束时间
      if (index === 1) {
        this.batchDat[0].zaa07 = item.bco03;
        this.batchDat[0].zaa08 = item.bco04;
      } else {
        this.shiftformdata[this.tabeNum].zaa07 = item.bco03;
        this.shiftformdata[this.tabeNum].zaa08 = item.bco04;
      }
    },
    selectBck01(val, selcted) {
      // 选择科室 回填诊室
      this.promiseShifts("/api/rateweb/cloud/SysSchedule/getOffice", "get", {
        id: val
      }).then(res => {
        if (res.status === 200) {
          this.bas02List = res.data;
        }
        if (selcted) {
          this.shiftformdata[0].bas02 = selcted;
        }
      });
    },
    tabTriggerEvent(name, index) {
      debugger;
      this.tabeNum = parseFloat(name.split("name")[1]) - 1;
    },
    save() {
      //排班
      this.isBtnLoading = true;
      this.promiseShifts(
        "/api/rateweb/cloud/SysSchedule/saveSchedule",
        "post",
        {
          commformStr: JSON.stringify(this.shiftformdata),
          type: this.showType,
          beginDate: this.savebeginDate,
          endDate: this.saveEndDate
        },
        true
      ).then(res => {
        if (res.status === 200 && res.data.result === "SUCCESS") {
          this.shiftformdataclear();
          this.departModel = !this.departModel;
          this.tabs = 1;
          this.tableInit();
          this.$Message.success({
            content: "保存成功",
            duration: 2
          });
        } else {
          this.$Modal.error({
            title: "信息",
            content: res.data.resultMsg,
            className: "vertical-center-modal"
          });
        }
        this.isBtnLoading = false;
      });
    },
    batchSvae() {
      // 批量排班
      this.isBtnLoading = true;
      this.promiseShifts(
        "/api/rateweb/cloud/SysSchedule/saveSchedule",
        "post",
        {
          commformStr: JSON.stringify(this.batchDat),
          type: 5,
          beginDate: this.$moment(this.batchDatbegindate).format(
            "YYYY-MM-DD 00:00:00"
          ),
          endDate: this.$moment(this.batchDatendDate).format(
            "YYYY-MM-DD 23:59:59"
          ),
          userListStr: JSON.stringify(this.newTargetKeysArr)
        },
        true
      ).then(res => {
        if (res.status === 200 && res.data.result === "SUCCESS") {
          this.curr = 1;
          this.tableInit();
          this.batchschedu = false;
          this.$Message.success({
            content: "保存成功",
            duration: 2
          });
        } else {
          this.$Modal.error({
            title: "信息",
            content: res.data.resultMsg,
            className: "vertical-center-modal"
          });
        }
        this.isBtnLoading = false;
      });
    },
    delSvae() {
      //批量删除保存
      // this.isBtnLoading = true;
      debugger;
      if (this.checkAllGroup.length == 7) {
        this.delbatchDat.weekNum = "";
      } else {
        this.delbatchDat.weekNum = this.checkAllGroup.join(",");
      }
      this.delbatchDat.userIds = this.delbatchDat.userIds.join(",");
      this.delbatchDat.startDate = this.$moment(
        this.delbatchDat.startDate
      ).format("YYYY-MM-DD");
      this.delbatchDat.endDate = this.$moment(this.delbatchDat.endDate).format(
        "YYYY-MM-DD"
      );
      this.promiseShifts(
        "/api/rateweb/cloud/SysSchedule/removeBatchSourceData",
        "post",
        this.delbatchDat,
        true
      ).then(res => {
        if (res.status === 200 && res.data.result === "SUCCESS") {
          this.batchdeletion = false;
          this.$Message.success({
            content: res.data.resultMsg,
            duration: 2
          });

          this.curr = 1;
          this.tableInit();
        } else {
          this.$Modal.error({
            title: "信息",
            content: res.data.resultMsg,
            className: "vertical-center-modal"
          });
        }
        this.isBtnLoading = false;
      });
    },
    cancel(index) {
      if (index === 1) {
        this.batchschedu = !this.batchschedu;
      } else {
        this.departModel = !this.departModel;
        this.tabs = 1;
        this.tabName = "name1";
      }
    },
    selectPersonnel(val) {
      this.bce01Name = val.value;
      this.bce03Name = val.label;
      this.bce01Arr = [];
      this.bce01Arr.push(val.value);
      this.total = 1;
      this.tableInit();
    },
    searchTabel() {
      this.tableInit();
    },
    handleTab(index) {
      debugger;
      // 点击tab加载时间
      let now = new Date(); // 当前日期
      let nowDayOfWeek = now.getDay();
      this.tabindex = index + 1;
      switch (index) {
        case 0:
          this.startDate = getDateStr(0).year + " " + "00:00:00";
          this.endDate = getDateStr(7 - nowDayOfWeek).year + " " + "23:59:59";
          break;
        case 1:
          this.startDate = getDateStr(0, true).year + " " + "00:00:00";
          this.endDate = getDateStr(6, true).year + " " + "23:59:59";
          break;
        case 2:
          var nows = new Date(); // 当前日期
          var nowMonth = nows.getMonth() + 1; // 当前月
          var nowYear = nows.getYear(); // 当前年
          nowYear += nowYear < 2000 ? 1900 : 0;
          var dateLen = new Date(nowYear, nowMonth, 0).getDate();
          this.startDate = getDateStr(0, false).year + " " + "00:00:00";
          this.endDate = getDateStr(dateLen - 1, false).year + " " + "23:59:59";
          break;
        case 3:
          this.startDate = getDateStr().year + " " + "00:00:00";
          this.endDate = getDateStr(6).year + " " + "23:59:59";
          break;
        case 4:
          this.startDate = getDateStr().year + " " + "00:00:00";
          this.endDate = getDateStr(13).year + " " + "23:59:59";
          break;
        case 5:
          this.startDate = getDateStr().year + " " + "00:00:00";
          this.endDate = getDateStr(29).year + " " + "23:59:59";
          break;
      }
      this.tableInit();
    },
    changePage(curr) {
      this.curr = curr;
      this.getpersonnelPageList();
    },
    removeWork(zaa01, e) {
      console.log(zaa01);
      var evt = e || window.event;
      evt.stopPropagation(); //阻止自身冒泡事件
      this.promiseShifts(
        "/api/rateweb/cloud/SysSchedule/removeSourceData",
        "post",
        {
          id: zaa01
        }
      ).then(res => {
        if (res.status === 200 && res.data.result === "SUCCESS") {
          this.$Message.success({
            content: "删除成功",
            duration: 2
          });
          this.tableInit();
        } else {
          this.$Modal.error({
            title: "信息",
            content: res.data.resultMsg,
            className: "vertical-center-modal"
          });
        }
      });
    }
  },
  mounted() {
    this.init();
  }
};
</script>
<style lang="scss" scoped>
</style>
