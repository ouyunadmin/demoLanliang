<template>
  <admin-container>
    <template slot="header">Input 基础组件</template>

    <el-row :gutter="20">
      <el-col :span="12">
        <el-card shadow="always" class="admin-mb">
          <div slot="header" class="admin-clearfix">
            <span>input实例</span>
          </div>
          <el-input v-model.trim="input" placeholder="请输入内容" clearable />
          <div class="admin-mt-20 text">input:{{ input }}</div>
        </el-card>

        <el-card shadow="always" class="admin-mb">
          <div slot="header" class="admin-clearfix">
            <span>textarea实例</span>
          </div>
          <el-input v-model.trim="textarea" type="textarea" resize="none" :rows="3" placeholder="请输入内容" clearable />
          <div class="admin-mt-20 text">textarea:{{ textarea }}</div>
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
import doc from './doc.md'
import code from './code.js'

export default {
  name: 'DataInput',
  data() {
    return {
      doc,
      code,
      input: '这个一段内容...',
      textarea: '描述说明...'
    }
  }
}
</script>

<style lang="scss" scoped>
  .admin-mb {
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
