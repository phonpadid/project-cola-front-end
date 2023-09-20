import type { RouteRecordRaw } from 'vue-router'

export const dashboardRoute: RouteRecordRaw[] = [
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../views/DashboardView.vue'),
    meta: { label: 'ໜ້າຫຼັກ' }
  }
]
