<template>
  <admin-container better-scroll>
    <template slot="header">Header</template>
    <admin-demo-article />
    <template slot="footer">Header</template>
  </admin-container>
</template>

<script>
import AdminDemoArticle from './components/admin-demo-article'
export default {
  name: 'ContainerFullBs',
  components: {
    'admin-demo-article': AdminDemoArticle
  }
}
</script>
