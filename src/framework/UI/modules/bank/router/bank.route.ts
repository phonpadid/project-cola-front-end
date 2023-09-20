import { companyGuard } from '@/framework/UI/router/guard/specifi.guard'
import type { RouteRecordRaw } from 'vue-router'

export const bankRoute: RouteRecordRaw[] = [
  {
    path: '/bank',
    name: 'bank',
    component: () => import('../views/BankView.vue'),
    meta: { label: 'ບັນຊີທະນາຄານ' },
    redirect: { name: 'bank.list' },
    children: [
      {
        path: 'list',
        name: 'bank.list',
        component: () => import('../views/ListBankView.vue'),
        meta: { label: 'ລາຍການບັນຊີທະນາຄານ' },
        beforeEnter: (to, from, next) => companyGuard(to, from, next)
      }
    ]
  }
]
