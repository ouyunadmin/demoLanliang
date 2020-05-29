<template>
  <admin-container>
    <template slot="header">行编辑 el-table</template>

    <el-table ref="agtable" v-loading="listLoading" :data="gridList" border fit highlight-current-row style="width: 100%" @select="selectChange" @select-all="selectChange">
      <el-table-column type="selection" align="center" width="55" />

      <el-table-column align="center" label="ID" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="Date">
        <template slot-scope="scope">
          <span>{{ scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" align="center" label="Author">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>

      <el-table-column width="100px" label="Importance">
        <template slot-scope="scope">
          <svg-icon v-for="n in +scope.row.importance" :key="n" icon-class="star" class="meta-item__icon" />
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="Status" width="110">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="Model" width="110">
        <template slot-scope="scope">
          <boolean-control
            :value="scope.row.model"
            @change="(val) => {
              handleSwitchChange(val, scope.$index)
            }"
          >
            <admin-icon
              slot="active"
              name="check-circle"
              style="font-size: 20px; line-height: 32px; color: #67C23A;"
            />
            <admin-icon
              slot="inactive"
              name="times-circle"
              style="font-size: 20px; line-height: 32px; color: #F56C6C;"
            />
          </boolean-control>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="Model" width="110">
        <template slot-scope="scope">
          <boolean-control-mini
            :value="scope.row.model"
            @change="(val) => {
              handleSwitchChange(val, scope.$index)
            }"
          >
            <admin-icon
              slot="active"
              name="check-circle"
              style="font-size: 20px; line-height: 32px; color: #67C23A;"
            />
            <admin-icon
              slot="inactive"
              name="times-circle"
              style="font-size: 20px; line-height: 32px; color: #F56C6C;"
            />
          </boolean-control-mini>
        </template>
      </el-table-column>

      <el-table-column min-width="300px" label="Title">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input v-model="scope.row.title" class="edit-input" size="small" />
            <el-button class="cancel-btn" size="small" icon="el-icon-refresh" type="warning" @click="cancelEdit(scope.row)">cancel</el-button>
          </template>
          <span v-else>{{ scope.row.title }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Actions" width="120">
        <template slot-scope="scope">
          <el-button v-if="scope.row.edit" type="success" size="small" icon="el-icon-circle-check-outline" @click="confirmEdit(scope.row)">Ok</el-button>
          <el-button v-else type="primary" size="small" icon="el-icon-edit" @click="scope.row.edit=!scope.row.edit">Edit</el-button>
        </template>
      </el-table-column>

    </el-table>

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
import { cloneDeep, includes, concat, difference } from 'lodash'
import elements from '@/mixins/elementsPermission'
import pagination from '@/mixins/pagination'
import BooleanControl from './components/BooleanControl'
import BooleanControlMini from './components/BooleanControlMini'
import { fetchList } from '@/api/demo/article'

export default {
  name: 'TableEdit',
  components: {
    BooleanControl,
    BooleanControlMini
  },
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
      list: [100, 102, 103],
      list2: [],
      listQuery: {
        // 关键字搜索
        title: ''
      }
    }
  },
  created() {
    this.handleFilter()
  },
  methods: {
    selectChange(val) {
      // table选择值
      const $id = val.map(res => {
        return res.id
      })
      // table所有值
      const $allId = this.gridList.map(res => {
        return res.id
      })
      // 过滤选择的值
      /* remove($allId, item => {
        return includes($id, item)
      })
      // 合并,去重,过滤数据
      this.list = difference(uniq(concat(this.list, $id)), $allId) */
      this.list = concat(difference(this.list, $allId), $id)
      // 过滤数据
      // this.list = difference(this.list, $allId)
      console.log(this.list)
    },
    handleSwitchChange(val, index) {
      const oldValue = this.gridList[index]
      this.$set(this.gridList, index, {
        ...oldValue,
        model: val
      })
      // 注意 这里并没有把修改后的数据传递出去 如果需要的话请自行修改
    },
    getList() {
      const listQuery = cloneDeep(this.listQuery)
      const httpParams = {
        ...listQuery,
        ...this.page
      }
      this.listLoading = true
      fetchList(httpParams)
        .then(response => {
          const items = response.data.list
          this.gridList = items.map(v => {
            this.$set(v, 'edit', false)
            v.originalTitle = v.title
            return v
          })
          this.total = response.data.total
          this.listLoading = false
          // table行选中状态
          this.$nextTick(() => {
            this.gridList.forEach(res => {
              if (includes(this.list, res.id)) {
                this.$refs.agtable.toggleRowSelection(res, true)
              }
            })
          })
        })
        .catch(() => {
          this.listLoading = false
        })
    },
    cancelEdit(row) {
      row.title = row.originalTitle
      row.edit = false
      this.$message({
        message: '取消编辑成功',
        type: 'warning'
      })
    },
    confirmEdit(row) {
      row.edit = false
      row.originalTitle = row.title
      this.$message({
        message: '标题编辑成功',
        type: 'success'
      })
    }
  }
}
</script>

<style scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
