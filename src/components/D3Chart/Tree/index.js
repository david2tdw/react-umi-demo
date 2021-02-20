import React from 'react'
import { select, tree, hierarchy, zoom, event } from 'd3';

//1.文字超界处理
export default class Tree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontSize: 12,
      treeData: {},
    };
  }

  static defaultProps = {
    style: {},
    maxDepth: 5,
    width: 1200,
    height: 1200,
    siderbarWidth: 36,
    radius: 6, // 圆角平滑
    nodeWidth: {
      //传参null就按字数设置宽度
      _0: 160,
      _1: 160,
      _2: 160,
      _3: 160,
      _4: 160,
      _5: 160,
    }, //默认节点宽度
    nodeHeight: 50, // 节点rect高度
    modelWidth: {
      _0: 180,
      _1: 180,
      _2: 180,
      _3: 180,
      _4: 180,
      _5: 180,
    },
    modelHeight: 80,
    gridPading: {
      top: 80,
      right: 220,
      bottom: 10,
      left: 20,
    },
    selector: null, // 挂载元素
    fontNum: 1, // 设置字体大小因子
    fontColor: {
      //字体颜色
      normal: '#fff',
      warning: '#e3e3e1',
      error: '#f00',
    },
    bgColor: {
      //node节点颜色
      normal: '#35ad5b',
      warning: '#e3e3e1',
      error: '#f00',
    },
    nodeColor: '#1F90E2',
    pathColor: '#35ad5b',
    data: {},
    router: {
      baseWidth: 40,
      arrowHeight: 30,
      gap: 10,
      paddingTop: 10,
    },
    routerClick: () => {},
    nodeClick: () => {},
    siderbarClick: () => {},
  };
  drawInit(dom) {
    const { width, height, gridPading } = this.props;
    const svg = select(dom)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .style('border', '1px solid #333');
    const routeGroup = svg.append('g').attr('transform', `translate(0,0)`);
    const contentGroup = svg
      .append('g')
      .attr('transform', `translate(${gridPading.left},${gridPading.top})`);
    const { nodes, links } = this.getTreeData();
    // const link =
  }
  getTreeData() {
    const { width, height, gridPading, data, maxDepth } = this.props;
    const depthFilter = (children, depth, n = 1) => {
      const [item] = children.filter(
        item => item.children && item.children.length > 0,
      );
      if (depth !== undefined && n > depth) {
        return {
          item,
          depth: n,
        };
      }
      if (item) {
        const { children } = item;
        return depthFilter(children, depth, ++n);
      }
      return {
        item,
        depth: n,
      };
    };
    const { depth } = depthFilter([data], undefined);
    const { item: dataSource } = depthFilter([data], depth - maxDepth);
    // 创建一个树状图
    const d3Tree = tree()
      .size([
        width - gridPading.top - gridPading.bottom,
        height - gridPading.right - gridPading.left,
      ])
      .separation((a, b) => {
        //适应radial布局，可以简单的理解为深度越高，相邻子节点之间的距离越小。
        return a.parent === b.parent ? 1 : 1;
      });
    //创建一个层级布局
    const hierarchyData = hierarchy(dataSource).sum(function(d) {
      return d.value;
    });
    //初始化树状图，传入数据得到绘制树的基本数据
    const treeData = d3Tree(hierarchyData);
    //得到边和节点（已经完成转换的）
    const nodes = treeData.descendants();
    const links = treeData.links();
    return {
      nodes,
      links,
    };
  }

  renderLink(group, links) {
    const { nodeWidth, fontNum, pathColor } = this.props;
    const { fontSize } = this.state;
    const link = group
      .selectAll('.link')
      .data(links)
      .enter()
      .append('path')
      .attr('class', 'link')
      .attr('d', d => {
        let lineOffsetWidth;
        if (nodeWidth === null) {
          lineOffsetWidth =
            (d.source.name.length + d.source.number.length + 2) *
            fontSize *
            fontNum;
        } else {
          lineOffsetWidth = nodeWidth[`_${d.source.depth}`];
        }
        lineOffsetWidth = lineOffsetWidth + 10;
        return (
          'M' +
          d.source.y +
          ' ' +
          d.source.x +
          'L' +
          (d.source.y + lineOffsetWidth) +
          ' ' +
          d.source.x +
          ' L' +
          (d.source.y + lineOffsetWidth) +
          ' ' +
          d.target.x +
          ' L' +
          d.target.y +
          ' ' +
          d.target.x
        );
      })
      .attr(
        'style',
        () => `stroke:${pathColor};fill:none;stroke-width: 1.5px;`,
      );
    return link;
  }

  renderNode(group, nodes) {
    const {
      nodeHeight,
      nodeWidth,
      fontNum,
      radius,
      nodeColor,
      fontColor,
      bgColor,
    } = this.props;
    const { fontSize } = this.state;
    const node = group
      .selectAll('.node')
      .data(nodes)
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', d => `translate(${d.y}, ${d.x - nodeHeight / 2})`)
      .style('style', () => `font:${fontSize * fontNum}px sans-serif;`)
      .style('cursor', 'pointer');
    node
      .append('rect')
      .attr('width', d =>
        nodeWidth === null
          ? (d.name.length + 2) * fontSize * fontNum
          : nodeWidth[`_${d.depth}`],
      )
      .attr('height', nodeHeight)
      .attr('x', 0)
      .attr('y', 0)
      .attr('rx', radius)
      .attr('ry', radius)
      .attr('style', d => {
        return `fill:${nodeColor}`;
      });
    node
      .append('text')
      .attr('dx', d => {
        const width = nodeWidth[`_${d.depth}`];
        const name = d.data.name;
        const len = name.length;
        const n = /[A-Za-z0-9]/g.test(name) ? len / 2 : len;
        return (width - n * fontSize * fontNum) / 2 - 4;
      })
      .attr('dy', (fontSize * fontNum + nodeHeight / 2) / 2 - 2)
      .style('text-anchor', 'start')
      .style('fill', fontColor.normal)
      .text(d => d.data.name);
    node
      .append('text')
      .attr(
        'dx',
        d =>
          (nodeWidth[`_${d.depth}`] -
            ((d.value + '').length + 4) * fontSize * fontNum) /
          2,
      )
      .attr('dy', (fontSize * fontNum) / 2 + (nodeHeight * 3) / 4 - 2)
      .style('text-anchor', 'start')
      .style('fill', fontColor.normal)
      .text(d => {
        return '人数：' + d.value;
      });
    node
      .append('rect')
      .attr('class', 'tag')
      .attr('width', d =>
        nodeWidth === null
          ? (d.name.length + d.number.length + 2) * fontSize * fontNum
          : nodeWidth[`_${d.depth}`],
      )
      .attr('height', nodeHeight)
      .attr('x', 0)
      .attr('y', 0)
      .attr('rx', radius)
      .attr('ry', radius)
      .attr('style', 'opacity:0');
    return node;
  }
  renderSidebar(node) {
    const {
      nodeHeight,
      nodeWidth,
      fontNum,
      siderbarWidth,
      fontColor,
    } = this.props;
    const { fontSize } = this.state;
    const siderbarHeight = nodeHeight / 2 - 1;
    const g = node
      .append('g')
      .attr('transform', d => {
        const x = nodeWidth[`_${d.depth}`] + 1;
        return `translate(${x}, 0)`;
      })
      .attr('class', '_d3_anchor')
      .style('display', 'none');
    g.append('rect')
      .attr('width', siderbarWidth)
      .attr('height', siderbarHeight)
      .attr('x', 0)
      .attr('y', 0)
      .attr('rx', 4)
      .attr('ry', 4)
      .style('fill', '#797979');
    g.append('text')
      .text('导出')
      .style('fill', fontColor.normal)
      .attr('dx', () => (siderbarWidth - 2.5 * fontSize * fontNum) / 2)
      .attr('dy', (fontSize * fontNum + siderbarHeight) / 2 - 2)
      .style('text-anchor', 'start');
    return g;
  }
  renderModel(node) {
    const {
      modelWidth,
      modelHeight,
      nodeWidth,
      radius,
      fontNum,
      fontColor,
    } = this.props;
    const { fontSize } = this.state;
    const L = 20;
    const g = node
      .append('g')
      .attr(
        'transform',
        d =>
          `translate(${(nodeWidth[`_${d.depth}`] - modelWidth[`_${d.depth}`]) /
            2}, -${modelHeight - Math.sin(60) * L})`,
      )
      .attr('class', '_d3_model')
      .style('display', 'none');
    g.append('rect')
      .attr('width', d => modelWidth[`_${d.depth}`])
      .attr('height', modelHeight)
      .attr('x', 0)
      .attr('y', 0)
      .attr('rx', radius)
      .attr('ry', radius)
      .style('fill', 'rgba(50, 50, 50, 0.7)');
    g.append('text')
      .text(d => {
        const { value, parent } = d;
        return `占比：${
          parent ? ((value / parent.value) * 100).toFixed(2) : 100
        }%`;
      })
      .style('fill', fontColor.normal)
      .attr('dx', d => {
        const fontWidth = 8 * fontSize * fontNum;
        return (modelWidth[`_${d.depth}`] - fontWidth) / 2;
      })
      .attr('dy', (fontSize * fontNum + modelHeight) / 4 + 2)
      .style('text-anchor', 'start');
    g.append('polygon')
      .attr('points', d => {
        const x1 = (modelWidth[`_${d.depth}`] - L) / 2,
          y1 = modelHeight,
          x2 = x1 + L,
          y2 = y1,
          x3 = x1 + L / 2,
          y3 = modelHeight - Math.sin(60) * L;
        return `${x1}, ${y1} ${x2},${y2} ${x3},${y3}`;
      })
      .style('fill', 'rgba(50, 50, 50, 0.7)');
    return g;
  }
  componentDidMount () {
    this.drawInit(this.dom)
  }
  componentDidUpdate () {
    this.dom.innerHTML = ''
    this.drawInit(this.dom)
  }
  render () {
    const { style} = this.props
    return (
      <div ref={dom => this.dom = dom} style={style}></div>
    )
  }
}
