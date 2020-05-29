import Layout from '@/views/layout'

const meta = { name: 'authority' }

export default {
  path: '/authority',
  component: Layout,
  redirect: 'noredirect',
  alwaysShow: false,
  name: 'Authority',
  meta: {
    title: '权限管理',
    icon: 'icon04'
  },
  children: (pre => [
    { path: '/authority/menu', component: () => import('@/views/example/authority/menu'), name: `${pre}Menu`, meta: { ...meta, title: '菜单管理' }},
    { path: '/authority/roles', component: () => import('@/views/example/authority/roles'), name: `${pre}Roles`, meta: { ...meta, title: '角色管理' }},
    /*
     * 这里存放不显示的菜单
     */
    { path: '/authority/hidden', hidden: true, redirect: 'noredirect', name: `${pre}Hidden`, meta: { ...meta, title: '隐藏菜单' },
      children: [
      ]
    }
  ])('Authority')
}
