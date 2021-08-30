<template>
  <div class="back-nav">
    <van-nav-bar
      :title="title"
      :left-text="leftText"
      :right-text="rightText"
      :left-arrow="leftArrow"
      @click-left="back"
      
    />
  </div>
</template>

<script>
  export default {
    name: 'BackNav',
    props: {
      title: {
        type: String,
        default: ''
      },

      leftArrow: {
        type: Boolean,
        default: false
      },

      leftText: {
        type: String,
        default: ''
      },

      rightText: {
        type: String,
        default: ''
      }
    },

    methods: {
      back() {
        this.$router.go(-1);
      }
    }
  }
</script>

<style lang="less" scoped>
  .back-nav{
    /deep/ .van-nav-bar .van-icon{
      color: #0C34BA;
    }

    /deep/ .van-nav-bar__text{
      color: #0C34BA;
    }
  }
</style>