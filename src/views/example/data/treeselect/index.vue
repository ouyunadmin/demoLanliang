<template>
  <admin-container>
    <template slot="header">树形下拉选择 基础组件</template>

    <el-row :gutter="20">
      <el-col :span="12">
        <el-card shadow="always" class="admin-mb">
          <div slot="header" class="admin-clearfix">
            <span>实例</span>
          </div>
          <treeselect
            ref="value"
            v-model="value"
            :disabled="false"
            :options="dataMenu"
            placeholder="分类匹配选择"
            :limit="10"
            :multiple="true"
            :searchable="true"
            :always-open="false"
            :clearable="true"
            :show-count="true"
            :disable-branch-nodes="true"
            :default-expand-level="1"
            no-results-text="无匹配数据"
            no-children-text="无子选项"
            @input="check"
          />
          <pre class="admin-mt-20 text" style="margin-bottom: 100px;">value:{{ value }}</pre>
        </el-card>

      </el-col>

      <el-col :span="12">
        <el-card shadow="always" class="admin-mb">
          <admin-markdown :source="doc" />
        </el-card>

        <el-card shadow="always" class="admin-mb">
          <admin-highlight :code="code" />
        </el-card>
      </el-col>
    </el-row>

    <template slot="footer">
      <admin-link-btn title="文档" link="http://www.hs56.com/" />
    </template>
  </admin-container>
</template>

<script>
import { treeObj } from '@/api/demo/api'
import doc from './doc.md'
import code from './code.js'

export default {
  name: 'DataTreeselect',
  data() {
    return {
      doc,
      code,
      // 树形
      dataMenu: [],
      value: []
    }
  },
  mounted() {
    this.getTree()
  },
  methods: {
    // 树形
    getTree() {
      treeObj().then(response => {
        this.dataMenu = this.getToChildren([...response.data])
      })
    },
    check() {
      // this.$refs['dataForm'].validateField('value')
    },
    // 过滤末级children
    getToChildren(source) {
      for (const property in source) {
        if (source.hasOwnProperty(property)) {
          const sourceProperty = source[property]
          sourceProperty.label = sourceProperty.title
          if (sourceProperty.children && sourceProperty.children.length !== 0) {
            this.getToChildren(sourceProperty.children)
          } else {
            delete sourceProperty.children
          }
        }
      }
      return source
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.admin-mb {
  overflow: inherit;
  /deep/ .table-border {
    td {
      padding: 20px;
    }
  }
}
.text {
  font-size: 14px;
}
</style>
