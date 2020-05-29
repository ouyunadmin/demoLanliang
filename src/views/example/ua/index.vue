<template>
  <admin-container>
    <p class="admin-mt-0">useragent</p>
    <el-input :value="uaData.ua" />
    <p>格式化数据 in vuex: state.admin.ua.data</p>
    <admin-highlight :code="uaStr" />
  </admin-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'ExampleUa',
  computed: {
    ...mapState('admin/ua', {
      uaData: 'data'
    }),
    uaStr() {
      const { browser, engine, os, device, cpu } = this.uaData
      return JSON.stringify({ browser, engine, os, device, cpu }, null, 2)
    }
  }
}
</script>
