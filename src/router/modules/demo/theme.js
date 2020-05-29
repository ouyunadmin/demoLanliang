import Layout from '@/views/layout'

const meta = { name: 'theme' }

export default {
  path: '/theme',
  component: Layout,
  redirect: 'noredirect',
  alwaysShow: false,
  name: 'Theme',
  meta: {
    title: '主题',
    icon: 'theme'
  },
  children: (pre => [
    { path: '/theme', component: () => import('@/views/example/theme'), name: `${pre}Index`, meta: { ...meta, title: '主题', icon: 'theme' }},
    /*
     * 这里存放不显示的菜单
     */
    { path: '/theme/hidden', hidden: true, redirect: 'noredirect', name: `${pre}Hidden`, meta: { ...meta, title: '隐藏菜单' },
      children: [
      ]
    }
  ])('Theme')
}
