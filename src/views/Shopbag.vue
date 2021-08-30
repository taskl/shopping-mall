<template>
  <div class="shopbag">
    <!-- 导航 -->
    <div class="ShopBag-nav">
      <van-nav-bar left-arrow @click-left="onClickLeft" left-text="返回" title="购物袋">
        <template #right>
          <div @click="onClickRight" v-if="findAllShopcart.length > 0">
            {{ isEdit ? "完成" : "编辑" }}
          </div>
        </template>
      </van-nav-bar>
    </div>
    <div class="shopbag-img"></div>
    <div class="shopbagbox">
      <div
        class="shopbagItem"
        v-for="(item, index) in findAllShopcart"
        :key="index"
      >
        <div class="checkbox">
          <van-checkbox
            v-model="item.checked"
            @click="getDanxuan"
            icon-size="20px"
          ></van-checkbox>
        </div>
        <div class="img-box">
          <img class="auto-img" :src="item.small_img" alt="" />
        </div>
        <shopbagProduct :pro="item" />
        <van-stepper
          v-model="item.count"
          theme="round"
          button-size="18"
          disable-input
          @plus="getup(item)"
          @minus="getdown(item)"
        />
      </div>
      <p>哎呀,没有数据可加载了!</p>
    </div>

    <van-submit-bar
      :price="Money * 100"
      button-text="提交订单"
      @submit="Totijiao"
    >
      <van-checkbox
        checked-color="#0c34ba"
        v-model="check"
        @click="getAllchecked"
        >全选</van-checkbox
      >
    </van-submit-bar>

    <!-- 编辑管理 -->
      <div v-show="isEdit">
        <van-submit-bar button-text="删除订单" @submit="deleteChoice">
          <van-checkbox class="delecheck" checked-color="#0c34ba" v-model="check" @click="getAllchecked"
        >全选</van-checkbox
      >
        </van-submit-bar>
      </div>

  </div>
