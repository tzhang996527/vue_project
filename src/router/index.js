import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/TheLogin'
import Container from '@/components/Container'
import Container1 from '@/components/Container1'
import Dashboard from '@/components/dashboard'
import Article from '@/components/article'

import Page1 from '@/components/Page1'
import Page2 from '@/components/Page2'
import Page3 from '@/components/Page3'

//master data
import AssetType from '@/components/MasterData/AssetType'
import Asset from '@/components/MasterData/Asset'
import Loc from '@/components/MasterData/Location'


//tour
import TourList from '@/components/Tour/TourList'
import TourMain from '@/components/tour/TourMain'

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
      component: Container1,
      children: [
        {path: 'dashboard', name: '车辆管理', component: Dashboard,},
        {path: 'article', name: '车辆监控', component: Article, },
        {path: 'page1', name: 'Page1', component: Page1, },
        {path: 'page2', name: 'Page2', component: Page2, },
        {path: 'page3', name: 'Page3', component: Page3, },
        {path: 'AssetType',name:'AssetType', component: AssetType},
        {path: 'Asset',name:'车辆注册', component: Asset},
        {path: 'Location',name:'仓库地址', component: Loc},
        {path: 'TourList',name:'tourlist', component: TourList},
        // {path: '/TourList/:id',name:'tourlist', component: TourList},
        {path: '/TourMain',name:'查询行程', component: TourMain
        // children:[{path: 'TourList',name:'行程清单', component: TourList}]
      }
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
