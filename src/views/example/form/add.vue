<template>
  <page-detail :is-edit="false" :is-from="from" />
</template>

<script>
import PageDetail from './components/PageDetail'

export default {
  name: 'FormAdd',
  components: { PageDetail },
  data() {
    return {
      from: null
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.from = from
    })
  }
}
</script>
