<template>
  <div class="index">
    <el-container class="my-container">
      <el-header class="my-header">
        <el-row>
          <el-col :span="4">
            <div class="grid-content bg-purple">
              <div class="logo">
                <img src="../assets/logo.png" alt>
              </div>
            </div>
          </el-col>
          <el-col :span="18">
            <div class="grid-content bg-purple-light">
              <h2>这是一个比较屌的后台管理系统</h2>
            </div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content bg-purple anniu">
              <el-button type="primary" @click="loginout">退出登录</el-button>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="200px" class="my-aside">
          <el-menu default-active="2" class="el-menu-vertical-demo" router>
            <el-submenu :index="it.id+''"  v-for="it in $store.state.menusList " >
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{it.authName}}</span>
              </template>

              <el-menu-item :index="item.path" v-for="item in it.children" >
                  
                   <span class="el-icon-menu"></span>
                   <span>{{item. authName }}</span>
                  
                
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main class="my-main">
            <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //  menusList:[]
    };
  },

  beforeCreate(){
    if ( !window.sessionStorage.getItem("token") ) {
      this.$router.push("/login")
    }
  },
  created(){
    this.$axios.get('menus')
    .then(res=>{
      console.log(res);
      
      this.$store.commit('changmen',res.data.data)
    })
  },
  methods: {
   loginout(){
     window.sessionStorage.removeItem("token")
     this.$router.push('/login')
   }
  },
 
};
</script>

<style  lang="scss">
.index {
  width: 100%;
  height: 100%;

  .my-container {
    width: 100%;
    height: 100%;

    .my-header {
      background-color: skyblue;
      h2 {
        margin: 0;
        pad: 0;
        text-align: center;
        line-height: 60px;
      }
      .anniu {
        line-height: 60px;
      }
    }
    .my-aside {
      background-color: aqua;
    }
    .my-main {
      background-color: aquamarine;
      
    }
  }
}
</style>
