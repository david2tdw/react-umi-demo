// umi 配置，同 config/config.js，二选一

import { defineConfig } from 'umi';

const theme = require('./config/theme.config.js');

export default defineConfig({
  // layout: {},
  // nodeModulesTransform: {
  //   type: 'none',
  // },
  // routes: [
  //   { path: '/', component: '@/pages/index' },
  // ],
  theme,
});
