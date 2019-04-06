<template>

  <div class="roles">
    <my-bread sectitle="权限管理" thrtitle="角色管理"></my-bread>

    <el-row>
      <el-col :span="7">
        <el-button type="default" @click="eidFormVisible=true" plain>添加用户</el-button>
      </el-col>
    </el-row>

    <el-table :data="rolesList" style="width: 100%">
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="roleName" label="角色名称" width="180"></el-table-column>
      <el-table-column prop="roleDesc" label="角色描述" width="180"></el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            plain
            circle
            @click="addeidfrom(scope.row)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="delfrom(scope.row)"
            plain
            circle
          ></el-button>
          <el-button
            type="success"
            icon="el-icon-check"
            size="mini"
            @click="subtree(scope.row)"
            plain
            circle
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="权限" :visible.sync="eidFormVisible">
      <el-form :model="eidfrom" ref="eidForm" :rules="rules">
        <el-form-item label="权限人名" label-width="100">
          <el-input v-model="eidfrom.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="权限名称" label-width="100">
          <el-input v-model="eidfrom.roleDesc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="eidFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="subadd('eidForm')">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="编辑权利人信息" :visible.sync="bianjiFormVisible">
      <el-form :model="bianjifrom" ref="bianjiForm" :rules="rules">
        <el-form-item label="权限人名" prop="roleName" label-width="100">
          <el-input v-model="bianjifrom.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="权限名称" label-width="100">
          <el-input v-model="bianjifrom.roleDesc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="bianjiFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="bianji('bianjiForm')">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 树形节点 -->

    <el-dialog title="收货地址" :visible.sync="treeFormVisible">
      <el-tree
        :data="treefrom"
        ref='tree'
        show-checkbox
        node-key="id"
        default-expand-all
        :default-checked-keys="checkedid"
        :props="treeProps"
      ></el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="treeFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="edittree">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rolesList: [{}, {}],
      eidFormVisible: false,
      bianjiFormVisible: false,
      treeFormVisible: false,
      addform: {
        roleName: "",
        roleDesc: ""
      },
      eidfrom: {
        roleName: "",
        roleDesc: ""
      },
      rules: {
        roleName: [
          { required: true, message: "角色名称不能为空", trigger: "blur" }
        ]
      },
      bianjifrom: {},
      treefrom: {},
      treeProps: {
        children: "children",
        label: "authName"
      },
      checkedid: [],
      treeid:{}
    };
  },

  methods: {
    //  获取权限消息
    async search() {
      let res = await this.$axios.get("roles");
      // console.log(res);
      this.rolesList = res.data.data;
    },
    // 提交
    async subadd(eidForm) {
      let res = await this.$axios.post("roles", this.eidfrom);
      // console.log(res);
      (this.eidFormVisible = false), this.search();
    },
    // 点击编辑按钮
    async addeidfrom(value) {
      //  console.log(value);

      this.bianjifrom = value;
      // console.log(this.bianjifrom);
      //  let res =await this.$axios.post("")
      this.bianjiFormVisible = true;
    },
    // 提交编辑
    async bianji(bianjiForm) {
      // console.log(this.bianjifrom.id);

      let res = this.$axios.put(`roles/${this.bianjifrom.id}`, {
        roleName: this.bianjifrom.roleName,
        roleDesc: this.bianjifrom.roleDesc
      });
      this.search();
    },
    // 删除
    async delfrom(value) {
      // console.log(value);

      let res = await this.$axios.delete(`roles/${value.id}`);
      if (res.data.meta.status == 200) {
        this.$message.success("删除成功");
      }
      this.search();
    },
    // 角色授权
    async subtree(row) {
      // console.log(row);

      let res = await this.$axios.get(`rights/tree`);
      // console.log(res);
      this.treefrom = res.data.data;
      this.treeFormVisible = true;
      let checkeditem = [];
      function getid(val) {
        if (val.children) {
          val.children.forEach(val => {
            checkeditem.push(val.id);
            getid(val);
          });
        }
      }
      getid(row);
      this.checkedid = checkeditem;
      // console.log(this.checkedid);
      this.treeFormVisible = true;
      this.treeid=row

    },
    async edittree(){
      let rids=  this.$refs.tree.getCheckedKeys().join(',') 
      let res =await this.$axios.post(`roles/${this.treeid.id}/rights`,{rids})
      if (res.data.meta.status === 200) {
        // 重新获取角色数据
        this.search();
        this.treeFormVisible = false;
      }
       let men = await this.$axios.get('menus')
      this.$store.commit('changmen',men.data.data)
    }
  },
  created() {
    this.search();
  }
};
</script>

<style>
</style>
