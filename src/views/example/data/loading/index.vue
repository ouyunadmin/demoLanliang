<template>
  <admin-container>
    <!-- header -->
    <template slot="header">Loading 加载</template>

    <!-- body -->
    <el-row :gutter="20">
      <!-- content -->
      <el-col :span="24">
        <!-- base -->
        <el-card shadow="always" class="admin-mb">
          <div slot="header" class="admin-clearfix">
            <span>区域加载</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-row class="mb-20">
                <el-table
                  v-loading="loading.base"
                  :data="tableData"
                  style="width: 100%"
                >
                  <el-table-column
                    prop="date"
                    label="日期"
                    width="180"
                  />
                  <el-table-column
                    prop="name"
                    label="姓名"
                    width="180"
                  />
                  <el-table-column
                    prop="address"
                    label="地址"
                  />
                </el-table>
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

        <!-- customize -->
        <el-card shadow="always" class="admin-mb">
          <div slot="header" class="admin-clearfix">
            <span>自定义</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-row class="mb-20">
                <el-table
                  v-loading="loading.customize"
                  element-loading-text="拼命加载中"
                  element-loading-spinner="el-icon-loading"
                  element-loading-background="rgba(0, 0, 0, 0.8)"
                  :data="tableData"
                  style="width: 100%"
                >
                  <el-table-column
                    prop="date"
                    label="日期"
                    width="180"
                  />
                  <el-table-column
                    prop="name"
                    label="姓名"
                    width="180"
                  />
                  <el-table-column
                    prop="address"
                    label="地址"
                  />
                </el-table>
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

        <!-- screen -->
        <el-card shadow="always" class="admin-mb">
          <div slot="header" class="admin-clearfix">
            <span>整页加载</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-row class="mb-20">
                <el-button
                  v-loading.fullscreen.lock="loading.screen"
                  type="primary"
                  @click="vOpenFullScreen"
                >
                  指令方式
                </el-button>
                <el-button
                  type="primary"
                  @click="openFullScreen"
                >
                  服务方式
                </el-button>
              </el-row>
            </el-col>
            <el-col :span="12" class="second-col">
              <div>
                <admin-markdown :source="docScreen" />
              </div>
              <div class="mt10">
                <admin-highlight :code="code.screen" />
              </div>
            </el-col>
          </el-row>
        </el-card>

      </el-col>
    </el-row>

    <!-- footer -->
    <template slot="footer">
      <admin-link-btn title="文档" link="https://element.eleme.cn/2.0/#/zh-CN/component/loading" />
    </template>
  </admin-container>
</template>

<script>
import doc from './doc.js'
import code from './code.js'

export default {
  name: 'DataLoading',
  data() {
    return {
      ...doc,
      code,
      tableData: [{
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      loading: {
        customize: true,
        base: true,
        screen: false
      }
    }
  },
  methods: {
    vOpenFullScreen() {
      this.loading.screen = true
      setTimeout(() => {
        this.loading.screen = false
      }, 2000)
    },
    openFullScreen() {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      setTimeout(() => {
        loading.close()
      }, 2000)
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
