<template>
  <admin-container>
    <!-- header -->
    <template slot="header">Slider 滑块</template>

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
                <span class="demonstration">默认</span>
                <el-slider v-model="sliiderBase.value1" />
                <div class="admin-mt-20 text">值：{{ sliiderBase.value1 }}</div>
              </el-row>
              <el-row class="mb-20">
                <span class="demonstration">自定义初始值</span>
                <el-slider v-model="sliiderBase.value2" />
                <div class="admin-mt-20 text">值：{{ sliiderBase.value2 }}</div>
              </el-row>
              <el-row class="mb-20">
                <span class="demonstration">隐藏 Tooltip</span>
                <el-slider v-model="sliiderBase.value3" :show-tooltip="false" />
                <div class="admin-mt-20 text">值：{{ sliiderBase.value3 }}</div>
              </el-row>
              <el-row class="mb-20">
                <span class="demonstration">格式化 Tooltip</span>
                <el-slider v-model="sliiderBase.value4" :format-tooltip="formatTooltip" />
                <div class="admin-mt-20 text">值：{{ sliiderBase.value4 }}</div>
              </el-row>
              <el-row class="mb-20">
                <span class="demonstration">禁用</span>
                <el-slider v-model="sliiderBase.value5" disabled />
                <div class="admin-mt-20 text">值：{{ sliiderBase.value5 }}</div>
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

        <!-- step -->
        <el-card shadow="always" class="admin-mb">
          <div slot="header" class="admin-clearfix">
            <span>离散值</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-row class="mb-20">
                <span class="demonstration">不显示间断点</span>
                <el-slider v-model="sliiderStep.value1" :step="10" />
                <div class="admin-mt-20 text">值：{{ sliiderStep.value1 }}</div>
              </el-row>
              <el-row class="mb-20">
                <span class="demonstration">显示间断点</span>
                <el-slider v-model="sliiderStep.value2" :step="10" show-stops />
                <div class="admin-mt-20 text">值：{{ sliiderStep.value2 }}</div>
              </el-row>
            </el-col>
            <el-col :span="12" class="second-col">
              <div>
                <admin-markdown :source="docStep" />
              </div>
              <div class="mt10">
                <admin-highlight :code="code.step" />
              </div>
            </el-col>
          </el-row>
        </el-card>

        <!-- input -->
        <el-card shadow="always" class="admin-mb">
          <div slot="header" class="admin-clearfix">
            <span>带有输入框</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-row class="mb-20">
                <el-slider v-model="sliiderInput.value1" show-input />
                <div class="admin-mt-20 text">值：{{ sliiderInput.value1 }}</div>
              </el-row>
            </el-col>
            <el-col :span="12" class="second-col">
              <div>
                <admin-markdown :source="docInput" />
              </div>
              <div class="mt10">
                <admin-highlight :code="code.input" />
              </div>
            </el-col>
          </el-row>
        </el-card>

        <!-- range -->
        <el-card shadow="always" class="admin-mb">
          <div slot="header" class="admin-clearfix">
            <span>范围选择</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-row class="mb-20">
                <el-slider v-model="sliiderRange.value1" range show-stops :max="10" />
                <div class="admin-mt-20 text">值：{{ sliiderRange.value1 }}</div>
              </el-row>
            </el-col>
            <el-col :span="12" class="second-col">
              <div>
                <admin-markdown :source="docRange" />
              </div>
              <div class="mt10">
                <admin-highlight :code="code.range" />
              </div>
            </el-col>
          </el-row>
        </el-card>

        <!-- vertical -->
        <el-card shadow="always" class="admin-mb">
          <div slot="header" class="admin-clearfix">
            <span>竖向模式</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-row class="mb-20">
                <el-slider v-model="sliiderVertical.value1" vertical height="200px" />
                <div class="admin-mt-20 text">值：{{ sliiderVertical.value1 }}</div>
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

        <!-- marks -->
        <el-card shadow="always" class="admin-mb">
          <div slot="header" class="admin-clearfix">
            <span>竖向模式</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-row class="mb-20">
                <el-slider v-model="sliiderMarks.value1" range :marks="marks" />
                <div class="admin-mt-20 text">值：{{ sliiderMarks.value1 }}</div>
              </el-row>
            </el-col>
            <el-col :span="12" class="second-col">
              <div>
                <admin-markdown :source="docMarks" />
              </div>
              <div class="mt10">
                <admin-highlight :code="code.marks" />
              </div>
            </el-col>
          </el-row>
        </el-card>

      </el-col>
    </el-row>

    <!-- footer -->
    <template slot="footer">
      <admin-link-btn title="文档" link="https://element.eleme.cn/2.0/#/zh-CN/component/slider" />
    </template>
  </admin-container>
</template>

<script>
import doc from './doc.js'
import code from './code.js'

export default {
  name: 'DataSlider',
  data() {
    return {
      ...doc,
      code,
      sliiderBase: { // 值
        value1: 0,
        value2: 20,
        value3: 30,
        value4: 40,
        value5: 50
      },
      sliiderStep: {
        value1: 0,
        value2: 10
      },
      sliiderInput: {
        value1: 20
      },
      sliiderRange: {
        value1: [4, 8]
      },
      sliiderVertical: {
        value1: 0
      },
      sliiderMarks: {
        value1: [30, 60]
      },
      marks: {
        0: '0°C',
        8: '8°C',
        37: '37°C',
        50: {
          style: {
            color: '#1989FA'
          },
          label: this.$createElement('strong', '50%')
        }
      }
    }
  },
  methods: {
    formatTooltip(val) {
      return val / 100
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
.demonstration{
  font-size: 14px;
  color: #8492a6;
  line-height: 44px;
  & + .el-slider {
    float: right;
    width: 70%;
  }
}

.el-slider {
  margin-right: 30px;
}

.text {
  font-size: 14px;
}
</style>
