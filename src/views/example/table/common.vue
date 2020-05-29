<template>
  <admin-container class="grid-table">
    <div class="grid-body" flex="dir:top">
      <div flex-box="0" class="form-search bg">
        <el-form
          ref="form"
          :inline="true"
          :model="listQuery"
          size="mini"
        >
          <el-form-item label="下单日期" prop="dataNo">
            <el-date-picker
              v-model="listQuery.dataNo"
              type="daterange"
              value-format="yyyy-MM-dd"
              :editable="false"
              style="width: 240px;"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
          </el-form-item>

          <el-form-item label="关键字" prop="title">
            <el-input
              v-model.trim="listQuery.title"
              class="keyword"
              placeholder="可查询托运单号、收货人、发货人、货号"
              clearable
              @keyup.enter.native="handleFilter"
            />
          </el-form-item>

          <el-form-item>
            <el-button type="primary" :loading="loading" @click="handleFilter"><admin-icon name="search" /> 查询</el-button>
          </el-form-item>

          <el-form-item>
            <el-button @click="handleFormReset"><admin-icon name="refresh" /> 重置</el-button>
          </el-form-item>
        </el-form>
      </div>

      <!-- <div flex-box="0" class="state-filter admin-mt-10">
        <el-radio-group v-model="listQuery.status" size="mini" @change="handleFilter()">
          <el-radio-button v-for="(item, index) in stateList" :key="item.code" :label="item.code">{{item.desc}}</el-radio-button>
        </el-radio-group>
      </div> -->

      <div flex-box="0" class="button-operation admin-mt-10">
        <el-button type="primary" plain size="mini">新增</el-button>
        <el-button :loading="loading" :disabled="editDisabled" type="primary" plain size="mini">编辑</el-button>
        <el-button :loading="loading" :disabled="detailDisabled" type="primary" class="white" plain size="mini">详情</el-button>
        <el-button :loading="loading" :disabled="cancelDisabled" type="primary" class="white" plain size="mini">取消</el-button>
        <el-button type="primary" class="white export" plain size="mini">导出</el-button>
      </div>

      <div flex-box="1" class="grid-list">
        <my-ag-grid ref="testGrid" :loading="loading" :options="gridOptions" :is-list="gridList" @gridClickFnc="gridClickFnc" @onRowSelected="onRowSelected" />
      </div>
    </div>
    <admin-pagination
      slot="footer"
      class="footer-page"
      :page="page.page"
      :limit="page.limit"
      :total="total"
      @change="handlePaginationChange"
    />
  </admin-container>
</template>

<script>
import { cloneDeep } from 'lodash'
import elements from '@/mixins/elementsPermission'
import pagination from '@/mixins/pagination'
import { testList } from '@/api/demo/api'
import { GetDateStr } from '@/plugin/utils'

export default {
  name: 'TableCommon',
  mixins: [
    elements,
    pagination
  ],
  data() {
    const _that = this
    return {
      listQuery: {
        // 日期
        dataNo: '',
        // 关键字搜索
        title: '',
        status: ''
      },
      loading: false,
      // gird设置
      gridOptions: {
        // 表头名（必填）
        tableName: '单据列表',
        // 列表设置显示
        setting: true,
        // 配制增加列
        gridCfg: [
          {
            'headerName': '',
            'suppressMenu': true,
            'suppressMovable': true,
            'width': 30,
            'pinned': 'left',
            'resizable': false, // 列宽
            'sortable': false, // 不排序
            'filter': false, // 不过滤
            'checkboxSelection': true,
            'headerCheckboxSelection': true
          }
        ],
        // 行补充
        rowFnc(rowOptions) {
        },
        // 补充配制
        optionsFnc(gridOptions) {
          // 选择 multiple-多选 single-单选
          gridOptions.rowSelection = 'multiple'
        },
        // 双击
        gridDbClickFnc() {
          _that.gridDbClickFnc()
        },
        // 自己定义单元格内容支持input，图片，链接-gridClickFnc 单击事件
        typeGrid: {
          type: {
            type: 'url'
          },
          image_uri: {
            type: 'image'
          },
          // 过滤html标签
          html: {
            type: 'title'
          },
          pageviews: {
            type: 'input',
            // 数字，小数点
            precision: 0
          }
        }
      }
    }
  },
  computed: {
    // 编辑按钮过滤
    editDisabled() {
      return !(this.selectRowData.length === 1)
    },
    // 取消按钮过滤
    cancelDisabled() {
      return !(this.selectRowData.length === 1)
    },
    // 详情按钮过滤
    detailDisabled() {
      return !(this.selectRowData.length === 1)
    }
  },
  mounted() {
    // 合并下带参数查询
    Object.assign(this.listQuery, this.$route.query)
    if (this.$route.query.date) {
      const dataNo = []
      dataNo[0] = GetDateStr(-120)
      dataNo[1] = GetDateStr(-30)
      this.listQuery.dataNo = dataNo
    }
    this.$nextTick(() => {
      this.handleFilter()
    })
  },
  methods: {
    // 状态切换
    handleTableName(val) {
      const { code = 0 } = this.stateList.find(t => (t.code === parseInt(val))) || {}
      this.listQuery.status = code
      setTimeout(() => {
        this.handleFilter()
      }, 100)
    },
    // 表格双击详情
    gridDbClickFnc() {
      this.handleDetails()
    },
    // 链接单击事件
    gridClickFnc(res) {
      /*
       * res.field 点击的列名, 多列链接区分
       * 自定义事件
       */
      console.log(res.field)
    },
    // 详情
    handleDetails() {
    },
    // 新增
    handleCreate() {
      this.$router.push({ 'name': 'FormAdd' })
    },
    // 更新
    handleUpdate() {
    },
    // 删除
    handleDelete() {
    },
    // 启用
    handleOn() {
    },
    // 禁用
    handleOff() {
    },
    //  获取接口列表
    getList() {
      const listQuery = cloneDeep(this.listQuery)
      if (listQuery['dataNo']) {
        listQuery.gmtOrderBegin = listQuery.dataNo[0] + ' 00:00:00'
        listQuery.gmtOrderEnd = listQuery.dataNo[1] + ' 23:59:59'
      }
      const httpParams = {
        ...listQuery,
        ...this.page
      }
      this.loading = true
      testList(httpParams)
        .then(response => {
          this.loading = false
          this.selectRowData = []
          this.gridList = response.data.list
          this.total = response.data.total
        })
        .catch(() => {
          this.loading = false
        })
    }
  }
}
</script>
