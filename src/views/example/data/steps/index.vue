<template>
  <admin-container>
    <!-- header -->
    <template slot="header">Steps 步骤条</template>

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
                <div class="demonstration">简单的步骤条。</div>
                <el-steps :active="activeBase" finish-status="success">
                  <el-step title="步骤 1" />
                  <el-step title="步骤 2" />
                  <el-step title="步骤 3" />
                </el-steps>
                <el-button style="margin-top: 12px;" @click="nextBase">下一步</el-button>
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

        <!-- center -->
        <el-card shadow="always" class="admin-mb">
          <div slot="header" class="admin-clearfix">
            <span>居中的步骤条</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-row class="mb-20">
                <div class="demonstration">标题和描述都将居中。</div>
                <el-steps :active="2" align-center>
                  <el-step title="步骤1" description="这是一段很长很长很长的描述性文字" />
                  <el-step title="步骤2" description="这是一段很长很长很长的描述性文字" />
                  <el-step title="步骤3" description="这是一段很长很长很长的描述性文字" />
                  <el-step title="步骤4" description="这是一段很长很长很长的描述性文字" />
                </el-steps>
              </el-row>
            </el-col>
            <el-col :span="12" class="second-col">
              <div>
                <admin-markdown :source="docCenter" />
              </div>
              <div class="mt10">
                <admin-highlight :code="code.center" />
              </div>
            </el-col>
          </el-row>
        </el-card>

        <!-- vertical -->
        <el-card shadow="always" class="admin-mb">
          <div slot="header" class="admin-clearfix">
            <span>竖式步骤条</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-row class="mb-20">
                <div class="demonstration">竖直方向的步骤条。</div>
                <div style="height: 300px;">
                  <el-steps direction="vertical" :active="1">
                    <el-step title="步骤 1" />
                    <el-step title="步骤 2" />
                    <el-step title="步骤 3" description="这是一段很长很长很长的描述性文字" />
                  </el-steps>
                </div>
              </el-row>
            </el-col>
            <el-col :span="12" class="second-col">
              <div>
                <admin-markdown :source="docVertical" />
              </div>
              <div class="mt10">
                <admin-highlight :code="code.vertical" />
              </div>
            </el-col>
          </el-row>
        </el-card>

      </el-col>
    </el-row>

    <!-- footer -->
    <template slot="footer">
      <admin-link-btn title="文档" link="https://element.eleme.cn/2.0/#/zh-CN/component/steps" />
    </template>
  </admin-container>
</template>

<script>
import doc from './doc.js'
import code from './code.js'

export default {
  name: 'DataSteps',
  data() {
    return {
      ...doc,
      code,
      activeBase: 0
    }
  },
  methods: {
    nextBase() {
      if (this.activeBase++ > 2) this.activeBase = 0
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
  /deep/ .table-border {
    td {
      padding: 20px;
    }
  }
}
.text {
  font-size: 14px;
}

.demonstration {
  display: block;
  color: #8492a6;
  font-size: 14px;
  margin-bottom: 20px;
}

.theme-hb .el-step {
  /deep/ .el-step__icon .el-icon-check {
    font-size: 14px !important;
    padding: 0;
    border-radius: 50%;
    border: none;
    border-color: inherit;
  }
}

</style>
