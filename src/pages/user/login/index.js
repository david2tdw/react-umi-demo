import {
  AlipayCircleOutlined,
  TaobaoCircleOutlined,
  WeiboCircleOutlined,
} from '@ant-design/icons';
import { Alert, Checkbox } from 'antd';
import React, { PureComponent, useState } from 'react';
import { Dispatch, Link, connect } from 'umi';
// import {StateTyppe } from './model'
import styles from './index.less';
// import { LoginParamsType} from './service'
import Login from './components/Login';
// import { StateType } from '@/models/login';

@connect((login, loading) => ({
  ...login,
  loading: loading.global,
}))
class Index extends PureComponent {
  componentDidMount() {
    const {
      location: { query = {} },
    } = this.props;
    if (query.status === '1') {
      message.warning('用户未登录，请登录后访问！');
    }
  }
  handleSubmit = (values) => {
    console.log('123');
    for (const name in values) {
      if (values[name] === undefined) {
        message.error('用户名或密码错误！');
        return false;
      }
    }
    this.props.dispatch({
      type: 'userLogin/login',
      payload: {
        ...values,
      },
    });
  };

  render() {
    const { loading, isError } = this.props;
    return (
      // <div className={styles.content}>
      //   <Row>
      //     <Col span={24} className={styles.logo}>
      //       <img alt="logo" src={logo} />
      //     </Col>
      //   </Row>
      //   <h2 className={styles.title}>{loginName}111</h2>
      //   <Login
      //     onSubmit={this.handleSubmit}
      //     loading={loading}
      //     isError={isError}
      //   ></Login>
      // </div>
      <div>user login page.</div>
    );
  }
}
