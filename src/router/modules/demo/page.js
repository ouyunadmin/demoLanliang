import Layout from '@/views/layout'

const meta = { name: 'page' }

export default {
  path: '/page',
  component: Layout,
  redirect: 'noredirect',
  alwaysShow: false,
  name: 'Page',
  meta: {
    title: '标签页管理',
    icon: 'nested'
  },
  children: (pre => [
    { path: '/page/tag', component: () => import('@/views/example/page'), name: `${pre}Tag`, meta: { ...meta, title: '标签页管理', icon: 'todo_icon07' }},
    /*
     * 这里存放不显示的菜单
     */
    { path: '/page/hidden', hidden: true, redirect: 'noredirect', name: `${pre}Hidden`, meta: { ...meta, title: '隐藏菜单' },
      children: [
      ]
    }
  ])('Page')
}
