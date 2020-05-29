<template>
  <div class="grid-container">
    <div v-if="gridReset" class="tb">
      <div v-if="options.setting" class="setting">
        <el-popover
          ref="popoverlist"
          placement="bottom-end"
          width="500"
          trigger="click"
        >
          <div class="gridField">
            <div class="popover-title">
              <span>列表设置</span>
              <div class="admin-fr">
                <el-button size="mini" :loading="btmDisable" @click="saveGridStatus()">保存设置</el-button>
                <el-button size="mini" :loading="btmDisable" @click="recoverGridStatus('SNAPSHOT')">恢复保存</el-button>
                <el-button size="mini" :loading="btmDisable" @click="recoverGridStatus('SYSTEM')">恢复默认</el-button>
              </div>
            </div>
            <div class="popover-inner-content">
              <el-checkbox-group v-model="gridOpened">
                <el-checkbox v-for="item in isHeaderList" :key="item.fieldCaption" :label="item.fieldName" @change="gridOpenedChange($event, item.fieldName)">{{ item.fieldCaption }}</el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
        </el-popover>
        <div v-popover:popoverlist class="filter">
          <svg-icon icon-class="filter" />
        </div>
      </div>
      <ag-grid-vue
        :id="`${id}`"
        style="width: 100%; height: 100%;"
        class="ag-theme-balham ag-fresh"
        :class="{'ag-loading': loading}"
        :grid-options="gridOptions"
        :column-defs="columnDefs"
        :row-data="null"
        :framework-components="frameworkComponents"
        :group-headers="true"
        :pinned-bottom-row-data="rowBottom"
        :modules="modules"
        v-bind="$attrs"
        v-on="$listeners"
        @row-drag-end="onRowDragEnd"
        @row-double-clicked="options.gridDbClickFnc"
        @sort-changed="onSortChanged"
        @filter-changed="onFilterChanged"
        @body-scroll="onBodyScroll"
        @row-selected="onRowSelected"
        @selection-changed="onSelectionChanged"
        @cell-value-changed="onCellValueChanged"
        @column-moved="onColumnEvent"
        @column-resized="onColumnResized"
      />
    </div>
    <gallery :id="`images-${id}`" :images="images" :index="index" :options="{closeOnSlideClick:true}" @close="index = null" />
  </div>
</template>

<script>
import { AgGridVue } from '@ag-grid-community/vue'
import { AllCommunityModules } from '@ag-grid-community/all-modules'
// import { AllModules } from '@ag-grid-enterprise/all-modules'

import { mapActions } from 'vuex'
import TypeGridModules from './components/TypeGridModules'
import SliderFloatingFilter from './components/SliderFloatingFilter'
import { map, sortBy, remove, includes, uniqueId, cloneDeep } from 'lodash'
import overlayNoRowsBg from '@/assets/images/none_icon.png'
import VueGallery from 'vue-gallery'
import { getGridField, getGridUpdate, getGridRecover, getGridSaveSnapshot } from '@/api/demo/gridField'

