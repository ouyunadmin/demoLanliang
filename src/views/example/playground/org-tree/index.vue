<template>
  <admin-container class="grid-table">
    <template slot="header">组织结构树</template>
    <div class="grid-body" flex="dir:top">
      <div flex-box="1" class="department-outer">
        <div class="zoom-box">
          <zoom-controller v-model="zoom" :min="20" :max="200" />
        </div>
        <div class="view-box">
          <org-view
            v-if="data"
            :data="data"
            :zoom-handled="zoomHandled"
            @on-menu-click="handleMenuClick"
          />
        </div>
      </div>
    </div>
  </admin-container>
</template>

<script>
import OrgView from './components/org-view.vue'
import ZoomController from './components/zoom-controller.vue'
import './index.scss'
const menuDic = {
  edit: '编辑部门',
  detail: '查看部门',
  new: '新增子部门',
  delete: '删除部门'
}
export default {
  name: 'PlaygroundOrg',
  components: {
    OrgView,
    ZoomController
  },
  data() {
    return {
      data: null,
      zoom: 100
    }
  },
  computed: {
    zoomHandled() {
      return this.zoom / 100
    }
  },
  mounted() {
    this.getDepartmentData()
  },
  methods: {
    setDepartmentData(data) {
      data.isRoot = true
      return data
    },
    handleMenuClick({ data, key }) {
      this.$Message.success({
        duration: 5,
        content: `点击了《${data.label}》节点的'${menuDic[key]}'菜单`
      })
    },
    getDepartmentData() {
      this.data = {
        id: 0,
        label: 'XXX有限公司',
        children: [
          {
            id: 2,
            label: '共享中心',
            children: [
              {
                id: 5,
                label: '研发-前端'
              }, {
                id: 6,
                label: '测试'
              }, {
                id: 9,
                label: 'UI设计'
              }
            ]
          },
          {
            id: 3,
            label: '销售部',
            children: [
              {
                id: 7,
                label: '销售一部'
              }, {
                id: 8,
                label: '销售二部'
              }
            ]
          },
          {
            id: 4,
            label: '财务部'
          }, {
            id: 11,
            label: 'HR人事'
          }
        ]
      }
    }
  }
}
</script>