</template>
<script>
import BackNav from "../components/BackNav.vue";
import shopbagProduct from "../components/shopbagProduct.vue";
export default {
  name: "Shopbag",

  data() {
    return {
      check: false,
      isEdit: false,
      findAllShopcart: [],
      Money: 0,
      pid: "",
      num: 0,
    };
  },
  components: {
    BackNav,
    shopbagProduct,
  },

  created() {
    this.getfindAllShopcart();
  },

  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    // 编辑
    onClickRight() {
      this.isEdit = !this.isEdit;
    },

    // 点击全选状态
    getAllchecked() {
      this.findAllShopcart.forEach((v) => {
        v.checked = this.check;
      });
      this.getMoney();
    },
    // 点击单选状态
    getDanxuan() {
      this.getMoney();
      for (let i = 0; i < this.findAllShopcart.length; i++) {
        if (this.findAllShopcart[i].checked == true) {
          this.num++;
        } else {
          this.num--;
        }
      }
      if (this.num == this.findAllShopcart.length) {
        this.check = true;
      } else {
        this.check = false;
      }
      this.num = 0;
    },
    // 增加商品数量
    getup(item) {
      item.count++;
      this.axios({
        method: "post",
        url: "/modifyShopcartCount",
        data: {
          sid: item.sid,
          count: item.count,
        },
      })
        .then((res) => {})
        .catch((err) => {
        });
      this.getMoney();
    },
    // 减少商品数量
    getdown(item) {
      item.count--;
      this.axios({
        method: "post",
        url: "/modifyShopcartCount",
        data: {
          sid: item.sid,
          count: item.count,
        },
      })
        .then((res) => {})
        .catch((err) => {});
      this.getMoney();
    },
    // 统计金额
    getMoney() {
      this.Money = 0;
      this.findAllShopcart.forEach((item) => {
        if (item.checked) {
        this.Money += Number(item.count) * Number(item.price);
        }
      });
    },
    // 查询用户所有购物车数据接口
    getfindAllShopcart() {

      this.axios({
        method: "get",
        url: "/findAllShopcart",
      })
        .then((res) => {
          if (res.data.code === 5000) {
            for (let i = 0; i < res.data.result.length; i++) {
              res.data.result[i].checked = false;
            }
            this.findAllShopcart = res.data.result;
          }
        })
        .catch((err) => {});
    },
    // 获取购物车商品条目 (不是商品总数量)
    getshopcartRows() {
      this.axios({
        method: "get",
        url: "/shopcartRows",
      })
        .then((res) => {
          if (res.data.code === 8000) {
            this.shopcartRows = res.data.result;
          }
        })
        .catch((err) => {});
    },
    // 提交订单页面查询需要购买商品接口
    Totijiao() {
      let sids = [];
        
        this.findAllShopcart.forEach(v => {
            if (v.checked){
                sids.push(v.sid);
            }
        })
           if (sids.length == 0) {
        this.$toast("未选中商品");
        return;
        }
        this.$store.commit('getAddRess',sids);
        this.$router.push({ name:'Oderover'})
    },

    // 提交订单的数据
    getDingDan(sids) {
      let sidss = JSON.stringify(sids);
      this.axios({
        method: "get",
        url: "/commitShopcart",
        params: {
          sids: sidss,
        },
      })
        .then((res) => {})
        .catch((err) => {});
    },
    
    // 删除 一个或者多个 购物车商品接口
    deleteShopcart(sids){
      this.getMoney()

      this.axios({
        method:"post",
        url:"/deleteShopcart",
        data:{
          sids,
        },
      })
      .then((res) => {
        this.$toast(res.data.msg)

        if(res.data.code == 7000){
          let sidsData = JSON.parse(sids);
          for(let i = 0 ; i < this.findAllShopcart.length ; i++){
            let sid = this.findAllShopcart[i].sid;
            if(sidsData.indexOf(sid) > -1){
              this.findAllShopcart.splice(i,1);
              i--;
            }
          }
          this.getDanxuan();
        }
      })
      .catch((err) => {})
    },

    // 删除单个
    deleteOne(sid){
      let sids = JSON.stringify([sid]);
      this.deleteShopcart(sids);
    },

    // 删除所选的
    deleteChoice(){
      let sids = [];

      this.findAllShopcart.forEach((item) =>{
        if(item.checked){
          sids.push(item.sid);
        }
      });
      if(sids.length == 0){
        this.$toast("未选中商品");
        return;
      }
      sids =JSON.stringify(sids);
      this.deleteShopcart(sids);
    },
  }
};
</script>

<style lang="less" scoped>
/deep/.van-stepper--round .van-stepper__minus {
  border: 1px solid #0c34ba;
  color: #0c34ba;
}
/deep/.van-stepper--round .van-stepper__plus {
  background-color: #0c34ba;
}
/deep/.van-submit-bar__button{
  margin-left: auto;
}
.shopbag-img {
  width: 100%;
  height: 100px;
  background-image: url(../assets/images/shopbagbgi.png);
  background-size: 100%;
  background-position: center;
}
.shopbagbox {
  flex: 1;
  height: 100%;
  padding-bottom: 120px;
  .shopbagItem {
    width: 92%;
    margin: 12px auto;
    display: flex;
    align-items: center;
    background-color: white;
    border-radius: 10px;
    position: relative;

    .img-box {
      display: flex;
      align-items: center;
      width: 90px;
      margin-right: 10px;
      padding: 10px;
      .auto-img {
        display: block;
        width: 100%;
      }
    }
    .checkbox {
      margin: 0 10px;
    }

    .van-stepper {
      position: absolute;
      right: 10px;
      bottom: 15px;
    }
  }
  p {
    display: flex;
    justify-content: center;
    color: #a4a1a1;
  }
}

.van-submit-bar {
  bottom: 50px;
}

.delecheck{
  left:0;
}
</style>