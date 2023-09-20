<script setup lang="ts">
import type { ItemDTO } from '@/interface-adapter/dto/item.dto'
import { ref } from 'vue'
import { useAuthStore } from '../../auth/stores/auth.store'
import FormQuotation from '../components/FormQuotationView.vue'
import type { IQuotationSchema } from '../schema/quotation.schema'
import { useQuotationStore } from '../stores/quotation.store'

const authStore = useAuthStore()

const { create } = useQuotationStore()

const formQuuotationRef = ref<InstanceType<typeof FormQuotation>>()

async function onSubmit({ billTo, currency, discount, name, note, date, tax }: IQuotationSchema) {
  let items: ItemDTO[] = []

  if (formQuuotationRef.value?.listItemRef?.items) {
    items = formQuuotationRef.value?.listItemRef?.items.map((item, idx) => ({
      ...item,
      orderNumber: idx + 1
    }))
  }

  await create({
    billTo: { id: billTo },
    currency: currency,
    discount,
    from: { id: authStore.state.data?.company?.id ? authStore.state.data?.company?.id : '' },
    items,
    name,
    note,
    startDate: date[0],
    endDate: date[1],
    tax
  })
}
</script>

<template>
  <div class="card">
    <h2 class="mb-3">ສ້າງໃບສະເໜີລາຄາ</h2>
    <form-quotation @submit="onSubmit" ref="formQuuotationRef" />
  </div>
</template>
