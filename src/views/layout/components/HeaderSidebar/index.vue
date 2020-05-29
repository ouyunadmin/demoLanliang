<template>
  <div class="admin-layout-header-aside-menu-side">
    <el-scrollbar class="sidebar-container" :native="true" wrap-class="scrollbar-wrapper">
      <el-menu
        ref="menu"
        :unique-opened="true"
        :default-active="active"
        :class="{ collapse: sidebar }"
        :collapse="sidebar"
        @select="handleMenuSelect"
      >
        <template v-for="(menu, menuIndex) in routers">
          <layout-header-aside-menu-item v-if="!menu.hidden && hasOneShowingChild(menu.children,menu) && (!onlyOneChild.children || onlyOneChild.noShowingChildren) && !menu.alwaysShow" :key="menuIndex" :menu="onlyOneChild" />
          <layout-header-aside-menu-sub v-else-if="!menu.hidden" :key="menuIndex" :menu="menu" />
        </template>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import menuMixin from '../mixin/menu'
import LayoutMainMenuItem from './menu-item/index.vue'
import LayoutMainMenuSub from './menu-sub/index.vue'
// import util from '@/libs/util.js'
import BScroll from 'better-scroll'

export default {
  name: 'Sidebar',
  components: {
    'layout-header-aside-menu-item': LayoutMainMenuItem,
    'layout-header-aside-menu-sub': LayoutMainMenuSub
  },
  mixins: [
    menuMixin
  ],
  data() {
    this.onlyOneChild = null
    return {
      active: '',
      BS: null
    }
  },
  computed: {
    /* ...mapState('admin', {
      routers: state => state.page.routers,
      sidebar: state => state.app.sidebar
    }) */
    ...mapState('admin/page', [
      'routers'
    ]),
    ...mapState('admin/app', [
      'sidebar'
    ])
  },
  watch: {
    // 折叠和展开菜单的时候销毁 better scroll
    /* sidebar(val) {
      this.scrollDestroy()
      setTimeout(() => {
        this.scrollInit()
      }, 500)
    }, */
    // 监听路由 控制侧边栏激活状态
    '$route': {
      handler({ path, meta }) {
        this.active = meta.activeMenu ? meta.activeMenu : path
        this.$nextTick(() => {
          if (this.$refs.menu) {
            this.$refs.menu.activeIndex = this.active
          }
        })
      },
      immediate: true
    }
    /* '$route.matched': {
      handler(val) {
        this.active = val[val.length - 1].path
        this.$nextTick(() => {
          if (this.$refs.menu) {
            this.$refs.menu.activeIndex = this.active
          }
        })
      },
      immediate: true
    } */
  },
  mounted() {
    // this.scrollInit()
  },
  beforeDestroy() {
    // this.scrollDestroy()
  },
  methods: {
    /* handleMenuSelect(index, indexPath) {
      if (/^admin-menu-empty-\d+$/.test(index) || index === undefined) {
        this.$message.warning('临时菜单')
      } else if (/^https:\/\/|http:\/\//.test(index)) {
        util.open(index)
      } else {
        this.$router.push({
          path: index
        })
      }
    }, */
    scrollInit() {
      this.BS = new BScroll(this.$el, {
        mouseWheel: true,
        click: true
        // 如果你愿意可以打开显示滚动条
        // scrollbar: {
        //   fade: true,
        //   interactive: false
        // }
      })
    },
    scrollDestroy() {
      try {
        this.BS.destroy()
      } catch (e) {
        delete this.BS
        this.BS = null
      }
    },
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
          this.onlyOneChild = item
          return true
        }
      })
      if (showingChildren.length === 1) {
        return true
      }
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: '', noShowingChildren: true }
        return true
      }
      return false
    }
  }
}
</script>
