<template>
  <admin-container>
    <!-- header -->
    <template slot="header">DatePicker 日期选择器</template>

    <!-- body -->
    <el-row :gutter="20">
      <!-- content -->
      <el-col :span="24">
        <!-- base -->
        <el-card shadow="always" class="admin-mb">
          <div slot="header" class="admin-clearfix">
            <span>选择日</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-row class="mb-20">
                <span class="demonstration">默认：</span>
                <el-date-picker
                  v-model="baseDate.value1"
                  type="date"
                  placeholder="选择日期"
                />
                <div class="admin-mt-20 text">值：{{ baseDate.value1 }}</div>
              </el-row>

              <el-row class="mb-20">
                <span class="demonstration">带快捷选项：</span>
                <el-date-picker
                  v-model="baseDate.value2"
                  align="right"
                  type="date"
                  placeholder="选择日期"
                  :picker-options="basePickerOptions"
                />
                <div class="admin-mt-20 text">值：{{ baseDate.value2 }}</div>
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

        <!-- other -->
        <el-card shadow="always" class="admin-mb">
          <div slot="header" class="admin-clearfix">
            <span>其他日期单位</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-row class="mb-20">
                <span class="demonstration">周：</span>
                <el-date-picker
                  v-model="otherDate.value1"
                  type="week"
                  format="yyyy 第 WW 周"
                  placeholder="选择周"
                />
                <div class="admin-mt-20 text">值：{{ otherDate.value1 }}</div>
              </el-row>

              <el-row class="mb-20">
                <span class="demonstration">月：</span>
                <el-date-picker
                  v-model="otherDate.value2"
                  type="month"
                  placeholder="选择月"
                />
                <div class="admin-mt-20 text">值：{{ otherDate.value2 }}</div>
              </el-row>

              <el-row class="mb-20">
                <span class="demonstration">年：</span>
                <el-date-picker
                  v-model="otherDate.value3"
                  type="year"
                  placeholder="选择年"
                />
                <div class="admin-mt-20 text">值：{{ otherDate.value3 }}</div>
              </el-row>

              <el-row class="mb-20">
                <span class="demonstration">多个日期：</span>
                <el-date-picker
                  v-model="otherDate.value4"
                  type="dates"
                  placeholder="选择一个或多个日期"
                />
                <div class="admin-mt-20 text">值：{{ otherDate.value4 }}</div>
              </el-row>

            </el-col>
            <el-col :span="12" class="second-col">
              <div>
                <admin-markdown :source="docOther" />
              </div>
              <div class="mt10">
                <admin-highlight :code="code.other" />
              </div>
            </el-col>
          </el-row>
        </el-card>

        <!-- scope -->
        <el-card shadow="always" class="admin-mb">
          <div slot="header" class="admin-clearfix">
            <span>选择日期范围</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-row class="mb-20">
                <span class="demonstration">默认：</span>
                <el-date-picker
                  v-model="scopeDate.value1"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                />
                <div class="admin-mt-20 text">值：{{ scopeDate.value1 }}</div>
              </el-row>

              <el-row class="mb-20">
                <span class="demonstration">带快捷选项：</span>
                <el-date-picker
                  v-model="scopeDate.value2"
                  type="daterange"
                  align="right"
                  unlink-panels
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :picker-options="scopePickerOptions"
                />
                <div class="admin-mt-20 text">值：{{ scopeDate.value2 }}</div>
              </el-row>

            </el-col>
            <el-col :span="12" class="second-col">
              <div>
                <admin-markdown :source="docScope" />
              </div>
              <div class="mt10">
                <admin-highlight :code="code.scope" />
              </div>
            </el-col>
          </el-row>
        </el-card>

      </el-col>
    </el-row>

    <!-- footer -->
    <template slot="footer">
      <admin-link-btn title="文档" link="https://element.eleme.cn/2.0/#/zh-CN/component/date-picker" />
    </template>
  </admin-container>
</template>

<script>
import doc from './doc.js'
import code from './code.js'

export default {
  name: 'DataDatePicker',
  data() {
    return {
      ...doc,
      code,
      baseDate: { // 值
        value1: '',
        value2: ''
      },
      otherDate: {
        value1: '',
        value2: '',
        value3: '',
        value4: ''
      },
      scopeDate: {
        value1: '',
        value2: ''
      },
      basePickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      },
      scopePickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
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
