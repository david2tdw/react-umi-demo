import React, { PureComponent } from 'react';
import { Menu, Spin } from 'antd';
import {
  UserOutlined,
  SettingOutlined,
  EditOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import classNames from 'classnames';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';

export default class SelectLang extends PureComponent {
  render() {
    const {
      userInfo = {},
      onSetting = () => {},
      theme,
      className,
    } = this.props;
    const { userName } = userInfo;
    const MenuItem = Menu.Item;
    const handleMenuClick = param => {
      onSetting(param);
    };
    const menu = (
      <Menu onClick={handleMenuClick}>
        <MenuItem
          key={'/sys/user'}
          state={{ userName, pathtitles: ['个人中心'] }}
          disabled
        >
          <UserOutlined />
          用户中心
        </MenuItem>
        <MenuItem
          key={'sys/settings'}
          state={{ userName, pathtitles: ['设置中心'] }}
        >
          <SettingOutlined />
          设置
        </MenuItem>
        <MenuItem
          key={'/versions'}
          state={{ userName, pathtitles: ['更新日志'] }}
        >
          <EditOutlined />
          更新日志
        </MenuItem>
        <Menu.Divider />
        <MenuItem key="logout" state={{ userName }}>
          <LogoutOutlined />
          退出登录
        </MenuItem>
      </Menu>
    );
    return userName ? (
      <HeaderDropdown overlay={menu} placement="bottomRight">
        <span
          className={classNames(styles.dropDown, className, {
            [styles.dark]: theme === 'dark',
          })}
        >
          <UserOutlined />
          {userName}
        </span>
      </HeaderDropdown>
    ) : (
      <Spin size="small" style={{ marginLeft: 8, marginRight: 8 }} />
    );
  }
}
