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
                <el-switch
                  v-model="switchs.base"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                />
                <div class="admin-mt-20 text">值：{{ switchs.base }}</div>
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

        <!-- text -->
        <el-card shadow="always" class="admin-mb">
          <div slot="header" class="admin-clearfix">
            <span>文字描述</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-row class="mb-20">
                <el-switch
                  v-model="switchs.text"
                  active-text="按月付费"
                  inactive-text="按年付费"
                />
              </el-row>
              <el-row class="mb-20">
                <el-switch
                  v-model="switchs.text"
                  style="display: block"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  active-text="按月付费"
                  inactive-text="按年付费"
                />
              </el-row>
              <div class="admin-mt-20 text">值：{{ switchs.text }}</div>
            </el-col>
            <el-col :span="12" class="second-col">
              <div>
                <admin-markdown :source="docText" />
              </div>
              <div class="mt10">
                <admin-highlight :code="code.text" />
              </div>
            </el-col>
          </el-row>
        </el-card>

        <!-- extend -->
        <el-card shadow="always" class="admin-mb">
          <div slot="header" class="admin-clearfix">
            <span>扩展的 value 类型</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-tooltip :content="'Switch value: ' + switchs.extend" placement="top">
                <el-switch
                  v-model="switchs.extend"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  active-value="100"
                  inactive-value="0"
                />
              </el-tooltip>
              <div class="admin-mt-20 text">值：{{ switchs.extend }}</div>
            </el-col>
            <el-col :span="12" class="second-col">
              <div>
                <admin-markdown :source="docExtend" />
              </div>
              <div class="mt10">
                <admin-highlight :code="code.extend" />
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
              <el-switch
                v-model="switchs.disable"
                disabled
              />
              <div class="admin-mt-20 text">值：{{ switchs.disable }}</div>
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
      <admin-link-btn title="文档" link="https://element.eleme.cn/2.0/#/zh-CN/component/switch" />
    </template>
  </admin-container>
</template>

<script>
import doc from './doc.js'
import code from './code.js'

export default {
  name: 'DataSwitch',
  data() {
    return {
      ...doc,
      code,
      switchs: { // 值
        base: true,
        text: true,
        extend: true,
        disable: true
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
}
.text {
  font-size: 14px;
}
</style>
