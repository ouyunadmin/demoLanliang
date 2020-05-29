import Layout from '@/views/layout'

const meta = { name: 'import' }

export default {
  path: '/import',
  component: Layout,
  redirect: 'noredirect',
  alwaysShow: false,
  name: 'Import',
  meta: {
    title: '导入',
    icon: 'excel'
  },
  children: (pre => [
    { path: '/import/excel', component: () => import('@/views/example/import/excel'), name: `${pre}Excel`, meta: { ...meta, title: 'Excel上传', icon: 'excel' }},
    /*
     * 这里存放不显示的菜单
     */
    { path: '/import/hidden', hidden: true, redirect: 'noredirect', name: `${pre}Hidden`, meta: { ...meta, title: '隐藏菜单' },
      children: [
      ]
    }
  ])('Import')
}
