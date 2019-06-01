import Vue from 'vue'
import Router from 'vue-router'
import BlogLogin from '@/components/BlogLogin.vue'
import HomeIndex from '@/components/home/HomeIndex.vue'

import Home from '@/components/Home'
// import Login from '@/components/Login'
import Page1 from '@/components/page1'
import Page2 from '@/components/page2'
import Page3 from '@/components/page3'

Vue.use(Router)

// 嵌套路由
// https://router.vuejs.org/zh/guide/essentials/nested-routes.html
export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
　　　 redirect:"Page1",//重定向，第一次进入就进入Page1，不添加的话第一次进入右侧是空白
      children:[
        {
          path: '/Page1',
          name: 'Page1',
          component: Page1
        },
        {
          path: '/Page2',
          name: 'Page2',
          component: Page2
        },
        {
          path: '/Page3',
          name: 'Page3',
          component: Page3
        }
      ]
    }
  ]
  // routes: [
  //   {
  //     path: '/',
  //     redirect: '/login'
  //   },
  //   {
  //     path: '/index',
  //     name: 'HomeIndex',
  //     component: HomeIndex
  //   },
  //   {
  //     path: '/manage',
  //     redirect: '/login'
  //   },
  //   {
  //     path: '/login',
  //     name: 'BlogLogin',
  //     component: BlogLogin
  //   }
  // ]
})
