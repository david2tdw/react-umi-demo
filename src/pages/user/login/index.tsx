import {
  AlipayCircleOutlined,
  TaobaoCircleOutlined,
  WeiboCircleOutlined,
} from '@ant-design/icons';
import { Alert, Checkbox } from 'antd';
import React, { useState } from 'react';
import { Dispatch, Link, connect } from 'umi';
// import {StateTyppe } from './model'
import styles from './style.less';
// import { LoginParamsType} from './service'
// import LoginForm from './components/Login'
import { StateType } from '@/models/login';

interface LoginProps {
  dispatch: Dispatch;
  userAndlogin: StateType;
  submitting?: boolean;
}

const Login: React.FC<LoginProps> = props => {
  const { userAndlogin = {}, submitting } = props;
  return <div>login form</div>;
};
export default connect(
  ({
    userAndlogin,
    loading,
  }: {
    userAndlogin: StateType;
    loading: {
      effects: {
        [key: string]: boolean;
      };
    };
  }) => ({
    userAndlogin,
    submitting: loading.effects['userAndlogin/login'],
  }),
)(Login);
