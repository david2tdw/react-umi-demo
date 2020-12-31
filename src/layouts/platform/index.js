import { PureComponent } from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import styles from './index.less';

class Platform extends PureComponent {
  render() {
    return <div>plat form</div>;
  }
}
export default connect(platform => ({
  platform,
}))(Platform);

Platform.propTypes = {
  children: PropTypes.element.isRequired,
  userInfo: PropTypes.object,
  menuData: PropTypes.arrayOf(PropTypes.object),
  //有路由权限菜单一维数组
  flattenMenuData: PropTypes.arrayOf(PropTypes.object),
  //无路由权限菜单一维数组
  diffMenuData: PropTypes.arrayOf(PropTypes.object),
};
