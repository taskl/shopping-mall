<template>
  <div class="shopbagProduct">
    <div class="shopbagProduct-img">
      <img class="auto-img" :src="pro.smallImg" alt="" />
    </div>
    <div class="shopbagProduct-name">
      <div class="shopbagProduct-name-rule">
        <div class="shopbagProduct-zhname one-text">{{ pro.name }}</div>
        <span class="shopbagProduct-rule">{{ pro.rule }}</span>
      </div>
      <div class="shopbagProduct-enname one-text">{{ pro.enname }}</div>
    </div>
    <div class="price">
      <div class="shopbagProduct-price">&yen;{{ pro.price }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "shopbagProduct",
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
.shopbagProduct-img {
  background-color: #e8e8e8;
}

.shopbagProduct-name{
  margin-top: -48px;
  margin-left: -10px;
}

.shopbagProduct-name-rule {
  display: flex;
  align-items: center;
}

.shopbagProduct-zhname {
  font-size: 15px;
}
.shopbagProduct-rule {
  width: 100px;
  height: 16px;
  overflow: hidden;
  overflow-wrap: normal;
  margin-left: 7px;
  font-size: 12px;
  color: #999;
}

.shopbagProduct-enname {
  width: 100px;
  margin-top: 8px;
  overflow: hidden;
  overflow-wrap: normal;
  color: #999;
}
.price {
  position: absolute;
  bottom: 15px;
}
.shopbagProduct-price {
  color: #0c34ba;
  margin-left: -10px;
  font-size: 14px;
  font-weight: bold;
}
</style>