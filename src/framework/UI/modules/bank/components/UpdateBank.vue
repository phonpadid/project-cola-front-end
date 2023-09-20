<script setup lang="ts">
import type { BankEntity } from '@/entities/bank.entity'
import type { BankDTO } from '@/interface-adapter/dto/bank.dto'
import PButton from 'primevue/button'
import { ref } from 'vue'
import { useBankStore } from '../stores/bank.store'
import FormDialogBank from './FormDialogBank.vue'

const props = defineProps<{
  oldData: BankEntity
}>()

const formDialogRef = ref<InstanceType<typeof FormDialogBank>>()
const { update } = useBankStore()

async function onSubmit(values: BankDTO) {
  values.accountNumber = values.accountNumber.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
  await update(
    {
      accountName: values.accountName,
      bankName: values.bankName,
      accountNumber: values.accountNumber,
      description: values.description
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
    <form-dialog-bank ref="formDialogRef" @submit="onSubmit" :old-data="oldData" />
  </div>
</template>
