<template>
  <div class="">
    <el-dialog :title="title" width="700px" class="powerDialog" :visible.sync="isActive" :before-close="dialogClose">
      <div class="signTablePadding">
        <div class="introduce">
          <span class="item">角色名称：</span>{{ isList.name }}
          <el-button v-if="isDisabled" type="primary" style="float: right;" plain size="mini" @click="userTreeReset">恢复默认</el-button>
        </div>
        <el-tree
          ref="menu"
          class="power-tree"
          :data="data"
          :render-content="renderContent"
          :props="defaultProps"
          node-key="id"
          :expand-on-click-node="false"
          show-checkbox
          default-expand-all
          @current-change="handleNodeClick"
        />
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="dialogClose">取消</el-button>
        <el-button type="primary" :loading="loading" @click="submitForm">保存</el-button>
      </div>
    </el-dialog>
    <bth-dialog ref="bthDialog" :is-roles="isRole" :is-data="dataButton" :is-active="bthDialogVisible" @updateClick="updateClick" @toggleClick="bthDialogToggle" />
  </div>
</template>

<script>
// import { menuTree, getMenuAuthority, modifyMenuAuthority, addMenuAuthority, resetUserAuthority, listByUserId } from '@/api/system'
import { menuTree, tree } from '@/api/demo/authority'
import BthDialog from './BthDialog'

