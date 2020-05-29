<template>
  <admin-container
    top-visible
  >
    <template slot="header">
      <div class="admin-text-right">
        <el-button v-if="!isEdit" @click.native="getHistory">从历史读取</el-button>
      </div>
    </template>
    <div class="form-container">
      <page-form ref="PageForm" v-bind="$attrs" :is-temp="temp" v-on="$listeners" />
    </div>
    <template slot="footer">
      <div class="admin-text-center">
        <el-button v-if="!isEdit" type="primary" :loading="loading" @click="handleCreate">创建</el-button>
        <el-button v-if="isEdit" type="primary" :loading="loading" @click="handleEdit">保存</el-button>
        <el-button :loading="loading" @click.native="handleRefresh">关闭刷新列表</el-button>
        <el-button v-if="!isEdit" :loading="loading" @click.native="handleResetFields">重置清空</el-button>
      </div>
    </template>
    <history-dialog
      ref="historyDialog"
      :dialog-form="historyForm"
      @updateData="updateData"
    />
  </admin-container>
</template>

<script>
import { mapActions } from 'vuex'
import dayjs from 'dayjs'
import { uniqueId } from 'lodash'
import hotkeys from 'hotkeys-js'
// import { includes } from 'lodash'
import HistoryDialog from './HistoryDialog'
import PageForm from './page/PageForm'
import elements from '@/mixins/elementsPermission'
import autoFocus from '@/mixins/autoFocus'
import { consignOptionList } from '@/api/demo/api'

hotkeys.filter = function(event) {
  return true
}

const defaultForm = {
  consignBaseVo: {
    gmtOrder: dayjs().format('YYYY-M-D HH:mm'), // 日期
    consignNo: '', // 托运单号
    createrName: '', // 制单人姓名
    createrId: '', // 制单人id
    consignGoodsNo: '', // 托运单货号
    sender: '', // 发货人
    receiver: '', // 收货人
    senderPhone: '', // 发货电话
    receiverPhone: '', // 收货电话
    sendRegionId: '', // 发货地址五级地址id
    sendRegionSpell: '', // 发货地址五级地址
    sendDetailAddress: '', // 发货地址详细地址
    receiveRegionId: '', // 收货地址五级地址
    receiveRegionSpell: '', // 收货地址五级地址spell
    receiveDetailAddress: '', // 收货地址详细地址
    // 托运单其他信息
    // parkId: '', // 园区id
    merchantId: '', // 商户id
    sendStationId: '', // 发货网点id
    sendStationName: '', // 发货网点名称
    // stallId: '', // 档口id
    receiveStationId: '', // 收货网点id
    receiveStationName: '', // 收货网点名称
    currentStationId: '', // 当前网点id
    // 配送信息
    takeGoodsMethod: '自送上门', // 提货方式DeliveryMethodEnum.DTD_DELIVERY("DTD_DELIVERY", "上门提货")
    receiveGoodsMethod: '自提', // 配送方式、收货方式DeliveryMethodEnum.DTD_DELIVERY("DTD_DELIVERY", "上门提货")
    receiptRequire: '无需回单', // 回单要求ReceiptRequireEnum.RETURN_CHECK("RETURN_CHECK", "返回签收")
    receiptRequireNum: 1, // 份数
    // 费用信息
    transportFee: '', // 运费
    infoFee: '', // 信息费
    infoFeeStatus: '', // 信息费用状态
    spotTransportFee: '', // 垫资运费
    supportValueFee: '', // 保价费
    collectionGoodsFee: '', // 代收货款
    collectionTransportFee: '', // 代收运费
    spotGoodsFee: '', // 垫货款
    takeGoodsFee: '', // 提货费
    sendGoodsFee: '', // 送货费
    otherFee: '', // 其他费
    // 设计图上没有，原型图上有的费用
    handlingFee: '', // 装卸费
    packingFee: '', // 包装费
    upstairsFee: '', // 上楼费
    // 结算信息
    totalFee: '', // 费用合计
    payType: '', // 付款方式PayTypeEnum.CASH("CASH", "现付")
    cashPay: '', // 现付金额
    collectPay: '', // 到付金额
    receiptPay: '', // 回单付金融
    monthPay: '', // 月结金额
    arrearagePay: '', // 欠付金额
    // 备注
    remarkShort: '', // 简易备注，多个用英文半角逗号隔开
    remark: '' // 备注信息,
  },
  consignGoodsInfoVoList: [
    {
      id: uniqueId(),
      goodsName: '', // 货物名称
      goodsAmount: '', // 数量值
      goodsAmountUnit: '', // 数量单位
      goodsWeight: '', // 重量值
      goodsWeightUnit: '', // 重量单位
      goodsVolume: '', // 体积值
      goodsVolumeUnit: '', // 体积单位 (code)
      goodsType: '', // 货物类型 GoodsTypeEnum.GT1("1", "家电家居")
      packageMethods: '', // 打包方式 PackageMethodsEnum.PM1("1", "纸箱")
      goodsPrice: '', // 元
      goodsPriceUnit: '', // 货值单价单位，
      goodsAttribute: '', // 货品属性GoodsAttributeEnum.("DEAD_WEIGHT", "重货")
      goodsImage: '' // 图片uri
    }
  ]
}

