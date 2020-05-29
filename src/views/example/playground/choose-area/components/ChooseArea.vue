<template>
  <div class="choose-area-wrap">
    <el-autocomplete
      ref="chooseArea"
      v-model="areaData.detail"
      size="mini"
      style="width: 100%"
      :fetch-suggestions="searchAreaByName"
      :placeholder="placeholder"
      :trigger-on-focus="false"
      :disabled="disabled"
      clearable
      @focus="handleFocus"
      @select="handleSelect"
      @clear="handleClear"
      @blur="handleBlur"
    >
      <template slot-scope="{ item }">
        <span :title="item.spell">{{ item.spell }}</span>
      </template>
    </el-autocomplete>
    <div v-if="showAreaWrap || focusing" class="area-wrap-fade" @click="closeDialog()" />
    <div v-if="showAreaWrap" class="area-wrap" :class="className">
      <div class="area-wrap-title">
        <span class="item" :class="{'active': tab === 'province'}" @click="tabClick('province')">省份</span>
        <span class="item" :class="{'active': tab === 'city'}" @click="tabClick('city')">城市</span>
        <span class="item" :class="{'active': tab === 'district'}" @click="tabClick('district')">县区</span>
        <span class="item close" @click="closeDialog()">关闭</span>
        <!-- <el-button>关闭</el-button> -->
      </div>
      <div v-if="tab === 'province'" class="areas">
        <span v-for="item in provinceList" :key="item.regionid" class="area-item" :class="{'active': areaData.provinceId == item.regionid}" @click="areaItemClick(item, 'province')">{{ item.name }}</span>
      </div>
      <div v-if="tab === 'city'" class="areas">
        <span v-for="item in cityList" :key="item.regionid" class="area-item" :class="{'active': areaData.cityId == item.regionid}" @click="areaItemClick(item, 'city')">{{ item.name }}</span>
      </div>
      <div v-if="tab === 'district'" class="areas">
        <span v-for="item in districtList" :key="item.regionid" class="area-item" :class="{'active': areaData.districtId == item.regionid}" @click="areaItemClick(item, 'district')">{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>
<script>
/**
 * 地址选择插件
 * props: areaData必传参数
 */
import { fuzzyQueryByName, getAllProvince, getAllRegion } from '@/api/common/area' // queryByParentId
import { findIndex } from 'lodash'
export default {
  name: 'ChooseArea',
  props: {
    placeholder: {
      type: String,
      default: '请选择地址'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    className: {
      type: String,
      default: ''
    },
    areaData: {
      type: Object,
      default: () => {
        return {
          provinceId: '', // 省份ID
          provinceName: '', // 省份中文
          cityId: '', // 城市ID
          cityName: '', // 城市名称
          districtId: '', // 区/县ID
          districtName: '', // 区/县名称
          detail: '' // 省市区拼接后的详细地址信息
        }
      }
    }
  },
  data() {
    return {
      tab: 'province',
      searchAreaList: [],
      provinceList: [],
      cityList: [],
      districtList: [],
      showAreaWrap: false,
      focusing: false,
      hasClick: false,
      chooseType: 'itemClick' // 地址选择类型 itemClick 通过弹窗自己选择、search 搜索
    }
  },
  created() {
    // if (this.default) {
    //   this.provinceId = this.default.provinceId
    //   this.cityId = this.default.cityId
    //   this.districtId = this.default.districtId
    // }
    // this.queryAllProvince()
    this.queryAllRegion()
  },
  methods: {
    async queryAllRegion() {
      const { data } = await getAllRegion()
      const provinceObj = {}
      for (let i = 0; i < data.length; i++) {
        const item = data[i]
        if (item.level === 1) {
          provinceObj[item.regionid] = item
          provinceObj[item.regionid]['children'] = {}
        } else if (item.level === 2) {
          provinceObj[item.parentId]['children'][item.regionid] = item
          provinceObj[item.parentId]['children'][item.regionid]['children'] = {}
        } else if (item.level === 3) {
          provinceObj[item.provinceId]['children'][item.parentId]['children'][item.regionid] = item
        }
      }
      this.provinceList = this.parseObjectToArray(provinceObj)
      // console.log(this.provinceList)
    },
    parseObjectToArray(json) {
      const array = []
      for (const item in json) {
        array.push(json[item])
      }
      return array
    },
    searchAreaByName(queryString, cb) {
      this.showAreaWrap = false
      fuzzyQueryByName({
        name: this.areaData.detail
      }).then(res => {
        // console.log(res)
        const { data } = res
        if (data.length > 0) {
          cb(data)
        } else {
          this.areaData.detail = ''
          cb(data)
        }
      }).catch(error => {
        console.log(error)
      })
    },
    async queryAllProvince() {
      const result = await getAllProvince()
      const { data } = result
      this.provinceList = data
    },
    tabClick(type) {
      if (type === 'city' && !this.areaData.provinceId) {
        return this.$message({
          message: '请先选择上一级区域！',
          type: 'warning'
        })
      }
      if (type === 'district' && !this.areaData.cityId) {
        return this.$message({
          message: '请先选择上一级区域！',
          type: 'warning'
        })
      }
      if (!this.hasClick) {
        return false
      }
      this.tab = type
    },
    areaItemClick(item, type) {
      this.hasClick = true
      if (type === 'province') {
        this.areaData.provinceName = item.name
        this.areaData.provinceId = item.regionid
        this.areaData.cityName = ''
        this.areaData.cityId = ''
        this.areaData.districtName = ''
        this.areaData.districtId = ''
        this.areaData.detail = item.name
        this.cityList = this.parseObjectToArray(item.children)
      }
      if (type === 'city') {
        this.areaData.cityName = item.name
        this.areaData.cityId = item.regionid
        this.areaData.districtName = ''
        this.areaData.districtId = ''
        this.areaData.detail = this.areaData.provinceName + '-' + item.name
        this.districtList = this.parseObjectToArray(item.children)
      }
      if (type === 'district') {
        this.areaData.districtName = item.name
        this.areaData.districtId = item.regionid
        this.areaData.detail = item.name ? this.areaData.provinceName + '-' + this.areaData.cityName + '-' + item.name : this.areaData.provinceName + '-' + this.areaData.cityName
        this.showAreaWrap = false
        this.focusing = false
        this.$emit('areaChange', this.areaData)
        return
      }
      this.queryAreasByParentId(type)
    },
    async queryAreasByParentId(type) {
      if (type === 'province') {
        this.tabClick('city')
      } else if (type === 'city') {
        return this.tabClick('district')
      }
    },
    async handleSelect(item) {
      // const mockData = {
      //   "regionid":"330104",
      //   "name":"江干区",
      //   "spell":"浙江省-杭州市-江干区",
      //   "parentid":330100,
      //   "layer":3,
      //   "provinceId":330000,
      //   "provinceName":"浙江省",
      //   "cityId":330100,
      //   "cityName":"杭州市",
      // }
      const { regionid, provinceId, cityId } = item
      this.areaData.detail = item.spell
      this.chooseType = 'search'
      const index = findIndex(this.provinceList, (item) => {
        return item.regionid === provinceId
      })
      await this.areaItemClick(this.provinceList[index], 'province')
      const cityIndex = findIndex(this.cityList, (item) => {
        return item.regionid === cityId
      })
      await this.areaItemClick(this.cityList[cityIndex], 'city')
      const districtIndex = findIndex(this.districtList, (item) => {
        return item.regionid === regionid
      })
      await this.areaItemClick(this.districtList[districtIndex], 'district')
      // if (level === 3) {
      this.showAreaWrap = false
      // } else {
      //   this.showAreaWrap = true
      // }
    },
    handleBlur() {
      // 清除联想
      setTimeout(() => {
        this.$refs.chooseArea.suggestions = []
      }, 200)
    },
    closeDialog() {
      // 取消选择时，如果区级ID为空的话 则清除此次选择的结果
      if (!this.areaData.districtId) {
        this.handleClear()
      }
      this.focusing = false
      this.showAreaWrap = false
    },
    handleClear() {
      this.areaData.provinceName = ''
      this.areaData.provinceId = ''
      this.areaData.cityName = ''
      this.areaData.cityId = ''
      this.areaData.districtName = ''
      this.areaData.districtId = ''
      this.areaData.detail = ''
      this.tabClick('province')
    },
    handleFocus() {
      this.focusing = true
      this.showAreaWrap = true
      this.chooseType = 'itemClick'
    }
  }
}
</script>
<style lang="scss" scoped>
.choose-area-wrap{
  position: relative;
  display: inline-block;
  .area-wrap-fade{
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1;
  }
  .area-wrap{
    width: 495px;
    min-height: 120px;
    position: absolute;
    background: #FFFFFF;
    box-sizing: border-box;
    padding: 0 10px;
    z-index: 2;
    border: 1px solid #CCC;
    border-top: none;
    margin-top: 5px;
    &.move-left{
      right: 0;
    }
    .area-wrap-title{
      width: 100%;
      height: 50px;
      line-height: 30px;
      border-bottom: 1px solid #CCC;
      padding: 10px 0;
      box-sizing: border-box;
      font-size: 0;
      position: relative;
      .item{
        display: inline-block;
        font-size: 14px;
        width: 50px;
        height: 30px;
        vertical-align: top;
        text-align: center;
        color: #000;
        cursor: pointer;
        &.active{
          background: #34b2fb;
          color: #ffffff;
        }
        &.close{
          position: absolute;
          right: 0;
          background: #e23f42;
          color: #FFFFFF;
          border-radius: 3px;
        }
      }
    }
    .areas{
      font-size: 0;
      .area-item{
        width: auto;
        display: inline-block;
        font-size: 14px;
        height: 25px;
        line-height: 25px;
        padding: 0 10px;
        cursor: pointer;
        &:hover{
          color: #34b2fb;
        }
        &.active{
          color: #34b2fb;
        }
      }
    }
  }
}
</style>

