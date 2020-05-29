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
            <el-button
              :loading="loading"
              type="primary"
              @click="handleFilter"
            >
              <admin-icon name="search" />
              查询
            </el-button>
          </el-form-item>

          <el-form-item>
            <el-button
              @click="handleFormReset"
            >
              <admin-icon name="refresh" />
              重置
            </el-button>
          </el-form-item>

        </el-form>
      </div>

      <div flex-box="0" class="state-filter admin-mt-10">
        <el-radio-group v-model="listQuery.status" size="mini" @change="handleFilter()">
          <el-radio-button v-for="(item, index) in stateList" :key="index" :label="item.code">{{ item.desc }}</el-radio-button>
        </el-radio-group>
      </div>

      <div flex-box="0" class="button-operation admin-mt-10">
        <el-button :loading="loading" type="primary" class="white" plain size="mini" @click="handleCreate">新增</el-button>
        <el-button :loading="loading" type="primary" :disabled="editDisabled" class="white" plain size="mini" @click="handleUpdate">编辑</el-button>
        <el-button :loading="loading" type="primary" :disabled="detailDisabled" class="white" plain size="mini" @click="handleDetails">详情</el-button>
        <el-button :loading="loading" :disabled="cancelDisabled" type="primary" class="white" plain size="mini" @click="handleCancel">取消</el-button>
        <el-button :loading="loading" type="primary" class="white" plain size="mini" @click="handleSelectAll">选中draft状态</el-button>
        <el-button :loading="loading" type="primary" class="white" plain size="mini" @click="$refs.testGrid.onSelectAll()">全选</el-button>
        <el-button :loading="loading" type="primary" class="white" plain size="mini" @click="$refs.testGrid.onDeselectAll()">清除选择</el-button>
        <el-button :loading="loading" type="primary" class="white" plain size="mini" @click="handleStatus">自定义过滤</el-button>
        <el-button :loading="loading" type="primary" class="white" plain size="mini" @click="handleClear">清除过滤</el-button>
        <el-button :loading="loading" type="primary" class="white" plain size="mini" @click="$refs.testGrid.onSort([{colId:'title',sort:'asc'}])">自定义排序</el-button>
        <el-button v-waves :loading="loading" type="primary" class="white" plain size="mini" @click="$refs.testGrid.onSort(null)">清除排序</el-button>
        <el-button v-addRoutes="{'name': 'TableList', 'query': {'id': '1'}}" :loading="loading" type="primary" class="white" plain size="mini">新的列表</el-button>
        <el-button type="primary" class="white export" plain size="mini" @click="onBthExport">导出</el-button>
      </div>

      <div flex-box="1" class="grid-list">
        <my-ag-grid ref="testGrid" :loading="loading" :options="gridOptions" :row-bottom="rowBottom" :is-list="gridList" @gridClickFnc="gridClickFnc" @onFilterChanged="onFilterChanged" @onSortChanged="onSortChanged" @onRowSelected="handleSelected" />
      </div>

    </div>

    <!--<div class="footer-page" slot="footer">
      <el-pagination style="margin: -10px 0;" background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page"
                     :page-sizes="[20,30,50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>-->
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
import { cloneDeep, sumBy } from 'lodash'
import elements from '@/mixins/elementsPermission'
import pagination from '@/mixins/pagination'
import { testList } from '@/api/demo/api'
import { GetDateStr } from '@/plugin/utils'
import rowGridModules from './components/RowGridModules'

