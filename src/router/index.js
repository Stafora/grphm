import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: function () {
      return import('../views/Home.vue')
    }
  },
  /*{
    path: '/',
    name: 'Inner',
    meta: {
      layout: 'DefaultLayout'
    },
    component: function () {
      return import('../views/Home.vue')
    }
  },*/
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
