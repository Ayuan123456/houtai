<template>
  <div class="login">
    <div class="box">
        <h2>账号密码登录</h2>
      <el-form
        label-position="top"
        label-width="80px"
        :model="ruleForm"
        :rules="rules"
        ref="loginForm"
      >
        <el-form-item label="账号" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model.trim="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
          <el-button @click="resetForm('loginForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      ruleForm: {
        username: "",
        password: " "
      },
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
    submitForm(formName) {
      this.$refs[formName].validate( async valid => {
        if (valid) {
          let res=await this.$axios.post("login", this.ruleForm)
          if (res.data.meta.status==400) {
            console.log(res);
            
            this.$message.error(res.data.meta.msg)
             this.$message.error(res.data.meta.msg);
          }else if(res.data.meta.status==200){
             this.$message.success(res.data.meta.msg);
             window.sessionStorage.setItem("token",res.data.data.token);
             this.$router.push("/")
          }   
        } else {
        this.$message.error("登录失败,请确认账号或密码正确,或者重置");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="scss">
.login {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: skyblue;
  .box {
    width: 550px;
    height: 420px;
    background-color: #ffffff;
    border-radius: 10px;
    padding-left: 20px;
    padding-top: 30px;
    box-sizing: border-box;
  }
}
</style>
