<template>
  <div class="mangement">
    <Layout>
      <Header style="background:#f9f9f9">
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
                  <Select
                    :label-in-value="true"
                    filterable
                    clearable
                    @on-change="selectPersonnel"
                    @on-clear="selectPeronClear"
                  >
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
                  <Checkbox v-model="showschedules" @on-change="showschedulesChange">仅显示有排班的</Checkbox>
                </FormItem>
              </Col>
            </Form>
          </Col>
          <Col span="7" style="text-align:right" class="buttongroup">
            <Button
              type="primary"
              @click="batchdeletion=true"
              v-show="btnCode.indexOf('plsc') !=-1?true:false"
            >批量删除</Button>
            <Button
              type="primary"
              @click="batchschedu=true"
              v-show="btnCode.indexOf('plpb') !=-1?true:false"
            >批量排班</Button>
            <Button
              type="primary"
              @click="duplicatescheduling=true"
              v-show="btnCode.indexOf('fzpb') !=-1?true:false"
            >复制排班</Button>
          </Col>
        </Row>
      </Header>
      <Content>
        <Tabs :animated="false" @on-click="handleTab">
          <TabPane label="本周">
            <Table border :columns="columns1" :data="data1" disabled-hover :loading="tabelloading"></Table>
            <Page :total="total" :page-size="5" :current="curr" show-total @on-change="changePage" />
          </TabPane>
          <TabPane label="下周">
            <Table border :columns="columns2" :data="data2" disabled-hover :loading="tabelloading"></Table>
            <Page :total="total" :current="curr" :page-size="5" show-total @on-change="changePage" />
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
            <Page :total="total" :current="curr" :page-size="5" show-total @on-change="changePage" />
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
            <Page :total="total" :current="curr" :page-size="5" show-total @on-change="changePage" />
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
            <Page :total="total" :current="curr" :page-size="5" show-total @on-change="changePage" />
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
                  <Select v-model="shiftformdata[tab-1].bck01" @on-change="selectBck01" clearable>
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
                  <Select v-model="shiftformdata[tab-1].bas02" clearable :transfer="true">
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
                  <Select v-model="shiftformdata[tab-1].bcb01" clearable :transfer="true">
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
                  <Select v-model="shiftformdata[tab-1].zaa13" :transfer="true">
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
                  <Select v-model="shiftformdata[tab-1].wxenabled" :transfer="true">
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
                <FormItem label="限约数">
                  <InputNumber clearable v-model="shiftformdata[tab-1].zaa11" style="width:100%" />
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="备注">
                  <Input clearable v-model="shiftformdata[tab-1].zaa09" />
                </FormItem>
              </Col>
            </Row>
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
      <Form
        :label-width="100"
        style="padding-right:30px;overflow:auto;height:400px"
        ref="batchDat[0]"
        :model="batchDat[0]"
        :rules="ruleValidate"
      >
        <Row>
          <i-Col span="12">
            <FormItem label="科室" prop="bck01">
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
                :clearable="false"
              ></TimePicker>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="结束时间">
              <TimePicker
                type="time"
                placeholder="结束时间"
                v-model="batchDat[0].zaa08"
                :clearable="false"
              ></TimePicker>
            </FormItem>
          </Col>
        </Row>

        <Row>
          <i-Col span="12">
            <FormItem label="是否生成号源">
              <Select v-model="isSource">
                <Option
                  v-for="item in isSourceArr"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></Option>
              </Select>
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
                :transfer="true"
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
                :transfer="true"
              ></DatePicker>
            </FormItem>
          </Col>
        </Row>

        <Row>
          <i-Col span="12">
            <FormItem label="是否启用">
              <Select v-model="batchDat[0].zaa13" :transfer="true">
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
              <Select v-model="batchDat[0].wxenabled" :transfer="true">
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
          ></Transfer>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" @click="batchSvae" :loading="isBtnLoading">保存</Button>
        <Button style="margin-left: 8px" @click="batchClear">取消</Button>
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
            @on-change="handleChange2"
            :titles="titleArr"
          ></Transfer>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" @click="delSvae" :loading="isBtnLoading">保存</Button>
        <Button style="margin-left: 8px" @click="delclear">取消</Button>
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
          ></Transfer>
        </FormItem>
        <Row>
          <Col span="24">
            <FormItem>
              <RadioGroup size="large" v-model="weekradio" @on-change="radioAllGroupChange">
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
              <DatePicker
                type="date"
                placeholder="复制开始日期"
                v-model="dupbatchDat.startDate"
                format="yyyy-MM-dd"
                :transfer="true"
                :options="optionsBegindate"
                @on-change="timeStartModification"
                @on-clear="timeClear"
              ></DatePicker>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="复制结束日期">
              <DatePicker
                type="date"
                placeholder="复制结束日期"
                v-model="dupbatchDat.endDate"
                format="yyyy-MM-dd"
                :transfer="true"
                :options="optionsdendDate"
                @on-change="timeStartModification"
                @on-clear="timeClear"
              ></DatePicker>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem label="目标开始日期">
              <DatePicker
                type="date"
                placeholder="目标开始日期"
                v-model="delbatchDat.targetstarttime"
                :options="optionsMubiaoBegindate"
                @on-change="timeModification"
                :disabled="timedis"
              ></DatePicker>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="目标结束日期">
              <DatePicker
                type="date"
                placeholder="目标结束日期"
                v-model="delbatchDat.targetendtime"
                :disabled="true"
              ></DatePicker>
            </FormItem>
          </Col>
        </Row>
      </Form>
      <div slot="footer">
        <Button type="primary" @click="copySvae" :loading="isBtnLoading">保存</Button>
        <Button style="margin-left: 8px" @click="duplicatescheduling=false">取消</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import "./index.less";
