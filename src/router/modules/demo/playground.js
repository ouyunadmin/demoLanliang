import Layout from '@/views/layout'

const meta = { name: 'playground' }

export default {
  path: '/playground',
  component: Layout,
  redirect: 'noredirect',
  alwaysShow: true,
  name: 'Playground',
  meta: {
    title: '试验',
    icon: 'todo_icon09'
  },
  children: (pre => [
    { path: '/iframe', alwaysShow: true, redirect: 'noredirect', name: `${pre}Iframe`, meta: { ...meta, title: 'iframe报表' },
      children: [
        { path: '/iframe/demo1', name: `${pre}Demo1`, meta: { ...meta, showIframe: true, title: '报表1', src: 'http://oms.hsmro.cn/WebReport/ReportServer?reportlet=outboundReconciliationDetails.cpt' }},
        { path: '/iframe/demo2', name: `${pre}Demo2`, meta: { ...meta, showIframe: true, title: '报表2', src: 'http://oms.hsmro.cn/WebReport/ReportServer?reportlet=outboundWarehouseDetails.cpt' }}
      ]
    },
    { path: '/playground/drawer', component: () => import('@/views/example/playground/drag-drawer'), name: `${pre}Drawer`, meta: { ...meta, title: '拖动抽屉' }},
    { path: '/playground/list', component: () => import('@/views/example/playground/drag-list'), name: `${pre}List`, meta: { ...meta, title: '拖拽列表' }},
    { path: '/playground/area', component: () => import('@/views/example/playground/choose-area'), name: `${pre}ChooseArea`, meta: { ...meta, title: '地址选择' }},
    { path: '/playground/hoc', component: () => import('@/views/example/playground/hoc'), name: `${pre}Hoc`, meta: { ...meta, title: '高阶组件' }},
    // 组织结构树组件,不支持IE10
    { path: '/playground/org', component: () => import('@/views/example/playground/org-tree'), name: `${pre}Org`, meta: { ...meta, title: '组织机构' }},
    /*
     * 这里存放不显示的菜单
     */
    { path: '/playground/hidden', hidden: true, redirect: 'noredirect', name: `${pre}Hidden`, meta: { ...meta, title: '隐藏菜单' },
      children: [
      ]
    }
  ])('Playground')
}
