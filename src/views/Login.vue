<template>
  <div class="login">
    <van-nav-bar>
      <template #left>
        <div class="logo-box">
          <div class="logo">
            <img
              class="auto-img"
              src="../assets/images/home_active.png"
              alt=""
            />
          </div>
          <div class="logo-text">Luckin Coffee</div>
        </div>
      </template>
      <template #right>
        <div class="guang" @click="goPage('Menu')">先逛一逛</div>
      </template>
    </van-nav-bar>

    <div class="user-box">
      <div>
        <div class="welcome-zhtitle">欢迎回来！</div>
        <div class="welcome-entitle">Please login to your accounts</div>
      </div>
      <div class="form-box">
        <van-form @submit="login">
          <van-field
            v-model="userInfo.phone"
            name="phone"
            label="手机号"
            placeholder="手机号"
            autocomplete="off"
            :rules="[
              { required: true, message: '请填写手机号' },
              { pattern: phoneReg, message: '手机格式不正确' },
            ]"
          />
          <van-field
            v-model="userInfo.password"
            :type="isOpen ? 'text' : 'password'"
            name="password"
            label="密码"
            placeholder="密码(6-16位)"
            :right-icon="isOpen ? 'eye-o' : 'closed-eye'"
            autocomplete="off"
            @click-right-icon="togglePasswordStatus"
            :rules="[
              { required: true, message: '请填写密码' },
              {
                pattern: passwordReg,
                message: '支持数字字母下划线组合并且以字母开头',
              },
            ]"
          />
          <div class="forgot-box">
            <div class="forgot-text">忘记密码？</div>
          </div>
          <div class="login-btn">
            <van-button round block color="#0C34BA" native-type="submit"
              >登&nbsp;&nbsp;&nbsp;录</van-button
            >
          </div>
          <div class="login-btn">
            <van-button
              round
              block
              native-type="button"
              @click="goPage('Register')"
              >注&nbsp;&nbsp;&nbsp;册</van-button
            >
          </div>
        </van-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      isOpen: false,

      //验证手机号
      phoneReg: /^1[3-9]\d{9}$/,

      //验证密码(数字字母下划线组合并且以字母开头6-16位)
      passwordReg: /^[A-Za-z]\w{5,15}$/,

      userInfo: {
        phone: "",
        password: "",
      },
    };
  },

  methods: {
    togglePasswordStatus() {
      this.isOpen = !this.isOpen;
    },

    //跳转页面
    goPage(name) {
      this.$router.push({ name });
    },

    //登录
    login(userInfo) {
      this.axios({
        method: "post",
        url: "/login",
        data: userInfo,
      })
        .then((res) => {
          this.$toast(res.data.msg);
          if (res.data.code === 200) {

            //将token保存在sessionStorage
            sessionStorage.setItem('token', res.data.token);

            setTimeout(() => {
              this.$router.push({ name: "Menu" });
            }, 2000);
          }
        })
        .catch((err) => {});
    },
  },
};
</script>

<style lang="less" scoped>
.login {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: #fff;
  .forgot-box {
    margin-top: 10px;
    display: flex;
  }
  .forgot-text {
    margin-left: auto;
    font-size: 14px;
    color: #666;
  }
  .login-btn {
    margin-top: 50px;
  }
  .form-box {
    margin-top: 50px;
  }
  .welcome-zhtitle {
    font-size: 22px;
    color: #666;
    font-weight: bold;
    margin-bottom: 20px;
  }
  .welcome-entitle {
    font-size: 16px;
    color: #999;
  }
  .user-box {
    margin-top: 80px;
    padding: 15px;
  }
  .guang {
    color: #0c34ba;
    font-weight: bold;
    font-size: 14px;
  }
  .logo-box {
    display: flex;
    align-items: center;
  }
  .logo {
    width: 36px;
    height: 36px;
    border-radius: 50%;
  }

  .logo-text {
    margin-left: 10px;
    font-size: 16px;
    font-weight: bold;
    color: #666;
  }
}
</style>