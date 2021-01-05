import { PureComponent } from 'react';
import Breadcrumb from './breadcrumb';
import { InfoCircleOutlined } from '@ant-design/icons';
import isEqual from 'lodash/isEqual';
import classnames from 'classnames';
import { sysDefultPage } from '@platformConfig';
import styles from './index.less';

// cosnt unique = (origin) => origin.filter(function (item, index, array) {
//   return array.indexOf(item) === index;
// })

class PageHeader extends PureComponent {
  state = {
    breadcrumbData: [],
  };
  static defaultProps = {
    isShow: true,
    homePage: { title: '首页', icon: 'home', link: sysDefultPage.pathname },
  };

  componentDidMount() {
    this.getBreadcrumbList();
  }

  componentDidUpdate(preProps) {
    const { location, flattenMenuData } = this.props;
    if (!location || !preProps.location) {
      return;
    }
    const prePathname = preProps.location.pathname;
    if (
      prePathname !== location.pathname ||
      !isEqual(flattenMenuData, preProps.flattenMenuData)
    ) {
      this.getBreadcrumbList();
    }
  }

  getBreadcrumbList = () => {
    const {
      location: { pathname },
      breadcrumbList,
      flattenMenuData,
      homePage,
    } = this.props;
    const [menu = {}] = flattenMenuData.filter(item => item.link === pathname);
    const { pathtitles = [] } = menu;
    const breadcrumbData = breadcrumbList || pathtitles;
    this.setState({
      breadcrumbData: [homePage, ...breadcrumbData],
    });
  };

  filterPathtitles = (pathtitles, breadcrumbList) => {
    if (!breadcrumbList && breadcrumbList.length > 0) {
      return pathtitles;
    }
    return pathtitles.map(title => {
      const [res] = breadcrumbList.filter(item =>
        typeof item === 'object' ? item.title === title : item === title,
      );
      return res || title;
    });
  };

  render() {
    const { isShow, title, description } = this.props;
    const { breadcrumbData } = this.state;
    return (
      <div className={classnames(styles.wrapper, { [styles.hide]: !isShow })}>
        <Breadcrumb breadcrumbList={breadcrumbData} />
        <h2 className={classnames(styles.describe, { [styles.hide]: !title })}>
          {title}
        </h2>
        <p
          className={classnames(styles.describe, {
            [styles.hide]: !description,
          })}
        >
          <InfoCircleOutlined />
          &nbsp;{description}
        </p>
      </div>
    );
  }
}

export default PageHeader;