export default {
  name: 'PowerDialog',
  components: { BthDialog },
  props: {
    isActive: {
      type: Boolean,
      default: false
    },
    // isId: {
    //   type: String,
    //   default: 0
    // },
    isList: {
      type: Object,
      default: () => {}
    },
    isRole: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loading: false,
      bthDialogVisible: false,
      dataButton: {},
      id: undefined,
      title: '编辑员工权限',
      isDisabled: false,
      data: [],
      defaultProps: { 'children': 'children', 'label': 'title' },
      isId: '534'
    }
  },
  methods: {
    fetchData() {
      // 商户所有菜单树形
      tree().then(response => {
        this.data = response.data
        console.log(response)
      })
    },
    dialogClose(done) {
      // this.data = []
      this.$refs.menu.setCheckedKeys([])
      this.$emit('toggleClick', false)
    },
    // 提交数据
    submitForm() {
      // console.log(this.$refs.menu.getCheckedKeys())
      const getCheckedNodes = this.$refs.menu.getHalfCheckedNodes()
      const halfIds = []
      // 部分子菜单选中的情况下，也需要将父级的菜单ID 传给后台
      for (var i in getCheckedNodes) {
        halfIds.push(getCheckedNodes[i].id)
      }
      // const menuTrees = halfIds.concat(this.$refs.menu.getCheckedKeys())
      this.loading = true
      if (this.isRole) {
        this.loading = false
        this.dialogClose()
        // modifyMenuAuthority(this.isId, { 'menuTrees': menuTrees.join(',') }).then(response => {
        //   this.loading = false
        //   this.dialogClose()
        // }).catch(() => {
        //   this.loading = false
        // })
      } else {
        this.loading = false
        this.dialogClose()
        // addMenuAuthority({ 'userId': this.isId, 'menuIdList': menuTrees.join(',') }).then(response => {
        //   this.loading = false
        //   this.dialogClose()
        // }).catch(() => {
        //   this.loading = false
        // })
      }
    },
    checkedKeys(num) {
      const arr = this.$refs.menu.getCheckedKeys()
      arr.push(num)
      this.$refs.menu.setCheckedKeys(arr)
    },
    // 职员权限
    // staffFields() {
    //   if (this.isId) {
    //     this.title = '编辑职员权限'
    //     this.isDisabled = true
    //     // 赋值职员权限
    //     listByUserId({ 'userId': this.isId }).then(response => {
    //       const data = response.data
    //       // console.log(data)

    //       if (data.length !== 0) {
    //         const arr = this.$refs.menu.getCheckedKeys()
    //         for (var key in data) {
    //           if (data[key].parentId !== '-1') {
    //             arr.push(data[key].id)
    //           }
    //         }
    //         this.$refs.menu.setCheckedKeys(arr)
    //       }
    //     })
    //     this.fetchData()
    //   }
    // },
    // 角色权限
    roleFields() {
      // if (this.isId) {
      this.title = '编辑角色权限'
      this.isDisabled = false
      // 赋值角色权限
      menuTree({ id: this.isId }).then(response => {
        const data = response.data
        console.log(data)
        if (data.length !== 0) {
          const arr = this.$refs.menu.getCheckedKeys()
          for (var key in data) {
            if (data[key].parentId !== '-1') {
              arr.push(data[key].id)
            } else if (data[key].parentId === '-1' && data[key].children.length === 0) {
              arr.push(data[key].id)
            }
          }
          this.$refs.menu.setCheckedKeys(arr)
        }
      })
      this.fetchData()
      // }
    },
    handleNodeClick(data, e) {
      // console.log(data)
      // this.$nextTick(() => (this.checkedKeys(data.id)))
      // this.$refs.menu.setCheckedKeys([11])
    },
    // 按钮模板
    renderContent(h, { node, data, store }) {
      return (
        <span class='custom-tree-node'>
          <span class='el-tree-node__label'>{node.label}</span>
          <span class='operation'>
            <el-button size='mini' type='text' on-click={ () => this.bthClick(data) }>按钮权限</el-button>
          </span>
        </span>)
    },
    // 按钮权限
    bthClick(data) {
      this.dataButton = data
      this.dataButton['groupId'] = this.isId
      this.bthDialogVisible = true
      if (this.isRole) {
        this.$nextTick(() => (this.$refs.bthDialog.resetFields()))
      } else {
        this.$nextTick(() => (this.$refs.bthDialog.userStaffFields()))
      }
    },
    bthDialogToggle() {
      this.bthDialogVisible = false
    },
    updateClick(id) {
      this.bthDialogVisible = false
      this.$nextTick(() => (this.checkedKeys(id)))
    }
    // 职员恢复默认权限
    // userTreeReset() {
    //   this.$confirm('是否继续?', '确认恢复默认权限！', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning',
    //     center: true
    //   }).then(() => {
    //     resetUserAuthority({ 'userId': this.isId }).then(response => {
    //       this.$refs.menu.setCheckedKeys([])
    //       const data = response.data
    //       if (data.length !== 0) {
    //         const arr = []
    //         for (var key in data) {
    //           if (data[key].parentId !== '-1') arr.push(data[key].id)
    //         }
    //         this.$refs.menu.setCheckedKeys(arr)
    //       }
    //     })
    //   }).catch(() => {
    //   })
    // }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.signTablePadding {
	padding: 3px 0;
}
.power-tree {
  padding-top: 10px;
}
.power-tree .el-tree-node__content {
  height: 32px;
  cursor: default;
}
.power-tree .el-tree-node:focus>.el-tree-node__content, .el-tree-node__content:hover {
  background-color: #ffffff;
}
.power-tree .el-tree-node__expand-icon.expanded {
  display: none;
}
.power-tree .el-tree-node__expand-icon.is-leaf {
  display: none;
}
.power-tree .el-tree-node.is-expanded {
  .el-tree-node__content {
    .operation {
      visibility: hidden;
    }
  }
}
.power-tree .el-tree-node {
  &+.el-tree-node {
    margin-top: 10px;
    padding-top: 10px;
    border-top: 1px solid #e4e7ed;
  }
}
.powerDialog .power-tree .el-tree-node__children {
  .el-tree-node {
    display: inline-block;
    float: left;
    width: 25%;
    &+.el-tree-node {
      margin-top: 0;
      padding-top: 0;
      border-top: 0;
    }
    .custom-tree-node {
      width: 100%;
      position: relative;
    }
    .operation {
      visibility: visible;
      padding-left: 10px;
      .el-button--mini {
        padding: 0;
      }
      .el-button--text {
        color: #a1a4a9;
        padding-bottom: 1px;
        border-bottom: 1px solid #a1a4a9;
        border-radius: 0;
        &:hover {
          color: #0b8bef;
          border-bottom: 1px solid #0b8bef;
        }
      }
    }
  }
}
.power-tree .is-checked .el-tree-node__label {
  color: #0b8bef;
}
.powerDialog .introduce {
  background-color: #f5f7fb;
  border: 1px solid #e4e7ed;
  padding: 10px 15px;
  line-height: 30px;
  font-size: 14px;
  color: #303133;
  overflow: hidden;
}
</style>
