<template>
  <div>
    <div style="margin: 10px 0">
      <el-input style="width: 200px" placeholder="请输入名称" suffix-icon="el-icon-search" v-model="name"></el-input>
      <!--      <el-input style="width: 200px" placeholder="请输入邮箱" suffix-icon="el-icon-message" class="ml-5" v-model="email"></el-input>-->
      <!--      <el-input style="width: 200px" placeholder="请输入地址" suffix-icon="el-icon-position" class="ml-5" v-model="address"></el-input>-->
      <el-button class="ml-5" type="primary" @click="load">搜索</el-button>
      <el-button type="warning" @click="reset">重置</el-button>
    </div>

    <div style="margin: 10px 0">
      <el-button type="primary" @click="addRole">新增 <i class="el-icon-circle-plus-outline"></i></el-button>
        <el-button type="danger" @click="batchDel" slot="reference">批量删除 <i class="el-icon-remove-outline"></i></el-button>
      <!--      <el-upload action="http://localhost:9090/user/import" :show-file-list="false" accept="xlsx" :on-success="handleExcelImportSuccess" style="display: inline-block">-->
      <!--        <el-button type="primary" class="ml-5">导入 <i class="el-icon-bottom"></i></el-button>-->
      <!--      </el-upload>-->
      <!--      <el-button type="primary" @click="exp" class="ml-5">导出 <i class="el-icon-top"></i></el-button>-->
    </div>

    <el-table :data="tableData" border stripe :header-cell-class-name="'headerBg'"  @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="id" label="ID" width="80"></el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="flag" label="唯一标识"></el-table-column>
      <el-table-column prop="description" label="描述"></el-table-column>
      <el-table-column label="操作"  width="280" align="center">
        <template slot-scope="scope">
          <el-button type="info" @click="selectMenu(scope.row)">分配菜单 <i class="el-icon-menu"></i></el-button>
          <el-button type="success" @click="updateEdit(scope.row)">编辑 <i class="el-icon-edit"></i></el-button>
          <el-button type="danger" @click="deleteId(scope.row.id)" slot="reference">删除 <i class="el-icon-remove-outline"></i></el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="padding: 10px 0">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageNum"
          :page-sizes="[2, 5, 10, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
      </el-pagination>
    </div>

    <el-dialog title="角色信息" :visible.sync="dialogFormVisible" width="30%" >
      <el-form :model="role" label-width="80px" ref="roleForm" size="small">
        <el-form-item label="名称">
          <el-input v-model="role.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="唯一标识">
          <el-input v-model="role.flag" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="role.description" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editRole()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="菜单分配" :visible.sync="menuDialogVis" width="30%">
      <el-tree
          :props="props"
          :data="menuData"
          show-checkbox
          node-key="id"
          ref="tree"
          :default-expanded-keys="expends"
          :default-checked-keys="checks">
         <span class="custom-tree-node" slot-scope="{ node, data }">
            <span><i :class="data.icon"></i> {{ data.name }}</span>
         </span>
      </el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="menuDialogVis = false">取 消</el-button>
        <el-button type="primary" @click="editRole()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Role",
  data() {
    return {
      tableData: [],
      total: 0,
      pageNum: 1,
      pageSize: 10,
      name: "",
      role: {},
      dialogFormVisible: false,
      menuDialogVis: false,
      multipleSelection: [],
      menuData: [],
      props: {
        label: 'name',
      },
      expends: [],
      checks: [],
      roleId: 0,
      roleFlag: '',
      ids: []
    }
  },
  created() {
    this.load()
  },
  methods: {
    load() {
      this.request.get("http://localhost:9090/role/findPageRole", {
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          name: this.name,
        }
      }).then(res => {
        console.log(res)
        this.tableData = res.data.list
        this.total = res.data.total
      })

      // this.request.get("/menu/ids").then(r => {
      //   this.ids = r.data
      // })

    },
    saveRoleMenu() {
      this.request.post("/role/roleMenu/" + this.roleId, this.$refs.tree.getCheckedKeys()).then(res => {
        if (res.code === '200') {
          this.$message.success("绑定成功")
          this.menuDialogVis = false

          // 操作管理员角色后需要重新登录
          if (this.roleFlag === 'ROLE_ADMIN') {
            this.$store.commit("logout")
          }

        } else {
          this.$message.error(res.msg)
        }
      })
    },
    handleSelectionChange(val) {
      console.log(val)
      this.multipleSelection = val
    },
    editRole() {
      this.$refs['roleForm'].validate((valid) => {
        if (valid) {
          if (this.title === '新增') {
            this.saveRole()
          } else {
            this.updateRole()
          }
        }else {
          return false;
        }
      });
    },
    // 新增
    saveRole() {
      this.request.post("http://localhost:9090/role/save", this.role).then(
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
    updateRole() {
      this.request.post("http://localhost:9090/role/update", this.role).then(
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
    addRole() {
      this.dialogFormVisible = true
      this.role = {}
      this.title = '新增'
    },
    updateEdit(row) {
      this.role = row
      this.dialogFormVisible = true
      this.title = '编辑'
    },
    deleteId(id) {
    this.$confirm("确认删除吗？", "提示", {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: "warning",
    }).then(() => {
      this.request.get("http://localhost:9090/role/remove/" + id).then(
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
  batchDel() {
    this.$confirm("确认删除吗？", "提示", {
      type: "warning",
    }).then(() => {
      this.request.get("http://localhost:9090/role/deleteByIds/" + this.ids).then(
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
    reset() {
      this.name = ""
      this.load()
    },
    handleSizeChange(pageSize) {
      console.log(pageSize)
      this.pageSize = pageSize
      this.load()
    },
    handleCurrentChange(pageNum) {
      console.log(pageNum)
      this.pageNum = pageNum
      this.load()
    },
    async selectMenu(role) {
      this.roleId = role.id
      this.roleFlag = role.flag

      // 请求菜单数据
      this.request.get("/menu").then(res => {
        this.menuData = res.data

        // 把后台返回的菜单数据处理成 id数组
        this.expends = this.menuData.map(v => v.id)
      })

      this.request.get("/role/roleMenu/" + this.roleId).then(res => {
        this.checks = res.data
        this.ids.forEach(id => {
          if (!this.checks.includes(id)) {
            // 可能会报错：Uncaught (in promise) TypeError: Cannot read properties of undefined (reading 'setChecked')
            this.$nextTick(() => {
              this.$refs.tree.setChecked(id, false)
            })
          }
        })
        this.menuDialogVis = true
      })
    },
  }
}
</script>


<style>
.headerBg {
  background: #eee!important;
}
</style>