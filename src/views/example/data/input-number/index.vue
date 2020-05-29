<template>
  <admin-container>
    <!-- header -->
    <template slot="header">InputNumber 计数器</template>

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
                <el-input-number v-model="inputNumber.base" :min="1" :max="10" label="描述文字" :step="2" step-strictly />
              </el-row>
              <div class="admin-mt-20 text">值：{{ inputNumber.base }}</div>
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
                <el-input-number v-model="inputNumber.disable" :disabled="true" />
              </el-row>
              <div class="admin-mt-20 text">值：{{ inputNumber.disable }}</div>
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

      </el-col>
    </el-row>

    <!-- footer -->
    <template slot="footer">
      <admin-link-btn title="文档" link="https://element.eleme.cn/2.0/#/zh-CN/component/input-number" />
    </template>
  </admin-container>
</template>

<script>
import doc from './doc.js'
import code from './code.js'

export default {
  name: 'DataInputNumber',
  data() {
    return {
      ...doc,
      code,
      inputNumber: { // 值
        base: 1,
        disable: 1
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
    /deep/ .el-input-number--medium {
      line-height: 28px;
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
