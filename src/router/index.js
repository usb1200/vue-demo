import Vue from 'vue'
import VueRouter from 'vue-router'
import Manage from '../views/Manage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: '首页',
    component: () => import('../views/Manage.vue'),
    redirect: "/home",
    children:[
      {path: '/home', name: '',component: () => import('../views/Home.vue'),},
      {path: '/user', name: '用户管理', component: () => import('../views/User.vue'),},
      {path: '/Person', name: '个人信息', component: () => import('../views/Person.vue'),},
      {path: '/File', name: '文件管理', component: () => import('../views/File.vue'),}
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
