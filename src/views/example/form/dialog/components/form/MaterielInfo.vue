<template>
  <div>
    <table class="table-border center fixed fit">
      <tr>
        <th colspan="5" class="admin-text-left title"><svg-icon icon-class="list" /> 申请清单</th>
      </tr>
      <tr>
        <th>固废类别</th>
        <th>固废代码</th>
        <th>申请量</th>
        <th>处置企业</th>
        <th>操作</th>
      </tr>
      <tr v-for="(item,index) in temp.disposeApplyInfoVOList" :key="item.id">
        <td>{{ item.trashType }}</td>
        <td>{{ item.trashCode }}</td>
        <td>{{ item.applyNum }}吨</td>
        <td :title="temp.dispose.organizationName">{{ temp.dispose.organizationName }}</td>
        <td>
          <span class="link-type" @click="handleAddItem(item, index)">名称选择</span>
        </td>
      </tr>
      <tr v-if="!temp.disposeApplyInfoVOList.length">
        <td colspan="5">暂无数据</td>
      </tr>
    </table>

    <table class="table-border center fixed fit admin-mt-10">
      <tr>
        <th colspan="5" class="admin-text-left title"><svg-icon icon-class="list" /> 申请名称清单</th>
      </tr>
      <tr>
        <th>固废类别</th>
        <th>固废代码</th>
        <th>名称</th>
        <th>申请量</th>
        <!--<th>是否取样检测</th>-->
        <th>处置企业</th>
      </tr>
      <tr v-for="(item,index) in temp.billList" :key="item.index">
        <td>{{ item.trashType }}</td>
        <td>{{ item.trashCode }}</td>
        <td>{{ item.trashName }}</td>
        <td>
          <el-form-item label-width="0px" :show-message="true" label="" :prop="'billList.'+index+'.disposeNum'" :rules="groupRules.disposeNum">
            <input-cleave v-model.number="item.disposeNum" :is-decimal="2" is-placeholder="请填写申请量" /> <!--<span class="unit">吨</span>-->
          </el-form-item>
        </td>
        <!--<td>
          <el-form-item label-width="0px" :show-message="true" label="" :prop="'billList.'+index+'.checkStatus'" :rules="groupRules.checkStatus">
            <el-radio-group v-model="item.checkStatus">
              <el-radio v-for="item in options" :label="item.key" :key="item.key">{{item.label}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </td>-->
        <td style="overflow: hidden !important;" :title="temp.dispose.organizationName">{{ temp.dispose.organizationName }}</td>
      </tr>
      <tr v-if="!temp.billList.length">
        <td colspan="5">暂无数据</td>
      </tr>
    </table>

    <!--名称选择-->
    <name-dialog
      ref="nameDialog"
      :dialog-form="nameForm"
      @updateList="updateList"
    />

  </div>
</template>

<script>
import { uniqueId, cloneDeep } from 'lodash'
import nameDialog from '../dialog/nameDialog'

export default {
  name: 'MaterielInfo',
  components: {
    nameDialog
  },
  props: {
    value: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      // 名称选择
      nameForm: {
        visible: false
      },
      options: [
        { label: '检测', key: '0' },
        { label: '不检测', key: '1' }
      ],
      groupRules: {
        disposeNum: [
          { required: true, message: '请填写申请量', trigger: 'blur' }
        ],
        checkStatus: [
          { required: true, message: '请选择是否取样检测', trigger: 'change' }
        ]
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
    // 名称选择
    handleAddItem(res, index) {
      Object.assign(this.nameForm, {
        visible: true,
        data: res,
        disposeOrgId: this.temp.dispose.forgGuid,
        index: index
      })
      this.$nextTick(() => {
        this.$refs.nameDialog.init()
      })
    },
    // 申请名称清单更新
    updateList(res, index) {
      this.$set(this.temp.disposeApplyInfoVOList, index, res)
      this.bill()
    },
    // 处理申请名称清单列表
    bill() {
      const billList = []
      this.temp.disposeApplyInfoVOList.forEach(item => {
        if (item.selected.length) {
          item.selected.forEach(res => {
            const list = cloneDeep(item)
            delete list['selected']
            list['index'] = uniqueId()
            // 名称
            list['trashName'] = res
            // 申请量
            list['disposeNum'] = ''
            // 是否取样检测
            list['checkStatus'] = '0'
            // 调查表状态
            list['status'] = false
            // 调查表内容
            list['researchFormDTO'] = {}
            billList.push(list)
          })
        }
      })
      // console.log(billList)
      this.temp.billList = billList
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.table-border {
  .el-radio+.el-radio {
    margin-left: 10px;
  }
  td {
    overflow: inherit !important;
    .unit {
      position: absolute;
      right: 5px;
    }
  }
}
</style>
