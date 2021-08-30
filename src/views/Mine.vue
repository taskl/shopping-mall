<template>
  <div>
    <div class="back-nav-box">
      <BackNav left-arrow left-text="返回" title="个人资料" />
    </div>

    <div class="top"></div>

    <div class="minebox">
      <div class="mineimg">头像
        <van-uploader :after-read="changeAvatar">
            <img :src="info.userImg" alt="">
          </van-uploader>
      </div>
      <div class="mineId">
        用户id
        <div class="id">{{info.userId}}</div>
      </div>
      <div class="mineName">
        <span>昵称</span>
        <van-field v-model="nickName" @blur="changeNickName" input-align="right" @click="changeChoice" ref="nickName" />
      </div>
      <div class="mineIntro">
        <span>简介</span>
        <van-field v-model="desc" @blur="changeDesc" input-align="right" @click="changeChoice" ref="desc" />
      </div>
    </div>
  </div>
</template>

<script>
import BackNav from "../components/BackNav.vue";
export default {
  name: "Mine",

  data() {
    return {
      info:[],
      nickName: '',
      desc:'',
      inputActive:false,
    };
  },
  components: {
    BackNav,
  },
  created(){
    this.Mine();
    this.changeDesc();
  },
  methods:{
    // 个人资料接口
    Mine() {
      this.axios({
        method: "get",
        url: "/findAccountInfo",
      })
        .then((res) => {
            this.info = res.data.result[0];

            this.nickName = res.data.result[0].nickName;

            this.desc = res.data.result[0].desc;
        })
        .catch((err) => {});
    },
    // 修改昵称接口
    changeNickName() {
      this.inputActive = false;

      let nickName = this.nickName;
      if(nickName == this.info.nickName) return;
      if(!nickName) return;
      this.axios({
        method: "post",
        url: "/updateNickName",
        data:{
          nickName,
        },
      })
        .then((res) => {
          if (res.data.code === "C001") {
            this.$toast(res.data.msg);
            // 延迟2秒后更新页面数据
            let timer = setTimeout(() => {
              clearTimeout(timer);
              // 调用查询用户信息方法更新页面数据
              this.Mine();
            }, 2000);
          }
        })
        .catch((err) => {});
    },
    // 修改简介接口
    changeDesc() {
      // 将输入框状态设置为初始状态
      this.inputActive = false;

      let desc = this.desc;
      if(desc == this.info.desc) return;
      if(!desc) return;
      this.axios({
        method:'post',
        url:'/updateDesc',
        data:{
          desc
        },
      })
        .then((res) => {
          if (res.data.code === "D001") {
            this.$toast(res.data.msg);
            // 延迟1秒后更新页面数据
            let timer = setTimeout(() => {
              clearTimeout(timer);
              // 调用查询用户信息方法更新页面数据
              this.Mine();
            }, 1000);
          }
        })
        .catch((err) => {
          
        });
    },

     // 上传头像接口
    changeAvatar(file) {
      let imgType = file.file.name.split('.')[1];
      let serverBase64Img = file.content.replace(/^data:image\/[A-Za-z]+;base64,/, '');
      this.axios({
        method:'post',
        url:'/updateAvatar',
        data:{
            imgType,
            serverBase64Img
        },
      })
        .then((res) => {
          if (res.data.code === "H001") {
            this.$toast(res.data.msg);
            // 延迟1秒后更新页面数据
            let timer = setTimeout(() => {
              clearTimeout(timer);
              // 调用查询用户信息方法更新页面数据
              this.Mine();
            }, 1000);
          }
        })
        .catch((err) => {
          
        });
    },
    
    // 修改光标位置
    changeChoice() {
      
      event.preventDefault();

      let tag = event.target;

      if(!this.inputActive) {

        this.inputActive = true;
        tag.selectionStart = tag.value.length;
        tag.selectionEnd = tag.value.length;
      }
    },
  }
};
</script>

<style lang="less" scoped>
.top {
  width: 100%;
  height: 100px;
  background-color: #0c34ba;
}

.minebox {
  width: 92%;
  height: 200px;
  margin: -20px auto 0 auto;
  border-radius: 10px;
  background-color: #fff;
  font-size: 14px;
  position: relative;
  .mineimg {
    display: flex;
    align-items: center;
    position: absolute;
    margin: 10px 0 10px 10px;
    padding-bottom: 5px;
    border-bottom: 1px solid rgba(204, 204, 204, 0.6);
    img {
      width: 40px;
      height: 40px;
      margin-left: 250px;
      border-radius: 50%;
    }
  }
  .mineId{
      display: flex;
      align-items: center;
      position: absolute;
      margin: 65px 0 10px 10px;
      padding-bottom: 5px;
      border-bottom: 1px solid rgba(204, 204, 204, 0.6);
      .id{
          margin-left: 148px;
      }
  }
  .mineName{
      display: flex;
      align-items: center;
      position: absolute;
      margin: 90px 0 10px 10px;
      padding-bottom: 5px;
      border-bottom: 1px solid rgba(204, 204, 204, 0.6);
      span{
        width: 50px;
      }
      .van-field{
        display: flex;
        justify-content: flex-end;
        margin-left: 65px;
      }
      .van-cell{
        padding: 10px 0 0 33px;
      }
  }
  .mineIntro{
      display: flex;
      align-items: center;
      position: absolute;
      margin: 135px 0 10px 10px;
      padding-bottom: 5px;
      span{
        width: 70px;
      }
      .van-field{
          margin-left: 60px;
      }
  }
}
</style>