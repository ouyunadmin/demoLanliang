<template>
  <el-dialog
    v-el-drag-dialog
    :title="title"
    :width="width"
    :fullscreen="fullscreen"
    :append-to-body="true"
    :modal-append-to-body="true"
    :class="[{'setting-dialog': true}, dialogCss]"
    :top="top"
    v-bind="$attrs"
    :visible.sync="visible"
    :before-close="cancel"
    v-on="$listeners"
    @dragDialog="handleDrag"
  >
    <slot />
    <slot v-if="$slots.footer" slot="footer" name="footer" />
  </el-dialog>
</template>

<script>
export default {
  name: 'AdminDialog',
  props: {
    title: {
      type: String,
      default: '提示'
    },
    top: {
      type: String,
      default: '15vh'
    },
    // 设置class
    dialogCss: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: '500px'
    },
    fullscreen: {
      type: Boolean,
      default: false
    },
    visible: {
      type: Boolean,
      required: true,
      default: false
    },
    cancel: {
      type: Function,
      required: false,
      default: () => {}
    },
    handleDrag: {
      type: Function,
      required: false,
      default: () => {}
    }
  }
}
</script>
