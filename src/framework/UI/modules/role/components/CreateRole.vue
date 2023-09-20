<script setup lang="ts">
import PButton from 'primevue/button'
import { ref } from 'vue'
import { useAuthStore } from '../../auth/stores/auth.store'
import type { RoleSchema } from '../schema/role.schema'
import { useRoleStore } from '../stores/role.store'
import RoleFormDialog from './RoleFormDialog.vue'

const formDialogRef = ref<InstanceType<typeof RoleFormDialog>>()
const { create } = useRoleStore()
const authStore = useAuthStore()

async function onSubmit(values: RoleSchema) {
  await create({
    name: values.name,
    company: { id: authStore.state.data?.company?.id },
    permissions: values.permissions
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
      label="ເພີ່ມບົດບາດ"
      icon="pi pi-plus"
      severity="success"
      class="w-full"
      @click="formDialogRef ? (formDialogRef.visible = true) : undefined"
    />
    <role-form-dialog ref="formDialogRef" @submit="onSubmit" />
  </div>
</template>
