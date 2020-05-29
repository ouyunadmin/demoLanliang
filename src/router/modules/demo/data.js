import Layout from '@/views/layout'

const meta = { name: 'data' }

export default {
  path: '/data',
  component: Layout,
  redirect: 'noredirect',
  alwaysShow: true,
  name: 'Data',
  meta: {
    title: '数据模型',
    icon: 'guide'
  },
  children: (pre => [
    { path: '/data/input', component: () => import('@/views/example/data/input/index'), name: `${pre}Input`, meta: { ...meta, title: 'input' }},
    { path: '/data/treeselect', component: () => import('@/views/example/data/treeselect/index'), name: `${pre}Treeselect`, meta: { ...meta, title: '树形选择' }},
    { path: '/data/button', component: () => import('@/views/example/data/button/index'), name: `${pre}Button`, meta: { ...meta, title: 'button' }},
    { path: '/data/radio', component: () => import('@/views/example/data/radio/index'), name: `${pre}Radio`, meta: { ...meta, title: 'radio' }},
    { path: '/data/checkbox', component: () => import('@/views/example/data/checkbox/index'), name: `${pre}Checkbox`, meta: { ...meta, title: 'checkbox' }},
    { path: '/data/link', component: () => import('@/views/example/data/link/index'), name: `${pre}Link`, meta: { ...meta, title: '文字链接' }},
    { path: '/data/input-number', component: () => import('@/views/example/data/input-number/index'), name: `${pre}InputNumber`, meta: { ...meta, title: '计数器' }},
    { path: '/data/select', component: () => import('@/views/example/data/select/index'), name: `${pre}Select`, meta: { ...meta, title: 'select' }},
    { path: '/data/cascader', component: () => import('@/views/example/data/cascader/index'), name: `${pre}Cascader`, meta: { ...meta, title: 'cascader' }},
    { path: '/data/switch', component: () => import('@/views/example/data/switch/index'), name: `${pre}Switch`, meta: { ...meta, title: 'switch' }},
    { path: '/data/slider', component: () => import('@/views/example/data/slider/index'), name: `${pre}Slider`, meta: { ...meta, title: 'slider' }},
    { path: '/data/time-picker', component: () => import('@/views/example/data/time-picker/index'), name: `${pre}TimePicker`, meta: { ...meta, title: 'time-picker' }},
    { path: '/data/date-picker', component: () => import('@/views/example/data/date-picker/index'), name: `${pre}DatePicker`, meta: { ...meta, title: 'date-picker' }},
    { path: '/data/date-time-picker', component: () => import('@/views/example/data/date-time-picker/index'), name: `${pre}DateTimePicker`, meta: { ...meta, title: 'date-time-picker' }},
    { path: '/data/upload', component: () => import('@/views/example/data/upload/index'), name: `${pre}Upload`, meta: { ...meta, title: 'upload' }},
    { path: '/data/rate', component: () => import('@/views/example/data/rate/index'), name: `${pre}Rate`, meta: { ...meta, title: 'rate' }},
    { path: '/data/color-picker', component: () => import('@/views/example/data/color-picker/index'), name: `${pre}ColorPicker`, meta: { ...meta, title: 'color-picker' }},
    { path: '/data/transfer', component: () => import('@/views/example/data/transfer/index'), name: `${pre}Transfer`, meta: { ...meta, title: 'transfer' }},
    { path: '/data/form', component: () => import('@/views/example/data/form/index'), name: `${pre}Form`, meta: { ...meta, title: 'form' }},
    { path: '/data/table', component: () => import('@/views/example/data/table/index'), name: `${pre}Table`, meta: { ...meta, title: 'table' }},
    { path: '/data/tag', component: () => import('@/views/example/data/tag/index'), name: `${pre}Tag`, meta: { ...meta, title: 'tag' }},
    { path: '/data/progress', component: () => import('@/views/example/data/progress/index'), name: `${pre}Progress`, meta: { ...meta, title: 'progress' }},
    { path: '/data/tree', component: () => import('@/views/example/data/tree/index'), name: `${pre}Tree`, meta: { ...meta, title: 'tree' }},
    { path: '/data/badge', component: () => import('@/views/example/data/badge/index'), name: `${pre}Badge`, meta: { ...meta, title: 'badge' }},
    { path: '/data/alert', component: () => import('@/views/example/data/alert/index'), name: `${pre}Alert`, meta: { ...meta, title: 'alert' }},
    { path: '/data/loading', component: () => import('@/views/example/data/loading/index'), name: `${pre}Loading`, meta: { ...meta, title: 'loading' }},
    { path: '/data/message', component: () => import('@/views/example/data/message/index'), name: `${pre}Message`, meta: { ...meta, title: 'message' }},
    { path: '/data/message-box', component: () => import('@/views/example/data/message-box/index'), name: `${pre}MessageBox`, meta: { ...meta, title: 'message-box' }},
    { path: '/data/notification', component: () => import('@/views/example/data/notification/index'), name: `${pre}Notification`, meta: { ...meta, title: 'notification' }},
    { path: '/data/drop-down', component: () => import('@/views/example/data/drop-down/index'), name: `${pre}DropDown`, meta: { ...meta, title: 'drop-down' }},
    { path: '/data/steps', component: () => import('@/views/example/data/steps/index'), name: `${pre}Steps`, meta: { ...meta, title: 'steps' }},
    { path: '/data/dialog', component: () => import('@/views/example/data/dialog/index'), name: `${pre}Dialog`, meta: { ...meta, title: 'dialog' }},
    { path: '/data/tooltip', component: () => import('@/views/example/data/tooltip/index'), name: `${pre}Tooltip`, meta: { ...meta, title: 'tooltip' }},
    { path: '/data/popover', component: () => import('@/views/example/data/popover/index'), name: `${pre}Popover`, meta: { ...meta, title: 'popover' }},
    { path: '/data/carousel', component: () => import('@/views/example/data/carousel/index'), name: `${pre}Carousel`, meta: { ...meta, title: 'carousel' }},
    { path: '/data/collapse', component: () => import('@/views/example/data/collapse/index'), name: `${pre}Collapse`, meta: { ...meta, title: 'collapse' }},
    { path: '/data/timeline', component: () => import('@/views/example/data/timeline/index'), name: `${pre}Timeline`, meta: { ...meta, title: 'timeline' }},

    /*
     * 这里存放不显示的菜单
     */
    { path: '/data/hidden', hidden: true, redirect: 'noredirect', name: `${pre}Hidden`, meta: { ...meta, title: '隐藏菜单' },
      children: [
      ]
    }
  ])('Data')
}
