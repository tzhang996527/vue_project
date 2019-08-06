<template>
  <div>
    <!-- dialg -->
    <el-dialog
      title="车辆维护"
      :visible.sync="dialogFormVisible"
      width="60%"
      label-width="100px"
      label-position="left">
      <el-form ref="ruleForm" :model="form" label-width="80px" class="demo-ruleForm">
        <el-row>
          <el-col :span="12">
            <el-form-item label="车辆编号" prop="name" style>
              <el-col :span="12">
                <el-input maxlength="10" v-model="form.assetId"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="车牌号码" prop="name" style>
              <el-col :span="12">
                <el-input maxlength="10" v-model="form.platenumber"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="车辆类型">
              <el-col :span="12">
                <!-- <el-input maxlength="30" v-model="form.assetType"></el-input> -->
                <el-select v-model="form.assetType" placeholder="请选择">
                  <el-option
                    v-for="item in tableAssetType"
                    :key="item.assetType"
                    :label="item.assetText"
                    :value="item.assetType"
                  ></el-option>
                </el-select>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="制造商">
              <el-col :span="12">
                <el-input maxlength="10" v-model="form.make"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="车辆型号" style>
              <el-col :span="12">
                <el-input maxlength="10" v-model="form.model"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="VIN" style>
              <el-col :span="12">
                <el-input maxlength="10" v-model="form.vin"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="出厂日期" style>
              <el-col :span="12">
                <el-input maxlength="10" v-model="form.year"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所在地" style>
              <el-col :span="12">
                <el-select
                  v-model="form.location"
                  placeholder="请选择"
                  filterable
                  :default-first-option="true">
                  <el-option
                    v-for="item in locations"
                    :key="item.locId"
                    :label="item.address"
                    :value="item.locId">
                    <span style="float: left">{{ item.address }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.locId }}</span>
                  </el-option>
                </el-select>
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
          <el-form-item label="车辆编号">
            <el-input v-model="formInline.assetId" placeholder="车辆编号"></el-input>
          </el-form-item>
          <el-form-item label="车辆类型">
            <el-input v-model="formInline.assetType" placeholder="车辆类型"></el-input>
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

          <el-table-column prop="assetId" label="车辆编号" sortable width="100" fixed></el-table-column>
          <el-table-column label="车型" width="180">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.assetType }}</span>
            </template>
          </el-table-column>

          <el-table-column label="车牌号" width="180">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.platenumber }}</span>
            </template>
          </el-table-column>

          <el-table-column prop="status" label="车辆状态" width="180" :formatter="formatStatus">
          </el-table-column>
          <el-table-column label="制造商" width="180">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.make }}</span>
            </template>
          </el-table-column>

          <el-table-column label="车型" width="180">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.model }}</span>
            </template>
          </el-table-column>

          <el-table-column label="车辆识别号" width="180">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.vin }}</span>
            </template>
          </el-table-column>

          <el-table-column label="出厂日期" width="180">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.year }}</span>
            </template>
          </el-table-column>

          <el-table-column label="所在地" width="180">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.location }}</span>
            </template>
          </el-table-column>
          <el-table-column label="创建人" width="180">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.createdBy }}</span>
            </template>
          </el-table-column>

          <el-table-column prop = "createdOn" label="创建日期" width="180" :formatter="this.util.dateFormat">
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
//asset.vue要访问util.js需要返回上级目录components的上级目录src,然后再访问/components/store/util
// import {formatDate} from '../../components/store/util'
import {Dateformat} from '../store/util' //访问上级目录(components)下的store/util

export default {
  data() {
    return {
      search: "",
      edit: false,
      form: {
        assetType: "",
        assetId: "",
        platenumber: "",
        make: "",
        model: "",
        vin: "",
        year: "",
        hardware: "",
        location: ""
      },
      formInline: {
        assetType: "",
        assetId: ""
      },
      dialogTableVisible: false,
      dialogFormVisible: false,
      tableData: [],
      tableAssetType: [],
      locations:[]
    };
  },
  //用于数据初始化
  created: function() {
    if (this.MT_DATA) {
      this.locations = this.MT_DATA.locations;
    }

    this.$axios
      .get("/api/v1/assetDetail", {
        params: {
          assetType: null,
          assetId: null
        }
      })
      .then(response => {
        this.tableData = response.data;
      })
      .catch(function(error) {
        alert(error);
      });

    // Init get asset type
    this.$axios
      .get("/api/v1/assetType", {
        params: {
          assetType: null,
          assetText: null
        }
      })
      .then(response => {
        this.tableAssetType = response.data;
      })
      .catch(function(error) {
        alert(error);
      });
  },
  methods: {
    formatStatus:function(row, column, cellValue, index){
      if(cellValue === "1"){
        return "可用";
      }else if(cellValue === "2"){
        return "使用中";
      }else{
        return "未知";
      }
    },
    handleEdit(index, row) {
      // this.edit = true;
      // this.dialogFormVisible = true;
      // this.form = row;
      // debugger;
      var info = {id:row.assetId,message:"成功"};
      this.$router.push({name:'AssetEdit',params:info})
    },
    handleDelete(index, row) {
      this.$axios({
        url: "/api/v1/asset/" + row.assetId,
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
        .get("/api/v1/asset", {
          params: {
            assetType: this.formInline.assetType,
            assetId: this.formInline.assetId
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
      this.$router.push({name:'AssetCreate'});
      // this.dialogFormVisible = true;
      // this.edit = false;
      // this.form.assetId = "";
      // this.form.assetType = "";
      // this.form.platenumber = "";
      // this.form.make = "";
      // this.form.model = "";
      // this.form.vin = "";
      // this.form.year = "";
      // this.form.hardware = "";
      // this.form.location = "";
    },
    onSubmit() {
      // var axios = require("axios");
      // axios.defaults.baseURL = process.env.API;
      this.dialogFormVisible = false;
      if (this.edit === false) {
        this.$axios({
          url: "/api/v1/asset",
          method: "post",
          data: this.form,
          // data: {
          //   assetId: this.form.assetId,
          //   assetType: this.form.assetType,
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
            this.form.assetId = "";
            this.form.assetType = "";
            this.tableData = successResponse.data;
          })
          .catch(failResponse => {
            debugger;
            console.log(failResponse);
          });
      } else {
        this.$axios({
          url: "/api/v1/asset",
          method: "put",
          data: this.form,
          // data: {
          //   assetType: this.form.assetType,
          //   assetId: this.form.assetId
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
            this.form.assetType = "";
            this.form.assetId = "";
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