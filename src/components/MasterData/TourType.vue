<template>
  <div>
    <!-- dialg -->
    <el-dialog
      title="行程类型"
      :visible.sync="dialogFormVisible"
      width="30%"
      label-width="100px"
      label-position="left"
    >
      <el-form :rules="rules" ref="ruleForm" :model="form" label-width="80px" class="demo-ruleForm">
        <el-row>
          <el-col :span="18">
            <el-form-item label="行程类型" prop="name" style>
              <el-col :span="12">
                <el-input maxlength="10" v-model="form.tourType"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item label="描述">
              <el-col :span="18">
                <el-input maxlength="30" v-model="form.text"></el-input>
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
      <el-col :span="18">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="行程类型">
            <el-input v-model="formInline.tourType" placeholder="行程类型"></el-input>
          </el-form-item>
          <el-form-item label="类型描述">
            <el-input v-model="formInline.text" placeholder="类型描述"></el-input>
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

          <el-table-column label="行程类型" sortable width="180">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.tourType }}</span>
            </template>
          </el-table-column>
          <el-table-column label="类型描述" width="180">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>类型: {{ scope.row.tourType }}</p>
                <p>描述: {{ scope.row.text }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ scope.row.text }}</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="创建人" width="180">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.createdBy }}</span>
            </template>
          </el-table-column>

          <el-table-column prop="createdOn" label="创建日期" width="180" :formatter="this.util.dateFormat">
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
        tourType: "",
        text: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入行程类型", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ]
      },
      formInline: {
        tourType: "",
        text: ""
      },
      dialogTableVisible: false,
      dialogFormVisible: false,
      tableData: []
    };
  },
  //用于数据初始化
  created: function() {
    this.$axios
      .get("/api/v1/tourType",{
        params: {
            tourType: null,
            text: null
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
    handleEdit(index, row) {
      this.edit = true;
      this.dialogFormVisible = true;
      this.form.tourType = row.tourType;
      this.form.text = row.text;
      debugger;
      console.log(index, row.createdBy);
    },
    handleDelete(index, row) {
      this.$axios({
        url: "/api/v1/tourType/" + row.tourType,
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
        .get("/api/v1/tourType", {
          params: {
            tourType: this.formInline.tourType,
            text: this.formInline.text
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
      this.form.tourType = "";
      this.form.text = "";
    },
    onSubmit() {
      // var axios = require("axios");
      // axios.defaults.baseURL = process.env.API;
      this.dialogFormVisible = false;
      debugger;
      if (this.edit === false) {
        this.$axios({
          url: "/api/v1/tourType",
          method: "post",
          data: {
            tourType: this.form.tourType,
            text: this.form.text,
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
            this.form.tourType = "";
            this.form.text = "";
            this.tableData = successResponse.data;
          })
          .catch(failResponse => {
            console.log(failResponse);
          });
      } else {
        this.$axios({
          url: "/api/v1/tourType",
          method: "put",
          data: {
            tourType: this.form.tourType,
            text: this.form.text
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
            this.form.tourType = "";
            this.form.text = "";
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