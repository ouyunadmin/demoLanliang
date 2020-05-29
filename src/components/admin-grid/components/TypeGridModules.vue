<template>
  <div>
    <span v-if="params.cellRenderer.type==='url' && !params.node.rowPinned" class="ag-vue-container" @click="invokeParentMethod">
      <a href="javascript:void(0);">{{ params.value }}</a>
    </span>

    <span v-else-if="params.cellRenderer.type==='image' && params.value && !params.node.rowPinned">
      <img border="0" width="42" height="28" :src="params.value" @click="clickImg($event)">
    </span>

    <span v-else-if="params.cellRenderer.type==='html' && params.value && !params.node.rowPinned">
      <!-- {{ params.value && params.value.replace(/<[^>]+>/g, '') }} -->
      {{ params.value | replaceHtml }}
    </span>

    <span v-else-if="params.cellRenderer.type==='input' && !params.node.rowPinned">
      <el-input-number :value="params.value" :precision="params.cellRenderer.precision || 0" :controls="false" size="small" @change="onChange" />
    </span>

    <span v-else>
      {{ params.value }}
    </span>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'TypeGridModules',
  /* computed: {
    data() {
      const fieldName = this.params.colDef.field
      return this.params.context.componentParent.searchGridCellType(fieldName)
    }
  }, */
  filters: {
    replaceHtml: (val) => {
      if (!val) return
      val = val.toString()
      return val.replace(/<[^>]+>/g, '')
    }
  },
  methods: {
    invokeParentMethod(e) {
      this.params.context.componentParent.gridClick(this.params)
    },
    clickImg(e) {
      this.params.context.componentParent.clickImg(this.params.value)
    },
    onChange(val) {
      // console.log(this.params)
      const fieldName = this.params.colDef.field
      this.params.data[fieldName] = val
      // 行修改推送
      this.params.context.componentParent.onRowSelected()
      /* 直接拿表格属性--this.params,将cell值绑定到v-model上*/
      /* for (const i in this.params.data) {
        if (this.params.colDef.field === i) {
          this.params.data[i] = this.params.value
        }
      } */
    }
  }
})
</script>
