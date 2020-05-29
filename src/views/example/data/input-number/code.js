const base = `<template>
  <el-input-number v-model="num" 
    @change="handleChange" 
    :min="1" 
    :max="10" 
    :step="2"
    step-strictly
    label="描述文字">
  </el-input-number>
</template>
<script>
  export default {
    data() {
      return {
        num: 1
      };
    },
    methods: {
      handleChange(value) {
        console.log(value);
      }
    }
  };
</script>`

const disable = `<template>
  <el-input-number v-model="num" :disabled="true"></el-input-number>
</template>
<script>
  export default {
    data() {
      return {
        num: 1
      }
    }
  };
</script>`

export default {
  base,
  disable
}
