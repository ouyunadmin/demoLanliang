<template>
  <admin-container>
    <!-- header -->
    <template slot="header">Badge 标记</template>

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
                <el-badge :value="12" class="item">
                  <el-button size="small">评论</el-button>
                </el-badge>
                <el-badge :value="3" class="item">
                  <el-button size="small">回复</el-button>
                </el-badge>
                <el-badge :value="1" class="item" type="primary">
                  <el-button size="small">评论</el-button>
                </el-badge>
                <el-badge :value="2" class="item" type="warning">
                  <el-button size="small">回复</el-button>
                </el-badge>
              </el-row>
              <el-row class="mb-20">
                <el-dropdown trigger="click">
                  <span class="el-dropdown-link">
                    点我查看<i class="el-icon-caret-bottom el-icon--right" />
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item class="clearfix">
                      评论
                      <el-badge class="mark" :value="12" />
                    </el-dropdown-item>
                    <el-dropdown-item class="clearfix">
                      回复
                      <el-badge class="mark" :value="3" />
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>

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

        <!-- dot -->
        <el-card shadow="always" class="admin-mb">
          <div slot="header" class="admin-clearfix">
            <span>小红点</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-row class="mb-20">
                <el-badge is-dot class="item">数据查询</el-badge>
                <el-badge is-dot class="item">
                  <el-button class="share-button" icon="el-icon-share" type="primary" />
                </el-badge>
              </el-row>
            </el-col>
            <el-col :span="12" class="second-col">
              <div>
                <admin-markdown :source="docDot" />
              </div>
              <div class="mt10">
                <admin-highlight :code="code.dot" />
              </div>
            </el-col>
          </el-row>
        </el-card>

      </el-col>
    </el-row>

    <!-- footer -->
    <template slot="footer">
      <admin-link-btn title="文档" link="https://element.eleme.cn/2.0/#/zh-CN/component/badge" />
    </template>
  </admin-container>
</template>

<script>
import doc from './doc.js'
import code from './code.js'

export default {
  name: 'DataBadge',
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

.item {
  margin-top: 10px;
  margin-right: 40px;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
</style>
