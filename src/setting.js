export default {
  // 快捷键
  // 支持快捷键 例如 ctrl+shift+q
  hotkey: {
    search: {
      open: 'shift+q',
      close: 'esc'
    }
  },
  // 侧边栏默认折叠状态
  menu: {
    sidebar: false
  },
  // 在读取持久化数据失败时默认页面
  page: {
    opened: [
      {
        name: 'Home',
        fullPath: '/home',
        path: '/home',
        meta: {
          title: '首页',
          noCache: true,
          affix: true
        }
      }
    ]
  },
  // 菜单搜索
  search: {
    enable: true
  },
  // 系统名称
  system: {
    name: 'demo平台'
  },
  // 注册的主题
  theme: {
    // element-ui 主题列表
    list: [
      {
        title: '环保',
        name: 'hb',
        backgroundImage: 'images/theme/purple.jpg',
        // element-ui 主题颜色 必填 sass皮肤设置相对应的颜色
        color: '#0275b2'
      },
      {
        title: '蓝色',
        name: 'default',
        backgroundImage: 'images/theme/default.jpg',
        // element-ui 主题颜色 必填 sass皮肤设置相对应的颜色
        color: '#409EFF'
      }
    ],
    // element-ui 默认主题颜色
    color: '#409EFF'
  },
  // 多国语
  lang: {
    // 语言列表
    list: [
      {
        name: '中文',
        label: 'zh'
      },
      {
        name: '日本語',
        label: 'ja'
      },
      {
        name: 'English',
        label: 'en'
      }
    ],
    // 默认语言
    active: 'zh'
  },
  // 是否默认开启页面切换动画
  transition: {
    active: false
  },
  // 在读取持久化数据失败时默认用户信息
  user: {
    info: {
      name: 'user',
      roles: [],
      elements: {},
      menus: {}
    }
  }
}
