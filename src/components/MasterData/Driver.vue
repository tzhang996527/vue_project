<template>
  <div>
    <el-row>
      <el-col :span="24">
        <h1>驾驶员主数据</h1>
        <el-form :inline="true" :model="driver" class="demo-form-inline" title="查询">
          <el-form-item label="司机编号">
            <el-input prefix-icon="el-icon-search" v-model="driver.driverId" placeholder="请输入司机编号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit" icon="el-icon-search">查询</el-button>
            <el-button type="primary" @click="createDriver" icon="el-icon-search">创建</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row>
      <router-view></router-view>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: {},
      driver: {
        driverId: ""
      },
      tourid: "",
      activeName: "second"
    };
  },
  methods: {
    createDriver() {
      this.$axios({
        url: "/api/v1/driver",
        method: "post",
        data: {
          driverId: this.driver.driverId,
          name: this.driver.driverId,
          location:"LOC1",
          tel:"+021 88888"
        },
        headers: {
          "Content-Type": "application/json",
          Origin: "http://localhost:8080"
        }
      })
        .then(successResponse => {
          debugger;
          console.log(successResponse.data);
        })
        .catch(failResponse => {
          console.log(failResponse);
        });
    },
    onSubmit() {
      debugger;
      this.$axios
        .get("/api/v1/driver", {
          params: {
            driverId: null //this.driver.driverId,
            // name: '小明'
          }
        })
        .then(response => {
          debugger;
          this.tableData = response.data;
        })
        .catch(function(error) {
          debugger;
          alert(error);
        });
    },
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>