<template>
  <div class="admin-mb-10">
    <el-button-group>
      <el-button
        class="code-and-result--button"
        size="mini"
      >
        原值
      </el-button>
    </el-button-group>
    <admin-icon name="plus" class="code-and-result--icon" />
    <el-button-group>
      <el-button
        v-for="(labels, index) in labelList"
        :key="index"
        class="code-and-result--button"
        size="mini"
        type="primary"
        @click="handleClipboard(labels, $event)"
      >
        {{ labels }}
      </el-button>
    </el-button-group>
    <admin-icon name="arrow-right" class="code-and-result--icon" />
    <span class="code-and-result--value">{{ value }}</span>
  </div>
</template>

<script>
import clipboard from '@/plugin/clipboard'
export default {
  props: {
    label: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    }
  },
  computed: {
    labelList() {
      return this.label.split('|')
    }
  },
  methods: {
    handleClipboard(text, event) {
      clipboard(text, event)
    }
    /* handleClip(value) {
      clipboard.writeText(value)
      this.$notify({
        title: '成功',
        message: `${value} 已经复制到剪贴板`,
        type: 'success'
      })
    } */
  }
}
</script>

<style lang="scss" scoped>
.code-and-result--button {
  padding-left: 10px;
  padding-right: 10px;
}
.code-and-result--icon {
  color: $color-info;
  margin: 0px 20px;
}
.code-and-result--value {
  font-size: 14px;
  color: $color-text-main;
}
</style>
