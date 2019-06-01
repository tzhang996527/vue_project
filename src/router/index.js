import Vue from 'vue'
import Router from 'vue-router'
import BlogLogin from '@/components/BlogLogin.vue'
import HomeIndex from '@/components/home/HomeIndex.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/index',
      name: 'HomeIndex',
      component: HomeIndex
    },
    {
      path: '/manage',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'BlogLogin',
      component: BlogLogin
    }
  ]
})
