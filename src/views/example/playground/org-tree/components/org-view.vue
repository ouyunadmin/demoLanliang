<template>
  <div
    ref="dragWrapper"
    class="org-tree-drag-wrapper"
    @mousedown="mousedownView"
    @contextmenu="handleDocumentContextmenu"
  >
    <div class="org-tree-wrapper" :style="orgTreeStyle">
      <!--<div v-if="visible" class="org-contextmenu">000</div>-->
      <v-org-tree
        v-if="data"
        :data="data"
        :node-render="nodeRender"
        :expand-all="true"
        collapsable
        @on-node-click="handleNodeClick"
      />
    </div>
  </div>
</template>

<script>
import { on, off } from '@/libs/tools'

/* const menuList = [
  {
    key: 'edit',
    label: '编辑部门'
  },
  {
    key: 'detail',
    label: '查看部门'
  },
  {
    key: 'new',
    label: '新增子部门'
  },
  {
    key: 'delete',
    label: '删除部门'
  }
] */

export default {
  name: 'OrgView',
  props: {
    zoomHandled: {
      type: Number,
      default: 1
    },
    data: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      currentContextMenuId: '',
      orgTreeOffsetLeft: 0,
      orgTreeOffsetTop: 0,
      initPageX: 0,
      initPageY: 0,
      oldMarginLeft: 0,
      oldMarginTop: 0,
      canMove: false,
      visible: false
    }
  },
  computed: {
    orgTreeStyle() {
      return {
        transform: `translate(-50%, -50%) scale(${this.zoomHandled}, ${
          this.zoomHandled
        })`,
        marginLeft: `${this.orgTreeOffsetLeft}px`,
        marginTop: `${this.orgTreeOffsetTop}px`
      }
    }
  },
  beforeDestroy() {
    off(document, 'contextmenu', this.handleDocumentContextmenu)
  },
  mounted() {
    on(document, 'contextmenu', this.handleDocumentContextmenu)
  },
  methods: {
    handleNodeClick(e, data, expand) {
      expand()
    },
    closeMenu() {
      this.currentContextMenuId = ''
    },
    getBgColor(data) {
      return this.currentContextMenuId === data.id
        ? data.isRoot
          ? '#0d7fe8'
          : '#5d6c7b'
        : ''
    },
    nodeRender(h, data) {
      return (
        <div
          class={[
            'custom-org-node',
            data.children && data.children.length ? 'has-children-label' : ''
          ]}
          on-mousedown={event => event.stopPropagation()}
          on-contextmenu={this.contextmenu.bind(this, data)}
        >
          {data.label}
        </div>
      )
    },
    contextmenu(data, $event) {
      const event = $event || window.event
      event.preventDefault
        ? event.preventDefault()
        : (event.returnValue = false)
      this.currentContextMenuId = data.id
      this.visible = true
      console.log(data)
    },
    setDepartmentData(data) {
      data.isRoot = true
      this.departmentData = data
    },
    mousedownView(event) {
      this.canMove = true
      this.initPageX = event.pageX
      this.initPageY = event.pageY
      this.oldMarginLeft = this.orgTreeOffsetLeft
      this.oldMarginTop = this.orgTreeOffsetTop
      on(document, 'mousemove', this.mousemoveView)
      on(document, 'mouseup', this.mouseupView)
      // 防止鼠标选中抽屉中文字，造成拖动trigger触发浏览器原生拖动行为
      window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty()
    },
    mousemoveView(event) {
      if (!this.canMove) return
      const { pageX, pageY } = event
      this.orgTreeOffsetLeft = this.oldMarginLeft + pageX - this.initPageX
      this.orgTreeOffsetTop = this.oldMarginTop + pageY - this.initPageY
    },
    mouseupView() {
      this.canMove = false
      off(document, 'mousemove', this.mousemoveView)
      off(document, 'mouseup', this.mouseupView)
    },
    handleDropdownClick(event) {
      event.stopPropagation()
    },
    handleDocumentContextmenu() {
      this.canMove = false
    },
    handleContextMenuClick(data, key) {
      this.$emit('on-menu-click', { data, key })
    }
  }
}
</script>

<style lang="scss" scoped>
.org-contextmenu {
  position: absolute;
  padding: 5px 0;
  z-index: 2018;
  background: #FFF;
  border: 1px solid #cfd7e5;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}
</style>
