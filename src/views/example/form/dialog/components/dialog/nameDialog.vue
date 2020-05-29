<template>
  <admin-dialog
    :title="textMap[dialogStatus]"
    width="500px"
    :visible="dialogForm.visible"
    :cancel="cancel"
  >
    <el-form ref="dataForm" v-loading="loading" :rules="rules" :model="temp" label-position="right" label-width="0">

      <el-row class="admin-mt-10">
        <el-col :span="12">固废类别：&nbsp; {{ temp.trashType }}</el-col>
        <el-col :span="12">固废代码：&nbsp; {{ temp.trashCode }}</el-col>
      </el-row>

      <el-form-item label="" prop="selected" class="admin-mt-20">
        <el-checkbox-group
          v-model="temp.selected"
        >
          <el-checkbox v-for="(item,index) in options" :key="index" :label="item">{{ item }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click.native="cancel">取 消</el-button>
      <el-button type="primary" :loading="loading" @click.native="update('dataForm')">保 存</el-button>
    </div>
  </admin-dialog>
</template>

<script>
import elements from '@/mixins/elementsPermission'
import { cloneDeep } from 'lodash'
import { getObj } from '@/api/demo/api'

const defaultForm = {
  trashType: '',
  trashCode: '',
  selected: []
  // selectedName: []
}

export default {
  name: 'NameDialog',
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
      options: [],
      loading: false,
      // 接收数据
      data: this.dialogForm,
      dialogStatus: '',
      textMap: {
        update: '固废名称选择'
      },
      // 页面绑定元素
      temp: cloneDeep(defaultForm),
      rules: {
        selected: [
          { type: 'array', required: false, message: '请选择固废名称', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    // 取消
    cancel(done) {
      this.dialogForm.visible = false
      // this.$refs['dataForm'].resetFields()
      // this.temp = cloneDeep(defaultForm)
      this.loading = false
    },
    // 修改数据
    update(formName) {
      const set = this.$refs
      set[formName].validate(valid => {
        if (valid) {
          const temp = cloneDeep(this.temp)
          /* temp.selectedName = temp.selected.map(res => {
            return this.options.find(t => (t.key === res))
          }) */
          this.$emit('updateList', temp, this.dialogForm.index)
          this.cancel()
          /* this.$notify({
            title: '成功',
            message: '保存成功',
            type: 'success',
            duration: 2000
          }) */
        } else {
          setTimeout(() => {
            const form = this.$el.querySelector('.is-error')
            form.querySelector('input') ? form.querySelector('input').focus() : ''
            form.querySelector('textarea') ? form.querySelector('textarea').focus() : ''
          }, 200)
          return false
        }
      })
    },
    // 初始数据
    init() {
      this.loading = true
      this.dialogStatus = 'update'
      const res = cloneDeep(this.dialogForm.data)
      Object.assign(this.temp, res)
      getObj({ trashCode: this.temp.trashCode, disposeOrgId: this.dialogForm.disposeOrgId })
        .then(response => {
          this.loading = false
          this.$nextTick(() => {
            this.$refs['dataForm'].clearValidate()
          })
          /* this.options = response.data.map(res => {
            return res.trashName
          }) */
          this.options = ['类型一', '类型二', '类型三']
        })
        .catch(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.setting-dialog {
  .el-checkbox+.el-checkbox {
    margin-left: 0px;
  }
  .el-checkbox-group .el-checkbox {
    float: left;
    margin-right: 15px;
  }
}
</style>
