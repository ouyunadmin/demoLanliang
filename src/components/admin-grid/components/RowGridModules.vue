<template>
  <span v-if="(params.node.id)" class="ag-vue-container" @click="invokeParentMethod"><a href="javascript:void(0);">详情{{ params.value }}</a></span>
</template>

<script>

export default {
  name: 'RowGridModules',
  methods: {
    invokeParentMethod(e) {
      console.log(this.params.context.componentParent.$store.getters.name)
      // addRoutesForm({ 'name': 'detailConsignment', 'query': { 'billNo': this.params.data.id }})
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
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .ag-vue-container {
    a {
      color: #0b8bef;
      &:hover {
        text-decoration: underline;
      }
      &:active {
        color: #0668d2;
      }
    }
  }
</style>
