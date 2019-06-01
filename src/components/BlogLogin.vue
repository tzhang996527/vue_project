<template>
  <div>
    <blog-header></blog-header>
    <hr/>
    <div>
      用户名:<input type="text" v-model="loginInfoVo.username" placeholder="请输入用户名" />
      <br/>
      密码：<input type="password" v-model="loginInfoVo.password" placeholder="请输入密码" />
      <br/>
      <button v-on:click="login">登录</button>
      <br/>
      登录验证情况：<textarea cols="30" rows="10" v-model="responseResult"></textarea>
    </div>
    <hr/>
    <blog-footer></blog-footer>
  </div>
</template>

<script>
import blogHeader from '@/components/BlogHeader.vue'
import blogFooter from '@/components/BlogFooter.vue'

export default {
  name: 'BlogLogin',
  // blogHeader、blogFooter组件给申明到components里面然后在template里面使用
  components: { blogHeader, blogFooter },
  data () {
    return {
      loginInfoVo: { username: '', password: '' },
      responseResult: []
    }
  },
  methods: {
    login () {
      var axios = require('axios')
      axios.defaults.baseURL = process.env.API

      axios({
        url: '/login',
        method: 'post',
        data: {
          username: this.loginInfoVo.username,
          password: this.loginInfoVo.password
        },
        transformRequest: [function (data) {
          // Do whatever you want to transform the data
          let ret = ''
          for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }],
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Origin':'http://localhost:8080'
        }
      }).then(successResponse => {
          this.responseResult = JSON.stringify(successResponse.data)
          if (successResponse.data.code === 200) {
            this.$router.replace({path: '/index'})
          }
        })
        .catch(failResponse => {
          console.log("a")
        })

      axios.get('/api/v1/tour').then(function (response) {
      　　alert(''.concat(response.data, '\r\n', response.status, '\r\n', response.statusText, '\r\n', response.headers, '\r\n', response.config));
      }).catch(function (error) {
      　　alert(error);
      });
      // axios
      //   .post('/api/login', 
      //   {
      //     username: this.loginInfoVo.username,
      //     password: this.loginInfoVo.password
      //   },
      //   {
      //       'Content-Type': 'application/x-www-form-urlencoded',
      //       'withCredentials': 'ture',
      //       'Origin':'http://localhost:8080'
      //   })
      //   .then(successResponse => {
      //     this.responseResult = JSON.stringify(successResponse.data)
      //     if (successResponse.data.code === 200) {
      //       this.$router.replace({path: '/index'})
      //     }
      //   })
      //   .catch(failResponse => {})
    }
  }
}
</script>
