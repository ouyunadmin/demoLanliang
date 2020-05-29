<template>
  <admin-container>
    <!-- header -->
    <template slot="header">TimePicker 时间选择器</template>

    <!-- body -->
    <el-row :gutter="20">
      <!-- content -->
      <el-col :span="24">
        <!-- base -->
        <el-card shadow="always" class="admin-mb">
          <div slot="header" class="admin-clearfix">
            <span>固定时间点</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-row class="mb-20">
                <el-time-select
                  v-model="baseTime.value1"
                  :picker-options="{
                    start: '08:30',
                    step: '00:15',
                    end: '18:30'
                  }"
                  placeholder="选择时间"
                />
                <div class="admin-mt-20 text">值：{{ baseTime.value1 }}</div>
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

        <!-- wantonly -->
        <el-card shadow="always" class="admin-mb">
          <div slot="header" class="admin-clearfix">
            <span>任意时间点</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-row class="mb-20">
                <el-time-picker
                  v-model="wantonlyTime.value1"
                  :picker-options="{
                    selectableRange: '18:30:00 - 20:30:00'
                  }"
                  placeholder="任意时间点"
                />
                <div class="admin-mt-20 text">值：{{ wantonlyTime.value1 }}</div>
              </el-row>
              <el-row class="mb-20">
                <el-time-picker
                  v-model="wantonlyTime.value2"
                  arrow-control
                  :picker-options="{
                    selectableRange: '18:30:00 - 20:30:00'
                  }"
                  placeholder="任意时间点"
                />
                <div class="admin-mt-20 text">值：{{ wantonlyTime.value2 }}</div>
              </el-row>
            </el-col>
            <el-col :span="12" class="second-col">
              <div>
                <admin-markdown :source="docWantonly" />
              </div>
              <div class="mt10">
                <admin-highlight :code="code.wantonly" />
              </div>
            </el-col>
          </el-row>
        </el-card>

        <!-- setTime -->
        <el-card shadow="always" class="admin-mb">
          <div slot="header" class="admin-clearfix">
            <span>固定时间范围</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-row class="mb-20">
                <el-time-select
                  v-model="setTime.startTime"
                  placeholder="起始时间"
                  :picker-options="{
                    start: '08:30',
                    step: '00:15',
                    end: '18:30'
                  }"
                />
                <el-time-select
                  v-model="setTime.endTime"
                  placeholder="结束时间"
                  :picker-options="{
                    start: '08:30',
                    step: '00:15',
                    end: '18:30',
                    minTime: setTime.startTime
                  }"
                />
                <div class="admin-mt-20 text">值：{{ setTime.startTime }} - {{ setTime.endTime }}</div>
              </el-row>
            </el-col>
            <el-col :span="12" class="second-col">
              <div>
                <admin-markdown :source="docSet" />
              </div>
              <div class="mt10">
                <admin-highlight :code="code.set" />
              </div>
            </el-col>
          </el-row>
        </el-card>

        <!-- wilfully -->
        <el-card shadow="always" class="admin-mb">
          <div slot="header" class="admin-clearfix">
            <span>固定时间点</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-row class="mb-20">
                <el-time-picker
                  v-model="wilfullyTime.value1"
                  is-range
                  range-separator="至"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  placeholder="选择时间范围"
                />
                <div class="admin-mt-20 text">值：{{ wilfullyTime.value1 }}</div>
              </el-row>
              <el-row class="mb-20">
                <el-time-picker
                  v-model="wilfullyTime.value2"
                  is-range
                  arrow-control
                  range-separator="至"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  placeholder="选择时间范围"
                />
                <div class="admin-mt-20 text">值：{{ wilfullyTime.value2 }}</div>
              </el-row>
            </el-col>
            <el-col :span="12" class="second-col">
              <div>
                <admin-markdown :source="docWilfully" />
              </div>
              <div class="mt10">
                <admin-highlight :code="code.wilfully" />
              </div>
            </el-col>
          </el-row>
        </el-card>

      </el-col>
    </el-row>

    <!-- footer -->
    <template slot="footer">
      <admin-link-btn title="文档" link="https://element.eleme.cn/2.0/#/zh-CN/component/time-picker" />
    </template>
  </admin-container>
</template>

<script>
import doc from './doc.js'
import code from './code.js'

export default {
  name: 'DataTimePicker',
  data() {
    return {
      ...doc,
      code,
      baseTime: { // 值
        value1: ''
      },
      wantonlyTime: {
        value1: '',
        value2: ''
      },
      setTime: {
        startTime: '',
        endTime: ''
      },
      wilfullyTime: {
        value1: '',
        value2: ''
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
