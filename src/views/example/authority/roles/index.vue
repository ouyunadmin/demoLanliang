<template>
  <admin-container class="grid-table">
    <div class="grid-body" flex="dir:top">
      <!-- <el-row>
        <el-col :span="24">
          <el-button-group>
            <el-button type="primary" icon="plus" @click="handlerAdd">添加</el-button>
            <el-button type="primary" :disabled="!currentId" icon="edit" @click="handlerEdit">编辑</el-button>
            <el-button type="primary" :disabled="!currentId" @click="handlerAuthority">权限分配</el-button>
          </el-button-group>
        </el-col>
        <el-col :span="8" style='margin-top:15px;'>
          <el-card class="box-card">
          <el-tree class="filter-tree" :data="treeData" node-key="id" highlight-current :props="defaultProps" :filter-node-method="filterNode" ref="groupTree" @node-click="getNodeData" default-expand-all> </el-tree>
          </el-card>
        </el-col>
        <el-col :span="16" style='margin-top:15px;'>
          <el-form label-width="80px" :model="form" ref="form" :rules="rules">
            <el-form-item label="名称" prop="name">
              <el-input v-model="form.name" :disabled="formEdit"></el-input>
            </el-form-item>
            <el-form-item label="编码" prop="code">
              <el-input v-model="form.code" :disabled="formEdit"></el-input>
            </el-form-item>
            <el-form-item v-if="formStatus == 'update'">
              <el-button type="primary" @click="update('form')">更新</el-button>
              <el-button @click="onCancel">取消</el-button>
            </el-form-item>
            <el-form-item v-if="formStatus == 'create'">
              <el-button type="primary" @click="create('form')">保存</el-button>
              <el-button @click="onCancel">取消</el-button>
            </el-form-item>
          </el-form>
        </el-col>

        <power-dialog ref="powerDialog" :is-role="true" :is-list="rowList" :is-id="rowId" :is-active="powerDialogVisible" @toggleClick="powerDialogToggle"></power-dialog>
      </el-row> -->
      <div flex-box="0" class="form-search bg">
        <el-form ref="form" :inline="true" :model="listQuery" size="mini">
          <el-form-item label="角色名称" prop="name">
            <el-input v-model.trim="listQuery.name" class="keyword" placeholder="角色名称模糊查询" clearable @keyup.enter.native="handleFilter" />
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="handleFilter">搜索</el-button>
          </el-form-item>
        </el-form>
      </div>

      <div flex-box="0" class="button-operation admin-mt-10">
        <el-button type="primary" class="white" plain size="mini" @click="handleAdd">新增</el-button>
        <el-button type="primary" :disabled="detailDisabled" class="white" plain size="mini" @click="handleEdit">编辑</el-button>
        <el-button type="primary" class="white" :disabled="detailDisabled" plain size="mini" @click="powerBth">分配权限</el-button>
        <!-- <el-button @click="handleCancel" :disabled="cancelDisabled" type="primary" class="white" plain size="mini">删除</el-button> -->
        <el-button type="primary" class="white export" plain size="mini" @click="onBthExport">导出</el-button>
      </div>

      <div flex-box="1" class="grid-list">
        <my-ag-grid ref="testGrid" :loading="loading" :options="gridOptions" :is-list="gridList" @gridClickFnc="gridClickFnc" @onRowSelected="onRowSelected" />
      </div>
    </div>
    <admin-pagination slot="footer" class="footer-page" :page="page.page" :limit="page.limit" :total="total" @change="handlePaginationChange" />
    <!-- </admin-container> -->
    <power-dialog ref="powerDialog" :is-role="true" :is-list="{'name': rowList.name}" :is-id="rowId" :is-active="powerDialogVisible" @toggleClick="powerDialogToggle" />
    <role-dialog ref="dialog" :is-list="rowList" :is-role="roleListTemp" :is-edit="isEdit" :is-active="dialogVisible" @updateList="getList" @toggleClick="dialogToggle" />
  </admin-container>
</template>
<script>
// import { fetchTree, getObj, addObj, delObj, putObj } from 'api/admin/group/index'
// import { getUserType } from 'api/admin/user/index'
// import { getAllGroup } from '@/api/system/index'
import pagination from '@/mixins/pagination'
// import util from '@/libs/util'
// import util from '@/plugin/utils'
import { cloneDeep } from 'lodash'
// import { addRole, updateRole } from '@/api/demo/authority'

