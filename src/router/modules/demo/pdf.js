import Layout from '@/views/layout'

const meta = { name: 'pdf' }

export default {
  path: '/pdf',
  component: Layout,
  redirect: 'noredirect',
  alwaysShow: false,
  name: 'Pdf',
  meta: {
    title: 'PDF',
    icon: 'pdf'
  },
  children: (pre => [
    { path: '/pdf/index', component: () => import('@/views/example/pdf'), name: `${pre}Index`, meta: { ...meta, title: 'PDF', icon: 'pdf' }},
    /*
     * 这里存放不显示的菜单
     */
    { path: '/pdf/hidden', hidden: true, redirect: 'noredirect', name: `${pre}Hidden`, meta: { ...meta, title: '隐藏菜单' },
      children: [
      ]
    }
  ])('Pdf')
}
