import Layout from '@/views/layout'

const meta = { name: 'table' }

export default {
  path: '/table',
  component: Layout,
  redirect: 'noredirect',
  alwaysShow: false,
  name: 'Table',
  meta: {
    title: 'Table',
    icon: 'table'
  },
  children: (pre => [
    { path: '/table/list', component: () => import('@/views/example/table/list'), name: `${pre}List`, meta: { ...meta, title: '综合列表' }},
    { path: '/table/common', component: () => import('@/views/example/table/common'), name: `${pre}Common`, meta: { ...meta, title: '常用列表' }},
    { path: '/table/tree', component: () => import('@/views/example/table/tree/index'), name: `${pre}Tree`, meta: { ...meta, title: '树形菜单' }},
    { path: '/table/transfer', component: () => import('@/views/example/table/transfer/index'), name: `${pre}Transfer`, meta: { ...meta, title: '穿梭框' }},
    { path: '/table/drag-table', component: () => import('@/views/example/table/dragTable'), name: `${pre}Drag`, meta: { ...meta, title: '行拖拽' }},
    { path: '/table/inline-edit-table', component: () => import('@/views/example/table/inlineEditTable'), name: `${pre}Edit`, meta: { ...meta, title: '行编辑' }},
    { path: '/table/tree-table', component: () => import('@/views/example/table/tree-table'), name: `${pre}TreeTable`, meta: { ...meta, title: '树形表格' }},
    { path: '/table/custom-table', component: () => import('@/views/example/table/custom-table'), name: `${pre}CustomTable`, meta: { ...meta, title: '自定义树形表格' }},
    /*
     * 这里存放不显示的菜单
     */
    { path: '/table/hidden', hidden: true, redirect: 'noredirect', name: `${pre}Hidden`, meta: { ...meta, title: '隐藏菜单' },
      children: [
      ]
    }
  ])('Table')
}
