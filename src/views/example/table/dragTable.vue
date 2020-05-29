<template>
  <admin-container>
    <template slot="header">行拖拽 el-table</template>

    <el-table ref="dragTable" v-loading="listLoading" :data="gridList" row-key="id" border fit highlight-current-row style="width: 100%">

      <el-table-column align="center" label="ID" width="65">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="Date">
        <template slot-scope="scope">
          <span>{{ scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="300px" label="Title">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>

      <el-table-column width="110px" align="center" label="Author">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>

      <el-table-column width="100px" label="Importance">
        <template slot-scope="scope">
          <svg-icon v-for="n in +scope.row.importance" :key="n" icon-class="star" class="icon-star" />
        </template>
      </el-table-column>

      <el-table-column align="center" label="Readings" width="95">
        <template slot-scope="scope">
          <span>{{ scope.row.pageviews }}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="Status" width="110">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Drag" width="80">
        <template slot-scope="{}">
          <svg-icon class="drag-handler" icon-class="drag" />
        </template>
      </el-table-column>

    </el-table>
    <div class="show-d">默认顺序：&nbsp; {{ oldList }}</div>
    <div class="show-d">拖拽后顺序：{{ newList }}</div>

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
import { fetchList } from '@/api/demo/article'
import Sortable from 'sortablejs'

export default {
  name: 'TableDrag',
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  mixins: [
    elements,
    pagination
  ],
  data() {
    return {
      listLoading: true,
      listQuery: {
        // 关键字搜索
        title: ''
      },
      sortable: null,
      oldList: [],
      newList: []
    }
  },
  created() {
    this.handleFilter()
  },
  methods: {
    getList() {
      const listQuery = cloneDeep(this.listQuery)
      const httpParams = {
        ...listQuery,
        ...this.page
      }
      this.listLoading = true
      fetchList(httpParams)
        .then(response => {
          this.gridList = response.data.list
          this.total = response.data.total
          this.listLoading = false
          this.oldList = this.gridList.map(v => v.id)
          this.newList = this.oldList.slice()
          this.$nextTick(() => {
            this.setSort()
          })
        })
        .catch(() => {
          this.listLoading = false
        })
    },
    setSort() {
      const el = this.$refs.dragTable.$el.querySelectorAll('.el-table__body-wrapper > table > tbody')[0]
      this.sortable = Sortable.create(el, {
        ghostClass: 'sortable-ghost',
        setData: function(dataTransfer) {
          dataTransfer.setData('Text', '')
        },
        onEnd: evt => {
          const targetRow = this.gridList.splice(evt.oldIndex, 1)[0]
          this.gridList.splice(evt.newIndex, 0, targetRow)
          const tempIndex = this.newList.splice(evt.oldIndex, 1)[0]
          this.newList.splice(evt.newIndex, 0, tempIndex)
        }
      })
    }
  }
}
</script>

<style>
.sortable-ghost{
  opacity: .8;
  color: #fff!important;
  background: #42b983!important;
}
</style>

<style scoped>
.icon-star{
  margin-right:2px;
}
.drag-handler{
  width: 20px;
  height: 20px;
  cursor: pointer;
}
.show-d{
  margin-top: 15px;
}
</style>
