<template>
  <admin-container>
    <!-- header -->
    <template slot="header">alert 警告</template>

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
                <el-alert
                  title="成功提示的文案"
                  type="success"
                />
                <el-alert
                  title="消息提示的文案"
                  type="info"
                />
                <el-alert
                  title="警告提示的文案"
                  type="warning"
                />
                <el-alert
                  title="错误提示的文案"
                  type="error"
                />
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
                <el-alert
                  title="成功提示的文案"
                  type="success"
                  effect="dark"
                />
                <el-alert
                  title="消息提示的文案"
                  type="info"
                  effect="dark"
                />
                <el-alert
                  title="警告提示的文案"
                  type="warning"
                  effect="dark"
                />
                <el-alert
                  title="错误提示的文案"
                  type="error"
                  effect="dark"
                />
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

        <!-- customize -->
        <el-card shadow="always" class="admin-mb">
          <div slot="header" class="admin-clearfix">
            <span>自定义关闭按钮</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-row class="mb-20">
                <el-alert
                  title="不可关闭的 alert"
                  type="success"
                  :closable="false"
                />
                <el-alert
                  title="自定义 close-text"
                  type="info"
                  close-text="知道了"
                />
                <el-alert
                  title="设置了回调的 alert"
                  type="warning"
                  @close="hello"
                />
              </el-row>
            </el-col>
            <el-col :span="12" class="second-col">
              <div>
                <admin-markdown :source="docCustomize" />
              </div>
              <div class="mt10">
                <admin-highlight :code="code.customize" />
              </div>
            </el-col>
          </el-row>
        </el-card>

        <!-- spec -->
        <el-card shadow="always" class="admin-mb">
          <div slot="header" class="admin-clearfix">
            <span>带有 icon 和辅助性文字介绍</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-row class="mb-20">
                <el-alert
                  title="成功提示的文案"
                  type="success"
                  description="文字说明文字说明文字说明文字说明文字说明文字说明"
                  show-icon
                />
                <el-alert
                  title="消息提示的文案"
                  type="info"
                  description="文字说明文字说明文字说明文字说明文字说明文字说明"
                  show-icon
                />
                <el-alert
                  title="警告提示的文案"
                  type="warning"
                  description="文字说明文字说明文字说明文字说明文字说明文字说明"
                  show-icon
                />
                <el-alert
                  title="错误提示的文案"
                  type="error"
                  description="文字说明文字说明文字说明文字说明文字说明文字说明"
                  show-icon
                />
              </el-row>
            </el-col>
            <el-col :span="12" class="second-col">
              <div>
                <admin-markdown :source="docSpec" />
              </div>
              <div class="mt10">
                <admin-highlight :code="code.spec" />
              </div>
            </el-col>
          </el-row>
        </el-card>

      </el-col>
    </el-row>

    <!-- footer -->
    <template slot="footer">
      <admin-link-btn title="文档" link="https://element.eleme.cn/2.0/#/zh-CN/component/alert" />
    </template>
  </admin-container>
</template>

<script>
import doc from './doc.js'
import code from './code.js'

export default {
  name: 'DataAlert',
  data() {
    return {
      ...doc,
      code
    }
  },
  methods: {
    hello() {
      alert('Hello World!')
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
.el-alert {
  margin-bottom: 20px;
}
</style>
