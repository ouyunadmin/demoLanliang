<template>
  <admin-dialog
    title="读取历史"
    width="900px"
    :visible="dialogForm.visible"
    :handle-drag="handleDrag"
    :cancel="cancel"
  >
    <div class="form-search bg">
      <el-form
        ref="form"
        :inline="true"
        :model="listQuery"
        size="mini"
      >

        <el-form-item label="" prop="dataNo">
          <el-date-picker
            ref="dataNo"
            v-model="listQuery.dataNo"
            type="daterange"
            value-format="yyyy-MM-dd"
            :editable="false"
            style="width: 220px;"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>

        <el-form-item label="" prop="keyWords">
          <el-input
            ref="keyWords"
            v-model.trim="listQuery.keyWords"
            placeholder="可输入发货人/发货电话/收货人/收货电话/货品名称"
            clearable
            @keyup.enter.native="handleFilter"
          />
        </el-form-item>

        <el-form-item>
          <el-button
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

    <el-table
      ref="singleTable"
      :data="gridList"
      highlight-current-row
      height="200"
      border
      style="width: 100%"
      @current-change="handleCurrentChange"
      @row-click="selectsRow"
      @row-dblclick="submit"
    >
      <el-table-column
        label="操作"
        width="50"
      >
        <template slot-scope="scope">
          <el-radio v-model="currentRow" :label="scope.$index" />
        </template>
      </el-table-column>
      <el-table-column
        property="title"
        label="托运单号"
        width="120"
      />
      <el-table-column
        property="id"
        label="发货人"
        width="120"
      />
      <el-table-column
        property="id"
        label="发货人电话"
      />
      <el-table-column
        property="id"
        label="收货人"
      />
      <el-table-column
        property="id"
        label="收货人电话"
      />
      <el-table-column
        property="id"
        label="货品名称"
      />
      <el-table-column
        property="id"
        label="创建时间"
        width="120"
      />
    </el-table>
    <div class="footer-page dialog-page admin-clearfix">
      <admin-pagination
        slot="footer"
        :page="page.page"
        :limit="page.limit"
        :total="total"
        @change="handlePaginationChange"
      />
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click.native="cancel">取消</el-button>
      <el-button type="primary" :loading="loading" @click="submit">确认</el-button>
    </div>
  </admin-dialog>
</template>

<script>
import { listMessageMailSend } from '@/api/demo/message'
import elements from '@/mixins/elementsPermission'
import pagination from '@/mixins/pagination'

export default {
  name: 'HistoryDialog',
  mixins: [
    elements,
    pagination
  ],
  props: {
    dialogForm: {
      required: true,
      default: () => {},
      type: Object
    }
  },
  data() {
    return {
      loading: false,
      // 接收数据
      data: this.dialogForm.data,
      listQuery: {
        dataNo: [],
        keyWords: ''
      },
      selectRow: '',
      currentRow: null
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    // dialog拖动时事件
    handleDrag() {
      this.$refs.dataNo.blur()
      this.$refs.keyWords.focus()
    },
    // 取消
    cancel(done) {
      this.dialogForm.visible = false
      this.selectRow = ''
      this.currentRow = null
    },
    // 确定
    submit() {
      if (this.selectRow) {
        this.$emit('updateData', this.selectRow)
        this.$nextTick(() => (
          this.cancel()
        ))
      } else {
        this.$message.error('请选择一条记录！')
        return
      }
    },
    // 选中行数据
    selectsRow(row) {
      this.selectRow = row
    },
    // redio 选中事件
    handleCurrentChange(val) {
      this.currentRow = this.gridList.indexOf(val)
    },
    // 获取表格数据
    getList() {
      const httpParams = {
        title: this.listQuery.keyWords,
        pageNum: this.page.page,
        pageSize: this.page.limit
      }
      if (this.listQuery.dataNo) {
        if (this.listQuery.dataNo.length) {
          httpParams.gmtOrderBegin = this.listQuery.dataNo[0] + ' 00:00:00'
          httpParams.gmtOrderEnd = this.listQuery.dataNo[1] + ' 23:59:59'
        }
      }
      listMessageMailSend(httpParams).then(response => {
        this.gridList = response.data.list
        this.total = response.data.total
      })
    }
  }
}
</script>
