<script setup lang="ts">
import type { BankDTO } from '@/interface-adapter/dto/bank.dto'
import PButton from 'primevue/button'
import { ref } from 'vue'
import { useAuthStore } from '../../auth/stores/auth.store'
import { useBankStore } from '../stores/bank.store'
import FormDialogBank from './FormDialogBank.vue'

const formDialogRef = ref<InstanceType<typeof FormDialogBank>>()
const { create } = useBankStore()
const authStore = useAuthStore()

async function onSubmit(values: BankDTO) {
  values.accountNumber = values.accountNumber.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
  await create({
    accountName: values.accountName,
    bankName: values.bankName,
    accountNumber: values.accountNumber,
    description: values.description,
    company: { id: authStore.state.data?.company?.id }
  })

  if (formDialogRef.value) {
    formDialogRef.value.visible = false
  }
}
</script>

<template>
  <div>
    <p-button
      type="button"
      label="ເພີ່ມບັນຊີ"
      icon="pi pi-plus"
      severity="success"
      class="w-full sm:w-auto flex-order-0 sm:flex-order-1"
      @click="formDialogRef ? (formDialogRef.visible = true) : undefined"
    />
    <form-dialog-bank ref="formDialogRef" @submit="onSubmit" />
  </div>
</template>
