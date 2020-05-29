<template>
  <el-dialog :title="title" width="490px" class="settingDialog" :visible.sync="isActive" :before-close="dialogClose">
    <div class="signTablePadding">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" label-width="100px">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model.trim="temp.name" placeholder="请填写角色名称" />
        </el-form-item>
        <!-- <el-form-item label="角色编码" prop="code">
          <el-input v-model.trim="temp.code" placeholder="请填写角色编码"></el-input>
        </el-form-item> -->
        <el-form-item label="角色描述">
          <el-input
            v-model.trim="temp.description"
            type="textarea"
            :rows="2"
            resize="none"
            placeholder=""
          />
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click.native="dialogClose">取消</el-button>
      <el-button type="primary" :loading="loading" @click.native="submitForm">保存</el-button>
    </div>
  </el-dialog>
</template>

<script>
// import { insertGroup, update } from '@/api/system'
import { addRole, updateRole } from '@/api/demo/authority'

const defaultForm = {
  // code: '', // 角色code
  name: '', // 角色名称
  parentId: '-1', // 角色父id
  description: '', // 角色描述
  type: 1 // 1 平台级,2 商户级
}

export default {
  name: 'RoleDialog',
  props: {
    isActive: {
      type: Boolean,
      default: false
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    isId: {
      type: String,
      default: ''
    },
    isRole: {
      type: Array,
      default: () => ([])
    },
    isList: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      temp: JSON.parse(JSON.stringify(defaultForm)),
      loading: false,
      title: '新增角色',
      rules: {
        groupType: [{ required: true, message: '请选择角色类型', trigger: 'change' }],
        name: [{ required: true, message: '请填写角色名称', trigger: 'blur' }]
      }
    }
  },
  methods: {
    fetchData() {
      // this.temp = JSON.parse(JSON.stringify(this.isList))
      this.temp = JSON.parse(JSON.stringify(defaultForm))
    },
    dialogClose(done) {
      this.$refs['dataForm'].resetFields()
      this.temp = JSON.parse(JSON.stringify(defaultForm))
      this.$emit('toggleClick', false)
    },
    // 新增数据
    addData() {
      const temp = JSON.parse(JSON.stringify(this.temp))
      console.debug()
      console.log(temp)
      addRole(temp).then(response => {
        this.loading = false
        this.dialogClose()
        this.$emit('updateList', false)
      }).catch(() => {
        this.loading = false
      })
    },
    // 修改数据
    editData() {
      const temp = JSON.parse(JSON.stringify(this.temp))
      updateRole(temp).then(response => {
        this.loading = false
        this.dialogClose()
        this.$emit('updateList', false)
      }).catch(() => {
        this.loading = false
      })
    },
    // 提交数据
    submitForm() {
      this.$refs.dataForm.validate(valid => {
        if (valid) {
          this.loading = true
          if (this.isEdit) {
            this.editData()
          } else {
            this.addData()
          }
        } else {
          return false
        }
      })
    },
    resetFields() {
      if (this.isEdit) {
        this.title = '编辑角色'
        this.fetchData()
      } else {
        this.title = '新增角色'
        this.temp = JSON.parse(JSON.stringify(defaultForm))
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.signTablePadding {
	padding: 3px 0;
}
</style>
