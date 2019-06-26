<template>
  <div>
    <el-row>
      <el-col :span="24">
        <h1>创建行程</h1>
        <el-form :inline="true" :model="formInline" class="demo-form-inline" title="行程查询">
          <el-form-item label="行程编号">
            <el-input  prefix-icon="el-icon-search" v-model="formInline.tourid" placeholder="请输入行程编号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit" icon="el-icon-search">查询</el-button>
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
      formInline: {
          tourid: ''
        },
      tourid: "",
      activeName: "second"
    };
  },
  methods: {
    onSubmit() {
      debugger
      // var url = "/TourMain/tourlist";
      var info = {id:this.formInline.tourid,message:"成功"};
      var url = "/tourlist";
      // this.$router.push(url);
      this.$router.push({name:'tourlist',params:info})
      console.log(this.formInline.tourid);
    },
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>