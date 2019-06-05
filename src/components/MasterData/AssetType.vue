<template>
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
</template>
<script>
export default {
  data() {
    return {
      form: {
        assetType: "",
        assetText: ""
      }
    };
  },
  methods: {
    onSubmit() {
      var axios = require("axios");
      axios.defaults.baseURL = process.env.API;

      axios({
        url: "/api/v1/assetType",
        method: "post",
        data: {
          assetType: this.form.assetType,
          assetText: this.form.assetText,
          del:""
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