import { copyright } from '@platformConfig';
import React, { Fragment } from 'react';
import { Layout } from 'antd';
import { CopyrightOutlined } from '@ant-design/icons';
import { GithubOutlined } from '@ant-design/icons';
import GlobalFooter from '../../components/GlobalFooter';

const { Footer } = Layout;
const FooterView = () => (
  <Footer style={{ padding: 0 }}>
    <GlobalFooter
      links={[
        {
          key: 'UmiJS 首页',
          title: 'UmiJS 首页',
          href: 'https://umijs.org/zh/',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/mpw0311/antd-umi-sys',
          blankTarget: true,
        },
        {
          key: 'Ant Design',
          title: 'Ant Design',
          href: 'https://ant.design',
          blankTarget: true,
        },
      ]}
      copyright={
        <Fragment>
          Copyright <CopyrightOutlined /> {copyright}
        </Fragment>
      }
    ></GlobalFooter>
  </Footer>
);

export default FooterView;
