<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useAuthStore } from '../../auth/stores/auth.store'
import FormQuotation from '../components/FormQuotationView.vue'
import type { IQuotationSchema } from '../schema/quotation.schema'
import { useQuotationStore } from '../stores/quotation.store'

const { params } = useRoute()
const { state, getOne, update } = useQuotationStore()
const authStore = useAuthStore()

await getOne(params.id as string)

async function onSubmit({ billTo, currency, discount, name, note, date, tax }: IQuotationSchema) {
  await update(params.id as string, {
    billTo: { id: billTo },
    currency,
    discount,
    name,
    note,
    startDate: date[0],
    endDate: date[1],
    tax,
    from: { id: authStore.state.data?.company?.id ? authStore.state.data?.company?.id : '' }
  })
}
</script>

<template>
  <div class="card">
    <h2 class="mb-3">ແກ້ໄຂໃບສະເໜີລາຄາ</h2>
    <form-quotation :old-data="state.data" @submit="onSubmit" />
  </div>
</template>
