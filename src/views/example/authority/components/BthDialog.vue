<template>
  <el-dialog :title="title" width="490px" class="settingDialog" :visible.sync="isActive" :before-close="dialogClose">
    <div class="signTablePadding BthDialog">
      <!-- :indeterminate="isIndeterminate"  -->
      <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">全选</el-checkbox>
      <div style="margin: 15px 0;" />
      <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
        <el-checkbox v-for="item in cities" :key="item.id" :label="item.id">{{ item.name }}</el-checkbox>
      </el-checkbox-group>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click.native="dialogClose">取消</el-button>
      <el-button type="primary" :loading="loading" @click.native="submitForm">保存</el-button>
    </div>
  </el-dialog>
</template>

<script>
// import { buttonList, getElementAuthority, authorityttonAdd, ButtonByUserId, addButtonAuthority } from '@/api/system'
import { buttonList, authorityButton, authorityttonAdd, addButtonAuthority } from '@/api/demo/authority'
import util from '@/libs/util'

export default {
  name: 'BthDialog',
  props: {
    isData: {
      type: Object,
      default: () => {}
    },
    isActive: {
      type: Boolean,
      default: false
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    isRoles: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      id: undefined,
      checkAll: false,
      checkedCities: [],
      cities: [],
      isIndeterminate: true,
      loading: false,
      title: ''
    }
  },
  methods: {
    handleCheckAllChange(val) {
      this.checkedCities = val ? util.getParamValues('id', this.cities) : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange(value) {
      const checkedCount = value.length
      // console.log('handleCheckedCitiesChange', checkedCount, this.cities.length)
      this.checkAll = checkedCount === this.cities.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length
    },
    fetchData() {
      this.temp.name = '修改'
    },
    dialogClose(done) {
      this.id = undefined
      this.cities = []
      this.checkedCities = []
      this.isIndeterminate = false
      this.checkAll = false
      this.$emit('toggleClick', false)
    },
    submitForm() {
      this.loading = true
      if (this.isRoles) {
        authorityttonAdd({ 'menuId': this.id, 'groupId': this.isData.groupId, 'buttonIdList': this.checkedCities.join(',') }).then(response => {
          this.loading = false
          this.$emit('updateClick', this.id)
          this.id = undefined
          this.cities = []
          this.checkedCities = []
          this.isIndeterminate = false
          this.checkAll = false
        }).catch(() => {
          this.loading = false
        })
      } else {
        addButtonAuthority({ 'menuId': this.id, 'userId': this.isData.groupId, 'buttonIdList': this.checkedCities.join(',') }).then(response => {
          this.loading = false
          this.$emit('updateClick', this.id)
          this.id = undefined
          this.cities = []
          this.checkedCities = []
          this.isIndeterminate = false
          this.checkAll = false
        }).catch(() => {
          this.loading = false
        })
      }
    },
    // 角色
    resetFields() {
      this.title = this.isData.title + '按钮权限设置'
      this.id = this.isData.id
      // console.log(this.isData)
      const httpParam = {
        menuId: this.id,
        pageSize: 100,
        pageNum: 1
      }
      buttonList(httpParam).then(response => {
        this.cities = response.data.rows
        authorityButton(this.isData.groupId).then(response => {
          let allCities = []
          if (response.data) {
            allCities = response.data// getParamValues('id', response.data)
          }
          // 记录拥有权限的按钮数
          let hasAuthCount = 0
          for (let i = 0; i < this.cities.length; i++) {
            if (allCities.indexOf(this.cities[i].id) > -1) {
              hasAuthCount++
              this.checkedCities.push(this.cities[i].id)
            }
          }
          // console.log(hasAuthCount)
          this.checkAll = hasAuthCount > 0 && hasAuthCount === this.cities.length
          // this.isIndeterminate = false
          // console.log('resetFields', this.isIndeterminate, hasAuthCount, this.cities.length)
          this.isIndeterminate = hasAuthCount !== 0 && !(hasAuthCount === this.cities.length)
        })
      })
    },
    // 职员
    userStaffFields() {
      this.title = this.isData.title + '按钮权限设置'
      this.id = this.isData.id
      const httpParam = {
        menuId: this.id,
        pageSize: 100,
        pageNum: 1
      }
      buttonList(httpParam).then(response => {
        this.cities = response.data.rows
        authorityButton({ 'menuId': this.id, 'userId': this.isData.groupId }).then(response => {
          if (response.data) {
            this.checkedCities = util.getParamValues('id', response.data)
          }
          // console.log('userStaffFields', this.checkedCities.length === this.cities.length)
          this.checkAll = this.checkedCities.length > 0 && this.checkedCities.length === this.cities.length
          this.isIndeterminate = this.checkedCities.length !== 0 && !(this.checkedCities.length === this.cities.length)
        })
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.BthDialog {
  padding: 3px 0;
  .el-checkbox {
    margin-right: 30px;
  }
  .el-checkbox+.el-checkbox {
    margin-left: 0px;
  }
}
</style>
