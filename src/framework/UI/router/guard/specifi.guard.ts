import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { useAuthStore } from '../../modules/auth/stores/auth.store'

export function companyGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const { state } = useAuthStore()

  if (state.data && state.data.role.name !== 'admin' && to.name === 'bank.list') {
    next({ name: from.name as string })
  } else if (state.data && state.data.company) {
    next()
  } else {
    next({ name: from.name as string })
  }
}
