import type { RouteRecordRaw } from 'vue-router'

export const userRoute: RouteRecordRaw[] = [
  {
    path: '/user',
    name: 'user',
    component: () => import('../views/UserView.vue'),
    meta: { label: 'ຜູ້ໃຊ້' },
    redirect: { name: 'user.list' },
    children: [
      {
        path: 'list',
        name: 'user.list',
        component: () => import('../views/ListUserView.vue'),
        meta: { label: 'ຈັດການຜູ້ໃຊ້' }
      },
      {
        path: 'create',
        name: 'user.create',
        component: () => import('../views/CreateUserView.vue'),
        meta: { label: 'ເພີ່ມຜູ້ໃຊ້' }
      },
      {
        path: 'detail/:id',
        name: 'user.detail',
        component: () => import('../views/DetailUserView.vue'),
        meta: { label: 'ລາຍລະອຽດຜູ້ໃຊ້' }
      },
      {
        path: 'update/:id',
        name: 'user.update',
        component: () => import('../views/UpdateUserView.vue'),
        meta: { label: 'ແກ້ໄຂຜູ້ໃຊ້' }
      }
    ]
  }
]
