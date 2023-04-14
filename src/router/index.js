import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import Orders from '../views/Orders.vue'
import Products from '../views/Products.vue'
import Store from '../store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard
  },
  {
    path: '/dashboard/orders',
    name: 'orders',
    component: Orders
  },
  {
    path: '/dashboard/products',
    name: 'products',
    component: Products
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  let loggedUser = false
  if(localStorage.getItem("@keener_inventory_user")) {
   loggedUser = true 
  }
  
  if(loggedUser) {
    if(to.path === '/') {
      next('/dashboard')
    } else {
      next()
    }
  } else if(to.path != '/') {
    next('/')
  } else {
    next()
  }
  
}) 

export default router
