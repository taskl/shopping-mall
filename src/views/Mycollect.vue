<template>
  <div>
    <div>
      <BackNav left-arrow left-text="返回" title="我的收藏" />
    </div>
    <!-- <div class="box"> -->

      <div class="top"></div>

      <div class="collect_box">
        <div class="collect_item">
          <div class="item" v-for="(item, index) in list" :key="index"
           >
            <img :src="item.smallImg" @click="viewDetail(item.pid)"/>
            <p>{{ item.name }}</p>
            <p>{{ item.enname }}</p>
            <p>
              &yen;{{ item.price }}
              <span>
                <van-icon name="delete-o" size="18" @click="getnotlike(item.pid,index)"/>
              </span>
            </p>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import BackNav from "../components/BackNav.vue";
export default {
  name: "Mycollect",
  data() {
    return {
      list: [],
      getp:[],
      pid:"",
    };
  },
  components: {
    BackNav,
  },
  created() {
    this.getfindAllLike();
  
    this.pid = this.$route.params.pid;
  },
  methods: {
    // 查询用户所有收藏商品接口
    getfindAllLike() {
      this.axios({
        method: "get",
        url: "/findAllLike",
      })
        .then((res) => {
          if (res.data.code === 2000) {
            this.list = res.data.result;
          }
        })
        .catch((err) => {});
    },
    // 取消(删除)收藏商品接口
    getnotlike(pid,index) {
      this.axios({
        method: "post",
        url: "/notlike",
        data:{
          pid
        }
      })
        .then((res) => {
          if (res.data.code === 900) {
             this.$toast(res.data.msg)
            this.list.splice(index,1)
          }
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
  .collect_box {
    width: 90%;
    margin: -30px auto;
    border-radius: 10px;
    background-color: #fff;
    .collect_item {
      box-sizing: border-box;
      overflow-y: auto;
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      .item {
        margin-top: 10px;
        margin-left: 8px;
        width: 30%;
        overflow: hidden;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        p:nth-child(2) {
          font-size: 14px;
        }
        p:nth-child(3) {
          font-size: 14px;
          color: #b3b4b4;
          margin-top: -5px;
        }
        p:nth-child(4) {
          font-size: 14px;
          color: #0c34ba;
          font-weight: bold;
          position: relative;
          span {
            position: absolute;
            right: 5px;
          }
        }
        img {
          width: 100%;
        }
      }
    }
  }
</style>