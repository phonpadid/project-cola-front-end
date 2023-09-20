import type { RouteRecordRaw } from 'vue-router'

export const quotationRoute: RouteRecordRaw[] = [
  {
    path: '/quotation',
    name: 'quotation',
    component: () => import('../views/QuotationView.vue'),
    meta: { label: 'ຈັດການທີມ' },
    redirect: { name: 'quotation.list' },
    children: [
      {
        path: 'list',
        name: 'quotation.list',
        component: () => import('../views/ListQuotationView.vue'),
        meta: { label: 'ຈັດການແມັດ' }
      },
      {
        path: 'create',
        name: 'quotation.create',
        component: () => import('../views/CreateQuotationView.vue'),
        meta: { label: 'ສ້າງໃບສະເໜີລາຄາ' }
      },
      {
        path: 'edit/:id',
        name: 'quotation.edit',
        component: () => import('../views/UpdateQuotationView.vue'),
        meta: { label: 'ແກ້ໄຂໃບສະເໜີລາຄາ' }
      }
    ]
  }
]
