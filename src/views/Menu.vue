<template>
  <div class="menu">
    <div class="seach-box">
      <van-search
        v-model="searchValue"
        shape="round"
        placeholder="请输入商品名称"
        @click="onSearch()"
      />
    </div>
    <div class="menu-box">
      <div class="menu-list">
        <div
          class="menu-list-item"
          :class="{ active: activeIndex === index }"
          v-for="(item, index) in menuList"
          :key="index"
          @click="toggleMenuList(index, item.type)"
        >
          {{ item.typeDesc }}
        </div>
      </div>

      <div class="menu-content">
        <div class="menu-products">
          <div
            class="menu-pro"
            v-for="(item, index) in products"
            :key="index"
            @click="viewDetail(item.pid)"
          >
            <Product :pro="item" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Product from "../components/Product.vue";
export default {
  name: "Menu",

  data() {
    return {
      searchValue: "",

      activeIndex: 0,
      menuList: [],

      products: [],
    };
  },

  components: {
    Product,
  },

  created() {
    this.Search();
    this.getProductType();
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
    //获取商品类型
    getProductType() {
      //如果是get请求, 参数需要写在params字段, 如果是post请求, 需要把参数写在data字段中
      this.axios({
        method: "get",
        url: "/type",
      })
        .then((res) => {
          if (res.data.code === 400) {
            res.data.result.unshift({ type: "isHot", typeDesc: "热卖推荐" });
            this.menuList = res.data.result;

            //根据商品类型获取商品数据
            this.getProductByType(res.data.result[this.activeIndex].type);
          }
        })
        .catch((err) => {});
    },

    //根据商品类型获取商品数据
    getProductByType(type) {
      //type: 商品类型

      let key = "";
      let value = "";

      if (type === "isHot") {
        key = "isHot";
        value = 1;
      } else {
        key = "type";
        value = type;
      }

      this.axios({
        method: "get",
        url: "/typeProducts",
        params: {
          key,
          value,
        },
      })
        .then((res) => {
          if (res.data.code === 500) {
            this.products = res.data.result;
          }
        })
        .catch((err) => {});
    },

    //切换类型列表
    toggleMenuList(index, type) {
      if (this.activeIndex === index) {
        return;
      }

      this.activeIndex = index;

      //根据商品类型获取商品数据
      this.getProductByType(type);
    },

    //查看商品详情
    viewDetail(pid) {
      this.$router.push({ name: "Detail", params: { pid } });
    },
    onSearch() {
      this.$router.push({ name: "Search" });
    }
  },
};
</script>

<style lang="less" scoped>
.menu-pro {
  width: calc(~"50% - 5px");
  margin-right: 10px;
  margin-bottom: 10px;
  &:nth-child(2n) {
    margin-right: 0;
  }
}
.menu-products {
  display: flex;
  flex-wrap: wrap;
  background-color: #f7f7f7;
}
.seach-box {
  position: sticky;
  top: 0;
}

.menu-box {
  position: fixed;
  top: 54px;
  right: 0;
  left: 0;
  bottom: 50px;
  display: flex;
}

.menu-list {
  width: 80px;
  height: 100%;
  font-size: 14px;
  overflow-y: auto;
}

.menu-list-item {
  height: 40px;
  text-align: center;
  line-height: 40px;
}

.menu-list-item.active {
  background-color: #fff;
  color: #0c34ba;
}

.menu-content {
  flex: 1;
  height: 100%;
  background-color: #f7f7f7;
  padding: 10px;
  box-sizing: border-box;
  overflow-y: auto;
}
</style>