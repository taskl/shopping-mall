<template>
  <div class="Oderover">
    <div class="Oderover-nav">
      <BackNav left-arrow title="订单结算" left-text="返回" />
    </div>
    <div class="Oderover-main">
      <div class="Oderover-main-dizhi">
        <div class="Oderover-main-dizhi-xuanzhe" @click="ToMylocation">
          <span>选择地址 &nbsp;&gt;</span>
        </div>
        <div class="Oderover-main-dizhi-item">
          <van-address-list
            v-model="choiceAddressId"
            :list="list"
            default-tag-text="默认"
            add-button-text="立即结算"
            @add="getPay"
          />
        </div>
      </div>
      <div class="Oderover-main-xingxi">
        <div class="Oderover-main-xingxi-p">订单信息</div>
        <div
          class="Oderover-main-xingxi-box"
          v-for="(item, index) in oderlist"
          :key="index"
        >
          <div class="Oderover-main-xingxi-box-item">
            <OderProducts :pro="item" />
          </div>
          <div class="Oderover-main-xingxi-box-num">x {{ item.count }}</div>
        </div>
      </div>
      <div class="Oderover-main-xingxi-tongji">
        <div class="Oderover-main-xingxi-tongji-top">
          <div class="Oderover-main-xingxi-tongji-left-time">
            {{ $store.state.isTime }}
          </div>
        </div>
        <div class="Oderover-main-xingxi-tongji-bottom">
          <div class="Oderover-main-xingxi-tongji-bottom-num">
            共计{{ num }}件
          </div>
          <div class="Oderover-main-xingxi-tongji-bottom-money">
            合计 &yen;{{ isMoney }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BackNav from "../components/BackNav.vue";
import OderProducts from "../components/OderProducts.vue";
export default {
  name: "Oderover",
  data() {
    return {
      choiceAddressId: "",
      list: [],
      oderlist: [],
      list2: {},
      num: 0,
      isMoney: 0,
      isTime: "",
      sids:[]
    };
  },
  components: {
    BackNav,
    OderProducts,
  },
  created() {
    this.getShopcart();
    this.getAddressAid();
  },
  methods: {
    // 根据地址aid查询地址接口
    getAddressByAid(item) {
      this.axios({
        method: "get",
        url: "/findAddressByAid",
        params: {
          aid: item,
        },
      })
        .then((res) => {
          if (res.data.code === 40000) {
            res.data.result.forEach((item, index) => {
              item["address"] =
                item.province +
                item.city +
                item.county +
                item.addressDetail +
                item.areaCode;
            });
          }
          this.list = res.data.result;
          this.$toast(res.data.msg);
        })
        .catch((err) => {});
    },

    // 地址的aid
    getAddressAid() {
      if (this.$route.query.aids) {
        this.getAddressByAid(this.$route.query.aids);
      } else {
        this.getAddressByAid(this.$store.state.list2.aid);
      }
    },

    // 提交订单页面查询需要购买商品接口
    getShopcart() {

      let sidss = JSON.stringify(this.$store.state.sids);

      this.axios({
        method: "get",
        url: "/commitShopcart",
        params: {
          sids: sidss,
        },
      })
        .then((res) => {
          if (res.data.code === 50000) {
            this.oderlist = res.data.result;

            this.oderlist.forEach((item) => {
              this.num += item.count;
              this.isMoney += Number(item.count) * Number(item.price);
            });
          }
          this.$toast(res.data.msg);
        })
        .catch((err) => {});
    },

    // 立即结算接口
    getPay() {
      let sidss = JSON.stringify(this.$store.state.sids);
      this.axios({
        method: "post",
        url: "/pay",
        data: {
          sids: sidss,
          phone: this.list.tel,
          address: this.list.address,
          receiver: this.list.addressDetail,
        },
      })
        .then((res) => {
          if(res.data.code===60000){
            this.$toast(res.data.msg);
            setTimeout(() => {
              this.$router.push({name:"Myoder"})
            }, 2000);
          }
        })
        .catch((err) => {});
    },

    // 选择地址
    ToMylocation() {
      this.$router.push({ name: "Mylocation" });
    },
  },
};
</script>

<style lang="less" scoped>
.Oderover {
  /deep/ .van-address-list__bottom {
    background-color: none;
  }
  /deep/ .van-button--danger {
    background-color: #0c34ba;
    border-color: #0c34ba;
  }
  .Oderover-main-xingxi-tongji-bottom {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    font-size: 15px;
  }
  .Oderover-main-xingxi-tongji {
    width: 90%;
    padding: 10px;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    margin: 0 auto;
    background-color: #fff;
    border-top: 1px dotted #ccc;
    color: gray;
  }
  .Oderover-main-xingxi-tongji-bottom-money {
    color: #0c34ba;
    font-weight: bold;
  }
  .Oderover-main-xingxi-box-num {
    margin-top: 80px;
    margin-right: 20px;
    font-size: 14px;
    color: #999;
  }
  .Oderover-main-xingxi-box {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
    &:last-child {
      margin-bottom: 20px;
    }
  }
  .Oderover-main-xingxi-p {
    font-size: 16px;
    color: gray;
  }
  .Oderover-main-xingxi {
    width: 90%;
    padding: 10px;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    margin: 0 auto;
    margin-top: 15px;
    background-color: #fff;
  }
  /deep/ .van-address-item__address {
    font-size: 14px;
    color: #999;
  }
  /deep/ .van-address-list {
    padding-bottom: 0;
  }
  /deep/ .van-tag--danger {
    background-color: #0c34ba;
  }
  /deep/ .van-icon {
    display: none;
  }
  .Oderover-main-dizhi-xuanzhe {
    font-size: 16px;
    color: #999;
  }
  .Oderover-main-dizhi {
    width: 90%;
    padding: 10px;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    margin: 0 auto;
    margin-top: 15px;
    background-color: #fff;
  }
  .Oderover-main {
    width: 100%;
    position: fixed;
    top: 46px;
    bottom: 80px;
    overflow-y: auto;
  }
  .Oderover-nav {
    position: static;
    top: 0;
  }
}
</style>