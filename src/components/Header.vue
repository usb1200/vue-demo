<template>
  <div style="font-size: 12px;line-height: 60px; display: flex">
    <div style="flex: 1; font-size: 18px">
      <span :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'" style="cursor: pointer"
            @click="collapse"></span>

      <el-breadcrumb separator-class="el-icon-arrow-right" style="display: inline-block;margin-left: 10px">
        <el-breadcrumb-item :to="{ path: item.path}" v-for="item in paths">{{item.name}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <el-dropdown style="width: 150px;cursor: pointer;text-align: right">
      <div style="display: inline-block">
        <img :src="user.via" alt=""
             style="width: 30px; border-radius: 50%; position: relative; top: 10px; right: 5px">
        <span>{{user.nickname}}</span><i class="el-icon-arrow-down" style="margin-left: 5px"></i>
      </div>
      <el-dropdown-menu slot="dropdown" style="width: 100px; text-align: center">
        <el-dropdown-item style="font-size: 14px; padding: 5px 0">
          <router-link to="/person">个人信息</router-link>
        </el-dropdown-item>
        <el-dropdown-item style="font-size: 14px; padding: 5px 0">
          <span style="text-decoration: none" @click="logout">退出</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>

</template>

<script>
export default {
  name: "Header",
  props: {
    isCollapse: Boolean,
    collapse: Function,
    user:Object
  },
  data(){
    return {
      paths:[],
      // user:localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}
    }
  },
  methods:{
    logout(){
      this.$router.push('/login')
      localStorage.removeItem("user")
      this.$message.success("退出成功")
    }
  },
  created() {
    // console.log(this.$route.matched)
    this.paths = this.$route.matched
  },
  //监听路由变化
  watch:{
    $route(to,from){
      let matched = to.matched;   //this.$route.matchedz
      console.log("matched",matched)
      // 这个地方是为了固定第一级目录是首页不变
      // if(matched[0].name!=="Manage"){
      //   matched = [{ path: 'manage/home', name: 'Home',meta:{title:"首页"}},...matched];
      // }
    // ...数组名 是一种追加数组的方法
    //   var arr = [1,2,3]
    //   var arr1 = [4,5]
    //   var arr2 = [2,...arr1] == [2,4,5]
      //
      this.paths = matched;
    }
  }
}
</script>

<style scoped>

</style>