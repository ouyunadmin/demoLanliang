<template>
  <div>
    <el-popover
      ref="pop"
      placement="right"
      :title="icon"
      width="300"
      trigger="click"
    >
      <div class="icon-group">
        <i :class="'fa fa-' + icon" />
      </div>
      <el-row :gutter="10">
        <el-col :span="8">
          <el-tooltip effect="dark" :content="iconClass" placement="top">
            <el-button style="width: 100%;" @click="handleClipboard(iconClass,$event)">Class</el-button>
          </el-tooltip>
        </el-col>
        <el-col :span="8">
          <el-tooltip effect="dark" :content="iconHtml" placement="top">
            <el-button style="width: 100%;" @click="handleClipboard(iconHtml,$event)">HTML</el-button>
          </el-tooltip>
        </el-col>
        <el-col :span="8">
          <el-tooltip effect="dark" :content="iconComponent" placement="top">
            <el-button style="width: 100%;" @click="handleClipboard(iconComponent,$event)">组件</el-button>
          </el-tooltip>
        </el-col>
      </el-row>
    </el-popover>
    <span v-popover:pop>
      <el-tag type="info" class="icon-tag">
        <i :class="'fa fa-' + icon" />
      </el-tag>
      <span style="font-size: 10px;">{{ icon }}</span>
    </span>
  </div>
</template>

<script>
import clipboard from '@/plugin/clipboard'

export default {
  props: {
    icon: {
      type: String,
      required: false,
      default: ''
    }
  },
  computed: {
    iconClass() {
      return `fa fa-${this.icon}`
    },
    iconHtml() {
      return `<i class="fa fa-${this.icon}" aria-hidden="true"></i>`
    },
    iconComponent() {
      return `<admin-icon name="${this.icon}"/>`
    }
  },
  methods: {
    handleClipboard(text, event) {
      clipboard(text, event)
      this.$message({
        message: `${text} 复制到剪贴板`,
        type: 'success'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .icon-group {
    text-align: center;
    font-size: 200px;
  }
  .icon-tag {
    width: 32px;
    text-align: center;
    margin-right: 5px;
  }
</style>
