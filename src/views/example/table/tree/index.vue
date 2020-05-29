<template>
  <admin-container class="grid-table">
    <template slot="header">树形列表</template>
    <div class="grid-body" flex="dir:top">
      <div flex-box="1" flex>
        <div flex-box="0" class="tree-left">
          <div class="admin-container-body-full" flex="dir:top">
            <el-input
              v-model="filterText"
              flex-box="0"
              placeholder="请输入内容"
            >
              <i slot="prefix" class="el-input__icon el-icon-search" />
            </el-input>
            <el-scrollbar flex-box="1" class="tree-container admin-mt-10" wrap-class="scrollbar-wrapper">
              <el-tree
                ref="searchMenu"
                class="tree-setting"
                :filter-node-method="filterNode"
                :data="dataMenu"
                :props="defaultProps"
                :expand-on-click-node="false"
                :default-expanded-keys="[treeId]"
                node-key="id"
                highlight-current
                accordion
                @node-click="handleNodeClick"
              >
                <span slot-scope="{ node }" :title="node.label" class="el-tree-node__label">
                  {{ node.label }}
                </span>
              </el-tree>
            </el-scrollbar>
          </div>
        </div>
        <div flex-box="1" class="admin-ml-10 admin-position">
          <list />
        </div>
      </div>
    </div>
  </admin-container>
</template>

<script>
import { treeObj } from '@/api/demo/api'
import elements from '@/mixins/elementsPermission'
import list from './list'

export default {
  name: 'TableTree',
  components: {
    list
  },
  mixins: [
    elements
  ],
  data() {
    return {
      // 树相关
      dataMenu: [],
      defaultProps: { 'children': 'children', 'label': 'title' },
      // 搜索子节点
      filterText: '',
      treeId: '0'
    }
  },
  watch: {
    filterText(val) {
      this.$refs.searchMenu.filter(val)
    }
  },
  created() {
    this.getTree()
  },
  methods: {
    // 树形
    getTree() {
      treeObj().then(response => {
        this.dataMenu = this.getToChildren([...response.data])
        this.treeId = this.dataMenu[0].id
        this.$nextTick(() => (
          // 设置树形菜单默认选中
          this.$refs.searchMenu.setCurrentKey(this.treeId)
        ))
        this.handleFilter()
      })
    },
    // 查询节点
    filterNode(value, data) {
      if (!value) return true
      return data.title.indexOf(value) !== -1
    },
    // 树点击
    handleNodeClick(data) {
      this.treeId = data.id
      this.handleFilter()
    },
    // 过滤末级children
    getToChildren(source) {
      for (const property in source) {
        if (source.hasOwnProperty(property)) {
          const sourceProperty = source[property]
          if (sourceProperty.children && sourceProperty.children.length !== 0) {
            this.getToChildren(sourceProperty.children)
          } else {
            delete sourceProperty.children
          }
        }
      }
      return source
    },
    // 查询
    handleFilter() {
      this.$bus.emit('tree-form-list', this.treeId)
    }
  }
}
</script>
