import { companyGuard } from '@/framework/UI/router/guard/specifi.guard'
import type { RouteRecordRaw } from 'vue-router'

export const authRoute: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  }
]

export const profileRoute: RouteRecordRaw[] = [
  {
    path: '/user/profile',
    name: 'user-profile',
    component: () => import('../views/UserProfileView.vue'),
    meta: { label: 'ຂໍ້ມູນຜູ້ໃຊ້' }
  },
  {
    path: '/company/profile',
    name: 'company-profile',
    component: () => import('../views/CompanyProfiileView.vue'),
    meta: { label: 'ຂໍ້ມູນບໍລິສັດ' },
    beforeEnter: (to, from, next) => companyGuard(to, from, next)
  }
]
