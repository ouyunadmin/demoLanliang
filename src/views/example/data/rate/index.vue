<template>
  <admin-container>
    <!-- header -->
    <template slot="header">Rate 评分</template>

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
                <span class="demonstration">默认不区分颜色</span>
                <el-rate v-model="baseRate.value1" />
                <div class="admin-mt-20 text">值：{{ baseRate.value1 }}</div>
              </el-row>

              <el-row class="mb-20">
                <span class="demonstration">区分颜色</span>
                <el-rate
                  v-model="baseRate.value2"
                  :colors="baseColors"
                />
                <div class="admin-mt-20 text">值：{{ baseRate.value2 }}</div>
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
            <span>辅助文字</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-row class="mb-20">
                <el-rate
                  v-model="textRate.value1"
                  show-text
                />
                <div class="admin-mt-20 text">值：{{ textRate.value1 }}</div>
              </el-row>
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

        <!-- icon -->
        <el-card shadow="always" class="admin-mb">
          <div slot="header" class="admin-clearfix">
            <span>其它 icon</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-row class="mb-20">
                <el-rate
                  v-model="iconRate.value1"
                  :icon-classes="iconClasses"
                  void-icon-class="el-icon-eleme"
                  :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
                />
                <div class="admin-mt-20 text">值：{{ iconRate.value1 }}</div>
              </el-row>
            </el-col>
            <el-col :span="12" class="second-col">
              <div>
                <admin-markdown :source="docIcon" />
              </div>
              <div class="mt10">
                <admin-highlight :code="code.icon" />
              </div>
            </el-col>
          </el-row>
        </el-card>

        <!-- score -->
        <el-card shadow="always" class="admin-mb">
          <div slot="header" class="admin-clearfix">
            <span>只读</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-row class="mb-20">
                <el-rate
                  v-model="score.value1"
                  disabled
                  show-score
                  text-color="#ff9900"
                  score-template="{value}"
                />
                <div class="admin-mt-20 text">值：{{ score.value1 }}</div>
              </el-row>
            </el-col>
            <el-col :span="12" class="second-col">
              <div>
                <admin-markdown :source="docScore" />
              </div>
              <div class="mt10">
                <admin-highlight :code="code.score" />
              </div>
            </el-col>
          </el-row>
        </el-card>

      </el-col>
    </el-row>

    <!-- footer -->
    <template slot="footer">
      <admin-link-btn title="文档" link="https://element.eleme.cn/2.0/#/zh-CN/component/rate" />
    </template>
  </admin-container>
</template>

<script>
import doc from './doc.js'
import code from './code.js'

export default {
  name: 'DataRate',
  data() {
    return {
      ...doc,
      code,
      baseRate: { // 值
        value1: null,
        value2: null
      },
      textRate: {
        value1: null
      },
      iconRate: {
        value1: 2
      },
      score: {
        value1: 3.7
      },
      baseColors: ['#99A9BF', '#F7BA2A', '#FF9900'],
      iconClasses: ['el-icon-error', 'el-icon-success', 'el-icon-warning']
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
/deep/ [class*=" icon-"], [class^=icon-] {
  font-family: icomoon!important;
  speak: none;
  font-style: normal;
  font-weight: 400;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
