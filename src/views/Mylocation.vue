<template>
  <div>
    <div>
      <BackNav left-arrow left-text="返回" title="地址列表" />
    </div>

    <div class="top"></div>
    <div class="location_box">
      <van-address-list
        v-model="chosenAddressId"
        :list="list"
        default-tag-text="默认"
        @add="onAdd"
        @edit="onEdit"
        @select="toggleAddress"
      />
    </div>
  </div>
</template>

<script>
import BackNav from "../components/BackNav.vue";
export default {
  name: 'Mylocation',
  data() {
    return {
      chosenAddressId: '1',
      list: [],
    };
  },
  components: {
    BackNav,
  },
  created() {
      this.getAddressData();
  },
  methods: {
    onAdd() {
      this.$router.push({ name: "Newlocation" });
    },
    onEdit(item) {
      this.$router.push({ name: "Newlocation" , params: {aid: item.aid}});
    },
    // 切换地址接口
    toggleAddress(item) {
            let timer = setTimeout(() => {
              clearTimeout(timer);
              // 调用查询用户信息方法更新页面数据
              // this.Oderover();
            }, 1000);

      this.$router.push({ name: "Oderover", query: { aids: item.aid } });
    },
    //查询地址接口
    getAddressData() {

      this.axios({
        method: "get",
        url: "/findAddress",
      })
        .then((res) => {
          if (res.data.code === 20000) {
            res.data.result.forEach((item, index) => {
              item["address"] =
                item.province +
                item.city +
                item.county +
                item.addressDetail +
                item.areaCode;
            });

            this.list = res.data.result;
          }

        
        })
        .catch((err) => {});
    },
  },
};
</script>

<style lang="less" scoped>
.top {
  width: 100%;
  height: 100px;
  background-color: #0c34ba;
}
.location_box{
  width: 92%;
  // height: 300px;
  margin: -30px auto;
  border-radius: 10px;
  // background-color: #fff;
}
/deep/.van-tag--danger{
  background-color: #0C34BA;
}
/deep/.van-button{
  border: solid #0C34BA;
  background-color: #0C34BA;
}
</style>