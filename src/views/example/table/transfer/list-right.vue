<template>
  <div class="admin-container-body-full" flex="dir:top">
    <div flex-box="0" class="form-search bg">
      <div style="height: 28px;" />
    </div>

    <div flex-box="1" class="grid-list">
      <my-ag-grid ref="testGrid" :options="gridOptions" :is-list="gridList" @gridClickFnc="gridClickFnc" @onRowSelected="onRowSelected" />
    </div>

  </div>
</template>

<script>
import elements from '@/mixins/elementsPermission'

export default {
  name: 'ExampleFormTreeListRight',
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
      loading: false,
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
  mounted() {
    this.getList()
    // this.$bus.on('tree-form-right-list', this.getList)
  },
  beforeDestroy() {
    // this.$bus.off('tree-form-right-list', this.getList)
  },
  methods: {
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
      this.form.tempRightSelectRow = val
    },
    //  获取接口列表
    getList() {
      // 初始化，优化显示
      setTimeout(() => {
        this.gridList = this.form.selectRightData
      }, 200)
    }
  }
}
</script>
