<template>
  <admin-container>
    <template slot="header">地址选择器</template>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card shadow="always" class="admin-mb">
          <div slot="header" class="admin-clearfix">
            <span>地址选择器实例</span>
          </div>
          <choose-area :area-data="areaData" />
        </el-card>

        <el-card shadow="always" class="admin-mb">
          <div slot="header" class="admin-clearfix">
            <span>用法</span>
          </div>
          <div>
            <admin-highlight :code="paramDoc" />
          </div>
        </el-card>
      </el-col>

      <el-col :span="8">
        <el-card shadow="always" class="admin-mb">
          <div slot="header" class="admin-clearfix">
            <span>接口返回格式——查询所有地址</span>
          </div>
          <div>
            <p>后端开发接口需将所有地址返回，按地址级别升序排序返回</p>
            <admin-highlight :code="allRegion" />
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="always" class="admin-mb">
          <div slot="header" class="admin-clearfix">
            <span>接口返回格式——根据用户输入模糊查询三级地址</span>
          </div>
          <div>
            <p>后端开发接口需将所有匹配输入字符三级地址按以下格式返回</p>
            <admin-highlight :code="queryRegionByName" />
          </div>
        </el-card>
      </el-col>
    </el-row>

  </admin-container>
</template>

<script>
import ChooseArea from './components/ChooseArea'
import paramDoc from './paramDoc.js'
import allRegion from './allRegion.js'
import queryRegionByName from './queryRegionByName.js'

export default {
  name: 'PlaygroundChooseArea',
  components: {
    ChooseArea
  },
  data() {
    return {
      paramDoc,
      allRegion,
      queryRegionByName,
      areaData: {
        provinceId: '', // 省份ID
        provinceName: '', // 省份中文
        cityID: '', // 城市ID
        cityName: '', // 城市名称
        districtID: '', // 区/县ID
        districtName: '', // 区/县名称
        detail: '' // 省市区拼接后的详细地址信息
      }
    }
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
.admin-mb{
  overflow: visible;
}
</style>

