<template>
  <div>
    <div class="back-nav-box">
      <BackNav left-arrow left-text="返回" title="我的订单" />
    </div>

    <div class="top"></div>

    <div class="Myoder-main-qk">
        <van-tabs
          v-model="activeIndex"
          animated
          title-active-color="#0c34ba"
          color="#0c34ba"
          @click="FindOrder"
        >
          <van-tab
            v-for="(item, index) in zhuangtai"
            :key="index"
            :title="item.title"
          >
            <div
              class="Myoder-main-qk-item"
              v-for="(item, index) in newOder"
              :key="index"
            >
              <div
                class="Myoder-main-qk-item-box"
                v-if="newOder.length > 0"
              >
                <div class="Myoder-main-qk-item-box-left">
                  {{ item.orderId }}
                </div>
                <div class="Myoder-main-qk-item-box-right">
                  <div
                    class="Myoder-main-qk-item-box-right-finished"
                    v-if="item.status === 2"
                  >
                    <div>已完成&nbsp;&nbsp;</div>
                    <div
                      class="Myoder-main-qk-item-box-right-remove"
                      @click="removeOrder(item.orderId, index)"
                    >
                      <van-icon name="delete-o" size="20" />
                    </div>
                  </div>
                  <div class="qr" v-else @click="getReceive(item)">
                    确认收货
                  </div>
                </div>
              </div>
              <div
                class="Myoder-main-qk-item-bottom"
                v-for="(v, i) in item.data"
                :key="i"
              >
                <OderProducts :pro="v" />
                <span>x{{ v.count }}</span>
              </div>
              <div class="jiesuan-Myoder-item">
                <div class="banyuan-flex">
                  <div class="banyuan left"></div>
                  <div class="banyuan right"></div>
                </div>

                <div class="jiesuan-Myoder-item-time">{{ item.date }}</div>
                <div class="jiesuan-Myoder-item-bottom">
                  <div class="jiesuan-Myoder-item-bottom-left">
                    共计{{ item.total }}件
                  </div>
                  <div class="jiesuan-Myoder-item-bottom-right">
                    合计 &yen;{{ item.money }}
                  </div>
                </div>
              </div>
            </div>
          </van-tab>
        </van-tabs>
      </div>

  </div>
</template>

