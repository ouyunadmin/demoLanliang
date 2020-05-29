<template>
  <admin-container>
    <!-- header -->
    <template slot="header">Button 基础组件</template>

    <!-- body -->
    <el-row :gutter="20">
      <!-- content -->
      <el-col :span="24">
        <!-- base -->
        <el-card shadow="always" class="admin-mb">
          <div slot="header" class="admin-clearfix">
            <span>基础用法</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-row class="mb-20">
                <el-button>默认按钮</el-button>
                <el-button type="primary">主要按钮</el-button>
                <el-button type="success">成功按钮</el-button>
                <el-button type="info">信息按钮</el-button>
                <el-button type="warning">警告按钮</el-button>
                <el-button type="danger">危险按钮</el-button>
              </el-row>
              <el-row class="mb-20">
                <el-button plain>朴素按钮</el-button>
                <el-button type="primary" plain>主要按钮</el-button>
                <el-button type="success" plain>成功按钮</el-button>
                <el-button type="info" plain>信息按钮</el-button>
                <el-button type="warning" plain>警告按钮</el-button>
                <el-button type="danger" plain>危险按钮</el-button>
              </el-row>
              <el-row class="mb-20">
                <el-button round>圆角按钮</el-button>
                <el-button type="primary" round>主要按钮</el-button>
                <el-button type="success" round>成功按钮</el-button>
                <el-button type="info" round>信息按钮</el-button>
                <el-button type="warning" round>警告按钮</el-button>
                <el-button type="danger" round>危险按钮</el-button>
              </el-row>
              <el-row class="mb-20">
                <el-button icon="el-icon-search" circle />
                <el-button type="primary" icon="el-icon-edit" circle />
                <el-button type="success" icon="el-icon-check" circle />
                <el-button type="info" icon="el-icon-message" circle />
                <el-button type="warning" icon="el-icon-star-off" circle />
                <el-button type="danger" icon="el-icon-delete" circle />
              </el-row>
            </el-col>
            <el-col :span="12" class="second-col">
              <div>
                <admin-markdown :source="docBase" />
              </div>
              <div class="mt10">
                <admin-highlight :code="code.base" />
              </div>
            </el-col>
          </el-row>
        </el-card>
        <!-- disable -->
        <el-card shadow="always" class="admin-mb">
          <div slot="header" class="admin-clearfix">
            <span>禁用状态</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-row class="mb-20">
                <el-button disabled>默认按钮</el-button>
                <el-button type="primary" disabled>主要按钮</el-button>
                <el-button type="success" disabled>成功按钮</el-button>
                <el-button type="info" disabled>信息按钮</el-button>
                <el-button type="warning" disabled>警告按钮</el-button>
                <el-button type="danger" disabled>危险按钮</el-button>
              </el-row>
              <el-row class="mb-20">
                <el-button plain disabled>朴素按钮</el-button>
                <el-button type="primary" plain disabled>主要按钮</el-button>
                <el-button type="success" plain disabled>成功按钮</el-button>
                <el-button type="info" plain disabled>信息按钮</el-button>
                <el-button type="warning" plain disabled>警告按钮</el-button>
                <el-button type="danger" plain disabled>危险按钮</el-button>
              </el-row>
            </el-col>
            <el-col :span="12" class="second-col">
              <div>
                <admin-markdown :source="docDisable" />
              </div>
              <div class="mt10">
                <admin-highlight :code="code.disable" />
              </div>
            </el-col>
          </el-row>
        </el-card>
        <!-- icon -->
        <el-card shadow="always" class="admin-mb">
          <div slot="header" class="admin-clearfix">
            <span>图标按钮</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-row class="mb-20">
                <el-button type="primary" icon="el-icon-edit" />
                <el-button type="primary" icon="el-icon-share" />
                <el-button type="primary" icon="el-icon-delete" />
                <el-button type="primary" icon="el-icon-search">搜索</el-button>
                <el-button type="primary">上传<i class="el-icon-upload el-icon--right" /></el-button>
              </el-row>
            </el-col>
            <el-col :span="12" class="second-col">
              <div>
                <admin-markdown :source="docIcon" />
              </div>
              <div class="mt10">
                <admin-highlight :code="code.icon" />
              </div>
            </el-col>
          </el-row>
        </el-card>
        <!-- group -->
        <el-card shadow="always" class="admin-mb">
          <div slot="header" class="admin-clearfix">
            <span>按钮组</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-row class="mb-20">
                <el-button-group>
                  <el-button type="primary" icon="el-icon-arrow-left">上一页</el-button>
                  <el-button type="primary">下一页<i class="el-icon-arrow-right el-icon--right" /></el-button>
                </el-button-group>
                <el-button-group>
                  <el-button type="primary" icon="el-icon-edit" />
                  <el-button type="primary" icon="el-icon-share" />
                  <el-button type="primary" icon="el-icon-delete" />
                </el-button-group>
              </el-row>
            </el-col>
            <el-col :span="12" class="second-col">
              <div>
                <admin-markdown :source="docGroup" />
              </div>
              <div class="mt10">
                <admin-highlight :code="code.group" />
              </div>
            </el-col>
          </el-row>
        </el-card>
        <!-- loading -->
        <el-card shadow="always" class="admin-mb">
          <div slot="header" class="admin-clearfix">
            <span>按钮组</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-row class="mb-20">
                <el-button type="primary" :loading="true">加载中</el-button>
              </el-row>
            </el-col>
            <el-col :span="12" class="second-col">
              <div>
                <admin-markdown :source="docLoading" />
              </div>
              <div class="mt10">
                <admin-highlight :code="code.loading" />
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>

    <!-- footer -->
    <template slot="footer">
      <admin-link-btn title="文档" link="https://element.eleme.cn/2.0/#/zh-CN/component/button" />
    </template>
  </admin-container>
</template>

<script>
import doc from './doc.js'
import code from './code.js'

export default {
  name: 'DataButton',
  data() {
    return {
      ...doc,
      code
    }
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
  /deep/ .el-button--medium.is-round {
    padding: 7px 20px;
  }
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
