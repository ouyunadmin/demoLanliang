<template>
  <el-form ref="dataForm" class="el-form-item-no" :rules="rules" :model="temp" label-position="right" label-width="85px">
    <div class="tableTitle">
      配送信息
    </div>
    <el-row :gutter="20">
      <el-col :span="4">
        <el-form-item prop="takeGoodsMethod" label="提货方式" class="is-required">
          <el-select ref="takeGoodsMethod" v-model="temp.takeGoodsMethod" default-first-option filterable clearable placeholder="请选择" @change="takeGoodsMethodChange">
            <el-option
              v-for="item in optionList.DeliveryMethod"
              :key="item.code"
              :label="item.desc"
              :value="item.desc"
            />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item prop="receiveGoodsMethod" label="配送方式">
          <el-select ref="receiveGoodsMethod" v-model="temp.receiveGoodsMethod" default-first-option filterable clearable placeholder="请选择">
            <el-option
              v-for="item in optionList.DispatchMethod"
              :key="item.code"
              :label="item.desc"
              :value="item.desc"
            />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item prop="receiptRequire" label="回单要求">
          <el-select ref="receiptRequire" v-model="temp.receiptRequire" default-first-option filterable clearable placeholder="请选择">
            <el-option
              v-for="item in optionList.ReceiptRequire"
              :key="item.code"
              :label="item.desc"
              :value="item.desc"
            />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col v-show="numDiabled" :span="4" style="font-size: 15px;">
        <input v-model.number="temp.receiptRequireNum" type="text" class="num" oninput="this.value=this.value.replace(/\D/g,'').replace(/^0+(?=\d)/,'')" onpaste="return false" ondrop="return false" ondragenter="return false" ondragstart="return false" maxlength="2">份
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
export default {
  name: 'DeliveryInfo',
  props: {
    temp: {
      required: true,
      default: () => {},
      type: Object
    }
  },
  data() {
    return {
      isEdit: this.$attrs['is-edit'],
      // 单据字典
      optionList: {},
      rules: {
        takeGoodsMethod: [{ required: true, message: '请选择提货方式', trigger: 'change' }],
        receiveGoodsMethod: [{ required: true, message: '请选择配送方式', trigger: 'change' }],
        receiptRequire: [{ required: true, message: '请选择回单要求', trigger: 'change' }]
      }
    }
  },
  computed: {
    numDiabled() {
      return !(this.temp.receiptRequire === '无需回单')
    }
  },
  watch: {
    numDiabled(val) {
      if (!val) {
        this.temp.receiptRequireNum = 0
      } else {
        this.temp.receiptRequireNum = 1
      }
    }
  },
  mounted() {
    this.$bus.on('bill-form-resetFields', this.resetFields)
    this.$bus.on('bill-form-optionList', this.getOptionList)
    this.$bus.on('form-elements-blur', this.selectBlur)
  },
  beforeDestroy() {
    this.$bus.off('bill-form-resetFields', this.resetFields)
    this.$bus.off('bill-form-optionList', this.getOptionList)
    this.$bus.off('form-elements-blur', this.selectBlur)
  },
  methods: {
    // select读取row
    takeGoodsMethodChange(val) {
      const label = this.optionList.DeliveryMethod.find(t => (t.desc === val))
      console.log(label)
    },
    // 验证
    validate() {
      return new Promise((resolve, reject) => {
        this.$refs.dataForm.validate(valid => {
          if (valid) {
            resolve()
          } else {
            reject()
          }
        })
      })
    },
    // 重置
    resetFields() {
      this.$refs['dataForm'].resetFields()
    },
    // 单据字典
    getOptionList(res) {
      this.optionList = res
    },
    // select 失焦
    selectBlur() {
      const ref = this.$refs
      ref.takeGoodsMethod.blur()
      ref.receiveGoodsMethod.blur()
      ref.receiptRequire.blur()
    }
  }
}
</script>

<style lang="scss" scoped>
  .num {
    width: 40px;
    border: none;
    color: #606266;
    text-align: center;
    border-bottom: 1px solid #e4e7ed;
    margin-top: 10px;
    &:focus {
      outline: none;
    }
  }
</style>
