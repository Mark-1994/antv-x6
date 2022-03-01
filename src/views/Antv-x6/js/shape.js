// 节点样式设置
import { Graph } from '@antv/x6'
const widthNode = 200
const heightNode = 35
// 连接桩样式
const groupsObj = {
  customPorts: {
    position: { name: 'absolute' },
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
}

// 单个节点连接桩样式
const groupObj = {
  customPortsTop: {
    position: { name: 'top' },
    attrs: {
      circle: {
        r: 4,
        magnet: true,
        stroke: '#5F95FF',
        strokeWidth: 1,
        fill: '#fff',
        style: {
          visibility: 'hidden'
        }
      }
    }
  },
  customPortsRight: {
    position: { name: 'right' },
    attrs: {
      circle: {
        r: 4,
        magnet: true,
        stroke: '#5F95FF',
        strokeWidth: 1,
        fill: '#fff',
        style: {
          visibility: 'hidden'
        }
      }
    }
  },
  customPortsBottom: {
    position: { name: 'bottom' },
    attrs: {
      circle: {
        r: 4,
        magnet: true,
        stroke: '#5F95FF',
        strokeWidth: 1,
        fill: '#fff',
        style: {
          visibility: 'hidden'
        }
      }
    }
  },
  customPortsLeft: {
    position: { name: 'left' },
    attrs: {
      circle: {
        r: 4,
        magnet: true,
        stroke: '#5F95FF',
        strokeWidth: 1,
        fill: '#fff',
        style: {
          visibility: 'hidden'
        }
      }
    }
  }
}

// 矩形
export const basicsNode = Graph.registerNode('basicsNode', {
  inherit: 'rect',
  width: widthNode,
  height: heightNode * 2,
  attrs: attrsObtain(2),
  markup: markupObtain(2),
  resizing: {
    enabled: true
  },
  ports: {
    groups: groupsObj,
    items: [
      {
        id: 'top',
        group: 'customPorts',
        args: { x: '50%', y: 0 }
      },
      {
        id: 'bottom',
        group: 'customPorts',
        args: { x: '50%', y: 68 }
      },
      {
        id: 'left',
        group: 'customPorts',
        args: { x: 0, y: 35 }
      },
      {
        id: 'right',
        group: 'customPorts',
        args: { x: '100%', y: 35 }
      }
    ]
  }
})
export const twoStageNode = Graph.registerNode('twoStageNode', {
  inherit: 'rect',
  width: widthNode,
  height: heightNode * 3,
  attrs: attrsObtain(3),
  markup: markupObtain(3),
  ports: {
    groups: groupsObj,
    items: portsItems(3)
  }
})
export const businessNode = Graph.registerNode('businessNode', {
  inherit: 'rect',
  width: 100,
  height: 35,
  attrs: recAttrs(),
  // markup: markupObtain(1),
  markup: [
    {
      tagName: 'rect',
      selector: `head`,
      groupSelector: 'commonStyle'
    },
    {
      tagName: 'image',
      selector: 'img'
    }
  ],
  ports: {
    groups: groupsObj,
    items: portsItems(1)
  }
})
export const tableNode = Graph.registerNode('tableNode', {
  inherit: 'circle',
  width: 80,
  height: 80,
  attrs: recAttrs(),
  ports: {
    groups: groupObj,
    items: cirPortsItems()
  }
})
// 矩形attrs
function recAttrs () {
  const attrsObj = {
    commonStyle: {
      // rx: 10, // 圆角矩形
      refWidth: '100%',
      height: 35,
      fill: '#fff',
      strokeWidth: 1
    },
    head: {
      x: 0,
      y: 0
    },
    img: {
      ref: 'head',
      refX: '100%',
      refY: '50%',
      refY2: -8,
      width: 16,
      height: 16,
      'xlink:href': 'https://gw.alipayobjects.com/mdn/rms_43231b/afts/img/A*SYCuQ6HHs5cAAAAAAAAAAAAAARQnAQ',
      event: 'add:topic',
      class: 'topic-image',
    }
  }
  return attrsObj
}
// 获取attrs
function attrsObtain (num) {
  const attrsObj = {
    index: num,
    // rect公共样式
    commonStyle: {
      refWidth: '100%',
      height: heightNode,
      stroke: '#5f95ff',
      fill: 'rgba(95, 149, 255, 0.05)'
    },
    // text公共样式
    commonStyle1: {
      fill: '#000',
      fontSize: 12,
      textWrap: {
        width: -10,
        height: '50%',
        ellipsis: true,
        breakWord: true
      }
    }
  }
  for (let i = 0; i < num + 1; i++) {
    if (i === 1) {
      attrsObj[`head${i}`] = {
        x: 0,
        y: 0,
        stroke: '#5f95ff',
        fill: 'rgb(95, 149, 255)'
      }
      attrsObj[`text${i}`] = {
        ref: `head${i}`,
        type: `text${i}`,
        fill: '#fff',
        textWrap: {
          text: ''
        }
      }
      attrsObj[`img${i}`] = {
        ref: `head${i}`,
        refX: '100%',
        refY: '100%',
        refY2: -8,
        width: 16,
        height: 16,
        xlinkHref: 'https://gw.alipayobjects.com/mdn/rms_43231b/afts/img/A*SYCuQ6HHs5cAAAAAAAAAAAAAARQnAQ',
        event: 'add:topic',
        class: 'topic-image'
      }
    } else {
      attrsObj[`head${i}`] = {
        x: 0,
        y: heightNode * (i - 1)
      }
      attrsObj[`text${i}`] = {
        ref: `head${i}`,
        type: `text${i}`,
        textWrap: {
          text: ''
        }
      }
    }
  }
  return attrsObj
}
// 获取markup
function markupObtain (num) {
  const headList = []
  const textList = []
  for (let i = 1; i < num + 1; i++) {
    headList.push({
      tagName: 'rect',
      selector: `head${i}`,
      groupSelector: 'commonStyle'
    })
    textList.push({
      tagName: 'text',
      selector: `text${i}`,
      groupSelector: 'commonStyle1'
    })
    textList.push({
      tagName: 'image',
      selector: `img${i}`
    })
  }
  const markupList = headList.concat(textList)
  return markupList
}
// 表对象ports中的Items
function cirPortsItems () {
  const portsItemsList = []
  portsItemsList.push({
    id: 'top',
    group: 'customPortsTop'
  })
  portsItemsList.push({
    id: 'right',
    group: 'customPortsRight'
  })
  portsItemsList.push({
    id: 'bottom',
    group: 'customPortsBottom'
  })
  portsItemsList.push({
    id: 'left',
    group: 'customPortsLeft'
  })
  return portsItemsList
}
// 获取ports中的Items
function portsItems (num) {
  const leftList = []
  const rightList = []
  for (let i = 0; i < num; i++) {
    leftList.push({
      id: `left${i}`,
      group: 'customPorts',
      args: { x: 0, y: heightNode / 2 + heightNode * i }
    })
    rightList.push({
      id: `right${i}`,
      group: 'customPorts',
      args: { x: '100%', y: heightNode / 2 + heightNode * i }
    })
  }
  const portsItemsList = leftList.concat(rightList)
  portsItemsList.unshift({
    id: 'top',
    group: 'customPorts',
    args: { x: '50%', y: 0 }
  }, {
    id: 'bottom',
    group: 'customPorts',
    args: { x: '50%', y: num * heightNode }
  })
  return portsItemsList
}
