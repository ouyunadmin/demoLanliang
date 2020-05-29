<template>
  <div class="admin-container-body-full" flex="dir:top">
    <div flex-box="0" class="form-search bg">
      <el-form
        v-if="form.direction !== 'left'"
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
      <div v-else style="height: 28px;" />
    </div>

    <div flex-box="1" class="grid-list">
      <my-ag-grid ref="testGrid" :loading="loading" :options="gridOptions" :is-list="gridList" @gridClickFnc="gridClickFnc" @onRowSelected="onRowSelected" />
    </div>

  </div>
</template>

<script>
import { testList } from '@/api/demo/api'
import elements from '@/mixins/elementsPermission'
import { includes, map, cloneDeep } from 'lodash'

export default {
  name: 'ExampleFormTreeListLeft',
  mixins: [
    elements
  ],
  props: {
    form: {
      required: true,
      default: () => {},
      type: Object
    }
  },
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
      tempList: [],
      gridList: [],
      // gird设置
      gridOptions: {
        // 表头名（必填）
        tableName: '单据列表',
        // 列表设置显示
        setting: false,
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
          // 过滤html标签
          html: {
            type: 'title'
          },
          image_uri: {
            type: 'image'
          }
        }
      }
    }
  },
  mounted() {
    this.getList()
    this.$bus.on('tree-form-list', this.getData)
  },
  beforeDestroy() {
    this.$bus.off('tree-form-list', this.getData)
  },
  methods: {
    getData(res) {
    },
    // 导出
    onBthExport() {
      this.$refs.testGrid.onBthExport()
    },
    // 表格双击详情
    gridDbClickFnc() {
      this.$emit('submit')
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
    },
    // 详情
    handleDetails() {
    },
    // 更新
    handleUpdate() {
    },
    // 行选择或取消选择
    onRowSelected(val) {
      this.form.tempLeftSelectRow = val
    },
    //  获取接口列表
    getList() {
      const listQuery = cloneDeep(this.listQuery)
      if (listQuery['dataNo']) {
        listQuery.gmtOrderBegin = listQuery.dataNo[0] + ' 00:00:00'
        listQuery.gmtOrderEnd = listQuery.dataNo[1] + ' 23:59:59'
      }
      const httpParams = {
        ...listQuery
      }
      this.loading = true
      testList(httpParams)
        .then(response => {
          this.loading = false
          this.total = response.data.total
          this.tempList = response.data.list
          this.getDataList()
        })
        .catch(() => {
          this.loading = false
        })
    },
    // 数据处理
    getDataList() {
      const rightId = map(this.form.selectRightData, 'id')
      // 过滤右边数据
      this.gridList = this.tempList.filter((o) => {
        return !includes(rightId, o.id)
      })
      this.form.selectLeftData = this.gridList
    },
    // 重置搜索条件
    handleFormReset() {
      this.$refs.form.resetFields()
    },
    // 查询
    handleFilter() {
      this.getList()
    }
  }
}
</script>
