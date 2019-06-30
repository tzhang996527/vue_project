<template>
  <div>
    <!-- dialg -->
    <el-dialog
      title="仓库维护"
      :visible.sync="dialogFormVisible"
      width="60%"
      label-width="100px"
      label-position="left"
    >
      <el-form :rules="rules" ref="ruleForm" :model="form" label-width="80px" class="demo-ruleForm">
        <el-row>
          <el-col :span="12">
            <el-form-item label="仓库编号" prop="name" style>
              <el-col :span="12">
                <el-input maxlength="10" v-model="form.locId"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="省份" style>
              <el-col :span="12">
                <el-input maxlength="10" v-model="form.province"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item label="地址">
              <el-col :span="18">
                <el-input maxlength="50" v-model="form.address"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="城市" style>
              <el-col :span="12">
                <el-input maxlength="10" v-model="form.city"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="区域" style>
              <el-col :span="12">
                <el-input maxlength="10" v-model="form.district"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="邮编" style>
              <el-col :span="12">
                <el-input maxlength="10" v-model="form.postalCode"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="经度" style>
              <el-col :span="12">
                <el-input maxlength="10" v-model="form.lng"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="纬度" style>
              <el-col :span="12">
                <el-input maxlength="10" v-model="form.lat"></el-input>
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
          <el-form-item label="仓库编号">
            <el-input v-model="formInline.locId" placeholder="仓库编号"></el-input>
          </el-form-item>
          <el-form-item label="地址">
            <el-input v-model="formInline.address" placeholder="地址"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="省份">
            <el-input v-model="formInline.province" placeholder="省份"></el-input>
          </el-form-item>
          <el-form-item label="城市">
            <el-input v-model="formInline.city" placeholder="城市"></el-input>
          </el-form-item>
          <el-form-item label="区域">
            <el-input v-model="formInline.district" placeholder="区域"></el-input>
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
          <el-table-column type="index" width="50" fixed></el-table-column>

          <el-table-column prop="locId" label="仓库编号" sortable width="180" fixed></el-table-column>
          <el-table-column label="地址" width="180">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>经度: {{ scope.row.lng }}</p>
                <p>维度: {{ scope.row.lat }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ scope.row.address }}</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="省份" width="180">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.province }}</span>
            </template>
          </el-table-column>

          <el-table-column label="城市" width="180">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.city }}</span>
            </template>
          </el-table-column>

          <el-table-column label="区域" width="180">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.district }}</span>
            </template>
          </el-table-column>

          <el-table-column label="邮编" width="180">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.postalCode }}</span>
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
          <el-table-column label="操作" fixed="right" width="180">
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
        locId: "",
        address: "",
        lng: "",
        lat: "",
        city: "",
        province: "",
        district: "",
        postalCode: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入车辆类型", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ]
      },
      formInline: {
        locId: "",
        address: "",
        city: "",
        province: "",
        district: ""
      },
      dialogTableVisible: false,
      dialogFormVisible: false,
      tableData: []
    };
  },
  //用于数据初始化
  created: function() {
    this.$axios
      .get("/api/v1/loc", {
        params: {
          locId: "",
          address: ""
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
      this.form.locId = row.locId;
      this.form.address = row.address;
      this.form.lng = row.lng;
      this.form.lat = row.lat;
      this.form.city = row.city;
      this.form.province = row.province;
      this.form.district = row.district;
      this.form.postalCode = row.postalCode;
      debugger;
      console.log(index, row.createdBy);
    },
    handleDelete(index, row) {
      this.$axios({
        url: "/api/v1/loc/" + row.locId,
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
        .get("/api/v1/loc", {
          params: this.formInline
          // params: {
          //   locId: this.formInline.locId,
          //   address: this.formInline.address,
          //   city: this.formInline.city,
          //   province: this.formInline.province,
          //   district: this.formInline.district
          // }
        })
        .then(response => {
          debugger;
          this.tableData = response.data;
        })
        .catch(function(error) {
          alert(error);
        });
    },
    onCreate() {
      this.dialogFormVisible = true;
      this.edit = false;
      this.form.locId = "";
      this.form.address = "";
      this.form.lng = "";
      this.form.lat = "";
      this.form.city = "";
      this.form.province = "";
      this.form.district = "";
      this.form.postalCode = "";
    },
    onSubmit() {
      // var axios = require("axios");
      // axios.defaults.baseURL = process.env.API;
      this.dialogFormVisible = false;
      debugger;
      if (this.edit === false) {
        this.$axios({
          url: "/api/v1/loc",
          method: "post",
          data: this.form,
          // data: {
          //   locId: this.form.locId,
          //   address: this.form.address,
          //   del: ""
          // },
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
            this.form.locId = "";
            this.form.address = "";
            this.form.lng = "";
            this.form.lat = "";
            this.form.city = "";
            this.form.province = "";
            this.form.district = "";
            this.form.postalCode = "";
            this.tableData = successResponse.data;
          })
          .catch(failResponse => {
            console.log(failResponse);
          });
      } else {
        this.$axios({
          url: "/api/v1/loc",
          method: "put",
          data: this.form,
          // data: {
          //   locId: this.form.locId,
          //   address: this.form.address
          // },
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
            this.form.locId = "";
            this.form.address = "";
            this.form.lng = "";
            this.form.lat = "";
            this.form.city = "";
            this.form.province = "";
            this.form.district = "";
            this.form.postalCode = "";
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