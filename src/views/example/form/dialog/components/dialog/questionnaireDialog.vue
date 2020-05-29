<template>
  <admin-dialog
    :title="textMap[dialogStatus]"
    width="1000px"
    :fullscreen="true"
    :visible="dialogForm.visible"
    :cancel="cancel"
  >
    <el-form ref="dataForm" :model="temp" label-position="right" label-width="0" style="max-width: 1000px; margin: 0 auto;">
      <table class="table-border center fixed fit detail">
        <colgroup>
          <col width="10%">
          <col width="23%">
          <col width="10%">
          <col width="23%">
          <col width="10%">
          <col width="24%">
        </colgroup>
        <tr>
          <th colspan="6" class="admin-text-left title"><svg-icon icon-class="list" /> 基本信息</th>
        </tr>
        <tr>
          <th class="admin-text-right">公司名称</th>
          <td class="admin-text-left">{{ dialogForm.produceOrgName }}</td>
          <th class="admin-text-right">危废名称</th>
          <td class="admin-text-left">{{ info.trashName }}</td>
          <th class="admin-text-right">危废代码</th>
          <td class="admin-text-left">{{ info.trashCode }}</td>
        </tr>
      </table>

      <table class="table-border center fixed fit detail el-ml-2 el-focus-no admin-mt-10">
        <colgroup>
          <col width="11%">
          <col width="11%">
          <col width="11%">
          <col width="11%">
          <col width="11%">
          <col width="11%">
          <col width="11%">
          <col width="11%">
          <col width="12%">
        </colgroup>
        <tr>
          <th colspan="9" class="admin-text-left title"><svg-icon icon-class="list" /> 危废信息调查表</th>
        </tr>
        <tr>
          <th class="admin-text-right bottom-black">物理形态</th>
          <td class="admin-text-left bottom-black" colspan="8">
            <el-form-item label="" prop="physicsShape">
              <el-radio-group
                v-model="temp.physicsShape"
              >
                <el-radio v-for="(item,index) in options" :key="index" :label="item.label" fill="#FFF" @click.native.prevent="clickitem(item.label, 'physicsShape')">
                  {{ item.label }}
                  <el-input v-if="index === 6" v-model.trim="temp.physicsShapeRemark" placeholder="" class="input" />
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <th class="admin-text-right">挥发性</th>
          <td class="admin-text-left" colspan="3">
            <el-form-item label="" prop="volatility">
              <el-radio-group v-model="temp.volatility" class="quality">
                <el-radio label="无" @click.native.prevent="clickitem('无', 'volatility')" />
                <el-radio label="中等" @click.native.prevent="clickitem('中等', 'volatility')" />
                <el-radio label="强力" @click.native.prevent="clickitem('强力', 'volatility')" />
              </el-radio-group>
            </el-form-item>
          </td>
          <th class="admin-text-right">粘度</th>
          <td class="admin-text-left" colspan="4">
            <el-form-item label="" prop="viscosity">
              <el-radio-group v-model="temp.viscosity" class="quality">
                <el-radio label="高" @click.native.prevent="clickitem('高', 'viscosity')" />
                <el-radio label="中" @click.native.prevent="clickitem('中', 'viscosity')" />
                <el-radio label="低" @click.native.prevent="clickitem('低', 'viscosity')" />
              </el-radio-group>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <th class="admin-text-right">气味</th>
          <td class="admin-text-left" colspan="3">
            <el-form-item label="" prop="smell">
              <el-radio-group v-model="temp.smell" class="quality">
                <el-radio label="无" @click.native.prevent="clickitem('无', 'smell')" />
                <el-radio label="温和" @click.native.prevent="clickitem('温和', 'smell')" />
                <el-radio label="刺激" @click.native.prevent="clickitem('刺激', 'smell')" />
              </el-radio-group>
            </el-form-item>
          </td>
          <th class="admin-text-right">分层</th>
          <td class="admin-text-left" colspan="4">
            <el-form-item label="" prop="layered">
              <el-radio-group v-model="temp.layered" class="quality">
                <el-radio label="单层" @click.native.prevent="clickitem('单层', 'layered')" />
                <el-radio label="双层" @click.native.prevent="clickitem('双层', 'layered')" />
                <el-radio label="多层" @click.native.prevent="clickitem('多层', 'layered')" />
              </el-radio-group>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <th class="admin-text-right">水溶性</th>
          <td class="admin-text-left" colspan="3">
            <el-form-item label="" prop="waterSolubility">
              <el-radio-group v-model="temp.waterSolubility" class="quality">
                <el-radio label="溶" @click.native.prevent="clickitem('溶', 'waterSolubility')" />
                <el-radio label="不溶" @click.native.prevent="clickitem('不溶', 'waterSolubility')" />
              </el-radio-group>
            </el-form-item>
          </td>
          <th class="admin-text-right">醇溶性</th>
          <td class="admin-text-left" colspan="4">
            <el-form-item label="" prop="alcoholSolubility">
              <el-radio-group v-model="temp.alcoholSolubility" class="quality">
                <el-radio label="溶" @click.native.prevent="clickitem('溶', 'alcoholSolubility')" />
                <el-radio label="不溶" @click.native.prevent="clickitem('不溶', 'alcoholSolubility')" />

              </el-radio-group>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <th class="admin-text-right bottom-black">颜色</th>
          <td class="admin-text-left bottom-black" colspan="2">
            <el-form-item label="" prop="color">
              <el-input v-model.trim="temp.color" placeholder="" />
            </el-form-item>
          </td>
          <th class="admin-text-right bottom-black">含水率</th>
          <td class="admin-text-left bottom-black" colspan="2">
            <el-form-item label="" prop="moistureContent">
              <!--<el-input v-model.trim="temp.moistureContent" placeholder=""></el-input>%-->
              <input-cleave v-model.number="temp.moistureContent" :is-decimal="2" is-placeholder="" /> <span class="unit">%</span>
            </el-form-item>
          </td>
          <th class="admin-text-right bottom-black">灰份</th>
          <td class="admin-text-left bottom-black" colspan="2">
            <el-form-item label="" prop="ashContent">
              <!--<el-input v-model.trim="temp.ashContent" placeholder=""></el-input>%-->
              <input-cleave v-model.number="temp.ashContent" :is-decimal="2" is-placeholder="" /> <span class="unit">%</span>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <th class="admin-text-right bottom-black">有害成分</th>
          <td class="admin-text-left bottom-black" colspan="8">
            <el-form-item label="" prop="harmfulIngredientList">
              <el-checkbox-group
                v-model="temp.harmfulIngredientList"
                class="ingredients"
              >
                <el-checkbox v-for="(item,index) in options1" :key="index" :label="item.label" />
              </el-checkbox-group>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <th class="admin-text-right bottom-black">酸碱性</th>
          <td class="admin-text-left bottom-black" colspan="3">
            <el-form-item label="" prop="acidBaseProperties">
              <el-radio-group v-model="temp.acidBaseProperties" class="quality">
                <el-radio label="酸性" @click.native.prevent="clickitem('酸性', 'acidBaseProperties')" />
                <el-radio label="中性" @click.native.prevent="clickitem('中性', 'acidBaseProperties')" />
                <el-radio label="SJX" @click.native.prevent="clickitem('SJX', 'acidBaseProperties')" />
              </el-radio-group>
            </el-form-item>
          </td>
          <th class="admin-text-right bottom-black">闪点</th>
          <td class="admin-text-left bottom-black" colspan="4">
            <el-form-item label="" prop="flashPoint">
              <el-radio-group v-model="temp.flashPoint" class="quality">
                <el-radio label="<28℃" @click.native.prevent="clickitem('<28℃', 'flashPoint')" />
                <el-radio label="28~60℃" @click.native.prevent="clickitem('28~60℃', 'flashPoint')" />
                <el-radio label=">60℃" @click.native.prevent="clickitem('>60℃', 'flashPoint')" />
              </el-radio-group>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <th class="admin-text-right bottom-black">危险特性</th>
          <td class="admin-text-left bottom-black" colspan="8">
            <el-form-item label="" prop="hazardCharacteristicsList">
              <el-checkbox-group
                v-model="temp.hazardCharacteristicsList"
              >
                <el-checkbox v-for="(item,index) in options2" :key="index" :label="item.label">
                  {{ item.label }}
                  <el-input v-if="index === 6" v-model.trim="temp.hazardCharacteristicsRemark" placeholder="" class="input" />
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <th class="admin-text-right">包装需求</th>
          <td class="admin-text-left" colspan="8">
            <el-form-item label="" prop="packagingRequirement">
              <el-radio-group v-model="temp.packagingRequirement" class="quality">
                <el-radio label="厂家自备" @click.native.prevent="clickitem('厂家自备', 'packagingRequirement')" />
                <el-radio label="处置企业提供" @click.native.prevent="clickitem('处置企业提供', 'packagingRequirement')" />
              </el-radio-group>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <th class="admin-text-right bottom-black">包装方式</th>
          <td class="admin-text-left bottom-black" colspan="8">
            <el-form-item label="" prop="packagingMethodList">
              <el-checkbox-group
                v-model="temp.packagingMethodList"
              >
                <el-checkbox v-for="(item,index) in options3" :key="index" :label="item.label">
                  {{ item.label }}
                  <el-input v-if="index === 5" v-model.trim="temp.packagingMethodRemark" placeholder="" class="input" />
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <th class="admin-text-right">生产工艺</th>
          <td class="admin-text-left" colspan="3">
            <el-form-item label="" prop="productionProcess">
              <el-input v-model.trim="temp.productionProcess" placeholder="" />
            </el-form-item>
          </td>
          <th class="admin-text-right">原辅材料</th>
          <td class="admin-text-left" colspan="4">
            <el-form-item label="" prop="rawAndAuxiliaryMaterials">
              <el-input v-model.trim="temp.rawAndAuxiliaryMaterials" placeholder="" />
            </el-form-item>
          </td>
        </tr>
        <tr>
          <th class="admin-text-right">产生源</th>
          <td class="admin-text-left" colspan="3">
            <el-form-item label="" prop="productionSource">
              <el-input v-model.trim="temp.productionSource" placeholder="" />
            </el-form-item>
          </td>
          <th class="admin-text-right">备注</th>
          <td class="admin-text-left" colspan="4">
            <el-form-item label="" prop="remark">
              <el-input v-model.trim="temp.remark" placeholder="" />
            </el-form-item>
          </td>
        </tr>
      </table>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click.native="cancel">取 消</el-button>
      <el-button type="primary" :loading="loading" @click.native="update('dataForm')">保 存</el-button>
    </div>
  </admin-dialog>
