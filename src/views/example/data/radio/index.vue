<template>
  <admin-container>
    <!-- header -->
    <template slot="header">Radio 单选框</template>

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
                <el-radio v-model="radio.base" label="1">备选项</el-radio>
                <el-radio v-model="radio.base" label="2">备选项</el-radio>
              </el-row>
              <div class="admin-mt-20 text">值：{{ radio.base }}</div>
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

        <!-- diabled -->
        <el-card shadow="always" class="admin-mb">
          <div slot="header" class="admin-clearfix">
            <span>禁用状态</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-row class="mb-20">
                <el-radio v-model="radio.disable" disabled label="禁用">备选项</el-radio>
                <el-radio v-model="radio.disable" disabled label="选中且禁用">备选项</el-radio>
              </el-row>
              <div class="admin-mt-20 text">值：{{ radio.disable }}</div>
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

        <!-- single -->
        <el-card shadow="always" class="admin-mb">
          <div slot="header" class="admin-clearfix">
            <span>单选框组</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-row class="mb-20">
                <el-radio-group v-model="radio.single">
                  <el-radio :label="3">备选项</el-radio>
                  <el-radio :label="6">备选项</el-radio>
                  <el-radio :label="9">备选项</el-radio>
                </el-radio-group>
              </el-row>
              <div class="admin-mt-20 text">值：{{ radio.single }}</div>
            </el-col>
            <el-col :span="12" class="second-col">
              <div>
                <admin-markdown :source="docSingle" />
              </div>
              <div class="mt10">
                <admin-highlight :code="code.single" />
              </div>
            </el-col>
          </el-row>
        </el-card>

        <!-- button -->
        <el-card shadow="always" class="admin-mb">
          <div slot="header" class="admin-clearfix">
            <span>按钮样式</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-row class="mb-20">
                <el-radio-group v-model="radio.button" size="medium">
                  <el-radio-button label="上海" />
                  <el-radio-button label="北京" />
                  <el-radio-button label="广州" />
                  <el-radio-button label="深圳" />
                </el-radio-group>
              </el-row>
              <div class="admin-mt-20 text">值：{{ radio.button }}</div>
            </el-col>
            <el-col :span="12" class="second-col">
              <div>
                <admin-markdown :source="docButton" />
              </div>
              <div class="mt10">
                <admin-highlight :code="code.button" />
              </div>
            </el-col>
          </el-row>
        </el-card>

        <!-- border -->
        <el-card shadow="always" class="admin-mb">
          <div slot="header" class="admin-clearfix">
            <span>带有边框</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-row class="mb-20">
                <el-radio v-model="radio.border" label="1" border size="medium">备选项1</el-radio>
                <el-radio v-model="radio.border" label="2" border size="medium">备选项2</el-radio>
              </el-row>
              <div class="admin-mt-20 text">值：{{ radio.border }}</div>
            </el-col>
            <el-col :span="12" class="second-col">
              <div>
                <admin-markdown :source="docBorder" />
              </div>
              <div class="mt10">
                <admin-highlight :code="code.border" />
              </div>
            </el-col>
          </el-row>
        </el-card>

      </el-col>
    </el-row>

    <!-- footer -->
    <template slot="footer">
      <admin-link-btn title="文档" link="https://element.eleme.cn/2.0/#/zh-CN/component/radio" />
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
      code,
      radio: { // 值
        base: '1',
        disable: '选中且禁用',
        single: 3,
        button: '上海',
        border: '1'
      }
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
  /deep/ .el-radio-button--medium .el-radio-button__inner {
    padding: 7px 20px;
  }
  /deep/ .el-radio--medium.is-bordered {
    height: 30px;
    padding: 7px 20px 0 7px;
  }
}
.text {
  font-size: 14px;
}
</style>
