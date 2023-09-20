<script setup lang="ts">
import type { RoleEntity } from '@/entities/role.entity'
import PButton from 'primevue/button'
import { ref } from 'vue'
import type { RoleSchema } from '../schema/role.schema'
import { useRoleStore } from '../stores/role.store'
import RoleFormDialog from './RoleFormDialog.vue'

const props = defineProps<{
  oldData: RoleEntity
}>()

const formDialogRef = ref<InstanceType<typeof RoleFormDialog>>()
const { update } = useRoleStore()

async function onSubmit(values: RoleSchema) {
  await update(props.oldData.id, {
    name: values.name,
    permissions: values.permissions
  })

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
    <role-form-dialog ref="formDialogRef" @submit="onSubmit" :old-data="oldData" />
  </div>
</template>
