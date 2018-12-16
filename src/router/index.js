// @ts-nocheck
import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import About from '@/views/About'
import Scrapyd from '@/views/Scrapyd'
import Login from '@/views/Login'
import Search from '@/views/Search'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/scrapyd/:project?',
      name: 'scrapyd',
      component: Scrapyd,
      props: true
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
