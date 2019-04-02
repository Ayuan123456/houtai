<template>
    <div class="rights">
         <my-bread sectitle='权限管理' thrtitle="权限列表"></my-bread>

    <el-row>
      <el-col :span="7">
        <el-button type="default" @click="addFormVisible=true" plain>添加用户</el-button>
      </el-col>
      
    </el-row>

    <el-table :data="rightsList" style="width: 100%">
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column  label="权限名称" width="180"></el-table-column>
      <el-table-column  label="路径" width="180"></el-table-column>
      <el-table-column label="层级" width="180"></el-table-column>
      
    </el-table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            rightsList:[{},{}]
        }
    },
}
</script>

<style>

</style>
