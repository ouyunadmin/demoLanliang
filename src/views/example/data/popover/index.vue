<template>
  <admin-container>
    <!-- header -->
    <template slot="header">Popover 弹出框</template>

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
                <div class="demonstration">Popover 的属性与 Tooltip 很类似，它们都是基于Vue-popper开发的，因此对于重复属性，请参考 Tooltip 的文档，在此文档中不做详尽解释。</div>
                <el-popover
                  placement="top-start"
                  title="标题"
                  width="200"
                  trigger="hover"
                  content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
                >
                  <el-button slot="reference">hover 激活</el-button>
                </el-popover>

                <el-popover
                  placement="bottom"
                  title="标题"
                  width="200"
                  trigger="click"
                  content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
                >
                  <el-button slot="reference">click 激活</el-button>
                </el-popover>

                <el-popover
                  ref="popover"
                  placement="right"
                  title="标题"
                  width="200"
                  trigger="focus"
                  content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
                />
                <el-button v-popover:popover>focus 激活</el-button>

                <el-popover
                  v-model="visibleBase"
                  placement="bottom"
                  title="标题"
                  width="200"
                  trigger="manual"
                  content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
                >
                  <el-button slot="reference" @click="visibleBase = !visibleBase">手动激活</el-button>
                </el-popover>
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

        <!-- nest -->
        <el-card shadow="always" class="admin-mb">
          <div slot="header" class="admin-clearfix">
            <span>嵌套信息</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-row class="mb-20">
                <div class="demonstration">可以在 Popover 中嵌套多种类型信息，以下为嵌套表格的例子。</div>
                <el-popover
                  placement="right"
                  width="400"
                  trigger="click"
                >
                  <el-table :data="gridDataNest">
                    <el-table-column width="150" property="date" label="日期" />
                    <el-table-column width="100" property="name" label="姓名" />
                    <el-table-column width="300" property="address" label="地址" />
                  </el-table>
                  <el-button slot="reference">click 激活</el-button>
                </el-popover>
              </el-row>
            </el-col>
            <el-col :span="12" class="second-col">
              <div>
                <admin-markdown :source="docNest" />
              </div>
              <div class="mt10">
                <admin-highlight :code="code.nest" />
              </div>
            </el-col>
          </el-row>
        </el-card>

      </el-col>
    </el-row>

    <!-- footer -->
    <template slot="footer">
      <admin-link-btn title="文档" link="https://element.eleme.cn/2.0/#/zh-CN/component/popover" />
    </template>
  </admin-container>
</template>

<script>
import doc from './doc.js'
import code from './code.js'

export default {
  name: 'DataPopover',
  data() {
    return {
      ...doc,
      code,
      visibleBase: false,
      gridDataNest: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }]
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

.demonstration {
  display: block;
  color: #8492a6;
  font-size: 14px;
  margin-bottom: 20px;
}

</style>
