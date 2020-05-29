<template>
  <div class="table-el-layout">
    <div class="tableTitle">
      货物信息
    </div>
    <el-row class="row first">
      <el-col class="item">
        <div class="el-form-item is-required title">
          <label class="el-form-item__label">货物名称</label>
        </div>
      </el-col>
      <el-col class="item">
        <div class="el-form-item is-required title">
          <label class="el-form-item__label">数量(件)</label>
        </div>
      </el-col>
      <el-col class="item">
        <div class="el-form-item title">
          <label class="el-form-item__label">重量(KG)</label>
        </div>
      </el-col>
      <el-col class="item">
        <div class="el-form-item title">
          <label class="el-form-item__label">体积(m³)</label>
        </div>
      </el-col>
      <el-col class="item price">
        <div class="el-form-item title">
          <label class="el-form-item__label">货值单价(元)</label>
        </div>
      </el-col>
      <el-col class="item">
        <div class="el-form-item title">
          <label class="el-form-item__label">货品类型</label>
        </div>
      </el-col>
      <el-col class="item">
        <div class="el-form-item title">
          <label class="el-form-item__label">包装方式</label>
        </div>
      </el-col>
      <el-col class="item">
        <div class="el-form-item title">
          <label class="el-form-item__label">货品属性</label>
        </div>
      </el-col>
      <el-col class="item pic">
        <div class="el-form-item title">
          <label class="el-form-item__label">货品照片</label>
        </div>
      </el-col>
      <el-col class="item off">
        <div class="el-form-item title">
          <label class="el-form-item__label">操作</label>
          <span @click="addItem"><svg-icon icon-class="order_add" /></span>
        </div>
      </el-col>
    </el-row>
    <div v-for="(item, index) in temp" :key="item.id" style="background-color: #FFF;">
      <goods-child ref="ConsignGoodsInfoChild" :temp="item" :index="index" :option-list="optionList" v-bind="$attrs" @remove="remove" v-on="$listeners" />
    </div>
    <el-row class="row next bottom" style="background-color: #FFF;">
      <el-col class="item">
        <div class="el-form-item title" style="border-bottom: none;">
          <label class="el-form-item__label ">合计</label>
        </div>
      </el-col>
      <el-col class="item">
        <div class="el-form-item">
          {{ goodsAmount }}
        </div>
      </el-col>
      <el-col class="item">
        <div class="el-form-item">
          {{ goodsWeight }}
        </div>
      </el-col>
      <el-col class="item">
        <div class="el-form-item">
          {{ goodsVolume }}
        </div>
      </el-col>
      <el-col class="item price">
        <div class="el-form-item">合计：{{ goodsPrice }}</div>
      </el-col>
      <el-col class="item">
        <div class="el-form-item">&nbsp;</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import goodsChild from './ConsignGoodsInfoChild'
import { uniqueId } from 'lodash'

export default {
  name: 'ConsignGoodsInfo',
  components: {
    goodsChild
  },
  props: {
    temp: {
      required: true,
      default: () => [],
      type: Array
    }
  },
  data() {
    return {
      isEdit: this.$attrs['is-edit'],
      // 单据字典
      optionList: {}
    }
  },
  computed: {
    goodsAmount() {
      let goodsAmount = 0
      for (const i in this.temp) {
        goodsAmount = (parseFloat(goodsAmount) + parseFloat(this.temp[i].goodsAmount ? this.temp[i].goodsAmount : 0)).toFixed(0)
      }
      return goodsAmount
    },
    goodsWeight() {
      let goodsWeight = 0
      for (const i in this.temp) {
        goodsWeight = (parseFloat(goodsWeight) + parseFloat(this.temp[i].goodsWeight ? this.temp[i].goodsWeight : 0)).toFixed(2)
      }
      return goodsWeight
    },
    goodsVolume() {
      let goodsVolume = 0
      for (const i in this.temp) {
        goodsVolume = (parseFloat(goodsVolume) + parseFloat(this.temp[i].goodsVolume ? this.temp[i].goodsVolume : 0)).toFixed(2)
      }
      return goodsVolume
    },
    goodsPrice() {
      let goodsPrice = 0
      for (const i in this.temp) {
        switch (this.temp[i].goodsPriceUnit) {
          case '件':
          case 'PIECE':
            goodsPrice = (parseFloat(goodsPrice) + parseFloat(this.temp[i].goodsPrice ? this.temp[i].goodsPrice : 0) * parseFloat(this.temp[i].goodsAmount ? this.temp[i].goodsAmount : 0)).toFixed(2)
            break
          case '公斤':
          case 'KG':
            goodsPrice = (parseFloat(goodsPrice) + parseFloat(this.temp[i].goodsPrice ? this.temp[i].goodsPrice : 0) * parseFloat(this.temp[i].goodsWeight ? this.temp[i].goodsWeight : 0)).toFixed(2)
            break
          case '立方':
          case 'MMM':
            goodsPrice = (parseFloat(goodsPrice) + parseFloat(this.temp[i].goodsPrice ? this.temp[i].goodsPrice : 0) * parseFloat(this.temp[i].goodsVolume ? this.temp[i].goodsVolume : 0)).toFixed(2)
            break
        }
      }
      return goodsPrice
    }
  },
  mounted() {
    this.$bus.on('bill-form-optionList', this.getOptionList)
  },
  beforeDestroy() {
    this.$bus.off('bill-form-optionList', this.getOptionList)
  },
  methods: {
    // 新增货物列表
    addItem() {
      const arr = {
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
      this.temp.push(arr)
    },
    // 验证
    validate() {
      const formList = []
      this.$refs.ConsignGoodsInfoChild.forEach((item, index) => {
        formList.push(item.validate())
      })
      return new Promise((resolve, reject) => {
        Promise.all(formList).then(() => {
          resolve()
        }).catch(() => {
          reject()
        })
      })
    },
    // 单据字典
    getOptionList(res) {
      this.optionList = res
    },
    remove(num) {
      if (this.temp.length === 1) {
        this.temp[num].visible = false
        this.$message.error('最后一条不能删除')
        return
      }
      this.temp.splice(num, 1)
    }
  }
}
</script>
