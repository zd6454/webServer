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
    name: 'list.table-list',
    icon: 'table',
    path: '/list',
    component: './ListTableList',
  },
  {
    path: '/',
    redirect: '/contentManage/slideshow',
  },
  {
    component: './404',
  },
];
