<template>
  <admin-container>
    <template slot="header">SVG图标</template>
    <div class="icons-container">
      <div class="icons-wrapper">
        <div v-for="icon of $IconSvg" :key="icon" @click="handleClipboard(generateIconCode(icon),$event)">
          <el-tooltip placement="top">
            <div slot="content">
              {{ generateIconCode(icon) }}
            </div>
            <div class="icon-item">
              <svg-icon :icon-class="icon" class-name="disabled" />
              <span>{{ icon }}</span>
            </div>
          </el-tooltip>
        </div>
      </div>
    </div>
  </admin-container>
</template>

<script>
import clipboard from '@/plugin/clipboard'
import elements from '@/mixins/elementsPermission'

export default {
  name: 'IconSvg',
  mixins: [
    elements
  ],
  methods: {
    generateIconCode(symbol) {
      return `<svg-icon icon-class="${symbol}" />`
    },
    handleClipboard(text, event) {
      clipboard(text, event)
    }
  }
}
</script>

<style lang="scss" scoped>
  .icons-container {
    margin: 10px 20px 0;
    overflow: hidden;
    .icons-wrapper {
      margin: 0 auto;
    }
    .icon-item {
      margin: 20px;
      height: 110px;
      text-align: center;
      width: 110px;
      float: left;
      font-size: 30px;
      color: #24292e;
      @extend %unable-select;
    }
    span {
      display: block;
      font-size: 24px;
      margin-top: 10px;
    }
    .disabled{
      pointer-events: none;
    }
  }
</style>
