<template>
  <admin-container type="ghost">
    <div class="admin-pt admin-pb">
      <el-card shadow="never" class="admin-card" style="width: 400px;">
        <admin-demo-article />
      </el-card>
    </div>
  </admin-container>
</template>

<script>
import AdminDemoArticle from './components/admin-demo-article'
export default {
  name: 'ContainerGhost',
  components: {
    'admin-demo-article': AdminDemoArticle
  }
}
</script>
