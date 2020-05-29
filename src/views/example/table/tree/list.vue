<template>
  <div class="admin-container-body-full" flex="dir:top">
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

    <div flex-box="0" class="button-operation admin-mt-10">
      <el-button type="primary" class="white" plain size="mini" @click="handleCreate">新增</el-button>
      <el-button type="primary" class="white export" plain size="mini" @click="onBthExport">导出</el-button>
    </div>

    <div flex-box="1" class="grid-list">
      <my-ag-grid ref="testGrid" :loading="loading" :options="gridOptions" :is-list="gridList" @gridClickFnc="gridClickFnc" @onRowSelected="onRowSelected" />
    </div>

    <div flex-box="0" class="footer-page admin-clearfix admin-mt-10">
      <admin-pagination
        style="margin: 0;"
        :page="page.page"
        :limit="page.limit"
        :total="total"
        @change="handlePaginationChange"
      />
    </div>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash'
import { testList } from '@/api/demo/api'
import elements from '@/mixins/elementsPermission'
import pagination from '@/mixins/pagination'

export default {
  name: 'ExampleFormTreeList',
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
        status: '',
        id: null
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
            'suppressSorting': true,
            'suppressMenu': true,
            'suppressMovable': true,
            'width': 30,
            'pinned': 'left',
            'suppressResize': true,
            'suppressFilter': true,
            'checkboxSelection': true,
            'headerCheckboxSelection': true
          }
        ],
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
      return !(this.selectRowData.length === 1 && this.selectRowData[0].btnCancel === 1 && (this.selectRowData[0].status === '已开单' || this.selectRowData[0].status === '已下单' || (this.selectRowData[0].status === '已入库' && this.selectRowData[0].takeGoodsMethod === '自送上门')))
    },
    // 详情按钮过滤
    detailDisabled() {
      return !(this.selectRowData.length === 1)
    }
  },
  mounted() {
    this.$bus.on('tree-form-list', this.getData)
  },
  beforeDestroy() {
    this.$bus.off('tree-form-list', this.getData)
  },
  methods: {
    getData(res) {
      this.listQuery.id = res
      this.handleFormReset()
      this.$nextTick(() => {
        this.handleFilter()
      })
    },
    // 表格双击详情
    gridDbClickFnc() {
      this.handleDetails()
    },
    // 链接单击事件
    gridClickFnc(res) {
      /*
       * res.field 点击的列名
       * 自定义事件
       */
    },
    // 新增托运单
    handleCreate() {
      this.$router.push({ 'name': 'FormAdd' })
    },
    // 详情
    handleDetails() {
    },
    // 更新
    handleUpdate() {
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
