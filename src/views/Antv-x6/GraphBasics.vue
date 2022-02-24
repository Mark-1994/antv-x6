<template>
  <div style="height: 100%;">
    <Layout>
      <Header>
        <Button type="primary" @click="exportData">导出</Button>
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
      editIsShow: true // 操作
    }
  },
  mounted () {
    this.getContainerSize()
    this.OnDraw()
  },
  methods: {
    OnDraw () {
      this.draw()
    },
    draw () {
      const FlowData = require('./js/data.json')
      FlowGraph.init(this.width, this.height, this.editIsShow) // 渲染画布
      FlowGraph.initGraphShape(FlowData) // 数据回填
    },
    // 页面宽高
    getContainerSize () {
      this.width = document.body.offsetWidth + 'px'
      this.height = document.body.offsetHeight + 'px'
    },
    // 导出数据
    exportData () {
      // console.log(FlowGraph.init().toJSON({ diff: true }))
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
</style>
