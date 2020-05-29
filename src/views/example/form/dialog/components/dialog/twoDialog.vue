<template>
  <admin-dialog
    :title="textMap[dialogStatus]"
    width="426px"
    :visible="dialogForm.visible"
    :cancel="cancel"
  >
    <div v-loading="loading">
      <el-row v-if="dialogStatus === 'details'">
        <table class="table-border center fixed detail">
          <colgroup>
            <col width="30%">
            <col width="70%">
          </colgroup>
          <tr>
            <th class="admin-text-right">企业类型：</th>
            <td class="admin-text-left">处置企业</td>
          </tr>
          <tr>
            <th class="admin-text-right">公司名称：</th>
            <td class="admin-text-left">{{ temp.disposeOrganizationName }}</td>
          </tr>
          <tr>
            <th class="admin-text-right">企业简称：</th>
            <td class="admin-text-left">{{ temp.briefName }}</td>
          </tr>
          <tr>
            <th class="admin-text-right">手机号：</th>
            <td class="admin-text-left">{{ temp.mobile }}</td>
          </tr>
          <tr>
            <th class="admin-text-right">联系人：</th>
            <td class="admin-text-left">{{ temp.contacts }}</td>
          </tr>
          <tr>
            <th class="admin-text-right">所在地区：</th>
            <td class="admin-text-left">{{ temp.orgLocationVO.areaName }}</td>
          </tr>
          <tr>
            <th class="admin-text-right">详细地址：</th>
            <td class="admin-text-left">{{ temp.orgLocationVO.address || temp.orgLocationVO.detailAddress }}</td>
          </tr>
        </table>
      </el-row>
      <el-form v-else ref="dataForm" :model="temp" label-position="right" label-width="120px">
        <el-form-item
          label="企业类型"
          prop="orgType"
          :rules="$rules({required:true,message:'请选择企业类型'})"
        >
          <el-radio-group v-model="temp.orgType">
            <el-radio :label="1">处置企业</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item
          label="公司名称"
          prop="disposeOrganizationName"
          :rules="$rules({required:true,message:'请填写公司名称',min:4, max:50})"
        >
          <el-input v-model.trim="temp.disposeOrganizationName" style="width: 260px;" placeholder="请填写公司名称" clearable />
        </el-form-item>

        <el-form-item
          label="企业简称"
          prop="briefName"
          :rules="$rules({required:true,message:'请填写企业简称',min:1, max:9})"
        >
          <el-input v-model.trim="temp.briefName" style="width: 260px;" placeholder="请填写企业简称" clearable />
        </el-form-item>

        <el-form-item
          label="手机号"
          prop="mobile"
          :rules="$rules({required:true,message:'请填写手机号',type:'mobile'})"
        >
          <el-input v-model.trim="temp.mobile" style="width: 260px;" placeholder="请填写手机号" clearable />
        </el-form-item>

        <el-form-item
          label="联系人"
          prop="contacts"
          :rules="$rules({required:true,message:'请填写联系人'})"
        >
          <el-input v-model.trim="temp.contacts" style="width: 260px;" placeholder="请填写联系人" clearable />
        </el-form-item>

        <el-form-item
          label="所在地区"
          prop="areaId"
          :rules="$rules({required:true,message:'请选择省市区'})"
        >
          <el-select v-model.trim="temp.areaId" style="width: 260px;" filterable remote :remote-method="areaOrganize" :loading="selectLoading" placeholder="省市区模糊查询" default-first-option clearable>
            <el-option v-for="item in options" :key="item.key" :label="item.label" :value="item.key" />
          </el-select>
        </el-form-item>

        <el-form-item
          label="详细地址"
          prop="address"
          :rules="$rules({required:true,message:'请填写详细地址'})"
        >
          <el-input v-model.trim="temp.address" style="width: 260px;" placeholder="请填写详细地址" clearable />
        </el-form-item>

      </el-form>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click.native="cancel">取消</el-button>
      <el-button v-if="dialogStatus==='create'" :loading="loading" type="primary" @click.native="create('dataForm')">确 定</el-button>
      <el-button v-else-if="dialogStatus==='update'" type="primary" :loading="loading" @click.native="update('dataForm')">更 新</el-button>
    </div>
  </admin-dialog>
