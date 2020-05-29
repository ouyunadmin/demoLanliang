<template>
  <admin-container>
    <template slot="header">主题</template>

    <el-table :data="list" v-bind="table">
      <el-table-column label="主题名称" prop="title" align="center" width="260" />
      <el-table-column
        label="Element主题色"
        align="center"
        width="150"
      >
        <div
          slot-scope="scope"
          class="theme-preview"
          :style="{
            backgroundColor: `${scope.row.color}`
          }"
        />
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button v-if="theme === scope.row.name" type="success" icon="el-icon-check" round>已激活</el-button>
          <el-button v-else round @click="handleSelectTheme(scope.row)">使用</el-button>
        </template>
      </el-table-column>
    </el-table>

    <template slot="footer">
      <el-button type="primary" size="small">当前激活主题：{{ activeSetting.title }}</el-button>
    </template>
  </admin-container>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'ThemeIndex',
  data() {
    return {
      table: {
        showHeader: true,
        border: true
      }
    }
  },
  computed: {
    ...mapState('admin/app', [
      'list',
      'theme'
    ]),
    ...mapGetters('admin/app', [
      'activeSetting'
    ])
  },
  methods: {
    ...mapActions('admin/app', [
      'themeSet'
    ]),
    ...mapActions('admin/color', [
      'set'
    ]),
    handleSelectTheme(res) {
      this.themeSet(res.name)
      this.set(res.color)
    }
  }
}
</script>

<style lang="scss" scoped>
.theme-preview {
  height: 20px;
  width: 50px;
  margin: 0 auto;
  border-radius: 4px;
  background-size: cover;
  border: 1px solid $color-border-1;
}
</style>
