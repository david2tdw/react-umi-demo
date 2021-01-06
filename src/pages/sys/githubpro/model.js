import * as api from './service';
import request from 'umi-request';

export default {
  namespace: 'githubPro',
  state: {
    //账户基本信息
    accountInfo: {},
    //公开库基本信息
    reposInfo: [],
    //公开库动态日志记录
    received_events: [],
    // 分页信息
    pagination: {
      pageSize: 10,
    },
    // starHistory
    starHistory: {},
  },
  subscriptions: {
    setupHistory({ dispatch, history }) {
      // 监听路由变化
      history.listen(({ pathname, state = {}, query }) => {
        //在githubpro页面获取账户基本信息、获取公开库动态日志
        if (/^\/sys\/githubpro$/.test(pathname)) {
          dispatch({
            type: 'getAccountInfo',
            payload: {
              account: state.account || 'mpw0311',
            },
          });
        }
      });
    },
  },
  effects: {
    /**
     * 1、获取账户基本信息
     * login(账户名),id,avatar_url,url,followers_url,following_url,starred_url,repos_url,events_url,received_events_url,name,bio(介绍)，public_repos，created_at，updated_at
     * 2、获取公开库动态日志
     */
    *getAccountInfo({ payload }, { call, put, select }) {
      const { account } = payload;
      const { accountInfo: preAccountInfo, pagination } = yield select(
        ({ githubPro }) => githubPro,
      );
      if (account !== preAccountInfo.login) {
        const accountInfo = yield call(api.getAccountInfo, payload);
        const { received_events_url, repos_url, public_repos } = accountInfo;
        const received_events = yield call(api.getData, {
          url: received_events_url,
        });
        yield put({
          type: 'save',
          payload: {
            accountInfo,
            received_events,
            pagination: {
              ...pagination,
              total: public_repos,
            },
          },
        });
        // 请求公开库信息
        yield put({
          type: 'getRepos',
          payload: {
            repos_url,
          },
        });
      }
    },
    /**
     * 获取所有公开库信息
     */
    *getRepos({ payload }, { call, put, select }) {
      console.log('getRepos');
      const { accountInfo, pagination } = yield select(githubPro => githubPro);
      const { current = 1, pageSize = 10 } = payload;
      //获取请求信息url
      let repos_url;
      if (payload.repos_url) {
        repos_url = payload.repos_url;
      } else {
        repos_url = accountInfo.repos_url;
      }
      //请求数据
      const reposInfo = yield call(api.getData, {
        url: repos_url + `?page=${current}&per_page=${pageSize}`,
      });
      if (Array.isArray(reposInfo)) {
        yield put({
          type: 'save',
          payload: {
            reposInfo,
            pagination: {
              ...pagination,
              current,
              pageSize,
            },
          },
        });
      }
    },
  },
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },
};
