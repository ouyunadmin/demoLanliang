<template>
  <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" label-width="0px">
    <el-row class="row next bottom">
      <el-col class="item">
        <el-form-item prop="goodsName">
          <el-input v-model="temp.goodsName" maxlength="8" placeholder="请输入货物名称" />
        </el-form-item>
      </el-col>
      <el-col class="item">
        <el-form-item prop="goodsAmount">
          <input-cleave v-model.number="temp.goodsAmount" :is-decimal="0" is-placeholder="0" />
        </el-form-item>
      </el-col>
      <el-col class="item">
        <el-form-item prop="goodsWeight">
          <input-cleave v-model.number="temp.goodsWeight" is-css="t-r" is-placeholder="0.00" />
        </el-form-item>
      </el-col>
      <el-col class="item">
        <el-form-item prop="goodsVolume">
          <input-cleave v-model.number="temp.goodsVolume" is-placeholder="0.00" />
        </el-form-item>
      </el-col>
      <el-col class="item price">
        <el-row>
          <el-col :span="10" class="el-form-item">
            <el-form-item prop="goodsPrice">
              <input-cleave v-model.number="temp.goodsPrice" is-css="t-r" is-placeholder="0.00" />
            </el-form-item>
          </el-col>
          <el-col :span="2" class="el-form-item">
            <span class="line">/</span>
          </el-col>
          <el-col :span="12" class="el-form-item goodsUnit">
            <el-form-item prop="goodsPriceUnit">
              <el-select ref="goodsUnit" v-model="temp.goodsPriceUnit" default-first-option filterable clearable placeholder="请选择" data-type="select">
                <el-option
                  v-for="item in optionList.GoodsUnits"
                  :key="item.code"
                  :label="item.desc"
                  :value="item.code"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-col>
      <el-col class="item">
        <div class="el-form-item">
          <el-form-item prop="goodsType">
            <el-select ref="goodsType" v-model="temp.goodsType" name="goodsType" default-first-option filterable clearable placeholder="请选择" data-type="select">
              <el-option
                v-for="item in optionList.GoodsType"
                :key="item.code"
                :label="item.desc"
                :value="item.code"
              />
            </el-select>
          </el-form-item>
        </div>
      </el-col>
      <el-col class="item">
        <div class="el-form-item">
          <el-form-item prop="packageMethods">
            <el-select ref="packageMethods" v-model="temp.packageMethods" default-first-option filterable clearable placeholder="请选择" data-type="select">
              <el-option
                v-for="item in optionList.PackageMethods"
                :key="item.code"
                :label="item.desc"
                :value="item.code"
              />
            </el-select>
          </el-form-item>
        </div>
      </el-col>
      <el-col class="item">
        <div class="el-form-item">
          <el-form-item prop="goodsAttribute">
            <el-select ref="goodsAttribute" v-model="temp.goodsAttribute" default-first-option filterable clearable placeholder="请选择" data-type="select">
              <el-option
                v-for="item in optionList.GoodsAttribute"
                :key="item.code"
                :label="item.desc"
                :value="item.code"
              />
            </el-select>
          </el-form-item>
        </div>
      </el-col>
      <el-col class="item pic">
        <div>
          <el-form-item prop="goodsImage">
            <el-upload
              action=""
              class="pic"
              style="height: 36px;text-align: center"
              :show-file-list="false"
              list-type="picture"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="temp.goodsImage" :src="temp.goodsImage" style="width: 30px;height: 30px;margin-top: 3px">
              <div
                v-if="temp.goodsImage"
                title="删除货物照片"
                class="el-icon-remove dot"
                style="float: right"
                @click.stop.prevent="deleteImg"
              />
              <svg-icon v-if="!temp.goodsImage" icon-class="picture" style="font-size: 30px;vertical-align: middle" />
            </el-upload>
          </el-form-item>
        </div>
      </el-col>
      <el-col class="item off">
        <div class="el-form-item delete">
          <el-popover
            v-model="temp.visible"
            placement="top"
            width="160"
          >
            <p style="padding: 5px 0px 10px; margin: 0;">确认删除?</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="cancelItem">取消</el-button>
              <el-button v-loadClick type="primary" size="mini" @click="deleteItem">确定</el-button>
            </div>
            <span slot="reference" class="el-icon-delete" />
          </el-popover>
        </div>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import { upload } from '@/api/demo/upload'

export default {
  name: 'ConsignGoodsInfoChild',
  props: {
    temp: {
      type: Object,
      default: () => {}
    },
    optionList: {
      type: Object,
      default: () => {
        return { GoodsAttribute: [], PackageMethods: [], GoodsUnits: [], GoodsType: [] }
      }
    },
    index: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      isEdit: this.$attrs['is-edit'],
      // 图片上传格式
      validExtensions: ['png', 'jpg', 'jpeg'],
      rules: {
        goodsName: [{ required: true, message: '请填写货物名称', trigger: 'blur' }],
        goodsAmount: [{ required: true, message: '请填写货物数量', trigger: 'blur' }]
      }
    }
  },
  mounted() {
    this.$bus.on('bill-form-resetFields', this.resetFields)
    this.$bus.on('form-elements-blur', this.selectBlur)
  },
  beforeDestroy() {
    this.$bus.off('bill-form-resetFields', this.resetFields)
    this.$bus.off('form-elements-blur', this.selectBlur)
  },
  methods: {
    // 删除图片
    deleteImg() {
      this.temp.goodsImage = ''
      // this.$refs['dataForm'].validateField('goodsImage')
    },
    // 附件上传动作
    beforeAvatarUpload(file) {
      const ext = file.name.split('.').pop().toLowerCase()
      const isLt2M = file.size / 1024 / 1024 < 5
      if (!this.validExtensions.includes(ext)) {
        this.$message.error('上传车辆照片只能是 ' + this.validExtensions.join(', ') + ' 格式!')
        return false
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 5MB!')
        return false
      }
      upload(file).then(response => {
        if (response.data) {
          this.$nextTick(() => (this.temp.goodsImage = response.data))
          // this.$refs['dataForm'].validateField('goodsImage')
        }
      }).catch(() => {
        this.$message.error('图片上传失败!')
      })
      return false
    },
    cancelItem() {
      this.temp.visible = !this.temp.visible
    },
    // 货物信息删除操作
    deleteItem() {
      this.$emit('remove', this.index)
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
    // select 失焦
    selectBlur() {
      const ref = this.$refs
      ref.goodsUnit.blur()
      ref.goodsType.blur()
      ref.packageMethods.blur()
      ref.goodsAttribute.blur()
    }
  }
}
</script>
