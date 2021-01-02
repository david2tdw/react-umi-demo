import { routerRedux } from 'dva';
import { connect } from 'dva';
import { PureComponent } from 'react';

class Index extends PureComponent {
  handleLoadMore = () => {};
  handleSetting = () => {};
  render() {
    return <div>aaaa</div>;
  }
}

export default connect(({ global: { userInfo, message, notification } }) => {
  return {
    userInfo,
    message,
    notification,
  };
})(Index);
