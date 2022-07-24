import Vue from 'vue'
import VueRouter from 'vue-router'
import Manage from '../views/Manage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Manage',
    component: () => import('../views/Manage.vue'),
    redirect: "/manage/home",
    meta:{title:"首页"},
    children:[
      {path: 'manage/home', name: 'Home',component: () => import('../views/Home.vue'),},
      {path: 'manage/user', name: 'User',meta:{title:"用户管理"}, component: () => import('../views/User.vue'),}
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
