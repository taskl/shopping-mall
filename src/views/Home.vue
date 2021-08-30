<template>
  <div class="home">
   <div class="nav-top">
     <div class="nav-content">
       <div class="logo">
         <img src="../assets/images/home_active.png" alt="">
         <div class="logo-text">瑞幸咖啡</div>
       </div>
       <div class="search">
         <!-- 组件 -->
          <van-search v-model="value" shape="round" placeholder="请输入商品名称" @click="onSearch"/>
       </div>
     </div>
   </div>
   
   <!-- icon-nav -->

    <div class="banner">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(item,index) in Banner" :key="index" @click="viewDetail(item.pid)">
          <img class="images" :src="item.bannerImg" alt="">
        </van-swipe-item>
      </van-swipe>
    </div>

    <div class="home-hotTop">
      <div class="hotList">热卖推荐</div>
    </div>

    <div class="home-hot-item">
        <div class="home-products">

          <div class="home-pro" v-for="(item, index) in products" :key="index" @click="viewDetail(item.pid)">
            <homeProduct :pro="item" />
          </div>

        </div>
      </div>

  </div>
</template>

<script>
import homeProduct from "../components/homeProduct.vue";
export default {
  name: "Home",

  data() {
    return {
      value: "",
      products: [],
    };
  },
  components:{
    homeProduct,
  },

  created() {
    this.Search();
    this.Banner();
    this.gettypeProducts();
  },

  methods: {
    // 搜索商品接口
    Search() {
      this.axios({
        method: "get",
        url: "/search",
      })
        .then((res) => {
          if (res.data.code === res.data.code) {
            this.Search = res.data.result;
          }
        })
        .catch((err) => {});
    },
    // 轮播图
    Banner() {
      this.axios({
        method: "get",
        url: "/banner",
      })
        .then((res) => {
          if (res.data.code === 300) {
            this.Banner = res.data.result;
          }
        })
        .catch((err) => {});
    },
    // 获取热卖推荐商品
    gettypeProducts(){
      this.axios({
        methos:'get',
        url:'/typeProducts',
        params:{
          key:'isHot',
          value:1,
        },
      })
      .then((res) => {
        if(res.data.code == 500){
          this.products = res.data.result;
        }
      })
      .catch((res) => {});
    },
    //查看商品详情
      viewDetail(pid) {
        this.$router.push({name: 'Detail', params: {pid}});
      },
      onSearch() {
      this.$router.push({ name: "Search" });
    }
  }
};
</script>

<style lang="less" scoped>


.search{
  width:calc(~"100% - 100px")
}
.logo img{
  width: 40px;
  height: 40px;
  margin-top:-10px;
}
.logo{
  display:flex;
  align-items: center;
  font-size: 14px;;
}
.nav-top{
background-color: #fff;
}
.nav-content{
  display:flex;
  justify-content: space-between;
}
.seach-box {
  display: flex;
  align-items: center;
  background-color: #fff;

  .van-search {
    right: 10px;
  }
}

.banner {
  width: 90%;
  overflow: hidden;
  margin: 10px auto;
  border-radius: 10px;

  .my-swipe .van-swipe-item {
    color: #fff;
    width: 100%;
    font-size: 20px;
    line-height: 250px;
    text-align: center;
    .my-swipe .van-swipe-item img{
      width: 100%;
      border-radius: 10px;
    }
  }
  .images{
    width: 100%;
    display: block;
  }
}

.home-hotTop {
  width: 90%;
  height: 50px;
  background-color: #fff;
  margin: 0 auto;
  display: flex;
  align-items: center;
  border-radius: 10px;
  .hotList {
    width: 30%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 15px;
    border-top-right-radius: 25px;
    color: white;
    background-color: #0c34ba;
  }
}

.home-hot-item{
    width: 90%;
    flex: 1;
    height: 100%;
    background-color: #fff;
    // padding: 10px;
    margin: 10px auto 60px auto;
    border-radius: 10px;
    box-sizing: border-box;
    overflow-y: auto;
    // padding-bottom: 50px;
  }

  .home-products{
    display: flex;
    flex-wrap: wrap;
    background-color: #F7F7F7;
  }

  .home-pro{
    width: calc(~"50% - 5px");
    margin-right: 10px;
    margin-bottom: 10px;
    border-radius: 10px;
    bottom: 10px;
    &:nth-child(2n){
      margin-right: 0;
    }
  }
</style>
