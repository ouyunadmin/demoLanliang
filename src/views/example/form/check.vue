<template>
  <admin-container
    top-visible
  >
    <template slot="header">
      <div>全局表单验证方法</div>
    </template>
    <el-form ref="dataForm" :model="temp" label-position="right" label-width="150px">
      <table class="table-border">
        <tr>
          <th class="admin-text-left title"><svg-icon icon-class="list" /> 基本资料</th>
        </tr>
        <tr>
          <td>
            <div style="max-width: 800px; margin: 20px auto 0;">
              <el-form-item
                label="企业类型"
                prop="organizationType"
                :rules="$rules({required:true,message:'请选择企业类型'})"
              >
                <el-radio-group v-model="temp.organizationType">
                  <el-radio :label="0">事业单位</el-radio>
                </el-radio-group>
              </el-form-item>

              <el-form-item
                label="手机号"
                prop="mobile"
                :rules="$rules({required:true,message:'请填写手机号',type:'mobile'})"
              >
                <el-input v-model.trim="temp.mobile" style="width: 200px;" placeholder="请填写手机号" clearable />
              </el-form-item>

              <el-form-item
                label="公司名称"
                prop="organizationName"
                :rules="$rules({required:true,message:'请填写公司名称',min:4, max:50})"
              >
                <el-input v-model.trim="temp.organizationName" style="width: 200px;" placeholder="请填写公司名称" clearable />
              </el-form-item>

              <el-form-item
                label="联系人"
                prop="contacts"
                :rules="$rules({required:true,message:'请填写联系人'})"
              >
                <el-input v-model.trim="temp.contacts" style="width: 200px;" placeholder="请填写联系人" clearable />
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

              <el-form-item
                label="营业执照"
                prop="licenceUrls"
                :rules="$rules({required:true,message:'请上传营业执照',type:'array'})"
              >
                <admin-upload ref="licenceUrls" v-model="temp.licenceUrls" class="upload-mini" :limit="10" />
              </el-form-item>

              <el-form-item label="常用环评固废代码" required>
                <el-button :loading="loading" type="primary" @click.native="handleCreateItem">添加</el-button>
                <div v-for="(item,index) in temp.wasteCodes" :key="item.index" class="admin-mt-5" style="width: 450px;">
                  <el-row :gutter="10" style="margin: 0px;">
                    <el-col :span="12">
                      <el-form-item
                        label-width="0px"
                        :show-message="false"
                        label=""
                        :prop="'wasteCodes.'+index+'.wasteCodeType'"
                        :rules="$rules({required:true,message:'请选择常用环评固废类别'})"
                      >
                        <el-select v-model.trim="item.wasteCodeType" style="width: 100%;" filterable default-first-option clearable @change="wasteCodeTypeOnChange($event,index)">
                          <el-option v-for="items in codeOptions" :key="items.trashType" :label="items.trashType + items.trashName" :value="item.trashType" />
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item
                        label-width="0px"
                        :show-message="false"
                        label=""
                        :prop="'wasteCodes.'+index+'.wasteCode'"
                        :rules="$rules({required:true,message:'请选择常用环评固废代码'})"
                      >
                        <el-select v-model.trim="item.wasteCode" filterable default-first-option clearable>
                          <el-option v-for="items in item.options" :key="items" :label="items" :value="items" />
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="4">
                      <el-popover
                        v-if="index > 0"
                        v-model="item.visible"
                        placement="top"
                      >
                        <p style="padding: 5px 0px 10px; margin: 0;">确认删除?</p>
                        <div style="text-align: right; margin: 0">
                          <el-button size="mini" type="text" @click="cancelItem(item)">取消</el-button>
                          <el-button v-loadClick type="primary" size="mini" @click="deleteItem(index)">确定</el-button>
                        </div>
                        <span slot="reference" class="link-type">删除</span>
                        <!--<span class="el-icon-delete" slot="reference"></span>-->
                      </el-popover>
                    </el-col>
                  </el-row>
                </div>
              </el-form-item>

              <el-form-item
                label="环评固废代码凭证"
                prop="wasteCodeUrls"
                :rules="$rules({required:true,message:'请上传环评固废代码凭证',type:'array'})"
              >
                <admin-upload ref="wasteCodeUrls" v-model="temp.wasteCodeUrls" class="upload-mini" :limit="10" />
              </el-form-item>

              <el-form-item
                label="新密码"
                prop="password"
                :rules="$rules({required:true,message:'新密码不能为空',type:'pass',pass:temp.rePassword,fnc:checkPass})"
              >
                <el-input v-model.trim="temp.password" style="width: 200px;" placeholder="请填写新密码" clearable @clear="$refs['dataForm'].validateField('rePassword')" />
              </el-form-item>

              <el-form-item
                label="确认密码"
                prop="rePassword"
                :rules="$rules({required:true,message:'确认密码不能为空',type:'check-pass',pass:temp.password})"
              >
                <el-input v-model.trim="temp.rePassword" style="width: 200px;" placeholder="请填写确认密码" clearable />
              </el-form-item>

              <el-form-item label="账户启用状态" prop="accountStatus">
                <el-switch
                  v-model="temp.accountStatus"
                  :active-value="0"
                  :inactive-value="1"
                />
              </el-form-item>

            </div>
          </td>
        </tr>
      </table>

    </el-form>

    <template slot="footer">
      <div class="admin-text-center">
        <el-button :loading="loading" type="primary" @click.native="handleCreate">提交</el-button>
      </div>
    </template>
    <!--<el-tooltip effect="dark" content="返回顶端" placement="top">
      <admin-to-top :custom-style="myBackToTopStyle" :visibility-height="50" :back-position="0" transition-name="fade"/>
    </el-tooltip>-->
  </admin-container>
