<template>
  <el-table
    :data="list"
    v-bind="table"
  >
    <el-table-column
      prop="title"
      align="center"
      width="160"
    />
    <el-table-column
      label="主题颜色"
      align="center"
      width="120"
    >
      <div
        slot-scope="scope"
        class="theme-preview"
        :style="{
          backgroundColor: `${scope.row.color}`
        }"
      />
    </el-table-column>
    <!--<el-table-column
      label="预览"
      width="120">
      <div
        slot-scope="scope"
        class="theme-preview"
        :style="{
          backgroundImage: `url(${$baseUrl}${scope.row.preview})`
        }">
      </div>
    </el-table-column>-->
    <el-table-column
      align="center"
    >
      <template slot-scope="scope">
        <el-button
          v-if="theme === scope.row.name"
          type="success"
          icon="el-icon-check"
          round
        >
          已激活
        </el-button>
        <el-button
          v-else
          round
          @click="handleSelectTheme(scope.row)"
        >
          使用
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'AdminThemeList',
  data() {
    return {
      table: {
        showHeader: false,
        border: true
      }
    }
  },
  computed: {
    ...mapState('admin/app', [
      'list',
      'theme'
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
// @import '~@/assets/styles/public.scss';
.theme-preview {
  height: 20px;
  width: 50px;
  margin: 0 auto;
  border-radius: 4px;
  background-size: cover;
  border: 1px solid $color-border-1;
}
</style>
