// import {
//   AlipayCircleOutlined,
//   TaobaoCircleOutlined,
//   WeiboCircleOutlined,
// } from '@ant-design/icons';
import { message, Row, Col } from 'antd';
// import React, { FC, PureComponent } from 'react';
import React, { Component } from 'react';
// import { connect } from 'dva';
import { Dispatch, Link, connect } from 'umi';
import { loginName } from '../../../../config/platform.config';
// import {StateTyppe } from './model'
import styles from './index.less';
import logo from '../../../assets/logo_blue_1024.png';
// import { LoginParamsType} from './service'
import Login from './components/Login';
// import { StateType } from '@/models/login';

// const Login = () => {
//   handleSubmit = value => {
//     console.log('123');
//     for (const name in values) {
//       if (values[name] === undefined) {
//         message.error('用户名或密码错误！');
//         return false;
//       }
//     }
//     this.props.dispatch({
//       type: 'login/login',
//       payload: {
//         ...values,
//       },
//     });
//   }
//   return (
//     // const {loading, error}  = this.props

//     <div>
//       login form....
//     </div>
//   );
// }
@connect(({ login, loading }) => ({
  ...login,
  loading: loading.global,
}))
class Index extends Component {

  componentDidMount () {
    const {
      location: { query = {} },
    } = this.props;
    if (query.status === '1') {
      message.warning('用户未登录，请登录后访问！');
    }
  }
  handleSubmit = values => {
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
  render () {
    const { loading, isError } = this.props;
    return (
      <div className={styles.content}>
        <Row>
          <Col span={24} className={styles.logo}>
            <img alt="logo" src={logo} />
          </Col>
        </Row>
        <h2 className={styles.title}>{loginName}</h2>
        <Login
          onSubmit={this.handleSubmit}
          loading={loading}
          isError={isError}
        ></Login>
      </div>
    );
  }
  }
  

export default Index;
