import type { Router } from 'vue-router'
import { useAuthStore } from '../../modules/auth/stores/auth.store'

export function authGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    const { state, getAuth } = useAuthStore()
    const token = localStorage.getItem('token')

    if (token) await getAuth()

    if (!state.data && !token && to.name !== 'login') {
      next({ name: 'login' })
    } else {
      next()
    }
  })
}
