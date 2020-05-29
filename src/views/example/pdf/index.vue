<template>
  <admin-container>
    <template slot="header">PDF 预览</template>

    <div v-loading="loading" class="admin-mb">
      <pdf
        :src="src"
        :page="page"
        @num-pages="total=$event"
        @page-loaded="page=$event"
        @loaded="loadPdfHandler"
      />
    </div>

    <div slot="footer" class="footer-page">
      <el-pagination
        :current-page="page"
        :page-size="limit"
        :total="total"
        background
        layout="total, prev, pager, next, jumper"
        style="margin: -10px 0;"
        @current-change="handleCurrentChange"
      />
    </div>
  </admin-container>
</template>

<script>
import { mapActions } from 'vuex'
import pdf from 'vue-pdf'
import elements from '@/mixins/elementsPermission'

export default {
  name: 'PdfIndex',
  components: {
    pdf
    // pdf: () => import('vue-pdf')
  },
  mixins: [
    elements
  ],
  data() {
    this.loadingTask = ''
    return {
      loading: false,
      // http://storage.xuetangx.com/public_assets/xuetangx/PDF/PlayerAPI_v1.0.6.pdf
      url: `${this.$baseUrl}/pdf/specifications.pdf`,
      total: 0, // pdf文件总页数
      page: 0, // pdf文件页码
      limit: 1,
      fileType: 'pdf', // 文件类型
      src: '' // pdf文件地址
    }
  },
  created() {
    this.loadingTask = pdf.createLoadingTask(`${this.$baseUrl}/pdf/test.pdf`)
  },
  mounted() {
    this.loading = true
    this.loadingTask
      .then(pdf => {
        this.loading = false
        this.src = this.loadingTask
        this.total = pdf.numPages
      })
      .catch(() => {
        this.loading = false
      })
  },
  methods: {
    ...mapActions('admin/page', [
      'close'
    ]),
    handleCurrentChange(val) {
      this.page = val
    },
    loadPdfHandler() {
      this.page = 1 // 加载的时候先加载第一页
    }
  }
}
</script>

<style>
</style>
