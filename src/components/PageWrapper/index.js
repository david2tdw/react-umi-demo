import React, { PureComponent } from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import classNames from 'classnames';
// import PageHeader from '../PageHeader'
// import Context from '@context'
import styles from './index.less';

@connect(({ menu }) => {
  const { flattenMenuData, breadcrumbList } = menu;
  return {
    flattenMenuData,
    breadcrumbList,
  };
})
class PageWrapper extends PureComponent {
  static defaultProps = {
    loading: false,
    showHeader: true,
    flex: false,
  };

  render() {
    return <div className={classNames(styles.children)}>1111</div>;
  }
}

export default PageWrapper;

PageWrapper.propTypes = {
  classNames: PropTypes.string,
  children: PropTypes.node,
  loading: PropTypes.bool,
  inner: PropTypes.bool,
};
