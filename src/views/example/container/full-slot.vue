<template>
  <admin-container>
    <template slot="header">Header</template>
    <admin-demo-article />
    <template slot="footer">Footer</template>
  </admin-container>
</template>

<script>
import AdminDemoArticle from './components/admin-demo-article'
export default {
  name: 'ContainerFullSlot',
  components: {
    'admin-demo-article': AdminDemoArticle
  }
}
</script>
