<template>
  <div>
    <base-info ref="baseInfo" :temp="isTemp.consignBaseVo" v-bind="$attrs" v-on="$listeners" />
    <consign-goods-info ref="consignGoodsInfo" :temp="isTemp.consignGoodsInfoVoList" v-bind="$attrs" v-on="$listeners" />
    <delivery-info ref="deliveryInfo" :temp="isTemp.consignBaseVo" v-bind="$attrs" v-on="$listeners" />
    <fee-note-info ref="feeNoteInfo" :temp="isTemp.consignBaseVo" v-bind="$attrs" v-on="$listeners" />
    <editor-info ref="editornfo" :temp="isTemp.consignBaseVo" v-bind="$attrs" v-on="$listeners" />
  </div>
</template>

<script>
import { BaseInfo, ConsignGoodsInfo, DeliveryInfo, FeeNoteInfo, EditorInfo } from './form'

export default {
  name: 'PageForm',
  components: {
    BaseInfo,
    ConsignGoodsInfo,
    DeliveryInfo,
    FeeNoteInfo,
    EditorInfo
  },
  props: {
    isTemp: {
      required: true,
      default: () => {},
      type: Object
    }
  },
  data() {
    return {
      isEdit: this.$attrs['is-edit']
    }
  },
  methods: {
    validate(callback) {
      const ref = this.$refs
      const formList = []
      for (const i in ref) {
        formList.push(ref[i].validate())
      }
      Promise.all(formList).then(() => {
        callback(true)
      }).catch(() => {
        // 第一个错误元素聚焦，加入延时，防止异常
        setTimeout(() => {
          const isError = document.getElementsByClassName('is-error')
          isError[0].querySelector('input').focus()
          callback(false)
        }, 200)
      })
    }
  }
}
</script>
