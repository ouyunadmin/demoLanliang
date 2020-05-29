import Layout from '@/views/layout'

const meta = { name: 'lang' }

export default {
  path: '/lang',
  component: Layout,
  redirect: 'noredirect',
  alwaysShow: false,
  name: 'Lang',
  meta: {
    title: '多国语',
    icon: 'international'
  },
  children: (pre => [
    { path: '/lang/demo', component: () => import('@/views/example/i18n/demo'), name: `${pre}Demo`, meta: { ...meta, title: '多国语', icon: 'international', affix: false }},
    /*
     * 这里存放不显示的菜单
     */
    { path: '/lang/hidden', hidden: true, redirect: 'noredirect', name: `${pre}Hidden`, meta: { ...meta, title: '隐藏菜单' },
      children: [
      ]
    }
  ])('Lang')
}
