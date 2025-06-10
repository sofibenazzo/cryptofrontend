import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NuevaTransaccion from '@/views/NuevaTransaccion.vue'
import HistorialMovimiento from '@/views/HistorialMovimiento.vue'
import AltaCliente from '@/views/AltaCliente.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/alta-cliente',
      name: 'alta-cliente',
      component: AltaCliente,
    },
    {
      path: '/nueva-transaccion',
      name: 'nueva-transaccion',
      component: NuevaTransaccion,
    },
    {
      path: '/historial-movimiento',
      name: 'historial-movimiento',
      component: HistorialMovimiento,
    }
  ],
})

export default router
