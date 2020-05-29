<template>
  <admin-container class="grid-table">
    <div class="app-container calendar-list-container">
      <div class="filter-container">
        <el-button-group>
          <el-button v-if="menuManager_btn_add" type="primary" icon="plus" @click="handlerAdd">添加</el-button>
          <el-button v-if="menuManager_btn_edit" type="primary" :disabled="currentId=='-1'" icon="edit" @click="handlerEdit">编辑</el-button>
          <el-button v-if="menuManager_btn_del" type="primary" :disabled="currentId=='-1'" icon="delete" @click="handleDelete">删除</el-button>
        </el-button-group>
      </div>

      <el-row :gutter="20">
        <el-col :span="6" style="margin-top:15px;">
          <el-card class="box-card">
            <el-input
              v-model="filterText"
              placeholder="输入关键字进行过滤"
            />
            <el-tree
              ref="menuTree"
              class="filter-tree"
              :data="treeData"
              node-key="id"
              highlight-current
              :props="defaultProps"
              :filter-node-method="filterNode"
              default-expand-all
              @node-click="getNodeData"
            />
          </el-card>
        </el-col>
        <el-col v-loading="loading" :span="18" style="margin-top:15px;">
          <el-card class="box-card">
            <el-form ref="form" class="half-form" :label-position="labelPosition" label-width="80px" :model="form" :rules="rules">
              <el-form-item label="路径编码" prop="code">
                <el-input v-model="form.code" :disabled="formEdit" placeholder="请输入路径编码" />
              </el-form-item>
              <el-form-item label="标题" prop="title">
                <el-input v-model="form.title" :disabled="formEdit" placeholder="请输入标题" />
              </el-form-item>
              <el-form-item label="父级节点" prop="parentId">
                <el-input v-model="form.parentId" :disabled="true" placeholder="请输入父级节点" readonly />
              </el-form-item>
              <el-form-item label="图标" prop="icon">
                <el-input v-model="form.icon" :disabled="formEdit" placeholder="请输入图标" />
              </el-form-item>
              <el-form-item label="资源路径" prop="href">
                <el-input v-model="form.href" :disabled="formEdit" placeholder="请输入资源路径" />
              </el-form-item>
              <el-form-item label="菜单类型" prop="type">
                <el-select v-model="form.type" class="filter-item" :disabled="formEdit" placeholder="请输入菜单类型">
                  <el-option v-for="item in typeOptions" :key="item" :label="item" :value="item" />
                </el-select>
              </el-form-item>
              <el-form-item label="归属平台" prop="belong">
                <el-select v-model="form.belong" class="filter-item" :disabled="true" placeholder="请选择归属平台">
                  <el-option v-for="item in belongOptions" :key="item.id" :label="item.name" :value="item.id" />
                </el-select>
              </el-form-item>
              <el-form-item label="描述" prop="description">
                <el-input v-model="form.description" :disabled="formEdit" placeholder="请输入描述" />
              </el-form-item>
              <el-form-item v-if="formStatus == 'update'" class="button-item">
                <el-button type="primary" @click="update('form')">更新</el-button>
                <el-button @click="onCancel('form')">取消</el-button>
              </el-form-item>
              <el-form-item v-if="formStatus == 'create'" class="button-item">
                <el-button type="primary" @click="create('form')">保存</el-button>
                <el-button @click="onCancel('form')">取消</el-button>
              </el-form-item>
            </el-form>
          </el-card>
          <el-card class="box-card" style="margin-top:15px;">
            <span>按钮或资源</span>
            <menu-buttons ref="menuElement" :menu-id="currentId" />
          </el-card>
        </el-col>
      </el-row>
    </div>
  </admin-container>
</template>

<script>
// import { menuTree, getMenuObj, addMenu, updateMenu, deleteMenu } from '@/api/system/index'
import { tree, addMenu, updateMenu, deleteMenu, getMenu } from '@/api/demo/authority'

