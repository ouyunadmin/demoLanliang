<template>
  <admin-container>
    <!-- header -->
    <template slot="header">ColorPicker 颜色选择器</template>

    <!-- body -->
    <el-row :gutter="20">
      <!-- content -->
      <el-col :span="12">
        <!-- base -->
        <el-card shadow="always" class="admin-mb">
          <div slot="header" class="admin-clearfix">
            <span>基础用法</span>
          </div>
          <el-row class="mb-20 flex">
            <div class="block">
              <span class="demonstration">有默认值</span>
              <el-color-picker v-model="value1" show-alpha />
              <div class="admin-mt-20 text">值:{{ value1 }}</div>
            </div>

            <div class="block">
              <span class="demonstration">无默认值</span>
              <el-color-picker v-model="value2" />
              <div class="admin-mt-20 text">值:{{ value2 }}</div>
            </div>
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
      <admin-link-btn title="文档" link="https://element.eleme.cn/2.0/#/zh-CN/component/color-picker" />
    </template>
  </admin-container>
</template>

<script>
import doc from './doc.js'
import code from './code.js'

export default {
  name: 'DataColorPicker',
  data() {
    return {
      ...doc,
      code,
      value2: null,
      value1: '#409EFF'
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

.flex {
  display: flex;
}

.demonstration {
  display: block;
  color: #8492a6;
  font-size: 14px;
  margin-bottom: 20px;
}
.block {
  padding: 30px 0;
  text-align: center;
  border-right: 1px solid #eff2f6;
  width: 50%;
  box-sizing: border-box;
  &:last-child {
    border-right: none;
  }
}
</style>
