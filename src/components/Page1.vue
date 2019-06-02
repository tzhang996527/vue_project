<template>
  <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      fixed
      prop="tourid"
      label="运输单号"
      width="150">
    </el-table-column>
    <el-table-column
      prop="tourType"
      label="车辆类型"
      width="120">
    </el-table-column>
    <el-table-column
      prop="shipTo"
      label="送达方"
      width="120">
    </el-table-column>
    <el-table-column
      prop="sourceLocid"
      label="始发仓库"
      width="120">
    </el-table-column>
    <el-table-column
      prop="destLocid"
      label="发货仓库"
      width="300">
    </el-table-column>
    <el-table-column
      prop="vehicleId"
      label="车辆编号"
      width="120">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        <el-button type="text" size="small">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- // actArr: "2019-05-29T00:00:00.000+0000"
// actDepart: "2019-05-29T00:00:00.000+0000"
// createdBy: "ADMIN"
// createdOn: "2019-05-29T00:00:00.000+0000"
// custId: "CUST1"
// del: ""
// destLocid: "LOC2"
// driverId: "DRIVER1"
// eta: "2019-05-29T00:00:00.000+0000"
// exeStatus: "01"
// planArr: "2019-05-29T00:00:00.000+0000"
// planDepart: "2019-05-29T00:00:00.000+0000"
// shipTo: "CUST1"
// sourceLocid: "LOC1"
// tourid: "2100000001"
// tourType: "LONG"
// vehicleId: "TRUCK01" -->
</template>



<script>
  export default {
    methods: {
      handleClick(row) {
        console.log(row);
      }
    },

    data() {
      return {
        tableData: []
      }
    },
    //用于数据初始化
    created:function(){
      var axios = require('axios')
      axios.defaults.baseURL = process.env.API
      axios.get('/api/v1/tour').then(response => {
      　this.tableData = response.data;　

      }).catch(function (error) {
      　　alert(error);
      });
    },
  }
</script>