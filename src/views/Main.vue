<template>
  <div class="main">

    <div>
      <!-- 二级路由插座 -->
      <router-view></router-view>
    </div>
    
    <van-tabbar v-model="activeTabIndex" inactive-color="#646566" active-color="#0C34BA" route>
      <van-tabbar-item 
      v-for="(item, index) in tarbbarData" 
      :key="index" 
      :to="item.to" 
      :badge="index === 2 ? $store.state.shopbagCount : '' ">
        <span>{{item.title}}</span>
        <template #icon="props">
          <img :src="props.active ? item.activeIcon : item.inactiveIcon" />
        </template>
      </van-tabbar-item>
    </van-tabbar>

  </div>
</template>

<script>
  export default {
    name: 'Main',

    data() {
      return {
        activeTabIndex: 0,

        // 购物袋商品总数量
        shopbagCount:0,
        

        //底部导航
        tarbbarData: [
          {
            title: '首页',
            activeIcon: require('../assets/images/home_active.png'),
            inactiveIcon: require('../assets/images/home.png'),
            //跳转的路由
            to: {name: 'Home'} 
          },
          {
            title: '菜单',
            activeIcon: require('../assets/images/menu_active.png'),
            inactiveIcon: require('../assets/images/menu.png'),
            to: {name: 'Menu'}
          },
          {
            title: '购物袋',
            activeIcon: require('../assets/images/shopbag_active.png'),
            inactiveIcon: require('../assets/images/shopbag.png'),
            to: {name: 'Shopbag'},
            badge: "",
          },
          {
            title: '我的',
            activeIcon: require('../assets/images/my_active.png'),
            inactiveIcon: require('../assets/images/my.png'),
            to: {name: 'My'}
          }
        ]
      }
    },

    created() {
      this.findUserShopbagCount();
    },
    methods:{
      //查询用户的购物袋数量
      findUserShopbagCount() {
        this.axios({
          method: 'get',
          url: '/shopcartCount'
        }).then(res => {
          if (res.data.code === 4000) {
            this.shopbagCount = res.data.result;
            this.$store.commit('getAll',this.shopbagCount)
          }

        }).catch(err => {})
      }
    }
  }
</script>

<style lang="less" scoped>

</style>