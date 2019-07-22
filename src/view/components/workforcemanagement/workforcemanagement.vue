<template>
  <div>
    <Header style="height:45px!important;line-height:35px!important">
      <Button type="primary" @click="demo">新增</Button>
    </Header>
      <Content>
       <Table border  :columns="columns1" :data="data1" class='tabel-padding'></Table>
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
    <div id='workforcemange' style="display:none">
      <Layout>
        <Content class="workcontent">
          <Form  label-position="left" :label-width="100">
            <FormItem label="班次名称">
                <Input></Input>
            </FormItem>
            <FormItem label="颜色">
                <Input></Input>
            </FormItem>
            <FormItem label="开始时间">
                <Input></Input>
            </FormItem>
            <FormItem label="结束时间">
                <Input></Input>
            </FormItem>
          </Form>
        </Content>
        <Footer>
            <Button type="primary" >保存</Button>
            <Button style="margin-left: 8px">取消</Button>
        </Footer>
    </Layout>
    </div>
  </div>
</template>>
<script>
import './workforcemanagement.less'
import { getShiftsList } from '@/api/data'
export default {
  data () {
    return {
      columns1: [
        {
          title: '',
          type: 'index',
          width: 40,
          align: 'center'
        },
        {
          title: '班次名称',
          key: 'bco02',
          align: 'center',
          tooltip: true

        },
        {
          title: '颜色',
          key: 'age',
          align: 'center',
          render: (h, params) => {
            return h('div', {
              'style': {
                'background': '#fff',
                'height': '30px'
              }
            }, params.row.age)
          }
        },
        {
          title: '开始时间',
          key: 'bco03',
          align: 'center',
          tooltip: true
        },
        {
          title: '结束时间',
          key: 'bco04',
          align: 'center',
          tooltip: true
        },
        {
          title: '操作',
          key: 'action',
          width: 100,
          align: 'center',
          render: (h, params) => {
            return h('div',
              {
                'style': {
                  'textAlign': 'center'
                }
              },
              [
                h('img', {
                  style: {
                    marginRight: '5px',
                    cursor: 'pointer'

                  },
                  attrs: {
                    src: require('../../../assets/images/edit.png'),
                    title: '编辑'
                  },
                  on: {
                    click: () => {
                      this.show(params.index)
                    }
                  }
                }, '编辑'),
                h('img', {
                  style: {
                    marginLeft: '10px',
                    cursor: 'pointer'
                  },
                  attrs: {
                    src: require('../../../assets/images/delte.png'),
                    title: '删除'
                  },
                  on: {
                    click: () => {
                      this.remove(params.index)
                    }
                  }
                }, 'Delete')
              ])
          }
        }
      ],
      data1: [],
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
        title: '新增', // 界面设置
        content: $('#workforcemange'), // 捕获的元素
        success: function (index, num) {

        }
      })
    },
    show (index) {

    },
    remove (index) {

    }
  },
  mounted () {
    getShiftsList().then(res => {
      if (res.status === 200) {
        this.data1 = res.data
      }
    })
  }
}
</script>
<style scoped>
</style>
