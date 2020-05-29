<template>
  <admin-container>
    <template slot="header">记录日志内容</template>
    <p class="admin-mt-0">在下方输入你要记录的日志，然后点击记录按钮</p>
    <el-input
      v-model="text"
      placeholder="日志内容"
      class="admin-mr-10"
      style="width: 200px;"
    />
    <el-button type="primary" @click="handleAdd">记录</el-button>
  </admin-container>
</template>

<script>
export default {
  name: 'ExampleLogLog',
  data() {
    return {
      text: 'Admin log info'
    }
  },
  methods: {
    handleAdd() {
      this.$logAdd(this.text)
    }
  }
}
</script>
