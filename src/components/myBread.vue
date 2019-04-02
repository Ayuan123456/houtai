<template>
     <el-breadcrumb separator-class="el-icon-arrow-right" class="my-bread">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item >{{sectitle}}</el-breadcrumb-item>
      <el-breadcrumb-item >{{thrtitle}}</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
export default {
    props:['sectitle','thrtitle']
}
</script>

<style>
    .my-bread {
    background-color: #ccc;
    height: 50px;
    line-height: 50px;
    padding-left: 10px;
  }
</style>
