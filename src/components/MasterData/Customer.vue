<template>
  <div>
    <!-- dialg -->
    <el-dialog
      title="客户数据维护"
      :visible.sync="dialogFormVisible"
      width="30%"
      label-width="100px"
      label-position="left"
    >
      <el-form :rules="rules" ref="ruleForm" :model="form" label-width="80px" class="demo-ruleForm">
        <el-row>
          <el-col :span="18">
            <el-form-item label="客户编号" prop="custId" style>
              <el-col :span="12">
                <el-input maxlength="10" v-model="form.custId"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item label="客户类型">
              <el-col :span="18">
                <el-input maxlength="30" v-model="form.type"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item label="客户名称">
              <el-col :span="18">
                <el-input maxlength="30" v-model="form.name"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item label="客户地址">
              <el-col :span="18">
                <el-input maxlength="30" v-model="form.address"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <el-row>
      <el-col :span="24">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="客户编号">
            <el-input v-model="formInline.custId" placeholder="客户编号"></el-input>
          </el-form-item>
          <el-form-item label="客户类型">
            <el-input v-model="formInline.type" placeholder="客户类型"></el-input>
          </el-form-item>
          <el-form-item label="客户描述">
            <el-input v-model="formInline.name" placeholder="客户描述"></el-input>
          </el-form-item>
          <el-form-item label="客户地址">
            <el-input v-model="formInline.address" placeholder="客户地址"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onGet">查询</el-button>
            <el-button type="primary" @click="onCreate">创建</el-button>
            <!-- dialog -->
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6"></el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple"></div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table :data="tableData" style="width: 100%" stripe>
          <el-table-column type="index" width="50"></el-table-column>

          <el-table-column label="客户编号" sortable width="180">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.custId }}</span>
            </template>
          </el-table-column>
          <el-table-column label="客户类型" width="180">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>编号: {{ scope.row.custId }}</p>
                <p>客户类型: {{ scope.row.type }}</p>
                <div slot="reference" class="custId-wrapper">
                  <el-tag size="medium">{{ scope.row.type }}</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="客户名称" sortable width="180">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="客户地址" sortable width="120">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.address }}</span>
            </template>
          </el-table-column>
          <el-table-column label="创建人" width="100">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.createdBy }}</span>
            </template>
          </el-table-column>

          <el-table-column label="创建日期" width="120" :formatter="formatDate">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.createdOn }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      search: "",
      edit: false,
      form: {
        custId: "",
        type: "",
        name:"",
        address:""
      },
      rules: {
        custId: [
          { required: true, message: "请输入客户编号", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ]
      },
      formInline: {
        custId: "",
        type: "",
        name:"",
        address:""
      },
      dialogTableVisible: false,
      dialogFormVisible: false,
      tableData: []
    };
  },
  //用于数据初始化
  created: function() {
    this.$axios
      .get("/api/v1/customer",{
        params: {
            custId: null,
            type: null
          }
      })
      .then(response => {
        this.tableData = response.data;
      })
      .catch(function(error) {
        alert(error);
      });
  },
  methods: {
    formatDate: function(row, column) {
      debugger;
      return row.createdBy;
    },
    handleEdit(index, row) {
      this.edit = true;
      this.dialogFormVisible = true;
      this.form.custId = row.custId;
      this.form.type = row.type;
      this.form.name = row.name;
      this.form.address = row.address;
      debugger;
      console.log(index, row.createdBy);
    },
    handleDelete(index, row) {
      this.$axios({
        url: "/api/v1/customer/" + row.custId,
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          Origin: "http://localhost:8080"
        }
      })
        .then(successResponse => {
          debugger;
          this.tableData = successResponse.data;
        })
        .catch(failResponse => {
          console.log(failResponse);
        });
      console.log(index, row);
    },
    onGet() {
      debugger;

      this.$axios
        .get("/api/v1/customer", {
          params: {
            custId: this.formInline.custId,
            type: this.formInline.type,
            name:this.formInline.name,
            address:this.formInline.address
          }
        })
        .then(response => {
          this.tableData = response.data;
        })
        .catch(function(error) {
          alert(error);
        });
    },
    onCreate() {
      this.dialogFormVisible = true;
      this.edit = false;
      this.form.custId = "";
      this.form.type = "";
      this.form.name = "";
      this.form.address = "";
    },
    onSubmit() {
      // var axios = require("axios");
      // axios.defaults.baseURL = process.env.API;
      this.dialogFormVisible = false;
      debugger;
      if (this.edit === false) {
        this.$axios({
          url: "/api/v1/customer",
          method: "post",
          data: {
            custId: this.form.custId,
            type: this.form.type,
            name: this.form.name,
            address: this.form.address,
            del: ""
          },
          headers: {
            "Content-Type": "application/json",
            Origin: "http://localhost:8080"
          }
        })
          .then(successResponse => {
            debugger;
            // this.responseResult = JSON.stringify(successResponse.data)
            // // if (successResponse.data.code === 200) {
            // this.$router.replace({path: '/index'})
            // }
            console.log(successResponse.data);
            this.form.custId = "";
            this.form.type = "";
            this.form.name="";
            this.form.address = "";
            this.tableData = successResponse.data;
          })
          .catch(failResponse => {
            console.log(failResponse);
          });
      } else {
        this.$axios({
          url: "/api/v1/customer",
          method: "put",
          data: {
            custId: this.form.custId,
            type: this.form.type,
            name: this.form.name,
            address: this.form.address
          },
          headers: {
            "Content-Type": "application/json",
            Origin: "http://localhost:8080"
          }
        })
          .then(successResponse => {
            debugger;
            // this.responseResult = JSON.stringify(successResponse.data)
            // // if (successResponse.data.code === 200) {
            // this.$router.replace({path: '/index'})
            // }
            console.log(successResponse.data);
            this.form.custId = "";
            this.form.type = "";
            this.form.name="";
            this.form.address = "";
            this.tableData = successResponse.data;
          })
          .catch(failResponse => {
            console.log(failResponse);
          });
      }
    }
  }
};
</script>