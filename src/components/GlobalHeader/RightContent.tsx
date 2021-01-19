// import User from '../GlobalUserCenter';
import Search from '@/components/HeaderSearch';
// import Notice from '../Notice';
import styles from './index.less';
import { Settings as ProSettings } from '@ant-design/pro-layout';
import { QuestionCircleOutlined } from '@ant-design/icons';
import {Tooltip, Tag } from 'antd'
import React from 'react'
import { connect, ConnectProps } from 'umi'
import { ConnectState } from '@/models/connect'
import NoticeIconView from './NoticeIconView'
import Avatar from './AvatarDropdown'

export interface GlobalHeaderRightProps extends Partial<ConnectProps>, Partial<ProSettings> {
  theme?: ProSettings['navTheme'] | 'realDark'
}


const ENVTagColor = {
  dev: 'orange',
  test: 'green',
  pre: '#87d068',
}

const  GlobalHeaderRight: React.SFC<GlobalHeaderRightProps> = props => {
  const {theme, layout} = props
  let className = styles.right

  if (theme === 'dark' && layout === 'top') {
    className = `${styles.right} ${styles.dark}`
  }
  return (
    <div className={className}>
      
      <Search className={`${styles.action} ${styles.search}`}
        placeholder="站内搜索"
        defaultValue="umi ui"
        options={[
          {
            label: <a href="https://umijs.org/zh/guide/umi-ui.html">umi ui</a>,
            value: 'umi ui'
          },
          {
            label: <a href="next.ant.design">Ant Design</a>,
            value: 'Ant Design',
          },
          {
            label: <a href="https://protable.ant.design/">Pro Table</a>,
            value: 'Pro Table',
          },
          {
            label: <a href="https://prolayout.ant.design/">Pro Layout</a>,
            value: 'Pro Layout',
          },
        ]}
      />
      <Tooltip title="使用文档">
        <a style={{
          color: 'inherit',
        }}
        target="_blank"
        href="https://pro.ant.design/docs/getting-started"
        rel="noopener noreferrer"
        className={styles.action}
        >
        <QuestionCircleOutlined />
        </a>
      </Tooltip>
      <NoticeIconView />
      {/* <Notice
        className={styles.action}
        message={message}
        userInfo={userInfo}
        onLoadMore={handleLoadMore}
      />
      ,
      <User
        className={styles.action}
        userInfo={userInfo}
        onSetting={handleSetting}
      /> */}
      <Avatar menu />
    </div>
  );
}

  
export default connect(({settings }: ConnectState) => ({
  theme: settings?.navTheme,
  layout: settings?.layout,
}))(GlobalHeaderRight)
