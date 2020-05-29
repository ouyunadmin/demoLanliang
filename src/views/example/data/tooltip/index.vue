<template>
  <admin-container>
    <!-- header -->
    <template slot="header">Tooltip 文字提示</template>

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
                <div class="box">
                  <div class="top">
                    <el-tooltip class="item" effect="dark" content="Top Left 提示文字" placement="top-start">
                      <el-button>上左</el-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="Top Center 提示文字" placement="top">
                      <el-button>上边</el-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="Top Right 提示文字" placement="top-end">
                      <el-button>上右</el-button>
                    </el-tooltip>
                  </div>
                  <div class="left">
                    <el-tooltip class="item" effect="dark" content="Left Top 提示文字" placement="left-start">
                      <el-button>左上</el-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="Left Center 提示文字" placement="left">
                      <el-button>左边</el-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="Left Bottom 提示文字" placement="left-end">
                      <el-button>左下</el-button>
                    </el-tooltip>
                  </div>

                  <div class="right">
                    <el-tooltip class="item" effect="dark" content="Right Top 提示文字" placement="right-start">
                      <el-button>右上</el-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="Right Center 提示文字" placement="right">
                      <el-button>右边</el-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="Right Bottom 提示文字" placement="right-end">
                      <el-button>右下</el-button>
                    </el-tooltip>
                  </div>
                  <div class="bottom">
                    <el-tooltip class="item" effect="dark" content="Bottom Left 提示文字" placement="bottom-start">
                      <el-button>下左</el-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="Bottom Center 提示文字" placement="bottom">
                      <el-button>下边</el-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="Bottom Right 提示文字" placement="bottom-end">
                      <el-button>下右</el-button>
                    </el-tooltip>
                  </div>
                </div>
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

        <!-- effect -->
        <el-card shadow="always" class="admin-mb">
          <div slot="header" class="admin-clearfix">
            <span>主题</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-row class="mb-20">
                <el-tooltip content="Top center" placement="top">
                  <el-button>Dark</el-button>
                </el-tooltip>
                <el-tooltip content="Bottom center" placement="bottom" effect="light">
                  <el-button>Light</el-button>
                </el-tooltip>
              </el-row>
            </el-col>
            <el-col :span="12" class="second-col">
              <div>
                <admin-markdown :source="docEffect" />
              </div>
              <div class="mt10">
                <admin-highlight :code="code.effect" />
              </div>
            </el-col>
          </el-row>
        </el-card>

        <!-- content -->
        <el-card shadow="always" class="admin-mb">
          <div slot="header" class="admin-clearfix">
            <span>主题</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-row class="mb-20">
                <el-tooltip placement="top">
                  <div slot="content">多行信息<br>第二行信息</div>
                  <el-button>Top center</el-button>
                </el-tooltip>
              </el-row>
            </el-col>
            <el-col :span="12" class="second-col">
              <div>
                <admin-markdown :source="docContent" />
              </div>
              <div class="mt10">
                <admin-highlight :code="code.content" />
              </div>
            </el-col>
          </el-row>
        </el-card>

      </el-col>
    </el-row>

    <!-- footer -->
    <template slot="footer">
      <admin-link-btn title="文档" link="https://element.eleme.cn/2.0/#/zh-CN/component/tooltip" />
    </template>
  </admin-container>
</template>

<script>
import doc from './doc.js'
import code from './code.js'

export default {
  name: 'DataTooltip',
  data() {
    return {
      ...doc,
      code
    }
  },
  methods: {
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
.box {
  width: 400px;

  .top {
    text-align: center;
  }

  .left {
    float: left;
    width: 60px;
  }

  .right {
    float: right;
    width: 60px;
  }

  .bottom {
    clear: both;
    text-align: center;
  }

  .item {
    margin: 4px;
  }

  .left .el-tooltip__popper,
  .right .el-tooltip__popper {
    padding: 8px 10px;
  }
}
</style>
