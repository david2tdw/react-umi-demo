import { PureComponent, Fragment } from 'react';
import { Col, Row, Statistic, Card, Avatar, Divider } from 'antd';
import { connect } from 'dva';
// import Account from './account';
import styles from '../index.less';

const { Meta } = Card;
class Index extends PureComponent {
  handleSubmit = ({ account }) => {
    this.props.dispatch({
      type: 'githubPro/getAccountInfo',
      payload: {
        account,
      },
    });
  };
  render() {
    const {
      accountInfo: {
        login,
        avatar_url,
        name,
        bio,
        public_repos,
        followers,
        following,
      },
    } = this.props;
    const title = (
      <Fragment>
        <a
          className={styles.a}
          href={`https://github.com/${login}`}
          target="_blank"
        >
          {name}
        </a>
        <span style={{ paddingLeft: '10px', fontSize: '12px' }}>({login})</span>
      </Fragment>
    );
    const layout = {
      sm: 24,
      md: 12,
      lg: 12,
      xl: 5,
    };

    return (
      <Card>
        {/* <Account></Account> */}
        <Divider />
        <Row
          type={'flex'}
          justify={'space-between'}
          style={{ textAlign: 'center', padding: '10px 20px' }}
        >
          <Col {...layout} xl={7}>
            <Card style={{ textAlign: 'left', minHeight: 140 }}>
              <Meta
                avatar={<Avatar size={64} src={avatar_url} />}
                title={title}
                description={bio}
              ></Meta>
            </Card>
          </Col>
          <Col {...layout}>
            <Card style={{ minHeight: 140 }}>
              <Statistic title={'repository'} value={public_repos}></Statistic>
            </Card>
          </Col>
          <Col {...layout}>
            <Card style={{ minHeight: 140 }}>
              <Statistic title={'followers'} value={followers}></Statistic>
            </Card>
          </Col>
          <Col {...layout}>
            <Card style={{ minHeight: 140 }}>
              <Statistic title="following" value={following}></Statistic>
            </Card>
          </Col>
        </Row>
      </Card>
    );
  }
}

export default connect(githubPro => {
  const { account, accountInfo } = githubPro;
  return {
    account,
    accountInfo,
  };
})(Index);
