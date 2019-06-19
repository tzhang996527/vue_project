<template>
  <div>
    <el-row>
      <el-col :span="12">
        <div class="grid-content bg-purple">
          <el-form ref="form" :model="header" label-width="80px">
            <el-form-item label="行程编号">
              <el-input v-model="header.tourid"></el-input>
            </el-form-item>
            <el-form-item label="发车地点">
              <el-select v-model="header.sourceLoc.address"></el-select>
            </el-form-item>
            <el-form-item label="出发时间">
              <el-col :span="11">
                <el-date-picker type="date" v-model="header.planDepart" style="width: 100%;"></el-date-picker>
              </el-col>
            </el-form-item>
            <el-form-item label="目的地址">
              <el-select v-model="header.destloc.address"></el-select>
            </el-form-item>
            <el-form-item label="预计达到">
              <el-col :span="11">
                <el-date-picker type="date" v-model="header.planArr" style="width: 100%;"></el-date-picker>
              </el-col>
            </el-form-item>
            <!-- <el-form-item>
              <el-button type="primary" @click="onSubmit">立即创建</el-button>
              <el-button>取消</el-button>
            </el-form-item>-->
          </el-form>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple-light"></div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="18">
        <div class="grid-content bg-purple-light">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="车辆监控" name="fourth">车辆监控</el-tab-pane>
            <el-tab-pane label="车辆信息" name="first">车辆信息</el-tab-pane>
            <el-tab-pane label="停靠站点" name="second">停靠站点</el-tab-pane>
            <el-tab-pane label="货物清单" name="third">货物清单</el-tab-pane>
            <el-tab-pane label="事件管理" name="five">事件管理</el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName: "second",
      header: {
        tourid: "",
        sourceLoc: {
          address: ""
        },
        destloc: {
          address: ""
        },
        planDepart: "",
        planArr: ""
      }
    };
  },
  created() {
    debugger;
    this.getParams();
    this.getTour();
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    handleClick(tab, event) {
      // console.log(this.$parent.$data.formInline.tourid);
      console.log(tab, event);
    },
    getParams: function() {
      // 取到路由带过来的参数
      debugger;
      var routerParams = this.$route.params.id;
      // 将数据放在当前组件的数据内
      console.log("传来的参数==" + routerParams);
      this.header.tourid = routerParams;
    },
    getTour() {
      this.$axios
        .get("/api/v1/tourDetail", {
          params: {
            tourid: this.header.tourid
          }
        })
        .then(response => {
          this.header = response.data[0];
          debugger;
          // this.header = {
          //   tourid: "",
          //   sourceLoc: {
          //     address: ""
          //   },
          //   destloc: {
          //     address: ""
          //   },
          //   planDepart: "",
          //   planArr: ""
          // };
        })
        .catch(function(error) {
          alert(error);
        });
    }
  }
};
</script>