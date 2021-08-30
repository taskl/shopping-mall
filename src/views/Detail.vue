<template>
  <div class="detail">
    <div class="back-nav-box">
      <BackNav left-arrow left-text="返回" title="商品详情" />
    </div>
    <div>

      <div class="detail-img">
        <img class="auto-img" :src="productDetail.large_img" alt="">
      </div>

      <div class="detail-box">

        <div class="pro-info">
          <div>
            <div class="zh-name">{{productDetail.name}}</div>
            <div class="en-name">{{productDetail.enname}}</div>
          </div>
          <div class="pro-price">&yen;{{productDetail.price}}</div>
        </div>

        <!-- 规格 -->
        <div class="pro-rule">

          <div class="pro-rule-item" v-for="(item, index) in productDetail.rules" :key="index">
            <div class="pro-rule-title">{{item.title}}</div>
            <div class="pro-sub-rule">
              <div class="pro-sub-rule-item" :class="{active: item.activeIndex === i}" v-for="(v, i) in item.rules" :key="i" @click="toggleRule(item, i)">{{v.title}}</div>

            </div>
          </div>

        </div>

        <!-- 选择数量 -->
        <div class="select-count">
          <div class="select-text">选择数量</div>
          <div class="select-box">
            <van-stepper v-model="count" theme="round" button-size="22" disable-input />
          </div>
        </div>

        <!-- 描述 -->
        <div class="describe">
          <div class="describe-title">商品描述</div>
          <div class="describe-text">
            <div class="describe-text-item" v-for="(item, index) in productDetail.desc" :key="index">{{index + 1}}、{{item}}</div>
          </div>
        </div>

      </div>

    </div>

    <van-goods-action>
      <van-goods-action-icon icon="bag" text="购物袋" color="#646566" :badge="shopbagCount === 0 ? '' : shopbagCount" @click="ToShopbag"/>
      <van-goods-action-icon icon="like" :text="isLike ? '已收藏' : '未收藏'" :color="isLike ? '#0C34BA' : '#646566'" @click="likeAndNotlike" />
      <van-goods-action-button color="#2450F2" type="warning" text="加入购物袋" @click="addShopbag" />
      <van-goods-action-button color="#0C34BA" type="danger" text="立即购买" />
    </van-goods-action>

  </div>
</template>

