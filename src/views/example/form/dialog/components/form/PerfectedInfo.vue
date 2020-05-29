<template>
  <div>
    <table class="table-border center fixed fit">
      <tr>
        <th colspan="7" class="admin-text-left title"><svg-icon icon-class="list" /> 申请名称清单</th>
      </tr>
      <tr>
        <th>固废类别</th>
        <th>固废代码</th>
        <th>名称</th>
        <th>申请量</th>
        <!--<th>是否取样检测  </th>-->
        <th>处置企业</th>
        <th>调查表</th>
        <th>操作</th>
      </tr>
      <tr v-for="(item,index) in temp.billList" :key="item.index">
        <td :title="item.test1">{{ item.trashType }}</td>
        <td :title="item.test2">{{ item.trashCode }}</td>
        <td>{{ item.trashName }}</td>
        <td>{{ item.disposeNum }}吨</td>
        <!--<td>
          {{item.test11 === '1' ? '检测' : '不检测'}}
        </td>-->
        <td :title="temp.dispose.organizationName">
          {{ temp.dispose.organizationName }}
        </td>
        <td>
          {{ !item.status ? '未完成' : '已完成' }}
        </td>
        <td>
          <span class="link-type" @click="handleAddItem(item, index)">调查表填写</span>
        </td>
      </tr>
      <tr v-if="!temp.billList.length">
        <td colspan="7">暂无数据</td>
      </tr>
    </table>

    <!--调查表填写-->
    <questionnaire-dialog
      ref="questionnaireDialog"
      :dialog-form="questionnaireForm"
      @updateList="updateList"
    />

  </div>
</template>

<script>
import { includes } from 'lodash'
import questionnaireDialog from '../dialog/questionnaireDialog'

export default {
  name: 'PerfectedInfo',
  components: {
    questionnaireDialog
  },
  props: {
    value: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      // 调查表填写
      questionnaireForm: {
        visible: false
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
    // 调查表填写更新
    updateList(res, index) {
      // 物理形态
      if (res.physicsShape !== '其他') res.physicsShapeRemark = ''
      // 危险特性
      if (!includes(res.hazardCharacteristicsList, '其他')) res.hazardCharacteristicsRemark = ''
      // 包装需求
      if (!includes(res.packagingMethodList, '其他')) res.packagingMethodRemark = ''
      this.$set(this.temp.billList[index], 'researchFormDTO', res)
      // Object.assign(this.temp.billList[index], res)
      this.$set(this.temp.billList[index], 'status', false)
      const neglect = ['physicsShapeRemark', 'hazardCharacteristicsRemark', 'packagingMethodRemark']
      for (const i in res) {
        const source = '' + res[i] || ''
        if (source || typeof source === 'object') {
          if (source.length && !includes(neglect, i)) {
            this.$set(this.temp.billList[index], 'status', true)
          }
        }
      }
    },
    // 调查表填写
    handleAddItem(res, index) {
      Object.assign(this.questionnaireForm, {
        visible: true,
        data: res,
        produceOrgName: this.temp.produceOrgName,
        index: index
      })
      this.$nextTick(() => {
        this.$refs.questionnaireDialog.init()
      })
    }
  }
}
</script>
