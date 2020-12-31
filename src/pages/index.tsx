import React from 'react';
// import styles from './index.less';
import { Redirect } from 'umi';

export default () => (
  <Redirect
    to={{
      pathname: '/login',
      state: {},
    }}
  ></Redirect>
);
