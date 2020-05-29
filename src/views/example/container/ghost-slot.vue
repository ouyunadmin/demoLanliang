<template>
  <admin-container type="ghost">
    <template slot="header">Header</template>
    <div class="admin-pt admin-pb">
      <el-card shadow="never" class="admin-card" style="width: 400px;">
        <admin-demo-article />
      </el-card>
    </div>
    <template slot="footer">Footer</template>
  </admin-container>
</template>

<script>
import AdminDemoArticle from './components/admin-demo-article'
export default {
  name: 'ContainerGhostSlot',
  components: {
    'admin-demo-article': AdminDemoArticle
  }
}
</script>