<script>
import BackNav from "../components/BackNav.vue";
import OderProducts from "../components/OderProducts.vue";
export default {
  name: "Myoder",
  data() {
    return {
      activeIndex: 0,
      Oderlist: [],
      newOder: [],
      num: 0,
      zhuangtai: [
        {
          title: "全部",
        },
        {
          title: "进行中",
        },
        {
          title: "已完成",
        },
      ],
    };
  },
  components: {
    BackNav,
    OderProducts,
  },
  created() {
    this.FindOrder();
  },

  methods: {
    // 渲染订单数据
    FindOrder(name, title) {
      this.axios({
        method: "get",
        url: "/findOrder",
        params: {
          status: this.activeIndex,
        },
      })
        .then((res) => {
          if (res.data.code === 70000) {
            let orderNos = [];
            for (let i = 0; i < res.data.result.length; i++) {
              res.data.result[i].small_img = res.data.result[i].smallImg;
              if (orderNos.indexOf(res.data.result[i].oid) === -1) {
                orderNos.push(res.data.result[i].oid);
              }
            }
            this.Oderlist = res.data.result;
            let orderData = [];
            orderNos.forEach((v1) => {
              let order = {
                orderId: v1,
                date: "",
                total: 0,
                money: 0,
                status: -1,
                data: [],
              };

              // 查找订单
              res.data.result.forEach((v2) => {
                if (v1 === v2.oid) {
                  if (!order.date) {
                    order.date = v2.createdAt;
                  }

                  if (order.status === -1) {
                    order.status = v2.status;
                  }
                  order.total += v2.count;
                  order.money += v2.count * v2.price;
                  order.data.push(v2);
                }
              });

              order.money = order.money.toFixed(2);
              order.date = this.formateDate(order.date);
              orderData.push(order);
            });

            this.newOder = orderData;
          }
        })
        .catch((err) => {});
    },
      // 时间格式转换
      formateDate(time) {
        // 使用dayjs 把世界标准时间转换为北京时间
        let date = this.dayjs(time).format();
        const arr = date.split("T");
        const d = arr[0];
        const darr = d.split("-");
  
        const t = arr[1];
        const tarr = t.split(".000");
        const marr = tarr[0].split(":");
        marr[0] = marr[0] < 10 ? "0" + marr[0] : marr[0];
        marr[1] = marr[1] < 10 ? "0" + marr[1] : marr[1];
        marr[2] = marr[2] < 10 ? "0" + marr[2] : marr[2];
        const dd =
          parseInt(darr[0]) +
          "-" +
          parseInt(darr[1]) +
          "-" +
          parseInt(darr[2]) +
          " " +
          parseInt(marr[0]) +
          ":" +
          parseInt(marr[1]) +
          ":" +
          parseInt(marr[2]);
        return dd;
      },

    // 确认收货
    getReceive(item) {
      this.$dialog
        .confirm({
          title: "提示",
          message: "是否确认收货",
        })
        .then(() => {
          this.axios({
            method: "post",
            url: "/receive",
            data: {
              oid: item.orderId,
            },
          })
            .then((res) => {
              this.FindOrder();
            })
            .catch((err) => {});
        })
        .catch(() => {});
    },

    // 删除订单
    removeOrder(oid, index) {
      this.$dialog
        .confirm({
          title: "提示",
          message: "是否删除订单",
        })
        .then(() => {
          this.axios({
            method: "POST",
            url: "/removeOrder",
            data: {
              oid,
            },
          })
            .then((res) => {
              this.$toast(res.data.msg);

              if (res.data.code === 90000) {
                this.FindOrder();
              }
            })
            .catch((err) => {});
        })
        .catch(() => {});
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

.tab {
  width: 92%;
  margin: -15px auto;
  border-radius: 10px;
}

.Myoder-main-qk-item-box-right-finished {
    display: flex;
  }
  .jiesuan-Myoder-item-bottom-left {
    color: gray;
  }
  .jiesuan-Myoder-item-time {
    margin-top: 10px;
    margin-bottom: 15px;
    font-size: 14px;
    color: gray;
  }
  .jiesuan-Myoder-item-bottom-right {
    font-weight: bold;
    color: #0c34ba;
  }
  .jiesuan-Myoder-item-bottom {
    display: flex;
    justify-content: space-between;
    font-size: 15px;
    margin-bottom: 10px;
  }
  .left {
    margin-left: -10px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }
  .right {
    margin-right: -10px;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }
  .banyuan-flex {
    display: flex;
    justify-content: space-between;
    margin-top: -10px;
  }
  .banyuan {
    width: 10px;
    height: 20px;
    background-color: #f7f7f7;
  }
  .jiesuan-Myoder-item {
    width: 100%;
    border-top: 1px dotted #ccc;
    background-color: #fff;
    margin-top: 20px;
  }
  .Myoder-main-qk-item-bottom {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    span {
      font-size: 15px;
      color: #999;
      margin-top: 78px;
    }
  }
  .Myoder-main-qk-item-box {
    display: flex;
    justify-content: space-between;
    font-size: 16px;
    color: #999;
    margin-bottom: 10px;
  }
  .Myoder-main-qk-item {
    width: 94%;
    padding: 10px;
    margin-top: 12px;
    background-color: #fff;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }
  .Myoder-main-qk {
    width: 94%;
    height: 20px;
    padding-top: 10px;
    margin: 0 auto;
    margin-top: -20px;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    background-color: #fff;
  }
  .Myoder-main {
    position: fixed;
    top: 48px;
    left: 0;
    right: 0;
    bottom: 56px;
    overflow-y: auto;
  }
  .Myoder-nav {
    position: sticky;
    top: 0;
  }

</style>