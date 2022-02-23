<template>
  <div style="height: 100%;">
    <Layout>
      <!-- <Header>Header</Header> -->
      <Layout>
          <Sider>
            列表
          </Sider>
          <Content>
            <div id="container">
              画布
            </div>
          </Content>
      </Layout>
      <!-- <Footer>Footer</Footer> -->
    </Layout>
  </div>
</template>

<script>
import { Graph } from '@antv/x6'
export default {
  name: 'GraphBasics',
  data () {
    return {
      graph: {}
    }
  },
  mounted () {
    this.draw()
  },
  methods: {
    draw () {
      this.graph = new Graph({
        container: document.getElementById('container'),
        width: '100%',
        height: '100%',
        background: {
          background: '#fffbe6' // 设置画布背景颜色
        },
        grid: {
          size: 10, // 网格大小
          visible: true // 渲染网格背景
        }
      })
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
