import {
  DefaultFooter,
  MenuDataItem,
  getMenuData,
  getPageTitle,
} from '@ant-design/pro-layout';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Link, ConnectProps, connect, FormattedMessage } from 'umi';
import React from 'react';
import { ConnectState } from '@/models/connect';

import logo from '../assets/logo.svg';
import styles from './UserLayout.less';

export interface UserLayoutProps extends Partial<ConnectProps> {
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
}

const UserLayout: React.FC<UserLayoutProps> = props => {
  const {
    route = {
      route: [],
    },
  } = props;
  const { routes = [] } = route;
  const { children, location = { pathname: '' } } = props;

  const { breadcrumb } = getMenuData(routes);
  const title = getPageTitle({
    pathname: location.pathname,
    breadcrumb,
    ...props,
  });

  return (
    // react-helmet-async进行异步渲染
    // Helmet 轻松管理和动态设置文档头部的内容
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Helmet>
      <div className={styles.container}>
        select lang
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to="/">
                <img alt="logo" className={styles.logo} src={logo} />
                <span className={styles.title}>Ant Design</span>
              </Link>
            </div>
            <div className={styles.desc}>
              <FormattedMessage id="pages.layouts.userLayout.title" defaultMessage="Ant Design 是西湖区最具影响力的 Web 设计规范"></FormattedMessage>
            </div>
          </div>
          userlayout children ....
          {children}
        </div>
        <DefaultFooter />
      </div>
    </HelmetProvider>
  );
};

export default connect(({ settings }: ConnectState) => ({ ...settings }))(
  UserLayout,
);
