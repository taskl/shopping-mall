<template>
  <div>
    <div class="mybox">
      <div class="my-top-img">
        <van-uploader :after-read="getuserBg">
        <img class="auto-img" :src="list.userBg"/>
        </van-uploader>
      </div>

      <div class="mine">
        <div class="mineimgbox">
          <img class="mineimg" :src="list.userImg"/>
        </div>
        <div class="minebox">
          <p>{{list.nickName}}</p>
          <p>{{list.desc}}</p>
        </div>
      </div>
      <div class="mineicon">
        <div @click="To">个人资料<img src="../assets/images/arrow.png" alt="" /></div>
        <div @click="To1">我的订单<img src="../assets/images/arrow.png" alt="" /></div>
        <div @click="To2">我的收藏<img src="../assets/images/arrow.png" alt="" /></div>
        <div @click="To3">地址管理<img src="../assets/images/arrow.png" alt="" /></div>
        <div @click="To4">安全中心<img src="../assets/images/arrow.png" alt="" /></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "My",
  data() {
    return {
      list:[],
    };
  },
  created(){
    this.getfindMy()
  },
  methods: {
  // 收藏商品接口
  getlike() {
      this.axios({
        method: "post",
        url: "/like",
      })
        .then((res) => {
          if (res.data.code === 700) {
            this.$router.push({name: 'Login'});
          }
          else if(res.data.code === 200){
            this.$router.push({name: 'My'});
          }
        })
        .catch((err) => {});
    },
  // 我的接口
  getfindMy() {
      this.axios({
        method: "get",
        url: "/findMy",
        // pid: this.pid,
      })
        .then((res) => {
          if (res.data.code === 700) {
            this.$router.push({name: 'Login'});
          }
          if (res.data.code === res.data.code) {
            this.list = res.data.result[0];
          }
        })
        .catch((err) => {});
    },
  // 上传用户背景接口
  getuserBg(file) {
      let imgType = file.file.name.split(".")[1];
      let serverBase64Img = file.content.replace(/^data:image\/[A-Za-z]+;base64,/,"");
      //
      this.axios({
        method:'post',
        url:'/updateUserBg',
        data:{
          imgType,
          serverBase64Img,
        },
      })
        .then((res) => {
          if (res.data.code === "I001") {
            this.$toast(res.data.msg);
            // 延迟0.5秒后更新页面数据
            let timer = setTimeout(() => {
              clearTimeout(timer);
              // 调用查询用户信息方法更新页面数据
              this.getfindMy();
            }, 500);
          }
        })
        .catch((err) => {});
    },

  // 查询地址接口
  getfindAddress() {
      this.axios({
        method: "get",
        url: "/findAddress",
      })
        .then((res) => {
        })
        .catch((err) => {});
    },
    To() {
      this.$router.push({ name: "Mine" });
    },
    To1() {
      this.$router.push({ name: "Myoder" });
    },
    To2() {
      this.$router.push({ name: "Mycollect" });
    },
    To3() {
      this.$router.push({ name: "Mylocation" });
    },
    To4() {
      this.$router.push({ name: "Mysafe" });
    },
  },
};
</script>

<style lang="less" scoped>
.mybox {
  position: relative;
}
.my-top-img {
  width: 100%;
  height: 100px;
  .my-top-img img {
    width: 100%;
  }
}
.mine {
  width: 92%;
  height: 370px;
  position: absolute;
  margin: 55px auto;
  left: 0;
  right: 0;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 10px;
  .mineimgbox {
    width: 80px;
    height: 80px;
    position: absolute;
    margin: 10px 0 0 10px;
    border-radius: 50%;
    background-color: #ccc;
    .mineimg {
      width: 100%;
      border-radius: 50%;
    }
  }
  .minebox {
    // background-color: #ccc;
    margin: 10px 0 0 100px;
  }
  p:nth-of-type(1) {
    font-size: 18px;
    color: #1a43cd;
    font-weight: 600;
  }
  p:nth-of-type(2) {
    color: #838485;
  }
}

.mineicon {
  position: absolute;
  margin-top: 185px;
  margin-left: 30px;
  div {
    width: 100%;
    color: #000;
    border-bottom: 1px solid rgba(204, 204, 204, 0.6);
    padding-bottom: 10px;
    margin-bottom: 15px;
    font-size: 16px;
    display: flex;
    justify-content: center;
    img {
      margin-left: 220px;
      width: 30px;
    }
  }
  div:nth-of-type(5){
    border-bottom: none;
  }
}

</style>