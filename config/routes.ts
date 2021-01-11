const routes =  [
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
            icon: 'dashboardxx',
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
          {
            path: '/list',
            icon: 'table',
            name: 'list',
            routes: [
              {
                name: 'card-list',
                icon: 'smile',
                path: '/list/card-list',
                component: './list/card-list',
              },
            ]
          }
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
]

export default  routes

