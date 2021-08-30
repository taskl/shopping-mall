<template>
  <div class="product">
    <div class="product-img">
      <img class="auto-img" :src="pro.smallImg" alt="">
    </div>
    <div class="product-zhname one-text">{{pro.name}}</div>
    <div class="product-enname one-text">{{pro.enname}}</div>
    <div class="product-price">&yen;{{pro.price}}</div>
  </div>
</template>

<script>
  export default {
    name: 'Product',
    props: {
      pro: {
        type: Object,

        //默认值, 当属性的值为数组或者对象时, 默认值需要使用函数返回
        default() {
          return {};
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .product{
   background-color:#fff;
   border-radius: 10px;
   overflow: hidden;
  } 
  .product-img{
    width: 90%;
    margin: 7px auto;
    background-color: #fff;
    .auto-img{
      width: 100%;
      border-radius: 10px;
      overflow: hidden;
    }
  }

  .product-zhname{
    font-size: 14px;
    margin-top: 10px;
    margin-left: 10px;
  }

  .product-enname{
    color: #999;
    margin-left: 10px;
  }

  .product-price{
    color: #0C34BA;
    font-size: 14px;
    margin-top: 5px;
    font-weight: bold;
    margin-left: 10px;
    padding-bottom: 5px;
  }

</style>