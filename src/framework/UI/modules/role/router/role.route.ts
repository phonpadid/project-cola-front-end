import type { RouteRecordRaw } from 'vue-router'

export const roleRoute: RouteRecordRaw[] = [
  {
    path: '/role',
    name: 'role',
    component: () => import('../views/RoleView.vue'),
    meta: { label: 'ບົດບາດ' },
    redirect: { name: 'role.list' },
    children: [
      {
        path: 'list',
        name: 'role.list',
        component: () => import('../views/ListRoleView.vue'),
        meta: { label: 'ລາຍການບົດບາດ' }
      }
    ]
  }
]
