<template>
  <page-detail :is-edit="true" :is-from="from" />
</template>

<script>
import PageDetail from './components/PageDetail'

export default {
  name: 'FormEdit',
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
