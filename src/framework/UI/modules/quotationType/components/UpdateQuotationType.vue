<script setup lang="ts">
import type { QuotationTypeEntity } from '@/entities/quotationType.entity'
import type { QuotationTypeDTO } from '@/interface-adapter/dto/quotationType.dto'
import PButton from 'primevue/button'
import { ref } from 'vue'
import { useQuotationTypeStore } from '../stores/quotationType.store'
import FormDialogQuotationType from './FormDialogQuotationType.vue'

const props = defineProps<{
  oldData: QuotationTypeEntity
}>()

const formDialogRef = ref<InstanceType<typeof FormDialogQuotationType>>()
const { update } = useQuotationTypeStore()

async function onSubmit(values: QuotationTypeDTO) {
  await update(
    {
      name: values.name,
      rateKip: values.rateKip,
      rateBath: values.rateBath,
      rateDollar: values.rateDollar
    },
    props.oldData.id
  )

  if (formDialogRef.value) {
    formDialogRef.value.visible = false
  }
}
</script>

<template>
  <div>
    <p-button
      icon="pi pi-pencil"
      severity="warning"
      rounded
      class="text-white"
      v-tooltip.top="'ແກ້ໄຂ'"
      @click="formDialogRef ? (formDialogRef.visible = true) : undefined"
    />
    <form-dialog-quotation-type ref="formDialogRef" @submit="onSubmit" :old-data="oldData" />
  </div>
</template>
