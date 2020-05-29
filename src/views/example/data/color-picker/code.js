const base = `<div class="block">
  <span class="demonstration">有默认值</span>
  <el-color-picker v-model="color1" show-alpha></el-color-picker>
</div>
<div class="block">
  <span class="demonstration">无默认值</span>
  <el-color-picker v-model="color2"></el-color-picker>
</div>

<script>
  export default {
    data() {
      return {
        color1: '#409EFF',
        color2: null
      }
    }
  };
</script>`

export default {
  base
}