</template>

<script>
import elements from '@/mixins/elementsPermission'
import { cloneDeep } from 'lodash'

const defaultForm = {
  physicsShape: '',
  // 物理形态备注
  physicsShapeRemark: '',
  volatility: '',
  viscosity: '',
  smell: '',
  layered: '',
  waterSolubility: '',
  alcoholSolubility: '',
  color: '',
  moistureContent: '',
  ashContent: '',
  harmfulIngredientList: [],
  acidBaseProperties: '',
  flashPoint: '',
  hazardCharacteristicsList: [],
  hazardCharacteristicsRemark: '',
  packagingRequirement: '',
  packagingMethodList: [],
  packagingMethodRemark: '',
  productionProcess: '',
  rawAndAuxiliaryMaterials: '',
  productionSource: '',
  remark: ''
}

export default {
  name: 'QuestionnaireDialog',
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
      options: [
        { label: '固态(S)' },
        { label: '半固态(SS)' },
        { label: '液态(L)' },
        { label: '气态(G)' },
        { label: '灰' },
        { label: '渣' },
        { label: '其他' }
      ],
      options1: [
        { label: '卤素（氟氯溴碘）' },
        { label: '硫' },
        { label: '磷' },
        { label: '汞' },
        { label: '砷' },
        { label: '氰化物' },
        { label: '重金属（铬铜锌镉铅镍其他）' },
        { label: '强酸' },
        { label: '强碱' },
        { label: '有机物' },
        { label: '可溶性盐' },
        { label: '氧化性' },
        { label: '硫化物' },
        { label: '聚合性' },
        { label: '挥发酚' },
        { label: '其他' }
      ],
      options2: [
        { label: '毒性' },
        { label: '易燃性' },
        { label: '爆炸性' },
        { label: '腐蚀性' },
        { label: '传染性' },
        { label: '毒性，易燃性' },
        { label: '其他' }
      ],
      options3: [
        { label: '桶装' },
        { label: '袋装' },
        { label: '密封槽罐' },
        { label: '捆绑' },
        { label: '槽罐' },
        { label: '其他' }
      ],
      loading: false,
      // 接收数据
      data: this.dialogForm,
      dialogStatus: '',
      textMap: {
        update: '危废信息调查表'
      },
      // 页面绑定元素
      temp: cloneDeep(defaultForm),
      info: {}
    }
  },
  methods: {
    // 点击选中/取消值
    clickitem(id, res) {
      id === this.temp[res] ? this.temp[res] = '' : this.temp[res] = id
    },
    // 取消
    cancel(done) {
      this.dialogForm.visible = false
      // this.$refs['dataForm'].resetFields()
      // this.temp = cloneDeep(defaultForm)
      this.loading = false
    },
    // 修改数据
    update(formName) {
      const set = this.$refs
      set[formName].validate(valid => {
        if (valid) {
          const temp = cloneDeep(this.temp)
          this.$emit('updateList', temp, this.dialogForm.index)
          this.cancel()
          /* this.$notify({
            title: '成功',
            message: '保存成功',
            type: 'success',
            duration: 2000
          }) */
        } else {
          setTimeout(() => {
            this.$el.querySelector('.is-error').querySelector('input').focus()
          }, 200)
          return false
        }
      })
    },
    // 初始数据
    init() {
      this.dialogStatus = 'update'
      this.temp = cloneDeep(defaultForm)
      const res = cloneDeep(this.dialogForm.data)
      Object.assign(this.info, res)
      Object.assign(this.temp, res.researchFormDTO)
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.setting-dialog {
  .el-checkbox+.el-checkbox {
    margin-left: 0px;
  }
  .el-checkbox-group .el-checkbox {
    float: left;
    margin-right: 26px;
  }
  .el-radio+.el-radio {
    margin-left: 0px;
  }
  .el-radio-group .el-radio {
    float: left;
    margin-right: 26px;
  }
  .ingredients {
    &.el-checkbox-group .el-checkbox {
      float: left;
      width: 206px;
      margin-right: 0px;
    }
  }
  .quality {
    &.el-radio-group .el-radio {
      float: left;
      width: 80px;
      margin-right: 0px;
    }
  }
  .bottom-black {
    border-bottom: 1px solid #666;
  }
}
.detail {
  th {
    font-weight: 500;
  }
}
.table-border {
  td {
    .unit {
      position: absolute;
      right: 5px;
    }
  }
}
</style>
