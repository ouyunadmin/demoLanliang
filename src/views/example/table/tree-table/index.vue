<template>
  <admin-container>
    <template slot="header">树形表格 tree-table</template>

    <div class="admin-mb">
      <div class="option-item">
        <el-tag>展开</el-tag>
        <el-switch
          v-model="defaultExpandAll"
          active-color="#13ce66"
          inactive-color="#ff4949"
          @change="reset"
        />
      </div>

      <div class="option-item">
        <el-tag>多选</el-tag>
        <el-switch
          v-model="showCheckbox"
          active-color="#13ce66"
          inactive-color="#ff4949"
        />
      </div>
    </div>

    <admin-tree-table :key="key" :default-expand-all="defaultExpandAll" :data="data" :columns="columns" border>
      <template slot="scope" slot-scope="{scope}">
        <el-tag>层级: {{ scope.row._level }}</el-tag>
        <el-tag>展开: {{ scope.row._expand }}</el-tag>
        <el-tag>选择: {{ scope.row._select }}</el-tag>
      </template>
      <template slot="operation" slot-scope="{scope}">
        <el-button type="primary" size="" @click="click(scope)">点击</el-button>
      </template>
    </admin-tree-table>

  </admin-container>
</template>

<script>
// import { cloneDeep } from 'lodash'
import elements from '@/mixins/elementsPermission'
import data from './data'
import adminTreeTable from '@/components/admin-tree-table'

export default {
  name: 'TableTreeTable',
  components: {
    adminTreeTable
  },
  mixins: [
    elements
  ],
  data() {
    return {
      defaultExpandAll: false,
      showCheckbox: true,
      key: 1,
      columns: [
        {
          label: '选择',
          checkbox: true
        },
        {
          label: '',
          key: 'id',
          expand: true
        },
        {
          label: '序号',
          key: 'event',
          width: 200,
          align: 'left'
        },
        {
          label: '事件',
          key: 'scope'
        },
        {
          label: '操作',
          key: 'operation'
        }
      ],
      data: data
    }
  },
  watch: {
    showCheckbox(val) {
      if (val) {
        this.columns.unshift({
          label: '选择',
          checkbox: true
        })
      } else {
        this.columns.shift()
      }
      this.reset()
    }
  },
  methods: {
    reset() {
      ++this.key
    },
    click(scope) {
      console.log(scope)
      const row = scope.row
      const message = Object.keys(row)
        .map(i => {
          return `<p>${i}: ${row[i]}</p>`
        })
        .join('')
      this.$notify({
        title: '提示',
        dangerouslyUseHTMLString: true,
        message: message,
        type: 'success'
      })
    }
  }
}
</script>

<style scoped>
.option-item{
  display: inline-block;
  margin-right: 15px;
}
</style>
