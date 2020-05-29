import Layout from '@/views/layout'

const meta = { name: 'icon' }

export default {
  path: '/icon',
  component: Layout,
  redirect: 'noredirect',
  alwaysShow: true,
  name: 'Icon',
  meta: {
    title: '图标',
    icon: 'icon'
  },
  children: (pre => [
    { path: '/icon/svg', component: () => import('@/views/example/icons/svg'), name: `${pre}Svg`, meta: { ...meta, title: 'SVG图标' }},
    { path: '/icon/icon', component: () => import('@/views/example/icons/icon'), name: `${pre}Icon`, meta: { ...meta, title: '图标组件' }},
    { path: '/icon/font', component: () => import('@/views/example/icons/font'), name: `${pre}Font`, meta: { ...meta, title: '字体组件' }},
    /*
     * 这里存放不显示的菜单
     */
    { path: '/icon/hidden', hidden: true, redirect: 'noredirect', name: `${pre}Hidden`, meta: { ...meta, title: '隐藏菜单' },
      children: [
      ]
    }
  ])('Icon')
}
