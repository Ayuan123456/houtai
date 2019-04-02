<template>
    <div class="roles">
    <my-bread sectitle='权限管理' thrtitle="角色管理"></my-bread>
     <el-row>
      <el-col :span="7">
        <el-input placeholder="请输入内容"  @keyup.native.enter="search">
          <template slot="append">
            <span class="el-icon-search"></span>
          </template>
        </el-input>
      </el-col>
      <el-col :span="17">
        <el-button type="primary" @click="dialogFormVisible = true">修改</el-button>
      </el-col>
    </el-row>
  

    <el-table :data="rolesList" style="width: 100%">
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column  label="商品名称" width="180"></el-table-column>
      <el-table-column  label="商品价格" width="180"></el-table-column>
      <el-table-column  label="商品重量" width="180"></el-table-column>
      <el-table-column  label="创建时间" ></el-table-column>
      
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

    
    
  </div>
</template>

<script>
export default {
    data() {
        return {
            rolesList:[{},{}],
            addFormVisible:false
        }
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
}
</script>

<style>

</style>
