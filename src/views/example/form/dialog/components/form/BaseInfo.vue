<template>
  <div>
    <table class="table-border center fixed fit mb admin-mt-10">
      <tr>
        <th class="admin-text-left title">处置申请单编号: {{ temp.applyNo }} &nbsp; &nbsp; 申请时间: {{ temp.gmtCreate }} </th>
      </tr>
    </table>

    <table class="table-border fixed fit mb error detail admin-mt-10">
      <colgroup>
        <col width="10%">
        <col width="40%">
        <col width="10%">
        <col width="40%">
      </colgroup>
      <tr>
        <th colspan="4" class="admin-text-left title"><svg-icon icon-class="list" /> 产废企业</th>
      </tr>
      <tr>
        <th class="admin-text-right">企业名称</th>
        <td class="admin-text-left">{{ temp.produceOrgName }} <el-tag v-if="temp.identityName" type="danger">{{ temp.identityName }}</el-tag></td>
        <th class="admin-text-right">联系人</th>
        <td class="admin-text-left">{{ temp.manager }}</td>
      </tr>
      <tr>
        <th class="admin-text-right">手机号</th>
        <td class="admin-text-left">{{ temp.cellphone }}</td>
        <th class="admin-text-right">申请地址</th>
        <td class="admin-text-left">{{ temp.detailAddress }}</td>
      </tr>
    </table>

    <table class="table-border fixed fit mb error detail admin-mt-10">
      <colgroup>
        <col width="10%">
        <col width="40%">
        <col width="10%">
        <col width="40%">
      </colgroup>
      <tr>
        <th colspan="4" class="admin-text-left title"><svg-icon icon-class="list" /> 处置企业</th>
      </tr>
      <tr>
        <th class="admin-text-right">企业名称</th>
        <td class="admin-text-left">{{ temp.dispose.organizationName }} <el-tag type="danger">已认证</el-tag></td>
        <th class="admin-text-right">联系人</th>
        <td class="admin-text-left">{{ temp.dispose.contacts }}</td>
      </tr>
      <tr>
        <th class="admin-text-right">手机号</th>
        <td class="admin-text-left">{{ temp.dispose.mobile }}</td>
        <th class="admin-text-right">地址</th>
        <td class="admin-text-left">{{ temp.dispose.detailAddress }}</td>
      </tr>
    </table>

    <table class="table-border center fixed fit admin-mt-10">
      <tr>
        <th colspan="5" class="admin-text-left title"><svg-icon icon-class="list" /> 申请清单
          <el-button type="primary" size="mini" style="position: absolute; right: 8px; top: 8px;" @click="handleCreateItem">添加</el-button>
        </th>
      </tr>
      <tr>
        <th>固废类别</th>
        <th>固废代码</th>
        <th>申请量</th>
        <th>处置企业</th>
        <th>操作</th>
      </tr>
      <tr v-for="(item, index) in temp.disposeApplyInfoVOList" :key="item.id">
        <td>{{ item.trashType }}</td>
        <td>{{ item.trashCode }}</td>
        <td>{{ item.applyNum }}<span v-if="item.applyNum">吨</span></td>
        <td>{{ temp.dispose.organizationName }}</td>
        <td>
          <span class="link-type" @click="handleEditItem(item, index)">编辑</span> &nbsp;
          <el-popover
            v-model="item.visible"
            placement="top"
            width="160"
          >
            <p style="padding: 5px 0px 10px; margin: 0;">确认删除?</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="cancelItem(item)">取消</el-button>
              <el-button v-loadClick type="primary" size="mini" @click="deleteItem(item)">确定</el-button>
            </div>
            <span slot="reference" class="link-type">删除</span>
            <!--<span class="el-icon-delete" slot="reference"></span>-->
          </el-popover>
        </td>
      </tr>
      <tr v-if="!temp.disposeApplyInfoVOList.length">
        <td colspan="5">暂无数据，请先<span class="link-type" @click="handleCreateItem">添加</span></td>
      </tr>
    </table>

    <!--申请固废清单-->
    <solid-waste-dialog
      ref="solidWasteDialog"
      :dialog-form="solidWasteForm"
      @updateList="updateList"
    />

  </div>
</template>

<script>
// import { uniqueId } from 'lodash'
import solidWasteDialog from '../dialog/solidWasteDialog'

export default {
  name: 'BaseInfo',
  components: {
    solidWasteDialog
  },
  props: {
    value: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      // 申请固废清单
      solidWasteForm: {
        visible: false,
        type: ''
      }
    }
  },
  computed: {
    temp: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  },
  mounted() {
  },
  methods: {
    // 编辑申请固废清单
    handleEditItem(res, index) {
      Object.assign(this.solidWasteForm, {
        visible: true,
        type: 'update',
        disposeOrgId: this.temp.dispose.forgGuid,
        data: res,
        index: index
      })
      this.$refs.solidWasteDialog.init()
    },
    // 添加申请固废清单
    handleCreateItem() {
      Object.assign(this.solidWasteForm, {
        visible: true,
        type: 'create',
        disposeOrgId: this.temp.dispose.forgGuid,
        data: null
      })
      this.$refs.solidWasteDialog.init()
    },
    // 申请清单更新
    updateList(res, status, index) {
      if (status === 'create') {
        /* const arr = {
          id: uniqueId(),
          trashType: 'HW01医疗废物',
          trashCode: '831-001-01',
          applyNum: '',
          organizationName: this.temp.dispose.organizationName,
          organizationId: this.temp.dispose.id,
          // 选中值
          selected: [],
          // 选中名称
          selectedName: []
        } */
        // res.organizationName = this.temp.dispose.organizationName
        // res.organizationId = this.temp.dispose.id
        // 选中值
        // res['selected'] = []
        if (this.temp.disposeApplyInfoVOList.some(v => (v.trashCode === res.trashCode && v.trashType === res.trashType))) {
          this.$message.error(`固废类别：${res.trashType}，固废代码：${res.trashCode} 已存在，请勿重复添加！`)
          return
        }
        this.temp.disposeApplyInfoVOList.push(res)
      } else {
        this.$set(this.temp.disposeApplyInfoVOList, index, res)
      }
    },
    cancelItem(row) {
      row.visible = !row.visible
    },
    deleteItem(row) {
      const index = this.temp.disposeApplyInfoVOList.findIndex(res => res === row)
      if (this.temp.disposeApplyInfoVOList.length === 1) {
        // this.temp.disposeApplyInfoVOList[index].visible = false
        // this.$message.error('最后一条不能删除')
        // return
      }
      this.temp.disposeApplyInfoVOList.splice(index, 1)
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>

</style>
