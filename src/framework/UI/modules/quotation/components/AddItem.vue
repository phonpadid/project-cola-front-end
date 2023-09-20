<script setup lang="ts">
import type { Currency } from '@/entities/quotation.entity'
import PButton from 'primevue/button'
import { ref } from 'vue'
import { type IItemSchema } from '../schema/quotation.schema'
import FormItemDialog from './FormDialog.vue'

defineProps<{ currency?: Currency }>()
defineEmits<{ (e: 'onSubmit', values: IItemSchema): IItemSchema }>()

const formItemRef = ref<InstanceType<typeof FormItemDialog> | null>(null)

defineExpose({
  formItemRef
})
</script>

<template>
  <div class="flex align-items-center justify-content-end">
    <p-button
      type="button"
      label="ເພີ່ມລາຍການ"
      icon="pi pi-plus"
      severity="success"
      class="w-full sm:w-auto"
      @click="() => (formItemRef ? (formItemRef.visible = true) : undefined)"
    />
    <form-item-dialog
      header="ເພີ່ມລາຍການ"
      :currency="currency"
      @on-submit="(e) => $emit('onSubmit', e)"
      ref="formItemRef"
    />
  </div>
</template>
