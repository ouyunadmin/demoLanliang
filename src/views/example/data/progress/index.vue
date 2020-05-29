<template>
  <admin-container>
    <!-- header -->
    <template slot="header">Progress 进度条</template>

    <!-- body -->
    <el-row :gutter="20">
      <!-- content -->
      <el-col :span="12">
        <!-- base -->
        <el-card shadow="always" class="admin-mb">
          <div slot="header" class="admin-clearfix">
            <span>基础用法</span>
          </div>
          <el-row class="mb-20">
            <h3>线形进度条 — 百分比外显</h3>
            <el-progress :percentage="0" />
            <el-progress :percentage="70" />
            <el-progress :percentage="80" color="#8e71c7" />
            <el-progress :percentage="100" status="success" />
            <el-progress :percentage="50" status="exception" />
          </el-row>
          <el-row class="mb-20">
            <h3>线形进度条 — 百分比内显</h3>
            <el-progress :text-inside="true" :stroke-width="18" :percentage="0" />
            <el-progress :text-inside="true" :stroke-width="18" :percentage="70" />
            <el-progress :text-inside="true" :stroke-width="18" :percentage="80" color="rgba(142, 113, 199, 0.7)" />
            <el-progress :text-inside="true" :stroke-width="18" :percentage="100" status="success" />
            <el-progress :text-inside="true" :stroke-width="18" :percentage="50" status="exception" />
          </el-row>
          <el-row class="mb-20">
            <h3>环形进度条</h3>
            <el-progress type="circle" :percentage="0" />
            <el-progress type="circle" :percentage="25" />
            <el-progress type="circle" :percentage="80" color="#8e71c7" />
            <el-progress type="circle" :percentage="100" status="success" />
            <el-progress type="circle" :percentage="50" status="exception" />
            <el-progress type="circle" :percentage="100" status="text">Done</el-progress>
          </el-row>
        </el-card>
      </el-col>

      <el-col :span="12">
        <el-card shadow="always" class="admin-mb">
          <admin-markdown :source="docBase" />
        </el-card>

        <el-card shadow="always" class="admin-mb">
          <admin-highlight :code="code.base" />
        </el-card>
      </el-col>
    </el-row>

    <!-- footer -->
    <template slot="footer">
      <admin-link-btn title="文档" link="https://element.eleme.cn/2.0/#/zh-CN/component/progress" />
    </template>
  </admin-container>
</template>

<script>
import doc from './doc.js'
import code from './code.js'

export default {
  name: 'DataProgress',
  data() {
    return {
      ...doc,
      code
    }
  },
  methods: {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
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
.el-progress {
  margin-bottom: 10px;
}
</style>
