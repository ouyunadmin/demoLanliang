<template>
  <admin-container>
    <template slot="header">
      <div>dialog 实例</div>
    </template>

    <div class="admin-mb">
      <el-button @click="handleSelect">dialog列表选择</el-button>
    </div>
    <div class="admin-mb">
      <el-button @click="handleOne">dialog表单验证方式一</el-button>
      <el-button @click="handleOneUpdate">编辑</el-button>
      <el-button @click="handleOneDetails">详情</el-button>
    </div>
    <div class="admin-mb">
      <el-button @click="handleTwo">dialog表单验证方式二</el-button>
      <el-button @click="handleTwoUpdate">编辑</el-button>
      <el-button @click="handleTwoDetails">详情</el-button>
    </div>
    <div class="admin-mb">
      <el-button @click="handleCheck">dialog步骤条操作</el-button>
    </div>
    <div class="admin-mb">
      <el-button @click="handleDrawer">抽屉组件</el-button>
    </div>
    <!--dialog列表选择-->
    <list-dialog
      v-if="listForm.visible"
      ref="listDialog"
      :dialog-form="listForm"
      @updateData="updateData"
    />

    <!--验证方式一-->
    <one-dialog
      v-if="oneForm.visible"
      ref="oneDialog"
      :dialog-form="oneForm"
      @updateData="updateData"
    />

    <!--验证方式二-->
    <two-dialog
      v-if="twoForm.visible"
      ref="twoDialog"
      :dialog-form="twoForm"
      @updateData="updateData"
    />

    <!--步骤条-->
    <check-dialog
      v-if="checkForm.visible"
      ref="checkDialog"
      :dialog-form="checkForm"
      @updateList="updateData"
    />

    <!--抽屉-->
    <admin-drawer
      v-model="showWindowBDrawer"
      title="标题"
      :width.sync="width"
      :min-width="300"
      placement="right"
      :draggable="draggable"
      :before-drag="beforeDrag"
    >
      <div v-for="n in 200" :key="n">{{ n }}</div>

      <div slot="footer">底部</div>
    </admin-drawer>
  </admin-container>
</template>

<script>
import { mapActions } from 'vuex'
import elements from '@/mixins/elementsPermission'
import ListDialog from './components/dialog/listDialog'
import OneDialog from './components/dialog/oneDialog'
import TwoDialog from './components/dialog/twoDialog'
import CheckDialog from './components/dialog/checkDialog'

export default {
  name: 'FormDialog',
  components: {
    ListDialog,
    OneDialog,
    TwoDialog,
    CheckDialog
  },
  mixins: [
    elements
  ],
  data() {
    return {
      // 列表选择
      listForm: {
        visible: false
      },
      // 验证方式一
      oneForm: {
        visible: false,
        type: ''
      },
      // 验证方式二
      twoForm: {
        visible: false,
        type: ''
      },
      // 步骤条
      checkForm: {
        visible: false
      },
      // 抽屉组件
      showWindowBDrawer: false,
      width: 500,
      draggable: true
    }
  },
  mounted() {
  },
  methods: {
    ...mapActions('admin/page', [
      'close'
    ]),
    // 抽屉组件
    handleDrawer() {
      this.showWindowBDrawer = true
    },
    // drawer拖动时事件
    beforeDrag() {
      console.log(0)
    },
    // 步骤条
    handleCheck() {
      Object.assign(this.checkForm, {
        visible: true,
        data: 1000
      })
      this.$nextTick(() => {
        this.$refs.checkDialog.init()
      })
    },
    // 验证方式二
    handleTwo() {
      Object.assign(this.twoForm, {
        visible: true,
        type: 'create'
      })
      this.$nextTick(() => {
        this.$refs.twoDialog.init()
      })
    },
    // 验证方式二 编辑
    handleTwoUpdate() {
      Object.assign(this.twoForm, {
        visible: true,
        type: 'update',
        data: 1000
      })
      this.$nextTick(() => {
        this.$refs.twoDialog.init()
      })
    },
    // 验证方式二 详情
    handleTwoDetails() {
      Object.assign(this.twoForm, {
        visible: true,
        type: 'details',
        data: 1000
      })
      this.$nextTick(() => {
        this.$refs.twoDialog.init()
      })
    },
    // 验证方式一
    handleOne() {
      Object.assign(this.oneForm, {
        visible: true,
        type: 'create'
      })
      this.$nextTick(() => {
        this.$refs.oneDialog.init()
      })
    },
    // 验证方式一 编辑
    handleOneUpdate() {
      Object.assign(this.oneForm, {
        visible: true,
        type: 'update',
        data: 1000
      })
      this.$nextTick(() => {
        this.$refs.oneDialog.init()
      })
    },
    // 验证方式一 详情
    handleOneDetails() {
      Object.assign(this.oneForm, {
        visible: true,
        type: 'details',
        data: 1000
      })
      this.$nextTick(() => {
        this.$refs.oneDialog.init()
      })
    },
    // 列表选择
    handleSelect() {
      Object.assign(this.listForm, {
        visible: true
      })
      this.$nextTick(() => {
        this.$refs.listDialog.init()
      })
    },
    // 更新数据
    updateData(val) {
      console.log(val)
    }
  }
}
</script>

<style>
</style>
