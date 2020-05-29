export default `
<template>
  <div class="wrapper">
    <!-- disabled: false, // 是否禁用 默认false -->
    <!-- className: '', // 当需要特殊处理时自定义css，eg: move-left -->
    <!-- handleClear() // 该方法用于手动清除当前选择地址信息 -->
    <choose-area :area-data="areaData" placeholder='placeholder'
      :disabled="false" :class-name="move-left">
    </choose-area>
  </div>
</template>
<script>
import ChooseArea from './components/ChooseArea'
export default {
  components: {
    ChooseArea
  },
  data() {
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
}
</script>

`
