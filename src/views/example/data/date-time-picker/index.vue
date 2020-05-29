<template>
  <admin-container>
    <!-- header -->
    <template slot="header">DateTimePicker 日期时间选择器</template>

    <!-- body -->
    <el-row :gutter="20">
      <!-- content -->
      <el-col :span="24">
        <!-- base -->
        <el-card shadow="always" class="admin-mb">
          <div slot="header" class="admin-clearfix">
            <span>日期和时间点</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-row class="mb-20">
                <span class="demonstration">默认：</span>
                <el-date-picker
                  v-model="baseDate.value1"
                  type="datetime"
                  placeholder="选择日期时间"
                />
                <div class="admin-mt-20 text">值：{{ baseDate.value1 }}</div>
              </el-row>
              <el-row class="mb-20">
                <span class="demonstration">带快捷选项：</span>
                <el-date-picker
                  v-model="baseDate.value2"
                  type="datetime"
                  placeholder="选择日期时间"
                  align="right"
                  :picker-options="basePickerOptions"
                />
                <div class="admin-mt-20 text">值：{{ baseDate.value2 }}</div>
              </el-row>
              <el-row class="mb-20">
                <span class="demonstration">设置默认时间：</span>
                <el-date-picker
                  v-model="baseDate.value3"
                  type="datetime"
                  placeholder="选择日期时间"
                  default-time="12:00:00"
                />
                <div class="admin-mt-20 text">值：{{ baseDate.value3 }}</div>
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

        <!-- scope -->
        <el-card shadow="always" class="admin-mb">
          <div slot="header" class="admin-clearfix">
            <span>日期和时间范围</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-row class="mb-20">
                <span class="demonstration">默认：</span>
                <el-date-picker
                  v-model="scopeDate.value1"
                  type="datetimerange"
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
                  type="datetimerange"
                  :picker-options="scopePickerOptions"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  align="right"
                  :default-time="['12:00:00', '08:00:00']"
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
      <admin-link-btn title="文档" link="https://element.eleme.cn/2.0/#/zh-CN/component/date-time-picker" />
    </template>
  </admin-container>
</template>

<script>
import doc from './doc.js'
import code from './code.js'

export default {
  name: 'DataDateTimePicker',
  data() {
    return {
      ...doc,
      code,
      baseDate: { // 值
        value1: '',
        value2: '',
        value3: ''
      },
      scopeDate: {
        value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
        value2: ''
      },
      basePickerOptions: {
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