const defaultForm = {
  code: undefined,
  title: undefined,
  parentId: undefined,
  href: undefined,
  icon: undefined,
  description: undefined,
  type: 'menu',
  belong: 1
}
export default {
  name: 'SysMenu',
  components: {
    'menu-buttons': () => import('../components/buttons')
  },
  data() {
    return {
      loading: false,
      filterText: '',
      list: null,
      total: null,
      formEdit: true,
      formAdd: true,
      formStatus: '',
      // showElement: false,
      typeOptions: ['menu', 'dirt'],
      belongOptions: [{ id: 1, name: '小二' }],
      listQuery: {
        name: undefined,
        belong: 1
      },
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      labelPosition: 'right',
      form: JSON.parse(JSON.stringify(defaultForm)),
      rules: {
        code: [
          {
            min: 2,
            max: 255,
            message: '长度在 2 到 255 个字符',
            trigger: 'blur'
          }
        ],
        icon: [
          {
            min: 2,
            max: 255,
            message: '长度在 2 到 255 个字符',
            trigger: 'blur'
          }
        ],
        href: [
          {
            min: 2,
            max: 255,
            message: '长度在 2 到 255 个字符',
            trigger: 'blur'
          }
        ],
        description: [
          {
            max: 255,
            message: '长度在 0 到 255 个字符',
            trigger: 'blur'
          }
        ],
        title: [
          {
            required: true,
            message: '请输入标题',
            trigger: 'change'
          },
          {
            min: 2,
            max: 20,
            message: '长度在 2 到 20 个字符',
            trigger: 'blur'
          }
        ],
        belong: [
          {
            required: true,
            message: '请选择归属平台',
            trigger: 'change'
          }
        ],
        type: [
          {
            required: true,
            message: '请选择菜单类型',
            trigger: 'change'
          }
        ]
      },
      currentId: -1,
      menuManager_btn_add: true,
      menuManager_btn_edit: true,
      menuManager_btn_del: true
    }
  },
  watch: {
    filterText(val) {
      this.$refs.menuTree.filter(val)
    }
  },
  created() {
    this.getList()
    // this.menuManager_btn_add = this.elements['menuManager:btn_add']
    // this.menuManager_btn_del = this.elements['menuManager:btn_del']
    // this.menuManager_btn_edit = this.elements['menuManager:btn_edit']
  },
  updated() {
    // console.log(this.treeData)
  },
  // computed: {
  // ...mapGetters([
  //   'elements'
  // ])
  // },
  methods: {
    getList() {
      tree(this.listQuery).then(data => {
        this.treeData = data.data
      })
    },
    filterNode(value, data) {
      if (!value) return true
      return data.title.indexOf(value) !== -1
    },
    getNodeData(data) {
      if (!this.formEdit) {
        this.formStatus = 'update'
      }
      this.loading = true
      getMenu(data.id).then(response => {
        // this.form = response.data
        this.loading = false
        this.form = {
          code: response.data.code,
          title: response.data.title,
          parentId: response.data.parentId,
          href: response.data.href,
          icon: response.data.icon,
          description: response.data.description,
          type: response.data.type,
          belong: response.data.belong,
          id: response.data.id
        }
      })
      this.currentId = data.id
      this.$nextTick(() => {
        this.$refs.menuElement.getList()
      })
      // this.showElement = true
      // this.$refs.menuElement.menuId = data.id
      // this.$refs.menuElement.getList()
    },
    handlerEdit() {
      if (this.form.id) {
        this.formEdit = false
        this.formStatus = 'update'
      }
    },
    handlerAdd() {
      this.resetForm()
      this.formEdit = false
      this.formStatus = 'create'
    },
    handleDelete() {
      this.$confirm('此操作将永久删除菜单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const httpParam = {
            id: this.currentId
          }
          deleteMenu(httpParam).then((res) => {
            this.getList()
            this.resetForm()
            this.onCancel()
            this.$message.success('删除成功')
          })
        })
        .catch(() => {

        })
    },
    update(formName) {
      const set = this.$refs
      set[formName].validate(valid => {
        if (valid) {
          updateMenu(this.form).then((res) => {
            this.getList()
            this.$message.success('修改成功')
          })
        }
      })
    },
    create(formName) {
      const set = this.$refs
      set[formName].validate(valid => {
        if (valid) {
          addMenu(this.form).then((res) => {
            if (res.status !== 200) return
            this.getList()
            this.$message.success('添加成功')
          })
        }
      })
    },
    onCancel(formName) {
      this.$refs[formName].resetFields()
      this.formEdit = true
      this.formStatus = ''
    },
    resetForm() {
      this.form = { ...JSON.parse(JSON.stringify(defaultForm)), parentId: this.currentId }
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.half-form .el-form-item__content .el-input{
  max-width:175px;
}

.el-form-item {
  width: 50%;
  float: left;
  &.button-item{
    width: 100%;
    clear: both;
    text-align: center;
    .el-form-item__content{
      margin-left:0;
    }
  }
}
</style>
