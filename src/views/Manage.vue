<template>
  <div style="height: 100%">
    <el-container style="height: 100%;">
      <el-aside :width="isCollapse ? '64px' : '220px'" style="background-color: rgb(238, 241, 246);height: 100%">
        <Aside :isCollapse="isCollapse"/>
      </el-aside>

      <el-container>
        <el-header style="border-bottom: 1px solid #ccc;">
          <Header :isCollapse="isCollapse" :collapse="collapse" :user="user"/>
        </el-header>
        <el-main>
          <!--          添加路由-->
          <router-view @refreshUser="getUser"/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>

import Aside from "@/components/Aside";
import Header from "@/components/Header";
import User from "@/views/User";

export default {
  name: 'Home',
  components: {
    User,
    Header,
    Aside
  },
  data() {
    return {
      isCollapse: false, // 导航栏收缩
      sideWidth: 220,
      user: {}
    }
  },
  created() {
    this.getUser()
  },
  methods: {
    collapse() {   // 点击收缩按钮触发
      this.isCollapse = !this.isCollapse
    },
    getUser() {
      let username = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).username : ""
      if (username) {
        // 从后台获取数据
        this.request.get("http://localhost:9090/getUser/" + username).then(res => {
          this.user = res.data
        })
      }
    },
  },

}
</script>

<style>

</style>