import { axiosFunc, promiseShifts } from "@/api/data";
import { calculatingDate, getDateStr, setlastDay, getTime } from "@/api/date"; //获取时间
import {
  tableInit,
  getpersonnelPageList,
  selectDoctor
} from "@/common/loadTabel"; //加载表格
import {
  shiftformdataclear,
  bathClearReset,
  delclearReset,
  cancelReset
} from "@/common/resetFields"; //清空
import { scheduShow } from "@/common/schedulmode"; //弹窗
import { tabWeek, shiftDeletion } from "@/common/week"; //时间
import { mapState, mapMutations } from "vuex";
import {
  singleShiftsCheduling,
  batchSchedulingPreservation,
  deleteScheduling,
  saveTabelPerson,
  singleDeletion,
  copySaveAjax
} from "@/common/save"; //保存
import { checkPermission } from "@/api/jsonp"; //jsonp
export default {
  data() {
    return {
      ruleValidate: {
        bcak01: [
          {
            required: true,
            message: "The name cannot be empty",
            trigger: "blur"
          }
        ]
      },
      timedis: true, //复制开始日期有值时  才能选择目标日期时间
      columns1: [], //本周
      columns2: [], //下周
      columns3: [], //本月
      columns4: [], //七天内
      columns5: [], //14天内
      columns6: [], //30天内
      weekradio: "",
      titleArr: ["全部人员", "已选人员"],
      showschedules: false,
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
      isSource: 5,
      isSourceArr: [{ label: "是", value: 5 }, { label: "否", value: 6 }],
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
      shiftformdata: shiftformdataclear(this),
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
        targetstarttime: "",
        targetendtime: "",
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
        //复制开始时间
        disabledDate(date) {
          return date && date.valueOf() < Date.now() - 86400000;
        }
      },
      optionsdendDate: {
        //复制结束时间
        disabledDate: date => {
          let startTimes = this.dupbatchDat.startDate
            ? new Date(this.dupbatchDat.startDate).valueOf() +
              24 * 60 * 60 * 1000
            : Date.now();

          return date && date.valueOf() < startTimes;
        }
      },
      optionsMubiaoBegindate: {
        //目标开始时间
        disabledDate: date => {
          let startTime = this.dupbatchDat.endDate
            ? new Date(this.dupbatchDat.endDate).valueOf() + 24 * 60 * 60 * 1000
            : Date.now();

          return date && date.valueOf() < startTime;
        }
      },
      tabelIndex: 1,
      imgIndex: "", // 当前显示的删除图标编号,
      TooltipFlag: false, //左侧悬浮框显示隐藏
      tableType: 0
    };
  },
  computed: {
    ...mapState(["btnCode", "centerurl", "userId", "loginName", "jsessionids"])
  },
  methods: {
    ...mapMutations(["btnCodes"]),
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
    selectPeronClear() {
      //仅显示当前排班
      this.curr = 1;
      getpersonnelPageList(this);
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
      shiftDeletion(this, data);
      this.timedis = false;
      this.timeClear(true);
    },
    init() {
      debugger;
      selectDoctor(this);
      this.permission(); //查权限
      let $json = calculatingDate(1, "", this);
      this.columns1 = this.columns1.concat($json);
      this.handleTab(0);
    },
    show(params, flag, timeJson, zaa01, $color, $item) {
      //打开弹窗
      scheduShow(params, flag, timeJson, zaa01, $color, $item, this);
    },
    showschedulesChange(val) {
      // 仅显示有排班的
      debugger;
      this.curr = 1;
      if (val) {
        this.tableType = 1;
      } else {
        this.tableType = 0;
      }
      getpersonnelPageList(this);
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
        zaa15: 0,
        zaa01: null,
        bce01: this.bce01Name,
        bce03: this.bce03Name,
        bck01: this.Department
      });

      this.tabs++;
    },
    selectDepartment(flag, $bck01) {
      // 选择科室、职务回填人员
      promiseShifts("/rateweb/cloud/SysSchedule/getPersonnelList", "get", {
        id: this.Department,
        aaa01: this.docter
      }).then(res => {
        if (res.status === 200) {
          this.personnelList = res.data;
        }
      });
      this.curr = 1;
      this.shiftformdata[0].bck01 = this.Department;
      getpersonnelPageList(this);
    },
    selectionScheduling(val) {
      // 批量排班多选
      promiseShifts("/rateweb/cloud/SysSchedule/getPersonnelList", "get", {
        id: this.batchDat[0].bck01,
        aaa01: this.batchDat[0].aaa01
      }).then(res => {
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
      promiseShifts("/rateweb/cloud/SysSchedule/getOffice", "get", {
        id: val
      }).then(res => {
        if (res.status === 200) {
          this.bas02List = res.data;
        }
      });
    },
    delScheduling(val) {
      // 批量删除排班多选
      promiseShifts("/rateweb/cloud/SysSchedule/getPersonnelList", "get", {
        id: this.delbatchDat.bck01,
        aaa01: this.delbatchDat.aaa01
      }).then(res => {
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
      promiseShifts("/rateweb/cloud/SysSchedule/getOffice", "get", {
        id: val
      }).then(res => {
        if (res.status === 200) {
          this.bas02List = res.data;
        }
      });
    },

    dupScheduling(val) {
      // 复制排班多选
      promiseShifts("/rateweb/cloud/SysSchedule/getPersonnelList", "get", {
        id: this.dupbatchDat.bck01,
        aaa01: this.dupbatchDat.aaa01
      }).then(res => {
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
      promiseShifts("/rateweb/cloud/SysSchedule/getOffice", "get", {
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
      this.dupmockData.filter((item, index) => {
        if (newTargetKeys.indexOf(item.key) > -1) {
          this.newTargetKeysArr3.push(item.key + "-" + item.label);
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
      promiseShifts("/rateweb/cloud/SysSchedule/getOffice", "get", {
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
      //单个和多个保存排班
      singleShiftsCheduling(this);
    },
    batchSvae() {
      // 批量排班保存
      batchSchedulingPreservation(this);
    },
    batchClear() {
      //批量排班清空
      bathClearReset(this);
    },
    delSvae() {
      //批量删除保存
      deleteScheduling(this);
    },
    delclear() {
      //批量删除清空
      delclearReset(this);
    },
    cancel(index) {
      cancelReset(this, index);
    },
    copySvae() {
      //复制排班保存;
      debugger;

      copySaveAjax(this);
    },
    timeModification(date) {
      //点击目标开始日期 方法
      debugger;
      let mile =
        new Date(this.dupbatchDat.endDate).valueOf() -
        new Date(this.dupbatchDat.startDate).valueOf();
      this.delbatchDat.targetendtime = this.$moment(
        mile + new Date(date).valueOf()
      ).format("YYYY-MM-DD");
    },
    timeStartModification() {
      //点击复制日期开始方法
      debugger;
      if (this.dupbatchDat.startDate != "" && this.dupbatchDat.endDate != "") {
        this.timedis = false;
      }
    },
    timeClear(d) {
      //清空复制日期
      d == true ? (this.timedis = false) : (this.timedis = true);
      this.delbatchDat.targetstarttime = "";
      this.delbatchDat.targetendtime = "";
    },

    selectPersonnel(val) {
      this.bce01Name = val.value;
      this.bce03Name = val.label;
      this.bce01Arr = [];
      this.bce01Arr.push(val.value);
      this.total = 1;
      tableInit(this);
    },
    searchTabel() {
      tableInit(this);
    },
    handleTab(index) {
      debugger;
      // 点击tab加载时间
      tabWeek(this, index);
    },
    changePage(curr) {
      this.curr = curr;
      getpersonnelPageList(this);
    },
    removeWork(zaa01, e) {
      var evt = e || window.event;
      evt.stopPropagation(); //阻止自身冒泡事件
      singleDeletion(this, zaa01);
    },
    permission() {
      checkPermission(
        this.centerurl,
        {
          userId: this.userId,
          loginCode: this.loginName,
          modId: 2260,
          jsessionids: this.jsessionids
        },
        "initCloudUser"
      ).then(resp => {
        let btnCode = [];
        for (let i = 0; i < resp.length; i++) {
          btnCode.push(resp[i].btnCode);
        }
        this.btnCodes(btnCode);
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



