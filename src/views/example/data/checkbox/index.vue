<template>
  <admin-container>
    <!-- header -->
    <template slot="header">Checkbox 多选框</template>

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
                <el-checkbox v-model="checked.base">备选项</el-checkbox>
              </el-row>
              <div class="admin-mt-20 text">值：{{ checked.base }}</div>
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
        <!-- base -->
        <el-card shadow="always" class="admin-mb">
          <div slot="header" class="admin-clearfix">
            <span>禁用状态</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-row class="mb-20">
                <el-checkbox v-model="checked.disableOne" disabled>备选项1</el-checkbox>
                <el-checkbox v-model="checked.disableTwo" disabled>备选项</el-checkbox>
              </el-row>
              <div class="admin-mt-20 text">值：{{ checked.disableOne }}，值：{{ checked.disableTwo }}</div>
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

        <!-- multiple -->
        <el-card shadow="always" class="admin-mb">
          <div slot="header" class="admin-clearfix">
            <span>多选框组</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-row class="mb-20">
                <el-checkbox-group v-model="checked.multiple">
                  <el-checkbox label="复选框 A" />
                  <el-checkbox label="复选框 B" />
                  <el-checkbox label="复选框 C" />
                  <el-checkbox label="禁用" disabled />
                  <el-checkbox label="选中且禁用" disabled />
                </el-checkbox-group>
              </el-row>
              <div class="admin-mt-20 text">值：{{ checked.multiple }}</div>
            </el-col>
            <el-col :span="12" class="second-col">
              <div>
                <admin-markdown :source="docMultiple" />
              </div>
              <div class="mt10">
                <admin-highlight :code="code.multiple" />
              </div>
            </el-col>
          </el-row>
        </el-card>

        <!-- indeterminate -->
        <el-card shadow="always" class="admin-mb">
          <div slot="header" class="admin-clearfix">
            <span>indeterminate 状态</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-row class="mb-20">
                <el-checkbox v-model="indeterminateCheckAll" :indeterminate="isIndeterminate" @change="indeterminateHandleCheckAllChange">全选</el-checkbox>
                <div style="margin: 15px 0;" />
                <el-checkbox-group v-model="checked.indeterminate" @change="indeterminateHandleCheckedCitiesChange">
                  <el-checkbox v-for="city in indeterminateCities" :key="city" :label="city">{{ city }}</el-checkbox>
                </el-checkbox-group>
              </el-row>
              <div class="admin-mt-20 text">值：{{ checked.indeterminate }}</div>
            </el-col>
            <el-col :span="12" class="second-col">
              <div>
                <admin-markdown :source="docIndeterminate" />
              </div>
              <div class="mt10">
                <admin-highlight :code="code.indeterminate" />
              </div>
            </el-col>
          </el-row>
        </el-card>

        <!-- number -->
        <el-card shadow="always" class="admin-mb">
          <div slot="header" class="admin-clearfix">
            <span>可选项目数量的限制</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-row class="mb-20">
                <el-checkbox-group
                  v-model="checked.number"
                  :min="1"
                  :max="2"
                >
                  <el-checkbox v-for="city in numberCities" :key="city" :label="city">{{ city }}</el-checkbox>
                </el-checkbox-group>
              </el-row>
              <div class="admin-mt-20 text">值checkedCities：{{ checked.number }}</div>
            </el-col>
            <el-col :span="12" class="second-col">
              <div>
                <admin-markdown :source="docNumber" />
              </div>
              <div class="mt10">
                <admin-highlight :code="code.number" />
              </div>
            </el-col>
          </el-row>
        </el-card>

      </el-col>
    </el-row>

    <!-- footer -->
    <template slot="footer">
      <admin-link-btn title="文档" link="https://element.eleme.cn/2.0/#/zh-CN/component/checkbox" />
    </template>
  </admin-container>
</template>

<script>
import doc from './doc.js'
import code from './code.js'

const cityOptions = ['上海', '北京', '广州', '深圳']

export default {
  name: 'DataButton',
  data() {
    return {
      ...doc,
      code,
      checked: { // 值
        base: true,
        disableOne: false,
        disableTwo: true,
        multiple: ['选中且禁用', '复选框 A'],
        indeterminate: ['上海', '北京'],
        number: ['上海', '北京']
      },
      indeterminateCities: cityOptions, // indeterminate
      isIndeterminate: true, // indeterminate
      indeterminateCheckAll: false, // indeterminate
      numberCities: cityOptions // number
    }
  },
  methods: {
    indeterminateHandleCheckAllChange(val) { // indeterminate
      this.checked.indeterminate = val ? cityOptions : []
      this.isIndeterminate = false
    },
    indeterminateHandleCheckedCitiesChange(value) { // indeterminate
      const checkedCount = value.length
      this.indeterminateCheckAll = checkedCount === this.indeterminateCities.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.indeterminateCities.length
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
