// umi 配置，同 config/config.js，二选一

import { defineConfig } from 'umi'
import { resolve } from 'path'
const theme = require('./config/theme.config.js')

export default defineConfig({
  // layout: {},
  // nodeModulesTransform: {
  //   type: 'none',
  // },
  // routes: [
  //   { path: '/', component: '@/pages/index' },
  // ],
  theme,
  base: '/',
  // treeShaking: true,
  // history: 'hash',
  targets: {}, //兼容浏览器版本
  externals: {
    d3: 'window.d3',
  },
  // https://github.com/zthxxx/react-dev-inspector
  plugins: ['react-dev-inspector/plugins/umi/react-inspector'],
  inspectorConfig: {
    // loader options type and docs see below
    exclude: [],
    babelPlugins: [],
    babelOptions: {},
  },
  routes: [
    {
      path: '/',
      component: '../layouts/BlankLayout',
      routes: [
        {
          path: '/user',
          component: '../layouts/UserLayout',
          routes: [
            {
              path: '/user',
              redirect: '/user/login'
            },
            {
              name: 'login',
              icon: 'smile',
              path: '/user/login',
              component: './user/login/index.js',
            },
            {
              name: 'register',
              icon: 'smile',
              path: '/user/register',
              component: './user/register',
            },
            {
              component: '404',
            },
          ]
        },
        {
          path: '/',
          component: '../layouts/BasicLayout',
          routes: [
            {
              path: '/',
              redirect: '/dashboard/analysis',
            },
            {
              path: '/dashboard',
              name: 'dashboard',
              icon: 'dashboard',
              routes: [
                {
                  path: '/',
                  redirect: '/dashboard/analysis',
                },
                {
                  name: 'analysis',
                  icon: 'smile',
                  path: '/dashboard/analysis',
                  component: './dashboard/analysis',
                },
              ]
            },
          ],
        },
        // {
        //   path:'/',
        //   // component: '../layouts/BasicLayout',
        //   // Routes: ['src/pages/Authorized'],
        //   authority: ['admin','user'],
        //   routes: [
        //     {
        //       path: '/',
        //       redirect: '/dashboard/analysis'
        //     },
        //     {
        //       path: '/dashboard',
        //       name: 'dashboard',
        //       icon: 'dashboard',
        //       routes: [
        //         {
        //           path: '/',
        //           redirect: '/dashboard/analysis',
        //         },
        //         {
        //           name: 'analysis',
        //           icon: 'smile',
        //           path: '/dashboard/analysis',
        //           component: './dashboard/analysis'
        //         }
        //       ]
        //     }
        //   ]
        // }
      ],
    },
  ],
  headScripts: [`https://cdn.bootcss.com/d3/5.9.2/d3.min.js`],
  alias: {
    // '@': resolve(__dirname, '../src'),
    '@utils': resolve(__dirname, 'src/utils'),
    '@context': resolve(__dirname, 'src/layouts/Context'),
    // 组件库 - this not work
    '@components': resolve(__dirname, 'src/components'),
    // 系统配置
    '@platformConfig': resolve(__dirname, 'config/platform.config'),
    // 全局services
    '@services': resolve(__dirname, 'src/services'),
    // 全局models
    '@models': resolve(__dirname, 'src/models'),
    //菜单配置项
    '@menuConfig': resolve(__dirname, 'config/menu.config.js'),
    // request请求
    '@http': resolve(__dirname, 'src/utils/request.js'),
  },
  proxy: {
    '/api': {
      target: '',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    },
  },
  history: { type: 'browser' },
  locale: {
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
})
