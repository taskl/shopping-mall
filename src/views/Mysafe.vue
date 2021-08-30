<template>
  <div>
    <div>
      <BackNav left-arrow left-text="返回" title="安全中心" />
    </div>

    <div class="top"></div>

    <div class="safebox">
      <div class="safeicon">
        <div @click="Show">
          修改密码<img src="../assets/images/arrow.png" alt="" />
        </div>
        <div @click="getshowProp">
          注销账号<img src="../assets/images/arrow.png" alt="" />
        </div>
      </div>
      <van-button @click="getlogout()" round type="info">退出登录</van-button>
    </div>

    <van-dialog
        v-model="showProp"
        title="注销账号"
        message="是否确定注销账号，一旦注销无法恢复!"
        show-cancel-button
        confirm-button-color="#0c34ba"
        @confirm="over"
      >
      </van-dialog>


    <div>
      <van-popup v-model="show" position="bottom" :style="{ height: '40%' }">
        <div class="passwordbox">
        <div class="left">修改密码</div>
        <div class="right" @click="close()">X</div>
        </div>
        <van-field
          v-model="oldPassword"
          :type="showOldPassword ? 'password' : 'text'"
          name="旧密码"
          label="旧密码"
          placeholder="旧密码(首字母必须为字母)"
          :right-icon="showOldPassword ? 'closed-eye' : 'eye-o'"
          autocomplete="off"
          @click-right-icon="triggerold"
        />
        <van-field
          v-model="newPassword"
          :type="showNewPassword ? 'password' : 'text'"
          name="password"
          label="新密码"
          placeholder="新密码(首字母必须为字母)"
          :right-icon="showNewPassword ? 'closed-eye' : 'eye-o'"
          autocomplete="off"
          @click-right-icon="triggernew"
        />

        

        <div class="tijiaobox">
          <van-button class="tijiao" @click="getlogout()" round type="info"
            >提交
          </van-button>
        </div>
      </van-popup>
    </div>
  </div>
</template>

<script>
import BackNav from "../components/BackNav.vue";
export default {
  name: "Mysafe",
  data() {
    return {
      show: false,
      showProp: false,
      oldPassword:'',
      newPassword:'',
      showOldPassword: true,
      showNewPassword: true,
    };
  },
  components: {
    BackNav,
  },
  created() {
    // this.getupdatePassword();
  },
  methods: {
    // 显示注销提示
    getshowProp(){
      this.showProp = true;
    },
    // 关闭修改密码
    close(){
      this.show = false;
    },
    // 显示修改密码
    Show() {
      this.show = true;
    },
    // 小眼睛
    triggerold() {
      this.showOldPassword = !this.showOldPassword;
    },
    triggernew() {
      this.showNewPassword = !this.showNewPassword;
    },
    // 退出登录接口
    getlogout() {
      this.axios({
        method: "post",
        url: "/logout",
      })
        .then((res) => {
          if (res.data.code === "F001") {
            res.data.result;
          }
        })
        .catch((err) => {});
      this.$router.go(-1);
    },
    // // 修改密码接口
    getupdatePassword() {
      if (!this.oldPassword) {
        this.$toast("旧密码不能为空");
        return;
      }
      if (!this.newPassword) {
        this.$toast("新密码不能为空");
        return;
      }
      let loginPasswrodReg = /^[A-Za-z\d]{6,16}$/;
      if (
        !loginPasswrodReg.test(this.oldPassword) ||
        !loginPasswrodReg.test(this.newPassword)
      ) {
        this.$toast("密码支持字母数字组合");
        return;
      }
      let tokenString = this.$cookies.get("TOKEN");
      this.axios({
        method: "post",
        url: "/updatePassword",
        data:{
          tokenString,
          oldPassword: this.oldPassword,
          password: this.newPassword,
        },
      })
        .then((res) => {
          if (res.data.code == "E001") {
            this.$toast(res.data.msg);
            // 延迟2秒后跳转到登录页面
            let timer = setTimeout(() => {
              clearTimeout(timer);
              this.$router.push({ name: "LogInRegister" });
            }, 800);
          }
          if (res.data.code == "E002") {
            this.$toast(res.data.msg);
          }
          if (res.data.code == "E003") {
            this.$toast(res.data.msg);
          }
        })
        .catch((res) => {});
    },
    // 注销账号接口
    over() {
      this.$dialog.confirm({
          title: "提示",
          message: "是否确认注销！",
        })
      this.axios({
        method: "post",
        url: "/destroyAccount",
      })
        .then((res) => {
          // if (res.data.code === A001) {
          // this.list = res.data.result;
          // }
        })
        .catch((err) => {});
      this.$router.go(-1);
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

.safebox {
  width: 90%;
  height: 100px;
  margin: -30px auto;
  border-radius: 10px;
  background-color: #fff;

  .safeicon {
    position: absolute;
    margin-top: 15px;
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
        margin-left: 200px;
        width: 30px;
      }
    }
    div:nth-of-type(2) {
      border-bottom: none;
    }
  }
  .van-button {
    width: 90%;
    position: absolute;
    margin-top: 250px;
    background-color: #0c34ba;
  }
}
.van-field:nth-of-type(1) {
  margin-top: 50px;
}

.tijiaobox {
  display: flex;
  justify-content: center;
  .tijiao {
    width: 90%;
    margin-top: 50px;
    background-color: #0c34ba;
  }
}

.passwordbox{
  display: flex;
  align-content: center;
  margin-bottom: 20px;
  font-size: 18px;
  position: relative;
  .left{
    margin-top: 10px;
    margin-left: 15px;
  }
  .right{
    color: #CBCBCD;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    width: 50px;
    height: 50px;
    right: 0px;
  }
}
</style>