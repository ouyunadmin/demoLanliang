<template>
  <div class="picture">
    <img :src="image">
    <div class="picture-item">
      <div class="item-subTitle">商品编码
        <div>标签</div>
      </div>
      <div class="item-title">商品主标题即SKU名称</div>
    </div>
  </div>
</template>
<script>
import image from '@/assets/images/defaultImg_icon.png'

export default {
  name: 'PictureComponent',
  data() {
    return {
      image
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.picture {
  display: flex;
  height: 70px;
  align-items: center;
  img {
    width: 40px;
    height: 40px;
    margin-left: 10px;
    cursor: pointer;
  }
  .picture-item {
    flex: 1;
    margin-left: 8px;
    text-align: left;
    line-height: 20px;
    .item-subTitle {
      font-size: 15px;
      div{
        display: inline-block;
        border: 1px solid #ddd;
        width: 40px;
        line-height: 23px;
        height: 23px;
        text-align: center;
        border-radius: 3px;
        font-size: 13px;
      }
    }
    .item-title{
      font-size: 16px;
      margin-top: 3px;
    }
  }
}
</style>

