import Layout from '@/views/layout'

const meta = { name: 'container' }

export default {
  path: '/container',
  component: Layout,
  redirect: 'noredirect',
  alwaysShow: true,
  name: 'Container',
  meta: {
    title: '页面布局',
    icon: 'tree-table'
  },
  children: (pre => [
    { path: '/container/splitpane', name: `${pre}Splitpane`, component: () => import('@/views/example/container/splitpane.vue'), meta: { ...meta, title: '区域划分' }},
    { path: '/container/frame', name: `${pre}Frame`, component: () => import('@/views/example/container/frame.vue'), meta: { ...meta, title: 'frame' }},
    { path: '/container-full-all', alwaysShow: true, redirect: 'noredirect', name: `${pre}FullAll`, meta: { ...meta, title: '填充' },
      children: [
        { path: '/container/full', name: `${pre}Full`, component: () => import('@/views/example/container/full.vue'), meta: { ...meta, title: '填充 基础' }},
        { path: '/container/full-slot', name: `${pre}FullSlot`, component: () => import('@/views/example/container/full-slot.vue'), meta: { ...meta, title: '填充 插槽' }},
        { path: '/container/full-bs', name: `${pre}FullBs`, component: () => import('@/views/example/container/full-bs.vue'), meta: { ...meta, title: '填充 滚动优化' }}
      ]
    },
    { path: '/container-ghost-all', alwaysShow: true, redirect: 'noredirect', name: `${pre}GhostAll`, meta: { ...meta, title: '隐形' },
      children: [
        { path: '/container/ghost', name: `${pre}Ghost`, component: () => import('@/views/example/container/ghost.vue'), meta: { ...meta, title: '隐形 基础' }},
        { path: '/container/ghost-slot', name: `${pre}GhostSlot`, component: () => import('@/views/example/container/ghost-slot.vue'), meta: { ...meta, title: '隐形 插槽' }},
        { path: '/container/ghost-bs', name: `${pre}GhostBs`, component: () => import('@/views/example/container/ghost-bs.vue'), meta: { ...meta, title: '隐形 滚动优化' }}
      ]
    },
    { path: '/container-card-all', alwaysShow: true, redirect: 'noredirect', name: `${pre}CardAll`, meta: { ...meta, title: '卡片' },
      children: [
        { path: '/container/card', name: `${pre}Card`, component: () => import('@/views/example/container/card.vue'), meta: { ...meta, title: '卡片 基础' }},
        { path: '/container/card-slot', name: `${pre}CardSlot`, component: () => import('@/views/example/container/card-slot.vue'), meta: { ...meta, title: '卡片 插槽' }},
        { path: '/container/card-bs', name: `${pre}CardBs`, component: () => import('@/views/example/container/card-bs.vue'), meta: { ...meta, title: '卡片 滚动优化' }}
      ]
    },
    { path: '/container-api-all', alwaysShow: true, redirect: 'noredirect', name: `${pre}ApiAll`, meta: { ...meta, title: '方法' },
      children: [
        { path: '/container/api', name: `${pre}Api`, component: () => import('@/views/example/container/api.vue'), meta: { ...meta, title: '滚动控制' }},
        { path: '/container/api-bs', name: `${pre}ApiBs`, component: () => import('@/views/example/container/api-bs.vue'), meta: { ...meta, title: '滚动控制 BS' }}
      ]
    },
    /*
     * 这里存放不显示的菜单
     */
    { path: '/container/hidden', hidden: true, redirect: 'noredirect', name: `${pre}Hidden`, meta: { ...meta, title: '隐藏菜单' },
      children: [
      ]
    }
  ])('Container')
}
