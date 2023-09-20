import { createRouter, createWebHistory } from 'vue-router'
import { authRoute, profileRoute } from '../modules/auth/router/auth.route'
import { bankRoute } from '../modules/bank/router/bank.route'
import { companyRoute } from '../modules/company/router/company.route'
import { customerRoute } from '../modules/customer/router/customer.route'
import { dashboardRoute } from '../modules/dashboard/router/dashboard.route'
import { quotationRoute } from '../modules/quotation/router/quotation.route'
import { quotationTypeRoute } from '../modules/quotationType/router/quotationType.route'
import { roleRoute } from '../modules/role/router/role.route'
import { userRoute } from '../modules/user/router/user.route'
import { authGuard } from './guard/auth.guard'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../components/layouts/AppLayout.vue'),
      children: [
        ...dashboardRoute,
        ...customerRoute,
        ...companyRoute,
        ...userRoute,
        ...quotationRoute,
        ...profileRoute,
        ...roleRoute,
        ...bankRoute,
        ...quotationTypeRoute
      ]
    },
    ...authRoute
  ]
})

authGuard(router)

export default router
