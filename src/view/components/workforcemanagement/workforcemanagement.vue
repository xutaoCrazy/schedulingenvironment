<template>
  <div>
    <Header style="height:45px!important;line-height:35px!important">
      <Button type="primary" @click="demo">新增</Button>
    </Header>
      <Content>
       <Table border highlight-row  :columns="columns1" :data="data1"></Table>
      </Content>
      <Modal
        v-model="modal1"
        title="Common Modal dialog box title"
        @on-ok="ok"
        @on-cancel="cancel">
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
    </Modal>
  <div id='demo'>
  </div>
  </div>

</template>>
<script>
import './workforcemanagement.less'
// import demo from './demo.vue'
export default {
  data () {
    return {
      columns1: [
        {
          title: '序号',
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: '班次名称',
          key: 'name',
          align: 'center'
        },
        {
          title: '颜色',
          key: 'age',
          align: 'center'
        },
        {
          title: '开始时间',
          key: 'address',
          align: 'center'
        }
      ],
      data1: [
        {
          name: 'John Brown',
          age: 18,
          address: 'New York No. 1 Lake Park',
          date: '2016-10-03'
        },
        {
          name: 'Jim Green',
          age: 24,
          address: 'London No. 1 Lake Park',
          date: '2016-10-01'
        },
        {
          name: 'Joe Black',
          age: 30,
          address: 'Sydney No. 1 Lake Park',
          date: '2016-10-02'
        },
        {
          name: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park',
          date: '2016-10-04'
        }
      ],
      modal1: false
    }
  },
  methods: {
    ok () {
      this.$Message.info('Clicked ok')
    },
    cancel () {
      this.$Message.info('Clicked cancel')
    },
    demo () {
      debugger
      this.$layer.open({
        type: 1,
        shadeClose: true, // 点击弹出层外关闭弹出层
        shade: true,
        area: ['530px', '450px'],
        maxmin: true, // 开启最大化最小化按钮
        title: 'ceshi', // 界面设置
        content: $('#demo'), // 捕获的元素
        success: function (index, num) {

        }
      })
    }
  }
}
</script>
<style scoped>
</style>
