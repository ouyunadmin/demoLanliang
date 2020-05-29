<template>
  <el-form ref="dataForm" class="el-form-item-no" :rules="rules" :model="temp" label-position="right" label-width="85px">
    <div class="tableTitle" style="margin-top: 0;">基本信息</div>
    <el-row :gutter="20">
      <el-col :span="4">
        <el-form-item prop="gmtOrder" label="制单日期">
          <el-date-picker ref="gmtOrder" v-model="temp.gmtOrder" :disabled="isEdit" type="date" placeholder="选择日期" value-format="yyyy-MM-dd hh:ss" style="width: 100%;" />
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item prop="consignNo" label="托运单号">
          <el-input v-model="temp.consignNo" />
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item prop="consignGoodsNo" label="货号">
          <el-input v-model="temp.consignGoodsNo" />
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item prop="consignGoodsNo" label="货号">
          <input-cleave v-model="temp.consignGoodsNo" />
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
export default {
  name: 'BaseInfo',
  props: {
    temp: {
      required: true,
      default: () => {},
      type: Object
    }
  },
  /* computed: {
      temp: {
        get() {
          return this.form
        },
        set(val) {
          this.$emit(this.form, val)
        }
      }
    }, */
  data() {
    return {
      isEdit: this.$attrs['is-edit'],
      rules: {
        consignNo: [{ required: true, message: '请填写托运单号', trigger: 'blur' }],
        consignGoodsNo: [{ required: true, message: '请填写托运单号', trigger: 'blur' }]
      }
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
        this.$refs.dataForm.validate()
          .then(() => {
            resolve()
          })
          .catch(() => {
            reject()
          })
          /* this.$refs.dataForm.validate(valid => {
            if (valid) {
              resolve()
            } else {
              reject()
            }
          }) */
      })
    },
    // 重置
    resetFields() {
      this.$refs['dataForm'].resetFields()
    }
  }
}
</script>

