export const menu = [
  {
    parent: null,
    id: 0,
    text: '文章管理',
    icon: 'mdi-credit-card',
    path: 'article',
    scr: 'article',
    chilren: [
      {
        parent: 0,
        id: 0,
        text: '标签管理',
        icon: 'mdi-label',
        path: 'catptchs',
        scr: 'catptchs',
        chilren: [],
      },
      {
        parent: 0,
        id: 1,
        text: '文章列表',
        icon: 'mdi-format-list-bulleted',
        path: 'list',
        scr: 'list',
        chilren: [],
      },
      {
        parent: null,
        id: 2,
        text: '文章发布',
        icon: 'mdi-notebook-edit-outline',
        path: 'publish',
        scr: 'publish',
        chilren: [],
      },
    ],
  },
  {
    parent: null,
    id: 1,
    text: '作品管理',
    icon: 'mdi-compass-rose',
    path: 'preject',
    scr: 'preject',
    chilren: [],
  },
  {
    parent: null,
    id: 1,
    text: '系统管理',
    icon: 'mdi-cog',
    path: 'system',
    scr: 'system',
    chilren: [
      {
        parent: null,
        id: 1,
        text: '关于',
        icon: 'mdi-cog',
        path: 'about',
        scr: 'about',
      },
      {
        parent: null,
        id: 1,
        text: '菜单管理',
        icon: 'mdi-menu',
        path: 'menus',
        scr: 'menus',
        chilren: [],
      },
    ],
  },
]
