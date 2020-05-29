const base = `<template>
  <el-row class="mb-20">
    <el-radio v-model="radio" label="1">备选项</el-radio>
    <el-radio v-model="radio" label="2">备选项</el-radio>
   </el-row> 
</template>

<script>
  export default {
    data () {
      return {
        radio: '1'
      }
    }
  }
</script>`

const disable = `<template>
  <el-row class="mb-20">
    <el-radio disabled v-model="radio1" label="禁用">备选项</el-radio>
    <el-radio disabled v-model="radio1" label="选中且禁用">备选项</el-radio>
  </el-row>
</template>

<script>
  export default {
    data () {
      return {
        radio1: '选中且禁用'
      }
    }
  }
</script>`

const single = `<template>
  <el-radio-group v-model="radio2">
    <el-radio :label="3">备选项</el-radio>
    <el-radio :label="6">备选项</el-radio>
    <el-radio :label="9">备选项</el-radio>
  </el-radio-group>
</template>

<script>
  export default {
    data () {
      return {
        radio2: 3
      }
    }
  }
</script>`

const button = `<template>
  <el-radio-group v-model="radio3" size="medium">
    <el-radio-button label="上海"></el-radio-button>
    <el-radio-button label="北京"></el-radio-button>
    <el-radio-button label="广州"></el-radio-button>
    <el-radio-button label="深圳"></el-radio-button>
  </el-radio-group>
</template>
<script>
  export default {
    data () {
      return {
        radio3: '上海'
      }
    }
  }
</script>`

const border = `<template>
  <el-row class="mb-20">
    <el-radio v-model="radio4" label="1" border>备选项1</el-radio>
    <el-radio v-model="radio4" label="2" border>备选项2</el-radio>
  </el-row>
<template>

<script>
  export default {
    data () {
      return {
        radio4: '1'
      }
    }
  }
</script>`

export default {
  base,
  disable,
  single,
  button,
  border
}