export default {
  name: 'Test',
  components: {
    // AgGridVue: () => import('ag-grid-vue/dist/agGridVue'),
    'ag-grid-vue': AgGridVue,
    'gallery': VueGallery
  },
  props: {
    // 底部统计
    rowBottom: {
      type: Array,
      default: () => ([])
    },
    // 行数据
    isList: {
      type: Array,
      default: () => ([])
    },
    // 参数配制
    options: {
      type: Object,
      default: () => {}
    },
    // loading
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      id: 'vue-table-' + uniqueId(),
      gridOptions: null,
      columnDefs: null,
      rowData: null,
      // 重置
      gridReset: true,
      // 表头list
      gridField: null,
      /*  表格筛选按钮是否勾选*/
      gridOpened: [],
      // rowGridModules: ['value', 'currency'],
      /*  用来提交后台 表格信息*/
      isHeaderList: [],
      /* 控制彈出框是否可见*/
      visible: false,
      btmDisable: false,
      column: [],
      getSelectedNodes: null,
      divTop: 0,
      divLeft: 0,
      overlayNoRowsBg,
      // 画廊
      images: [],
      index: null,
      frameworkComponents: null,
      modules: AllCommunityModules
      // selectGridModules: ['value', 'currency'] // 开启下拉选择
    }
  },
  watch: {
    'isList.length': {
      handler: function(val, oldVal) {
        // this.gridOptions.api.setRowData(val)
        // this.showLoadingOverlay()
        // this.$nextTick(() => {
        //   this.setRows()
        // })
        setTimeout(() => {
          this.setRows()
        }, 200)
      },
      deep: true
    },
    'loading'(val) {
      this.$nextTick(() => {
        val ? this.showLoadingOverlay() : this.isList.length ? this.hideOverlay() : this.showNoRowsOverlay()
      })
    },
    // 索引select
    'options.selectGrid': {
      handler: function(val, oldVal) {
        // this.gridField && this.createColumnDefs(this.gridField)
        // 更新数据
        for (const i in val) {
          const rows = this.columnDefs.find(res => res.field === i)
          if (rows) {
            rows.floatingFilterComponentParams.selectGrid = val[i] || []
          }
        }
        this.gridOptions.api.setColumnDefs(this.columnDefs)
      },
      deep: true
    }
  },
  beforeMount() {
    this.init()
  },
  mounted() {
    this.$bus.emit('typeGrid', this.options.typeGrid)
    // this.gridOptions.api.sizeColumnsToFit()
  },
  activated() {
    // 全选
    // this.gridOptions.api.selectAll()
    /* if (this.getSelectedNodes[0]) {
        this.getSelectedNodes.forEach((list, index) => {
          console.log(list)
          this.gridOptions.api.ensureIndexVisible(list.rowIndex, 'top') // 跳到行
        })
      } */
    // var rowNode = this.gridOptions.api.getRowNode('10')
    // rowNode.setSelected(true) // 选中
    // ag-grid 增加 id,防止页面多个的情况，定位问题
    // const div = document.getElementById(this.id) ? document.getElementById(this.id).getElementsByClassName('ag-body-viewport')[0] : {}
    // div.scrollTo(this.divLeft, this.divTop)
    const div = this.$el.querySelector('.ag-body-viewport')
    this.divTop ? div.scrollTop = this.divTop : ''
    this.divLeft ? div.scrollLeft = this.divLeft : ''
  },
  deactivated() {
    // this.getSelectedNodes = this.gridOptions.api.getSelectedNodes()
    // 取消选择
    // this.gridOptions.api.deselectAll()
    // console.log(this.gridOptions.api.getVerticalPixelRange())
  },
  methods: {
    ...mapActions('admin/app', [
      'routeRefresh'
    ]),
    // 初始化
    init() {
      this.gridOptions = {
        defaultColDef: {
          sortable: false,
          resizable: true,
          filter: false
        },
        context: {
          componentParent: this
        },
        components: {
          selectFloatingFilter: this.getSelectFloatingFilter(),
          countryCellRenderer: this.countryCellRenderer
        },
        rowSelection: 'single', // 选择
        // enableSorting: false, // 排序
        // enableServerSideSorting: false, // 服务器排序
        // enableFilter: true, // 索引
        // enableServerSideFilter: true, // 服务器索引
        floatingFilter: false, // 索引行显示
        // enableColResize: true, // 设置为true列宽调整
        suppressMovableColumns: false, // 设置为true禁止列移动
        rowDragManaged: true, // 行拖动
        // suppressRowDrag: false, // 设置为true行拖动
        suppressDragLeaveHidesColumns: true, // 拖出网格不会隐藏该列
        suppressContextMenu: true, // 不显示菜单
        floatingFiltersHeight: 28,
        rowHeight: 32,
        headerHeight: 32,
        // suppressExcelExport: true,
        suppressCopyRowsToClipboard: true, // 单元格复制
        enableRangeSelection: true, // 单元格多选
        // toolPanelSuppressSideButtons: true,
        // domLayout: 'autoHeight', // 自行高度
        suppressRowTransform: true, // 行跨越合并
        overlayLoadingTemplate: '<span class="ag-overlay-loading-center">loading...</span>',
        overlayNoRowsTemplate: `<span class="grid-norows"><img class="pic" src="${this.overlayNoRowsBg}"><span>暂无相关记录</span></span>`
      }
      this.options.optionsFnc && this.options.optionsFnc(this.gridOptions)
      this.getGridData()
      this.frameworkComponents = { sliderFloatingFilter: SliderFloatingFilter }
    },
    // 获取表头数据
    async getGridData() {
      const { data = [] } = await getGridField(this.options.tableName)
      this.gridField = data
      this.createColumnDefs(data)
    },
    // 初始化表格数据
    createColumnDefs(data) {
      const gridOpened = []
      const columnDefs = [...cloneDeep(this.options.gridCfg || [])]
      // const data = response.data
      for (const o in data) {
        const arr = {
          'headerName': '' + data[o].fieldCaption + '',
          'field': data[o].fieldName,
          'hide': !(data[o].visibleFlag === 1),
          'width': data[o].width,
          'tooltipField': data[o].fieldName,
          'suppressMenu': true,
          'suppressMultiSort': false, // 当用户按住Shift键单击列标题时，设置为true以禁止多重排序
          // 'suppressSorting': data[o].sortFlag === 1, // 是否排序
          'sortable': data[o].sortFlag === 0, // 是否排序
          'unSortIcon': true,
          // 'suppressFilter': data[o].searchFlag === 1, // 是否过滤
          'cellRendererFramework': this.options.typeGrid && this.options.typeGrid[data[o].fieldName] ? TypeGridModules : '', // input，图片，链接
          'cellRendererParams': {
            'cellRenderer': this.options.typeGrid && this.options.typeGrid[data[o].fieldName]
          },
          // 'filter': 'agTextColumnFilter',
          'filter': data[o].searchFlag === 0, // 是否过滤
          'floatingFilterComponent': this.options.selectGrid && this.options.selectGrid[data[o].fieldName] ? 'selectFloatingFilter' : '', // 开启下拉
          'floatingFilterComponentParams': {
            'suppressFilterButton': true,
            'maxValue': 7,
            'selectGrid': this.options.selectGrid && this.options.selectGrid[data[o].fieldName]
          },
          'filterParams': {
            'caseSensitive': true,
            'suppressAndOrCondition': true,
            'suppressSyncValuesAfterDataChange': true,
            'filterOptions': ['notContains'],
            'textCustomComparator': function(filter, value, filterText) {
              return true
            }
          }
          // 单元格样式
          // 'cellClass': (params) => {
          //   return this.options.rowFnc.getCellClass ? this.options.rowFnc.getCellClass(params) : 'alphabet__' + data[o].fieldName
          //   // return 'alphabet__' + data[o].fieldName
          // },
          // // 自己定义排序
          // 'comparator': (valueA, valueB, nodeA, nodeB, isInverted) => {
          //   return false
          // }
          // 行跨越合并
          // 'rowSpan': (params) => {
          //   // return this.gridOptions.getRowSpan ? this.gridOptions.getRowSpan(params) : ''
          //   // console.log(params.data)
          //   return params.data.type === 'US' ? 2 : 1
          // }
        }
        this.options.rowFnc && this.options.rowFnc(arr, data[o])
        if (data[o].visibleFlag === 1) {
          gridOpened.push(data[o].fieldName)
        }
        columnDefs.push(arr)
      }
      this.gridOpened = gridOpened
      this.columnDefs = columnDefs
      this.isHeaderList = data
    },
    // 显示隐藏列控制
    gridOpenedChange(visibleFlag, fieldCaption) {
      this.gridOptions.columnApi.setColumnVisible('' + fieldCaption + '', visibleFlag)
      for (const i in this.isHeaderList) {
        if (this.isHeaderList[i].fieldName.indexOf(fieldCaption) !== -1) {
          if (visibleFlag) {
            this.isHeaderList[i].visibleFlag = 1
          } else {
            this.isHeaderList[i].visibleFlag = 0
          }
        }
      }
      this.btmDisable = true
      getGridUpdate(this.isHeaderList)
        .then(() => {
          this.btmDisable = false
        })
        .catch(() => {
          this.btmDisable = false
        })
    },
    // 滚动
    onBodyScroll(obj) {
      this.divTop = obj.top
      this.divLeft = obj.left
    },
    // 全选
    onSelectAll() {
      this.gridOptions.api.selectAll()
    },
    // 清除选择
    onDeselectAll() {
      this.gridOptions.api.deselectAll()
    },
    // 显示loading
    showLoadingOverlay() {
      this.gridOptions.api && this.gridOptions.api.showLoadingOverlay()
    },
    // 显示暂无相关记录
    showNoRowsOverlay() {
      this.gridOptions.api && this.gridOptions.api.showNoRowsOverlay()
    },
    // 隐藏loading和暂无相关记录
    hideOverlay() {
      setTimeout(() => {
        this.gridOptions.api && this.gridOptions.api.hideOverlay()
      }, 500)
    },
    // 全文搜索
    onQuickFilterChanged(event) {
      this.gridOptions.api.setQuickFilter(event.target.value)
    },
    // 头部固定行
    onPinnedRowTop(rows) {
      this.gridOptions.api.setPinnedTopRowData(rows)
    },
    // 底部固定行
    onPinnedRowBottom(rows) {
      this.gridOptions.api.setPinnedBottomRowData(rows)
    },
    // 排序
    onSortChanged(event) {
      // console.log(event.api.getSortModel())
      this.$emit('onSortChanged', event.api.getSortModel())
    },
    // 自定义排序条件
    onSort(sort) {
      this.gridOptions.api.setSortModel(sort)
    },
    // 过滤
    onFilterChanged(event) {
      // console.log(event.api.getFilterModel())
      // console.log(event.api.getFilterModel())
      this.$emit('onFilterChanged', event.api.getFilterModel())
      // this.gridOptions.api.setFilterModel({age: ['16','20']}) // 设置过滤条件
      // this .gridOptions.api.setQuickFilter(document.getElementById('quickFilter').value) // 行搜索
    },
    // 自定义过滤条件
    onFilter(obj) {
      this.gridOptions.api.setFilterModel(obj)
      // this.gridOptions.onFilterChanged()
    },
    // 单击列表事件
    gridClick(res) {
      // 增加列名，多个链接区分
      res.data.field = res.colDef.field
      this.$emit('gridClickFnc', res.data)
    },
    // 画廊
    clickImg(val) {
      this.images = [val]
      this.index = 0
    },
    // 查找自己定义单元格内容
    searchGridCellType(fieldName) {
      return this.options.typeGrid[fieldName]
    },
    // 导出表格
    onBthExport() {
      const params = {
        columnKeys: map(this.gridOptions.columnApi.getAllDisplayedVirtualColumns(), 'colId'),
        fileName: this.options.tableName + '下载'
      }
      this.gridOptions.api.exportDataAsCsv(params)
      // this.gridOptions.api.exportDataAsExcel(params)
    },
    // 行移动
    onRowDragEnd(event) {
      // console.log(event)
    },
    // 列宽度调整
    onColumnResized(event) {
      if (event.columns.length) {
        this.column = event.columns
      }
      /*  当用户每次拖动表格列宽时，请求后台 表头更新api*/
      if (event.finished && event.source === 'uiColumnDragged') {
        const [column = {}] = this.column
        const httpParams = [...this.isHeaderList]
        if (Object.keys(column).length) {
          const index = httpParams.findIndex(res => res.fieldName === column.colId)
          if (index !== -1) {
            httpParams[index].width = column.actualWidth
          }
          this.btmDisable = true
          getGridUpdate(httpParams)
            .then(() => {
              this.btmDisable = false
            })
            .catch(() => {
              this.btmDisable = false
            })
        }
      }
    },
    // 列移动
    onColumnEvent(event) {
      /* 当用户移动整列表格，自动更新表格数据*/
      const $gridList = event.columnApi.getAllGridColumns()
      const $copyGridList = [...$gridList]
      const $isHeaderList = [...this.isHeaderList]
      // 删除自定义列
      const $gridCfg = [...cloneDeep(this.options.gridCfg || [])]
      remove($copyGridList, item => includes(JSON.stringify($gridCfg), JSON.stringify(item.colDef)))
      // 序号
      $copyGridList.forEach((item, i) => {
        const index = $isHeaderList.findIndex(res => res.fieldName === item.colId)
        if (index !== -1) {
          $isHeaderList[index].displayOrder = i
        }
      })
      // 排序
      const $httpParams = sortBy($isHeaderList, (item) => {
        return item.displayOrder
      })
      this.isHeaderList = Array.from(new Set($httpParams))
      this.btmDisable = true
      getGridUpdate(this.isHeaderList)
        .then(() => {
          this.btmDisable = false
        })
        .catch(() => {
          this.btmDisable = false
        })
    },
    // 行选择或取消选择
    onRowSelected() {
      // this.$emit('onRowSelected', event)
      this.$emit('onRowSelected', this.gridOptions.api.getSelectedRows())
    },
    // 行选择更改
    onSelectionChanged(event) {
      // console.log(event)
    },
    // 单元格编辑后，值已更改
    onCellValueChanged(event) {
      // console.log(event)
    },
    // 保存设置
    saveGridStatus() {
      this.btmDisable = true
      getGridSaveSnapshot(this.isHeaderList)
        .then(response => {
          this.visible = false
          this.btmDisable = false
        })
        .catch(() => {
          this.btmDisable = false
        })
    },
    /*
       * 1:数据表头恢复
       * 2：templet模板名称:恢复为系统版本传入SYSTEM,恢复到快照版本则传入SNAPSHO
       */
    recoverGridStatus(status) {
      const httpParams = {
        gridName: this.options.tableName,
        templet: status
      }
      this.btmDisable = true
      getGridRecover(httpParams)
        .then(response => {
          this.btmDisable = false
          this.routeRefresh(this.$route.name)
          // this.createColumnDefs(response.data)
          // this.gridReset = false
        })
        .catch(() => {
          this.btmDisable = false
        })
    },
    // 更新数据
    setRows() {
      // const rowSelected = this.gridOptions.api.getSelectedRows()
      const rowData = []
      this.gridOptions.api.forEachNode((node) => {
        rowData.push(node.data)
      })
      this.gridOptions.api.updateRowData({
        add: this.isList,
        remove: rowData
      })
      // this.hideOverlay()
      // 失焦后选中数据
      /* setTimeout(() => {
          this.gridOptions.api.forEachNode(node => {
            if (rowSelected.some(v => v === node.data)) {
              node.setSelected(true)
            }
          })
        }, -1) */
    },
    // 表格设置
    countryCellRenderer(params) {
      return params.value + ' (' + params.data.row + ')'
    },
    getSelectFloatingFilter() {
      // const selectGrid = this.options.selectGrid
      class floatingFilter {
        // 构造函数
        constructor(selectGrid) {
          this.selectGrid = selectGrid
        }
        init(params) {
          // const _colId = params.column.colId
          // const actualFilterTypes = selectGrid[_colId] ? selectGrid[_colId] : []
          const actualFilterTypes = params.selectGrid || []
          const optionsHtml = actualFilterTypes.map((filterType) => {
            return '<option value=\'' + filterType.value + '\'>' + filterType.label + '</option>'
          })
          // this.onFloatingFilterChanged = params.onFloatingFilterChanged
          this.eGui = document.createElement('div')
          this.eGui.innerHTML = '<select style="width:100%;height:26px;border:none"><option value="">全部</option>' + optionsHtml + '</select>'
          this.eFilterInput = this.eGui.querySelector('select')
          const onInputBoxChanged = () => {
            if (this.eFilterInput.value === '') {
              // this.onFloatingFilterChanged(null)
              params.parentFilterInstance(instance => {
                instance.onFloatingFilterChanged(null, null)
              })
              return
            }
            // this.currentValue = Number(this.eFilterInput.value)
            this.currentValue = this.eFilterInput.value
            params.parentFilterInstance(instance => {
              instance.onFloatingFilterChanged('greaterThan', this.currentValue)
            })
            // this.onFloatingFilterChanged({
            //   model: {
            //     type: 'notContains',
            //     filter: this.currentValue
            //   }
            // })
          }
          this.eFilterInput.addEventListener('change', onInputBoxChanged)
        }
        onParentModelChanged(parentModel) {
          if (!parentModel) {
            this.eFilterInput.value = ''
            this.currentValue = null
          } else {
            this.eFilterInput.value = parentModel.filter + ''
            this.currentValue = parentModel.filter
          }
        }
        getGui() {
          return this.eGui
        }
      }
      return floatingFilter
    }
  }
}
</script>
