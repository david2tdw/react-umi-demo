import { PureComponent } from 'react';
import { Breadcrumb } from 'antd';
import { Link } from 'umi';
import Icon from '@ant-design/icons';
import isEqual from 'lodash/isEqual';
import styles from './index.less';

class BreadcrumbView extends PureComponent {
  state = {
    breadcrumbItems: null,
  };
  static defaultProps = {
    breadcrumbList: [],
    breadcrumbSeparator: '/',
  };
  componentDidMount() {
    this.getBreadcrumbDom();
  }

  componentDidUpdate(preProps) {
    const { breadcrumbList } = this.props;
    if (!isEqual(breadcrumbList, preProps.breadcrumbList)) {
      this.getBreadcrumbDom();
    }
  }

  iconBC = name => {
    React.createElement(name);
  };

  getBreadcrumbDom() {
    const breadcrumbItems = this.itemRender();
    this.setState({
      breadcrumbItems,
    });
  }
  itemRender = () => {
    const { breadcrumbList } = this.props;
    const len = breadcrumbList.length - 1;
    return breadcrumbList.map((item, i) => {
      const { title, icon, link, query, state } =
        typeof item === 'object' ? item : {};
      return (
        <Breadcrumb.Item key={`breadcrumb_${i}`}>
          {/* <Icon component={icon} /> */}
          {this.iconBC(icon)}
          {icon}
          {link && i !== len ? (
            <Link to={{ pathname: link, query, state }}></Link>
          ) : (
            <span>{title || item}</span>
          )}
        </Breadcrumb.Item>
      );
    });
  };

  render() {
    const { breadcrumbSeparator } = this.props;
    const { breadcrumbItems } = this.state;
    return (
      <Breadcrumb className={styles.breadcrumb} separator={breadcrumbSeparator}>
        {breadcrumbItems}
      </Breadcrumb>
    );
  }
}

export default BreadcrumbView;
