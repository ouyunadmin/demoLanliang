<template>
  <admin-container>
    <admin-demo-article />
  </admin-container>
</template>

<script>
import AdminDemoArticle from './components/admin-demo-article'

export default {
  name: 'ContainerFull',
  components: {
    'admin-demo-article': AdminDemoArticle
  }
}
</script>