export default {
  name: 'TableList',
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
            // 'suppressSorting': true,
            'sortable': false,
            'suppressMenu': true,
            'suppressMovable': true,
            'width': 30,
            'pinned': 'left',
            // 'suppressResize': true,
            'resizable': false,
            // 'suppressFilter': true,
            'filter': false,
            'checkboxSelection'(params) {
              return params.columnApi.getRowGroupColumns().length === 0
            },
            'headerCheckboxSelection'(params) {
              return params.columnApi.getRowGroupColumns().length === 0
            },
            cellClass() {
              return 'alphabet'
            }
          },
          {
            'headerName': '操作',
            'width': 120,
            'suppressMenu': true,
            'suppressMovable': true, // 列移动
            // 'suppressResize': true, // 列宽
            // 'suppressSorting': true, // 不排序
            // 'suppressFilter': true, // 不过滤
            'resizable': false, // 列宽
            'sortable': false, // 不排序
            'filter': false, // 不过滤
            'cellRendererFramework': rowGridModules
          },
          {
            'headerName': '数据',
            'field': 'id',
            // 'valueGetter': function(params) {
            //   return params.node.childIndex !== undefined ? params.node.childIndex + 1 : ''
            // },
            'width': 120,
            'suppressMenu': true,
            'suppressMovable': true, // 列移动
            // 'suppressResize': true, // 列宽
            // 'suppressSorting': true, // 不排序
            // 'suppressFilter': true, // 不过滤
            'resizable': false, // 列宽
            'sortable': false, // 不排序
            'filter': false, // 不过滤
            'rowDrag': true // 拖动区域
          }
        ],
        // 行补充
        rowFnc(rowOptions, data) {
          // 单元格样式
          rowOptions.cellClass = (params) => {
            if (params.colDef.field === 'status' && params.value === 'draft') {
              return 'cell-status'
            }
            return 'alphabet__' + data.fieldName
          }
          // 自己定义排序
          rowOptions.comparator = (valueA, valueB, nodeA, nodeB, isInverted) => {
            return false
          }
          // 行跨越合并
          rowOptions.rowSpan = (params) => {
            if (params.colDef.field === 'type') {
              return params.data.type === 'CN' ? 2 : 1
            }
            return 1
          }
          rowOptions.cellClassRules = {
            'cell-span': 'value==="CN" || value==="CN"'
          }
          // 列跨越合并
          rowOptions.colSpan = (params) => {
            if (params.colDef.field === 'status') {
              return params.data.status === 'published' ? 2 : 1
            }
            return 1
          }
        },
        // 补充配制
        optionsFnc(gridOptions) {
          // 筛选条件，是否可以选
          gridOptions.isRowSelectable = (rowNode) => {
            return rowNode.data ? rowNode.data.forecast < 60 : false
          }
          // 行颜色
          gridOptions.getRowClass = function(params) {
            if (params.data.forecast > 60) {
              return 'row-color-red'
            }
          }
          // 行排序
          gridOptions.sortingOrder = ['desc', 'asc', null]
          // gridOptions.accentedSort = true
          // 选择 multiple-多选 single-单选
          gridOptions.rowSelection = 'multiple'
          // 设置为true，点击不选择行
          // gridOptions.suppressRowClickSelection = true
          // 设置为true，点击不选单元格
          gridOptions.suppressCellSelection = false
          // 是否排序- onSortChanged 回调
          // gridOptions.enableSorting = true
          // gridOptions.enableServerSideSorting = true
          // 是否索引- onFilterChanged 回调
          gridOptions.floatingFilter = true
          // gridOptions.enableServerSideFilter = true
          // 行拖动，动画 gridOptions.api.setSuppressRowDrag(true) 设置， 'rowDrag': true column
          gridOptions.rowDragManaged = true
          // gridOptions.animateRows = true
          // 自行高度
          // gridOptions.domLayout = 'autoHeight'
          // 行跨越合并
          gridOptions.suppressRowTransform = true
          // 虚拟化 10,000行
          gridOptions.suppressMaxRenderedRowRestriction = true
          // 无限滚动
          // gridOptions.rowModelType = 'serverSide'
          // 延迟加载
          // gridOptions.cacheBlockSize = 20
          // 缓存
          // gridOptions.maxBlocksInCache = 10
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
        },
        // 索引select字段设置
        selectGrid: {
          'type': [
            { 'label': 'CN', 'value': 'CN' },
            { 'label': 'US', 'value': 'US' },
            { 'label': 'JP', 'value': 'JP' },
            { 'label': 'EU', 'value': 'EU' }
          ],
          'status': [
            { 'label': 'published', 'value': 'published' },
            { 'label': 'draft', 'value': 'draft' },
            { 'label': 'deleted', 'value': 'deleted' }
          ]
        }
      },
      stateList: [
        { 'code': '', 'desc': '全部' }
      ],
      // 底部统计
      rowBottom: [
        { 'title': '选中合计：0单' }
      ],
      sortRowData: [],
      filterRowData: {}
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
    // 索引异步更新
    setTimeout(() => {
      this.gridOptions.selectGrid.status = [
        { 'label': 'draft', 'value': 'draft' }
      ]
    }, 5000)
  },
  created() {
    // 资源权限
    // console.log(this.elements['maintenance_organization_dep_btn_add'])
  },
  methods: {
    // 行选择或取消选择
    handleSelected(row) {
      this.selectRowData = row
      this.operation()
    },
    // 状态切换
    handleTableName(val) {
      const { code = 0 } = this.stateList.find(t => (t.code === parseInt(val))) || {}
      this.listQuery.status = code
      setTimeout(() => {
        this.handleFilter()
      }, 100)
    },
    // 按条件选择
    handleSelectAll() {
      this.$refs.testGrid.gridOptions.api.forEachNode(node => {
        if (node.data.status === 'draft') {
          node.setSelected(true)
        }
      })
    },
    // 过滤条件
    handleStatus() {
      // this.$refs.testGrid.onFilter({ status: { 'filter': 'draft' }})
      // this.$refs.testGrid.gridOptions.api.setFilterModel({age: ['16','20']})
      this.$refs.testGrid.onFilter({
        status: {
          'type': 'notContains',
          'filterType': 'text',
          'filter': 'draft'
        },
        title: {
          'type': 'notContains',
          'filterType': 'text',
          'filter': 'A'
        }
      })
    },
    // 消除过滤
    handleClear() {
      this.$refs.testGrid.onFilter(null)
    },
    // 底部统计
    operation() {
      const list = cloneDeep(this.selectRowData)
      // sumBy 返回指定列，相加
      this.rowBottom = [
        { 'title': '选中合计：' + list.length + '单',
          'pageviews': list.length > 0 ? Number(sumBy(list, 'pageviews')) : 0
        }
      ]
      // this.$refs.testGrid && this.$refs.testGrid.onPinnedRowBottom(this.rowBottom)
    },
    // 链接单击事件
    gridClickFnc(res) {
      // field列名，多列链接区分
      console.log(res.field)
      this.$router.push({ 'name': 'FormDetail', 'query': { 'id': res.id }})
    },
    // 表格双击详情
    gridDbClickFnc() {
      this.handleDetails()
    },
    // 排序
    onSortChanged(row) {
      this.sortRowData = row
      // this.gridList = null
      this.getList()
    },
    // 过滤
    onFilterChanged(row) {
      this.filterRowData = row
      this.getList()
    },
    // 新增托运单
    handleCreate() {
      this.$router.push({ 'name': 'FormAdd' })
    },
    // 详情
    handleDetails() {
      if (this.selectRowData[0]) {
        this.$addRoute({ 'name': 'FormDetail', 'query': { 'id': this.selectRowData[0].id }})
      }
    },
    // 更新
    handleUpdate() {
      if (this.selectRowData[0]) {
        this.$addRoute({ 'name': 'FormEdit', 'query': { 'id': this.selectRowData[0].id }})
      }
    },
    // 运单取消
    handleCancel() {
      this.$confirm('是否继续?', '确认取消', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.$message({
          message: '订单取消成功！',
          center: true,
          duration: 2000
        })
        /* cancelConsign({ consignBaseId: this.selectRowData[0].id }).then(response => {
          this.$message({
            message: '订单取消成功！',
            center: true,
            duration: 2000
          })
          this.getList()
        }) */
      }).catch(() => {
      })
    },
    //  获取接口列表
    getList() {
      const listQuery = cloneDeep(this.listQuery)
      if (listQuery['dataNo']) {
        listQuery.gmtOrderBegin = listQuery.dataNo[0] + ' 00:00:00'
        listQuery.gmtOrderEnd = listQuery.dataNo[1] + ' 23:59:59'
      }
      // 排序
      if (this.sortRowData[0]) {
        // listQuery.orderBy = this.sortRowData[0].colId
        // listQuery.sort = this.sortRowData[0].sort
        listQuery.sort = '-id'
      }
      // 筛选
      const objKeys = Object.keys(this.filterRowData)
      if (objKeys.length) {
        for (const item in this.filterRowData) {
          listQuery[item] = this.filterRowData[item].filter
        }
      }
      const httpParams = {
        ...listQuery,
        ...this.page
      }
      // console.log(JSON.stringify(httpParams))
      this.loading = true
      this.$notify({
        message: '开始请求模拟表格数据'
      })
      testList(httpParams)
        .then(response => {
          this.loading = false
          this.selectRowData = []
          this.gridList = response.data.list
          this.total = response.data.total
        })
        .catch(err => {
          this.loading = false
          this.$notify({
            message: '模拟表格数据请求异常'
          })
          console.log('err', err)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .ag-fresh{
  .row-color-red {
    color: #e80000;
  }
  .cell-status {
    background-color: lightsalmon;
  }
  .cell-span {
    background-color: #00e5ff;
  }
  // .ag-row-even {
  //   background-color: unset;
  // }
  // .ag-row-odd {
  //   background-color: unset;
  // }
}
</style>
