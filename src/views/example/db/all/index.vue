<template>
  <admin-container>
    <template slot="header">
      <el-alert
        type="success"
        :closable="false"
        title="这个页面展示的是全部数据的存储结构，包括系统区域和存储区域，涵盖所有用户，也就是整个 Admin 的数据存储结构"
      />
    </template>
    <admin-highlight :code="dbData" />
    <template slot="footer">
      <el-button type="primary" @click="load">
        重新获取本地数据
      </el-button>
    </template>
  </admin-container>
</template>

<script>
import util from '@/libs/util'

export default {
  name: 'ExampleDbAll',
  data() {
    return {
      dbData: ''
    }
  },
  mounted() {
    this.load()
  },
  methods: {
    load() {
      this.dbData = JSON.stringify(util.db.value(), null, 2)
    }
  }
}
</script>
