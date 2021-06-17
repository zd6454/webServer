export default [
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
      {
        path: '/contentManage/abroadStep',
        name: '留学流程',
        icon: 'smile',
        component: './contentManage/abroadStep',
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
    name: '校友会',
    icon: 'table',
    path: '/schoolMate',
    routes: [
      {
        path: '/schoolMate/structural',
        name: '校友架构',
        icon: 'smile',
        component: './schoolMate/structural',
      },
      {
        path: '/schoolMate/events',
        name: '校友活动',
        icon: 'smile',
        component: './schoolMate/events',
      },
      {
        path: '/schoolMate/agency',
        name: '代理权益',
        icon: 'smile',
        component: './schoolMate/agency',
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
