<template>
  <div class="OderProducts">
    <div class="OderProducts-img">
      <img class="auto-img" :src="pro.small_img" alt="">
    </div>
    <div class="OderProducts-item">
      <div class="OderProducts-zhname one-text">{{pro.name}} &nbsp;&nbsp;<span class="one-text">{{pro.rule}}</span></div>
    <div class="OderProducts-enname one-text">{{pro.enname}}</div>
    <div class="OderProducts-price">&yen;{{pro.price}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "OderProducts",
  props: {
    pro: {
      type: Object,

      //默认值, 当属性的值为数组或者对象时, 默认值需要使用函数返回
      default() {
        return {};
      },
    },
  },
};
</script>

<style lang="less" scoped>
.OderProducts {
  display: flex;
}
.OderProducts-item{
  margin-left: 10px;
}
.OderProducts-img {
  width: 100px;
  height: 100px;
  background-color: #e8e8e8;
  img{
    width: 100%;
  }
}

.OderProducts-zhname {
  font-size: 14px;
  margin-top: 5px;
  span{
    font-size: 12px;
    color: #999;
  }
}

.OderProducts-enname {
  color: #999;
  width: 100px;
  margin-top: 10px;
}

.OderProducts-price {
  color: #e4393c;
  font-size: 14px;
  margin-top: 30px;
  font-weight: bold;
}
</style>