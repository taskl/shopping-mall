import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 购物袋商品总数量
    shopbagCount:0,
    //个人资料
    isArray:{},
    newsids:[],
    list2:[],
    isTime:"",
    sids:[],
  },
  mutations: {
    getAll(stage,payId){
      stage.shopbagCount=payId
    },
    getAddRess(state,payload){
      state.sids=payload
    }
  },
  actions: {
  },
  modules: {
  }
})
