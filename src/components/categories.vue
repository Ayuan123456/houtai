<template>
    <div class="categories">
         <my-bread sectitle='权限管理' thrtitle="权限列表"></my-bread>

    <el-row>
      <el-col :span="7">
        <el-button type="default" @click="addFormVisible=true" plain>添加分类</el-button>
      </el-col>
      
    </el-row>

    <el-table :data="rightsList" style="width: 100%">
      
      <el-table-column  label="分类名称" width="380"></el-table-column>
      <el-table-column  label="级别" width="280"></el-table-column>
      <el-table-column label="是否有效" width="280"></el-table-column>
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
          
        </template>
      </el-table-column>
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
