import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/TheLogin'
import Container1 from '@/components/Container1'

//master data
import AssetType from '@/components/MasterData/AssetType'
import Asset from '@/components/MasterData/Asset'
import Location from '@/components/MasterData/Location'
import Customer from '@/components/MasterData/Customer'
import Driver from '@/components/MasterData/Driver'
import Event from '@/components/MasterData/Event'
import ResvType from '@/components/MasterData/ResvType'
import TourType from '@/components/MasterData/TourType'

//planning
import CreateTour from '@/components/Planning/CreateTour'
import EditTour from '@/components/Planning/EditTour'
import Reservation from '@/components/Planning/Reservation'
import ResvList from '@/components/Planning/ResvList'
import Schedule from '@/components/Planning/Schedule'
import TourList from '@/components/Planning/TourList'
import CreateSch from '@/components/Planning/CreateSch'

//Execution
import TourDetail from '@/components/Execution/TourDetail'
import SearchTour from '@/components/Execution/SearchTour'
import Monitor from '@/components/Execution/Monitor'

//report
import Dashboard from '@/components/Report/Dashboard'
import Cost from '@/components/Report/Cost'
import TourBroken from '@/components/Report/TourBroken'
import TourETA from '@/components/Report/TourETA'
import TourHistory from '@/components/Report/TourHistory'
import TourRep from '@/components/Report/TourRep'
import TourUsage from '@/components/Report/TourUsage'

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
        //Master Data
        {path: 'AssetType',name:'AssetType', component: AssetType},
        {path: 'Asset',name:'Asset', component: Asset},
        {path: 'Location',name:'Location', component: Location},
        {path: 'tourType',name:'TourType', component: TourType},
        {path: 'customer',name:'Customer', component: Customer},
        {path: 'driver',name:'Driver', component: Driver},
        {path: 'event',name:'Event', component: Event},
        {path: 'resvType',name:'ResvType', component: ResvType},
        {path: 'tourType',name:'TourType', component: TourType},
        //planning
        {path: 'createTour',name:'CreateTour', component: CreateTour},
        {path: 'editTour',name:'EditTour', component: EditTour},
        {path: 'reservation',name:'Reservation', component: Reservation},
        {path: 'resvList',name:'ResvList', component: ResvList},
        {path: 'schedule',name:'Schedule', component: Schedule},
        {path: 'createSch',name:'CreateSch', component: CreateSch},
        {path: 'tourList',name:'TourList', component: TourList},
        //execution
        {path: 'tourdetail',name:'TourDetail', component: TourDetail},
        {path: 'searchTour',name:'searchTour', component: SearchTour},
        {path: 'monitor',name:'Monitor', component: Monitor},
        //report
        {path: 'dashboard',name:'Dashboard', component: Dashboard},
        {path: 'cost',name:'Cost', component: Cost},
        {path: 'tourBroken',name:'TourBroken', component: TourBroken},
        {path: 'tourETA',name:'TourETA', component: TourETA},
        {path: 'tourHistory',name:'TourHistory', component: TourHistory},
        {path: 'tourRep',name:'TourRep', component: TourRep},
        {path: 'tourUsage',name:'TourUsage', component: TourUsage}
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
