import type { RouteRecordRaw } from 'vue-router'

export const companyRoute: RouteRecordRaw[] = [
  {
    path: '/company',
    name: 'company',
    component: () => import('../views/CompanyView.vue'),
    meta: { label: 'ບໍລິສັດ' },
    redirect: { name: 'company.list' },
    children: [
      {
        path: '',
        name: 'company.list',
        component: () => import('../views/ListCompanyView.vue'),
        meta: { label: 'ລາຍການບໍລິສັດ' }
      },
      {
        path: 'create',
        name: 'company.create',
        component: () => import('../views/CreateCompanyView.vue'),
        meta: { label: 'ເພີ່ມບໍລິສັດ' }
      },
      {
        path: 'edit/:id',
        name: 'company.edit',
        component: () => import('../views/EditCompanyView.vue'),
        meta: { label: 'ແກ້ໄຂບໍລິສັດ' }
      },
      {
        path: ':id',
        name: 'company.description',
        component: () => import('../views/DescriptionCompanyView.vue'),
        meta: { label: 'ລາຍລະອຽດບໍລິສັດ' }
      }
    ]
  }
]
