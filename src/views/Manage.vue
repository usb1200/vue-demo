<template>
  <div style="height: 100%">
    <el-container style="height: 100%;">
      <el-aside :width="isCollapse ? '64px' : '220px'" style="background-color: rgb(238, 241, 246);height: 100%">
        <Aside :isCollapse="isCollapse"/>
      </el-aside>

      <el-container>
        <el-header style="border-bottom: 1px solid #ccc;">
            <Header :isCollapse="isCollapse" :collapse="collapse"/>
        </el-header>
        <el-main>
<!--          添加路由-->
          <router-view/>
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
    }
  },
  methods: {
    collapse() {   // 点击收缩按钮触发
      this.isCollapse = !this.isCollapse
    },
  },

}
</script>

<style>

</style>