<template>
  <admin-container>
    <template slot="header">
      <el-radio-group v-model="showIndex" size="mini">
        <el-radio-button
          v-for="(item, index) in radioOptions"
          :key="index"
          :label="item.value"
        >
          {{ item.label }}
        </el-radio-button>
      </el-radio-group>
    </template>
    <el-row style="margin: -10px;">
      <el-alert title="点击图标复制代码" type="info" class="admin-m-10" style="width: auto;" />
      <el-col v-for="(iconItem, iconIndex) in iconShow.icon" :key="iconIndex" :span="6" class="admin-p-10">
        <admin-icon-cell :icon="iconItem" />
      </el-col>
    </el-row>
  </admin-container>
</template>

<script>
import icon from './data/index'
import elements from '@/mixins/elementsPermission'

export default {
  name: 'IconFont',
  components: {
    'admin-icon-cell': () => import('./components/admin-icon-cell')
  },
  mixins: [
    elements
  ],
  data() {
    return {
      icon,
      showIndex: 7
    }
  },
  computed: {
    iconShow() {
      return this.icon[this.showIndex]
    },
    radioOptions() {
      return this.icon.map((e, index) => ({
        label: e.title,
        value: index
      }))
    }
  },
  mounted() {
    // console.log(__filename)
    // console.log(__dirname)
    // console.log(process)
    // console.log(this.elements['maintenance_organization_dep_btn_add'])
  }
}
</script>
