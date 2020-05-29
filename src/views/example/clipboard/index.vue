<template>
  <admin-container>
    <template slot="header">复制组件</template>
    <el-tabs v-model="activeName">
      <el-tab-pane label="直接复制" name="directly">
        <el-input v-model="inputData" placeholder="Please input" style="width:400px;" />
        <el-button v-waves type="primary" icon="document" @click="handleCopy(inputData,$event)">copy</el-button>
      </el-tab-pane>
      <el-tab-pane label="指令复制" name="v-directive">
        <el-input v-model="inputData" placeholder="Please input" style="width:400px;" />
        <el-button v-waves v-clipboard:copy="inputData" v-clipboard:success="clipboardSuccess" type="primary" icon="document">copy</el-button>
      </el-tab-pane>
    </el-tabs>
  </admin-container>
</template>

<script>
import clip from '@/plugin/clipboard'

export default {
  name: 'ExampleClipboard',
  data() {
    return {
      activeName: 'directly',
      inputData: '测试'
    }
  },
  methods: {
    handleCopy(text, event) {
      clip(text, event)
    },
    clipboardSuccess() {
      this.$message({
        message: '复制成功',
        type: 'success',
        duration: 1500
      })
    }
  }
}
</script>

