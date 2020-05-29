
/*
 * Layout
 */
import Layout from '@/views/layout'

/*
 * Router Modules
 */
// 应用实例
import $example from './modules/demo/example'
// 表单
import $form from './modules/demo/form'
// table
import $table from './modules/demo/table'
// 图标
import $icon from './modules/demo/icon'
// 页面布局
import $container from './modules/demo/container'
// 数据模型
import $data from './modules/demo/data'
// 试验
import $playground from './modules/demo/playground'
// 标签页
import $page from './modules/demo/page'
// 主题
import $theme from './modules/demo/theme'
// 日期计算
import $day from './modules/demo/day'
// pdf
// import $pdf from './modules/demo/pdf'
// 导入
import $import from './modules/demo/import'
// 多国语
import $lang from './modules/demo/lang'
// 权限管理
import $authority from './modules/demo/authority'

// import { cloneDeep } from 'lodash'

// import detailConsignmentPage from '../views/consignment/detail'
// import editBill from '../views/consignment/edit'
/*
 * 深拷贝组件到vuex中，用于打开多个窗口
 * 记得此处要配制
*/
// 托运单
// store.dispatch('webRoutes', { 'name': 'detailConsignment', 'component': cloneDeep(detailConsignmentPage) })
// store.dispatch('webRoutes', { 'name': 'editConsignment', 'component': cloneDeep(editBill) })

/** note: submenu only apppear when children.length>=1
*
**/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
**/

/**
 * 在主框架外显示
 */
export const constantRouterMap = [
  // 登录
  { path: '/login', component: () => import('@/views/login'), name: 'Login', hidden: true },
  // { path: '/404', component: () => import('@/views/errorPage/404'), hidden: true },
  { path: '/401', component: () => import('@/views/errorPage/401'), hidden: true },
  // { path: '/locking', name: 'locking', import: () => import('@/views/lockscreen/locking-page'), hidden: true },
  {
    path: '',
    component: Layout,
    redirect: { name: 'Home' },
    hidden: true,
    name: 'default',
    children: [
      { path: '/home', component: () => import('@/views/home'), name: 'Home', meta: { title: '首页', noCache: true, affix: true }},
      // 刷新页面 必须保留
      {
        path: 'refresh',
        name: 'refresh',
        hidden: true,
        component: {
          beforeRouteEnter(to, from, next) {
            // next(instance => instance.$router.replace(from.fullPath))
            next(instance => instance.$router.replace({ name: from.name, params: from.params, query: from.query }))
          },
          render: h => h('admin-container')
        }
      },
      // 页面重定向 必须保留
      {
        path: 'redirect/:route*',
        name: 'redirect',
        hidden: true,
        component: {
          beforeRouteEnter(to, from, next) {
            next(instance => instance.$router.replace(JSON.parse(from.params.route)))
          },
          render: h => h('admin-container')
        }
      }
    ]
  }
]

/**
 * 在主框架内显示
 */
export const asyncRouterMap = [
  /*
   * 应用实例
   */
  $example,
  /*
   * 表单
   */
  $form,
  /*
   * table
   */
  $table,
  /*
   * 图标
   */
  $icon,
  /*
   * 页面布局
   */
  $container,
  /*
   * 数据模型
   */
  $data,
  /*
   * 试验
   */
  $playground,
  /*
   * 标签页
   */
  $page,
  /*
   * 主题
   */
  $theme,
  /*
   * 日期计算
   */
  $day,
  /*
   * pdf
   */
  // $pdf,
  /*
   * 导入
   */
  $import,
  /*
   * 多国语
   */
  $lang,
  /**
   * 权限管理
  */
  $authority,
  /*
   * 404
   */
  // { path: '*', redirect: '/404', hidden: true }
  { path: '*', name: '404', component: () => import('@/views/errorPage/404'), hidden: true }
]

export const frameInRoutes = [
  ...constantRouterMap,
  ...asyncRouterMap
]
