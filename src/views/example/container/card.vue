<template>
  <admin-container type="card">
    <admin-demo-article />
  </admin-container>
</template>

<script>
import AdminDemoArticle from './components/admin-demo-article'
export default {
  name: 'ContainerCard',
  components: {
    'admin-demo-article': AdminDemoArticle
  }
}
</script>
