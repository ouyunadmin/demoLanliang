<template>
  <el-popover
    :placement="popoverPlacement"
    :title="popoverTitle"
    :width="popoverWidth"
    trigger="hover"
  >
    <el-switch
      v-model="currentValue"
      :active-color="activeColor"
      :inactive-color="inactiveColor"
      :active-text="activeText"
      :inactive-text="inactiveText"
      :disabled="disabled"
      @change="handleChange"
    />
    <span slot="reference">
      <slot v-if="value" name="active" />
      <slot v-else name="inactive" />
    </span>
  </el-popover>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    popoverPlacement: {
      type: String,
      default: 'left'
    },
    popoverTitle: {
      type: String,
      default: '修改'
    },
    popoverWidth: {
      type: String,
      default: '150'
    },
    activeColor: {
      type: String,
      default: '#67C23A'
    },
    inactiveColor: {
      type: String,
      default: '#F56C6C'
    },
    activeText: {
      type: String,
      default: '正常'
    },
    inactiveText: {
      type: String,
      default: '禁用'
    }
  },
  data() {
    return {
      currentValue: false,
      disabled: false
    }
  },
  watch: {
    value: {
      handler(val) {
        this.currentValue = val
      },
      immediate: true
    }
  },
  methods: {
    handleChange(val) {
      this.disabled = true
      this.$message({
        message: '正在发送请求',
        type: 'info'
      })
      // 请将 setTimeout 修改为您的异步请求
      setTimeout(() => {
        this.disabled = false
        this.$message({
          message: '修改成功',
          type: 'success'
        })
        this.$emit('change', val)
        // 如果修改失败的话需要在这里手动将 currentValue 复原
      }, 1000)
    }
  }
}
</script>
