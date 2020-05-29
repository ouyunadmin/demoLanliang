<template>
  <admin-container v-bind="$attrs">
    <iframe
      class="admin-container-frame"
      :src="src"
      frameborder="0"
    />
  </admin-container>
</template>

<script>
export default {
  name: 'AdminContainerFrame',
  props: {
    src: {
      type: String,
      required: false,
      default: 'https://www.baidu.com/'
    }
  }
}
</script>

<style lang="scss" scoped>
.admin-container-frame {
  position: absolute;
  top: 0px;
  left: 0px;
  height: 100%;
  width: 100%;
}
</style>
