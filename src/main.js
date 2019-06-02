import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss'
import 'font-awesome/scss/font-awesome.scss'
import VueAMap from 'vue-amap'
import { lazyAMapApiLoaderInstance } from 'vue-amap';


Vue.use(ElementUI)
Vue.use(VueAMap)
// 引用axios，并设置基础URL为后端服务api地址
// var axios = require('axios')
// axios.defaults.baseURL = 'http://localhost:8443/api'
// 将API方法绑定到全局
// Vue.prototype.$axios = axios
Vue.config.productionTip = false

// https://lbs.amap.com/dev/key/app#
VueAMap.initAMapApiLoader({
  key: '3bc476fcc3ab479e7bdd7656857d2899',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4'
});

lazyAMapApiLoaderInstance.load().then(() => {
  // your code ...
  this.map = new AMap.Map('amapContainer', {
    center: new AMap.LngLat(121.59996, 31.197646)
  });
});

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