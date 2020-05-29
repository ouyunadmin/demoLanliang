<template>
  <admin-container>
    <template slot="header">代码高亮组件</template>
    <el-card shadow="never" class="admin-mb">
      <p slot="title">javascript</p>
      <admin-highlight :code="codeJavascript" />
    </el-card>
    <el-card shadow="never" class="admin-mb">
      <p slot="title">css</p>
      <admin-highlight :code="codeCSS" />
    </el-card>
    <el-card shadow="never" class="admin-mb">
      <p slot="title">scss</p>
      <admin-highlight :code="codeSCSS" />
    </el-card>
    <el-card shadow="never">
      <p slot="title">html</p>
      <admin-highlight :code="codeHTML" />
    </el-card>
  </admin-container>
</template>

<script>
import codeJavascript from './code/javascript'
import codeCSS from './code/css'
import codeSCSS from './code/scss'
import codeHTML from './code/html'
export default {
  name: 'ExampleHighlight',
  data() {
    return {
      codeJavascript,
      codeCSS,
      codeSCSS,
      codeHTML
    }
  }
}
</script>
