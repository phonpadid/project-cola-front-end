<script setup lang="ts">
import type { QuotationTypeDTO } from '@/interface-adapter/dto/quotationType.dto'
import PButton from 'primevue/button'
import { ref } from 'vue'
import { useQuotationTypeStore } from '../stores/quotationType.store'
import FormDialogQuotationType from './FormDialogQuotationType.vue'

const formDialogRef = ref<InstanceType<typeof FormDialogQuotationType>>()
const { create } = useQuotationTypeStore()

async function onSubmit(values: QuotationTypeDTO) {
  await create({
    name: values.name,
    rateKip: values.rateKip,
    rateBath: values.rateBath,
    rateDollar: values.rateDollar
  })

  if (formDialogRef.value) {
    formDialogRef.value.visible = false
  }
}
</script>

<template>
  <div class="w-full sm:w-auto flex-order-0 sm:flex-order-1">
    <p-button
      type="button"
      label="ເພີ່ມປະເພດໃບສະເໜີລາຄາ"
      icon="pi pi-plus"
      severity="success"
      class="w-full"
      @click="formDialogRef ? (formDialogRef.visible = true) : undefined"
    />
    <form-dialog-quotation-type ref="formDialogRef" @submit="onSubmit" />
  </div>
</template>
