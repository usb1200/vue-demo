<template>
  <el-menu :default-openeds="['1', '3']" style="height: 100%"
           background-color="rgb(48,64,86)"
           text-color="#fff"
           active-text-color="#ffd04b"
           :collapse-transition="false"
           :collapse="isCollapse"
           router
  >
    <div style="height: 60px; line-height: 60px; text-align: center">
      <img src="../assets/logo.png" style="width: 20px; position: relative; top: 5px; margin-right: 5px">
      <b style="color: #fff" v-show="!isCollapse">后台管理系统</b>
    </div>
        <el-menu-item index="/manage/home">
          <template slot="title">
            <i class="el-icon-house"></i>
            <span slot="title">主页</span>
          </template>
        </el-menu-item>
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span slot="title">系统管理</span>
      </template>
        <el-menu-item index="/manage/user">
          <i class="el-icon-s-custom"></i>
          <span slot="title">用户管理</span>
        </el-menu-item>
    </el-submenu>
  </el-menu>

</template>

<script>
export default {
  name: "Aside",
  props:{
    isCollapse:Boolean,
  },
}
</script>

<style scoped>

</style>