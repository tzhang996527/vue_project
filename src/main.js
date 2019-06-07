import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import zconst from './components/store/const'

// import 'font-awesome/scss/font-awesome.scss'

Vue.use(ElementUI)
// Vue.use(VueAMap)
// 引用axios，并设置基础URL为后端服务api地址
// var axios = require('axios')
// axios.defaults.baseURL = 'http://localhost:8443/api'
// 将API方法绑定到全局
axios.defaults.baseURL = process.env.API
Vue.prototype.$axios = axios
Vue.prototype.BASE_URL = zconst.BASE_URL
Vue.config.productionTip = false

/* eslint-disable */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

// https://www.cnblogs.com/wbjxxzx/p/9942867.html
// 将所有未登录会话重定向到 /login
// 用 vue-router 的 beforeEach 实现
// beforeEach 方法接收三个参数：
// to: Route: 即将要进入的目标 路由对象
// from: Route: 当前导航正要离开的路由
// next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
router.beforeEach((to, from, next) => {
  if(to.path === '/login'){
    sessionStorage.removeItem('user');
  }
  var user = sessionStorage.getItem('user');
  if(!user && to.path !== '/login'){
    next({
      path: '/login'
    })
  }else{
    next();
  }
})