<script>
  import BackNav from '../components/BackNav.vue'
  export default {
    name: 'Detail',

    data() {
      return {
        count: 1,

        //商品pid
        pid: '',

        //商品详情数据
        productDetail: {},

        //是否收藏
        isLike: false,

        //购物袋商品总数量
        shopbagCount: 0
      }
    },

    components: {
      BackNav
    },

    created() {
      //截取商品pid
      this.pid = this.$route.params.pid;
      this.getProductDetailByPid();

      this.findUserLike();

      this.findUserShopbagCount();
    },

    methods: {
      //根据商品pid查询商品数据
      getProductDetailByPid() {
        this.axios({
          method: 'get',
          url: '/productDetail',
          params: {
            pid: this.pid
          }
        }).then(res => {

          if (res.data.code === 600) {
            let data = res.data.result[0];
            data.desc = data.desc.split(/\n/);

            let ruleData = ['cream', 'sugar', 'milk', 'tem'];
            let rules = [];
            ruleData.forEach(v => {

              if (!data[v]) {
                return;
              }

              let r = {
                title: data[`${v}_desc`],
                //默认激活的规格
                activeIndex: 0,
                rules: []
              };

              let rs = data[v].split(/\//);
              rs.forEach(item => {
                let subRule = {
                  title: item
                };
                r.rules.push(subRule);
              })

              rules.push(r);
            })

            data.rules = rules;

            this.productDetail = data;
          }
          
        }).catch(err => {})
      },

      //切换规格
      toggleRule(item, i) {
        if (item.activeIndex === i) {
          
          return;
        }

        item.activeIndex = i;
      },

      //收藏商品
      likeAndNotlike() {
        //发起收藏或者取消收藏请求
        let url = '';
        if (this.isLike) {
          //取消收藏
          url = '/notlike';
        } else {
          //收藏
          url = '/like';
        }

        this.axios({
          method: 'post',
          url,
          data: {
            pid: this.pid
          }
        }).then(res => {
          if (res.data.code === 700) {
            this.$toast(res.data.msg);
            //跳转到登录页面
            setTimeout(() => {
              this.$router.push({name: 'Login'});
            }, 2000);
          }

          this.$toast(res.data.msg);
          if (res.data.code === 800) {
            this.isLike = true;
          } else if (res.data.code === 900 && res.data.result === 1) {
            this.isLike = false;
          }

        }).catch(err => {})
      },

      //查询用户是否收藏该商品
      findUserLike() {
        this.axios({
          method: 'get',
          url: '/findlike',
          params: {
            pid: this.pid
          }
        }).then(res => {

          if (res.data.code === 1000 && res.data.result.length === 1) {
            //该商品已经被收藏
            this.isLike = true;
          }
          
        }).catch(err => {})
      },

      //加入购物袋
      addShopbag() {
        //获取商品规格
        let rules = [];
        this.productDetail.rules.forEach(v => {
          rules.push(v.rules[v.activeIndex].title);
        })


        this.axios({
          method: 'post',
          url: '/addShopcart',
          data: {
            pid: this.pid,
            rule: rules.join('/'),
            count: this.count
          }
        }).then(res => {

           if (res.data.code === 700) {
            this.$toast(res.data.msg);
            //跳转到登录页面
            setTimeout(() => {
              this.$router.push({name: 'Login'});
            }, 2000);
          }

          this.$toast(res.data.msg);

          if (res.data.code === 3000) {
            this.shopbagCount += this.count;
          }
          
        }).catch(err => {})

      },
      

      //查询用户的购物袋数量
      findUserShopbagCount() {
        this.axios({
          method: 'get',
          url: '/shopcartCount'
        }).then(res => {
          if (res.data.code === 4000) {
            this.shopbagCount = res.data.result;
          }

        }).catch(err => {})
      },
      // 切换购物袋界面
      ToShopbag() {
      this.$router.push({ name: "Shopbag" });
    }

    }
  }
</script>

<style lang="less" scoped>
  .detail {
    .back-nav-box{
      position: sticky;
      top: 0;
    }
    padding-bottom: 50px;
    .describe-text{
      color: #666;
      margin-top: 10px;
    }
    .describe-text-item{
      
      margin-bottom: 5px;
    }
    .describe-title{
      font-size: 14px;
    }
    .describe{
      margin-top: 20px;
    }
    /deep/ .van-stepper--round .van-stepper__plus{
      background-color: #0C34BA;
    }
    /deep/ .van-stepper--round .van-stepper__minus{
      color: #0C34BA;
      border-color: #0C34BA;
    }
    .select-box{
      margin-left: auto;
    }
    .select-text{
      font-size: 14px;
    }
    .select-count{
      margin-top: 20px;
      padding: 20px 0;
      border-top: 1px solid #f0f0f0;
      border-bottom: 1px solid #f0f0f0;
      display: flex;
      align-items: center;
    }
    .pro-sub-rule-item{
      width: 60px;
      height: 24px;
      line-height: 24px;
      text-align: center;
      background-color: #e8e8e8;
      margin-right: 10px;
      border-radius: 12px;
      &:last-child{
        margin-right: 0;
      }
      &.active{
        background-color: #0C34BA;
        color: #fff;
      }
    }
    .pro-sub-rule{
      display: flex;
    }
    .pro-rule-title{
      width: 50px;
      height: 24px;
      line-height: 24px;
      font-size: 14px;
    }
    .pro-rule-item{
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      &:last-child{
        margin-bottom: 0;
      }
    }
    .pro-rule{
      margin-top: 30px;
    }
    .zh-name{
      font-size: 14px;
    }
    .en-name{
      color: #999;
    }
    .pro-price{
      margin-left: auto;
      font-size: 14px;
      color: #e4393c;
      font-weight: bold;
    }
    .pro-info{
      display: flex;
      align-items: center;
    }
    .detail-box{
      margin: 0 10px;
      padding: 10px;
      background-color: #fff;
      position: relative;
      top: -20px;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }
    .detail-img{
      background-color: #e8e8e8;
    }
  }
</style>