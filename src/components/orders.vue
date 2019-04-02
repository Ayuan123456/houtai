<template>
    <div class="orders">
         <my-bread sectitle='权限管理' thrtitle="权限列表"></my-bread>

    <el-row>
      <el-col :span="7">
        <el-button type="default" @click="addFormVisible=true" plain>添加分类</el-button>
      </el-col>
      
    </el-row>

    <el-table :data="rightsList" style="width: 100%">
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column  label="订单编号" width="280"></el-table-column>
      <el-table-column  label="价格订单" width="140"></el-table-column>
      <el-table-column label="是否付款" width="140">
          <el-button type="danger" size="mini" plain>未付款</el-button>
      </el-table-column>
      <el-table-column label="是否发货" width="140"></el-table-column>
      <el-table-column label="订单时间" width="140"></el-table-column>
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
