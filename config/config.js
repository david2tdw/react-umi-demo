// import { resolve } from 'path';
// // import theme from './theme.config'

// export default {
//   base: '/',
//   treeShaking: true,
//   history: 'hash',
//   targets: {}, //兼容浏览器版本
//   externals: {
//     d3: 'window.d3',
//   },
//   plugins: [
//     [
//       'umi-plugin-react',
//       {
//         antd: true,
//         dva: true,
//         dynamicImport: {
//           webpackChunkName: true,
//           loadingComponent: './components/PageLoading/index.js',
//         },
//         title: 'antd-umi-2.6',
//         dll: true,
//         locale: {
//           enable: false,
//         },
//         routes: {
//           exclude: [
//             /models\//,
//             /services\//,
//             /model\.(t|j)sx?$/,
//             /service\.(t|j)sx?$/,
//             /components\//,
//           ],
//         },
//         // cdn
//         scripts: [
//           {
//             src: 'https://cdn.bootcss.com/d3/5.9.2/d3.min.js',
//           },
//         ],
//       },
//     ],
//   ],
//   alias: {
//     '@': resolve(__dirname, '../src'),
//     utils: resolve(__dirname, '../src/utils'),
//     '@context': resolve(__dirname, '../src/layouts/Context'),
//     // 组件库 - this not work
//     // '@components': resolve(__dirname, '../src/components'),
//     // 系统配置
//     '@platformConfig': resolve(__dirname, './platform.config'),
//     // 全局services
//     '@services': resolve(__dirname, '../src/services'),
//     // 全局models
//     '@models': resolve(__dirname, '../src/models'),
//     //菜单配置项
//     '@menuConfig': resolve(__dirname, './menu.config.js'),
//     // request请求
//     '@http': resolve(__dirname, '../src/utils/request.js'),
//   },
//   proxy: {
//     '/api': {
//       target: '',
//       changeOrigin: true,
//       pathRewrite: {
//         '^/api': '',
//       },
//     },
//   },
// };
