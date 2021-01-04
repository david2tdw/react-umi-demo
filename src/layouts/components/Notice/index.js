import { Popover, Badge, Tabs, Spin, List, Avatar } from 'antd';
import {
  MailOutlined,
  FolderOutlined,
  FolderOpenOutlined,
  BellOutlined,
  LinkOutlined,
} from '@ant-design/icons';
import { Link } from 'umi';
import { Consumer } from '@/components';
import classNames from 'classnames';

import styles from './index.less';

const { TabPane } = Tabs;
const { Item: ListItem } = List;
const { Meta: ListItemMeta } = ListItem;

function NoticeIcon(props) {
  const {
    message = [],
    loading = false,
    onLoadMore = () => {},
    className,
    theme,
  } = props;
  const computeData = data => {
    const unread = data.filter(item => item.type === 'unread');
    const read = data.filter(item => item.type === 'read');
    return {
      unread,
      read,
    };
  };
  const { unread = [], read = [] } = computeData(message);
  const getList = (data = []) => {
    return (
      <List
        itemLayout="horizontal"
        dataSource={data}
        loadMore={
          <div onClick={onLoadMore} className={styles.more}>
            加载更多
          </div>
        }
        renderItem={item => (
          <ListItem>
            <ListItemMeta
              avatar={<Avatar icon={<LinkOutlined />} />}
              title={
                <Link
                  to={{
                    pathname: '/sys/message',
                    state: { pathtitles: ['消息中心'] },
                  }}
                >
                  {item.title}
                </Link>
              }
            >
              description={item.description}
            </ListItemMeta>
          </ListItem>
        )}
      />
    );
  };
  const getNoticeIcon = () => {
    return (
      <Spin spinning={loading} delay={0}>
        <Tabs
          defaultActiveKey="1"
          className={styles.tabs}
          size="small"
          tabBarGutter={8}
        >
          <TabPane
            tab={
              <span>
                <MailOutlined />
                全部({message.length})
              </span>
            }
            key="1"
          >
            {getList(message)}
          </TabPane>
          <TabPane
            tab={
              <span>
                <FolderOutlined />
                未读({unread.length})
              </span>
            }
            key="2"
          >
            {getList(unread)}
          </TabPane>
          <TabPane
            tab={
              <span>
                <FolderOpenOutlined />
                已读({read.length})
              </span>
            }
            key="3"
          >
            {getList(read)}
          </TabPane>
        </Tabs>
      </Spin>
    );
  };
  const news = getNoticeIcon();
  return (
    <Popover
      placement="bottomRight"
      trigger="click"
      content={news}
      className={classNames(className)}
    >
      <span
        className={styles.noticeButton}
        style={{ color: theme === 'dark' ? '#FFF' : undefined }}
      >
        <Badge count={unread.length} offset={[-5, 5]}>
          <BellOutlined className={styles.icon} />
        </Badge>
      </span>
    </Popover>
  );
}

export default Consumer(NoticeIcon);
