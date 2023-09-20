<script setup lang="ts">
import type { QuotationTypeEntity } from '@/entities/quotationType.entity'
import type { QuotationTypeDTO } from '@/interface-adapter/dto/quotationType.dto'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import { useForm } from 'vee-validate'
import { ref } from 'vue'
import InputNumber from '../../../components/customComponents/FormInputNumber.vue'
import InputText from '../../../components/customComponents/FormInputText.vue'
import { quotationTypeSchema } from '../schema/quotationType.schema'

const visible = ref<boolean>(false)
defineExpose({ visible })

defineProps<{ oldData?: QuotationTypeEntity }>()

const emit = defineEmits<{ (e: 'submit', values: QuotationTypeDTO): void }>()

const { handleSubmit } = useForm<QuotationTypeDTO>({
  validationSchema: quotationTypeSchema
})

const onSubmit = handleSubmit(async (values) => {
  emit('submit', values)
})
</script>
<template>
  <Dialog
    modal
    v-model:visible="visible"
    :header="!oldData ? 'ເພີ່ມປະເພດໃບສະເໜີລາຄາ' : 'ແກ້ໄຂປະເພດໃບສະເໜີລາຄາ'"
    :breakpoints="{ '960px': '75vw', '640px': '95vw' }"
  >
    <form @submit.prevent="onSubmit" class="flex flex-column gap-3">
      <div class="grid">
        <div class="col-12 md:col-6">
          <input-text
            :value="oldData?.name"
            name="name"
            label="ຊື່"
            required
            placeholder="ປ້ອນຊື່"
          />
        </div>
        <div class="col-12 md:col-6">
          <input-number
            :value="oldData?.rateKip"
            name="rateKip"
            label="ລາຄາເງິນກີບ"
            required
            placeholder="ປ້ອນລາຄາເງິນກີບ"
            suffix="ກີບ"
          />
        </div>
        <div class="col-12 md:col-6">
          <input-number
            :value="oldData?.rateBath"
            name="rateBath"
            label="ລາຄາເງິນບາດ"
            required
            placeholder="ປ້ອນລາຄາເງິນບາດ"
            suffix="ບາດ"
          />
        </div>
        <div class="col-12 md:col-6">
          <input-number
            :value="oldData?.rateDollar"
            name="rateDollar"
            label="ລາຄາເງິນໂດລາ"
            required
            placeholder="ປ້ອນລາຄາເງິນໂດລາ"
            suffix="ໂດລາ"
          />
        </div>
      </div>
      <div class="flex justify-content-center">
        <Button
          class="w-8rem"
          type="submit"
          :label="!oldData ? 'ບັນທຶກ' : 'ແກ້ໄຂ'"
          icon="pi pi-save"
          severity="info"
        />
      </div>
    </form>
  </Dialog>
</template>

<style scoped></style>
