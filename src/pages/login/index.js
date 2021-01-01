import { PureComponent } from 'react';
import { connect } from 'dva';
import Login from './components/Login';
import { message, Row, Col } from 'antd';
import { loginName } from '../../../config/platform.config';
import logo from '../../assets/logo_blue_1024.png';
import styles from './index.less';

@connect(({ login, loading }) => ({
  ...login,
  loading: loading.global,
}))
class Index extends PureComponent {
  componentDidMount() {}
  handleSubmit = () => {};
  render() {
    const { loading, isError } = this.props;
    return (
      <div className={styles.content}>
        <Row>
          <Col span={24} className={styles.logo}>
            <img alt="logo" src={logo} />
          </Col>
        </Row>
        <h2 className={styles.title}>{loginName}</h2>
        <Login
          onSubmit={this.handleSubmit}
          loading={loading}
          isError={isError}
        ></Login>
      </div>
    );
  }
}

export default Index;
