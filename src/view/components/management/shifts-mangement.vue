<template>
  <div class='mangement'>
     <Layout>
        <Header>
          <Row  :gutter="16" >
            <Col span="17">

             <Form :label-width="60">
                <i-Col span="5">
                    <FormItem  label="科室">
                      <Select v-model="Department" filterable clearable @on-change="selectDepartment">
                        <Option v-for="item in DepartmentList" :value="item.bck01" :key="item.bck01">{{ item.bck03 }}</Option>
                     </Select>
                    </FormItem>
                </i-Col>
                <i-Col span="5">
                    <FormItem label="职务">
                  <Select v-model="docter" filterable clearable  @on-change="selectDepartment">
                    <Option v-for="item in docterList" :value="item.aaa01" :key="item.aaa01">{{ item.aaa02 }}</Option>
                  </Select>
                </FormItem>
                </i-Col>
                <i-Col span="5">
                  <FormItem label="人员">
                        <Select :label-in-value="true"  filterable clearable @on-change='selectPersonnel'>
                          <Option v-for="item in personnelList" :value="item.bce01" :key="item.bce01">{{ item.bce03 }}</Option>
                        </Select>
                  </FormItem>
                </i-Col>
                </Form>
                <Form :label-width="10">
                   <!-- <Col span="5" v-show="true">
                  <FormItem  >
                    <Input >
                        <Button slot="append" icon="ios-search"></Button>
                    </Input>
                  </FormItem>
                </Col> -->

                <Col span="9">
                 <FormItem  >
                    <Button type="primary" icon="ios-search" @click='searchTabel'>查询</Button>
                    <Checkbox >仅显示有排班的</Checkbox>
                  </FormItem>
                </Col>

                </Form>
            </Col>
            <Col span="7" style="text-align:right" class="buttongroup">
              <Button type="primary" >批量删除</Button>
              <Button type="primary" @click="batchschedu=true">批量排班</Button>
              <Button type="primary" >复制排班</Button>
            </Col>
          </Row>
        </Header>
        <Content>
          <Tabs :animated="false" @on-click='handleTab'>
            <TabPane label="本周">
              <Table border :columns="columns1" :data="data1" disabled-hover></Table>
              <Page :total="total" :page-size='5' show-total  @on-change='changePage' />
            </TabPane>
            <TabPane label="下周">下周</TabPane>
            <TabPane label="本月">本月</TabPane>
            <TabPane label="7天内">7天内</TabPane>
            <TabPane label="14天内">14天内</TabPane>
            <TabPane label="30天内">30天内</TabPane>
            <TabPane label="60天内">60天内</TabPane>
            <TabPane label="90天内">90天内</TabPane>
          </Tabs>
        </Content>
    </Layout>
     <Modal
        v-model="departModel"
        title="班次配置"
        mask-closable=false
       >
       <Tabs @on-click='tabTriggerEvent' >
        <TabPane v-for="tab in tabs" :key="tab" :label="'班次配置' + tab"  >
            <Form   :label-width="100" style='padding-right:30px' ref="formValidate">

                  <FormItem label="班次" :prop='shiftformdata[tab-1].zaa05'>
                    <Select  :label-in-value="true" v-model="shiftformdata[tab-1].zaa05"   clearable>
                      <Option v-for="item in zaa05List" :value="item.bco02" :key="item.bco01"  :data-time="item.bco03"  @click.native="getMoreParams(item)" ref="dataTime">{{ item.bco02}}</Option>
                    </Select>
                  </FormItem>

                   <FormItem label="日期" v-show=showDate>
                    <DatePicker type="date" placeholder="日期" v-model='sameday'  ></DatePicker>
                    </FormItem>
                   <FormItem label="时间">
                      <Row>
                          <i-Col span="11">
                              <DatePicker type="time" placeholder="开始时间"  v-model="shiftformdata[tab-1].zaa07"></DatePicker>
                          </i-Col>
                          <Col span="2" style="text-align: center">-</Col>
                          <i-Col span="11">
                              <TimePicker type="time" placeholder="结束时间"  v-model="shiftformdata[tab-1].zaa08"></TimePicker>
                          </i-Col>
                      </Row>
                  </FormItem>
                <Row>
                  <i-Col span="12">
                    <FormItem label="科室">
                      <Select v-model="shiftformdata[tab-1].bck03" @on-change='selectBck01' clearable >
                        <Option v-for="item in DepartmentList" :value="item.bck01" :key="item.bck01">{{ item.bck03 }}</Option>
                      </Select>
                    </FormItem>
                  </i-Col>
                  <i-Col span="12">
                  <FormItem label="诊室">
                    <Select v-model="shiftformdata[tab-1].bas02" clearable>
                        <Option v-for="item in bas02List" :value="item.bas01" :key="item.bas01">{{ item.bas02 }}</Option>
                    </Select>
                  </FormItem>
                  </i-Col>
                </Row>

              <FormItem label="号别" >
                <Select v-model="shiftformdata[tab-1].bcb01" clearable>
                  <Option v-for="item in bcb01List" :value="item.bcb01" :key="item.bcb01">{{ item.bcb03 }}</Option>
                </Select>
              </FormItem>

              <Row>
                  <Col span="12">
                    <FormItem label="是否启用" >
                      <Select clearable v-model="shiftformdata[tab-1].zaa13" >
                          <Option v-for="item in zaa13List" :value="item.value" :key="item.value">{{ item.label }}</Option>
                      </Select>
                    </FormItem>
                  </Col>
                <Col span="12">
                  <FormItem label="是否关闭微信" clearable>
                    <Select clearable v-model="shiftformdata[tab-1].wxenabled"  >
                      <Option v-for="item in wxenabledList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                  </FormItem>
                </Col>

              </Row>
              <Row>
                <Col span="12">
                  <FormItem label="限号数"  >
                    <InputNumber  clearable v-model="shiftformdata[tab-1].zaa12"/>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem label="限约数" >
                    <InputNumber  clearable v-model="shiftformdata[tab-1].zaa11"/>
                  </FormItem>
                </Col>
              </Row>
              <FormItem label="备注">
                 <Input  clearable  v-model="shiftformdata[tab-1].zaa09" />
              </FormItem>
            </Form>
        </TabPane>
        <Button type="primary" @click="handleTabsAdd" slot="extra">新增</Button>
    </Tabs>
    <div slot="footer">
           <Button type="primary" @click='save'   :loading="isBtnLoading">保存</Button>
           <Button style="margin-left: 8px"  @click="cancel" >取消</Button>
      </div>
     </Modal>
      <Modal
        title="批量排班"
        v-model="batchschedu"
        width='600'
        mask-closable="false"
      >
            <Form   :label-width="100" style='padding-right:30px' ref="">
                  <Row>
                  <i-Col span="12">
                    <FormItem label="科室">
                      <Select  clearable  @on-change="selectionScheduling" v-model="batchDat[0].bck01">
                        <Option v-for="item in DepartmentList" :value="item.bck01" :key="item.bck01">{{ item.bck03 }}</Option>
                      </Select>
                    </FormItem>
                  </i-Col>
                  <i-Col span="12">
                  <FormItem label="职务">
                    <Select filterable clearable v-model="batchDat[0].aaa01"  @on-change="selectionScheduling">
                      <Option v-for="item in docterList" :value="item.aaa01" :key="item.aaa01">{{ item.aaa02 }}</Option>
                    </Select>
                  </FormItem>
                  </i-Col>
                </Row>
                <Row>
                  <i-Col span="12">
                    <FormItem label="班次" >
                      <Select  :label-in-value="true"    clearable v-model="batchDat[0].zaa05">
                        <Option v-for="item in zaa05List" :value="item.bco02" :key="item.bco01"  :data-time="item.bco03"  @click.native="getMoreParams(item,1)" ref="dataTime">{{ item.bco02}}</Option>
                      </Select>
                    </FormItem>
                  </i-Col>
                  <i-Col span="12">
                    <FormItem label="号别" >
                      <Select  clearable v-model="batchDat[0].bcb01">
                        <Option v-for="item in bcb01List" :value="item.bcb01" :key="item.bcb01">{{ item.bcb03 }}</Option>
                      </Select>
                   </FormItem>
                  </i-Col>
                </Row>
                 <FormItem label="时间">
                    <Row>
                      <i-Col span="11">
                          <TimePicker type="time" placeholder="开始时间"  v-model="batchDat[0].zaa07"></TimePicker>
                      </i-Col>
                      <Col span="2" style="text-align: center">-</Col>
                      <i-Col span="11">
                          <TimePicker type="time" placeholder="结束时间"  v-model="batchDat[0].zaa08"></TimePicker>
                      </i-Col>
                    </Row>
                  </FormItem>
                  <Row>
                    <i-Col span="12">
                      <FormItem label="限号数"  >
                        <InputNumber  clearable v-model="batchDat[0].zaa12"/>
                      </FormItem>
                    </i-Col>
                    <i-Col span="12">
                      <FormItem label="限约数" >
                        <InputNumber  clearable  v-model="batchDat[0].zaa11"/>
                      </FormItem>
                    </i-Col>
                </Row>
                <Row>
                  <i-Col span="24">
                  <FormItem label="诊室">
                    <Select clearable  v-model="batchDat[0].bas01">
                        <Option v-for="item in bas02List" :value="item.bas01" :key="item.bas01">{{ item.bas02 }}</Option>
                    </Select>
                  </FormItem>
                  </i-Col>
                </Row>
                <FormItem label="日期">
                  <Row>
                      <i-Col span="11">
                          <DatePicker type="date" placeholder="开始日期"  v-model="batchDatbegindate" :options="optionsBegindate"></DatePicker>
                      </i-Col>
                      <Col span="2" style="text-align: center">-</Col>
                      <i-Col span="11">
                          <DatePicker type="date" placeholder="结束日期" v-model="batchDatendDate" :options="optionsdendDate"></DatePicker>
                      </i-Col>
                    </Row>
                </FormItem>
                <Row>
                  <i-Col span="12">
                    <FormItem label="是否启用" >
                      <Select clearable v-model="batchDat[0].zaa13" >
                          <Option v-for="item in zaa13List" :value="item.value" :key="item.value">{{ item.label }}</Option>
                      </Select>
                    </FormItem>
                </i-Col>
                <i-Col span="12">
                  <FormItem label="是否关闭微信" clearable>
                    <Select clearable v-model="batchDat[0].wxenabled"  >
                      <Option v-for="item in wxenabledList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                  </FormItem>
                </i-Col>
              </Row>
               <FormItem label="备注">
                 <Input  clearable  v-model="batchDat[0].zaa09" />
              </FormItem>
                 <FormItem label="人员">
                      <Transfer
                      :data="mockData"
                      :target-keys="targetKeys1"
                      :render-format="render1"
                      @on-change="handleChange1"
                      :titles=titleArr
                      :on-selected-change='selectedchange'
                      >
                    </Transfer>
                </FormItem>

            </Form>
      <div slot="footer">
           <Button type="primary" @click='batchSvae'   :loading="isBtnLoading">保存</Button>
           <Button style="margin-left: 8px"  @click="cancel(1)" >取消</Button>
      </div>
     </Modal>
  </div>
