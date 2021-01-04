import { PureComponent } from 'react';
import { connect } from 'dva';
import { history } from 'umi';
import { ContainerQuery } from 'react-container-query';
import { Layout, BackTop } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import classNames from 'classnames';

import PropTypes from 'prop-types';
import Media from 'react-media';
import { Exception } from '@components';
import Context from '@context';
import Menus from '../components/Menus';
import Footer from './Footer';

import { query } from '../constant';
import ContentHeader from './header';
import Logo from './logo';
import StartedModal from './startedModal';
import styles from './index.less';

const { Header, Sider, Content } = Layout;

/**
 * 获取菜单默认key
 * @param {*} pathname
 */

const _getKey = pathname => {
  if (typeof pathname === 'string' && pathname !== '') {
    const arr = pathname.split('').reverse();
    const index = arr.indexOf('/');
    if (index > -1) {
      return arr
        .slice(0, index)
        .reverse()
        .join('');
    }
  }
  return pathname;
};

/**
 * 权限页，当没有权限时跳转403页面
 */
const Exception403 = (
  <Exception
    type={403}
    backText={'返回首页'}
    title={'403'}
    desc={'抱歉，你访问的页面没有权限'}
  ></Exception>
);

class Platform extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      // 侧边栏状态
      collapsed: false,
      theme: 'light',
      menuTheme: 'dark',
    };
  }
  componentDidMount() {
    const { dispatch, isMobile } = this.props;
    const { collapsed } = this.state;
    // 判断是否登录
    const isLogin = sessionStorage.getItem('isLogin');
    if (isLogin === 'false') {
      history.push('/login?status=1');
      return;
    }
    if (isMobile !== collapsed) {
      this.setState({ collapsed: isMobile });
    }
    // 请求系统基本信息
    dispatch({
      type: 'global/getSysInfo',
    });
    dispatch({
      type: 'global/getMessage',
    });
    // 获取菜单列表
    dispatch({
      type: 'menu/getMenuData',
    });
  }

  // componentWillReceiveProps(nextProps) {}

  componentWillUnmount() {
    const { dispatch } = this.props;
    // 组件卸载时清除系统信息
    dispatch({
      type: 'global/clear',
    });
    // 组件卸载时清除菜单信息
    dispatch({
      type: 'menu/clear',
    });
  }

  /**
   * 设置侧边栏状态
   */
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  /**
   * 通过context将location,theme,screen广播给所有子组件
   * @param {*} screen 屏幕尺寸
   */
  getContext(screen) {
    const { location } = this.props;
    const { theme } = this.state;
    return {
      location,
      theme,
      screen,
    };
  }
  render() {
    // 侧边栏状态
    const { collapsed } = this.state;
    const { location, menusData = [] } = this.props;
    const { pathname, state: pathstate } = location;
    const { key } = pathstate || {};
    // 菜单默认key
    const defaultKey = key || _getKey(pathname);
    return (
      <ContainerQuery query={query}>
        {params => (
          <Context.Provider value={this.getContext(params)}>
            <Layout className={classNames(styles.wrap, params)}>
              <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                className={styles.sider}
              >
                <Logo collapsed={collapsed}></Logo>
                {/* <Menus
                  location={location}
                  menusData={menusData}
                  defaultKey={defaultKey}
                  collapsed={collapsed}
                /> */}
              </Sider>
              {/* 系统主体部分 */}
              <Layout
                id="backTop"
                className={styles.container}
                style={{ marginLeft: collapsed ? 80 : 200 }}
              >
                {/* 系统头部 */}
                <Header className={styles.contentHeader}>
                  <div style={{ width: 100 }}>
                    {collapsed ? (
                      <MenuFoldOutlined
                        className={styles.trigger}
                        onClick={this.toggle}
                      />
                    ) : (
                      <MenuUnfoldOutlined
                        className={styles.trigger}
                        onClick={this.toggle}
                      />
                    )}
                    {/* <Icon
                      className={styles.trigger}
                      type={collapsed ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
                      onClick={this.toggle}
                    /> */}
                  </div>
                  <ContentHeader />
                </Header>
                {/* 内容区域 */}
                <Content className={styles.content}>
                  {/* 路由权限 */}
                  {/* Authorized */}
                </Content>
                {/* 页脚 */}
                <Footer />
              </Layout>
              {/* 返回顶端 */}
              {/* backTop */}
            </Layout>
            {/* 点赞弹窗 */}
            {/* <StartedModal /> */}
          </Context.Provider>
        )}
      </ContainerQuery>
    );
  }
}

function mapStateToProps({ global, menu, loading }) {
  return {
    ...global,
    ...menu,
    loading: loading.global,
  };
}
export default connect(mapStateToProps)(props => (
  <Media query="(max-width: 1200px)">
    {isMobile => <Platform {...props} isMobile={isMobile} />}
  </Media>
));

Platform.propTypes = {
  children: PropTypes.element.isRequired,
  userInfo: PropTypes.object,
  menuData: PropTypes.arrayOf(PropTypes.object),
  //有路由权限菜单一维数组
  flattenMenuData: PropTypes.arrayOf(PropTypes.object),
  //无路由权限菜单一维数组
  diffMenuData: PropTypes.arrayOf(PropTypes.object),
};
