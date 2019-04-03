<template>
  <div class="user">
    <my-bread sectitle="用户管理" threetitle='人员管理' ></my-bread>

    <el-row>
      <el-col :span="7">
        <el-input placeholder="请输入内容" v-model="sendData.query" @keyup.native.enter="search">
          <template slot="append">
            <span class="el-icon-search"></span>
          </template>
        </el-input>
      </el-col>
      <el-col :span="17">
        <el-button type="primary" @click="dialogFormVisible = true">修改</el-button>
      </el-col>
    </el-row>

    <el-table :data="userList" style="width: 100%">
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column prop="mg_state" label="状态">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="handchange(scope.row )"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            plain
            circle
            @click="handle( scope.row)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            plain
            circle
            @click="del(scope.row)"
          ></el-button>
          <el-button
            type="success"
            icon="el-icon-check"
            size="mini"
            plain
            circle
            @click="getRol(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="block">
      <span class="demonstration">分页</span>
      <el-pagination
      
        :page-sizes="[5, 10, 15, 20]"
        :page-size="sendData.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="sendData.total"
          @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
    <el-dialog title="新增用户" :visible.sync="dialogFormVisible">
      <el-form :model="addform" :rules="rules" ref="addform">
        <el-form-item label="用户名" prop="username" label-width="100px">
          <el-input v-model="addform.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" label-width="100px">
          <el-input v-model="addform.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="100px">
          <el-input v-model="addform.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话号码" label-width="100px">
          <el-input v-model="addform.mobile" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="adduser('addform')">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 职位管理 -->
    <el-dialog title="用户角色" :visible.sync="jueseFormVisible">
      <el-form ref="editList">
        <el-form-item label="当前用户"  label-width="100px">
          <el-input v-model="editList.username" disabled auto-complete="off"></el-input>
        </el-form-item>
        <el-select v-model="editList.role_name" placeholder="请选择">
          <el-option
            v-for="item in rolList"
            :key="item.id"
            :label="item.roleName"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="jueseFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitRol('editList')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

export default {
  data() {
    return {
      total: 0,
      sendData: {
        query: "",
        pagenum: 1,
        pagesize: 10
      },
      userList: [],
      // 修改角色保存的数据
      editList: {},
      // 修改后的数据
      rolList: [],
      addform: {
        username: "小小冰",
        password: "123456",
        email: "littleice@qq.com",
        mobile: "18888888888"
      },
      editform: {
        username: "小小冰",

        email: "littleice@qq.com",
        mobile: "18888888888"
      },
      // 弹出的命令
      dialogTableVisible: false,
      dialogFormVisible: false,
      eidetFormVisible: false,
      jueseFormVisible: false,
      rules: {
        username: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码", trigger: "blur" },
          { min: 6, max: 8, message: "长度在 6 到 8 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    handleSizeChange(size) {
      this.sendData.pagesize=size
      this.search()
    },
    handleCurrentChange(current) {
      this.sendData.pagenum=current
      this.search()
    },
    // 修改事件
    async handle(value) {
      let res = await this.$axios.get(`users/${value.id}`);
      // console.log(res);

      this.editform = res.data.data;
      console.log(this.editform);
      if (res.data.meta.status === 200) {
        this.eidetFormVisible = true;
      }
    },
    //  提交修改用户列表
    async submit(value) {
      let res = await this.$axios.put(`users/${this.editform.id}`, {
        email: this.editform.email,
        mobile: this.editform.mobile
      });
      console.log(res);
      if (res.data.status == 200) {
        this.eidetFormVisible = true;
      }
    },
    //  改变状态
    async handchange(value) {
      let res = await this.$axios.put(
        `users/${value.id}/state/${value.mg_state}`
      );
    },
    // 搜索事件
    async search() {
      let res = await this.$axios.get("users", { params: this.sendData });

      this.total = res.data.data.total;
      this.userList = res.data.data;
    },
    // 添加事件
    adduser(addform) {
      this.$refs[addform].validate(async valid => {
        let res = await this.$axios.post("users", this.addform);
        if (res.data.meta.status == 201) {
          this.search();
          this.dialogFormVisible = false;
        } else {
          this.$message.error("请输入正确字符");
        }
      });
    },
    // 删除事件
    del(value) {
      this.$confirm("是否要提交？", "确认信息", {
        distinguishCancelAndClose: true,
        confirmButtonText: "保存",
        cancelButtonText: "放弃修改"
      })
        .then(async () => {
          let res = await this.$axios.delete(`users/${value.id}`);
          if (res.data.meta.status == 200) {
            this.search();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "放弃"
          });
        });
    },
    // 获取用户角色
    async getRol(row) {
      this.jueseFormVisible = true;
      this.editList = row;
      let res = await this.$axios.get("roles");
      this.rolList = res.data.data;
      // console.log(res);
      // console.log(this.editList);
    },
     // 保存用户角色
    async submitRol(editform){
      let res =await this.$axios.put(`users/${this.editList.id}/role`,{
      rid:this.editList.role_name
      })
       if (res.data.meta.status == 200) {
              this.search();
             this.jueseFormVisible=false
            }
  },
  },
 
 
  // 获取页面数据
  async created() {
    let res = await this.$axios.get("users", {
      // headers: {
      //   Authorization: window.sessionStorage.getItem("token")
      // },
      // 使用此字段,可以自动拼接url参数
      params: this.sendData
    });
    // console.log(res);

    this.total = res.data.data.total;
    this.userList = res.data.data.users;
    // console.log(this.userList);
  }
};
</script>

<style lang="scss" >
.user {
  width: 100%;
  height: 100%;
  padding-left: 10px;
  background-color: #eeeeee;
  .user-header {
    background-color: #ccc;
    height: 50px;
    line-height: 50px;
    padding-left: 10px;
  }
}
</style>
