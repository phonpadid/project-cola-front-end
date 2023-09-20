<script setup lang="ts">
import type { QuotationStatus } from '@/entities/quotation.entity'
import Dropdown from '@/framework/UI/components/customComponents/FormDropdown.vue'
import type { OptionDD } from '@/framework/UI/components/interface/option.interface'
import PButton from 'primevue/button'
import OverlayPanel from 'primevue/overlaypanel'
import { useForm } from 'vee-validate'
import { ref } from 'vue'
import { changeStatusSchema, type IChangeStatusSchema } from '../schema/quotation.schema'
import { useQuotationStore } from '../stores/quotation.store'
import { stautsOptions } from '../utils'

const props = defineProps<{ id: string; status: QuotationStatus }>()
const changeStatusPanal = ref<InstanceType<typeof OverlayPanel>>()
const optoions: OptionDD<string>[] = stautsOptions.map((status) => ({
  label: status,
  value: status
}))
const { state, changeStatus } = useQuotationStore()

const { handleSubmit } = useForm<IChangeStatusSchema>({
  validationSchema: changeStatusSchema
})

const onSubmit = handleSubmit(async (values): Promise<void> => {
  await changeStatus(props.id, values.status)
})
</script>

<template>
  <p-button
    icon="pi pi-sync"
    severity="help"
    rounded
    v-tooltip.top="'ປ່ຽນສະຖານະ'"
    @click="(e) => changeStatusPanal?.toggle(e)"
  />
  <overlay-panel ref="changeStatusPanal">
    <form @submit.prevent="onSubmit">
      <dropdown
        name="status"
        label="ສະຖານະ"
        placeholder="ເລືອກສະຖານະ"
        required
        :options="optoions"
        :value="status"
      />
      <p-button
        label="ບັນທຶກ"
        severity="info"
        type="submit"
        icon="pi pi-save"
        class="w-full"
        :loading="state.isLoading"
      />
    </form>
  </overlay-panel>
</template>
