<template>
  <admin-container>
    <template slot="header">导入 xlsx</template>

    <div class="admin-mb">
      <el-button @click="download">
        <admin-icon name="download" />
        下载演示 .xlsx 表格
      </el-button>
    </div>
    <div class="admin-mb">
      <upload-excel :on-success="handleSuccess" :before-upload="beforeUpload" />
    </div>
    <el-table v-bind="table">
      <el-table-column
        v-for="(item, index) in table.columns"
        :key="index"
        :prop="item.prop"
        :label="item.label"
      />
    </el-table>

    <admin-pagination
      slot="footer"
      class="footer-page"
      :page="page.page"
      :limit="page.limit"
      :page-sizes="[50, 100, 200]"
      :total="total"
      @change="handlePaginationChange"
    />
  </admin-container>
</template>

<script>
import UploadExcel from './components/upload-excel.vue'

export default {
  name: 'ImportExcel',
  components: {
    UploadExcel
  },
  data() {
    return {
      gridList: [],
      loading: false,
      total: 0,
      page: {
        page: 1,
        limit: 100
      },
      table: {
        columns: [],
        data: [],
        size: 'mini',
        stripe: true,
        border: true
      }
    }
  },
  methods: {
    // 分页
    handlePaginationChange(val) {
      this.page = val
      // nextTick 只是为了优化示例中 notify 的显示
      this.$nextTick(() => {
        this.handleFilter()
      })
    },
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 10
      if (isLt1M) {
        return true
      }
      this.$message({
        message: '上传文件大小超过1M',
        type: 'warning'
      })
      return false
    },
    handleSuccess({ results, header }) {
      this.table.columns = header.map(e => {
        return {
          label: e,
          prop: e
        }
      })
      this.gridList = results
      this.total = this.gridList.length
      this.handleFilter()
      // this.table.data = results
    },
    handleFilter() {
      const { limit, page } = this.page
      this.table.data = this.gridList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
    },
    download() {
      this.$open(`${this.$baseUrl}/price_template.xlsx`)
    }
  }
}
</script>
