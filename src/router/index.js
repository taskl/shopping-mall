import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: () => import('../views/Main.vue'),

    //二级路由
    children: [
      {
        path: 'home',
        //别名
        alias: '',
        name: 'Home',
        component: () => import('../views/Home.vue'),
      },
      {
        path: 'menu',
        name: 'Menu',
        component: () => import('../views/Menu.vue'),
      },
      {
        path: 'shopbag',
        name: 'Shopbag',
        component: () => import('../views/Shopbag.vue'),
      },
      {
        path: 'my',
        name: 'My',
        component: () => import('../views/My.vue'),
      }
    ]
  },

  {
    path: '/detail/:pid',
    name: 'Detail',
    component: () => import('../views/Detail.vue'),
  },

  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
  },

  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
  },
  {
    path: '/mine',
    name: 'Mine',
    component: () => import('../views/Mine.vue'),
  },
  {
    path: '/myoder',
    name: 'Myoder',
    component: () => import('../views/Myoder.vue'),
  },
  {
    path: '/mycollect',
    name: 'Mycollect',
    component: () => import('../views/Mycollect.vue'),
  },
  {
    path: '/mylocation',
    name: 'Mylocation',
    component: () => import('../views/Mylocation.vue'),
  },
  {
    path: '/mysafe',
    name: 'Mysafe',
    component: () => import('../views/Mysafe.vue'),
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('../views/Search.vue'),
  },
  {
    path: '/oderover',
    name: 'Oderover',
    component: () => import('../views/Oderover.vue'),
  },
  {
    path: '/newlocation',
    name: 'Newlocation',
    component: () => import('../views/Newlocation.vue'),
  },
]

const router = new VueRouter({
  routes
})

export default router
