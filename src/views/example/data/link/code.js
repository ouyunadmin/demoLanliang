const base = `<template>
  <el-col :span="12">
    <el-row class="mb-20">
      <el-link href="https://element.eleme.io" target="_blank">默认链接</el-link>
      <el-link type="primary" disabled>主要链接</el-link>
      <el-link type="success">成功链接</el-link>
      <el-link type="warning">警告链接</el-link>
      <el-link type="danger">危险链接</el-link>
      <el-link type="info">信息链接</el-link>
    </el-row>
    <el-row class="mb-20">
      <el-link href="https://element.eleme.io" target="_blank" disabled>默认链接</el-link>
      <el-link type="primary" disabled>主要链接</el-link>
      <el-link type="success" disabled>成功链接</el-link>
      <el-link type="warning" disabled>警告链接</el-link>
      <el-link type="danger" disabled>危险链接</el-link>
      <el-link type="info" disabled>信息链接</el-link>
    </el-row>
    <el-row class="mb-20">
      <el-link :underline="true">默认链接</el-link>
      <el-link type="primary" :underline="false">主要链接</el-link>
      <el-link type="success" :underline="false">成功链接</el-link>
      <el-link type="warning" :underline="false">警告链接</el-link>
      <el-link type="danger">危险链接</el-link>
      <el-link type="info">信息链接</el-link>
    </el-row>
    <el-row class="mb-20">
      <el-link icon="el-icon-edit">编辑</el-link>
      <el-link>查看<i class="el-icon-view el-icon--right"></i> </el-link>
    </el-row>
  </el-col>
</template>`

export default {
  base
}
