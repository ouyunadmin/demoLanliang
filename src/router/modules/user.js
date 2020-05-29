import Layout from '@/views/layout'

const meta = { name: 'user' }

export default {
  path: '/user',
  component: Layout,
  redirect: 'noredirect',
  alwaysShow: true,
  name: 'user',
  meta: {
    title: '用户与企业',
    icon: 'peoples'
  },
  children: (pre => [
    { path: '/user/enterprises', component: () => import('@/views/user/enterprises'), name: `${pre}Enterprises`, meta: { ...meta, title: '环保企业列表' }},
    /*
     * 这里存放不显示的菜单
     */
    { path: '/user/hidden', hidden: true, redirect: 'noredirect', name: `${pre}Hidden`, meta: { ...meta, title: '隐藏菜单' },
      children: [
        { path: '/user/enterprises/detail', component: () => import('@/views/user/enterprisesDetail'), name: `${pre}EnterprisesDetail`, meta: { ...meta, title: '用户详情' }},
        { path: '/user/enterprises/edit', component: () => import('@/views/user/enterprisesEdit'), name: `${pre}EnterprisesEdit`, meta: { ...meta, title: '资料编辑' }},
        { path: '/user/verify/detail', component: () => import('@/views/user/verifyDetail'), name: `${pre}VerifyDetail`, meta: { ...meta, title: '企业资料审核' }}
      ]
    }
  ])('User')
}
