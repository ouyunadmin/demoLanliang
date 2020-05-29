import Layout from '@/views/layout'

const meta = { name: 'day' }

export default {
  path: '/day',
  component: Layout,
  redirect: 'noredirect',
  alwaysShow: false,
  name: 'Day',
  meta: {
    title: '日期计算',
    icon: 'todo_icon02'
  },
  children: (pre => [
    { path: '/day', component: () => import('@/views/example/day'), name: `${pre}Index`, meta: { ...meta, title: '日期计算', icon: 'todo_icon02' }},
    /*
     * 这里存放不显示的菜单
     */
    { path: '/day/hidden', hidden: true, redirect: 'noredirect', name: `${pre}Hidden`, meta: { ...meta, title: '隐藏菜单' },
      children: [
      ]
    }
  ])('Day')
}
