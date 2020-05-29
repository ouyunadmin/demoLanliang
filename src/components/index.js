import Vue from 'vue'
import InputNumber from './admin-form/input-number'
import InputCleave from './admin-form/input-cleave'
import BigImgs from './admin-form/BigImg'
import Treeselect from '@riophae/vue-treeselect'
import MyAgGrid from './admin-grid'
import AdminContainer from './admin-container'
import AdminContainerFrame from './admin-container-frame'
import AdminIconSvg from './admin-icon-svg'
import AdminIcon from './admin-icon'
import AdminPagination from './admin-pagination'
import AdminDialog from './admin-dialog'
import AdminToTop from './admin-to-top'
import AdminMarkdown from './admin-markdown'
import AdminHighlight from './admin-highlight'
import AdminUpload from './admin-upload'
import AdminLinkBtn from './admin-link-btn'
// 区域划分组件
import SplitPane from 'vue-splitpane'

// 主体布局框架
Vue.component('admin-container', AdminContainer)
// 引用frame
Vue.component('admin-container-frame', AdminContainerFrame)
// 图标组件
Vue.component('svg-icon', AdminIconSvg)
// Vue.component('svg-icon', () => import('./admin-icon-svg/index.vue'))
Vue.component('admin-icon', AdminIcon)
// markdown
Vue.component('admin-markdown', AdminMarkdown)
// Vue.component('admin-markdown', () => import('./admin-markdown'))
// 代码高亮
Vue.component('admin-highlight', AdminHighlight)
// Vue.component('admin-highlight', () => import('./admin-highlight'))
// 文本框数字
Vue.component('input-number', InputNumber)
// 文本框数字
Vue.component('input-cleave', InputCleave)
// 图片放大
Vue.component('big-img', BigImgs)
// 树形下拉选择
Vue.component('treeselect', Treeselect)
// 表格
Vue.component('my-ag-grid', MyAgGrid)
// 区域划分组件
Vue.component('split-pane', SplitPane)
// 列表分页
Vue.component('admin-pagination', AdminPagination)
// Dialog 对话框
Vue.component('admin-dialog', AdminDialog)
// 回到顶部
Vue.component('admin-to-top', AdminToTop)
// 图片上传
Vue.component('admin-upload', AdminUpload)
// 连接
Vue.component('admin-link-btn', AdminLinkBtn)
// 抽屉组件
Vue.component('admin-drawer', () => import('./admin-drawer'))
