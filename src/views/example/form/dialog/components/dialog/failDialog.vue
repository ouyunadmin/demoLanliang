<template>
  <admin-dialog
    title="审核不通过"
    width="400px"
    :visible="dialogForm.visible"
    :cancel="cancel"
  >
    <el-form ref="dataForm" :model="temp" label-position="top" label-width="100px">
      <el-form-item label="请填写不通过原因" prop="refuseReason" :rules="$rules({required:true,message:'请填写不通过原因',min:2, max:100})">
        <el-input
          v-model.trim="temp.refuseReason"
          type="textarea"
          resize="none"
          :rows="3"
          maxlength="100"
          placeholder="最多100字"
        />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click.native="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click.native="create('dataForm')">确 定</el-button>
    </div>
  </admin-dialog>
</template>

<script>
import elements from '@/mixins/elementsPermission'
import util from '@/libs/util.js'
import { updateStatusRefusedById } from '@/api/contract/contract'

const defaultForm = {
  id: null,
  refuseReason: ''
}

export default {
  name: 'FailDialog',
  mixins: [
    elements
  ],
  props: {
    dialogForm: {
      required: true,
      default: () => {},
      type: Object
    }
  },
  data() {
    return {
      loading: false,
      // 接收数据
      data: this.dialogForm.data,
      // 页面绑定元素
      temp: JSON.parse(JSON.stringify(defaultForm))
    }
  },
  methods: {
    // 取消
    cancel(done) {
      this.dialogForm.visible = false
      this.$refs['dataForm'].resetFields()
      this.temp = JSON.parse(JSON.stringify(defaultForm))
      this.loading = false
    },
    // 新增数据
    create(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = true
          const temp = JSON.parse(JSON.stringify(this.temp))
          temp.id = this.dialogForm.data
          updateStatusRefusedById(temp).then(() => {
            this.loading = false
            this.$emit('updateList')
            this.cancel()
            this.$notify({
              title: '成功',
              message: '处理成功',
              type: 'success',
              duration: 2000
            })
          }).catch(() => {
            this.loading = false
          })
        } else {
          util.formElementsFocus({
            vm: this
          })
          return false
        }
      })
    },
    // 获取详情
    getDetail() {
    }
  }
}
</script>
