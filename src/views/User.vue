<template>
<div>
  <div style="margin: 10px 0">
    <el-input style="width: 200px" placeholder="请输入名称" suffix-icon="el-icon-search"
              v-model="username"></el-input>
    <el-input style="width: 200px; margin-left: 5px" placeholder="请输入邮箱" suffix-icon="el-icon-message"
              v-model="email"></el-input>
    <el-input style="width: 200px; margin-left: 5px" placeholder="请输入地址" suffix-icon="el-icon-position"
              v-model="address"></el-input>
    <el-button type="primary" style="margin-left: 5px" @click="load()">搜索</el-button>
  </div>
  <div style="margin: 10px 0">
    <el-button type="primary" @click="handleAdd">新增 <i class="el-icon-circle-plus-outline"></i></el-button>
    <el-button type="danger" @click="batchDelete">批量删除 <i class="el-icon-remove-outline"></i></el-button>
    <el-upload :action="'http://localhost:9090/user/import'" :show-file-list="false" accept="xlsx" :on-success="handleExcelImportSuccess" style="display: inline-block;margin: 0 10px 00px">
      <el-button type="primary" @click="exp">导入 <i class="el-icon-upload2"></i></el-button>
    </el-upload>
    <el-button type="primary" @click="exp">导出 <i class="el-icon-download"></i></el-button>

  </div>
  <el-table :data="tableData" border stripe
            :header-cell-style="{ background: '#f3f6fd', color: '#555' }"
            @selection-change="handleSelectionChange">
    >
    <el-table-column type="selection" width="55"></el-table-column>
    <el-table-column type="index" label="排序" width="120"></el-table-column>
    <el-table-column prop="id" label="ID" width="120"></el-table-column>
    <el-table-column prop="username" label="用户名" width="120"></el-table-column>
    <el-table-column prop="nickname" label="昵称"></el-table-column>
    <el-table-column prop="email" label="邮箱"></el-table-column>
    <el-table-column prop="phone" label="电话"></el-table-column>
    <el-table-column prop="address" label="地址"></el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button @click="handleEdit(scope.row)">编辑 <i class="el-icon-edit"></i></el-button>
        <el-button type="danger" @click="deleteById(scope.row.id)">删除<i class="el-icon-delete"></i></el-button>
      </template>
    </el-table-column>
  </el-table>
  <div style="padding: 10px 0">
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
    </el-pagination>
  </div>

  <el-dialog title="提示" :visible.sync="dialogFormVisible" width="30%">
    <el-form :model="user" :rules="rules" ref="userForm" label-width="80px" size="small">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="user.username" autocomplete="off" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="user.nickname" autocomplete="off" placeholder="昵称"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="user.email" autocomplete="off" placeholder="邮箱"></el-input>
      </el-form-item>
      <el-form-item label="电话">
        <el-input v-model="user.phone" autocomplete="off" placeholder="电话"></el-input>
      </el-form-item>
      <el-form-item label="地址">
        <el-input v-model="user.address" autocomplete="off" placeholder="地址"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="editUser()">确 定</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
import axios from 'axios'
import request from "@/utils/request";
import Aside from "@/components/Aside";
export default {
  name: "User",
  components: {Aside},
  data() {
    return {
      tableData: [],
      total: 0, //总数据条数
      pageSize: 5, //每页条数
      pageNum: 1, //当前页码
      username: "", // 查询姓名
      email: "", // 邮箱
      address: "", // 地址
      ids: [], // 多选框id
      user: {},
      rules: {
        username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
        nickname: [{required: true, message: '请输入昵称', trigger: 'blur'}],
      },
      title: '',
      dialogFormVisible: false, // 新增弹出表单
    }
  },
  methods: {
    deleteById(id) {
      this.$confirm("确认删除吗？", "提示", {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: "warning",
      }).then(() => {
        this.request.get("http://localhost:9090/user/remove/" + id).then(
            response => {
              // console.log('请求成功了',response.data)
              // this.load()
            },
            error => {
              console.log('请求失败了，获取了', error.message)
              // this.load()
            }
        )
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        location.reload()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      })
    },
    // 批量删除
    batchDelete() {
      this.$confirm("确认删除吗？", "提示", {
        type: "warning",
      }).then(() => {
        this.request.get("http://localhost:9090/user/deleteByIds/" + this.ids).then(
            res => {
              // console.log('请求成功了', response.data)上
              // this.load()
            },
            error => {
              console.log('请求失败了，获取了', error.message)
              // this.load()
            }
        )
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        location.reload()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      })
    },
    // 查询用户
    load() {
      this.request.get("http://localhost:9090/user/findPageUser", {
        // ?pageNum=" + this.pageNum + "&pageSize=" + this.pageSize + "&username=" + this.username + "&email=" + this.email + "&address=" + this.address
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          username: this.username,
          email: this.email,
          address: this.address
        }
      }).then(
          response => {
            console.log('请求成功了', response)
            this.tableData = response.data.list
            this.total = response.data.total
          },
          error => {
            console.log('请求失败了，获取了', error.message)
          }
      )
    },
    editUser() {
      this.$refs['userForm'].validate((valid) => {
        if (valid) {
          if (this.title === '新增') {
            this.saveUser()
          } else {
            this.updateUser()
          }
        }else {
          return false;
        }
      });
    },
    // 新增
    saveUser() {
      this.request.post("http://localhost:9090/user/save", this.user).then(
          res => {
            if (res) {
              this.$message.success("添加成功")
              this.dialogFormVisible = false
              // location.reload()
              this.load()
            } else {
              this.$message.error("添加失败")
              this.dialogFormVisible = false
            }
            // console.log(this.form)
          })
    },
    // 修改
    updateUser() {
      this.request.post("http://localhost:9090/user/update", this.user).then(
          res => {
            if (res) {
              this.$message.success("修改成功")
              this.dialogFormVisible = false
              // location.reload()
              this.load()
            } else {
              this.$message.error("修改失败")
              this.dialogFormVisible = false
              this.load()
            }
            // console.log(this.form)
          })
    },
    // 新增
    handleAdd() {
      this.dialogFormVisible = true
      this.user = {}
      this.title = '新增'
    },
    handleEdit(row) {
      this.user = row
      this.dialogFormVisible = true
      this.title = '编辑'
    },
    handleSizeChange(pageSize) {
      // console.log(pageSize)
      this.pageSize = pageSize
      this.load()
    },
    handleCurrentChange(pageNum) {
      // console.log(pageNum)
      this.pageNum = pageNum
      this.load()
    },
    // 获取多选框id
    handleSelectionChange(value) {
      this.ids = value.map((item) => item.id)
      // console.log("---->"+this.ids)
    },
    // 导出用户信息
    exp(){
      window.open("http://localhost:9090/user/export")
    },
    // 导入
    handleExcelImportSuccess(){
      this.$message.success("导入成功")
      this.load()
    }
  },
  created() {
    this.load()
  }
}
</script>

<style scoped>

</style>