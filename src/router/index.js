import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

export const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  
  {
    path: '/carrito',
    name: 'carrito',
    component: () => import('../views/carrito.vue'),
    meta: { requiresAuth: true}
  },
  {
    path: '/sobre',
    name: 'sobre',
    component: () => import('../views/sobre.vue'),
  },
  {
    path: '/politica',
    name: 'politica',
    component: () => import('../views/politica.vue'),
  },
  {
    path: '/panel',
    name: 'panel',
    component: () => import('../views/panel.vue'),
    meta: { requiresAuth: true}
  },
  {
    path: '/creaciones',
    name: 'creaciones',
    component: () => import('../views/creaciones.vue'),
  },
  {
    path: '/recreaciones',
    name: 'recreaciones',
    component: () => import('../views/recreaciones.vue'),
  },
  {
    path: '/recreaciones/productos/:idCategoria',
    name: 'productosRecreados',
    component: () => import('../views/productos.vue'),
  },
  {
    path: '/recreaciones/productos/fichaProducto/:idProducto',
    name: 'fichaProducto',
    component: () => import('../views/fichaProducto.vue'),
  },
  {
    path: '/creaciones/productos/:idCategoria',
    name: 'productosCreados',
    component: () => import('../views/productos.vue'),
  },
  {
    path: '/creaciones/productos/fichaProducto/:idProducto',
    name: 'fichaProducto',
    component: () => import('../views/fichaProducto.vue'),
  },
  {
    path: '/creaciones/productos/fichaProducto/:idProducto/personalizar',
    name: 'personalizar',
    component: () => import('../views/personalizar.vue'),
  }
]

const router = new VueRouter({
  routes
})

export default router
