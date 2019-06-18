<template>
  <div>
    <h1>Article</h1>
    <el-button type="primary" @click="onSubmit">显示</el-button>
    <el-button>取消</el-button>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName: 'second',
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      }
    };
  },
  methods: {
    onSubmit() {
      this.$router.push('/TourMain/tourlist')
      console.log("submit!");
    },
    handleClick(tab, event) {
        console.log(tab, event);
    }
  }
};
</script>