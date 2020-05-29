<template>
  <input
    type="range"
    min="0"
    step="1"
    :value="currentValue"
    :max="maxValue"
    @change="valueChanged($event)"
  >
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'SliderFloatingFilter',
  data: function() {
    return {
      maxValue: 0,
      currentValue: 0
    }
  },
  beforeMount() {
    this.maxValue = this.params.maxValue
  },
  mounted() {},
  methods: {
    valueChanged(event) {
      this.currentValue = event.target.value
      const valueToUse = this.currentValue === 0 ? null : this.currentValue
      this.params.parentFilterInstance(function(instance) {
        instance.onFloatingFilterChanged('greaterThan', valueToUse)
      })
    },

    onParentModelChanged(parentModel) {
      // note that the filter could be anything here, but our purposes we're assuming a greater than filter only,
      // so just read off the value and use that
      this.currentValue = !parentModel ? 0 : parentModel.filter
    },

    buildModel() {
      if (this.currentValue === 0) {
        return null
      }
      return {
        filterType: 'number',
        type: 'greaterThan',
        filter: this.currentValue,
        filterTo: null
      }
    }
  }
})
</script>
