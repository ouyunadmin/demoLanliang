import Layout from '@/views/layout'

const meta = { name: 'example' }

export default {
  path: '/example',
  component: Layout,
  redirect: 'noredirect',
  alwaysShow: true,
  name: 'Example',
  meta: {
    title: '应用实例',
    icon: 'component',
    roles: ['admin']
  },
  children: (pre => [
    { path: '/example/better-scroll', alwaysShow: true, redirect: 'noredirect', name: `${pre}BetterScroll`, meta: { ...meta, title: '滚动组件' },
      children: [
        { path: '/example/base', component: () => import('@/views/example/better-scroll/base.vue'), name: `${pre}BetterScrollBase`, meta: { ...meta, title: '基础用法' }},
        { path: '/example/to', component: () => import('@/views/example/better-scroll/to.vue'), name: `${pre}BetterScrollTo`, meta: { ...meta, title: '滚动定位' }}
      ]
    },
    { path: '/example/log', alwaysShow: true, redirect: 'noredirect', name: `${pre}Log`, meta: { ...meta, title: '日志' },
      children: [
        { path: '/example/log/log', component: () => import('@/views/example/log/log'), name: `${pre}LogLog`, meta: { ...meta, title: '日志记录' }},
        { path: '/example/log/error', component: () => import('@/views/example/log/error'), name: `${pre}LogError`, meta: { ...meta, title: '错误捕获' }},
        { path: '/example/log/console', component: () => import('@/views/example/log/console'), name: `${pre}LogConsole`, meta: { ...meta, title: '控制台打印' }}
      ]
    },
    { path: '/example/db', alwaysShow: true, redirect: 'noredirect', name: `${pre}Db`, meta: { ...meta, title: '数据缓存' },
      children: [
        { path: '/example/db/all', component: () => import('@/views/example/db/all'), name: `${pre}DbAll`, meta: { ...meta, title: '总览' }},
        { path: '/example/db/public', component: () => import('@/views/example/db/public'), name: `${pre}DbPublic`, meta: { ...meta, title: '公共存储' }},
        { path: '/example/db/user', component: () => import('@/views/example/db/user'), name: `${pre}DbUser`, meta: { ...meta, title: '私有数据' }},
        { path: '/example/db/page-public', component: () => import('@/views/example/db/page-public'), name: `${pre}DbPagePublic`, meta: { ...meta, title: '路由存储' }},
        { path: '/example/db/page-user', component: () => import('@/views/example/db/page-user'), name: `${pre}DbPageUser`, meta: { ...meta, title: '私有路由存储' }},
        { path: '/example/db/page-snapshot-public', component: () => import('@/views/example/db/page-snapshot-public'), name: `${pre}DbPageSnapshotPublic`, meta: { ...meta, title: '路由快照' }},
        { path: '/example/db/page-snapshot-user', component: () => import('@/views/example/db/page-snapshot-user'), name: `${pre}DbPageSnapshotUser`, meta: { ...meta, title: '私有路由快照' }}
      ]
    },
    { path: '/example/empty', alwaysShow: true, redirect: 'noredirect', name: `${pre}Empty`, meta: { ...meta, title: '空菜单' },
      children: [
        { path: '', name: `${pre}Empty1`, meta: { ...meta, title: '开发中1' }},
        { path: '', name: `${pre}Empty2`, meta: { ...meta, title: '开发中2' }}
      ]
    },
    { path: '/example/link', alwaysShow: true, name: `${pre}Link`, meta: { ...meta, title: '新窗口' },
      children: [
        { path: 'https://juejin.im/', meta: { ...meta, title: '掘金' }},
        { path: 'https://my.oschina.net/', meta: { ...meta, title: '开源中国' }}
      ]
    },
    /*
     * 这里存放不显示的菜单
     */
    { path: '/example/hidden', hidden: true, redirect: 'noredirect', name: `${pre}Hidden`, meta: { ...meta, title: '隐藏菜单' },
      children: [
      ]
    },
    { path: '/example/clipboard', component: () => import('@/views/example/clipboard/index'), name: `${pre}Clipboard`, meta: { ...meta, title: '复制', noCache: false }},
    { path: '/example/cookie', component: () => import('@/views/example/js-cookie'), name: `${pre}Cookie`, meta: { ...meta, title: 'Cookie' }},
    { path: '/example/highlight', component: () => import('@/views/example/highlight'), name: `${pre}Highlight`, meta: { ...meta, title: '代码高亮' }},
    { path: '/example/filters', component: () => import('@/views/example/filters/day'), name: `${pre}Filters`, meta: { ...meta, title: '过滤器' }},
    { path: '/example/ua', component: () => import('@/views/example/ua'), name: `${pre}Ua`, meta: { ...meta, title: '浏览器信息' }}
  ])('Example')
}