</template>
<script>
import './index.less'
import { axiosFunc } from '@/api/data'
import { calculatingDate, getDateStr } from '@/api/date'
export default {
  data () {
    return {
      columns1: [

      ],
      titleArr: ['全部人员', '已选人员'],
      data1: [],
      docter: '',
      docterList: '',
      Department: '',
      DepartmentList: '',
      departModel: false,
      batchschedu: false,
      tabs: 1,
      personnelList: '',
      zaa05List: [],
      isBtnLoading: false,
      bce01Arr: [],
      showDate: true,
      showType: '',
      sameday: '',
      total: 0,
      pageSize: 5,
      curr: 1,
      shiftformdata: this.shiftformdataclear(),
      batchDat: [{
        zaa05: '',
        zaa07: '',
        zaa08: '',
        bas02: '',
        bck03: '',
        bcb01: '',
        zaa12: '',
        zaa11: '',
        zaa09: '',
        wxenabled: '0',
        zaa13: '0',
        bck01: ''

      }],
      batchDatbegindate: '',
      batchDatendDate: '',
      tabId: 1,
      tabindex: 0,
      bas02List: [], // 诊室集合
      bcb01List: '', // 挂号号别
      zaa13List: [
        {
          label: '正常',
          value: '0'
        },
        {
          label: '停诊',
          value: '1'
        },
        {
          label: '删除',
          value: '2'
        }
      ],
      wxenabledList: [
        {
          label: '否',
          value: '0'
        },
        {
          label: '是',
          value: '1'
        }
      ],
      bce03Name: '',
      bce01Name: '',
      startDate: '',
      endDate: '',
      savebeginDate: '',
      saveEndDate: '',
      mockData: [],
      targetKeys1: [],
      newTargetKeysArr: [],
      optionsBegindate: {
        disabledDate (date) {
          return date && date.valueOf() < Date.now() - 86400000
        }
      },
      optionsdendDate: {
        disabledDate (date) {
          return date && date.valueOf() < Date.now() - 86400000
        }
      }
    }
  },
  methods: {
    shiftformdataclear () {
      let arr = [{
        zaa05: '',
        zaa07: '',
        zaa08: '',
        bas02: '',
        bck03: '',
        bcb01: '',
        zaa12: '',
        zaa11: '',
        zaa09: '',
        wxenabled: '0',
        zaa13: '0',
        zaa01: null,
        bce01: this.bce01Name,
        bce03: this.bce03Name,
        bck01: this.Department

      }]
      return arr
    },
    promiseShifts (url, type, params, flag) {
      let data = new Promise((resolve, reject) => {
        let save = axiosFunc(url, type, params, flag)
        resolve(save)
      })
      return data
    },
    tableInit () { // 加载表格数据
      this.promiseShifts('/api/rateweb/cloud/SysSchedule/getSearchScheduRecordsList', 'get', { bck01: this.Department, bce01: this.bce01Arr.join(','), startDate: this.startDate, endDate: this.endDate, page: 1, rows: 500 }).then((res) => {
        debugger
        if (res.status === 200) {
          this.data1 = res.data.list
          this.columns1 = calculatingDate(1, this.data1, this)
        }
      })
    },
    selectDoctor () {
      this.promiseShifts('/api/rateweb/cloud/SysSchedule/getBusinessList', 'get', { }).then((res) => {
        debugger
        if (res.status === 200) {
          this.docterList = res.data
        }
      })
      this.promiseShifts('/api/rateweb/cloud/SysSchedule/getBck1List', 'get', { keyWord: '', page: 1, rows: 30 }).then((res) => { // 科室
        debugger
        if (res.status === 200 && res.data.result === 'SUCCESS') {
          this.DepartmentList = res.data.list
        }
      })
      this.promiseShifts('/api/rateweb/cloud/SysSchedule/getShiftsList', 'get', { }).then((res) => { // 班次
        debugger
        if (res.status === 200 && res.data) {
          this.zaa05List = res.data
        }
      })
      this.promiseShifts('/api/rateweb/cloud/SysSchedule/getCategory', 'get', { }).then((res) => { // 挂号号别
        debugger
        if (res.status === 200) {
          this.bcb01List = res.data
        }
      })
    },

    init () {
      this.selectDoctor()
      calculatingDate(1)
      let $json = calculatingDate(1, '', this)
      this.columns1 = this.columns1.concat($json)
      this.handleTab(0)
    },
    show (params, flag, timeJson, zaa01, $color) {
      if (zaa01 && $color === 'null') {
        this.showType = 4
        this.promiseShifts('/api/rateweb/cloud/SysSchedule/saveSchedule', 'post', { zaa01: zaa01, type: this.showType }, true).then((res) => {
          debugger
          if (res.status === 200 && res.data.result === 'SUCCESS') {
            debugger
            this.tableInit()
            this.$Notice.success({
              title: '保存排班成功'
            })
          } else {
            this.$Modal.error({
              title: '信息',
              content: res.data.resultMsg,
              className: 'vertical-center-modal'
            })
          }
        })
      } else {
        debugger
        this.shiftformdata = []
        this.shiftformdata.push({
          zaa05: '',
          zaa07: '',
          zaa08: '',
          bas02: '',
          bck03: '',
          bcb01: '',
          zaa12: '',
          zaa11: '',
          zaa09: '',
          wxenabled: '0',
          zaa13: '0',
          bce01: this.bce01Name,
          bce03: this.bce03Name,
          bck01: this.Department

        })
        this.shiftformdata[0].bce01 = parseFloat(params.row.bce03.split(',')[1])
        this.shiftformdata[0].bce03 = params.row.bce03.split(',')[0]
        this.bce01Name = parseFloat(params.row.bce03.split(',')[1])
        this.bce03Name = params.row.bce03.split(',')[0]
        this.departModel = true
        this.showType = flag
        this.tabs = 1
        switch (flag) {
          case 1:
            this.showDate = false
            this.savebeginDate = timeJson.sartDate
            this.saveEndDate = timeJson.endDate
            break
          case 2:
            this.showDate = true
            this.savebeginDate = timeJson
            this.saveEndDate = timeJson
            this.sameday = timeJson
            break
        }
        if (zaa01 && $color) {
          this.promiseShifts('/api/rateweb/cloud/SysSchedule/getOneScheduById', 'get', { id: zaa01 }).then((res) => { // 挂号号别
            debugger
            this.showType = 3
            if (res.status === 200) {
              let formData = this.shiftformdata[0]
              let $data = res.data
              formData.zaa05 = $data.zaa05
              formData.zaa07 = $data.zaa07.split(' ')[1]
              formData.zaa08 = $data.zaa08.split(' ')[1]
              formData.bas02 = $data.bas02
              formData.bck03 = $data.bck03
              formData.bcb01 = $data.bcb01
              formData.zaa12 = $data.zaa12
              formData.zaa11 = $data.zaa11
              formData.zaa09 = $data.zaa09
              formData.wxenabled = $data.wxenabled.toString()
              formData.zaa13 = $data.zaa13.toString()
              formData.zaa01 = $data.zaa01
              formData.bce01 = $data.bce01
              formData.bce03 = $data.bce03
              formData.bck01 = $data.bck01
            }
          })
        }
      }
    },

    handleTabsAdd () { // 点击新增tabs 动态添加保存数据
      debugger
      if (this.zaa05List.length <= this.tabs) {
        return false
      }
      this.shiftformdata.push({
        zaa05: '',
        zaa07: '',
        zaa08: '',
        bas02: '',
        bck03: '',
        bcb01: '',
        zaa12: '',
        zaa11: '',
        zaa09: '',
        wxenabled: '0',
        zaa13: '0',
        bce01: this.bce01Name,
        bce03: this.bce03Name,
        bck01: this.Department

      })
      this.tabs++
    },
    selectDepartment (flag, $bck01) { // 选择科室、职务回填人员
      this.promiseShifts('/api/rateweb/cloud/SysSchedule/getPersonnelList', 'get', { id: this.Department, aaa01: this.docter }).then((res) => {
        if (res.status === 200) {
          this.personnelList = res.data
        }
      })
      this.curr = 1
      this.shiftformdata[0].bck01 = this.Department
      this.getpersonnelPageList()
    },
    selectionScheduling (val) { // 排班多选
      debugger
      this.promiseShifts('/api/rateweb/cloud/SysSchedule/getPersonnelList', 'get', { id: this.batchDat[0].bck01, aaa01: this.batchDat[0].aaa01 }).then((res) => {
        if (res.status === 200 && res.data.length) {
          this.mockData = []
          this.targetKeys1 = []
          this.newTargetKeysArr = []
          for (let i = 0; i < res.data.length; i++) {
            this.mockData.push({
              key: res.data[i].bce01,
              label: res.data[i].bce03
            })
          }
        }
      })
      this.promiseShifts('/api/rateweb/cloud/SysSchedule/getOffice', 'get', { id: val }).then((res) => {
        debugger
        if (res.status === 200) {
          this.bas02List = res.data
        }
      })
    },
    render1 (item) {
      return item.label
    },
    handleChange1 (newTargetKeys, direction, moveKeys) { //  点击左边右边 图标 切换  存储人已选人员列表
      this.targetKeys1 = newTargetKeys
      debugger
      this.newTargetKeysArr = []
      this.mockData.filter((item, index) => {
        if (newTargetKeys.indexOf(item.key) > -1) {
          this.newTargetKeysArr.push({
            bce01: item.key,
            bce03: item.label
          })
        }
      })
    },
    selectedchange (sourceSelectedKeys, targetSelectedKeys) {
      debugger
    },

    getpersonnelPageList () { // 加载表格
      this.promiseShifts('/api/rateweb/cloud/SysSchedule/getPersonnelPageList', 'get', { id: this.Department, aaa01: this.docter, page: this.curr, rows: this.pageSize }).then((res) => {
        debugger
        if (res.status === 200 && res.data.rows != null) {
          this.bce01Arr = []
          this.total = res.data.total
          for (let i = 0; i < res.data.rows.length; i++) {
            this.bce01Arr.push(res.data.rows[i].bce01)
          }
          this.tableInit()
        }
      })
    },
    getMoreParams (item, index) { // 选择班次 回填开始时间和结束时间
      debugger
      if (index === 1) {
        this.batchDat[0].zaa07 = item.bco03
        this.batchDat[0].zaa08 = item.bco04
      } else {
        this.shiftformdata[this.tabindex].zaa07 = item.bco03
        this.shiftformdata[this.tabindex].zaa08 = item.bco04
      }
    },
    selectBck01 (val) { // 选择科室 回填诊室
      this.promiseShifts('/api/rateweb/cloud/SysSchedule/getOffice', 'get', { id: val }).then((res) => {
        debugger
        if (res.status === 200) {
          this.bas02List = res.data
        }
      })
    },
    tabTriggerEvent (name) {
      this.tabindex = name
    },
    save () {
      this.isBtnLoading = true
      this.promiseShifts('/api/rateweb/cloud/SysSchedule/saveSchedule', 'post', { commformStr: JSON.stringify(this.shiftformdata), type: this.showType, beginDate: this.savebeginDate, endDate: this.saveEndDate }, true).then((res) => {
        debugger
        if (res.status === 200 && res.data.result === 'SUCCESS') {
          debugger
          this.shiftformdataclear()
          this.departModel = !this.departModel
          this.tableInit()
          this.$Message.success({
            content: '保存成功',
            duration: 2
          })
        } else {
          this.$Modal.error({
            title: '信息',
            content: res.data.resultMsg,
            className: 'vertical-center-modal'
          })
        }
        this.isBtnLoading = false
      })
    },
    batchSvae () {
      debugger
      this.isBtnLoading = true
      this.promiseShifts('/api/rateweb/cloud/SysSchedule/saveSchedule', 'post', { commformStr: JSON.stringify(this.batchDat), type: 5, beginDate: this.$moment(this.batchDatbegindate).format('YYYY-MM-DD 00:00:00'), endDate: this.$moment(this.batchDatendDate).format('YYYY-MM-DD 23:59:59'), userListStr: JSON.stringify(this.newTargetKeysArr) }, true).then((res) => {
        debugger
        if (res.status === 200 && res.data.result === 'SUCCESS') {
          this.curr = 1
          this.tableInit()
          this.$Message.success({
            content: '保存成功',
            duration: 2
          })
        } else {
          this.$Modal.error({
            title: '信息',
            content: res.data.resultMsg,
            className: 'vertical-center-modal'
          })
        }
        this.isBtnLoading = false
      })
    },
    cancel (index) {
      if (index === 1) {
        this.batchschedu = !this.batchschedu
      } else {
        this.departModel = !this.departModel
      }
    },
    selectPersonnel (val) {
      debugger
      this.bce01Name = val.value
      this.bce03Name = val.label
      this.bce01Arr = []
      this.bce01Arr.push(val.value)
      this.total = 1
      this.tableInit()
    },
    searchTabel () {
      this.tableInit()
    },
    handleTab (index) { // 点击tab加载时间
      debugger
      let now = new Date() // 当前日期
      let nowDayOfWeek = now.getDay()
      switch (index) {
        case 0:
          this.startDate = getDateStr(0).year + ' ' + '00:00:00'
          this.endDate = getDateStr(7 - nowDayOfWeek).year + ' ' + '23:59:59'
          break
      }
      getDateStr()
    },
    changePage (curr) {
      this.curr = curr
      this.getpersonnelPageList()
    }
  },
  mounted () {
    this.init()
  }
}
</script>
<style lang="scss" scoped>

</style>