</template>

<script>
import { cloneDeep } from 'lodash'
import util from '@/libs/util.js'
import elements from '@/mixins/elementsPermission'
import { getThirdAreaByName } from '@/api/common/area'
import { addObj, putObj, getObj } from '@/api/demo/api'

const defaultForm = {
  id: null,
  // 企业类型 0产废企业 1处置企业
  orgType: 1,
  // 企业状态 0启用 1 禁用
  status: 0,
  // 手机号
  mobile: '',
  // 公司名称
  disposeOrganizationName: '',
  // 企业简称
  briefName: '',
  // 联系人
  contacts: '',
  // 所在地区
  areaId: '',
  // 详细地址
  address: '',
  // 地址
  orgLocationVO: {
    detailAddress: ''
  }
}

export default {
  name: 'TwoDialog',
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
      // 地区
      options: [],
      selectLoading: false,
      // 接收数据
      data: this.dialogForm,
      dialogStatus: '',
      textMap: {
        update: '编辑企业信息',
        create: '新增企业信息',
        details: '查看企业信息'
      },
      // 页面绑定元素
      temp: cloneDeep(defaultForm)
    }
  },
  methods: {
    // 远程搜索区域
    areaOrganize(query) {
      if (query !== '') {
        this.selectLoading = true
        getThirdAreaByName({ spell: query }).then(response => {
          this.selectLoading = false
          this.options = response.data.map(item => {
            return { key: item.id, label: item.spell }
          })
        }).catch(() => {
          this.options = []
          this.selectLoading = false
        })
      } else {
        this.options = []
      }
    },
    // 取消
    cancel(done) {
      this.dialogForm.visible = false
      this.dialogStatus !== 'details' && this.$refs['dataForm'].resetFields()
      this.temp = cloneDeep(defaultForm)
      this.loading = false
    },
    // 新增数据
    create(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = true
          const temp = cloneDeep(this.temp)
          delete temp['id']
          delete temp['orgLocationVO']
          addObj(temp).then(() => {
            this.loading = false
            this.$emit('updateList')
            this.cancel()
            this.$notify({
              title: '成功',
              message: '新增成功',
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
    // 修改数据
    update(formName) {
      const set = this.$refs
      set[formName].validate(valid => {
        if (valid) {
          this.loading = true
          const temp = cloneDeep(this.temp)
          delete temp['orgLocationVO']
          putObj(temp).then(response => {
            this.loading = false
            this.$emit('updateList')
            this.cancel()
            this.$notify({
              title: '成功',
              message: '修改成功',
              type: 'success',
              duration: 2000
            })
          }).catch(() => {
            this.loading = false
          })
        } else {
          setTimeout(() => {
            this.$el.querySelector('.is-error').querySelector('input').focus()
          }, 200)
          return false
        }
      })
    },
    // 修改数据加载
    fetchData() {
      this.loading = true
      getObj({ guid: this.dialogForm.data }).then(response => {
        this.loading = false
        // const { id, mobile, contacts, organizationName, briefName, orgLocationVO = {}} = response.data
        // const orgLocation = orgLocationVO || {}
        Object.assign(this.temp, {
          id: 0,
          mobile: '19933332222',
          contacts: '联系人',
          briefName: '简称',
          disposeOrganizationName: '测试公司',
          areaId: 123,
          address: '详细地址',
          orgLocationVO: {}
        })
        this.options = [{ key: 123, label: '杭州市' }]
      }).catch(() => {
        this.loading = false
      })
    },
    // 初始数据
    init() {
      const type = Object.keys(this.textMap).find(t => (t === this.dialogForm.type)) || 'details'
      this.dialogStatus = type
      if (type === 'update' || type === 'details') {
        this.fetchData()
      } else {
        this.temp = cloneDeep(defaultForm)
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.detail {
  th {
    font-weight: 500;
  }
}
.table-border {
  td {
    overflow: inherit !important;
  }
}
</style>
