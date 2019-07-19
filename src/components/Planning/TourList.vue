<template>
  <div>
    <!-- dialg -->
    <el-dialog
      title="行程管理"
      :visible.sync="dialogFormVisible"
      width="30%"
      label-width="100px"
      label-position="left">
      <el-form :rules="rules" ref="ruleForm" :model="form" label-width="80px" class="demo-ruleForm">
        <el-row>
          <el-col :span="18">
            <el-form-item label="行程编号" prop="name" style>
              <el-col :span="12">
                <el-input maxlength="10" v-model="form.tourid"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item label="类型">
              <el-col :span="18">
                <el-input maxlength="30" v-model="form.tourType"></el-input>
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
          <el-form-item label="行程编号">
            <el-input v-model="formInline.tourid" placeholder="行程编号"></el-input>
          </el-form-item>
          <el-form-item label="类型">
            <el-input v-model="formInline.tourType" placeholder="类型"></el-input>
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

          <el-table-column label="行程编号" sortable width="120">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.tourid }}</span>
            </template>
          </el-table-column>
          <el-table-column label="类型" width="80">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>类型: {{ scope.row.tourid }}</p>
                <p>描述: {{ scope.row.tourType }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ scope.row.tourType }}</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="发车地点" width="180">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.sourceLoc.address }}</span>
            </template>
          </el-table-column>
          <el-table-column label="发车时间" width="180">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.planDepart }}</span>
            </template>
          </el-table-column>

          <el-table-column label="目的地址" width="180">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.destLoc.address }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="handleDetail(scope.$index, scope.row)">明细</el-button>
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
        tourid: "",
        tourType: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入行程编号", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ]
      },
      formInline: {
        tourid: "",
        tourType: "",
        sourceLocid:"",
        destLocid:"",
        vehicleId:"",
        driverId:"",
        shipTo:"",

      },
      dialogTableVisible: false,
      dialogFormVisible: false,
      tableData: []
    };
  },
  //用于数据初始化
  created: function() {
    this.$axios
      .get("/api/v1/tour",{
        params: {
            tourid: null,
            tourType: null
          }
      })
      .then(response => {
        debugger
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
    handleDetail(index, row){
      debugger
      // var url = "/TourMain/tourlist";
      var info = {id:row.tourid,message:"成功"};
      this.$router.push({name:'TourDetail',params:info})
      console.log(this.formInline.tourid);
    },
    handleEdit(index, row) {
      var info = {id:row.tourid,message:"成功"};
      this.$router.push({name:'EditTour',params:info})
    },
    handleDelete(index, row) {
      this.$axios({
        url: "/api/v1/tour/" + row.tourid,
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
        .get("/api/v1/tour", {
          params: {
            tourid: this.formInline.tourid,
            tourType: this.formInline.tourType
          }
        })
        .then(response => {
          debugger
          this.tableData = response.data;
        })
        .catch(function(error) {
          alert(error);
        });
    },
    onCreate() {
      this.dialogFormVisible = true;
      this.edit = false;
      this.form.tourid = "";
      this.form.tourType = "";
    },
    onSubmit() {
      // var axios = require("axios");
      // axios.defaults.baseURL = process.env.API;
      this.dialogFormVisible = false;
      debugger;
      if (this.edit === false) {
        this.$axios({
          url: "/api/v1/tour",
          method: "post",
          data: {
            tourid: this.form.tourid,
            tourType: this.form.tourType,
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
            this.form.tourid = "";
            this.form.tourType = "";
            this.tableData = successResponse.data;
          })
          .catch(failResponse => {
            console.log(failResponse);
          });
      } else {
        this.$axios({
          url: "/api/v1/tour",
          method: "put",
          data: {
            tourid: this.form.tourid,
            tourType: this.form.tourType
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
            this.form.tourid = "";
            this.form.tourType = "";
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