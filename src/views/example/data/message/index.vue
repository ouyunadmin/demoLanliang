<template>
  <admin-container>
    <!-- header -->
    <template slot="header">Message 消息提示</template>

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
                <div class="demonstration">从顶部出现，3 秒后自动消失。</div>
                <el-button :plain="true" @click="openBase">打开消息提示</el-button>
                <el-button :plain="true" @click="openVnBase">VNode</el-button>
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

        <!-- diff -->
        <el-card shadow="always" class="admin-mb">
          <div slot="header" class="admin-clearfix">
            <span>不同状态</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-row class="mb-20">
                <div class="demonstration">用来显示「成功、警告、消息、错误」类的操作反馈。</div>
                <el-button :plain="true" @click="open2Diff">成功</el-button>
                <el-button :plain="true" @click="open3Diff">警告</el-button>
                <el-button :plain="true" @click="openDiff">消息</el-button>
                <el-button :plain="true" @click="open4Diff">错误</el-button>
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

        <!-- close -->
        <el-card shadow="always" class="admin-mb">
          <div slot="header" class="admin-clearfix">
            <span>可关闭</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-row class="mb-20">
                <div class="demonstration">可以添加关闭按钮。</div>
                <el-button :plain="true" @click="open5Close">消息</el-button>
                <el-button :plain="true" @click="open6Close">成功</el-button>
                <el-button :plain="true" @click="open7Close">警告</el-button>
                <el-button :plain="true" @click="open8Close">错误</el-button>
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

        <!-- html -->
        <el-card shadow="always" class="admin-mb">
          <div slot="header" class="admin-clearfix">
            <span>使用 HTML 片段</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-row class="mb-20">
                <div class="demonstration">message 属性支持传入 HTML 片段</div>
                <el-button :plain="true" @click="openHTML">使用 HTML 片段</el-button>
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

      </el-col>
    </el-row>

    <!-- footer -->
    <template slot="footer">
      <admin-link-btn title="文档" link="https://element.eleme.cn/2.0/#/zh-CN/component/message" />
    </template>
  </admin-container>
</template>

<script>
import doc from './doc.js'
import code from './code.js'

export default {
  name: 'DataMessage',
  data() {
    return {
      ...doc,
      code
    }
  },
  methods: {
    openBase() {
      this.$message('这是一条消息提示')
    },
    openVnBase() {
      const h = this.$createElement
      this.$message({
        message: h('p', null, [
          h('span', null, '内容可以是 '),
          h('i', { style: 'color: teal' }, 'VNode')
        ])
      })
    },
    openDiff() {
      this.$message('这是一条消息提示')
    },
    open2Diff() {
      this.$message({
        message: '恭喜你，这是一条成功消息',
        type: 'success'
      })
    },

    open3Diff() {
      this.$message({
        message: '警告哦，这是一条警告消息',
        type: 'warning'
      })
    },

    open4Diff() {
      this.$message.error('错了哦，这是一条错误消息')
    },

    open5Close() {
      this.$message({
        showClose: true,
        message: '这是一条消息提示'
      })
    },

    open6Close() {
      this.$message({
        showClose: true,
        message: '恭喜你，这是一条成功消息',
        type: 'success'
      })
    },

    open7Close() {
      this.$message({
        showClose: true,
        message: '警告哦，这是一条警告消息',
        type: 'warning'
      })
    },

    open8Close() {
      this.$message({
        showClose: true,
        message: '错了哦，这是一条错误消息',
        type: 'error'
      })
    },

    openHTML() {
      this.$message({
        dangerouslyUseHTMLString: true,
        message: '<strong>这是 <i>HTML</i> 片段</strong>'
      })
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

</style>
