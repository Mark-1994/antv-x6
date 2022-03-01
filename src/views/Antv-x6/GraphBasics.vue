<template>
  <div style="height: 100%;">
    <Layout>
      <Header>
        <Row type="flex" justify="end" :gutter="10">
          <Col>
            <Button type="primary" @click="addData">新增节点</Button>
          </Col>
          <Col>
            <Button type="primary" @click="exportPic">导出图片</Button>
          </Col>
          <Col>
            <Button type="primary" @click="exportData">导出数据</Button>
          </Col>
        </Row>
      </Header>
      <Layout>
        <!-- 左侧工具栏 -->
        <Sider width=220>
          <div id="flowStencil"></div>
        </Sider>
        <!-- 中间画布 -->
        <Content>
          <div id="container"></div>
        </Content>
      </Layout>
      <!-- <Footer>Footer</Footer> -->
    </Layout>
    <!-- 右键操作栏 -->
    <div class="toolBar" :style="style" v-show="toolBarIsShow">
      <div class="delete" @click="nodeClick('edit')">编辑</div>
      <div class="delete del" @click="nodeClick('delete')">删除</div>
    </div>
    <div style="width: 250px; height: 150px; position: fixed; right: 0; bottom: 0;" id="mapContainer"></div>
    <Drawer
      title="节点设置"
      v-model="value3"
      width="320"
      :mask-closable="false"
      :styles="styles"
    >
      <Form :model="formData" :label-width="60">
        <FormItem label="文本">
          <Input v-model="formData.name" placeholder="" />
        </FormItem>
      </Form>
      <div class="demo-drawer-footer">
          <Button style="margin-right: 8px" @click="value3 = false">取消</Button>
          <Button type="primary" @click="saveData">保存</Button>
      </div>
    </Drawer>
  </div>
</template>

<script>
import FlowGraph from './js'
export default {
  name: 'GraphBasics',
  data () {
    return {
      width: 0,
      height: 0,
      editIsShow: true, // 操作
      toolBarIsShow: false,
      style: {
        left: '0px',
        top: '0px'
      },
      nodeCell: {},
      value3: false,
      styles: {
        height: 'calc(100% - 55px)',
        overflow: 'auto',
        paddingBottom: '53px',
        position: 'static'
      },
      formData: {
        name: '',
        url: '',
        owner: '',
        type: '',
        approver: '',
        date: '',
        desc: ''
      }
    }
  },
  mounted () {
    this.getContainerSize()
  },
  methods: {
    OnDraw () {
      this.draw()
    },
    draw () {
      const FlowData = require('./js/data.json')
      FlowGraph.init(this.width, this.height, this.editIsShow) // 渲染画布
      FlowGraph.initGraphShape(FlowData) // 数据回填

      const { graph } = FlowGraph
      // 鼠标右键
      graph.on('node:contextmenu', ({ e, cell }) => {
        this.style.left = e.clientX + 'px'
        this.style.top = e.clientY + 'px'
        this.toolBarIsShow = true
        this.nodeCell = cell
      })
      // 鼠标单击空白页
      graph.on('blank:click', () => {
        this.toolBarIsShow = false
        this.nodeCell = {}
      })
      // 鼠标点击节点或者线
      graph.on('cell:click', ({ cell }) => {
        this.toolBarIsShow = false
        this.nodeCell = {}
      })
      graph.on('blank:dblclick', ({ e, x, y }) => {
        FlowGraph.addData(x, y)
      })
      // 新增子节点
      graph.on('add:topic', ({ node }) => {
        console.log(222)
      })

    },
    // 页面宽高
    getContainerSize () {
      // this.width = document.body.offsetWidth + 'px'
      // this.height = document.body.offsetHeight + 'px'
      this.$nextTick(() => {
        this.width = document.getElementsByClassName('ivu-layout-content')[0].offsetWidth - 1
        this.height = document.getElementsByClassName('ivu-layout-content')[0].offsetHeight - 1
        this.OnDraw()
      })
    },
    // 导出图片
    exportPic () {
      FlowGraph.exportPic()
    },
    // 导出数据
    exportData () {
      console.log(FlowGraph.exportData())
    },
    // 新增节点
    addData () {
      FlowGraph.addData()
    },
    // 删除 && 编辑
    nodeClick (event) {
      this.toolBarIsShow = false
      switch (event) {
        case 'delete':
          this.nodeCell.remove()
          break
        case 'edit':
          this.value3 = true
          if (this.nodeCell.attrs.label && this.nodeCell.attrs.label.text) {
            this.formData.name = this.nodeCell.attrs.label.text
          } else {
            this.formData.name = this.nodeCell.attrs.text.text
          }
          break
      }
    },
    // 保存编辑
    saveData () {
      this.nodeCell.attr("label/text", this.formData.name)
      this.nodeCell.attr("text/text", this.formData.name)
      this.value3 = false
    }
  }
}
</script>

<style lang="less">
.ivu-layout {
  height: 100%;
}
#container {
  height: 100%;
}
.toolBar {
  position: fixed;
  width: 100px;
  height: 60px;
  background-color: #ffffff;
  border-radius: 10px;

  .delete {
    width: 100%;
    height: 30px;
    line-height: 30px;
    font-size: 15px;
    border-bottom: 1px solid #f0f0f0;
    cursor: pointer;
  }
  .delete:hover {
    color: #5f95ff;
  }
  .del:hover {
    color: red;
  }
}
.demo-drawer-footer {
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  border-top: 1px solid #e8e8e8;
  padding: 10px 16px;
  text-align: right;
  background: #fff;
}
</style>
