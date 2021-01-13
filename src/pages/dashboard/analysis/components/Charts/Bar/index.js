import React, { Component } from 'react';
import classNames from 'classnames';
// import themeLight from './../themeLight'

import PropTypes from 'prop-types';
//下面是按需加载
import echarts from 'echarts/lib/echarts';
import Chart from '../core';
//导入折线图
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
import ReactEcharts from 'echarts-for-react';

import { _isData, _toDataset } from '../methods';

class Bar extends Component {
  static defaultProps = {
    data: {},
    type: 'bar',
    loading: false,
  };
  getOption = () => ({
    title: {
      text: '用户骑行订单',
      x: 'left',
    },
    // legend: ,
    // dataset:[1000,2000,1500,3000,2000,1200,800],
    xAxis: {
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    },
    tooltip: {},
    legend: {
      data: ['销量'],
    },
    yAxis: {
      // type:'value'
    },
    series: [
      {
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20],
      },
    ],
  });

  render() {
    const {
      data,
      loading,
      height,
      style,
      onChartReady,
      onEvents,
      color,
    } = this.props;
    if (!_isData(data)) {
      return (
        <div
          style={{
            width: '100%',
            height,
            color: '#555',
            fontSize: 16,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            ...style,
          }}
        >
          <span>{loading ? '数据加载中...' : '无数据'}</span>
        </div>
      );
    }
    const dataSource = data;
    // const dataSource = _toDataset({data:{columns: data}});
    // const option ={
    //   title: {
    //     text:'用户骑行订单',
    //     x:'left'
    //   },
    //   // legend: ,
    //   dataset:[1000,2000,1500,3000,2000,1200,800],
    //   xAxis:{
    //     data:['周一','周二','周三','周四','周五','周六','周日']
    //   },
    //   tooltip: {},
    //         legend: {
    //             data:['销量']
    //         },
    //   yAxis:{
    //     // type:'value'
    //   },
    //   series: [{
    //     name: '销量',
    //     type: 'bar',
    //     data: [5, 20, 36, 10, 10, 20]
    // }]
    // }
    return (
      <Chart
        height={height}
        style={style}
        option={this.getOption()}
        showLoading={loading}
        onChartReady={onChartReady}
        onEvents={onEvents}
      ></Chart>
      // <div>
      //   <div>
      //     <ReactEcharts option={this.getOptions()} style={{height: '400px'}}></ReactEcharts>
      //   </div>
      // </div>
    );
  }
}

export default Bar;
