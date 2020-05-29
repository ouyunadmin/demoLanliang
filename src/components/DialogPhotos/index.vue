<template>
  <div v-if="dialogVisiblePhotos" class="photosDialog" @click="changeVisiblePhotos">
    <div class="bg" />
    <div class="imgbox">
      <img :src="dialogImg" alt="">
    </div>
  </div>
</template>
<script>
export default {
  name: 'PaymentDetail',
  props: {
    dialogImg: {
      type: String,
      default: ''
    },
    dialogVisiblePhotos: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {

    }
  },
  methods: {
    changeVisiblePhotos() {
      this.$emit('changeVisiblePhotos', false)
    }
  }
}
</script>
<style lang="scss" scoped>
  .photosDialog{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 9999;
  .bg{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: #000;
    opacity:0.8;
  }
  .imgbox{
    margin: 50vh auto 0;
    transform: translateY(-50%);
    text-align: center;
  }
  img{
    position: relative;
    width:auto;
    max-width:100%;
    display: inline-block;
    vertical-align: middle;
  }
  }
</style>
