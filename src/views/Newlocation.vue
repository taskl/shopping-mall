<template>
  <div>
    <div>
      <van-nav-bar
        left-text="返回"
        :title="this.aid? '编辑地址':'新增地址'"
        left-arrow
        fixed
        @click-left="back"
      />
    </div>
<!-- :show-delete="!!this.aid" -->
    <van-address-edit
      :area-list="areaList"
      show-delete
      :address-info="locationList"
      show-set-default
      show-search-result
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="deleteAddress"
    />
  </div>
</template>

<script>
import { areaList } from "@vant/area-data";
import BackNav from "../components/BackNav.vue";
export default {
  name: "Newlocation",
  data() {
    return {
      areaList,
      aid: "",
      locationList: {},
    };
  },
  components: {
    BackNav,
    areaList,
  },
  created(){
    this.aid = this.$route.params.aid;

    if(this.aid){
        this.ByAid(this.aid)
    }
  },
  methods: {
    back(){
      this.$router.go(-1);
    },
    onSave(content) {
      if (this.aid) {
        this.editAddress(content);
      } else {
        this.Address(content);
      }
    },
    
    onDelete() {
      Toast("delete");
    },
    Address(content) {
      // 复制content
      let address = { ...content };
      address.isDefault = Number(address.isDefault);
      //   删除空值
      delete address.country;
      //   发起添加地址数据请求


      this.axios({
        // 如果是post请求,参数格式,注意
        method: "post",
        url: "/addAddress",
        data: {
          ...address,
        },
      })
        .then((res) => {
          if (res.data.code == 9000) {
            setTimeout(() => {
              this.$router.push({ name: "Mylocation" });
            }, 1000);
          }
        })
        .catch((err) => {});
    },
    // 编辑地址接口
    editAddress(content) {
      let address = { ...content };

      address.isDefault = Number(address.isDefault);
      //   删除空值
      delete address.country;

      //   发起编辑地址请求

      this.axios({
        // 如果是post请求,参数格式,注意
        method: "post",
        url: "/editAddress",
        data: {
          ...address,
          aid: this.aid,
        },
      })
        .then((res) => {

          // 编辑地址成功延时一秒跳转页面

          if (res.data.code == 30000) {
            setTimeout(() => {
              this.$router.go(-1)
            }, 1000);
          }

          //
        })
        .catch((err) => {});
    },
    // 根据地址aid查询地址接口
    ByAid(aid) {

      this.axios({
        // 如果是post请求,参数格式,注意
        method: "get",
        url: "/findAddressByAid",
        params: {
          aid,
        },
      })
        .then((res) => {
          if (res.data.code == 40000) {
            let data = res.data.result[0];
            // isDefault要接收一个布尔值
            data.isDefault = Boolean(data.isDefault);
            this.locationList = data;
          }
        })
        .catch((err) => {});
    },
    // 删除地址接口
    deleteAddress() {

      this.axios({
        // 如果是post请求,参数格式,注意
        method: "post",
        url: "/deleteAddress",
        data: {
          aid: this.aid,
        },
      })
        .then((res) => {
          if (res.data.code == 10000) {
            setTimeout(() => {
              this.$router.push({ name: "Mylocation" });
            }, 1000);
          }

          //
        })
        .catch((err) => {});
    },
  },
};
</script>

<style lang="less" scoped>
/deep/.van-button--danger {
    color: #fff;
    background-color: #0C34BA;
    border: 0.02667rem solid #0C34BA;
}

/deep/.van-address-edit{
  margin-top: 50px;
}
</style>