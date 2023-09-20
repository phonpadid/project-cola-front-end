import type { RouteRecordRaw } from 'vue-router'

export const customerRoute: RouteRecordRaw[] = [
  {
    path: '/customer',
    name: 'customer',
    component: () => import('../views/CustomerView.vue'),
    meta: { label: 'ລູກຄ້າ' },
    redirect: { name: 'customer.list' },
    children: [
      {
        path: '',
        name: 'customer.list',
        component: () => import('../views/ListCustomerView.vue'),
        meta: { label: 'ລາຍການລູກຄ້າ' }
      },
      {
        path: 'create',
        name: 'customer.create',
        component: () => import('../views/CreateCustomerView.vue'),
        meta: { label: 'ເພີ່ມລູກຄ້າ' }
      },
      {
        path: 'edit/:id',
        name: 'customer.edit',
        component: () => import('../views/EditCustomerView.vue'),
        meta: { label: 'ແກ້ໄຂລູກຄ້າ' }
      }
    ]
  }
]
