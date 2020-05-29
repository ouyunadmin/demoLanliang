<template>
  <admin-container>
    <!-- header -->
    <template slot="header">Dialog 对话框</template>

    <!-- body -->
    <el-row :gutter="20">
      <!-- content -->
      <el-col :span="12">
        <!-- base -->
        <el-card shadow="always" class="admin-mb">
          <div slot="header" class="admin-clearfix">
            <span>基础用法</span>
          </div>
          <el-row class="mb-20 flex">
            <div class="demonstration">Dialog 弹出一个对话框，适合需要定制性更大的场景。</div>
            <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>

            <el-dialog
              title="提示"
              :visible.sync="dialogVisible"
              width="30%"
              :before-close="handleClose"
            >
              <span>这是一段信息</span>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
              </span>
            </el-dialog>
          </el-row>
        </el-card>
      </el-col>

      <el-col :span="12">
        <el-card shadow="always" class="admin-mb">
          <admin-markdown :source="docBase" />
        </el-card>

        <el-card shadow="always" class="admin-mb">
          <admin-highlight :code="code.base" />
        </el-card>
      </el-col>
    </el-row>

    <!-- footer -->
    <template slot="footer">
      <admin-link-btn title="文档" link="https://element.eleme.cn/2.0/#/zh-CN/component/dialog" />
    </template>
  </admin-container>
</template>

<script>
import doc from './doc.js'
import code from './code.js'

export default {
  name: 'DataDialog',
  data() {
    return {
      ...doc,
      code,
      dialogVisible: false
    }
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
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
