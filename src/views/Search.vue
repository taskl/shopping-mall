<template>
  <div>
    <div class="box">
      <div class="left">
        <BackNav left-arrow left-text="返回" />
      </div>
      <div class="right">
        <van-search
        v-model="value"
          show-action
          placeholder="请输入商品名称"
          @search="getsearch"
        >
          <template #action>
            <div @click="getsearch">搜索</div>
          </template>
        </van-search>
      </div>
    </div>

    <div class="top"></div>

    <div class="search-content">
        <div class="search-products">
          <div
            class="search-pro"
            v-for="(item, index) in tosearch"
            :key="index"
            @click="viewDetail(item.pid)"
          >
            <SearchProduct :pro="item" />
          </div>
        </div>
    </div>
            <p>哎呀,没有数据可加载了!</p>
  </div>
</template>

<script>
import BackNav from "../components/BackNav.vue";
import SearchProduct from "../components/SearchProduct.vue";
export default {
  name: "Search",
  data() {
    return {
      value:'',
      tosearch:[],
      SearchProduct: [],
    };
  },
  components: {
    BackNav,
    SearchProduct,
  },
  // created() {
  //   this.getsearch();
  // },
  methods: {
    // 搜索商品接口
    getsearch() {
      this.axios({
        method: "get",
        url: "/search",
        pid: this.pid,
        params: {
          name: this.value,
        },
      })
        .then((res) => {
          // // if (res.data.code === 300) {
          this.tosearch = res.data.result;
          // // }
        })
        .catch((err) => {});
    },
    //查看商品详情
    viewDetail(pid) {
      this.$router.push({ name: "Detail", params: { pid } });
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

.van-search {
  height: 46px;
}
.box {
  display: flex;
  // height: 54px;
  background-color: #fff;
  position: relative;
  margin-bottom: 50px;
  .left {
    position: absolute;
    left: 0;
    height: 54px;
    width: 30%;
  }
  .right {
    width: 70%;
    position: absolute;
    right: 0;
  }
}

.search-content{
    width: 95%;
    flex: 1;
    height: 100%;
    background-color: #fff;
    margin: -30px auto 60px auto;
    border-radius: 10px;
    box-sizing: border-box;
    overflow-y: auto;
  }
.search-products{
    display: flex;
    flex-wrap: wrap;
    // margin-top: -30px;
    background-color: #fff;
}
.search-pro{
    width: calc(~"50% - 5px");
    margin-right: 10px;
    margin-bottom: 10px;
    border-radius: 10px;
    bottom: 10px;
    &:nth-child(2n){
      margin-right: 0;
    }
}
    p{
        display: flex;
        justify-content: center;
        color: #A4A1A1;
        background-color: #F7F7F7;
    }
</style>