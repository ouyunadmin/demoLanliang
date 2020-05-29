import Layout from '@/views/layout'

const meta = { name: 'iframe', showIframe: true }

export default {
  path: '/iframe',
  component: Layout,
  redirect: 'noredirect',
  alwaysShow: true,
  name: 'Iframe',
  meta: {
    title: 'iframe',
    icon: 'tab'
  },
  children: (pre => [
    { path: '/iframe/demo1', name: `${pre}Demo1`, meta: { ...meta, title: '报表1', src: 'http://oms.hsmro.cn/WebReport/ReportServer?reportlet=outboundReconciliationDetails.cpt' }},
    { path: '/iframe/demo2', name: `${pre}Demo2`, meta: { ...meta, title: '报表2', src: 'http://oms.hsmro.cn/WebReport/ReportServer?reportlet=outboundWarehouseDetails.cpt' }},
    /*
     * 这里存放不显示的菜单
     */
    { path: '/iframe/hidden', hidden: true, redirect: 'noredirect', name: `${pre}Hidden`, meta: { ...meta, title: '隐藏菜单' },
      children: [
      ]
    }
  ])('Iframe')
}
