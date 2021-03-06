// umi 配置，同 config/config.js，二选一

import { defineConfig } from 'umi'
import { resolve } from 'path'
import { SmileOutlined, CrownOutlined } from '@ant-design/icons'

// const theme = require('./config/theme.config.js')

export default defineConfig({
  // layout: {},
  // nodeModulesTransform: {
  //   type: 'none',
  // },
  // routes: [
  //   { path: '/', component: '@/pages/index' },
  // ],
  // theme,
  base: '/',
  // treeShaking: true,
  // history: 'hash',
  targets: {}, //兼容浏览器版本
  // 配置模块不打入代码
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
              component: './user/login',
            },
            {
              name: 'register',
              icon: 'icon-twitter',
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
              icon: 'icon-shoucang1',
              routes: [
                {
                  path: '/',
                  redirect: '/dashboard/analysis',
                },
                {
                  name: 'analysis',
                  icon: 'icon-facebook',
                  path: '/dashboard/analysis',
                  component: './dashboard/analysis',
                },
              ]
            },
            // {
            //   path: '/list',
            //   icon: 'table',
            //   name: 'list',
            //   routes: [
            //     {
            //       name: 'card-list',
            //       icon: 'smile',
            //       path: '/list/card-list',
            //       component: './list/card-list',
            //     },
            //   ]
            // },
            {
              path: '/form',
              icon: 'icon-twitter',
              name: 'form',
              routes: [
                {
                  path: '/',
                  redirect: '/form/basic-form',
                },
                {
                  name: 'basic-form',
                  icon: 'icon-twitter',
                  path: '/form/basic-form',
                  component: './form/basic-form'
                },
                {
                  name: 'step-form',
                  icon: 'smile',
                  path: '/form/step-form',
                  component: './form/step-form',
                },
              ]
            },
            {
              path: '/list',
              icon: 'icon-twitter',
              name: 'list',
              routes: [
                {
                  path: '/',
                  redirect: '/list/table-list'
                },
                {
                  name: 'table-list',
                  icon: 'smile',
                  path: '/list/table-list',
                  component: './list/table-list',
                },
                {
                  name: 'card-list',
                  icon: 'smile',
                  path: '/list/card-list',
                  component: './list/card-list',
                },
              ]
            },
            {
              path: '/tree',
              icon: 'table',
              name: 'chart',
              routes: [{
                path: '/',
                redirect: '/tree/chart-tree'
              }, {
                name: 'chart-tree',
                icon: 'smile',
                path: '/tree/chart-tree',
                component: './tree'
              }]
            },
            {
              component: '404',
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
  // headScripts: [`https://cdn.bootcss.com/d3/5.9.2/d3.min.js`],
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
