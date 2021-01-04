import * as api from '../services';
import orginalData from '@menuConfig';
import { menuFilter, flattenMenu } from '@utils/_';
import { menuPermission } from '@platformConfig';

export default {
  namespace: 'menu',
  state: {
    menusData: [],
    flattenMenuData: [],
    diffMenuData: [],
  },
  subscriptions: {
    setup({ dispatch, history }) {},
  },
  effects: {
    *getMenuData(_, { call, put, select }) {},
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    clear(state) {
      return {
        ...state,
        menusData: [],
        flattenMenuData: [],
        diffMenuData: [],
      };
    },
  },
};
