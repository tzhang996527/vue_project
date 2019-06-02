import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/TheLogin'
import Container from '@/components/Container'
import Dashboard from '@/components/dashboard'
import Article from '@/components/article'

import Page1 from '@/components/Page1'
import Page2 from '@/components/Page2'
import Page3 from '@/components/Page3'

Vue.use(Router)

// 嵌套路由
// https://router.vuejs.org/zh/guide/essentials/nested-routes.html
export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      redirect: '/dashboard',
      name: 'Container',
      component: Container,
      children: [
        {path: 'dashboard', name: '车辆管理', component: Dashboard,},
        {path: 'article', name: '车辆监控', component: Article, },
        {path: 'page1', name: 'Page1', component: Page1, },
        {path: 'page2', name: 'Page2', component: Page2, },
        {path: 'page3', name: 'Page3', component: Page3, }
      ]
    }
  ]

//       path: '/',
//       name: 'home',
//       component: Home,
// 　　　 redirect:"Page1",//重定向，第一次进入就进入Page1，不添加的话第一次进入右侧是空白
//       children:[
//         {
//           path: '/Page1',
//           name: 'Page1',
//           component: Page1
//         },
//         {
//           path: '/Page2',
//           name: 'Page2',
//           component: Page2
//         },
//         {
//           path: '/Page3',
//           name: 'Page3',
//           component: Page3
//         }

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
