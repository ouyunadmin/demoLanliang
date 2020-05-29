// Element
import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/icon.css'
import 'element-ui/lib/theme-chalk/index.css'

// Ag-gird
// import 'ag-grid/dist/styles/ag-grid.css'
// import 'ag-grid/dist/styles/theme-fresh.css'
// import 'ag-grid-enterprise/main'
import '@ag-grid-community/all-modules/dist/styles/ag-grid.css'
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css'
import '@ag-grid-community/client-side-row-model'
import '@ag-grid-community/infinite-row-model'
import '@ag-grid-community/csv-export'

// A modern alternative to CSS resets
import 'normalize.css/normalize.css'

// flex 布局库
import 'flex.css'

// 树形菜单样式
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

// global css
import '@/assets/styles/public-class.scss'

// bus总线
import VueBus from 'vue-bus'

// 全局组件
import '@/components'

// svg 图标
import '@/assets/svg-icons'

// 全局变量
import '@/base'

// 国际化
import i18n from '@/i18n.js'

// 全局过滤器
// import * as filters from '@/filters'
import filters from '@/filters'

// 全局自定义指令
import importDirective from '@/directive'

// 功能插件
import pluginError from '@/plugin/error'
import pluginLog from '@/plugin/log'
import pluginOpen from '@/plugin/open'
import pluginRoute from '@/plugin/route'
import pluginRules from '@/plugin/rules'
// import pluginIm from '@/plugin/im'

export default {
  async install(Vue, options) {
    // Element
    Vue.use(ElementUI, {
      size: 'medium', // set element-ui default size
      i18n: (key, value) => i18n.t(key, value)
    })
    // bus总线
    Vue.use(VueBus)
    // 全局过滤器
    Vue.use(filters)
    /* Object.keys(filters).forEach(key => {
      Vue.filter(key, filters[key])
    }) */
    // 全局自定义指令
    Vue.use(importDirective)
    // 插件
    Vue.use(pluginError)
    Vue.use(pluginLog)
    Vue.use(pluginOpen)
    Vue.use(pluginRoute)
    Vue.use(pluginRules)
    // Vue.use(pluginIm)
    // 设置为 false 以阻止 vue 在启动时生成生产提示。
    Vue.config.productionTip = false
    // 当前环境
    Vue.prototype.$env = process.env.NODE_ENV
    // 当前的 baseUrl
    Vue.prototype.$baseUrl = process.env.VUE_APP_URL
    // 当前版本
    Vue.prototype.$version = process.env.VUE_APP_VERSION
    // 构建时间
    Vue.prototype.$buildTime = process.env.VUE_APP_BUILD_TIME
  }
}
