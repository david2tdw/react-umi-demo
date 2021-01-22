# umi project

## Getting Started

Install dependencies,

```bash
$ yarn
```

Start the dev server,

```bash
$ yarn start
```

## plugins:
```
yarn upgrade react@^17.0.0
yarn upgrade react-dom@^17.0.0
yarn add @ant-design/pro-layout
```

## 参考：
https://github.com/mpw0311/antd-umi-sys
https://github.com/chenshuai2144/merge-value-hooks#readme


How to remove experimentalDecorators warning in VSCode
https://ihatetomatoes.net/how-to-remove-experimentaldecorators-warning-in-vscode/



React新生命周期--getDerivedStateFromProps
https://www.jianshu.com/p/50fe3fb9f7c3

React 子组件的defaultProps、propTypes
https://www.jianshu.com/p/a1a505929ba5

useMemo和useCallback的使用
https://www.jianshu.com/p/b71e56ea2fda


图解scrollHeight, clientHeight, offsetHeight, scrollTop以及获取方法
https://www.jianshu.com/p/d267456ebc0d

## 问题
页面用.tsx或.js 文件都可以，但页面中不能使用PureComponent, 否则渲染不出来。
采用ant design pro v4模板。

## 说明
layout:
src/layouts/BasicLayout.tsx - 系统主页面layout
src/layouts/BlankLayout.tsx - 空白页面layout
src/layouts/UserLayout.tsx - 用户登录layout

配置：
.umirc.ts

动态菜单：
src/layouts/defaultMenus.js

动态生成菜单：
BasicLayout.tsx - menuDataRender()