export default {
  name: 'BillAdd',
  components: {
    PageForm,
    HistoryDialog
  },
  mixins: [
    elements,
    autoFocus
  ],
  data() {
    return {
      // 是否编辑
      isEdit: this.$attrs['is-edit'],
      loading: false,
      // dialog
      historyForm: {
        visible: false
      },
      // 页面绑定元素
      temp: JSON.parse(JSON.stringify(defaultForm))
    }
  },
  /*
     * 监听表单，重新计算form元素
     */
  watch: {
    'temp.consignGoodsInfoVoList.length': {
      handler(val, oldVal) {
        if (val !== oldVal) {
          this.currentIndex = 3
          setTimeout(() => {
            this.getAllFocusEls()
          }, 100)
        }
      },
      deep: true
    }
  },
  async mounted() {
    // 单据字典
    await consignOptionList()
      .then(response => {
        this.$bus.emit('bill-form-optionList', response.data)
      })
    if (this.isEdit) {
      this.loading = true
      this.getDetail()
    }
    hotkeys('a', this.example)
  },
  beforeDestroy() {
    hotkeys.unbind('a')
  },
  methods: {
    ...mapActions('admin/page', [
      'close'
    ]),
    // 快捷键
    example(event, handler) {
      console.log(event)
    },
    // 历史记录
    getHistory() {
      Object.assign(this.historyForm, {
        visible: true,
        data: 1
      })
    },
    // 关闭刷新列表
    handleRefresh() {
      this.close({
        tagName: this.$route.name,
        vm: this,
        to: { name: 'example-form' }
      })
        .then(res => {
          // const keepAlive = this.$store.state.admin.page.keepAlive
          // console.log(includes(keepAlive, 'example-form'))
          if (res !== -1) {
            setTimeout(() => {
              // 跳到指定页面，执行页面方法，父节点可能不同
              this.$parent.$parent.$refs.routerview.getList()
            }, 500)
          }
        })
    },
    // 详情
    getDetail(res) {
      setTimeout(() => {
        this.loading = false
        Object.assign(this.temp.consignBaseVo, {
          consignNo: '435345435'
        })
      }, 1000)
    },
    // 创建
    handleCreate() {
      console.log(this.temp)
      this.$refs.PageForm.validate(valid => {
        if (valid) {
          this.loading = true
          setTimeout(() => {
            this.loading = false
            this.$notify({
              title: '成功',
              message: '新增成功',
              type: 'success'
            })
            this.handleRefresh()
          }, 1000)
        } else {
          return false
        }
      })
    },
    // 编辑
    handleEdit() {
      this.$refs.PageForm.validate(valid => {
        if (valid) {
          this.$notify({
            title: '成功',
            message: '编辑成功',
            type: 'success'
          })
        } else {
          return false
        }
      })
    },
    // 重置表格内容
    handleResetFields() {
      // bus总线推送表单重置
      this.$bus.emit('bill-form-resetFields')
    },
    // 获取历史详情
    updateData(val) {
      // Object.assign(this.temp, val)
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .required :before {
    content: '*';
    color: #f56c6c;
    margin-right: 4px;
  }
</style>
