<template>
  <admin-container>
    <template slot="header">高阶组件</template>

    <base-component :test="100" @customize-click="handleCustClick">
      <h2 slot="slot1">BaseComponent slot</h2>
      <p>default slot</p>
    </base-component>
    <enhanced-com :test="100" @customize-click="handleCustClick">
      <h2 slot="slot1">EnhancedComponent slot</h2>
      <p>default slot</p>
    </enhanced-com>
  </admin-container>
</template>

<script>
import BaseComponent from './components/base-component.vue'
import hoc from './hoc.js'

const EnhancedCom = hoc(BaseComponent)

export default {
  name: 'PlaygroundHoc',
  components: {
    BaseComponent,
    EnhancedCom
  },
  methods: {
    handleCustClick() {
    }
  }
}
</script>

<style>
</style>
