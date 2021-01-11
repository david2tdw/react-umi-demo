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
import NoticeIconView from './NoticeIconview'


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
      
      <Search className={`${styles.action} ${styles.search}`} />
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
      12312312312
    </div>
  );
}

  
export default connect(({settings }: ConnectState) => ({
  theme: settings?.navTheme,
  layout: settings?.layout,
}))(GlobalHeaderRight)
