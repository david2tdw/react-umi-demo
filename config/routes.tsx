import React from 'react'
import { SmileOutlined, CrownOutlined, TabletOutlined } from '@ant-design/icons'
export default [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      {
        path: '/user',
        redirect: '/user/login',
        routes: [
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
                icon: <SmileOutlined />,
                path: '/dashboard/analysis',
                component: './dashboard/analysis',
              },
            ]
          },
          {
            path: '/form',
            icon: 'form',
            name: 'form',
            routes: [
              {
                path: '/',
                redirect: '/form/basic-form',
              },
              {
                name: 'basic-form',
                icon: 'smile',
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
            icon: 'table',
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
            component: '404',
          }
        ]
      }
    ]
  }
]