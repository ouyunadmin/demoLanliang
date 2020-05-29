<template>
  <admin-container>
    <!-- header -->
    <template slot="header">
      Link 文字链接
    </template>

    <!-- body -->
    <el-row :gutter="20">
      <!-- content -->
      <el-col :span="12">
        <!-- base -->
        <el-card shadow="always" class="admin-mb">
          <div slot="header" class="admin-clearfix"><span>基础用法</span></div>
          <el-col :span="12">
            <el-row class="mb-20">
              <el-link href="https://element.eleme.io" target="_blank">默认链接</el-link>
              <el-link type="primary" disabled>主要链接</el-link>
              <el-link type="success">成功链接</el-link>
              <el-link type="warning">警告链接</el-link>
              <el-link type="danger">危险链接</el-link>
              <el-link type="info">信息链接</el-link>
            </el-row>
            <el-row class="mb-20">
              <el-link href="https://element.eleme.io" target="_blank" disabled>默认链接</el-link>
              <el-link type="primary" disabled>主要链接</el-link>
              <el-link type="success" disabled>成功链接</el-link>
              <el-link type="warning" disabled>警告链接</el-link>
              <el-link type="danger" disabled>危险链接</el-link>
              <el-link type="info" disabled>信息链接</el-link>
            </el-row>
            <el-row class="mb-20">
              <el-link :underline="true">默认链接</el-link>
              <el-link type="primary" :underline="false">主要链接</el-link>
              <el-link type="success" :underline="false">成功链接</el-link>
              <el-link type="warning" :underline="false">警告链接</el-link>
              <el-link type="danger" :underline="true">危险链接</el-link>
              <el-link type="info" :underline="true">信息链接</el-link>
            </el-row>
            <el-row class="mb-20">
              <el-link icon="el-icon-edit">编辑</el-link>
              <el-link>
                查看
                <i class="el-icon-view el-icon--right" />
              </el-link>
            </el-row>
          </el-col>
        </el-card>
      </el-col>

      <el-col :span="12">
        <el-card shadow="always" class="admin-mb"><admin-markdown :source="docBase" /></el-card>

        <el-card shadow="always" class="admin-mb"><admin-highlight :code="code.base" /></el-card>
      </el-col>
    </el-row>
    <!-- footer -->
    <template slot="footer">
      <admin-link-btn title="文档" link="https://element.eleme.cn/2.0/#/zh-CN/component/link" />
    </template>
  </admin-container>
</template>

<script>
import doc from './doc.js'
import code from './code.js'

export default {
  name: 'DataLink',
  data() {
    return {
      ...doc,
      code,
      link: {
        // 值
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .second-col {
    padding-left: 50px !important;
    border-left: 1px solid $color-border-1;
  }
  .mb-20 {
    margin-bottom: 30px;
  }
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
