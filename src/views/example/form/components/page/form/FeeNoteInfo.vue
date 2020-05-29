<template>
  <el-form ref="dataForm" class="el-form-item-no" :rules="rules" :model="temp" label-position="right" label-width="0">
    <div class="table-el-layout">
      <div class="tableTitle">
        费用信息
      </div>
      <el-row class="row">
        <el-col class="item">
          <el-row>
            <el-col :span="24" class="el-form-item is-required title">
              <label class="el-form-item__label">运费</label>
            </el-col>
            <el-col :span="24" class="el-form-item">
              <el-form-item prop="transportFee">
                <input-cleave v-model.number="temp.transportFee" is-css="t-r" is-placeholder="0.00" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
        <el-col class="item info-charge">
          <el-row>
            <el-col :span="24" class="el-form-item title">
              <label class="el-form-item__label">信息费</label>
            </el-col>
            <el-col :span="12" class="el-form-item">
              <el-form-item prop="infoFee">
                <input-cleave v-model.number="temp.infoFee" is-css="t-r" is-placeholder="0.00" />
              </el-form-item>
            </el-col>
            <el-col :span="12" class="el-form-item" style="background-color: #FFF;">
              <el-form-item prop="infoFeeStatus">
                <el-checkbox v-model="temp.infoFeeStatus">已付</el-checkbox>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
        <el-col class="item">
          <el-row>
            <el-col :span="24" class="el-form-item title">
              <label class="el-form-item__label">垫运费</label>
            </el-col>
            <el-col :span="24" class="el-form-item ">
              <el-form-item prop="spotTransportFee">
                <input-cleave v-model.number="temp.spotTransportFee" is-css="t-r" is-placeholder="0.00" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
        <el-col class="item">
          <el-row>
            <el-col :span="24" class="el-form-item title">
              <label class="el-form-item__label">保价费</label>
            </el-col>
            <el-col :span="24" class="el-form-item ">
              <el-form-item prop="supportValueFee">
                <input-cleave v-model.number="temp.supportValueFee" is-css="t-r" is-placeholder="0.00" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
        <el-col class="item">
          <el-row>
            <el-col :span="24" class="el-form-item title">
              <label class="el-form-item__label">代收货款</label>
            </el-col>
            <el-col :span="24" class="el-form-item">
              <el-form-item prop="collectionGoodsFee">
                <input-cleave v-model.number="temp.collectionGoodsFee" is-css="t-r" is-placeholder="0.00" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
        <el-col class="item">
          <el-row>
            <el-col :span="24" class="el-form-item title">
              <label class="el-form-item__label">代收运费</label>
            </el-col>
            <el-col :span="24" class="el-form-item">
              <el-form-item prop="collectionTransportFee">
                <input-cleave v-model.number="temp.collectionTransportFee" is-css="t-r" is-placeholder="0.00" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
        <el-col class="item">
          <el-row>
            <el-col :span="24" class="el-form-item title">
              <label class="el-form-item__label">垫资款</label>
            </el-col>
            <el-col :span="24" class="el-form-item">
              <el-form-item prop="spotGoodsFee">
                <input-cleave v-model.number="temp.spotGoodsFee" is-css="t-r" is-placeholder="0.00" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
        <el-col class="item">
          <el-row>
            <el-col :span="24" class="el-form-item title">
              <label class="el-form-item__label">提货费</label>
            </el-col>
            <el-col :span="24" class="el-form-item">
              <el-form-item prop="takeGoodsFee">
                <input-cleave v-model.number="temp.takeGoodsFee" is-css="t-r" is-placeholder="0.00" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
        <el-col class="item">
          <el-row>
            <el-col :span="24" class="el-form-item title">
              <label class="el-form-item__label">送货费</label>
            </el-col>
            <el-col :span="24" class="el-form-item">
              <el-form-item prop="sendGoodsFee">
                <input-cleave v-model.number="temp.sendGoodsFee" is-css="t-r" is-placeholder="0.00" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
        <el-col class="item">
          <el-row>
            <el-col :span="24" class="el-form-item title">
              <label class="el-form-item__label">其他费用</label>
            </el-col>
            <el-col :span="24" class="el-form-item">
              <el-form-item prop="otherFee">
                <input-cleave v-model.number="temp.otherFee" is-css="t-r" is-placeholder="0.00" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
        <el-col class="item">
          <el-row>
            <el-col :span="24" class="el-form-item title">
              <label class="el-form-item__label">装卸费</label>
            </el-col>
            <el-col :span="24" class="el-form-item">
              <el-form-item prop="handlingFee">
                <input-cleave v-model.number="temp.handlingFee" is-css="t-r" is-placeholder="0.00" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
        <el-col class="item">
          <el-row>
            <el-col :span="24" class="el-form-item title">
              <label class="el-form-item__label">包装费</label>
            </el-col>
            <el-col :span="24" class="el-form-item">
              <el-form-item prop="packingFee">
                <input-cleave v-model.number="temp.packingFee" is-css="t-r" is-placeholder="0.00" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
        <el-col class="item">
          <el-row>
            <el-col :span="24" class="el-form-item title">
              <label class="el-form-item__label">上楼费</label>
            </el-col>
            <el-col :span="24" class="el-form-item">
              <el-form-item prop="upstairsFee">
                <input-cleave v-model.number="temp.upstairsFee" is-css="t-r" is-placeholder="0.00" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </el-form>
</template>

<script>
export default {
  name: 'FeeNoteInfo',
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
      rules: {
        transportFee: [{ required: true, message: '请填写运费', trigger: 'blur' }]
      }
    }
  },
  mounted() {
    this.$bus.on('bill-form-resetFields', this.resetFields)
  },
  beforeDestroy() {
    this.$bus.off('bill-form-resetFields', this.resetFields)
  },
  methods: {
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
    }
  }
}
</script>

<style lang="scss" scoped>
  .table-el-layout {
    .row {
      border-left: 1px solid #e4e7ed;
      border-top: 1px solid #e4e7ed;
      border-bottom: 1px solid #e4e7ed;
      .item {
        width: 7.59%;
        border-right: 1px solid #e4e7ed;
        &.info-charge {
          width: 8.92% !important;
        }
      }
    }
  }
</style>
