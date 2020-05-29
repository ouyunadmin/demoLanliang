<template>
  <div
    class="admin-layout-header-aside-group"
    :style="styleLayoutMainGroup"
    :class="{grayMode: grayActive}"
  >
    <!-- 半透明遮罩 -->
    <div class="admin-layout-header-aside-mask" />
    <!-- 主体内容 -->
    <div class="admin-layout-header-aside-content" flex="dir:top">
      <!-- 顶栏 -->
      <div
        class="admin-theme-header"
        :style="{
          opacity: searchActive ? 0.5 : 1
        }"
        flex-box="0"
        flex
      >
        <div :class="{'logo-group':true,'logo-hidden-group':sidebar}" :style="{width: sidebar ? sidebarWidthCollapse : sidebarWidth}" flex-box="0" flex>
          <div class="logo-body-group" :style="{width: sidebarWidth}">
            <svg-icon icon-class="logo" />
            <span v-if="!sidebar" class="logo-name">{{ systemName }}</span>
          </div>
        </div>
        <div class="toggle-aside-btn" flex-box="0" @click="handleToggleAside">
          <admin-icon name="bars" />
        </div>
        <header-tags-view flex-box="1" />
        <!-- 顶栏右侧 -->
        <div class="admin-header-right" flex-box="0">
          <!-- 如果你只想在开发环境显示这个按钮请添加 v-if="$env === 'development'" -->
          <header-search @click="handleSearchClick" />
          <header-lang />
          <header-fullscreen class="screenfull" />
          <header-error v-if="$env === 'development'" />
          <header-theme />
          <header-user />
        </div>
      </div>
      <!-- 下面 主体 -->
      <div class="admin-theme-container" flex-box="1" flex>
        <!-- 主体 侧边栏 -->
        <div
          ref="aside"
          flex-box="0"
          class="admin-theme-container-aside"
          :style="{
            width: sidebar ? sidebarWidthCollapse : sidebarWidth,
            opacity: searchActive ? 0.5 : 1
          }"
        >
          <header-sidebar />
        </div>
        <!-- 主体 -->
        <div class="admin-theme-container-main" flex-box="1" flex>
          <!-- 搜索 -->
          <transition name="fade-scale">
            <div v-show="searchActive" class="admin-theme-container-main-layer" flex="dir:top">
              <admin-panel-search
                ref="panelSearch"
                @close="searchPanelClose"
              />
            </div>
          </transition>
          <!-- 报表 -->
          <transition name="fade-transform">
            <div v-show="!searchActive && iframeActive" class="admin-theme-container-main-layer" flex="dir:top">
              <div class="admin-theme-container-main-body" flex-box="1">
                <admin-panel-iframe
                  ref="iframeSearch"
                  :iframe-active="iframeActive"
                  :is-router-alive="isRouterAlive"
                />
              </div>
            </div>
          </transition>
          <!-- 内容 -->
          <transition name="fade-transform">
            <div v-show="!searchActive && !iframeActive" class="admin-theme-container-main-layer page-view-layer" flex="dir:top">
              <!-- 页面 -->
              <div class="admin-theme-container-main-body" flex-box="1">
                <!-- 路由刷新，遮盖层 -->
                <!--<div v-if="!isRouterAlive" class="admin-theme-container-main-body__hide"></div>-->
                <admin-container v-if="!isRouterAlive" />
                <!--<transition :name="transitionActive ? 'fade-transverse' : 'fade-transform'" mode="out-in">-->
                <transition :name="transitionActive ? 'fade-transverse' : 'fade-transform'" mode="out-in">
                  <keep-alive :include="keepAlive">
                    <router-view v-if="isRouterAlive" ref="routerview" />
                  </keep-alive>
                </transition>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
    <app-message />
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import { HeaderTagsView, HeaderLang, headerSearch, HeaderFullscreen, HeaderUser, HeaderTheme, HeaderError, HeaderSidebar, AppMessage } from './components'
import mixinSearch from './mixins/search'
import mixinReport from './mixins/iframe'
// import lockScreen from '@/components/lockscreen'

export default {
  name: 'Layout',
  components: {
    HeaderTagsView,
    HeaderLang,
    headerSearch,
    HeaderFullscreen,
    HeaderUser,
    HeaderTheme,
    HeaderError,
    HeaderSidebar,
    AppMessage
  },
  mixins: [
    mixinSearch,
    mixinReport
  ],
  data() {
    return {
      // [侧边栏宽度] 正常状态
      sidebarWidth: '200px',
      // [侧边栏宽度] 折叠状态
      sidebarWidthCollapse: '65px'
    }
  },
  computed: {
    ...mapState('admin', {
      keepAlive: state => state.page.keepAlive,
      grayActive: state => state.gray.active,
      transitionActive: state => state.app.active
      // isRouterAlive: state => state.app.isRouterAlive,
      // sidebar: state => state.app.sidebar,
      // systemName: state => state.app.systemName
    }),
    ...mapState('admin/app', [
      'isRouterAlive',
      'sidebar',
      'systemName'
    ]),
    ...mapGetters('admin', {
      themeActiveSetting: 'app/activeSetting'
    }),
    /**
     * @description 最外层容器的背景图片样式
     */
    styleLayoutMainGroup() {
      return {
        ...this.themeActiveSetting.backgroundImage ? {
          backgroundImage: `url('${this.$baseUrl}/${this.themeActiveSetting.backgroundImage}')`
        } : {}
      }
    },
    key() {
      return this.$route.fullPath
    }
  },
  methods: {
    ...mapActions('admin/app', [
      'asideCollapseToggle'
    ]),
    /**
     * 接收点击切换侧边栏的按钮
     */
    handleToggleAside() {
      this.asideCollapseToggle()
    }
  }
}
</script>
