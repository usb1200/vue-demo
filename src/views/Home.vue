<template>
  <div style="color: #666;font-size: 14px;">
    <div style="padding-bottom: 20px">
      <b>欢迎你！{{ user.nickname }}</b>
    </div>
    <el-card>
      宣哥出手，马上拥有
      <el-divider />
      缘起，我在人群中看见你<br><br>
      缘落，我看见你在人群中<br><br>
      这里的一切都有始有终，却能容纳所有不期而遇和久别重逢。
    </el-card>
    <div style="height: 1px; background: #ddd; margin: 20px 0"/>

    <el-row :gutter="30">
      <el-col :span="12">
        <div style="padding: 20px 0; font-size: 20px">《云上青梅》</div>
        <div style="margin-bottom:10px">
          你要悄悄拔尖, 然后惊艳众人
        </div>
<!--        <div class="m-10" style="margin-bottom:10px"><el-button type="danger"><i class="el-icon-coin"></i> 免费开源</el-button></div>-->
        <div class="m-10" style="margin-bottom:10px"><el-button type="danger"><i class="el-icon-s-custom"></i> 本人QQ：1925939013</el-button></div>
        <div class="m-10">
          <el-button type="primary"><i class="el-icon-link"></i> <a style="color: #fff" href="https://github.com/usb1200/vue-demo">Gith前端源码</a></el-button>
          <el-button type="primary"><i class="el-icon-link"></i> <a style="color: #fff" href="https://github.com/usb1200/springboot-demo">Github后端源码</a></el-button>
        </div>
      </el-col>
      <el-col :span="12">
        <div style="padding: 20px 0; font-size: 20px">技术栈</div>
        <el-row>
          <el-col :span="12" style="line-height: 30px">
            <div><b>后端</b></div>
            <div>SpringBoot2</div>
            <div>Hutool</div>
            <div>Poi</div>
            <div>Lombok</div>
            <div>Mybatis/Mybatis-plus</div>
          </el-col>
          <el-col :span="12" style="line-height: 30px">
            <b>前端</b>
            <div>Vue2</div>
            <div>Vue-Router</div>
            <div>VueX</div>
            <div>ElementUI</div>
            <div>Axios</div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
</div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: "Home",
  data() {
    return {
      user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}
    }
  }
}
</script>

<style scoped>

</style>