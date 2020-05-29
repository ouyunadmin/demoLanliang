<template>
  <admin-container>
    <template slot="header">图标组件</template>
    <admin-icon class="admin-mr-10" />
    <admin-icon name="github" class="admin-mr-10" />
    <admin-icon name="github" style="font-size: 100px;" class="admin-mr-10" />
    <admin-icon name="github" class="icon-demo" />
  </admin-container>
</template>

<script>
import elements from '@/mixins/elementsPermission'

export default {
  name: 'IconIcon',
  mixins: [
    elements
  ]
}
</script>

<style lang="scss" scoped>
  .icon-demo {
    transition: all .3s;
    font-size: 100px;
    color: #409EFF;
    @extend %unable-select;
    &:hover{
      color: #F56C6C;
      transform: scale(1.2) rotate(30deg);
    }
  }
</style>
