import { Graph, Addon, FunctionExt, Shape, DataUri } from '@antv/x6'
import './shape'
export default class FlowGraph {
  // editIsShow 是否只读 false 只读 true 操作
  static init (width, height, editIsShow) {
    this.graph = new Graph({
      container: document.getElementById('container'),
      width: width,
      height: height,
      resizing: {
        enabled: true,
      },
      // 背景
      grid: {
        size: 10, // 网格大小
        visible: true, // 是否渲染网格背景
        type: 'mesh',
        args: [
          {
            color: '#ccc', // 主网格线/点颜色
            thickness: 1 // 主网格线宽度/网格点大小
          },
          {
            color: '#5f95ff', // 次网格线颜色
            thickness: 1, // 次网格线宽度
            factor: 4 // 次网格线间隔
          }
        ]
      },
      // 节点是否移动
      interacting: {
        nodeMovable: editIsShow
      },
      // 滚动画布
      scroller: {
        enabled: false
      },
      minimap: {
        enabled: true,
        container: document.getElementById('mapContainer'),
        width: 250,
        height: 150
      },
      // ctrl + 滚轮缩放
      mousewheel: {
        enabled: true,
        modifiers: ['ctrl', 'meta'], // 修饰键('alt'、'ctrl'、'meta'、'shift')
        minScale: 0.5, // 最小的缩放级别
        maxScale: 2 // 最大的缩放级别
      },
      // 点选/框选
      selecting: {
        enabled: editIsShow, // 是否启用点选/框选
        multiple: true, // 是否启用点击多选
        rubberband: editIsShow, // 是否启用框选
        movable: true, // 在多选情况下，选中的节点是否一起移动
        showNodeSelectionBox: true // 是否显示节点的选择框
      },
      // 连接线
      connecting: {
        // anchor: 'center',
        // connectionPoint: 'anchor',
        allowBlank: false,
        highlight: true,
        snap: true, // 自动吸附
        createEdge () {
          return new Shape.Edge({
            attrs: {
              line: {
                stroke: '#5f95ff',
                strokeWidth: 1, // 线条宽度
                targetMarker: {
                  // 箭头
                  name: 'classic',
                  size: 8
                }
              }
            },
            router: {
              // name: 'manhattan'
            },
            zIndex: 9
          })
        },
        validateConnection ({ sourceView, targetView, sourceMagnet, targetMagnet }) {
          if (sourceView === targetView) {
            return false
          }
          if (!sourceMagnet) {
            return false
          }
          if (!targetMagnet) {
            return false
          }
          return true
        }
      },
      // 连接桩可连接样式设置
      highlighting: {
        magnetAvailable: {
          name: 'stroke',
          args: {
            padding: 4,
            attrs: {
              strokeWidth: 4,
              stroke: 'rgba(223, 234, 255)'
            }
          }
        }
      }
    })
    if (editIsShow) {
      this.initStencil() // 左侧选择标题拖拽
      this.initShape() // 左侧选择节点导入
      this.initEvent() // 初始事件
    }
    return this.graph
  }

  // 左侧选择标题拖拽
  static initStencil () {
    this.stencil = new Addon.Stencil({
      title: '节点选择', // 分组标题
      stencilGraphWidth: 220, // 模板画布宽度
      collapsable: false, // 分组是否可折叠
      target: this.graph, // 目标画布
      groups: [
        {
          name: 'node0',
          title: '基础节点',
          graphHeight: 100,
          layoutOptions: {
            columns: 1,
            marginX: 50
          }
        },
        {
          name: 'node1',
          title: '业务对象',
          graphHeight: 100, // 模板画布高度
          layoutOptions: {
            marginX: 45
          }
        },
        {
          name: 'node2',
          title: '表对象',
          graphHeight: 100,
          layoutOptions: {
            marginX: 40
          }
        }
      ]
    })
    const stencilContainer = document.querySelector('#flowStencil')
    stencilContainer.appendChild(this.stencil.container)
  }

  // 左侧选择节点导入
  static initShape () {
    const { graph } = this
    const a1 = graph.createNode({
      shape: 'basicsNode'
    })
    const b1 = graph.createNode({
      shape: 'businessNode'
    })
    const c1 = graph.createNode({
      shape: 'tableNode'
    })
    this.stencil.load([a1], 'node0')
    this.stencil.load([b1], 'node1')
    this.stencil.load([c1], 'node2')
  }

  // 节点操作
  static initEvent () {
    const { graph } = this
    const container = document.getElementById('container')
    // 鼠标进入节点
    graph.on('node:mouseenter', FunctionExt.debounce(() => {
      const ports = container.querySelectorAll('.x6-port-body')
      this.showPorts(ports, true)
    }), 500)
    // 鼠标离开节点
    graph.on('node:mouseleave', ({ cell, view }) => {
      const ports = container.querySelectorAll('.x6-port-body')
      this.showPorts(ports, false)
    })
  }

  // 连接桩隐藏处理
  static showPorts (ports, show) {
    for (let i = 0, len = ports.length; i < len; i = i + 1) {
      ports[i].style.visibility = show ? 'visible' : 'hidden'
    }
  }

  // 载入数据
  static initGraphShape (item) {
    this.graph.fromJSON(item)
  }

  // 销毁
  static destroy () {
    this.graph.dispose()
  }

  // 数据导出
  static exportData () {
    return this.graph.toJSON()
  }

  // 导出画布图片
  static exportPic () {
    this.graph.toPNG((dataUri) => {
      DataUri.downloadDataUri(dataUri, 'chart.png')
    })
  }

  // 新增节点
  static addData (x, y) {
    this.graph.addNode({
      shape: 'rect', // 指定使用何种图形，默认值为 'rect'
      x: x,
      y: y,
      width: 120,
      height: 35,
      ports: [
        {
          id: 'port1',
          attrs: {
            circle: {
              r: 4,
              magnet: true, // 交互是否可连
              stroke: '#5f95ff',
              strokeWidth: 1,
              fill: '#fff',
              offset: 10,
              style: {
                visibility: 'hidden'
              }
            }
          }
        }
      ],
      attrs: {
        body: {
          fill: '#fff',
          strokeWidth: 1
        },
        label: {
          text: '',
          fill: 'dark',
        }
      }
    })
  }
}
