<template>
  <admin-dialog
    title="步骤条"
    width="1000px"
    top="50px"
    :visible="dialogForm.visible"
    :cancel="cancel"
  >
    <el-form ref="dataForm" v-loading="loading" :rules="rules" :model="temp" label-position="right" label-width="0">

      <el-steps
        :active="active"
        align-center
        process-status="wait"
        style="padding: 10px 0;"
      >
        <el-step
          v-for="(item,index) in steps"
          :key="index"
          :title="item.label"
          :description="item.description"
          :icon="index < active ? 'el-icon-check':'el-icon-time'"
        />
      </el-steps>

      <base-info v-if="active === 1" ref="baseInfo" v-model="temp" />

      <materiel-info v-else-if="active === 2" ref="materielInfo" v-model="temp" />

      <perfected-info v-else ref="perfectedInfo" v-model="temp" />

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click.native="cancel">关 闭</el-button>
      <el-button :loading="loading" @click.native="handleFail">不通过</el-button>
      <el-button v-if="active > 1" :loading="loading" type="primary" @click.native="prev">上一步</el-button>
      <el-button v-if="active < 3" :loading="loading" type="primary" @click.native="next">下一步</el-button>
      <el-button v-if="active === 3" :loading="loading" type="primary" @click.native="create('dataForm')">审校通过</el-button>
    </div>

    <!--不通过-->
    <fail-dialog
      ref="failDialog"
      :dialog-form="failForm"
      @updateList="remove"
    />

  </admin-dialog>
</template>

<script>
import elements from '@/mixins/elementsPermission'
// import { cloneDeep, assign } from 'lodash'
import { cloneDeep } from 'lodash'
import failDialog from './failDialog'
import BaseInfo from '../form/BaseInfo'
import MaterielInfo from '../form/MaterielInfo'
import PerfectedInfo from '../form/PerfectedInfo'
import { addObj } from '@/api/demo/api'

const defaultForm = {
  applyNo: '',
  gmtCreate: '',
  produceOrgName: '',
  // 处置企业
  dispose: {
    organizationName: ''
  },
  // 固废清单
  disposeApplyInfoVOList: [],
  // list: [],
  billList: []
}

export default {
  name: 'CheckDialog',
  components: {
    failDialog,
    BaseInfo,
    MaterielInfo,
    PerfectedInfo
  },
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
      // 步骤
      steps: [
        { 'label': '信息审核', 'description': '' },
        { 'label': '物料名称确认', 'description': '' },
        { 'label': '物料调查表完善', 'description': '' }
      ],
      active: 1,
      // 不通过
      failForm: {
        visible: false
      },
      // 接收数据
      data: this.dialogForm,
      // 页面绑定元素
      temp: cloneDeep(defaultForm),
      options: [
        { label: 'HW01医疗废物', key: '1' },
        { label: 'HW01医疗废物2', key: '0' }
      ],
      rules: {
        test1: [
          { required: true, message: '请选择运输企业', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    // 上一步
    prev() {
      this.active--
    },
    // 下一步
    next() {
      if (this.active === 2 && !this.temp.billList.length) {
        this.$message.error('请添加申请名称清单！')
        return
      }
      if (this.active === 2) {
        this.$refs['dataForm'].validate(valid => {
          if (valid) {
            this.active++
          } else {
            setTimeout(() => {
              const form = this.$el.querySelector('.is-error')
              form.querySelector('input') ? form.querySelector('input').focus() : ''
              form.querySelector('textarea') ? form.querySelector('textarea').focus() : ''
            }, 200)
          }
        })
      }
      if (this.active === 1 && !this.temp.disposeApplyInfoVOList.length) {
        this.$message.error('请添加申请清单！')
        return
      }
      if (this.active === 1) {
        this.active++
        setTimeout(() => {
          this.$refs.materielInfo.bill()
        }, 200)
      }
    },
    // 不通过
    handleFail() {
      Object.assign(this.failForm, {
        visible: true,
        data: this.dialogForm.data
      })
    },
    // 不通过处理
    remove() {
      this.$emit('updateList')
      this.cancel()
    },
    // 取消
    cancel(done) {
      this.dialogForm.visible = false
      this.$refs['dataForm'].resetFields()
      this.temp = cloneDeep(defaultForm)
      this.loading = false
      setTimeout(() => {
        this.active = 1
      }, 200)
    },
    // 新增数据
    create(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const temp = cloneDeep(this.temp)
          const billList = temp.billList.every(item => item.status)
          if (!billList) {
            this.$message.error('还有未完善的危废信息调查表！')
            return
          }
          /* const dtolist = temp.billList.map(res => {
            // 合并 object
            return assign({}, res, res.form)
          }) */
          this.$confirm('处置审核通过, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(() => {
            this.httpPost()
          }).catch(() => {
          })
        } else {
          setTimeout(() => {
            const form = this.$el.querySelector('.is-error')
            form.querySelector('input') ? form.querySelector('input').focus() : ''
            form.querySelector('textarea') ? form.querySelector('textarea').focus() : ''
          }, 200)
          return false
        }
      })
    },
    httpPost() {
      this.loading = true
      const temp = cloneDeep(this.temp)
      const map = {}
      const dest = []
      temp.billList.forEach(item => {
        if (!map[item['trashCode']]) {
          dest.push({
            trashType: item.trashType,
            trashCode: item.trashCode,
            price: item.price,
            disposeApplyInfoSplitDTOList: [item]
          })
          map[item['trashCode']] = item
        } else {
          dest.forEach(res => {
            if (res.trashCode === item.trashCode) {
              res.disposeApplyInfoSplitDTOList.push(item)
              return
            }
          })
        }
      })
      const httpParams = {
        id: temp.id,
        disposeApplyInfoAddDTO: dest
      }
      addObj(httpParams).then(() => {
        this.loading = false
        this.$emit('updateList')
        this.cancel()
        this.$notify({
          title: '成功',
          message: '处理成功',
          type: 'success',
          duration: 2000
        })
      }).catch(() => {
        this.loading = false
      })
    },
    // 初始化数据
    init() {
      // console.log(this.dialogForm.data)
      this.loading = true
      setTimeout(() => {
        this.loading = false
        Object.assign(this.temp, {
          applyNo: '1122',
          gmtCreate: '2019-03-12 13:23:32',
          produceOrgName: '公司名称',
          identityName: '已认证',
          dispose: {
            organizationName: '好的公司',
            forgGuid: 123,
            contacts: '联系人'
          },
          disposeApplyInfoVOList: [
            { trashType: 'HW49', trashCode: '900-040-49', applyNum: 20, selected: [] },
            { trashType: 'HW46', trashCode: '600-030-49', applyNum: 10, selected: [] }
          ]
        })
      }, 200)
      /* getDetail({ id: this.dialogForm.data })
        .then(response => {
          Object.assign(this.temp, response.data)
          this.temp.disposeApplyInfoVOList = response.data.disposeApplyInfoVOList.map(res => {
            // 选中值
            res['selected'] = []
            return res
          })
          // 处置企业
          getConsumeDetails({ orgId: this.temp.disposeOrgId })
            .then(response => {
              this.loading = false
              Object.assign(this.temp.dispose, response.data)
            }).catch(() => {
              this.loading = false
            })
        }).catch(() => {
          this.loading = false
        }) */
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
.theme-hb .table-border.fit td {
  overflow: visible;
}
</style>
