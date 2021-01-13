import React, { Component } from 'react';
import classNames from 'classnames';
// import themeLight from './../themeLight'

import PropTypes from 'prop-types';
import Chart from '../core';

import ReactEcharts from 'echarts-for-react';

import { _isData } from '../methods';

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
    
    return (
      <Chart
        height={height}
        style={style}
        option={this.getOption()}
        showLoading={loading}
        onChartReady={onChartReady}
        onEvents={onEvents}
      ></Chart>
    );
  }
}

export default Bar;
