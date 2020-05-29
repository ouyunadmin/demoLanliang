<template>
  <el-form ref="dataForm" class="el-form-item-no" :rules="rules" :model="temp" label-position="right" label-width="0">
    <div class="tableTitle">辅助信息</div>
    <el-row :gutter="0">
      <el-col :span="24">
        <el-form-item prop="remark" label="">
          <admin-tinymce ref="remark" v-model="temp.remark" :height="400" />
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import AdminTinymce from '@/components/admin-tinymce'

export default {
  name: 'EditorInfo',
  components: {
    AdminTinymce
  },
  props: {
    temp: {
      required: true,
      default: () => {},
      type: Object
    }
  },
  data() {
    return {
      isEdit: this.$attrs['is-edit'],
      rules: {}
    }
  },
  mounted() {
    this.$bus.on('bill-form-resetFields', this.resetFields)
  },
  beforeDestroy() {
    this.$bus.off('bill-form-resetFields', this.resetFields)
  },
  methods: {
    // 验证
    validate() {
      return new Promise((resolve, reject) => {
        this.$refs.dataForm.validate(valid => {
          if (valid) {
            resolve()
          } else {
            reject()
          }
        })
      })
    },
    // 重置
    resetFields() {
      this.$refs['dataForm'].resetFields()
    }
  }
}
</script>

