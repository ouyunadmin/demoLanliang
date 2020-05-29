const base = `<div class="block">
  <span class="demonstration">默认不区分颜色</span>
  <el-rate v-model="value1"></el-rate>
</div>
<div class="block">
  <span class="demonstration">区分颜色</span>
  <el-rate
    v-model="value2"
    :colors="colors">
  </el-rate>
</div>

<script>
  export default {
    data() {
      return {
        value1: null,
        value2: null,
        colors: ['#99A9BF', '#F7BA2A', '#FF9900'] // 等同于 { 2: '#99A9BF', 4: { value: '#F7BA2A', excluded: true }, 5: '#FF9900' }
      }
    }
  }
</script>`

const text = `<el-rate
  v-model="value"
  show-text>
</el-rate>

<script>
  export default {
    data() {
      return {
        value: null
      }
    }
  }
</script>`

const icon = `<el-rate
  v-model="value"
  :icon-classes="iconClasses"
  void-icon-class="el-icon-eleme"
  :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
</el-rate>

<script>
  export default {
    data() {
      return {
        value: null,
        iconClasses: ['el-icon-error', 'el-icon-success', 'el-icon-warning'] // 等同于 { 2: 'el-icon-error', 4: { value: 'el-icon-success', excluded: true }, 5: 'el-icon-success' }
      }
    }
  }
</script>`

const score = `<el-rate
  v-model="value"
  disabled
  show-score
  text-color="#ff9900"
  score-template="{value}">
</el-rate>

<script>
  export default {
    data() {
      return {
        value: 3.7
      }
    }
  }
</script>`

export default {
  base,
  text,
  icon,
  score
}
