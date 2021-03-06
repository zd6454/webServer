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
    routes: [
      {
        path: '/contentManage/slideshow',
        name: '轮播图',
        icon: 'smile',
        component: './contentManage/slideshow',
      },
      {
        path: '/contentManage/notice',
        name: '置顶通知',
        icon: 'smile',
        component: './contentManage/notice',
      },
      {
        path: '/contentManage/slideshow/slideDetail',
        name: '轮播图详情',
        hideInMenu: 'true',
        icon: 'smile',
        component: './contentManage/slideshow/slideDetail',
      },
      {
        path: '/contentManage/notice/detail',
        name: '通知详情',
        hideInMenu: 'true',
        icon: 'smile',
        component: './contentManage/notice/noticeDetail',
      },
      {
        path: '/contentManage/photo',
        name: '校园相册',
        icon: 'smile',
        component: './contentManage/photo',
      },
      {
        path: '/contentManage/photo/detail',
        name: '相册详情',
        icon: 'smile',
        hideInMenu:'true',
        component: './contentManage/photo/photoDetail',
      },
      {
        path: '/contentManage/activity',
        name: '活动咨询',
        icon: 'smile',
        component: './contentManage/activity',
      },
      {
        path: '/contentManage/activity/detail',
        name: '活动详情',
        icon: 'smile',
        hideInMenu:'true',
        component: './contentManage/activity/activityDetail',
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
        path: '/contentManage/cooperation',
        name: '国际合作',
        icon: 'smile',
        component: './contentManage/cooperation',
      },
      {
        path: '/contentManage/cooperation/detail',
        name: '合作详情',
        icon: 'smile',
        hideInMenu: 'true',
        component: './contentManage/cooperation/cooperationDetail',
      },
      // {
      //   path: '/contentManage/abroadStep',
      //   name: '留学流程',
      //   icon: 'smile',
      //   component: './contentManage/abroadStep',
      // },
      {
        path: '/contentManage/contactUs',
        name: '联系我们',
        icon: 'smile',
        component: './contentManage/contactUs',
      },
    ],
  },
  {
    path: '/collegeFriend',
    name: '校友会',
    icon: 'branches',
    routes: [
      {
        path: '/collegeFriend/friendMenu',
        name: '校友清单',
        icon: 'smile',
        component: './collegeFriend/friendMenu',
      },
      {
        path: '/collegeFriend/friendMenu/detail',
        name: '校友详情',
        icon: 'smile',
        hideInMenu: 'true',
        component: './collegeFriend/friendMenu/friendMenuDetail',
      },
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
        name: '校友推荐奖励',
        icon: 'smile',
        component: './collegeFriend/agency',
      },
    ],
  },
  {
    path: '/schoolDetail',
    name: '学校概况',
    icon: 'crown',
    routes: [
      {
        path: '/schoolDetail/schoolVideo',
        name: '视频管理',
        icon: 'smile',
        component: './schoolDetail/schoolVideo',
      },
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
        path: '/schoolDetail/department',
        name: '学部介绍',
        icon: 'smile',
        component: './schoolDetail/department',
      },
      {
        path: '/schoolDetail/department/detail',
        name: '学部具体',
        icon: 'smile',
        hideInMenu: 'true',
        component: './schoolDetail/department/departmentDetail',
      },
      {
        path: '/schoolDetail/classInfo',
        name: '课程介绍',
        icon: 'smile',
        component: './schoolDetail/classInfo',
      },
    ],
  },
  {
    path: '/forumDetail',
    name: '论坛管理',
    icon: 'crown',
    routes: [
      {
        path: '/forumDetail/manageForum',
        name: '管理员论坛',
        icon: 'smile',
        component: './forumDetail/manageForum',
      },
      {
        path: '/forumDetail/forumComment',
        name: '论坛评论',
        hideInMenu: 'true',
        icon: 'smile',
        component: './forumDetail/forumComment',
      },
      {
        path: '/forumDetail/allForumDetail',
        name: '论坛详情',
        icon: 'smile',
        hideInMenu: 'true',
        component: './forumDetail/allForumDetail',
      },
      {
        path: '/forumDetail/forumComment/detail',
        name: '评论详情',
        icon: 'smile',
        hideInMenu: 'true',
        component: './forumDetail/forumComment/forumMenuDetail',
      },
      {
        path: '/forumDetail/userForum',
        name: '用户论坛',
        icon: 'smile',
        component: './forumDetail/userForum',
      },
    ],
  },
  {
    path: '/userManage',
    name: '用户管理',
    icon: 'crown',
    routes: [
      {
        path: '/userManage/userList',
        name: '用户列表',
        icon: 'smile',
        component: './userManage/userList',
      },
      {
        path: '/userManage/userList/userDetail',
        name: '用户详情',
        hideInMenu: 'true',
        icon: 'smile',
        component: './userManage/userList/userDetail',
      },
      {
        path: '/userManage/messageMenu',
        name: '消息清单',
        icon: 'smile',
        component: './userManage/messageMenu',
      },
      {
        path: '/userManage/messageMenu/detail',
        name: '消息清单',
        hideInMenu:'true',
        icon: 'smile',
        component: './userManage/messageMenu/messageDetail',
      },
      {
        path: '/userManage/messageSend',
        name: '消息发送',
        icon: 'smile',
        component: './userManage/messageSend',
      },
      {
        path: '/userManage/abroadMaterial',
        name: '留学材料',
        icon: 'smile',
        component: './userManage/abroadMaterial',
      },
      {
        path: '/userManage/abroadMaterial/detail',
        name: '材料详情',
        icon: 'smile',
        hideInMenu:'true',
        component: './userManage/abroadMaterial/abroadDetail',
      },
    ],
  },
  {
    path: '/adminManage',
    name: '管理员管理',
    icon: 'crown',
    component: './adminManage',
  },
  // {
  //   path: '/admin',
  //   name: 'admin',
  //   icon: 'crown',
  //   access: 'canAdmin',
  //   component: './Admin',
  //   routes: [
  //     {
  //       path: '/admin/sub-page',
  //       name: 'sub-page',
  //       icon: 'smile',
  //       component: './Welcome',
  //     },
  //   ],
  // },
  {
    path: '/',
    redirect: '/contentManage/slideshow',
  },
  {
    component: './404',
  },
];
