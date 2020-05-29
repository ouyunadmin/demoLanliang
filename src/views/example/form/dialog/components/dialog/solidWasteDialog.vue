<template>
  <admin-dialog
    :title="textMap[dialogStatus]"
    width="400px"
    :visible="dialogForm.visible"
    :cancel="cancel"
  >
    <el-form ref="dataForm" v-loading="loading" :model="temp" label-position="right" label-width="100px">
      <el-form-item label="固废类别" prop="trashType" :rules="$rules({required:true,message:'请选择固废类别'})">
        <el-select
          v-model="temp.trashType"
          placeholder="请选择固废类别"
          filterable
          default-first-option
          @change="trashTypeOnChange"
        >
          <el-option v-for="(item,index) in typeOptions" :key="index" :label="item" :value="item" />
        </el-select>
      </el-form-item>

      <el-form-item label="固废代码" prop="trashCode" :rules="$rules({required:true,message:'请选择固废代码'})">
        <el-select
          v-model="temp.trashCode"
          placeholder="请选择固废代码"
          filterable
          default-first-option
          @change="trashCodeOnChange"
        >
          <el-option v-for="(item,index) in codeOptions" :key="index" :label="item.trashCode" :value="item.trashCode" />
        </el-select>
      </el-form-item>

      <el-form-item label="申请量" prop="applyNum" :rules="$rules({required:true,message:'请填写申请量'})">
        <input-cleave
          v-model.number="temp.applyNum"
          :is-decimal="2"
          is-placeholder="请填写申请量"
        />
        <span class="layout">吨</span>
      </el-form-item>

      <!--<el-form-item label="单价" prop="test4">
        <input-cleave v-model.number="temp.test4" :isDecimal="2" is-placeholder="请填写单价"></input-cleave>
      </el-form-item>-->
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click.native="cancel">取消</el-button>
      <el-button v-if="dialogStatus=='create'" :loading="loading" type="primary" @click.native="create('dataForm')">确 定</el-button>
      <el-button v-else type="primary" :loading="loading" @click.native="update('dataForm')">更 新</el-button>
    </div>
  </admin-dialog>
</template>

<script>
import elements from '@/mixins/elementsPermission'
import util from '@/libs/util.js'
import { cloneDeep, uniq } from 'lodash'
import { getObj } from '@/api/demo/api'

const defaultForm = {
  trashType: '',
  trashCode: '',
  applyNum: '',
  // 单价
  price: '',
  // 选中值
  selected: []
}

export default {
  name: 'SolidWasteDialog',
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
      // 固废类别
      typeOptions: [],
      // 固废代码
      codeOptions: [],
      loading: false,
      // 接收数据
      data: this.dialogForm,
      dialogStatus: '',
      textMap: {
        update: '编辑申请清单',
        create: '新增申请清单'
      },
      // 页面绑定元素
      temp: cloneDeep(defaultForm)
    }
  },
  methods: {
    // 取消
    cancel(done) {
      this.dialogForm.visible = false
      this.$refs['dataForm'].resetFields()
      this.temp = cloneDeep(defaultForm)
      this.loading = false
    },
    // 新增数据
    create(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const temp = cloneDeep(this.temp)
          this.$emit('updateList', temp, this.dialogStatus)
          this.cancel()
        } else {
          util.formElementsFocus({
            vm: this
          })
          return false
        }
      })
    },
    // 修改数据
    update(formName) {
      const set = this.$refs
      set[formName].validate(valid => {
        if (valid) {
          const temp = cloneDeep(this.temp)
          this.$emit('updateList', temp, this.dialogStatus, this.dialogForm.index)
          this.cancel()
        } else {
          util.formElementsFocus({
            vm: this
          })
          return false
        }
      })
    },
    // 固废代码 单击
    trashCodeOnChange(val) {
      const { price = '' } = this.codeOptions.find(t => (t.trashCode === val))
      this.temp.price = price
    },
    // 固废类别 单击
    trashTypeOnChange() {
      this.temp.trashCode = ''
      this.temp.price = ''
      this.fetchData()
    },
    // 修改数据加载
    fetchData() {
      getObj({ trashType: this.temp.trashType, disposeOrgId: this.dialogForm.disposeOrgId })
        .then(response => {
          this.loading = false
          /* this.codeOptions = response.data.map(res => {
            return { trashCode: res.trashCode, price: res.price }
          }) */
          this.codeOptions = [
            { trashCode: '900-405-06', price: 200 },
            { trashCode: '900-406-06', price: 300 }
          ]
        })
        .catch(() => {
          this.loading = false
        })
    },
    // 初始数据
    init() {
      const type = Object.keys(this.textMap).find(t => (t === this.dialogForm.type)) || 'create'
      this.dialogStatus = type
      // 异步数据
      const codeType = () => new Promise((resolve, reject) => {
        getObj({ disposeOrgId: this.dialogForm.disposeOrgId })
          .then(response => {
            resolve()
            /* const list = response.data.map(res => {
              return res.trashType
            }) */
            const list = ['HW06', 'HW07', 'HW08']
            // 去重
            this.typeOptions = uniq(list)
          })
          .catch(() => {
            reject()
          })
      })
      this.loading = true
      Promise.all([codeType()])
        .then(res => {
          if (type === 'update') {
            Object.assign(this.temp, this.dialogForm.data)
            this.fetchData()
          } else {
            this.loading = false
            this.temp = cloneDeep(defaultForm)
          }
        })
        .catch(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.layout {
  position: absolute;
  right: 10px;
  top: 0;
}
</style>
