import { PureComponent } from 'react';
import { connect } from 'dva';
import { Card } from 'antd';
import pathToRegexp from 'path-to-regexp';
import { Page } from '@/components';

@connect((githubPro, loading) => {
  const { accountInfo, starHistory, description } = githubPro;
  return {
    accountInfo,
    starHistory,
    description,
    loading: loading.models.githubPro,
  };
})
class Repo extends PureComponent {
  componentDidMount() {
    const { reposName, account } = this.getInfo();
    this.getRepoStars(account, reposName);
  }
  componentDidUpdate(nextProps, nextState) {
    const { account: preAccount, reposName: preReposName } = this.getInfo();
    const { account, reposName } = this.getInfo(nextProps);
    if (
      account &&
      reposName &&
      (account !== preAccount || reposName !== preReposName)
    ) {
      this.getRepoStars(account, reposName);
    }
  }
  // 获取账户名、项目名
  getInfo = props => {
    const {
      location: {
        pathname,
        query: { _n: reposName },
      },
    } = props || this.props;
    const [, account] = pathToRegexp('/sys/githubpro/:id').exec(pathname);
    return {
      reposName,
      account,
    };
  };
  /**
   * 数据请求
   */
  getRepoStars = (account, reposName) => {
    this.props.dispatch({
      type: 'githubPro/getReposStars',
      payload: {
        account,
        reposName,
      },
    });
  };
  render() {
    const { starHistory, loading, description } = this.props;
    const { account, reposName } = this.getInfo();
    return (
      <Page
        loading={false}
        pathtitles={[
          {
            title: 'gitDataV',
            link: '/sys/githubpro',
            icon: 'github',
            state: { account },
          },
          reposName,
        ]}
        title={reposName}
        description={description}
      >
        <Card title="stargazers Analysis">
          {/* <Line data={starHistory} ser></Line> */}
          echart line
        </Card>
      </Page>
    );
  }
}

export default Repo;