</template>

<script>
import { mapActions } from 'vuex'
import elements from '@/mixins/elementsPermission'
import util from '@/libs/util.js'
import { uniqueId, cloneDeep } from 'lodash'
import { delegateNewRegist } from '@/api/user/enterprises'
import { getThirdAreaByName } from '@/api/common/area'
// import { getTrashTypeList, getTrashCodeListByTrashType } from '@/api/common/code'

const defaultForm = {
  // 企业类型
  organizationType: 0,
  // 手机号
  mobile: '',
  // 公司名称
  organizationName: '',
  // 联系人
  contacts: '',
  // 所在地区
  areaId: '',
  // 详细地址
  address: '',
  // 营业执照
  licenceUrls: [],
  // 常用环评固废代码
  wasteCodes: [],
  // 环评固废代码凭证
  wasteCodeUrls: [],
  // 新密码
  password: '',
  // 确认密码
  rePassword: '',
  // 账户启用状态
  accountStatus: 0
}

export default {
  name: 'FormCheck',
  mixins: [
    elements
  ],
  data() {
    return {
      loading: false,
      // 固废类别
      codeOptions: [
        { trashType: 'HW01', trashName: '医疗废物', options: [], index: uniqueId() },
        { trashType: 'HW02', trashName: '农药废物', options: [], index: uniqueId() },
        { trashType: 'HW03', trashName: '有机树脂类废物', options: [], index: uniqueId() }
      ],
      // 地区
      options: [],
      selectLoading: false,
      // 页面绑定元素
      temp: cloneDeep(defaultForm),
      myBackToTopStyle: {
        right: '50px',
        bottom: '50px',
        width: '40px',
        height: '40px',
        'border-radius': '4px',
        'line-height': '45px', // 请保持与高度一致以垂直居中 Please keep consistent with height to center vertically
        background: '#e7eaf1'// 按钮的背景颜色 The background color of the button
      }
    }
  },
  mounted() {
    // this.getDetail()
    this.handleCreateItem()
  },
  methods: {
    ...mapActions('admin/page', [
      'close'
    ]),
    /* getDetail() {
      this.loading = true
      getTrashTypeList()
        .then(response => {
          this.loading = false
          this.codeOptions = response.data
          this.handleCreateItem()
        })
        .catch(() => {
          this.loading = false
        })
    }, */
    // 验证确认密码
    checkPass() {
      this.$refs['dataForm'].validateField('rePassword')
    },
    // 常用环评固废代码
    cancelItem(row) {
      row.visible = !row.visible
    },
    deleteItem(index) {
      this.temp.wasteCodes.splice(index, 1)
    },
    handleCreateItem() {
      this.temp.wasteCodes.push({ wasteCodeType: '', wasteCode: '', options: [], index: uniqueId() })
    },
    // 固废类型
    wasteCodeTypeOnChange(val, index) {
      this.temp.wasteCodes[index].wasteCode = ''
      // this.temp.wasteCodes[index].options = []
      this.temp.wasteCodes[index].options = [
        '271-001-02',
        '271-003-02',
        '272-005-02'
      ]
      /* val && getTrashCodeListByTrashType({ trashType: val })
        .then(response => {
          // console.log(response.data)
          this.temp.wasteCodes[index].options = response.data.map(res => {
            return res.trashCode
          })
        }) */
    },
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
    // 创建
    handleCreate() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          this.$confirm('提交企业资料, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(() => {
            if (!this.$refs['licenceUrls'].checkAllSuccess()) {
              this.$message('请稍等，营业执照图片正在上传！')
              return
            }
            if (!this.$refs['wasteCodeUrls'].checkAllSuccess()) {
              this.$message('请稍等，环评固废代码凭证图片正在上传！')
              return
            }
            this.httpPost()
          }).catch(() => {
          })
        } else {
          util.formElementsFocus({
            vm: this
          })
          return false
        }
      })
    },
    httpPost() {
      this.loading = true
      const temp = cloneDeep(this.temp)
      delete this.temp['areaName']
      // 营业执照
      temp.licenceUrls = this.temp.licenceUrls.map(res => {
        return res.url
      })
      // 环评固废代码凭证
      temp.wasteCodeUrls = this.temp.wasteCodeUrls.map(res => {
        return res.url
      })
      // 常用环评固废代码
      temp.wasteCodes = this.temp.wasteCodes.map(item => {
        return { wasteCodeType: item.wasteCodeType, wasteCode: item.wasteCode }
      })
      delegateNewRegist(temp)
        .then(() => {
          this.loading = false
          this.$notify({
            title: '成功',
            message: '新增成功',
            type: 'success'
          })
          // this.$refs['dataForm'].resetFields()
          this.temp = cloneDeep(defaultForm)
          this.close({
            tagName: this.$route.name,
            to: { name: 'example-form-common' }
          })
            .then(res => {
              if (res !== -1) {
                setTimeout(() => {
                  // 跳到指定页面，执行页面方法，父节点可能不同
                  this.$parent.$parent.$refs.routerview.getList()
                }, 500)
              }
            })
        })
        .catch(() => {
          this.loading = false
        })
    }
  }
}
</script>
