import Layout from '@/views/layout'

const meta = { name: 'form' }

export default {
  path: '/form',
  component: Layout,
  redirect: 'noredirect',
  alwaysShow: true,
  name: 'Form',
  meta: {
    title: '表单',
    icon: 'form'
  },
  children: (pre => [
    { path: '/form/add', component: () => import('@/views/example/form/add'), name: `${pre}Add`, meta: { ...meta, title: '创建表单' }},
    { path: '/form/check', component: () => import('@/views/example/form/check'), name: `${pre}Check`, meta: { ...meta, title: '表单验证' }},
    { path: '/form/dialog', component: () => import('@/views/example/form/dialog/index'), name: `${pre}Dialog`, meta: { ...meta, title: 'dialog' }},
    /*
     * 这里存放不显示的菜单
     */
    { path: '/form/hidden', hidden: true, redirect: 'noredirect', name: `${pre}Hidden`, meta: { ...meta, title: '隐藏菜单' },
      children: [
        { path: '/form/detail', component: () => import('@/views/example/form/detail'), name: `${pre}Detail`, meta: { ...meta, title: '表单详情', activeMenu: '/table/list' }},
        { path: '/form/edit', component: () => import('@/views/example/form/edit'), name: `${pre}Edit`, meta: { ...meta, title: '编辑表单', activeMenu: '/table/list' }}
      ]
    }
  ])('Form')
}
