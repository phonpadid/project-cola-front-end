import type { RouteRecordRaw } from 'vue-router'

export const quotationTypeRoute: RouteRecordRaw[] = [
  {
    path: '/quotation/type',
    name: 'quotationType',
    component: () => import('../views/QuotationTypeView.vue'),
    meta: { label: 'ໃບສະເໜີລາຄາ' },
    redirect: { name: 'quotationType.list' },
    children: [
      {
        path: 'list',
        name: 'quotationType.list',
        component: () => import('../views/ListQuotationType.vue'),
        meta: { label: 'ລາຍການປະເພດໃບສະເໜີລາຄາ' }
      }
    ]
  }
]