import { testList } from '@/api/demo/api'
// import { GetDateStr } from '@/plugin/utils'
const defaultForm = {
  name: '',
  code: '',
  parentId: '-1',
  type: '1'
}
export default {
  name: 'SysRoles',
  components: {
    'role-dialog': () => import('../components/RoleDialog'),
    'power-dialog': () => import('../components/PowerDialog')
  },
  mixins: [
    // elements,
    pagination
  ],
  data() {
    const _that = this
    return {
      // defaultProps: {
      //   children: 'children',
      //   label: 'name'
      // },
      // treeData: [],
      form: JSON.parse(JSON.stringify(defaultForm)),
      // rules: {
      //   name: [
      //     { required: true, message: '请输入名称', trigger: 'blur' }
      //   ]
      // },
      // formEdit: true,
      // formStatus: '',
      // dialogAuthorityVisible: false,
      // dialogUserVisible: false,
      currentId: '',
      currentType: '',
      dialogUserName: '',
      powerDialogVisible: false,
      rowId: null,
      rowList: {},
      roleListTemp: [],
      dialogVisible: false,
      isEdit: false,
      listQuery: {
        name: ''
      },
      loading: false,
      gridOptions: {
        // 表头名（必填）
        tableName: '单据列表',
        // 列表设置显示
        setting: true,
        // 配制增加列
        gridCfg: [
          {
            'headerName': '',
            'suppressSorting': true,
            'suppressMenu': true,
            'suppressMovable': true,
            'width': 30,
            'pinned': 'left',
            'suppressResize': true,
            'suppressFilter': true,
            'checkboxSelection': true,
            'headerCheckboxSelection': true
          }
        ],
        // 补充配制
        optionsFnc(gridOptions) {
          // 选择 multiple-多选 single-单选
          gridOptions.rowSelection = 'multiple'
        },
        // 双击
        gridDbClickFnc() {
          _that.gridDbClickFnc()
        },
        // 自己定义单元格内容支持input，图片，链接-gridClickFnc 单击事件
        typeGrid: {
          type: {
            type: 'url'
          },
          image_uri: {
            type: 'image'
          },
          // 过滤html标签
          html: {
            type: 'title'
          },
          pageviews: {
            type: 'input',
            // 数字，小数点
            precision: 0
          }
        }
      }
    }
  },
  computed: {
    // 取消按钮过滤
    cancelDisabled() {
      return !(this.selectRowData.length === 1)
    },
    // 详情按钮过滤
    detailDisabled() {
      return !(this.selectRowData.length === 1)
    },
    // 编辑按钮过滤
    editDisabled() {
      return !(this.selectRowData.length === 1)
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    // 状态切换
    handleTableName(val) {
      const { code = 0 } = this.stateList.find(t => (t.code === parseInt(val))) || {}
      this.listQuery.status = code
      setTimeout(() => {
        this.handleFilter()
      }, 100)
    },
    // 表格双击详情
    gridDbClickFnc() {
      this.handleDetails()
    },
    // 链接单击事件
    gridClickFnc(res) {
      /*
       * res.field 点击的列名, 多列链接区分
       * 自定义事件
       */
      console.log(res.field)
    },
    // 详情
    handleDetails() {
    },
    // 新增
    handleCreate() {
      this.$router.push({ 'name': 'FormAdd' })
    },
    // 更新
    handleUpdate() {
    },
    // 删除
    handleDelete() {
    },
    // 启用
    handleOn() {
    },
    // 禁用
    handleOff() {
    },
    //  获取接口列表
    getList() {
      const listQuery = cloneDeep(this.listQuery)
      if (listQuery['dataNo']) {
        listQuery.gmtOrderBegin = listQuery.dataNo[0] + ' 00:00:00'
        listQuery.gmtOrderEnd = listQuery.dataNo[1] + ' 23:59:59'
      }
      const httpParams = {
        ...listQuery,
        ...this.page
      }
      this.loading = true
      testList(httpParams)
        .then(response => {
          this.loading = false
          this.selectRowData = []
          this.gridList = response.data.list
          this.total = response.data.total
        })
        .catch(() => {
          this.loading = false
        })
    },
    // 行选择或取消选择
    onRowSelected(row) {
      this.selectRowData = row
      if (this.selectRowData.length > 0) {
        this.rowList = this.selectRowData[0]
      }
      // console.log(util.getParamValues)
      // this.rowId = util.getParamValues('id', row).join()
    },
    // filterNode(value, data) {
    //   if (!value) return true
    //   return data.label.indexOf(value) !== -1
    // },
    // getNodeData(data) {
    //   if (!this.formEdit) {
    //     this.formStatus = 'update'
    //   }
    //   if (data.name === '管理员' && this.formStatus === 'update') {
    //     this.$message.error('管理员不能编辑')
    //     return false
    //   }
    //   this.currentId = data.id
    //   this.currentType = data.type
    //   this.form = {
    //     name: data.name,
    //     code: data.code,
    //     parentId: data.parentId,
    //     type: data.type
    //   }
    // },
    // 添加修改
    handleAdd() {
      this.dialogVisible = true
      this.isEdit = false
      this.$nextTick(() => (this.$refs.dialog.resetFields()))
    },
    // 修改
    handleEdit() {
      this.dialogVisible = true
      this.isEdit = true
      this.$nextTick(() => (this.$refs.dialog.resetFields()))
    },
    // update(formName) {
    //   const set = this.$refs
    //   set[formName].validate(valid => {
    //     if (valid) {
    //       updateRole({ ...this.form, id: this.currentId }).then(() => {
    //         this.getList()
    //         this.formInit()
    //         this.$message.success('修改成功')
    //       })
    //     }
    //   })
    // },
    // create(formName) {
    //   const set = this.$refs
    //   set[formName].validate(valid => {
    //     if (valid) {
    //       addRole(this.form).then((res) => {
    //         if (res.status !== 200) return
    //         this.getList()
    //         this.formInit()
    //         this.$message.success('角色添加成功')
    //       })
    //     }
    //   })
    // },
    // onCancel() {
    //   this.formEdit = true
    //   this.formStatus = ''
    // },
    // formInit() {
    //   this.resetForm()
    //   this.formEdit = true
    //   this.formStatus = ''
    //   this.currentId = ''
    // },
    // resetForm() {
    //   this.form = JSON.parse(JSON.stringify(defaultForm))
    // },
    // 添加修改
    addBth() {
      this.dialogVisible = true
      this.isEdit = false
      this.$nextTick(() => (this.$refs.dialog.resetFields()))
    },
    // 修改
    editBth() {
      this.dialogVisible = true
      this.isEdit = true
      this.$nextTick(() => (this.$refs.dialog.resetFields()))
    },
    // 关闭dialog
    dialogToggle() {
      this.dialogVisible = false
    },
    // 展示菜单权限
    powerBth() {
      this.powerDialogVisible = true
      this.$nextTick(() => (this.$refs.powerDialog.roleFields()))
    },
    powerDialogToggle() {
      this.powerDialogVisible = false
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.el-input--medium{
  max-width: 200px;
}
</style>

