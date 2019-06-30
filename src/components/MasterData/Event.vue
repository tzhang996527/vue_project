<template>
  <div>
    <!-- dialg -->
    <el-dialog
      title="事件管理"
      :visible.sync="dialogFormVisible"
      width="30%"
      label-width="100px"
      label-position="left"
    >
      <el-form :rules="rules" ref="ruleForm" :model="form" label-width="80px" class="demo-ruleForm">
        <el-row>
          <el-col :span="18">
            <el-form-item label="事件管理" prop="name" style>
              <el-col :span="12">
                <el-input maxlength="10" v-model="form.eventCode"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item label="描述">
              <el-col :span="18">
                <el-input maxlength="30" v-model="form.eventText"></el-input>
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
          <el-form-item label="事件管理">
            <el-input v-model="formInline.eventCode" placeholder="事件管理"></el-input>
          </el-form-item>
          <el-form-item label="类型描述">
            <el-input v-model="formInline.eventText" placeholder="类型描述"></el-input>
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

          <el-table-column label="事件管理" sortable width="180">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.eventCode }}</span>
            </template>
          </el-table-column>
          <el-table-column label="类型描述" width="180">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>类型: {{ scope.row.eventCode }}</p>
                <p>描述: {{ scope.row.eventText }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ scope.row.eventText }}</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="创建人" width="180">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.createdBy }}</span>
            </template>
          </el-table-column>

          <el-table-column label="创建日期" width="180" :formatter="formatDate">
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
        eventCode: "",
        eventText: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入事件管理", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ]
      },
      formInline: {
        eventCode: "",
        eventText: ""
      },
      dialogTableVisible: false,
      dialogFormVisible: false,
      tableData: []
    };
  },
  //用于数据初始化
  created: function() {
    this.$axios
      .get("/api/v1/eventCode",{
        params: {
            eventCode: null,
            eventText: null
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
      this.form.eventCode = row.eventCode;
      this.form.eventText = row.eventText;
      debugger;
      console.log(index, row.createdBy);
    },
    handleDelete(index, row) {
      this.$axios({
        url: "/api/v1/eventCode/" + row.eventCode,
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
        .get("/api/v1/eventCode", {
          params: {
            eventCode: this.formInline.eventCode,
            eventText: this.formInline.eventText
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
      this.form.eventCode = "";
      this.form.eventText = "";
    },
    onSubmit() {
      // var axios = require("axios");
      // axios.defaults.baseURL = process.env.API;
      this.dialogFormVisible = false;
      debugger;
      if (this.edit === false) {
        this.$axios({
          url: "/api/v1/eventCode",
          method: "post",
          data: {
            eventCode: this.form.eventCode,
            eventText: this.form.eventText,
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
            this.form.eventCode = "";
            this.form.eventText = "";
            this.tableData = successResponse.data;
          })
          .catch(failResponse => {
            console.log(failResponse);
          });
      } else {
        this.$axios({
          url: "/api/v1/eventCode",
          method: "put",
          data: {
            eventCode: this.form.eventCode,
            eventText: this.form.eventText
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
            this.form.eventCode = "";
            this.form.eventText = "";
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