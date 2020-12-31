import { resolve } from 'path'
import theme from './theme.config'


export default  {
  base: '/',
  treeShaking: true,
  history: 'hash',
  targets: {},//兼容浏览器版本
  externals: {
    d3: 'window.d3'
  },
  plugins: [
    [
      'umi-plugin-react', {
        antd: true,
        dva: true,
        dynamicImport: {
          webpackChunkName: true,
          loadingComponent: './components/PageLoading/index.js'
        },
        title: 'antd-umi-2.6',
        dll: true,
        locale: {
          enable: false
        },
        routes: {
          exclude: [
            /models\//,
            /services\//,
            /model\.(t|j)sx?$/,
            /service\.(t|j)sx?$/,
            /components\//,
          ],
        },
        // cdn
        scripts: [
          {
            src: 'https://cdn.bootcss.com/d3/5.9.2/d3.min.js'
          },
        ]
      },
    ]
  ],
  alias: {
    '@': resolve(__dirname, '../src'),
    '@utils': resolve(__dirname, '../src/utils'),
    '@context': resolve(__dirname, '../src/layouts/Context'),
    '@components': resolve(__dirname, '../src/components'),
    '@services': resolve(__dirname, '../src/services'),
    '@models': resolve(__dirname, '../src/models'),
    '@menuConfig': resolve(__dirname, './menu.config.js'),
    '@http': resolve(__dirname, '../src/utils/request.js')
  },
  theme,
  proxy: {
    '/api': {
      target: '',
      changeOrigin: true,
      pathRewrite: {
        '^/api': ''
      }
    }
  },
}
