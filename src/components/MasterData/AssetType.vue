<template>
  <div>
    <el-row>
      <el-col :span="18">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="车辆类型">
            <el-input v-model="formInline.user" placeholder="车辆类型"></el-input>
          </el-form-item>
          <el-form-item label="类型描述">
            <el-select v-model="formInline.region" placeholder="类型描述">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
            <el-button type="primary" @click="dialogFormVisible = true">创建</el-button>
            <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
              <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="车辆类型">
                  <el-input maxlength="10" v-model="form.assetType"></el-input>
                </el-form-item>
                <el-form-item label="描述">
                  <el-input maxlength="30" v-model="form.assetText"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="onSubmit">创建</el-button>
                  <el-button>取消</el-button>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
              </div>
            </el-dialog>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="车辆类型">
              <el-input maxlength="10" v-model="form.assetType"></el-input>
            </el-form-item>
            <el-form-item label="描述">
              <el-input maxlength="30" v-model="form.assetText"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">创建</el-button>
              <el-button>取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
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
      <el-col :span="18">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column label="日期" width="180">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.date }}</span>
            </template>
          </el-table-column>
          <el-table-column label="姓名" width="180">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>姓名: {{ scope.row.name }}</p>
                <p>住址: {{ scope.row.address }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ scope.row.name }}</el-tag>
                </div>
              </el-popover>
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
        <el-row>
      <el-col :span="18">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column label="日期" width="180">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.date }}</span>
            </template>
          </el-table-column>
          <el-table-column label="姓名" width="180">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>姓名: {{ scope.row.name }}</p>
                <p>住址: {{ scope.row.address }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ scope.row.name }}</el-tag>
                </div>
              </el-popover>
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
      form: {
        assetType: "",
        assetText: ""
      },
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      formLabelWidth: "120px",
      formInline: {
        user: "",
        region: ""
      },
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  },
  methods: {
    formatter(row, column) {
      return row.address;
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    onSubmit() {
      var axios = require("axios");
      axios.defaults.baseURL = process.env.API;

      axios({
        url: "/api/v1/assetType",
        method: "post",
        data: {
          assetType: this.form.assetType,
          assetText: this.form.assetText,
          del: ""
        },
        // transformRequest: [
        //   function(data) {
        //     // Do whatever you want to transform the data
        //     let ret = "";
        //     for (let it in data) {
        //       ret +=
        //         encodeURIComponent(it) +
        //         "=" +
        //         encodeURIComponent(data[it]) +
        //         "&";
        //     }
        //     return ret;
        //   }
        // ],
        headers: {
          "Content-Type": "application/json",
          Origin: "http://localhost:8080"
        }
      })
        .then(successResponse => {
          // this.responseResult = JSON.stringify(successResponse.data)
          // // if (successResponse.data.code === 200) {
          // this.$router.replace({path: '/index'})
          // }
          console.log(successResponse.data);
        })
        .catch(failResponse => {
          console.log(failResponse);
        });
      console.log("submit!");
    }
  }
};
</script>