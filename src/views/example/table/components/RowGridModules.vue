<template>
  <span v-if="!params.node.rowPinned" class="ag-vue-container" @click="invokeParentMethod"><a href="javascript:void(0);">详情{{ params.value }}</a></span>
</template>

<script>
import Vue from 'vue'
import util from '@/libs/util.js'

export default Vue.extend({
  name: 'RowGridModules',
  methods: {
    invokeParentMethod(e) {
      // console.log(this.params.context.componentParent.$store.getters.name)
      util.route.setRoutes({ 'name': 'FormDetail', 'query': { 'billNo': this.params.data.id }})
      // console.log(this.params)
      // console.log(this.params.context.componentParent) // 调用父组件方法
      /* const fieldName = this.params.colDef.field
      switch (fieldName) {
        case 'currency':
          console.log(1)
          break
        case 'value':
          console.log(2)
          break
        default:
          console.log(3)
      } */
      e.stopPropagation()
    }
  }
})
</script>
