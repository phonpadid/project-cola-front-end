<script setup lang="ts">
import type { Currency } from '@/entities/quotation.entity'
import PButton from 'primevue/button'
import { ref } from 'vue'
import type { IItemSchema } from '../schema/quotation.schema'
import FormItemDialog from './FormDialog.vue'

defineProps<{ currency?: Currency; idx: number; data: IItemSchema }>()
defineEmits<{ (e: 'onSubmit', idx: number, values: IItemSchema): IItemSchema }>()

const formItemRef = ref<InstanceType<typeof FormItemDialog> | null>(null)

defineExpose({
  formItemRef
})
</script>

<template>
  <p-button
    icon="pi pi-pencil"
    severity="warning"
    class="text-white"
    size="small"
    rounded
    v-tooltip.top="'ແກ້ໄຂ'"
    @click="() => (formItemRef ? (formItemRef.visible = true) : undefined)"
  />
  <form-item-dialog
    header="ແກ້ໄຂລາຍການ"
    :currency="currency"
    @on-submit="(e) => $emit('onSubmit', idx, e)"
    ref="formItemRef"
    :form-values="data"
  />
</template>
