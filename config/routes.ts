﻿export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/login',
          },
        ],
      },
    ],
  },
  {
    path: '/contentManage',
    name: '内容管理',
    icon: 'branches',
    routes:[
      {
        path: '/contentManage/slideshow',
        name: '轮播图',
        icon: 'smile',
        component: './contentManage/slideshow',
      },
      // {
      //   path: '/contentManage/notice',
      //   name: '置顶通知',
      //   icon: 'smile',
      //   component: './contentManage/notice',
      // },
      {
        path: '/contentManage/slideshow/slideDetail',
        name: '轮播图详情',
        hideInMenu: 'true',
        icon: 'smile',
        component: './contentManage/slideshow/slideDetail',
      },
      {
        path: '/contentManage/eastOffice',
        name: '东亚办公室',
        icon: 'smile',
        component: './contentManage/eastOffice',
      },
      {
        path: '/contentManage/undergraduate',
        name: '本科生教育',
        icon: 'smile',
        component: './contentManage/undergraduate',
      },
      {
        path: '/contentManage/graduate',
        name: '研究生教育',
        icon: 'smile',
        component: './contentManage/graduate',
      },
      {
        path: '/contentManage/doctor',
        name: '博士生教育',
        icon: 'smile',
        component: './contentManage/doctor',
      },
      // {
      //   path: '/contentManage/cooperation',
      //   name: '国际合作',
      //   icon: 'smile',
      //   component: './contentManage/cooperation',
      // },
      {
        path: '/contentManage/abroadStep',
        name: '留学流程',
        icon: 'smile',
        component: './contentManage/abroadStep',
      },
    ]
  },
  {
    path: '/collegeFriend',
    name: '校友会',
    icon: 'branches',
    routes:[
      // {
      //   path: '/collegeFriend/friend',
      //   name: '校友清单',
      //   // icon: 'smile',
      //   routes:[
      //     {
      //       path: '/collegeFriend/friend/menu',
      //       name: '校友清单',
      //       icon: 'smile',
      //       component: './collegeFriend/FriendMenu',
      //     },
      //     {
      //       path: '/collegeFriend/friend/detail',
      //       name: '校友具体',
      //       icon: 'smile',
      //       component: './collegeFriend/FriendDetail',
      //     },
      //   ]
      //   // component: './collegeFriend/slideshow',
      // },
      // {
      //   path: '/collegeFriend/friendMenu',
      //   name: '校友清单',
      //   icon: 'smile',
      //   component: './collegeFriend/friendMenu',
      // },
      {
        path: '/collegeFriend/structural',
        name: '校友架构',
        icon: 'smile',
        component: './collegeFriend/structural',
      },
      {
        path: '/collegeFriend/events',
        name: '校友活动',
        icon: 'smile',
        component: './collegeFriend/events',
      },
      {
        path: '/collegeFriend/agency',
        name: '代理权益',
        icon: 'smile',
        component: './collegeFriend/agency',
      },
    ]
  },
  {
    path: '/schoolDetail',
    name: '学校概况',
    icon: 'crown',
    routes:[
      {
        path: '/schoolDetail/schoolInfo',
        name: '学校简介',
        icon: 'smile',
        component: './schoolDetail/schoolInfo',
      },
      {
        path: '/schoolDetail/teachPower',
        name: '教学实力',
        icon: 'smile',
        component: './schoolDetail/teachPower',
      },
      {
        path: '/schoolDetail/learnExc',
        name: '学习体验',
        icon: 'smile',
        component: './schoolDetail/learnExc',
      },
      // {
      //   path: '/schoolDetail/department',
      //   name: '学部介绍',
      //   icon: 'smile',
      //   component: './schoolDetail/department',
      // },
      {
        path: '/schoolDetail/classInfo',
        name: '课程介绍',
        icon: 'smile',
        component: './schoolDetail/classInfo',
      },
    ]
  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
    component: './Admin',
    routes: [
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        icon: 'smile',
        component: './Welcome',
      },
    ],
  },
  {
    path: '/',
    redirect: '/contentManage/slideshow',
  },
  {
    component: './404',
  },
];
