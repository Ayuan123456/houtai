<template>
  <div class="orders">
    <my-bread sectitle="权限管理" thrtitle="权限列表"></my-bread>

    <el-row>
      <el-col :span="7">
        <el-button type="default" @click="addFormVisible=true" plain>添加分类</el-button>
      </el-col>
    </el-row>

    <el-table :data="ordersList" style="width: 100%">
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="order_number" label="订单编号" width="280"></el-table-column>
      <el-table-column prop="order_price" label="价格订单" width="140"></el-table-column>
      <el-table-column prop="order_pay" label="是否付款" width="140">
        <template slot-scope="scope">
          <el-button v-if="scope.row.order_pay==='0'" type="danger" size="mini" plain>未付款</el-button>
          <el-button v-else type="success" size="mini" plain>已付款</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="is_send" label="是否发货" width="140"></el-table-column>
      <el-table-column prop="create_time" label="订单时间" width="140"></el-table-column>
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

    <el-pagination
      :current="senddata.pagenum"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="senddata.pagesize"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
 
    <el-dialog title="收货地址" :visible.sync="dirFormVisible">
      <el-form >
        <el-form-item label="省市区" >
          <el-cascader
            expand-trigger="hover"
            :options="options"
            v-model="selectedOptions2"
           
          ></el-cascader>
          <v-distpicker></v-distpicker>
        </el-form-item>
        <el-form-item label="详细地址" >
          <el-input placeholder></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dirFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dirFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import options from "../assets/city_data2017_element.js";
import VDistpicker from 'v-distpicker'
export default {
  data() {
    return {
      ordersList: [{}, {}],
      senddata: {
        pagenum: 1,
        pagesize: 10
      },
      total: 0,
      options,
      selectedOptions2: [],
      dirFormVisible: false,
      
    };
  },
  methods: {
    handle(val) {
      this.dirFormVisible = true;
    },
    async getorder() {
      let res = await this.$axios.get("orders", { params: this.senddata });
      console.log(res);
      this.ordersList = res.data.data.goods;
      this.total = res.data.data.total;
    },
    handleSizeChange(val) {
      this.senddata.pagesize = val;
      this.getorder();
    },
    handleCurrentChange(val) {
      this.senddata.pagenum = val;
      this.getorder();
    }
  },
  components: { VDistpicker },
  created() {
    this.getorder();
  }
};
</script>
<style>
</style>
