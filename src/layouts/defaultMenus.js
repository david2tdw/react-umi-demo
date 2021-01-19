// https://procomponents.ant.design/components/layout#%E4%BB%8E%E6%9C%8D%E5%8A%A1%E5%99%A8%E5%8A%A0%E8%BD%BD-menu-%E5%B9%B6%E4%B8%94%E4%BD%BF%E7%94%A8-icon

export default [
  {
    path: '/',
    name: 'dashboard',
    icon: 'smile',
    children: [
      {
        path: '/dashboard/analysis',
        name: 'analysis',
        icon: 'icon-facebook',
        exact: true,
      },
    ],
  },
  {
    path: '/form',
    name: 'form',
    icon: 'heart',
    children: [
      {
        path: '/form/basic-form',
        name: 'basic-form',
        icon: 'icon-twitter',
      },
      {
        path: '/form/step-form',
        name: 'step-form',
        icon: 'smile',
      },
    ],
  },
  {
    path: '/list',
    name: 'list',
    icon: 'heart',
    children: [
      {
        path: '/list/table-list',
        name: 'table-list',
        icon: 'icon-twitter',
      },
      {
        path: '/list/card-list',
        name: 'card-list',
        icon: 'icon-facebook',
      },
    ],
  },
];
