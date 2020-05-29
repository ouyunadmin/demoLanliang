<template>
  <admin-container>
    <!-- header -->
    <template slot="header">Notification 通知</template>

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
                <div class="demonstration">适用性广泛的通知栏</div>
                <el-button
                  plain
                  @click="openBase"
                >
                  可自动关闭
                </el-button>
                <el-button
                  plain
                  @click="open2Base"
                >
                  不会自动关闭
                </el-button>
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

        <!-- icon -->
        <el-card shadow="always" class="admin-mb">
          <div slot="header" class="admin-clearfix">
            <span>带有倾向性</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-row class="mb-20">
                <div class="demonstration">带有 icon，常用来显示「成功、警告、消息、错误」类的系统消息</div>
                <el-button
                  plain
                  @click="open3Icon"
                >
                  成功
                </el-button>
                <el-button
                  plain
                  @click="open4Icon"
                >
                  警告
                </el-button>
                <el-button
                  plain
                  @click="open5Icon"
                >
                  消息
                </el-button>
                <el-button
                  plain
                  @click="open6Icon"
                >
                  错误
                </el-button>
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

        <!-- position -->
        <el-card shadow="always" class="admin-mb">
          <div slot="header" class="admin-clearfix">
            <span>自定义弹出位置</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-row class="mb-20">
                <div class="demonstration">可以让 Notification 从屏幕四角中的任意一角弹出</div>
                <el-button
                  plain
                  @click="open7Position"
                >
                  右上角
                </el-button>
                <el-button
                  plain
                  @click="open8Position"
                >
                  右下角
                </el-button>
                <el-button
                  plain
                  @click="open9Position"
                >
                  左下角
                </el-button>
                <el-button
                  plain
                  @click="open10Position"
                >
                  左上角
                </el-button>
              </el-row>
            </el-col>
            <el-col :span="12" class="second-col">
              <div>
                <admin-markdown :source="docPosition" />
              </div>
              <div class="mt10">
                <admin-highlight :code="code.position" />
              </div>
            </el-col>
          </el-row>
        </el-card>

        <!-- offset -->
        <el-card shadow="always" class="admin-mb">
          <div slot="header" class="admin-clearfix">
            <span>自定义弹出位置</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-row class="mb-20">
                <div class="demonstration">让 Notification 偏移一些位置</div>
                <el-button
                  plain
                  @click="open11Offset"
                >
                  偏移的消息
                </el-button>
              </el-row>
            </el-col>
            <el-col :span="12" class="second-col">
              <div>
                <admin-markdown :source="docOffset" />
              </div>
              <div class="mt10">
                <admin-highlight :code="code.offset" />
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
                <el-button
                  plain
                  @click="open12Html"
                >
                  使用 HTML 片段
                </el-button>
              </el-row>
            </el-col>
            <el-col :span="12" class="second-col">
              <div>
                <admin-markdown :source="docHtml" />
              </div>
              <div class="mt10">
                <admin-highlight :code="code.html" />
              </div>
            </el-col>
          </el-row>
        </el-card>

        <!-- close -->
        <el-card shadow="always" class="admin-mb">
          <div slot="header" class="admin-clearfix">
            <span>隐藏关闭按钮</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-row class="mb-20">
                <div class="demonstration">可以不显示关闭按钮</div>
                <el-button
                  plain
                  @click="open13Close"
                >
                  隐藏关闭按钮
                </el-button>
              </el-row>
            </el-col>
            <el-col :span="12" class="second-col">
              <div>
                <admin-markdown :source="docClose" />
              </div>
              <div class="mt10">
                <admin-highlight :code="code.close" />
              </div>
            </el-col>
          </el-row>
        </el-card>

      </el-col>
    </el-row>

    <!-- footer -->
    <template slot="footer">
      <admin-link-btn title="文档" link="https://element.eleme.cn/2.0/#/zh-CN/component/notification" />
    </template>
  </admin-container>
</template>

<script>
import doc from './doc.js'
import code from './code.js'

export default {
  name: 'DataNotification',
  data() {
    return {
      ...doc,
      code
    }
  },
  methods: {
    openBase() {
      const h = this.$createElement
      this.$notify({
        title: '标题名称',
        message: h('i', { style: 'color: teal' }, '这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案')
      })
    },

    open2Base() {
      this.$notify({
        title: '提示',
        message: '这是一条不会自动关闭的消息',
        duration: 0
      })
    },

    open3Icon() {
      this.$notify({
        title: '成功',
        message: '这是一条成功的提示消息',
        type: 'success'
      })
    },

    open4Icon() {
      this.$notify({
        title: '警告',
        message: '这是一条警告的提示消息',
        type: 'warning'
      })
    },

    open5Icon() {
      this.$notify.info({
        title: '消息',
        message: '这是一条消息的提示消息'
      })
    },

    open6Icon() {
      this.$notify.error({
        title: '错误',
        message: '这是一条错误的提示消息'
      })
    },

    open7Position() {
      this.$notify({
        title: '自定义位置',
        message: '右上角弹出的消息'
      })
    },

    open8Position() {
      this.$notify({
        title: '自定义位置',
        message: '右下角弹出的消息',
        position: 'bottom-right'
      })
    },

    open9Position() {
      this.$notify({
        title: '自定义位置',
        message: '左下角弹出的消息',
        position: 'bottom-left'
      })
    },

    open10Position() {
      this.$notify({
        title: '自定义位置',
        message: '左上角弹出的消息',
        position: 'top-left'
      })
    },

    open11Offset() {
      this.$notify({
        title: '偏移',
        message: '这是一条带有偏移的提示消息',
        offset: 100
      })
    },

    open12Html() {
      this.$notify({
        title: 'HTML 片段',
        dangerouslyUseHTMLString: true,
        message: '<strong>这是 <i>HTML</i> 片段</strong>'
      })
    },

    open13Close() {
      this.$notify.success({
        title: 'Info',
        message: '这是一条没有关闭按钮的消息',
        showClose: false
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
